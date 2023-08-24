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

import { useState, useEffect } from "react";

// react-github-btn
import GitHubButton from "react-github-btn";

// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";

// @mui material components
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

// Custom styles for the Configurator
// import styles from "examples/Configurator/styles";

// Soft UI Dashboard React context
import { useSoftUIController } from "context";

const useStyles = (theme) => {
  const configuratorWidth = 360;
  const { palette, borders, boxShadows, functions, transitions, typography } = theme;
  const { dark, white, gradients } = palette;
  const { borderWidth } = borders;
  const { lg, buttonBoxShadow } = boxShadows;
  const { pxToRem, linearGradient } = functions;
  const { size } = typography;
  return makeStyles(() => ({
    configurator: {
      height: "100vh",
      margin: 0,
      padding: `0 ${pxToRem(10)}`,
      borderRadius: 0,
      boxShadow: lg,
      overflowY: "auto",
    },

    configurator_close_icon: {
      fontSize: `${size.regular} !important`,
      stroke: dark.main,
      strokeWidth: pxToRem(2),
      marginTop: pxToRem(16),
      cursor: "pointer",
    },

    configurator_sidenav_color: {
      width: pxToRem(24.5),
      height: pxToRem(24),
      padding: 0,
      border: `${borderWidth[1]} solid ${white.main}`,
      transition: transitions.create("border-color", {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter,
      }),

      "&:not(:last-child)": {
        marginRight: pxToRem(8),
      },

      "&:hover, &:focus, &:active": {
        borderColor: dark.main,
      },
    },

    configurator_sidenav_types: {
      display: "flex",
      marginTop: pxToRem(16),

      "& .MuiButton-root": {
        height: pxToRem(42),
        boxShadow: buttonBoxShadow.main,

        "&:first-child": {
          marginRight: pxToRem(8),
        },

        "&:hover, &:focus": {
          opacity: 1,
        },
      },
    },

    configurator_open: {
      width: configuratorWidth,
      left: "initial",
      right: 0,
      transition: transitions.create("right", {
        easing: transitions.easing.sharp,
        duration: transitions.duration.short,
      }),
    },

    configurator_close: {
      left: "initial",
      right: pxToRem(-350),
      transition: transitions.create("all", {
        easing: transitions.easing.sharp,
        duration: transitions.duration.short,
      }),
    },

    primary: {
      backgroundImage: linearGradient(gradients.primary.main, gradients.primary.state),
    },

    dark: {
      backgroundImage: linearGradient(gradients.dark.main, gradients.dark.state),
    },

    info: {
      backgroundImage: linearGradient(gradients.info.main, gradients.info.state),
    },

    success: {
      backgroundImage: linearGradient(gradients.success.main, gradients.success.state),
    },

    warning: {
      backgroundImage: linearGradient(gradients.warning.main, gradients.warning.state),
    },

    error: {
      backgroundImage: linearGradient(gradients.error.main, gradients.error.state),
    },

    active_color: {
      borderColor: dark.main,
    },
  }));
};

function Configurator() {
  // const [controller, dispatch] = useSoftUIController();
  const { controller, dispatch } = useSoftUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);
  // const classes = styles({ sidenavColor });
  const theme = useTheme();
  const classes = useStyles(theme)({ sidenavColor });
  const sidenavColors = ["primary", "dark", "info", "success", "warning", "error"];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", value: false });
  };

  const handleTransparentSidenav = () => {
    dispatch({ type: "TRANSPARENT_SIDENAV", value: true });
  };

  const handleWhiteSidenav = () => {
    dispatch({ type: "TRANSPARENT_SIDENAV", value: false });
  };

  const handleFixedNavbar = () => {
    dispatch({ type: "FIXED_NAVBAR", value: !fixedNavbar });
  };

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.configurator, {
          [classes.configurator_open]: openConfigurator,
          [classes.configurator_close]: !openConfigurator,
        }),
      }}
    >
      <SuiBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <SuiBox>
          <SuiTypography variant="h5">Soft UI Configurator</SuiTypography>
          <SuiTypography variant="body2" textColor="text">
            See our dashboard options.
          </SuiTypography>
        </SuiBox>

        <Icon
          className={`font-bold ${classes.configurator_close_icon}`}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </SuiBox>

      <Divider />

      <SuiBox pt={1.25} pb={3} px={3}>
        <SuiBox>
          <SuiTypography variant="h6">Sidenav Colors</SuiTypography>

          <SuiBox my={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                className={clsx(classes.configurator_sidenav_color, classes[color], {
                  [classes.active_color]: sidenavColor === color,
                })}
                onClick={() => dispatch({ type: "SIDENAV_COLOR", value: color })}
              />
            ))}
          </SuiBox>
        </SuiBox>

        <SuiBox mt={3}>
          <SuiTypography variant="h6">Sidenav Type</SuiTypography>
          <SuiTypography variant="button" textColor="text" fontWeight="regular">
            Choose between 2 different sidenav types.
          </SuiTypography>

          <SuiBox customClass={classes.configurator_sidenav_types}>
            <SuiButton
              buttonColor="info"
              variant={transparentSidenav ? "gradient" : "outlined"}
              onClick={handleTransparentSidenav}
              disabled={disabled}
              fullWidth
            >
              Transparent
            </SuiButton>
            <SuiButton
              buttonColor="info"
              variant={transparentSidenav ? "outlined" : "gradient"}
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
            >
              White
            </SuiButton>
          </SuiBox>
        </SuiBox>
        <SuiBox mt={3} mb={2}>
          <SuiTypography variant="h6">Navbar Fixed</SuiTypography>

          <Switch checked={fixedNavbar} onChange={handleFixedNavbar} />
        </SuiBox>

        <Divider />

        <SuiBox mt={3} mb={2}>
          <SuiBox mb={2}>
            <SuiButton
              component={Link}
              href="https://appseed.us/product/django-react-soft-dashboard"
              target="_blank"
              rel="noreferrer"
              buttonColor="dark"
              variant="gradient"
              fullWidth
            >
              free download
            </SuiButton>
          </SuiBox>
        </SuiBox>
        <SuiBox display="flex" justifyContent="center">
          <GitHubButton
            href="https://github.com/app-generator/django-reactsoft-dashboard"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star Soft UI Dashboard React on GitHub"
          >
            Star
          </GitHubButton>
        </SuiBox>
        <SuiBox mt={3} textAlign="center">
          <SuiBox mb={0.5}>
            <SuiTypography variant="h6">Thank you for sharing!</SuiTypography>
          </SuiBox>

          <SuiBox display="flex" justifyContent="center">
            <SuiBox mr={1.5}>
              <SuiButton
                component={Link}
                href="//twitter.com/intent/tweet?text=Check%20Soft%20UI%20Dashboard%20%20React%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard-react"
                target="_blank"
                rel="noreferrer"
                buttonColor="dark"
              >
                <TwitterIcon />
                &nbsp; Tweet
              </SuiButton>
            </SuiBox>
            <SuiButton
              component={Link}
              href="https://www.facebook.com/sharer/sharer.php?u=https://appseed.us/product/django-react-soft-dashboard"
              target="_blank"
              rel="noreferrer"
              buttonColor="dark"
            >
              <FacebookIcon />
              &nbsp; Share
            </SuiButton>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Drawer>
  );
}

export default Configurator;
