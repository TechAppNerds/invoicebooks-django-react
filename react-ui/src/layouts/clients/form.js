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
  Avatar,
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
  Checkbox,
  //   TableSortLabel,
  //   Toolbar,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  IconButton,
  Button,
  //   Snackbar,
  //   Slide,
  // Alert,
  //   Alert as MuiAlert,
  Select,
  //   Menu,
  MenuItem,
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
  Popover,
  TextareaAutosize,
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

// ClientsForm page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
// import BillingInformation from "layouts/billing/components/BillingInformation";
// import Transactions from "layouts/billing/components/Transactions";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// import './styles.scss';
import styles from "layouts/clients/styles";
// import { red } from "@mui/material/colors";

import { AuthContext } from "../../auth-context/auth.context";
import AuthApi from "../../api/auth";
import ActionsApi from "../../api/actions";

import country_abbreviation from "country-json/src/country-by-abbreviation";


// let allClientData = [
//     {
//         id: 1,
//         firstName: "client",
//         lastName: "- 1",
//         company: "client -1",
//         email: "cminone@gmail.com",
//         phone: "08539731758",
//         note: "this is my relationship note",
//         credit: 0,
//         total: 0.35,
//     },
//     {
//         id: 2,
//         firstName: "client",
//         lastName: "1",
//         company: "clients's companies",
//         email: "email@gmail.com",
//         phone: "08132624682",
//         note: "my internal note",
//         credit: 0,
//         total: 0.76,
//     },
// ];

