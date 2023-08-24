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
  forwardRef,
} from "react";

// react-router components
import {
  useHistory,
  useLocation,
  useRouteMatch,
  Redirect,
} from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import {
  AppBar,
  Toolbar,
  Button,
  // IconButton,
  // Icon,
  Menu,
  MenuItem,
  // Divider,
  Snackbar,
  Slide,
  // Alert,
  Alert as MuiAlert,
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogContentText,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Checkbox,
} from "@mui/material";

import { makeStyles } from '@mui/styles';

import {
  alpha,
  styled,
  useTheme,
} from '@mui/material/styles';

import {
  ExpandMore as ExpandMoreIcon,
  LocalShipping as LocalShippingIcon,
  DesignServices as DesignServicesIcon,
} from "@mui/icons-material";

// import { TfiImport, TfiExport } from "react-icons/tfi";
// import { CiImport, CiExport } from "react-icons/ci";
import { CgImport, CgExport } from "react-icons/cg";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiInput from "components/SuiInput";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
import Breadcrumbs from "examples/Breadcrumbs";
// import NotificationItem from "examples/NotificationItem";

// Custom styles for DashboardNavbar
// import styles from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import { useSoftUIController } from "context";
import { AuthContext } from "../../../auth-context/auth.context";
import AuthApi from "../../../api/auth";
import ActionsApi from "../../../api/actions";

// Images
// import team2 from "assets/images/team-2.jpg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";

