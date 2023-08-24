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

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import Clients from "layouts/clients";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SignOut from "layouts/authentication/sign-out";

import Survey from "layouts/survey";
// import ProfileSurvey from "layouts/survey/profile";
// import BusinessSurvey from "layouts/survey/business";
import Invoices from "layouts/invoices";
import Settings from "layouts/settings";
import ClientsForm from "layouts/clients/form";
import ClientsDetails from "layouts/clients/detail";

// Soft UI Dashboard React icons
// import Shop from "examples/Icons/Shop";
// import Office from "examples/Icons/Office";
// import SettingsIcon from "examples/Icons/Settings";
// import Document from "examples/Icons/Document";
// import SpaceShip from "examples/Icons/SpaceShip";
// import CustomerSupport from "examples/Icons/CustomerSupport";
// import CreditCard from "examples/Icons/CreditCard";
// import Cube from "examples/Icons/Cube";
// import Client from "examples/Icons/Client";

import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BiTimer } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
// import { FaRegUser, FaFileInvoice } from "react-icons/fa";
// import { GiTakeMyMoney } from "react-icons/gi";
import { HiDocumentReport } from "react-icons/hi";
import { IoPizza } from "react-icons/io5";
import { MdAssessment } from "react-icons/md"; // MdPayment
import { RiTeamFill } from "react-icons/ri";

import {
  Dashboard as DashboardIcon,
  HistoryEdu as HistoryEduIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
} from "@mui/icons-material";

const routes = [
  {
    // type: "collapse",
    type: "none",
    key: "sign-in",
    route: "/authentication/sign-in",
    component: SignIn,
    // noCollapse: true,
    // protected: true,
  },
  {
    type: "none",
    key: "sign-up",
    route: "/authentication/sign-up",
    component: SignUp,
    // protected: false,
  },
  // {
  //   type: "none",
  //   key: "business-survey",
  //   route: "/survey/business",
  //   component: BusinessSurvey,
  //   protected: true,
  // },
  // {
  //   type: "none",
  //   key: "profile-survey",
  //   route: "/survey/profile",
  //   component: ProfileSurvey,
  //   protected: true,
  // },
  {
    type: "none",
    key: "survey",
    route: "/survey",
    component: Survey,
    protected: true,
  },
  {
    type: "none",
    key: "settings",
    route: "/settings",
    component: Settings,
    protected: true,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    // icon: <Shop size="12px" />,
    icon: <DashboardIcon />,
    component: Dashboard,
    noCollapse: true,
    protected: true,
  },
  {
    type: "none",
    key: "clients-new",
    route: "/clients/new",
    component: ClientsForm,
    protected: true,
  },
  {
    type: "none",
    key: "clients-detail",
    route: "/clients/:client_id",
    component: ClientsDetails,
    protected: true,
  },
  {
    type: "collapse",
    name: "Clients",
    key: "clients",
    route: "/clients",
    // icon: <Client size="12px" />,
    icon: <FaUserTie />,
    component: Clients,
    noCollapse: true,
    protected: true,
  },
  // For adding a new route you can follow the existing routes in the routes array.
  // 1. The `type` key with the `collapse` value is used for a route.
  // 2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  // 3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  // 4. The `name` key is used for the name of the route on the Sidenav.
  // 5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  // 6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  // 7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  // inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  // 8. The `route` key is used to store the route location which is used for the react router.
  // 9. The `href` key is used to store the external links location.
  // 10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  // 10. The `component` key is used to store the component of its route.
  // { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Invoices",
    key: "invoices",
    route: "/invoices",
    // icon: <FaFileInvoice size="12px" />,
    icon: <HistoryEduIcon />,
    component: Invoices,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Payments",
    key: "payments",
    route: "/dashboard",
    // icon: <MdPayment size="12px" />,
    icon: <AccountBalanceWalletIcon />,
    component: VirtualReality,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Expenses",
    key: "expenses",
    route: "/dashboard",
    // icon: <GiTakeMyMoney size="12px" />,
    icon: <IoPizza />,
    component: RTL,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Estimates",
    key: "estimates",
    route: "/dashboard",
    icon: <MdAssessment />,
    component: Profile,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Time Tracking",
    key: "time-tracking",
    route: "/dashboard",
    icon: <BiTimer />,
    component: SignIn,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Projects",
    key: "projects",
    route: "/dashboard",
    icon: <AiOutlineFundProjectionScreen />,
    component: SignUp,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "My Team",
    key: "my-team",
    route: "/dashboard",
    icon: <RiTeamFill />,
    component: SignOut,
    noCollapse: true,
    protected: true,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    route: "/dashboard",
    icon: <HiDocumentReport />,
    component: Dashboard,
    noCollapse: true,
    protected: true,
  },


  
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: Tables,
  //   noCollapse: true,
  //   protected: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: Billing,
  //   noCollapse: true,
  //   protected: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: VirtualReality,
  //   noCollapse: true,
  //   protected: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <SettingsIcon size="12px" />,
  //   component: RTL,
  //   noCollapse: true,
  //   protected: true,
  // },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <CustomerSupport size="12px" />,
  //   component: Profile,
  //   noCollapse: true,
  //   protected: true,
  // },

  // {
  //   type: "none",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: <Document size="12px" />,
  //   component: SignIn,
  //   noCollapse: true,
  // },
  // {
  //   type: "none",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: SignUp,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Logout",
  //   key: "sign-out",
  //   route: "/authentication/sign-out",
  //   icon: <SpaceShip size="12px" />,
  //   component: SignOut,
  //   noCollapse: true,
  // },
];

export default routes;
