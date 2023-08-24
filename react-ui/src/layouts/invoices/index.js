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
import {
  Link,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import {
  // Grid,
  Tabs,
  Tab,
  // Avatar,
  // Icon,
  // Card,
  Typography,
  // Box,
  // Chip,
  // Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Toolbar,
  Button,
  // IconButton,
  Tooltip,
  Snackbar,
  Slide,
  // Alert,
  Alert as MuiAlert,
  // Select,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TableContainer,
  TablePagination
} from "@mui/material";

import { tooltipClasses } from '@mui/material/Tooltip';

import { alpha, styled } from '@mui/material/styles';

import {
  // Add as AddIcon,
  Delete as DeleteIcon,
  // FilterList as FilterListIcon,
  Create as CreateIcon,
  // Archive as ArchiveIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

// import { visuallyHidden } from '@mui/utils';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React example components
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Invoices page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
// import BillingInformation from "layouts/billing/components/BillingInformation";
// import Transactions from "layouts/billing/components/Transactions";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// import './styles.scss';
import styles from "layouts/invoices/styles";

import { AuthContext } from "../../auth-context/auth.context";
import AuthApi from "../../api/auth";
import ActionsApi from "../../api/actions";

import countries from "country-json/src/country-by-abbreviation";
import country_to_currency from "country-to-currency";


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
//         // <Box sx={{ p: 3 }}>
//         //   <Typography>{children}</Typography>
//         // </Box>
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
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

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    numInvoices,
    // rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const customClass = styles();

  return (
    <TableHead className={customClass.enhancedTable_head}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            // checked={rowCount > 0 && numSelected === rowCount}
            checked={numSelected === numInvoices && numSelected !== 0}
            onChange={onSelectAllClick}
            // inputProps={{
            //   'aria-label': 'select all desserts',
            // }}
          />
        </TableCell>
        {/* {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === "note" ? (headCell.label)
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
        ))} */}
        <TableCell>
          <TableSortLabel
            active={orderBy === "client"}
            direction={orderBy === "client" ? order : 'asc'}
            onClick={createSortHandler("client")}
          >
            Client
          </TableSortLabel>/
          <TableSortLabel
            active={orderBy === "number"}
            direction={orderBy === "number" ? order : 'asc'}
            onClick={createSortHandler("number")}
          >
            Invoice Number
          </TableSortLabel>
        </TableCell>
        {/* <TableCell>Internal Note</TableCell> */}
        <TableCell>
          <TableSortLabel
            active={orderBy === "description"}
            direction={orderBy === "description" ? order : 'asc'}
            onClick={createSortHandler("description")}
          >
            Description
          </TableSortLabel>
        </TableCell>
        <TableCell align="right">
          {/* <TableSortLabel
            active={orderBy === "credit"}
            direction={orderBy === "credit" ? order : 'asc'}
            onClick={createSortHandler("credit")}
          >
            Credit
          </TableSortLabel> */}
          <TableSortLabel
            active={orderBy === "issuedDate"}
            direction={orderBy === "issuedDate" ? order : 'asc'}
            onClick={createSortHandler("issuedDate")}
          >
            Issued Date
          </TableSortLabel>/
          <TableSortLabel
            active={orderBy === "dueDate"}
            direction={orderBy === "dueDate" ? order : 'asc'}
            onClick={createSortHandler("dueDate")}
          >
            Due Date
          </TableSortLabel>
        </TableCell>
        <TableCell>
          {/* <TableSortLabel
            active={orderBy === "total"}
            direction={orderBy === "total" ? order : 'asc'}
            onClick={createSortHandler("total")}
          >
            Total Outstanding
          </TableSortLabel> */}
          <TableSortLabel
            active={orderBy === "amount"}
            direction={orderBy === "amount" ? order : 'asc'}
            onClick={createSortHandler("amount")}
          >
            Amount
          </TableSortLabel>/
          <TableSortLabel
            active={orderBy === "status"}
            direction={orderBy === "status" ? order : 'asc'}
            onClick={createSortHandler("status")}
          >
            Status
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  numInvoices: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
};

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
    padding: 0,
    borderRadius: 6,
    marginTop: theme.spacing(1),
    // minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    // '& .MuiMenu-list': {
    //   padding: '4px 0',
    // },
    '& .MuiMenuItem-root': {
      fontSize: 16,
      '& .MuiSvgIcon-root': {
        // fontSize: 18,
        fontSize: "20px !important",
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
    selectedData,
    onCancelSelect,
    openSelectMenu,
    handleClickSelectMenu,
    anchorEl,
    handleCloseSelectMenu,
    handleClickOpenDialog,
    // user,
    // setUser,
    // Clients,
    // Invoices,
  } = props;
  const { url } = useRouteMatch();
  const history = useHistory();
  const customClass = styles();

  return (
    <Toolbar
      className={customClass.enhancedTable_toolbar}
      sx={{
        // pl: { sm: 2 },
        // pr: { xs: 1, sm: 1 },
        ...(selectedData.length > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
      style={{
        display: "unset",
      }}
    >
      {/* {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}

      <SuiBox
        px={1.25}
        pb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {selectedData.length > 0 ? (
          <SuiBox>
            <Typography
              variant="h5"
              id="tableTitle"
              component="div"
              style={{
                display: "inline-block",
              }}
            >
              <Link to="#" onClick={onCancelSelect}>Invoices</Link>
              <ChevronRightIcon /> Selected
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
              {selectedData.length === 1 &&
                <MenuItem onClick={() => {
                  
                  // <ProtectedRoute path="/invoices/edit/:invoice_id" key="invoices-edit"></ProtectedRoute>
                  // history.push(`${url}/edit/${selectedData[0].id}`);
                  // let new_user = {...user};
                  // // const clientById = Clients[Clients.findIndex(client => client.id == row.client_id)];
                  // new_user.client = JSON.stringify(selectedData[0]);
                  // setUser(new_user);
                  // localStorage.setItem("user", new_user);
                  // history.push(`${url}/${selectedData[0].id}/edit`);
                  const {id} = selectedData[0];
                  // const invoice = Invoices[Invoices.findIndex(invoice => invoice.id == id)];
                  history.push({
                    pathname: `${url}/${id}/edit`,
                    // state: {
                    //   allInvoices: Invoices,
                    //   allClients: Clients,
                    //   // invoice,
                    //   // client: Clients[Clients.findIndex(client => client.id == invoice.client_id)],
                    // }
                  });
                }} disableRipple>
                  <EditIcon /> Edit
                </MenuItem>
              }
              {/* <MenuItem disableRipple>
                <ArchiveIcon /> Archive
              </MenuItem> */}
              <MenuItem onClick={handleClickOpenDialog} disableRipple>
                <DeleteIcon /> Delete
              </MenuItem>
            </StyledMenu>
          </SuiBox>
        ) : (
          <SuiTypography variant="h4" fontWeight="medium" textTransform="capitalize">
            All Invoices
          </SuiTypography>
        )}
        {/* <SuiBox display="flex" alignItems="flex-start"> */}
        <SuiBox display="flex">
          <SuiInput
            placeholder="Search"
            withIcon={{ icon: "search", direction: "left" }}
            // customClass={classes.navbar_input}
          />
        </SuiBox>
      </SuiBox>

      {/* {selectedData.length > 0 ? (
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
            <MenuItem disableRipple>
              <EditIcon /> Edit
            </MenuItem>
            <MenuItem disableRipple>
              <ArchiveIcon /> Archive
            </MenuItem>
            <MenuItem onClick={handleClickOpenDialog} disableRipple>
              <DeleteIcon /> Delete
            </MenuItem>
          </StyledMenu>
        </>
      ) : (
        <>
          <Typography
            variant="h5"
            id="tableTitle"
            component="div"
          >
            Invoices
          </Typography>
        </>
      )} */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  selectedData: PropTypes.array.isRequired,
  onCancelSelect: PropTypes.func.isRequired,
  openSelectMenu: PropTypes.bool,
  handleClickSelectMenu: PropTypes.func,
  anchorEl: PropTypes.object,
  handleCloseSelectMenu: PropTypes.func,
  handleClickOpenDialog: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
  Clients: PropTypes.array,
  Invoices: PropTypes.array,
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

function Invoices() {
  const classes = styles();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  // const [tabValue, setTabValue] = useState(false);
  // const [typeValue, setTypeValue] = useState(0);
  // const [parentHover, setParentHover] = useState(false);
  // const [childHover, setChildHover] = useState(false);
  // const [isShown, showRecent] = useState(true);

  // let total = Number(0).toFixed(2);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('organization');
  const [selected, setSelected] = useState([]);
  const rowsPerPageOptions = [2, 5, 10, 25, 50];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { user, setUser } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const history = useHistory();
  const splitCurrentURL = history.location.pathname.split("/");
  const currentPath = splitCurrentURL[splitCurrentURL.length - 1];
  const userLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;

  const [tabValue, setTabValue] = useState(
    currentPath === "overdue" ? 1 
    : currentPath === "outstanding" ? 2 
    : currentPath === "draft" ? 3 
  : 0);

  const countryISOCode = countries[countries.findIndex(data => data.country === user.business.country)].abbreviation;
  const currencyCode = country_to_currency[String(countryISOCode)];

  const amountFormat = (value) => {
    return new Intl.NumberFormat(userLocale, {
      style: "currency",
      currency: currencyCode,
      // maximumFractionDigits: 0,
      // minimumFractionDigits: 0,
    }).format(value);
  };

  const [Clients, setClients] = useState([]);
  const [Invoices, setInvoices] = useState([]);
  const [sortedInvoices, setSortedInvoices] = useState([]);
  // const sortedClients = stableSort(Clients, getComparator(order, orderBy), page).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  console.log("Clients = ", Clients)
  console.log("Invoices = ", Invoices)
  console.log("sortedInvoices = ", sortedInvoices)
  // console.log("order = ", order);
  // console.log("orderBy = ", orderBy);
  // console.log("is hiding pagination = ", Invoices.length <= rowsPerPage);
  console.log("selected = ", selected)
  // console.log("page = ", page)
  // console.log("rowsPerPage = ", rowsPerPage)

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
      let clients_response = await ActionsApi.GetClients({token: user.token.access}, {business_id: user.business.id});
      console.log("clients_response parent response = ", clients_response);

      setClients(clients_response.data);
      // const newSortedClients = stableSort(clients_response.data, getComparator(order, orderBy));
      // setSortedClients(newSortedClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    } catch (err) {
      console.log(err);
    }
  };

  const InitInvoices = async () => {
    try {
      let invoices_response = await ActionsApi.GetInvoices({token: user.token.access}, {business_id: user.business.id});
      console.log("invoices_response parent response = ", invoices_response);

      setInvoices(invoices_response.data);
      const newSortedInvoices = stableSort(invoices_response.data, getComparator(order, orderBy));
      setSortedInvoices(newSortedInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    Promise.all([TokenValidation()])
    .then(async () => {
      console.log("isTokenValid promise then = ", isTokenValid)
      if (isTokenValid) {
        await InitClients();
        await InitInvoices();
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    const newSortedInvoices = stableSort(sortedInvoices, getComparator(isAsc ? 'desc' : 'asc', property));
    setSortedInvoices(newSortedInvoices);
    if (sortedInvoices.length > 1) {
      let newInvoices = [];
      for (let index = 0; index < Invoices.length; index++) {
        if (index >= page * rowsPerPage && index < page * rowsPerPage + rowsPerPage)
          newInvoices.push(newSortedInvoices[index]);
        else
          newInvoices.push(Invoices[index]);
      }
      setInvoices(newInvoices);
    }
    if (selected.length === sortedInvoices.length)
      setSelected(newSortedInvoices);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(sortedInvoices);
      return;
    }
    setSelected([]);
  };

  const selectRow = (event, row) => {
    event.stopPropagation();
    const selectedIndex = selected.findIndex(invoice => invoice.id == row.id);
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

  const handleChangePage = (event, newPage) => {
    setSortedInvoices(Invoices.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage));
    setPage(newPage);
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    let newRowsPerPage = parseInt(event.target.value, 10);
    setSortedInvoices(Invoices.slice(0, newRowsPerPage));
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setSelected([]);
  };

  const isSelected = (row) => selected.findIndex(invoice => invoice.id == row.id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Invoices.length) : 0;

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

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  // const handleSetTypeValue = (event, newValue) => setTypeValue(newValue);
  // const handleSetParentHover = param => event => {
  //   event.persist();
  //   setParentHover(param);
  // };
  // const handleSetChildHover = () => setChildHover(visible => !visible);
  // const handleShowRecent = () => {
  //   showRecent(visible => !visible);
  //   setParentHover(false);
  //   setChildHover(false);
  // }

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

  const deleteSelectedData = async () => {
    TokenValidation();
    try {
      let token = user.token.access, data = selected, message;
      if (selected.length === 1) {
        message = `The selected invoice has been deleted.`;
      } else if (selected.length >= 2) {
        message = `The selected ${selected.length} invoices have been deleted.`;
      }
      let response = await ActionsApi.DeleteInvoices({ token, data });
      console.log("response of DeleteInvoices = ", response);

      let newInvoices = [...Invoices];
      selected.forEach(data => {
        newInvoices = newInvoices.filter(invoice => {
          return invoice.id !== data.id;
        });
      });
      setInvoices(newInvoices);
      setSortedInvoices(newInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
      setSelected([]);
      handleCloseDialog();
      showToast(message);
    } catch (err) {
      console.log(err);
    }
  };

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

  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [openDialogByRow, setOpenDialogByRow] = useState(false);
  const handleClickOpenDialogByRow = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenDialogByRow(true);
  };

  const handleCloseDialogByRow = () => {
    setOpenDialogByRow(false);
    setSelectedInvoice({});
  };

  console.log("selectedInvoice = ", selectedInvoice);

  const deleteDataByRow = async () => {
    TokenValidation();
    try {
      let token = user.token.access, data = [selectedInvoice];
      let response = await ActionsApi.DeleteInvoices({ token, data });
      console.log("response of DeleteInvoices = ", response);

      let newInvoices = [...Invoices];
      newInvoices.splice(newInvoices.findIndex(invoice => invoice.id === selectedInvoice.id), 1);
      setInvoices(newInvoices);
      setSortedInvoices(newInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
      let newSelected = [...selected];
      let selectRowIndex = newSelected.findIndex(invoice => invoice.id === selectedInvoice.id);
      if (selectRowIndex !== -1) {
        newSelected.splice(selectRowIndex, 1);
        setSelected(newSelected);
      }
      handleCloseDialogByRow();
      showToast(`The selected invoice has been deleted.`)
    } catch (err) {
      console.log(err);
    }
  };

  // const TableContainer = forwardRef(function TableContainer(props, ref) {
  //   return <TableContainer ref={ref} {...props} style={{ borderRadius: 0, }} />;
  // });

  function currencyFormat(value) {
    return new Intl.NumberFormat(`en-${countryISOCode}`, {
      style: "currency",
      currency: user.business.base_currency.split(" — ")[0],
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(value);
  }

  function currencyDecimalFormat(value) {
    // return `$${Number(value).toFixed(2)} USD`;
    return new Intl.NumberFormat(`en-${countryISOCode}`, {
      style: "currency",
      currency: user.business.base_currency.split(" — ")[0],
      minimumFractionDigits: 2,
    }).format(value);
  }

  // console.log("history location pathname = ", history.location.pathname);
  // console.log("url useRouteMatch = ", url);

  function changeTab(type) {
    if (type === "overdue") {
      if (history.location.pathname === url) {
        history.push(`${url}/overdue`);
      } else {
        history.push(url);
      }
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar
        Clients={Clients}
        Invoices={Invoices}
      />
      {/* <DashboardNavbar data={allClientData} /> */}
      <Tabs
        orientation={tabsOrientation}
        value={tabValue}
        onChange={handleSetTabValue}
        // className="bg-transparent"
        // className={`bg-transparent ${classes.currency_tab}`}
        className={classes.currency_tab}
      >
        <Tab label={
          <Fragment>
            <span>{currencyFormat(0)}</span>
            <span>overdue</span>
          </Fragment>
        } {...a11yProps(0)} onClick={() => changeTab("overdue")} />
        <Tab label={
          <Fragment>
            <span>{currencyFormat(0)}</span>
            <span>total outstanding</span>
          </Fragment>
        } {...a11yProps(1)} />
        <Tab label={
          <Fragment>
            <span>{currencyFormat(0)}</span>
            <span>in draft</span>
          </Fragment>
        } {...a11yProps(2)} />
      </Tabs>
        {/* <TabPanel value={typeValue} index={0}> */}
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
            open={openDialog}
            onClose={handleCloseDialog}
            classes={{ root: classes.actionTable_dialog, }}
          >
            <DialogTitle variant="h2">
              Confirm
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete {selected.length === 1 ? "this invoice" : selected.length + " invoices"} ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={deleteSelectedData}>OK</Button>
            </DialogActions>
          </Dialog>
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
                Are you sure you want to delete this invoice ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialogByRow}>Cancel</Button>
              <Button onClick={deleteDataByRow}>OK</Button>
            </DialogActions>
          </Dialog>
          <SuiBox my={5}>
            {/* <SuiBox display="flex" justifyContent="space-between" alignItems="center">
              <SuiTypography variant="h4" fontWeight="medium" textTransform="capitalize"> */}
                {/* Your Transaction&apos;s */}
                {/* All Invoices
              </SuiTypography>
              <SuiBox display="flex" alignItems="flex-start">
                <SuiInput
                  placeholder="Search"
                  withIcon={{ icon: "search", direction: "left" }}
                  // customClass={classes.navbar_input}
                /> */}
                {/* <SuiBox color="text" mr={0.5} lineHeight={0}>
                  <Icon color="inherit" fontSize="small">
                    date_range
                  </Icon>
                </SuiBox>
                <SuiTypography variant="button" textColor="text" fontWeight="regular">
                  23 - 30 March 2020
                </SuiTypography> */}
              {/* </SuiBox>
            </SuiBox> */}
            <EnhancedTableToolbar
              selectedData={selected}
              onCancelSelect={() => setSelected([])}
              openSelectMenu={openSelectMenu}
              handleClickSelectMenu={handleClickSelectMenu}
              anchorEl={anchorEl}
              handleCloseSelectMenu={handleCloseSelectMenu}
              handleClickOpenDialog={handleClickOpenDialog}
              user={user}
              setUser={setUser}
              Clients={Clients}
              Invoices={Invoices}
            />
            <TableContainer style={{ borderRadius: 0, }}>
              <Table>
                <EnhancedTableHead
                  numSelected={selected.length}
                  numInvoices={sortedInvoices.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  // rowCount={Invoices.length}
                />
                <TableBody className={classes.tableBody_tab}>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                    rows.slice().sort(getComparator(order, orderBy)) */}
                  {
                  sortedInvoices
                  // Invoices
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      // let decimalTotal = parseFloat(row.total).toFixed(2);
                      // total = (parseFloat(total) + parseFloat(decimalTotal)).toFixed(2);

                      // row.organization = row.company_name;
                      // row.primary = `${row.first_name} ${row.last_name}`;
                      // const clientById = Clients[Clients.findIndex(client => client.id == row.client_id)];
                      // console.log("idx = ",Clients.findIndex(client => client.id == row.client_id))
                      // console.log("clientById = ",clientById)

                      // row.client = clientById.company_name;

                      const clientById = Clients[Clients.findIndex(client => client.id == row.client_id)];
                      console.log("clientById = ",clientById)
                      
                      // row.client = clientById.company_name;
                      row.client = clientById.company_name.length === 0 ? `${clientById.first_name} ${clientById.last_name}` : clientById.company_name;
                      row.description = "";
                      row.issuedDate = row.issued_date;
                      row.dueDate = row.due_date;
                      row.issuedDate = row.issued_date;

                      return (
                        <StyledTooltip
                          placement="top-end"
                          key={`${row.id} — ${row.email}`}
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
                                    onClick={() => {
                                      // history.push(`${url}/${row.id}/edit`);
                                      // const invoice = Invoices[Invoices.findIndex(invoice => invoice.id == row.id)];
                                      history.push({
                                        pathname: `${url}/${row.id}/edit`,
                                        // state: {
                                        //   allInvoices: Invoices,
                                        //   allClients: Clients,
                                        //   // invoice,
                                        //   // client: Clients[Clients.findIndex(client => client.id == invoice.client_id)],
                                        // }
                                      });
                                    }}
                                    // onClick={() => handleClickOpenEditDialog(row)}
                                  >
                                    <CreateIcon />
                                  </SuiBox>
                                </Tooltip>
                                {/* <Tooltip title="archive" placement="top">
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
                                    <ArchiveIcon />
                                  </SuiBox>
                                </Tooltip> */}
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
                                    onClick={() => handleClickOpenDialogByRow(row)}
                                  >
                                    <DeleteIcon />
                                  </SuiBox>
                                </Tooltip>
                              </SuiBox>
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
                                    Are you sure you want to delete {row.organization}?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCloseDialogByRow}>Cancel</Button>
                                  <Button onClick={() => deleteDataByRow(row)}>OK</Button>
                                </DialogActions>
                              </Dialog> */}
                            </Fragment>
                          }
                        >
                          <TableRow
                            hover
                            // onClick={() => history.push(`/clients/${row.id}`)}
                            onClick={() => {
                              // let user = JSON.parse(localStorage.getItem("user"));

                              // let new_user = {...JSON.parse(localStorage.getItem("user")), client: Clients[Clients.findIndex(client => client.id == row.id)]};
                              // new_user = JSON.stringify(new_user);
                              // setUser(new_user);
                              // localStorage.setItem("user", new_user);
                              // history.push(`/clients/${row.id}`);

                              // let [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
                              // let new_user = {...user, ...refresh_response.data};
                              // new_user = JSON.stringify(new_user);
                              // setUser(new_user);
                              // localStorage.setItem("user", new_user);
                            }}
                            // onConfirm={() => history.push("/authentication/sign-in")}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={`${row.id} — ${row.number} — ${row.client}`}
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
                              />
                            </TableCell>
                            <TableCell
                              // component="th"
                              id={labelId}
                              // scope="row"
                              padding="none"
                              // rowSpan={2}
                              style={{
                                lineHeight: "normal",
                              }}
                            >
                              {row.client} <br/>
                              <span style={{ fontSize: 14, color: "gray", }}>{row.number}</span>
                            </TableCell>
                            <TableCell style={{ verticalAlign: "baseline", }}>{row.description}</TableCell>
                            <TableCell
                              // component="th"
                              id={labelId}
                              // scope="row"
                              padding="none"
                              // rowSpan={2}
                              style={{
                                lineHeight: "normal",
                              }}
                              align="right"
                            >
                              {row.issuedDate} <br/>
                              <span style={{ fontSize: 14, color: "gray", }}>{row.dueDate}</span>
                            </TableCell>
                            {/* <TableCell align="right" style={{ verticalAlign: "baseline", }}>{currencyDecimalFormat(row.amount)}</TableCell>
                            <TableCell align="right">{currencyDecimalFormat(row.status)}</TableCell> */}
                            <TableCell align="right">
                              <span style={{ color: "gray", }}>{amountFormat(row.amount)}</span> <br/> 
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
                    <TableRow style={{ height: 33 * emptyRows, }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>
              </Table>
            </TableContainer>
            {Invoices.length !== 0 && (
              <SuiBox
                py={2}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  backgroundColor: "#f3f4f6",
                  color: "#000000DE",
                  borderBottom: "0.0625rem solid #cdd4d9",
                }}
              >
                <TableCell style={{ border: "unset", padding: "6px 10px", }}>
                  {/* Total Outstanding: {currencyDecimalFormat(total)} */}
                  Total Outstanding: {currencyDecimalFormat(0)}
                </TableCell>
              </SuiBox>
            )}
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={Invoices.length}
              rowsPerPage={rowsPerPage}
              labelDisplayedRows={({ from, count }) => `Page ${from} of ${count}`}
              labelRowsPerPage={"Items per page :"}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              // className={classes.clients_pagination}
              sx={{
                // display: "table-footer-group",
                mt: 3,
                "& .MuiToolbar-root.MuiTablePagination-toolbar": {
                  padding: 0,
                  "& .MuiTablePagination-spacer": {
                    flex: "unset",
                  },
                  "& .MuiInputBase-root.MuiTablePagination-input.MuiSelect-root": {
                    width: "unset !important",
                  },
                  "& .MuiInputBase-root": {
                    width: "auto !important",
                    padding: "0 0.75rem",
                    fontSize: "1rem !important",
                    border: "2px solid #7f8c9f",
                    borderRadius: "5px",
                    "& .MuiSelect-select.MuiTablePagination-select.MuiInputBase-input": {
                      textAlign: "left",
                      textAlignLast: "left",
                      minWidth: "unset",
                      padding: "0.5rem 0.75rem !important",
                    },
                    "& .MuiSvgIcon-root.MuiSelect-icon.MuiTablePagination-selectIcon": {
                      display: "inline-block",
                      fontSize: "1.5rem !important",
                    },
                  },
                  "& .MuiTablePagination-displayedRows": {
                    marginLeft: "auto",
                    fontWeight: 500,
                  },
                  "& .MuiTablePagination-actions": {
                    ...(Invoices.length <= rowsPerPage && { display: "none", }),
                  },
                },
              }}
            />
          </SuiBox>
        {/* </TabPanel>
        <TabPanel value={typeValue} index={1}>
          Item Two
        </TabPanel> */}
      {/* </SuiBox> */}
      

      {/* <SuiTypography variant="h1" fontWeight="medium">
        Projects
      </SuiTypography> */}

      {/* <SuiBox mt={4}>
        <SuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </SuiBox>
        <SuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </SuiBox>
      </SuiBox> */}
    </DashboardLayout>
  );
}

export default Invoices;
