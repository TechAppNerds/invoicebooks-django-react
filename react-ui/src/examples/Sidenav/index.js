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

// react-router-dom components
import {
  useLocation,
  NavLink,
  useHistory,
  Redirect,
} from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";

// @mui material components
import {
  Drawer,
  List,
  Divider,
  Icon,
  Link,
  Menu,
  Avatar,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  // DialogTitle,
  DialogContent,
  // DialogContentText,
  DialogActions,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  // Slide,
  // Alert as MuiAlert,
} from "@mui/material";

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

import {
  Storefront as StorefrontIcon,
} from "@mui/icons-material";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";
import SuiAvatar from "components/SuiAvatar";

// Soft UI Dashboard React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
// import SidenavCard from "examples/Sidenav/SidenavCard";
import NotificationItem from "examples/NotificationItem";

// Custom styles for the Sidenav
// import styles from "examples/Sidenav/styles/sidenav";

// Soft UI Dashboard React icons
// import Settings from "examples/Icons/Settings";

import { AiOutlineMail } from "react-icons/ai";
import { BsBank2 } from "react-icons/bs";
import { ImPriceTag, ImGift } from "react-icons/im";
import { MdPayment, MdOutlineLiveHelp, MdLogout } from "react-icons/md";
import { TbReceiptTax } from "react-icons/tb";
import {
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

// Images
// import SoftUILogo from "assets/images/logo-ct.png";
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import successIcon from "assets/images/success-icon.png";

// Soft UI Dashboard React context
import { useSoftUIController } from "context";
// import { SoftUI } from "context";

// import { useAuth } from "auth-context/auth.context";
import { AuthContext } from "../../auth-context/auth.context";
import AuthApi from "../../api/auth";
import ActionsApi from "../../api/actions";

const useStyles = (theme) => {
  const sidebarWidth = 250;
  const { palette, typography, boxShadows, transitions, breakpoints, functions } = theme;
  const { white, transparent } = palette;
  const { fontWeightMedium } = typography;
  const { xxl } = boxShadows;
  const { pxToRem } = functions;
  // return makeStyles(({ miniSidenav, transparentSidenav }) => ({
  return makeStyles(() => ({
    settings_menu: {
      // marginTop: "1rem",
      // padding: 0,
      border: "2px solid #7f8c9f",
      borderRadius: 5,
      boxShadow: "4px 4px rgb(6 41 66 / 10%)",

      "& .MuiTypography-root.MuiTypography-h6": {
        // margin: "0.3375rem 0.675rem",
        padding: "8px 12px 4px",
      },

      "& a.add-switch-businesses": {
        // margin: "0 0.675rem",
        padding: "0 12px",
        color: "#0063c1",
        "&:focus, &:hover": {
          color: "#004889 !important",
        },
      },

      // "& .MuiBox-root": {
      //   padding: 0,
      // },

      "& .MuiDivider-root": {
        margin: "0.675rem 0",
        backgroundColor: "#cdd4d9",
        backgroundImage: "unset !important",
        opacity: 1,
      },

      "& .MuiList-root": {
        "& .MuiListItem-root": {
          cursor: "pointer",
          "&:not(:last-child)": {
            marginBottom: "0.3375rem",
          },
          "&:focus, &:hover": {
            backgroundColor: "#eef6fc",
            "& .MuiListItemIcon-root": {
              color: "#0063c1",
            },
            "& .MuiListItemText-root": {
              "& .MuiTypography-root": {
                color: "#0063c1",
              },
            },
          },
        },
      },

      "& .MuiListItemIcon-root": {
        backgroundColor: "unset",
        boxShadow: "unset",
        fontSize: 20,

        display: "grid",
        minWidth: "2rem",
        minHeight: "2rem",
        placeItems: "center",
        borderRadius: "0.5rem",
      },

      "& .MuiListItemText-root": {
        "& .MuiTypography-root": {
          marginLeft: "0.8rem",
          fontSize: "0.875rem",
          color: "#001b40",
        },
      },
    },
    
    sidenav: {
      backgroundColor: "#0075dd !important",
      borderRadius: 0,
      margin: 0,
      width: "initial",
      height: "100%",

      boxShadow: xxl,
      border: "none",

      // [breakpoints.up("xl")]: {
      //   backgroundColor: transparentSidenav ? transparent.main : white.main,
      //   boxShadow: transparentSidenav ? "none" : xxl,
      //   marginBottom: transparentSidenav ? 0 : "inherit",
      //   left: "0",
      // },
      [breakpoints.up("xl")]: {
        backgroundColor: ({ transparentSidenav }) =>
          transparentSidenav ? transparent.main : white.main,
        boxShadow: ({ transparentSidenav }) => (transparentSidenav ? "none" : xxl),
        marginBottom: ({ transparentSidenav }) => (transparentSidenav ? 0 : "inherit"),
        left: "0",
      },

      "& .MuiDivider-root": {
        // margin: 0,
        backgroundColor: "#fff",
        backgroundImage: "unset !important",
        opacity: 1,
        width: "87%",
        alignSelf: "center",
      },

      "& .MuiList-root": {
        height: "50%",
        marginRight: 2,
        overflow: "hidden",
        "&:hover": {
          overflowY: "scroll",
        },
        "&::-webkit-scrollbar": {
          width: 8,
          "&-track": {
            backgroundColor: "unset",
          },
          "&-thumb": {
            borderRadius: 4,
            backgroundColor: "#7fbaee",
          },
        },
        "& a": {
          "&:focus, &:hover": {
            "& .MuiListItem-root::before": {
              content: `""`,
              borderStyle: "solid",
              borderWidth: "8px 9px 8px 0",
              borderColor: "transparent #fff transparent transparent",
              position: "fixed",
              right: 0,
            },
            // "& .MuiBox-root": {
              /* background-color: rgb(23, 193, 232); */
              /* background: rgb(33, 212, 253); */
              /* background-image: linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253)); */
              /* background-image: linear-gradient(310deg, rgb(23, 193, 232), rgb(33, 212, 253)); */
            // },
          },
          "& .MuiBox-root": {
            color: "#fff",
            backgroundColor: "unset",
            boxShadow: "unset",
            "& .MuiListItemIcon-root": {
              backgroundColor: "unset",
              boxShadow: "unset",
              "& svg, g": {
                fill: "#fff",
              },
            },
          },
        },
      },
    },

    sidenav_header: {
      // padding: `${pxToRem(24)} ${pxToRem(32)} ${pxToRem(8)}`,
      // padding: `${pxToRem(24)} ${pxToRem(8)} ${pxToRem(8)} ${pxToRem(64)}`,
      padding: `${pxToRem(24)} ${pxToRem(8)} ${pxToRem(8)} ${pxToRem(80)}`,
      textAlign: "center",

      "& a": {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
      },
    },

    sidenav_profile: {
      display: "flex",
      justifyContent: "space-between",
      "& .MuiTypography-root": {
        color: "#fff",
        "&.company": {
          maxWidth: 120,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        },
      },
    },

    sidenav_profile_section_desktop: {
      display: "grid",
      height: "fit-content",
      color: "#fff",
    },

    sidenav_logo: {
      width: pxToRem(32),
    },

    sidenav_logoLabel: {
      marginLeft: pxToRem(4),
      fontWeight: fontWeightMedium,
      wordSpacing: pxToRem(-1),
      transition: transitions.create("opacity", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),

      [breakpoints.up("xl")]: {
        // opacity: miniSidenav ? 0 : 1,
        opacity: ({ miniSidenav }) => (miniSidenav ? 0 : 1),
      },
    },

    sidenav_title: {
      display: "block",
      opacity: 0.6,
      paddingLeft: pxToRem(24),
      margin: `${pxToRem(16)} 0 ${pxToRem(8)} ${pxToRem(8)}`,
    },

    marginTopNone: {
      marginTop: 0,
    },

    sidenav_footer: {
      margin: `auto ${pxToRem(16)} ${pxToRem(16)}`,
      paddingTop: pxToRem(16),
    },

    sidenav_open: {
      transform: "translateX(0)",
      transition: transitions.create("transform", {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),

      [breakpoints.up("xl")]: {
        width: sidebarWidth,
        transform: "translateX(0)",
        transition: transitions.create(["width", "background-color"], {
          easing: transitions.easing.sharp,
          duration: transitions.duration.enteringScreen,
        }),
      },
    },

    sidenav_close: {
      transform: `translateX(${pxToRem(-320)})`,
      transition: transitions.create("transform", {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),

      [breakpoints.up("xl")]: {
        width: pxToRem(96),
        overflowX: "hidden",
        transform: "translateX(0)",
        transition: transitions.create(["width", "background-color"], {
          easing: transitions.easing.sharp,
          duration: transitions.duration.shorter,
        }),
      },
    },

    sidenav_navlink: {
      textDecoration: "none",
    },
  }));
};

function Sidenav({ routes, ...rest }) {
  // const [controller, dispatch] = useSoftUIController();
  const { controller, dispatch } = useSoftUIController();
  // const [controller, dispatch] = useContext(SoftUI);
  const { miniSidenav, transparentSidenav } = controller;
  // const miniSidenav = false;
  // const transparentSidenav = true;
  // const classes = styles({ miniSidenav, transparentSidenav });
  const theme = useTheme();
  const classes = useStyles(theme)({ miniSidenav, transparentSidenav });
  const { user, setUser } = useContext(AuthContext);
  // console.log("user in index Sidenav = ", JSON.stringify(user, null, 2));
  // console.log("user business in index Sidenav = ", user.business);
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const history = useHistory();

  const closeSizenav = () => dispatch({ type: "MINI_SIDENAV", value: true });

  // console.log("location Sidenav = ", location);
  // console.log("pathname Sidenav = ", pathname);
  // console.log("collapseName Sidenav = ", collapseName);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      dispatch({
        type: "MINI_SIDENAV",
        value: window.innerWidth < 1200,
      });
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, route, href }) => {
    const sidenavCollapse = (
      <SidenavCollapse
        name={name}
        icon={icon}
        active={key === collapseName}
        noCollapse={noCollapse}
      />
    );
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          className={classes.sidenav_navlink}
        >
          {sidenavCollapse}
        </Link>
      ) : (
        <NavLink to={route} key={key} className={classes.sidenav_navlink}>
          {sidenavCollapse}
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <SuiTypography
          key={key}
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          customClass={classes.sidenav_title}
        >
          {title}
        </SuiTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} />;
    }

    return returnValue;
  });

  const [openMenu, setOpenMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleOpenSettings = (event) => setOpenSettings(event.currentTarget);
  const handleCloseSettings = () => setOpenSettings(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      // getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      // style={{ marginTop: "1rem", }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" className="material-icon-round text-white">
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  // Render the settings menu
  const renderSettings = () => (
    <Menu
      anchorEl={openSettings}
      // getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openSettings)}
      onClose={handleCloseSettings}
      classes={{ paper: classes.settings_menu, }}
    >
      <SuiTypography variant="h6">
        {user.business.name}
      </SuiTypography>
      {/* <NavLink className="add-switch-businesses">
        Add or Switch Businesses
      </NavLink> */}
      <SuiTypography 
        variant="button" fontWeight="regular"
        customClass="button-link" 
        sx={{
          // "& a.add-switch-businesses": {
          //   // margin: "0 0.675rem",
          //   padding: "0 12px",
          //   color: "#0063c1",
          //   "&:focus, &:hover": {
          //     color: "#004889 !important",
          //   },
          // },
          "&.MuiTypography-button.button-link": {
            display: "block",
            padding: "0 12px",
            fontSize: "0.875rem",
            color: "#0063c1",
            cursor: "pointer",
            "&:focus, &:hover": {
              color: "#004889",
            },
          },
        }}
        onClick={handleOpenBusinessDialog}>
        Add or Switch Businesses
      </SuiTypography>
      <Divider />
      {/* <NavLink to="/">
        <IconButton
          color="inherit"
          className={classes.sidenav_profile_icon_button}
        >
          <Icon>settings</Icon>
        </IconButton>
        <SuiTypography component="h6" variant="button" fontWeight="medium">
          Settings
        </SuiTypography>
      </NavLink> */}
      {/* <NavLink to="/rtl" key="rtl" className={classes.sidenav_navlink}>
        <SidenavCollapse
          name="Settings"
          // icon={<Settings size="12px" />}
          icon={<Icon>settings</Icon>}
          active={"rtl" === collapseName}
          noCollapse={true}
          style={{ margin: "0px 0px 0.675rem", padding: 0 }}
        />
      </NavLink> */}
      
      {/* <NavLink to="/settings" key="settings"> */}
        {/* <SidenavCollapse
          name="Settings"
          icon={<Icon>settings</Icon>}
          active={"settings" === collapseName}
          noCollapse={true}
          style={{ margin: "0px 0px 0.675rem", }}
        /> */}
      {/* </NavLink> */}
      
      {/* <NavLink to="/dashboard" key="payments">
        <SidenavCollapse
          name="Payments Settings"
          icon={<MdPayment />}
          active={"payments" === collapseName}
          noCollapse={true}
          style={{ margin: "0px 0px 0.675rem", }}
        />
      </NavLink> */}
      
      {/* <NavLink to="/dashboard" key="bank">
        <SidenavCollapse
          name="Bank Connections"
          icon={<BsBank2 />}
          active={"bank" === collapseName}
          noCollapse={true}
          style={{ margin: "0px 0px 0.675rem", }}
        />
      </NavLink> */}
      
      {/* <NavLink to="/dashboard" key="email">
        <SidenavCollapse
          name="Emails &#38; Templates"
          icon={<AiOutlineMail />}
          active={"email" === collapseName}
          noCollapse={true}
          style={{ margin: "0px 0px 0.675rem", }}
        />
      </NavLink> */}
      <List>
        <ListItem onClick={() => changePath("settings")}>
          <ListItemIcon>
            <Icon>settings</Icon>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        
        <ListItem>
          <ListItemIcon>
            <MdPayment />
          </ListItemIcon>
          <ListItemText primary="Payments Settings" />
        </ListItem>
        
        <ListItem>
          <ListItemIcon>
            <BsBank2 />
          </ListItemIcon>
          <ListItemText primary="Bank Connections" />
        </ListItem>
        
        <ListItem>
          <ListItemIcon>
            <AiOutlineMail />
          </ListItemIcon>
          <ListItemText primary="Emails &#38; Templates" />
        </ListItem>

        <ListItem onClick={() => history.push("/items-services/item")}>
          <ListItemIcon>
            <ImPriceTag />
          </ListItemIcon>
          <ListItemText primary="Items &#38; Services" />
        </ListItem>

        <ListItem onClick={() => history.push("/sales-taxes")}>
          <ListItemIcon>
            <TbReceiptTax />
          </ListItemIcon>
          <ListItemText primary="Sales Taxes" />
        </ListItem>

        <ListItem onClick={() => history.push("/vendors")}>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText primary="Vendors" />
        </ListItem>
      </List>
      {/* <NavLink to="/dashboard" key="item">
        <SidenavCollapse
          name="Items &#38; Services"
          icon={<ImPriceTag />}
          active={"item" === collapseName}
          noCollapse={true}
          style={{ margin: 0, }}
        />
      </NavLink> */}

      
      <Divider />
      {/* <NavLink to="/dashboard" key="help">
        <SidenavCollapse
          name="Help"
          icon={<MdOutlineLiveHelp />}
          active={"help" === collapseName}
          noCollapse={true}
          style={{ margin: "0px 0px 0.675rem", }}
        />
      </NavLink> */}
      <List>
        <ListItem>
          <ListItemIcon>
            <MdOutlineLiveHelp />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <ImGift />
          </ListItemIcon>
          <ListItemText primary="Refer a Friend" />
        </ListItem>
      </List>
      {/* <NavLink to="/dashboard" key="refer">
        <SidenavCollapse
          name="Refer a Friend"
          icon={<ImGift />}
          active={"refer" === collapseName}
          noCollapse={true}
          style={{ margin: 0, }}
        />
      </NavLink> */}
      <Divider />
      {/* <NavLink to="/dashboard" key="logout">
        <SidenavCollapse
          name="Log Out"
          icon={<MdLogout />}
          active={"logout" === collapseName}
          noCollapse={true}
          style={{ margin: "0px 0px 0.3375rem", }}
        />
      </NavLink> */}
      <List>
        <ListItem onClick={handleLogout}>
          <ListItemIcon>
            <MdLogout />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Menu>
  );

  const handleLogout = () => {
    handleCloseSettings();
    AuthApi.Logout(user);
    setUser(null);
    localStorage.removeItem("user");
    return history.push("/authentication/sign-in");
    // return history.push("/authentication/sign-out");
  };

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
  
  // function stringAvatar(name) {
  //   return {
  //     sx: {
  //       bgcolor: stringToColor(name),
  //       width: 65,
  //       height: 65,
  //     },
  //     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  //   };
  // }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: "#fff",
        // color: stringToColor(name),
        color: "#001b40",
        borderColor: stringToColor(name),
        borderWidth: 3,
        borderStyle: "solid",
        // width: 75,
        // height: 75,
        // fontSize: 35,
        // width: 70,
        // height: 70,
        // fontSize: 32,
        width: 80,
        height: 80,
        fontSize: 37,
        fontWeight: 500,
        textTransform: "uppercase"
      },
      children: name.split(" ").length > 1 ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : `${name.slice(0, 2)}`,
    };
  }

  function changePath(name) {
    handleCloseSettings();
    history.push(`/${name}`);
  }

  
  // let { user } = useAuth();

  // console.log("user in useAuth index sidenav = ", user);
  // if (!user || !user.token || user.token === "") {

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

  function getTimeZone() {
    let offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset < 0 ? "+" : "-") + Math.floor(o / 60) + ":" + ("00" + (o % 60)).slice(-2);
  }

  // function nonEmptyObject(obj) {
  //   return obj && Object.keys(obj).length !== 0 && Object.getPrototypeOf(obj) === Object.prototype;
  // }

  const [country, setCountry] = useState(user.country ? user.country : countryOptions[0]);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [validation, setValidation] = useState({});

  const [openBusinessDialog, setOpenBusinessDialog] = useState(false);
  const handleOpenBusinessDialog = () => {
    handleCloseSettings();
    setOpenBusinessDialog(true);
  };
  const handleCloseBusinessDialog = () => {
    setOpenBusinessDialog(false);
  };

  const [openWelcomeDialog, setOpenWelcomeDialog] = useState(false);
  const handleOpenWelcomeDialog = () => {
    setOpenWelcomeDialog(true);
  };
  const handleCloseWelcomeDialog = () => {
    setOpenWelcomeDialog(false);
  };

  const create = async (event) => {
    setValidation({});
    if (event) {
      event.preventDefault();
    }
    let new_validation = {};
    if (businessName === "") {
      new_validation.business_name = "Please enter a business name";
    }
    if (country === "") {
      new_validation.country = "Please choose a country";
    }
    if (industry === "") {
      new_validation.industry = "Please choose a industry";
    }
    // console.log("new_validation is = ", new_validation)
    setValidation(new_validation);
    // if (error === undefined) {
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

      try {
        let date_time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/");
        let time_zone = `(UTC${getTimeZone()}) ${date_time_zone[0]} — ${date_time_zone[1]}`;
        let business_response, data = {
          // owner: user.id,
          name: businessName,
          country,
          industry,
          owner_id: user.id,
          logged_out_id: user.business.id,
          time_zone,
        };
        // if (user.business.length === 0) {
        // if (user.business && Object.keys(user.business).length === 0 && Object.getPrototypeOf(user.business) === Object.prototype) {
          // data.owner = user.id;
        business_response = await ActionsApi.CreateBusiness({ token }, data);
        let current_user = {...user, ...business_response.data};

        let init_notification_response = await AuthApi.InitializationNotification({ business_id: current_user.business.id });
        console.log("init_notification_response response = ", init_notification_response);
        
        if (init_notification_response.status === 201 && init_notification_response.statusText === "Created") {
          current_user = {...current_user, business: {...current_user.business, ...init_notification_response.data}};
          current_user = JSON.stringify(current_user);
          setUser(current_user);
          localStorage.setItem("user", current_user);
          handleCloseBusinessDialog();
          handleOpenWelcomeDialog();
        }
        
        
        // showToast("")
        // return history.push("/dashboard");
      } catch (err) {
        console.log(err);
      }
      
    }
  };

  // function toastSlideTransition(props) {
  //   return <Slide {...props} direction="down" />;
  // }
  
  // const Alert = forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });

  // const [toastState, setToastState] = useState(false);
  // const [toastMessage, setToastMessage] = useState({});
  // const [toastTransition, setToastTransition] = useState(undefined);

  // const showToast = (message) => {
  //   setToastMessage(message);
  //   setToastTransition(() => toastSlideTransition);
  //   setToastState(true);
  // };

  // function closeToast() {
  //   // setToastTransition(undefined);
  //   setToastState(false);
  // }

  return (
    <>
      <Dialog
        open={openWelcomeDialog}
        onClose={handleCloseWelcomeDialog}
        >
          <DialogContent>
            {/* <img src={successIcon} width="80" height="80" /> */}
            <SuiBox mb={3} customClass="d-flex" style={{ justifyContent: "center", }}>
              <SuiAvatar
                sx={{
                  width: "70px !important",
                  height: "70px !important",
                  backgroundColor: "#37a703",
                  fontSize: "45px !important",
                }}
              >
                <Icon>check</Icon>
              </SuiAvatar>
            </SuiBox>
            <SuiBox mb={3}>
            <SuiTypography variant="h3" fontWeight="bold" customClass="text-center" style={{ fontSize: "29px", }}>Welcome to {user.business.name}</SuiTypography>
            </SuiBox>
            <SuiTypography variant="button" fontWeight="regular" customClass="d-flex text-center" style={{ fontSize: "1rem", }}>
              You can now send and receive invoices, track expenses and collaborate on projects in your new business
            </SuiTypography>
          </DialogContent>
        </Dialog>
      <Dialog
        open={openBusinessDialog}
        onClose={handleCloseBusinessDialog}
        // classes={{ root: classes.actionTable_dialog, }}
        // classes={{ root: classes.business_dialog, }}
        sx={{
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
                "& .required.MuiTypography-root::after": {
                  content: `"*"`,
                  color: "#e32",
                  fontWeight: "700",
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
                padding: "12px 24px !important",
                "& .MuiButton-root": {
                  fontSize: "0.875rem",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  border: "2px solid transparent",
                  transition: "border-color .15s",
                  transform: "unset",
                  backgroundColor: "#37a703",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#348e09",
                  },
                },
              },
            },
          },
        }}
      >
        <DialogContent>
          <SuiBox mb={3} className="w-100">
            <SuiTypography variant="button" fontWeight="regular">Business Name</SuiTypography>
            <SuiInput
              error={"business_name" in validation}
              placeholder="Business Name"
              value={businessName}
              onChange={(event) => {
                setBusinessName(event.target.value);
                setValidation({});
              }}
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
          </SuiBox>
          <SuiBox mb={3}>
            <SuiTypography variant="button" fontWeight="regular">Country</SuiTypography>
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
                setValidation({});
                // countryRef.blur();
              }}
              onBlur={() => {
                const index = countryOptions.findIndex(option => {
                  return option.toLowerCase() === country.toLowerCase();
                });
                if (index !== -1) {
                  setCountry(countryOptions[index]);
                } else {
                  setCountry("")
                }
              }}
              options={countryOptions}
              noOptionsText="No results found"
              renderInput={(params) => 
                <TextField {...params}
                  error={"country" in validation}
                  placeholder="Country"
                  // ref={countryRef}
                  onChange={({ target }) => {
                    setCountry(target.value);
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
          <SuiBox mb={3}>
            <SuiTypography variant="button" fontWeight="regular">
              What do you do for your clients?
            </SuiTypography>
            <Select
              value={industry}
              renderValue={industry !== "" ? undefined : () => "Choose industry"}
              onChange={(event) => {setIndustry(event.target.value);setValidation({});}}
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
        </DialogContent>
        <DialogActions>
          <SuiButton onClick={create}>Create My Business</SuiButton>
        </DialogActions>
      </Dialog>
      <Drawer
        {...rest}
        variant="permanent"
        classes={{
          paper: clsx(classes.sidenav, {
            [classes.sidenav_open]: !miniSidenav,
            [classes.sidenav_close]: miniSidenav,
          }),
        }}
      >
        <SuiBox
          customClass={classes.sidenav_header}
          // onClick={handleOpenMenu}
          // onClick={handleOpenSettings}
        >
          <SuiBox
            display={{ xs: "block", xl: "none" }}
            position="absolute"
            top={0}
            right={0}
            p={1.625}
            customClass="cursor-pointer"
            onClick={closeSizenav}
          >
            <SuiTypography variant="h6" textColor="secondary">
              <Icon className="font-bold">close</Icon>
            </SuiTypography>
          </SuiBox>
          <SuiBox customClass={classes.sidenav_profile}>
            <SuiBox style={{ display: "grid", }}>
              {user.profile_photo
                ? <Avatar style={{ justifySelf: "center", width: 80, height: 80, }} src={user.profile_photo} />
                : <Avatar style={{ justifySelf: "center", }} {...stringAvatar(`${user.first_name} ${user.last_name}`)} />}
              <SuiTypography customClass="name" mt={1.5} variant="button" fontWeight="regular">
                {user.first_name}
              </SuiTypography>
              <SuiTypography customClass="company" variant="button" fontWeight="medium">
                {/* Zotyp&#39;s Company */}
                {user.business.name}
              </SuiTypography>
            </SuiBox>
            <SuiBox customClass={classes.sidenav_profile_section_desktop}>
              <IconButton
                color="inherit"
                className={classes.sidenav_profile_icon_button}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon>notifications</Icon>
              </IconButton>
              {renderMenu()}
              <IconButton
                color="inherit"
                className={classes.sidenav_profile_icon_button}
                onClick={handleOpenSettings}
              >
                <Icon>settings</Icon>
              </IconButton>
              {renderSettings()}
            </SuiBox>
          </SuiBox>
          {/* {renderMenu()} */}
          
          {/* <NavLink to="/">
            <SuiBox
              component="img"
              src={SoftUILogo}
              alt="Soft UI Logo"
              customClass={classes.sidenav_logo}
            />
            <SuiBox customClass={classes.sidenav_logoLabel}>
              <SuiTypography component="h6" variant="button" fontWeight="medium">
                Soft UI Dashboard
              </SuiTypography>
            </SuiBox>
          </NavLink> */}
        </SuiBox>
        
        <Divider />
        <List>{renderRoutes}</List>
        {/* <SuiBox customClass={classes.sidenav_footer}>
          <SidenavCard />
          <SuiBox mt={2}>
            <SuiButton
              component="a"
              href="https://appseed.us/full-stack/react-soft-ui-dashboard"
              target="_blank"
              rel="noreferrer"
              variant="gradient"
              buttonColor="info"
              fullWidth
            >
              Pro Version
            </SuiButton>
          </SuiBox>
        </SuiBox> */}
      </Drawer>
    </>
  );
}

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  // user: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
