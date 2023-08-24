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
  useMemo,
  useState,
  forwardRef,
} from "react";

// react-router-dom components
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

// @mui material components
import {
  // Grid,
  Snackbar,
  Slide,
  Alert as MuiAlert,
} from "@mui/material";

// Soft UI Dashboard React components
// import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
// import SuiAlert from "components/SuiAlert";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import AuthApi from "../../../api/auth";

function AccountVerification() {
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const email = searchParams.get("email");

  console.log("history in AccountVerification = ", history);

  function toastSlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }
  
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [toastState, setToastState] = useState(false);
  const [toastTransition, setToastTransition] = useState(undefined);

  const resend = () => {
    try {
      AuthApi.ResendActivation({email});
      setToastTransition(() => toastSlideTransition);
      setToastState(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* <Grid item xs={11} sm={8} md={5} xl={3} style={{ display: "flex", alignItems: "center", }}> */}
      {/* <SuiAlert color="success" dismissible={true}>
        Verification Email Sent - We have sent an email with instructions on verifying your account.
      </SuiAlert> */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center", }}
        open={toastState}
        onClose={() => setToastState(false)}
        autoHideDuration={5000}
        TransitionComponent={toastTransition}
        sx={{
          "& .MuiAlert-root": {
            backgroundColor: "#37a703",
            color: "#fff",
            fontSize: "0.875rem",
          },
        }}
      >
        <Alert severity="success">
          Verification Email Sent - We have sent an email with instructions on verifying your account.
        </Alert>
      </Snackbar>
      {/* </Grid> */}
      <CoverLayout
        title="Check Your Inbox"
        image={curved9}
      >
        <SuiTypography mb={4.5} variant="body2" fontWeight="regular" textColor="text" style={{ fontSize: 14, }}>
          Verifying your email address helps protect
          your account. Please follow the instructions
          sent to <b>{email}</b> to
          continue your setup.
        </SuiTypography>

        <SuiTypography variant="body2" fontWeight="regular" textColor="text" style={{ fontSize: 14, textAlign: "center", }}>
          {`Didn’t Receive Email?`}
        </SuiTypography>

        <SuiTypography
          component={Link}
          to={`${history.location.pathname}?email=${encodeURIComponent(email)}`}
          onClick={resend}
          variant="button"
          textColor="info"
          fontWeight="medium"
          style={{
            fontSize: 14,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Resent Email Verification
        </SuiTypography>
      </CoverLayout>
    </>
  );
}

export default AccountVerification;
