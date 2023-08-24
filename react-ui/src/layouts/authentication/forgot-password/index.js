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

import {
  useState,
  // useContext,
  useMemo,
} from "react";

// react-router-dom components
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

// @mui material components
// import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import AuthApi from "../../../api/auth";

function ForgotPassword() {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  console.log("history in ForgotPassword = ", history);

  const [email, setEmail] = useState("");
  const [error, setError] = useState(undefined);
  const [buttonText, setButtonText] = useState("Request reset link");

  const reset = async (event) => {
    setError(undefined);
    if (event) {
      event.preventDefault();
    }
    if (email === "") {
      return setError("This field may not be blank.");
    }
    setButtonText("Requesting reset link");
    try {
      await AuthApi.IsActive({email});
    } catch (err) {
      console.log(err);
      setButtonText("Request reset link");
      if (err.response.data.message) {
        return setError(err.response.data.message);
      }
    }
    try {
      await AuthApi.ForgotPassword({email});
      setButtonText("Request reset link");
      localStorage.setItem("user", JSON.stringify({email}));
      return history.push(`${history.location.pathname}?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.log(err);
      // console.log("err response = ", err.response);
      setButtonText("Request reset link");
      // if (err.response) {
      //   // return setError(err.response.data.msg);
      //   // return setError(err.response.data.email);
      //   return setError(err.response.data.message);
      // }
      if (err.response.data.email) {
        return setError(err.response.data.email);
      } else if (err.response.data.length > 0) {
        return setError(err.response.data[0]);
      }
      return setError("There has been an error.");
    }
  };

  return history.location.search.length === 0 ? (
    <CoverLayout
      title="Forgot your password?"
      description="Ensure your email address is typed
      correctly and we’ll send you an email
      with instructions to reset it."
      image={curved9}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <Socials />
        </SuiBox>
        <Separator />
        <SuiBox mb={2}>
          <SuiInput
            defaultValue={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError(undefined);
            }}
            type="email"
            placeholder="Email"
          />
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
            {error}
          </h6>
        </SuiBox>
        <SuiBox mt={4} mb={1}>
          <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={reset}>
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
              textColor="info"
              fontWeight="bold"
            >
              Sign in
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </CoverLayout>
  ) : (
    <CoverLayout
      title="Password Reset"
      image={curved9}
    >
      <SuiTypography mb={1} variant="body2" fontWeight="regular" textColor="text" style={{ fontSize: 14, }}>
        If your email is associated with a
        FreshBooks account you will receive
        reset instructions sent to:
      </SuiTypography>

      <SuiTypography mb={3} variant="body2" fontWeight="bold" textColor="text" style={{ fontSize: 14, textAlign: "center", }}>
        {searchParams.get("email")}
      </SuiTypography>

      <SuiTypography variant="body2" fontWeight="regular" textColor="text" style={{ fontSize: 14, }}>
        If you did not receive an email, check
        your spam folder and ensure your email
        address was entered correctly.
      </SuiTypography>

      <SuiBox my={3}>
        <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={() => history.push("/authentication/sign-in")}>
          Back to Login
        </SuiButton>
      </SuiBox>

      <SuiTypography
        component={Link}
        to="/authentication/forgot-password"
        variant="button"
        textColor="info"
        fontWeight="medium"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {`Didn't get the email?`}
      </SuiTypography>

    </CoverLayout>
  );
}

export default ForgotPassword;
