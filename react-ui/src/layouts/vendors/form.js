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
  // Fragment,
  // forwardRef,
  // useRef,
  useContext,
} from "react";

// react-routers components
import {
  // Link,
  // useLocation,
  useHistory,
  useParams,
  useRouteMatch,
  // NavLink,
  // BrowserRouter,
  // Switch,
  // Route
} from "react-router-dom";

// import { TransitionGroup } from 'react-transition-group';
// import { SwitchTransition, CSSTransition } from "react-transition-group";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import ReactApexChart from 'react-apexcharts';

// prop-types is a library for typechecking of props
// import PropTypes from "prop-types";

// @mui material components
import {
  //   Grid,
  //   Tabs,
  //   Tab,
  // Avatar,
  //   Icon,
  //   Card,
  //   Typography,
  //   Box,
  //   Chip,
  Divider,
  //   OutlinedInput,
  TextField,
  //   InputAdornment,
  //   Table,
  //   TableHead,
  //   TableBody,
  //   TableRow,
  //   TableCell,
  // Checkbox,
  //   TableSortLabel,
  //   Toolbar,
  // FormControl,
  // FormLabel,
  // FormControlLabel,
  // Radio,
  // RadioGroup,
  IconButton,
  Button,
  //   Snackbar,
  //   Slide,
  // Alert,
  //   Alert as MuiAlert,
  // Select,
  //   Menu,
  // MenuItem,
  Dialog,
  //   DialogTitle,
  //   DialogContent,
  //   DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  // ToggleButton,
  // Tooltip,
  //   TableContainer,
  //   TablePagination,
  Autocomplete,
  // Popover,
  // TextareaAutosize,
} from "@mui/material";

// import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// import { alpha } from '@mui/material/styles';
// import { alpha, styled } from '@mui/material/styles';

import {
  Add as AddIcon,
  //   Delete as DeleteIcon,
  //   FilterList as FilterListIcon
  //   Create as CreateIcon,
  //   ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
  //   ExpandMore as ExpandMoreIcon,
  //   Edit as EditIcon,
  //   Archive as ArchiveIcon,
  //   FileCopy as FileCopyIcon,
  //   MoreHoriz as MoreHorizIcon,
  // KeyboardArrowDown as KeyboardArrowDownIcon
  //   Print as PrintIcon,
  //   Email as EmailIcon,
  //   Send as SendIcon,
  //   AttachMoney as AttachMoneyIcon,
  //   Download as DownloadIcon,
  // AddCircle as AddCircleIcon,
  //   AddCircleOutline as AddCircleOutlineIcon,
  //   LocalPizza as LocalPizzaIcon,
  // Person as PersonIcon,
  //   HistoryEdu as HistoryEduIcon,
  //   CheckCircle as CheckCircleIcon,
  //   TimerOutlined as TimerOutlinedIcon,
  //   Link as LinkIcon
} from "@mui/icons-material";

// import { FaRegUser, FaUserTie } from "react-icons/fa";
// import { AiOutlineFundProjectionScreen, AiOutlineFileSearch, AiOutlineFileSync } from "react-icons/ai";
// import { TbReceiptTax } from "react-icons/tb";
// import { BsCoin } from "react-icons/bs";
// import { HiOutlineDocumentReport } from "react-icons/hi";
// import { GrUserWorker } from "react-icons/gr";
// import { FcMoneyTransfer } from "react-icons/fc";
// import { ImCalendar } from "react-icons/im";

// import { visuallyHidden } from '@mui/utils';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
// import SuiButton from "components/SuiButton";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React example components
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";

// VendorsForm page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
// import BillingInformation from "layouts/billing/components/BillingInformation";
// import Transactions from "layouts/billing/components/Transactions";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// import './styles.scss';
import styles from "layouts/vendors/styles";
// import { red } from "@mui/material/colors";

import { AuthContext } from "../../auth-context/auth.context";
import AuthApi from "../../api/auth";
import ActionsApi from "../../api/actions";

import country_abbreviation from "country-json/src/country-by-abbreviation";


