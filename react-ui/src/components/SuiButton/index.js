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
import Button from "@mui/material/Button";

// Custom styles for SuiButton
// import styles from "components/SuiButton/styles";

import { makeStyles } from '@mui/styles';

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";


const { palette, functions } = theme;
const { white, black, text, transparent, gradients } = palette;
const { boxShadow, linearGradient, pxToRem, rgba } = functions;

const useStyles = makeStyles({
  contained: {
    backgroundColor: ({ buttonColor }) => palette[buttonColor].main,
    color: ({ buttonColor }) => {
      let color;

      if (buttonColor === "white") {
        color = text.main;
      } else if (buttonColor === "light") {
        color = gradients.dark.state;
      } else {
        color = white.main;
      }

      return color;
    },

    "&:hover": {
      backgroundColor: ({ buttonColor }) => palette[buttonColor].main,
    },

    "&:focus:not(:hover)": {
      backgroundColor: ({ buttonColor }) => palette[buttonColor].focus,
      boxShadow: ({ buttonColor }) => boxShadow([0, 0], [0, 3.2], palette[buttonColor].main, 0.5),
    },

    "&:disabled": {
      backgroundColor: ({ buttonColor }) =>
        buttonColor === "default" ? white.main : palette[buttonColor].main,
      color: ({ buttonColor }) => {
        let textColor = black.main;

        if (buttonColor === "default") {
          textColor = text.main;
        } else if (
          buttonColor === "primary" ||
          buttonColor === "error" ||
          buttonColor === "dark"
        ) {
          textColor = white.main;
        }

        return textColor;
      },
    },
  },

  outlined: {
    backgroundColor: ({ buttonColor }) =>
      buttonColor === "white" ? rgba(white.main, 0.1) : transparent.main,
    color: ({ buttonColor }) => palette[buttonColor].main,
    borderColor: ({ buttonColor }) =>
      buttonColor === "white" ? rgba(white.main, 0.75) : palette[buttonColor].main,

    "&:hover": {
      backgroundColor: transparent.main,
      borderColor: ({ buttonColor }) => palette[buttonColor].main,
    },

    "&:focus:not(:hover)": {
      backgroundColor: ({ buttonColor }) =>
        buttonColor === "white" ? rgba(white.main, 0.1) : transparent.main,
      boxShadow: ({ buttonColor }) => boxShadow([0, 0], [0, 3.2], palette[buttonColor].main, 0.5),
    },

    "&:active:not(:hover)": {
      backgroundColor: ({ buttonColor }) => palette[buttonColor].main,
      color: white.main,
      opacity: 0.85,
    },

    "&:disabled": {
      color: ({ buttonColor }) => palette[buttonColor].main,
      borderColor: ({ buttonColor }) => palette[buttonColor].main,
    },
  },

  gradient: {
    background: ({ buttonColor }) => {
      let background;

      if (buttonColor === "white") {
        background = white.main;
      } else {
        background = linearGradient(gradients[buttonColor].main, gradients[buttonColor].state);
      }

      return background;
    },
    color: ({ buttonColor }) => {
      let color;

      if (buttonColor === "white") {
        color = text.main;
      } else if (buttonColor === "light") {
        color = gradients.dark.state;
      } else {
        color = white.main;
      }

      return color;
    },

    "&:focus:not(:hover)": {
      boxShadow: "none",
    },

    "&:disabled": {
      background: ({ buttonColor }) => {
        let background;

        if (buttonColor === "white") {
          background = white.main;
        } else {
          background = linearGradient(gradients[buttonColor].main, gradients[buttonColor].state);
        }

        return background;
      },
      color: ({ buttonColor }) => {
        let color;

        if (buttonColor === "white") {
          color = text.main;
        } else if (buttonColor === "light") {
          color = gradients.dark.state;
        } else {
          color = white.main;
        }

        return color;
      },
    },
  },

  text: {
    color: ({ buttonColor }) => palette[buttonColor].main,

    "&:hover": {
      color: ({ buttonColor }) => palette[buttonColor].focus,
    },

    "&:focus:not(:hover)": {
      color: ({ buttonColor }) => palette[buttonColor].focus,
    },
  },

  circular: {
    borderRadius: pxToRem(160),
  },

  iconOnly: {
    minWidth: ({ size }) => {
      let minWidth;

      if (size === "small") {
        minWidth = pxToRem(25.4);
      } else if (size === "large") {
        minWidth = pxToRem(52);
      } else {
        minWidth = pxToRem(38);
      }

      return minWidth;
    },

    width: ({ size }) => {
      let width;

      if (size === "small") {
        width = pxToRem(25.4);
      } else if (size === "large") {
        width = pxToRem(52);
      } else {
        width = pxToRem(38);
      }

      return width;
    },

    minHeight: ({ size }) => {
      let minHeight;

      if (size === "small") {
        minHeight = pxToRem(25.4);
      } else if (size === "large") {
        minHeight = pxToRem(52);
      } else {
        minHeight = pxToRem(38);
      }

      return minHeight;
    },

    height: ({ size }) => {
      let height;

      if (size === "small") {
        height = pxToRem(25.4);
      } else if (size === "large") {
        height = pxToRem(52);
      } else {
        height = pxToRem(38);
      }

      return height;
    },

    padding: ({ size }) => {
      let padding;

      if (size === "small") {
        padding = pxToRem(4.5);
      } else if (size === "large") {
        padding = pxToRem(16);
      } else {
        padding = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;
      }

      return padding;
    },

    "& .material-icons": {
      marginTop: 0,
    },

    "&:hover, &:focus, &:active": {
      transform: "none",
    },
  },
});

const SuiButton = forwardRef(
  ({ buttonColor, variant, size, circular, iconOnly, children, customClass, ...rest }, ref) => {
    // const classes = styles({ buttonColor, variant, size, iconOnly });
    const classes = useStyles({ buttonColor, variant, size, iconOnly });
    return (
      <Button
        {...rest}
        ref={ref}
        color="primary"
        variant={variant === "gradient" ? "contained" : variant}
        size={size}
        className={clsx(classes[variant], customClass, {
          [classes.circular]: circular,
          [classes.iconOnly]: iconOnly,
        })}
      >
        {children}
      </Button>
    );
  }
);

// Setting default values for the props of SuiButton
SuiButton.defaultProps = {
  size: "medium",
  variant: "contained",
  buttonColor: "white",
  circular: false,
  iconOnly: false,
  customClass: "",
};

// Typechecking props for the SuiButton
SuiButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  buttonColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
};

export default SuiButton;
