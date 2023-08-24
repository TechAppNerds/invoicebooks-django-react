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
  Autocomplete,
  TextField,
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
  // Select,
  // Menu,
  // MenuItem,
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

// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   // FilterList as FilterListIcon,
//   Create as CreateIcon,
//   Archive as ArchiveIcon,
//   ChevronRight as ChevronRightIcon,
//   ExpandMore as ExpandMoreIcon,
//   Edit as EditIcon,
// } from "@mui/icons-material";

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


function ProfileSurvey() {
  // const classes = styles();
  const classes = styles({ image: backgroundImage, });
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

//   let total = Number(0).toFixed(2);
  // const { url } = useRouteMatch();
  const history = useHistory();
  // const { user, setUser } = useAuth();
  const { user, setUser } = useContext(AuthContext);
  // const splitCurrentURL = history.location.pathname.split("/");
  // const currentPath = splitCurrentURL[splitCurrentURL.length - 1];

  // console.log("currentPath is = ", currentPath);
  // console.log("history location pathname = ", history.location.pathname);
  // console.log("url useRouteMatch = ", url);
  console.log("history in ProfileSurvey = ", history);
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

  const countryOptions = [
    "United States",
    "Canada",
    "United Kingdom",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Anguilla",
    "Angola",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling Islands)",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D'Ivoire (Ivory Coast)",
    "Croatia (Hrvatska)",
    "Cuba",
    "Curacao",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Egypt",
    "El Salvador",
    "Ecuador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Federated States of Micronesia",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard and McDonald Islands",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Republic of Korea",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lesotho",
    "Liberia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Rwanda",
    "Reunion",
    "Romania",
    "St. Helena",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint-Martin",
    "St. Pierre and Miquelon",
    "St Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovak Republic",
    "Slovenia",
    "Solomon Islands",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "State of Palestine",
    "Suriname",
    "Svalbard",
    "Sweden",
    "Switzerland",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "US Minor Outlying Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City State",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (British)",
    "Virgin Islands (US)",
    "Wallis and Futuna Islands",
    "Western Sahara",
    "Zambia",
  ];

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [country, setCountry] = useState(user.country === "" ? countryOptions[0] : user.country);
  // const [country, setCountry] = useState(user.country);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
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
    // let token = user.token;
    // console.log("token in save = ", token);
    // console.log("current_user in save = ", current_user);
    // console.log("statement in save = ", history.location.search.length === 0);
    // setSurveyStep(surveyStepValue)
    // if (history.location.search.length === 0) {
    // if (surveyStep === 1) {
      if (firstName === "") {
        return setError("You must enter a first name");
      }
      if (lastName === "") {
        return setError("You must enter a last name");
      }
      if (country === "") {
        return setError("You must choose a country");
      }
      if (phoneNumber === "") {
        return setError("You must enter a phone number");
      }
      if (error === undefined) {
        try {
          let data = {
            first_name: firstName,
            last_name: lastName,
            country,
            phone_number: phoneNumber,
          };
          let response = await ActionsApi.ProfileSurvey({ id: user.id, token: user.token }, data);
          if (response.data && response.data.success === false) {
            return setError(response.data.msg);
          }
          let current_user = { ...user, ...data };
          current_user = JSON.stringify(current_user);
          setUser(current_user);
          localStorage.setItem("user", current_user);
          return history.push("/survey/business");
          // setSurveyStep(surveyStepValue);
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
              <SuiBox component="img" mr={0.5} width="15%" src={`${process.env.PUBLIC_URL}/InvoiceBooks-icon.png`} alt="InvoiceBooks Icon" />
              InvoiceBooks
            </SuiTypography>
            <SuiTypography variant="h3" fontWeight="medium">
              Welcome! <br /> Let&apos;s Get You Set Up
            </SuiTypography>
          </SuiBox>
          <SuiBox p={2}>
            <SuiBox component="form" role="form">
              <SuiBox mb={3} style={{ display: "flex", }}>
                <SuiBox className="w-100 required">
                  <SuiTypography variant="button" fontWeight="regular">
                    First Name
                  </SuiTypography>
                  <SuiInput
                    placeholder="First Name"
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                      setError(undefined);
                    }}
                  />
                </SuiBox>
                <SuiBox ml={3} className="w-100 required">
                  <SuiTypography variant="button" fontWeight="regular">
                    Last Name
                  </SuiTypography>
                  <SuiInput
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                      setError(undefined);
                    }}
                  />
                </SuiBox>
              </SuiBox>
              <SuiBox mb={3} className="required">
                <SuiTypography variant="button" fontWeight="regular">
                  Where are you located?
                </SuiTypography>
                <Autocomplete
                  id="countryOptions"
                  freeSolo
                  disableClearable
                  value={country}
                  onChange={(event, newValue) => {
                    setCountry(newValue);
                    setError(undefined);
                  }}
                  options={countryOptions}
                  renderInput={(params) => <TextField {...params} />}
                />
              </SuiBox>
              <SuiBox mb={3} className="required">
                <SuiTypography variant="button" fontWeight="regular">
                  Phone Number
                </SuiTypography>
                <SuiInput
                  placeholder="(123) 456-7890"
                  value={phoneNumber}
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                    setError(undefined);
                  }}
                />
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
                {/* <SuiButton customClass="survey-next" buttonColor="success" onClick={(event) => save(event)}> */}
                <SuiButton customClass="survey-next" buttonColor="success" onClick={save}>
                  Next
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
                <TimelineDot>1</TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Enter your profile information</TimelineContent>
            </TimelineItem>

            <TimelineItem>
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

export default ProfileSurvey;
