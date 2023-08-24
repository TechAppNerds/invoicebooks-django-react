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
  useContext,
  useState,
  useEffect,
  useRef,
  // Fragment,
  forwardRef,
} from "react";

// react-routers components
import {
  // Link,
  Redirect,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

import { ChromePicker } from "react-color";

// prop-types is a library for typechecking of props
// import PropTypes from "prop-types";

// @mui material components
import {
//   Grid,
  Tabs,
  Tab,
  Icon,
//   Card,
//   Divider,
  Switch,
  Checkbox,
  Popover,
  Snackbar,
  Slide,
  // Alert,
  Alert as MuiAlert,
  // AlertTitle,
  TextField,
  Autocomplete,
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

// import { tooltipClasses } from '@mui/material/Tooltip';

// import { alpha, styled } from '@mui/material/styles';

// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   // FilterList as FilterListIcon,
//   Create as CreateIcon,
//   Archive as ArchiveIcon,
//   ChevronRight as ChevronRightIcon,
  // ChevronDown as ChevronDownIcon,
  // KeyboardArrowDown as KeyboardArrowDownIcon
//   ExpandMore as ExpandMoreIcon,
//   Edit as EditIcon,
// } from "@mui/icons-material";

// import { visuallyHidden } from '@mui/utils';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import SuiAvatar from "components/SuiAvatar";

// Soft UI Dashboard React example components
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Settings page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
// import BillingInformation from "layouts/billing/components/BillingInformation";
// import Transactions from "layouts/billing/components/Transactions";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// import './sass.scss';
import styles from "layouts/settings/styles";

// Images
import conicalGradients from "assets/images/conical-gradients.png";
import uploadImage from "assets/images/picture-icon.png";

import { AuthContext } from "../../auth-context/auth.context";
import AuthApi from "../../api/auth";
import ActionsApi from "../../api/actions";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <SuiBox p={3}>
//           <Typography>{children}</Typography>
//         </SuiBox>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// let allClientData = [
//   {
//     id: 1,
//     firstName: "client",
//     lastName: "- 1",
//     company: "client -1",
//     email: "cminone@gmail.com",
//     phone: "08539731758",
//     note: "this is my relationship note",
//     credit: 0,
//     total: 0.35,
//   },
//   {
//     id: 2,
//     firstName: "client",
//     lastName: "1",
//     company: "clients's companies",
//     email: "email@gmail.com",
//     phone: "08132624682",
//     note: "my internal note",
//     credit: 0,
//     total: 0.76,
//   },
// ];

// let userData = {
//   id: 1,
//   profilePhotoSrc: "",
//   firstName: "Zotyp",
//   lastName: "Viox",
//   company: "Zotyp's Company",
//   email: "987Zotyp@gmail.com",
//   password: "734bh$6sd0",
//   timeZone: "(UTC+7:00) Asia — Jakarta",
//   // loadingScreenDisplay: 1,
// };

function Settings() {
  // const classes = styles();
  
  const classes = styles({ conicalGradients, });
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const { user, setUser } = useContext(AuthContext);
  // const classes = styles({ conicalGradients, logoImage: user.business.theme_logo,  });

//   let total = Number(0).toFixed(2);
  const { url } = useRouteMatch();
  const history = useHistory();
  const splitCurrentURL = history.location.pathname.split("/");
  const currentPath = splitCurrentURL[splitCurrentURL.length - 1];

  // console.log("currentPath is = ", currentPath);
  // console.log("history location pathname = ", history.location.pathname);
  // console.log("url useRouteMatch = ", url);

  const [tabValue, setTabValue] = useState(
    currentPath === "business" ? 1
    : currentPath === "logo-and-theme" ? 2
    : currentPath === "notifications" ? 3
  : 0);

  const timeZoneOptions = [
    "(UTC–11:00) Pacific — Niue",
    "(UTC–11:00) Pacific — Pago Pago",
    "(UTC–10:00) America — Adak",
    "(UTC–10:00) Pacific — Honolulu",
    "(UTC–10:00) Pacific — Rarotonga",
    "(UTC–10:00) Pacific — Tahiti",
    "(UTC–9:30) Pacific — Marquesas",
    "(UTC–9:00) America — Anchorage",
    "(UTC–9:00) America — Juneau",
    "(UTC–9:00) America — Metlakatla",
    "(UTC–9:00) America — Nome",
    "(UTC–9:00) America — Sitka",
    "(UTC–9:00) America — Yakutat",
    "(UTC–9:00) Pacific — Gambier",
    "(UTC–8:00) America — Los Angeles",
    "(UTC–8:00) America — Tijuana",
    "(UTC–8:00) America — Vancouver",
    "(UTC–8:00) Pacific — Pitcairn",
    "(UTC–7:00) America — Boise",
    "(UTC–7:00) America — Cambridge Bay",
    "(UTC–7:00) America — Creston",
    "(UTC–7:00) America — Dawson",
    "(UTC–7:00) America — Dawson Creek",
    "(UTC–7:00) America — Denver",
    "(UTC–7:00) America — Edmonton",
    "(UTC–7:00) America — Fort Nelson",
    "(UTC–7:00) America — Hermosillo",
    "(UTC–7:00) America — Inuvik",
    "(UTC–7:00) America — Mazatlan",
    "(UTC–7:00) America — Phoenix",
    "(UTC–7:00) America — Whitehorse",
    "(UTC–7:00) America — Yellowknife",
    "(UTC–6:00) America — Bahia Banderas",
    "(UTC–6:00) America — Belize",
    "(UTC–6:00) America — Chicago",
    "(UTC–6:00) America — Chihuahua",
    "(UTC–6:00) America — Costa Rica",
    "(UTC–6:00) America — El Salvador",
    "(UTC–6:00) America — Guatemala",
    "(UTC–6:00) America — Knox, Indiana",
    "(UTC–6:00) America — Tell City, Indiana",
    "(UTC–6:00) America — Managua",
    "(UTC–6:00) America — Matamoros",
    "(UTC–6:00) America — Menominee",
    "(UTC–6:00) America — Merida",
    "(UTC–6:00) America — Mexico City",
    "(UTC–6:00) America — Monterrey",
    "(UTC–6:00) America — Beulah, North Dakota",
    "(UTC–6:00) America — Center, North Dakota",
    "(UTC–6:00) America — New Salem, North Dakota",
    "(UTC–6:00) America — Ojinaga",
    "(UTC–6:00) America — Rainy River",
    "(UTC–6:00) America — Rankin Inlet",
    "(UTC–6:00) America — Regina",
    "(UTC–6:00) America — Resolute",
    "(UTC–6:00) America — Swift Current",
    "(UTC–6:00) America — Tegucigalpa",
    "(UTC–6:00) America — Winnipeg",
    "(UTC–6:00) Pacific — Galapagos",
    "(UTC–5:00) America — Atikokan",
    "(UTC–5:00) America — Bogota",
    "(UTC–5:00) America — Cancun",
    "(UTC–5:00) America — Detroit",
    "(UTC–5:00) America — Eirunepe",
    "(UTC–5:00) America — Grand Turk",
    "(UTC–5:00) America — Guayaquil",
    "(UTC–5:00) America — Havana",
    "(UTC–5:00) America — Indianapolis, Indiana",
    "(UTC–5:00) America — Marengo, Indiana",
    "(UTC–5:00) America — Petersburg, Indiana",
    "(UTC–5:00) America — Vevay, Indiana",
    "(UTC–5:00) America — Vincennes, Indiana",
    "(UTC–5:00) America — Winamac, Indiana",
    "(UTC–5:00) America — Iqaluit",
    "(UTC–5:00) America — Jamaica",
    "(UTC–5:00) America — Louisville, Kentucky",
    "(UTC–5:00) America — Monticello, Kentucky",
    "(UTC–5:00) America — Lima",
    "(UTC–5:00) America — Nassau",
    "(UTC–5:00) America — New York",
    "(UTC–5:00) America — Nipigon",
    "(UTC–5:00) America — Panama",
    "(UTC–5:00) America — Pangnirtung",
    "(UTC–5:00) America — Port-au-Prince",
    "(UTC–5:00) America — Rio Branco",
    "(UTC–5:00) America — Thunder Bay",
    "(UTC–5:00) America — Toronto",
    "(UTC–5:00) Pacific — Easter",
    "(UTC–4:00) America — Barbados",
    "(UTC–4:00) America — Blanc-Sablon",
    "(UTC–4:00) America — Boa Vista",
    "(UTC–4:00) America — Campo Grande",
    "(UTC–4:00) America — Caracas",
    "(UTC–4:00) America — Cuiaba",
    "(UTC–4:00) America — Curacao",
    "(UTC–4:00) America — Glace Bay",
    "(UTC–4:00) America — Goose Bay",
    "(UTC–4:00) America — Guyana",
    "(UTC–4:00) America — Halifax",
    "(UTC–4:00) America — La Paz",
    "(UTC–4:00) America — Manaus",
    "(UTC–4:00) America — Martinique",
    "(UTC–4:00) America — Moncton",
    "(UTC–4:00) America — Port of Spain",
    "(UTC–4:00) America — Porto Velho",
    "(UTC–4:00) America — Puerto Rico",
    "(UTC–4:00) America — Santo Domingo",
    "(UTC–4:00) America — Thule",
    "(UTC–4:00) Atlantic — Bermuda",
    "(UTC–3:30) America — St Johns",
    "(UTC–3:00) America — Araguaina",
    "(UTC–3:00) America — Buenos Aires, Argentina",
    "(UTC–3:00) America — Catamarca, Argentina",
    "(UTC–3:00) America — Cordoba, Argentina",
    "(UTC–3:00) America — Jujuy, Argentina",
    "(UTC–3:00) America — La Rioja, Argentina",
    "(UTC–3:00) America — Mendoza, Argentina",
    "(UTC–3:00) America — Rio Gallegos, Argentina",
    "(UTC–3:00) America — Salta, Argentina",
    "(UTC–3:00) America — San Juan, Argentina",
    "(UTC–3:00) America — San Luis, Argentina",
    "(UTC–3:00) America — Tucuman, Argentina",
    "(UTC–3:00) America — Ushuaia, Argentina",
    "(UTC–3:00) America — Asuncion",
    "(UTC–3:00) America — Bahia",
    "(UTC–3:00) America — Belem",
    "(UTC–3:00) America — Cayenne",
    "(UTC–3:00) America — Fortaleza",
    "(UTC–3:00) America — Maceio",
    "(UTC–3:00) America — Miquelon",
    "(UTC–3:00) America — Montevideo",
    "(UTC–3:00) America — Nuuk",
    "(UTC–3:00) America — Paramaribo",
    "(UTC–3:00) America — Punta Arenas",
    "(UTC–3:00) America — Recife",
    "(UTC–3:00) America — Santarem",
    "(UTC–3:00) America — Santiago",
    "(UTC–3:00) America — Sao Paulo",
    "(UTC–3:00) Antarctica — Palmer",
    "(UTC–3:00) Antarctica — Rothera",
    "(UTC–3:00) Atlantic — Stanley",
    "(UTC–2:00) America — Noronha",
    "(UTC–2:00) Atlantic — South Georgia",
    "(UTC–1:00) America — Scoresbysund",
    "(UTC–1:00) Atlantic — Azores",
    "(UTC–1:00) Atlantic — Cape Verde",
    "(UTC+0:00) Africa — Abidjan",
    "(UTC+0:00) Africa — Accra",
    "(UTC+0:00) Africa — Bissau",
    "(UTC+0:00) Africa — Monrovia",
    "(UTC+0:00) Africa — Sao Tome",
    "(UTC+0:00) America — Danmarkshavn",
    "(UTC+0:00) Antarctica — Troll",
    "(UTC+0:00) Atlantic — Canary",
    "(UTC+0:00) Atlantic — Faroe",
    "(UTC+0:00) Atlantic — Madeira",
    "(UTC+0:00) Atlantic — Reykjavik",
    "(UTC+0:00) Etc — GMT",
    "(UTC+0:00) Europe — Dublin",
    "(UTC+0:00) Europe — Lisbon",
    "(UTC+0:00) Europe — London",
    "(UTC+0:00) UTC",
    "(UTC+1:00) Africa — Algiers",
    "(UTC+1:00) Africa — Casablanca",
    "(UTC+1:00) Africa — Ceuta",
    "(UTC+1:00) Africa — El Aaiun",
    "(UTC+1:00) Africa — Lagos",
    "(UTC+1:00) Africa — Ndjamena",
    "(UTC+1:00) Africa — Tunis",
    "(UTC+1:00) Europe — Amsterdam",
    "(UTC+1:00) Europe — Andorra",
    "(UTC+1:00) Europe — Belgrade",
    "(UTC+1:00) Europe — Berlin",
    "(UTC+1:00) Europe — Brussels",
    "(UTC+1:00) Europe — Budapest",
    "(UTC+1:00) Europe — Copenhagen",
    "(UTC+1:00) Europe — Gibraltar",
    "(UTC+1:00) Europe — Luxembourg",
    "(UTC+1:00) Europe — Madrid",
    "(UTC+1:00) Europe — Malta",
    "(UTC+1:00) Europe — Monaco",
    "(UTC+1:00) Europe — Oslo",
    "(UTC+1:00) Europe — Paris",
    "(UTC+1:00) Europe — Prague",
    "(UTC+1:00) Europe — Rome",
    "(UTC+1:00) Europe — Stockholm",
    "(UTC+1:00) Europe — Tirane",
    "(UTC+1:00) Europe — Vienna",
    "(UTC+1:00) Europe — Warsaw",
    "(UTC+1:00) Europe — Zurich",
    "(UTC+2:00) Africa — Cairo",
    "(UTC+2:00) Africa — Johannesburg",
    "(UTC+2:00) Africa — Juba",
    "(UTC+2:00) Africa — Khartoum",
    "(UTC+2:00) Africa — Maputo",
    "(UTC+2:00) Africa — Tripoli",
    "(UTC+2:00) Africa — Windhoek",
    "(UTC+2:00) Asia — Beirut",
    "(UTC+2:00) Asia — Famagusta",
    "(UTC+2:00) Asia — Gaza",
    "(UTC+2:00) Asia — Hebron",
    "(UTC+2:00) Asia — Jerusalem",
    "(UTC+2:00) Asia — Nicosia",
    "(UTC+2:00) Europe — Athens",
    "(UTC+2:00) Europe — Bucharest",
    "(UTC+2:00) Europe — Chisinau",
    "(UTC+2:00) Europe — Helsinki",
    "(UTC+2:00) Europe — Kaliningrad",
    "(UTC+2:00) Europe — Kiev",
    "(UTC+2:00) Europe — Riga",
    "(UTC+2:00) Europe — Sofia",
    "(UTC+2:00) Europe — Tallinn",
    "(UTC+2:00) Europe — Uzhgorod",
    "(UTC+2:00) Europe — Vilnius",
    "(UTC+2:00) Europe — Zaporozhye",
    "(UTC+3:00) Africa — Nairobi",
    "(UTC+3:00) Antarctica — Syowa",
    "(UTC+3:00) Asia — Amman",
    "(UTC+3:00) Asia — Baghdad",
    "(UTC+3:00) Asia — Damascus",
    "(UTC+3:00) Asia — Qatar",
    "(UTC+3:00) Asia — Riyadh",
    "(UTC+3:00) Europe — Istanbul",
    "(UTC+3:00) Europe — Kirov",
    "(UTC+3:00) Europe — Minsk",
    "(UTC+3:00) Europe — Moscow",
    "(UTC+3:00) Europe — Simferopol",
    "(UTC+3:00) Europe — Volgograd",
    "(UTC+3:30) Asia — Tehran",
    "(UTC+4:00) Asia — Baku",
    "(UTC+4:00) Asia — Dubai",
    "(UTC+4:00) Asia — Tbilisi",
    "(UTC+4:00) Asia — Yerevan",
    "(UTC+4:00) Europe — Astrakhan",
    "(UTC+4:00) Europe — Samara",
    "(UTC+4:00) Europe — Saratov",
    "(UTC+4:00) Europe — Ulyanovsk",
    "(UTC+4:00) Indian — Mahe",
    "(UTC+4:00) Indian — Mauritius",
    "(UTC+4:00) Indian — Reunion",
    "(UTC+4:30) Asia — Kabul",
    "(UTC+5:00) Antarctica — Mawson",
    "(UTC+5:00) Asia — Aqtau",
    "(UTC+5:00) Asia — Aqtobe",
    "(UTC+5:00) Asia — Ashgabat",
    "(UTC+5:00) Asia — Atyrau",
    "(UTC+5:00) Asia — Dushanbe",
    "(UTC+5:00) Asia — Karachi",
    "(UTC+5:00) Asia — Oral",
    "(UTC+5:00) Asia — Qyzylorda",
    "(UTC+5:00) Asia — Samarkand",
    "(UTC+5:00) Asia — Tashkent",
    "(UTC+5:00) Asia — Yekaterinburg",
    "(UTC+5:00) Indian — Kerguelen",
    "(UTC+5:00) Indian — Maldives",
    "(UTC+5:30) Asia — Colombo",
    "(UTC+5:30) Asia — Kolkata",
    "(UTC+5:45) Asia — Kathmandu",
    "(UTC+6:00) Antarctica — Vostok",
    "(UTC+6:00) Asia — Almaty",
    "(UTC+6:00) Asia — Bishkek",
    "(UTC+6:00) Asia — Dhaka",
    "(UTC+6:00) Asia — Omsk",
    "(UTC+6:00) Asia — Qostanay",
    "(UTC+6:00) Asia — Thimphu",
    "(UTC+6:00) Asia — Urumqi",
    "(UTC+6:00) Indian — Chagos",
    "(UTC+6:30) Asia — Yangon",
    "(UTC+6:30) Indian — Cocos",
    "(UTC+7:00) Antarctica — Davis",
    "(UTC+7:00) Asia — Bangkok",
    "(UTC+7:00) Asia — Barnaul",
    "(UTC+7:00) Asia — Ho Chi Minh",
    "(UTC+7:00) Asia — Hovd",
    "(UTC+7:00) Asia — Jakarta",
    "(UTC+7:00) Asia — Krasnoyarsk",
    "(UTC+7:00) Asia — Novokuznetsk",
    "(UTC+7:00) Asia — Novosibirsk",
    "(UTC+7:00) Asia — Pontianak",
    "(UTC+7:00) Asia — Tomsk",
    "(UTC+7:00) Indian — Christmas",
    "(UTC+8:00) Asia — Brunei",
    "(UTC+8:00) Asia — Choibalsan",
    "(UTC+8:00) Asia — Hong Kong",
    "(UTC+8:00) Asia — Irkutsk",
    "(UTC+8:00) Asia — Kuala Lumpur",
    "(UTC+8:00) Asia — Kuching",
    "(UTC+8:00) Asia — Macau",
    "(UTC+8:00) Asia — Makassar",
    "(UTC+8:00) Asia — Manila",
    "(UTC+8:00) Asia — Shanghai",
    "(UTC+8:00) Asia — Singapore",
    "(UTC+8:00) Asia — Taipei",
    "(UTC+8:00) Asia — Ulaanbaatar",
    "(UTC+8:00) Australia — Perth",
    "(UTC+8:45) Australia — Eucla",
    "(UTC+9:00) Asia — Chita",
    "(UTC+9:00) Asia — Dili",
    "(UTC+9:00) Asia — Jayapura",
    "(UTC+9:00) Asia — Khandyga",
    "(UTC+9:00) Asia — Pyongyang",
    "(UTC+9:00) Asia — Seoul",
    "(UTC+9:00) Asia — Tokyo",
    "(UTC+9:00) Asia — Yakutsk",
    "(UTC+9:00) Pacific — Palau",
    "(UTC+9:30) Australia — Darwin",
    "(UTC+10:00) Antarctica — Dumont D'Urville",
    "(UTC+10:00) Asia — Ust-Nera",
    "(UTC+10:00) Asia — Vladivostok",
    "(UTC+10:00) Australia — Brisbane",
    "(UTC+10:00) Australia — Lindeman",
    "(UTC+10:00) Pacific — Chuuk",
    "(UTC+10:00) Pacific — Guam",
    "(UTC+10:00) Pacific — Port Moresby",
    "(UTC+10:30) Australia — Adelaide",
    "(UTC+10:30) Australia — Broken Hill",
    "(UTC+11:00) Antarctica — Casey",
    "(UTC+11:00) Antarctica — Macquarie",
    "(UTC+11:00) Asia — Magadan",
    "(UTC+11:00) Asia — Sakhalin",
    "(UTC+11:00) Asia — Srednekolymsk",
    "(UTC+11:00) Australia — Hobart",
    "(UTC+11:00) Australia — Lord Howe",
    "(UTC+11:00) Australia — Melbourne",
    "(UTC+11:00) Australia — Sydney",
    "(UTC+11:00) Pacific — Bougainville",
    "(UTC+11:00) Pacific — Efate",
    "(UTC+11:00) Pacific — Guadalcanal",
    "(UTC+11:00) Pacific — Kosrae",
    "(UTC+11:00) Pacific — Noumea",
    "(UTC+11:00) Pacific — Pohnpei",
    "(UTC+12:00) Asia — Anadyr",
    "(UTC+12:00) Asia — Kamchatka",
    "(UTC+12:00) Pacific — Fiji",
    "(UTC+12:00) Pacific — Funafuti",
    "(UTC+12:00) Pacific — Kwajalein",
    "(UTC+12:00) Pacific — Majuro",
    "(UTC+12:00) Pacific — Nauru",
    "(UTC+12:00) Pacific — Norfolk",
    "(UTC+12:00) Pacific — Tarawa",
    "(UTC+12:00) Pacific — Wake",
    "(UTC+12:00) Pacific — Wallis",
    "(UTC+13:00) Pacific — Apia",
    "(UTC+13:00) Pacific — Auckland",
    "(UTC+13:00) Pacific — Enderbury",
    "(UTC+13:00) Pacific — Fakaofo",
    "(UTC+13:00) Pacific — Tongatapu",
    "(UTC+13:45) Pacific — Chatham",
    "(UTC+14:00) Pacific — Kiritimati",
  ];

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

  const dateFormatOptions = [
    "dd/mm/yyyy",
    "dd.mm.yyyy",
    "mm/dd/yyyy",
    "yyyy/mm/dd",
    "yyyy-mm-dd",
  ];

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

  // console.log("tabValue = ", tabValue);

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

  // const initClient = {
  //   firstName: "",
  //   lastName: "",
  //   companyName: "",
  //   email: "",
  //   phone: "",
  //   businessPhone: "",
  //   mobilePhone: "",
  //   country: countryOptions[0],
  //   primaryAddress: "",
  //   secondaryAddress: "",
  //   city: "",
  //   state: "",
  //   zipCode: "",
  // };

  // const [client, setClient] = useState(initClient);

  // console.log("client = ", JSON.stringify(client, null, 2));

  
  // const [profilePhotoSrc, setProfilePhotoSrc] = useState(userData.profilePhotoSrc);
  // const [saveProfilePhotoSrc, setSaveProfilePhotoSrc] = useState(null);
  // const [firstName, setFirstName] = useState(userData.firstName);
  // const [lastName, setLastName] = useState(userData.lastName);
  // const [wantChangePassword, setWantChangePassword] = useState(false);
  // const [currentPassword, setCurrentPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [confirmNewPassword, setConfirmNewPassword] = useState("");
  // const [timeZone, setTimeZone] = useState(userData.timeZone);
  // const [loadingScreenDisplay, setLoadingScreenDisplay] = useState(userData.loadingScreenDisplay);

  // const [profilePhotoSrc, setProfilePhotoSrc] = useState(userData.profilePhotoSrc);
  // const [profilePhotoSrc, setProfilePhotoSrc] = useState("");
  const uploadPhotoRef = useRef();
  const uploadLogoRef = useRef();
  const [profilePhotoSrc, setProfilePhotoSrc] = useState(user.profile_photo ? user.profile_photo : "");
  const [saveProfilePhotoSrc, setSaveProfilePhotoSrc] = useState(null);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  // const [timeZone, setTimeZone] = useState(user.time_zone == null ? "" : user.time_zone);
  const [timeZone, setTimeZone] = useState(user.time_zone);
  const [businessName, setBusinessName] = useState(user.business.name ? user.business.name : "");
  const [business_phone, setBusinessPhone] = useState(user.business.business_phone ? user.business.business_phone : "");
  const [mobile_phone, setMobilePhone] = useState(user.business.mobile_phone ? user.business.mobile_phone : "");
  const [country, setCountry] = useState(user.business.country);
  const [address_1, setAddress_1] = useState(user.business.address_1 ? user.business.address_1 : "");
  const [address_2, setAddress_2] = useState(user.business.address_2 ? user.business.address_2 : "");
  const [city, setCity] = useState(user.business.city ? user.business.city : "");
  const [state, setState] = useState(user.business.state ? user.business.state : "");
  const [zip_code, setZipCode] = useState(user.business.zip_code ? user.business.zip_code : "");
  const [base_currency, setBaseCurrency] = useState(user.business.base_currency);
  const [businessTimeZone, setBusinessTimeZone] = useState(user.business.time_zone);
  const [date_format, setDateFormat] = useState(user.business.date_format ? user.business.date_format : dateFormatOptions[0]);
  const [tax_name, setTaxName] = useState(user.business.tax_name ? user.business.tax_name : "");
  const [tax_number, setTaxNumber] = useState(user.business.tax_number ? user.business.tax_number : "");
  const [standard_rate, setStandardRate] = useState(user.business.standard_rate ? user.business.standard_rate : "");
  const [theme_color, setThemeColor] = useState(user.business.theme_color);
  const [theme_font, setThemeFont] = useState(user.business.theme_font);
  const [theme_logo, setThemeLogo] = useState(user.business.theme_logo ? user.business.theme_logo : "");
  const [save_theme_logo, setSaveThemeLogo] = useState(null);
  const [hover_theme_logo, setHoverThemeLogo] = useState(false);
  const [emailNotification, setEmailNotification] = useState(user.business.all_email_notifications);
  const [recurring_invoice_sent, setRecurringInvoiceSent] = useState(user.business.notification.recurring_invoice_sent);
  const [comment_added_on_invoice, setCommentAddedOnInvoice] = useState(user.business.notification.comment_added_on_invoice);
  const [online_payment_received, setOnlinePaymentReceived] = useState(user.business.notification.online_payment_received);
  const [comment_added_on_estimate_or_proposal, setCommentAddedOnEstimateOrProposal] = useState(user.business.notification.comment_added_on_estimate_or_proposal);
  const [estimate_or_proposal_accepted, setEstimateOrProposalAccepted] = useState(user.business.notification.estimate_or_proposal_accepted);
  const [comment_added_on_project, setCommentAddedOnProject] = useState(user.business.notification.comment_added_on_project);
  const [post_made_on_project, setPostMadeOnProject] = useState(user.business.notification.post_made_on_project);
  const [validation, setValidation] = useState({});

  console.log("profilePhotoSrc = ", profilePhotoSrc);
  console.log("saveProfilePhotoSrc = ", saveProfilePhotoSrc);
  console.log("businessTimeZone = ", businessTimeZone);
  console.log("theme_color = ", theme_color);
  console.log("theme_logo = ", theme_logo);
  console.log("save_theme_logo = ", save_theme_logo);
  // if (theme_logo) {
  //   console.log("ok")
  // } else console.log("omg")
  // console.log("timeZone = ", timeZone);
  // console.log("loadingScreenDisplay = ", loadingScreenDisplay);
  
  // console.log("include = ", timeZoneOptions.includes(businessTimeZone));

  // let timeZoneOptionsSliced = timeZoneOptions.forEach(timeZone => timeZone.slice(timeZone.indexOf(" ") + 1));
  // let tempTimeZoneOptions = timeZoneOptions.map(timeZone => timeZone.slice(timeZone.indexOf(" ") + 1));

  // console.log("tempTimeZoneOptions = ", tempTimeZoneOptions);

  // let temp_businessTimeZone = businessTimeZone.slice(businessTimeZone.indexOf(" ") + 1);

  // console.log("temp_businessTimeZone = ", temp_businessTimeZone);

  // let incl = timeZoneOptions.forEach(timeZone => timeZone.slice(timeZone.indexOf(" ") + 1)).includes(businessTimeZone.slice(businessTimeZone.indexOf(" ") + 1))
  // console.log("include with slice = ", tempTimeZoneOptions.includes(temp_businessTimeZone));

  console.log("validation = ", validation);
  
  const [currentColor, setCurrentColor] = useState(theme_color);
  // const [changeCurrentColor, setChangeCurrentColor] = useState(false);
  const [changeCurrentColor, setChangeCurrentColor] = useState(!colorPickerOptions.includes(theme_color));
  const [anchorElChromePicker, setAnchorElChromePicker] = useState(null);
  const openChromePicker = Boolean(anchorElChromePicker);

  console.log("changeCurrentColor = ", changeCurrentColor);
  console.log("currentColor = ", currentColor);

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

  const handleChangeEmailNotification = (event) => {
    TokenValidation(event);
    const newValue = !emailNotification;
    setEmailNotification(newValue);
    setRecurringInvoiceSent(newValue);
    setCommentAddedOnInvoice(newValue);
    setOnlinePaymentReceived(newValue);
    setCommentAddedOnEstimateOrProposal(newValue);
    setEstimateOrProposalAccepted(newValue);
    setCommentAddedOnProject(newValue);
    setPostMadeOnProject(newValue);
    UpdateEmailNotifications({
      all_email_notifications: newValue,
      recurring_invoice_sent: newValue,
      comment_added_on_invoice: newValue,
      online_payment_received: newValue,
      comment_added_on_estimate_or_proposal: newValue,
      estimate_or_proposal_accepted: newValue,
      comment_added_on_project: newValue,
      post_made_on_project: newValue,
    });
    if (emailNotification) {
      showToast({title: "Email Notifications are enabled", body: "You'll now receive all email notifications."});
    } else {
      showToast({title: "Email Notifications are disabled", body: "You will no longer receive email notifications."});
    }
  };

  const handleChangeRecurringInvoiceSent = (event) => {
    TokenValidation(event);
    const newValue = !recurring_invoice_sent;
    setRecurringInvoiceSent(newValue);
    if (!comment_added_on_invoice && !online_payment_received && 
        !comment_added_on_estimate_or_proposal && !estimate_or_proposal_accepted && 
        !comment_added_on_project && !post_made_on_project) {
      setEmailNotification(newValue);
      UpdateEmailNotifications({all_email_notifications: newValue, recurring_invoice_sent: newValue});
    } else {
      UpdateEmailNotifications({recurring_invoice_sent: newValue});
    }
    showToast({title: "Your changes have been saved", body: "You will only receive email notifications for the boxes that remain checked."});
  };

  const handleChangeCommentAddedOnInvoice = (event) => {
    TokenValidation(event);
    const newValue = !comment_added_on_invoice;
    setCommentAddedOnInvoice(newValue);
    if (!recurring_invoice_sent && !online_payment_received && 
        !comment_added_on_estimate_or_proposal && !estimate_or_proposal_accepted && 
        !comment_added_on_project && !post_made_on_project) {
      setEmailNotification(newValue);
      UpdateEmailNotifications({all_email_notifications: newValue, comment_added_on_invoice: newValue});
    } else {
      UpdateEmailNotifications({comment_added_on_invoice: newValue});
    }
    showToast({title: "Your changes have been saved", body: "You will only receive email notifications for the boxes that remain checked."});
  };
  
  const handleChangeOnlinePaymentReceived = (event) => {
    TokenValidation(event);
    const newValue = !online_payment_received;
    setOnlinePaymentReceived(newValue);
    if (!recurring_invoice_sent && !comment_added_on_invoice && 
        !comment_added_on_estimate_or_proposal && !estimate_or_proposal_accepted && 
        !comment_added_on_project && !post_made_on_project) {
      setEmailNotification(newValue);
      UpdateEmailNotifications({all_email_notifications: newValue, online_payment_received: newValue});
    } else {
      UpdateEmailNotifications({online_payment_received: newValue});
    }
    showToast({title: "Your changes have been saved", body: "You will only receive email notifications for the boxes that remain checked."});
  };

  const handleChangeCommentAddedOnEstimateOrProposal = (event) => {
    TokenValidation(event);
    const newValue = !comment_added_on_estimate_or_proposal;
    setCommentAddedOnEstimateOrProposal(newValue);
    if (!recurring_invoice_sent && !comment_added_on_invoice && 
        !online_payment_received && !estimate_or_proposal_accepted && 
        !comment_added_on_project && !post_made_on_project) {
      setEmailNotification(newValue);
      UpdateEmailNotifications({all_email_notifications: newValue, comment_added_on_estimate_or_proposal: newValue});
    } else {
      UpdateEmailNotifications({comment_added_on_estimate_or_proposal: newValue});
    }
    showToast({title: "Your changes have been saved", body: "You will only receive email notifications for the boxes that remain checked."});
  };

  const handleChangeEstimateOrProposalAccepted = (event) => {
    TokenValidation(event);
    const newValue = !estimate_or_proposal_accepted;
    setEstimateOrProposalAccepted(newValue);
    if (!recurring_invoice_sent && !comment_added_on_invoice && 
        !online_payment_received && !comment_added_on_estimate_or_proposal && 
        !comment_added_on_project && !post_made_on_project) {
      setEmailNotification(newValue);
      UpdateEmailNotifications({all_email_notifications: newValue, estimate_or_proposal_accepted: newValue});
    } else {
      UpdateEmailNotifications({estimate_or_proposal_accepted: newValue});
    }
    showToast({title: "Your changes have been saved", body: "You will only receive email notifications for the boxes that remain checked."});
  };

  const handleChangeCommentAddedOnProject = (event) => {
    TokenValidation(event);
    const newValue = !comment_added_on_project;
    setCommentAddedOnProject(newValue);
    if (!recurring_invoice_sent && !comment_added_on_invoice && 
        !online_payment_received && !comment_added_on_estimate_or_proposal && 
        !estimate_or_proposal_accepted && !post_made_on_project) {
      setEmailNotification(newValue);
      UpdateEmailNotifications({all_email_notifications: newValue, comment_added_on_project: newValue});
    } else {
      UpdateEmailNotifications({comment_added_on_project: newValue});
    }
    showToast({title: "Your changes have been saved", body: "You will only receive email notifications for the boxes that remain checked."});
  };

  const handleChangePostMadeOnProject = (event) => {
    TokenValidation(event);
    const newValue = !post_made_on_project;
    setPostMadeOnProject(newValue);
    if (!recurring_invoice_sent && !comment_added_on_invoice && 
        !online_payment_received && !comment_added_on_estimate_or_proposal && 
        !estimate_or_proposal_accepted && !comment_added_on_project) {
      setEmailNotification(newValue);
      UpdateEmailNotifications({all_email_notifications: newValue, post_made_on_project: newValue});
    } else {
      UpdateEmailNotifications({post_made_on_project: newValue});
    }
    showToast({title: "Your changes have been saved", body: "You will only receive email notifications for the boxes that remain checked."});
  };

  const UpdateEmailNotifications = async (notification) => {
    console.log("notification in UpdateEmailNotifications = ", notification);
    try {
      let token = user.token.access;
      notification.id = user.business.notification.id;
      let response = await ActionsApi.UpdateEmailNotificationsOfAccount({ token }, notification);
      console.log("response of UpdateEmailNotificationsOfAccount = ", response);
      // let current_user = {...user};
      // users = { ...users, business: arrBusiness, };
      // current_user.notification = {...response.data.business};

      // let current_user = { ...user, notification: {...response.data.notification} };
      // let current_user;
      // if ("user" in response.data) {
      //   console.log("response data user all_email_notifications = ", response.data.user.all_email_notifications);
      //   current_user = { ...user, all_email_notifications: response.data.user.all_email_notifications, notification: {...response.data.notification} };
      // } else current_user = { ...user, notification: {...response.data.notification} };


      // let current_user = {
      //   ...user,
      //   ...("user" in response.data && {all_email_notifications: response.data.user.all_email_notifications}),
      //   notification: {...response.data.notification}
      // };
      let current_user = {...user};
      current_user.business = {
        ...user.business,
        ...("business" in response.data && {all_email_notifications: response.data.business.all_email_notifications}),
        notification: {...response.data.notification}
      };
      console.log("current_user = ", JSON.stringify(current_user, null, 2));
      current_user = JSON.stringify(current_user);
      setUser(current_user);
      localStorage.setItem("user", current_user);
    } catch (err) {
      console.log(err);
      console.log("error response of UpdateEmailNotificationsOfAccount = ", err.response);
    }
  };

  function FirstSplit(value) {
    return value.slice(value.indexOf(" ") + 1);
  }

  const handleChangeUploadPhoto = (event) => {
    // console.log("event uploadPhotoRef onChange file = ", event);
    const uploaded = event.target.files[0];
    setProfilePhotoSrc(URL.createObjectURL(uploaded));
    setSaveProfilePhotoSrc(uploaded);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    // console.log("event datatransfer files handleDrop = ", event.dataTransfer.files);
    if (event.dataTransfer.files.length !== 1) {
      setValidation({theme_logo: "Can only select one image"});
      showToast({title: "Can only select one image"});
    } else if (event.dataTransfer.files[0].type !== "image/gif" && event.dataTransfer.files[0].type !== "image/jpeg" && event.dataTransfer.files[0].type !== "image/png" && event.dataTransfer.files[0].type !== "image/tiff") {
      setValidation({theme_logo: "Image type is not allowed"});
      showToast({title: "Image type is not allowed"});
    } else {
      const uploaded = event.dataTransfer.files[0];
      setThemeLogo(URL.createObjectURL(uploaded));
      setSaveThemeLogo(uploaded);
    }
  };

  const handleChangeUploadLogo = (event) => {
    // console.log("event uploadPhotoRef onChange file = ", event);
    const uploaded = event.target.files[0];
    setThemeLogo(URL.createObjectURL(uploaded));
    setSaveThemeLogo(uploaded);
  };

  function toastSlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }
  
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [toastState, setToastState] = useState(false);
  const [toastMessage, setToastMessage] = useState({});
  const [toastTransition, setToastTransition] = useState(undefined);

  const showToast = (message) => {
    setToastMessage(message);
    setToastTransition(() => toastSlideTransition);
    setToastState(true);
  };

  function closeToast() {
    // setToastTransition(undefined);
    setToastState(false);
  }

  const TokenValidation = async (event) => {
    closeToast();
    setValidation({});
    if (event) {
      event.preventDefault();
    }
    let token = user.token.access, validation_response;
    try {
      validation_response = await AuthApi.TokenValidation({token});
      console.log("response of TokenValidation = ", validation_response);
    } catch (err) {
      console.log(err);
      console.log("error response of TokenValidation = ", err.response);
      validation_response = err.response;
    }
    if (validation_response.data.code === "token_not_valid" && validation_response.status === 401 && validation_response.statusText === "Unauthorized") {
      try {
        let get_response = await AuthApi.NewAccessToken({refresh: user.token.refresh});
        console.log("response of NewAccessToken = ", get_response);

        let new_user = {...user};
        new_user.token.access = get_response.data.access;
        new_user = JSON.stringify(new_user);
        setUser(new_user);
        localStorage.setItem("user", new_user);
      } catch (err) {
        console.log(err);
        console.log("error response of NewAccessToken = ", err.response);
        if (err.response && err.response.data.code === "token_not_valid" && err.response.status === 401 && err.response.statusText === "Unauthorized") {
          AuthApi.Logout(user);
          setUser(null);
          localStorage.removeItem("user");
          return <Redirect to="/authentication/sign-in" />;
        }
      }
    }
  };

  const save = async (event) => {
    TokenValidation(event);
    let token = user.token.access;

    if (tabValue === 0) {
      let change_response;
      if (currentPassword !== "" || newPassword !== "" || confirmNewPassword !== "") {
        try {
          change_response = await AuthApi.ChangePassword({token}, { current_password: currentPassword, new_password: newPassword, re_new_password: confirmNewPassword });
          console.log("response of ChangePassword = ", change_response);
        } catch (err) {
          console.log(err);
          console.log("error response of ChangePassword = ", err.response);
          return err.response;
        }
      }

      // if (change_response.status === 204 && change_response.statusText === "No Content") {
        try {
          let data;
          if (profilePhotoSrc.length === 0 && saveProfilePhotoSrc === null) {
            data = {
              first_name: firstName,
              last_name: lastName,
              time_zone: timeZone,
            };
          } else {
            data = new FormData();
            data.append('first_name', firstName);
            data.append('last_name', lastName);
            data.append('profile_photo', saveProfilePhotoSrc, saveProfilePhotoSrc.name);
            data.append('time_zone', timeZone);
          }
          let response = await ActionsApi.UpdateAccount({ id: user.id, token }, data);
          console.log("response of UpdateAccount = ", response);

          let current_user = {...user, ...response.data.user};
          current_user = JSON.stringify(current_user);
          setUser(current_user);
          localStorage.setItem("user", current_user);
          setCurrentPassword("");
          showToast({title: "Changes to your profile are now saved."});
        } catch (err) {
          console.log(err);
          console.log("error response of UpdateAccount = ", err.response);
          // if (err.response) {
          //   // return setError(err.response.data.msg);
          //   return setError(err.response.data.detail);
          // }
          // return setError("There has been an error.");
        }
      // }
    } else if (tabValue === 1) {
      if (businessName === "") {
        return setValidation({business_name: "Enter a business name"});
      }
      try {
        let response, data = {
          id: user.business.id,
          name: businessName,
          business_phone,
          mobile_phone,
          country,
          address_1,
          address_2,
          city,
          state,
          zip_code,
          base_currency,
          time_zone: businessTimeZone,
          date_format,
          tax_name,
          tax_number,
          standard_rate,
        };
        response = await ActionsApi.UpdateBusinessOfAccount({ token }, data);
        console.log("response of UpdateBusinessOfAccount = ", response);
        // let current_user = {...user};
        // current_user.business[0] = {...response.data.business};
        let current_user = {...user, business: {...user.business, ...response.data.business}};
        current_user = JSON.stringify(current_user);
        setUser(current_user);
        localStorage.setItem("user", current_user);
        showToast({title: "Your Company Profile has been updated.", body: "This information will appear on your invoices."});
      } catch (err) {
        console.log(err);
        console.log("error response of UpdateBusinessOfAccount = ", err.response);
      }
    } else if (tabValue === 2) {
      try {
        let data;
        if (theme_logo.length === 0 && save_theme_logo === null) {
          data = {theme_color, theme_font}
        } else {
          data = new FormData();
          data.append('theme_color', theme_color);
          data.append('theme_font', theme_font);
          data.append('theme_logo', save_theme_logo, save_theme_logo.name);
        }
        // let response = await ActionsApi.UpdateLogoThemeOfAccount({ id: user.id, token }, data);
        let response = await ActionsApi.UpdateLogoThemeOfAccount({ business_id: user.business.id, token }, data);
        console.log("response of UpdateLogoThemeOfAccount = ", response);

        // let current_user = {...user, ...response.data.user};
        let current_user = {...user, business: {...user.business, ...response.data.business}};
        current_user = JSON.stringify(current_user);
        setUser(current_user);
        localStorage.setItem("user", current_user);
        showToast({title: "Your customizations are saved.", body: "Updates will apply to new invoices and more."});
      } catch (err) {
        console.log(err);
        console.log("error response of UpdateLogoThemeOfAccount = ", err.response);
      }
    }
  };

  // const handleChangeEditDialog = (evt) => {
  //   // console.log("evt in handleChangeEditDialog = ", evt)
  //   // evt.persist();
  //   // setErrorEmail(false);
  //   const {name, value} = evt.target;
  //   setClient({
  //     ...client,
  //     [name]: value,
  //   });
  // };

//   const [anchorEl, setAnchorEl] = useState(null);
//   const openSelectMenu = Boolean(anchorEl);
//   const handleClickSelectMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseSelectMenu = () => {
//     setAnchorEl(null);
//   };

//   const [openDialog, setOpenDialog] = useState(false);
//   const handleClickOpenDialog = () => {
//     handleCloseSelectMenu();
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

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

//   const [openDialogByRow, setOpenDialogByRow] = useState(false);
//   const handleClickOpenDialogByRow = () => {
//     setOpenDialogByRow(true);
//   };

//   const handleCloseDialogByRow = () => {
//     setOpenDialogByRow(false);
//   };

//   const deleteDataByRow = (row) => {
//     allClientData.splice(allClientData.findIndex(item => item.id === row.id), 1);
//     let newSelected = [...selected];
//     let selectRowIndex = newSelected.findIndex(item => item.id === row.id);
//     if (selectRowIndex !== -1) {
//       newSelected.splice(selectRowIndex, 1);
//     }
//     setSelected(newSelected);
//     handleCloseDialogByRow();
//     showToast(row.company + " has been successfully deleted.")
//   };

  // const TableContainer = forwardRef(function TableContainer(props, ref) {
  //   return <TableContainer ref={ref} {...props} style={{ borderRadius: 0, }} />;
  // });

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
        borderWidth: 3,
        borderStyle: "solid",
        width: "100px !important",
        height: "100px !important",
        fontSize: "48px !important",
        fontWeight: "400 !important",
        textTransform: "uppercase",
        transition: "unset",
      },
      children: name.split(" ").length > 1 ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : `${name.slice(0, 2)}`,
    };
  }

