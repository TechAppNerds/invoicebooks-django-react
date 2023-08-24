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
import LinearProgress from "@mui/material/LinearProgress";

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// Soft UI Dashboard PRO React components
import SuiTypography from "components/SuiTypography";

// Custom styles for SuiProgress
// import styles from "components/SuiProgress/styles";

const useStyles = (theme) => {
  const { palette, functions } = theme;
  // const { text, gradients, grey } = palette;
  const { text, gradients } = palette;
  const { linearGradient } = functions;
  // const greyColors = {
  //   "grey-100": grey[100],
  //   "grey-200": grey[200],
  //   "grey-300": grey[300],
  //   "grey-400": grey[400],
  //   "grey-500": grey[500],
  //   "grey-600": grey[600],
  //   "grey-700": grey[700],
  //   "grey-800": grey[800],
  //   "grey-900": grey[900],
  // };
  return makeStyles(() => ({
    progress: {
      "& .MuiLinearProgress-bar": {
        backgroundColor: ({ color }) => palette[color].main,
        // backgroundColor: palette[color] ? palette[color].main : greyColors[color],
        // backgroundColor: palette.dark.main,
        width: ({ value }) => `${value}%`,
        color: text.main,
      },
    },

    progress_gradient: {
      "& .MuiLinearProgress-bar": {
        background: ({ color }) => linearGradient(gradients[color].main, gradients[color].state),
      },
    },
  }));
};

const SuiProgress = forwardRef(({ color, value, gradient, noLabel, ...rest }, ref) => {
  // const classes = styles({ color, value });
  const theme = useTheme();
  const classes = useStyles(theme)({ color, value });

  return (
    <>
      {!noLabel && (
        <SuiTypography variant="button" fontWeight="medium" textColor="text">
          {value}%
        </SuiTypography>
      )}
      <LinearProgress
        {...rest}
        ref={ref}
        variant="determinate"
        value={value}
        className={clsx(classes.progress, {
          [classes.progress_gradient]: gradient,
        })}
      />
    </>
  );
});

// Setting default values for the props of SuiProgress
SuiProgress.defaultProps = {
  color: "info",
  value: 0,
  gradient: false,
  noLabel: false,
};

// Typechecking props for the SuiProgress
SuiProgress.propTypes = {
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
  value: PropTypes.number,
  gradient: PropTypes.bool,
  noLabel: PropTypes.bool,
};

export default SuiProgress;
