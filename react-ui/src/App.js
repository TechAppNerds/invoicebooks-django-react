/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import {
  // useContext,
  useState,
  // useEffect,
  // useMemo,
} from "react";

// react-router components
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  // useLocation,
  // useHistory,
} from "react-router-dom";

import { SoftUIControllerProvider } from "context";

// import { useAuth } from "auth-context/auth.context";
import { AuthContext } from "auth-context/auth.context";
// import AuthApi from "api/auth";
// import ActionsApi from "api/actions";

// jss components
// import { create } from "jss";

// jss-rtl components
// import rtl from "jss-rtl";

// @mui style components
// import { StylesProvider, jssPreset } from "@mui/styles";

// @mui material components
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
// import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
// import SuiBox from "components/SuiBox";

// Soft UI Dashboard PRO React example components
import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// Soft UI Dashboard PRO React routes
import routes from "routes";

// Soft UI Dashboard PRO React contexts
// import { useSoftUIController } from "context";
// import { SoftUI } from "context";
// import { SoftUI1 } from "context";

// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

import { ProtectedRoute } from "./ProtectedRoute";

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import VirtualReality from "layouts/virtual-reality";
// import RTL from "layouts/rtl";
// import Profile from "layouts/profile";
import Clients from "layouts/clients";
import ItemsServices from "layouts/items-services";
import SalesTaxes from "layouts/sales-taxes";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SignOut from "layouts/authentication/sign-out";
import AccountVerification from "layouts/authentication/account-verification";
// import ActivateAccount from "layouts/authentication/activate-account";
import AccountActivation from "layouts/authentication/account-activation";
import ForgotPassword from "layouts/authentication/forgot-password";
import ResetPassword from "layouts/authentication/reset-password";

import Survey from "layouts/survey";
// import ProfileSurvey from "layouts/survey/profile";
// import BusinessSurvey from "layouts/survey/business";
import Settings from "layouts/settings";
import ClientsForm from "layouts/clients/form";
import ClientsDetails from "layouts/clients/detail";
import InvoicesForm from "layouts/invoices/form";
import Invoices from "layouts/invoices";
import Vendors from "layouts/vendors";
import VendorsForm from "layouts/vendors/form";
import VendorsDetails from "layouts/vendors/detail";

// console.log("App ClientsDetails!")

