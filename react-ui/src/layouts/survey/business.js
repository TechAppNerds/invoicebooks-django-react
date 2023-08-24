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
    useEffect,
    // useMemo,
    // useRef,
    // Fragment,
    // forwardRef,
} from "react";
import { useContext } from "react";

// react-routers components
import {
  Link,
  useHistory,
  // useRouteMatch,
} from "react-router-dom";

// prop-types is a library for typechecking of props
// import PropTypes from "prop-types";

// @mui material components
import {
  // Grid,
  // Autocomplete,
  // TextField,
  // Tabs,
  // Tab,
  // Avatar,
  Icon,
//   Card,
//   Typography,
  // Box,
//   Chip,
//   Divider,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Checkbox,
//   TableSortLabel,
//   Toolbar,
//   Button,
  // IconButton,
//   Tooltip,
//   Snackbar,
//   Slide,
  // Alert,
//   Alert as MuiAlert,
  Select,
  // Menu,
  MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   TableContainer,
//   TablePagination
} from "@mui/material";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

// import { alpha, styled } from '@mui/material/styles';

import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   // FilterList as FilterListIcon,
//   Create as CreateIcon,
//   Archive as ArchiveIcon,
//   ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
//   Edit as EditIcon,
} from "@mui/icons-material";

// import { visuallyHidden } from '@mui/utils';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
// import SuiAvatar from "components/SuiAvatar";

// Soft UI Dashboard React example components
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Settings page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
// import BillingInformation from "layouts/billing/components/BillingInformation";
// import Transactions from "layouts/billing/components/Transactions";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// import './styles.scss';
import styles from "layouts/survey/styles";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
// import appIcon from "../public/invoicing-billing-icon.png";
// import appIcon from "%PUBLIC_URL%/invoicing-billing-icon.png";
// import backgroundImage from "assets/images/survey-background.jpg";
// import backgroundImage from "assets/images/survey-background1.jpg";
import backgroundImage from "assets/images/survey-background.jpg";

// import { useAuth } from "../../auth-context/auth.context";
import { AuthContext } from "../../auth-context/auth.context";
import AuthApi from "../../api/auth";
import ActionsApi from "../../api/actions";