function VendorsForm() {
  const classes = styles();
  const { user, setUser } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const history = useHistory();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const { vendor_id } = useParams();
  const token = user.token.access;
  const business_id = user.business.id;
  // const { vendor_id, subRoute } = useParams();
  //   const client = allClientData.find(data => data.id == vendor_id);
  //   const splitCurrentURL = history.location.pathname.split("/");
  //   const currentPath = splitCurrentURL[splitCurrentURL.length - 1];
  //   const [clientOverviewTabValue, setClientOverviewTabValue] = useState(splitCurrentURL[splitCurrentURL.length - 1] === "relationship" ? 1 : 0);

  console.log("vendor_id = ", vendor_id);
  // console.log("currentPath = ", currentPath);

  const countryOptions = country_abbreviation.map(data => data.country);

  const currency_list = [
    {name: "Afghan Afghani", code: "AFN"},
    {name: "Albanian Lek", code: "ALL"},
    {name: "Algerian Dinar", code: "DZD"},
    {name: "Angolan Kwanza", code: "AOA"},
    {name: "Argentine Peso", code: "ARS"},
    {name: "Armenian Dram", code: "AMD"},
    {name: "Aruban Florin", code: "AWG"},
    {name: "Australian Dollar", code: "AUD"},
    {name: "Azerbaijani Manat", code: "AZN"},
    {name: "Bahamian Dollar", code: "BSD"},
    {name: "Bahraini Dinar", code: "BHD"},
    {name: "Bangladeshi Taka", code: "BDT"},
    {name: "Barbadian Dollar", code: "BBD"},
    {name: "Belarusian Ruble", code: "BYR"},
    {name: "Belgian Franc", code: "BEF"},
    {name: "Belize Dollar", code: "BZD"},
    {name: "Bermudan Dollar", code: "BMD"},
    {name: "Bhutanese Ngultrum", code: "BTN"},
    {name: "Bitcoin", code: "BTC"},
    {name: "Bolivian Boliviano", code: "BOB"},
    {name: "Bosnia-Herzegovina Convertible Mark", code: "BAM"},
    {name: "Botswanan Pula", code: "BWP"},
    {name: "Brazilian Real", code: "BRL"},
    {name: "British Pound Sterling", code: "GBP"},
    {name: "Brunei Dollar", code: "BND"},
    {name: "Bulgarian Lev", code: "BGN"},
    {name: "Burundian Franc", code: "BIF"},
    {name: "Cambodian Riel", code: "KHR"},
    {name: "Canadian Dollar", code: "CAD"},
    {name: "Cape Verdean Escudo", code: "CVE"},
    {name: "Cayman Islands Dollar", code: "KYD"},
    {name: "CFA Franc BCEAO", code: "XOF"},
    {name: "CFA Franc BEAC", code: "XAF"},
    {name: "CFP Franc", code: "XPF"},
    {name: "Chilean Peso", code: "CLP"},
    {name: "Chilean Unit of Account", code: "CLF"},
    {name: "Chinese Yuan", code: "CNY"},
    {name: "Colombian Peso", code: "COP"},
    {name: "Comorian Franc", code: "KMF"},
    {name: "Congolese Franc", code: "CDF"},
    {name: "Costa Rican Colón", code: "CRC"},
    {name: "Croatian Kuna", code: "HRK"},
    {name: "Cuban Convertible Peso", code: "CUC"},
    {name: "Czech Republic Koruna", code: "CZK"},
    {name: "Danish Krone", code: "DKK"},
    {name: "Djiboutian Franc", code: "DJF"},
    {name: "Dominican Peso", code: "DOP"},
    {name: "East Caribbean Dollar", code: "XCD"},
    {name: "Egyptian Pound", code: "EGP"},
    {name: "Eritrean Nakfa", code: "ERN"},
    {name: "Estonian Kroon", code: "EEK"},
    {name: "Ethiopian Birr", code: "ETB"},
    {name: "Euro", code: "EUR"},
    {name: "Falkland Islands Pound", code: "FKP"},
    {name: "Fijian Dollar", code: "FJD"},
    {name: "Gambian Dalasi", code: "GMD"},
    {name: "Georgian Lari", code: "GEL"},
    {name: "German Mark", code: "DEM"},
    {name: "Ghanaian Cedi", code: "GHS"},
    {name: "Gibraltar Pound", code: "GIP"},
    {name: "Greek Drachma", code: "GRD"},
    {name: "Guatemalan Quetzal", code: "GTQ"},
    {name: "Guinean Franc", code: "GNF"},
    {name: "Guyanaese Dollar", code: "GYD"},
    {name: "Haitian Gourde", code: "HTG"},
    {name: "Honduran Lempira", code: "HNL"},
    {name: "Hong Kong Dollar", code: "HKD"},
    {name: "Hungarian Forint", code: "HUF"},
    {name: "Icelandic Króna", code: "ISK"},
    {name: "Indian Rupee", code: "INR"},
    {name: "Indonesian Rupiah", code: "IDR"},
    {name: "Iranian Rial", code: "IRR"},
    {name: "Iraqi Dinar", code: "IQD"},
    {name: "Israeli New Sheqel", code: "ILS"},
    {name: "Italian Lira", code: "ITL"},
    {name: "Jamaican Dollar", code: "JMD"},
    {name: "Japanese Yen", code: "JPY"},
    {name: "Jordanian Dinar", code: "JOD"},
    {name: "Kazakhstani Tenge", code: "KZT"},
    {name: "Kenyan Shilling", code: "KES"},
    {name: "Kuwaiti Dinar", code: "KWD"},
    {name: "Kyrgystani Som", code: "KGS"},
    {name: "Laotian Kip", code: "LAK"},
    {name: "Latvian Lats", code: "LVL"},
    {name: "Lebanese Pound", code: "LBP"},
    {name: "Lesotho Loti", code: "LSL"},
    {name: "Liberian Dollar", code: "LRD"},
    {name: "Libyan Dinar", code: "LYD"},
    {name: "Litecoin", code: "LTC"},
    {name: "Lithuanian Litas", code: "LTL"},
    {name: "Macanese Pataca", code: "MOP"},
    {name: "Macedonian Denar", code: "MKD"},
    {name: "Malagasy Ariary", code: "MGA"},
    {name: "Malawian Kwacha", code: "MWK"},
    {name: "Malaysian Ringgit", code: "MYR"},
    {name: "Maldivian Rufiyaa", code: "MVR"},
    {name: "Mauritanian Ouguiya", code: "MRO"},
    {name: "Mauritian Rupee", code: "MUR"},
    {name: "Mexican Peso", code: "MXN"},
    {name: "Moldovan Leu", code: "MDL"},
    {name: "Mongolian Tugrik", code: "MNT"},
    {name: "Moroccan Dirham", code: "MAD"},
    {name: "Mozambican Metical", code: "MZN"},
    {name: "Myanmar Kyat", code: "MMK"},
    {name: "Namibian Dollar", code: "NAD"},
    {name: "Nepalese Rupee", code: "NPR"},
    {name: "Netherlands Antillean Guilder", code: "ANG"},
    {name: "New Taiwan Dollar", code: "TWD"},
    {name: "New Zealand Dollar", code: "NZD"},
    {name: "Nicaraguan Córdoba", code: "NIO"},
    {name: "Nigerian Naira", code: "NGN"},
    {name: "North Korean Won", code: "KPW"},
    {name: "Norwegian Krone", code: "NOK"},
    {name: "Omani Rial", code: "OMR"},
    {name: "Pakistani Rupee", code: "PKR"},
    {name: "Panamanian Balboa", code: "PAB"},
    {name: "Papua New Guinean Kina", code: "PGK"},
    {name: "Paraguayan Guarani", code: "PYG"},
    {name: "Peruvian Nuevo Sol", code: "PEN"},
    {name: "Philippine Peso", code: "PHP"},
    {name: "Polish Zloty", code: "PLN"},
    {name: "Qatari Rial", code: "QAR"},
    {name: "Romanian Leu", code: "RON"},
    {name: "Russian Ruble", code: "RUB"},
    {name: "Rwandan Franc", code: "RWF"},
    {name: "Salvadoran Colón", code: "SVC"},
    {name: "Samoan Tala", code: "WST"},
    {name: "São Tomé and Príncipe Dobra", code: "STD"},
    {name: "Saudi Riyal", code: "SAR"},
    {name: "Serbian Dinar", code: "RSD"},
    {name: "Seychellois Rupee", code: "SCR"},
    {name: "Sierra Leonean Leone", code: "SLL"},
    {name: "Singapore Dollar", code: "SGD"},
    {name: "Slovak Koruna", code: "SKK"},
    {name: "Solomon Islands Dollar", code: "SBD"},
    {name: "Somali Shilling", code: "SOS"},
    {name: "South African Rand", code: "ZAR"},
    {name: "South Korean Won", code: "KRW"},
    {name: "South Sudanese Pound", code: "SSP"},
    {name: "Special Drawing Rights", code: "XDR"},
    {name: "Sri Lankan Rupee", code: "LKR"},
    {name: "St. Helena Pound", code: "SHP"},
    {name: "Sudanese Pound", code: "SDG"},
    {name: "Surinamese Dollar", code: "SRD"},
    {name: "Swazi Lilangeni", code: "SZL"},
    {name: "Swedish Krona", code: "SEK"},
    {name: "Swiss Franc", code: "CHF"},
    {name: "Syrian Pound", code: "SYP"},
    {name: "Tajikistani Somoni", code: "TJS"},
    {name: "Tanzanian Shilling", code: "TZS"},
    {name: "Thai Baht", code: "THB"},
    {name: "Tongan Pa'anga", code: "TOP"},
    {name: "Trinidad & Tobago Dollar", code: "TTD"},
    {name: "Tunisian Dinar", code: "TND"},
    {name: "Turkish Lira", code: "TRY"},
    {name: "Turkmenistani Manat", code: "TMT"},
    {name: "Ugandan Shilling", code: "UGX"},
    {name: "Ukrainian Hryvnia", code: "UAH"},
    {name: "United Arab Emirates Dirham", code: "AED"},
    {name: "Uruguayan Peso", code: "UYU"},
    {name: "US Dollar", code: "USD"},
    {name: "Uzbekistan Som", code: "UZS"},
    {name: "Vanuatu Vatu", code: "VUV"},
    {name: "Venezuelan BolÃvar", code: "VEF"},
    {name: "Vietnamese Dong", code: "VND"},
    {name: "Yemeni Rial", code: "YER"},
    {name: "Zambian Kwacha", code: "ZMW"},
    {name: "Zimbabwean dollar", code: "ZWL"}
  ];

  const currencyOptions = currency_list.map(data => `${data.code} — ${data.name}`);

  const languageOptions = [
    "English",
    "French",
    // "Spanish",
    "Spanish (Latin America)",
    "Croatian",
    "Danish",
    "Dutch",
    "Estonian",
    "German",
    "Greek",
    "Italian",
    "Norwegian",
    "Portuguese",
    "Romanian",
    "Russian",
    "Swedish",
  ];
  
  const initVendor = () => {
    return vendor_id !== undefined
      ? history.location.state.vendor
      : {
        company_name: "",
        first_name: "",
        last_name: "",
        account_number: "",
        email: "",
        website: "",
        phone_number: "",
        // country: countryOptions[0],
        country: user.business.country,
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postal_code: "",
        // currency: currencyOptions[0],
        currency: user.business.base_currency,
        language: languageOptions[0],
        business_id,
      };
    // const {client} = history.location.state;
    // if (vendor_id !== undefined) {
    //   return client;
    // } else {
    //   return {
    //     first_name: "",
    //     last_name: "",
    //     company_name: "",
    //     email: "",
    //     phone_number: "",
    //     business_phone: "",
    //     mobile_phone: "",
    //     // country: countryOptions[0],
    //     country: user.business.country,
    //     address_1: "",
    //     address_2: "",
    //     city: "",
    //     state: "",
    //     zip_code: "",
    //     tax_name: "",
    //     tax_number: "",
    //     send_payment_reminders: false,
    //     charge_late_fees: false,
    //     percentage_invoice_value: false,
    //     percentage_outstanding_balance: false,
    //     flat_fee: false,
    //     late_fee_amount: 0,
    //     number_days: 0,
    //     // currency: currencyOptions[0],
    //     currency: user.business.base_currency,
    //     language: languageOptions[0],
    //     invoice_attachments: false,
    //     business_id,
    //   };
    // }
  };

  // const [allClients, setAllClients] = useState([]);
  // const [client, setClient] = useState({});
  const [vendor, setVendor] = useState(initVendor);
  const [validation, setValidation] = useState({});

  // console.log("allClients = ", allClients)
  
  console.log("vendor = ", JSON.stringify(vendor, null, 2));

  console.log("validation = ", JSON.stringify(validation, null, 2));

  let isTokenValid;

  // console.log("isTokenValid = ", isTokenValid)

  const TokenValidation = async () => {
    let validation_response;
    try {
      validation_response = await AuthApi.TokenValidation({ token: user.token.access });
      console.log("response of AccessTokenValidation = ", validation_response);
      isTokenValid = true;
    } catch (err) {
      console.log(err);
      console.log("error response of AccessTokenValidation = ", err.response);
      validation_response = err.response;
    }
    if (validation_response.data.code === "token_not_valid" && validation_response.status === 401 && validation_response.statusText === "Unauthorized") {
      try {
        let get_response = await AuthApi.NewAccessToken({ refresh: user.token.refresh });
        console.log("response of NewAccessToken = ", get_response);

        let new_user = { ...user };
        new_user.token.access = get_response.data.access;
        new_user = JSON.stringify(new_user);
        setUser(new_user);
        localStorage.setItem("user", new_user);
        isTokenValid = true;
      } catch (err) {
        console.log(err);
        console.log("error response of NewAccessToken = ", err.response);
        if (err.response && err.response.data.code === "token_not_valid" && err.response.status === 401 && err.response.statusText === "Unauthorized") {
          isTokenValid = false;
          // AuthApi.Logout(user);
          // setUser(null);
          // localStorage.removeItem("user");
          // return <Redirect to="/authentication/sign-in" />;
        }
      }
    }
  };

  // const InitClients = async () => {
  //   try {
  //     let clients_response = await ActionsApi.GetClients({ token }, { business_id });
  //     console.log("clients_response response = ", clients_response);

  //     let clientData = [...clients_response.data];
  //     setAllClients(clientData);

  //     if (vendor_id !== undefined) {
  //       setClient(clientData[clientData.findIndex(client => client.id == vendor_id)]);
  //     } else {
  //       setClient({
  //         first_name: "",
  //         last_name: "",
  //         company_name: "",
  //         email: "",
  //         phone_number: "",
  //         business_phone: "",
  //         mobile_phone: "",
  //         // country: countryOptions[0],
  //         country: user.business.country,
  //         address_1: "",
  //         address_2: "",
  //         city: "",
  //         state: "",
  //         zip_code: "",
  //         tax_name: "",
  //         tax_number: "",
  //         send_payment_reminders: false,
  //         charge_late_fees: false,
  //         percentage_invoice_value: false,
  //         percentage_outstanding_balance: false,
  //         flat_fee: false,
  //         late_fee_amount: 0,
  //         number_days: 0,
  //         // currency: currencyOptions[0],
  //         currency: user.business.base_currency,
  //         language: languageOptions[0],
  //         invoice_attachments: false,
  //         business_id,
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    Promise.all([TokenValidation()])
      .then(() => {
        console.log("isTokenValid promise then = ", isTokenValid)
        if (isTokenValid) {
          // InitClients();
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  // const countryOptions = [
  //   "United States",
  //   "Canada",
  //   "United Kingdom",
  //   "Afghanistan",
  //   "Albania",
  //   "Algeria",
  //   "American Samoa",
  //   "Andorra",
  //   "Anguilla",
  //   "Angola",
  //   "Antarctica",
  //   "Antigua and Barbuda",
  //   "Argentina",
  //   "Armenia",
  //   "Aruba",
  //   "Australia",
  //   "Austria",
  //   "Azerbaijan",
  //   "Bahamas",
  //   "Bahrain",
  //   "Bangladesh",
  //   "Barbados",
  //   "Belgium",
  //   "Belize",
  //   "Benin",
  //   "Bermuda",
  //   "Bhutan",
  //   "Bolivia",
  //   "Bosnia and Herzegovina",
  //   "Botswana",
  //   "Bouvet Island",
  //   "Brazil",
  //   "British Indian Ocean Territory",
  //   "Brunei Darussalam",
  //   "Bulgaria",
  //   "Burkina Faso",
  //   "Burundi",
  //   "Cambodia",
  //   "Cameroon",
  //   "Cape Verde",
  //   "Cayman Islands",
  //   "Chad",
  //   "Chile",
  //   "China",
  //   "Christmas Island",
  //   "Cocos (Keeling Islands)",
  //   "Colombia",
  //   "Comoros",
  //   "Congo",
  //   "Cook Islands",
  //   "Costa Rica",
  //   "Cote D'Ivoire (Ivory Coast)",
  //   "Croatia (Hrvatska)",
  //   "Cuba",
  //   "Curacao",
  //   "Cyprus",
  //   "Czech Republic",
  //   "Democratic Republic of the Congo",
  //   "Denmark",
  //   "Djibouti",
  //   "Dominica",
  //   "Dominican Republic",
  //   "East Timor",
  //   "Egypt",
  //   "El Salvador",
  //   "Ecuador",
  //   "Equatorial Guinea",
  //   "Eritrea",
  //   "Estonia",
  //   "Eswatini",
  //   "Ethiopia",
  //   "Falkland Islands (Malvinas)",
  //   "Faroe Islands",
  //   "Federated States of Micronesia",
  //   "Fiji",
  //   "Finland",
  //   "France",
  //   "French Guiana",
  //   "French Polynesia",
  //   "French Southern Territories",
  //   "Gabon",
  //   "Gambia",
  //   "Georgia",
  //   "Germany",
  //   "Ghana",
  //   "Gibraltar",
  //   "Greece",
  //   "Greenland",
  //   "Grenada",
  //   "Guadeloupe",
  //   "Guam",
  //   "Guatemala",
  //   "Guernsey",
  //   "Guinea",
  //   "Guinea-Bissau",
  //   "Guyana",
  //   "Haiti",
  //   "Heard and McDonald Islands",
  //   "Honduras",
  //   "Hong Kong",
  //   "Hungary",
  //   "Iceland",
  //   "India",
  //   "Indonesia",
  //   "Iraq",
  //   "Ireland",
  //   "Isle of Man",
  //   "Israel",
  //   "Italy",
  //   "Jamaica",
  //   "Japan",
  //   "Jersey",
  //   "Jordan",
  //   "Kazakhstan",
  //   "Kenya",
  //   "Kiribati",
  //   "Republic of Korea",
  //   "Kosovo",
  //   "Kuwait",
  //   "Kyrgyzstan",
  //   "Laos",
  //   "Latvia",
  //   "Lesotho",
  //   "Liberia",
  //   "Liechtenstein",
  //   "Lithuania",
  //   "Luxembourg",
  //   "Macau",
  //   "Macedonia",
  //   "Madagascar",
  //   "Malawi",
  //   "Malaysia",
  //   "Maldives",
  //   "Mali",
  //   "Malta",
  //   "Marshall Islands",
  //   "Martinique",
  //   "Mauritania",
  //   "Mauritius",
  //   "Mayotte",
  //   "Mexico",
  //   "Moldova",
  //   "Monaco",
  //   "Mongolia",
  //   "Montenegro",
  //   "Montserrat",
  //   "Morocco",
  //   "Mozambique",
  //   "Namibia",
  //   "Nauru",
  //   "Nepal",
  //   "Netherlands",
  //   "New Caledonia",
  //   "New Zealand",
  //   "Nicaragua",
  //   "Niger",
  //   "Nigeria",
  //   "Niue",
  //   "Norfolk Island",
  //   "Northern Mariana Islands",
  //   "Norway",
  //   "Oman",
  //   "Pakistan",
  //   "Palau",
  //   "Panama",
  //   "Papua New Guinea",
  //   "Paraguay",
  //   "Peru",
  //   "Philippines",
  //   "Pitcairn",
  //   "Poland",
  //   "Portugal",
  //   "Puerto Rico",
  //   "Qatar",
  //   "Rwanda",
  //   "Reunion",
  //   "Romania",
  //   "St. Helena",
  //   "Saint Kitts and Nevis",
  //   "Saint Lucia",
  //   "Saint-Martin",
  //   "St. Pierre and Miquelon",
  //   "St Vincent and the Grenadines",
  //   "Samoa",
  //   "San Marino",
  //   "Sao Tome and Principe",
  //   "Saudi Arabia",
  //   "Senegal",
  //   "Serbia",
  //   "Seychelles",
  //   "Sierra Leone",
  //   "Singapore",
  //   "Sint Maarten",
  //   "Slovak Republic",
  //   "Slovenia",
  //   "Solomon Islands",
  //   "South Africa",
  //   "Spain",
  //   "Sri Lanka",
  //   "State of Palestine",
  //   "Suriname",
  //   "Svalbard",
  //   "Sweden",
  //   "Switzerland",
  //   "Taiwan",
  //   "Tajikistan",
  //   "Tanzania",
  //   "Thailand",
  //   "Togo",
  //   "Tokelau",
  //   "Tonga",
  //   "Trinidad and Tobago",
  //   "Tunisia",
  //   "Turkey",
  //   "Turkmenistan",
  //   "Turks and Caicos Islands",
  //   "Tuvalu",
  //   "Uganda",
  //   "Ukraine",
  //   "United Arab Emirates",
  //   "US Minor Outlying Islands",
  //   "Uruguay",
  //   "Uzbekistan",
  //   "Vanuatu",
  //   "Vatican City State",
  //   "Venezuela",
  //   "Vietnam",
  //   "Virgin Islands (British)",
  //   "Virgin Islands (US)",
  //   "Wallis and Futuna Islands",
  //   "Western Sahara",
  //   "Zambia",
  // ];

  // const currencyOptions = [
  //   "USD — US dollar",
  //   "CAD — Canadian dollar",
  //   "EUR — Euro",
  //   "GBP — Pound sterling",
  //   "AUD — Australian dollar",
  //   "AED — United Arab Emirates dirham",
  //   "AFN — Afghani",
  //   "ALL — Lek",
  //   "AMD — Armenian dram",
  //   "ANG — Netherlands Antillian guilder",
  //   "AOA — Kwanza",
  //   "ARS — Argentine peso",
  //   "AWG — Aruban guilder",
  //   "AZN — Azerbaijanian manat",
  //   "BAM — Convertible marks",
  //   "BBD — Barbados dollar",
  //   "BDT — Bangladeshi taka",
  //   "BGN — Bulgarian lev",
  //   "BHD — Bahraini dinar",
  //   "BIF — Burundian franc",
  //   "BMD — Bermudian dollar",
  //   "BND — Brunei dollar",
  //   "BOB — Boliviano",
  //   "BRL — Brazilian real",
  //   "BSD — Bahamian dollar",
  //   "BTN — Ngultrum",
  //   "BWP — Pula",
  //   "BYN — Belarusian ruble",
  //   "BZD — Belize dollar",
  //   "CDF — Franc Congolais",
  //   "CHF — Swiss franc",
  //   "CLP — Chilean peso",
  //   "CNY — Renminbi",
  //   "COP — Colombian peso",
  //   "CRC — Costa Rican colon",
  //   "CUP — Cuban peso",
  //   "CVE — Cape Verde escudo",
  //   "CZK — Czech koruna",
  //   "DJF — Djibouti franc",
  //   "DKK — Danish krone",
  //   "DOP — Dominican peso",
  //   "DZD — Algerian dinar",
  //   "EEK — Kroon",
  //   "EGP — Egyptian pound",
  //   "ERN — Nakfa",
  //   "ETB — Ethiopian birr",
  //   "FJD — Fiji dollar",
  //   "FKP — Falkland Islands pound",
  //   "GEL — Lari",
  //   "GHS — Cedi",
  //   "GIP — Gibraltar pound",
  //   "GMD — Dalasi",
  //   "GNF — a franc",
  //   "GTQ — Quetzal",
  //   "GYD — Guyana dollar",
  //   "HKD — Hong Kong dollar",
  //   "HNL — Lempira",
  //   "HRK — Croatian kuna",
  //   "HTG — Haiti gourde",
  //   "HUF — Forint",
  //   "IDR — Rupiah",
  //   "ILS — New Israeli shekel",
  //   "INR — Indian rupee",
  //   "IQD — Iraqi dinar",
  //   "IRR — Iranian rial",
  //   "ISK — Iceland krona",
  //   "JMD — Jamaican dollar",
  //   "JOD — Jordanian dinar",
  //   "JPY — Japanese yen",
  //   "KES — Kenyan shilling",
  //   "KGS — Som",
  //   "KHR — Riel",
  //   "KMF — Comoro franc",
  //   "KRW — South Korean won",
  //   "KWD — Kuwaiti dinar",
  //   "KYD — Cayman Islands dollar",
  //   "KZT — Tenge",
  //   "LAK — Kip",
  //   "LBP — Lebanese pound",
  //   "LKR — Sri Lanka rupee",
  //   "LRD — Liberian dollar",
  //   "LSL — Loti",
  //   "LYD — Libyan dinar",
  //   "MAD — Moroccan dirham",
  //   "MDL — Moldovan leu",
  //   "MGA — Malagasy ariary",
  //   "MKD — Denar",
  //   "MNT — Tugrik",
  //   "MOP — Pataca",
  //   "MRO — Ouguiya",
  //   "MUR — Mauritius rupee",
  //   "MVR — Rufiyaa",
  //   "MWK — Kwacha",
  //   "MXN — Mexican peso",
  //   "MYR — Malaysian ringgit",
  //   "MZN — Metical",
  //   "NAD — Namibian dollar",
  //   "NGN — Naira",
  //   "NIO — Cordoba oro",
  //   "NOK — Norwegian krone",
  //   "NPR — Nepalese rupee",
  //   "NZD — New Zealand dollar",
  //   "OMR — Rial Omani",
  //   "PAB — Balboa",
  //   "PEN — Nuevo sol",
  //   "PGK — Kina",
  //   "PHP — Philippine peso",
  //   "PKR — Pakistan rupee",
  //   "PLN — Zloty",
  //   "PYG — Guarani",
  //   "QAR — Qatari rial",
  //   "RON — Romanian new leu",
  //   "RSD — Serbian dinar",
  //   "RUB — Russian ruble",
  //   "RWF — Rwanda franc",
  //   "SAR — Saudi riyal",
  //   "SBD — Solomon Islands dollar",
  //   "SCR — Seychelles rupee",
  //   "SDG — Sudanese pound",
  //   "SEK — Swedish krona",
  //   "SGD — Singapore dollar",
  //   "SHP — Saint Helena pound",
  //   "SLL — Leone",
  //   "SRD — Surinam dollar",
  //   "SSP — South Sudanese pound",
  //   "STD — Dobra",
  //   "SYP — Syrian pound",
  //   "SZL — Lilangeni",
  //   "THB — Baht",
  //   "TJS — Somoni",
  //   "TND — Tunisian dinar",
  //   "TOP — Pa'anga",
  //   "TRY — Turkish Lira",
  //   "TTD — Trinidad and Tobago dollar",
  //   "TWD — New Taiwan dollar",
  //   "TZS — Tanzanian shilling",
  //   "UAH — Hryvnia",
  //   "UGX — Uganda shilling",
  //   "UYU — Peso Uruguayo",
  //   "UZS — Uzbekistan som",
  //   "VES — Venezuelan bolívar soberano",
  //   "VND — Vietnamese đồng",
  //   "VUV — Vatu",
  //   "WST — Samoan tala",
  //   "XAF — CFA franc BEAC",
  //   "XCD — East Caribbean dollar",
  //   "XOF — CFA Franc BCEAO",
  //   "XPF — CFP franc",
  //   "YER — Yemeni rial",
  //   "ZAR — South African rand",
  //   "ZMW — Kwacha",
  //   "BEF — Belgium Francs",
  //   "BYR — Belarusian ruble (deprecated)",
  //   "CYP — Cyprus Pounds",
  //   "ESP — Spain Pesetas",
  //   "FRF — France Francs",
  //   "IEP — Ireland Pounds",
  //   "LTL — Lithuanian litas",
  //   "LVL — Latvian lats",
  //   "MLT — Maltese Lira",
  //   "NLG — Dutch/Holland (Netherlands) Guilders",
  //   "RMB — Chinese Renminbi Yuan",
  //   "ROL — Romania Lei",
  //   "RUR — Russia Rubles",
  //   "SKK — Slovak koruna",
  //   "SOS — Somali shilling",
  //   "TMM — Manat",
  //   "TRL — Turkey Liras",
  //   "VEB — Venezuela Bolivares",
  //   "VEF — Venezuelan bolívar fuerte",
  //   "ZMK — Zambian Kwacha",
  // ];

  const [showAddressDetail, setShowAddressDetail] = useState(false);

  const handleChangeEditDialog = (evt) => {
    console.log("evt in handleChangeEditDialog = ", evt)
    // evt.persist();
    // setErrorEmail(false);
    
    const { name, value } = evt.target;
    if (validation && Object.keys(validation).length !== 0 && Object.getPrototypeOf(validation) === Object.prototype) {
      if (vendor.last_name.length !== 0 && (name === "first_name" && value.length !== 0) ||
          vendor.first_name.length !== 0 && (name === "last_name" && value.length !== 0) ||
          name === "company_name" && value.length !== 0) {
        setValidation({});
      }
    }
    setVendor({...vendor, [name]: value});
  };

  const handleCloseDialog = () => {
    history.push("/vendors");
  };

  const save = async () => {
    TokenValidation();
    let inputValidation = {};
    if (vendor.company_name.trim() === "" && (vendor.first_name.trim() === "" || vendor.last_name.trim() === "")) {
      inputValidation = {
        first_name: "Enter a first name",
        last_name: "Enter a last name",
        company_name: "Enter a company name",
      };
    }
    if (vendor.email.trim().length !== 0 && !ValidateEmail(vendor.email.trim())) {
      inputValidation.email_address = "Email Address is not valid";
    }
    setValidation(inputValidation);
    if (inputValidation && Object.keys(inputValidation).length === 0 && Object.getPrototypeOf(inputValidation) === Object.prototype) {
      try {
        let response;
        if (vendor.email.trim().length === 0) {
          delete vendor.email;
        }
        if (vendor_id === undefined) {
          response = await ActionsApi.CreateVendors({ token }, vendor);
        } else {
          response = await ActionsApi.UpdateVendors({ token }, { id: vendor_id, ...vendor });
        }
        console.log("response = ", response);

        handleCloseDialog();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const ValidateEmail = (email) => {
    // eslint-disable-next-line
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  //   function toastSlideTransition(props) {
  //     return <Slide {...props} direction="down" />;
  //   }

  //   const Alert = forwardRef(function Alert(props, ref) {
  //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  //   });

  //   const [toastState, setToastState] = useState(false);
  //   const [toastMessage, setToastMessage] = useState("");
  //   const [toastTransition, setToastTransition] = useState(undefined);

  //   const showToast = (message) => {
  //     setToastMessage(message);
  //     setToastTransition(() => toastSlideTransition);
  //     setToastState(true);
  //   };

  // const handleToastClose = () => {
  //   setToastMessage("");
  //   setToastTransition(undefined);
  //   setToastState(false);
  // };

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
  
  const [languageOptionsValue, setLanguageOptionsValue] = useState(vendor.language ? vendor.language : languageOptions[0]);
  const [currencyOptionsValue, setCurrencyOptionsValue] = useState(vendor.currency ? vendor.currency : user.business.base_currency);

  const vendorSettingsCancel = () => {
    history.push(url);
    setLanguageOptionsValue(vendor.language);
    setCurrencyOptionsValue(vendor.currency);
  };

  const vendorSettingsDone = () => {
    if (history.location.pathname === `${url}/currency-language`) {
      setVendor({ ...vendor, language: languageOptionsValue, currency: currencyOptionsValue, });
    }
    history.push(url);
  };

  // console.log("client currency = ", client.currency.split(" — ")[0]);
  // console.log("client language = ", client.language);

  return (
    <>
      <Dialog
        fullScreen
        open={true}
        onClose={handleCloseDialog}
        classes={{ root: classes.fullScreen_dialog, }}
      >
        <SuiBox className="businessCard-header">
          <SuiTypography variant="h3" fontWeight="bold">
            {`${vendor_id === undefined ? "New" : "Edit"} Vendor`}
          </SuiTypography>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogActions>
        </SuiBox>
        <SuiBox style={{ display: "flex", }}>
          <SuiBox my={3} px={5} py={6} className="businessCard-content">
            <SuiTypography mb={3} variant="button" fontWeight="regular" id="businessCard-info-label">
              <span className="material-icons-outlined">info</span>
              Either Company Name or First and Last Name is required to save this Vendor.
            </SuiTypography>
            <SuiBox mb={3}>
              <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                Company Name
              </SuiTypography>
              <SuiInput
                className="w-100"
                error={"company_name" in validation}
                name="company_name"
                value={vendor.company_name}
                onChange={handleChangeEditDialog}
              />
              {"company_name" in validation &&
                <SuiTypography
                  variant="button"
                  fontWeight="regular"
                  textColor="error"
                  style={{ fontSize: 13, }}
                >
                  {validation.company_name}
                </SuiTypography>
              }
            </SuiBox>
            <SuiBox mb={3} style={{ display: "flex", }}>
              <SuiBox customClass="w-100">
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  First Name
                </SuiTypography>
                {/* <TextField 
                            name="firstName"
                            value={client.firstName}
                            // value={payment.note}
                            // onChange={handleChangeAddPaymentsDialog}
                            // className="bulk-payment-note"
                            // style={{ width: 380, }}
                            onChange={handleChangeEditDialog}
                        /> */}
                <SuiInput
                  error={"first_name" in validation}
                  name="first_name"
                  value={vendor.first_name}
                  onChange={handleChangeEditDialog}
                // onChange={(event) => {setBusinessName(event.target.value); setValidation({});}}
                />
                {"first_name" in validation &&
                  <SuiTypography
                    variant="button"
                    fontWeight="regular"
                    textColor="error"
                    style={{ fontSize: 13, }}
                  >
                    {validation.first_name}
                  </SuiTypography>
                }
              </SuiBox>
              <SuiBox customClass="w-100" ml={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Last Name
                </SuiTypography>
                <SuiInput
                  error={"last_name" in validation}
                  name="last_name"
                  value={vendor.last_name}
                  onChange={handleChangeEditDialog}
                />
                {"last_name" in validation &&
                  <SuiTypography
                    variant="button"
                    fontWeight="regular"
                    textColor="error"
                    style={{ fontSize: 13, }}
                  >
                    {validation.last_name}
                  </SuiTypography>
                }
              </SuiBox>
            </SuiBox>
            <Divider style={{ marginBottom: 24, }} />
            <SuiBox mb={3}>
              <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                Account Number
              </SuiTypography>
              <TextField
                name="account_number"
                value={vendor.account_number}
                onChange={handleChangeEditDialog}
              />
            </SuiBox>
            <SuiBox mb={3}>
              <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                Email Address
              </SuiTypography>
              <SuiInput
                error={"email_address" in validation}
                name="email"
                value={vendor.email}
                onChange={handleChangeEditDialog}
              />
              {"email_address" in validation &&
                <SuiTypography
                  variant="button"
                  fontWeight="regular"
                  textColor="error"
                  style={{ fontSize: 13, }}
                >
                  {validation.email_address}
                </SuiTypography>
              }
            </SuiBox>
            <SuiBox mb={3}>
              <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                Website
              </SuiTypography>
              <TextField
                name="website"
                value={vendor.website}
                onChange={handleChangeEditDialog}
              />
            </SuiBox>
            <SuiBox mb={3}>
              <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                Phone Number
              </SuiTypography>
              <TextField
                name="phone_number"
                value={vendor.phone_number}
                onChange={handleChangeEditDialog}
              />
            </SuiBox>
            <Divider style={{ marginBottom: 24, }} />
            <SuiBox mb={3}>
              {!showAddressDetail ? (
                <IconButton
                  edge="start"
                  onClick={() => setShowAddressDetail(!showAddressDetail)}
                >
                  <AddIcon />
                  <SuiTypography customClass="button" variant="button" fontWeight="regular">
                    Add Address
                  </SuiTypography>
                </IconButton>
              ) : (
                <>
                  <IconButton
                    edge="start"
                    onClick={() => setShowAddressDetail(!showAddressDetail)}
                    style={{
                      float: "right",
                      padding: 0,
                    }}
                  >
                    <CloseIcon />
                    <SuiTypography customClass="button" variant="button" fontWeight="regular">
                      Hide Address
                    </SuiTypography>
                  </IconButton>
                  <SuiBox mb={3}>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                      Country
                    </SuiTypography>
                    <select
                      name="country"
                      value={vendor.country}
                      onChange={handleChangeEditDialog}
                    >
                      {countryOptions.map((element, index) => (
                        <option key={`${index} — ${element}`} value={element}>
                          {element}
                        </option>
                      ))}
                    </select>
                  </SuiBox>
                  <SuiBox mb={3}>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                      Address Line 1
                    </SuiTypography>
                    <TextField
                      className="w-100"
                      name="address_1"
                      value={vendor.address_1}
                      onChange={handleChangeEditDialog}
                    />
                  </SuiBox>
                  <SuiBox mb={3}>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                      Address Line 2
                    </SuiTypography>
                    <TextField
                      className="w-100"
                      name="address_2"
                      value={vendor.address_2}
                      onChange={handleChangeEditDialog}
                    />
                  </SuiBox>
                  <SuiBox mb={3}>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                      Town/City
                    </SuiTypography>
                    <TextField
                      name="city"
                      value={vendor.city}
                      onChange={handleChangeEditDialog}
                    />
                  </SuiBox>
                  <SuiBox mb={3}>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                      State/Province
                    </SuiTypography>
                    <TextField
                      name="state"
                      value={vendor.state}
                      onChange={handleChangeEditDialog}
                    />
                  </SuiBox>
                  <SuiBox mb={3}>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                      Postal Code
                    </SuiTypography>
                    <TextField
                      name="postal_code"
                      value={vendor.postal_code}
                      onChange={handleChangeEditDialog}
                    />
                  </SuiBox>
                </>
              )}
            </SuiBox>
          </SuiBox>
          {/* <SuiBox customClass={classes.suiInputIcon_right}></SuiBox> */}
          <SuiBox my={3} ml={3} className="businessCard-settings">
            {/* <SwitchTransition mode="out-in">
                    <CSSTransition
                        // key={stateTransition}
                        nodeRef={nodeRefTransition}
                        addEndListener={(done) => {
                            nodeRefTransition.current.addEventListener("transitionend", done, false);
                        }}
                        // addEndListener={(node, done) => node.current.addEventListener("transitionend", done, false)}
                        classNames="fade"
                    >
                        <SuiBox ref={nodeRefTransition}> */}
            {history.location.pathname === url ? (
              <>
                {/* <SuiTypography my={1.5} variant="h5" fontWeight="bold">
                  Client Settings
                </SuiTypography> */}
                <SuiTypography mt={0.75} variant="h5"
                  sx={{
                    fontSize: "21px",
                  }}
                >
                  Settings
                </SuiTypography>
                <SuiTypography mb={0.75} variant="h6"
                  sx={{
                    fontSize: "14px",
                    color: "#576981",
                  }}
                >
                  For This Vendor
                </SuiTypography>
                <Divider />
                <List>
                  <ListItem button key="currency-language" onClick={() => history.push(`${url}/currency-language`)}>
                    <span className="material-icons-outlined">public</span>
                    {/* <ListItemText primary="Currency &amp; Language" secondary={`${clientSettings.currency.split(" — ")[0]}, ${clientSettings.language}`} /> */}
                    {/* <ListItemText primary="Currency &amp; Language" secondary={`${client.currency.split(" — ")[0]}, ${client.language}`} /> */}
                    <ListItemText primary="Currency &amp; Language" secondary={`${currencyOptionsValue}, ${vendor.language}`} />
                    <Button endIcon={<ChevronRightIcon />} />
                  </ListItem>
                </List>
              </>
            ) : history.location.pathname === `${url}/currency-language` && (
              <>
                <SuiTypography mt={1.5} variant="h5" fontWeight="bold">
                  Currency &amp; Language
                </SuiTypography>
                <SuiBox px={0.5} py={1}>
                  <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                    Choose a Language
                  </SuiTypography>
                  <Autocomplete
                    id="languageOptions"
                    freeSolo
                    disableClearable
                    value={languageOptionsValue}
                    onChange={(event, newValue) => {
                      setLanguageOptionsValue(newValue);
                    }}
                    options={languageOptions}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </SuiBox>
                <Divider />
                <SuiBox px={0.5} py={1}>
                  <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                    Choose a Currency
                  </SuiTypography>
                  <Autocomplete
                    id="currencyOptions"
                    freeSolo
                    disableClearable
                    value={currencyOptionsValue}
                    onChange={(event, newValue) => {
                      setCurrencyOptionsValue(newValue);
                    }}
                    options={currencyOptions}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </SuiBox>
                <Divider />
                <SuiBox py={1.5} className="businessCard-settings-actions">
                  <Button onClick={vendorSettingsCancel}>Cancel</Button>
                  <Button onClick={vendorSettingsDone}>Done</Button>
                </SuiBox>
              </>
            )}
            {/* </SuiBox>
                </CSSTransition>
        </SwitchTransition> */}
          </SuiBox>
        </SuiBox>
      </Dialog>
    </>
  );
}

// VendorsForm.defaultProps = {
//     data: [],
// };

// VendorsForm.propTypes = {
//     data: PropTypes.arrayOf(PropTypes.object),
// };

export default VendorsForm;
