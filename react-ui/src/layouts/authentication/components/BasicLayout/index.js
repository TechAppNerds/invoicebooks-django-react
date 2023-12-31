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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

import { makeStyles } from '@mui/styles';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
// import Footer from "layouts/authentication/components/Footer";

// Custom styles for the BaiseLayout
// import styles from "layouts/authentication/components/BasicLayout/styles";

// Soft UI Dashboard PRO React themes
import theme from "assets/theme";

// Soft UI Dashboard React page layout routes
// import routes from "routes";

const { palette, functions, borders } = theme;
const { gradients } = palette;
const { linearGradient, rgba, pxToRem } = functions;
const { borderRadius } = borders;

const useStyles = makeStyles({
  basicLayout: {
    backgroundImage: ({ image }) =>
      image &&
      `${linearGradient(
        rgba(gradients.dark.main, 0.6),
        rgba(gradients.dark.state, 0.6)
      )}, url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "calc(100% - 2rem)",
    minHeight: "50vh",
    margin: pxToRem(16),
    padding: `${pxToRem(48)} 0 ${pxToRem(224)}`,
    borderRadius: borderRadius.lg,
  },
});

function BasicLayout({ title, description, image, children }) {
  // const classes = styles({ image });
  const classes = useStyles({ image });

  return (
    <PageLayout>
      {/* <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://appseed.us/product/django-react-soft-dashboard",
          label: "free download",
        }}
        transparent
        light
      /> */}
      <SuiBox customClass={classes.basicLayout}>
        <Grid container spacing={3} justifyContent="center" className="text-center">
          <Grid item xs={10} lg={4}>
            <SuiBox mt={6} mb={1}>
              <SuiTypography variant="h1" textColor="white" fontWeight="bold">
                {title}
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={2}>
              <SuiTypography variant="body2" textColor="white" fontWeight="regular">
                {description}
              </SuiTypography>
            </SuiBox>
          </Grid>
        </Grid>
      </SuiBox>
      <SuiBox mt={{ xs: -26, lg: -24 }} mb={6} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </SuiBox>
      {/* <Footer /> */}
    </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
BasicLayout.defaultProps = {
  title: "",
  description: "",
};

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
