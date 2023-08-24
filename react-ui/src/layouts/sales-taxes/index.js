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
  // useHistory,
  // useRouteMatch,
  Redirect,
} from "react-router-dom";

// prop-types is a library for typechecking of props
// import PropTypes from "prop-types";

// @mui material components
import {
  // Grid,
  // Tabs,
  // Tab,
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
  DialogActions
} from "@mui/material";

import { alpha, styled } from '@mui/material/styles';

import {
  // Add as AddIcon,
  Delete as DeleteIcon,
  // FilterList as FilterListIcon,
  // Create as CreateIcon,
  // Archive as ArchiveIcon,
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

function SalesTaxes() {
  const classes = styles();
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");

  // let total = Number(0).toFixed(2);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  const [Taxes, setTaxes] = useState([]);

  console.log("Taxes = ", Taxes)

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
        InitTaxes();
      } else {
        AuthApi.Logout(user);
        setUser(null);
        localStorage.removeItem("user");
        return <Redirect to="/authentication/sign-in" />;
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
      setSelected(Taxes);
      return;
    }
    setSelected([]);
  }

  const selectRow = (event, row) => {
    event.stopPropagation();
    const selectedIndex = selected.findIndex(tax => tax.id == row.id);
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

  const isSelected = (row) => selected.findIndex(tax => tax.id == row.id) !== -1;

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

  const [anchorEl, setAnchorEl] = useState(null);
  const openSelectMenu = Boolean(anchorEl);
  const handleClickSelectMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSelectMenu = () => {
    setAnchorEl(null);
  };

  const [openCreateEditDialog, setOpenCreateEditDialog] = useState(false);

  // const handleClickOpenCreateEditDialog = (row) => {
  function handleClickOpenCreateEditDialog(row) {
    setSelectedTax(row);
    setName(row.name ? row.name : "");
    setNumber(row.number ? row.number : "");
    setRate(row.rate ? row.rate : "");
    setOpenCreateEditDialog(true);
  }

  const handleCloseCreateEditDialog = () => {
    setValidation({});
    setSelectedTax({});
    setOpenCreateEditDialog(false);
  };

  const save = async () => {
    TokenValidation();
    setValidation({});
    if (name === "") {
      return setValidation({name: "Enter an sales tax name"});
    } else if (name.toLowerCase() !== selectedTax.name.toLowerCase() && Taxes.findIndex(tax => tax.name.toLowerCase() === name.toLowerCase()) !== -1) {
      return setValidation({name: "This name is already in use"});
    }
    if (rate === "") {
      return setValidation({rate: "Enter an sales tax rate"});
    }
    try {
      let data = {
        id: selectedTax.id,
        name,
        number,
        rate,
      };
      let response = await ActionsApi.UpdateBusinessSalesTax({ token: user.token.access }, data);
      console.log("response of UpdateBusinessSalesTax = ", response);

      let newTaxes = [...Taxes];
      newTaxes[Taxes.findIndex(tax => tax.id == response.data.tax.id)] = response.data.tax;
      setTaxes(newTaxes);
      handleCloseCreateEditDialog();
      showToast(`${response.data.tax.name} has been updated.`);
    } catch (err) {
      console.log(err);
      console.log("error response of UpdateBusinessSalesTax = ", err.response);
    }
  };
  
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteDialogMessage, setDeleteDialogMessage] = useState({});
  const handleClickOpenDeleteDialog = () => {
    handleCloseSelectMenu();
    setDeleteDialogMessage({title: "Confirm", content: `Are you sure you want to delete ${selected.length === 1 ? `${selected[0].name} tax` : `${selected.length} taxes`}?`});
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
        message = `${selected[0].name} tax has been deleted.`;
      } else if (selected.length >= 2) {
        message = `${selected.length} taxes were successfully deleted.`;
      }
      let response = await ActionsApi.DeleteBusinessSalesTax({ token, data });
      console.log("response of DeleteBusinessSalesTax = ", response);

      let newTaxes = [...Taxes];
      selected.forEach(data => {
        newTaxes = newTaxes.filter(tax => {
          return tax.id !== data.id;
        });
      });
      setTaxes(newTaxes);
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

  const [selectedTax, setSelectedTax] = useState({});

  console.log("selectedTax = ", selectedTax);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [rate, setRate] = useState("");
  const [validation, setValidation] = useState({});
  
  return (
    <DashboardLayout>
      <DashboardNavbar 
        Taxes={Taxes}
        setTaxes={setTaxes}
      />
      {/* <SuiTypography variant="h3" style={{ fontSize: 32, }}>
        Sales Taxes
      </SuiTypography> */}
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
        open={openCreateEditDialog}
        onClose={handleCloseCreateEditDialog}
        classes={{ root: classes.actionTable_dialog, }}
      >
        <DialogTitle variant="h2">
          Edit Tax
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
                Number
              </SuiTypography>
              <SuiInput
                placeholder="Enter a number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </SuiBox>
            <SuiBox mb={3}>
              <SuiBox width={169}>
                <SuiTypography variant="button" fontWeight="regular">
                  Rate
                </SuiTypography>
                <SuiInput
                  placeholder="0.00"
                  value={rate}
                  onChange={(event) => setRate(event.target.value)}
                />
              </SuiBox>
              {"rate" in validation &&
                <SuiTypography
                  variant="button"
                  fontWeight="regular"
                  textColor="error"
                  style={{ fontSize: 13, }}
                >
                  {validation.rate}
                </SuiTypography>
              }
            </SuiBox>
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateEditDialog}>Cancel</Button>
          <Button onClick={save}>Save</Button>
          {/* <Button onClick={() => save}>Save</Button> */}
        </DialogActions>
      </Dialog>
      <SuiBox mt={6} mb={5}>
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
                  <Link to="#" onClick={() => setSelected([])}>Sales Taxes</Link>
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
                  {/* <MenuItem disableRipple>
                    <ArchiveIcon /> Archive
                  </MenuItem> */}
                  <MenuItem onClick={handleClickOpenDeleteDialog} disableRipple>
                    <DeleteIcon /> Delete
                  </MenuItem>
                </StyledMenu>
              </SuiBox>
            ) : (
              <SuiTypography variant="h4" fontWeight="medium" textTransform="capitalize">
                Sales Taxes
              </SuiTypography>
            )}
            <SuiInput
              placeholder="Search"
              withIcon={{ icon: "search", direction: "left" }}
              // customClass={classes.navbar_input}
            />
          </SuiBox>
        </Toolbar>
        <TableContainer style={{ borderRadius: 0, }}>
          <Table>
            <TableHead className={classes.enhancedTable_head}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < Taxes.length}
                    checked={Taxes.length > 0 && selected.length === Taxes.length}
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
                    Tax Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "number"}
                    direction={orderBy === "number" ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, "number")}
                  >
                    Tax Number
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "rate"}
                    direction={orderBy === "rate" ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, "rate")}
                  >
                    Rate
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody_tab}>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(Taxes, getComparator(order, orderBy)).map((row, index) => {
                return (
                  <TableRow
                    key={`${index} — ${row.name} — ${row.number}`}
                    hover
                    // onClick={handleClickOpenCreateEditDialog(row)}
                    onClick={() => handleClickOpenCreateEditDialog(row)}
                    selected={isSelected(row)}
                  >
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
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          page={0}
          rowsPerPage={-1}
          rowsPerPageOptions={[-1]}
          count={Taxes.length}
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
    </DashboardLayout>
  );
}

export default SalesTaxes;
