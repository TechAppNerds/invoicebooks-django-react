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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Custom styles for the SidenavCollapse
// import styles from "examples/Sidenav/styles/sidenavCollapse";

// Soft UI Dashboard React context
import { useSoftUIController } from "context";

const useStyles = (theme) => {
  const { palette, transitions, breakpoints } = theme;
  const { dark, white, info, text, gradients, light, transparent } = palette;
  const { fontWeightRegular, fontWeightMedium, size } = theme.typography;
  const { regular, xxl } = theme.boxShadows;
  const { borderRadius } = theme.borders;
  const { pxToRem } = theme.functions;
  return makeStyles(() => ({
    collapse_item: {
      background: ({ active }) => (active ? white.main : transparent.main),
      color: ({ active }) => (active ? dark.main : text.main),
      display: "flex",
      alignItems: "center",
      width: "100%",
      padding: `${pxToRem(10.8)} ${pxToRem(12.8)} ${pxToRem(10.8)} ${pxToRem(16)}`,
      margin: `0 ${pxToRem(16)}`,
      borderRadius: borderRadius.md,
      cursor: "pointer",
      userSelect: "none",
      whiteSpace: "nowrap",
      boxShadow: "none",
      [breakpoints.up("xl")]: {
        boxShadow: ({ active, transparentSidenav }) => {
          if (active) {
            return transparentSidenav ? xxl : "none";
          }

          return "none";
        },
        transition: transitions.create("box-shadow", {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.shorter,
        }),
      },
    },

    collapse_iconBox: {
      background: ({ active, sidenavColor }) => {
        if (active) {
          return sidenavColor === "default" ? info.main : palette[sidenavColor].main;
        }

        return light.main;
      },
      minWidth: pxToRem(32),
      minHeight: pxToRem(32),
      borderRadius: borderRadius.md,
      display: "grid",
      placeItems: "center",
      boxShadow: regular,
      transition: transitions.create("margin", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),

      [breakpoints.up("xl")]: {
        background: ({ active, transparentSidenav, sidenavColor }) => {
          let background;

          if (!active) {
            background = transparentSidenav ? white.main : light.main;
          } else if (sidenavColor === "default") {
            background = info.main;
          } else if (sidenavColor === "warning") {
            background = gradients.warning.main;
          } else {
            background = palette[sidenavColor].main;
          }

          return background;
        },
      },

      "& svg, svg g": {
        fill: ({ active }) => (active ? white.main : gradients.dark.state),
      },
    },

    collapse_icon: {
      color: ({ active }) => (active ? white.main : gradients.dark.state),
    },

    collapse_text: {
      marginLeft: pxToRem(12.8),

      [breakpoints.up("xl")]: {
        opacity: ({ miniSidenav, transparentSidenav }) =>
          miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
        maxWidth: ({ miniSidenav, transparentSidenav }) =>
          miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
        marginLeft: ({ miniSidenav, transparentSidenav }) =>
          miniSidenav || (miniSidenav && transparentSidenav) ? 0 : pxToRem(12.8),
        transition: transitions.create(["opacity", "margin"], {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        }),
      },

      "& span": {
        fontWeight: ({ active }) => (active ? fontWeightMedium : fontWeightRegular),
        fontSize: size.sm,
        lineHeight: 0,
      },
    },
  }));
};

function SidenavCollapse({ icon, name, children, active, noCollapse, open, ...rest }) {
  // const [controller] = useSoftUIController();
  const { controller } = useSoftUIController();
  const { miniSidenav, transparentSidenav, sidenavColor } = controller;

  // const classes = styles({
  //   active,
  //   noCollapse,
  //   open,
  //   miniSidenav,
  //   transparentSidenav,
  //   sidenavColor,
  // });

  const theme = useTheme();
  const classes = useStyles(theme)({
    active,
    noCollapse,
    open,
    miniSidenav,
    transparentSidenav,
    sidenavColor,
  });

  return (
    <>
      <ListItem component="li">
        <SuiBox {...rest} customClass={classes.collapse_item}>
          <ListItemIcon className={classes.collapse_iconBox}>
            {typeof icon === "string" ? (
              <Icon className={classes.collapse_icon}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText primary={name} classes={{ root: classes.collapse_text }} />
        </SuiBox>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false,
  noCollapse: false,
  children: false,
  open: false,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  // icon: PropTypes.node.isRequired,
  // name: PropTypes.string.isRequired,
  icon: PropTypes.node,
  name: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
};

export default SidenavCollapse;
