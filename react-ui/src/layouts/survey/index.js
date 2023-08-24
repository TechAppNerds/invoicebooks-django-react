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
  useContext,
} from "react";

// react-routers components
import {
  Link,
  useRouteMatch,
  useHistory,
  Redirect,
} from "react-router-dom";

// @mui material components
import {
  Autocomplete,
  TextField,
  Icon,
//   Slide,
  // Alert,
//   Alert as MuiAlert,
  Select,
  MenuItem,
} from "@mui/material";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

import {
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

import styles from "layouts/survey/styles";

// Images
import backgroundImage from "assets/images/survey-background.jpg";

import { AuthContext } from "../../auth-context/auth.context";
import AuthApi from "../../api/auth";
import ActionsApi from "../../api/actions";

// import country_currency_code from "country-json/src/country-by-currency-code.json";
import country_abbreviation from "country-json/src/country-by-abbreviation";
// import countries from "country-json/src/country-by-abbreviation";
import country_to_currency from "country-to-currency";


function Survey() {
  // const classes = styles();
  const classes = styles({ image: backgroundImage, });
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const { url } = useRouteMatch();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  const userLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;

  // console.log("history in Survey = ", history);

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

  // const [countries, setCountries] = useState([]);

  // useEffect(() => {
  //   return fetch("https://trial.mobiscroll.com/content/countries.json")
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log("response from countries = ", responseJson);
  //       setCountries(responseJson);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

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

  // const countries = require('./src/country-by-currency-code.json');

  // console.log("all countries = ", countries);
  // console.log("all countries cc = ", country_currency_code);
  // console.log("all countries ab = ", country_abbreviation);

  // console.log("country_to_currency = ", country_to_currency);

  // const countryOptions = country_currency_code.map(data => data.country);

  // const countryOptions = currency_list.map((currency, index) => currency.country.trim() === );

  const countryOptions = country_abbreviation.map(data => data.country);

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


  // const baseCurrencyOptions = country_currency_code.map(data => {
  //   let currencyName = new Intl.DisplayNames(["en"], { type: "currency" });
  //   console.log("currencyName of = ", currencyName.of(data.currency_code));
  //   return (`${data.currency_code} — ${currencyName.of(data.currency_code)}`);
  // });

  // const getCurrencyName = (currency) => new Intl.DisplayNames(['en'], {type: 'currency'}).of(currency);

  const baseCurrencyOptions = currency_list.map(data => `${data.code} — ${data.name}`);

  // const baseCurrencyOptions = country_currency_code.map(data => `${data.currency_code} — ${new Intl.DisplayNames(["en"], { type: "currency" }).of(data.currency_code)}`);

  // const baseCurrencyOptions = country_currency_code.map(data => `${data.currency_code} — ${getCurrencyName(data.currency_code)}`);

  // const baseCurrencyOptions = [
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

  // const estimateRevenueOptions = [
  //   "Up to $30,000",
  //   "$31,000 to $75,000",
  //   "$76,000 to $125,000",
  //   "$126,000 to $500,000",
  //   "$501,000 or more",
  // ];

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

  const [firstName, setFirstName] = useState(user.first_name ? user.first_name.trim() : "");
  const [lastName, setLastName] = useState(user.last_name ? user.last_name.trim() : "");
  // const [lastName, setLastName] = useState(user.last_name);
  // const [country, setCountry] = useState(user.country === "" ? countryOptions[0] : user.country);


  // const [country, setCountry] = useState(user.country ? user.country : countryOptions[0]);
  // const [country, setCountry] = useState(user.country ? user.country : countries[0].country);
  // countries[countries.findIndex(data => data.country === "United States")].country;
  const [country, setCountry] = useState(user.country ? user.country.trim() : "United States");
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number ? user.phone_number.trim() : "");
  // const [businessName, setBusinessName] = useState(user.business[0] == null ? "" : user.business[0].name);
  // const [industry, setIndustry] = useState(user.business[0] == null ? "" : user.business[0].industry);
  // const [describe, setDescribe] = useState(user.business[0] == null ? "" : user.business[0].describe);
  // const [baseCurrency, setBaseCurrency] = useState(user.business[0] == null ? baseCurrencyOptions[0] : user.business[0].base_currency);
  // const [estimateRevenue, setEstimateRevenue] = useState(user.business[0] == null ? "" : user.business[0].estimated_revenue);
  // const [timeCompletedService, setTimeCompletedService] = useState(user.business[0] == null ? "" : user.business[0].time_completed_service);
  // const [customerBillingTool, setCustomerBillingTool] = useState(user.business[0] == null ? "" : user.business[0].customer_billing_tool);

  // const [industry, setIndustry] = useState(user.business.length !== 0 && user.business.industry ? user.business.industry : "");

  // const countryISOCode = country_abbreviation[country_abbreviation.findIndex(data => data.country.trim().toLowerCase() === country.trim().toLowerCase())].abbreviation;

  // const countryISOCode = (country) => country_abbreviation[country_abbreviation.findIndex(data => data.country.trim().toLowerCase() === country.trim().toLowerCase())].abbreviation;

  // console.log("countryISOCode = ", countryISOCode(country));
  
  function nonEmptyObject(obj) {
    return obj && Object.keys(obj).length !== 0 && Object.getPrototypeOf(obj) === Object.prototype;
  }

  // const getCurrencyName = (currency) => new Intl.DisplayNames(['en'], {type: 'currency'}).of(currency);

  const baseCurrencyStandard = () => {
    if (history.location.search.length !== 0) {
      let countryISOCode = country_abbreviation[country_abbreviation.findIndex(data => data.country.trim().toLowerCase() === country.trim().toLowerCase())].abbreviation;
      let currencyCode = country_to_currency[String(countryISOCode)];
      // setBaseCurrency(baseCurrencyOptions[baseCurrencyOptions.findIndex(currency => currency.code.trim() === currencyCode.trim())]);
      let currencyName = currency_list[currency_list.findIndex(currency => currency.code.trim() === currencyCode.trim())].name;
      console.log("baseCurrencyStandard inside = ", `${currencyCode} — ${currencyName}`);
      return `${currencyCode} — ${currencyName}`;
    } else return;
  };

  console.log("baseCurrencyStandard is = ", baseCurrencyStandard());

  const checkState = (obj) => nonEmptyObject(user.business) && user.business[obj] && user.business[obj].trim().length !== 0;

  const [businessName, setBusinessName] = useState(checkState("name") ? user.business.name.trim() : "");
  const [industry, setIndustry] = useState(checkState("industry") ? user.business.industry.trim() : "");
  const [describe, setDescribe] = useState(checkState("describe") ? user.business.describe.trim() : "");
  // const [baseCurrency, setBaseCurrency] = useState(nonEmptyObject(user.business) && user.business.base_currency ? user.business.base_currency.trim() : baseCurrencyOptions[0]);
  const [baseCurrency, setBaseCurrency] = useState(checkState("base_currency") ? user.business.base_currency.trim() : baseCurrencyStandard());
  const [estimateRevenue, setEstimateRevenue] = useState(checkState("estimated_revenue") ? user.business.estimated_revenue.trim() : "");
  const [timeCompletedService, setTimeCompletedService] = useState(checkState("time_completed_service") ? user.business.time_completed_service.trim() : "");
  const [customerBillingTool, setCustomerBillingTool] = useState(checkState("customer_billing_tool") ? user.business.customer_billing_tool.trim() : "");
  const [customerOfferCustomizedType, setCustomerOfferCustomizedType] = useState(checkState("customer_offer_customized_type") ? user.business.customer_offer_customized_type.trim() : undefined);
  const [error, setError] = useState(undefined);
  const [validation, setValidation] = useState({});

  console.log("country is = ", country);
  console.log("error is = ", error);
  console.log("validation is = ", validation);
  console.log("baseCurrency is = ", baseCurrency);
  // console.log("baseCurrencyOptions is = ", baseCurrencyOptions);

  // function priceFormat(price) {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: baseCurrency.split(" — ")[0],
  //   }).format(price);
  // }
  // const index = country_currency_code.map(data => data.country).findIndex(option => {
  //   return option.toLowerCase() === country.toLowerCase();
  // });

  function currencyFormat(value) {
    // return new Intl.NumberFormat(`en-${countryISOCode}`, {
    // let currencyCode = country_to_currency[String(countryISOCode(country))];
    if (history.location.search.length !== 0) {
      // let currencyName = checkState("base_currency") ? user.business.base_currency.trim() : baseCurrencyStandard
      return new Intl.NumberFormat(userLocale, {
        style: "currency",
        // currency: user.business.base_currency.split(" — ")[0],
        currency: baseCurrency.split(" — ")[0],
        // currency: currencyName.split(" — ")[0],
        // currency: currencyCode,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      }).format(value);
    } else return;
  }

  // const estimateRevenueOptions = [
  //   `Up to ${currencyFormat(30000)}`,
  //   `${currencyFormat(31000)} to ${currencyFormat(75000)}`,
  //   `${currencyFormat(76000)} to ${currencyFormat(125000)}`,
  //   `${currencyFormat(126000)} to ${currencyFormat(500000)}`,
  //   `${currencyFormat(501000)} or more`,
  // ];

  const estimateRevenueOptions = history.location.search.length !== 0 ? [
    `Up to ${currencyFormat(30000)}`,
    `${currencyFormat(31000)} to ${currencyFormat(75000)}`,
    `${currencyFormat(76000)} to ${currencyFormat(125000)}`,
    `${currencyFormat(126000)} to ${currencyFormat(500000)}`,
    `${currencyFormat(501000)} or more`,
  ] : [];

  // const estimateRevenueOptions = [
  //   "Up to $30,000",
  //   "$31,000 to $75,000",
  //   "$76,000 to $125,000",
  //   "$126,000 to $500,000",
  //   "$501,000 or more",
  // ];

  // const [estimateRevenueOptions, setEstimateRevenueOptions] = useState([
  //   `Up to ${currencyFormat(30000)}`,
  //   `${currencyFormat(31000)} to ${currencyFormat(75000)}`,
  //   `${currencyFormat(76000)} to ${currencyFormat(125000)}`,
  //   `${currencyFormat(126000)} to ${currencyFormat(500000)}`,
  //   `${currencyFormat(501000)} or more`,
  // ]);


  function getTimeZone() {
    let offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + Math.floor(o / 60) + ":" + ("00" + (o % 60)).slice(-2);
  }

  const handleLogout = () => {
    AuthApi.Logout(user);
    setUser(null);
    localStorage.removeItem("user");
    return history.push("/authentication/sign-in");
  };

  const back = () => {
    // return history.push("/survey");
    return history.push(url);
  };

  const save = async (event) => {
    setValidation({});
    setError(undefined);
    if (event) {
      event.preventDefault();
    }
    let new_validation = {};
    if (history.location.search.length === 0) {
      if (firstName === "") {
        new_validation.first_name = "Please enter a first name";
      }
      if (lastName === "") {
        new_validation.last_name = "Please enter a last name";
      }
      if (country === "") {
        new_validation.country = "Please choose a country";
      }
      if (phoneNumber === "") {
        new_validation.phone_number = "Please enter a phone number";
      }
    } else {
      if (industry === "") {
        new_validation.industry = "Please choose a industry";
      }
      if (describe === "") {
        new_validation.describe = "Please choose a describe";
      }
      // if (baseCurrency === "") {
      //   new_validation.base_currency = "Please choose a base currency";
      //   // return setError("You must choose a base currency");
      // }
      if (estimateRevenue === "") {
        new_validation.estimated_revenue = "Please choose a estimate revenue";
      }
      if (timeCompletedService === "") {
        new_validation.time_completed_service = "Please choose a time completed service";
      }
      if (customerBillingTool === "") {
        new_validation.customer_billing_tool = "Please choose a customer billing tool";
      }
      if (customerOfferCustomizedType === undefined) {
        new_validation.customer_offer_customized_type = "Please choose a customer offer customized type";
      }
    }
    setValidation(new_validation);
    if (new_validation && Object.keys(new_validation).length === 0 && Object.getPrototypeOf(new_validation) === Object.prototype) {
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

      if (history.location.search.length === 0) {
        try {
          let data = {
            first_name: firstName,
            last_name: lastName,
            country,
            phone_number: phoneNumber,
          };
          let response = await ActionsApi.ProfileSurvey({ id: user.id, token }, data);
          let current_user = {...user, ...response.data.user};
          current_user = JSON.stringify(current_user);
          setUser(current_user);
          localStorage.setItem("user", current_user);
          // return history.push("/survey?step=business");
          return history.push(`${url}?step=business`);
        } catch (err) {
          console.log(err);
          if (err.response) {
            // return setError(err.response.data.msg);
            return setError(err.response.data.detail);
          }
          return setError("There has been an error.");
        }
      } else {
        try {
          let name;
          if (businessName === "") {
            name = user.first_name + "'s Company";
          } else {
            name = businessName;
          }
          let date_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/");
          let time_zone = `(UTC${getTimeZone()}) ${date_time_zone[0]} — ${date_time_zone[1]}`;
          let business_response, data = {
            // owner_id: 99,
            // owner: user.id,
            name,
            industry,
            describe,
            base_currency: baseCurrency,
            estimated_revenue: estimateRevenue,
            time_completed_service: timeCompletedService,
            customer_billing_tool: customerBillingTool,
            customer_offer_customized_type: customerOfferCustomizedType,
            country,
            time_zone,
          };
          // if (user.business.length === 0) {
          if (user.business && Object.keys(user.business).length === 0 && Object.getPrototypeOf(user.business) === Object.prototype) {
            // data.owner = user.id;
            data.owner_id = user.id;
            business_response = await ActionsApi.CreateBusiness({ token }, data);
          } else {
            data.id = user.business.id;
            business_response = await ActionsApi.UpdateBusiness({ token }, data);
          }
          let current_user = {...user, ...business_response.data};

          let init_notification_response = await AuthApi.InitializationNotification({ business_id: current_user.business.id });
          console.log("init_notification_response response = ", init_notification_response);
          
          if (init_notification_response.status === 201 && init_notification_response.statusText === "Created") {
            current_user = {...current_user, business: {...current_user.business, ...init_notification_response.data}};
          }
          // let current_user = {...user};
          // current_user.business[0] = {...response.data.business};
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
  };

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
              {history.location.search.length === 0 ?
              (<>
                <SuiBox mb={3} style={{ display: "flex", }}>
                  <SuiBox className="w-100">
                    <SuiTypography variant="button" fontWeight="regular" customClass="required">First Name</SuiTypography>
                    <SuiInput
                      error={"first_name" in validation}
                      placeholder="First Name"
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                        setError(undefined);
                        setValidation({});
                      }}
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
                  <SuiBox ml={3} className="w-100">
                    <SuiTypography variant="button" fontWeight="regular" customClass="required">Last Name</SuiTypography>
                    <SuiInput
                      error={"last_name" in validation}
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event.target.value);
                        setError(undefined);
                        setValidation({});
                      }}
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
                  <SuiTypography variant="button" fontWeight="regular" customClass="required">Where are you located?</SuiTypography>
                  <Autocomplete
                    id="countryOptions"
                    // freeSolo
                    disableClearable
                    // value={country}
                    inputValue={country}
                    onChange={(event, newValue) => {
                      // console.log("event in countryOptions = ", event)
                      // console.log("newValue in countryOptions = ", newValue)
                      setCountry(newValue);

                      let countryISOCode = country_abbreviation[country_abbreviation.findIndex(data => data.country.trim().toLowerCase() === newValue.trim().toLowerCase())].abbreviation;
                      let currencyCode = country_to_currency[String(countryISOCode)];
                      // let currencyCode = country_to_currency[String(countryISOCode(newValue))];

                      // if (history.location.search.length !== 0) {
                      setBaseCurrency(baseCurrencyOptions[baseCurrencyOptions.findIndex(currency => currency.split(" — ")[0].toLowerCase() === currencyCode.toLowerCase())]);

                      // setBaseCurrency(baseCurrencyOptions[baseCurrencyOptions.split(" — ")[0].toLowerCase() === currencyCode.toLowerCase()]);
                      // }
                      // let countryISOCode = country_abbreviation[country_abbreviation.findIndex(data => data.country.trim().toLowerCase() === target.value.trim().toLowerCase())].abbreviation;
                      // let currencyCode = country_to_currency[String(countryISOCode)];
                      // console.log("newBaseCurrency = ", baseCurrencyOptions[baseCurrencyOptions.findIndex(currency => currency.code.trim() === currencyCode.trim())]);
                      // setBaseCurrency(baseCurrencyOptions[baseCurrencyOptions.findIndex(currency => currency.code.trim() === currencyCode.trim())]);
                      // setBaseCurrency("");
                      setEstimateRevenue("");
                      setError(undefined);
                      setValidation({});
                    }}
                    onBlur={() => {
                      const index = countryOptions.findIndex(option => {
                        return option.toLowerCase() === country.toLowerCase();
                      });
                      if (index !== -1) {
                        setCountry(countryOptions[index]);
                      } else {
                        setCountry("");
                      }
                    }}
                    options={countryOptions}
                    noOptionsText="No results found"
                    renderInput={(params) => 
                      <TextField {...params}
                        error={"country" in validation}
                        placeholder="Country"
                        onChange={({ target }) => {
                          console.log("onChange of countryOptions = ", target);
                          // console.log("value onChange of countryOptions = ", target.value);
                          setCountry(target.value);
                          // let countryISOCode = country_abbreviation[country_abbreviation.findIndex(data => data.country.trim().toLowerCase() === target.value.trim().toLowerCase())].abbreviation;
                          // let currencyCode = country_to_currency[String(countryISOCode)];
                          // console.log("newBaseCurrency = ", baseCurrencyOptions[baseCurrencyOptions.findIndex(currency => currency.code.trim() === currencyCode.trim())]);
                          // setBaseCurrency(baseCurrencyOptions[baseCurrencyOptions.findIndex(currency => currency.code.trim() === currencyCode.trim())]);
                          setEstimateRevenue("");
                          setError(undefined);
                          setValidation({});
                        }}
                        {...("country" in validation && {
                          sx: {
                            "& .MuiInputBase-root.Mui-error": {
                              borderColor: "#fd5c70 !important",
                              backgroundSize: "1rem 1rem",
                              backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23fd5c70' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23fd5c70' stroke='none'/%3E%3C/svg%3E\")",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 0.75rem center",

                              "& .MuiAutocomplete-endAdornment": {
                                display: "none",
                              },
                            },
                          }
                        })}
                      />
                      // <SuiInput {...params}
                      //   error={"country" in validation}
                      //   placeholder="Country"
                      //   onChange={({ target }) => {
                      //     setCountry(target.value);
                      //     setError(undefined);
                      //     setValidation({});
                      //   }}
                      // />
                    }
                  />
                  {"country" in validation &&
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      textColor="error"
                      style={{ fontSize: 13, }}
                    >
                      {validation.country}
                    </SuiTypography>
                  }
                </SuiBox>
                {/* <SuiBox mb={3} className="required"> */}
                <SuiBox mb={3}>
                  <SuiTypography variant="button" fontWeight="regular" customClass="required">Phone Number</SuiTypography>
                  <SuiInput
                    error={"phone_number" in validation}
                    placeholder="(123) 456-7890"
                    value={phoneNumber}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                      setError(undefined);
                      setValidation({});
                    }}
                  />
                  {"phone_number" in validation &&
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      textColor="error"
                      style={{ fontSize: 13, }}
                    >
                      {validation.phone_number}
                    </SuiTypography>
                  }
                </SuiBox>

                {/* <SuiBox mt={2} mb={2} textAlign="center">
                  <h6
                    style={{
                      // fontSize: ".8em",
                      fontSize: 14,
                      color: "red",
                      textAlign: "center",
                      fontWeight: 400,
                      transition: ".2s all",
                    }}
                  >
                    {error}
                  </h6>
                </SuiBox> */}

                <SuiBox mt={4} className={classes.survey_steps_progress}>
                  <SuiButton customClass="survey-next" buttonColor="success" onClick={save}>
                    Next
                  </SuiButton>
                </SuiBox>
              </>) : 
              (<>
                <SuiBox mb={3}>
                  <SuiTypography variant="button" fontWeight="regular">
                    What&apos;s your company&apos;s name?
                  </SuiTypography>
                  <SuiInput
                    value={businessName}
                    onChange={(event) => {
                      setBusinessName(event.target.value);
                      setError(undefined);
                      setValidation({});
                    }}
                  />
                </SuiBox>
                <SuiBox mb={3} className="required">
                  <SuiTypography variant="button" fontWeight="regular" customClass="required">
                    What does your business do?
                  </SuiTypography>
                  <Select
                    value={industry}
                    renderValue={industry !== "" ? undefined : () => "Choose industry"}
                    onChange={(event) => {setIndustry(event.target.value);setError(undefined);setValidation({});}}
                    displayEmpty
                    sx={{
                      p: "0 !important",
                      ...("industry" in validation && {
                        borderColor: "#fd5c70 !important",
                        backgroundSize: "1rem 1rem",
                        backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23fd5c70' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23fd5c70' stroke='none'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",

                        "& .MuiSvgIcon-root.MuiSelect-icon": {
                          display: "none !important",
                        },
                      })
                    }}
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
                  {"industry" in validation &&
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      textColor="error"
                      style={{ fontSize: 13, }}
                    >
                      {validation.industry}
                    </SuiTypography>
                  }
                </SuiBox>
                <SuiBox mb={3} className="required">
                  <SuiTypography variant="button" fontWeight="regular" customClass="required">
                    How would you describe your business?
                  </SuiTypography>
                  <Select
                    value={describe}
                    renderValue={describe !== "" ? undefined : () => "Choose an option"}
                    onChange={(event) => {setDescribe(event.target.value);setError(undefined);setValidation({});}}
                    displayEmpty
                    sx={{
                      p: "0 !important",
                      ...("describe" in validation && {
                        borderColor: "#fd5c70 !important",
                        backgroundSize: "1rem 1rem",
                        backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23fd5c70' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23fd5c70' stroke='none'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",

                        "& .MuiSvgIcon-root.MuiSelect-icon": {
                          display: "none !important",
                        },
                      })
                    }}
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
                  {"describe" in validation &&
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      textColor="error"
                      style={{ fontSize: 13, }}
                    >
                      {validation.describe}
                    </SuiTypography>
                  }
                </SuiBox>
                <SuiBox mb={3} className="required">
                  <SuiTypography variant="button" fontWeight="regular" customClass="required">
                    What&apos;s your estimated revenue this year?
                  </SuiTypography>
                  <SuiBox mb={3} style={{ display: "flex", }}>
                    <SuiBox className="w-100">
                      <Select
                        value={baseCurrency}
                        onChange={(event) => {setBaseCurrency(event.target.value);setEstimateRevenue("");setError(undefined);setValidation({});}}
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
                        // renderValue={estimateRevenue !== "" ? undefined : () => "Choose estimated revenue"}
                        renderValue={estimateRevenue !== "" ? undefined : () => "Choose estimated revenue"}
                        onChange={(event) => {
                          setEstimateRevenue(event.target.value);
                          setError(undefined);
                          setValidation({});

                          // setEstimateRevenueOptions([
                          //   `Up to ${currencyFormat(30000)}`,
                          //   `${currencyFormat(31000)} to ${currencyFormat(75000)}`,
                          //   `${currencyFormat(76000)} to ${currencyFormat(125000)}`,
                          //   `${currencyFormat(126000)} to ${currencyFormat(500000)}`,
                          //   `${currencyFormat(501000)} or more`,
                          // ]);
                        }}
                        displayEmpty
                        sx={{
                          p: "0 !important",
                          ...("estimated_revenue" in validation && {
                            borderColor: "#fd5c70 !important",
                            backgroundSize: "1rem 1rem",
                            backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23fd5c70' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23fd5c70' stroke='none'/%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.75rem center",
    
                            "& .MuiSvgIcon-root.MuiSelect-icon": {
                              display: "none !important",
                            },
                          })
                        }}
                        MenuProps={{
                          classes: {
                            paper: classes.menu_select_form,
                          },
                        }}
                        IconComponent={(props) => (<ExpandMoreIcon {...props}/>)}
                      >
                        {
                          // const estimateRevenueOptions = [
                          //   "Up to $30,000",
                          //   "$31,000 to $75,000",
                          //   "$76,000 to $125,000",
                          //   "$126,000 to $500,000",
                          //   "$501,000 or more",
                          // ];
                        }
                        {estimateRevenueOptions.map((element, index) => (
                          <MenuItem key={`${index} — ${element}`} value={element}>{element}</MenuItem>
                        ))}
                      </Select>
                      {"estimated_revenue" in validation &&
                        <SuiTypography
                          variant="button"
                          fontWeight="regular"
                          textColor="error"
                          style={{ fontSize: 13, }}
                        >
                          {validation.estimated_revenue}
                        </SuiTypography>
                      }
                    </SuiBox>
                  </SuiBox>
                </SuiBox>
                <SuiBox mb={3} className="required">
                  <SuiTypography variant="button" fontWeight="regular" customClass="required">
                    How long does it take to complete your services?
                  </SuiTypography>
                  <Select
                    value={timeCompletedService}
                    renderValue={timeCompletedService !== "" ? undefined : () => "Choose an option"}
                    onChange={(event) => {setTimeCompletedService(event.target.value);setError(undefined);setValidation({});}}
                    displayEmpty
                    sx={{
                      p: "0 !important",
                      ...("time_completed_service" in validation && {
                        borderColor: "#fd5c70 !important",
                        backgroundSize: "1rem 1rem",
                        backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23fd5c70' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23fd5c70' stroke='none'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",

                        "& .MuiSvgIcon-root.MuiSelect-icon": {
                          display: "none !important",
                        },
                      })
                    }}
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
                  {"time_completed_service" in validation &&
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      textColor="error"
                      style={{ fontSize: 13, }}
                    >
                      {validation.time_completed_service}
                    </SuiTypography>
                  }
                </SuiBox>
                <SuiBox mb={3} className="required">
                  <SuiTypography variant="button" fontWeight="regular" customClass="required">
                    What do you currently use to bill your customers?
                  </SuiTypography>
                  <Select
                    value={customerBillingTool}
                    renderValue={customerBillingTool !== "" ? undefined : () => "Choose an option"}
                    onChange={(event) => {setCustomerBillingTool(event.target.value);setError(undefined);setValidation({});}}
                    displayEmpty
                    sx={{
                      p: "0 !important",
                      ...("customer_billing_tool" in validation && {
                        borderColor: "#fd5c70 !important",
                        backgroundSize: "1rem 1rem",
                        backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23fd5c70' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23fd5c70' stroke='none'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",

                        "& .MuiSvgIcon-root.MuiSelect-icon": {
                          display: "none !important",
                        },
                      })
                    }}
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
                  {"customer_billing_tool" in validation &&
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      textColor="error"
                      style={{ fontSize: 13, }}
                    >
                      {validation.customer_billing_tool}
                    </SuiTypography>
                  }
                </SuiBox>
                <SuiBox mb={3} className="required">
                  <SuiTypography variant="button" fontWeight="regular" customClass="required">
                    How customized is your offering for customers?
                  </SuiTypography>
                  <SuiBox style={{ display: "flex", }}>
                    {customerOfferCustomizedTypeOptions.map((element, index) => (
                      <SuiBox key={`${index} — ${element}`} {...index === 1 && {ml: 1.5,}} className="w-100">
                        <SuiButton fullWidth onClick={() => {setCustomerOfferCustomizedType(element); setError(undefined);setValidation({});}}
                          sx={{
                            ...("customer_offer_customized_type" in validation && {
                              borderColor: "#fd5c70 !important",
                            })
                          }}
                          customClass={customerOfferCustomizedType === element ? "selected" : ""}>
                            {element}
                        </SuiButton>
                      </SuiBox>
                    ))}
                  </SuiBox>
                  {"customer_offer_customized_type" in validation &&
                    <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      textColor="error"
                      style={{ fontSize: 13, }}
                    >
                      {validation.customer_offer_customized_type}
                    </SuiTypography>
                  }
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
                    {/* {error} */}
                    {
                      // validation && Object.keys(validation).length === 0
                      // && Object.getPrototypeOf(validation) === Object.prototype 
                      nonEmptyObject(error) && error
                    }
                  </h6>
                </SuiBox>

                <SuiBox mt={4} className={classes.survey_steps_progress}>
                  <SuiButton customClass="survey-back" onClick={back}>
                    Back
                  </SuiButton>
                  <SuiButton customClass="survey-next" buttonColor="info" onClick={save}>
                    Save and Finish
                  </SuiButton>
                </SuiBox>
              </>)}
            </SuiBox>
          </SuiBox>
        </SuiBox>
      </SuiBox>
      <SuiBox className="survey-steps-nav">
        <SuiBox className="survey-steps-list-wrapper">
          <Timeline className="survey-steps-list">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot>{history.location.search.length === 0 ? "1" : "✔"}</TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Enter your profile information</TimelineContent>
            </TimelineItem>

            <TimelineItem className={history.location.search.length !== 0 ? "active" : ""}>
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

export default Survey;