const useStyles = (theme) => {
  const { palette, boxShadows, functions, transitions, breakpoints, typography } = theme;
  const { dark, white, text, transparent } = palette;
  const { navbarBoxShadow } = boxShadows;
  const { rgba, pxToRem } = functions;
  const { size } = typography;
  return makeStyles(() => ({
    navbar: {
      boxShadow: ({ transparentNavbar, absolute }) =>
        transparentNavbar || absolute ? "none" : navbarBoxShadow,
      backdropFilter: ({ transparentNavbar, absolute }) =>
        transparentNavbar || absolute ? "none" : `saturate(200%) blur(${pxToRem(30)})`,
      backgroundColor: ({ transparentNavbar, absolute }) =>
        transparentNavbar || absolute ? transparent.main : rgba(white.main, 0.8),

      color: ({ transparentNavbar, light }) => {
        let color;

        if (light) {
          color = white.main;
        } else if (transparentNavbar) {
          color = text.main;
        } else {
          color = dark.main;
        }

        return color;
      },

      top: 0,
      borderRadius: 0,
      minHeight: pxToRem(75),
      display: "grid",
      alignItems: "center",

      borderBottom: ({ transparentNavbar, absolute }) =>
        transparentNavbar || absolute ? 0 : "1px solid #cdd4d9",

      "& > *": {
        transition: transitions.create("all", {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
      },

      "& .MuiToolbar-root": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        [breakpoints.up("sm")]: {
          minHeight: "auto",
          padding: `${pxToRem(4)} ${pxToRem(16)}`,
        },
      },
    },

    navbar_container: {
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingTop: pxToRem(4),
      paddingBottom: pxToRem(4),

      [breakpoints.up("md")]: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: "0",
        paddingBottom: "0",
      },
    },

    navbar_row: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",

      [breakpoints.up("md")]: {
        justifyContent: ({ isMini }) => (isMini ? "space-between" : "stretch"),
        width: ({ isMini }) => (isMini ? "100%" : "max-content"),
      },

      [breakpoints.up("xl")]: {
        justifyContent: "stretch !important",
        width: "max-content !important",
      },
    },

    navbar_icon_button: {
      padding: `0 ${pxToRem(6)}`,

      "& .material-icons, .material-icons-round": {
        fontSize: `${size.regular} !important`,
      },

      "& .MuiTypography-root": {
        display: "none",

        [breakpoints.up("sm")]: {
          display: "inline-block",
          lineHeight: 1.2,
          marginLeft: pxToRem(4),
        },
      },
    },

    navbar_mobile_menu: {
      display: "inline-block",

      [breakpoints.up("xl")]: {
        display: "none",
      },
    },

    navbar_input: {
      "& .material-icons, .material-icons-round": {
        color: text.main,
      },
    },

    button_navbar: {
      padding: "8px 16px",
      border: "2px solid transparent",
      borderRadius: 5,
      transition: "border-color .15s",
      textTransform: "unset",
      fontSize: 20,
      fontWeight: 500,
      "&:hover": {
        transform: "unset",
      },
    },

    items_services_menu: {
      "& .MuiPaper-root": {
        width: 222,
        "& .MuiMenuItem-root": {
          display: "table",
          "&:last-child": {
            borderTop: "2px solid #ccd1d9",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
          "& .MuiBox-root": {
            display: "table-cell",
            "& .MuiSvgIcon-root": {
              position: "relative",
              top: 4,
              fontSize: "20px !important",
            },
          },
          "& .MuiTypography-root": {
            "&.MuiTypography-h6": {
              color: "#001b40",
            },
            "&.MuiTypography-button": {
              display: "block",
              whiteSpace: "normal",
              lineHeight: "16px",
              color: "#576981",
            },
          },
        },
      },
    },

    actionTable_dialog: {
      "& .MuiDialog-container": {
        height: "80%",
        "& .MuiPaper-root.MuiDialog-paper": {
          minWidth: 500,
          "& .MuiDialogTitle-root": {
            fontSize: 20,
            fontWeight: 600,
            backgroundColor: "#e6eaec",
            color: "#062942",
          },
          "& .MuiDialogContent-root": {
            padding: "24px 20px 0 20px",
            "& .MuiTypography-button.button-link": {
              "&:hover": {
                opacity: .6,
                cursor: "pointer",
              },
              "& span": {
                color: "#0075dd",
              },
            },
            "& .MuiDialogContentText-root": {
              fontSize: 16,
              color: "#062942",
            },
            "& .MuiFormControl-root": {
              "& .MuiInputBase-root": {
                "&.Mui-error": {
                  // borderColor: "#d32f2f",
                  borderColor: "#ea0606",
                },
                "& .MuiInputBase-input": {
                  width: "100% !important",
                },
              },
            },
          },
          "& .MuiDialogActions-root": {
            padding: "12px 24px",
            "& .MuiButton-root": {
              fontSize: 14,
              padding: 8,
              border: "2px solid transparent",
              transition: "border-color .15s",
              transform: "unset",
              "&:first-child": {
                backgroundColor: "transparent",
                color: "#576981",
                "&:hover": {
                  borderColor: "#cdd4d9",
                  color: "#062942",
                },
              },
              "&:not(:first-child)": {
                backgroundColor: "#37a703",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#348e09",
                },
              },
            },
          },
        },
      },
    },

    actionTable_snackbar: {
      "& .MuiAlert-root": {
        backgroundColor: "#37a703",
        color: "#fff",
      },
    },

    tableHead: {
      "&.MuiTableHead-root": {
        display: "table-header-group",
        "& .MuiTableCell-root.MuiTableCell-head": {
          borderBottom: "0.0625rem solid #cdd4d9",
          "&:first-child": {
            "& .MuiCheckbox-root": {
              cursor: "default",
              border: "2px solid #7f8c9f",
              borderRadius: 5,
              width: 25,
              height: 25,
            },
          },
          "&:not(:first-child)": {
            padding: "6px 10px",
            // color: "#576981",
            color: "darkgray",
            fontSize: 14,
            "& .MuiButtonBase-root.MuiTableSortLabel-root": {
              "& .MuiSvgIcon-root.MuiTableSortLabel-icon": {
                width: 0,
                margin: 0,
              },
              "&.Mui-active": {
                "& .MuiSvgIcon-root.MuiTableSortLabel-icon": {
                  width: "1em",
                  // margin: "0 4px",
                },
              },
            },
          },
          "&:last-child": {
            textAlign: "right",
          },
        },
      },
    },

    tableBody: {
      "& .MuiTableRow-root": {
        "&:hover": {
          backgroundColor: "#f2f8fd !important",
          cursor: "pointer",
        },
        "&.Mui-selected": {
          backgroundColor: "unset",
        },
        "& .MuiTableCell-root.MuiTableCell-body": {
          borderBottom: "0.0625rem solid #cdd4d9",
          "&:not(:first-child)": {
            padding: "12px 10px",
          },
          "& .MuiCheckbox-root.MuiButtonBase-root": {
            cursor: "default",
            border: "2px solid #7f8c9f",
            borderRadius: 5,
            width: 25,
            height: 25,
          },
        },
      },
    },
    
    leftButton_navbar: {
      color: "#576981 !important",
      "&:hover": {
        borderColor: "#cdd4d9",
        color: "#062942 !important",
        "& .MuiButton-endIcon": {
          color: "lightslategray",
        },
      },
      "& .MuiButton-endIcon": {
        marginLeft: 0,
        color: "darkgray",
        "& .MuiSvgIcon-root": {
          fontSize: "32px !important",
        },
      },
    },
    
    rightButton_navbar: {
      marginLeft: 10,
      backgroundColor: "#37a703",
      color: "#fff !important",
      "&:hover": {
        backgroundColor: "#348e09",
      },
      "& .MuiButton-endIcon": {
        color: "#fff",
        opacity: .5,
        borderLeft: "1px solid rgba(255,255,255,.5)",
        // margin: 0,
        paddingLeft: 12,
        marginLeft: 12,
        "& .MuiSvgIcon-root": {
          fontSize: "32px !important",
        },
      },
    },
  }));
};

