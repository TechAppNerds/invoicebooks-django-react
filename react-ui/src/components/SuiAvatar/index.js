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

// clsx is a utility for constructing className string conditionally
import clsx from "clsx";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Avatar from "@mui/material/Avatar";

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// Custom styles for SuiAvatar
// import styles from "components/SuiAvatar/styles";

const useStyles = (theme) => {
  const { palette, functions, typography, boxShadows } = theme;
  const { gradients, transparent } = palette;
  const { pxToRem, linearGradient } = functions;
  const { size, fontWeightBold } = typography;
  return makeStyles(() => ({
    suiAvatar: {
      backgroundImage: ({ backgroundColor }) =>
        backgroundColor === "transparent"
          ? transparent.main
          : linearGradient(gradients[backgroundColor].main, gradients[backgroundColor].state),
      fontWeight: fontWeightBold,
    },

    suiAvatar_xs: {
      width: pxToRem(24),
      height: pxToRem(24),
      fontSize: size.xs,
    },

    suiAvatar_sm: {
      width: pxToRem(36),
      height: pxToRem(36),
      fontSize: size.sm,
    },

    suiAvatar_md: {
      width: pxToRem(48),
      height: pxToRem(48),
      fontSize: size.regular,
    },

    suiAvatar_lg: {
      width: pxToRem(58),
      height: pxToRem(58),
      fontSize: size.sm,
    },

    suiAvatar_xl: {
      width: pxToRem(74),
      height: pxToRem(74),
      fontSize: size.regular,
    },

    suiAvatar_xxl: {
      width: pxToRem(110),
      height: pxToRem(110),
      fontSize: size.regular,
    },

    suiAvatar_boxShadow: {
      boxShadow: ({ boxShadow }) => boxShadows[boxShadow],
    },
  }));
};

const SuiAvatar = forwardRef(({ backgroundColor, size, boxShadow, customClass, ...rest }, ref) => {
  // const classes = styles({ boxShadow, backgroundColor });
  const theme = useTheme();
  const classes = useStyles(theme)({ boxShadow, backgroundColor });

  return (
    <Avatar
      ref={ref}
      {...rest}
      className={clsx(classes.suiAvatar, customClass, {
        [classes[`suiAvatar_${size}`]]: size,
        [classes.suiAvatar_boxShadow]: boxShadow !== "none",
      })}
    />
  );
});

// Setting default values for the props of SuiAvatar
SuiAvatar.defaultProps = {
  backgroundColor: "transparent",
  size: "md",
  boxShadow: "none",
  customClass: "",
};

// Typechecking props for the SuiAvatar
SuiAvatar.propTypes = {
  backgroundColor: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  boxShadow: PropTypes.oneOf(["none", "xs", "sm", "regular", "lg", "xl", "xxl", "inset"]),
  customClass: PropTypes.string,
};

export default SuiAvatar;
