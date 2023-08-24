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

// @mui material components
import { makeStyles } from "@mui/styles";

export default makeStyles(
  // ({ palette, boxShadows, functions, transitions, breakpoints, borders, typography }) => {
  ({ palette, boxShadows, functions, transitions, breakpoints, typography }) => {
    const { dark, white, text, transparent } = palette;
    const { navbarBoxShadow } = boxShadows;
    const { rgba, pxToRem } = functions;
    // const { borderRadius } = borders;
    const { size } = typography;

    return {
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
        // top: ({ absolute }) => (absolute ? 0 : pxToRem(12)),
        minHeight: pxToRem(75),
        display: "grid",
        alignItems: "center",
        // borderRadius: borderRadius.xl,
        // paddingTop: pxToRem(8),
        // paddingBottom: pxToRem(8),
        // paddingRight: ({ absolute }) => (absolute ? pxToRem(8) : 0),
        // paddingLeft: ({ absolute }) => (absolute ? pxToRem(16) : 0),

        top: 0,
        borderRadius: 0,

        borderBottom: ({ transparentNavbar, absolute }) =>
          transparentNavbar || absolute ? 0 : "1px solid #cdd4d9",

        "& > *": {
          transition: transitions.create("all", {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },

        // "& .navbar-is-sticky": {
        //   boxShadow: "0 4px 0 0 rgb(6 41 66 / 10%)",
        //   borderBottom: "1px solid #cdd4d9",
        // },

        "& .MuiToolbar-root": {
          // margin-left: 52px;
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          [breakpoints.up("sm")]: {
            minHeight: "auto",
            padding: `${pxToRem(4)} ${pxToRem(16)}`,
          },
        },

        // "& .MuiDivider-root": {
        //   margin: 0,
        //   backgroundColor: "#cdd4d9",
        //   backgroundImage: "unset !important",
        //   opacity: 1,
        // },
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
      },
    };
  }
);
