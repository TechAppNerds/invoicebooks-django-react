/**
=========================================================
* Soft UI Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// Soft UI Dashboard PRO React components
import SuiBox from "components/SuiBox";

// Custom styles for the SuiAlert
// import styles from "components/SuiAlert/styles";


const useStyles = (theme, color) => {
  const { palette, typography, borders, functions, transitions } = theme;
  const { white, alertColors } = palette;
  const { size, fontSizeRegular, fontWeightMedium } = typography;
  const { borderWidth, borderRadius } = borders;
  const { pxToRem, linearGradient } = functions;
  return makeStyles(() => ({
    alert: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      minHeight: pxToRem(60),
      backgroundImage: linearGradient(alertColors[color].main, alertColors[color].state),
      color: white.main,
      position: "relative",
      padding: pxToRem(16),
      marginBottom: pxToRem(16),
      border: `${borderWidth[1]} solid ${alertColors[color].border}`,
      borderRadius: borderRadius.md,
      fontSize: fontSizeRegular,
      fontWeight: fontWeightMedium,
    },

    alert_closeIcon: {
      color: white.main,
      fontSize: size.xl,
      padding: `${pxToRem(9)} ${pxToRem(6)} ${pxToRem(8)}`,
      marginLeft: pxToRem(40),
      fontWeight: fontWeightMedium,
      opacity: 0.5,
      cursor: "pointer",
      lineHeight: 0,
      transition: transitions.create("opacity", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),

      "&:hover": {
        opacity: 1,
      },
    },
  }));
};

function SuiAlert({ color, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");
  // const classes = styles({ color });
  const theme = useTheme();
  const classes = useStyles(theme, color)();

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <SuiBox {...rest} customClass={classes.alert}>
        <SuiBox display="flex" alignItems="center">
          {children}
        </SuiBox>
        {dismissible ? (
          <SuiBox
            component="span"
            customClass={classes.alert_closeIcon}
            onClick={mount ? handleAlertStatus : null}
          >
            &times;
          </SuiBox>
        ) : null}
      </SuiBox>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of SuiAlert
SuiAlert.defaultProps = {
  color: "info",
  dismissible: false,
};

// Typechecking props of the SuiAlert
SuiAlert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default SuiAlert;
