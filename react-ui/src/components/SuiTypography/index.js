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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";

// @mui material components
import Typography from "@mui/material/Typography";

// Custom styles for SuiTypography
// import styles from "components/SuiTypography/styles";

import { makeStyles } from '@mui/styles';

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";


const { palette, typography, functions } = theme;
const { gradients, transparent } = palette;
const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } = typography;
const { linearGradient } = functions;

const useStyles = makeStyles({
  suiTypography: {
    color: ({ textColor }) => (textColor === "inherit" ? "inherit" : palette[textColor].main),
    opacity: ({ opacity }) => opacity,
    textDecoration: "none",
  },

  suiTypography_light: {
    fontWeight: fontWeightLight,
  },

  suiTypography_regular: {
    fontWeight: fontWeightRegular,
  },

  suiTypography_medium: {
    fontWeight: fontWeightMedium,
  },

  suiTypography_bold: {
    fontWeight: fontWeightBold,
  },

  suiTypography_textTransform: {
    textTransform: ({ textTransform }) => textTransform,
  },

  suiTypography_verticalAlign: {
    verticalAlign: ({ verticalAlign }) => verticalAlign,
  },

  suiTypography_textGradient: {
    backgroundImage: ({ textColor }) =>
      textColor !== "inherit" &&
      textColor !== "text" &&
      textColor !== "white" &&
      linearGradient(gradients[textColor].main, gradients[textColor].state),
    display: "inline-block",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: transparent.main,
    position: "relative",
    zIndex: 1,
  },
});

const SuiTypography = forwardRef(
  (
    {
      textColor,
      fontWeight,
      textTransform,
      verticalAlign,
      textGradient,
      opacity,
      customClass,
      children,
      ...rest
    },
    ref
  ) => {
    // const classes = styles({ textColor, textTransform, verticalAlign, opacity });
    const classes = useStyles({ textColor, textTransform, verticalAlign, opacity });

    return (
      <Typography
        {...rest}
        ref={ref}
        className={clsx(classes.suiTypography, customClass, {
          [classes[`suiTypography_${fontWeight}`]]: fontWeight,
          [classes.suiTypography_textTransform]: textTransform,
          [classes.suiTypography_verticalAlign]: verticalAlign,
          [classes.suiTypography_textGradient]: textGradient,
        })}
      >
        {children}
      </Typography>
    );
  }
);

// Setting default values for the props of SuiTypography
SuiTypography.defaultProps = {
  textColor: "dark",
  fontWeight: false,
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
  customClass: "",
};

// Typechecking props for the SuiTypography
SuiTypography.propTypes = {
  textColor: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
  ]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
  customClass: PropTypes.string,
};

export default SuiTypography;
