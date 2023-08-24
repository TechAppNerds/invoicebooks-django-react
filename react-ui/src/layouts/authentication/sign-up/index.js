/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
// import { useContext } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

import { makeStyles } from '@mui/styles';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

// import { useAuth } from "../../../auth-context/auth.context";
// import { AuthContext } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";
// import ActionsApi from "../../../api/actions";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  form: {
    "& .MuiInputBase-root, .MuiCheckbox-root": {
      border: "1px solid #7f8c9f",
      borderRadius: 5,
      "& input.MuiInputBase-input::placeholder": {
        opacity: 0.5,
      },
    },
  },
});

function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  // const { setUser } = useAuth();
  // const { setUser } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(true);
  // const [firstName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonText, setButtonText] = useState("Sign up");
  const [validation, setValidation] = useState({});
  const [error, setError] = useState(undefined);

  const handleSetAgreement = () => setAgreement(!agreement);

  function getTimeZone() {
    let offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + Math.floor(o / 60) + ":" + ("00" + (o % 60)).slice(-2);
  }

  const register = async (event) => {
    setValidation({});
    setError(undefined);
    if (event) {
      event.preventDefault();
    }
    // if (firstName === "") {
    //   return setError("You must enter your first name.");
    // }
    // if (email === "") {
    //   return setError("You must enter your email.");
    // }
    // if (password === "") {
    //   return setError("You must enter a password.");
    // }
    // if (confirmPassword === "") {
    //   return setError("You must enter a confirm password.");
    // }
    // if (password !== confirmPassword) {
    //   return setError("Password confirmation does not match.");
    // }
    if (error === undefined) {
      setButtonText("Signing up");
      let date_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/");
      let time_zone = `(UTC${getTimeZone()}) ${date_time_zone[0]} — ${date_time_zone[1]}`;
      try {
        let response = await AuthApi.Register({
          // username: firstName,
          email,
          role: "Business Owner",
          time_zone,
          password,
          re_password: confirmPassword,
        });
        console.log("response of Register = ", response);
        // if (response.data && response.data.success === false) {
        //   setButtonText("Sign up");
        //   return setError(response.data.msg);
        // }
        // return setProfile(response);
        
        if (response.status === 201 && response.statusText === "Created") {
          // let init_notification_response = await AuthApi.InitializationNotification({ ...response.data, user_id: response.data.id });
          // console.log("init_notification_response response = ", init_notification_response);
          
          // if (init_notification_response.status === 201 && init_notification_response.statusText === "Created") {
          //   setButtonText("Sign up");
          //   localStorage.setItem("user", JSON.stringify({email}));
          //   return history.push(`/authentication/account-verification?email=${encodeURIComponent(email)}`);
          // }

          let access_response = await AuthApi.UserAccess({ ...response.data, user_id: response.data.id });
          console.log("access_response response = ", access_response);

          if (access_response.status === 200 && access_response.statusText === "OK") {
            setButtonText("Sign up");
            localStorage.setItem("user", JSON.stringify({email}));
            return history.push(`/authentication/account-verification?email=${encodeURIComponent(email)}`);
          }
        }
      } catch (err) {
        console.log(err);
        // console.log("err response = ", err.response);
        setButtonText("Sign up");
        if (err.response) {
          // return setError(err.response.data.msg);
          return setValidation(err.response.data);
        }
        return setError("There has been an error.");
      }
    }
  };

  // const setProfile = async (response) => {
  //   let user = { ...response.data.user };
  //   try {
  //     let login_response = await AuthApi.Login({
  //       email,
  //       password,
  //     });
  //     console.log("Login response = ", login_response);
  //     // if (login_response.data && login_response.data.success === false) {
  //     //   return setError(response.data.msg);
  //     // }
  //     user.token = login_response.data;

  //     let get_business_response = await ActionsApi.GetBusiness({
  //       user_id: user.id,
  //     });
  //     console.log("GetBusiness response = ", get_business_response);
  //     user.business = get_business_response.data;
  //   } catch (err) {
  //     console.log(err);
  //     return setError("There has been an error.");
  //   }
  //   user = JSON.stringify(user);
  //   setUser(user);
  //   localStorage.setItem("user", user);
  //   return history.push("/survey");

  // };

  return (
    <BasicLayout
      title="Welcome to InvoiceBooks"
      // description="Use these awesome forms to login or create new account in your project for free."
      description="Get started with your business"
      image={curved6}
    >
      <Card>
        <SuiBox p={3} mb={1} textAlign="center">
          <SuiTypography variant="h5" fontWeight="medium">
            Register with
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={2}>
          <Socials />
        </SuiBox>
        <Separator />
        <SuiBox pt={2} pb={3} px={3}>
          <SuiBox component="form" role="form" customClass={classes.form}>
            {/* <SuiBox mb={2}>
              <SuiInput
                onChange={(event) => {
                  setName(event.target.value);
                  setError(undefined);
                }}
                placeholder="Name"
              />
            </SuiBox> */}
            <SuiBox mb={2}>
              <SuiInput
                error={"email" in validation}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setValidation({});
                  setError(undefined);
                }}
                type="email"
                placeholder="Email"
              />
              {"email" in validation &&
                validation.email.map((message, index) => (
                  <SuiTypography
                    key={`${index} — ${message}`}
                    variant="button"
                    fontWeight="regular"
                    textColor="error"
                    style={{ fontSize: 13, }}
                  >
                    {message}
                  </SuiTypography>
                ))
              }
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                error={"password" in validation || "non_field_errors" in validation}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setValidation({});
                  setError(undefined);
                }}
                type="password"
                placeholder="Password"
              />
              {"password" in validation &&
                validation.password.map((message, index) => {
                  return (
                    <>
                      <SuiTypography
                        key={`${index} — ${message}`}
                        variant="button"
                        fontWeight="regular"
                        textColor="error"
                        style={{ fontSize: 13, }}
                      >
                        {message}
                      </SuiTypography>
                      {index !== validation.password.length - 1 && <br/>}
                    </>
                  )
                })
              }
            </SuiBox>
            <SuiBox mb={2}>
              <SuiInput
                error={"re_password" in validation || "non_field_errors" in validation}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setValidation({});
                  setError(undefined);
                }}
                type="password"
                placeholder="Confirm Password"
              />
              {"re_new_password" in validation &&
                validation.re_new_password.map((message, index) => (
                  <SuiTypography
                    key={`${index} — ${message}`}
                    variant="button"
                    fontWeight="regular"
                    textColor="error"
                    style={{ fontSize: 13, }}
                  >
                    {message}
                  </SuiTypography>
                ))
              }
            </SuiBox>
            <SuiBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgreement} />
              <SuiTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                customClass="cursor-pointer user-select-none"
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </SuiTypography>
              <SuiTypography component="a" href="#" variant="button" fontWeight="bold" textGradient>
                Terms and Conditions
              </SuiTypography>
            </SuiBox>
            <SuiBox mt={2} mb={2} textAlign="center">
              <h6
                style={{
                  // fontSize: ".8em",
                  fontSize: 14,
                  color: "red",
                  textAlign: "center",
                  fontWeight: 400,
                  transition: ".2s all",
                }}
              >
                {/* {error} */}
                {
                  validation && Object.keys(validation).length === 0
                  && Object.getPrototypeOf(validation) === Object.prototype ? error
                  : "non_field_errors" in validation &&
                  validation.non_field_errors.map((message, index) => (
                    <SuiTypography
                      key={`${index} — ${message}`}
                      variant="button"
                      fontWeight="regular"
                      textColor="error"
                    >
                      {message}
                    </SuiTypography>
                  ))
                }
              </h6>
            </SuiBox>
            <SuiBox mt={4} mb={1}>
              <SuiButton onClick={register} variant="gradient" buttonColor="dark" fullWidth>
                {buttonText}
              </SuiButton>
            </SuiBox>
            <SuiBox mt={3} textAlign="center">
              <SuiTypography variant="button" textColor="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SuiTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  textColor="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SuiTypography>
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
