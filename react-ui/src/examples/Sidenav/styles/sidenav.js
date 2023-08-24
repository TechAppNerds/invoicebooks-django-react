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
  ({ palette, typography, boxShadows, transitions, breakpoints, functions }) => {
    const sidebarWidth = 250;
    const { white, transparent } = palette;
    const { fontWeightMedium } = typography;
    const { xxl } = boxShadows;
    const { pxToRem } = functions;

    return {
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
        padding: `${pxToRem(24)} ${pxToRem(8)} ${pxToRem(8)} ${pxToRem(64)}`,
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
    };
  }
);