const StyledMenu = styled((props) => (
  <Menu
    // elevation={0}
    // anchorOrigin={{
    //   vertical: 'bottom',
    //   horizontal: 'right',
    // }}
    // transformOrigin={{
    //   vertical: 'top',
    //   horizontal: 'right',
    // }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    padding: 0,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    border: "2px solid #7f8c9f",
    borderRadius: 5,
    boxShadow: "4px 4px rgb(6 41 66 / 10%)",
    '& .MuiMenuItem-root': {
      fontSize: 16,
      '& svg': {
        fontSize: 20,
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

// function DashboardNavbar({ absolute, light, isMini }) {
function DashboardNavbar({
  absolute,
  light,
  isMini,
  setTabValue,
  Items,
  setItems,
  Services,
  setServices,
  Taxes,
  setTaxes,
  // Clients,
  // Invoices,
}) {
  const [navbarType, setNavbarType] = useState();
  // const [controller, dispatch] = useSoftUIController();
  const { controller, dispatch } = useSoftUIController();
  const {
    // miniSidenav,
    transparentNavbar,
    fixedNavbar,
    // openConfigurator
  } = controller;
  // const [openMenu, setOpenMenu] = useState(false);
  // const classes = styles({ transparentNavbar, absolute, light, isMini });
  const theme = useTheme();
  const classes = useStyles(theme)({ transparentNavbar, absolute, light, isMini });
  const route = useLocation().pathname.split("/").slice(1);
  const { url } = useRouteMatch();
  const history = useHistory();
  // const splitCurrentURL = history.location.pathname.split("/");
  // const currentPath = splitCurrentURL[splitCurrentURL.length - 1];
  const { user, setUser } = useContext(AuthContext);

  // console.log("window from dashboardNavbar = ", window);
  // console.log("window location from dashboardNavbar = ", window.location);
  console.log("route in dashboardNavbar = ", route);
  // console.log("history in dashboardNavbar = ", history);
  // console.log("url in dashboardNavbar = ", url);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      dispatch({
        type: "TRANSPARENT_NAVBAR",
        value: (fixedNavbar && window.scrollY === 0) || !fixedNavbar,
      });
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  // const handleMiniSidenav = () => dispatch({ type: "MINI_SIDENAV", value: !miniSidenav });
  // const handleConfiguratorOpen = () =>
  //   dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
  // const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  // const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     getContentAnchorEl={null}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "left",
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     style={{ marginTop: "1rem" }}
  //   >
  //     <NotificationItem
  //       image={<img src={team2} alt="person" />}
  //       title={["New message", "from Laur"]}
  //       date="13 minutes ago"
  //       onClick={handleCloseMenu}
  //     />
  //     <NotificationItem
  //       image={<img src={logoSpotify} alt="person" />}
  //       title={["New album", "by Travis Scott"]}
  //       date="1 day"
  //       onClick={handleCloseMenu}
  //     />
  //     <NotificationItem
  //       color="secondary"
  //       image={
  //         <Icon fontSize="small" className="material-icon-round text-white">
  //           payment
  //         </Icon>
  //       }
  //       title={["", "Payment successfully completed"]}
  //       date="2 days"
  //       onClick={handleCloseMenu}
  //     />
  //   </Menu>
  // );

  const [anchorEl, setAnchorEl] = useState(null);
  const openSelectMenu = Boolean(anchorEl);
  
  const handleClickSelectMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSelectMenu = () => {
    setAnchorEl(null);
  };

  // new Intl.NumberFormat("en-US", {
  //   style: 'currency',
  //   currency: 'USD',
  //   // currencyDisplay: 'code'
  // }).format(67123.45);

  // const [Taxes, setTaxes] = useState([]);
  // const [Items, setItems] = useState([]);
  // const [Services, setServices] = useState([]);
  const [ItemsServicesTaxes, setItemsServicesTaxes] = useState([]);
  const [selectedTax, setSelectedTax] = useState([]);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const [trackInventory, setTrackInventory] = useState(false);
  const [current_stock, setCurrentStock] = useState("");
  const [billable, setBillable] = useState(true);
  const [always_add_to_projects, setAlwaysAddToProjects] = useState(false);
  const [validation, setValidation] = useState({});

  // console.log("Taxes DashboardNavbar = ", Taxes);
  // console.log("ItemsServices DashboardNavbar = ", ItemsServices);
  // console.log("Items DashboardNavbar = ", Items);
  // console.log("Services DashboardNavbar = ", Services);

  // console.log("Items in child = ", Items)
  // console.log("Services in child = ", Services)
  // console.log("Taxes in child = ", Taxes)

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

  // const InitTaxes = async () => {
  //   try {
  //     let taxes_response = await ActionsApi.GetBusinessSalesTax({token: user.token.access}, {business_id: user.business.id});
  //     console.log("taxes_response response = ", taxes_response);

  //     setTaxes(taxes_response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const InitItemsServices = async () => {
  //   try {
  //       let items_response = await ActionsApi.GetBusinessItems({token: user.token.access}, {business_id: user.business.id});
  //       console.log("items_response child response = ", items_response);

  //       setItems(items_response.data);

  //       let services_response = await ActionsApi.GetBusinessServices({token: user.token.access}, {business_id: user.business.id});
  //       console.log("services_response response = ", services_response);

  //       setServices(services_response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  if (route.length !== 0 && route[0] === 'sales-taxes' || route[0] === 'items-services') {
    useEffect(() => {
      Promise.all([TokenValidation()])
      .then(() => {
        // console.log("isTokenValid DashboardNavbar promise then = ", isTokenValid)
        if (isTokenValid) {
          // InitTaxes();
          // InitItemsServices();
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
  }

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");

  // function handleClickOpenCreateEditDialog(row) {
  const handleClickOpenDialog = (type) => {
    handleCloseSelectMenu();
    setDialogType(type);
    setOpenDialog(true);
  }

  // const handleClickOpenAddDialog = () => {
  //   console.log("url is = ", url)
  //   console.log("history pathname is = ", history.location.pathname)
  //   history.push(`${url}/new`);
  // };

  const handleCloseDialog = () => {
    setValidation({});
    setDialogType("");
    setOpenDialog(false);
  };

  const [openTaxPickerDialog, setOpenTaxPickerDialog] = useState(false);

  const handleClickOpenTaxPicker = () => {
    setOpenTaxPickerDialog(true);
  };

  const handleCloseTaxPicker = () => {
    setOpenTaxPickerDialog(false);
    setSelectedTax(ItemsServicesTaxes);
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

  const selectRow = (event, row) => {
    event.stopPropagation();
    const selectedIndex = selectedTax.findIndex(tax => tax.id == row.id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTax, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTax.slice(1));
    } else if (selectedIndex === selectedTax.length - 1) {
      newSelected = newSelected.concat(selectedTax.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedTax.slice(0, selectedIndex),
        selectedTax.slice(selectedIndex + 1),
      );
    }
    setSelectedTax(newSelected);
  };

  const isSelected = (row) => {
    return selectedTax.findIndex(tax => tax.id == row.id) !== -1;
  };

  const apply = async () => {
    TokenValidation();
    setOpenTaxPickerDialog(false);
    setItemsServicesTaxes(selectedTax);
  };

  const save = async () => {
    TokenValidation();
    setValidation({});
    let new_validation = {};
    if (route.length !== 0 && route[0] === 'sales-taxes') {
      if (name === "") {
        // return setValidation({name: "Enter a sales tax name"});
        new_validation.name = "Enter a sales tax name";
      } else if (Taxes.findIndex(tax => tax.name.toLowerCase() === name.toLowerCase()) !== -1) {
        // return setValidation({name: "This name is already in use"});
        new_validation.name = "This name is already in use";
      }
      if (rate === "") {
        // return setValidation({rate: "Enter an sales tax rate"});
        new_validation.rate = "Enter an sales tax rate";
      }
      setValidation(new_validation);
      if (new_validation && Object.keys(new_validation).length === 0 && Object.getPrototypeOf(new_validation) === Object.prototype) {
        try {
          let data = {name, number, rate};
          data.rate = rate.length !== 0 ? Number(rate).toFixed(2) : null;
          data.business_id = user.business.id;
          let response = await ActionsApi.CreateBusinessSalesTax({ token: user.token.access }, data);
          console.log("response of CreateBusinessSalesTax = ", response);
    
          let newTaxes = [...Taxes];
          newTaxes.push(response.data.tax);
          setTaxes(newTaxes);
          handleCloseDialog();
          showToast(`${response.data.tax.name} has been added.`);
          setName("");
          setNumber("");
          setRate("");
        } catch (err) {
          console.log(err);
          console.log("error response of CreateBusinessSalesTax = ", err.response);
        }
      }
    } else if (route.length !== 0 && route[0] === 'items-services') {
      // if (name === "") {
      //   return setValidation({name: `Enter ${dialogType === "Item" ? "an item" : "a service"} name`});
      // } else if (ItemsServices.findIndex(itemService => itemService.name.toLowerCase() === name.toLowerCase()) !== -1) {
      //   return setValidation({name: "This name is already in use"});
      // }
      if (dialogType === "Item") {
        if (name === "") {
          // return setValidation({name: "Enter an item name"});
          new_validation.name = "Enter an item name";
        } else if (Items.findIndex(item => item.name.toLowerCase() === name.toLowerCase()) !== -1) {
          // return setValidation({name: "This name is already in use"});
          new_validation.name = "This name is already in use";
        }
      } else {
        if (name === "") {
          // return setValidation({name: "Enter a service name"});
          new_validation.name = "Enter a service name";
        } else if (Services.findIndex(service => service.name.toLowerCase() === name.toLowerCase()) !== -1) {
          // return setValidation({name: "This name is already in use"});
          new_validation.name = "This name is already in use";
        }
      }
      setValidation(new_validation);
      if (new_validation && Object.keys(new_validation).length === 0 && Object.getPrototypeOf(new_validation) === Object.prototype) {
        let data = {
          name,
          description,
          rate,
          business_id: user.business.id,
          sales_taxes: ItemsServicesTaxes,
        };
        data.rate = rate.length !== 0 ? Number(rate).toFixed(2) : null;
        if (dialogType === "Item") {
          try {
            data.current_stock = trackInventory && current_stock.length !== 0 ? current_stock : null;
            let response = await ActionsApi.CreateBusinessItems({ token: user.token.access }, data);
            console.log("response of CreateBusinessItems = ", response);

            let newItems = [...Items];
            newItems.push(response.data.item);
            setItems(newItems);
            setItemsServicesTaxes([]);
            handleCloseDialog();
            setTabValue(0);
            history.push(`${url}/item`);
            showToast(`${response.data.item.name} has been added.`);
            setName("");
            setDescription("");
            setRate("");
            setSelectedTax([]);
            setTrackInventory(false);
            setCurrentStock("");
          } catch (err) {
            console.log(err);
            console.log("error response of CreateBusinessItems = ", err.response);
          }
        } else {
          try {
            data = {...data, billable, always_add_to_projects}
            let response = await ActionsApi.CreateBusinessServices({ token: user.token.access }, data);
            console.log("response of CreateBusinessServices = ", response);

            let newServices = [...Services];
            newServices.push(response.data.service);
            setServices(newServices);
            setItemsServicesTaxes([]);
            handleCloseDialog();
            setTabValue(1);
            history.push(`${url}/service`);
            showToast(`${response.data.service.name} has been added.`);
            setName("");
            setDescription("");
            setRate("");
            setSelectedTax([]);
            setBillable(true);
            setAlwaysAddToProjects(false);
          } catch (err) {
            console.log(err);
            console.log("error response of CreateBusinessServices = ", err.response);
          }
        }
      }
    }
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      className={classes.navbar}
      // className={classes.navbar + (window.pageYOffset > 0 ? " navbar-is-sticky" : "")}
    >
      <Toolbar sx={{ p: "0 !important", ml: 6.5, mr: 3, }} className={classes.navbar_container}>
        <SuiBox customClass={classes.navbar_row} color="inherit" mb={{ xs: 1, md: 0 }}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SuiBox>
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
          {route.length !== 0 && route[0] === 'sales-taxes' ? (
            <>
              <DialogTitle variant="h2">
                New Tax
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
                        error={"rate" in validation}
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
            </>
          ) : route.length !== 0 && route[0] === 'items-services' && (
            <>
              <DialogTitle variant="h2">
                {`New ${dialogType}`}
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
                      {selectedTax.length === 0 
                        ? <SuiTypography variant="button" fontWeight="regular" customClass="button-link" onClick={handleClickOpenTaxPicker}>
                            Add Taxes
                            <ExpandMoreIcon className="vertical-middle" sx={{ marginLeft: "4px", fontSize: "20px !important", }} />
                          </SuiTypography>
                        : <SuiTypography variant="button" fontWeight="regular" customClass="button-link" 
                            onClick={handleClickOpenTaxPicker} style={{ display: "inline-flex", }}>
                            {selectedTax.map((tax, index) => {
                                return (
                                  <span key={`${index} — ${tax.id} — ${tax.name} — ${tax.number}`}>
                                    {index === 0 && "+"}{tax.name}
                                    {index !== selectedTax.length - 1 && ", "}
                                  </span>
                                );
                              })
                            }
                          </SuiTypography>
                      }
                      <Dialog
                        open={openTaxPickerDialog}
                        onClose={handleCloseTaxPicker}
                        classes={{ root: classes.actionTable_dialog, }}
                      >
                        <DialogTitle variant="h2">Add Taxes</DialogTitle>
                        <DialogContent>
                          <TableContainer style={{ borderRadius: 0, }}>
                            <Table>
                              <TableHead className={classes.tableHead}>
                                <TableRow>
                                  <TableCell />
                                  <TableCell>Rate</TableCell>
                                  <TableCell>Tax Name</TableCell>
                                  <TableCell>Tax Number</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody className={classes.tableBody}>
                                {Taxes.map((row, index) => {
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
                  {dialogType === "Item" ? (
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
                          onClick={() => setAlwaysAddToProjects(!always_add_to_projects)}>Automatically add this service to all new projects</SuiTypography>
                      </SuiBox>
                    </>
                  )}
                {/* </DialogContentText> */}
              </DialogContent>
            </>
          )}
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={save}>Save</Button>
            {/* <Button onClick={() => save}>Save</Button> */}
          </DialogActions>
        </Dialog>
        {isMini ? null : (
          route.length !== 0 && route[0] === 'sales-taxes' ? (
            <>
              <SuiBox customClass={classes.navbar_row}>
                <Button
                  className={`${classes.button_navbar} ${classes.rightButton_navbar}`}
                  onClick={() => handleClickOpenDialog("Sales Tax")}
                >
                  New Sales Tax
                </Button>
              </SuiBox>
            </>
          ) : route.length !== 0 && route[0] === 'vendors' && route.length === 1 ? (
            <SuiBox customClass={classes.navbar_row}>
              <Button
                className={`${classes.button_navbar} ${classes.rightButton_navbar}`}
                onClick={() => history.push(`${url}/new`)}
              >
                New Vendor
              </Button>
            </SuiBox>
          ) : route.length !== 0 && route[0] === 'items-services' ? (
            <SuiBox customClass={classes.navbar_row}>
              {route[1] !== 'service' &&
                <Button
                  className={`${classes.button_navbar} ${classes.leftButton_navbar}`}
                >
                  Import Items
                </Button>
              }
              <Button
                onClick={handleClickSelectMenu}
                endIcon={<ExpandMoreIcon />}
                className={`${classes.button_navbar} ${classes.rightButton_navbar}`}
              >
                Create New ...
              </Button>
              <StyledMenu
                MenuListProps={{
                  sx: { width: anchorEl && anchorEl.offsetWidth }
                }}
                anchorEl={anchorEl}
                open={openSelectMenu}
                onClose={handleCloseSelectMenu}
                className={classes.items_services_menu}
              >
                <MenuItem disableRipple onClick={() => handleClickOpenDialog("Item")}>
                  <SuiBox>
                    <LocalShippingIcon />
                  </SuiBox>
                  <SuiTypography variant="h6" fontWeight="regular">Item</SuiTypography>
                  <SuiTypography variant="button" fontWeight="regular">
                    Items can be added to invoices to bill your clients
                  </SuiTypography>
                </MenuItem>
                <MenuItem disableRipple onClick={() => handleClickOpenDialog("Service")}>
                  <SuiBox>
                    <DesignServicesIcon />
                  </SuiBox>
                  <SuiTypography variant="h6" fontWeight="regular">Service</SuiTypography>
                  <SuiTypography variant="button" fontWeight="regular">
                    {`Services help you keep track of where you're spending time and can be billed to your clients`}
                  </SuiTypography>
                </MenuItem>
              </StyledMenu>
            </SuiBox>
          ) : route.length !== 0 && route[0] === 'clients' && route.length === 1 ? (
            <SuiBox customClass={classes.navbar_row}>
              {/* <SuiBox pr={1}>
                <SuiInput
                  placeholder="Type here..."
                  withIcon={{ icon: "search", direction: "left" }}
                  customClass={classes.navbar_input}
                />
              </SuiBox>
              <SuiBox
                color={light ? "white" : "inherit"}
                customClass={classes.navbar_section_desktop}
              >
                <IconButton
                  size="small"
                  color="inherit"
                  className={classes.navbar_mobile_menu}
                  onClick={handleMiniSidenav}
                >
                  <Icon>{miniSidenav ? "menu_open" : "menu"}</Icon>
                </IconButton>
                <IconButton
                  color="inherit"
                  className={classes.navbar_icon_button}
                  onClick={handleConfiguratorOpen}
                >
                  <Icon>settings</Icon>
                </IconButton>
                <IconButton
                  color="inherit"
                  className={classes.navbar_icon_button}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <Icon>notifications</Icon>
                </IconButton>
                {renderMenu()}
              </SuiBox> */}

              <Button
                // disableElevation
                onClick={handleClickSelectMenu}
                endIcon={<ExpandMoreIcon />}
                className={`${classes.button_navbar} ${classes.leftButton_navbar}`}
              >
                More Actions
              </Button>
              <StyledMenu
                MenuListProps={{
                  sx: { width: anchorEl && anchorEl.offsetWidth }
                }}
                anchorEl={anchorEl}
                open={openSelectMenu}
                onClose={handleCloseSelectMenu}
              >
                <MenuItem disableRipple>
                  <CgImport /> Import Clients
                </MenuItem>
                {/* <MenuItem onClick={handleClickOpenDialog} disableRipple> */}
                <MenuItem disableRipple>
                  <CgExport /> Export Clients
                </MenuItem>
              </StyledMenu>
              <Button
                className={`${classes.button_navbar} ${classes.rightButton_navbar}`}
                onClick={() => history.push(`${url}/new`)}
              >
                New Client
              </Button>
            </SuiBox>
          ) : route.length !== 0 && route[0] === 'invoices' && route.length === 1 && (
            <SuiBox customClass={classes.navbar_row}>
              <Button
                className={`${classes.button_navbar} ${classes.rightButton_navbar}`}
                onClick={() => {
                  // history.push(`${url}/new`);
                  history.push({
                    pathname: `${url}/new`,
                    // state: {
                    //   allClients: Clients,
                    //   allInvoices: Invoices,
                    // }
                  });
                }}
              >
                {/* history.push("/invoices/new"); */}
                New Invoice
              </Button>
            </SuiBox>
          )
        )}
      </Toolbar>
      {/* <Divider /> */}
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  // data: [],
  // Items: ,
  // setItems: ,
  // Services: ,
  // setServices: ,
  // Taxes: ,
  // setTaxes: ,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  // data: PropTypes.arrayOf(PropTypes.object),
  setTabValue: PropTypes.func,
  Items: PropTypes.array,
  setItems: PropTypes.func,
  Services: PropTypes.array,
  setServices: PropTypes.func,
  Taxes: PropTypes.array,
  setTaxes: PropTypes.func,
  Clients: PropTypes.array,
  Invoices: PropTypes.array,
};

export default DashboardNavbar;
