// @mui material components
import { makeStyles } from "@mui/styles";

// export default makeStyles(({ functions }) => {
export default makeStyles(() => {
  // const { pxToRem } = functions;

  return {
    survey_steps_wrapper: {
      minHeight: "100vh",
      // justifyContent: "end",
      "& .survey-steps": {
        width: 492,
        marginRight: 625,
        float: "right",
        display: "flex",
        alignItems: "center",
        "& .required.MuiTypography-root::after": {
          content: `"*"`,
          color: "#e32",
          fontWeight: "700",
        },
        "& .MuiInputBase-root, & .w-100 .MuiButtonBase-root": {
          border: "2px solid #7f8c9f",
          borderRadius: "5px !important",
        },
        // "& .MuiInputBase-root": {
          "& .MuiOutlinedInput-root": {
            cursor: "unset",
          },
          "& .MuiSelect-select": {
            // paddingLeft: "6px !important",
            // padding: "0 !important",
            width: "100% !important",
            padding: "0.5rem 1.75rem 0.5rem 0.75rem !important",
            // "& .MuiSelect-select": {
    //   // padding: "0.5rem 3.25rem 0.5rem 0.75rem !important",
    //   padding: "0.5rem 6.25rem 0.5rem 0.75rem !important",
    //   width: "100% !important",
    // },
          },
          "& .MuiSvgIcon-root.MuiSelect-icon": {
            display: "inline-block",
            fontSize: "24px !important",
            color: "#576981",
          },
        // },
        "& .MuiTextField-root": {
          cursor: "text",
        },
        "& .w-100 .MuiButtonBase-root": {
          padding: "16px 0",
          fontSize: 14,
          fontWeight: 400,
          opacity: 1,
          transition: "unset",
          transform: "unset",
          textTransform: "unset",
          "&:focus, &:hover": {
            backgroundColor: "#eef6fc",
          },
          "&.selected": {
            backgroundColor: "#0075dd",
            borderColor: "#0075dd",
            color: "#fff",
          },
        },
      },
      // "& .survey-steps-nav": {
        

      //   height: "100%",
      // overflow: "hidden",
      // marginRight: pxToRem(-128),
        "& .survey-steps-nav": {
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          // width: "calc(50% - 50px)",
          width: 625,
          backgroundImage: ({ image }) => `url(${image})`,
          // url("/static/media/curved-6.71ee1d1c.jpg")
          // backgroundImage: `url("assets/images/survey-background.jpg")`,
          // backgroundSize: "cover",
          backgroundSize: "100% 100%",
          // transform: "skewX(10deg)",
          // marginLeft: pxToRem(-64),
          // marginLeft: pxToRem(-80),
          // height: "100%",

          "& .survey-steps-list-wrapper": {
            maxWidth: 570,
            padding: "40vmin 20px 15vmin 15%",
            "& .MuiTimeline-root": {
              padding: 0,
              "& .MuiTimelineItem-root": {
                minHeight: "unset",
                "&::before": {
                  flex: 0,
                  padding: 0,
                },
                "&:first-child": {
                  alignItems: "unset",
                },
                "&:not(:first-child)": {
                  alignItems: "end",
                  opacity: .5,
                },
                "&.active": {
                  opacity: 1,
                },
                "& .MuiTimelineDot-root": {
                  margin: 0,
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0075dd",
                  fontSize: 22,
                  transition: "300ms",
                },
                "& .MuiTimelineConnector-root": {
                  // height: 25,
                  height: 50,
                  backgroundColor: "#0075dd",
                },
                "& .MuiTimelineContent-root": {
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#001b40",
                  transition: "300ms",
                  "&:not(:first-child)": {
                    paddingBottom: 5,
                  },
                },
              },
            },
            "& .survey-steps-meta": {
              display: "flex",
              "& .MuiTypography-root.MuiTypography-button": {
                display: "flex",
                alignItems: "center",
                fontSize: 16,
                "&:focus, &:hover": {
                  opacity: .6,
                },
                "& .MuiIcon-root": {
                  marginRight: 6,
                  fontSize: "18px !important",
                },
              },
            },
          },
        },
      // },
    },
    menu_select_form: {
      minWidth: "456px !important",
      maxHeight: 227,
      padding: 0,
      // marginTop: 8,
      marginTop: 13,
      left: "250px !important",
      border: "2px solid #7f8c9f",
      borderRadius: 4,
      boxShadow: "4px 4px rgb(6 41 66 / 10%)",
      "& .MuiMenuItem-root": {
        borderRadius: 0,
        borderBottom: "1px solid #e6eaec",
        "&:focus, &:hover": {
          backgroundColor: "#eef6fc",
          color: "#0063c1",
        },
        "&.Mui-selected": {
          backgroundColor: "#ccd1d9 !important",
          borderColor: "#fff",
        },
      },
    },
    survey_steps_progress: {
      // position: "fixed",
      // bottom: 0,
      paddingTop: 20,
      zIndex: 5,
      // width: "100%",
      position: "sticky",
      textAlign: "right",
      borderTop: "1px solid #cdd4d9",
      backgroundColor: "#fffefd",
      // transform: "translateX(-48px)",
      "& .MuiButton-root": {
        border: "2px solid transparent",
        transition: "border-color .15s",
        transform: "unset",
        textTransform: "unset",
        fontSize: 20,
        fontWeight: 500,
        borderRadius: 5,
        padding: "8px 16px",
        "&.survey-back": {
          backgroundColor: "transparent",
          color: "#576981",
          "&:hover": {
            borderColor: "#cdd4d9",
            color: "#062942",
          },
        },
        "&.survey-next": {
          backgroundColor: "#37a703",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#348e09",
          },
        },
      },
    },

    "& .businessCard-settings-actions": {
      display: "flex",
      columnGap: 12,
      "& .MuiButton-root": {
        flex: 1,
        border: "2px solid transparent",
        transition: "border-color .15s",
        transform: "unset",
        textTransform: "unset",
        fontSize: 18,
        lineHeight: "18px",
        fontWeight: 700,
        borderRadius: 5,
        padding: "8px 16px",
        "&:first-child": {
          backgroundColor: "transparent",
          color: "#576981",
          "&:hover": {
            borderColor: "#cdd4d9",
            color: "#062942",
          },
        },
        "&:last-child": {
          backgroundColor: "#37a703",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#348e09",
          },
        },
      },
    },
    
    
    // currency_tab: {
    //   "&.MuiTabs-root": {
    //     padding: "0.25rem 0",
    //     overflow: "unset",
    //     "& .MuiTabs-scroller ": {
    //       overflow: "hidden !important",
    //       borderBottom: "1px solid #cdd4d9",
    //       position: "unset",
    //       "& .MuiTabs-flexContainer": {
    //         width: "max-content",
    //         "& .MuiButtonBase-root.MuiTab-root": {
    //           borderRadius: "5px 5px 0 0",
    //           minWidth: "124px !important",
    //           padding: "10px 24px",
    //           color: "#0063c1 !important",
    //           "&:hover": {
    //             color: "#004889 !important",
    //           },
    //           "&.Mui-selected": {
    //             border: "1px solid #cdd4d9",
    //             borderBottom: "unset",
    //             backgroundColor: "#fffefd",
    //             color: "unset !important",
    //           },
    //         },
    //       },
    //       "& .MuiTabs-indicator": {
    //         height: 53,
    //         borderRadius: "5px 5px 0 0",
    //         boxShadow: "unset",
    //         transition: "unset",
    //       },
    //     },
    //   },
    // },
    // account_settings_tab_container: {
    //   maxWidth: 700,
    //   "& .MuiInputBase-root, & .MuiOutlinedInput-root": {
    //     border: "2px solid #7f8c9f",
    //     borderRadius: "5px !important",
    //     fontSize: "16px !important",
    //     "&.Mui-disabled": {
    //       backgroundColor: "#f3f4f6 !important",
    //       color: "#9ba9b3 !important",
    //       borderColor: "#e6eaec",
    //     },
    //     "&.MuiSelect-root": {
    //       padding: "0 !important",
    //       cursor: "pointer",
    //     },
    //     "& .MuiNativeSelect-select, &.MuiSelect-root .MuiSelect-select.MuiSelect-outlined": {
    //       padding: "0.5rem 1.75rem 0.5rem 0.75rem !important",
    //       width: "100% !important",
    //     },
    //   },
    //   "& .MuiTypography-button.button-link": {
    //     display: "block",
    //     marginTop: 12,
    //     fontSize: "1rem",
    //     color: "#0063c1",
    //     cursor: "pointer",
    //     "&:focus, &:hover": {
    //       color: "#004889",
    //     },
    //   },
    // },
    // account_details_container: {

    // },
    // select_menuPaper: {
    //   maxHeight: 227,
    //   padding: 0,
    //   marginTop: 8,
    //   border: "2px solid #7f8c9f",
    //   borderRadius: 4,
    //   boxShadow: "4px 4px rgb(6 41 66 / 10%)",
    //   "& .MuiMenuItem-root": {
    //     fontSize: 16,
    //     borderRadius: 0,
    //     borderBottom: "1px solid #e6eaec",
    //     "&:focus, &:hover": {
    //       backgroundColor: "#eef6fc",
    //       color: "#0063c1",
    //     },
    //     "&.Mui-selected": {
    //       backgroundColor: "#ccd1d9 !important",
    //       borderColor: "#fff",
    //     },
    //   },
    // },
    // settings_tab_footer: {
    //   // position: "sticky",
    //   position: "fixed",
    //   bottom: 0,
    //   zIndex: 5,
    //   width: "100%",
    //   borderTop: "1px solid #cdd4d9",
    //   backgroundColor: "#fffefd",
    //   // transform: "translateX(-48px)",
    //   "& .MuiButton-root": {
    //     border: "2px solid transparent",
    //     transition: "border-color .15s",
    //     transform: "unset",
    //     textTransform: "unset",
    //     fontSize: 20,
    //     fontWeight: 500,
    //     borderRadius: 5,
    //     padding: "8px 16px",
    //     backgroundColor: "#37a703",
    //     color: "#fff",
    //     "&:hover": {
    //       backgroundColor: "#348e09",
    //     },
    //   },
    // },


    // fullScreen_dialog: {
    //   "& .MuiPaper-root.MuiDialog-paper": {
    //     padding: "24px 228px",
    //   },
    //   "& .businessCard-header": {
    //     width: 828,
    //     display: "flex",
    //     justifyContent: "space-between",
    //     "& .MuiTypography-root": {
    //       alignSelf: "center",
    //       color: "#062942",
    //     },
    //     "& .MuiDialogActions-root": {
    //       padding: 0,
    //       "& .MuiButton-root": {
    //         border: "2px solid transparent",
    //         transition: "border-color .15s",
    //         transform: "unset",
    //         textTransform: "unset",
    //         fontSize: 20,
    //         fontWeight: 500,
    //         borderRadius: 5,
    //         padding: "8px 16px",
    //         "&:first-child": {
    //           backgroundColor: "transparent",
    //           color: "#576981",
    //           "&:hover": {
    //             borderColor: "#cdd4d9",
    //             color: "#062942",
    //           },
    //         },
    //         "&:not(:first-child)": {
    //           backgroundColor: "#37a703",
    //           color: "#fff",
    //           "&:hover": {
    //             backgroundColor: "#348e09",
    //           },
    //         },
    //       },
    //     },
    //   },
    //   "& .MuiDivider-root": {
    //     margin: 0,
    //     backgroundColor: "#cdd4d9",
    //     backgroundImage: "unset !important",
    //     opacity: 1,
    //   },
    //   "& .businessCard-content": {
    //     // border: "0.0625rem solid #cdd4d9",
    //     // borderRadius: "1rem",
    //     // padding: 48px 40px;
    //     border: "1px solid #cdd4d9",
    //     borderRadius: 5,
    //     marginBottom: 24,
    //     boxShadow: "2px 2px 0 rgb(6 41 66 / 10%)",
    //     position: "relative",
    //     // width: 580,
    //     width: 510,
    //     // backgroundColor: "#fff";
    //     minHeight: 325,
    //     "& #businessCard-info-label.MuiTypography-root": {
    //       color: "#576981",
    //       display: "flex",
    //       "& .material-icons-outlined": {
    //         fontSize: 20,
    //         marginRight: 4,
    //       },
    //     },
    //     "& #form-inputLabel.MuiTypography-root": {
    //       color: "#001b40",
    //     },
    //     // "& .MuiFormControl-root": {
    //     //   width: "100%",
    //     //   "& .MuiOutlinedInput-input.MuiInputBase-input": {
    //     //     width: "100% !important",
    //     //   },
    //     // },
    //     // "& .MuiSelect-root": {
    //     //   width: "201px !important",
    //     //   "& .MuiSelect-select": {
    //     //     padding: "0 !important",
    //     //   },
    //     // },
    //     "& select": {
    //       fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
    //       letterSpacing: "0.00938em",
    //       cursor: "text",
    //       WebkitBoxAlign: "center",
    //       placeItems: "center!important",
    //       height: "auto!important",
    //       fontSize: "0.875rem!important",
    //       fontWeight: "400!important",
    //       lineHeight: "1.4!important",
    //       color: "#495057!important",
    //       backgroundColor: "#ffffff!important",
    //       backgroundClip: "padding-box!important",
    //       appearance: "none!important",
    //       transition: "box-shadow 150ms ease,border-color 150ms ease,padding 150ms ease!important",
    //       position: "relative",
    //       display: "flex!important",
    //       padding: "0.5rem 1.75rem 0.5rem 0.75rem!important",
    //       border: "0.0625rem solid #d2d6da",
    //       borderRadius: "0.5rem!important",
    //       width: 210,
    //       "&:focus-visible": {
    //         outline: "unset",
    //       },
    //       // "& option": {
    //       //   WebkitTapHighlightColor: "transparent",
    //       //   outline: 0,
    //       //   border: 0,
    //       //   margin: 0,
    //       //   cursor: "pointer",
    //       //   userSelect: "none",
    //       //   verticalAlign: "middle",
    //       //   WebkitAppearance: "none",
    //       //   fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
    //       //   fontWeight: 400,
    //       //   lineHeight: 1.625,
    //       //   letterSpacing: "0.00938em",
    //       //   display: "flex",
    //       //   WebkitBoxPack: "start",
    //       //   justifyContent: "flex-start",
    //       //   WebkitBoxAlign: "center",
    //       //   alignItems: "center",
    //       //   position: "relative",
    //       //   boxSizing: "border-box",
    //       //   whiteSpace: "nowrap",
    //       //   minWidth: "10rem",
    //       //   padding: "0.3rem 1rem",
    //       //   fontSize: "0.875rem",
    //       //   transition: "background-color 300ms ease,color 300ms ease",
    //       //   borderBottom: "1px solid #e6eaec",
    //       //   "&:focus, &:hover": {
    //       //     backgroundColor: "#e9ecef",
    //       //     color: "#344767",
    //       //   },
    //       // },
    //     },
    //     "& .MuiButtonBase-root.MuiIconButton-root, & .MuiTypography-root.MuiTypography-button": {
    //       color: "#0063c1",
    //       "&:focus, &:hover": {
    //         color: "#004889 !important",
    //         opacity: 1,
    //       },
    //     },
    //     "& .MuiButtonBase-root.MuiIconButton-root": {
    //       "& .MuiTypography-root.MuiTypography-button": {
    //         fontSize: 16,
    //         lineHeight: 1.3,
    //         alignSelf: "end",
    //       },
    //     },
    //   },
    //   "& .businessCard-settings": {
    //     // width: 300,
    //     width: 290,
    //     "& .MuiTypography-root.MuiTypography-h5": {
    //       fontSize: 22,
    //       color: "#062942",
    //     },
    //     "& .MuiButtonBase-root.MuiListItem-root": {
    //       // margin: 0,
    //       // backgroundColor: "#cdd4d9",
    //       // backgroundImage: "unset !important",
    //       // opacity: 1,
    //       borderBottom: "0.0625rem solid #cdd4d9",
    //       "&:hover": {
    //         color: "#0063c1",
    //         backgroundColor: "#eef6fc",
    //         "& .MuiButton-root": {
    //           color: "#0063c1",
    //           backgroundColor: "#eef6fc",
    //         },
    //       },
    //       "& span.material-icons-outlined": {
    //         alignSelf: "flex-start",
    //         marginTop: 19,
    //         marginLeft: "0.75rem",
    //       },
    //       "& .MuiListItemText-root": {
    //         padding: "20px 16px",
    //         "& .MuiTypography-root.MuiListItemText-primary": {
    //           fontSize: 16,
    //         },
    //         "& .MuiTypography-root.MuiListItemText-secondary": {
    //           fontSize: 14,
    //           // whiteSpace: "nowrap",
    //           width: 238,
    //         },
    //       },
    //       "& .MuiButton-root": {
    //         textTransform: "uppercase",
    //         justifyContent: "flex-end",
    //         alignSelf: "flex-start",
    //         marginTop: 13,
    //         fontSize: 14,
    //         color: "#344767",
    //         "&:hover": {
    //           transform: "unset",
    //         },
    //         "& .MuiSvgIcon-root": {
    //           fontSize: "26px !important",
    //         },
    //       },
    //     },
    //     "& .businessCard-settings-head": {
    //       display: "flex",
    //       cursor: "pointer",
    //       // width: "72.5%",
    //       "& .MuiCheckbox-root": {
    //         border: "2px solid #7f8c9f",
    //         borderRadius: 5,
    //         width: 25,
    //         height: 25,
    //       },
    //       "& .MuiTypography-root": {
    //         color: "#062942",
    //       },
    //     },
    //     "& .businessCard-settings-late-reminder-schedule": {
    //       display: "block",
    //       "& .MuiBox-root": {
    //         display: "flex",
    //         justifyContent: "space-between",
    //       },
    //       "& span.material-icons": {
    //         cursor: "pointer",
    //         "&:last-child": {
    //           marginLeft: 8,
    //         },
    //       },
    //       "& .MuiFormControl-root.MuiTextField-root": {
    //         marginRight: 4,
    //         width: "50px !important",
    //         "& .MuiOutlinedInput-root.MuiInputBase-root": {
    //           padding: "0.5rem 0.75rem 0.5rem 0.75rem !important",
    //         },
    //       },
    //       "& .MuiOutlinedInput-root.MuiInputBase-root.MuiSelect-root": {
    //       // "& .MuiAutocomplete-root": {
    //         // "& .MuiOutlinedInput-root.MuiInputBase-root": {
    //           margin: "0 4px",
    //           width: "80px !important",
    //           display: "inline-block !important",
    //           "& .MuiSelect-select.MuiSelect-outlined.MuiOutlinedInput-input.MuiInputBase-input": {
    //             // width: "100% !important",
    //             width: "140% !important",
    //             padding: "0 !important",
    //           },
    //           "& .MuiSvgIcon-root.MuiSelect-icon": {
    //             display: "inline-block",
    //             fontSize: "20px !important",
    //           },
    //         },
    //       // },
    //     },
    //     "& .businessCard-settings-late-fee-amount": {
    //       display: "block",
    //       "& .MuiFormLabel-root": {
    //         fontSize: 14,
    //         color: "#001b40",
    //         display: "block",
    //         marginBottom: 12,
    //       },
    //       "& .MuiFormGroup-root": {
    //         "& .MuiFormControlLabel-root": {
    //           margin: 0,
    //           whiteSpace: "nowrap",
    //           "& .MuiRadio-root": {
    //             transition: "unset",
    //             width: 24,
    //             height: 24,
    //             border: "2px solid #7f8c9f",
    //           },
    //           "& .MuiTypography-root": {
    //             fontWeight: 400,
    //             fontSize: 16,
    //             color: "#062942",
    //           },
    //         },
    //         "& .form-radio-toggle": {
    //           borderLeft: "2px solid #ccd1d9",
    //           "& .MuiFormControl-root.MuiTextField-root": {
    //             marginLeft: 24,
    //             width: 50,
    //             "& .MuiOutlinedInput-root.MuiInputBase-root": {
    //               padding: "0.5rem 0.75rem 0.5rem 0.75rem !important",
    //               border: "2px solid #7f8c9f",
    //               borderRadius: "5px !important",
    //             },
    //           },
    //         },
    //       },
    //     },
    //     "& .late-fee-amount-days": {
    //       "& .MuiTypography-root": {
    //         display: "block",
    //       },
    //       "& .form-input": {
    //         display: "flex",
    //         alignItems: "center",
    //         "& .MuiFormControl-root.MuiTextField-root": {
    //           width: 50,
    //           "& .MuiOutlinedInput-root.MuiInputBase-root": {
    //             padding: "0.5rem 0.75rem 0.5rem 0.75rem !important",
    //             border: "2px solid #7f8c9f",
    //             borderRadius: "5px !important",
    //           },
    //         },
    //       },
    //     },
    //     "& .action-add-reminder": {
    //       "& .MuiIconButton-root": {
    //         width: "100%",
    //         margin: 0,
    //         backgroundColor: "transparent",
    //         border: "2px dashed #cdd4d9",
    //         borderRadius: 5,
    //         "&:focus, &:hover": {
    //           backgroundColor: "#f2f8fd",
    //           "& .material-icons": {
    //             color: "lightslategray !important",
    //           },
    //           "& .MuiTypography-root": {
    //             color: "#062942",
    //           },
    //         },
    //         "& .material-icons": {
    //           fontSize: 30,
    //           fontWeight: 700,
    //           color: "darkgray",
    //         },
    //         "& .MuiTypography-root": {
    //           fontSize: 18,
    //         },
    //       },
    //     },
    //     "& .businessCard-settings-body": {
    //       display: "flex",
    //       // width: "72.5%",
    //       "& span.material-icons": {
    //         marginTop: 3,
    //         fontSize: 18,
    //       },
    //       "& .MuiTypography-root": {
    //         color: "#576981",
    //       },
    //       "& a": {
    //         color: "#0063c1",
    //         textDecoration: "underline !important",
    //         "&:focus, &:hover": {
    //           color: "#004889",
    //         },
    //       },
    //     },
    //     "& #form-inputLabel.MuiTypography-root": {
    //       display: "block",
    //       color: "#001b40",
    //       marginBottom: 6,
    //     },
    //     "& .businessCard-settings-actions": {
    //       display: "flex",
    //       columnGap: 12,
    //       "& .MuiButton-root": {
    //         flex: 1,
    //         border: "2px solid transparent",
    //         transition: "border-color .15s",
    //         transform: "unset",
    //         textTransform: "unset",
    //         fontSize: 18,
    //         lineHeight: "18px",
    //         fontWeight: 700,
    //         borderRadius: 5,
    //         padding: "8px 16px",
    //         "&:first-child": {
    //           backgroundColor: "transparent",
    //           color: "#576981",
    //           "&:hover": {
    //             borderColor: "#cdd4d9",
    //             color: "#062942",
    //           },
    //         },
    //         "&:last-child": {
    //           backgroundColor: "#37a703",
    //           color: "#fff",
    //           "&:hover": {
    //             backgroundColor: "#348e09",
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // reminderMessage_popover: {
    //   "&.MuiPaper-root.MuiPopover-paper": {
    //     transform: "translateX(-8px) !important",
    //     maxWidth: "42.5%",
    //     padding: 0,
    //     border: "2px solid #7f8c9f",
    //     borderRadius: 5,
    //     boxShadow: "4px 4px rgb(6 41 66 / 10%)",
    //     backgroundColor: "#fff",
    //     "& .popover-header": {
    //       display: "flex",
    //       alignItems: "flex-end",
    //       backgroundColor: "#e6eaec",
    //       "& .MuiAvatar-root": {
    //         width: 55,
    //         height: 55,
    //         fontSize: 24,
    //         fontWeight: 500,
    //         borderRadius: 10000,
    //         backgroundColor: "#fff",
    //         border: "2px solid #b5bfc7",
    //         textTransform: "uppercase",
    //         "& .MuiSvgIcon-root": {
    //           display: "none",
    //         },
    //       },
    //       "& .MuiTypography-root": {
    //         "&.MuiTypography-h6": {
    //           fontSize: 15,
    //         },
    //         "&.MuiTypography-h4": {
    //           fontSize: 21,
    //         },
    //       },
    //     },
    //     "& .popover-section": {
    //       "& .MuiTypography-root": {
    //         color: "#062942",
    //       },
    //     },
    //     "& .MuiDivider-root": {
    //       margin: 0,
    //       backgroundColor: "#cdd4d9",
    //       backgroundImage: "unset !important",
    //       opacity: 1,
    //     },
    //     "& .popover-subSection": {
    //       lineHeight: "normal",
    //       textAlign: "center",
    //       "& .MuiTypography-root": {
    //         lineHeight: 0,
    //         letterSpacing: 0,
    //         color: "#576981",
    //       },
    //       "& textarea": {
    //         marginTop: 24,
    //         padding: "24px 20px",
    //         width: "100%",
    //         maxHeight: "72px !important",
    //         border: 0,
    //         borderRadius: 5,
    //         font: "inherit",
    //         fontSize: 14,
    //         backgroundColor: "#e6eaec",
    //         resize: "none",
    //         "&:focus-visible": {
    //           outline: "unset",
    //         },
    //       },
    //     },
    //     "& .popover-footer": {
    //       textAlign: "right",
    //       "& .MuiButton-root": {
    //         border: "2px solid transparent",
    //         transition: "border-color .15s",
    //         transform: "unset",
    //         textTransform: "unset",
    //         fontSize: 18,
    //         fontWeight: 700,
    //         borderRadius: 5,
    //         padding: "8px 16px",
    //         "&:first-child": {
    //           backgroundColor: "transparent",
    //           color: "#576981",
    //           "&:hover": {
    //             borderColor: "#cdd4d9",
    //             color: "#062942",
    //           },
    //         },
    //         "&:last-child": {
    //           marginLeft: 12,
    //           backgroundColor: "#37a703",
    //           color: "#fff",
    //           "&:hover": {
    //             backgroundColor: "#348e09",
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // currency_tab: {
    //   "& .MuiTabs-indicator": {
    //     borderRadius: 0,
    //     boxShadow: "unset",
    //   },
    //   "& .MuiButtonBase-root.MuiTab-root": {
    //     display: "grid",
    //     borderRadius: 0,
    //     padding: 0,
    //     paddingTop: 20,
    //     "&.Mui-selected": {
    //       borderTop: "4px solid #004889",
    //     },
    //     "&:hover,&:focus": {
    //       "& span:first-child": {
    //         color: "#004889",
    //       },
    //     },
    //     "& span": {
    //       "&:first-child": {
    //         color: "#0063c1",
    //         fontFamily: "Founders Grotesk,Helvetica,Arial,sans-serif",
    //         fontSize: 36,
    //         fontWeight: 600,
    //         lineHeight: "40px",
    //       },
    //       "&:last-child": {
    //         color: "#576981",
    //       },
    //     },
    //   },
    // },
    // hiddenCard_divider: {
    //   "&.MuiDivider-root": {
    //     // marginTop: 24,
    //     backgroundColor: "#dce0e4",
    //     opacity: 1,
    //     alignItems: "center",
    //     "&::before": {
    //       width: "unset",
    //     },
    //   },
    //   "& .MuiDivider-wrapper": {
    //     padding: 0,
    //   },
    //   "& .MuiChip-root": {
    //     backgroundColor: "#dce0e4",
    //     display: "flex",
    //   },
    //   "& .MuiSvgIcon-root": {
    //     fontSize: "20px !important",
    //   },
    // },
    // clients_pagination: {
    //   "& .MuiToolbar-root.MuiTablePagination-toolbar": {
    //     padding: 0,
    //     "& .MuiInputBase-root.MuiTablePagination-input.MuiSelect-root": {
    //       width: "unset !important",
    //     },
    //     "& .MuiTablePagination-actions": {
    //       display: "none",
    //     },
    //   },
    // },
    // segmentedControl_divider: {
    //   "&.MuiDivider-root": {
    //     marginTop: 24,
    //     backgroundColor: "#dce0e4",
    //     opacity: 1,
    //     alignItems: "center",
    //   },
    //   "& .MuiTabs-flexContainer": {
    //     background: "#fffefd",
    //     border: "1px #7f8c9f solid",
    //     borderRadius: 10000,
    //   },
    //   "& .MuiButtonBase-root": {
    //     borderRadius: 10000,
    //     width: 110,
    //     padding: "4px 8px",
    //     // transition: "color 500ms cubic-bezier(.67,-.03,.65,1.35)",
    //     transition: "all 0.4s ease",
    //   },
    //   "& .MuiButtonBase-root.MuiTab-root.Mui-selected": {
    //     background: "#0075dd",
    //     color: "#fff !important",
    //     cursor: "default",
    //   },
    //   "& .MuiButtonBase-root:hover": {
    //     background: "#eef6fc",
    //   },
    //   "& .MuiTabs-indicator": {
    //     borderRadius: 10000,
    //     transition: "color 500ms cubic-bezier(.67,-.03,.65,1.35)",
    //   },
    // },
    // outstanding_divider: {
    //   background: "#cdd4d9",
    //   backgroundImage: "unset !important",
    //   opacity: 1,
    // },
    // outstanding_icon: {
    //   // fontSize: "36px !important",
    //   fontSize: "26px !important",
    //   display: "flex",
    //   margin: "auto",
    // },
    // enhancedTable_toolbar: {
    //   "&.MuiToolbar-root": {
    //     backgroundColor: "unset",
    //     padding: 0,
    //     minHeight: "unset",
    //     "& .MuiTypography-root": {
    //       "& a": {
    //         color: "#0063c1",
    //         "&:hover,&:focus": {
    //           color: "#004889",
    //           opacity: 1,
    //         },
    //       },
    //       "& .MuiSvgIcon-root": {
    //         // verticalAlign: "middle",
    //         verticalAlign: "text-top",
    //         fontSize: "larger !important",
    //         color: "darkgray",
    //       },
    //       "& .numSelected": {
    //         lineHeight: "1.5em",
    //         backgroundColor: "#e6eaec",
    //         display: "inline-block",
    //         padding: "0 0.6em",
    //         marginLeft: 7,
    //         borderRadius: 100,
    //         fontSize: 14,
    //         fontWeight: "lighter",
    //         verticalAlign: "text-top",
    //       },
    //     },
    //     // "& .MuiOutlinedInput-root": {
    //     //   width: "unset !important",
    //     //   marginLeft: 10,
    //     //   border: "2px solid #cdd4d9",
    //     //   borderRadius: "5px !important",
    //     //   fontSize: "16px !important",
    //     //   padding: "8px 16px !important",
    //     //   "&:hover,&:focus": {
    //     //     backgroundColor: "#cdd4d9 !important",
    //     //   },
    //     //   "& .MuiSelect-select": {
    //     //     padding: "0 !important",
    //     //   },
    //     //   "& .MuiSvgIcon-root": {
    //     //     verticalAlign: "middle",
    //     //     fontSize: "20px !important",
    //     //   },
    //     // },
    //     "& .MuiButton-root": {
    //       width: "unset !important",
    //       marginLeft: 10,
    //       border: "2px solid #cdd4d9",
    //       borderRadius: "5px !important",
    //       fontSize: "16px !important",
    //       padding: "8px 16px !important",
    //       textTransform: "unset",
    //       color: "#495057 !important",
    //       "&:active": {
    //         opacity: 1,
    //       },
    //       "&:hover": {
    //         transform: "unset",
    //         backgroundColor: "#cdd4d9 !important",
    //       },
    //       "& .MuiSvgIcon-root": {
    //         fontSize: "20px !important",
    //       },
    //     },
    //   },
    // //   "& .MuiButtonBase-root.MuiIconButton-root": {
    // //     paddingTop: 0,
    // //     "& .MuiButton-root": {
    // //       padding: 0,
    // //       width: 35,
    // //       height: 30,
    // //       minWidth: "unset",
    // //       minHeight: "unset",
    // //       backgroundColor: "#37a703",
    // //       color: "#fff",
    // //       border: "2px solid transparent",
    // //       transition: "background-color .15s",
    // //       "& .MuiSvgIcon-root": {
    // //         fontSize: "26px !important",
    // //       },
    // //     },
    // //   },
    // },
    // addPayments_dialog: {
    //   "& .MuiPaper-root.MuiDialog-paper": {
    //     padding: "20px 140px",
    //   },
    //   "& .MuiButtonBase-root.MuiIconButton-root, & .MuiTypography-root.MuiTypography-button": {
    //     color: "#0063c1",
    //     "&:focus, &:hover": {
    //       color: "#004889 !important",
    //       opacity: 1,
    //     },
    //   },
    //   "& .MuiTypography-root.MuiTypography-button": {
    //     fontSize: 16,
    //     lineHeight: "unset",
    //   },
    //   "& .bulkPaymentModal-content": {
    //     color: "#062942",
    //   },
    //   "& .MuiDivider-root": {
    //     margin: 0,
    //     marginTop: 12,
    //     backgroundColor: "#cdd4d9",
    //     backgroundImage: "unset !important",
    //     opacity: 1,
    //   },
    //   "& .MuiTableContainer-root": {
    //     "& .MuiTableHead-root": {
    //       display: "table-header-group",
    //     },
    //     "& .MuiTableCell-root": {
    //       padding: "12px 6px",
    //       "&.MuiTableCell-head": {
    //         fontSize: 14,
    //         fontWeight: 400,
    //         borderColor: "#cdd4d9",
    //       },
    //       "&.MuiTableCell-body": {
    //         fontSize: 15,
    //         border: "unset",
    //         "& .MuiOutlinedInput-root.MuiInputBase-root": {
    //           border: "2px solid #7f8c9f",
    //           borderRadius: "5px !important",
    //           "&.bulk-payment-type": {
    //             height: "42px !important",
    //             padding: "0 !important",
    //             "& .MuiSelect-select": {
    //               // padding: "0.5rem 3.25rem 0.5rem 0.75rem !important",
    //               padding: "0.5rem 6.25rem 0.5rem 0.75rem !important",
    //               width: "100% !important",
    //             },
    //           },
    //         },
    //         "& .bulk-payment-note": {
    //           width: "100% !important",
    //         },
    //         "& .bulk-payment-date": {
    //           display: "flex",
    //           alignItems: "center",
    //           border: "2px solid #7f8c9f",
    //           borderRadius: "5px !important",
    //           // paddingLeft: "0.5rem",
    //           padding: "0 0.5rem",
    //           fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
    //           letterSpacing: "0.00938em",
    //           width: "100% !important",
    //           fontSize: "0.875rem !important",
    //           color: "#495057 !important",
    //           height: "42px !important",
    //           "& svg": {
    //             // height: "100%",
    //             // float: "right",
    //             marginLeft: "auto",
    //             fontSize: 18,
    //           },
    //         },
    //         "& .bulk-payment-amount": {
    //           width: "100%",
    //           "& .MuiOutlinedInput-root.MuiInputBase-root": {
    //             padding: "8px 12px !important",
    //             "& .MuiOutlinedInput-input.MuiInputBase-input": {
    //               textAlign: "right",
    //               fontSize: 14,
    //             },
    //             "& .MuiInputAdornment-root": {
    //               marginLeft: 4,
    //               "& .MuiTypography-root": {
    //                 fontSize: 14,
    //                 lineHeight: 0,
    //                 letterSpacing: 0,
    //               },
    //             },
    //           },
    //         },
    //         "& .custom-header-datepicker": {
    //           display: "flex",
    //           justifyContent: "center",
    //           padding: "0 8px",
    //           "& .MuiTypography-root.MuiTypography-button": {
    //             fontSize: 28,
    //             lineHeight: 0,
    //             "&:first-child": {
    //               marginRight: "auto",
    //             },
    //             "&:last-child": {
    //               marginLeft: "auto",
    //             },
    //           },
    //           "& select": {
    //             WebkitAppearance: "none",
    //             MozAppearance: "none",
    //             border: "unset",
    //             background: "unset",
    //             "&:focus-visible": {
    //               outline: "unset",
    //             },
    //           },
    //         },
    //         "& .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range": {
    //           color: "#fff !important",
    //           fontWeight: "400 !important",
    //         },
    //         "& .react-datepicker__day--today, .react-datepicker__month-text--today, .react-datepicker__quarter-text--today, .react-datepicker__year-text--today": {
    //           color: "#216ba5",
    //           fontWeight: 900,
    //         },
    //       },
    //     },
    //   },
    //   "& .MuiGrid-container.bulk-payment-client-total": {
    //     width: "100%",
    //     margin: 0,
    //     fontSize: 15,
    //     fontWeight: 700,
    //     backgroundColor: "#f3f4f6",
    //     borderBottom: "0.0625rem solid #cdd4d9",
    //     textAlign: "right",
    //     "& .MuiGrid-root.MuiGrid-item:last-child": {
    //       paddingRight: 6,
    //     },
    //   },
    //   "& .bulkPaymentModal-footer": {
    //     width: 1066,
    //     paddingTop: 12,
    //     borderTop: "0.0625rem solid #cdd4d9",
    //     boxShadow: "0 -4px 0 0 rgb(6 41 66 / 10%)",
    //     position: "fixed",
    //     bottom: 0,
    //     "& .MuiTypography-root": {
    //       fontSize: 14,
    //     },
    //     "& .MuiFormControlLabel-root": {
    //       margin: 0,
    //       "& .MuiCheckbox-root": {
    //         border: "2px solid #7f8c9f",
    //         borderRadius: 5,
    //       },
    //       "& .MuiTypography-root": {
    //         fontSize: 15,
    //         fontWeight: 400,
    //         color: "#062942",
    //       },
    //     },
    //     "& .MuiDialogActions-root": {
    //       padding: 0,
    //       "& .MuiButton-root": {
    //         border: "2px solid transparent",
    //         transition: "border-color .15s",
    //         transform: "unset",
    //         textTransform: "unset",
    //         fontSize: 20,
    //         fontWeight: 500,
    //         borderRadius: 5,
    //         padding: "8px 16px",
    //         "&:first-child": {
    //           backgroundColor: "transparent",
    //           color: "#576981",
    //           "&:hover": {
    //             borderColor: "#cdd4d9",
    //             color: "#062942",
    //           },
    //         },
    //         "&:not(:first-child)": {
    //           backgroundColor: "#37a703",
    //           color: "#fff",
    //           "&:hover": {
    //             backgroundColor: "#348e09",
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // menuPaper_addPayments_dialog: {
    //   padding: 0,
    //   border: "2px solid #7f8c9f",
    //   borderRadius: 3,
    //   maxHeight: 236,
    //   "& .MuiMenuItem-root": {
    //     borderRadius: 0,
    //     borderBottom: "1px solid #e6eaec",
    //   },
    // },
    // actionTable_dialog: {
    //   "& .MuiDialog-container": {
    //     height: "80%",
    //     "& .MuiPaper-root.MuiDialog-paper": {
    //       minWidth: 500,
    //       "& .MuiDialogTitle-root": {
    //         fontSize: 20,
    //         fontWeight: 600,
    //         backgroundColor: "#e6eaec",
    //         color: "#062942",
    //       },
    //       "& .MuiDialogContent-root": {
    //         padding: "24px 20px 0 20px",
    //         "& .MuiDialogContentText-root": {
    //           fontSize: 16,
    //           color: "#062942",
    //         },
    //         "& .MuiFormControl-root": {
    //           "& .MuiInputBase-root": {
    //             "&.Mui-error": {
    //               // borderColor: "#d32f2f",
    //               borderColor: "#ea0606",
    //             },
    //             "& .MuiInputBase-input": {
    //               width: "100% !important",
    //             },
    //           },
    //         },
    //       },
    //       "& .MuiDialogActions-root": {
    //         padding: "12px 24px",
    //         "& .MuiButton-root": {
    //           fontSize: 14,
    //           padding: 8,
    //           border: "2px solid transparent",
    //           transition: "border-color .15s",
    //           transform: "unset",
    //           "&:first-child": {
    //             backgroundColor: "transparent",
    //             color: "#576981",
    //             "&:hover": {
    //               borderColor: "#cdd4d9",
    //               color: "#062942",
    //             },
    //           },
    //           "&:not(:first-child)": {
    //             backgroundColor: "#37a703",
    //             color: "#fff",
    //             "&:hover": {
    //               backgroundColor: "#348e09",
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // actionTable_snackbar: {
    //   "& .MuiAlert-root": {
    //     backgroundColor: "#37a703",
    //   },
    // },
    // enhancedTable_head: {
    //   "&.MuiTableHead-root": {
    //     display: "table-header-group",
    //     "& .MuiTableCell-root.MuiTableCell-head": {
    //       borderBottom: "0.0625rem solid #cdd4d9",
    //       "&:first-child": {
    //         "& .MuiCheckbox-root": {
    //           cursor: "default",
    //           border: "2px solid #7f8c9f",
    //           borderRadius: 5,
    //           width: 25,
    //           height: 25,
    //         },
    //       },
    //       "&:not(:first-child)": {
    //         padding: "6px 10px",
    //         // color: "#576981",
    //         color: "darkgray",
    //         fontSize: 14,
    //         "& .MuiButtonBase-root.MuiTableSortLabel-root": {
    //           "& .MuiSvgIcon-root.MuiTableSortLabel-icon": {
    //             width: 0,
    //             margin: 0,
    //           },
    //           "&.Mui-active": {
    //             "& .MuiSvgIcon-root.MuiTableSortLabel-icon": {
    //               width: "1em",
    //               // margin: "0 4px",
    //             },
    //           },
    //         },
    //       },
    //       "&:last-child": {
    //         textAlign: "right",
    //       },
    //     },
    //   },
    // },
    // tableBody_tab: {
    //   "& .MuiTableRow-root": {
    //     // "&.Mui-selected,&.MuiTableRow-hover": {
    //     "&:hover": {
    //       // backgroundColor: "lightcyan !important",
    //       backgroundColor: "#f2f8fd !important",
    //       cursor: "pointer",
    //     },
    //     "&.Mui-selected": {
    //       backgroundColor: "unset",
    //     },
    //     "& .MuiTableCell-root.MuiTableCell-body": {
    //       borderBottom: "0.0625rem solid #cdd4d9",
    //       "&:not(:first-child)": {
    //         // padding: "6px 10px",
    //         padding: "12px 10px",
    //       },
    //       "& .MuiCheckbox-root.MuiButtonBase-root": {
    //         cursor: "default",
    //         border: "2px solid #7f8c9f",
    //         borderRadius: 5,
    //         width: 25,
    //         height: 25,
    //       },
    //     },
    //   },
    // },
    // // tabbedLinks_track: {
    // client_tab: {
    //   "&.MuiTabs-root": {
    //     "& .MuiTabs-scroller ": {
    //       overflow: "hidden !important",
    //       borderBottom: "1px solid #cdd4d9",
    //       position: "unset",
    //       "& .MuiTabs-flexContainer": {
    //         width: "max-content",
    //         "& .MuiButtonBase-root.MuiTab-root": {
    //           borderRadius: "5px 5px 0 0",
    //           minWidth: "124px !important",
    //           padding: "10px 24px",
    //           color: "#0063c1 !important",
    //           // borderBottom: "1px solid #cdd4d9",
    //           // margin: 0,
    //           "&:hover": {
    //             color: "#004889 !important",
    //           },
    //           "&.Mui-selected": {
    //             border: "1px solid #cdd4d9",
    //             // borderBottom: "1px solid #fffefd",
    //             borderBottom: "unset",
    //             backgroundColor: "#fffefd",
    //             color: "unset !important",
    //           },
    //         },
    //       },
    //       "& .MuiTabs-indicator": {
    //         // width: "123px !important",
    //         marginLeft: 24,
    //         height: 53,
    //         borderRadius: "5px 5px 0 0",
    //         boxShadow: "unset",
    //         transition: "unset",
    //       },
    //     },
    //   },
    // },
    // clientDetails_tab: {
    //   "&.MuiTabs-root": {
    //     // left: -40,
    //     // width: "109% !important",
    //     left: -20,
    //     width: "103.5% !important",
    //     // "& .MuiTabs-scroller ": {
    //     //   overflow: "hidden !important",
    //       // borderBottom: "1px solid #cdd4d9",
    //       "& .MuiTabs-flexContainer": {
    //         width: "max-content",
    //         "& .MuiButtonBase-root.MuiTab-root": {
    //           borderRadius: "5px 5px 0 0",
    //           minWidth: "124px !important",
    //           padding: "10px 24px",
    //           color: "#0063c1 !important",
    //           borderBottom: "1px solid #cdd4d9",
    //           margin: 0,
    //           "&:hover": {
    //             color: "#004889 !important",
    //           },
    //           "&.Mui-selected": {
    //             border: "1px solid #cdd4d9",
    //             borderBottom: "1px solid #fffefd",
    //             backgroundColor: "#fffefd",
    //             color: "unset !important",
    //           },
    //         },
    //       },
    //     // },
    //   },
    // },
    // editNote_icon: {
    //   fontSize: "20px !important",
    //   verticalAlign: "sub",
    // },
    // editNote_input: {
    //   "&.MuiOutlinedInput-root.MuiInputBase-root": {
    //     border: "none",
    //     "& input.MuiOutlinedInput-input::placeholder": {
    //       opacity: 1,
    //     },
    //     "&.Mui-focused": {
    //       borderColor: "#0072E5",
    //       borderWidth: 2,
    //       borderStyle: "solid",
    //       "& .MuiOutlinedInput-notchedOutline": {
    //         border: "none",
    //       },
    //     },
    //   },
    // },
  };
});