//   function currencyDecimalFormat(value) {
//     return `$${Number(value).toFixed(2)} USD`;
//   }

  function changeTab(type) {
    // if (type === "overdue") {
    //   if (history.location.pathname === url) {
    //     history.push(`${url}/overdue`);
    //   } else {
    //     history.push(url);
    //   }
    // }
    history.push(`${url}/${type}`);
  }

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center", }}
          open={toastState}
          onClose={() => closeToast()}
          autoHideDuration={5000}
          TransitionComponent={toastTransition}
          // sx={{
          //   "& .MuiAlert-root": {
          //     backgroundColor: "#37a703",
          //     color: "#fff",
          //   },
          //   "& .MuiAlert-message": {
          //     display: "grid",
          //     padding: "6px 0",
          //     gap: "3px",
          //   },
          // }}
        >
          {validation && Object.keys(validation).length === 0 && Object.getPrototypeOf(validation) === Object.prototype 
            ? <Alert severity="success"
                sx={{
                  "&.MuiAlert-root": {
                    backgroundColor: "#37a703",
                    color: "#fff",
                  },
                  "& .MuiAlert-message": {
                    display: "grid",
                    padding: "6px 0",
                    gap: "3px",
                  },
                }}
              >
                {/* {"title" in toastMessage && <AlertTitle>{toastMessage.title}</AlertTitle>} */}
                {"title" in toastMessage && toastMessage.title}
                {"body" in toastMessage && 
                  <SuiTypography variant="button" fontWeight="regular" textColor="light" style={{ fontSize: "0.875rem", }}>{toastMessage.body}</SuiTypography>}
              </Alert>
            : <Alert severity="error">
                {"title" in toastMessage && toastMessage.title}
                {"body" in toastMessage && 
                  <SuiTypography variant="button" fontWeight="regular" textColor="light" style={{ fontSize: "0.875rem", }}>
                    {toastMessage.body}
                  </SuiTypography>}
              </Alert>
          }
        </Snackbar>
        <Tabs
          orientation={tabsOrientation}
          value={tabValue}
          onChange={(event, newValue) => setTabValue(newValue)}
          sx={{ ml: 6.5, }}
          className={classes.currency_tab}
        >
          <Tab label="Account" onClick={() => changeTab("account")} />
          <Tab label="Business" onClick={() => changeTab("business")} />
          <Tab label="Logo &amp; Theme" onClick={() => changeTab("logo-and-theme")} />
          <Tab label="Email Notifications" onClick={() => changeTab("notifications")} />
        </Tabs>
        {tabValue === 0 ? (
          <SuiBox my={3} ml={6.5} customClass={classes.account_settings_tab_container}>
            <SuiBox mb={3} customClass={classes.account_details_container}>
              <SuiTypography variant="h5" fontWeight="medium" mb={3} sx={{ fontSize: 22, }}>
                Account Details
              </SuiTypography>
              {profilePhotoSrc.length === 0 && saveProfilePhotoSrc === null
              ? <SuiAvatar {...stringAvatar(`${user.first_name} ${user.last_name}`)} />
              : <SuiAvatar src={profilePhotoSrc} sx={{ width: "100px !important", height: "100px !important", }} />}
              <input hidden accept="image/*" type="file" 
                ref={uploadPhotoRef}
                onChange={handleChangeUploadPhoto}
              />
              <SuiTypography variant="button" fontWeight="regular"
                customClass="button-link" style={{ width: "fit-content", }}
                onClick={() => {
                  if (profilePhotoSrc.length === 0 && saveProfilePhotoSrc === null) {
                    uploadPhotoRef.current.click();
                  } else {
                    setProfilePhotoSrc("");
                    setSaveProfilePhotoSrc(null);
                  }
              }}>
                {profilePhotoSrc.length === 0 && saveProfilePhotoSrc === null ? "Upload" : "Remove"} Photo
              </SuiTypography>
              <SuiBox my={3} style={{ display: "flex", }}>
                <SuiBox width={338}>
                  <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                    First Name
                  </SuiTypography>
                  <SuiInput
                    placeholder="First"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </SuiBox>
                <SuiBox ml={3} width={338}>
                  <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                    Last Name
                  </SuiTypography>
                  <SuiInput
                    placeholder="Last"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </SuiBox>
              </SuiBox>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Email Address
                </SuiTypography>
                <SuiInput
                  placeholder="Email"
                  defaultValue={user.email}
                  inputProps={{
                    disabled: true,
                  }}
                  // onChange={(event) => {
                  //   setEmail(event.target.value);
                  //   setError(undefined);
                  // }}
                  customClass="Mui-disabled"
                />
                {/* <SuiTypography variant="button" fontWeight="regular" customClass="button-link" style={{ width: "fit-content", }}>
                  Disconnect Google Account
                </SuiTypography> */}
              </SuiBox>
              <SuiBox mb={3}>
                  <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                    Password
                  </SuiTypography>
                {/* {!wantChangePassword ?
                  <SuiInput
                    placeholder="Password"
                    defaultValue={userData.password}
                    inputProps={{
                      disabled: true,
                    }}
                    type="password"
                    customClass="Mui-disabled"
                  />
                : (
                  <> */}
                    <SuiInput
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(event) => setCurrentPassword(event.target.value)}
                      // onChange={(event) => {
                      //   setPassword(event.target.value);
                      //   setError(undefined);
                      // }}
                      type="password"
                    />
                    <SuiBox my={3}>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                      New Password
                    </SuiTypography>
                    <SuiInput
                      placeholder="New password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      type="password"
                    />
                    </SuiBox>
                    <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                      Confirm New Password
                    </SuiTypography>
                    <SuiInput
                      placeholder="Confirm new password"
                      value={confirmNewPassword}
                      onChange={(event) => setConfirmNewPassword(event.target.value)}
                      type="password"
                    />
                  {/* </>
                )} */}
                {/* {wantChangePassword &&  */}
                  {/* <SuiTypography
                    // component={Link}
                    // to="/authentication/sign-in"
                    variant="button"
                    fontWeight="regular"
                    customClass="button-link"
                    // fontWeight="bold"
                    // textGradient
                  >
                    Forgot Password?
                  </SuiTypography> */}
                {/* } */}
                {/* <SuiTypography variant="button" fontWeight="regular" customClass="button-link" onClick={() => setWantChangePassword(!wantChangePassword)}>
                  {!wantChangePassword ? "Change password" : "Cancel"}
                </SuiTypography> */}
              </SuiBox>
            </SuiBox>

            {/* <SuiBox mb={13}> */}
            <SuiBox pb={10.5}>
              <SuiTypography variant="h5" fontWeight="medium" mb={3} sx={{ fontSize: 22, }}>
                Preferences
              </SuiTypography>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Time Zone
                </SuiTypography>
                <Select
                  value={timeZone}
                  onChange={(event) => setTimeZone(event.target.value)}
                  displayEmpty
                  className={classes.select_root}
                  MenuProps={{
                    classes: {
                      paper: classes.select_menuPaper,
                    },
                  }}
                >
                  {timeZoneOptions.map((element, index) => (
                    <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                  ))}
                </Select>
              </SuiBox>
              {/* <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Loading Screen Display
                </SuiTypography>
                <Select
                  value={loadingScreenDisplay}
                  onChange={(event) => setLoadingScreenDisplay(event.target.value)}
                  displayEmpty
                  MenuProps={{
                    classes: {
                      paper: classes.select_menuPaper,
                    },
                  }}
                >
                  <MenuItem value={0}>Show FreshBooks logo (no quotes)</MenuItem>
                  <MenuItem value={1}>Show inspirational quotes</MenuItem>
                </Select>
                <SuiTypography mt={1.5} variant="button" fontWeight="regular" id="form-inputLabel">
                  Choose what appears when your account is loading.
                </SuiTypography>
              </SuiBox> */}

            </SuiBox>

          </SuiBox>
        ) : tabValue === 1 ? (
          // <SuiBox my={3}>
          //   <SuiTypography variant="h5" fontWeight="medium" mb={3} sx={{ fontSize: 22, }}>
          //     Business Details
          //   </SuiTypography>
          // </SuiBox>
          <SuiBox my={3} ml={6.5} customClass={classes.account_settings_tab_container}>
            <SuiBox mb={3} customClass={classes.account_details_container}>
              <SuiTypography variant="h5" fontWeight="medium" mb={3} sx={{ fontSize: 22, }}>
                Business Details
              </SuiTypography>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Business Name
                </SuiTypography>
                <SuiInput
                  error={"business_name" in validation}
                  value={businessName}
                  onChange={(event) => {setBusinessName(event.target.value); setValidation({});}}
                />
                {"business_name" in validation &&
                  <SuiTypography
                    variant="button"
                    fontWeight="regular"
                    textColor="error"
                    style={{ fontSize: 13, }}
                  >
                    {validation.business_name}
                  </SuiTypography>
                }
                {/* {"new_password" in validation &&
                  validation.new_password.map((message, index) => {
                    return (
                      <>
                        <SuiTypography
                          key={`${index} — ${message}`}
                          variant="button"
                          fontWeight="regular"
                          textColor="error"
                          style={{ fontSize: 13, }}
                        >
                          {message}
                        </SuiTypography>
                        {index !== validation.new_password.length - 1 && <br/>}
                      </>
                    )
                  })
                } */}
              </SuiBox>
              <SuiBox mb={3} style={{ display: "flex", }}>
                <SuiBox width={338}>
                  <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                    Business Phone
                  </SuiTypography>
                  <SuiInput
                    value={business_phone}
                    onChange={(event) => setBusinessPhone(event.target.value)}
                  />
                </SuiBox>
                <SuiBox ml={3} width={338}>
                  <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                    Mobile Phone
                  </SuiTypography>
                  <SuiInput
                    value={mobile_phone}
                    onChange={(event) => setMobilePhone(event.target.value)}
                  />
                </SuiBox>
              </SuiBox>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Country
                </SuiTypography>
                <Autocomplete
                  freeSolo
                  disableClearable
                  value={country}
                  onChange={(event, newValue) => {
                    setCountry(newValue);
                  }}
                  options={countryOptions}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: "338px !important", }}
                />
              </SuiBox>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Address Line 1
                </SuiTypography>
                <SuiInput
                  placeholder="Address Line 1"
                  value={address_1}
                  onChange={(event) => setAddress_1(event.target.value)}
                />
              </SuiBox>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Address Line 2
                </SuiTypography>
                <SuiInput
                  placeholder="Address Line 2"
                  value={address_2}
                  onChange={(event) => setAddress_2(event.target.value)}
                />
              </SuiBox>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  City
                </SuiTypography>
                <SuiInput
                  placeholder="City"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  sx={{ width: "338px !important", }}
                />
              </SuiBox>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  State
                </SuiTypography>
                <SuiInput
                  placeholder="State"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  sx={{ width: "338px !important", }}
                />
              </SuiBox>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  ZIP Code
                </SuiTypography>
                <SuiInput
                  placeholder="ZIP Code"
                  value={zip_code}
                  onChange={(event) => setZipCode(event.target.value)}
                  sx={{ width: "338px !important", }}
                />
              </SuiBox>
            </SuiBox>
            <SuiBox pb={10.5}>
              <SuiTypography variant="h5" fontWeight="medium" mb={3} sx={{ fontSize: 22, }}>
                Preferences
              </SuiTypography>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Base Currency
                </SuiTypography>
                <Autocomplete
                  freeSolo
                  disableClearable
                  value={base_currency}
                  onChange={(event, newValue) => {
                    setBaseCurrency(newValue);
                  }}
                  options={baseCurrencyOptions}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: "338px !important", }}
                />
              </SuiBox>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Business Time Zone
                </SuiTypography>
                <Select
                  value={FirstSplit(businessTimeZone)}
                  // onChange={(event) => {
                  //   console.log("evt = ", event);
                  //   console.log("evt attr name = ", event.target.getAttribute("name"));
                  //   setBusinessTimeZone(event.target.value)
                  // }}
                  displayEmpty
                  className={classes.select_root}
                  MenuProps={{
                    classes: {
                      paper: classes.select_menuPaper,
                    },
                  }}
                  sx={{ width: "338px !important", }}
                >
                  {timeZoneOptions.map((element, index) => {
                    return (
                      <MenuItem
                        name={element}
                        key={`${index} — ${element}`}
                        value={FirstSplit(element)}
                        onClick={(event) => {
                          // console.log("evt menu item = ", event);
                          setBusinessTimeZone(event.target.innerHTML);
                        }}
                      >
                        {element}
                      </MenuItem>
                    )
                  })}
                </Select>
              </SuiBox>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Date Format
                </SuiTypography>
                <Select
                  value={date_format}
                  onChange={(event) => setDateFormat(event.target.value)}
                  displayEmpty
                  className={classes.select_root}
                  MenuProps={{
                    classes: {
                      paper: classes.select_menuPaper,
                    },
                  }}
                  sx={{ width: "338px !important", }}
                >
                  {dateFormatOptions.map((element, index) => (
                    <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                  ))}
                </Select>
              </SuiBox>
              <SuiBox mb={3} style={{ display: "flex", }}>
                <SuiBox width={338}>
                  <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                    Tax Name
                  </SuiTypography>
                  <SuiInput
                    value={tax_name}
                    onChange={(event) => setTaxName(event.target.value)}
                  />
                </SuiBox>
                <SuiBox ml={3} width={338}>
                  <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                    Tax Number
                  </SuiTypography>
                  <SuiInput
                    value={tax_number}
                    onChange={(event) => setTaxNumber(event.target.value)}
                  />
                </SuiBox>
              </SuiBox>
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel">
                  Standard Rate
                </SuiTypography>
                <SuiBox style={{ display: "flex", }}>
                  <SuiInput
                    placeholder="0.00"
                    value={standard_rate}
                    onChange={(event) => setStandardRate(event.target.value)}
                    sx={{ width: "338px !important", }}
                  />
                  <SuiTypography variant="h6" fontWeight="regular" sx={{ ml: 1, alignSelf: "center", }}>/hr</SuiTypography>
                </SuiBox>
              </SuiBox>
            </SuiBox>
          </SuiBox>
        ) : tabValue === 2 ? (
          // <SuiBox my={3} ml={6.5} customClass={classes.account_settings_tab_container}>
          <SuiBox mt={3} mb={14} ml={6.5} customClass={classes.account_settings_tab_container}>
            {/* <SuiBox mb={3} customClass={classes.account_details_container}> */}
            {/* <SuiBox mb={12} customClass={classes.account_details_container}> */}
            <SuiBox customClass={classes.account_details_container}>
              <SuiTypography variant="h5" fontWeight="medium" mb={3} sx={{ fontSize: 22, }}>
                Logo &amp; Theme
              </SuiTypography>
              <SuiTypography component="p" fontWeight="regular" mb={3} sx={{ fontSize: "1rem", }}>
                Changes made here will apply to new and draft Invoices, Estimates and Proposals, as well as existing Recurring Templates. You can still make individual customizations on Invoices, Estimates, and Proposals.
              </SuiTypography>
              <SuiBox mb={3}>
                <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                  Theme Color
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
              <SuiBox mb={3}>
                <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                  Font
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
                  sx={{ width: "338px !important", }}
                >
                  {themeFontOptions.map((element, index) => (
                    <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                  ))}
                </Select>
              </SuiBox>
              <SuiBox mb={0.75}>
                <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                  Logo
                </SuiTypography>
                <input hidden accept="image/*" type="file" 
                  ref={uploadLogoRef}
                  onChange={handleChangeUploadLogo}
                />
                {theme_logo.length === 0 && save_theme_logo === null
                  ? <SuiBox sx={{ backgroundImage: `url(${uploadImage})`, justifyContent: "center", alignItems: "center", }}
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
                      <SuiTypography variant="button" fontWeight="regular" sx={{ fontSize: "1rem", }}>
                        Drag your logo here, <br/> or&nbsp;
                        <SuiTypography variant="button" fontWeight="regular" customClass="button-link">
                          select a file
                        </SuiTypography>
                      </SuiTypography>
                    </SuiBox>
                  : <SuiBox sx={{ backgroundImage: `url("${theme_logo}")`, justifyContent: "end", }}
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
              </SuiBox>
              <SuiTypography mb={3} variant="button" fontWeight="regular" id="form-inputLabel">
                Accepted file formats: GIF, JPEG, PNG, TIFF.
              </SuiTypography>
            </SuiBox>
          </SuiBox>
        ) : (
          // <SuiBox my={3}>
          //   <SuiTypography variant="h5" fontWeight="medium" mb={3} sx={{ fontSize: 22, }}>
          //     Email Notifications
          //   </SuiTypography>
          <SuiBox mt={3} mb={14} ml={6.5} customClass={classes.account_settings_tab_container}>
            <SuiBox customClass={classes.account_details_container}>
              <SuiTypography variant="h5" fontWeight="medium" mb={3} sx={{ fontSize: 22, }}>
                Email Notifications
              </SuiTypography>
              <SuiTypography component="p" fontWeight="regular" mb={3} sx={{ fontSize: "1rem", }}>
                Turn on or off notification emails FreshBooks sends you.
              </SuiTypography>
              <SuiBox mb={3} customClass={classes.email_notifications_container}>
                <SuiBox mb={3} customClass="header d-flex">
                  <SuiTypography variant="h5" fontWeight="medium" mb={3} sx={{ fontSize: 22, color: "#001b40", }}>
                    Email Notifications to me
                  </SuiTypography>
                  <SuiBox style={{ marginLeft: "auto", float: "right", }}>
                    <SuiTypography mr={1} variant="button" fontWeight="regular" id="form-inputLabel" sx={{ color: "#576981", }}>
                      Turn on/off all email notifications
                    </SuiTypography>
                    <Switch checked={emailNotification} onChange={handleChangeEmailNotification} />
                  </SuiBox>
                </SuiBox>
                {/* <SuiTypography variant="h6" fontWeight="light" mb={3}> */}
                <SuiTypography fontWeight="regular" mb={3} sx={{ color: "#576981", fontSize: "1rem", }}>
                  Send me an email when
                </SuiTypography>
                <SuiBox customClass="content">
                  <SuiBox mb={3} customClass="d-flex">
                    <SuiBox style={{ width: "50%", }}>
                      <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                        Invoices
                      </SuiTypography>
                      <SuiBox>
                        <Checkbox checked={recurring_invoice_sent} onChange={handleChangeRecurringInvoiceSent} />
                        <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ fontSize: "1rem", }}>
                          A recurring Invoice is sent
                        </SuiTypography>
                      </SuiBox>
                      <SuiBox>
                        <Checkbox checked={comment_added_on_invoice} onChange={handleChangeCommentAddedOnInvoice} />
                        <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ fontSize: "1rem", }}>
                          A comment is added on an Invoice
                        </SuiTypography>
                      </SuiBox>
                    </SuiBox>
                    <SuiBox ml={3} style={{ width: "50%", }}>
                      <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                        Payments
                      </SuiTypography>
                      <SuiBox>
                        <Checkbox checked={online_payment_received} onChange={handleChangeOnlinePaymentReceived} />
                        <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ fontSize: "1rem", }}>
                          An online payment is received
                        </SuiTypography>
                      </SuiBox>
                    </SuiBox>
                  </SuiBox>
                  <SuiBox customClass="d-flex" style={{ justifyContent: "space-between", }}>
                    <SuiBox style={{ width: "50%", }}>
                      <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                        Estimates and Proposals
                      </SuiTypography>
                      <SuiBox>
                        <Checkbox checked={comment_added_on_estimate_or_proposal} onChange={handleChangeCommentAddedOnEstimateOrProposal} />
                        <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ fontSize: "1rem", }}>
                          A comment is added on an Estimate/Proposal
                        </SuiTypography>
                      </SuiBox>
                      <SuiBox>
                        <Checkbox checked={estimate_or_proposal_accepted} onChange={handleChangeEstimateOrProposalAccepted} />
                        <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ fontSize: "1rem", }}>
                          An Estimate/Proposal is accepted
                        </SuiTypography>
                      </SuiBox>
                    </SuiBox>
                    <SuiBox ml={3} style={{ width: "50%", }}>
                      <SuiTypography mb={0.75} variant="button" fontWeight="regular" id="form-inputLabel" style={{ display: "block", }}>
                        Projects
                      </SuiTypography>
                      <SuiBox>
                        <Checkbox checked={comment_added_on_project} onChange={handleChangeCommentAddedOnProject} />
                        <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ fontSize: "1rem", }}>
                          A comment is added on a Project
                        </SuiTypography>
                      </SuiBox>
                      <SuiBox>
                        <Checkbox checked={post_made_on_project} onChange={handleChangePostMadeOnProject} />
                        <SuiTypography variant="button" fontWeight="regular" id="form-inputLabel" style={{ fontSize: "1rem", }}>
                          A post is made on a Project
                        </SuiTypography>
                      </SuiBox>
                    </SuiBox>
                  </SuiBox>
                </SuiBox>

              </SuiBox>
            </SuiBox>
          </SuiBox>
        )}
        {tabValue !== 3 &&
          <SuiBox mt={6} py={3} pl={6.5} className={classes.settings_tab_footer}>
            <SuiButton circular onClick={save}>
              Save
            </SuiButton>
          </SuiBox>
        }
      </DashboardLayout>
    </>
  );
}

export default Settings;
