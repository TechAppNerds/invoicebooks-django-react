import React, {
  useContext,
  useEffect,
} from "react";

import { 
  Route,
  useHistory,
  Redirect,
  // useRouteMatch,
} from "react-router-dom";

import { AuthContext } from "auth-context/auth.context";
import AuthApi from "api/auth";
import ActionsApi from "api/actions";

// import SweetAlert from "react-bootstrap-sweetalert";

// import Survey from "layouts/survey";


export const ProtectedRoute = ({ ...rest }) => {
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  // const { url } = useRouteMatch();
  // const splitCurrentURL = history.location.pathname.split("/");
  // const currentPath = splitCurrentURL[splitCurrentURL.length - 1];

  // console.log("rest in ProtectedRoute = ", JSON.stringify(rest, null, 2));
  // console.log("rest in ProtectedRoute = ", rest);

  // console.log("user in ProtectedRoute = ", JSON.stringify(user, null, 2));
  console.log("user in ProtectedRoute = ", user);

  // console.log("url in ProtectedRoute = ", url);
  // console.log("splitCurrentURL in ProtectedRoute = ", splitCurrentURL);
  // console.log("currentPath in ProtectedRoute = ", currentPath);

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
          (isEmpty(user.business.name.trim()) ||
          isEmpty(user.business.industry.trim()) ||
          isEmpty(user.business.describe.trim()) ||
          isEmpty(user.business.base_currency.trim()) ||
          isEmpty(user.business.estimated_revenue.trim()) ||
          isEmpty(user.business.time_completed_service.trim()) ||
          isEmpty(user.business.customer_billing_tool.trim()) ||
          isEmpty(user.business.customer_offer_customized_type.trim()))
        ) {
          return false;
        }
      }
    }
    return true;
  }

  if (!user || !user.token || user.token === "") {
    return <Redirect to="/authentication/sign-in" />;
  //   // history.push("/authentication/sign-in");
  //   // return (
  //   //   <SweetAlert
  //   //     title="You must be signed in!"
  //   //     onCancel={() => history.push("/authentication/sign-in")}
  //   //     onConfirm={() => history.push("/authentication/sign-in")}
  //   //     confirmBtnCssClass={"px-5"}
  //   //   />
  //   // );
  } else {
    useEffect(() => {
      let isTokenValid;
      const TokenValidation = async () => {
        try {
          // validation_response = await AuthApi.NewAccessToken({refresh: user.token.refresh});
          let validation_response = await AuthApi.TokenValidation({token: user.token.refresh});
          console.log("response of RefreshTokenValidation = ", validation_response);
          // return validation_response;
          if (validation_response.status === 200 && validation_response.statusText === "OK") {
            await GenerateToken();
          }
          console.log("isTokenValid in TokenValidation = ", isTokenValid);
        } catch (err) {
          console.log(err);
          console.log("error response of RefreshTokenValidation = ", err.response);
          if (err.response && err.response.data.code === "token_not_valid" && err.response.status === 401 && err.response.statusText === "Unauthorized") {
            isTokenValid = false;
            AuthApi.Logout(user);
            setUser(null);
            localStorage.removeItem("user");
            // return <Redirect to="/authentication/sign-in" />;
            return history.push("/authentication/sign-out");
          }
          // return err.response;
        }
      };
    
      const GenerateToken = async () => {
        try {
          let refresh_response = await AuthApi.GenerateToken({email: user.email});
          console.log("response of GenerateToken = ", refresh_response);
    
          let new_user = {...user, ...refresh_response.data};
          new_user = JSON.stringify(new_user);
          setUser(new_user);
          localStorage.setItem("user", new_user);
          isTokenValid = true;
          console.log("isTokenValid in GenerateToken = ", isTokenValid);
          return refresh_response;
        } catch (err) {
          console.log(err);
          console.log("error response of GenerateToken = ", err.response);
          return err.response;
        }
      };

      const BusinessCheck = async () => {
        try {
          let isSurveyComplete, business_response = await ActionsApi.GetBusiness({ token: user.token.access, id: user.id });
          console.log("business_response response = ", business_response);
    
          if (business_response.data.length <= 1) {
            isSurveyComplete = checkCompletionSurvey(user);
          } else {
            isSurveyComplete = true;
          }
          console.log("isSurveyComplete in BusinessCheck = ", isSurveyComplete);
          return isSurveyComplete;
          // if (!isSurveyComplete) {
          //   // console.log("isSurveyComplete is False");
          //   // rest.path = "/survey";
          //   // console.log("rest after in ProtectedRoute = ", rest);
          //   return <Route path="/survey" component={Survey} key="survey" />
          //   // return <Redirect to="/survey" />;
          // }
          // return <Redirect to={!isSurveyComplete ? "/survey" : "/dashboard"} />;
        } catch (err) {
          console.log(err);
          console.log("error response of BusinessCheck = ", err.response);
          return err.response;
        }
      };

      // const InitInvoices = async () => {
      //   try {
      //     let invoices_response = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id });
      //     console.log("invoices_response respons = ", invoices_response);

      //     return [...invoices_response.data];
      //   } catch (err) {
      //     console.log(err);
      //   }
      // };

      // const InitClients = async () => {
      //   try {
      //     let clients_response = await ActionsApi.GetClients({ token: user.token.access }, { business_id: user.business.id });
      //     console.log("clients_response response = ", clients_response);

      //     return [...clients_response.data];
      //   } catch (err) {
      //     console.log(err);
      //   }
      // };

      Promise.all([TokenValidation()])
        .then(async () => {
          console.log("isTokenValid in protectedRoute = ", isTokenValid);
          if (isTokenValid) {
            // await BusinessCheck();
            let isSurveyComplete = await BusinessCheck();
            console.log("isSurveyComplete in protectedRoute = ", isSurveyComplete);
            if (!isSurveyComplete) {
              // return <Route path="/survey" component={Survey} key="survey" />
              // return <Redirect to="/survey" component={Survey} key="survey" />;
              // <Redirect to="/survey" component={Survey} key="survey" />;
              return history.push("/survey");
            }
            // else {
            //   console.log("rest if survey complete = ", rest);
            //   if (rest.path === "/invoices/new" || rest.path === "/invoices/:invoice_id/edit") {
            //     console.log("InitClients");
            //     console.log("InitInvoices");
            //     rest.location.state = {
            //       allClients: await InitClients(),
            //       allInvoices: await InitInvoices(),
            //     };
            //   }
            // }
            // if (rest.path === "/invoices/new" || rest.path === "/invoices/:invoice_id/edit") {
            //   console.log("InitClients");
            //   console.log("InitInvoices");
            //   rest.location.state = {
            //     allClients: await InitClients(),
            //     allInvoices: await InitInvoices(),
            //   };
            // }
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }, []);
  }

  // // if (rest.path === "/invoices/new" || rest.path === "/invoices/:invoice_id/edit") {
  //   // useEffect(() => {
  //     const InitInvoices = async () => {
  //       try {
  //         let invoices_response = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id });
  //         console.log("invoices_response respons = ", invoices_response);

  //         // let invoice = await invoices_response.json();

  //         // let invoices_response = await fetch(ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id }));
  //         // console.log("invoices_response respons = ", invoices_response);
    
  //         return [...invoices_response.data];

  //         // return invoice;
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
    
  //     const InitClients = async () => {
  //       try {
  //         let clients_response = await ActionsApi.GetClients({ token: user.token.access }, { business_id: user.business.id });
  //         // let clients_response = await fetch(ActionsApi.GetClients({ token: user.token.access }, { business_id: user.business.id }));
  //         console.log("clients_response response = ", clients_response);
    
  //         return [...clients_response.data];
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };

  // //     let isTokenValid;
  // //     const TokenValidation = async () => {
  // //       try {
  // //         // validation_response = await AuthApi.NewAccessToken({refresh: user.token.refresh});
  // //         let validation_response = await AuthApi.TokenValidation({token: user.token.refresh});
  // //         console.log("response of RefreshTokenValidation = ", validation_response);
  // //         // return validation_response;
  // //         if (validation_response.status === 200 && validation_response.statusText === "OK") {
  // //           await GenerateToken();
  // //         }
  // //         console.log("isTokenValid in TokenValidation = ", isTokenValid);
  // //       } catch (err) {
  // //         console.log(err);
  // //         console.log("error response of RefreshTokenValidation = ", err.response);
  // //         if (err.response && err.response.data.code === "token_not_valid" && err.response.status === 401 && err.response.statusText === "Unauthorized") {
  // //           isTokenValid = false;
  // //           AuthApi.Logout(user);
  // //           setUser(null);
  // //           localStorage.removeItem("user");
  // //           // return <Redirect to="/authentication/sign-in" />;
  // //           return history.push("/authentication/sign-out");
  // //         }
  // //         // return err.response;
  // //       }
  // //     };
    
  // //     const GenerateToken = async () => {
  // //       try {
  // //         let refresh_response = await AuthApi.GenerateToken({email: user.email});
  // //         console.log("response of GenerateToken = ", refresh_response);
    
  // //         let new_user = {...user, ...refresh_response.data};
  // //         new_user = JSON.stringify(new_user);
  // //         setUser(new_user);
  // //         localStorage.setItem("user", new_user);
  // //         isTokenValid = true;
  // //         console.log("isTokenValid in GenerateToken = ", isTokenValid);
  // //         return refresh_response;
  // //       } catch (err) {
  // //         console.log(err);
  // //         console.log("error response of GenerateToken = ", err.response);
  // //         return err.response;
  // //       }
  // //     };

  // //     // const InitData = async () => {
  // //     //   try {
  // //     //     let invoices_response = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id });
  // //     //     console.log("invoices_response respons = ", invoices_response);
  // //     //     let clients_response = await ActionsApi.GetClients({ token: user.token.access }, { business_id: user.business.id });
  // //     //     console.log("clients_response response = ", clients_response);
    
  // //     //     rest.location.state = {
  // //     //       allClients: [...clients_response.data],
  // //     //       allInvoices: [...invoices_response.data],
  // //     //     };
  // //     //   } catch (err) {
  // //     //     console.log(err);
  // //     //   }
  // //     // };

  // //     // InitData();
  // //     Promise.all([TokenValidation])
  // //       .then(async () => {
  // //         history.push({
  // //           pathname: rest.path,
  // //           state: {
  // //             allClients: await InitClients(),
  // //             allInvoices: await InitInvoices(),
  // //             // invoice,
  // //             // client: Clients[Clients.findIndex(client => client.id == invoice.client_id)],
  // //           }
  // //         });
  // //     })
  // //     .catch((error) => {
  // //       console.error(error.message);
  // //     });

  // //       // console.log("InitClients");
  // //       // console.log("InitInvoices");
  // //       // rest.location.state = {
  // //       //   allClients: await InitClients(),
  // //       //   allInvoices: await InitInvoices(),
  // //       // };
  //       if (rest.path === "/invoices/new" || rest.path === "/invoices/:invoice_id/edit") {
  
  //         // let invoices_response = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id });
  //         // let clients_response = await ActionsApi.GetClients({ token: user.token.access }, { business_id: user.business.id });

  //         // const printClients = async () => {
  //         //   // const a = await address;
  //         //   // let invoices_response = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id });
  //         //   const a = await ActionsApi.GetClients({ token: user.token.access }, { business_id: user.business.id });
  //         //   console.log(a);
  //         // };

  //         // const printInvoices = async () => {
  //         //   // const a = await address;
  //         //   // let invoices_response = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id });
  //         //   const a = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id }); 
  //         //   console.log(a);
  //         // };

  //             console.log("InitClients");
  //             console.log("InitInvoices");
  //             rest.location.state = {
  //               // allClients: InitClients(),
  //               // allInvoices: InitInvoices(),

  //               allClients: InitClients().then((result) => {
  //                 console.log(result);
  //                 return result;
  //               }),
  //               allInvoices: InitInvoices().then((invoice) => {
  //                 console.log(invoice);
  //                 return invoice;
  //               }),

  //               // allClients: InitClients().then((a) => {
  //               //   console.log(a);
  //               // }),
  //               // allInvoices: InitInvoices().then((a) => {
  //               //   console.log(a);
  //               // }),

  //               // const clients = fetch("https://jsonplaceholder.typicode.com/users/1")
  //               //   .then((response) => response.json())
  //               //   .then((user) => {
  //               //     return user.address;
  //               //   });

  //               // const printClients = async () => {
  //               //   // const a = await address;
  //               //   // let invoices_response = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id });
  //               //   const a = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id }); 
  //               //   console.log(a);
  //               // };

  //               // const printClients = async () => {
  //               //   // const a = await address;
  //               //   // let invoices_response = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id });
  //               //   const a = await ActionsApi.GetInvoices({ token: user.token.access }, { business_id: user.business.id }); 
  //               //   console.log(a);
  //               // };
                
  //               // printClients();

  //               // allClients: async () => {
  //               //   const a = await InitClients();
  //               //   console.log(a);
  //               // },
  //               // allInvoices: async () => {
  //               //   const a = await InitInvoices();
  //               //   console.log(a);
  //               // },

  //               // allClients: printClients(),
  //               // allInvoices: printInvoices(),
  //             };
  //           }
              
  // //   }, []);
  // // }

  console.log("rest in ProtectedRoute = ", rest);

  return <Route {...rest} />;
};
