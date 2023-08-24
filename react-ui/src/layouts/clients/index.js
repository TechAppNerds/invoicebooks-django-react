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

// Clients page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
// import BillingInformation from "layouts/billing/components/BillingInformation";
// import Transactions from "layouts/billing/components/Transactions";

// Soft UI Dashboard PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// import './styles.scss';
import styles from "layouts/clients/styles";

import { AuthContext } from "../../auth-context/auth.context";
import AuthApi from "../../api/auth";
import ActionsApi from "../../api/actions";

import countries from "country-json/src/country-by-abbreviation";


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
    numClients,
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
            checked={numSelected === numClients && numSelected !== 0}
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
            active={orderBy === "organization"}
            direction={orderBy === "organization" ? order : 'asc'}
            onClick={createSortHandler("organization")}
          >
            Organization
          </TableSortLabel>/
          <TableSortLabel
            active={orderBy === "primary"}
            direction={orderBy === "primary" ? order : 'asc'}
            onClick={createSortHandler("primary")}
          >
            Primary Contact
          </TableSortLabel>
        </TableCell>
        <TableCell>Internal Note</TableCell>
        <TableCell align="right">
          <TableSortLabel
            active={orderBy === "credit"}
            direction={orderBy === "credit" ? order : 'asc'}
            onClick={createSortHandler("credit")}
          >
            Credit
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            active={orderBy === "total"}
            direction={orderBy === "total" ? order : 'asc'}
            onClick={createSortHandler("total")}
          >
            Total Outstanding
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  numClients: PropTypes.number.isRequired,
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
    Clients,
    selectedData,
    onCancelSelect,
    openSelectMenu,
    handleClickSelectMenu,
    anchorEl,
    handleCloseSelectMenu,
    handleClickOpenDialog,
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
              <Link to="#" onClick={onCancelSelect}>Clients</Link>
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
                  // history.push(`${url}/${selectedData[0].id}/edit`);
                  history.push({
                    pathname: `${url}/${selectedData[0].id}/edit`,
                    state: {
                      client: Clients[Clients.findIndex(client => client.id == selectedData[0].id)],
                    }
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
            All Clients
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
            Clients
          </Typography>
        </>
      )} */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  Clients: PropTypes.array.isRequired,
  selectedData: PropTypes.array.isRequired,
  onCancelSelect: PropTypes.func.isRequired,
  openSelectMenu: PropTypes.bool,
  handleClickSelectMenu: PropTypes.func,
  anchorEl: PropTypes.object,
  handleCloseSelectMenu: PropTypes.func,
  handleClickOpenDialog: PropTypes.func,
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

