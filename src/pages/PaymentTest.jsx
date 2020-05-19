import React, { useState } from "react";
import axios from "axios";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";

const PaymentTest = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    itemId: "",
    variationId: "",
    downPayment: "",
    loanTerm: "",
    itemQuantity: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const handleOnFieldChange = (e, key) => {
    const { value } = e.target;
    setFormData(prevState => ({ ...prevState, [key]: value }));
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    try {
      // Retrieving ClientSecret (backend determine price)
      let result;
      result = await axios.post(
        "http://localhost:5000/api-shop/payment/start",
        {
          billingDetails: {
            lastName: formData.lastName,
            firstName: formData.firstName,
            email: formData.email,
            phone: formData.phone,
          },
          cart: [
            {
              itemId: formData.itemId,
              variationId: formData.variationId,
              quantity: formData.itemQuantity
            }
          ]
        },
        { withCredentials: true }
      );
      const clientSecret = result.data.client_secret;
      result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${formData.lastName} ${formData.firstName}`,
            email: formData.email,
            phone: formData.phone
          }
        }
      });
      console.log(result);
      if (result.error) {
        // Payment Error (Insufficent fund, 3D authen failed)
        console.log(result.error.message);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "500px"
      }}
    >
      <input
        name="itemId"
        type="text"
        placeholder="Item ID"
        value={formData.itemId}
        onChange={e => handleOnFieldChange(e, "itemId")}
        style={{ fontSize: "21px" }}
      />
      <input
        name="variationId"
        type="text"
        placeholder="Variation ID"
        value={formData.variationId}
        onChange={e => handleOnFieldChange(e, "variationId")}
        style={{ fontSize: "21px" }}
      />
      <input
        name="itemQuantity"
        type="text"
        placeholder="Quantity"
        value={formData.itemQuantity}
        onChange={e => handleOnFieldChange(e, "itemQuantity")}
        style={{ fontSize: "19px" }}
      />
      <hr />
      <input
        name="downPayment"
        type="text"
        placeholder="Downpayment"
        value={formData.downPayment}
        onChange={e => handleOnFieldChange(e, "downPayment")}
      />
      <input
        name="loanTerm"
        type="text"
        placeholder="Loan Term (48, 60, 72)"
        value={formData.loanTerm}
        onChange={e => handleOnFieldChange(e, "loanTerm")}
      />
      <hr />
      <input
        name="lastName"
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={e => handleOnFieldChange(e, "lastName")}
      />
      <input
        name="firstName"
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={e => handleOnFieldChange(e, "firstName")}
      />
      <input
        name="email"
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={e => handleOnFieldChange(e, "email")}
      />
      <input
        name="phone"
        type="text"
        placeholder="Phone number"
        value={formData.phone}
        onChange={e => handleOnFieldChange(e, "phone")}
      />
      <label>
        Card number
        <CardNumberElement />
      </label>
      <label>
        Expiration date
        <CardExpiryElement />
      </label>
      <label>
        CVC
        <CardCvcElement />
      </label>
      <button type="submit" disabled={!stripe || !elements}>
        Submit
      </button>
    </form>
  );
};

export default PaymentTest;
