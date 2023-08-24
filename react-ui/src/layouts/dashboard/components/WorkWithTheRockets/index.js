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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Custom styles for the WorkWithTheRockets
// import styles from "layouts/dashboard/components/WorkWithTheRockets/styles";

// Images
import ivancik from "assets/images/ivancik.jpg";

const useStyles = (theme) => {
  const { palette, functions, borders } = theme;
  const { linearGradient, rgba, pxToRem } = functions;
  const { gradients } = palette;
  const { main, state } = gradients.dark;
  const { borderRadius } = borders;
  return makeStyles(() => ({
    workWithTheRockets_content: {
      backgroundImage: `${linearGradient(
        rgba(main, 0.8),
        rgba(state, 0.8)
      )}, url(${ivancik})`,
      backgroundSize: "cover",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: pxToRem(16),
      borderRadius: borderRadius.lg,
    },

    workWithTheRockets_button: {
      marginTop: "auto",
      marginRight: "auto",
      display: "inline-flex",
      alignItems: "center",
      cursor: "pointer",

      "& .material-icons-round": {
        fontSize: "1.125rem",
        transform: `translate(${pxToRem(2)}, ${pxToRem(-1)})`,
        transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
      },

      "&:hover .material-icons-round, &:focus .material-icons-round": {
        transform: `translate(${pxToRem(6)}, ${pxToRem(-1)})`,
      },
    },
  }));
};

function WorkWithTheRockets() {
  // const classes = styles();
  const theme = useTheme();
  const classes = useStyles(theme)();

  return (
    <Card className="h-100">
      <SuiBox position="relative" height="100%" p={2}>
        <SuiBox customClass={classes.workWithTheRockets_content}>
          <SuiBox mb={3} pt={1}>
            <SuiTypography variant="h5" textColor="white" fontWeight="bold">
              Work with the rockets
            </SuiTypography>
          </SuiBox>
          <SuiBox mb={2}>
            <SuiTypography variant="body2" textColor="white">
              Wealth creation is an evolutionarily recent positive-sum game. It is all about who
              take the opportunity first.
            </SuiTypography>
          </SuiBox>
          <SuiTypography
            component="a"
            href="#"
            variant="button"
            textColor="white"
            fontWeight="medium"
            customClass={classes.workWithTheRockets_button}
          >
            Read More
            <Icon className="font-bold">arrow_forward</Icon>
          </SuiTypography>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}

export default WorkWithTheRockets;
