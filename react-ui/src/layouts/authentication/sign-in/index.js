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
  useContext,
} from "react";

// react-router-dom components
import {
  Link,
  useHistory,
} from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

import { makeStyles } from '@mui/styles';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
// import Socials from "layouts/authentication/components/Socials";
// import Separator from "layouts/authentication/components/Separator";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

// import { useAuth } from "../../../auth-context/auth.context";
import { AuthContext } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";
import ActionsApi from "../../../api/actions";

const useStyles = makeStyles({
  form: {
    "& .MuiInputBase-root": {
      border: "1px solid #7f8c9f",
      borderRadius: 5,
      "& input.MuiInputBase-input::placeholder": {
        opacity: 0.5,
      },
    },
  },
});

function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  // const { user, setUser } = useAuth();
  const { user, setUser } = useContext(AuthContext);

  // console.log("history in SignIn = ", history);

  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const [buttonText, setButtonText] = useState("Sign in");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  function isEmpty(value) {
    return value == null || value.length === 0;
  }

  function checkCompletionSurvey(user) {
    if (isEmpty(user.first_name) || isEmpty(user.last_name) || isEmpty(user.country) || isEmpty(user.phone_number)) {
      return false;
    } else {
      // if (user.business.length === 0) {
      if (user.business && Object.keys(user.business).length === 0 && Object.getPrototypeOf(user.business) === Object.prototype) {
        return false;
      } else {
        // if (user.business.length !== 0 && 
        if (user.business && Object.keys(user.business).length !== 0 && Object.getPrototypeOf(user.business) === Object.prototype && 
          (isEmpty(user.business.name) ||
          isEmpty(user.business.industry) ||
          isEmpty(user.business.describe) ||
          isEmpty(user.business.base_currency) ||
          isEmpty(user.business.estimated_revenue) ||
          isEmpty(user.business.time_completed_service) ||
          isEmpty(user.business.customer_billing_tool) ||
          isEmpty(user.business.customer_offer_customized_type))
        ) {
          return false;
        }
      }
    }
    return true;
  }
  
  const login = async (event) => {
    setError(undefined);
    if (event) {
      event.preventDefault();
    }
    if (user && user.token) {
      return history.push("/dashboard");
    }
    if (email === "") {
      // return setError("You must enter your email.");
      return setError("Email field is required");
    }
    if (password === "") {
      // return setError("You must enter your password");
      return setError("Password field is required");
    }
    setButtonText("Signing in");
    let users = {}, get_notification_response;
    try {
      // let response = await AuthApi.Login({
      let check_response = await AuthApi.UserExists({email, password});
      console.log("check_response = ", check_response);
    } catch (err) {
      if (err.response.status === 401 && err.response.statusText === "Unauthorized") {
        await AuthApi.ResendActivation({email});
        setButtonText("Sign in");
        localStorage.setItem("user", JSON.stringify({email}));
        return history.push(`/authentication/account-verification?email=${encodeURIComponent(email)}`);
      } else {
        console.log(err);
        setButtonText("Sign in");
        if (err.response.data.message) {
          return setError(err.response.data.message);
        }
      }
      return setError("There has been an error.");
    }
    
    try {
      let login_response = await AuthApi.CreateToken({email, password});
      console.log("login_response = ", login_response);

      users.token = login_response.data;
    } catch (err) {
      console.log(err);
      setButtonText("Sign in");
      return setError("There has been an error.");
    }
    
    try {
      let load_response = await AuthApi.LoadUser({ token: users.token.access });
      console.log("load_response = ", load_response);

      // users = { ...load_response.data, token: users.token, };
      users = { ...users, ...load_response.data, };
    } catch (err) {
      console.log(err);
      setButtonText("Sign in");
      return setError("There has been an error.");
    }

    try {
      let get_business_response = await AuthApi.UsersBusiness({ token: users.token.access }, { user_id: users.id });
      console.log("get_business_response response = ", get_business_response);

      // let arrBusiness = [];
      // get_business_response.data.forEach((business) => {
      //   arrBusiness.push(business);
      // });
      // // users = { ...load_response.data, business: arrBusiness, token: users.token, };
      // users = { ...users, business: arrBusiness, };
      // users = { ...users, business: get_business_response.data[0], };
      users = { ...users, business: get_business_response.data.length !== 0 ? get_business_response.data[0] : {}, };
    } catch (err) {
      console.log(err);
      setButtonText("Sign in");
      return setError("There has been an error.");
    }

    // console.log("users before = ", JSON.stringify(users, null, 2));

    // used

    if (users.business && Object.keys(users.business).length !== 0 && Object.getPrototypeOf(users.business) === Object.prototype) {
      try {
        get_notification_response = await AuthApi.UsersNotification({ token: users.token.access }, { business_id: users.business.id });
        console.log("get_notification_response response = ", get_notification_response);

        users = { ...users, business: {...users.business, ...get_notification_response.data}, };
      } catch (err) {
        console.log(err);
        setButtonText("Sign in");
        return setError("There has been an error.");
      }
    }

    // used

    // try {
    //   // let get_notification_response = await AuthApi.UsersNotification({ token: users.token.access }, { user_id: users.id });
    //   // let get_notification_response = await AuthApi.UsersNotification({ token: users.token.access }, { business_id: users.business[0].id });
    //   // console.log("get_notification_response response = ", get_notification_response);
      
    //   // users = { ...users, ...get_notification_response.data, };
      
    //   users.business.forEach(async (business, index, current_users) => {
    //     console.log("business in map = ", business)
    //     console.log("index in map = ", index)
    //     let get_notification_response = await AuthApi.UsersNotification({ token: users.token.access }, { business_id: business.id });
    //     console.log("get_notification_response response = ", get_notification_response);

    //     // console.log("users business by index = ", JSON.stringify(users.business[index], null, 2));
    //     console.log("users business by index before = ", JSON.stringify(current_users[index], null, 2));

    //     // let current_users = {...users};
    //     // current_users.business[index] = {...get_notification_response.data};
    //     // users = {...current_users};
    //     // users.business[index] = {...get_notification_response.data};
    //     current_users[index] = {...get_notification_response.data};

    //     // console.log("users business by index after = ", JSON.stringify(users.business[index], null, 2));
    //     console.log("users business by index after = ", JSON.stringify(current_users[index], null, 2));
    //   });

    //   console.log("users after = ", JSON.stringify(users, null, 2));
    // } catch (err) {
    //   console.log(err);
    //   setButtonText("Sign in");
    //   return setError("There has been an error.");
    // }

    // users.business.forEach((business, index, current_users) => {
    //   try {
    //     get_notification_response = AuthApi.UsersNotification({ token: users.token.access }, { business_id: business.id });
    //     console.log("get_notification_response response = ", get_notification_response);

    //     // console.log("users business by index = ", JSON.stringify(users.business[index], null, 2));
    //     console.log("users business by index before = ", JSON.stringify(current_users[index], null, 2));
        
    //     Promise.all([get_notification_response]).then((values) => {
    //       // console.log("values in Promise = ", JSON.stringify(values, null, 2));
    //       console.log("values data = ", values[0].data);
    //       current_users[index] = { ...current_users[index], ...values[0].data, };
    //     }).catch((error) => {
    //       console.error(error.message);
    //     });
        
        

    //     // let current_users = {...users};
    //     // current_users.business[index] = {...get_notification_response.data};
    //     // users = {...current_users};
    //     // users.business[index] = {...get_notification_response.data};

    //     // current_users[index] = { ...current_users[index], ...get_notification_response.data, };

    //     // console.log("users business by index after = ", JSON.stringify(users.business[index], null, 2));
    //     console.log("users business by index after = ", JSON.stringify(current_users[index], null, 2));

    //     // return await setProfile(users);
    //   } catch (err) {
    //     console.log(err);
    //     setButtonText("Sign in");
    //     return setError("There has been an error.");
    //   }
    // });

    // console.log("users after = ", JSON.stringify(users, null, 2));

    // try {
    //   let get_notification_response = await AuthApi.UsersNotification({ token: users.token.access }, { user_id: users.id });
    //   console.log("get_notification_response response = ", get_notification_response);
      
    //   users = { ...users, ...get_notification_response.data, };
    // } catch (err) {
    //   console.log(err);
    //   setButtonText("Sign in");
    //   return setError("There has been an error.");
    // }
    
    // let isSurveyComplete = !(isEmpty(users.first_name) || isEmpty(users.last_name) || isEmpty(users.country) || 
    //       isEmpty(users.phone_number) && (users.business.length === 0 || users.business.length !== 0 && (
    //         isEmpty(users.business[0].name) ||
    //         isEmpty(users.business[0].industry) ||
    //         isEmpty(users.business[0].describe) ||
    //         isEmpty(users.business[0].base_currency) ||
    //         isEmpty(users.business[0].estimated_revenue) ||
    //         isEmpty(users.business[0].time_completed_service) ||
    //         isEmpty(users.business[0].customer_billing_tool) ||
    //         isEmpty(users.business[0].customer_offer_customized_type)
    //     )));

    // Promise.all([get_notification_response]).then(() => {
      // console.log("users in Promise = ", JSON.stringify(users, null, 2));

      // const GetBusiness = async () => {
      let isSurveyComplete;
      try {
        let business_response = await ActionsApi.GetBusiness({ token: users.token.access, id: users.id });
        console.log("business_response response = ", business_response);

        if (business_response.data.length <= 1) {
          isSurveyComplete = checkCompletionSurvey(users);
        } else {
          isSurveyComplete = true;
        }

      //   get_notification_response = await AuthApi.UsersNotification({ token: users.token.access }, { business_id: users.business.id });
      //     console.log("get_notification_response response = ", get_notification_response);
  
      //     users = { ...users, business: {...users.business, ...get_notification_response.data}, };
  
      //   Promise.all([business_response]).then((values) => {
      //     // console.log("values in Promise = ", JSON.stringify(values, null, 2));
      //     console.log("values in Promise = ", values);
      // //     // console.log("values data = ", values[0].data);
      // //     // current_users[index] = { ...current_users[index], ...values[0].data, };
  
      //   // if (values[0].data.length <= 1) {
      //   //   isSurveyComplete = checkCompletionSurvey(user);
      //   // } else {
      //   //   isSurveyComplete = true;
      //   // }
      //   }).catch((error) => {
      //     console.error(error.message);
      //   });
  
        // return business_response;
  
        // if (business_response.data.length <= 1) {
        //   // isSurveyComplete = checkCompletionSurvey(user);
        //   console.log("checkCompletionSurvey = ", checkCompletionSurvey(user));
        //   setIsSurveyComplete(checkCompletionSurvey(user));
        // } else {
        //   // isSurveyComplete = true;
        //   setIsSurveyComplete(true);
        // }
    
        // console.log("users business by index = ", JSON.stringify(users.business[index], null, 2));
        // console.log("users business by index before = ", JSON.stringify(current_users[index], null, 2));
        
        // Promise.all([business_response]).then((values) => {
        //     // console.log("values in Promise = ", JSON.stringify(values, null, 2));
        //     console.log("values in Promise = ", values);
        // //     // console.log("values data = ", values[0].data);
        // //     // current_users[index] = { ...current_users[index], ...values[0].data, };
        //   if (values[0].data.length <= 1) {
        //     isSurveyComplete = checkCompletionSurvey(user);
        //   } else {
        //     isSurveyComplete = true;
        //   }
        // }).catch((error) => {
        //   console.error(error.message);
        // });
      } catch (err) {
        console.log(err);
        setButtonText("Sign in");
        return setError("There has been an error.");
      }

      // let isSurveyComplete = checkCompletionSurvey(users);
      users = JSON.stringify(users);
      setUser(users);
      localStorage.setItem("user", users);
      console.log("isSurveyComplete Sign-In = ", isSurveyComplete)
      return history.push(!isSurveyComplete ? "/survey" : "/dashboard");
    // });

    // await setProfile(users);
  };

  // const setProfile = async (user) => {
  //   let isSurveyComplete = checkCompletionSurvey(user);
  //   user = JSON.stringify(user);
  //   setUser(user);
  //   localStorage.setItem("user", user);
  //   console.log("isSurveyComplete Sign-In = ", isSurveyComplete)
  //   return history.push(!isSurveyComplete ? "/survey" : "/dashboard");
  // };

  return (
    <CoverLayout
      // title="Flask React Soft Dashboard"
      // description={`${user && user.token ? "" : "Enter your email and password to sign in"}`}
      title="Log in to InvoiceBooks"
      description={user && user.token ? "" : "Please enter your email and password to log in"}
      image={curved9}
    >
      {user && user.token ? (
        <div>
          <h3 style={{ textAlign: "center" }}>You are already signed in.</h3>
          <SuiBox mt={4} mb={1}>
            <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={login}>
              {`Let's go`}
            </SuiButton>
          </SuiBox>
        </div>
      ) : (
        <SuiBox component="form" role="form" customClass={classes.form}>
          {/* <SuiBox mb={2}>
            <Socials />
          </SuiBox>
          <Separator /> */}
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Email
              </SuiTypography>
            </SuiBox>
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
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Password
              </SuiTypography>
            </SuiBox>
            <SuiInput
              defaultValue={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(undefined);
              }}
              type="password"
              placeholder="Password"
            />
          </SuiBox>
          <SuiBox display="flex" alignItems="center">
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <SuiTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              customClass="cursor-pointer user-select-none"
            >
              &nbsp;&nbsp;Remember me
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
              {error}
            </h6>
          </SuiBox>

          <SuiBox mt={4} mb={1}>
            <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={login}>
              {buttonText}
            </SuiButton>
          </SuiBox>
          <SuiBox mt={3} style={{ display: "flex", justifyContent: "space-between", }}>
            <SuiTypography
              component={Link}
              to="/authentication/forgot-password"
              variant="button"
              textColor="info"
              fontWeight="medium"
            >
              Forgot Your Password?
            </SuiTypography>
            <SuiTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              textColor="info"
              fontWeight="medium"
            >
              Can&apos;t Log In?
            </SuiTypography>
          </SuiBox>
          <SuiBox mt={3} textAlign="center">
            <SuiTypography variant="button" textColor="text" fontWeight="regular">
              Don&apos;t have an account?{" "}
              <SuiTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                textColor="info"
                fontWeight="medium"
                // textGradient
              >
                Sign up
              </SuiTypography>
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      )}
    </CoverLayout>
  );
}

export default SignIn;
