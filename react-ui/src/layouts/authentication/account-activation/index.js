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
  useContext,
} from "react";

// react-router-dom components
import {
  useHistory,
  useParams,
} from "react-router-dom";

// Soft UI Dashboard React components
// import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import { AuthContext } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";

function AccountActivation() {
  const history = useHistory();
  const { uid, token } = useParams();
  const email = JSON.parse(localStorage.getItem("user")).email;
  const { setUser } = useContext(AuthContext);
  
  console.log("history in AccountActivation = ", history);
  
  try {
    AuthApi.AccountActivation({uid, token});
  } catch (err) {
    console.log(err);
  }

  function isEmpty(value) {
    return value == null || value.length === 0;
  }

  // function checkCompletionSurvey(user) {
  //   // let isSurveyComplete = !(isEmpty(users.first_name) || isEmpty(users.last_name) || isEmpty(users.country) || 
  //   //       isEmpty(users.phone_number) && (users.business.length === 0 || users.business.length !== 0 && (
  //   //         isEmpty(users.business[0].name) ||
  //   //         isEmpty(users.business[0].industry) ||
  //   //         isEmpty(users.business[0].describe) ||
  //   //         isEmpty(users.business[0].base_currency) ||
  //   //         isEmpty(users.business[0].estimated_revenue) ||
  //   //         isEmpty(users.business[0].time_completed_service) ||
  //   //         isEmpty(users.business[0].customer_billing_tool) ||
  //   //         isEmpty(users.business[0].customer_offer_customized_type)
  //   //     )));
  //   // let complete;
  //   if (isEmpty(user.first_name) || isEmpty(user.last_name) || isEmpty(user.country) || isEmpty(user.phone_number)) {
  //     return false;
  //   } else {
  //     if (user.business.length === 0) {
  //       return false;
  //     } else {
  //       if (user.business.length !== 0 && (
  //         isEmpty(user.business.name) ||
  //         isEmpty(user.business.industry) ||
  //         isEmpty(user.business.describe) ||
  //         isEmpty(user.business.base_currency) ||
  //         isEmpty(user.business.estimated_revenue) ||
  //         isEmpty(user.business.time_completed_service) ||
  //         isEmpty(user.business.customer_billing_tool) ||
  //         isEmpty(user.business.customer_offer_customized_type)
  //       )) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }

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

  const login = async (event) => {
    if (event) {
      event.preventDefault();
    }

    let users = {};

    try {
      // let get_response = await AuthApi.LoginUserData({email});
      let get_response = await AuthApi.GenerateToken({email});
      console.log("get_response = ", get_response);

      users = get_response.data;
    } catch (err) {
      console.log(err);
    }

    let token = users.token.access;
    
    try {
      let load_response = await AuthApi.LoadUser({token});
      console.log("load_response = ", load_response);

      users = { ...users, ...load_response.data, };
    } catch (err) {
      console.log(err);
    }

    try {
      let get_business_response = await AuthApi.UsersBusiness({ token: users.token.access }, { user_id: users.id });
      console.log("get_business_response response = ", get_business_response);

      users = { ...users, business: get_business_response.data.length !== 0 ? get_business_response.data[0] : {}, };
    } catch (err) {
      console.log(err);
    }

    if (users.business && Object.keys(users.business).length !== 0 && Object.getPrototypeOf(users.business) === Object.prototype) {
      try {
        let get_notification_response = await AuthApi.UsersNotification({ token: users.token.access }, { business_id: users.business.id });
        console.log("get_notification_response response = ", get_notification_response);
  
        users = { ...users, business: {...users.business, ...get_notification_response.data}, };
      } catch (err) {
        console.log(err);
      }
    }

    // let user_id = users.id;
    
    // try {
    //   let get_notification_response = await AuthApi.UsersNotification({token}, {user_id});
    //   console.log("get_notification_response response = ", get_notification_response);
      
    //   users = { ...users, ...get_notification_response.data, };
    // } catch (err) {
    //   console.log(err);
    // }
    
    // try {
    //   let get_business_response = await AuthApi.UsersBusiness({ token: users.token.access }, { user_id: users.id });
    //   console.log("get_business_response response = ", get_business_response);

    //   let arrBusiness = [];
    //   get_business_response.data.forEach((business) => {
    //     arrBusiness.push(business);
    //   });
    //   // users = { ...load_response.data, business: arrBusiness, token: users.token, };
    //   users = { ...users, business: arrBusiness, };
    // } catch (err) {
    //   console.log(err);
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

    let isSurveyComplete = checkCompletionSurvey(users);
    users = JSON.stringify(users);
    setUser(users);
    localStorage.setItem("user", users);
    return history.push(!isSurveyComplete ? "/survey" : "/dashboard");
    // return history.push("/survey");
  };

  return (
    <CoverLayout
      title="Your email has been verified"
      image={curved9}
    >
      <SuiTypography mb={4.5} variant="body2" fontWeight="regular" textColor="text" style={{ fontSize: 14, }}>
        You can now sign in with your account
      </SuiTypography>
      <SuiButton variant="gradient" buttonColor="info" fullWidth onClick={login}>
        Go to dashboard
      </SuiButton>
    </CoverLayout>
  );
}

export default AccountActivation;
