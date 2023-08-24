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

import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Custom styles for the LayoutContainer
// import styles from "examples/LayoutContainers/DashboardLayout/styles";

// Soft UI Dashboard React context
import { useSoftUIController } from "context";

const useStyles = (theme) => {
  const { functions, breakpoints, transitions } = theme;
  const { pxToRem } = functions;
  return makeStyles(() => ({
    layoutContainer: {
      position: "relative",
      // padding: pxToRem(24),

      [breakpoints.up("xl")]: {
        marginLeft: ({ direction, miniSidenav }) => {
          if (direction === "ltr") {
            // return miniSidenav ? pxToRem(120) : pxToRem(274);
            return miniSidenav ? pxToRem(120) : pxToRem(250);
          }

          return false;
        },
        marginRight: ({ direction, miniSidenav }) => {
          if (direction === "rtl") {
            // return miniSidenav ? pxToRem(120) : pxToRem(274);
            return miniSidenav ? pxToRem(120) : pxToRem(250);
          }

          return false;
        },
        transition: transitions.create(["margin-left", "margin-right"], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
      },

      // padding: 0,
      padding: "0 40px",
      // marginLeft: 250,
    },
  }));
};

function LayoutContainer({ children }) {
  // const [controller, dispatch] = useSoftUIController();
  const { controller, dispatch } = useSoftUIController();
  const { miniSidenav, direction } = controller;
  // console.log("controller in LayoutContainer DashboardLayout = ", JSON.stringify(controller, null, 2));
  const { pathname } = useLocation();
  // console.log("pathname in LayoutContainer DashboardLayout = ", pathname);
  // const classes = styles({ miniSidenav, direction });
  const theme = useTheme();
  const classes = useStyles(theme)({ miniSidenav, direction });

  useEffect(() => {
    dispatch({ type: "LAYOUT", value: "dashboard" });
  }, [pathname]);

  return <SuiBox customClass={classes.layoutContainer}>{children}</SuiBox>;
}

// Typechecking props for the LayoutContainer
LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContainer;
