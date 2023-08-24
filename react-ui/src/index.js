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

import React from "react";
// import { useState, useMemo } from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
import App from "App";

import * as serviceWorker from './serviceWorker';

// Soft UI Dashboard React Context Provider
// import { SoftUIControllerProvider } from "context";

// import { AuthProvider } from "auth-context/auth.context";
// import { AuthContext } from "auth-context/auth.context";

// import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
// import { StyledEngineProvider } from "@mui/material/styles";

// import { ThemeProvider } from "@mui/styles";

// import CssBaseline from "@mui/material/CssBaseline";

// import theme from "assets/theme";

// Soft UI Dashboard PRO React helper functions
// import boxShadow from "assets/theme/functions/boxShadow";
// import hexToRgb from "assets/theme/functions/hexToRgb";
// import linearGradient from "assets/theme/functions/linearGradient";
// import pxToRem from "assets/theme/functions/pxToRem";
// import rgba from "assets/theme/functions/rgba";


// console.log("theme in index src = ", JSON.stringify(theme, null, 3));

// let user = JSON.parse(localStorage.getItem("user"));

// const [users, setUsers] = useState(user);

// const value = useMemo(() => ({ users, setUsers }), [users, setUsers]);

// ReactDOM.render(
//   <BrowserRouter>
//     <SoftUIControllerProvider>
//       {/* <AuthProvider userData={user}> */}
//       <AuthContext.Provider value={value}>
//         {/* <React.StrictMode> */}
//         <StyledEngineProvider injectFirst>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <App />
//           </ThemeProvider>
//         </StyledEngineProvider>
//         {/* </React.StrictMode> */}
//       </AuthContext.Provider>
//       {/* </AuthProvider> */}
//     </SoftUIControllerProvider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
