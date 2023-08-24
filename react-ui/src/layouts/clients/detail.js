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
  Fragment,
  forwardRef,
  useContext,
} from "react";

// react-routers components
// import { Link } from "react-router-dom";
// import { useLocation, useHistory  } from "react-router-dom";
// import { Link, useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useParams, useRouteMatch } from "react-router-dom";
// import { Link, useHistory, useParams, useRouteMatch, NavLink } from "react-router-dom";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ReactApexChart from 'react-apexcharts';

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import {
  Grid,
  Tabs,
  Tab,
  Avatar,
  Icon,
//   Card,
  Typography,
  Box,
//   Chip,
  Divider,
  OutlinedInput,
  TextField,
  InputAdornment,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Toolbar,
  FormControlLabel,
  IconButton,
  Button,
  Snackbar,
  Slide,
  // Alert,
  Alert as MuiAlert,
  Select,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  // ToggleButton,
  // Tooltip,
  TableContainer,
  TablePagination,
} from "@mui/material";

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// import { alpha } from '@mui/material/styles';
import { alpha, styled } from '@mui/material/styles';

import {
  Add as AddIcon,
  Delete as DeleteIcon,
//   FilterList as FilterListIcon
  Create as CreateIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  Archive as ArchiveIcon,
  FileCopy as FileCopyIcon,
  MoreHoriz as MoreHorizIcon,
  // KeyboardArrowDown as KeyboardArrowDownIcon
  Print as PrintIcon,
  Email as EmailIcon,
  Send as SendIcon,
  AttachMoney as AttachMoneyIcon,
  Download as DownloadIcon,
  // AddCircle as AddCircleIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  LocalPizza as LocalPizzaIcon,
  // Person as PersonIcon,
  HistoryEdu as HistoryEduIcon,
  CheckCircle as CheckCircleIcon,
  TimerOutlined as TimerOutlinedIcon,
  Link as LinkIcon
} from "@mui/icons-material";

import { FaRegUser, FaUserTie } from "react-icons/fa";
import { AiOutlineFundProjectionScreen, AiOutlineFileSearch, AiOutlineFileSync } from "react-icons/ai";
import { TbReceiptTax } from "react-icons/tb";
import { BsCoin } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
// import { GrUserWorker } from "react-icons/gr";
import { FcMoneyTransfer } from "react-icons/fc";
import { ImCalendar } from "react-icons/im";

import { visuallyHidden } from '@mui/utils';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
// import SuiButton from "components/SuiButton";
// import SuiInput from "components/SuiInput";

// Soft UI Dashboard React example components
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";

// ClientsDetails page components
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


// const classes = styles();
// const allClientData = [
//   {
//     id: 1,
//     firstName: "client",
//     lastName: "- 1",
//     company: "client -1",
//     email: "cminone@gmail.com",
//     phone: "08539731758",
//     note: "this is my relationship note",
//     credit: 0,
//     total: 0,
//   },
//   {
//     id: 2,
//     firstName: "client",
//     lastName: "1",
//     company: "clients's companies",
//     email: "email@gmail.com",
//     phone: "0312738065",
//     mobilePhone: "08132624682",
//     businessPhone: "08508639201",
//     firstStreet: "street 1",
//     secondStreet: "street 2",
//     city: "city",
//     state: "state",
//     zipCode: "zip_code",
//     country: "country",
//     note: "my internal note",
//     credit: 0,
//     total: 0,
//   },
// ];
// const client = allClientData.find(data => data.id == client_id);
// const [tabValue, setTabValue] = useState(0);
// console.log("tabValue is  = ", tabValue);
// console.log("openMore is  = ", openMore);


// var clientContactData = [
//   {
//     id: 1,
//     firstName: "first_name",
//     lastName: "last name",
//     email: "email1@gmail.com",
//     firstPhone: "phone 4",
//     secondPhone: "phone 2",
//   },
//   {
//     id: 2,
//     firstName: "",
//     lastName: "",
//     email: "email2@gmail.com",
//     firstPhone: "phone 1",
//     secondPhone: "phone 5",
//   },
// ];

// var clientInvoiceData = {
//   invoices: [
//     {
//       id: 1,
//       get invoiceNumber() {
//         return String(this.id).padStart(7, "0");
//       },
//       clientId: 2,
//       descriptions: [
//         {
//           name: "item 11",
//           description: "description of item 4",
//           rate: 12,
//           taxesId: [1, 2, 3],
//           quantity: 3,
//           get lineTotal() {
//             return this.rate * this.quantity;
//           },
//         },
//         {
//           name: "item 11",
//           description: "description of item 4",
//           rate: 8.43,
//           taxesId: [2],
//           quantity: 2,
//           get lineTotal() {
//             return this.rate * this.quantity;
//           },
//         },
//       ],
//       issuedDate: "09/02/2022",
//       dueDate: "02/02/2023",
//       amountDue: "52.86",
//       status: "Draft",
//     },
//     {
//       id: 2,
//       get invoiceNumber() {
//         return String(this.id).padStart(7, "0");
//       },
//       clientId: 1,
//       descriptions: [
//         {
//           name: "item -0",
//           description: "description of item 1",
//           rate: 11.75,
//           taxesId: [1],
//           quantity: 1,
//           get lineTotal() {
//             return this.rate * this.quantity;
//           },
//         },
//       ],
//       issuedDate: "08/26/2022",
//       dueDate: "09/01/2022",
//       amountDue: "11.75",
//       status: "Sent",
//     },
//   ],
//   taxes: [
//     {
//       id: 1,
//       rate: "0.3",
//       name: "tax -0",
//       number: "",
//     },
//     {
//       id: 2,
//       rate: "1.5",
//       name: "tax 9",
//       number: "12",
//     },
//     {
//       id: 3,
//       rate: "4.0",
//       name: "taxx 1",
//       number: "1.09",
//     },
//   ],
// };

// var clientRecurringTemplateData = [
//   {
//     id: 1,
//     clientId: 2,
//     invoiceId: 1,
//     frequency: "Every Month",
//     duration: "Infinite",
//     // amountDue: 52.86,
//     amountDue: "28.12",
//     status: "Auto-Sent",
//   },
//   {
//     id: 2,
//     clientId: 1,
//     invoiceId: 2,
//     frequency: "Every Month",
//     duration: "Infinite",
//     amountDue: "0.00",
//     status: "Auto-Sent",
//   },
// ];

// var clientRetainerData = [
//   {
//     id: 1,
//     clientId: 2,
//     retainerId: "00000007793",
//     nextInvoice: "08/26/2022",
//     remaining: "Infinite",
//     fee: "1.35",
//     period: "Per Month",
//     totalRevenue: "1.35",
//     status: "Active",
//   },
// ];

// var clientCreditsData = [
//   {
//     id: 1,
//     type: "Prepayment",
//     // creditNumber: "0000001",
//     get creditNumber() {
//       return String(this.id).padStart(7, "0");
//     },
//     issuedDate: "08/26/2022",
//     descriptions: [
//       {
//         name: "item -0",
//         description: "description of item 1",
//         rate: 11.75,
//         taxesId: [1],
//         quantity: 1,
//         get lineTotal() {
//           return this.rate * this.quantity;
//         },
//       },
//     ],
//     amountDue: "11.75",
//     status: "Created",
//   },
//   {
//     id: 2,
//     type: "Credit Note",
//     get creditNumber() {
//       return String(this.id).padStart(7, "0");
//     },
//     issuedDate: "09/02/2022",
//     descriptions: [
//       {
//         name: "item 11",
//         description: "description of item 4",
//         rate: 12,
//         taxesId: [1, 2, 3],
//         quantity: 3,
//         get lineTotal() {
//           return this.rate * this.quantity;
//         },
//       },
//       {
//         name: "item 11",
//         description: "description of item 4",
//         rate: 8.43,
//         taxesId: [2],
//         quantity: 2,
//         get lineTotal() {
//           return this.rate * this.quantity;
//         },
//       },
//     ],
//     amountDue: "52.86",
//     status: "Created",
//   },
// ];

// var clientExpensesData = [
//   {
//     id: 1,
//     merchant: "merchant 1",
//     category: "Advertising",
//     date: "08/26/2022",
//     description: "description one",
//     amountDue: "11.75",
//     totalTax: "1.86",
//   },
//   {
//     id: 2,
//     merchant: "the merchant",
//     category: "Hardware",
//     date: "09/02/2022",
//     description: "lorem ipsum dulur sit amet",
//     amountDue: "52.86",
//     totalTax: "0.00",
//   },
// ];

// var clientEstimatesProposalsData = [
//   {
//     id: 1,
//     clientId: 2,
//     get estimatesProposalsNumber() {
//       return String(this.id).padStart(7, "0");
//     },
//     descriptions: [
//       {
//         name: "item 11",
//         description: "description of item 4",
//         rate: 12,
//         taxesId: [1, 2, 3],
//         quantity: 3,
//         get lineTotal() {
//           return this.rate * this.quantity;
//         },
//       },
//       {
//         name: "item 11",
//         description: "description of item 4",
//         rate: 8.43,
//         taxesId: [2],
//         quantity: 2,
//         get lineTotal() {
//           return this.rate * this.quantity;
//         },
//       },
//     ],
//     date: "08/26/2022",
//     amountDue: "52.86",
//     status: "Draft",
//   },
//   {
//     id: 2,
//     clientId: 1,
//     get estimatesProposalsNumber() {
//       return String(this.id).padStart(7, "0");
//     },
//     descriptions: [
//       {
//         name: "item -0",
//         description: "description of item 1",
//         rate: 11.75,
//         taxesId: [1],
//         quantity: 1,
//         get lineTotal() {
//           return this.rate * this.quantity;
//         },
//       },
//     ],
//     date: "09/02/2022",
//     amountDue: "11.75",
//     status: "Draft",
//   },
// ];

// var clientTimeEntriesData = [
//   {
//     id: 1,
//     clientId: 2,
//     projectId: 1,
//     dateTime: "08/26/2022 at 12:00pm",
//     service: "service 1",
//     note: "system development",
//     time: "0h 15m",
//     status: "Non-Billable",
//   },
//   {
//     id: 2,
//     clientId: 2,
//     projectId: 2,
//     dateTime: "09/04/2022 at 3:11am",
//     service: "service 2",
//     note: "maintenance software",
//     time: "1h 45m",
//     status: "Unbilled",
//   },
// ];

