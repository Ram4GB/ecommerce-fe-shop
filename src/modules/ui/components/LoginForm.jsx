import React, { useState } from "react";
import { Grid, AppBar, Tab, Tabs } from "@material-ui/core";
import Login from "./Login";
import SignUp from "./SignUp";
import register from "../../../commons/assets/img/login-form/register.png";
import signin from "../../../commons/assets/img/login-form/signin.png";

export default function LoginForm() {
  const [tabSelected, setTabSelected] = useState(0);

  const handleChange = (e, newValue) => {
    setTabSelected(newValue);
  };

  const renderTabPane = () => {
    switch (tabSelected) {
      case 0:
        return <Login />;
      case 1:
        return <SignUp />;
      default:
        return 0;
    }
  };

  const renderImage = () => {
    switch (tabSelected) {
      case 0:
        return <img alt="" src={signin} className="img-form-login" />;
      case 1:
        return <img alt="" src={register} className="img-form-login" />;
      default:
        return "";
    }
  };

  return (
    <div className="login-form">
      <Grid container>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          {renderImage()}
        </Grid>
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <AppBar position="static">
            <Tabs value={tabSelected} onChange={handleChange}>
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          <div
            style={{
              padding: "20px 0px"
            }}
          >
            {renderTabPane()}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
