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
  useParams,
  // useLocation,
} from "react-router-dom";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import { AuthContext } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";

function ResetPassword() {
  const history = useHistory();
  const { uid, token } = useParams();
  const email = JSON.parse(localStorage.getItem("user")).email;
  // const useQuery = () => new URLSearchParams(useLocation().search);
  // const token = useQuery().get("token");
  const { setUser } = useContext(AuthContext);

  console.log("history in ResetPassword = ", history);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState({});
  const [error, setError] = useState(undefined);

  console.log("error in ResetPassword = ", error);
  console.log("validation in ResetPassword = ", validation);

  function isEmpty(value) {
    return value == null || value.length === 0;
  }

  function checkCompletionSurvey(user) {
    if (isEmpty(user.first_name) || isEmpty(user.last_name) || isEmpty(user.country) || isEmpty(user.phone_number)) {
      return false;
    } else {
      if (user.business && Object.keys(user.business).length === 0 && Object.getPrototypeOf(user.business) === Object.prototype) {
        return false;
      } else {
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
  
  const reset = async (event) => {
    setValidation({});
    setError(undefined);
    if (event) {
      event.preventDefault();
    }
    try {
      await AuthApi.ResetPassword({uid, token, new_password: password, re_new_password: confirmPassword});
    } catch (err) {
      console.log(err);
      if (err.response) {
        return setValidation(err.response.data);
      }
      return setError("There has been an error.");
    }

    let users = {}, load_response;
    try {
      let get_response = await AuthApi.GenerateToken({email});
      console.log("get_response = ", get_response);

      users = get_response.data;
    } catch (err) {
      console.log(err);
      return setError("There has been an error.");
    }
    
    try {
      load_response = await AuthApi.LoadUser({
        token: users.token.access
      });
      console.log("load_response = ", load_response);

      users = { ...load_response.data, token: users.token, };
    } catch (err) {
      console.log(err);
      return setError("There has been an error.");
    }

    try {
      let get_business_response = await AuthApi.UsersBusiness({ token: users.token.access }, { user_id: users.id });
      console.log("get_business_response response = ", get_business_response);

      users = { ...users, business: get_business_response.data.length !== 0 ? get_business_response.data[0] : {}, };
    } catch (err) {
      console.log(err);
      return setError("There has been an error.");
    }

    if (users.business && Object.keys(users.business).length !== 0 && Object.getPrototypeOf(users.business) === Object.prototype) {
      try {
        let get_notification_response = await AuthApi.UsersNotification({ token: users.token.access }, { business_id: users.business.id });
        console.log("get_notification_response response = ", get_notification_response);
  
        users = { ...users, business: {...users.business, ...get_notification_response.data}, };
      } catch (err) {
        console.log(err);
        return setError("There has been an error.");
      }
    }
    
    // try {
    //   let get_business_response = await AuthApi.UsersBusiness({ token: users.token.access }, { user_id: users.id });
    //   console.log("get_business_response response = ", get_business_response);

    //   let arrBusiness = [];
    //   get_business_response.data.forEach((business) => {
    //     arrBusiness.push(business);
    //   });
    //   users = { ...load_response.data, business: arrBusiness, token: users.token, };
    // } catch (err) {
    //   console.log(err);
    //   return setError("There has been an error.");
    // }

    // let isSurveyComplete = !(users.first_name || users.last_name || users.country || 
    //                           users.phone_number || users.business.length === 0 || 
    //                           (users.business.length === 1 && 
    //                             users.business[0].name ||
    //                             users.business[0].industry || 
    //                             users.business[0].describe ||
    //                             users.business[0].base_currency ||
    //                             users.business[0].estimated_revenue ||
    //                             users.business[0].time_completed_service ||
    //                             users.business[0].customer_billing_tool ||
    //                             users.business[0].customer_offer_customized_type
    //                           )
    //                         );
                            
    let isSurveyComplete = checkCompletionSurvey(users);
    users = JSON.stringify(users);
    setUser(users);
    localStorage.setItem("user", users);
    return history.push(!isSurveyComplete ? "/survey" : "/dashboard");
  };

  return (
    <CoverLayout
      title="Enter Your New Password"
      image={curved9}
    >
      <SuiBox component="form" role="form">
        <SuiBox mb={2}>
          <SuiInput
            error={"new_password" in validation || "non_field_errors" in validation}
            defaultValue={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError(undefined);
              setValidation({});
            }}
            type="password"
            placeholder="Password"
          />
          {"new_password" in validation &&
            validation.new_password.map((message, index) => {
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
                  {index !== validation.new_password.length - 1 && <br/>}
                </>
              )
            })
          }
        </SuiBox>
        <SuiBox mb={2}>
          <SuiInput
            error={"re_new_password" in validation || "non_field_errors" in validation}
            defaultValue={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setError(undefined);
              setValidation({});
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
              : "non_field_errors" in validation ?
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
              : "token" in validation &&
              validation.token.map((message, index) => (
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
          <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={reset}>
            Reset and Login
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
  );
}

export default ResetPassword;
