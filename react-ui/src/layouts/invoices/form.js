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
  forwardRef,
  useRef,
  useContext,
} from "react";

// react-routers components
import {
  // Link,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import { ChromePicker } from "react-color";

// import {
//   Transition,
//   CSSTransition,
//   SwitchTransition,
//   TransitionGroup,
// } from "react-transition-group";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import TextareaAutosize from '@mui/base/TextareaAutosize';

// @mui material components
import {
  //   Grid,
  //   Tabs,
  //   Tab,
  Avatar,
  Icon,
  // Divider,
  TextField,
  // Table,
  // TableHead,
  // TableBody,
  // TableRow,
  // TableCell,
  // TableContainer,
  // Checkbox,
  // FormControl,
  // FormLabel,
  // FormControlLabel,
  // Radio,
  // RadioGroup,
  // IconButton,
  Button,
  Snackbar,
  Slide,
  // Alert,
  Alert as MuiAlert,
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
  // Autocomplete,
  Popover,
  // TextareaAutosize,
} from "@mui/material";

// import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// import {
//   alpha,
//   styled,
// } from "@mui/material/styles";

import {
  Add as AddIcon,
  //   Delete as DeleteIcon,
  //   FilterList as FilterListIcon
  //   Create as CreateIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  // Close as CloseIcon,
    ExpandMore as ExpandMoreIcon,
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
import { ImCalendar } from "react-icons/im";

// import { visuallyHidden } from '@mui/utils';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";
// import SuiInput from "components/SuiInput";

// Soft UI Dashboard React example components
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";

// InvoicesForm page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
// import BillingInformation from "layouts/billing/components/BillingInformation";
// import Transactions from "layouts/billing/components/Transactions";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// import './styles.scss';
import './style.css';
import styles from "layouts/invoices/styles";

// Images
import uploadImage from "assets/images/picture-icon.png";
import conicalGradients from "assets/images/conical-gradients.png";

import { AuthContext } from "../../auth-context/auth.context";
import AuthApi from "../../api/auth";
import ActionsApi from "../../api/actions";

// import countries from "country-json/src/country-by-currency-code.json";
// import country_abbreviation from "country-json/src/country-by-abbreviation";
// import country_to_currency from "country-to-currency";

import Translation from "./translation.json";


// eslint-disable-next-line no-empty-pattern
function InvoicesForm({
  // allInvoice,
  // setAllInvoice,
  // allClient,
  // setAllClient,
  // ...rest
}) {
  // const classes = styles();
  const classes = styles({ conicalGradients, });
  const { user, setUser } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const history = useHistory();

  // const {allInvoices, allClients} = history.location.state;
  // let allInvoices, allClients;
  // console.log("allInvoice before = ", allInvoice)
  // console.log("allClient before = ", allClient)

  const [allInvoices, setAllInvoices] = useState([]);
  const [allClients, setAllClients] = useState([]);
  // if ("allInvoices" in history.location.state) {
  //   allInvoices = history.location.state;
  // }
  // if ("allClients" in history.location.state) {
  //   allClients = history.location.state;
  // }
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const { invoice_id } = useParams();
  const userLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
  const token = user.token.access;
  const business_id = user.business.id;
  const date_format = user.business.date_format;
  // const client_id = user.client ? user.client.id : undefined;
  // const [billed_to, setBilledTo] = useState({});
  // const splitCurrentURL = history.location.pathname.split("/");
  // const currentPath = splitCurrentURL[splitCurrentURL.length - 1];
  //   const [clientOverviewTabValue, setClientOverviewTabValue] = useState(splitCurrentURL[splitCurrentURL.length - 1] === "relationship" ? 1 : 0);

  console.log("url useRouteMatch = ", url);
  console.log("history = ", history);
  console.log("invoice_id = ", invoice_id);
  // console.log("client_id = ", client_id);

  // console.log("currentPath = ", currentPath);

  const stringDateFormat = () => {
    if (date_format === "dd/mm/yyyy") {
      return "dd/MM/yyyy";
    } else if (date_format === "dd.mm.yyyy") {
      return "dd.MM.yyyy";
    } else if (date_format === "mm/dd/yyyy") {
      return "MM/dd/yyyy";
    } else if (date_format === "yyyy/mm/dd") {
      return "yyyy/MM/dd";
    } else if (date_format === "yyyy-mm-dd") {
      return "yyyy-MM-dd";
    }
  };

  const dateFormat = (date) => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    if (date_format === "dd/mm/yyyy") {
      return dd + '/' + mm + '/' + yyyy;
    } else if (date_format === "dd.mm.yyyy") {
      return `${dd}.${mm}.${yyyy}`;
    } else if (date_format === "mm/dd/yyyy") {
      return `${mm}/${dd}/${yyyy}`;
    } else if (date_format === "yyyy/mm/dd") {
      return `${yyyy}/${mm}/${dd}`;
    } else if (date_format === "yyyy-mm-dd") {
      return `${yyyy}-${mm}-${dd}`;
    }
  };

  const amountDue = () => {
    let amount = 0;
    invoice.invoice_line_items.forEach(item => {
      amount = (Number(amount) + Number(item.rate * item.quantity)).toFixed(2);
    });
    return amount;
  };

  // const initialInvoice = () => {
  // //   if (invoice_id === undefined) {
  // //     return {
  // //       issued_date: dateFormat(new Date()),
  // //       due_date: dateFormat(new Date()),
  // //       reference: "",
  // //       number: ("0000000" + (allInvoices.length + 1)).slice(-"0000000".length),
  // //       amount: 0.00,

  // //       business_id,
  // //       client_id,
  // //     };
  // //   }
  //   let maxi = Math.max(...allInvoices.map(a => parseInt(a.number)))
  //   console.log("max in initialInvoice = ", maxi)
  //   return {};
  // };

  // const initInvoice = () => {
  //   if (invoice_id !== undefined) {
  //     // setInvoice(allInvoices[allInvoices.findIndex(invoice => invoice.id == invoice_id)]);
  //     let invoice = allInvoices[allInvoices.findIndex(invoice => invoice.id == invoice_id)];
  //     // InitClient(invoice.client_id);
  //     // return allInvoices[allInvoices.findIndex(invoice => invoice.id == invoice_id)];
  //     return invoice;
  //   } else {
  //     let num = Math.max(...allInvoices.map(invoice => parseInt(invoice.number)));
  //     // console.log("max in initInvoices = ", num)
  //     // setInvoice({
  //     //   issued_date: dateFormat(new Date()),
  //     //   due_date: dateFormat(new Date()),
  //     //   reference: "",
  //     //   number: ("0000000" + (num + 1)).slice(-"0000000".length),
  //     //   amount: Number(0).toFixed(2),
  //     //   business_id,
  //     //   // client_id,
  //     // });

  // //     const [issueDate, setIssueDate] = useState(new Date());
  //     let today = new Date();
  //     let month = today.getMonth();
  //     // discount = models.DecimalField(db_index=True, blank=True, null=True, max_digits=3, decimal_places=2)
  //     // deposit = models.CharField(db_index=True, blank=True, null=True, max_length=20)
  //     // theme_color = models.CharField(db_index=True, default='#4f697a', max_length=10)
  //     // theme_font = models.CharField(db_index=True, default='Modern (Helvetica)', max_length=20)
  //     // theme_logo = models.ImageField(db_index=True, blank=True, null=True, upload_to=theme_upload_path)
  //     // recurring = models.BooleanField(db_index=True, default=False)
  //     // online_payments = models.BooleanField(db_index=True, default=False)
  // // const [dueDate, setDueDate] = useState(today.setMonth(month + 1));
  // // const [reference, setReference] = useState("");
  // // const [notes, setNotes] = useState("");
  // // const [terms, setTerms] = useState("");

  //     return {
  //       // issued_date: dateFormat(today),
  //       issued_date: new Date(),
  //       // due_date: dateFormat(new Date(today.setMonth(month + 1))),
  //       due_date: new Date(today.setMonth(month + 1)),
  //       reference: "",
  //       number: ("0000000" + (num + 1)).slice(-"0000000".length),
  //       amount: Number(0).toFixed(2),
  //       notes: "",
  //       terms: "",
  //       online_payments: false,
  //       recurring: false,
  //       business_id,
  //       // client_id,
  //     };
  //   }
  // };

  

  // const [allInvoices, setAllInvoices] = useState([]);
  // const [allClients, setAllClients] = useState([]);
  // const {allInvoices, allClients} = rest.location.state;
  // const {allInvoices, allClients} = history.location.state;
  // let allInvoices, allClients;
  const [invoice, setInvoice] = useState({});
  // const [invoice, setInvoice] = useState(initialInvoice());
  // const [invoice, setInvoice] = useState(initInvoice);
  const [client, setClient] = useState({});
  // const client_id = invoice.client_id;

  // const InitClient = () => {
  //   // try {
  //     // let clients_response = await ActionsApi.GetClients({ token }, { business_id });
  //     // console.log("clients_response response = ", clients_response);

  //     // let clientData = [...clients_response.data];
  //     // setAllClients(clientData);

  //     // if (client_id !== undefined) {
  //     if (invoice_id !== undefined) {
  //       // setClient(clientData[clientData.findIndex(client => client.id == client_id)]);
  //       // setClient(allClients[allClients.findIndex(client => client.id == client_id)]);
  //       let client = allClients[allClients.findIndex(client => client.id == invoice.client_id)];
  //       return client;
  //       // return history.location.state.client;
  //     } else {
  //       // setClient({
  //       //   send_payment_reminders: false,
  //       //   charge_late_fees: false,
  //       //   percentage_invoice_value: false,
  //       //   percentage_outstanding_balance: false,
  //       //   flat_fee: false,
  //       //   late_fee_amount: 0,
  //       //   number_days: 0,
  //       //   // currency: currencyOptions[0],
  //       //   currency: user.business.base_currency,
  //       //   language: languageOptions[0],
  //       //   invoice_attachments: false,
  //       //   business_id,
  //       // });


  //       // return {
  //       //   send_payment_reminders: false,
  //       //   charge_late_fees: false,
  //       //   percentage_invoice_value: false,
  //       //   percentage_outstanding_balance: false,
  //       //   flat_fee: false,
  //       //   late_fee_amount: 0,
  //       //   number_days: 0,
  //       //   // currency: currencyOptions[0],
  //       //   currency: user.business.base_currency,
  //       //   language: languageOptions[0],
  //       //   invoice_attachments: false,
  //       //   business_id,
  //       // };
  //       return {};
  //     }
  // };
  // const [client, setClient] = useState(InitClient);
  // const [validation, setValidation] = useState({});

  console.log("allInvoices = ", allInvoices)
  console.log("allClients = ", allClients)

  console.log("invoice = ", JSON.stringify(invoice, null, 2));
  console.log("client = ", JSON.stringify(client, null, 2));

  // console.log("validation = ", JSON.stringify(validation, null, 2));

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

  const formatToDate = (dateString) => {
    let [day, month, year] = dateString.split('/');
    return new Date(+year, +month - 1, +day);
  };

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

  const [currency, setCurrency] = useState();

  console.log("currency = ", currency)
  
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

  const [language, setLanguage] = useState();

  console.log("language = ", language)

  const [content, setContent] = useState({});

  useEffect(() => {
    // const InitInvoices = async () => {
    //   try {
    //     let invoices_response = await ActionsApi.GetInvoices({ token }, { business_id });
    //     console.log("invoices_response response = ", invoices_response);

    //     // return [...invoices_response.data];
    //     // setAllInvoices([...invoices_response.data]);

    //     let invoiceData = [...invoices_response.data];
    //     setAllInvoices(invoiceData);

    //     if (invoice_id !== undefined) {
    //       let invoice = invoiceData[invoiceData.findIndex(invoice => invoice.id == invoice_id)];
    //       invoice.issued_date = formatToDate(invoice.issued_date);
    //       invoice.due_date = formatToDate(invoice.due_date);
    //       setInvoice(invoice);
    //       // setInvoice(allInvoices[allInvoices.findIndex(invoice => invoice.id == invoice_id)]);
    //     } else {
    //       // let num = Math.max(...allInvoices.map(invoice => parseInt(invoice.number)));
    //       // console.log("max in initInvoices = ", num)
    //       // setInvoice({
    //       //   issued_date: dateFormat(new Date()),
    //       //   due_date: dateFormat(new Date()),
    //       //   reference: "",
    //       //   number: ("0000000" + (num + 1)).slice(-"0000000".length),
    //       //   amount: Number(0).toFixed(2),
    //       //   business_id,
    //       //   client_id,
    //       // });
    //       let num = Math.max(...invoiceData.map(invoice => parseInt(invoice.number)));
    //       let today = new Date();
    //       let month = today.getMonth();
    
    //       setInvoice({
    //         // issued_date: dateFormat(today),
    //         issued_date: new Date(),
    //         // due_date: dateFormat(new Date(today.setMonth(month + 1))),
    //         due_date: new Date(today.setMonth(month + 1)),
    //         reference: "",
    //         number: ("0000000" + (num + 1)).slice(-"0000000".length),
    //         amount: Number(0).toFixed(2),
    //         notes: "",
    //         terms: "",
    //         online_payments: false,
    //         recurring: false,
    //         business_id,
    //         // client_id,
    //       });
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // const InitInvoice = async () => {
    //   if (invoice_id !== undefined) {
    //     let invoice = allInvoices[allInvoices.findIndex(invoice => invoice.id == invoice_id)];
    //     return invoice;
    //   } else {
    //     let num = Math.max(...allInvoices.map(invoice => parseInt(invoice.number)));
    //     let today = new Date();
    //     let month = today.getMonth();
  
    //     return {
    //       // issued_date: dateFormat(today),
    //       issued_date: new Date(),
    //       // due_date: dateFormat(new Date(today.setMonth(month + 1))),
    //       due_date: new Date(today.setMonth(month + 1)),
    //       reference: "",
    //       number: ("0000000" + (num + 1)).slice(-"0000000".length),
    //       amount: Number(0).toFixed(2),
    //       notes: "",
    //       terms: "",
    //       online_payments: false,
    //       recurring: false,
    //       business_id,
    //       // client_id,
    //     };
    //   }
    // };

    // const InitClients = async () => {
    //   try {
    //     let clients_response = await ActionsApi.GetClients({ token }, { business_id });
    //     console.log("clients_response response = ", clients_response);

    //     // return [...clients_response.data];
    //     // setAllClients([...clients_response.data]);
        
    //     let clientData = [...clients_response.data];
    //     setAllClients(clientData);

    //     console.log("invoice inside InitClients = ", JSON.stringify(invoice, null, 2));

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
    //     if (invoice_id !== undefined) {
    //       // let client = allClients[allClients.findIndex(client => client.id == invoice.client_id)];
    //       let client = clientData[clientData.findIndex(client => client.id == invoice.client_id)];
    //       setClient(client);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // const InitClient = async () => {
    //     if (invoice_id !== undefined) {
    //       let client = allClients[allClients.findIndex(client => client.id == invoice.client_id)];
    //       return client;
    //     } else {
    //       return {};
    //     }
    // };

    const InitData = async () => {
      try {
        let invoices_response = await ActionsApi.GetInvoices({ token }, { business_id });
        console.log("GetInvoices = ", invoices_response);

        // return [...invoices_response.data];
        // setAllInvoices([...invoices_response.data]);

        let invoiceData = [...invoices_response.data];
        setAllInvoices(invoiceData);

        let invoice;

        if (invoice_id !== undefined) {
          invoice = invoiceData[invoiceData.findIndex(invoice => invoice.id == invoice_id)];
          invoice.issued_date = formatToDate(invoice.issued_date);
          invoice.due_date = formatToDate(invoice.due_date);
          if (!("invoice_line_items" in invoice)) {
            invoice.invoice_line_items = [];
          }
          invoice.theme_logo = invoice.theme_logo === null ? "" : invoice.theme_logo;
          console.log("invoice is = ", JSON.stringify(invoice, null, 2));
          // let response = await ActionsApi.GetInvoiceLineItems({ token }, { invoice_id });
          // console.log("GetInvoiceLineItems = ", response);
          // setInvoiceLineItems(response.data);
          setThemeLogo(invoice.theme_logo);
        } else {
          let num = Math.max(...invoiceData.map(invoice => parseInt(invoice.number)));
          let today = new Date();
          let month = today.getMonth();
          // let theme_logo = user.business.theme_logo ? user.business.theme_logo : "";
          let theme_logo = "";

          invoice = {
            // issued_date: dateFormat(today),
            issued_date: new Date(),
            // due_date: dateFormat(new Date(today.setMonth(month + 1))),
            due_date: new Date(today.setMonth(month + 1)),
            reference: "",
            number: ("0000000" + (num + 1)).slice(-"0000000".length),
            amount: Number(0).toFixed(2),
            notes: "",
            terms: "",
            online_payments: false,
            recurring: false,
            theme_logo,
            theme_color: user.business.theme_color,
            theme_font: user.business.theme_font,
            language: languageOptions[0],
            currency: user.business.base_currency,
            business_id,
            invoice_line_items: [],
          };
          // setInvoiceLineItems([]);
          setThemeLogo(theme_logo);
        }
        console.log("init invoice = ", invoice);
        setInvoice(invoice);
        setThemeColor(invoice.theme_color);
        setCurrentColor(invoice.theme_color);
        setChangeCurrentColor(!colorPickerOptions.includes(invoice.theme_color));
        setThemeFont(invoice.theme_font);
        setLanguage(invoice.language);
        setCurrency(invoice.currency);
        setCurrencyCode(invoice.currency.split(" — ")[0]);
        setContent(Translation[invoice.language]);

        // setPaymentMethodRadio(invoice.online_payments);
        // setThemeColor(invoice.theme_color);
        // setCurrentColor(invoice.theme_color);
        // setChangeCurrentColor(!colorPickerOptions.includes(invoice.theme_color));
        // setThemeFont(invoice.theme_font);
        // // let {language} = invoice;
        // // setLanguage(language);
        // setLanguage(invoice.language);
        // setCurrency(invoice.currency);
        // setCurrencyCode(invoice.currency.split(" — ")[0]);
        // // setContent(Translation.language);
        // setContent(Translation[invoice.language]);

        let clients_response = await ActionsApi.GetClients({ token }, { business_id });
        console.log("clients_response response = ", clients_response);

        // return [...clients_response.data];
        // setAllClients([...clients_response.data]);
        
        let clientData = [...clients_response.data];
        setAllClients(clientData);

        // console.log("invoice inside InitClients = ", JSON.stringify(invoice, null, 2));

        // if (client_id !== undefined) {
        //   // setClient(clientData[clientData.findIndex(client => client.id == client_id)]);
        //   setClient(allClients[allClients.findIndex(client => client.id == client_id)]);
        // } else {
        //   setClient({
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
        //   });
        // }
        if (invoice_id !== undefined) {
          // let client = allClients[allClients.findIndex(client => client.id == invoice.client_id)];
          let client = clientData[clientData.findIndex(client => client.id == invoice.client_id)];
          setInvoice({
            ...invoice,
            language: client.language,
            currency: client.currency,
          });
          setClient(client);
          // let {language} = client;
          // setLanguage(client.language);
          // setCurrency(client.currency);
          // setCurrencyCode(client.currency.split(" — ")[0]);
          // setContent(Translation[client.language]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    Promise.all([TokenValidation()])
      .then(() => {
        console.log("isTokenValid form invoices promise then = ", isTokenValid)
        if (isTokenValid) {
          // if (!("allClients" in history.location.state)) {
          //   allClients = await InitClients();
          // }
          // if (!("allInvoices" in history.location.state)) {
          //   allInvoices = await InitInvoices();
          // }
          // await InitInvoices();
          // await InitClients();
          InitData();
          // await setInvoice(InitInvoice());
          // await setClient(InitClient());

          // allClients = InitClients();
          // allInvoices = InitInvoices();
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  // function isEmpty(value) {
  //   return value == null || value.length === 0;
  // }

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

  // const [currency, setCurrency] = useState();

  // console.log("currency = ", currency)

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

  // const [language, setLanguage] = useState();

  // console.log("language = ", language)

  // const [content, setContent] = useState({});

  // console.log("Translation = ", JSON.stringify(Translation, null, 2));

  // console.log("content = ", JSON.stringify(content, null, 2));

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

  const handleCloseDialog = () => {
    history.push("/invoices");
  };

  const save = async () => {
    TokenValidation();
    // setValidation({});
    let inputValidation = {};
    // if (billed_to && Object.keys(billed_to).length === 0 && Object.getPrototypeOf(billed_to) === Object.prototype) {
    if (client && Object.keys(client).length === 0 && Object.getPrototypeOf(client) === Object.prototype) {
      inputValidation.billed_to = "Select a client";
      showToast("Select a client");
    }
    // invoiceLineItems.every(invoice_line_item => {
    invoice.invoice_line_items.every(invoice_line_item => {
      const {name, rate, quantity} = invoice_line_item;
      if (name.length === 0 || rate.length === 0 || quantity.length === 0) {
        inputValidation.invoice_line_item = "Invoice line item name, rate, or quantity cannot be empty";
        showToast("Invoice line item name, rate, or quantity cannot be empty");
        return false;
      }
      return true;
    });
    // setValidation(inputValidation);
    if (inputValidation && Object.keys(inputValidation).length === 0 && Object.getPrototypeOf(inputValidation) === Object.prototype) {
      try {
        let invoice_response, line_item_response, data, client_id = client.id;
        // invoice.issued_date = dateFormat(invoice.issued_date);
        // invoice.due_date = dateFormat(invoice.due_date);
        if (invoice.discount === null) {
          delete invoice["discount"];
        }
        if (invoice.deposit === null) {
          delete invoice["deposit"];
        }
        delete invoice["theme_logo"];
        if (theme_logo.length === 0 && save_theme_logo === null) {
          // data = {...invoice, client_id };
          // delete invoice["theme_logo"];
          data = {...invoice, issued_date: dateFormat(invoice.issued_date), due_date: dateFormat(invoice.due_date), client_id};
        } else {
          data = new FormData();
          data.append('client_id', client_id);
          if (save_theme_logo !== null) {
            data.append('theme_logo', save_theme_logo, save_theme_logo.name);
          }
          //  else {
          //   data.append('theme_logo', theme_logo);
          // }
          for (const [key, val] of Object.entries(invoice))
            data.append(key, val);
          
          data.set('issued_date', dateFormat(invoice.issued_date));
          data.set('due_date', dateFormat(invoice.due_date));
        }
        console.log("data beforee = ", data);
        
        if (invoice_id === undefined) {
          // response = await ActionsApi.CreateInvoices({ token }, invoice);
          invoice_response = await ActionsApi.CreateInvoices({ token }, data);
          // line_item_response = await ActionsApi.SetInvoiceLineItems({ token }, { invoice_id: invoice_response.data.invoice.id, invoice_line_items: invoiceLineItems });
        } else {
          // response = await ActionsApi.UpdateInvoices({ token }, { id: invoice_id, ...invoice });
          // data.append('id', invoice_id);
          // data = { id: invoice_id, ...data };
          invoice_response = await ActionsApi.UpdateInvoices({ token }, data);
          // line_item_response = await ActionsApi.SetInvoiceLineItems({ token }, { invoice_id: invoice_id, invoice_line_items: invoiceLineItems });
        }
        console.log("invoice_response = ", invoice_response);
        
        console.log("line_item_response = ", line_item_response);

        // if (user["client"] !== undefined) {
        //   let new_user = {...user};
        //   delete new_user["client"];
        //   new_user = JSON.stringify(new_user);
        //   setUser(new_user);
        //   localStorage.setItem("user", new_user);
        // }

        handleCloseDialog();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const save = async (event) => {
  //   TokenValidation(event);
  //   let token = user.token.access;

  //   if (tabValue === 0) {
  //     let change_response;
  //     if (currentPassword !== "" || newPassword !== "" || confirmNewPassword !== "") {
  //       try {
  //         change_response = await AuthApi.ChangePassword({token}, { current_password: currentPassword, new_password: newPassword, re_new_password: confirmNewPassword });
  //         console.log("response of ChangePassword = ", change_response);
  //       } catch (err) {
  //         console.log(err);
  //         console.log("error response of ChangePassword = ", err.response);
  //         return err.response;
  //       }
  //     }

  //     // if (change_response.status === 204 && change_response.statusText === "No Content") {
  //       try {
  //         let data;
  //         if (profilePhotoSrc.length === 0 && saveProfilePhotoSrc === null) {
  //           data = {
  //             first_name: firstName,
  //             last_name: lastName,
  //             time_zone: timeZone,
  //           };
  //         } else {
  //           data = new FormData();
  //           data.append('first_name', firstName);
  //           data.append('last_name', lastName);
  //           data.append('profile_photo', saveProfilePhotoSrc, saveProfilePhotoSrc.name);
  //           data.append('time_zone', timeZone);
  //         }
  //         let response = await ActionsApi.UpdateAccount({ id: user.id, token }, data);
  //         console.log("response of UpdateAccount = ", response);

  //         let current_user = {...user, ...response.data.user};
  //         current_user = JSON.stringify(current_user);
  //         setUser(current_user);
  //         localStorage.setItem("user", current_user);
  //         setCurrentPassword("");
  //         showToast({title: "Changes to your profile are now saved."});
  //       } catch (err) {
  //         console.log(err);
  //         console.log("error response of UpdateAccount = ", err.response);
  //         // if (err.response) {
  //         //   // return setError(err.response.data.msg);
  //         //   return setError(err.response.data.detail);
  //         // }
  //         // return setError("There has been an error.");
  //       }
  //     // }
  //   } else if (tabValue === 1) {
  //     if (businessName === "") {
  //       return setValidation({business_name: "Enter a business name"});
  //     }
  //     try {
  //       let response, data = {
  //         id: user.business.id,
  //         name: businessName,
  //         business_phone,
  //         mobile_phone,
  //         country,
  //         address_1,
  //         address_2,
  //         city,
  //         state,
  //         zip_code,
  //         base_currency,
  //         time_zone: businessTimeZone,
  //         date_format,
  //         tax_name,
  //         tax_number,
  //         standard_rate,
  //       };
  //       response = await ActionsApi.UpdateBusinessOfAccount({ token }, data);
  //       console.log("response of UpdateBusinessOfAccount = ", response);
  //       // let current_user = {...user};
  //       // current_user.business[0] = {...response.data.business};
  //       let current_user = {...user, business: {...user.business, ...response.data.business}};
  //       current_user = JSON.stringify(current_user);
  //       setUser(current_user);
  //       localStorage.setItem("user", current_user);
  //       showToast({title: "Your Company Profile has been updated.", body: "This information will appear on your invoices."});
  //     } catch (err) {
  //       console.log(err);
  //       console.log("error response of UpdateBusinessOfAccount = ", err.response);
  //     }
  //   } else if (tabValue === 2) {
  //     try {
  //       let data;
  //       if (theme_logo.length === 0 && save_theme_logo === null) {
  //         data = {theme_color, theme_font}
  //       } else {
  //         data = new FormData();
  //         data.append('theme_color', theme_color);
  //         data.append('theme_font', theme_font);
  //         data.append('theme_logo', save_theme_logo, save_theme_logo.name);
  //       }
  //       // let response = await ActionsApi.UpdateLogoThemeOfAccount({ id: user.id, token }, data);
  //       let response = await ActionsApi.UpdateLogoThemeOfAccount({ business_id: user.business.id, token }, data);
  //       console.log("response of UpdateLogoThemeOfAccount = ", response);

  //       // let current_user = {...user, ...response.data.user};
  //       let current_user = {...user, business: {...user.business, ...response.data.business}};
  //       current_user = JSON.stringify(current_user);
  //       setUser(current_user);
  //       localStorage.setItem("user", current_user);
  //       showToast({title: "Your customizations are saved.", body: "Updates will apply to new invoices and more."});
  //     } catch (err) {
  //       console.log(err);
  //       console.log("error response of UpdateLogoThemeOfAccount = ", err.response);
  //     }
  //   }
  // };

    function toastSlideTransition(props) {
      return <Slide {...props} direction="down" />;
    }

    const Alert = forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [toastState, setToastState] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastTransition, setToastTransition] = useState(undefined);

    const showToast = (message) => {
      setToastMessage(message);
      setToastTransition(() => toastSlideTransition);
      setToastState(true);
    };

  const handleToastClose = () => {
    // setToastMessage("");
    // setToastTransition(undefined);
    setToastState(false);
  };

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

  function stringToColor(string) {
    let hash = 0;
  
    /* eslint-disable no-bitwise */
    for (let index = 0; index < string.length; index += 1) {
      hash = string.charCodeAt(index) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (let index = 0; index < 3; index += 1) {
      const value = (hash >> (index * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#fff",
        color: "#001b40",
        borderColor: stringToColor(name),
        borderWidth: 2,
        borderStyle: "solid",
        fontWeight: 500,
        textTransform: "uppercase"
      },
      children: name.split(" ").length > 1 ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : `${name.slice(0, 2)}`,
    };
  }

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



  const uploadLogoRef = useRef();
  // const [profilePhotoSrc, setProfilePhotoSrc] = useState(user.profile_photo ? user.profile_photo : "");
  // const [saveProfilePhotoSrc, setSaveProfilePhotoSrc] = useState(null);

  // console.log("profilePhotoSrc = ", profilePhotoSrc);
  // console.log("saveProfilePhotoSrc = ", saveProfilePhotoSrc);

  // const [theme_logo, setThemeLogo] = useState(user.business.theme_logo ? user.business.theme_logo : "");
  const [theme_logo, setThemeLogo] = useState();
  const [save_theme_logo, setSaveThemeLogo] = useState(null);
  const [hover_theme_logo, setHoverThemeLogo] = useState(false);

  console.log("theme_logo = ", theme_logo);
  console.log("save_theme_logo = ", save_theme_logo);

  const handleChangeUploadLogo = (event) => {
    // console.log("event uploadPhotoRef onChange file = ", event);
    const uploaded = event.target.files[0];
    setThemeLogo(URL.createObjectURL(uploaded));
    setSaveThemeLogo(uploaded);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    // console.log("event datatransfer files handleDrop = ", event.dataTransfer.files);
    if (event.dataTransfer.files.length !== 1) {
      // setValidation({theme_logo: "Can only select one image"});
      // showToast({title: "Can only select one image"});
    } else if (event.dataTransfer.files[0].type !== "image/gif" && event.dataTransfer.files[0].type !== "image/jpeg" && event.dataTransfer.files[0].type !== "image/png" && event.dataTransfer.files[0].type !== "image/tiff") {
      // setValidation({theme_logo: "Image type is not allowed"});
      // showToast({title: "Image type is not allowed"});
    } else {
      const uploaded = event.dataTransfer.files[0];
      setThemeLogo(URL.createObjectURL(uploaded));
      setSaveThemeLogo(uploaded);
    }
  };

  // const [issueDate, setIssueDate] = useState(new Date());
  // const today = new Date();
  // const month = today.getMonth();
  // const [dueDate, setDueDate] = useState(today.setMonth(month + 1));
  // const [reference, setReference] = useState("");
  // const [notes, setNotes] = useState("");
  // const [terms, setTerms] = useState("");

  // console.log("issueDate = ", issueDate);


  const handleChangeDialog = (evt) => {
    // evt.persist();
    // issued_date: dateFormat(new Date()),
    //     due_date: dateFormat(new Date()),
    //     reference: "",
    //     number: ("0000000" + (num + 1)).slice(-"0000000".length),
    //     amount: Number(0).toFixed(2),
    //     business_id,
    console.log("evt in handleChangeDialog = ", evt);
    let { name, value } = evt.target;
    // if (name === "issued_date" || name === "due_date") {
    //   value = dateFormat(value);
    // }
    setInvoice({
      ...invoice,
      [name]: value,
    });
  };

  function range(start, end, step) {
    const len = Math.floor((end - start) / step) + 1;
    return Array(len).fill().map((_, idx) => start + (idx * step));
  }

  // const yearsOptions = range(1990, getYear(new Date()) + 1, 1);
  const yearsOptions = range(1990, new Date().getFullYear() + 1, 1);

  const monthsOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const CustomInput = forwardRef(function CustomInput(props, ref) {
    return (
      <div
        ref={ref}
        {...props}
        style={{
          display: "flex",
          // alignItems: "center",
          alignItems: "baseline",
          justifyContent: "space-between",
          fontSize: "0.875rem !important",
          color: "#495057 !important",
          height: "42px !important",
          "& svg": {
            // height: "100%",
            // float: "right",
            marginLeft: "auto",
            fontSize: 18,
          },
        }}
      >
        <label>
          {props.value || props.placeholder}
        </label>
        <ImCalendar />
      </div>
    );
  });

  CustomInput.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
  };

  // const [invoiceLineItems, setInvoiceLineItems] = useState([]);
  // const [invoiceLineItems, setInvoiceLineItems] = useState();

  // console.log("invoiceLineItems = ", invoiceLineItems);

  // console.log("all countries = ", countries);

  // const localeCodeToEnglish = (loc) => {
  //   if (typeof loc !== 'string') throw new TypeError('Input must be string');
  //   let parts = loc.split('-'),
  //       ISO639_1 = {"ab":"Abkhazian","aa":"Afar","af":"Afrikaans","ak":"Akan","sq":"Albanian","am":"Amharic","ar":"Arabic","an":"Aragonese","hy":"Armenian","as":"Assamese","av":"Avaric","ae":"Avestan","ay":"Aymara","az":"Azerbaijani","bm":"Bambara","ba":"Bashkir","eu":"Basque","be":"Belarusian","bn":"Bengali","bh":"Bihari languages","bi":"Bislama","nb":"Norwegian Bokmål","bs":"Bosnian","br":"Breton","bg":"Bulgarian","my":"Burmese","es":"Spanish","ca":"Valencian","km":"Central Khmer","ch":"Chamorro","ce":"Chechen","ny":"Nyanja","zh":"Chinese","za":"Zhuang","cu":"Old Slavonic","cv":"Chuvash","kw":"Cornish","co":"Corsican","cr":"Cree","hr":"Croatian","cs":"Czech","da":"Danish","dv":"Maldivian","nl":"Flemish","dz":"Dzongkha","en":"English","eo":"Esperanto","et":"Estonian","ee":"Ewe","fo":"Faroese","fj":"Fijian","fi":"Finnish","fr":"French","ff":"Fulah","gd":"Scottish Gaelic","gl":"Galician","lg":"Ganda","ka":"Georgian","de":"German","ki":"Kikuyu","el":"Greek, Modern (1453-)","kl":"Kalaallisut","gn":"Guarani","gu":"Gujarati","ht":"Haitian Creole","ha":"Hausa","he":"Hebrew","hz":"Herero","hi":"Hindi","ho":"Hiri Motu","hu":"Hungarian","is":"Icelandic","io":"Ido","ig":"Igbo","id":"Indonesian","ia":"Interlingua (International Auxiliary Language Association)","ie":"Occidental","iu":"Inuktitut","ik":"Inupiaq","ga":"Irish","it":"Italian","ja":"Japanese","jv":"Javanese","kn":"Kannada","kr":"Kanuri","ks":"Kashmiri","kk":"Kazakh","rw":"Kinyarwanda","ky":"Kyrgyz","kv":"Komi","kg":"Kongo","ko":"Korean","kj":"Kwanyama","ku":"Kurdish","lo":"Lao","la":"Latin","lv":"Latvian","lb":"Luxembourgish","li":"Limburgish","ln":"Lingala","lt":"Lithuanian","lu":"Luba-Katanga","mk":"Macedonian","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese","gv":"Manx","mi":"Maori","mr":"Marathi","mh":"Marshallese","ro":"Romanian","mn":"Mongolian","na":"Nauru","nv":"Navajo","nd":"North Ndebele","nr":"South Ndebele","ng":"Ndonga","ne":"Nepali","se":"Northern Sami","no":"Norwegian","nn":"Nynorsk, Norwegian","ii":"Sichuan Yi","oc":"Occitan (post 1500)","oj":"Ojibwa","or":"Oriya","om":"Oromo","os":"Ossetic","pi":"Pali","pa":"Punjabi","ps":"Pushto","fa":"Persian","pl":"Polish","pt":"Portuguese","qu":"Quechua","rm":"Romansh","rn":"Rundi","ru":"Russian","sm":"Samoan","sg":"Sango","sa":"Sanskrit","sc":"Sardinian","sr":"Serbian","sn":"Shona","sd":"Sindhi","si":"Sinhalese","sk":"Slovak","sl":"Slovenian","so":"Somali","st":"Sotho, Southern","su":"Sundanese","sw":"Swahili","ss":"Swati","sv":"Swedish","tl":"Tagalog","ty":"Tahitian","tg":"Tajik","ta":"Tamil","tt":"Tatar","te":"Telugu","th":"Thai","bo":"Tibetan","ti":"Tigrinya","to":"Tonga (Tonga Islands)","ts":"Tsonga","tn":"Tswana","tr":"Turkish","tk":"Turkmen","tw":"Twi","ug":"Uyghur","uk":"Ukrainian","ur":"Urdu","uz":"Uzbek","ve":"Venda","vi":"Vietnamese","vo":"Volapük","wa":"Walloon","cy":"Welsh","fy":"Western Frisian","wo":"Wolof","xh":"Xhosa","yi":"Yiddish","yo":"Yoruba","zu":"Zulu"},
  //       ISO639_2 = {"abk":"Abkhazian","ace":"Achinese","ach":"Acoli","ada":"Adangme","ady":"Adyghe","aar":"Afar","afh":"Afrihili","afr":"Afrikaans","afa":"Afro-Asiatic languages","ain":"Ainu","aka":"Akan","akk":"Akkadian","alb":"Albanian","sqi":"Albanian","gsw":"Swiss German","ale":"Aleut","alg":"Algonquian languages","tut":"Altaic languages","amh":"Amharic","anp":"Angika","apa":"Apache languages","ara":"Arabic","arg":"Aragonese","arp":"Arapaho","arw":"Arawak","arm":"Armenian","hye":"Armenian","rup":"Macedo-Romanian","art":"Artificial languages","asm":"Assamese","ast":"Leonese","ath":"Athapascan languages","aus":"Australian languages","map":"Austronesian languages","ava":"Avaric","ave":"Avestan","awa":"Awadhi","aym":"Aymara","aze":"Azerbaijani","ban":"Balinese","bat":"Baltic languages","bal":"Baluchi","bam":"Bambara","bai":"Bamileke languages","bad":"Banda languages","bnt":"Bantu languages","bas":"Basa","bak":"Bashkir","baq":"Basque","eus":"Basque","btk":"Batak languages","bej":"Beja","bel":"Belarusian","bem":"Bemba","ben":"Bengali","ber":"Berber languages","bho":"Bhojpuri","bih":"Bihari languages","bik":"Bikol","byn":"Blin","bin":"Edo","bis":"Bislama","zbl":"Blissymbols","nob":"Norwegian Bokmål","bos":"Bosnian","bra":"Braj","bre":"Breton","bug":"Buginese","bul":"Bulgarian","bua":"Buriat","bur":"Burmese","mya":"Burmese","cad":"Caddo","spa":"Spanish","cat":"Valencian","cau":"Caucasian languages","ceb":"Cebuano","cel":"Celtic languages","cai":"Central American Indian languages","khm":"Central Khmer","chg":"Chagatai","cmc":"Chamic languages","cha":"Chamorro","che":"Chechen","chr":"Cherokee","nya":"Nyanja","chy":"Cheyenne","chb":"Chibcha","chi":"Chinese","zho":"Chinese","chn":"Chinook jargon","chp":"Dene Suline","cho":"Choctaw","zha":"Zhuang","chu":"Old Slavonic","chk":"Chuukese","chv":"Chuvash","nwc":"Old Newari","syc":"Classical Syriac","rar":"Rarotongan","cop":"Coptic","cor":"Cornish","cos":"Corsican","cre":"Cree","mus":"Creek","crp":"Creoles and pidgins","cpe":"Creoles and pidgins, English based","cpf":"Creoles and pidgins, French-based","cpp":"Creoles and pidgins, Portuguese-based","crh":"Crimean Turkish","hrv":"Croatian","cus":"Cushitic languages","cze":"Czech","ces":"Czech","dak":"Dakota","dan":"Danish","dar":"Dargwa","del":"Delaware","div":"Maldivian","zza":"Zazaki","din":"Dinka","doi":"Dogri","dgr":"Dogrib","dra":"Dravidian languages","dua":"Duala","dut":"Flemish","nld":"Flemish","dum":"Dutch, Middle (ca.1050-1350)","dyu":"Dyula","dzo":"Dzongkha","frs":"Eastern Frisian","efi":"Efik","egy":"Egyptian (Ancient)","eka":"Ekajuk","elx":"Elamite","eng":"English","enm":"English, Middle (1100-1500)","ang":"English, Old (ca.450-1100)","myv":"Erzya","epo":"Esperanto","est":"Estonian","ewe":"Ewe","ewo":"Ewondo","fan":"Fang","fat":"Fanti","fao":"Faroese","fij":"Fijian","fil":"Pilipino","fin":"Finnish","fiu":"Finno-Ugrian languages","fon":"Fon","fre":"French","fra":"French","frm":"French, Middle (ca.1400-1600)","fro":"French, Old (842-ca.1400)","fur":"Friulian","ful":"Fulah","gaa":"Ga","gla":"Scottish Gaelic","car":"Galibi Carib","glg":"Galician","lug":"Ganda","gay":"Gayo","gba":"Gbaya","gez":"Geez","geo":"Georgian","kat":"Georgian","ger":"German","deu":"German","nds":"Saxon, Low","gmh":"German, Middle High (ca.1050-1500)","goh":"German, Old High (ca.750-1050)","gem":"Germanic languages","kik":"Kikuyu","gil":"Gilbertese","gon":"Gondi","gor":"Gorontalo","got":"Gothic","grb":"Grebo","grc":"Greek, Ancient (to 1453)","gre":"Greek, Modern (1453-)","ell":"Greek, Modern (1453-)","kal":"Kalaallisut","grn":"Guarani","guj":"Gujarati","gwi":"Gwich'in","hai":"Haida","hat":"Haitian Creole","hau":"Hausa","haw":"Hawaiian","heb":"Hebrew","her":"Herero","hil":"Hiligaynon","him":"Western Pahari languages","hin":"Hindi","hmo":"Hiri Motu","hit":"Hittite","hmn":"Mong","hun":"Hungarian","hup":"Hupa","iba":"Iban","ice":"Icelandic","isl":"Icelandic","ido":"Ido","ibo":"Igbo","ijo":"Ijo languages","ilo":"Iloko","arc":"Official Aramaic (700-300 BCE)","smn":"Inari Sami","inc":"Indic languages","ine":"Indo-European languages","ind":"Indonesian","inh":"Ingush","ina":"Interlingua (International Auxiliary Language Association)","ile":"Occidental","iku":"Inuktitut","ipk":"Inupiaq","ira":"Iranian languages","gle":"Irish","mga":"Irish, Middle (900-1200)","sga":"Irish, Old (to 900)","iro":"Iroquoian languages","ita":"Italian","jpn":"Japanese","jav":"Javanese","kac":"Kachin","jrb":"Judeo-Arabic","jpr":"Judeo-Persian","kbd":"Kabardian","kab":"Kabyle","xal":"Oirat","kam":"Kamba","kan":"Kannada","kau":"Kanuri","pam":"Pampanga","kaa":"Kara-Kalpak","krc":"Karachay-Balkar","krl":"Karelian","kar":"Karen languages","kas":"Kashmiri","csb":"Kashubian","kaw":"Kawi","kaz":"Kazakh","kha":"Khasi","khi":"Khoisan languages","kho":"Sakan","kmb":"Kimbundu","kin":"Kinyarwanda","kir":"Kyrgyz","tlh":"tlhIngan-Hol","kom":"Komi","kon":"Kongo","kok":"Konkani","kor":"Korean","kos":"Kosraean","kpe":"Kpelle","kro":"Kru languages","kua":"Kwanyama","kum":"Kumyk","kur":"Kurdish","kru":"Kurukh","kut":"Kutenai","lad":"Ladino","lah":"Lahnda","lam":"Lamba","day":"Land Dayak languages","lao":"Lao","lat":"Latin","lav":"Latvian","ltz":"Luxembourgish","lez":"Lezghian","lim":"Limburgish","lin":"Lingala","lit":"Lithuanian","jbo":"Lojban","dsb":"Lower Sorbian","loz":"Lozi","lub":"Luba-Katanga","lua":"Luba-Lulua","lui":"Luiseno","smj":"Lule Sami","lun":"Lunda","luo":"Luo (Kenya and Tanzania)","lus":"Lushai","mac":"Macedonian","mkd":"Macedonian","mad":"Madurese","mag":"Magahi","mai":"Maithili","mak":"Makasar","mlg":"Malagasy","may":"Malay","msa":"Malay","mal":"Malayalam","mlt":"Maltese","mnc":"Manchu","mdr":"Mandar","man":"Mandingo","mni":"Manipuri","mno":"Manobo languages","glv":"Manx","mao":"Maori","mri":"Maori","arn":"Mapudungun","mar":"Marathi","chm":"Mari","mah":"Marshallese","mwr":"Marwari","mas":"Masai","myn":"Mayan languages","men":"Mende","mic":"Micmac","min":"Minangkabau","mwl":"Mirandese","moh":"Mohawk","mdf":"Moksha","rum":"Romanian","ron":"Romanian","mkh":"Mon-Khmer languages","lol":"Mongo","mon":"Mongolian","mos":"Mossi","mul":"Multiple languages","mun":"Munda languages","nqo":"N'Ko","nah":"Nahuatl languages","nau":"Nauru","nav":"Navajo","nde":"North Ndebele","nbl":"South Ndebele","ndo":"Ndonga","nap":"Neapolitan","new":"Newari","nep":"Nepali","nia":"Nias","nic":"Niger-Kordofanian languages","ssa":"Nilo-Saharan languages","niu":"Niuean","zxx":"Not applicable","nog":"Nogai","non":"Norse, Old","nai":"North American Indian languages","frr":"Northern Frisian","sme":"Northern Sami","nso":"Sotho, Northern","nor":"Norwegian","nno":"Nynorsk, Norwegian","nub":"Nubian languages","iii":"Sichuan Yi","nym":"Nyamwezi","nyn":"Nyankole","nyo":"Nyoro","nzi":"Nzima","oci":"Occitan (post 1500)","pro":"Provençal, Old (to 1500)","oji":"Ojibwa","ori":"Oriya","orm":"Oromo","osa":"Osage","oss":"Ossetic","oto":"Otomian languages","pal":"Pahlavi","pau":"Palauan","pli":"Pali","pag":"Pangasinan","pan":"Punjabi","pap":"Papiamento","paa":"Papuan languages","pus":"Pushto","per":"Persian","fas":"Persian","peo":"Persian, Old (ca.600-400 B.C.)","phi":"Philippine languages","phn":"Phoenician","pon":"Pohnpeian","pol":"Polish","por":"Portuguese","pra":"Prakrit languages","que":"Quechua","raj":"Rajasthani","rap":"Rapanui","qaa-qtz":"Reserved for local use","roa":"Romance languages","roh":"Romansh","rom":"Romany","run":"Rundi","rus":"Russian","sal":"Salishan languages","sam":"Samaritan Aramaic","smi":"Sami languages","smo":"Samoan","sad":"Sandawe","sag":"Sango","san":"Sanskrit","sat":"Santali","srd":"Sardinian","sas":"Sasak","sco":"Scots","sel":"Selkup","sem":"Semitic languages","srp":"Serbian","srr":"Serer","shn":"Shan","sna":"Shona","scn":"Sicilian","sid":"Sidamo","sgn":"Sign Languages","bla":"Siksika","snd":"Sindhi","sin":"Sinhalese","sit":"Sino-Tibetan languages","sio":"Siouan languages","sms":"Skolt Sami","den":"Slave (Athapascan)","sla":"Slavic languages","slo":"Slovak","slk":"Slovak","slv":"Slovenian","sog":"Sogdian","som":"Somali","son":"Songhai languages","snk":"Soninke","wen":"Sorbian languages","sot":"Sotho, Southern","sai":"South American Indian languages","alt":"Southern Altai","sma":"Southern Sami","srn":"Sranan Tongo","suk":"Sukuma","sux":"Sumerian","sun":"Sundanese","sus":"Susu","swa":"Swahili","ssw":"Swati","swe":"Swedish","syr":"Syriac","tgl":"Tagalog","tah":"Tahitian","tai":"Tai languages","tgk":"Tajik","tmh":"Tamashek","tam":"Tamil","tat":"Tatar","tel":"Telugu","ter":"Tereno","tet":"Tetum","tha":"Thai","tib":"Tibetan","bod":"Tibetan","tig":"Tigre","tir":"Tigrinya","tem":"Timne","tiv":"Tiv","tli":"Tlingit","tpi":"Tok Pisin","tkl":"Tokelau","tog":"Tonga (Nyasa)","ton":"Tonga (Tonga Islands)","tsi":"Tsimshian","tso":"Tsonga","tsn":"Tswana","tum":"Tumbuka","tup":"Tupi languages","tur":"Turkish","ota":"Turkish, Ottoman (1500-1928)","tuk":"Turkmen","tvl":"Tuvalu","tyv":"Tuvinian","twi":"Twi","udm":"Udmurt","uga":"Ugaritic","uig":"Uyghur","ukr":"Ukrainian","umb":"Umbundu","mis":"Uncoded languages","und":"Undetermined","hsb":"Upper Sorbian","urd":"Urdu","uzb":"Uzbek","vai":"Vai","ven":"Venda","vie":"Vietnamese","vol":"Volapük","vot":"Votic","wak":"Wakashan languages","wln":"Walloon","war":"Waray","was":"Washo","wel":"Welsh","cym":"Welsh","fry":"Western Frisian","wal":"Wolaytta","wol":"Wolof","xho":"Xhosa","sah":"Yakut","yao":"Yao","yap":"Yapese","yid":"Yiddish","yor":"Yoruba","ypk":"Yupik languages","znd":"Zande languages","zap":"Zapotec","zen":"Zenaga","zul":"Zulu","zun":"Zuni"},
  //       ISO3166_1 = {"AF":"AFGHANISTAN","AX":"ÅLAND ISLANDS","AL":"ALBANIA","DZ":"ALGERIA","AS":"AMERICAN SAMOA","AD":"ANDORRA","AO":"ANGOLA","AI":"ANGUILLA","AQ":"ANTARCTICA","AG":"ANTIGUA AND BARBUDA","AR":"ARGENTINA","AM":"ARMENIA","AW":"ARUBA","AU":"AUSTRALIA","AT":"AUSTRIA","AZ":"AZERBAIJAN","BS":"BAHAMAS","BH":"BAHRAIN","BD":"BANGLADESH","BB":"BARBADOS","BY":"BELARUS","BE":"BELGIUM","BZ":"BELIZE","BJ":"BENIN","BM":"BERMUDA","BT":"BHUTAN","BO":"BOLIVIA, PLURINATIONAL STATE OF","BQ":"BONAIRE, SINT EUSTATIUS AND SABA","BA":"BOSNIA AND HERZEGOVINA","BW":"BOTSWANA","BV":"BOUVET ISLAND","BR":"BRAZIL","IO":"BRITISH INDIAN OCEAN TERRITORY","BN":"BRUNEI DARUSSALAM","BG":"BULGARIA","BF":"BURKINA FASO","BI":"BURUNDI","KH":"CAMBODIA","CM":"CAMEROON","CA":"CANADA","CV":"CAPE VERDE","KY":"CAYMAN ISLANDS","CF":"CENTRAL AFRICAN REPUBLIC","TD":"CHAD","CL":"CHILE","CN":"CHINA","CX":"CHRISTMAS ISLAND","CC":"COCOS (KEELING) ISLANDS","CO":"COLOMBIA","KM":"COMOROS","CG":"CONGO","CD":"CONGO, THE DEMOCRATIC REPUBLIC OF THE","CK":"COOK ISLANDS","CR":"COSTA RICA","CI":"CÔTE D'IVOIRE","HR":"CROATIA","CU":"CUBA","CW":"CURAÇAO","CY":"CYPRUS","CZ":"CZECH REPUBLIC","DK":"DENMARK","DJ":"DJIBOUTI","DM":"DOMINICA","DO":"DOMINICAN REPUBLIC","EC":"ECUADOR","EG":"EGYPT","SV":"EL SALVADOR","GQ":"EQUATORIAL GUINEA","ER":"ERITREA","EE":"ESTONIA","ET":"ETHIOPIA","FK":"FALKLAND ISLANDS (MALVINAS)","FO":"FAROE ISLANDS","FJ":"FIJI","FI":"FINLAND","FR":"FRANCE","GF":"FRENCH GUIANA","PF":"FRENCH POLYNESIA","TF":"FRENCH SOUTHERN TERRITORIES","GA":"GABON","GM":"GAMBIA","GE":"GEORGIA","DE":"GERMANY","GH":"GHANA","GI":"GIBRALTAR","GR":"GREECE","GL":"GREENLAND","GD":"GRENADA","GP":"GUADELOUPE","GU":"GUAM","GT":"GUATEMALA","GG":"GUERNSEY","GN":"GUINEA","GW":"GUINEA-BISSAU","GY":"GUYANA","HT":"HAITI","HM":"HEARD ISLAND AND MCDONALD ISLANDS","VA":"HOLY SEE (VATICAN CITY STATE)","HN":"HONDURAS","HK":"HONG KONG","HU":"HUNGARY","IS":"ICELAND","IN":"INDIA","ID":"INDONESIA","IR":"IRAN, ISLAMIC REPUBLIC OF","IQ":"IRAQ","IE":"IRELAND","IM":"ISLE OF MAN","IL":"ISRAEL","IT":"ITALY","JM":"JAMAICA","JP":"JAPAN","JE":"JERSEY","JO":"JORDAN","KZ":"KAZAKHSTAN","KE":"KENYA","KI":"KIRIBATI","KP":"KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF","KR":"KOREA, REPUBLIC OF","KW":"KUWAIT","KG":"KYRGYZSTAN","LA":"LAO PEOPLE'S DEMOCRATIC REPUBLIC","LV":"LATVIA","LB":"LEBANON","LS":"LESOTHO","LR":"LIBERIA","LY":"LIBYA","LI":"LIECHTENSTEIN","LT":"LITHUANIA","LU":"LUXEMBOURG","MO":"MACAO","MK":"MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF","MG":"MADAGASCAR","MW":"MALAWI","MY":"MALAYSIA","MV":"MALDIVES","ML":"MALI","MT":"MALTA","MH":"MARSHALL ISLANDS","MQ":"MARTINIQUE","MR":"MAURITANIA","MU":"MAURITIUS","YT":"MAYOTTE","MX":"MEXICO","FM":"MICRONESIA, FEDERATED STATES OF","MD":"MOLDOVA, REPUBLIC OF","MC":"MONACO","MN":"MONGOLIA","ME":"MONTENEGRO","MS":"MONTSERRAT","MA":"MOROCCO","MZ":"MOZAMBIQUE","MM":"MYANMAR","NA":"NAMIBIA","NR":"NAURU","NP":"NEPAL","NL":"NETHERLANDS","NC":"NEW CALEDONIA","NZ":"NEW ZEALAND","NI":"NICARAGUA","NE":"NIGER","NG":"NIGERIA","NU":"NIUE","NF":"NORFOLK ISLAND","MP":"NORTHERN MARIANA ISLANDS","NO":"NORWAY","OM":"OMAN","PK":"PAKISTAN","PW":"PALAU","PS":"PALESTINIAN TERRITORY, OCCUPIED","PA":"PANAMA","PG":"PAPUA NEW GUINEA","PY":"PARAGUAY","PE":"PERU","PH":"PHILIPPINES","PN":"PITCAIRN","PL":"POLAND","PT":"PORTUGAL","PR":"PUERTO RICO","QA":"QATAR","RE":"RÉUNION","RO":"ROMANIA","RU":"RUSSIAN FEDERATION","RW":"RWANDA","BL":"SAINT BARTHÉLEMY","SH":"SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA","KN":"SAINT KITTS AND NEVIS","LC":"SAINT LUCIA","MF":"SAINT MARTIN (FRENCH PART)","PM":"SAINT PIERRE AND MIQUELON","VC":"SAINT VINCENT AND THE GRENADINES","WS":"SAMOA","SM":"SAN MARINO","ST":"SAO TOME AND PRINCIPE","SA":"SAUDI ARABIA","SN":"SENEGAL","RS":"SERBIA","SC":"SEYCHELLES","SL":"SIERRA LEONE","SG":"SINGAPORE","SX":"SINT MAARTEN (DUTCH PART)","SK":"SLOVAKIA","SI":"SLOVENIA","SB":"SOLOMON ISLANDS","SO":"SOMALIA","ZA":"SOUTH AFRICA","GS":"SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS","SS":"SOUTH SUDAN","ES":"SPAIN","LK":"SRI LANKA","SD":"SUDAN","SR":"SURINAME","SJ":"SVALBARD AND JAN MAYEN","SZ":"SWAZILAND","SE":"SWEDEN","CH":"SWITZERLAND","SY":"SYRIAN ARAB REPUBLIC","TW":"TAIWAN, PROVINCE OF CHINA","TJ":"TAJIKISTAN","TZ":"TANZANIA, UNITED REPUBLIC OF","TH":"THAILAND","TL":"TIMOR-LESTE","TG":"TOGO","TK":"TOKELAU","TO":"TONGA","TT":"TRINIDAD AND TOBAGO","TN":"TUNISIA","TR":"TURKEY","TM":"TURKMENISTAN","TC":"TURKS AND CAICOS ISLANDS","TV":"TUVALU","UG":"UGANDA","UA":"UKRAINE","AE":"UNITED ARAB EMIRATES","GB":"UNITED KINGDOM","US":"UNITED STATES","UM":"UNITED STATES MINOR OUTLYING ISLANDS","UY":"URUGUAY","UZ":"UZBEKISTAN","VU":"VANUATU","VE":"VENEZUELA, BOLIVARIAN REPUBLIC OF","VN":"VIET NAM","VG":"VIRGIN ISLANDS, BRITISH","VI":"VIRGIN ISLANDS, U.S.","WF":"WALLIS AND FUTUNA","EH":"WESTERN SAHARA","YE":"YEMEN","ZM":"ZAMBIA","ZW":"ZIMBABWE"};
  //   if (parts.length > 2) throw new SyntaxError('Unexpected number of segments ' + parts.length);
  //   if (parts.length > 1)
  //       return (ISO639_1[parts[0]] || ISO639_2[parts[0]] || parts[0]) + ', ' + (ISO3166_1[parts[1]] || parts[1]);
  //   if (parts.length > 0)
  //       return ISO639_1[parts[0]] || ISO639_2[parts[0]] || ISO3166_1[parts[0]] || parts[0];
  //   return '';
  // };

  // var [a, b, c] = str.split('-');
  // const [] = localeCodeToEnglish

  // console.log(new Intl.NumberFormat(userLocale, { style: 'currency', currency: 'EUR' }).format(number));

  // const countryISOCode = country_abbreviation[country_abbreviation.findIndex(data => data.country.trim().toLowerCase() === user.business.country.trim().toLowerCase())].abbreviation;
  // const countryISOCode = country_abbreviation[country_abbreviation.findIndex(data => data.country.trim().toLowerCase() === user.business.country.trim().toLowerCase())].abbreviation;
//   {
//     "country": "Germany",
//     "abbreviation": "DE"
// },
// countryISOCode =  DE
// form.js:1764 currencyCode =  EUR
  // const currencyCode = country_to_currency[String(countryISOCode)];

  // console.log("countryISOCode = ", countryISOCode);
  // console.log("currencyCode = ", currencyCode);

  // const currencyCode = currency.split(" — ")[0];

  const [currencyCode, setCurrencyCode] = useState();
  

  console.log("currencyCode = ", currencyCode);


  const currencyFormat = (value) => {
    // return new Intl.NumberFormat(`en-${countryISOCode}`, {
    // let currencyCode = country_to_currency[String(countryISOCode(country))];
      // let currencyName = checkState("base_currency") ? user.business.base_currency.trim() : baseCurrencyStandard
      return new Intl.NumberFormat(userLocale, {
        style: "currency",
        // currency: user.business.base_currency.split(" — ")[0],
        // currency: baseCurrency.split(" — ")[0],
        // currency: currencyName.split(" — ")[0],

        currency: currencyCode,
        // maximumFractionDigits: 0,
        // minimumFractionDigits: 0,
      }).format(value);
  };

  const addInvoiceLineItems = () => {
    // let newInvoiceLineItems = [...invoiceLineItems];
    // newInvoiceLineItems.push({
    //   invoice_id: allInvoices.length + 1,
    //   name: "",
    //   description: "",
    //   rate: "",
    //   quantity: 1,
    //   sales_taxes: [],
    // });
    // setInvoiceLineItems(newInvoiceLineItems);

    let newInvoiceLineItems = [...invoice.invoice_line_items];
    newInvoiceLineItems.push({
      invoice_id: allInvoices.length + 1,
      name: "",
      description: "",
      rate: "",
      quantity: 1,
      sales_taxes: [],
    });
    setInvoice({
      ...invoice,
      invoice_line_items: [...newInvoiceLineItems],
    });
  };

  const handleChangeInvoiceLineItems = (evt, index) => {
    console.log("evt in handleChangeInvoiceLineItems = ", evt);
    console.log("index in handleChangeInvoiceLineItems = ", index);

    const { name, value } = evt.target;
    // let newInvoiceLineItems = [...invoiceLineItems];
    let newInvoiceLineItems = [...invoice.invoice_line_items];
    newInvoiceLineItems[index] = {
      ...newInvoiceLineItems[index],
      [name]: value,
    };
    // setInvoiceLineItems(newInvoiceLineItems);
    setInvoice({
      ...invoice,
      invoice_line_items: [...newInvoiceLineItems],
    });



    // console.log("evt in handleChangeDialog = ", evt);
    // let { name, value } = evt.target;
    // // if (name === "issued_date" || name === "due_date") {
    // //   value = dateFormat(value);
    // // }
    // setInvoice({
    //   ...invoice,
    //   [name]: value,
    // });
  };


  // const [paymentMethodRadio, setPaymentMethodRadio] = useState(false);

  // const [paymentMethodRadio, setPaymentMethodRadio] = useState(invoice.online_payments);

  // console.log("paymentMethodRadio = ", paymentMethodRadio);

  // const [invoiceSettings, setInvoiceSettings] = useState({
  //   online_payments: invoice.online_payments,
  // });

  // const [clientSettings, setClientSettings] = useState({});

  const colorPickerOptions = [
    "#663399",
    "#dc143c",
    "#1460aa",
    "#1e824c",
    "#4f697a",
  ];

  const themeFontOptions = [
    "Modern (Helvetica)",
    "Classic (Garamond)",
  ];

  // const [theme_color, setThemeColor] = useState(user.business.theme_color);
  const [theme_color, setThemeColor] = useState(invoice.theme_color);
  const [currentColor, setCurrentColor] = useState(theme_color ? theme_color : {});
  // const [changeCurrentColor, setChangeCurrentColor] = useState(false);
  const [changeCurrentColor, setChangeCurrentColor] = useState(!colorPickerOptions.includes(theme_color));
  const [anchorElChromePicker, setAnchorElChromePicker] = useState(null);
  const openChromePicker = Boolean(anchorElChromePicker);

  console.log("changeCurrentColor = ", changeCurrentColor);
  console.log("currentColor = ", currentColor);
  console.log("theme_color = ", theme_color);

  const handleClickOpenChromePicker = (event) => {
    setAnchorElChromePicker(event.currentTarget);
  };

  const handleCloseChromePicker = () => {
    setAnchorElChromePicker(null);
  };

  const handleChangeComplete = (color) => {
    setChangeCurrentColor(true);
    setThemeColor(color.hex);
    setCurrentColor(color);
  };

  const [theme_font, setThemeFont] = useState();

  console.log("theme_font = ", theme_font);

  const invoiceSettingsCancel = () => {
    // if (invoice_id === undefined) {

    // } else {

    // }
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

    // setSendRemindersCheck(client.send_payment_reminders);
    // setReminders(reminders);
    // setChargeLateFeesCheck(client.charge_late_fees);
    // setLateFeeAmountRadio(lateFeeAmountRadio);
    // setLateFeeValue(client.late_fee_amount);
    // setLateFeeDays(client.number_days);
    // setLanguageOptionsValue(client.language);
    // setCurrencyOptionsValue(client.currency);
    // setInvoiceAttachmentsCheck(client.invoice_attachments);

    // setInvoice(invoice);
    
    setThemeColor(invoice.theme_color);
    setCurrentColor(invoice.theme_color);
    setChangeCurrentColor(!colorPickerOptions.includes(invoice.theme_color));
    setThemeFont(invoice.theme_font);

    // let obj = invoice_id === undefined ? {...invoice} : {...client};
    let obj = {...invoice};

    setLanguage(obj.language);
    setCurrency(obj.currency);
    setCurrencyCode(obj.currency.split(" — ")[0]);
    setContent(Translation[obj.language]);
  };

  const invoiceSettingsDone = () => {
  //   if (history.location.pathname === `${url}/late-reminders`) {
  //     // setClientSettings({ ...clientSettings, sendReminders: sendRemindersCheck, reminders: reminderList, });
  //     setReminders(reminders);
  //     // setClient({ ...client, send_payment_reminders: sendRemindersCheck, });
  //     setClient({ ...client, send_payment_reminders: client.send_payment_reminders, });
  //   } else if (history.location.pathname === `${url}/late-fees`) {
  //     // setClientSettings({
  //     //   ...clientSettings, chargeLateFees: chargeLateFeesCheck,
  //     //   lateFee: {
  //     //     type: lateFeeAmountRadio,
  //     //     value: lateFeeValue,
  //     //     days: lateFeeDays,
  //     //   },
  //     // });

  //     //   percentage_invoice_value: false,
  // //   percentage_outstanding_balance: false,
  // //   flat_fee: false,

  // //   late_fee_amount: 0,
  // //   number_days: 0,

  // // if (client.percentage_invoice_value) {
  // //   return "invoice";
  // // } else if (client.percentage_outstanding_balance) {
  // //   return "outstanding";
  // // } else if (client.flat_fee) {
  // //   return "flat";
  // // } else {
  // //   return "";
  // // }

  // //     if (lateFeeAmountRadio) {
        
  // //     }
  //     let lateFees = {
  //       percentage_invoice_value: lateFeeAmountRadio === "invoice",
  //       percentage_outstanding_balance: lateFeeAmountRadio === "outstanding",
  //       flat_fee: lateFeeAmountRadio === "flat",
  //     };
  //     // setClient({ ...client, charge_late_fees: chargeLateFeesCheck, ...lateFees, late_fee_amount: lateFeeValue, number_days: lateFeeDays, });
  //     setClient({ ...client, charge_late_fees: client.charge_late_fees, ...lateFees, late_fee_amount: client.late_fee_amount, number_days: client.number_days, });
  //   } else if (history.location.pathname === `${url}/currency-language`) {
  //     // setClientSettings({ ...clientSettings, language: languageOptionsValue, currency: currencyOptionsValue, });
  //     // setClient({ ...client, language: languageOptionsValue, currency: currencyOptionsValue, });
  //     setClient(client);
  //   } else if (history.location.pathname === `${url}/invoice-attachments`) {
  //     // setClientSettings({ ...clientSettings, invoiceAttachments: invoiceAttachmentsCheck, });
  //     // setClient({ ...client, invoice_attachments: invoiceAttachmentsCheck, });
  //     setClient(client);
  //   }
    
    setInvoice({
      ...invoice,
      theme_color,
      theme_font,
      language,
      currency,
    });
    history.push(url);
  };

  // const initLateFeeAmountRadio = () => {
  //   if (client.percentage_invoice_value) {
  //     return "invoice";
  //   } else if (client.percentage_outstanding_balance) {
  //     return "outstanding";
  //   } else if (client.flat_fee) {
  //     return "flat";
  //   } else {
  //     return "";
  //   }
  // };
    
    
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
      // const [sendRemindersCheck, setSendRemindersCheck] = useState(client.send_payment_reminders ? client.send_payment_reminders : false);

      // const [reminderList, setReminderList] = useState(initClientSettings.reminders);

    //   const [reminders, setReminders] = useState([]);
    //   const [personalMessage, setPersonalMessage] = useState("");
      
    //   // const [chargeLateFeesCheck, setChargeLateFeesCheck] = useState(client.charge_late_fees ? client.charge_late_fees : false);
    //   const [lateFeeAmountRadio, setLateFeeAmountRadio] = useState(initLateFeeAmountRadio);
    //   // const [lateFeeValue, setLateFeeValue] = useState(client.late_fee_amount ? client.late_fee_amount : 0);
    //   // const [lateFeeDays, setLateFeeDays] = useState(client.number_days ? client.number_days : 0);
    //   // lateFee: {
    //   //   type: lateFeeAmountRadio,
    //   //   value: lateFeeValue,
    //   //   days: lateFeeDays,
    //   // },

    //   // const [languageOptionsValue, setLanguageOptionsValue] = useState(client.language ? client.language : languageOptions[0]);
    //   // const [currencyOptionsValue, setCurrencyOptionsValue] = useState(client.currency ? client.currency : user.business.base_currency);
    //   // const [invoiceAttachmentsCheck, setInvoiceAttachmentsCheck] = useState(client.invoice_attachments ? client.invoice_attachments : false);
    
    //   // console.log("clientSettings = ", JSON.stringify(clientSettings, null, 2));
    //   // console.log("reminderList = ", JSON.stringify(reminderList, null, 2));
    //   console.log("reminders = ", JSON.stringify(reminders, null, 2));
    
    //   const handleChangeLateReminders = (evt) => {
    //     console.log("evt in handleChangeLateReminders = ", evt);
    //     const { name, value } = evt.target, { data } = evt.nativeEvent;
    //     let index = parseInt(name.split("-")[0]), key = name.split("-")[1], newReminders = [...reminders];
    //     if (key === "numberOfDays") {
    //       if (data === null) {
    //         newReminders[index].numberOfDays = value;
    //       } else {
    //         if (/^[0-9\b]+$/.test(data)) {
    //           // newReminderList[index].numberOfDays += evt.nativeEvent.data;
    //           newReminders[index].numberOfDays = value;
    //         }
    //       }
    //     } else {
    //       setPersonalMessage(value);
    //       newReminders[index].personalMessage = value;
    //     }
    //     setReminders(newReminders);
    //   };
    
    //   const handleChangeDueDate = (evt) => {
    //     console.log("evt in handleChangeDueDate = ", evt);
    //     const { name, value } = evt.target;
    //     let index = parseInt(name.split("-")[0]), newReminders = [...reminders];
    //     newReminders[index].dueDate = value;
    //     setReminders(newReminders);
    //   };
    
    //   const handleChangeLateFees = (evt) => {
    //     // console.log("evt in handleChangeLateFees = ", evt);
    //     const { name, value } = evt.target, { data } = evt.nativeEvent;
    //     if (name === "lateFeeValue") {
    //       // let newLateFeeValue = lateFeeValue;
    //       let newLateFeeValue = client.late_fee_amount;
    //       if (data === null) {
    //         newLateFeeValue = value;
    //       } else {
    //         if (/^[0-9\b]+$/.test(data)) {
    //           newLateFeeValue = value;
    //         }
    //       }
    //       // setLateFeeValue(newLateFeeValue);
    //       setClient({ ...client, late_fee_amount: newLateFeeValue, });
    //     } else {
    //       // let newLateFeeDays = lateFeeDays;
    //       let newLateFeeDays = client.number_days;
    //       if (data === null) {
    //         newLateFeeDays = value;
    //       } else {
    //         if (/^[0-9\b]+$/.test(data)) {
    //           newLateFeeDays = value;
    //         }
    //       }
    //       // setLateFeeDays(newLateFeeDays);
    //       setClient({ ...client, number_days: newLateFeeDays, });
    //     }
    //   };
    
    //   // const handlePressLateFees = (evt) => {
    //   //     console.log("evt in handlePressLateFees = ", evt);
    //   //     let key = evt.which ? evt.which : evt.keyCode;
    //   //     console.log("key in handlePressLateFees = ", key);
    //   //     return key > 47 && key < 58
    //   //     // return (event.which >= 48 && event.which <= 57) || event.which == 8 || event.which == 46 || event.which == 37 || event.which == 39
    //   // };
    
    //   const clientSettingsCancel = () => {
    //     history.push(url);
    //     // setSendRemindersCheck(clientSettings.sendReminders);
    //     // setReminderList(clientSettings.reminders);
    //     // setChargeLateFeesCheck(clientSettings.chargeLateFees);
    //     // setLateFeeAmountRadio(clientSettings.lateFee.type);
    //     // setLateFeeValue(clientSettings.lateFee.value);
    //     // setLateFeeDays(clientSettings.lateFee.days);
    //     // setLanguageOptionsValue(clientSettings.language);
    //     // setCurrencyOptionsValue(clientSettings.currency);
    //     // setInvoiceAttachmentsCheck(clientSettings.invoiceAttachments);
    
    //     // const [sendRemindersCheck, setSendRemindersCheck] = useState(client.send_payment_reminders);
    //     // // const [reminderList, setReminderList] = useState(initClientSettings.reminders);
    //     // const [reminder, setReminder] = useState([]);
    //     // const [personalMessage, setPersonalMessage] = useState("");
        
    //     // const [chargeLateFeesCheck, setChargeLateFeesCheck] = useState(client.charge_late_fees);
    //     // const [lateFeeAmountRadio, setLateFeeAmountRadio] = useState(initLateFeeAmountRadio);
    //     // const [lateFeeValue, setLateFeeValue] = useState(client.late_fee_amount);
    //     // const [lateFeeDays, setLateFeeDays] = useState(client.number_days);
    //     // // lateFee: {
    //     // //   type: lateFeeAmountRadio,
    //     // //   value: lateFeeValue,
    //     // //   days: lateFeeDays,
    //     // // },
    //     // const [languageOptionsValue, setLanguageOptionsValue] = useState(client.language);
    //     // const [currencyOptionsValue, setCurrencyOptionsValue] = useState(client.currency);
    //     // const [invoiceAttachmentsCheck, setInvoiceAttachmentsCheck] = useState(client.invoice_attachments);

    //     // setSendRemindersCheck(client.send_payment_reminders);
    //     // setReminders(reminders);
    //     // setChargeLateFeesCheck(client.charge_late_fees);
    //     // setLateFeeAmountRadio(lateFeeAmountRadio);
    //     // setLateFeeValue(client.late_fee_amount);
    //     // setLateFeeDays(client.number_days);
    //     // setLanguageOptionsValue(client.language);
    //     // setCurrencyOptionsValue(client.currency);
    //     // setInvoiceAttachmentsCheck(client.invoice_attachments);
    //     setClient(client);
    //   };
    
    // // setClient({
    //   //   first_name: "",
    //   //   last_name: "",
    //   //   company_name: "",
    //   //   email: "",
    //   //   phone_number: "",
    //   //   business_phone: "",
    //   //   mobile_phone: "",
    //   //   country: countryOptions[0],
    //   //   address_1: "",
    //   //   address_2: "",
    //   //   city: "",
    //   //   state: "",
    //   //   zip_code: "",
    //   //   tax_name: "",
    //   //   tax_number: "",
    //   //   send_payment_reminders: false,
    //   //   charge_late_fees: false,
    
    //   //   percentage_invoice_value: false,
    //   //   percentage_outstanding_balance: false,
    //   //   flat_fee: false,
    
    //   //   late_fee_amount: 0,
    //   //   number_days: 0,
    //   //   currency: languageOptions[0],
    //   //   language: currencyOptions[0],
    //   //   invoice_attachments: false,
    //   //   business_id,
    //   // });
    
    //   const clientSettingsDone = () => {
    //     if (history.location.pathname === `${url}/late-reminders`) {
    //       // setClientSettings({ ...clientSettings, sendReminders: sendRemindersCheck, reminders: reminderList, });
    //       setReminders(reminders);
    //       // setClient({ ...client, send_payment_reminders: sendRemindersCheck, });
    //       setClient({ ...client, send_payment_reminders: client.send_payment_reminders, });
    //     } else if (history.location.pathname === `${url}/late-fees`) {
    //       // setClientSettings({
    //       //   ...clientSettings, chargeLateFees: chargeLateFeesCheck,
    //       //   lateFee: {
    //       //     type: lateFeeAmountRadio,
    //       //     value: lateFeeValue,
    //       //     days: lateFeeDays,
    //       //   },
    //       // });
    
    //       //   percentage_invoice_value: false,
    //   //   percentage_outstanding_balance: false,
    //   //   flat_fee: false,
    
    //   //   late_fee_amount: 0,
    //   //   number_days: 0,
    
    //   // if (client.percentage_invoice_value) {
    //   //   return "invoice";
    //   // } else if (client.percentage_outstanding_balance) {
    //   //   return "outstanding";
    //   // } else if (client.flat_fee) {
    //   //   return "flat";
    //   // } else {
    //   //   return "";
    //   // }
    
    //   //     if (lateFeeAmountRadio) {
            
    //   //     }
    //       let lateFees = {
    //         percentage_invoice_value: lateFeeAmountRadio === "invoice",
    //         percentage_outstanding_balance: lateFeeAmountRadio === "outstanding",
    //         flat_fee: lateFeeAmountRadio === "flat",
    //       };
    //       // setClient({ ...client, charge_late_fees: chargeLateFeesCheck, ...lateFees, late_fee_amount: lateFeeValue, number_days: lateFeeDays, });
    //       setClient({ ...client, charge_late_fees: client.charge_late_fees, ...lateFees, late_fee_amount: client.late_fee_amount, number_days: client.number_days, });
    //     } else if (history.location.pathname === `${url}/currency-language`) {
    //       // setClientSettings({ ...clientSettings, language: languageOptionsValue, currency: currencyOptionsValue, });
    //       // setClient({ ...client, language: languageOptionsValue, currency: currencyOptionsValue, });
    //       setClient(client);
    //     } else if (history.location.pathname === `${url}/invoice-attachments`) {
    //       // setClientSettings({ ...clientSettings, invoiceAttachments: invoiceAttachmentsCheck, });
    //       // setClient({ ...client, invoice_attachments: invoiceAttachmentsCheck, });
    //       setClient(client);
    //     }
    //     history.push(url);
    //   };
    
    //   const toggleReminders = () => {
    //     // setSendRemindersCheck(!sendRemindersCheck);
    //     // let newClient = {...client};
    //     // newClient.send_payment_reminders = !client.send_payment_reminders;
    //     // setClient(newClient);
    //     setClient({ ...client, send_payment_reminders: !client.send_payment_reminders, });
    //     // if (clientSettings.reminders.length === 0) {
    //     if (reminders.length === 0) {
    //       const initReminder = [{
    //         numberOfDays: 5,
    //         dueDate: "after",
    //         personalMessage: "",
    //       }];
    //       // setReminderList(initReminder);
    //       setReminders(initReminder);
    
    //       // setClientSettings({ ...clientSettings, reminders: initReminder, });
    //       // client
    //     }
    //     // setClient({ ...client, send_payment_reminders: sendRemindersCheck, });
    
    //     // newClient = {...client};
    
    //   };
    
    //   const addReminders = () => {
    //     // let newReminderList = [...reminderList];
    //     // newReminderList.push({
    //     //   numberOfDays: reminderList.length === 1 ? 15 : 30,
    //     //   dueDate: "after",
    //     //   personalMessage: "",
    //     // });
    //     // setReminderList(newReminderList);
    //     // setClientSettings({ ...clientSettings, reminders: newReminderList, });
    
    //     let newReminder = [...reminders];
    //     newReminder.push({
    //       numberOfDays: reminders.length === 1 ? 15 : 30,
    //       dueDate: "after",
    //       personalMessage: "",
    //     });
    //     setReminders(newReminder);
    //   };
    
    //   const setReminderMessage = (value) => {
    //     // let newReminderList = [...reminderList];
    //     // newReminderList[tempIndex].personalMessage = value;
    //     // setReminderList(newReminderList);
    //     // setClientSettings({ ...clientSettings, reminders: newReminderList, });
    
    //     let newReminder = [...reminders];
    //     newReminder[tempIndex].personalMessage = value;
    //     setReminders(newReminder);
    //   };
    
    //   const doneReminderMessage = () => {
    //     handleCloseReminderMessage();
    //     setReminderMessage(personalMessage);
    //   };
    
    //   const cancelReminderMessage = () => {
    //     handleCloseReminderMessage();
    //     setReminderMessage("");
    
    //     // let message;
    //     // console.log(JSON.stringify(clientSettings.reminders, null, 2));
    //     // if (clientSettings.reminders.length === 0) {
    //     //     message = "";
    //     // } else {
    //     //     console.log("previous personalMessage in clientSettings = ", clientSettings.reminders[tempIndex].personalMessage)
    //     //     message = clientSettings.reminders[tempIndex].personalMessage;
    //     // }
    //     // setReminderMessage(message);
    //   };
    
    //   const deleteReminders = (index) => {
    //     // let newReminderList = [...reminderList];
    //     // newReminderList.splice(index, 1);
    //     // setReminderList(newReminderList);
    //     // setClientSettings({ ...clientSettings, reminders: newReminderList, });
    
    //     let newReminder = [...reminders];
    //     newReminder.splice(index, 1);
    //     setReminders(newReminder);
    //   };
    
    //   let descriptionLateReminders = "";
    //   // if (!clientSettings.sendReminders) {
    //     // setClient({ ...client, send_payment_reminders: sendRemindersCheck, });
    //   if (!client.send_payment_reminders) {
    //     descriptionLateReminders = "At Customizable Intervals";
    //   } else {
    //     // d1 = 5
    //     // d2 = 15
    //     // d3 = 30
    
    //     // 5 Days After Due Date
    //     // 5 Days Before Due Date
    
    //     // 5 and 15 Days After Due Date
    //     // 15 and 5 Days Before Due Date
    //     // 5 Days Before Due Date 15 Days After Due Date
    //     // 15 Days Before Due Date 5 Days After Due Date
    
    //     // 5, 15, & 30 Days After Due Date
    //     // 30, 15, & 5 Days Before Due Date
    //     // 5 Days Before Due Date 15 and 30 Days After Due Date
    //     // 15 Days Before Due Date 5 and 30 Days After Due Date
    //     // 30 Days Before Due Date 5 and 15 Days After Due Date
    //     // 15 and 5 Days Before Due Date 30 Days After Due Date
    //     // 30 and 5 Days Before Due Date 15 Days After Due Date
    //     // 30 and 15 Days Before Due Date 5 Days After Due Date
    
    
    //     // let arrBefore = clientSettings.reminders.filter(data => data.dueDate === "before");
    //     let arrBefore = reminders.filter(data => data.dueDate === "before");
    //     if (arrBefore.length > 0) {
    //       if (arrBefore.length === 3) {
    //         descriptionLateReminders += `${arrBefore[2].numberOfDays}, ${arrBefore[1].numberOfDays}, & ${arrBefore[0].numberOfDays}`;
    //       } else if (arrBefore.length === 2) {
    //         descriptionLateReminders += `${arrBefore[1].numberOfDays} and ${arrBefore[0].numberOfDays}`;
    //       } else if (arrBefore.length === 1) {
    //         descriptionLateReminders += arrBefore[0].numberOfDays;
    //       }
    //       descriptionLateReminders += " Days Before Due Date";
    //     }
    
    //     // let arrAfter = clientSettings.reminders.filter(data => data.dueDate === "after");
    //     let arrAfter = reminders.filter(data => data.dueDate === "after");
    //     if (arrAfter.length > 0) {
    //       if (arrAfter.length === 3) {
    //         descriptionLateReminders += ` ${arrAfter[0].numberOfDays}, ${arrAfter[1].numberOfDays}, & ${arrAfter[2].numberOfDays}`;
    //       } else if (arrAfter.length === 2) {
    //         descriptionLateReminders += ` ${arrAfter[0].numberOfDays} and ${arrAfter[1].numberOfDays}`;
    //       } else if (arrAfter.length === 1) {
    //         descriptionLateReminders += ` ${arrAfter[0].numberOfDays}`;
    //       }
    //       descriptionLateReminders += " Days After Due Date";
    //     }
    //   }
    
    //   let descriptionLateFees = "";
    //   // if (!clientSettings.chargeLateFees) {
    //   if (!client.charge_late_fees) {
    //     descriptionLateFees = "Percentage or Flat-Rate Fees";
    //   }
    //   else {
    //     //         $10.99 after 30 days
    //     //         $11.00 after 30 days
    //     //         10.99% after 30 days
    //     //         10% after 30 days
    
    //     // let numTwoDec = Number(clientSettings.lateFee.value).toFixed(2);
    //     let numTwoDec = Number(client.late_fee_amount).toFixed(2);
    //     // if (clientSettings.lateFee.type === "flat") {
    //     if (client.flat_fee) {
    //       descriptionLateFees += `$${numTwoDec} `;
    //     } else {
    //       descriptionLateFees += `${numTwoDec}% `;
    //     }
    //     // descriptionLateFees += `after ${clientSettings.lateFee.days} days`;
    //     descriptionLateFees += `after ${client.number_days} days`;
    //   }
    
    //   const [tempIndex, setTempIndex] = useState(-1);
    //   const [anchorElReminderMessage, setAnchorElReminderMessage] = useState(null);
    //   const openReminderMessage = Boolean(anchorElReminderMessage);
    
    //   const handleClickOpenReminderMessage = (event, index) => {
    //     setTempIndex(index);
    //     // setPersonalMessage(reminderList[index].personalMessage);
    //     setPersonalMessage(reminders[index].personalMessage);
    //     setAnchorElReminderMessage(event.currentTarget);
    //   };
    
    //   const handleCloseReminderMessage = () => {
    //     setAnchorElReminderMessage(null);
    //   };

  // const [tempIndex, setTempIndex] = useState(-1);
  // const [anchorElReminderMessage, setAnchorElReminderMessage] = useState(null);
  // const openReminderMessage = Boolean(anchorElReminderMessage);

  // const handleClickOpenReminderMessage = (event, index) => {
  //   setTempIndex(index);
  //   // setPersonalMessage(reminderList[index].personalMessage);
  //   setPersonalMessage(reminder[index].personalMessage);
  //   setAnchorElReminderMessage(event.currentTarget);
  // };

  // const handleCloseReminderMessage = () => {
  //   setAnchorElReminderMessage(null);
  // };

  // console.log("client currency = ", client.currency.split(" — ")[0]);
  // console.log("client language = ", client.language);

  // if (invoice && Object.keys(invoice).length !== 0 && Object.getPrototypeOf(invoice) === Object.prototype) {
  if (content && Object.keys(content).length !== 0 && Object.getPrototypeOf(content) === Object.prototype) {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center", }}
        open={toastState}
        onClose={handleToastClose}
        autoHideDuration={5000}
        TransitionComponent={toastTransition}
        // classes={{ root: classes.actionTable_snackbar, }}
        sx={{
          "& .MuiAlert-root": {
            // backgroundColor: "#37a703",
            color: "#fff",
          },
          // "& .MuiAlert-message": {
          //   display: "grid",
          //   padding: "6px 0",
          //   gap: "3px",
          // },
        }}
      >
        <Alert severity="error">{toastMessage}</Alert>
      </Snackbar>
      <Dialog
        fullScreen
        open={true}
        onClose={handleCloseDialog}
        classes={{ root: classes.fullScreen_dialog, }}
      >
        <SuiBox className="businessCard-header">
          <SuiTypography variant="h3" fontWeight="bold">
            {`${invoice_id === undefined ? "New" : "Edit"} Invoice`}
          </SuiTypography>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogActions>
        </SuiBox>
        <SuiBox style={{ display: "flex", }}>
          <SuiBox my={3} px={5} py={6} className="businessCard-content"
            sx={{
              ...(theme_font === "Classic (Garamond)" && { 
                fontFamily: `Garamond,Baskerville,"Baskerville Old Face","Hoefler Text","Times New Roman",serif !important`,
                "& .MuiBox-root, & .MuiTypography-root, & .MuiInputBase-root, & textarea": {
                  fontFamily: `Garamond,Baskerville,"Baskerville Old Face","Hoefler Text","Times New Roman",serif !important`,
                },
              })
            }}
          >
            <SuiBox style={{ display: "inline-block", width: "100%", }}>
              <input hidden accept="image/*" type="file"
                ref={uploadLogoRef}
                onChange={handleChangeUploadLogo}
              />
              {theme_logo.length === 0 && save_theme_logo === null
                ? <SuiBox sx={{ backgroundImage: `url(${uploadImage})`, justifyContent: "center", alignItems: "center", float: "left", }}
                  customClass={classes.logo_upload_button}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => {
                    if (theme_logo.length === 0 && save_theme_logo === null) {
                      uploadLogoRef.current.click();
                    } else {
                      setThemeLogo("");
                      setSaveThemeLogo(null);
                    }
                  }}
                >
                  <SuiTypography variant="span" fontWeight="regular" sx={{ fontSize: "1rem", fontFamily: `"Roboto","Helvetica","Arial",sans-serif !important`, }}>
                    Drag your logo here, <br /> or&nbsp;
                    <SuiTypography variant="button" fontWeight="regular" customClass="button-link">
                      select a file
                    </SuiTypography>
                  </SuiTypography>
                </SuiBox>
                : <SuiBox sx={{ backgroundImage: `url("${theme_logo}")`, justifyContent: "end", float: "left", }}
                  customClass={classes.logo_upload_button}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => {
                    if (theme_logo.length === 0 && save_theme_logo === null) {
                      uploadLogoRef.current.click();
                    } else {
                      setThemeLogo("");
                      setSaveThemeLogo(null);
                      setHoverThemeLogo(false);
                    }
                  }}
                  onMouseEnter={() => setHoverThemeLogo(true)}
                  onMouseLeave={() => setHoverThemeLogo(false)}
                >
                  {/* <SuiTypography variant="button" fontWeight="medium" verticalAlign="bottom" customClass="button-link">
                      Delete image
                    </SuiTypography> */}
                  {hover_theme_logo && <Icon className="font-bold" color="error" sx={{ fontSize: "1.75rem !important", }}>close</Icon>}
                </SuiBox>
              }
              <SuiBox style={{ float: "right", display: "grid", textAlign: "right", }}>
                <SuiTypography variant="span">
                  {user.business.name}
                </SuiTypography>
                <SuiTypography variant="span">
                  {user.business.business_phone}
                </SuiTypography>
                <SuiTypography variant="span">
                  {user.business.country}
                </SuiTypography>
                {/* <SuiTypography variant="button" fontWeight="regular">
                  Edit Business Information
                </SuiTypography> */}
              </SuiBox>
            </SuiBox>
            <SuiBox mt={4} style={{ display: "flex", width: "100%", }}>
              <SuiBox style={{ display: "grid", }}>
                {/* <SuiTypography variant="span" style={{ color: "#4f697a", }}> */}
                <SuiTypography variant="span" style={{ color: theme_color, }}>
                  {/* Billed To */}
                  {content["Billed To"]}
                </SuiTypography>
                
                <Select
                  value={client}
                  // value={billed_to}
                  // renderValue={billed_to_name !== "" ? undefined : () => "Select a Client"}
                  // renderValue={billed_to && Object.keys(billed_to).length !== 0 && Object.getPrototypeOf(billed_to) === Object.prototype ? undefined : () => "Select a Client"}
                  renderValue={client && Object.keys(client).length !== 0 && Object.getPrototypeOf(client) === Object.prototype ? undefined : () => "Select a Client"}
                  onChange={(event) => {
                    // setBilledTo(event.target.value);
                    let client = event.target.value;
                    setInvoice({
                      ...invoice,
                      language: client.language,
                      currency: client.currency,
                    });
                    setClient(client);
                    setLanguage(client.language);
                    setCurrency(client.currency);
                    setCurrencyCode(client.currency.split(" — ")[0]);
                    setContent(Translation[client.language]);
                  }}
                  displayEmpty
                  sx={{
                    // p: "0 !important",
                    height: "fit-content !important",
                    "&.Mui-error": {
                      // borderColor: "#d32f2f",
                      borderColor: "#ea0606 !important",
                    },
                    "& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input": {
                      p: "0 !important",
                    },
                  }}
                  MenuProps={{
                    classes: {
                      paper: classes.menu_select_form,
                    },
                  }}
                  IconComponent={(props) => (<ExpandMoreIcon {...props}/>)}
                  // error={"billed_to" in validation}
                >
                  {allClients.map((client, index) => (
                    <MenuItem key={`${index} — ${client}`} value={client}>
                      <Avatar
                        {...stringAvatar(`${client.first_name} ${client.last_name}`)}
                        style={{
                          marginRight: 10,
                          fontSize: 24,
                          width: 50,
                          height: 50,
                        }}
                      />
                      <SuiBox style={{ display: "grid", height: "50px", }}>
                        {client.company_name && 
                          <SuiTypography variant="span" sx={{fontSize: "16px !important", color: "#001b40"}}>
                            {client.company_name}
                          </SuiTypography>
                        }
                        {client.first_name && client.last_name &&
                          <SuiTypography variant="span" sx={{fontSize: "14px !important", color: "#576981"}}>
                            {`${client.first_name} ${client.last_name}`}
                          </SuiTypography>
                        }
                      </SuiBox>
                    </MenuItem>
                  ))}
                </Select>
              {/* {"billed_to" in validation &&
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      textColor="error"
                      style={{ fontSize: 13, color: "#ea0606", }}
                    >
                      {validation.billed_to}
                    </SuiTypography>
                  } */}
                {/* <SuiTypography variant="button" fontWeight="regular">
                  Edit Client
                </SuiTypography> */}
                {client && Object.keys(client).length !== 0 && Object.getPrototypeOf(client) === Object.prototype &&
                <SuiTypography variant="button" fontWeight="regular" 
                  onClick={() => {
                    // setBilledTo({});

                    setClient({});
                    // setLanguage(invoice.language);
                    // setCurrency(invoice.currency);
                    // setCurrencyCode(invoice.currency.split(" — ")[0]);

                    // let new_user = {...user};
                    // delete new_user["client"];
                    // new_user = JSON.stringify(new_user);
                    // setUser(new_user);
                    // localStorage.setItem("user", new_user);
                  }}>
                  Remove Client
                </SuiTypography>}
              </SuiBox>
              <SuiBox ml={6} style={{ display: "grid", width: "150px", }}>
                {/* <SuiTypography variant="span" style={{ color: "#4f697a", }}> */}
                <SuiTypography variant="span" style={{ color: theme_color, }}>
                  {/* Date of Issue */}
                  {content["Date of Issue"]}
                </SuiTypography>
                <DatePicker
                  name="issued_date"
                  classes={classes.invoice_date}
                  maxDate={invoice.due_date}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      classes={classes.custom_header_datepicker}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <SuiTypography
                        variant="button"
                        fontWeight="bold"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "20px !important",
                        }}
                      >
                        <ChevronLeftIcon />
                      </SuiTypography>

                      <select
                        // value={monthsOptions[getMonth(date)]}
                        value={monthsOptions[new Date(date).getMonth() + 0]}
                        onChange={({ target: { value } }) => changeMonth(monthsOptions.indexOf(value))}
                        style={{ width: "unset", }}
                      >
                        {monthsOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        // value={getYear(date)}
                        value={new Date(date).getFullYear()}
                        onChange={({ target: { value } }) => changeYear(value)}
                        style={{ width: "unset", }}
                      >
                        {yearsOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <SuiTypography
                        variant="button"
                        fontWeight="bold"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "20px !important",
                        }}
                      >
                        <ChevronRightIcon />
                      </SuiTypography>
                    </div>
                  )}
                  selected={invoice.issued_date}
                  // selected={issueDate}
                  onChange={(date) => {
                    // setIssueDate(date);
                    let newInvoice = {...invoice};
                    newInvoice.issued_date = date;
                    setInvoice(newInvoice);
                    console.log("inv issue date = ", new Date(newInvoice.issued_date));
                    console.log("inv due date = ", new Date(invoice.due_date));
                    console.log("compare issue and due date = ", new Date(newInvoice.issued_date) > new Date(invoice.due_date));
                  }}
                  // onChange={handleChangeDialog}
                  // placeholderText="MM/DD/YYYY"
                  placeholderText={user.business.date_format}
                  // dateFormat={user.business.date_format}
                  dateFormat={stringDateFormat()}
                  customInput={<CustomInput />}
                  sx={{
                    "& .react-datepicker-wrapper": {
                      display: "flex",
                      alignItems: "center",
                      border: "2px solid #7f8c9f",
                      borderRadius: "5px !important",
                      // paddingLeft: "0.5rem",
                      padding: "0 0.5rem",
                      fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                      letterSpacing: "0.00938em",
                      width: "100% !important",
                      fontSize: "0.875rem !important",
                      color: "#495057 !important",
                      height: "42px !important",
                      "& svg": {
                        // height: "100%",
                        // float: "right",
                        marginLeft: "auto",
                        fontSize: 18,
                      },
                    },
                  }}
                />
                {/* <SuiTypography mt={3} variant="span" style={{ color: "#4f697a", }}> */}
                <SuiTypography mt={3} variant="span" style={{ color: theme_color, }}>
                  {/* Due Date */}
                  {content["Due Date"]}
                </SuiTypography>
                <DatePicker
                  name="due_date"
                  classes={classes.invoice_date}
                  // minDate={issueDate}
                  minDate={invoice.issued_date}
                  renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                  }) => (
                    <div
                      classes={classes.custom_header_datepicker}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <SuiTypography
                        variant="button"
                        fontWeight="bold"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "20px !important",
                        }}
                      >
                        <ChevronLeftIcon />
                      </SuiTypography>

                      <select
                        // value={monthsOptions[getMonth(date)]}
                        value={monthsOptions[new Date(date).getMonth() + 0]}
                        onChange={({ target: { value } }) => changeMonth(monthsOptions.indexOf(value))}
                        style={{ width: "unset", }}
                      >
                        {monthsOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <select
                        // value={getYear(date)}
                        value={new Date(date).getFullYear()}
                        onChange={({ target: { value } }) => changeYear(value)}
                        style={{ width: "unset", }}
                      >
                        {yearsOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>

                      <SuiTypography
                        variant="button"
                        fontWeight="bold"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "20px !important",
                        }}
                      >
                        <ChevronRightIcon />
                      </SuiTypography>
                    </div>
                  )}
                  selected={invoice.due_date}
                  // selected={dueDate}
                  onChange={(date) => {
                    // setDueDate(date);
                    let newInvoice = {...invoice};
                    newInvoice.due_date = date;
                    setInvoice(newInvoice);
                  }}
                  // onChange={handleChangeDialog}
                  // placeholderText="MM/DD/YYYY"
                  placeholderText={user.business.date_format}
                  // dateFormat={"dd/MM/yyyy"}
                  dateFormat={stringDateFormat()}
                  customInput={<CustomInput />}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid #7f8c9f",
                    borderRadius: "5px !important",
                    // paddingLeft: "0.5rem",
                    padding: "0 0.5rem",
                    fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                    letterSpacing: "0.00938em",
                    width: "100% !important",
                    fontSize: "0.875rem !important",
                    color: "#495057 !important",
                    height: "42px !important",
                    "& svg": {
                      // height: "100%",
                      // float: "right",
                      marginLeft: "auto",
                      fontSize: 18,
                    },
                  }}
                />
              </SuiBox>
              <SuiBox ml={6} style={{ display: "grid", }}>
                {/* <SuiTypography variant="span" style={{ color: "#4f697a", }}> */}
                <SuiTypography variant="span" style={{ color: theme_color, }}>
                  {/* Invoice Number */}
                  {content["Invoice Number"]}
                </SuiTypography>
                <SuiTypography variant="span">
                  {invoice.number}
                </SuiTypography>
                {/* <SuiTypography mt={3} variant="span" style={{ color: "#4f697a", }}> */}
                <SuiTypography mt={3} variant="span" style={{ color: theme_color, }}>
                  {/* Reference */}
                  {content["Reference"]}
                </SuiTypography>
                <TextField
                  placeholder="Enter value (e.g. PO #)"
                  name="reference"
                  value={invoice.reference}
                  // value={reference}
                  // onChange={(event, newValue) => {
                  //   setReference(newValue);
                  // }}
                  onChange={handleChangeDialog}
                />
              </SuiBox>
              <SuiBox ml={6} style={{ display: "grid", textAlign: "right", height: "50%", }}>
                {/* <SuiTypography variant="span" style={{ color: "#4f697a", }}> */}
                <SuiTypography variant="span" style={{ color: theme_color, }}>
                  {/* Amount Due (CAD) */}
                  {/* {`Amount Due (${currencyCode})`} */}
                  {`${content["Amount Due"]} (${currencyCode})`}
                </SuiTypography>
                <SuiTypography variant="h2">
                  {/* $0.00 */}
                  {/* {currencyFormat(0)} */}
                  {/* {currencyFormat(Number(row.rate * row.quantity).toFixed(2))} */}
                  {currencyFormat(Number(amountDue()).toFixed(2))}
                </SuiTypography>
              </SuiBox>
            </SuiBox>



            <table className="invoice-content-table" style={{ borderTop: `3px solid ${theme_color}`, }}>
              <thead>
                <tr style={{ color: theme_color, }}>
                  {/* <th>Description</th>
                  <th>Rate</th>
                  <th>Qty</th>
                  <th>Line Total</th> */}
                  <th>{content["Description"]}</th>
                  <th>{content["Rate"]}</th>
                  <th>{content["Qty"]}</th>
                  <th>{content["Line Total"]}</th>
                </tr>
              </thead>
              <tbody>
                {/* {Taxes.map((row, index) => {
                                  return (
                                    <TableRow key={`${index} — ${row.name} — ${row.number}`}>
                                      <TableCell padding="checkbox">
                                        <Checkbox
                                          color="primary"
                                          checked={isSelected(row)}
                                          onClick={(event) => selectRow(event, row)}
                                        />
                                      </TableCell>
                                      <TableCell>{row.name}</TableCell>
                                      <TableCell>{row.number ? row.number : "—"}</TableCell>
                                      <TableCell align="right">{row.rate}</TableCell>
                                    </TableRow>
                                  );
                                })}
                                newInvoiceLineItems.push({
      invoice_id: allInvoices.length + 1,
      name: "",
      description: "",
      rate: "",
      quantity: 1,
      sales_taxes: [],
    });
                                 */}
                {/* {invoiceLineItems.map((row, index) => { */}
                {invoice.invoice_line_items.map((row, index) => {
                  return (
                    <tr key={`${index} — ${row}`}>
                      <td style={{ paddingTop: "10px", paddingBottom: "14px", }}>
                        <TextField
                          placeholder="Enter an Item Name"
                          name="name"
                          value={row.name}
                          onChange={(event) => handleChangeInvoiceLineItems(event, index)}
                          sx={{
                            "&.MuiFormControl-root.MuiTextField-root": {
                              display: "flex",
                              "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                width: "auto !important",
                                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                  width: "100% !important",
                                },
                              },
                            },
                          }}
                        />
                        <TextareaAutosize
                          placeholder="Enter an Item Description"
                          name="description"
                          className="w-100"
                          // maxRows={3}
                          value={row.description}
                          onChange={(event) => handleChangeInvoiceLineItems(event, index)}
                          style={{
                            border: "unset",
                            resize: "unset",
                            outline: "unset",
                            overflow: "auto",
                            display: "flex",
                            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                            fontSize: "12px",
                            letterSpacing: "0.02857em",
                            lineHeight: 1.5,
                          }}
                        />
                        
                      </td>
                      <td style={{ float: "right", paddingTop: "10px", }}>
                        <TextField
                          placeholder="$0.00"
                          name="rate"
                          value={row.rate}
                          onChange={(event) => handleChangeInvoiceLineItems(event, index)}
                          sx={{
                            "&.MuiFormControl-root.MuiTextField-root": {
                              display: "flex",
                              width: "70px",
                              "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                width: "auto !important",
                                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                  textAlign: "right",
                                },
                              },
                            },
                          }}
                        />
                        {/* <SuiTypography variant="button" fontWeight="regular"
                          style={{
                            fontSize: 12,
                            display: "flex",
                            justifyContent: "end",
                          }}>
                          Add Taxes
                        </SuiTypography> */}
                      </td>
                      <td style={{ textAlign: "right", verticalAlign: "top", paddingTop: "10px", }}>
                        <TextField
                          placeholder="0"
                          name="quantity"
                          value={row.quantity}
                          onChange={(event) => handleChangeInvoiceLineItems(event, index)}
                          sx={{
                            "&.MuiFormControl-root.MuiTextField-root": {
                              width: "70px",
                              "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                width: "auto !important",
                                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                  textAlign: "right",
                                },
                              },
                            },
                          }}
                        />
                      </td>
                      <td style={{ textAlign: "right", verticalAlign: "top", paddingTop: "10px", }}>
                        {/* <TextField
                          disabled
                          placeholder="$0.00"
                          name="line_total"
                          sx={{
                            "&.MuiFormControl-root.MuiTextField-root": {
                              width: "70px",
                              "& .MuiInputBase-root.MuiOutlinedInput-root": {
                                width: "auto !important",
                                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                  textAlign: "right",
                                },
                              },
                            },
                          }}
                        /> */}
                        <SuiTypography variant="span" style={{ display: "flex", justifyContent: "end", }}>
                          {/* $0.00 */}
                          {/* {currencyFormat(0)} */}
                          {currencyFormat(Number(row.rate * row.quantity).toFixed(2))}
                        </SuiTypography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Button
              startIcon={<AddIcon />}
              onClick={addInvoiceLineItems}
              className="w-100"
              sx={{
                border: "2px dashed #ccd1d9",
                borderRadius: "5px",
                marginTop: "10px",
                fontWeight: 500,
                fontSize: "20px",
                transform: "unset !important",
                textTransform: "unset",
                color: "#001b40 !important",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#eef6fc",
                  // color: "#001b40",
                },
                "& .MuiButton-startIcon": {
                  marginLeft: 0,
                  marginRight: "2px",
                  "& .MuiSvgIcon-root": {
                    fontSize: "28px !important",
                    fill: "lightslategray",
                    stroke: "#4f697a",
                    // stroke: theme_color,
                    strokeWidth: 0.5,
                  },
                },
              }}
            >
              Add a Line
            </Button>
            <SuiBox className="w-100" style={{ display: "table", }}>
              <SuiBox mt={5} mb={6}
                style={{
                  display: "grid",
                  width: "50%",
                  float: "right",
                  textAlign: "right",
                }}
              >
                <SuiBox style={{ display: "table-row", }}>
                  <SuiBox mb={1.25} pb={1.25} style={{ display: "grid", width: "60%", borderBottom: "1px solid #ccd1d9", float: "left", }}>
                    <SuiTypography variant="span">
                      {/* Subtotal */}
                      {content["Subtotal"]}
                    </SuiTypography>
                    {/* <SuiTypography variant="button" fontWeight="regular">
                      Add a Discount
                    </SuiTypography> */}
                    {/* <SuiTypography variant="span">
                      {content["Tax"]}
                    </SuiTypography> */}
                  </SuiBox>
                  <SuiBox mb={1.25} pb={1.25} style={{ display: "grid", width: "40%", borderBottom: "1px solid #ccd1d9", }}>
                    <SuiTypography variant="span">
                      {Number(amountDue()).toFixed(2)}
                    </SuiTypography>
                    {/* <SuiTypography variant="span" sx={{ height: "21px", }}>

                    </SuiTypography> */}
                    {/* <SuiTypography variant="span">
                      0.00
                    </SuiTypography> */}
                  </SuiBox>
                </SuiBox>
                <SuiBox style={{ display: "table-row", }}>
                  <SuiBox mb={0.125} pb={1.25} style={{ display: "grid", width: "60%", borderBottom: "1px solid #ccd1d9", float: "left", }}>
                    <SuiTypography variant="span">
                      {/* Total */}
                      {content["Total"]}
                    </SuiTypography>
                    <SuiTypography variant="span">
                      {/* Amount Paid */}
                      {content["Amount Paid"]}
                    </SuiTypography>
                    {/* <SuiTypography variant="span" sx={{ height: "21px", }}>

                    </SuiTypography> */}
                  </SuiBox>
                  <SuiBox mb={0.125} pb={1.25} style={{ display: "grid", width: "40%", borderBottom: "1px solid #ccd1d9", }}>
                    <SuiTypography variant="span">
                      {Number(amountDue()).toFixed(2)}
                    </SuiTypography>
                    <SuiTypography variant="span">
                      0.00
                    </SuiTypography>
                    {/* <SuiTypography variant="span" sx={{ height: "21px", }}>

                    </SuiTypography> */}
                  </SuiBox>
                </SuiBox>
                <SuiBox style={{ display: "table-row", }}>
                  <SuiBox pt={1.25} style={{ display: "grid", width: "60%", borderTop: "1px solid #ccd1d9", float: "left", }}>
                    {/* <SuiTypography variant="span" style={{ color: "#4f697a", }}> */}
                    <SuiTypography variant="span" style={{ color: theme_color, }}>
                      {/* Amount Due (CAD) */}
                      {/* {`Amount Due (${currencyCode})`} */}
                      {`${content["Amount Due"]} (${currencyCode})`}
                    </SuiTypography>
                    {/* <SuiTypography variant="button" fontWeight="regular">
                      Request a Deposit
                    </SuiTypography>
                    <SuiTypography variant="span" sx={{ height: "21px", }}>

                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular">
                      Add a Payment Schedule
                    </SuiTypography> */}
                  </SuiBox>
                  <SuiBox pt={1.25} style={{ display: "grid", width: "40%", borderTop: "1px solid #ccd1d9", }}>
                    <SuiTypography variant="span">
                      {currencyFormat(Number(amountDue()).toFixed(2))}
                    </SuiTypography>
                    {/* <SuiTypography variant="span" sx={{ height: "21px", }}>

                    </SuiTypography>
                    <SuiTypography variant="span" sx={{ height: "21px", }}>

                    </SuiTypography>
                    <SuiTypography variant="span" sx={{ height: "21px", }}>

                    </SuiTypography> */}
                  </SuiBox>
                </SuiBox>
              </SuiBox>
              <SuiBox style={{ display: "table-row", }}>
                {/* <SuiTypography variant="span" style={{ color: "#4f697a", }}> */}
                <SuiTypography variant="span" style={{ color: theme_color, }}>
                  {/* Notes */}
                  {content["Notes"]}
                </SuiTypography>
                <TextareaAutosize
                  placeholder="Enter notes or bank transfer details (optional)"
                  name="notes"
                  className="w-100"
                  value={invoice.notes}
                  // value={notes}
                  // onChange={(event, newValue) => {
                  //   setNotes(newValue);
                  // }}
                  onChange={handleChangeDialog}
                  style={{
                    border: "unset",
                    resize: "unset",
                    outline: "unset",
                    overflow: "auto",
                    marginBottom: "40px",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    fontSize: "14px",
                    letterSpacing: "0.00938em",
                    lineHeight: 1.625,
                  }}
                />
                {/* <SuiTypography variant="span" style={{ color: "#4f697a", }}> */}
                <SuiTypography variant="span" style={{ color: theme_color, }}>
                  {/* Terms */}
                  {content["Terms"]}
                </SuiTypography>
                <TextareaAutosize
                  placeholder="Enter your terms and conditions"
                  name="terms"
                  className="w-100"
                  value={invoice.terms}
                  // value={terms}
                  // onChange={(event, newValue) => {
                  //   setTerms(newValue);
                  // }}
                  onChange={handleChangeDialog}
                  style={{
                    border: "unset",
                    resize: "unset",
                    outline: "unset",
                    overflow: "auto",
                    marginBottom: "20px",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    fontSize: "14px",
                    letterSpacing: "0.00938em",
                    lineHeight: 1.625,
                  }}
                />
              </SuiBox>
            </SuiBox>
          </SuiBox>
          {/* <SuiBox customClass={classes.suiInputIcon_right}></SuiBox> */}
          <SuiBox my={3} ml={3} className="businessCard-settings">
            {history.location.pathname === url ? (
              <>
                <SuiTypography mt={0.75} variant="h5"
                  sx={{
                    fontSize: "21px",
                  }}
                >
                  Settings
                </SuiTypography>
                <SuiBox mb={4.5}>
                  <SuiTypography mb={0.75} variant="h6"
                    sx={{
                      fontSize: "14px",
                      color: "#576981",
                    }}
                  >
                    For This Invoice
                  </SuiTypography>
                  <List>
                    {/* <ListItem button key="pay-online" onClick={() => history.push(`${url}/pay-online`)}>
                      <span className="material-icons-outlined">payments</span>
                      <ListItemText primary="Accept Online Payments" secondary={
                        <>
                          Let clients pay you online

                        </>
                      } /> */}
                      {/* <Button endIcon={<ChevronRightIcon />}>{paymentMethodRadio ? "yes" : "no"}</Button> */}
                      {/* <Button endIcon={<ChevronRightIcon />}>{invoice.online_payments ? "yes" : "no"}</Button> */}
                      {/* <Button endIcon={<ChevronRightIcon />}>{invoiceSettings.online_payments ? "yes" : "no"}</Button> */}
                    {/* </ListItem> */}
                    <ListItem button key="presentation" onClick={() => history.push(`${url}/presentation`)}>
                      <span className="material-icons-outlined">brush</span>
                      <ListItemText primary="Customize Invoice Style" secondary="Change Color and Font" />
                      <Button endIcon={<ChevronRightIcon />} />
                    </ListItem>
                  </List>
                </SuiBox>
                {/* {client && Object.keys(client).length !== 0 && Object.getPrototypeOf(client) === Object.prototype &&
                  <SuiBox>
                    <SuiTypography mb={0.75} variant="h6"
                      sx={{
                        fontSize: "14px",
                        color: "#576981",
                      }}
                    >
                      For {client.company_name}
                    </SuiTypography>
                    <List>
                      <ListItem button key="late-reminders" onClick={() => history.push(`${url}/late-reminders`)}>
                        <span className="material-icons-outlined">announcement</span>
                        <ListItemText primary="Send Reminders" secondary={descriptionLateReminders.trim()} />
                        <Button endIcon={<ChevronRightIcon />}>{client.send_payment_reminders ? "yes" : "no"}</Button>
                      </ListItem>
                      <ListItem button key="late-fees" onClick={() => history.push(`${url}/late-fees`)}>
                        <span className="material-icons-outlined">paid</span>
                        <ListItemText primary="Charge Late Fees" secondary={descriptionLateFees.trim()} />
                        <Button endIcon={<ChevronRightIcon />}>{client.charge_late_fees ? "yes" : "no"}</Button>
                      </ListItem>
                      <ListItem button key="currency-language" onClick={() => history.push(`${url}/currency-language`)}>
                        <span className="material-icons-outlined">public</span>
                        <ListItemText primary="Currency &amp; Language" secondary={`${client.currency}, ${client.language}`} />
                        <Button endIcon={<ChevronRightIcon />} />
                      </ListItem>
                      <ListItem button key="invoice-attachments" onClick={() => history.push(`${url}/invoice-attachments`)}>
                        <span className="material-icons-outlined">history_edu</span>
                        <ListItemText primary="Invoice Attachments" secondary="Attach PDF copy to emails" />
                        <Button endIcon={<ChevronRightIcon />}>{client.invoice_attachments ? "yes" : "no"}</Button>
                      </ListItem>
                    </List>
                  </SuiBox>
                } */}
              </>
            // ) : history.location.pathname === `${url}/pay-online` ? (
            //   <>
            //     <SuiTypography mt={1.5} variant="h5" fontWeight="bold">
            //       Accept Online Payments
            //     </SuiTypography>
            //     {/* <SuiBox className="businessCard-settings-head" px={0.5} py={1}
            //       onClick={() => setInvoiceAttachmentsCheck(!invoiceAttachmentsCheck)}
            //     >
            //       <Checkbox
            //         checked={invoiceAttachmentsCheck}
            //       />
            //       <SuiTypography ml={1} variant="h6" fontWeight="regular">
            //         Add the option to attach a PDF copy when sending invoices by email.
            //       </SuiTypography>
            //     </SuiBox>
            //     <Divider /> */}
            //     <FormControl className="businessCard-settings-late-fee-amount" sx={{ px: 0.5, py: 1, }}>
            //       <FormLabel>Payment Methods</FormLabel>
            //       <RadioGroup
            //         name="online_payments"
            //         // value={invoiceSettings.online_payments}
            //         // value={invoice.online_payments}
            //         value={paymentMethodRadio}
            //         onChange={(event) => setPaymentMethodRadio(event.target.value)}
            //         // onChange={handleChangeDialog}
            //       >
            //         <FormControlLabel value={true} control={<Radio />} label="On" />
            //         <FormControlLabel value={false} control={<Radio />} label="Off" />
            //       </RadioGroup>
            //     </FormControl>
            //     <Divider />
            //     <SuiBox py={1.5} className="businessCard-settings-actions">
            //       <Button onClick={clientSettingsCancel}>Cancel</Button>
            //       <Button onClick={clientSettingsDone}>Done</Button>
            //     </SuiBox>
            //   </>
            ) : history.location.pathname === `${url}/presentation` && (
              <>
                <SuiTypography mt={1.5} mb={1.75} variant="h5" fontWeight="bold">
                  Customize Invoice Style
                </SuiTypography>
                <SuiBox px={0.75} py={1.25} style={{ borderBottom: "1px solid #ccd1d9", }}>
                  <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                    Choose a Theme Color
                  </SuiTypography>
                  {colorPickerOptions.map((colorPicker, index) => {
                    return (
                      <SuiButton variant="outlined"
                        key={`${index} — ${colorPicker}`}
                        sx={{
                          mr: 1.25,
                          backgroundColor: `${colorPicker} !important`,
                          ...(theme_color === colorPicker && !changeCurrentColor && { boxShadow: "0 0 0 2px #fff, 0 0 0 4px #7f8c9f !important", })
                        }}
                        customClass={`${classes.color_picker_button} predefined`}
                        onClick={() => {
                          setChangeCurrentColor(false);
                          setThemeColor(colorPicker);
                          setCurrentColor(colorPicker);
                        }}
                      >
                        {theme_color === colorPicker && !changeCurrentColor ? "✔" : ""}
                      </SuiButton>
                    )
                  })}
                  <SuiButton variant="outlined"
                    sx={{
                      ...(changeCurrentColor && { 
                        backgroundImage: "unset !important",
                        backgroundColor: `${Object.getPrototypeOf(currentColor) === Object.prototype && "hex" in currentColor ? currentColor.hex : currentColor} !important`,
                        boxShadow: "0 0 0 2px #fff, 0 0 0 4px #7f8c9f !important",
                      })
                    }}
                    customClass={`${classes.color_picker_button} custom`}
                    onClick={handleClickOpenChromePicker}
                  >
                    {changeCurrentColor ? "✔" : "⯆"}
                  </SuiButton>
                  <Popover
                    open={openChromePicker}
                    anchorEl={anchorElChromePicker}
                    onClose={handleCloseChromePicker}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <ChromePicker disableAlpha color={currentColor} onChangeComplete={handleChangeComplete} />
                  </Popover>
                </SuiBox>
                <SuiBox px={0.75} py={1.25} style={{ borderBottom: "1px solid #ccd1d9", }}>
                  <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                    Choose a Font
                  </SuiTypography>
                  <Select
                    value={theme_font}
                    onChange={(event) => setThemeFont(event.target.value)}
                    displayEmpty
                    className={classes.select_root}
                    MenuProps={{
                      classes: {
                        paper: classes.select_menuPaper,
                      },
                    }}
                  >
                    {themeFontOptions.map((element, index) => (
                      <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                    ))}
                  </Select>
                </SuiBox>
                <SuiBox px={0.75} py={1.25} style={{ borderBottom: "1px solid #ccd1d9", }}>
                  <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                    Choose a Language
                  </SuiTypography>
                  <Select
                    value={language}
                    // onChange={(event) => setLanguage(event.target.value)}
                    onChange={(event) => {
                      let language = event.target.value;
                      setLanguage(language);
                      // setContent(Translation.language);
                      setContent(Translation[language]);
                    }}
                    displayEmpty
                    className={classes.select_root}
                    MenuProps={{
                      classes: {
                        paper: classes.select_menuPaper,
                      },
                    }}
                  >
                    {languageOptions.map((element, index) => (
                      <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                    ))}
                  </Select>
                </SuiBox>
                <SuiBox px={0.75} py={1.25} style={{ borderBottom: "1px solid #ccd1d9", }}>
                  <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                    Choose a Currency
                  </SuiTypography>
                  <Select
                    value={currency}
                    // onChange={(event) => setCurrency(event.target.value)}
                    onChange={(event) => {
                      let currency = event.target.value;
                      setCurrency(currency);
                      setCurrencyCode(currency.split(" — ")[0]);
                    }}
                    displayEmpty
                    className={classes.select_root}
                    MenuProps={{
                      classes: {
                        paper: classes.select_menuPaper,
                      },
                    }}
                  >
                    {currencyOptions.map((element, index) => (
                      <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                    ))}
                  </Select>
                </SuiBox>
                <SuiBox py={1.25} className="businessCard-settings-actions">
                  <Button onClick={invoiceSettingsCancel}>Cancel</Button>
                  <Button onClick={invoiceSettingsDone}>Done</Button>
                </SuiBox>
              </>
            )}
          </SuiBox>
        </SuiBox>
      </Dialog>
    </>
  );
  } else {
    // return null;
    return <div>Loading...</div>;
  }
}

// InvoicesForm.defaultProps = {
//     data: [],
// };

InvoicesForm.propTypes = {
//     data: PropTypes.arrayOf(PropTypes.object),
  // allInvoice: PropTypes.array,
  // setAllInvoice: PropTypes.func,
  // allClient: PropTypes.array,
  // setAllClient: PropTypes.func,
};

export default InvoicesForm;