function Clients() {
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

  const [tabValue, setTabValue] = useState(
    currentPath === "overdue" ? 1 
    : currentPath === "outstanding" ? 2 
    : currentPath === "draft" ? 3 
  : 0);

  const countryISOCode = countries[countries.findIndex(data => data.country === user.business.country)].abbreviation;

  const [Clients, setClients] = useState([]);
  const [sortedClients, setSortedClients] = useState([]);
  // const sortedClients = stableSort(Clients, getComparator(order, orderBy), page).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  console.log("Clients = ", Clients)
  console.log("sortedClients = ", sortedClients)
  // console.log("order = ", order);
  // console.log("orderBy = ", orderBy);
  // console.log("is hiding pagination = ", Clients.length <= rowsPerPage);
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
      const newSortedClients = stableSort(clients_response.data, getComparator(order, orderBy));
      setSortedClients(newSortedClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
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
    const newSortedClients = stableSort(sortedClients, getComparator(isAsc ? 'desc' : 'asc', property));
    setSortedClients(newSortedClients);
    if (sortedClients.length > 1) {
      let newClients = [];
      for (let index = 0; index < Clients.length; index++) {
        if (index >= page * rowsPerPage && index < page * rowsPerPage + rowsPerPage)
          newClients.push(newSortedClients[index]);
        else
          newClients.push(Clients[index]);
      }
      setClients(newClients);
    }
    if (selected.length === sortedClients.length)
      setSelected(newSortedClients);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(sortedClients);
      return;
    }
    setSelected([]);
  };

  const selectRow = (event, row) => {
    event.stopPropagation();
    const selectedIndex = selected.findIndex(client => client.id == row.id);
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
    setSortedClients(Clients.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage));
    setPage(newPage);
    setSelected([]);
  };

  const handleChangeRowsPerPage = (event) => {
    let newRowsPerPage = parseInt(event.target.value, 10);
    setSortedClients(Clients.slice(0, newRowsPerPage));
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setSelected([]);
  };

  const isSelected = (row) => selected.findIndex(client => client.id == row.id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Clients.length) : 0;

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
        message = selected[0].company_name + " has been successfully deleted.";
      } else if (selected.length >= 2) {
        message = `The selected ${selected.length} clients have been deleted.`;
      }
      let response = await ActionsApi.DeleteClients({ token, data });
      console.log("response of DeleteClients = ", response);

      let newClients = [...Clients];
      selected.forEach(data => {
        newClients = newClients.filter(client => {
          return client.id !== data.id;
        });
      });
      setClients(newClients);
      setSortedClients(newClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
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

  const [selectedClient, setSelectedClient] = useState({});
  const [openDialogByRow, setOpenDialogByRow] = useState(false);
  const handleClickOpenDialogByRow = (client) => {
    setSelectedClient(client);
    setOpenDialogByRow(true);
  };

  const handleCloseDialogByRow = () => {
    setOpenDialogByRow(false);
    setSelectedClient({});
  };

  console.log("selectedClient = ", selectedClient);

  const deleteDataByRow = async () => {
    TokenValidation();
    try {
      let token = user.token.access, data = [selectedClient];
      let response = await ActionsApi.DeleteClients({ token, data });
      console.log("response of DeleteClients = ", response);

      let newClients = [...Clients];
      newClients.splice(newClients.findIndex(client => client.id === selectedClient.id), 1);
      setClients(newClients);
      setSortedClients(newClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
      let newSelected = [...selected];
      let selectRowIndex = newSelected.findIndex(client => client.id === selectedClient.id);
      if (selectRowIndex !== -1) {
        newSelected.splice(selectRowIndex, 1);
        setSelected(newSelected);
      }
      handleCloseDialogByRow();
      showToast(data[0].company_name + " has been successfully deleted.")
    } catch (err) {
      console.log(err);
    }
  };

  // const TableContainer = forwardRef(function TableContainer(props, ref) {
  //   return <TableContainer ref={ref} {...props} style={{ borderRadius: 0, }} />;
  // });

  // function stringToColor(string) {
  //   let hash = 0;
  
  //   /* eslint-disable no-bitwise */
  //   for (let index = 0; index < string.length; index += 1) {
  //     hash = string.charCodeAt(index) + ((hash << 5) - hash);
  //   }
  
  //   let color = '#';
  
  //   for (let index = 0; index < 3; index += 1) {
  //     const value = (hash >> (index * 8)) & 0xff;
  //     color += `00${value.toString(16)}`.slice(-2);
  //   }
  //   /* eslint-enable no-bitwise */
  
  //   return color;
  // }
  
  // function stringAvatar(name) {
  //   return {
  //     sx: {
  //       display: "inline-flex", 
  //       bgcolor: "#fff",
  //       color: stringToColor(name),
  //       width: 50,
  //       height: 50,
  //       borderWidth: 2,
  //       borderStyle: "solid",
  //       textTransform: "uppercase"
  //     },
  //     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  //   };
  // }

  function currencyDecimalFormat(value) {
    return `$${Number(value).toFixed(2)} USD`;
  }

  function currencyFormat(value) {
    return new Intl.NumberFormat(`en-${countryISOCode}`, {
      style: "currency",
      currency: user.business.base_currency.split(" — ")[0],
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
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
      <DashboardNavbar />
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
                Are you sure you want to delete {selected.length === 1 ? selected[0].organization : selected.length + " clients"}?
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
                Are you sure you want to delete {selectedClient.organization}?
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
                {/* All Clients
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
              Clients={Clients}
              selectedData={selected}
              onCancelSelect={() => setSelected([])}
              openSelectMenu={openSelectMenu}
              handleClickSelectMenu={handleClickSelectMenu}
              anchorEl={anchorEl}
              handleCloseSelectMenu={handleCloseSelectMenu}
              handleClickOpenDialog={handleClickOpenDialog}
            />
            <TableContainer style={{ borderRadius: 0, }}>
              <Table>
                <EnhancedTableHead
                  numSelected={selected.length}
                  numClients={sortedClients.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  // rowCount={Clients.length}
                />
                <TableBody className={classes.tableBody_tab}>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                    rows.slice().sort(getComparator(order, orderBy)) */}
                  {
                  sortedClients
                  // Clients
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      // let decimalTotal = parseFloat(row.total).toFixed(2);
                      // total = (parseFloat(total) + parseFloat(decimalTotal)).toFixed(2);

                      row.primary = `${row.first_name} ${row.last_name}`;
                      // row.organization = row.company_name;
                      row.organization = row.company_name.length !== 0 ? row.company_name : row.primary;

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
                                      history.push({
                                        pathname: `${url}/${row.id}/edit`,
                                        state: {
                                          client: Clients[Clients.findIndex(client => client.id == row.id)],
                                        }
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
                            onClick={() => {
                              let new_user = {...JSON.parse(localStorage.getItem("user")), client: Clients[Clients.findIndex(client => client.id == row.id)]};
                              new_user = JSON.stringify(new_user);
                              setUser(new_user);
                              localStorage.setItem("user", new_user);
                              history.push(`/clients/${row.id}`);

                              // history.push({
                              //   pathname: `/clients/${row.id}`,
                              //   state: {
                              //     client: Clients[Clients.findIndex(client => client.id == row.id)],
                              //   }
                              // });
                            }}
                            // onConfirm={() => history.push("/authentication/sign-in")}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.organization}
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
                              {row.organization} <br/>
                              <span style={{ fontSize: 14, color: "gray", }}>{row.primary}</span>
                            </TableCell>
                            {/* <TableCell style={{ verticalAlign: "baseline", }}>{row.note}</TableCell> */}
                            {/* <TableCell align="right" style={{ verticalAlign: "baseline", }}>{currencyDecimalFormat(row.credit)}</TableCell> */}
                            {/* <TableCell align="right">{currencyDecimalFormat(row.total)}</TableCell> */}
                            <TableCell style={{ verticalAlign: "baseline", }}>{"—"}</TableCell>
                            <TableCell align="right" style={{ verticalAlign: "baseline", }}>{currencyDecimalFormat(0)}</TableCell>
                            <TableCell align="right">{currencyDecimalFormat(0)}</TableCell>
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
            {Clients.length !== 0 && (
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
              count={Clients.length}
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
                    ...(Clients.length <= rowsPerPage && { display: "none", }),
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

export default Clients;
