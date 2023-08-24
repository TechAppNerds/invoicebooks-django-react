import axios from "./index";

class AuthApi {
  static Login = (data) => {
    // return axios.post(`${base}/login`, data);
    // console.log("data AuthApi Login = ", data);
    return axios.post("auth/login", data);
  };

  static Register = (data) => {
    // return axios.post(`${base}/register`, data);
    // return axios.post("auth/register", data);
    return axios.post("auth/users/", data);
  };

  static Logout = (user) => {
    // return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } });
    // return axios.post("auth/logout", null, { headers: { Authorization: `JWT ${data.token}` } });
    // return axios.post("auth/logout", {refresh: user.token.refresh}, { headers: { Authorization: `JWT ${user.token.access}` } });
    return axios.post("auth/logout", {refresh: user.token.refresh});
  };

  static IsActive = (data) => {
    return axios.post("auth/is-active", data);
  };

  static UserExists = (data) => {
    return axios.post("auth/user-exists", data);
  };

  // static LoginUserData = (data) => {
  //   return axios.post("auth/login-user-data", data);
  // };

  static UserAccess = (data) => {
    return axios.post("auth/user-access", data);
  };

  static GenerateToken = (data) => {
    return axios.post("auth/generate-token", data);
  };

  static CreateToken = (data) => {
    return axios.post("auth/jwt/create/", data);
  };

  static TokenValidation = (data) => {
    return axios.post("auth/jwt/verify/", data);
    // return axios.post("auth/jwt/verify/", data, { headers: { Accept: 'application/json' }});
  };

  static NewAccessToken = (data) => {
    return axios.post("auth/jwt/refresh/", data);
  };

  static LoadUser = (user) => {
    return axios.get("auth/users/me/", { headers: { Authorization: `JWT ${user.token}` }});
  };

  static UsersBusiness = (user, data) => {
    // return axios.post("auth/users-business", data);
    return axios.get(`auth/users-business/${data.user_id}`, { headers: { Authorization: `JWT ${user.token}` }});
  };
  
  // static InitializationNotification = (user, data) => {
  //   return axios.post(`auth/users-notification`, data, { headers: { Authorization: `JWT ${user.token}` }});
  // };

  static InitializationNotification = (data) => {
    return axios.post(`auth/users-notification`, data);
  };

  static UsersNotification = (user, data) => {
    // return axios.get(`auth/users-notification/${data.user_id}`, { headers: { Authorization: `JWT ${user.token}` }});
    return axios.get(`auth/users-notification/${data.business_id}`, { headers: { Authorization: `JWT ${user.token}` }});
  };

  // static ActivateAccount = (data) => {
  static AccountActivation = (data) => {
    return axios.post("auth/users/activation/", data);
  };

  static ResendActivation = (data) => {
    return axios.post("auth/users/resend_activation/", data);
  };

  static ChangePassword = (user, data) => {
    return axios.post("auth/users/set_password/", data, { headers: { Authorization: `JWT ${user.token}` }});
  };

  static ForgotPassword = (data) => {
    // return axios.post("auth/password-reset-email", data);
    // return axios.post("auth/password-reset/", data);
    // return axios.post("auth/forgot-password", data);
    return axios.post("auth/users/reset_password/", data);
  };

  static ResetPassword = (data) => {
    // 'reset_password_url': 'http://localhost:5000/api/auth/password-reset/confirm/?token=b220cebd5df462245ee9af6'
    // return axios.post("auth/password-reset/confirm", data);
    // return axios.post("auth/reset-password", data, { headers: { Authorization: `Token ${data.token}` } });
    return axios.post("auth/users/reset_password_confirm/", data);
  };
}

// let base = "users";

export default AuthApi;