// var clientProjectsData = [
//   {
//     id: 1,
//     name: "flat rate project",
//     clientId: 2,
//     timeEntriesId: 1,
//     dueDate: "Sep 10, 2022",
//   },
//   {
//     id: 2,
//     name: "hourly project",
//     clientId: 2,
//     timeEntriesId: 2,
//     dueDate: "Dec 19, 2023",
//   },
// ];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <SuiBox pt={2.5} pb={6}>
          {children}
        </SuiBox>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const StyledTabs = styled((props) => (
//   <Tabs
//     {...props}
//     TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
//   />
// ))({
//   // "& .MuiTabs-flexContainer": {
//   //   width: "max-content",
//   //   "& .MuiButtonBase-root": {
//   //     borderRadius: "5px 5px 0 0",
//   //     minWidth: "100px !important",
//   //     padding: "10px 24px",
//   //     color: "#0063c1 !important",
//   //     borderBottom: "1px solid #cdd4d9",
//   //     margin: 0,
//   //     "&. Mui-selected": {

//   //     }
//   //   }
//   // },
//   // '& .MuiTabs-indicator': {
//   //   display: 'flex',
//   //   justifyContent: 'center',
//   //   backgroundColor: 'transparent',
//   // },
//   // '& .MuiTabs-indicatorSpan': {
//   //   // maxWidth: 40,
//   //   width: '100%',
//   //   backgroundColor: '#635ee7',
//   //   // backgroundColor: 'black',
//   // },
// });

// const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
//   // ({ theme }) => ({
//   //   textTransform: 'none',
//   //   fontWeight: theme.typography.fontWeightRegular,
//   //   fontSize: theme.typography.pxToRem(15),
//   //   marginRight: theme.spacing(1),
//   //   color: 'rgba(255, 255, 255, 0.7)',
//   //   '&.Mui-selected': {
//   //     color: '#fff',
//   //   },
//   //   '&.Mui-focusVisible': {
//   //     backgroundColor: 'rgba(100, 95, 228, 0.32)',
//   //   },
//   // }),
// );

function descendingComparator(a, b, orderBy) {
  // console.log("a in descendingComparator = ", a);
  // console.log("b in descendingComparator = ", b);
  // console.log("orderBy in descendingComparator = ", orderBy);
  // console.log("a[orderBy] in descendingComparator = ", a[orderBy]);
  // console.log("b[orderBy] in descendingComparator = ", b[orderBy]);
  if (orderBy.length === 0) {
    return 0;
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// const clientContactDataHeadCells = [
//   {
//     id: 'firstName',
//     label: 'Name',
//   },
//   {
//     id: 'email',
//     label: 'Email',
//   },
//   {
//     id: 'phone',
//     label: 'Phone Number 1/Phone Number 2',
//   },
// ];

// const clientContactDataHeadCells = [
//   {
//     id: 'firstName',
//     numeric: false,
//     label: 'Name',
//   },
//   {
//     id: 'email',
//     numeric: false,
//     label: 'Email',
//   },
//   {
//     id: 'phone',
//     numeric: true,
//     label: 'Phone Number 1/Phone Number 2',
//   },
// ];

function EnhancedTableHead(props) {
  const {
    typeTable,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    // isDimmed
  } = props;
  const createSortHandler = (property) => (event) => {
    console.log("event createSortHandler in EnhancedTableHead = ", event)
    console.log("property createSortHandler in EnhancedTableHead = ", property)
    onRequestSort(event, property);
  };
  const customClass = styles();
  const dataHeadCells = typeTable === 0 ? [
    {
      id: 'firstName',
      label: 'Name',
    },
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'phone',
      label: 'Phone Number 1/Phone Number 2',
    },
  ] : typeTable === 1 ? [
    {
      id: 'clientCompany',
      // id: 'company',
      label: 'Client',
    },
    {
      id: 'invoiceNumber',
      label: 'Invoice Number',
    },
    {
      id: 'description',
      label: 'Description',
    },
    {
      id: 'issuedDate',
      label: 'Issued Date',
    },
    {
      id: 'dueDate',
      label: 'Due Date',
    },
    {
      id: 'amountDue',
      label: 'Amount',
    },
    {
      id: 'status',
      label: 'Status',
    },
  ] : typeTable === 2 ? [
    {
      id: 'clientCompany',
      label: 'Client',
    },
    {
      id: 'lastIssued',
      label: 'Last Issued',
    },
    {
      id: 'frequency',
      label: 'Frequency',
    },
    {
      id: 'duration',
      label: 'Duration',
    },
    {
      id: 'amountDue',
      label: 'Amount',
    },
    {
      id: 'status',
      label: 'Status',
    },
  ] : typeTable === 3 ? [
    {
      id: 'clientCompany',
      label: 'Client',
    },
    {
      id: 'nextInvoice',
      label: 'Next Invoice',
    },
    {
      id: 'remaining',
      label: 'Remaining',
    },
    {
      id: 'fee',
      label: 'Fee',
    },
    {
      id: 'period',
      label: 'Period',
    },
    {
      id: 'totalRevenue',
      label: 'Total Revenue',
    },
    {
      id: 'status',
      label: 'Status',
    },
  ] : typeTable === 4 ? [
    {
      id: 'type',
      label: 'Type',
    },
    {
      id: 'creditNumber',
      label: 'Credit Number',
    },
    {
      id: 'issuedDate',
      label: 'Issued Date',
    },
    {
      id: 'description',
      label: 'Description',
    },
    {
      id: 'amountDue',
      label: 'Amount',
    },
    {
      id: 'status',
      label: 'Status',
    },
  ] : typeTable === 6 ? [
    {
      id: 'merchant',
      label: 'Merchant',
    },
    {
      id: 'category',
      label: 'Category',
    },
    {
      id: 'date',
      label: 'Date',
    },
    {
      id: 'source',
      label: 'Source',
    },
    {
      id: 'client',
      label: 'Client',
    },
    {
      id: 'project',
      label: 'Project',
    },
    {
      id: 'description',
      label: 'Description',
    },
    {
      id: 'amountDue',
      label: 'Amount',
    },
    {
      id: 'totalTax',
      label: 'Tax',
    },
    {
      id: 'status',
      label: 'Status',
    },
  ] : typeTable === 7 ? [
    {
      id: 'clientCompany',
      label: 'Client',
    },
    {
      id: 'estimatesProposalsNumber',
      label: 'Number',
    },
    {
      id: 'description',
      label: 'Description',
    },
    {
      id: 'date',
      label: 'Date',
    },
    {
      id: 'amountDue',
      label: 'Amount',
    },
    {
      id: 'status',
      label: 'Status',
    },
  ] : typeTable === 8 ? [
    {
      id: 'dateTime',
      label: 'Date',
    },
    {
      id: 'project',
      label: 'Project',
    },
    {
      id: 'service',
      label: 'Service',
    },
    {
      id: 'note',
      label: 'Note',
    },
    {
      id: 'time',
      label: 'Time',
    },
    {
      id: 'status',
      label: 'Status',
    },
  ] : [
    {
      id: 'name',
      label: 'Project Name',
    },
    // {
    //   id: 'hours',
    //   label: 'Hours Logged',
    // },
    {
      id: 'dueDate',
      label: 'Due Date',
    },
  ];

  return (
    <TableHead
      className={customClass.enhancedTable_head}
      // style={ isDimmed ? { pointerEvents: "none", cursor: "default", opacity: .4, } : {} }
    >
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all contacts',
            }}
          />
        </TableCell>
        {typeTable === 0 ? dataHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === "phone" ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === "phone" ? (headCell.label)
            : (<TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
          )) : typeTable === 1 ? (
            <>
            <TableCell
              // key="client"
              // align="left"
              sortDirection={orderBy === "clientCompany" || orderBy === "invoiceNumber" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "clientCompany"}
                direction={orderBy === "clientCompany" ? order : 'asc'}
                onClick={createSortHandler("clientCompany")}
              >
                Client
                {orderBy === "clientCompany" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>/
              <TableSortLabel
                active={orderBy === "invoiceNumber"}
                direction={orderBy === "invoiceNumber" ? order : 'asc'}
                onClick={createSortHandler("invoiceNumber")}
              >
                Invoice Number
                {orderBy === "invoiceNumber" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell
              // key="description"
              // align="left"
              // sortDirection={orderBy === "description" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "description"}
                direction={orderBy === "description" ? order : 'asc'}
                onClick={createSortHandler("description")}
              >
                Description
                {orderBy === "description" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell
              // key="client"
              // align="left"
              // sortDirection={orderBy === "client" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "issuedDate"}
                direction={orderBy === "issuedDate" ? order : 'asc'}
                onClick={createSortHandler("issuedDate")}
              >
                Issued Date
                {orderBy === "issuedDate" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>/
              <TableSortLabel
                active={orderBy === "dueDate"}
                direction={orderBy === "dueDate" ? order : 'asc'}
                onClick={createSortHandler("dueDate")}
              >
                Due Date
                {orderBy === "dueDate" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell
              // key="client"
              // align="left"
              // align="right"
              // sortDirection={orderBy === "client" ? order : false}
              // style={{ textAlign: "right", }}
            >
              <TableSortLabel
                active={orderBy === "amountDue"}
                direction={orderBy === "amountDue" ? order : 'asc'}
                onClick={createSortHandler("amountDue")}
              >
                Amount
                {orderBy === "amountDue" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>/
              <TableSortLabel
                active={orderBy === "status"}
                direction={orderBy === "status" ? order : 'asc'}
                onClick={createSortHandler("status")}
              >
                Status
                {orderBy === "status" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            </>
            ) : typeTable === 2 ? (
              <>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "clientCompany"}
                  direction={orderBy === "clientCompany" ? order : 'asc'}
                  onClick={createSortHandler("clientCompany")}
                >
                  Client
                {orderBy === "clientCompany" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "lastIssued"}
                direction={orderBy === "lastIssued" ? order : 'asc'}
                onClick={createSortHandler("lastIssued")}
              >
                Last Issued
                {orderBy === "lastIssued" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell
              // key="client"
              // align="left"
              // sortDirection={orderBy === "client" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "frequency"}
                direction={orderBy === "frequency" ? order : 'asc'}
                onClick={createSortHandler("frequency")}
              >
                Frequency
                {orderBy === "frequency" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>/
              <TableSortLabel
                active={orderBy === "duration"}
                direction={orderBy === "duration" ? order : 'asc'}
                onClick={createSortHandler("duration")}
              >
                Duration
                {orderBy === "duration" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            <TableCell
              // key="client"
              // align="left"
              // sortDirection={orderBy === "client" ? order : false}
            >
              <TableSortLabel
                active={orderBy === "amountDue"}
                direction={orderBy === "amountDue" ? order : 'asc'}
                onClick={createSortHandler("amountDue")}
              >
                Amount
                {orderBy === "amountDue" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>/
              <TableSortLabel
                active={orderBy === "status"}
                direction={orderBy === "status" ? order : 'asc'}
                onClick={createSortHandler("status")}
              >
                Status
                {orderBy === "status" ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            </>
            ) : typeTable === 3 ? (
              <>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "clientCompany"}
                    direction={orderBy === "clientCompany" ? order : 'asc'}
                    onClick={createSortHandler("clientCompany")}
                  >
                    Client
                    {orderBy === "clientCompany" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "nextInvoice"}
                    direction={orderBy === "nextInvoice" ? order : 'asc'}
                    onClick={createSortHandler("nextInvoice")}
                  >
                    Next Invoice
                    {orderBy === "nextInvoice" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/
                  <TableSortLabel
                    active={orderBy === "remaining"}
                    direction={orderBy === "remaining" ? order : 'asc'}
                    onClick={createSortHandler("remaining")}
                  >
                    Remaining
                    {orderBy === "remaining" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "fee"}
                    direction={orderBy === "fee" ? order : 'asc'}
                    onClick={createSortHandler("fee")}
                  >
                    Fee
                    {orderBy === "fee" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/
                  <TableSortLabel
                    active={orderBy === "period"}
                    direction={orderBy === "period" ? order : 'asc'}
                    onClick={createSortHandler("period")}
                  >
                    Period
                    {orderBy === "period" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "totalRevenue"}
                    direction={orderBy === "totalRevenue" ? order : 'asc'}
                    onClick={createSortHandler("totalRevenue")}
                  >
                    Total Revenue
                    {orderBy === "totalRevenue" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : 'asc'}
                    onClick={createSortHandler("status")}
                  >
                    Status
                    {orderBy === "status" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              </>
            ) : typeTable === 4 ? (
              <>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "type"}
                    direction={orderBy === "type" ? order : 'asc'}
                    onClick={createSortHandler("type")}
                  >
                    Type
                    {orderBy === "type" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/
                  <TableSortLabel
                    active={orderBy === "creditNumber"}
                    direction={orderBy === "creditNumber" ? order : 'asc'}
                    onClick={createSortHandler("creditNumber")}
                  >
                    Credit Number
                    {orderBy === "creditNumber" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "issuedDate"}
                    direction={orderBy === "issuedDate" ? order : 'asc'}
                    onClick={createSortHandler("issuedDate")}
                  >
                    Issued Date
                    {orderBy === "issuedDate" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "description"}
                    direction={orderBy === "description" ? order : 'asc'}
                    onClick={createSortHandler("description")}
                  >
                    Description
                    {orderBy === "description" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "amountDue"}
                    direction={orderBy === "amountDue" ? order : 'asc'}
                    onClick={createSortHandler("amountDue")}
                  >
                    Amount
                    {orderBy === "amountDue" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : 'asc'}
                    onClick={createSortHandler("status")}
                  >
                    Status
                    {orderBy === "status" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              </>
            ) : typeTable === 6 ? (
              <>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "merchant"}
                    direction={orderBy === "merchant" ? order : 'asc'}
                    onClick={createSortHandler("merchant")}
                  >
                    Merchant
                    {orderBy === "merchant" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/
                  <TableSortLabel
                    active={orderBy === "category"}
                    direction={orderBy === "category" ? order : 'asc'}
                    onClick={createSortHandler("category")}
                  >
                    Category
                    {orderBy === "category" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "client"}
                    direction={orderBy === "client" ? order : 'asc'}
                    onClick={createSortHandler("client")}
                  >
                    Client
                    {orderBy === "client" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/Source
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "date"}
                    direction={orderBy === "date" ? order : 'asc'}
                    onClick={createSortHandler("date")}
                  >
                    Date
                    {orderBy === "date" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/Project/Description
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "amountDue"}
                    direction={orderBy === "amountDue" ? order : 'asc'}
                    onClick={createSortHandler("amountDue")}
                  >
                    Amount
                    {orderBy === "amountDue" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/Tax/Status
                </TableCell>
              </>
            ) : typeTable === 7 ? (
              <>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "clientCompany"}
                    direction={orderBy === "clientCompany" ? order : 'asc'}
                    onClick={createSortHandler("clientCompany")}
                  >
                    Client
                    {orderBy === "clientCompany" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/
                  <TableSortLabel
                    active={orderBy === "estimatesProposalsNumber"}
                    direction={orderBy === "estimatesProposalsNumber" ? order : 'asc'}
                    onClick={createSortHandler("estimatesProposalsNumber")}
                  >
                    Number
                    {orderBy === "estimatesProposalsNumber" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "description"}
                    direction={orderBy === "description" ? order : 'asc'}
                    onClick={createSortHandler("description")}
                  >
                    Description
                    {orderBy === "description" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "date"}
                    direction={orderBy === "date" ? order : 'asc'}
                    onClick={createSortHandler("date")}
                  >
                    Date
                    {orderBy === "date" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "amountDue"}
                    direction={orderBy === "amountDue" ? order : 'asc'}
                    onClick={createSortHandler("amountDue")}
                  >
                    Amount
                    {orderBy === "amountDue" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : 'asc'}
                    onClick={createSortHandler("status")}
                  >
                    Status
                    {orderBy === "status" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              </>
            ) : typeTable === 8 ? (
              <>
                <TableCell>
                  Team Member/
                  <TableSortLabel
                    active={orderBy === "dateTime"}
                    direction={orderBy === "dateTime" ? order : 'asc'}
                    onClick={createSortHandler("dateTime")}
                  >
                    Date
                    {orderBy === "dateTime" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  Client/
                  <TableSortLabel
                    active={orderBy === "project"}
                    direction={orderBy === "project" ? order : 'asc'}
                    onClick={createSortHandler("project")}
                  >
                    Project
                    {orderBy === "project" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "service"}
                    direction={orderBy === "service" ? order : 'asc'}
                    onClick={createSortHandler("service")}
                  >
                    Service
                    {orderBy === "service" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/
                  <TableSortLabel
                    active={orderBy === "note"}
                    direction={orderBy === "note" ? order : 'asc'}
                    onClick={createSortHandler("note")}
                  >
                    Note
                    {orderBy === "note" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "time"}
                    direction={orderBy === "time" ? order : 'asc'}
                    onClick={createSortHandler("time")}
                  >
                    Time
                    {orderBy === "time" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>/
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : 'asc'}
                    onClick={createSortHandler("status")}
                  >
                    Status
                    {orderBy === "status" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              </>
            ) : (
              // {
              //   id: 'name',
              //   label: 'Project Name',
              // },
              // {
              //   id: 'dueDate',
              //   label: 'Due Date',
              // },
              <>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : 'asc'}
                    onClick={createSortHandler("name")}
                  >
                    Project Name
                    {orderBy === "name" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
                <TableCell>Hours Logged</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "dueDate"}
                    direction={orderBy === "dueDate" ? order : 'asc'}
                    onClick={createSortHandler("dueDate")}
                  >
                    Due Date
                    {orderBy === "dueDate" ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              </>
            )
        }
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  typeTable: PropTypes.number.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  // isDimmed: PropTypes.bool,
};

// const TableTitle = ({children}) => {
//   return (
//   <Typography
//     variant="h5"
//     id="tableTitle"
//     component="div"
//   >
//     {children}
//   </Typography>
// )};

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const EnhancedTableToolbar = (props) => {
  const {
    typeTable,
    clientCompany,
    handleCreateData,
    selectedData,
    onCancelSelect,
    openSelectMenu,
    handleClickSelectMenu,
    anchorEl,
    handleCloseSelectMenu,
    handleClickOpenDialog,
    openDialog,
    handleCloseDialog,
    deleteSelectedData,
    // isDimmed
  } = props;
  const customClass = styles();

  // console.log("typeTable = ", typeTable)
  // console.log("typeTable is 0 = ", typeTable === 0)
  // console.log("typeTable is 1 = ", typeTable === 1)

  // const [tabValue, setTabValue] = useState(
  //   splitCurrentURL[splitCurrentURL.length - 1] === "invoices" ? 1 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "recurring-templates" ? 2 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "retainers" ? 3 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "credits" ? 4 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "checkout-link-payments" ? 5 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "expenses" ? 6 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "estimates" ? 7 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "time-tracking" ? 8 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "projects" ? 9 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "reports" ? 10
  // : 0);

  // const nameTable = typeTable === 0 ? "Contacts " 
  //                 : typeTable === 1 ? "Invoices " : "";
  let nameTable;
  if (typeTable === 0) {
    nameTable = "Contacts ";
  } else if (typeTable === 1) {
    nameTable = "Invoices ";
  } else if (typeTable === 2) {
    nameTable = "Recurring Templates ";
  } else if (typeTable === 3) {
    nameTable = "Retainer ";
  } else if (typeTable === 4) {
    nameTable = "Credits ";
  } else if (typeTable === 5) {
    nameTable = "Checkout Link Payments ";
  } else if (typeTable === 6) {
    nameTable = "Expenses ";
  } else if (typeTable === 7) {
    nameTable = "Estimates and Proposals ";
  } else if (typeTable === 8) {
    nameTable = "Time Entries ";
  } else if (typeTable === 9) {
    nameTable = "Projects ";
  } else {
    nameTable = "";
  }

  return (
    <Toolbar className={customClass.enhancedTable_toolbar}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedData.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
      // style={ isDimmed ? { pointerEvents: "none", cursor: "default", opacity: .4, } : {} }
    >
      {selectedData.length > 0 ? (
        <>
          <Typography
            variant="h5"
            id="tableTitle"
            component="div"
          >
            <Link to="#" onClick={onCancelSelect}>
              {nameTable} for {clientCompany}
            </Link> <ChevronRightIcon /> Selected
            <span className="numSelected">{selectedData.length}</span>
          </Typography>
          <Button
            aria-controls={openSelectMenu ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openSelectMenu ? 'true' : undefined}
            disableElevation
            onClick={handleClickSelectMenu}
            endIcon={<ExpandMoreIcon />}
          >
            Bulk Actions
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={openSelectMenu}
            onClose={handleCloseSelectMenu}
          >
            {typeTable === 1 ? (
              <>
                <MenuItem disableRipple>
                  <EditIcon /> Edit
                </MenuItem>
                <MenuItem disableRipple>
                  <FileCopyIcon /> Duplicate
                </MenuItem>
                <MenuItem disableRipple>
                  <PrintIcon /> Print
                </MenuItem>
                <MenuItem disableRipple>
                  <EmailIcon /> Send by Email
                </MenuItem>
                <MenuItem disableRipple>
                  <SendIcon /> Mark as Sent
                </MenuItem>
                <MenuItem disableRipple>
                  <AttachMoneyIcon /> Add a Payment
                </MenuItem>
                <MenuItem disableRipple>
                  <DownloadIcon /> Download PDF
                </MenuItem>
                <MenuItem disableRipple>
                  <AddCircleOutlineIcon /> Assign to Project
                </MenuItem>
                <MenuItem disableRipple>
                  <ArchiveIcon /> Archive
                </MenuItem>
              </>
            ) : typeTable === 2 ? (
              <>
                <MenuItem disableRipple>
                  <EditIcon /> Edit
                </MenuItem>
                <MenuItem disableRipple>
                  <ArchiveIcon /> Archive
                </MenuItem>
              </>
            ) : typeTable === 3 ? (
              <>
                <MenuItem disableRipple>
                  <ArchiveIcon /> Archive
                </MenuItem>
              </>
            ) : typeTable === 4 ? (
              <>
                <MenuItem disableRipple>
                  <EditIcon /> Edit
                </MenuItem>
                <MenuItem disableRipple>
                  <PrintIcon /> Print
                </MenuItem>
                <MenuItem disableRipple>
                  <EmailIcon /> Send by Email
                </MenuItem>
                <MenuItem disableRipple>
                  <SendIcon /> Mark as Sent
                </MenuItem>
              </>
            ) : typeTable === 6 ? (
              <>
                <MenuItem disableRipple>
                  <EditIcon /> Edit
                </MenuItem>
                <MenuItem disableRipple>
                  <FileCopyIcon /> Duplicate
                </MenuItem>
                <MenuItem disableRipple>
                  <LocalPizzaIcon /> Change Category
                </MenuItem>
                <MenuItem disableRipple>
                  <FaRegUser /> Change Merchant
                </MenuItem>
                <MenuItem disableRipple>
                  <FaUserTie /> Change Client or Project
                </MenuItem>
                <MenuItem disableRipple>
                  <TbReceiptTax /> Change Taxes
                </MenuItem>
                <MenuItem disableRipple>
                  <HistoryEduIcon /> Generate Invoice
                </MenuItem>
                <MenuItem disableRipple>
                  <BsCoin /> Mark as Bill Payment
                </MenuItem>
                <MenuItem disableRipple>
                  <ArchiveIcon /> Archive
                </MenuItem>
              </>
            ) : typeTable === 7 ? (
              <>
                <MenuItem disableRipple>
                  <EditIcon /> Edit
                </MenuItem>
                <MenuItem disableRipple>
                  <FileCopyIcon /> Duplicate
                </MenuItem>
                <MenuItem disableRipple>
                  <CheckCircleIcon /> Accept
                </MenuItem>
                <MenuItem disableRipple>
                  <HistoryEduIcon /> Convert to Invoice
                </MenuItem>
                <MenuItem disableRipple>
                  <AiOutlineFundProjectionScreen /> Convert to Project
                </MenuItem>
                <MenuItem disableRipple>
                  <AddCircleOutlineIcon /> Assign to Project
                </MenuItem>
                <MenuItem disableRipple>
                  <DownloadIcon /> Download PDF
                </MenuItem>
                <MenuItem disableRipple>
                  <ArchiveIcon /> Archive
                </MenuItem>
              </>
            ) : typeTable === 8 ? (
              <>
                <MenuItem disableRipple>
                  <HistoryEduIcon /> Generate Invoice
                </MenuItem>
                <MenuItem onClick={handleClickOpenDialog} disableRipple>
                  <DeleteIcon /> Delete
                </MenuItem>
                <MenuItem disableRipple>
                  <AttachMoneyIcon /> Mark as Billed
                </MenuItem>
                <MenuItem disableRipple>
                  <TimerOutlinedIcon /> Apply to Retainer
                </MenuItem>
              </>
            ) : typeTable === 9 ? (
              <>
                <MenuItem disableRipple>
                  <FileCopyIcon /> Duplicate
                </MenuItem>
                <MenuItem disableRipple>
                  <ArchiveIcon /> Archive
                </MenuItem>
              </>
            ) : null}
            {typeTable !== 8 &&
            <MenuItem onClick={handleClickOpenDialog} disableRipple>
              <DeleteIcon /> Delete
            </MenuItem>}
            {/* <MenuItem onClick={handleClose} disableRipple>
              <EditIcon /> Edit
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <FileCopyIcon />
              Duplicate
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
              <ArchiveIcon />
              Archive
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <MoreHorizIcon />
              More
            </MenuItem> */}
          </StyledMenu>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            classes={{ root: customClass.actionTable_dialog, }}
          >
            <DialogTitle variant="h2">
              Confirm
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Deleting contacts cannot be undone. Are you sure you want to delete these contacts?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={deleteSelectedData} autoFocus>OK</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        // <TableTitle>Contacts for {clientCompany}</TableTitle>
        <>
          <Typography
            variant="h5"
            id="tableTitle"
            component="div"
          >
            {nameTable} for {clientCompany}
          </Typography>
          <IconButton
            onClick={handleCreateData}
            style={{
              // padding: 0,
              width: 35,
              height: 30,
              minWidth: "unset",
              minHeight: "unset",
              backgroundColor: "#37a703",
              color: "#fff",
              border: "2px solid transparent",
              borderRadius: 5,
              transition: "background-color .15s",
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            <AddIcon />
          </IconButton>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  typeTable: PropTypes.number.isRequired,
  clientCompany: PropTypes.string.isRequired,
  handleCreateData: PropTypes.func,
  selectedData: PropTypes.array.isRequired,
  onCancelSelect: PropTypes.func.isRequired,
  openSelectMenu: PropTypes.bool,
  handleClickSelectMenu: PropTypes.func,
  anchorEl: PropTypes.object,
  handleCloseSelectMenu: PropTypes.func,
  handleClickOpenDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  handleCloseDialog: PropTypes.func,
  deleteSelectedData: PropTypes.func,
  // isDimmed: PropTypes.bool,
};

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    margin: 0,
    padding: 0,
    backgroundColor: "#fffefd",
    transform: "translateY(-50%)",
    position: "absolute",
    top: 0,
    // right: 12,
    right: 17,
    border: "1px solid #cdd4d9",
    borderRadius: 1000,
    boxShadow: "0 2px 0 0 rgb(6 41 66 / 10%)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    display: "none",
  },
  ["& .MuiSvgIcon-root:hover"]: {
    opacity: .6,
  },
});

const StyledLinearProgress = styled(LinearProgress)`
  height: 7px;
  border-radius: 5px;
  &.${linearProgressClasses.colorPrimary} {
    background-color: #0629421a;
  }
  & .${linearProgressClasses.bar} {
    width: ${props => props.value}%;
    height: 7px;
    border-radius: 5px;
    background-color: #0075dd;
    transform: translate(0, 0)!important;
  }
`;

function ClientsDetails() {
  const classes = styles();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");  
  const { client_id } = useParams();
  // const { client_id, subRoute } = useParams();
  // const allClientData = [
  //   {
  //     id: 1,
  //     firstName: "client",
  //     lastName: "- 1",
  //     company: "client -1",
  //     email: "cminone@gmail.com",
  //     phone: "08539731758",
  //     note: "this is my relationship note",
  //     credit: 0,
  //     total: 0,
  //   },
  //   {
  //     id: 2,
  //     firstName: "client",
  //     lastName: "1",
  //     company: "clients's companies",
  //     email: "email@gmail.com",
  //     phone: "0312738065",
  //     mobilePhone: "08132624682",
  //     businessPhone: "08508639201",
  //     firstStreet: "street 1",
  //     secondStreet: "street 2",
  //     city: "city",
  //     state: "state",
  //     zipCode: "zip_code",
  //     country: "country",
  //     note: "my internal note",
  //     credit: 0,
  //     total: 0,
  //   },
  // ];
  // const client = allClientData.find(data => data.id == client_id);
  const [client, setClient] = useState({});
  const [Clients, setClients] = useState([]);
  const [Invoices, setInvoices] = useState([]);
  const users = JSON.parse(localStorage.getItem("user"));
  const client_name = `${users.client.first_name} ${users.client.last_name}`;
  const { user, setUser } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const history = useHistory();
  const token = user.token.access;
  const business_id = user.business.id;
  const splitCurrentURL = history.location.pathname.split("/");
  const currentPath = splitCurrentURL[splitCurrentURL.length - 1];
  const [clientOverviewTabValue, setClientOverviewTabValue] = useState(currentPath === "relationship" ? 1 : 0);
  
  // const location = useLocation();
  // console.log("useLocation = ", location.pathname);
  // const route = useLocation().pathname.split("/").slice(1);

  // console.log("history is  = ", history);
  // console.log("splitCurrentURL is  = ", splitCurrentURL);
  
  // const [tabValue, setTabValue] = useState(0);
  // const [dataTable, setDataTable] = useState([]);

  let isTokenValid;

  // console.log("isTokenValid = ", isTokenValid)

  const TokenValidation = async () => {
    let validation_response;
    try {
      validation_response = await AuthApi.TokenValidation({token: user.token.access});
      console.log("response of AccessTokenValidation = ", validation_response);
      isTokenValid = true;
    } catch (err) {
      console.log(err);
      console.log("error response of AccessTokenValidation = ", err.response);
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

  const InitClients = async () => {
    try {
      let clients_response = await ActionsApi.GetClients({token}, {business_id});
      console.log("clients_response parent response = ", clients_response);
      
      let clients = [...clients_response.data];
      setClients(clients);

      setClient(clients[clients.findIndex(client => client.id == client_id)]);
    } catch (err) {
      console.log(err);
    }
  };

  const [contacts, setContacts] = useState([]);

  console.log("contacts = ", contacts);

  const InitContacts = async () => {
    try {
      let contacts_response = await ActionsApi.GetContacts({token: user.token.access}, {client_id});
      console.log("contacts_response parent response = ", contacts_response);
      
      setContacts(contacts_response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const [Invoices, setInvoices] = useState([]);
  const [ClientsInvoice, setClientsInvoice] = useState([]);

  console.log("Invoices = ", Invoices);

  console.log("ClientsInvoice = ", ClientsInvoice);

  // const InitInvoices = async () => {
  //   try {
  //     let invoices_response = await ActionsApi.GetInvoices({token: user.token.access}, {billed_to: client_id});
  //     console.log("invoices_response parent response = ", invoices_response);
      
  //     setInvoices(invoices_response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const InitInvoices = async () => {
    try {
      let invoices_response = await ActionsApi.GetInvoices({ token }, { business_id });
      console.log("invoices_response response = ", invoices_response);

      let invoiceData = [...invoices_response.data];
      setInvoices(invoiceData);

      setClientsInvoice(invoiceData.filter(data => data.client_id == client_id));
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    Promise.all([TokenValidation()])
    .then(() => {
      console.log("isTokenValid promise then = ", isTokenValid)
      if (isTokenValid) {
        InitClients();
        InitInvoices();

      }
    })
    .catch((error) => {
      console.error(error.message);
    });
  }, []);

  let clientContactData = [
    {
      id: 1,
      firstName: "first_name",
      lastName: "last name",
      email: "email1@gmail.com",
      firstPhone: "phone 4",
      secondPhone: "phone 2",
    },
    {
      id: 2,
      firstName: "",
      lastName: "",
      email: "email2@gmail.com",
      firstPhone: "phone 1",
      secondPhone: "phone 5",
    },
    // {
    //   id: 'firstName',
    //   label: 'Name',
    // },
    // {
    //   id: 'email',
    //   label: 'Email',
    // },
    // {
    //   id: 'phone',
    //   label: 'Phone Number 1/Phone Number 2',
    // },
  ];
  
  // let clientInvoiceData = {
  //   invoices: [
  //     {
  //       id: 1,
  //       get invoiceNumber() {
  //         return String(this.id).padStart(7, "0");
  //       },
  //       clientId: 2,
  //       descriptions: [
  //         {
  //           name: "item 11",
  //           description: "description of item 4",
  //           rate: 12,
  //           taxesId: [1, 2, 3],
  //           quantity: 3,
  //           get lineTotal() {
  //             return this.rate * this.quantity;
  //           },
  //         },
  //         {
  //           name: "item 11",
  //           description: "description of item 4",
  //           rate: 8.43,
  //           taxesId: [2],
  //           quantity: 2,
  //           get lineTotal() {
  //             return this.rate * this.quantity;
  //           },
  //         },
  //       ],
  //       issuedDate: "09/02/2022",
  //       dueDate: "02/02/2023",
  //       amountDue: "52.86",
  //       status: "Draft",
  //       // {
  //       //   id: 'clientCompany',
  //       //   // id: 'company',
  //       //   label: 'Client',
  //       // },
  //       // {
  //       //   id: 'invoiceNumber',
  //       //   label: 'Invoice Number',
  //       // },
  //       // {
  //       //   id: 'description',
  //       //   label: 'Description',
  //       // },
  //       // {
  //       //   id: 'issuedDate',
  //       //   label: 'Issued Date',
  //       // },
  //       // {
  //       //   id: 'dueDate',
  //       //   label: 'Due Date',
  //       // },
  //       // {
  //       //   id: 'amountDue',
  //       //   label: 'Amount',
  //       // },
  //       // {
  //       //   id: 'status',
  //       //   label: 'Status',
  //       // },
  //     },
  //     {
  //       id: 2,
  //       get invoiceNumber() {
  //         return String(this.id).padStart(7, "0");
  //       },
  //       clientId: 1,
  //       descriptions: [
  //         {
  //           name: "item -0",
  //           description: "description of item 1",
  //           rate: 11.75,
  //           taxesId: [1],
  //           quantity: 1,
  //           get lineTotal() {
  //             return this.rate * this.quantity;
  //           },
  //         },
  //       ],
  //       issuedDate: "08/26/2022",
  //       dueDate: "09/01/2022",
  //       amountDue: "11.75",
  //       status: "Sent",
  //     },
  //   ],
  //   taxes: [
  //     {
  //       id: 1,
  //       rate: "0.3",
  //       name: "tax -0",
  //       number: "",
  //     },
  //     {
  //       id: 2,
  //       rate: "1.5",
  //       name: "tax 9",
  //       number: "12",
  //     },
  //     {
  //       id: 3,
  //       rate: "4.0",
  //       name: "taxx 1",
  //       number: "1.09",
  //     },
  //   ],
  // };
  
  let clientRecurringTemplateData = [
    {
      id: 1,
      clientId: 2,
      invoiceId: 1,
      frequency: "Every Month",
      duration: "Infinite",
      // amountDue: 52.86,
      amountDue: "28.12",
      status: "Auto-Sent",
    },
    {
      id: 2,
      clientId: 1,
      invoiceId: 2,
      frequency: "Every Month",
      duration: "Infinite",
      amountDue: "0.00",
      status: "Auto-Sent",
    },
  ];
  
  let clientRetainerData = [
    {
      id: 1,
      clientId: 2,
      retainerId: "00000007793",
      nextInvoice: "08/26/2022",
      remaining: "Infinite",
      fee: "1.35",
      period: "Per Month",
      totalRevenue: "1.35",
      status: "Active",
    },
  ];
  
  let clientCreditsData = [
    {
      id: 1,
      type: "Prepayment",
      // creditNumber: "0000001",
      get creditNumber() {
        return String(this.id).padStart(7, "0");
      },
      issuedDate: "08/26/2022",
      descriptions: [
        {
          name: "item -0",
          description: "description of item 1",
          rate: 11.75,
          taxesId: [1],
          quantity: 1,
          get lineTotal() {
            return this.rate * this.quantity;
          },
        },
      ],
      amountDue: "11.75",
      status: "Created",
    },
    {
      id: 2,
      type: "Credit Note",
      get creditNumber() {
        return String(this.id).padStart(7, "0");
      },
      issuedDate: "09/02/2022",
      descriptions: [
        {
          name: "item 11",
          description: "description of item 4",
          rate: 12,
          taxesId: [1, 2, 3],
          quantity: 3,
          get lineTotal() {
            return this.rate * this.quantity;
          },
        },
        {
          name: "item 11",
          description: "description of item 4",
          rate: 8.43,
          taxesId: [2],
          quantity: 2,
          get lineTotal() {
            return this.rate * this.quantity;
          },
        },
      ],
      amountDue: "52.86",
      status: "Created",
    },
  ];
  
  let clientExpensesData = [
    {
      id: 1,
      merchant: "merchant 1",
      category: "Advertising",
      date: "08/26/2022",
      description: "description one",
      amountDue: "11.75",
      totalTax: "1.86",
    },
    {
      id: 2,
      merchant: "the merchant",
      category: "Hardware",
      date: "09/02/2022",
      description: "lorem ipsum dulur sit amet",
      amountDue: "52.86",
      totalTax: "0.00",
    },
  ];
  
  let clientEstimatesProposalsData = [
    {
      id: 1,
      clientId: 2,
      get estimatesProposalsNumber() {
        return String(this.id).padStart(7, "0");
      },
      descriptions: [
        {
          name: "item 11",
          description: "description of item 4",
          rate: 12,
          taxesId: [1, 2, 3],
          quantity: 3,
          get lineTotal() {
            return this.rate * this.quantity;
          },
        },
        {
          name: "item 11",
          description: "description of item 4",
          rate: 8.43,
          taxesId: [2],
          quantity: 2,
          get lineTotal() {
            return this.rate * this.quantity;
          },
        },
      ],
      date: "08/26/2022",
      amountDue: "52.86",
      status: "Draft",
    },
    {
      id: 2,
      clientId: 1,
      get estimatesProposalsNumber() {
        return String(this.id).padStart(7, "0");
      },
      descriptions: [
        {
          name: "item -0",
          description: "description of item 1",
          rate: 11.75,
          taxesId: [1],
          quantity: 1,
          get lineTotal() {
            return this.rate * this.quantity;
          },
        },
      ],
      date: "09/02/2022",
      amountDue: "11.75",
      status: "Draft",
    },
  ];
  
  let clientTimeEntriesData = [
    {
      id: 1,
      clientId: 2,
      projectId: 1,
      dateTime: "08/26/2022 at 12:00pm",
      service: "service 1",
      note: "system development",
      time: "0h 15m",
      status: "Non-Billable",
    },
    {
      id: 2,
      clientId: 2,
      projectId: 2,
      dateTime: "09/04/2022 at 3:11am",
      service: "service 2",
      note: "maintenance software",
      time: "1h 45m",
      status: "Unbilled",
    },
  ];
  
  let clientProjectsData = [
    {
      id: 1,
      name: "flat rate project",
      clientId: 2,
      timeEntriesId: 1,
      dueDate: "Sep 10, 2022",
    },
    {
      id: 2,
      name: "hourly project",
      clientId: 2,
      timeEntriesId: 2,
      dueDate: "Dec 19, 2023",
    },
  ];

  // const [tabValue, setTabValue] = useState(
  //   splitCurrentURL[splitCurrentURL.length - 1] === "invoices" ? 1 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "recurring-templates" ? 2 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "retainers" ? 3 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "credits" ? 4 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "checkout-link-payments" ? 5 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "expenses" ? 6 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "estimates" ? 7 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "time-tracking" ? 8 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "projects" ? 9 
  //   : splitCurrentURL[splitCurrentURL.length - 1] === "reports" ? 10
  // : 0);

  
//   useEffect(() => {
//     if (splitCurrentURL[splitCurrentURL.length - 1] == client_id) {
//       setTabValue(0);
//       dataTable = [
//         {
//           id: 1,
//           firstName: "first_name",
//           lastName: "last name",
//           email: "email1@gmail.com",
//           firstPhone: "phone 4",
//           secondPhone: "phone 2",
//         },
//         {
//           id: 2,
//           firstName: "",
//           lastName: "",
//           email: "email2@gmail.com",
//           firstPhone: "phone 1",
//           secondPhone: "phone 5",
//         },
//       ];

// //       var dataTable;
// // let clientContactData = [
// //   {
// //     id: 1,
// //     firstName: "first_name",
// //     lastName: "last name",
// //     email: "email1@gmail.com",
// //     firstPhone: "phone 4",
// //     secondPhone: "phone 2",
// //   },
// //   {
// //     id: 2,
// //     firstName: "",
// //     lastName: "",
// //     email: "email2@gmail.com",
// //     firstPhone: "phone 1",
// //     secondPhone: "phone 5",
// //   },
// // ];
//     } else {
//       if (splitCurrentURL[splitCurrentURL.length - 1] === "invoices") {
//         setTabValue(1);
//         dataTable = {
//           invoices: [
//             {
//               id: 1,
//               // invoiceNumber: this.id.padStart(7, "0"),
//               // clientTo: "fl company",
//               get invoiceNumber() {
//                 return String(this.id).padStart(7, "0");
//               },
//               clientId: 2,
//               descriptions: [
//                 {
//                   name: "item 11",
//                   description: "description of item 4",
//                   rate: 12,
//                   taxesId: [1, 2, 3],
//                   // taxes: [
//                   //   {
//                   //     rate: 0.3,
//                   //     name: "tax -0",
//                   //     number: "",
//                   //   },
//                   //   {
//                   //     rate: 1.5,
//                   //     name: "tax 9",
//                   //     number: 12,
//                   //   },
//                   //   {
//                   //     rate: 4.0,
//                   //     name: "taxx 1",
//                   //     number: 1.09,
//                   //   },
//                   // ],
//                   quantity: 3,
//                   // total: 36,
//                   // total: this.rate * this.quantity,
//                   get lineTotal() {
//                     return this.rate * this.quantity;
//                   },
//                 },
//                 {
//                   name: "item 11",
//                   description: "description of item 4",
//                   rate: 8.43,
//                   taxesId: [2],
//                   // taxes: [
//                   //   {
//                   //     rate: 1.5,
//                   //     name: "tax 9",
//                   //     number: 12,
//                   //   },
//                   // ],
//                   quantity: 2,
//                   get lineTotal() {
//                     return this.rate * this.quantity;
//                   },
//                 },
//               ],
//               issueDate: "09/02/2022",
//               dueDate: "02/02/2023",
//               amountDue: 43.79,
//               status: "Draft",
//             },
//             {
//               id: 2,
//               // invoiceNumber: "0000002",
//               clientTo: 2,
//               descriptions: [
//                 {
//                   name: "item -0",
//                   description: "description of item 1",
//                   rate: 11.75,
//                   taxesId: [1],
//                   // taxes: [
//                   //   {
//                   //     rate: 0.3,
//                   //     name: "tax -0",
//                   //     number: "",
//                   //   },
//                   // ],
//                   quantity: 1,
//                   lineTotal: 11.75,
//                   status: "Sent",
//                 },
//               ],
//               issueDate: "08/26/2022",
//               dueDate: "09/01/2022",
//               amountDue: 11.75,
//             },
//           ],
//           taxes: [
//             {
//               id: 1,
//               rate: 0.3,
//               name: "tax -0",
//               number: "",
//             },
//             {
//               id: 2,
//               rate: 1.5,
//               name: "tax 9",
//               number: 12,
//             },
//             {
//               id: 3,
//               rate: 4.0,
//               name: "taxx 1",
//               number: 1.09,
//             },
//           ],
//         };
//         // parseFloat(52.86).toFixed(2) - parseFloat(9.91).toFixed(2)
//         // 36.06+43.79+15.00
//         // formula for tax example: 
//         // 20.00 * 1.3 / 100
//         // 15.00 * 0.67 / 100
//         // 1.26 * 1.3 / 10
//         // parseFloat(0.39).toFixed(2) - parseFloat(0.014949999999999998).toFixed(2)
//         // 0.016380000000000002.toFixed(2)
            // new Date().toLocaleString('en-US', { 
            //   hour: 'numeric', 
            //   minute: 'numeric', 
            //   hour12: true 
            // })
            // output  =  '12:13 PM'
            // new Date().toLocaleString('en-IN', { 
            //   hour: 'numeric', 
            //   minute: 'numeric', 
            //   hour12: true 
            // })
            // output  =  '12:17 pm'
//       } else if (splitCurrentURL[splitCurrentURL.length - 1] === "recurring-templates") {
//         setTabValue(2);
//       } else if (splitCurrentURL[splitCurrentURL.length - 1] === "retainers") {
//         setTabValue(3);
//       } else if (splitCurrentURL[splitCurrentURL.length - 1] === "credits") {
//         setTabValue(4);
//       } else if (splitCurrentURL[splitCurrentURL.length - 1] === "checkout-link-payments") {
//         setTabValue(5);
//       } else if (splitCurrentURL[splitCurrentURL.length - 1] === "expenses") {
//         setTabValue(6);
//       } else if (splitCurrentURL[splitCurrentURL.length - 1] === "estimates") {
//         setTabValue(7);
//       } else if (splitCurrentURL[splitCurrentURL.length - 1] === "time-tracking") {
//         setTabValue(8);
//       } else if (splitCurrentURL[splitCurrentURL.length - 1] === "projects") {
//         setTabValue(9);
//       } else if (splitCurrentURL[splitCurrentURL.length - 1] === "reports") {
//         setTabValue(10);
//       }
//     }
//     console.log("tabValue in useEffect is  = ", tabValue);
//   });

  const [tabValue, setTabValue] = useState(
    currentPath === "invoices" ? 1 
    : currentPath === "recurring-templates" ? 2 
    : currentPath === "retainers" ? 3 
    : currentPath === "credits" ? 4 
    : currentPath === "checkout-link-payments" ? 5 
    : currentPath === "expenses" ? 6 
    : currentPath === "estimates" ? 7 
    : currentPath === "time-tracking" ? 8 
    : currentPath === "projects" ? 9 
    : currentPath === "reports" ? 10
  : 0);
  
  // var dataTable;
  // const [dataTable, setDataTable] = useState([]);

  // used
  useEffect(() => {
    setSelected([]);
    // setOrder('asc');
    if (tabValue === 0) {
      setOrderBy("firstName");
      // setDataTable(clientContactData);
      InitContacts();

    } else if (tabValue === 1) {
      setOrderBy("issuedDate");
      // InitInvoices();

      
      // let newDataTable = clientInvoiceData.invoices.map(invoice => {
      //   invoice.clientCompany = allClientData.find(data => data.id == invoice.id).company;
      //   invoice.description = invoice.descriptions[0].description;
      // });
      // let newDataTable = clientInvoiceData.invoices;
      // console.log("newDataTable if tabValue is 1 = ", newDataTable);
      // setDataTable(newDataTable);


      // clientInvoiceData.invoices.map(invoice => {
      //   invoice.clientCompany = allClientData.find(data => data.id == invoice.id).company;
      //   invoice.description = invoice.descriptions[0].description;
      // });
      // setDataTable(clientInvoiceData.invoices);
    } else if (tabValue === 2) {
      setOrderBy("");
      // setDataTable(clientRecurringTemplateData);
    } else if (tabValue === 3) {
      setOrderBy("");
      // let newDataTable = clientRetainerData.map(retainer => {
      //   retainer.clientCompany = allClientData.find(data => data.id == retainer.id).company;
      //   // retainer.lastIssued = clientInvoiceData.invoices.find(data => data.id == retainer.invoiceId).issuedDate;
      // });
      // row.clientCompany = allClientData.find(data => data.id == row.clientId).company;
      //                 row.lastIssued = clientInvoiceData.invoices.find(data => data.id == row.invoiceId).issuedDate;
      // setDataTable(clientRetainerData);
      // setDataTable(newDataTable);


      // clientRetainerData.map(retainer => {
      //   retainer.clientCompany = allClientData.find(data => data.id == retainer.id).company;
      // });
      // setDataTable(clientRetainerData);
    } else if (tabValue === 4) {
      setOrderBy("issuedDate");
      // setDataTable(clientCreditsData);
      // let newDataTable = clientCreditsData.map(credit => {
      //   credit.description = credit.descriptions[0].description;
      // });
      // setDataTable(newDataTable);


      // clientCreditsData.map(credit => {
      //   credit.description = credit.descriptions[0].description;
      // });
      // setDataTable(clientCreditsData);
    } else if (tabValue === 6) {
      setOrderBy("source");
      // setDataTable(clientExpensesData);
    } else if (tabValue === 7) {
      setOrderBy("date");
      // setDataTable(clientEstimatesProposalsData);
      // let newDataTable = clientEstimatesProposalsData.map(estimate => {
      //   estimate.clientCompany = allClientData.find(data => data.id == estimate.clientId).company;
      //   estimate.description = estimate.descriptions[0].description;
      // });
      // setDataTable(newDataTable);


      // clientEstimatesProposalsData.map(estimate => {
      //   estimate.clientCompany = allClientData.find(data => data.id == estimate.clientId).company;
      //   estimate.description = estimate.descriptions[0].description;
      // });
      // setDataTable(clientEstimatesProposalsData);


      // row.clientCompany = allClientData.find(data => data.id == row.clientId).company;
      //                 row.description = row.descriptions[0].description;
    } else if (tabValue === 8) {
      setOrderBy("dateTime");
      // setDataTable(clientTimeEntriesData);
      // let newDataTable = clientTimeEntriesData.map(timeEntries => {
      //   // estimate.clientCompany = allClientData.find(data => data.id == estimate.clientId).company;
      //   // estimate.description = estimate.descriptions[0].description;
      //   timeEntries.client = allClientData.find(data => data.id == timeEntries.clientId).company;
      //   let clientProject = clientProjectsData.find(data => data.id == timeEntries.projectId);
      //   timeEntries.project = clientProject === undefined ? "—" : clientProject.name;
      //   timeEntries.service = timeEntries.service.length === 0 ? "—" : timeEntries.service;
      // });
      // setDataTable(newDataTable);


      // clientTimeEntriesData.map(timeEntries => {
      //   // estimate.clientCompany = allClientData.find(data => data.id == estimate.clientId).company;
      //   // estimate.description = estimate.descriptions[0].description;
      //   timeEntries.client = allClientData.find(data => data.id == timeEntries.clientId).company;
      //   let clientProject = clientProjectsData.find(data => data.id == timeEntries.projectId);
      //   timeEntries.project = clientProject === undefined ? "—" : clientProject.name;
      //   timeEntries.service = timeEntries.service.length === 0 ? "—" : timeEntries.service;
      // });
      // setDataTable(clientTimeEntriesData);


      // row.client = allClientData.find(data => data.id == row.clientId).company;
      //                 let project = clientProjectsData.find(data => data.id == row.projectId);
      //                 row.project = project === undefined ? "—" : project.name;
      //                 row.service = row.service.length === 0 ? "—" : row.service;
    } else if (tabValue === 9) {
      setOrderBy("");
      // setDataTable(clientProjectsData);
    }
    // console.log("order is = ", order)
    // console.log("orderBy is = ", orderBy)
  }, [tabValue]);

  // console.log("tabValue is = ", tabValue)
  // console.log("dataTable is = ", dataTable)
  // console.log("clientInvoiceData is = ", clientInvoiceData.invoices)

  const [editMode, setEditMode] = useState(false);
  const apexchartState = {
    series: [{
      data: [35],
    }],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          // barHeight: '10%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom',
            // position: 'top',
          },
        },
      },
      colors: ['#f4d980'],
      dataLabels: {
        // enabled: true,
        enabled: false,
        textAnchor: 'start',
        // textAnchor: 'end',
        style: {
          colors: ['#fff'],
        },
        formatter: (val, opt) => {
          return `${opt.w.globals.labels[opt.dataPointIndex]}:  ${val}`;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
      xaxis: {
        position: 'top',
        categories: [
          // 'Overdue'
          'Outstanding '
        ],
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        horizontalAlign: 'left',
        customLegendItems: [`<label style="font-size: 14px;">Overdue</label><br/>&emsp;&nbsp;<label style="color: #576981;">$0</label>`],
        markers: {
          fillColors: ['#ec8292'],
        },
      },
      title: {
        text: 'Outstanding Revenue',
        style: {
          fontSize: 24,
          fontWeight: 600,
        },
      },
      // tooltip: {
      //   theme: 'dark',
      //   x: {
      //     show: false,
      //   },
      //   y: {
      //     title: {
      //       formatter: () => {
      //         return '';
      //       }
      //     },
      //   },
      // },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        fillSeriesColor: false,
        // theme: false,
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: undefined
        },
        onDatasetHover: {
            highlightDataSeries: false,
        },
        x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
        },
        y: {
            formatter: undefined,
            title: {
                formatter: (seriesName) => seriesName,
            },
        },
        z: {
            formatter: undefined,
            title: 'Size: '
        },
        marker: {
            show: true,
        },
        items: {
           display: "flex",
        },
        fixed: {
            enabled: false,
            position: 'topRight',
            offsetX: 0,
            offsetY: 0,
        }
      }
    },
  };

  // console.log("props = ", props)
  // console.log("client_id = ", client_id)
  // console.log("url useRouteMatch in client details = ", url)
  // console.log("history useHistory in client details = ", history)
  // console.log("history location pathname useHistory in client details = ", history.location.pathname)

  

  // const clientContactData = [
  //   {
  //     id: 1,
  //     firstName: "first_name",
  //     lastName: "last name",
  //     email: "email1@gmail.com",
  //     firstPhone: "phone 4",
  //     secondPhone: "phone 2",
  //   },
  //   {
  //     id: 2,
  //     firstName: "",
  //     lastName: "",
  //     email: "email2@gmail.com",
  //     firstPhone: "phone 1",
  //     secondPhone: "phone 5",
  //   },
  // ];

  // useEffect(() => {
  //   if (subRoute) {
  //     // handle sub-route value change
  //     console.log("handle sub-route value change = ", subRoute)
  //   }
  // }, [subRoute]);

//   InitContacts
// InitInvoices

  function initDataTable(path) {
    if (path === "invoices") {
      // return clientInvoiceData.invoices;
      return Invoices;
    } else if (path === "recurring-templates") {
      return clientRecurringTemplateData;
    } else if (path === "retainers") {
      return clientRetainerData;
    } else if (path === "credits") {
      return clientCreditsData;
    } else if (path === "expenses") {
      return clientExpensesData;
    } else if (path === "estimates") {
      return clientEstimatesProposalsData;
    } else if (path === "time-tracking") {
      return clientTimeEntriesData;
    } else if (path === "projects") {
      return clientProjectsData;
    } else {
      // return clientContactData;
      return contacts;
    }
  }

  const [dataTable, setDataTable] = useState(initDataTable(currentPath));

  function changeTab(name) {
    if (name === "Contacts") {
      history.push(url);
      // setDataTable(clientContactData);
      setDataTable(clientContactData);
    } else if (name === "Invoices") {
      history.push(`${url}/invoices`);
      // setDataTable(clientInvoiceData.invoices);
      setDataTable(Invoices);
    } else if (name === "Recurring Templates") {
      history.push(`${url}/recurring-templates`);
      setDataTable(clientRecurringTemplateData);
    } else if (name === "Retainer") {
      history.push(`${url}/retainers`);
      setDataTable(clientRetainerData);
    } else if (name === "Credits") {
      history.push(`${url}/credits`);
      setDataTable(clientCreditsData);
    } else if (name === "Checkout Links") {
      history.push(`${url}/checkout-link-payments`);
    } else if (name === "Expenses") {
      history.push(`${url}/expenses`);
      setDataTable(clientExpensesData);
    } else if (name === "Estimates") {
      history.push(`${url}/estimates`);
    } else if (name === "Time Tracking") {
      history.push(`${url}/time-tracking`);
      setDataTable(clientTimeEntriesData);
    } else if (name === "Projects") {
      history.push(`${url}/projects`);
      setDataTable(clientProjectsData);
    } else if (name === "Reports") {
      history.push(`${url}/reports `);
    }
  }
  
  const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('calories');
  // const [orderBy, setOrderBy] = useState('organization');
  // const [orderBy, setOrderBy] = useState('name');
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // console.log("currentPath is = ", currentPath)

  // useEffect( () => {
  //   if (currentPath === "invoices") {
  //     setOrderBy("issuedDate");
  //     clientInvoiceData.invoices.map(invoice => {
  //       invoice.clientCompany = allClientData.find(data => data.id == invoice.id).company;
  //       invoice.description = invoice.descriptions[0].description;
  //     });
  //     setDataTable(clientInvoiceData.invoices);
  //   } else if (currentPath === "recurring-templates") {
  //     setOrderBy("");
  //     setDataTable(clientRecurringTemplateData);
  //   } else if (currentPath === "retainers") {
  //     setOrderBy("");
  //     clientRetainerData.map(retainer => {
  //       retainer.clientCompany = allClientData.find(data => data.id == retainer.id).company;
  //     });
  //     setDataTable(clientRetainerData);
  //   } else if (currentPath === "credits") {
  //     setOrderBy("issuedDate");
  //     clientCreditsData.map(credit => {
  //       credit.description = credit.descriptions[0].description;
  //     });
  //     setDataTable(clientCreditsData);
  //   } 
  //   // else if (currentPath === "checkout-link-payments") {
  //   //   // setTabValue(5);
  //   // } 
  //   else if (currentPath === "expenses") {
  //     setOrderBy("source");
  //     setDataTable(clientExpensesData);
  //   } else if (currentPath === "estimates") {
  //     setOrderBy("date");
  //     clientEstimatesProposalsData.map(estimate => {
  //       estimate.clientCompany = allClientData.find(data => data.id == estimate.clientId).company;
  //       estimate.description = estimate.descriptions[0].description;
  //     });
  //     setDataTable(clientEstimatesProposalsData);
  //   } else if (currentPath === "time-tracking") {
  //     setOrderBy("dateTime");
  //     clientTimeEntriesData.map(timeEntries => {
  //       // estimate.clientCompany = allClientData.find(data => data.id == estimate.clientId).company;
  //       // estimate.description = estimate.descriptions[0].description;
  //       timeEntries.client = allClientData.find(data => data.id == timeEntries.clientId).company;
  //       let clientProject = clientProjectsData.find(data => data.id == timeEntries.projectId);
  //       timeEntries.project = clientProject === undefined ? "—" : clientProject.name;
  //       timeEntries.service = timeEntries.service.length === 0 ? "—" : timeEntries.service;
  //     });
  //     setDataTable(clientTimeEntriesData);
  //   } else if (currentPath === "projects") {
  //     setOrderBy("");
  //     setDataTable(clientProjectsData);
  //   } else {
  //     setOrderBy("firstName");
  //     setDataTable(clientContactData);
  //   }
  // }, [currentPath]);

  console.log("tabValue is = ", tabValue)
  console.log("dataTable is = ", dataTable)

  const handleRequestSort = (event, property) => {
    console.log("order = ", order);
    console.log("orderBy = ", orderBy);
    console.log("property handleRequestSort = ", property);
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     // const newSelecteds = rows.map((n) => n.name);
  //     const newSelecteds = clientContactData.map((n) => n.email);
  //     console.log("newSelecteds inside handleSelectAllClick = ", newSelecteds);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   console.log("out from event target checked");
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   event.stopPropagation();
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) { // selected
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) { // unselected
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   console.log("name = ", name);
  //   console.log("selectedIndex = ", selectedIndex);
  //   console.log("newSelected = ", newSelected);

  //   setSelected(newSelected);
  // };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // // setSelected(clientContactData);
      // if (tabValue === 0) {
      //   // setSelected(dataTable);
      //   setSelected(clientContactData);
      // } else if (tabValue === 1) {
      //   // setSelected(dataTable.invoices);
      //   setSelected(clientInvoiceData.invoices);
      // } else if (tabValue === 2) {
      //   setSelected(clientRecurringTemplateData);
      // }
      setSelected(dataTable);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, row) => {
  const selectRow = (event, row) => {
    event.stopPropagation();
    const selectedIndex = selected.findIndex(item => item.id == row.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    
    setSelected(newSelected);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const isSelected = (email) => selected.indexOf(email) !== -1;

  const isSelected = (row) => selected.findIndex(item => item.id == row.id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataTable.length) : 0;
  //   // page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientContactData.length) : 0;

  const [anchorEl, setAnchorEl] = useState(null);
  const openSelectMenu = Boolean(anchorEl);
  const handleClickSelectMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSelectMenu = () => {
    setAnchorEl(null);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    handleCloseSelectMenu();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const [selectedRow, setSelectedRow] = useState({});
  const [openDialogByRow, setOpenDialogByRow] = useState(false);

  // console.log("selectedRow = ", selectedRow);

  const handleClickOpenDialogByRow = () => {
    // if (tabValue === 0) {
    //   setSelectedRow(contact);
    // }
    // console.log("row in handleClickOpenDialogByRow = ",row);
    setOpenDialogByRow(true);
  };

  const handleCloseDialogByRow = () => {
    setOpenDialogByRow(false);
  };

  const deleteSelectedData = async () => {
    // let newDataTable = [...dataTable];
    // selected.forEach(data => {
    //   newDataTable = newDataTable.filter(item => {
    //     return item.id !== data.id;
    //   });
    // });
    // setSelected([]);
    // setDataTable(newDataTable);
    // handleCloseDialog();
    // showToast("Secondary contacts has been deleted.");

    TokenValidation();
    try {
      let token = user.token.access
      if (tabValue === 0) {
        let response = await ActionsApi.DeleteContacts({ token, data: selected, });
        console.log("response of DeleteContacts = ", response);

        let newContacts = [...contacts];
        selected.forEach(data => {
          newContacts = newContacts.filter(contact => {
            return contact.id !== data.id;
          });
        });
        setContacts(newContacts);
        setSelected([]);
        showToast("Secondary contacts has been deleted.");
      }
      handleCloseDialogByRow();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDataByRow = async (row) => {
    // let newDataTable = [...dataTable];
    // newDataTable.splice(newDataTable.findIndex(item => item.id === row.id), 1);
    // let newSelected = [...selected];
    // let selectRowIndex = newSelected.findIndex(item => item.id === row.id);
    // if (selectRowIndex !== -1) {
    //   newSelected.splice(selectRowIndex, 1);
    // }
    // setSelected(newSelected);
    // setDataTable(newDataTable);
    // handleCloseDialogByRow();
    // showToast("Secondary contacts has been deleted.");

    console.log("row in deleteDataByRow = ", row);
    TokenValidation();
    try {
      let token = user.token.access, data = [row];
      if (tabValue === 0) {
        let response = await ActionsApi.DeleteContacts({ token, data });
        console.log("response of DeleteContacts = ", response);

        let newContacts = [...contacts];
        newContacts.splice(newContacts.findIndex(contact => contact.id === row.id), 1);
        setContacts(newContacts);
        let newSelected = [...selected];
        let selectRowIndex = newSelected.findIndex(contact => contact.id === row.id);
        if (selectRowIndex !== -1) {
          newSelected.splice(selectRowIndex, 1);
          setSelected(newSelected);
        }
        showToast("Secondary contacts has been deleted.");
      }
      handleCloseDialogByRow();
    } catch (err) {
      console.log(err);
    }
  };

  // const initContact = {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   firstPhone: "",
  //   secondPhone: "",
  // };
  const initContact = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number_1: "",
    phone_number_2: "",
    business_id: user.business.id,
    client_id: parseInt(client_id),
  };
  const [contact, setContact] = useState(initContact);
  const [openCreateEditDialog, setOpenCreateEditDialog] = useState(false);

  const handleClickOpenCreateDialog = () => {
    // setContact({ id: dataTable.length > 0 ? dataTable[dataTable.length - 1].id + 1 : 1, ...initContact, eventType: "Create", });
    if (tabValue === 0) {
      setContact({ ...initContact, eventType: "Create", });
      setOpenCreateEditDialog(true);
    } else if (tabValue === 1) {
      // history.push("/invoices/new");
      history.push({
        pathname: "/invoices/new",
        // state: {
        //   allClients: Clients,
        //   allInvoices: Invoices,
        // }
      });
    }
  };

  const handleClickOpenEditDialog = (row) => {
    setContact({ ...row, eventType: "Edit", });
    setOpenCreateEditDialog(true);
  };

  // console.log("contact data = ", JSON.stringify(contact, null, 2));
  // console.log("id contact data = ", contact.id);

  const handleCloseCreateEditDialog = () => {
    setOpenCreateEditDialog(false);
    setContact(initContact);
    setErrorEmail(false);
  };

  const handleChangeEditDialog = (evt) => {
    evt.persist();
    setErrorEmail(false);
    setContact({
      ...contact,
      [evt.target.name]: evt.target.value,
    });
  };

  const [errorEmail, setErrorEmail] = useState(false);
  
  function ValidateEmail(email)
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) // eslint-disable-line
    {
      return true;
    }
    return false;
  }

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

  // const handleToastClose = () => {
  //   setToastMessage("");
  //   setToastTransition(undefined);
  //   setToastState(false);
  // };
  
  const createEditContact = async (eventType) => {
    TokenValidation();
    setErrorEmail(!ValidateEmail(contact.email));
    if (ValidateEmail(contact.email)) {
      // let newDataTable = [...dataTable];
      // if (eventType === "Edit") {
      //   let index = newDataTable.findIndex(data => data.id === contact.id);
      //   newDataTable[index] = contact;
      // } else {
      //   newDataTable.push(contact);
      // }
      // setDataTable(newDataTable);
      try {
        delete contact.eventType;
        let newContacts = [...contacts], response, token = user.token.access;
        if (eventType === "Edit") {
          response = await ActionsApi.UpdateContacts({ token }, contact);
          console.log("response UpdateContacts = ", response);
          newContacts[newContacts.findIndex(data => data.id === contact.id)] = {...response.data.contact};
        } else {
          response = await ActionsApi.CreateContacts({ token }, contact);
          console.log("response CreateContacts = ", response);
          newContacts.push(response.data.contact);
        }
        setContacts(newContacts);
        handleCloseCreateEditDialog();
        showToast("Secondary contact has now been saved.");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [tempTableRowMore, setTempTableRowMore] = useState(undefined);
  const [hoverTableRowMore, setHoverTableRowMore] = useState(false);
  const [anchorElOpenMore, setAnchorElOpenMore] = useState(null);

  const handleOpenMore = (event) => {
    setAnchorElOpenMore(anchorElOpenMore === null ? event.currentTarget : null);
  };

  const handleCloseMore = () => {
    setAnchorElOpenMore(null);
    setHoverTableRowMore(false);
    setTempTableRowMore(undefined);
  };

  const [tempTableRow, setTempTableRow] = useState(undefined);
  const [openAddPaymentsDialog, setOpenAddPaymentsDialog] = useState(false);
  
  const handleClickOpenAddPaymentsDialog = (row) => {
    handleCloseMore();
    // setPayment({ ...row, eventType: "Edit", });
    setPayment({
      ...payment,
      amount: row.amountDue,
    });
    setOpenAddPaymentsDialog(true);
    setTempTableRow(row);
  };

  const handleCloseAddPaymentsDialog = () => {
    setOpenAddPaymentsDialog(false);
    setTempTableRowMore(undefined);
  };

  console.log("tempTableRow = ", tempTableRow)

  const initPayment = {
    // date: "",
    // date: new Date(),
    note: "",
    type: 4,
    amount: "",
  };
  const [payment, setPayment] = useState(initPayment);
  const [startDatePayment, setStartDatePayment] = useState(new Date());

  console.log("payment = ", payment)
  
  const handleChangeAddPaymentsDialog = (evt) => {
    // evt.persist();
    setPayment({
      ...payment,
      [evt.target.name]: evt.target.value,
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

  const editNote = () => {
    if (!editMode) {
      setEditMode(true);
    }
    // setEditMode(mode => !mode);
  }

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
    console.log("name in stringAvatar = ", name)
    return {
      sx: {
        display: "inline-flex", 
        bgcolor: "#fff",
        // color: stringToColor(name),
        color: "#001b40",
        borderColor: stringToColor(name),
        borderWidth: 2,
        borderStyle: "solid",
        fontWeight: 500,
        // width: 50,
        // height: 50,
        textTransform: "uppercase"
      },
      children: name.split(" ").length > 1 ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : `${name.slice(0, 2)}`,
    };
  }

  // const _MS_PER_DAY = 1000 * 60 * 60 * 24;

  // a and b are javascript Date objects
  // function dateDiffInDays(dueDate) {
  function dueDateFormat(dueDate) {
    // Discard the time and time-zone information.
    // return String(this.id).padStart(2, "0");
    // dueDate: "02/02/2023",dueDate: "09/01/2022",
    // const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    // const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    // const currentDate = `${String(new Date().getMonth() + 1).padStart(2, "0")}/${String(new Date().getDate()).padStart(2, "0")}/${String(new Date().getFullYear()).padStart(2, "0")}`;

    // const CurrentDateUtc = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const CurrentDateUtc = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const dueDateUtc = Date.UTC(new Date(dueDate).getFullYear(), new Date(dueDate).getMonth(), new Date(dueDate).getDate());

    // return Math.floor((dueDateUtc - CurrentDateUtc) / (1000 * 60 * 60 * 24));

    const dateDiff = Math.floor((dueDateUtc - CurrentDateUtc) / (1000 * 60 * 60 * 24));
    let string = "Due ";
    if (dateDiff === 0) {
      string += "Today";
    } else if (dateDiff < 0) {
      string += `${Math.abs(dateDiff)} days ago`;
    } else {
      string += `in ${dateDiff} days`;
    }
    return string;
  }

  // function dueDateFormat(dateDiff) {
  //   let string = "Due ";
  //   if (dateDiff === 0) {
  //     string += "Today";
  //   } else if (dateDiff < 0) {
  //     string += `${dateDiff} days ago`;
  //   } else {
  //     string += `in ${dateDiff} days`;
  //   }
  //   return string;
  // }

  // test it
  // const a = new Date("09/02/2022"),
  //     b = new Date("09/03/2022"),
  //     difference = dateDiffInDays(a, b);
  //     console.log("difference = " + difference);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiTypography variant="h2">
        {user.client.company_name}
      </SuiTypography>
      <Divider className={classes.segmentedControl_divider}>
        <Tabs
          className="bg-transparent"
          orientation={tabsOrientation}
          value={clientOverviewTabValue}
          onChange={(event, newValue) => setClientOverviewTabValue(newValue)}
        >
          {/* <Tab label="Overview" {...a11yProps(0)} component={Link} to="/dashboard" /> */}
          {/* <Tab label="Overview" {...a11yProps(0)} onClick={() => history.push(`/clients/${row.id}`)} /> */}
          <Tab label="Overview" {...a11yProps(0)} onClick={() => history.replace(`${url}`)} />
          <Tab label="Relationship" {...a11yProps(1)} onClick={() => history.replace(`${url}/relationship`)} />
        </Tabs>
      </Divider>
      <TabPanel value={clientOverviewTabValue} index={0}>
        <SuiBox mt={2} mb={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <SuiBox
                style={{
                  // border: "0.0625rem solid #dee2e6",
                  height: 273,
                  border: "1px solid #cdd4d9",
                  borderRadius: "1rem",
                  boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
                }}
                // className={classes.businessCard_view}
              >
                <SuiBox style={{ height: "6%", borderRadius: "1rem 1rem 0 0", backgroundColor: stringToColor(client_name), }} />
                <SuiBox p={1.75} style={{ display: "flex", }}>
                  <Avatar
                    // {...stringAvatar(`${client.first_name} ${client.last_name}`)}
                    {...stringAvatar(client_name)}
                    // style={{ marginRight: 10, fontWeight: 500, color: "#001b40", borderColor: "#c6854b", }}
                    style={{ marginRight: 10, fontSize: 24, width: 50, height: 50, }}
                  />
                  {/* <SuiTypography variant="button" fontWeight="regular" style={{ position: "absolute", lineHeight: "initial", fontSize: "1rem", color: "black", }}>
                    {client.firstName + client.lastName}
                  </SuiTypography> */}
                  <SuiBox style={{ display: "grid", }}>
                    <SuiTypography variant="button" fontWeight="regular" style={{ marginBottom: 10, color: "#000000", }}>
                      {/* {client.first_name + client.last_name} */}
                      {client_name}
                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", margin: "2px 0", color: "#576981", }}>
                      <Icon>email</Icon>&ensp;{users.client.email}
                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", margin: "2px 0", color: "#576981", }}>
                      <Icon>phone</Icon>&ensp;{users.client.phone_number}
                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", margin: "2px 0", color: "#576981", }}>
                      <Icon>phone</Icon>&ensp;Mobile: {users.client.mobile_phone}
                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", margin: "2px 0", color: "#576981", }}>
                      <Icon>phone</Icon>&ensp;Business: {users.client.business_phone}
                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", margin: "2px 0", color: "#576981", }}>
                      <Icon>place</Icon>&ensp;
                      <SuiBox style={{ display: "inline-grid", }}>
                        <span style={{ lineHeight: "initial", }}>{users.client.address_1}</span>
                        <span style={{ lineHeight: "initial", }}>{users.client.address_2}</span>
                        <span style={{ lineHeight: "initial", }}>{users.client.city}, {users.client.state}</span>
                        <span style={{ lineHeight: "initial", }}>{users.client.zip_code}</span>
                        <span style={{ lineHeight: "initial", }}>{users.client.country}</span>
                      </SuiBox>
                    </SuiTypography>
                  </SuiBox>
                </SuiBox>
              </SuiBox>
            </Grid>
            <Grid item xs={12} md={8}>
              <SuiBox
                className="h-100"
                style={{
                  // border: "0.0625rem solid #dee2e6",
                  border: "1px solid #cdd4d9",
                  borderRadius: "1rem",
                  boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
                }}
              >
                <ReactApexChart
                  options={apexchartState.options}
                  series={apexchartState.series}
                  type="bar"
                  height={190}
                  // height={160}
                  // height={380}
                  style={{ padding: 12, }}
                />
                <Divider className={classes.outstanding_divider} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4} style={{ textAlign: "center", }}>
                    <Icon className={classes.outstanding_icon}>history_edu</Icon>
                    <SuiTypography variant="h5">
                      $15
                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", margin: "2px 0", color: "#576981", }}>
                      in draft
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={12} md={4} style={{ textAlign: "center", }}>
                    <Icon className={classes.outstanding_icon}>timer</Icon>
                    <SuiTypography variant="h5">
                      0h 00m
                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", margin: "2px 0", color: "#576981", }}>
                      unbilled time
                    </SuiTypography>
                  </Grid>
                  <Grid item xs={12} md={4} style={{ textAlign: "center", }}>
                    <Icon className={classes.outstanding_icon}>local_pizza</Icon>
                    <SuiTypography variant="h5">
                      $0
                    </SuiTypography>
                    <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", margin: "2px 0", color: "#576981", }}>
                      unbilled expenses
                    </SuiTypography>
                  </Grid>
                </Grid>
              </SuiBox>
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox>
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="styled tabs example"
            className={classes.clientDetails_tab}
            // className={classes.tabbedLinks_track}
            // style={{
            //   left: -20,
            //   width: "103.5% !important",
            // }}
          >
            {/* const [dataTable, setDataTable] = useState(
    currentPath === "invoices" ? clientInvoiceData.invoices 
    : currentPath === "recurring-templates" ? clientRecurringTemplateData 
    : currentPath === "retainers" ? clientRetainerData 
    : currentPath === "credits" ? clientCreditsData 
    : currentPath === "expenses" ? clientExpensesData 
    : currentPath === "estimates" ? clientEstimatesProposalsData 
    : currentPath === "time-tracking" ? clientTimeEntriesData 
    : currentPath === "projects" ? clientProjectsData 
  : clientContactData); */}
            {/* <Tab label="Contacts" onClick={() => history.push(url)} />
            <Tab label="Invoices" onClick={() => history.push(`${url}/invoices`)} /> */}
            {/* <Tab label="Invoices" onClick={() => {history.push(`${url}/invoices`); setDataTable(clientInvoiceData.invoices);}} /> */}
            {/* <Tab label="Recurring Templates" onClick={() => history.push(`${url}/recurring-templates`)} />
            <Tab label="Retainer" onClick={() => history.push(`${url}/retainers`)} />
            <Tab label="Credits" onClick={() => history.push(`${url}/credits`)} />
            <Tab label="Checkout Links" onClick={() => history.push(`${url}/checkout-link-payments`)} />
            <Tab label="Expenses" onClick={() => history.push(`${url}/expenses`)} />
            <Tab label="Estimates" onClick={() => history.push(`${url}/estimates`)} />
            <Tab label="Time Tracking" onClick={() => history.push(`${url}/time-tracking`)} /> */}
            {/* <Tab label="Time Tracking" onClick={() => {history.push(`${url}/time-tracking`); setDataTable(clientTimeEntriesData);}} /> */}
            {/* <Tab label="Projects" onClick={() => history.push(`${url}/projects`)} />
            <Tab label="Reports" onClick={() => history.push(`${url}/reports `)} /> */}
            
            <Tab label="Contacts" onClick={() => changeTab("Contacts")} />
            <Tab label="Invoices" onClick={() => changeTab("Invoices")} />
            <Tab label="Recurring Templates" onClick={() => changeTab("Recurring Templates")} />
            <Tab label="Retainer" onClick={() => changeTab("Retainer")} />
            <Tab label="Credits" onClick={() => changeTab("Credits")} />
            <Tab label="Checkout Links" onClick={() => changeTab("Checkout Links")} />
            <Tab label="Expenses" onClick={() => changeTab("Expenses")} />
            <Tab label="Estimates" onClick={() => changeTab("Estimates")} />
            <Tab label="Time Tracking" onClick={() => changeTab("Time Tracking")} />
            <Tab label="Projects" onClick={() => changeTab("Projects")} />
            <Tab label="Reports" onClick={() => changeTab("Reports")} />
          </Tabs>
          {tabValue === 0 && (
            <TabPanel value={tabValue} index={0}>
              {/* {console.log("tabValue in TabPanel index 0 is = ", tabValue) } */}
              {/* {console.log("check contact id = ", contact.id !== undefined)} */}
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center", }}
                open={toastState}
                onClose={() => setToastState(false)}
                autoHideDuration={5000}
                TransitionComponent={toastTransition}
                classes={{ root: classes.actionTable_snackbar, }}
              >
                <Alert severity="success">{toastMessage}</Alert>
              </Snackbar>
              <Dialog
                open={openCreateEditDialog}
                onClose={handleCloseCreateEditDialog}
                classes={{ root: classes.actionTable_dialog, }}
              >
                <DialogContent>
                  <SuiBox style={{ marginBottom: 18, display: "flex", }}>
                    <SuiBox>
                      <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", marginBottom: 4, color: "#576981", }}>
                        First Name
                      </SuiTypography>
                      <TextField placeholder="First Name" name="first_name" value={contact.first_name} onChange={handleChangeEditDialog} />
                    </SuiBox>
                    <SuiBox ml={3}>
                      <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", marginBottom: 4, color: "#576981", }}>
                        Last Name
                      </SuiTypography>
                      <TextField placeholder="Last Name" name="last_name" value={contact.last_name} onChange={handleChangeEditDialog} />
                    </SuiBox>
                  </SuiBox>
                  <SuiBox style={{ marginBottom: 18, }}>
                    <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", marginBottom: 4, color: "#576981", }}>
                      Email
                    </SuiTypography>
                    <TextField error={errorEmail} helperText={errorEmail ? "Invalid Email Address" : ""} placeholder="Email Address" name="email" value={contact.email} onChange={handleChangeEditDialog} style={{ width: "100%", }} />
                  </SuiBox>
                  <SuiBox style={{ marginBottom: 18, display: "flex", }}>
                    <SuiBox>
                      <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", marginBottom: 4, color: "#576981", }}>
                        Phone 1
                      </SuiTypography>
                      <TextField placeholder="Phone 1" name="phone_number_1" value={contact.phone_number_1} onChange={handleChangeEditDialog} />
                    </SuiBox>
                    <SuiBox ml={3}>
                      <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", marginBottom: 4, color: "#576981", }}>
                        Phone 2
                      </SuiTypography>
                      <TextField placeholder="Phone 2" name="phone_number_2" value={contact.phone_number_2} onChange={handleChangeEditDialog} />
                    </SuiBox>
                  </SuiBox>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCreateEditDialog}>Cancel</Button>
                  <Button onClick={() => createEditContact(contact.eventType)} autoFocus>{contact.eventType}</Button>
                </DialogActions>
              </Dialog>
              <EnhancedTableToolbar
                typeTable={tabValue}
                clientCompany={user.client.company_name}
                handleCreateData={handleClickOpenCreateDialog}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
                openSelectMenu={openSelectMenu}
                handleClickSelectMenu={handleClickSelectMenu}
                anchorEl={anchorEl}
                handleCloseSelectMenu={handleCloseSelectMenu}
                handleClickOpenDialog={handleClickOpenDialog}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                deleteSelectedData={deleteSelectedData}
                // isDimmed={contact.id !== undefined}
              />
              <TableContainer>
                <Table aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    typeTable={tabValue}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    // rowCount={clientContactData.length}
                    rowCount={dataTable.length}
                    // isDimmed={contact.id !== undefined}
                  />
                  <TableBody className={classes.tableBody_tab}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                      rows.slice().sort(getComparator(order, orderBy)) */}
                    {/* {stableSort(dataTable, getComparator(order, orderBy)) */}
                    {stableSort(contacts, getComparator(order, orderBy))
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        // if (tempRowId === 0) {
                        // if (row.id !== contact.id) {
                          // console.log("row not edited is = ", JSON.stringify(row, null, 2));
                          return (
                            <StyledTooltip
                              placement="top-end"
                              key={row.id}
                              // open={true}
                              title={
                                <Fragment>
                                  <SuiBox
                                    style={{
                                      display: "flex",
                                      height: 28,
                                    }}
                                  >
                                    <Tooltip title="edit" placement="top">
                                      <SuiBox
                                        style={{
                                          padding: "0 10px",
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                          borderTopLeftRadius: 10000,
                                          borderBottomLeftRadius: 10000,
                                          fontSize: 18,
                                          borderRight: "1px solid rgb(205, 212, 217)",
                                        }}
                                        // onClick={() => setContact(row)}
                                        onClick={() => handleClickOpenEditDialog(row)}
                                      >
                                        <CreateIcon />
                                      </SuiBox>
                                    </Tooltip>
                                    <Tooltip title="delete" placement="top">
                                      <SuiBox
                                        style={{
                                          padding: "0 10px",
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                          borderTopRightRadius: 10000,
                                          borderBottomRightRadius: 10000,
                                          fontSize: 18,
                                        }}
                                        onClick={handleClickOpenDialogByRow}
                                        // onClick={() => handleClickOpenDialogByRow(row)}
                                      >
                                        <DeleteIcon />
                                      </SuiBox>
                                    </Tooltip>
                                  </SuiBox>
                                  <Dialog
                                    open={openDialogByRow}
                                    onClose={handleCloseDialogByRow}
                                    classes={{ root: classes.actionTable_dialog, }}
                                  >
                                    <DialogTitle variant="h2">
                                      Confirm
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText>
                                        Deleting contacts cannot be undone. Are you sure you want to delete this contact?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleCloseDialogByRow}>Cancel</Button>
                                      <Button onClick={() => deleteDataByRow(row)} autoFocus>OK</Button>
                                    </DialogActions>
                                  </Dialog>
                                </Fragment>
                              }
                            >
                              <TableRow
                                hover
                                // onClick={() => history.push(`/clients/${row.id}`)}
                                // onConfirm={() => history.push("/authentication/sign-in")}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                // key={row.email}
                                key={`${row.id}-${row.email}`}
                                selected={isItemSelected}
                                // style={ contact.id !== undefined ? { pointerEvents: "none", cursor: "default", opacity: .4, } : {} }
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    // checked={tempRowId === 0 ? isItemSelected : false}
                                    checked={isItemSelected}
                                    inputProps={{
                                      'aria-labelledby': labelId,
                                    }}
                                    // onClick={(event) => handleClick(event, row)}
                                    onClick={(event) => selectRow(event, row)}
                                    style={{
                                      border: "2px solid #7f8c9f",
                                      borderRadius: 5,
                                      width: 25,
                                      height: 25,
                                    }}
                                  />
                                </TableCell>
                                <TableCell onClick={() => handleClickOpenEditDialog(row)}>{`${row.first_name} ${row.last_name}`}</TableCell>
                                <TableCell onClick={() => handleClickOpenEditDialog(row)}>{row.email}</TableCell>
                                <TableCell align="right" onClick={() => handleClickOpenEditDialog(row)}>
                                {/* <TableCell onClick={() => setContact(row)}>{`${row.firstName} ${row.lastName}`}</TableCell>
                                <TableCell onClick={() => setContact(row)}>{row.email}</TableCell>
                                <TableCell align="right" onClick={() => setContact(row)}> */}
                                  {row.phone_number_1} <br/>
                                  <span style={{ fontSize: 14, color: "gray", }}>{row.phone_number_2}</span>
                                </TableCell>
                              </TableRow>
                            </StyledTooltip>
                          );
                        // } else {
                        //   return (
                        //     <TableRow key={`${row.id}-${row.email}`}>
                        //       <SuiBox
                        //         style={{
                        //           display: "flex",
                        //         }}
                        //       >
                        //         <SuiBox>
                        //           <SuiBox style={{ marginBottom: 18, display: "flex", }}>
                        //             <SuiBox>
                        //               <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", marginBottom: 4, color: "#576981", }}>
                        //                 First Name
                        //               </SuiTypography>
                        //               <TextField placeholder="First Name" value={contact.firstName} />
                        //             </SuiBox>
                        //             <SuiBox ml={3}>
                        //               <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", marginBottom: 4, color: "#576981", }}>
                        //                 Last Name
                        //               </SuiTypography>
                        //               <TextField placeholder="Last Name" value={contact.lastName} />
                        //             </SuiBox>
                        //             <SuiBox ml={3}>
                        //               <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", marginBottom: 4, color: "#576981", }}>
                        //                 Email
                        //               </SuiTypography>
                        //               <TextField placeholder="Email Address" value={contact.email} />
                        //             </SuiBox>
                        //           </SuiBox>
                        //           <SuiBox style={{ marginBottom: 18, display: "flex", }}>
                        //             <SuiBox>
                        //               <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", marginBottom: 4, color: "#576981", }}>
                        //                 Phone 1
                        //               </SuiTypography>
                        //               <TextField placeholder="Phone 1" value={contact.firstPhone} />
                        //             </SuiBox>
                        //             <SuiBox ml={3}>
                        //               <SuiTypography variant="button" fontWeight="regular" style={{ display: "block", marginBottom: 4, color: "#576981", }}>
                        //                 Phone 2
                        //               </SuiTypography>
                        //               <TextField placeholder="Phone 2" value={contact.secondPhone} />
                        //             </SuiBox>
                        //           </SuiBox>
                        //         </SuiBox>
                        //         <Button><Icon>check</Icon></Button>
                        //         <Icon>close</Icon>
                        //       </SuiBox>
                        //     </TableRow>
                        //   );
                        // }

                        
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                // rowsPerPageOptions={[5, 10, 25]}
                // count={clientContactData.length}
                // count={dataTable.length}
                // rowsPerPage={rowsPerPage}
                // page={page}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                component="div"
                page={0}
                rowsPerPage={-1}
                rowsPerPageOptions={[-1]}
                count={dataTable.length}
                onPageChange={() => { return; } }
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              />
              {/* </SuiBox> */}
            </TabPanel>
          )}
          {/* {console.log("tabValue in TabPanel index 1 is = ", tabValue) } */}
          {tabValue === 1 && (
            <TabPanel value={tabValue} index={1}>
              {/* <Dialog
                                    open={openDialogByRow}
                                    onClose={handleCloseDialogByRow}
                                    classes={{ root: classes.actionTable_dialog, }}
                                  >
                                    <DialogTitle variant="h2">
                                      Confirm
                                    </DialogTitle>
                                    <DialogContent>
                                      <DialogContentText>
                                        Deleting contacts cannot be undone. Are you sure you want to delete this contact?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleCloseDialogByRow}>Cancel</Button>
                                      <Button onClick={() => deleteDataByRow(row)} autoFocus>OK</Button>
                                    </DialogActions>
                                  </Dialog> */}
              <Dialog
                fullScreen
                open={openAddPaymentsDialog}
                onClose={handleCloseAddPaymentsDialog}
                classes={{ root: classes.addPayments_dialog, }}
              >
                <SuiBox>
                  <IconButton
                    edge="start"
                    onClick={handleCloseAddPaymentsDialog}
                  >
                    <ChevronLeftIcon />
                    <SuiTypography variant="button" fontWeight="regular">
                      Invoices
                    </SuiTypography>
                  </IconButton>
                </SuiBox>
                {tempTableRow !== undefined && (
                  // {
                  //   id: 1,
                  //   get invoiceNumber() {
                  //     return String(this.id).padStart(7, "0");
                  //   },
                  //   clientId: 2,
                  //   descriptions: [
                  //     {
                  //       name: "item 11",
                  //       description: "description of item 4",
                  //       rate: 12,
                  //       taxesId: [1, 2, 3],
                  //       quantity: 3,
                  //       get lineTotal() {
                  //         return this.rate * this.quantity;
                  //       },
                  //     },
                  //     {
                  //       name: "item 11",
                  //       description: "description of item 4",
                  //       rate: 8.43,
                  //       taxesId: [2],
                  //       quantity: 2,
                  //       get lineTotal() {
                  //         return this.rate * this.quantity;
                  //       },
                  //     },
                  //   ],
                  //   issuedDate: "09/02/2022",
                  //   dueDate: "02/02/2023",
                  //   amountDue: "52.86",
                  //   status: "Draft",
                  // },
                  // {
                  //   id: 2,
                  //   get invoiceNumber() {
                  //     return String(this.id).padStart(7, "0");
                  //   },
                  //   clientId: 1,
                  //   descriptions: [
                  //     {
                  //       name: "item -0",
                  //       description: "description of item 1",
                  //       rate: 11.75,
                  //       taxesId: [1],
                  //       quantity: 1,
                  //       get lineTotal() {
                  //         return this.rate * this.quantity;
                  //       },
                  //     },
                  //   ],
                  //   issuedDate: "08/26/2022",
                  //   dueDate: "09/01/2022",
                  //   amountDue: "11.75",
                  //   status: "Sent",
                  // },
                  <SuiBox className="bulkPaymentModal-content" ml={2.5}>
                    <SuiTypography variant="h3" fontWeight="bold">
                      Add Payments
                    </SuiTypography>
                    <Divider />
                    <SuiTypography variant="h5" fontWeight="bold" mt={6} mb={1.5}>
                      {/* {tempTableRow !== undefined && (tempTableRow.clientCompany)} */}
                      {tempTableRow.clientCompany}
                    </SuiTypography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Invoice Number</TableCell>
                            <TableCell>Payment Date</TableCell>
                            <TableCell>Internal Notes</TableCell>
                            <TableCell>Payment Type</TableCell>
                            <TableCell align="right">Amount/Currency</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            // hover
                            // onClick={() => history.push(`/clients/${row.id}`)}
                            // onConfirm={() => history.push("/authentication/sign-in")}
                            // role="checkbox"
                            // aria-checked={isItemSelected}
                            // tabIndex={-1}
                            // key={row.invoiceNumber}
                            // selected={isItemSelected}
                          >
                            <TableCell>
                              {tempTableRow.invoiceNumber}
                            </TableCell>
                            <TableCell>
                              <DatePicker
                                className="bulk-payment-date"
                                renderCustomHeader={({
                                  date,
                                  changeYear,
                                  changeMonth,
                                  decreaseMonth,
                                  increaseMonth,
                                  prevMonthButtonDisabled,
                                  nextMonthButtonDisabled,
                                }) => (
                                  <div className="custom-header-datepicker">
                                    <SuiTypography
                                      variant="button"
                                      fontWeight="bold"
                                      onClick={decreaseMonth}
                                      disabled={prevMonthButtonDisabled}
                                    >
                                      <ChevronLeftIcon />
                                    </SuiTypography>

                                    <select
                                      // value={monthsOptions[getMonth(date)]}
                                      value={monthsOptions[new Date(date).getMonth() + 0]}
                                      onChange={({ target: { value } }) =>
                                        changeMonth(monthsOptions.indexOf(value))
                                      }
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
                                    >
                                      <ChevronRightIcon />
                                    </SuiTypography>
                                  </div>
                                )}
                                selected={startDatePayment}
                                onChange={(date) => setStartDatePayment(date)}
                                placeholderText="MM/DD/YYYY"
                                customInput={<CustomInput />}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField 
                                placeholder="Type your notes here" 
                                name="note"
                                value={payment.note}
                                onChange={handleChangeAddPaymentsDialog}
                                className="bulk-payment-note"
                                style={{ width: 380, }}
                                // onChange={handleChangeEditDialog} 
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                value={payment.type}
                                onChange={handleChangeAddPaymentsDialog}
                                autoWidth
                                displayEmpty
                                className="bulk-payment-type"
                                MenuProps={{ classes: { paper: classes.menuPaper_addPayments_dialog } }}
                              >
                                <MenuItem value={0}>2Checkout</MenuItem>
                                <MenuItem value={1}>ACH</MenuItem>
                                <MenuItem value={2}>Bank Transfer</MenuItem>
                                <MenuItem value={3}>Cash</MenuItem>
                                <MenuItem value={4}>Check</MenuItem>
                                <MenuItem value={5}>Credit Card</MenuItem>
                                <MenuItem value={6}>Debit</MenuItem>
                                <MenuItem value={7}>Other</MenuItem>
                                <MenuItem value={8}>PayPal</MenuItem>
                                <MenuItem value={9}>AMEX</MenuItem>
                                <MenuItem value={10}>Diners Club</MenuItem>
                                <MenuItem value={11}>Discover</MenuItem>
                                <MenuItem value={12}>JCB</MenuItem>
                                <MenuItem value={13}>MasterCard</MenuItem>
                                <MenuItem value={14}>Visa</MenuItem>
                              </Select>
                            </TableCell>
                            <TableCell align="right" style={{ maxWidth: 170, }}>
                              {/* $24.62 USD */}
                              {/* {`$${tempTableRow.amountDue} USD`} */}
                              <TextField
                                placeholder="$0.00"
                                name="amount"
                                value={payment.amount}
                                onChange={handleChangeAddPaymentsDialog}
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                                }}
                                className="bulk-payment-amount"
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Grid className="bulk-payment-client-total" container spacing={3}>
                      <Grid item xs={9}>
                        {tempTableRow.clientCompany + " Payment Total:"}
                      </Grid>
                      <Grid item xs={3}>
                        {/* $24.62 USD */}
                        {`$${tempTableRow.amountDue} USD`}
                      </Grid>
                    </Grid>
                  </SuiBox>
                )}
                <SuiBox className="bulkPaymentModal-footer" ml={2.5} my={1.5}>
                  <SuiTypography>Notifications</SuiTypography>
                  <FormControlLabel control={<Checkbox />} label="Send clients a payment notification email" />
                  <DialogActions>
                    <Button onClick={handleCloseAddPaymentsDialog}>Cancel</Button>
                    <Button>Save</Button>
                    {/* onClick={() => deleteDataByRow(row)} */}
                  </DialogActions>
                </SuiBox>
              </Dialog>
              <StyledMenu
                anchorEl={anchorElOpenMore}
                open={Boolean(anchorElOpenMore)}
                onClose={handleCloseMore}
              >
                <MenuItem disableRipple>
                  <PrintIcon />
                  <SuiTypography variant="button" fontWeight="regular">
                    Print
                  </SuiTypography>
                </MenuItem>
                <MenuItem disableRipple>
                  <EmailIcon />
                  <SuiTypography variant="button" fontWeight="regular">
                    Send by Email
                  </SuiTypography>
                </MenuItem>
                <MenuItem disableRipple>
                  <SendIcon />
                  <SuiTypography variant="button" fontWeight="regular">
                    Mark as Sent
                  </SuiTypography>
                </MenuItem>
                <MenuItem disableRipple>
                  <DownloadIcon />
                  <SuiTypography variant="button" fontWeight="regular">
                    Download PDF
                  </SuiTypography>
                </MenuItem>
                <MenuItem disableRipple>
                  <ArchiveIcon />
                  <SuiTypography variant="button" fontWeight="regular">
                    Archive
                  </SuiTypography>
                </MenuItem>
                <MenuItem disableRipple>
                  <DeleteIcon />
                  <SuiTypography variant="button" fontWeight="regular">
                    Delete
                  </SuiTypography>
                </MenuItem>
                <MenuItem disableRipple>
                  <LinkIcon />
                  <SuiTypography variant="button" fontWeight="regular">
                    Share via Link
                  </SuiTypography>
                </MenuItem>
                {/* <NavLink to="/rtl" key="rtl" 
                // className={classes.sidenav_navlink}
                >
                  <SidenavCollapse
                    name="Print"
                    // icon={<Settings size="12px" />}
                    icon={<PrintIcon />}
                    // icon={<Icon>settings</Icon>}
                    // active={"rtl" === collapseName}
                    // noCollapse={true}
                    style={{ margin: "0px 0px 0.675rem", padding: 0 }}
                  />
                </NavLink>
                <NavLink to="/dashboard" key="payments" 
                // className={classes.sidenav_navlink}
                >
                  <SidenavCollapse
                    name="Send by Email"
                    // icon={<MdPayment size="12px" />}
                    icon={<EmailIcon />}
                    // active={"payments" === collapseName}
                    // noCollapse={true}
                    style={{ margin: "0px 0px 0.675rem", padding: 0, }}
                  />
                </NavLink> */}
              </StyledMenu>
              {/* <EnhancedTableToolbar
                typeTable={tabValue}
                // numSelected={selected.length}
                clientCompany={user.client.company_name}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
              /> */}
              <EnhancedTableToolbar
                typeTable={tabValue}
                clientCompany={user.client.company_name}
                handleCreateData={handleClickOpenCreateDialog}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
                openSelectMenu={openSelectMenu}
                handleClickSelectMenu={handleClickSelectMenu}
                anchorEl={anchorEl}
                handleCloseSelectMenu={handleCloseSelectMenu}
                handleClickOpenDialog={handleClickOpenDialog}
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                deleteSelectedData={deleteSelectedData}
                // isDimmed={contact.id !== undefined}
              />
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    typeTable={tabValue}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={Invoices.length}
                    // rowCount={dataTable.length}
                    // rowCount={clientInvoiceData.invoices.length}
                  />
                  <TableBody className={classes.tableBody_tab}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                      rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(Invoices, getComparator(order, orderBy))
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        // row.clientCompany = allClientData.find(data => data.id == row.id).company;
                        // row.clientCompany = clients.find(data => data.id == row.id).company;
                        row.clientCompany = user.client.company_name;
                        row.description = row.descriptions[0].description;
                        // console.log("row clientInvoiceData in map = ", row);

                        return (
                          <StyledTooltip
                            placement="top-end"
                            key={row.id}
                            onOpen={() => {
                              setTempTableRowMore(row);
                              setHoverTableRowMore(true);
                            }}
                            onClose={() => {
                              if (anchorElOpenMore === null) {
                                setHoverTableRowMore(false);
                                setTempTableRowMore(undefined);
                              }
                            }}
                            open={tempTableRowMore !== undefined && tempTableRowMore.id === row.id ? hoverTableRowMore : false}
                            title={
                              <Fragment>
                                <SuiBox
                                  style={{
                                    display: "flex",
                                    height: 28,
                                  }}
                                >
                                  <Tooltip title="edit" placement="top">
                                    <SuiBox
                                      style={{
                                        padding: "0 10px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        borderTopLeftRadius: 10000,
                                        borderBottomLeftRadius: 10000,
                                        fontSize: 18,
                                        borderRight: "1px solid rgb(205, 212, 217)",
                                      }}
                                      // onClick={() => handleClickOpenEditDialog(row)}
                                    >
                                      <CreateIcon />
                                    </SuiBox>
                                  </Tooltip>
                                  <Tooltip title="duplicate" placement="top">
                                    <SuiBox
                                      style={{
                                        padding: "0 10px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: 18,
                                        borderRight: "1px solid rgb(205, 212, 217)",
                                      }}
                                      // onClick={() => handleClickOpenEditDialog(row)}
                                    >
                                      <FileCopyIcon />
                                    </SuiBox>
                                  </Tooltip>
                                  <Tooltip title="add a payment" placement="top">
                                    <SuiBox
                                      style={{
                                        padding: "0 10px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        fontSize: 18,
                                        borderRight: "1px solid rgb(205, 212, 217)",
                                      }}
                                      // onClick={() => handleClickOpenEditDialog(row)}
                                      onClick={() => handleClickOpenAddPaymentsDialog(row)}
                                    >
                                      <BsCoin />
                                    </SuiBox>
                                  </Tooltip>
                                  <Tooltip title="more actions" placement="top">
                                    <SuiBox
                                      style={{
                                        padding: "0 10px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        borderTopRightRadius: 10000,
                                        borderBottomRightRadius: 10000,
                                        fontSize: 18,
                                      }}
                                      onClick={handleOpenMore}
                                    >
                                      <MoreHorizIcon />
                                    </SuiBox>
                                  </Tooltip>
                                </SuiBox>
                                <Dialog
                                  open={openDialogByRow}
                                  onClose={handleCloseDialogByRow}
                                  classes={{ root: classes.actionTable_dialog, }}
                                >
                                  <DialogTitle variant="h2">
                                    Confirm
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText>
                                      Deleting contacts cannot be undone. Are you sure you want to delete this contact?
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleCloseDialogByRow}>Cancel</Button>
                                    <Button onClick={() => deleteDataByRow(row)} autoFocus>OK</Button>
                                  </DialogActions>
                                </Dialog>
                              </Fragment>
                            }
                          >
                            <TableRow
                              hover
                              // onClick={() => history.push(`/clients/${row.id}`)}
                              // onConfirm={() => history.push("/authentication/sign-in")}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.invoiceNumber}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    'aria-labelledby': labelId,
                                  }}
                                  onClick={(event) => selectRow(event, row)}
                                  style={{
                                    border: "2px solid #7f8c9f",
                                    borderRadius: 5,
                                    width: 25,
                                    height: 25,
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                {row.clientCompany} <br/> 
                                <span style={{ fontSize: 14, color: "gray", }}>{row.invoiceNumber}</span>
                              </TableCell>
                              <TableCell style={{ verticalAlign: "baseline", }}>{row.description}</TableCell>
                              <TableCell>
                                {row.issuedDate} <br/> 
                                <span style={{ fontSize: 14, color: "gray", }}>{dueDateFormat(row.dueDate)}</span>
                              </TableCell>
                              <TableCell align="right">
                                <span style={{ color: "gray", }}>${row.amountDue}</span> <br/> 
                                <span 
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    borderRadius: 5,
                                    backgroundColor: row.status === "Draft" ? "#ccd1d9" : row.status === "Sent" ? "#ffeeb9" : "#fec6cf",
                                    padding: "4px 10px",
                                  }}
                                >
                                  {row.status}
                                </span> 
                              </TableCell>
                            </TableRow>
                          </StyledTooltip>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                page={0}
                rowsPerPage={-1}
                rowsPerPageOptions={[-1]}
                count={dataTable.length}
                onPageChange={() => { return; } }
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              />
            </TabPanel>
          )}
          {tabValue === 2 && (
            <TabPanel value={tabValue} index={2}>
              <EnhancedTableToolbar
                typeTable={tabValue}
                // numSelected={selected.length}
                clientCompany={user.client.company_name}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
              />
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    typeTable={tabValue}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={dataTable.length}
                    // rowCount={clientRecurringTemplateData.length}
                  />
                  <TableBody className={classes.tableBody_tab}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                      rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(dataTable, getComparator(order, orderBy))
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        // row.clientCompany = allClientData.find(data => data.id == row.clientId).company;
                        // row.clientCompany = clients.find(data => data.id == row.clientId).company;
                        row.clientCompany = client.company_name;
                        // row.lastIssued = clientInvoiceData.invoices.find(data => data.id == row.invoiceId).issuedDate;
                        row.lastIssued = Invoices.find(data => data.id == row.invoiceId).issuedDate;

                        return (
                          <TableRow
                            hover
                            // onClick={() => history.push(`/clients/${row.id}`)}
                            // onConfirm={() => history.push("/authentication/sign-in")}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                onClick={(event) => selectRow(event, row)}
                                style={{
                                  border: "2px solid #7f8c9f",
                                  borderRadius: 5,
                                  width: 25,
                                  height: 25,
                                }}
                              />
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline", }}>
                              {row.clientCompany}
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline", }}>
                              {/* <Link to="#" onClick={onCancelSelect}> */}
                              <Link to="#">
                                {row.lastIssued}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {row.frequency} <br/> 
                              <span style={{ fontSize: 14, color: "gray", }}>{row.duration}</span>
                            </TableCell>
                            <TableCell align="right">
                              <span style={{ color: "gray", }}>${row.amountDue}</span> <br/> 
                              <span 
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderRadius: 5,
                                  backgroundColor: row.status === "Auto-Sent" ? "#c3e6b3" : "#ccd1d9",
                                  padding: "4px 10px",
                                }}
                              >
                                {row.status}
                              </span> 
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clientRecurringTemplateData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              /> */}
              <TablePagination
                component="div"
                page={0}
                rowsPerPage={-1}
                rowsPerPageOptions={[-1]}
                count={dataTable.length}
                onPageChange={() => { return; } }
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              />
            </TabPanel>
          )}
          {tabValue === 3 && (
            <TabPanel value={tabValue} index={3}>
              <EnhancedTableToolbar
                typeTable={tabValue}
                // numSelected={selected.length}
                clientCompany={user.client.company_name}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
              />
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    typeTable={tabValue}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    // rowCount={clientRetainerData.length}
                    rowCount={dataTable.length}
                  />
                  <TableBody className={classes.tableBody_tab}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                      rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(dataTable, getComparator(order, orderBy))
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        // row.clientCompany = allClientData.find(data => data.id == row.clientId).company;
                        // // row.lastIssued = clientInvoiceData.invoices.find(data => data.id == row.invoiceId).issuedDate;

                        return (
                          <TableRow
                            hover
                            // onClick={() => history.push(`/clients/${row.id}`)}
                            // onConfirm={() => history.push("/authentication/sign-in")}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                onClick={(event) => selectRow(event, row)}
                                style={{
                                  border: "2px solid #7f8c9f",
                                  borderRadius: 5,
                                  width: 25,
                                  height: 25,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {row.clientCompany} <br/> 
                              <Link to="#" style={{ fontSize: 14, color: "#0063c1", }}>
                                {row.retainerId}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {row.nextInvoice} <br/> 
                              <span style={{ fontSize: 14, color: "gray", }}>{row.remaining}</span>
                            </TableCell>
                            <TableCell>
                              {row.fee} <br/> 
                              <span style={{ fontSize: 14, color: "gray", }}>{row.period}</span>
                            </TableCell>
                            <TableCell align="right">
                              <span style={{ color: "gray", }}>${row.totalRevenue}</span> <br/> 
                              <span 
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderRadius: 5,
                                  // backgroundColor: row.status === "Auto-Sent" ? "#c3e6b3" : "#ccd1d9",
                                  backgroundColor: "#c3e6b3",
                                  padding: "4px 10px",
                                }}
                              >
                                {row.status}
                              </span> 
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clientRetainerData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              /> */}
              <TablePagination
                component="div"
                page={0}
                rowsPerPage={-1}
                rowsPerPageOptions={[-1]}
                count={dataTable.length}
                onPageChange={() => { return; } }
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              />
            </TabPanel>
          )}
          {tabValue === 4 && (
            <TabPanel value={tabValue} index={4}>
              <EnhancedTableToolbar
                typeTable={tabValue}
                // numSelected={selected.length}
                clientCompany={user.client.company_name}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
              />
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    typeTable={tabValue}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    // rowCount={clientCreditsData.length}
                    rowCount={dataTable.length}
                  />
                  <TableBody className={classes.tableBody_tab}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                      rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(dataTable, getComparator(order, orderBy))
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        // row.description = row.descriptions[0].description;

                        return (
                          <TableRow
                            hover
                            // onClick={() => history.push(`/clients/${row.id}`)}
                            // onConfirm={() => history.push("/authentication/sign-in")}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                onClick={(event) => selectRow(event, row)}
                                style={{
                                  border: "2px solid #7f8c9f",
                                  borderRadius: 5,
                                  width: 25,
                                  height: 25,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {row.type} <br/> 
                              <span style={{ fontSize: 14, color: "gray", }}>{row.creditNumber}</span>
                            </TableCell>
                            <TableCell>
                              {row.issuedDate}
                            </TableCell>
                            <TableCell>
                              {row.description}
                            </TableCell>
                            <TableCell align="right">
                              <span style={{ color: "gray", }}>${row.amountDue}</span> <br/> 
                              <span 
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderRadius: 5,
                                  // backgroundColor: row.status === "Auto-Sent" ? "#c3e6b3" : "#ccd1d9",
                                  backgroundColor: "#ccd1d9",
                                  padding: "4px 10px",
                                }}
                              >
                                {row.status}
                              </span> 
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clientCreditsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              /> */}
              <TablePagination
                component="div"
                page={0}
                rowsPerPage={-1}
                rowsPerPageOptions={[-1]}
                count={dataTable.length}
                onPageChange={() => { return; } }
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              />
            </TabPanel>
          )}
          {tabValue === 5 && (
            <TabPanel value={tabValue} index={5}>
              <EnhancedTableToolbar
                typeTable={tabValue}
                // numSelected={selected.length}
                clientCompany={user.client.company_name}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
              />
            </TabPanel>
          )}
          {tabValue === 6 && (
            <TabPanel value={tabValue} index={6}>
              <EnhancedTableToolbar
                typeTable={tabValue}
                // numSelected={selected.length}
                clientCompany={user.client.company_name}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
              />
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    typeTable={tabValue}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    // rowCount={clientExpensesData.length}
                    rowCount={dataTable.length}
                  />
                  <TableBody className={classes.tableBody_tab}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                      rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(dataTable, getComparator(order, orderBy))
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            // onClick={() => history.push(`/clients/${row.id}`)}
                            // onConfirm={() => history.push("/authentication/sign-in")}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                onClick={(event) => selectRow(event, row)}
                                style={{
                                  border: "2px solid #7f8c9f",
                                  borderRadius: 5,
                                  width: 25,
                                  height: 25,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {row.merchant} <br/> 
                              <span style={{ fontSize: 14, color: "gray", }}>{row.category}</span>
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline", }}>
                              {row.date}
                            </TableCell>
                            <TableCell style={{ fontSize: 14, color: "gray", }}>
                              {row.description}
                            </TableCell>
                            <TableCell align="right">
                              {row.amountDue} <br/> 
                              <span style={{ fontSize: 14, color: "gray", }}>{row.totalTax}</span>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clientExpensesData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              /> */}
              <TablePagination
                component="div"
                page={0}
                rowsPerPage={-1}
                rowsPerPageOptions={[-1]}
                count={dataTable.length}
                onPageChange={() => { return; } }
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              />
            </TabPanel>
          )}
          {tabValue === 7 && (
            <TabPanel value={tabValue} index={7}>
              <EnhancedTableToolbar
                typeTable={tabValue}
                // numSelected={selected.length}
                clientCompany={user.client.company_name}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
              />
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    typeTable={tabValue}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    // rowCount={clientEstimatesProposalsData.length}
                    rowCount={dataTable.length}
                  />
                  <TableBody className={classes.tableBody_tab}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                      rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(dataTable, getComparator(order, orderBy))
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        // row.clientCompany = allClientData.find(data => data.id == row.clientId).company;
                        // row.description = row.descriptions[0].description;

                        return (
                          <TableRow
                            hover
                            // onClick={() => history.push(`/clients/${row.id}`)}
                            // onConfirm={() => history.push("/authentication/sign-in")}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                onClick={(event) => selectRow(event, row)}
                                style={{
                                  border: "2px solid #7f8c9f",
                                  borderRadius: 5,
                                  width: 25,
                                  height: 25,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              {row.clientCompany} <br/> 
                              <span style={{ fontSize: 14, color: "gray", }}>{row.estimatesProposalsNumber}</span>
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline", }}>
                              {row.description}
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline", }}>
                              {row.date}
                            </TableCell>
                            <TableCell align="right">
                              {row.amountDue} <br/> 
                              <span 
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderRadius: 5,
                                  // backgroundColor: row.status === "Auto-Sent" ? "#c3e6b3" : "#ccd1d9",
                                  backgroundColor: "#ccd1d9",
                                  padding: "4px 10px",
                                }}
                              >
                                {row.status}
                              </span> 
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clientEstimatesProposalsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              /> */}
              <TablePagination
                component="div"
                page={0}
                rowsPerPage={-1}
                rowsPerPageOptions={[-1]}
                count={dataTable.length}
                onPageChange={() => { return; } }
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              />
            </TabPanel>
          )}
          {tabValue === 8 && (
            <TabPanel value={tabValue} index={8}>
              <EnhancedTableToolbar
                typeTable={tabValue}
                // numSelected={selected.length}
                clientCompany={user.client.company_name}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
              />
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    typeTable={tabValue}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    // rowCount={clientTimeEntriesData.length}
                    rowCount={dataTable.length}
                  />
                  <TableBody className={classes.tableBody_tab}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                      rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(dataTable, getComparator(order, orderBy))
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        // row.client = allClientData.find(data => data.id == row.clientId).company;
                        // row.client = clients.find(data => data.id == row.clientId).company;
                        row.client = client.company_name;
                        let project = clientProjectsData.find(data => data.id == row.projectId);
                        row.project = project === undefined ? "—" : project.name;
                        row.service = row.service.length === 0 ? "—" : row.service;
                        console.log("row in map index 8 is = ", row);

                        return (
                          <TableRow
                            hover
                            // onClick={() => history.push(`/clients/${row.id}`)}
                            // onConfirm={() => history.push("/authentication/sign-in")}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                onClick={(event) => selectRow(event, row)}
                                style={{
                                  border: "2px solid #7f8c9f",
                                  borderRadius: 5,
                                  width: 25,
                                  height: 25,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <SuiBox style={{ display: "table-cell", verticalAlign: "middle", }}>
                                <Avatar
                                  {...stringAvatar("Zotyp Viox")}
                                  style={{ marginRight: 10, fontSize: 16, width: 40, height: 40, }}
                                  // style={{ position: "absolute", }} 
                                />
                              </SuiBox>
                              {/* <SuiBox style={{ float: "right", marginLeft: 10, }}> */}
                              <SuiBox style={{ display: "table-cell", }}>
                                Zotyp Viox <br/> 
                                <span style={{ fontSize: 14, color: "gray", }}>{row.dateTime}</span>
                              </SuiBox>
                            </TableCell>
                            <TableCell>
                              {row.client} <br/> 
                              <span style={{ fontSize: 14, color: "gray", }}>{row.project}</span>
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline", }}>
                              {row.service} <br/> 
                              {row.note.length > 0 &&
                                <span style={{ fontSize: 14, color: "gray", }}>{row.note}</span>}
                            </TableCell>
                            <TableCell align="right">
                              {row.time} <br/> 
                              <span 
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  borderRadius: 5,
                                  backgroundColor: row.status === "Unbilled" ? "#ffeeb9" : "#ccd1d9",
                                  padding: "4px 10px",
                                }}
                              >
                                {row.status}
                              </span> 
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clientTimeEntriesData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              /> */}
              <TablePagination
                component="div"
                page={0}
                rowsPerPage={-1}
                rowsPerPageOptions={[-1]}
                count={dataTable.length}
                onPageChange={() => { return; } }
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              />
            </TabPanel>
          )}
          {tabValue === 9 && (
            <TabPanel value={tabValue} index={9}>
              <EnhancedTableToolbar
                typeTable={tabValue}
                // numSelected={selected.length}
                // clientCompany={client.company}
                clientCompany={user.client.company_name}
                selectedData={selected}
                onCancelSelect={() => setSelected([])}
              />
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    typeTable={tabValue}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    // rowCount={clientProjectsData.length}
                    rowCount={dataTable.length}
                  />
                  <TableBody className={classes.tableBody_tab}>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                      rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(dataTable, getComparator(order, orderBy))
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        // row.clientCompany = allClientData.find(data => data.id == row.clientId).company;
                        // row.description = row.descriptions[0].description;
                        // {
                        //   id: 1,
                        //   name: "flat rate project",
                        //   clientId: 2,
                        //   timeEntriesId: 1,
                        //   dueDate: "Sep 10, 2022",
                        // },

                        return (
                          <TableRow
                            hover
                            // onClick={() => history.push(`/clients/${row.id}`)}
                            // onConfirm={() => history.push("/authentication/sign-in")}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                                onClick={(event) => selectRow(event, row)}
                                style={{
                                  border: "2px solid #7f8c9f",
                                  borderRadius: 5,
                                  width: 25,
                                  height: 25,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <span style={{ borderBottom: "1px dashed gray", }}>{row.name}</span>
                            </TableCell>
                            <TableCell>
                              <StyledLinearProgress variant="determinate" value={35} /> <br />
                              <span style={{ fontSize: 14, color: "gray", }}>{`2 of 4 hours`}</span>
                            </TableCell>
                            <TableCell align="right">
                              {row.dueDate}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows, }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )} */}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clientProjectsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              /> */}
              <TablePagination
                component="div"
                page={0}
                rowsPerPage={-1}
                rowsPerPageOptions={[-1]}
                count={dataTable.length}
                onPageChange={() => { return; } }
                style={{ display: "table-footer-group", }}
                className={classes.clients_pagination}
              />
            </TabPanel>
          )}
          {tabValue === 10 && (
            <TabPanel value={tabValue} index={10}>
              {/* <Typography
                variant="h5"
                component="div"
                mb={3}
              >
                
              </Typography> */}
              <SuiTypography mb={3} variant="h5">
                Reports for {client.company}
              </SuiTypography>

              <SuiBox
                style={{
                  // flexDirection: "row",
                  // flexWrap: "wrap",
                  // justifyContent: "flex-start",
                  // alignItems: "center",

                  // display: "flex",
                  // flexWrap: "wrap",
                  // flexDirection: "row",
                  // justifyContent: "flex-start",
                  // alignItems: "center",

                  display: "grid",
                  gridTemplateColumns: "repeat(2, 490px)",
                  gridTemplateRows: "repeat(3, 103px)",
                  gridColumnGap: 20,
                  gridRowGap: 12,
                }}
              >
                <SuiBox
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #cdd4d9",
                    borderRadius: 5,
                    boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
                    cursor: "pointer",
                    // marginBottom: 12,
                    // marginRight: 20,
                    // width: "50%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SuiBox
                    style={{
                      // alignSelf: "center",
                      // display: "table-cell",
                      // verticalAlign: "middle",
                    }}
                  >
                    <HiOutlineDocumentReport style={{ fontSize: 32, color: "#0063c1", }} />
                  </SuiBox>
                  <TableCell style={{ border: "unset", }}>
                    Client Account Statement <br/> 
                    <span style={{ fontSize: 14, color: "gray", }}>
                      A breakdown of {client.company}&#39;s activity over a period of time
                    </span>
                  </TableCell>
                </SuiBox>

                <SuiBox
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #cdd4d9",
                    borderRadius: 5,
                    boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
                    cursor: "pointer",
                    // marginBottom: 12,
                    // marginRight: 20,
                    // width: "50%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SuiBox
                    style={{
                      // alignSelf: "center",
                      // display: "table-cell",
                      // verticalAlign: "middle",
                    }}
                  >
                    <AiOutlineFileSearch style={{ fontSize: 32, color: "#0063c1", }} />
                  </SuiBox>
                  <TableCell style={{ border: "unset", }}>
                    Invoice Details <br/> 
                    <span style={{ fontSize: 14, color: "gray", }}>
                      A summary of the invoices you&#39;ve sent over a period of time
                    </span>
                  </TableCell>
                </SuiBox>

                {/* <br/> */}
                <SuiBox
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #cdd4d9",
                    borderRadius: 5,
                    boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
                    cursor: "pointer",
                    // marginBottom: 12,
                    // marginRight: 20,
                    // width: "50%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                {/* <Grid item xs={5}
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #cdd4d9",
                    borderRadius: 5,
                    boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
                    cursor: "pointer",
                    marginBottom: 12,
                    marginRight: 20,
                    // width: "50%",
                    // display: "flex",
                  }}
                > */}
                  <SuiBox
                    style={{
                      // padding: 0,
                      // display: "table-cell",
                      // verticalAlign: "middle",
                    }}
                  >
                    <FaUserTie style={{ fontSize: 32, color: "#0063c1", }} />
                  </SuiBox>
                  <TableCell style={{ border: "unset", }}>
                    Revenue by Client <br/> 
                    <span style={{ fontSize: 14, color: "gray", }}>
                      A breakdown of how much revenue {client.company} is bringing in
                    </span>
                  </TableCell>
                </SuiBox>
                {/* </Grid> */}

                {/* <Grid container spacing={3}>
              <Grid item xs={12} md={4}></Grid> */}

                <SuiBox
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #cdd4d9",
                    borderRadius: 5,
                    boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
                    cursor: "pointer",
                    // marginBottom: 12,
                    // marginRight: 20,
                    // width: "50%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                {/* <Grid item xs={5}
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #cdd4d9",
                    borderRadius: 5,
                    boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
                    cursor: "pointer",
                    marginBottom: 12,
                    marginRight: 20,
                    // width: "50%",
                    // display: "flex",
                  }}
                > */}
                  <SuiBox
                    style={{
                      // alignSelf: "center",
                      // display: "table-cell",
                      // verticalAlign: "middle",
                      // float: "left",
                    }}
                  >
                    <FcMoneyTransfer style={{ fontSize: 32, color: "#0063c1", }} />
                  </SuiBox>
                  <TableCell style={{ border: "unset", }}>
                    Payments Collected <br/> 
                    <span style={{ fontSize: 14, color: "gray", }}>
                      Payments you have collected over a period of time
                    </span>
                  </TableCell>
                </SuiBox>
                {/* </Grid> */}

                <SuiBox
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #cdd4d9",
                    borderRadius: 5,
                    boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SuiBox
                    style={{
                      // display: "table-cell",
                      // verticalAlign: "middle",
                    }}
                  >
                    <TimerOutlinedIcon
                      style={{ color: "#0063c1", }}
                      ref={element => {
                        if (element) {
                          element.style.setProperty('font-size', '32px', 'important');
                        }
                      }}
                    />
                  </SuiBox>
                  <TableCell style={{ border: "unset", }}>
                    Time Entry Details <br/> 
                    <span style={{ fontSize: 14, color: "gray", }}>
                      A summary of how much time your team tracked
                    </span>
                  </TableCell>
                </SuiBox>

                <SuiBox
                  style={{
                    padding: "12px 20px",
                    border: "1px solid #cdd4d9",
                    borderRadius: 5,
                    boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SuiBox
                    style={{
                      // display: "table-cell",
                      // verticalAlign: "middle",
                    }}
                  >
                    <AiOutlineFileSync style={{ fontSize: 32, color: "#0063c1", }} />
                  </SuiBox>
                  <TableCell style={{ border: "unset", }}>
                    Retainer Summary <br/> 
                    <span style={{ fontSize: 14, color: "gray", }}>
                      A detailed work summary for your retainer clients
                    </span>
                  </TableCell>
                </SuiBox>

                

              </SuiBox>
              
                

            </TabPanel>
          )}
        </SuiBox>
      </TabPanel>
      <TabPanel value={clientOverviewTabValue} index={1}>
        <SuiTypography mt={0.5} variant="h5">
          Relationship
        </SuiTypography>
        <SuiBox mt={1} onClick={editNote} style={{ cursor: "pointer", }}>
          {!editMode ? (
            <SuiTypography variant="button" fontWeight="regular">
              <CreateIcon className={classes.editNote_icon} />
              Add notes here (they will not be visible to your client).
            </SuiTypography>
          ) : (
            <OutlinedInput
              autoFocus
              className={classes.editNote_input}
              placeholder="Add notes here"
            />
          )}
        </SuiBox>
      </TabPanel>
    </DashboardLayout>
  );
}

export default ClientsDetails;
