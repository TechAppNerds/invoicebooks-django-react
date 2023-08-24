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
  useEffect,
  useContext,
} from "react";
import {
  useHistory,
  // Redirect,
} from "react-router-dom";
// import { useAuth } from "../../../auth-context/auth.context";
import { AuthContext } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";

function SignOut() {
  const history = useHistory();
  // const { setUser } = useAuth();
  // let { user } = useAuth();
  const { user, setUser } = useContext(AuthContext);

  // const handleLogout = () => {
  const handleLogout = async () => {
    await AuthApi.Logout(user);
    await setUser(null);
    localStorage.removeItem("user");
    // console.log("user in SignOut = ", JSON.stringify(user, null, 2));
    return history.push("/authentication/sign-in");
    // AuthApi.Logout(user);
    // setUser(null);
    // localStorage.removeItem("user");
    // return <Redirect to="/authentication/sign-in" />;
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
}

export default SignOut;