export default function App() {
  // const { controller, dispatch } = useSoftUIController();
  // const [controller, dispatch] = useSoftUIController();
  // const [controller, dispatch] = useContext(SoftUI);
  // const [controller, dispatch] = useContext(SoftUI1);
  // const { controller, dispatch } = useContext(SoftUI1);
  // console.log("controller = ",controller);
  // const initialState = {
  //   miniSidenav: false,
  //   transparentSidenav: true,
  //   sidenavColor: "info",
  //   transparentNavbar: true,
  //   fixedNavbar: true,
  //   openConfigurator: false,
  //   direction: "ltr",
  //   layout: "dashboard",
  // };
  // const { direction, layout, openConfigurator } = controller;
  // const direction = "ltr";
  // const layout = "dashboard";

  // const { controller } = useSoftUIController();
  // const { direction, layout } = controller;

  // const route = useLocation().pathname.split("/").slice(1);


  
  // const openConfigurator = false;
  // const [rtlCache, setRtlCache] = useState(null);
  // const { pathname } = useLocation();
  // const history = useHistory();
  // console.log("history in App js = ", history);
  // console.log("route in App js = ", route);
  const { pathname } = window.location;
  const route = pathname.split("/").slice(1);

//   <ProtectedRoute path="/invoices/new" key="invoices-new">
// <ProtectedRoute path="/invoices/:invoice_id/edit" key="invoices-edit"></ProtectedRoute>
  
  console.log("window location pathname in App js = ", pathname);
  console.log("route in App js = ", route);

  // if (pathname === "/invoices/new" || pathname === "/invoices/:invoice_id/edit") {
  //   history.push({
  //     pathname: rest.path,
  //     state: {
  //       allClients: await InitClients(),
  //       allInvoices: await InitInvoices(),
  //       // invoice,
  //       // client: Clients[Clients.findIndex(client => client.id == invoice.client_id)],
  //     }
  //   });
  // }
  
  // JSS presets for the rtl
  // const jss = create({
  //   plugins: [...jssPreset().plugins, rtl()],
  // });

  // Cache for the rtl
  // useMemo(() => {
  //   const cacheRtl = createCache({
  //     key: "rtl",
  //     // key: direction,
  //     prepend: true,
  //     stylisPlugins: [rtlPlugin],
  //   });

  //   setRtlCache(cacheRtl);
  // }, []);

  // Change the openConfigurator state
  // const handleConfiguratorOpen = () => {
  //   dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
  // };

  // Setting the dir attribute for the body element
  // useEffect(() => {
  //   document.body.setAttribute("dir", direction);
  // }, [direction]);

  // Setting page scroll to 0 when changing the route
  // useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  // }, [pathname]);

  // const getRoutes = (allRoutes) =>
  //   allRoutes.map((route) => {
  //     // console.log("route = ", route);
  //     if (route.collapse) {
  //       // console.log("recursive")
  //       return getRoutes(route.collapse);
  //     }

  //     if (route.route) {
  //       if (route.protected) {
  //         // console.log("ProtectedRoute")
  //         return <ProtectedRoute path={route.route} component={route.component} key={route.key} />;
  //       }
  //       // console.log("Route")
  //       return <Route exact path={route.route} component={route.component} key={route.key} />;
  //     }

  //     return null;
  //   });

  // const configsButton = (
  //   <SuiBox
  //     display="flex"
  //     justifyContent="center"
  //     alignItems="center"
  //     width="3.5rem"
  //     height="3.5rem"
  //     backgroundColor="white"
  //     boxShadow="sm"
  //     borderRadius="50%"
  //     position="fixed"
  //     right="2rem"
  //     bottom="2rem"
  //     zIndex={99}
  //     customClass="cursor-pointer"
  //     // onClick={handleConfiguratorOpen}
  //   >
  //     <Icon className=" text-dark" fontSize="default">
  //       settings
  //     </Icon>
  //   </SuiBox>
  // );

  // // let user = JSON.parse(localStorage.getItem("user"));

  // let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // user = typeof user === "string" ? JSON.parse(user) : user;

  // // const initUser = async () => {
  // //   let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // //   user = typeof user === "string" ? JSON.parse(user) : user;

  // // };

  // // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  // // const users = useMemo(() => ({ user, setUser }), [user, setUser]);

  // const users = { user, setUser };

  // console.log("user in App js = ", user);

  

  // const [allInvoices, setAllInvoices] = useState([]);
  // const [allClients, setAllClients] = useState([]);

  

  // let user = JSON.parse(localStorage.getItem("user"));

  // let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  user = typeof user === "string" ? JSON.parse(user) : user;

  // const initUser = async () => {
  //   let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  //   user = typeof user === "string" ? JSON.parse(user) : user;

  // };

  // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  // const users = useMemo(() => ({ user, setUser }), [user, setUser]);

  const users = { user, setUser };

  console.log("user in App js = ", user);

  // useEffect(() => {
  //   Promise.all([TokenValidation])
  //     .then(() => {
  //       console.log("isTokenValid promise 1 then = ", isTokenValid)
  //       if (isTokenValid) {
  //         initUser();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error.message);
  //     });
  // }, []);

  // let allInvoices, allClients;

  // const [allInvoice, setAllInvoice] = useState([]);
  // const [allClient, setAllClient] = useState([]);

  // console.log("allInvoice App js = ", allInvoice);
  // console.log("allClient App js = ", allClient);

  if (route[0] === 'invoices' && route.length > 1) {
    
    // useEffect(() => {
      // const token = user.token.access;
      // const business_id = user.business.id;
      // let isTokenValid;

      // // console.log("isTokenValid = ", isTokenValid)

      // const TokenValidation = async () => {
      //   let validation_response;
      //   try {
      //     validation_response = await AuthApi.TokenValidation({ token: user.token.access });
      //     console.log("response of AccessTokenValidation = ", validation_response);
      //     isTokenValid = true;
      //   } catch (err) {
      //     console.log(err);
      //     console.log("error response of AccessTokenValidation = ", err.response);
      //     validation_response = err.response;
      //   }
      //   if (validation_response.data.code === "token_not_valid" && validation_response.status === 401 && validation_response.statusText === "Unauthorized") {
      //     try {
      //       let get_response = await AuthApi.NewAccessToken({ refresh: user.token.refresh });
      //       console.log("response of NewAccessToken = ", get_response);

      //       let new_user = { ...user };
      //       new_user.token.access = get_response.data.access;
      //       new_user = JSON.stringify(new_user);
      //       setUser(new_user);
      //       localStorage.setItem("user", new_user);
      //       isTokenValid = true;
      //     } catch (err) {
      //       console.log(err);
      //       console.log("error response of NewAccessToken = ", err.response);
      //       if (err.response && err.response.data.code === "token_not_valid" && err.response.status === 401 && err.response.statusText === "Unauthorized") {
      //         isTokenValid = false;
      //         // AuthApi.Logout(user);
      //         // setUser(null);
      //         // localStorage.removeItem("user");
      //         // return <Redirect to="/authentication/sign-in" />;
      //       }
      //     }
      //   }
      // };

      // const InitInvoices = async () => {
      //   try {
      //     let invoices_response = await ActionsApi.GetInvoices({ token }, { business_id });
      //     console.log("invoices_response App js response = ", invoices_response);
  
      //     // return [...invoices_response.data];
      //     // setAllInvoices([...invoices_response.data]);
  
      //     let invoiceData = [...invoices_response.data];
      //     setAllInvoice(invoiceData);
  
      //     // if (invoice_id !== undefined) {
      //     //   let invoice = invoiceData[invoiceData.findIndex(invoice => invoice.id == invoice_id)];
      //     //   invoice.issued_date = formatToDate(invoice.issued_date);
      //     //   invoice.due_date = formatToDate(invoice.due_date);
      //     //   setInvoice(invoice);
      //     //   // setInvoice(allInvoices[allInvoices.findIndex(invoice => invoice.id == invoice_id)]);
      //     // } else {
      //     //   // let num = Math.max(...allInvoices.map(invoice => parseInt(invoice.number)));
      //     //   // console.log("max in initInvoices = ", num)
      //     //   // setInvoice({
      //     //   //   issued_date: dateFormat(new Date()),
      //     //   //   due_date: dateFormat(new Date()),
      //     //   //   reference: "",
      //     //   //   number: ("0000000" + (num + 1)).slice(-"0000000".length),
      //     //   //   amount: Number(0).toFixed(2),
      //     //   //   business_id,
      //     //   //   client_id,
      //     //   // });
      //     //   let num = Math.max(...invoiceData.map(invoice => parseInt(invoice.number)));
      //     //   let today = new Date();
      //     //   let month = today.getMonth();
      
      //     //   setInvoice({
      //     //     // issued_date: dateFormat(today),
      //     //     issued_date: new Date(),
      //     //     // due_date: dateFormat(new Date(today.setMonth(month + 1))),
      //     //     due_date: new Date(today.setMonth(month + 1)),
      //     //     reference: "",
      //     //     number: ("0000000" + (num + 1)).slice(-"0000000".length),
      //     //     amount: Number(0).toFixed(2),
      //     //     notes: "",
      //     //     terms: "",
      //     //     online_payments: false,
      //     //     recurring: false,
      //     //     business_id,
      //     //     // client_id,
      //     //   });
      //     // }
      //   } catch (err) {
      //     console.log(err);
      //   }
      // };
  
      // const InitClients = async () => {
      //   try {
      //     let clients_response = await ActionsApi.GetClients({ token }, { business_id });
      //     console.log("clients_response App js response = ", clients_response);
  
      //     // return [...clients_response.data];
      //     // setAllClients([...clients_response.data]);
          
      //     let clientData = [...clients_response.data];
      //     setAllClient(clientData);
  
      //     // console.log("invoice inside InitClients = ", JSON.stringify(invoice, null, 2));
  
      //     // if (client_id !== undefined) {
      //     //   // setClient(clientData[clientData.findIndex(client => client.id == client_id)]);
      //     //   setClient(allClients[allClients.findIndex(client => client.id == client_id)]);
      //     // } else {
      //     //   setClient({
      //     //     send_payment_reminders: false,
      //     //     charge_late_fees: false,
      //     //     percentage_invoice_value: false,
      //     //     percentage_outstanding_balance: false,
      //     //     flat_fee: false,
      //     //     late_fee_amount: 0,
      //     //     number_days: 0,
      //     //     // currency: currencyOptions[0],
      //     //     currency: user.business.base_currency,
      //     //     language: languageOptions[0],
      //     //     invoice_attachments: false,
      //     //     business_id,
      //     //   });
      //     // }
      //     // if (invoice_id !== undefined) {
      //     //   // let client = allClients[allClients.findIndex(client => client.id == invoice.client_id)];
      //     //   let client = clientData[clientData.findIndex(client => client.id == invoice.client_id)];
      //     //   setClient(client);
      //     // }
      //   } catch (err) {
      //     console.log(err);
      //   }
      // };
      
      // Promise.all([TokenValidation()])
      //   .then(() => {
      //     console.log("isTokenValid App js promise then = ", isTokenValid)
      //     if (isTokenValid) {
      //       // if (!("allClients" in history.location.state)) {
      //       //   allClients = await InitClients();
      //       // }
      //       // if (!("allInvoices" in history.location.state)) {
      //       //   allInvoices = await InitInvoices();
      //       // }
      //       // await InitInvoices();
      //       // await InitClients();
      //       // InitData();
      //       // await setInvoice(InitInvoice());
      //       // await setClient(InitClient());
      //       InitInvoices();
      //       InitClients();
  
      //       // allClients = InitClients();
      //       // allInvoices = InitInvoices();
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error.message);
      //   });
    // }, []);
  

    // let isTokenValid;

    // console.log("isTokenValid = ", isTokenValid)

    // const TokenValidation = async () => {
    //   let validation_response;
    //   try {
    //     validation_response = await AuthApi.TokenValidation({ token: user.token.access });
    //     console.log("response of AccessTokenValidation = ", validation_response);
    //     isTokenValid = true;
    //   } catch (err) {
    //     console.log(err);
    //     console.log("error response of AccessTokenValidation = ", err.response);
    //     validation_response = err.response;
    //   }
    //   if (validation_response.data.code === "token_not_valid" && validation_response.status === 401 && validation_response.statusText === "Unauthorized") {
    //     try {
    //       let get_response = await AuthApi.NewAccessToken({ refresh: user.token.refresh });
    //       console.log("response of NewAccessToken = ", get_response);

    //       let new_user = { ...user };
    //       new_user.token.access = get_response.data.access;
    //       new_user = JSON.stringify(new_user);
    //       setUser(new_user);
    //       localStorage.setItem("user", new_user);
    //       isTokenValid = true;
    //     } catch (err) {
    //       console.log(err);
    //       console.log("error response of NewAccessToken = ", err.response);
    //       if (err.response && err.response.data.code === "token_not_valid" && err.response.status === 401 && err.response.statusText === "Unauthorized") {
    //         isTokenValid = false;
    //         // AuthApi.Logout(user);
    //         // setUser(null);
    //         // localStorage.removeItem("user");
    //         // return <Redirect to="/authentication/sign-in" />;
    //       }
    //     }
    //   }
    // };

    // const token = user.token.access;
    // const business_id = user.business.id;
    
    // const InitInvoices = async () => {
    //   try {
    //     // let invoices_response = await ActionsApi.GetInvoices({ token }, { billed_to });
    //     // let invoices_response = await ActionsApi.GetInvoices({ token }, { client_id });
    //     let invoices_response = await ActionsApi.GetInvoices({ token }, { business_id });
    //     console.log("invoices_response respons in App js = ", invoices_response);

    //     let invoiceData = [...invoices_response.data];
    //     setAllInvoices(invoiceData);
    //     // allInvoices = [...invoices_response.data];
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // const InitClients = async () => {
    //   try {
    //     let clients_response = await ActionsApi.GetClients({ token }, { business_id });
    //     console.log("clients_response response in App js = ", clients_response);

    //     let clientData = [...clients_response.data];
    //     setAllClients(clientData);
    //     // allClients = [...clients_response.data];
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    
    // useEffect(async () => {
    //   Promise.all([await TokenValidation()])
    //     .then(async () => {
    //       console.log("isTokenValid promise then = ", isTokenValid)
    //       if (isTokenValid) {
    //         await InitClients();
    //         await InitInvoices();
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error.message);
    //     });
    // }, []);

    // useEffect(async() => {
      // InitClients();
      // InitInvoices();
    // }, []);
    // try {
    //   // let invoices_response = await ActionsApi.GetInvoices({ token }, { billed_to });
    //   // let invoices_response = await ActionsApi.GetInvoices({ token }, { client_id });
    //   let invoices_response = ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id });
    //   console.log("invoices_response response = ", invoices_response);

    //   allInvoices = [...invoices_response.data];
    //   setAllInvoices(invoiceData);

    //   if (invoice_id !== undefined) {
    //     setInvoice(invoiceData[invoiceData.findIndex(invoice => invoice.id == invoice_id)]);
    //   } else {
    //     // setInvoice({
    //     //   issued_date: "",
    //     //   due_date: "",
    //     //   reference: "",
    //     //   business_id,
    //     //   billed_to,
    //     // });
    //     // setInvoice({
    //     //   issued_date: dateFormat(new Date()),
    //     //   due_date: dateFormat(new Date()),
    //     //   reference: "",

    //     //   business_id,
    //     //   client_id,
    //     // });
          
    //       // return {
    //       //   issued_date: dateFormat(new Date()),
    //       //   due_date: dateFormat(new Date()),
    //       //   reference: "",
    //       //   // number: ("0000000" + (allInvoices.length + 1)).slice(-"0000000".length),
    //       //   Math.max(...a.map(a => parseInt(a.number)))
    //       //   number: ("0000000" + (invoiceData.length + 1)).slice(-"0000000".length),

    //       //   amount: 0.00,
    
    //       //   business_id,
    //       //   client_id,
    //       // };
    //       let maxi = Math.max(...invoiceData.map(a => parseInt(a.number)))
    //       console.log("max in initInvoices = ", maxi)
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }
  

  return (
    <>
      <BrowserRouter>
        <SoftUIControllerProvider>
          <AuthContext.Provider value={users}>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                    {/* {layout === "dashboard" && user && user.token && pathname.split("/")[1] !== "survey" ? (
                      <>
                        <Sidenav routes={routes} />
                        <Configurator />
                        {configsButton}
                      </>
                    ) : layout === "vr" && user && user.token && pathname.split("/")[1] !== "survey" && <Configurator />} */}
                    {/* <>
                      <Sidenav user={user} routes={routes} />
                      <Configurator />
                      {configsButton}
                    </> */}
                    <Switch>
                      {/* {getRoutes(routes)} */}
                      {/* <Redirect to={user && user.token ? !isSurveyComplete ? "/survey/profile" : "/dashboard" : "/authentication/sign-in"} /> */}
                      {/* <Redirect to={user && user.token ? !isSurveyComplete ? "/survey" : "/dashboard" : "/authentication/sign-in"} /> */}
                      {/* <Redirect to={redirect_to} /> */}
                      {/* {
                        user && user.token 
                        ? !isSurveyComplete
                          ? <Redirect to="/survey" />
                          : <Redirect to="/dashboard" />
                        : <Redirect to="/authentication/sign-in" />
                      } */}
                      <Route exact path="/authentication/sign-in" component={SignIn} key="sign-in" />
                      <Route exact path="/authentication/sign-up" component={SignUp} key="sign-up" />
                      <Route exact path="/authentication/account-verification" component={AccountVerification} key="account-verification" />
                      <Route exact path="/authentication/account-activation/:uid/:token" component={AccountActivation} key="account-activation" />
                      {/* <Route exact path="/authentication/activate-account/:uid/:token" component={ActivateAccount} key="activate-account" /> */}
                      {/* <Route exact path="/authentication/forgot-password/" component={ForgotPassword} key="forgot-password" /> */}
                      <Route exact path="/authentication/forgot-password" component={ForgotPassword} key="forgot-password" />
                      {/* <Route path="/authentication/password-reset/:token" component={ResetPassword} key="password-reset" /> */}
                      {/* <Route path="/authentication/password-reset" component={ResetPassword} key="password-reset" /> */}
                      <Route path="/authentication/password-reset/:uid/:token" component={ResetPassword} key="password-reset" />
                      <ProtectedRoute path="/authentication/sign-out" component={SignOut} key="sign-out" />
                      <ProtectedRoute path="/survey" component={Survey} key="survey" />
                      {/* <ProtectedRoute path="/survey/profile" component={ProfileSurvey} key="profile-survey" />
                      <ProtectedRoute path="/survey/business" component={BusinessSurvey} key="business-survey" /> */}
                      <ProtectedRoute path="/dashboard" key="dashboard">
                        <Sidenav routes={routes} />
                        {/* <Configurator />
                        {configsButton} */}
                        <Dashboard />
                      </ProtectedRoute>
                      <ProtectedRoute path="/settings" key="settings">
                        <Sidenav routes={routes} />
                        {/* <Configurator />
                        {configsButton} */}
                        <Settings />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/clients" key="clients">
                        <Sidenav routes={routes} />
                        {/* <Configurator />
                        {configsButton} */}
                        <Clients />
                      </ProtectedRoute>
                      <ProtectedRoute path="/clients/new" key="clients-new">
                        <Sidenav routes={routes} />
                        {/* <Configurator />
                        {configsButton} */}
                        <ClientsForm />
                      </ProtectedRoute>
                      <ProtectedRoute path="/clients/:client_id/edit" key="clients-edit">
                        <Sidenav routes={routes} />
                        {/* <Configurator />
                        {configsButton} */}
                        <ClientsForm />
                      </ProtectedRoute>
                      <ProtectedRoute path="/clients/:client_id" key="clients-detail">
                        <Sidenav routes={routes} />
                        {/* <Configurator />
                        {configsButton} */}
                        <ClientsDetails />
                      </ProtectedRoute>
                      <ProtectedRoute path="/invoices/new" key="invoices-new">
                        {/* <Sidenav routes={routes} /> */}
                        {/* <InvoicesForm /> */}
                        <InvoicesForm
                          // allInvoice={allInvoice}
                          // setAllInvoice={setAllInvoice}
                          // allClient={allClient}
                          // setAllClient={setAllClient}
                        />
                      </ProtectedRoute>
                      <ProtectedRoute path="/invoices/:invoice_id/edit" key="invoices-edit">
                        {/* <Sidenav routes={routes} /> */}
                        <InvoicesForm
                          // allInvoice={allInvoice}
                          // setAllInvoice={setAllInvoice}
                          // allClient={allClient}
                          // setAllClient={setAllClient}
                        />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/invoices" key="invoices">
                        <Sidenav routes={routes} />
                        <Invoices />
                      </ProtectedRoute>
                      <ProtectedRoute path="/items-services" key="items-services">
                        <Sidenav routes={routes} />
                        <ItemsServices />
                      </ProtectedRoute>
                      <ProtectedRoute path="/sales-taxes" key="sales-taxes">
                        <Sidenav routes={routes} />
                        <SalesTaxes />
                      </ProtectedRoute>
                      <ProtectedRoute exact path="/vendors" key="vendors">
                        <Sidenav routes={routes} />
                        <Vendors />
                      </ProtectedRoute>
                      <ProtectedRoute path="/vendors/new" key="vendors-new">
                        <Sidenav routes={routes} />
                        <VendorsForm />
                      </ProtectedRoute>
                      <ProtectedRoute path="/vendors/:vendor_id/edit" key="vendors-edit">
                        <Sidenav routes={routes} />
                        <VendorsForm />
                      </ProtectedRoute>
                      <ProtectedRoute path="/vendors/:vendor_id" key="vendors-detail">
                        <Sidenav routes={routes} />
                        <VendorsDetails />
                      </ProtectedRoute>
                      
                      {/* <Redirect to={user && user.token ? !isSurveyComplete ? "/survey/profile" : "/dashboard" : "/authentication/sign-in"} /> */}
                      {/* <Redirect to={user != null ? !isSurveyComplete ? "/survey" : "/dashboard" : "/authentication/sign-in"} /> */}
                      {/* <Redirect from="*" to={redirect_to} /> */}

                      <Redirect from="*" to="/dashboard" />

                      {/* <Redirect from="/" to="/dashboard" /> */}

                      {/* <Redirect from="*" to={ProtectedRoute} /> */}
                      {/* <Redirect to={user && user.token ? !isSurveyComplete ? "/survey" : "/dashboard" : "/authentication/sign-in"} /> */}
                      {/* <Redirect from="*" to={user && user.token ? !isSurveyComplete ? "/survey" : "/dashboard" : "/authentication/sign-in"} /> */}
                    </Switch>
              </ThemeProvider>
            </StyledEngineProvider>
          </AuthContext.Provider>
        </SoftUIControllerProvider>
      </BrowserRouter>
    </>
  );
}
