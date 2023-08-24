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
  forwardRef,
  useContext,
} from "react";

// react-routers components
import {
  Link,
  useHistory,
  useRouteMatch,
  // Redirect,
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
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  TablePagination,
  Checkbox,
  Toolbar,
  Button,
  // IconButton,
  // Tooltip,
  // Popover,
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
} from "@mui/material";

import { alpha, styled } from '@mui/material/styles';

import {
  // Add as AddIcon,
  Delete as DeleteIcon,
  // FilterList as FilterListIcon,
  // Create as CreateIcon,
  Archive as ArchiveIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  // Edit as EditIcon,
} from "@mui/icons-material";

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

import styles from "layouts/items-services/styles";

import { AuthContext } from "../../auth-context/auth.context";
import AuthApi from "../../api/auth";
import ActionsApi from "../../api/actions";


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
        <SuiBox>
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

function ItemsServices() {
  const classes = styles();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  // let total = Number(0).toFixed(2);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [selectedTax, setSelectedTax] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const { url } = useRouteMatch();
  const history = useHistory();
  const splitCurrentURL = history.location.pathname.split("/");
  const currentPath = splitCurrentURL[splitCurrentURL.length - 1];

  const [tabValue, setTabValue] = useState(currentPath === "service" ? 1 : 0);

  const [Items, setItems] = useState([]);
  const [Services, setServices] = useState([]);
  const [Taxes, setTaxes] = useState([]);

  console.log("tabValue = ", tabValue)
  // console.log("Items = ", Items)
  // console.log("Services = ", Services)
  console.log("selected = ", selected)
  console.log("selectedTax = ", selectedTax)

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

  const InitItems = async () => {
    try {
      let items_response = await ActionsApi.GetBusinessItems({token: user.token.access}, {business_id: user.business.id});
      console.log("items_response parent response = ", items_response);

      setItems(items_response.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const InitServices = async () => {
    try {
      let services_response = await ActionsApi.GetBusinessServices({token: user.token.access}, {business_id: user.business.id});
      console.log("services_response response = ", services_response);

      setServices(services_response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const InitTaxes = async () => {
    try {
      let taxes_response = await ActionsApi.GetBusinessSalesTax({token: user.token.access}, {business_id: user.business.id});
      console.log("taxes_response response = ", taxes_response);

      setTaxes(taxes_response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Promise.all([TokenValidation()])
    .then(() => {
      console.log("isTokenValid promise then = ", isTokenValid)
      if (isTokenValid) {
        InitItems();
        InitServices();
        InitTaxes();
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
  }, []);
  
  // const handleRequestSort = (event, property) => {
  function handleRequestSort(event, property) {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  // const handleSelectAllClick = (event) => {
  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(tabValue === 0 ? Items : Services);
      return;
    }
    setSelected([]);
  }

  const selectRow = (event, row, type) => {
    event.stopPropagation();

    let selectedData;
    if (type === "item" || type === "service") {
      selectedData = selected;
    } else if (type === "tax") {
      selectedData = selectedTax;
    }
    const selectedIndex = selectedData.findIndex(data => data.id == row.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedData, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedData.slice(1));
    } else if (selectedIndex === selectedData.length - 1) {
      newSelected = newSelected.concat(selectedData.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1),
      );
    }
    if (type === "item" || type === "service") {
      setSelected(newSelected);
    } else if (type === "tax") {
      setSelectedTax(newSelected);
    }
  };

  const isSelected = (row, type) => {
    if (type === "item" || type === "service")
      return selected.findIndex(itemService => itemService.id == row.id) !== -1;
    else if (type === "tax")
      return selectedTax.findIndex(tax => tax.id == row.id) !== -1;
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

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const [openTaxPickerDialog, setOpenTaxPickerDialog] = useState(false);

  const handleClickOpenTaxPicker = () => {
    setSelectedTax(selectedItemService.sales_taxes);
    setOpenTaxPickerDialog(true);
  };

  const handleCloseTaxPicker = () => {
    setOpenTaxPickerDialog(false);
    setSelectedTax(selectedItemService.sales_taxes);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openSelectMenu = Boolean(anchorEl);
  const handleClickSelectMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSelectMenu = () => {
    setAnchorEl(null);
  };

  const [openEditDialog, setOpenEditDialog] = useState(false);

  // const handleClickOpenEditDialog = (row) => {
  function handleClickOpenEditDialog(row) {
    setSelectedItemService(row);
    setName(row.name ? row.name : "");
    setDescription(row.description ? row.description : "");
    setRate(row.rate ? row.rate : "");
    // setBillable(row.billable ? row.billable : true);
    // setAlwaysAddToProjects(row.always_add_to_projects ? row.always_add_to_projects : false);
    if (tabValue === 0) {
      setTrackInventory(row.current_stock ? true : false);
      setCurrentStock(row.current_stock ? row.current_stock : "");
    } else {
      setBillable(row.billable);
      setAlwaysAddToProjects(row.always_add_to_projects);
    }
    setOpenEditDialog(true);
  }

  const handleCloseEditDialog = () => {
    setValidation({});
    setOpenEditDialog(false);
    setName("");
    setDescription("");
    setRate("");
    if (tabValue === 0) {
      setTrackInventory(false);
      setCurrentStock("");
    } else {
      setBillable(true);
      setAlwaysAddToProjects(false);
    }
    setSelectedTax([]);
    setSelectedItemService({});
  };

  const apply = async () => {
    TokenValidation();
    setOpenTaxPickerDialog(false);
    let newSelectedItemService = {...selectedItemService};
    newSelectedItemService.sales_taxes = [...selectedTax];
    setSelectedItemService(newSelectedItemService);
  };

  const save = async () => {
    TokenValidation();
    // let token = user.token.access;
    setValidation({});
    if (tabValue === 0) {
      if (name === "") {
        return setValidation({name: "Enter an item name"});
      } else if (name.toLowerCase() !== selectedItemService.name.toLowerCase() && Items.findIndex(item => item.name.toLowerCase() === name.toLowerCase()) !== -1) {
        return setValidation({name: "This name is already in use"});
      }
    } else {
      if (name === "") {
        return setValidation({name: "Enter a service name"});
      } else if (name.toLowerCase() !== selectedItemService.name.toLowerCase() && Services.findIndex(service => service.name.toLowerCase() === name.toLowerCase()) !== -1) {
        return setValidation({name: "This name is already in use"});
      }
    }
    if (validation && Object.keys(validation).length === 0 && Object.getPrototypeOf(validation) === Object.prototype) {
      try {
        let data = {
          id: selectedItemService.id,
          name,
          description,
          rate,
          sales_taxes: selectedItemService.sales_taxes,
        };
        data.rate = rate.length !== 0 ? Number(rate).toFixed(2) : null;
        if (tabValue === 0) {
          data.current_stock = trackInventory && current_stock.length !== 0 ? current_stock : null;
          let response = await ActionsApi.UpdateBusinessItems({ token: user.token.access }, data);
          console.log("response of UpdateBusinessItems = ", response);

          let newItems = [...Items];
          newItems[Items.findIndex(item => item.id == response.data.item.id)] = {...response.data.item};
          setItems(newItems);
          handleCloseEditDialog();
          showToast(`${response.data.item.name} has been updated.`);
        } else {
          data = {...data, billable, always_add_to_projects}
          let response = await ActionsApi.UpdateBusinessServices({ token: user.token.access }, data);
          console.log("response of UpdateBusinessServices = ", response);
          
          let newServices = [...Services];
          newServices[Services.findIndex(service => service.id == response.data.service.id)] = {...response.data.service};
          setServices(newServices);
          handleCloseEditDialog();
          showToast(`${response.data.service.name} has been updated.`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteDialogType, setDeleteDialogType] = useState("");
  const [deleteDialogMessage, setDeleteDialogMessage] = useState({});
  const handleClickOpenDeleteDialog = () => {
    handleCloseSelectMenu();
    let dialogType = tabValue === 0 ? "item" : "service";
    setDeleteDialogType(dialogType);
    setDeleteDialogMessage({title: "Confirm", content: `Are you sure you want to delete ${selected.length === 1 ? `${selected[0].name} ${dialogType}` : `${selected.length} ${dialogType}s`}?`});
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const deleteSelectedData = async () => {
    TokenValidation();
    try {
      let token = user.token.access, data = selected, message;
      if (selected.length === 1) {
        message = `${selected[0].name} ${deleteDialogType} has been deleted.`;
      } else if (selected.length >= 2) {
        message = `${selected.length} ${deleteDialogType}s were successfully deleted.`;
      }
      if (tabValue === 0) {
        let response = await ActionsApi.DeleteBusinessItems({ token, data });
        console.log("response of DeleteBusinessItems = ", response);

        let newItems = [...Items];
        selected.forEach(data => {
          newItems = newItems.filter(item => {
            return item.id !== data.id;
          });
        });
        setItems(newItems);
      } else {
        let response = await ActionsApi.DeleteBusinessServices({ token, data });
        console.log("response of DeleteBusinessServices = ", response);

        let newServices = [...Services];
        selected.forEach(data => {
          newServices = newServices.filter(service => {
            return service.id !== data.id;
          });
        });
        setServices(newServices);
      }
      setSelected([]);
      handleCloseDeleteDialog();
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

  const [selectedItemService, setSelectedItemService] = useState({});

  console.log("selectedItemService = ", selectedItemService)
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [trackInventory, setTrackInventory] = useState(false);
  const [current_stock, setCurrentStock] = useState("");
  const [billable, setBillable] = useState(true);
  const [always_add_to_projects, setAlwaysAddToProjects] = useState(false);
  const [validation, setValidation] = useState({});
  
  return (
    <DashboardLayout>
      <DashboardNavbar
        setTabValue={setTabValue}
        Items={Items}
        setItems={setItems}
        Services={Services}
        setServices={setServices}
        Taxes={Taxes}
        setTaxes={setTaxes}
      />
      <SuiTypography variant="h3" style={{ fontSize: 32, }}>
        {`Items & Services`}
      </SuiTypography>
      <Divider className={classes.segmentedControl_divider}>
        <Tabs
          className="bg-transparent"
          orientation={tabsOrientation}
          value={tabValue}
          onChange={handleSetTabValue}
        >
          <Tab label="Items" onClick={() => history.push(`${url}/item`)} />
          <Tab label="Services" onClick={() => history.push(`${url}/service`)} />
        </Tabs>
      </Divider>
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
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        classes={{ root: classes.actionTable_dialog, }}
      >
        <DialogTitle variant="h2">
          {deleteDialogMessage.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteDialogMessage.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={deleteSelectedData}>OK</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        classes={{ root: classes.actionTable_dialog, }}
      >
        <DialogTitle variant="h2">
          {`Edit ${tabValue === 0 ? "Item" : "Service"}`}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText> */}
            <SuiBox mb={3}>
              <SuiTypography variant="button" fontWeight="regular">
                Name
              </SuiTypography>
              <SuiInput
                error={"name" in validation}
                placeholder="Enter a name"
                value={name}
                onChange={(event) => {setName(event.target.value); setValidation({});}}
              />
              {"name" in validation &&
                <SuiTypography
                  variant="button"
                  fontWeight="regular"
                  textColor="error"
                  style={{ fontSize: 13, }}
                >
                  {validation.name}
                </SuiTypography>
              }
            </SuiBox>
            <SuiBox mb={3}>
              <SuiTypography variant="button" fontWeight="regular">
                Description
              </SuiTypography>
              <SuiInput
                placeholder="Enter a description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </SuiBox>
            <SuiBox mb={3} style={{ display: "flex", }}>
              <SuiBox width={169}>
                <SuiTypography variant="button" fontWeight="regular">
                  Rate
                </SuiTypography>
                <SuiInput
                  placeholder="0.00"
                  value={rate}
                  onChange={(event) => setRate(event.target.value)}
                />
                {selectedItemService && Object.keys(selectedItemService).length !== 0 && Object.getPrototypeOf(selectedItemService) === Object.prototype && (selectedItemService.sales_taxes.length === 0 
                  ? <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      customClass="button-link"
                      onClick={handleClickOpenTaxPicker}
                    >
                      Add Taxes
                      <ExpandMoreIcon className="vertical-middle" sx={{ marginLeft: "4px", fontSize: "20px !important", }} />
                    </SuiTypography>
                  : <SuiTypography
                      variant="button"
                      fontWeight="regular"
                      customClass="button-link"
                      onClick={handleClickOpenTaxPicker}
                      style={{ display: "inline-flex", }}
                    >
                      {selectedItemService.sales_taxes.map((tax, index) => {
                          return (
                            <span key={`${index} — ${tax.id} — ${tax.name} — ${tax.number}`}>
                              {index === 0 && "+"}{tax.name}
                              {index !== selectedItemService.sales_taxes.length - 1 && ", "}
                            </span>
                          );
                        })
                      }
                    </SuiTypography>
                )}
                <Dialog
                  open={openTaxPickerDialog}
                  onClose={handleCloseTaxPicker}
                  classes={{ root: classes.actionTable_dialog, }}
                >
                  <DialogTitle variant="h2">Add Taxes</DialogTitle>
                  <DialogContent>
                    <TableContainer style={{ borderRadius: 0, }}>
                      <Table>
                        <TableHead className={classes.enhancedTable_head}>
                          <TableRow>
                            <TableCell />
                            <TableCell>Rate</TableCell>
                            <TableCell>Tax Name</TableCell>
                            <TableCell>Tax Number</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody_tab}>
                          {Taxes.map((row, index) => {
                            return (
                              <TableRow key={`${index} — ${row.name} — ${row.number}`}>
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    checked={isSelected(row, "tax")}
                                    onClick={(event) => selectRow(event, row, "tax")}
                                  />
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.number ? row.number : "—"}</TableCell>
                                <TableCell align="right">{row.rate}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseTaxPicker}>Cancel</Button>
                    <Button onClick={apply}>Apply Taxes</Button>
                  </DialogActions>
                </Dialog>
              </SuiBox>
            </SuiBox>
            {tabValue === 0 ? (
              <SuiBox mb={3}>
                <SuiTypography variant="button" fontWeight="regular">
                  Inventory
                </SuiTypography>
                <SuiBox style={{ display: "table", cursor: "pointer", }}>
                  <SuiBox style={{ display: "table-cell", }} onClick={() => setTrackInventory(!trackInventory)}>
                    <Checkbox
                      color="primary"
                      checked={trackInventory}
                      onChange={() => setTrackInventory(!trackInventory)}
                      sx={{ marginRight: "10px", }}
                    />
                  </SuiBox>
                  <SuiTypography
                    variant="h6"
                    fontWeight="regular"
                    style={{ color: "#001b40", }}
                    onClick={() => setTrackInventory(!trackInventory)}>Track Inventory</SuiTypography>
                  <SuiTypography
                    variant="button"
                    fontWeight="regular"
                    style={{
                      display: "block",
                      lineHeight: "16px",
                      color: "#576981",
                    }}
                    onClick={() => setTrackInventory(!trackInventory)}
                  >
                    Track your current stock. When you invoice for an item your inventory will decrease. When you receive more, you can update your inventory here.
                  </SuiTypography>
                  {trackInventory &&
                    <SuiBox
                      mt={1.5}
                      onClick={() => setTrackInventory(!trackInventory)}
                      style={{ display: "flex", }}
                    >
                      <SuiInput
                        placeholder="0"
                        value={current_stock}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => {
                          const {data} = event.nativeEvent;
                          if (data === null || /^[0-9\b]+$/.test(data)) {
                          // if (data === null || /^-?\d*(\.\d+)?$/.test(data)) {
                          // if (data === null || /^(\d*)([,.]\d{0,2})?$/.test(data)) {
                          // if (data === null || /^\d+(?:\.\d{1,2})?$/.test(data)) {
                            setCurrentStock(event.target.value);
                          }
                        }}
                        sx={{ width: "50px !important", }}
                      />
                      <SuiTypography
                        ml={1.25}
                        variant="h6"
                        fontWeight="regular"
                        style={{
                          color: "#001b40",
                          lineHeight: "normal",
                          alignSelf: "center",
                        }}
                      >
                        in stock
                      </SuiTypography>
                    </SuiBox>
                  }
                </SuiBox>
              </SuiBox>
            ) : (
              <>
                <SuiBox mb={3} style={{ display: "flex", alignItems: "center", }}>
                  <Checkbox
                    color="primary"
                    checked={billable}
                    onChange={() => setBillable(!billable)}
                    sx={{ marginRight: "10px", }}
                  />
                  <SuiTypography
                    variant="h6"
                    fontWeight="regular"
                    style={{ color: "#001b40", }}
                    onClick={() => setBillable(!billable)}>Billable</SuiTypography>
                </SuiBox>
                <SuiBox mb={3} style={{ display: "flex", alignItems: "center", }}>
                  <Checkbox
                    color="primary"
                    checked={always_add_to_projects}
                    onChange={() => setAlwaysAddToProjects(!always_add_to_projects)}
                    sx={{ marginRight: "10px", }}
                  />
                  <SuiTypography
                    variant="h6"
                    fontWeight="regular"
                    style={{ color: "#001b40", }}
                    onClick={() => setAlwaysAddToProjects(!always_add_to_projects)}>
                      Automatically add this service to all new projects</SuiTypography>
                </SuiBox>
              </>
            )}
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={save}>Save</Button>
          {/* <Button onClick={() => save}>Save</Button> */}
        </DialogActions>
      </Dialog>
      {/* <SuiBox px={1.25} pb={3} display="flex" justifyContent="space-between" alignItems="center">
        <SuiTypography variant="h4" fontWeight="medium" textTransform="capitalize">
          Items
        </SuiTypography>
        <SuiBox display="flex">
          <SuiInput
            placeholder="Search"
            withIcon={{ icon: "search", direction: "left" }}
            // customClass={classes.navbar_input}
          />
        </SuiBox>
      </SuiBox> */}
      <TabPanel value={tabValue} index={0}>
        <SuiBox mb={5}>
          <Toolbar
            className={classes.enhancedTable_toolbar}
            sx={{
              // pl: { sm: 2 },
              // pr: { xs: 1, sm: 1 },
              ...(selected.length > 0 && {
                bgcolor: (theme) =>
                  alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
              }),
            }}
            style={{ display: "unset", }}
          >
            <SuiBox
              px={1.25}
              pb={3}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {selected.length > 0 ? (
                <SuiBox>
                  <Typography
                    variant="h5"
                    id="tableTitle"
                    component="div"
                    style={{ display: "inline-block", }}
                  >
                    <Link to="#" onClick={() => setSelected([])}>Items</Link>
                    <ChevronRightIcon /> Selected
                    <span className="numSelected">{selected.length}</span>
                  </Typography>
                  <Button
                    disableElevation
                    onClick={handleClickSelectMenu}
                    endIcon={<ExpandMoreIcon />}
                  >
                    Bulk Actions
                  </Button>
                  <StyledMenu
                    anchorEl={anchorEl}
                    open={openSelectMenu}
                    onClose={handleCloseSelectMenu}
                  >
                    <MenuItem disableRipple>
                      <ArchiveIcon /> Archive
                    </MenuItem>
                    <MenuItem onClick={handleClickOpenDeleteDialog} disableRipple>
                      <DeleteIcon /> Delete
                    </MenuItem>
                  </StyledMenu>
                </SuiBox>
              ) : (
                <SuiTypography variant="h4" fontWeight="medium" textTransform="capitalize">
                  Items
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
          </Toolbar>
          <TableContainer style={{ borderRadius: 0, }}>
            <Table>
              <TableHead className={classes.enhancedTable_head}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < Items.length}
                      checked={Items.length > 0 && selected.length === Items.length}
                      // onChange={handleSelectAllClick}
                      onChange={(event) => handleSelectAllClick(event)}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : 'asc'}
                      // onClick={handleRequestSort("name")}
                      onClick={(event) => handleRequestSort(event, "name")}
                    >
                      Name
                    </TableSortLabel>/
                    <TableSortLabel
                      active={orderBy === "description"}
                      direction={orderBy === "description" ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, "description")}
                    >
                      Description
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "current_stock"}
                      direction={orderBy === "current_stock" ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, "current_stock")}
                    >
                      Current Stock
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "rate"}
                      direction={orderBy === "rate" ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, "rate")}
                    >
                      Rate
                    </TableSortLabel>/Taxes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody_tab}>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                  rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(Items, getComparator(order, orderBy)).map((row, index) => {
                  return (
                    <TableRow
                      key={`${index} — ${row.name} — ${row.description}`}
                      hover
                      // onClick={handleClickOpenEditDialog(row)}
                      onClick={() => handleClickOpenEditDialog(row)}
                      selected={isSelected(row, "item")}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isSelected(row, "item")}
                          onClick={(event) => selectRow(event, row, "item")}
                        />
                      </TableCell>
                      <TableCell
                        padding="none"
                        style={{ lineHeight: "normal", }}
                      >
                        {row.name} <br/>
                        <span style={{ fontSize: 14, color: "gray", }}>{row.description}</span>
                      </TableCell>
                      <TableCell>{row.current_stock ? row.current_stock : "—"}</TableCell>
                      <TableCell align="right">
                        {`${Number(row.rate).toFixed(2)}`} <br/>
                        {row.sales_taxes.length !== 0 &&
                          row.sales_taxes.map((tax, index) => {
                            return (
                              <span 
                                key={`${index} — ${tax.id} — ${tax.name} — ${tax.number} — ${tax.business_id}`} 
                                style={{ fontSize: 14, color: "gray", }}
                              >
                                {index === 0 && "+"}{tax.name}
                                {index !== row.sales_taxes.length - 1 && ", "}
                              </span>
                            );
                          })
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            page={0}
            rowsPerPage={-1}
            rowsPerPageOptions={[-1]}
            count={Items.length}
            onPageChange={() => { return; } }
            sx={{
              display: "table-footer-group",
              "& .MuiToolbar-root": {
                marginTop: "4px",
                "& .MuiTablePagination-displayedRows": {
                  fontWeight: 500,
                  color: "#001b40",
                },
              },
            }}
            className={classes.clients_pagination}
          />
        </SuiBox>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <SuiBox mb={5}>
          <Toolbar
            className={classes.enhancedTable_toolbar}
            sx={{
              // pl: { sm: 2 },
              // pr: { xs: 1, sm: 1 },
              ...(selected.length > 0 && {
                bgcolor: (theme) =>
                  alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
              }),
            }}
            style={{ display: "unset", }}
          >
            <SuiBox
              px={1.25}
              pb={3}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {selected.length > 0 ? (
                <SuiBox>
                  <Typography
                    variant="h5"
                    id="tableTitle"
                    component="div"
                    style={{ display: "inline-block", }}
                  >
                    <Link to="#" onClick={() => setSelected([])}>Services</Link>
                    <ChevronRightIcon /> Selected
                    <span className="numSelected">{selected.length}</span>
                  </Typography>
                  <Button
                    disableElevation
                    onClick={handleClickSelectMenu}
                    endIcon={<ExpandMoreIcon />}
                  >
                    Bulk Actions
                  </Button>
                  <StyledMenu
                    anchorEl={anchorEl}
                    open={openSelectMenu}
                    onClose={handleCloseSelectMenu}
                  >

                    <MenuItem disableRipple>
                      <ArchiveIcon /> Archive
                    </MenuItem>
                    <MenuItem onClick={handleClickOpenDeleteDialog} disableRipple>
                      <DeleteIcon /> Delete
                    </MenuItem>
                  </StyledMenu>
                </SuiBox>
              ) : (
                <SuiTypography variant="h4" fontWeight="medium" textTransform="capitalize">
                  Services
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
          </Toolbar>
          <TableContainer style={{ borderRadius: 0, }}>
            <Table>
              <TableHead className={classes.enhancedTable_head}>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < Services.length}
                      checked={Services.length > 0 && selected.length === Services.length}
                      // onChange={handleSelectAllClick}
                      onChange={(event) => handleSelectAllClick(event)}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : 'asc'}
                      // onClick={handleRequestSort("name")}
                      onClick={(event) => handleRequestSort(event, "name")}
                    >
                      Name
                    </TableSortLabel>/
                    <TableSortLabel
                      active={orderBy === "description"}
                      direction={orderBy === "description" ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, "description")}
                    >
                      Description
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "billable"}
                      direction={orderBy === "billable" ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, "billable")}
                    >
                      Billable
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "always_add_to_projects"}
                      direction={orderBy === "always_add_to_projects" ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, "always_add_to_projects")}
                    >
                      Always Add to Projects
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "rate"}
                      direction={orderBy === "rate" ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, "rate")}
                    >
                      Rate
                    </TableSortLabel>/Taxes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody_tab}>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                  rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(Services, getComparator(order, orderBy)).map((row, index) => {
                  return (
                    <TableRow
                      key={`${index} — ${row.name} — ${row.description}`}
                      hover
                      // onClick={handleClickOpenEditDialog(row)}
                      onClick={() => handleClickOpenEditDialog(row)}
                      selected={isSelected(row, "service")}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isSelected(row, "service")}
                          onClick={(event) => selectRow(event, row, "service")}
                        />
                      </TableCell>
                      <TableCell
                        padding="none"
                        style={{ lineHeight: "normal", }}
                      >
                        {row.name} <br/>
                        <span style={{ fontSize: 14, color: "gray", }}>{row.description}</span>
                      </TableCell>
                      <TableCell>{row.billable ? "Yes" : "No"}</TableCell>
                      <TableCell>{row.always_add_to_projects ? "Yes" : "No"}</TableCell>
                      <TableCell align="right">
                        {`${Number(row.rate).toFixed(2)}`} <br/>
                        {row.sales_taxes.length !== 0 &&
                          row.sales_taxes.map((tax, index) => {
                            return (
                              <span 
                                key={`${index} — ${tax.id} — ${tax.name} — ${tax.number} — ${tax.business_id}`} 
                                style={{ fontSize: 14, color: "gray", }}
                              >
                                {index === 0 && "+"}{tax.name}
                                {index !== row.sales_taxes.length - 1 && ", "}
                              </span>
                            );
                          })
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            page={0}
            rowsPerPage={-1}
            rowsPerPageOptions={[-1]}
            count={Services.length}
            onPageChange={() => { return; } }
            sx={{
              display: "table-footer-group",
              "& .MuiToolbar-root": {
                marginTop: "4px",
                "& .MuiTablePagination-displayedRows": {
                  fontWeight: 500,
                  color: "#001b40",
                },
              },
            }}
            className={classes.clients_pagination}
          />
        </SuiBox>
      </TabPanel>
    </DashboardLayout>
  );
}

export default ItemsServices;