function ClientsForm() {
  const classes = styles();
  const { user, setUser } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const history = useHistory();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const { client_id } = useParams();
  const token = user.token.access;
  const business_id = user.business.id;
  // const { client_id, subRoute } = useParams();
  //   const client = allClientData.find(data => data.id == client_id);
  //   const splitCurrentURL = history.location.pathname.split("/");
  //   const currentPath = splitCurrentURL[splitCurrentURL.length - 1];
  //   const [clientOverviewTabValue, setClientOverviewTabValue] = useState(splitCurrentURL[splitCurrentURL.length - 1] === "relationship" ? 1 : 0);

  console.log("client_id = ", client_id);
  // console.log("currentPath = ", currentPath);

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

  const initClient = () => {
    return client_id !== undefined
      ? history.location.state.client
      : {
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        phone_number: "",
        business_phone: "",
        mobile_phone: "",
        // country: countryOptions[0],
        country: user.business.country,
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        zip_code: "",
        tax_name: "",
        tax_number: "",
        send_payment_reminders: false,
        charge_late_fees: false,
        percentage_invoice_value: false,
        percentage_outstanding_balance: false,
        flat_fee: false,
        late_fee_amount: 0,
        number_days: 0,
        // currency: currencyOptions[0],
        currency: user.business.base_currency,
        language: languageOptions[0],
        invoice_attachments: false,
        business_id,
      };
    // const {client} = history.location.state;
    // if (client_id !== undefined) {
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
  const [client, setClient] = useState(initClient);
  const [validation, setValidation] = useState({});

  // console.log("allClients = ", allClients)
  
  console.log("client = ", JSON.stringify(client, null, 2));

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

  //     if (client_id !== undefined) {
  //       setClient(clientData[clientData.findIndex(client => client.id == client_id)]);
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

  // const countryOptions = country_abbreviation.map(data => data.country);

  // const currency_list = [
  //   {name: "Afghan Afghani", code: "AFN"},
  //   {name: "Albanian Lek", code: "ALL"},
  //   {name: "Algerian Dinar", code: "DZD"},
  //   {name: "Angolan Kwanza", code: "AOA"},
  //   {name: "Argentine Peso", code: "ARS"},
  //   {name: "Armenian Dram", code: "AMD"},
  //   {name: "Aruban Florin", code: "AWG"},
  //   {name: "Australian Dollar", code: "AUD"},
  //   {name: "Azerbaijani Manat", code: "AZN"},
  //   {name: "Bahamian Dollar", code: "BSD"},
  //   {name: "Bahraini Dinar", code: "BHD"},
  //   {name: "Bangladeshi Taka", code: "BDT"},
  //   {name: "Barbadian Dollar", code: "BBD"},
  //   {name: "Belarusian Ruble", code: "BYR"},
  //   {name: "Belgian Franc", code: "BEF"},
  //   {name: "Belize Dollar", code: "BZD"},
  //   {name: "Bermudan Dollar", code: "BMD"},
  //   {name: "Bhutanese Ngultrum", code: "BTN"},
  //   {name: "Bitcoin", code: "BTC"},
  //   {name: "Bolivian Boliviano", code: "BOB"},
  //   {name: "Bosnia-Herzegovina Convertible Mark", code: "BAM"},
  //   {name: "Botswanan Pula", code: "BWP"},
  //   {name: "Brazilian Real", code: "BRL"},
  //   {name: "British Pound Sterling", code: "GBP"},
  //   {name: "Brunei Dollar", code: "BND"},
  //   {name: "Bulgarian Lev", code: "BGN"},
  //   {name: "Burundian Franc", code: "BIF"},
  //   {name: "Cambodian Riel", code: "KHR"},
  //   {name: "Canadian Dollar", code: "CAD"},
  //   {name: "Cape Verdean Escudo", code: "CVE"},
  //   {name: "Cayman Islands Dollar", code: "KYD"},
  //   {name: "CFA Franc BCEAO", code: "XOF"},
  //   {name: "CFA Franc BEAC", code: "XAF"},
  //   {name: "CFP Franc", code: "XPF"},
  //   {name: "Chilean Peso", code: "CLP"},
  //   {name: "Chilean Unit of Account", code: "CLF"},
  //   {name: "Chinese Yuan", code: "CNY"},
  //   {name: "Colombian Peso", code: "COP"},
  //   {name: "Comorian Franc", code: "KMF"},
  //   {name: "Congolese Franc", code: "CDF"},
  //   {name: "Costa Rican Colón", code: "CRC"},
  //   {name: "Croatian Kuna", code: "HRK"},
  //   {name: "Cuban Convertible Peso", code: "CUC"},
  //   {name: "Czech Republic Koruna", code: "CZK"},
  //   {name: "Danish Krone", code: "DKK"},
  //   {name: "Djiboutian Franc", code: "DJF"},
  //   {name: "Dominican Peso", code: "DOP"},
  //   {name: "East Caribbean Dollar", code: "XCD"},
  //   {name: "Egyptian Pound", code: "EGP"},
  //   {name: "Eritrean Nakfa", code: "ERN"},
  //   {name: "Estonian Kroon", code: "EEK"},
  //   {name: "Ethiopian Birr", code: "ETB"},
  //   {name: "Euro", code: "EUR"},
  //   {name: "Falkland Islands Pound", code: "FKP"},
  //   {name: "Fijian Dollar", code: "FJD"},
  //   {name: "Gambian Dalasi", code: "GMD"},
  //   {name: "Georgian Lari", code: "GEL"},
  //   {name: "German Mark", code: "DEM"},
  //   {name: "Ghanaian Cedi", code: "GHS"},
  //   {name: "Gibraltar Pound", code: "GIP"},
  //   {name: "Greek Drachma", code: "GRD"},
  //   {name: "Guatemalan Quetzal", code: "GTQ"},
  //   {name: "Guinean Franc", code: "GNF"},
  //   {name: "Guyanaese Dollar", code: "GYD"},
  //   {name: "Haitian Gourde", code: "HTG"},
  //   {name: "Honduran Lempira", code: "HNL"},
  //   {name: "Hong Kong Dollar", code: "HKD"},
  //   {name: "Hungarian Forint", code: "HUF"},
  //   {name: "Icelandic Króna", code: "ISK"},
  //   {name: "Indian Rupee", code: "INR"},
  //   {name: "Indonesian Rupiah", code: "IDR"},
  //   {name: "Iranian Rial", code: "IRR"},
  //   {name: "Iraqi Dinar", code: "IQD"},
  //   {name: "Israeli New Sheqel", code: "ILS"},
  //   {name: "Italian Lira", code: "ITL"},
  //   {name: "Jamaican Dollar", code: "JMD"},
  //   {name: "Japanese Yen", code: "JPY"},
  //   {name: "Jordanian Dinar", code: "JOD"},
  //   {name: "Kazakhstani Tenge", code: "KZT"},
  //   {name: "Kenyan Shilling", code: "KES"},
  //   {name: "Kuwaiti Dinar", code: "KWD"},
  //   {name: "Kyrgystani Som", code: "KGS"},
  //   {name: "Laotian Kip", code: "LAK"},
  //   {name: "Latvian Lats", code: "LVL"},
  //   {name: "Lebanese Pound", code: "LBP"},
  //   {name: "Lesotho Loti", code: "LSL"},
  //   {name: "Liberian Dollar", code: "LRD"},
  //   {name: "Libyan Dinar", code: "LYD"},
  //   {name: "Litecoin", code: "LTC"},
  //   {name: "Lithuanian Litas", code: "LTL"},
  //   {name: "Macanese Pataca", code: "MOP"},
  //   {name: "Macedonian Denar", code: "MKD"},
  //   {name: "Malagasy Ariary", code: "MGA"},
  //   {name: "Malawian Kwacha", code: "MWK"},
  //   {name: "Malaysian Ringgit", code: "MYR"},
  //   {name: "Maldivian Rufiyaa", code: "MVR"},
  //   {name: "Mauritanian Ouguiya", code: "MRO"},
  //   {name: "Mauritian Rupee", code: "MUR"},
  //   {name: "Mexican Peso", code: "MXN"},
  //   {name: "Moldovan Leu", code: "MDL"},
  //   {name: "Mongolian Tugrik", code: "MNT"},
  //   {name: "Moroccan Dirham", code: "MAD"},
  //   {name: "Mozambican Metical", code: "MZN"},
  //   {name: "Myanmar Kyat", code: "MMK"},
  //   {name: "Namibian Dollar", code: "NAD"},
  //   {name: "Nepalese Rupee", code: "NPR"},
  //   {name: "Netherlands Antillean Guilder", code: "ANG"},
  //   {name: "New Taiwan Dollar", code: "TWD"},
  //   {name: "New Zealand Dollar", code: "NZD"},
  //   {name: "Nicaraguan Córdoba", code: "NIO"},
  //   {name: "Nigerian Naira", code: "NGN"},
  //   {name: "North Korean Won", code: "KPW"},
  //   {name: "Norwegian Krone", code: "NOK"},
  //   {name: "Omani Rial", code: "OMR"},
  //   {name: "Pakistani Rupee", code: "PKR"},
  //   {name: "Panamanian Balboa", code: "PAB"},
  //   {name: "Papua New Guinean Kina", code: "PGK"},
  //   {name: "Paraguayan Guarani", code: "PYG"},
  //   {name: "Peruvian Nuevo Sol", code: "PEN"},
  //   {name: "Philippine Peso", code: "PHP"},
  //   {name: "Polish Zloty", code: "PLN"},
  //   {name: "Qatari Rial", code: "QAR"},
  //   {name: "Romanian Leu", code: "RON"},
  //   {name: "Russian Ruble", code: "RUB"},
  //   {name: "Rwandan Franc", code: "RWF"},
  //   {name: "Salvadoran Colón", code: "SVC"},
  //   {name: "Samoan Tala", code: "WST"},
  //   {name: "São Tomé and Príncipe Dobra", code: "STD"},
  //   {name: "Saudi Riyal", code: "SAR"},
  //   {name: "Serbian Dinar", code: "RSD"},
  //   {name: "Seychellois Rupee", code: "SCR"},
  //   {name: "Sierra Leonean Leone", code: "SLL"},
  //   {name: "Singapore Dollar", code: "SGD"},
  //   {name: "Slovak Koruna", code: "SKK"},
  //   {name: "Solomon Islands Dollar", code: "SBD"},
  //   {name: "Somali Shilling", code: "SOS"},
  //   {name: "South African Rand", code: "ZAR"},
  //   {name: "South Korean Won", code: "KRW"},
  //   {name: "South Sudanese Pound", code: "SSP"},
  //   {name: "Special Drawing Rights", code: "XDR"},
  //   {name: "Sri Lankan Rupee", code: "LKR"},
  //   {name: "St. Helena Pound", code: "SHP"},
  //   {name: "Sudanese Pound", code: "SDG"},
  //   {name: "Surinamese Dollar", code: "SRD"},
  //   {name: "Swazi Lilangeni", code: "SZL"},
  //   {name: "Swedish Krona", code: "SEK"},
  //   {name: "Swiss Franc", code: "CHF"},
  //   {name: "Syrian Pound", code: "SYP"},
  //   {name: "Tajikistani Somoni", code: "TJS"},
  //   {name: "Tanzanian Shilling", code: "TZS"},
  //   {name: "Thai Baht", code: "THB"},
  //   {name: "Tongan Pa'anga", code: "TOP"},
  //   {name: "Trinidad & Tobago Dollar", code: "TTD"},
  //   {name: "Tunisian Dinar", code: "TND"},
  //   {name: "Turkish Lira", code: "TRY"},
  //   {name: "Turkmenistani Manat", code: "TMT"},
  //   {name: "Ugandan Shilling", code: "UGX"},
  //   {name: "Ukrainian Hryvnia", code: "UAH"},
  //   {name: "United Arab Emirates Dirham", code: "AED"},
  //   {name: "Uruguayan Peso", code: "UYU"},
  //   {name: "US Dollar", code: "USD"},
  //   {name: "Uzbekistan Som", code: "UZS"},
  //   {name: "Vanuatu Vatu", code: "VUV"},
  //   {name: "Venezuelan BolÃvar", code: "VEF"},
  //   {name: "Vietnamese Dong", code: "VND"},
  //   {name: "Yemeni Rial", code: "YER"},
  //   {name: "Zambian Kwacha", code: "ZMW"},
  //   {name: "Zimbabwean dollar", code: "ZWL"}
  // ];

  // const currencyOptions = currency_list.map(data => `${data.code} — ${data.name}`);

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

  // const languageOptions = [
  //   "English",
  //   "French",
  //   // "Spanish",
  //   "Spanish (Latin America)",
  //   "Croatian",
  //   "Danish",
  //   "Dutch",
  //   "Estonian",
  //   "German",
  //   "Greek",
  //   "Italian",
  //   "Norwegian",
  //   "Portuguese",
  //   "Romanian",
  //   "Russian",
  //   "Swedish",
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

  const [showBusinessPhone, setShowBusinessPhone] = useState(false);
  const [showMobilePhone, setShowMobilePhone] = useState(false);
  const [showAddressDetail, setShowAddressDetail] = useState(false);

  //   const initClient = {
  //     firstName: "",
  //     lastName: "",
  //     companyName: "",
  //     email: "",
  //     phone: "",
  //     businessPhone: "",
  //     mobilePhone: "",
  //     country: countryOptions[0],
  //     primaryAddress: "",
  //     secondaryAddress: "",
  //     city: "",
  //     state: "",
  //     zipCode: "",
  // };

  // const [client, setClient] = useState(initClient);
  
  // console.log("allClientData = ", JSON.stringify(allClientData, null, 2));

  const handleChangeEditDialog = (evt) => {
    console.log("evt in handleChangeEditDialog = ", evt)
    // evt.persist();
    // setErrorEmail(false);
    
    const { name, value } = evt.target;
    if (validation && Object.keys(validation).length !== 0 && Object.getPrototypeOf(validation) === Object.prototype) {
      if (client.last_name.length !== 0 && (name === "first_name" && value.length !== 0) ||
          client.first_name.length !== 0 && (name === "last_name" && value.length !== 0) ||
          name === "company_name" && value.length !== 0) {
        setValidation({});
      }
    }
    setClient({...client, [name]: value});
  };

  const handleCloseDialog = () => {
    history.push("/clients");
  };

  const save = async () => {
    // allClientData.push({ id: allClientData[allClientData.length - 1].id + 1, ...client });
    // console.log("allClientData after = ", JSON.stringify(allClientData, null, 2));
    // handleCloseDialog();

    TokenValidation();
    let inputValidation = {};
    if (client.company_name.trim() === "" && (client.first_name.trim() === "" || client.last_name.trim() === "")) {
      inputValidation = {
        first_name: "Enter a first name",
        last_name: "Enter a last name",
        company_name: "Enter a company name",
      };
    }
    if (client.email.trim().length !== 0 && !ValidateEmail(client.email.trim())) {
      inputValidation.email_address = "Email Address is not valid";
    }
    setValidation(inputValidation);
    if (inputValidation && Object.keys(inputValidation).length === 0 && Object.getPrototypeOf(inputValidation) === Object.prototype) {
      try {
        if (client.email.trim().length === 0) {
          delete client.email;
        }
        let response;
        if (client_id === undefined) {
          response = await ActionsApi.CreateClients({ token }, client);
        } else {
          response = await ActionsApi.UpdateClients({ token }, { id: client_id, ...client });
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

  // const [stateTransition, setStateTransition] = useState(true);
  //   const helloRef = useRef(null);
  //   const goodbyeRef = useRef(null);
  //   const nodeRefTransition = stateTransition ? helloRef : goodbyeRef;
  //   const nodeRefTransition = history.location.pathname === url ? helloRef : goodbyeRef;

  // const initClientSettings = {
  //   sendReminders: false,
  //   reminders: [],
  //   chargeLateFees: false,
  //   lateFee: {
  //     type: "invoice",
  //     value: 10,
  //     days: 30,
  //   },
  //   language: languageOptions[0],
  //   currency: currencyOptions[0],
  //   invoiceAttachments: false,
  // };

  // const [clientSettings, setClientSettings] = useState(initClientSettings);
  // const [sendRemindersCheck, setSendRemindersCheck] = useState(initClientSettings.sendReminders);
  // const [reminderList, setReminderList] = useState(initClientSettings.reminders);
  // const [personalMessage, setPersonalMessage] = useState("");
  // const [chargeLateFeesCheck, setChargeLateFeesCheck] = useState(initClientSettings.chargeLateFees);
  // const [lateFeeAmountRadio, setLateFeeAmountRadio] = useState(initClientSettings.lateFee.type);
  // const [lateFeeValue, setLateFeeValue] = useState(initClientSettings.lateFee.value);
  // const [lateFeeDays, setLateFeeDays] = useState(initClientSettings.lateFee.days);
  // const [languageOptionsValue, setLanguageOptionsValue] = useState(initClientSettings.language);
  // const [currencyOptionsValue, setCurrencyOptionsValue] = useState(initClientSettings.currency);
  // const [invoiceAttachmentsCheck, setInvoiceAttachmentsCheck] = useState(initClientSettings.invoiceAttachments);

  

  

  const initLateFeeAmountRadio = () => {
//     {lateFeeAmountRadio === "invoice" &&
// {lateFeeAmountRadio === "outstanding" &&
// {lateFeeAmountRadio === "flat" &&



    if (client.percentage_invoice_value) {
      return "invoice";
    } else if (client.percentage_outstanding_balance) {
      return "outstanding";
    } else if (client.flat_fee) {
      return "flat";
    } else {
      return "";
    }
  };


  // setClient({
  //   first_name: "",
  //   last_name: "",
  //   company_name: "",
  //   email: "",
  //   phone_number: "",
  //   business_phone: "",
  //   mobile_phone: "",
  //   country: countryOptions[0],
  //   address_1: "",
  //   address_2: "",
  //   city: "",
  //   state: "",
  //   zip_code: "",
  //   tax_name: "",
  //   tax_number: "",
  //   send_payment_reminders: false,
  //   charge_late_fees: false,
  //   percentage_invoice_value: false,
  //   percentage_outstanding_balance: false,
  //   flat_fee: false,
  //   late_fee_amount: 0,
  //   number_days: 0,
  //   currency: currencyOptions[0],
  //   language: languageOptions[0],
  //   invoice_attachments: false,
  //   business_id,
  // });

  // const [clientSettings, setClientSettings] = useState(initClientSettings);
  const [sendRemindersCheck, setSendRemindersCheck] = useState(client.send_payment_reminders ? client.send_payment_reminders : false);
  // const [reminderList, setReminderList] = useState(initClientSettings.reminders);
  const [reminders, setReminders] = useState([]);
  const [personalMessage, setPersonalMessage] = useState("");
  
  const [chargeLateFeesCheck, setChargeLateFeesCheck] = useState(client.charge_late_fees ? client.charge_late_fees : false);
  const [lateFeeAmountRadio, setLateFeeAmountRadio] = useState(initLateFeeAmountRadio);
  const [lateFeeValue, setLateFeeValue] = useState(client.late_fee_amount ? client.late_fee_amount : 0);
  const [lateFeeDays, setLateFeeDays] = useState(client.number_days ? client.number_days : 0);
  // lateFee: {
  //   type: lateFeeAmountRadio,
  //   value: lateFeeValue,
  //   days: lateFeeDays,
  // },
  const [languageOptionsValue, setLanguageOptionsValue] = useState(client.language ? client.language : languageOptions[0]);
  const [currencyOptionsValue, setCurrencyOptionsValue] = useState(client.currency ? client.currency : user.business.base_currency);
  const [invoiceAttachmentsCheck, setInvoiceAttachmentsCheck] = useState(client.invoice_attachments ? client.invoice_attachments : false);

  // console.log("clientSettings = ", JSON.stringify(clientSettings, null, 2));
  // console.log("reminderList = ", JSON.stringify(reminderList, null, 2));
  console.log("reminders = ", JSON.stringify(reminders, null, 2));

  const handleChangeLateReminders = (evt) => {
    console.log("evt in handleChangeLateReminders = ", evt);
    const { name, value } = evt.target, { data } = evt.nativeEvent;
    let index = parseInt(name.split("-")[0]), key = name.split("-")[1], newReminders = [...reminders];
    if (key === "numberOfDays") {
      if (data === null) {
        newReminders[index].numberOfDays = value;
      } else {
        if (/^[0-9\b]+$/.test(data)) {
          // newReminderList[index].numberOfDays += evt.nativeEvent.data;
          newReminders[index].numberOfDays = value;
        }
      }
    } else {
      setPersonalMessage(value);
      newReminders[index].personalMessage = value;
    }
    setReminders(newReminders);
  };

  const handleChangeDueDate = (evt) => {
    console.log("evt in handleChangeDueDate = ", evt);
    const { name, value } = evt.target;
    let index = parseInt(name.split("-")[0]), newReminders = [...reminders];
    newReminders[index].dueDate = value;
    setReminders(newReminders);
  };

  const handleChangeLateFees = (evt) => {
    // console.log("evt in handleChangeLateFees = ", evt);
    const { name, value } = evt.target, { data } = evt.nativeEvent;
    if (name === "lateFeeValue") {
      let newLateFeeValue = lateFeeValue;
      if (data === null) {
        newLateFeeValue = value;
      } else {
        if (/^[0-9\b]+$/.test(data)) {
          newLateFeeValue = value;
        }
      }
      setLateFeeValue(newLateFeeValue);
    } else {
      let newLateFeeDays = lateFeeDays;
      if (data === null) {
        newLateFeeDays = value;
      } else {
        if (/^[0-9\b]+$/.test(data)) {
          newLateFeeDays = value;
        }
      }
      setLateFeeDays(newLateFeeDays);
    }
  };

  // const handlePressLateFees = (evt) => {
  //     console.log("evt in handlePressLateFees = ", evt);
  //     let key = evt.which ? evt.which : evt.keyCode;
  //     console.log("key in handlePressLateFees = ", key);
  //     return key > 47 && key < 58
  //     // return (event.which >= 48 && event.which <= 57) || event.which == 8 || event.which == 46 || event.which == 37 || event.which == 39
  // };

  const clientSettingsCancel = () => {
    history.push(url);
    // setSendRemindersCheck(clientSettings.sendReminders);
    // setReminderList(clientSettings.reminders);
    // setChargeLateFeesCheck(clientSettings.chargeLateFees);
    // setLateFeeAmountRadio(clientSettings.lateFee.type);
    // setLateFeeValue(clientSettings.lateFee.value);
    // setLateFeeDays(clientSettings.lateFee.days);
    // setLanguageOptionsValue(clientSettings.language);
    // setCurrencyOptionsValue(clientSettings.currency);
    // setInvoiceAttachmentsCheck(clientSettings.invoiceAttachments);

    // const [sendRemindersCheck, setSendRemindersCheck] = useState(client.send_payment_reminders);
    // // const [reminderList, setReminderList] = useState(initClientSettings.reminders);
    // const [reminder, setReminder] = useState([]);
    // const [personalMessage, setPersonalMessage] = useState("");
    
    // const [chargeLateFeesCheck, setChargeLateFeesCheck] = useState(client.charge_late_fees);
    // const [lateFeeAmountRadio, setLateFeeAmountRadio] = useState(initLateFeeAmountRadio);
    // const [lateFeeValue, setLateFeeValue] = useState(client.late_fee_amount);
    // const [lateFeeDays, setLateFeeDays] = useState(client.number_days);
    // // lateFee: {
    // //   type: lateFeeAmountRadio,
    // //   value: lateFeeValue,
    // //   days: lateFeeDays,
    // // },
    // const [languageOptionsValue, setLanguageOptionsValue] = useState(client.language);
    // const [currencyOptionsValue, setCurrencyOptionsValue] = useState(client.currency);
    // const [invoiceAttachmentsCheck, setInvoiceAttachmentsCheck] = useState(client.invoice_attachments);
    setSendRemindersCheck(client.send_payment_reminders);
    setReminders(reminders);
    setChargeLateFeesCheck(client.charge_late_fees);
    setLateFeeAmountRadio(lateFeeAmountRadio);
    setLateFeeValue(client.late_fee_amount);
    setLateFeeDays(client.number_days);
    setLanguageOptionsValue(client.language);
    setCurrencyOptionsValue(client.currency);
    setInvoiceAttachmentsCheck(client.invoice_attachments);
  };

// setClient({
  //   first_name: "",
  //   last_name: "",
  //   company_name: "",
  //   email: "",
  //   phone_number: "",
  //   business_phone: "",
  //   mobile_phone: "",
  //   country: countryOptions[0],
  //   address_1: "",
  //   address_2: "",
  //   city: "",
  //   state: "",
  //   zip_code: "",
  //   tax_name: "",
  //   tax_number: "",
  //   send_payment_reminders: false,
  //   charge_late_fees: false,

  //   percentage_invoice_value: false,
  //   percentage_outstanding_balance: false,
  //   flat_fee: false,

  //   late_fee_amount: 0,
  //   number_days: 0,
  //   currency: languageOptions[0],
  //   language: currencyOptions[0],
  //   invoice_attachments: false,
  //   business_id,
  // });

  const clientSettingsDone = () => {
    if (history.location.pathname === `${url}/late-reminders`) {
      // setClientSettings({ ...clientSettings, sendReminders: sendRemindersCheck, reminders: reminderList, });
      setReminders(reminders);
      setClient({ ...client, send_payment_reminders: sendRemindersCheck, });
    } else if (history.location.pathname === `${url}/late-fees`) {
      // setClientSettings({
      //   ...clientSettings, chargeLateFees: chargeLateFeesCheck,
      //   lateFee: {
      //     type: lateFeeAmountRadio,
      //     value: lateFeeValue,
      //     days: lateFeeDays,
      //   },
      // });

      //   percentage_invoice_value: false,
  //   percentage_outstanding_balance: false,
  //   flat_fee: false,

  //   late_fee_amount: 0,
  //   number_days: 0,

  // if (client.percentage_invoice_value) {
  //   return "invoice";
  // } else if (client.percentage_outstanding_balance) {
  //   return "outstanding";
  // } else if (client.flat_fee) {
  //   return "flat";
  // } else {
  //   return "";
  // }

  //     if (lateFeeAmountRadio) {
        
  //     }
      let lateFees = {
        percentage_invoice_value: lateFeeAmountRadio === "invoice",
        percentage_outstanding_balance: lateFeeAmountRadio === "outstanding",
        flat_fee: lateFeeAmountRadio === "flat",
      };
      setClient({ ...client, charge_late_fees: chargeLateFeesCheck, ...lateFees, late_fee_amount: lateFeeValue, number_days: lateFeeDays, });
    } else if (history.location.pathname === `${url}/currency-language`) {
      // setClientSettings({ ...clientSettings, language: languageOptionsValue, currency: currencyOptionsValue, });
      setClient({ ...client, language: languageOptionsValue, currency: currencyOptionsValue, });
    } else if (history.location.pathname === `${url}/invoice-attachments`) {
      // setClientSettings({ ...clientSettings, invoiceAttachments: invoiceAttachmentsCheck, });
      setClient({ ...client, invoice_attachments: invoiceAttachmentsCheck, });
    }
    history.push(url);
  };

  const toggleReminders = () => {
    // let newSendRemindersCheck = !sendRemindersCheck;
    setSendRemindersCheck(!sendRemindersCheck);
    // setSendRemindersCheck(newSendRemindersCheck);
    // if (clientSettings.reminders.length === 0) {
    if (reminders.length === 0) {
      const initReminder = [{
        numberOfDays: 5,
        dueDate: "after",
        personalMessage: "",
      }];
      // setReminderList(initReminder);
      setReminders(initReminder);

      // setClientSettings({ ...clientSettings, reminders: initReminder, });
      // client
    }
    // setClient({ ...client, send_payment_reminders: sendRemindersCheck, });

    // newClient = {...client};

  };

  const addReminders = () => {
    // let newReminderList = [...reminderList];
    // newReminderList.push({
    //   numberOfDays: reminderList.length === 1 ? 15 : 30,
    //   dueDate: "after",
    //   personalMessage: "",
    // });
    // setReminderList(newReminderList);
    // setClientSettings({ ...clientSettings, reminders: newReminderList, });

    let newReminder = [...reminders];
    newReminder.push({
      numberOfDays: reminders.length === 1 ? 15 : 30,
      dueDate: "after",
      personalMessage: "",
    });
    setReminders(newReminder);
  };

  const setReminderMessage = (value) => {
    // let newReminderList = [...reminderList];
    // newReminderList[tempIndex].personalMessage = value;
    // setReminderList(newReminderList);
    // setClientSettings({ ...clientSettings, reminders: newReminderList, });

    let newReminder = [...reminders];
    newReminder[tempIndex].personalMessage = value;
    setReminders(newReminder);
  };

  const doneReminderMessage = () => {
    handleCloseReminderMessage();
    setReminderMessage(personalMessage);
  };

  const cancelReminderMessage = () => {
    handleCloseReminderMessage();
    setReminderMessage("");

    // let message;
    // console.log(JSON.stringify(clientSettings.reminders, null, 2));
    // if (clientSettings.reminders.length === 0) {
    //     message = "";
    // } else {
    //     console.log("previous personalMessage in clientSettings = ", clientSettings.reminders[tempIndex].personalMessage)
    //     message = clientSettings.reminders[tempIndex].personalMessage;
    // }
    // setReminderMessage(message);
  };

  const deleteReminders = (index) => {
    // let newReminderList = [...reminderList];
    // newReminderList.splice(index, 1);
    // setReminderList(newReminderList);
    // setClientSettings({ ...clientSettings, reminders: newReminderList, });

    let newReminder = [...reminders];
    newReminder.splice(index, 1);
    setReminders(newReminder);
  };

  let descriptionLateReminders = "";
  // if (!clientSettings.sendReminders) {
    // setClient({ ...client, send_payment_reminders: sendRemindersCheck, });
  if (!client.send_payment_reminders) {
    descriptionLateReminders = "At Customizable Intervals";
  } else {
    // d1 = 5
    // d2 = 15
    // d3 = 30

    // 5 Days After Due Date
    // 5 Days Before Due Date

    // 5 and 15 Days After Due Date
    // 15 and 5 Days Before Due Date
    // 5 Days Before Due Date 15 Days After Due Date
    // 15 Days Before Due Date 5 Days After Due Date

    // 5, 15, & 30 Days After Due Date
    // 30, 15, & 5 Days Before Due Date
    // 5 Days Before Due Date 15 and 30 Days After Due Date
    // 15 Days Before Due Date 5 and 30 Days After Due Date
    // 30 Days Before Due Date 5 and 15 Days After Due Date
    // 15 and 5 Days Before Due Date 30 Days After Due Date
    // 30 and 5 Days Before Due Date 15 Days After Due Date
    // 30 and 15 Days Before Due Date 5 Days After Due Date


    // let arrBefore = clientSettings.reminders.filter(data => data.dueDate === "before");
    let arrBefore = reminders.filter(data => data.dueDate === "before");
    if (arrBefore.length > 0) {
      if (arrBefore.length === 3) {
        descriptionLateReminders += `${arrBefore[2].numberOfDays}, ${arrBefore[1].numberOfDays}, & ${arrBefore[0].numberOfDays}`;
      } else if (arrBefore.length === 2) {
        descriptionLateReminders += `${arrBefore[1].numberOfDays} and ${arrBefore[0].numberOfDays}`;
      } else if (arrBefore.length === 1) {
        descriptionLateReminders += arrBefore[0].numberOfDays;
      }
      descriptionLateReminders += " Days Before Due Date";
    }

    // let arrAfter = clientSettings.reminders.filter(data => data.dueDate === "after");
    let arrAfter = reminders.filter(data => data.dueDate === "after");
    if (arrAfter.length > 0) {
      if (arrAfter.length === 3) {
        descriptionLateReminders += ` ${arrAfter[0].numberOfDays}, ${arrAfter[1].numberOfDays}, & ${arrAfter[2].numberOfDays}`;
      } else if (arrAfter.length === 2) {
        descriptionLateReminders += ` ${arrAfter[0].numberOfDays} and ${arrAfter[1].numberOfDays}`;
      } else if (arrAfter.length === 1) {
        descriptionLateReminders += ` ${arrAfter[0].numberOfDays}`;
      }
      descriptionLateReminders += " Days After Due Date";
    }
  }

  let descriptionLateFees = "";
  // if (!clientSettings.chargeLateFees) {
  if (!client.charge_late_fees) {
    descriptionLateFees = "Percentage or Flat-Rate Fees";
  }
  else {
    //         $10.99 after 30 days
    //         $11.00 after 30 days
    //         10.99% after 30 days
    //         10% after 30 days

    // let numTwoDec = Number(clientSettings.lateFee.value).toFixed(2);
    let numTwoDec = Number(client.late_fee_amount).toFixed(2);
    // if (clientSettings.lateFee.type === "flat") {
    if (client.flat_fee) {
      descriptionLateFees += `$${numTwoDec} `;
    } else {
      descriptionLateFees += `${numTwoDec}% `;
    }
    // descriptionLateFees += `after ${clientSettings.lateFee.days} days`;
    descriptionLateFees += `after ${client.number_days} days`;
  }

  const [tempIndex, setTempIndex] = useState(-1);
  const [anchorElReminderMessage, setAnchorElReminderMessage] = useState(null);
  const openReminderMessage = Boolean(anchorElReminderMessage);

  const handleClickOpenReminderMessage = (event, index) => {
    setTempIndex(index);
    // setPersonalMessage(reminderList[index].personalMessage);
    setPersonalMessage(reminders[index].personalMessage);
    setAnchorElReminderMessage(event.currentTarget);
  };

  const handleCloseReminderMessage = () => {
    setAnchorElReminderMessage(null);
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
            {`${client_id === undefined ? "New" : "Edit"} Client`}
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
              Either First and Last Name or Company Name is required to save this Client.
            </SuiTypography>
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
                  value={client.first_name}
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
                {/* <TextField 
                        name="lastName"
                        value={client.lastName}
                        onChange={handleChangeEditDialog}
                    /> */}
                <SuiInput
                  error={"last_name" in validation}
                  name="last_name"
                  value={client.last_name}
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
            <SuiBox mb={3}>
              <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                Company Name
              </SuiTypography>
              {/* <TextField
                        className="w-100"
                        name="companyName"
                        value={client.companyName}
                        onChange={handleChangeEditDialog}
                    /> */}
              <SuiInput
                className="w-100"
                error={"company_name" in validation}
                name="company_name"
                value={client.company_name}
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
            <Divider style={{ marginBottom: 24, }} />
            <SuiBox mb={3}>
              <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                Email Address
              </SuiTypography>
              {/* <TextField
                name="email"
                value={client.email}
                onChange={handleChangeEditDialog}
              /> */}
              <SuiInput
                error={"email_address" in validation}
                name="email"
                value={client.email}
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
                Phone Number
              </SuiTypography>
              <TextField
                name="phone_number"
                value={client.phone_number}
                onChange={handleChangeEditDialog}
              />
            </SuiBox>
            <SuiBox mb={3}>
              {!showBusinessPhone ? (
                <IconButton
                  edge="start"
                  onClick={() => setShowBusinessPhone(!showBusinessPhone)}
                >
                  <AddIcon />
                  <SuiTypography customClass="button" variant="button" fontWeight="regular">
                    Add Business Phone
                  </SuiTypography>
                </IconButton>
              ) : (
                <>
                  <SuiBox
                    style={{
                      display: "inline-block",
                      // width: "93%",
                      width: 210,
                    }}
                  >
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                      Business Phone Number
                    </SuiTypography>
                    <TextField
                      name="business_phone"
                      value={client.business_phone}
                      onChange={handleChangeEditDialog}
                    />
                  </SuiBox>
                  <IconButton
                    onClick={() => setShowBusinessPhone(!showBusinessPhone)}
                    sx={{ p: 0, ml: 1, }}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              )}
            </SuiBox>
            <SuiBox mb={3}>
              {!showMobilePhone ? (
                <IconButton
                  edge="start"
                  onClick={() => setShowMobilePhone(!showMobilePhone)}
                >
                  <AddIcon />
                  <SuiTypography customClass="button" variant="button" fontWeight="regular">
                    Add Mobile Phone
                  </SuiTypography>
                </IconButton>
              ) : (
                <>
                  <SuiBox
                    style={{
                      display: "inline-block",
                      width: 210,
                    }}
                  >
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                      Mobile Phone Number
                    </SuiTypography>
                    <TextField
                      name="mobile_phone"
                      value={client.mobile_phone}
                      onChange={handleChangeEditDialog}
                    />
                  </SuiBox>
                  <IconButton
                    onClick={() => setShowMobilePhone(!showMobilePhone)}
                    sx={{ p: 0, ml: 1, }}
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              )}
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
                      value={client.country}
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
                      value={client.address_1}
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
                      value={client.address_2}
                      onChange={handleChangeEditDialog}
                    />
                  </SuiBox>
                  <SuiBox mb={3}>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                      City
                    </SuiTypography>
                    <TextField
                      name="city"
                      value={client.city}
                      onChange={handleChangeEditDialog}
                    />
                  </SuiBox>
                  <SuiBox mb={3}>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                      State
                    </SuiTypography>
                    <TextField
                      name="state"
                      value={client.state}
                      onChange={handleChangeEditDialog}
                    />
                  </SuiBox>
                  <SuiBox mb={3}>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                      ZIP Code
                    </SuiTypography>
                    <TextField
                      name="zip_code"
                      value={client.zip_code}
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
                <SuiTypography my={1.5} variant="h5" fontWeight="bold">
                  Client Settings
                </SuiTypography>
                <Divider />
                <List>
                  <ListItem button key="late-reminders" onClick={() => history.push(`${url}/late-reminders`)}>
                    <span className="material-icons-outlined">announcement</span>
                    <ListItemText primary="Send Reminders" secondary={descriptionLateReminders.trim()} />
                    {/* <Button endIcon={<ChevronRightIcon />}>{clientSettings.sendReminders ? "yes" : "no"}</Button> */}
                    <Button endIcon={<ChevronRightIcon />}>{client.send_payment_reminders ? "yes" : "no"}</Button>
                  </ListItem>
                  <ListItem button key="late-fees" onClick={() => history.push(`${url}/late-fees`)}>
                    <span className="material-icons-outlined">paid</span>
                    <ListItemText primary="Charge Late Fees" secondary={descriptionLateFees.trim()} />
                    {/* <Button endIcon={<ChevronRightIcon />}>{clientSettings.chargeLateFees ? "yes" : "no"}</Button> */}
                    <Button endIcon={<ChevronRightIcon />}>{client.charge_late_fees ? "yes" : "no"}</Button>
                  </ListItem>
                  <ListItem button key="currency-language" onClick={() => history.push(`${url}/currency-language`)}>
                    <span className="material-icons-outlined">public</span>
                    {/* <ListItemText primary="Currency &amp; Language" secondary={`${clientSettings.currency.split(" — ")[0]}, ${clientSettings.language}`} /> */}
                    {/* <ListItemText primary="Currency &amp; Language" secondary={`${client.currency.split(" — ")[0]}, ${client.language}`} /> */}
                    <ListItemText primary="Currency &amp; Language" secondary={`${currencyOptionsValue}, ${client.language}`} />
                    <Button endIcon={<ChevronRightIcon />} />
                  </ListItem>
                  <ListItem button key="invoice-attachments" onClick={() => history.push(`${url}/invoice-attachments`)}>
                    <span className="material-icons-outlined">history_edu</span>
                    <ListItemText primary="Invoice Attachments" secondary="Attach PDF copy to emails" />
                    {/* <Button endIcon={<ChevronRightIcon />}>{clientSettings.invoiceAttachments ? "yes" : "no"}</Button> */}
                    <Button endIcon={<ChevronRightIcon />}>{client.invoice_attachments ? "yes" : "no"}</Button>
                  </ListItem>
                </List>
              </>
            ) : history.location.pathname === `${url}/late-reminders` ? (
              <>
                <SuiTypography mt={1.5} variant="h5" fontWeight="bold">
                  Send Payment Reminders
                </SuiTypography>
                <SuiBox px={0.5} py={1}
                  className="businessCard-settings-head"
                  onClick={toggleReminders}
                >
                  <Checkbox
                    // name="sendReminders"
                    checked={sendRemindersCheck}
                    // checked={client.send_payment_reminders}
                  // color="primary"
                  />
                  <SuiTypography ml={1} variant="h6" fontWeight="regular">
                    Automatically send payment reminders for this client&apos;s invoices.
                  </SuiTypography>
                </SuiBox>
                <Divider />
                <Popover
                  open={openReminderMessage}
                  anchorEl={anchorElReminderMessage}
                  onClose={handleCloseReminderMessage}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  classes={{ paper: classes.reminderMessage_popover, }}
                >
                  <SuiBox px={2.5} py={1.5} className="popover-header">
                    <Avatar />
                    <SuiBox ml={1}>
                      <SuiTypography variant="h6" fontWeight="medium">
                        Edit Reminder Message For
                      </SuiTypography>
                      <SuiTypography variant="h4" fontWeight="medium">
                        No name or organization
                      </SuiTypography>
                    </SuiBox>
                  </SuiBox>
                  <SuiBox px={2.5} py={3} className="popover-section">
                    <SuiTypography mr={5} variant="button" fontWeight="regular">
                      Subject:
                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular">
                      Reminder: Invoice (123) from monroe&apos;s Company is due
                    </SuiTypography>
                  </SuiBox>
                  <Divider />
                  <SuiBox px={12.5} py={3} className="popover-subSection">
                    <SuiTypography variant="button" fontWeight="regular">
                      Your payment of $345.00 for invoice (123) from monroe&apos;s Company is now 5 days overdue.
                    </SuiTypography>
                    <TextareaAutosize
                      name={`${tempIndex}-personalMessage`}
                      value={personalMessage}
                      placeholder="Enter a Personal Message"
                      onChange={handleChangeLateReminders}
                    />
                  </SuiBox>
                  <SuiBox px={2.5} py={1.5} className="popover-footer">
                    <Button onClick={cancelReminderMessage}>Cancel</Button>
                    <Button onClick={doneReminderMessage}>Done</Button>
                  </SuiBox>
                </Popover>
                {/* {sendRemindersCheck && reminderList.map((reminder, index) => ( */}
                {sendRemindersCheck && reminders.map((reminder, index) => (
                  <>
                    <SuiBox key={index} px={0.5} py={1} className="businessCard-settings-late-reminder-schedule">
                      <SuiBox mb={1.5}>
                        <SuiTypography variant="h6" fontWeight="medium">
                          Reminder #{index + 1}
                        </SuiTypography>
                        <SuiBox>
                          {/* {reminderList.length > 1 && */}
                          {reminders.length > 1 && <span className="material-icons" onClick={() => deleteReminders(index)}>delete</span>}
                          <span className="material-icons" onClick={(event) => handleClickOpenReminderMessage(event, index)}>tune</span>
                        </SuiBox>
                      </SuiBox>
                      <SuiTypography customClass="skewer-item" mb={1.5} variant="h6" fontWeight="regular">
                        <TextField
                          name={`${index}-numberOfDays`}
                          value={reminder.numberOfDays}
                          onChange={handleChangeLateReminders}
                        />
                        days
                        <Select
                          className="MuiSelect-root"
                          // MenuProps={{ classes: { root: classes.dropdown_root }, variant: "menu" }}
                          name={`${index}-dueDate`}
                          value={reminder.dueDate}
                          onChange={handleChangeDueDate}
                          autoWidth
                          displayEmpty
                        >
                          <MenuItem value={"before"}>before</MenuItem>
                          <MenuItem value={"after"}>after</MenuItem>
                        </Select>
                        due date
                      </SuiTypography>
                    </SuiBox>
                    <Divider />
                  </>
                ))}
                {/* {sendRemindersCheck && reminderList.length < 3 && */}
                {sendRemindersCheck && reminders.length < 3 &&
                  <>
                    <Divider />
                    <SuiBox px={0.5} py={1} className="action-add-reminder">
                      <IconButton
                        edge="start"
                        onClick={addReminders}
                      >
                        <span className="material-icons">add</span>
                        <SuiTypography variant="button" fontWeight="bold">
                          Add Another Reminder
                        </SuiTypography>
                      </IconButton>
                    </SuiBox>
                    <Divider />
                  </>
                }
                <SuiBox className="businessCard-settings-body" px={0.75} py={1.5}>
                  <span className="material-icons">error</span>
                  <SuiBox ml={2}>
                    <SuiTypography variant="h6" fontWeight="regular">
                      Changes will apply to new invoices.
                    </SuiTypography>
                    {/* <SuiTypography my={1.5} variant="h6" fontWeight="regular">
                                        Late Payment reminders for all clients can be adjusted on the
                                        <br /><Link to="#">Email Templates</Link> page.
                                    </SuiTypography> */}
                  </SuiBox>
                </SuiBox>
                <Divider />
                <SuiBox py={1.5} className="businessCard-settings-actions">
                  <Button onClick={clientSettingsCancel}>Cancel</Button>
                  <Button onClick={clientSettingsDone}>Done</Button>
                </SuiBox>
              </>
            ) : history.location.pathname === `${url}/late-fees` ? (
              <>
                <SuiTypography mt={1.5} variant="h5" fontWeight="bold">
                  Charge Late Fees
                </SuiTypography>
                <SuiBox className="businessCard-settings-head" px={0.5} py={1}
                  // onClick={() => setChargeLateFeesCheck(!chargeLateFeesCheck)}
                  onClick={() => {
                    setChargeLateFeesCheck(!chargeLateFeesCheck)
                    if (!client.charge_late_fees) {
                      setLateFeeAmountRadio("invoice");
                      setLateFeeValue(10);
                    }
                  }}
                >
                  <Checkbox
                    checked={chargeLateFeesCheck}
                  />
                  <SuiTypography ml={1} variant="h6" fontWeight="regular">
                    Automatically add late fees to this client&apos;s overdue invoices.
                  </SuiTypography>
                </SuiBox>
                <Divider />
                {chargeLateFeesCheck &&
                  <>
                    <FormControl className="businessCard-settings-late-fee-amount" sx={{ px: 0.5, py: 1, }}>
                      <FormLabel>Late Fee Amount</FormLabel>
                      <RadioGroup
                        value={lateFeeAmountRadio}
                        onChange={(event) => setLateFeeAmountRadio(event.target.value)}
                      >
                        <FormControlLabel value="invoice" control={<Radio />} label="Percentage of Invoice value" />
                        {lateFeeAmountRadio === "invoice" &&
                          <SuiBox className="form-radio-toggle" ml={1.25} my={0.75}>
                            <TextField
                              name="lateFeeValue"
                              value={lateFeeValue}
                              onChange={handleChangeLateFees}
                            />
                          </SuiBox>
                        }
                        <FormControlLabel value="outstanding" control={<Radio />} label="Percentage of outstanding balance" />
                        {lateFeeAmountRadio === "outstanding" &&
                          <SuiBox className="form-radio-toggle" ml={1.25} my={0.75}>
                            <TextField
                              name="lateFeeValue"
                              value={lateFeeValue}
                              onChange={handleChangeLateFees}
                            />
                          </SuiBox>
                        }
                        <FormControlLabel value="flat" control={<Radio />} label="Flat Fee" />
                        {lateFeeAmountRadio === "flat" &&
                          <SuiBox className="form-radio-toggle" ml={1.25} my={0.75}>
                            <TextField
                              name="lateFeeValue"
                              value={lateFeeValue}
                              onChange={handleChangeLateFees}
                            />
                          </SuiBox>
                        }
                      </RadioGroup>
                    </FormControl>
                    <Divider />
                    <SuiBox className="late-fee-amount-days" px={0.5} py={1}>
                      <SuiTypography mb={1.5} variant="button" fontWeight="regular">
                        When?
                      </SuiTypography>
                      <SuiBox className="form-input">
                        <TextField
                          name="lateFeeDays"
                          value={lateFeeDays}
                          onChange={handleChangeLateFees}
                        />
                        <SuiTypography ml={0.5} variant="h6" fontWeight="regular">
                          days after due date
                        </SuiTypography>
                      </SuiBox>
                    </SuiBox>
                    <Divider />
                  </>
                }
                <SuiBox className="businessCard-settings-body" px={0.75} py={2.5}>
                  <span className="material-icons">error</span>
                  <SuiBox ml={2}>
                    <SuiTypography variant="h6" fontWeight="regular">
                      Changes will apply to new invoices
                    </SuiTypography>
                  </SuiBox>
                </SuiBox>
                <Divider />
                <SuiBox py={1.5} className="businessCard-settings-actions">
                  <Button onClick={clientSettingsCancel}>Cancel</Button>
                  <Button onClick={clientSettingsDone}>Done</Button>
                </SuiBox>
              </>
            ) : history.location.pathname === `${url}/currency-language` ? (
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
                  <Button onClick={clientSettingsCancel}>Cancel</Button>
                  <Button onClick={clientSettingsDone}>Done</Button>
                </SuiBox>
              </>
            ) : history.location.pathname === `${url}/invoice-attachments` && (
              <>
                <SuiTypography mt={1.5} variant="h5" fontWeight="bold">
                  Invoice Attachments
                </SuiTypography>
                <SuiBox className="businessCard-settings-head" px={0.5} py={1}
                  onClick={() => setInvoiceAttachmentsCheck(!invoiceAttachmentsCheck)}
                >
                  <Checkbox
                    checked={invoiceAttachmentsCheck}
                  />
                  <SuiTypography ml={1} variant="h6" fontWeight="regular">
                    Add the option to attach a PDF copy when sending invoices by email.
                  </SuiTypography>
                </SuiBox>
                <Divider />
                <SuiBox className="businessCard-settings-body" px={0.75} py={1.5}>
                  <span className="material-icons">error</span>
                  <SuiBox ml={2}>
                    <SuiTypography variant="h6" fontWeight="regular">
                      Changes will apply to new invoices
                    </SuiTypography>
                  </SuiBox>
                </SuiBox>
                <Divider />
                <SuiBox py={1.5} className="businessCard-settings-actions">
                  <Button onClick={clientSettingsCancel}>Cancel</Button>
                  <Button onClick={clientSettingsDone}>Done</Button>
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

// ClientsForm.defaultProps = {
//     data: [],
// };

// ClientsForm.propTypes = {
//     data: PropTypes.arrayOf(PropTypes.object),
// };

export default ClientsForm;
