import React from "react";
import { Grid } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

function CheckoutDetail() {
  const fakeData = {
    prePrice: "100.000đ",
    realPrice: "100.000đ",
    products: [
      {
        name: "Rong Biển Sấy Chú Tiểu (50g)",
        link: "/product",
        count: 3,
        price: "75.000đ",
        shop: {
          name: "TADA FOODS",
          link: "/shop"
        }
      },
      {
        name:
          "Lắp đặt trong vòng 48h (Trừ CN/ ngày lễ) kể từ khi giao hàng thành công. Chỉ áp dụng tại TPHCM, Hà Nội & Cần Thơ (Quận Bình Thủy, Ninh Kiều, Cái Răng)",
        link: "/product",
        count: 3,
        price: "75.000đ",
        shop: {
          name: "Tiki Trading",
          link: "/shop"
        }
      },
      {
        name: "Rong Biển Sấy Chú Tiểu (50g) 3",
        link: "/product",
        count: 3,
        price: "75.000đ",
        shop: {
          name: "TADA FOODS",
          link: "/shop"
        }
      }
    ]
  };

  return (
    <div className="panel-body">
      <div className="order-title">
        <span className="title">{`Order Detail (${fakeData.products.length} products)`}</span>
        <button type="button" className="btn-edit">
          Edit
        </button>
      </div>
      <div className="products">
        {fakeData.products.map(p => (
          <div className="item" key={p.name}>
            <p className="title">
              <strong>{`${p.count}x `}</strong>
              <a href={p.link}>{p.name}</a>
              <span className="seller-by">{`Seller by ${p.shop.name}`}</span>
            </p>
            <p className="price">
              <span>{p.price}</span>
            </p>
          </div>
        ))}
      </div>
      <p className="list-info-price">
        <b>Provisional</b>
        <span>{fakeData.prePrice}</span>
      </p>
      <p className="total">
        <b>Total</b>
        <span>{fakeData.realPrice}</span>
      </p>
    </div>
  );
}

function LoginForm() {
  return (
    <>
      <p>Login Form</p>
    </>
  );
}

function ChangeAddressForm() {
  return (
    <>
      <p>ChangeAddressForm</p>
    </>
  );
}

function PaymentTypeForm() {
  return (
    <>
      <p>PaymentTypeFrom</p>
    </>
  );
}

function FinishedForm() {
  return <div>Finished</div>;
}

function getSteps() {
  return ["Login", "Addresses", "Checkout & Order"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <LoginForm />;
    case 1:
      return <ChangeAddressForm />;
    case 2:
      return <PaymentTypeForm />;
    default:
      return <FinishedForm />;
  }
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="checkout-page w-90">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        getStepContent(activeStep)
      ) : (
        <Grid container>
          <Grid item lg={8} xs={12} sm={12}>
            {getStepContent(activeStep)}
          </Grid>
          <Grid item lg={4} xs={12} sm={12}>
            <CheckoutDetail />
          </Grid>
        </Grid>
      )}
    </div>
  );
}

// {activeStep === steps.length ? (
//   <div>
//     {getStepContent(activeStep)}
//     <button type="button" onClick={handleReset}>
//       Reset
//     </button>
//   </div>
// ) : (
//   <div>
//     <button type="button" disabled={activeStep === 0} onClick={handleBack}>
//       Back
//     </button>
//     {getStepContent(activeStep)}
//     <button type="button" onClick={handleNext}>
//       {activeStep === steps.length - 1 ? "Finish" : "Next"}
//     </button>
//   </div>
// )}