function BusinessSurvey() {
  // const classes = styles();
  const classes = styles({ image: backgroundImage, });
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  // const { url } = useRouteMatch();
  const history = useHistory();
  // const { user, setUser } = useAuth();
  const { user, setUser } = useContext(AuthContext);
  // let business;
  // if (user.business.length > 0) {
  //   business = { ...user.business[0] };
  // }
  // const splitCurrentURL = history.location.pathname.split("/");
  // const currentPath = splitCurrentURL[splitCurrentURL.length - 1];

  // console.log("currentPath is = ", currentPath);
  // console.log("history location pathname = ", history.location.pathname);
  // console.log("url useRouteMatch = ", url);

  // console.log("history in BusinessSurvey = ", history);

  // const surveyStepValue = history.location.search.length !== 0 ? 2 : 1;
  // const surveyStepValue = useMemo(() => {
  //   return history.location.search.length !== 0 ? 2 : 1;
  // }, []);
  // const [surveyStep, setSurveyStep] = useState(surveyStepValue);

  // console.log("surveyStepValue is = ", surveyStepValue);
  // console.log("surveyStep is = ", surveyStep);

  // useEffect(() => {
  //   setSurveyStep(surveyStepValue);
  //   console.log("surveyStepValue in useEffect = ", surveyStepValue);
  //   console.log("surveyStep in useEffect = ", surveyStep);
  // }, []);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const industryOptions = [
    "Accounting and Finance",
    "Administration",
    "Agriculture",
    "Architecture",
    "Arts and Entertainment",
    "Automotive and Transport",
    "Construction, Trades and Home Services",
    "Creative Professionals",
    "Development & Programming",
    "Education",
    "Engineering",
    "Environment",
    "Event Planning",
    "Fashion and Beauty",
    "Food Services",
    "Health and Wellness",
    "Hospitality, Travel and Tourism",
    "Human Resources and Staffing",
    "Information Technology and Support",
    "Legal",
    "Management Consulting",
    "Marketing, Communications & Media",
    "Non-Profit and Volunteer Management",
    "Print Management",
    "Project Management",
    "Real Estate and Property Management",
    "Retail",
    "Sales and Business Development",
    "Telecommunications",
    "Web Hosting",
    "Other",
  ];

  const describeOptions = [
    "It’s launching soon",
    "It’s part-time or supplements my main income",
    "It’s a new business but it’s my full-time focus",
    "It’s been my full-time focus for over a year",
  ];

  const baseCurrencyOptions = [
    "USD — US dollar",
    "CAD — Canadian dollar",
    "EUR — Euro",
    "GBP — Pound sterling",
    "AUD — Australian dollar",
    "AED — United Arab Emirates dirham",
    "AFN — Afghani",
    "ALL — Lek",
    "AMD — Armenian dram",
    "ANG — Netherlands Antillian guilder",
    "AOA — Kwanza",
    "ARS — Argentine peso",
    "AWG — Aruban guilder",
    "AZN — Azerbaijanian manat",
    "BAM — Convertible marks",
    "BBD — Barbados dollar",
    "BDT — Bangladeshi taka",
    "BGN — Bulgarian lev",
    "BHD — Bahraini dinar",
    "BIF — Burundian franc",
    "BMD — Bermudian dollar",
    "BND — Brunei dollar",
    "BOB — Boliviano",
    "BRL — Brazilian real",
    "BSD — Bahamian dollar",
    "BTN — Ngultrum",
    "BWP — Pula",
    "BYN — Belarusian ruble",
    "BZD — Belize dollar",
    "CDF — Franc Congolais",
    "CHF — Swiss franc",
    "CLP — Chilean peso",
    "CNY — Renminbi",
    "COP — Colombian peso",
    "CRC — Costa Rican colon",
    "CUP — Cuban peso",
    "CVE — Cape Verde escudo",
    "CZK — Czech koruna",
    "DJF — Djibouti franc",
    "DKK — Danish krone",
    "DOP — Dominican peso",
    "DZD — Algerian dinar",
    "EEK — Kroon",
    "EGP — Egyptian pound",
    "ERN — Nakfa",
    "ETB — Ethiopian birr",
    "FJD — Fiji dollar",
    "FKP — Falkland Islands pound",
    "GEL — Lari",
    "GHS — Cedi",
    "GIP — Gibraltar pound",
    "GMD — Dalasi",
    "GNF — a franc",
    "GTQ — Quetzal",
    "GYD — Guyana dollar",
    "HKD — Hong Kong dollar",
    "HNL — Lempira",
    "HRK — Croatian kuna",
    "HTG — Haiti gourde",
    "HUF — Forint",
    "IDR — Rupiah",
    "ILS — New Israeli shekel",
    "INR — Indian rupee",
    "IQD — Iraqi dinar",
    "IRR — Iranian rial",
    "ISK — Iceland krona",
    "JMD — Jamaican dollar",
    "JOD — Jordanian dinar",
    "JPY — Japanese yen",
    "KES — Kenyan shilling",
    "KGS — Som",
    "KHR — Riel",
    "KMF — Comoro franc",
    "KRW — South Korean won",
    "KWD — Kuwaiti dinar",
    "KYD — Cayman Islands dollar",
    "KZT — Tenge",
    "LAK — Kip",
    "LBP — Lebanese pound",
    "LKR — Sri Lanka rupee",
    "LRD — Liberian dollar",
    "LSL — Loti",
    "LYD — Libyan dinar",
    "MAD — Moroccan dirham",
    "MDL — Moldovan leu",
    "MGA — Malagasy ariary",
    "MKD — Denar",
    "MNT — Tugrik",
    "MOP — Pataca",
    "MRO — Ouguiya",
    "MUR — Mauritius rupee",
    "MVR — Rufiyaa",
    "MWK — Kwacha",
    "MXN — Mexican peso",
    "MYR — Malaysian ringgit",
    "MZN — Metical",
    "NAD — Namibian dollar",
    "NGN — Naira",
    "NIO — Cordoba oro",
    "NOK — Norwegian krone",
    "NPR — Nepalese rupee",
    "NZD — New Zealand dollar",
    "OMR — Rial Omani",
    "PAB — Balboa",
    "PEN — Nuevo sol",
    "PGK — Kina",
    "PHP — Philippine peso",
    "PKR — Pakistan rupee",
    "PLN — Zloty",
    "PYG — Guarani",
    "QAR — Qatari rial",
    "RON — Romanian new leu",
    "RSD — Serbian dinar",
    "RUB — Russian ruble",
    "RWF — Rwanda franc",
    "SAR — Saudi riyal",
    "SBD — Solomon Islands dollar",
    "SCR — Seychelles rupee",
    "SDG — Sudanese pound",
    "SEK — Swedish krona",
    "SGD — Singapore dollar",
    "SHP — Saint Helena pound",
    "SLL — Leone",
    "SRD — Surinam dollar",
    "SSP — South Sudanese pound",
    "STD — Dobra",
    "SYP — Syrian pound",
    "SZL — Lilangeni",
    "THB — Baht",
    "TJS — Somoni",
    "TND — Tunisian dinar",
    "TOP — Pa'anga",
    "TRY — Turkish Lira",
    "TTD — Trinidad and Tobago dollar",
    "TWD — New Taiwan dollar",
    "TZS — Tanzanian shilling",
    "UAH — Hryvnia",
    "UGX — Uganda shilling",
    "UYU — Peso Uruguayo",
    "UZS — Uzbekistan som",
    "VES — Venezuelan bolívar soberano",
    "VND — Vietnamese đồng",
    "VUV — Vatu",
    "WST — Samoan tala",
    "XAF — CFA franc BEAC",
    "XCD — East Caribbean dollar",
    "XOF — CFA Franc BCEAO",
    "XPF — CFP franc",
    "YER — Yemeni rial",
    "ZAR — South African rand",
    "ZMW — Kwacha",
    "BEF — Belgium Francs",
    "BYR — Belarusian ruble (deprecated)",
    "CYP — Cyprus Pounds",
    "ESP — Spain Pesetas",
    "FRF — France Francs",
    "IEP — Ireland Pounds",
    "LTL — Lithuanian litas",
    "LVL — Latvian lats",
    "MLT — Maltese Lira",
    "NLG — Dutch/Holland (Netherlands) Guilders",
    "RMB — Chinese Renminbi Yuan",
    "ROL — Romania Lei",
    "RUR — Russia Rubles",
    "SKK — Slovak koruna",
    "SOS — Somali shilling",
    "TMM — Manat",
    "TRL — Turkey Liras",
    "VEB — Venezuela Bolivares",
    "VEF — Venezuelan bolívar fuerte",
    "ZMK — Zambian Kwacha",
  ];

  const estimateRevenueOptions = [
    "Up to $30,000",
    "$31,000 to $75,000",
    "$76,000 to $125,000",
    "$126,000 to $500,000",
    "$501,000 or more",
  ];

  const timeCompletedServiceOptions = [
    "Real-time or within a few hours",
    "Less than a week",
    "More than a week but less than a month",
    "More than a month",
  ];

  const customerBillingToolOptions = [
    "Pen and paper",
    "Spreadsheets and Word documents",
    "I don't use anything right now",
    "Another accounting software",
  ];

  const customerOfferCustomizedTypeOptions = [
    "More or less the same",
    "Different or customized",
  ];

  // console.log("user.business = ", user.business)
  // console.log("user.business.name = ", user.business.name)
  // console.log("user.business.name is undefined = ", typeof user.business.name === "undefined")
  // console.log("user.business.customer_offer_customized_type is undefined = ", typeof user.business.customer_offer_customized_type === "undefined")
  

  const [businessName, setBusinessName] = useState(user.business[0].name == null ? "" : user.business[0].name);
  const [industry, setIndustry] = useState(user.business[0].industry == null ? "" : user.business[0].industry);
  const [describe, setDescribe] = useState(user.business[0].describe == null ? "" : user.business[0].describe);
  const [baseCurrency, setBaseCurrency] = useState(user.business[0].base_currency == null ? baseCurrencyOptions[0] : user.business[0].base_currency);
  const [estimateRevenue, setEstimateRevenue] = useState(user.business[0].estimated_revenue == null ? "" : user.business[0].estimated_revenue);
  const [timeCompletedService, setTimeCompletedService] = useState(user.business[0].time_completed_service == null ? "" : user.business[0].time_completed_service);
  const [customerBillingTool, setCustomerBillingTool] = useState(user.business[0].customer_billing_tool == null ? "" : user.business[0].customer_billing_tool);
  const [customerOfferCustomizedType, setCustomerOfferCustomizedType] = useState(user.business[0].customer_offer_customized_type);
  const [error, setError] = useState(undefined);

  const handleLogout = () => {
    AuthApi.Logout(user);
    setUser(null);
    localStorage.removeItem("user");
    return history.push("/authentication/sign-in");
  };

  const save = async (event) => {
    if (event) {
      event.preventDefault();
    }
    // console.log("statement in save = ", history.location.search.length === 0);
    // setSurveyStep(surveyStepValue)
      if (businessName === "") {
        return setError("You must enter a company name");
      }
      if (industry === "") {
        return setError("You must choose a industry");
      }
      if (describe === "") {
        return setError("You must choose a describe");
      }
      if (baseCurrency === "") {
        return setError("You must choose a base currency");
      }
      if (estimateRevenue === "") {
        return setError("You must choose a estimate revenue");
      }
      if (timeCompletedService === "") {
        return setError("You must choose a time completed service");
      }
      if (customerBillingTool === "") {
        return setError("You must choose a customer billing tool");
      }
      if (customerOfferCustomizedType === undefined) {
        return setError("You must choose a customer offer customizedType");
      }
      if (error === undefined) {
        try {
          let response, data = {
            owner: user.id,
            // owner_id: 99,
            name: businessName,
            industry,
            describe,
            base_currency: baseCurrency,
            estimated_revenue: estimateRevenue,
            time_completed_service: timeCompletedService,
            customer_billing_tool: customerBillingTool,
            customer_offer_customized_type: customerOfferCustomizedType,
          };
          if (user.business.length === 0) {
            response = await ActionsApi.CreateBusiness({token: user.token }, data);
          } else {
            data.id = user.business[0].id;
            response = await ActionsApi.UpdateBusiness({token: user.token }, data);
          }
          if (response.data && response.data.success === false) {
            return setError(response.data.msg);
          }
          let current_user = {...user};
          current_user.business[0] = {...response.data};
          console.log("current_user in save = ", current_user);
          current_user = JSON.stringify(current_user);
          setUser(current_user);
          localStorage.setItem("user", current_user);
          return history.push("/dashboard");
        } catch (err) {
          console.log(err);
          if (err.response) {
            return setError(err.response.data.msg);
          }
          return setError("There has been an error.");
        }
      }
  }

  return (
    <SuiBox className={classes.survey_steps_wrapper}>
      <SuiBox className="survey-steps">
        <SuiBox>
          <SuiBox pt={2} px={2}>
            <SuiTypography variant="h4" fontWeight="bold" mb={6} style={{ display: "flex", alignItems: "center", }}>
              <SuiBox component="img" mr={0.5} width="15%" src={`${process.env.PUBLIC_URL}/invoicing-billing-icon.png`} alt="Invoicing Billing Icon" />
              Invoicing Billing
            </SuiTypography>
            <SuiTypography variant="h3" fontWeight="medium">
              Tell us about your business <br /> so we can tailor your <br /> experience
            </SuiTypography>
          </SuiBox>
          <SuiBox p={2}>
            <SuiBox component="form" role="form">
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular">
                  What&apos;s your company&apos;s name?
                </SuiTypography>
                <SuiInput
                  value={businessName}
                  onChange={(event) => {
                    setBusinessName(event.target.value);
                    setError(undefined);
                  }}
                />
              </SuiBox>
              <SuiBox mb={3} className="required">
                <SuiTypography variant="button" fontWeight="regular">
                  What does your business do?
                </SuiTypography>
                <Select
                  value={industry}
                  renderValue={industry !== "" ? undefined : () => "Choose industry"}
                  onChange={(event) => {setIndustry(event.target.value);setError(undefined);}}
                  displayEmpty
                  sx={{ p: "0 !important", }}
                  MenuProps={{
                    classes: {
                      paper: classes.menu_select_form,
                    },
                  }}
                  IconComponent={(props) => (<ExpandMoreIcon {...props}/>)}
                >
                  {industryOptions.map((element, index) => (
                    <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                  ))}
                </Select>
              </SuiBox>
              <SuiBox mb={3} className="required">
                <SuiTypography variant="button" fontWeight="regular">
                  How would you describe your business?
                </SuiTypography>
                <Select
                  value={describe}
                  renderValue={describe !== "" ? undefined : () => "Choose an option"}
                  onChange={(event) => {setDescribe(event.target.value);setError(undefined);}}
                  displayEmpty
                  sx={{ p: "0 !important", }}
                  MenuProps={{
                    classes: {
                      paper: classes.menu_select_form,
                    },
                  }}
                  IconComponent={(props) => (<ExpandMoreIcon {...props}/>)}
                >
                  {describeOptions.map((element, index) => (
                    <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                  ))}
                </Select>
              </SuiBox>
              <SuiBox mb={3} className="required">
                <SuiTypography variant="button" fontWeight="regular">
                  What&apos;s your estimated revenue this year?
                </SuiTypography>
                <SuiBox mb={3} style={{ display: "flex", }}>
                  <SuiBox className="w-100">
                    <Select
                      value={baseCurrency}
                      onChange={(event) => {setBaseCurrency(event.target.value);setError(undefined);}}
                      displayEmpty
                      sx={{ p: "0 !important", }}
                      MenuProps={{
                        classes: {
                          paper: classes.menu_select_form,
                        },
                      }}
                      IconComponent={(props) => (<ExpandMoreIcon {...props}/>)}
                    >
                      {baseCurrencyOptions.map((element, index) => (
                        <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                      ))}
                    </Select>
                  </SuiBox>
                  <SuiBox ml={3} className="w-100">
                    <Select
                      value={estimateRevenue}
                      renderValue={estimateRevenue !== "" ? undefined : () => "Choose estimated revenue"}
                      onChange={(event) => {setEstimateRevenue(event.target.value);setError(undefined);}}
                      displayEmpty
                      sx={{ p: "0 !important", }}
                      MenuProps={{
                        classes: {
                          paper: classes.menu_select_form,
                        },
                      }}
                      IconComponent={(props) => (<ExpandMoreIcon {...props}/>)}
                    >
                      {estimateRevenueOptions.map((element, index) => (
                        <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                      ))}
                    </Select>
                  </SuiBox>
                </SuiBox>
              </SuiBox>
              <SuiBox mb={3} className="required">
                <SuiTypography variant="button" fontWeight="regular">
                  How long does it take to complete your services?
                </SuiTypography>
                <Select
                  value={timeCompletedService}
                  renderValue={timeCompletedService !== "" ? undefined : () => "Choose an option"}
                  onChange={(event) => {setTimeCompletedService(event.target.value);setError(undefined);}}
                  displayEmpty
                  sx={{ p: "0 !important", }}
                  MenuProps={{
                    classes: {
                      paper: classes.menu_select_form,
                    },
                  }}
                  IconComponent={(props) => (<ExpandMoreIcon {...props}/>)}
                >
                  {timeCompletedServiceOptions.map((element, index) => (
                    <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                  ))}
                </Select>
              </SuiBox>
              <SuiBox mb={3} className="required">
                <SuiTypography variant="button" fontWeight="regular">
                  What do you currently use to bill your customers?
                </SuiTypography>
                <Select
                  value={customerBillingTool}
                  renderValue={customerBillingTool !== "" ? undefined : () => "Choose an option"}
                  onChange={(event) => {setCustomerBillingTool(event.target.value);setError(undefined);}}
                  displayEmpty
                  sx={{ p: "0 !important", }}
                  MenuProps={{
                    classes: {
                      paper: classes.menu_select_form,
                    },
                  }}
                  IconComponent={(props) => (<ExpandMoreIcon {...props}/>)}
                >
                  {customerBillingToolOptions.map((element, index) => (
                    <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                  ))}
                </Select>
              </SuiBox>
              <SuiBox mb={3} className="required">
                <SuiTypography variant="button" fontWeight="regular">
                  How customized is your offering for customers?
                </SuiTypography>
                <SuiBox mb={3} style={{ display: "flex", }}>
                  {customerOfferCustomizedTypeOptions.map((element, index) => (
                    <SuiBox key={`${index} — ${element}`} {...index === 1 && {ml: 1.5,}} className="w-100">
                      <SuiButton fullWidth onClick={() => {setCustomerOfferCustomizedType(element); setError(undefined);}}
                        customClass={customerOfferCustomizedType === element ? "selected" : ""}>
                          {element}
                      </SuiButton>
                    </SuiBox>
                  ))}
                </SuiBox>
              </SuiBox>

              <SuiBox mt={2} mb={2} textAlign="center">
                <h6
                  style={{
                    fontSize: ".8em",
                    color: "red",
                    textAlign: "center",
                    fontWeight: 400,
                    transition: ".2s all",
                  }}
                >
                  {error}
                </h6>
              </SuiBox>

              <SuiBox mt={4} className={classes.survey_steps_progress}>
                <SuiButton customClass="survey-back" onClick={save}>
                  Back
                </SuiButton>
                <SuiButton customClass="survey-next" buttonColor="info" onClick={save}>
                  Save and Finish
                </SuiButton>
              </SuiBox>
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </SuiBox>
      <SuiBox className="survey-steps-nav">
        <SuiBox className="survey-steps-list-wrapper">
          <Timeline className="survey-steps-list">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot>✔</TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Enter your profile information</TimelineContent>
            </TimelineItem>

            <TimelineItem className="active">
              <TimelineSeparator>
                <TimelineDot>2</TimelineDot>
              </TimelineSeparator>
              <TimelineContent>Tell us about your business</TimelineContent>
            </TimelineItem>
          </Timeline>

          <SuiBox mt={15.5} className="survey-steps-meta">
            <SuiTypography component={Link} to="/authentication/sign-in" variant="button" fontWeight="regular">
              <Icon>contact_support</Icon>Contact Support
            </SuiTypography>
            <SuiTypography ml={5} component={Link} to="/authentication/sign-in" onClick={handleLogout} variant="button" fontWeight="regular">
              <Icon>logout</Icon>Log Out
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </SuiBox>
  );
}

export default BusinessSurvey;
// export default React.memo(Survey);
