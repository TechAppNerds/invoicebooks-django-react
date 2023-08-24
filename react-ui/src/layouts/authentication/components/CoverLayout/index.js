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
import { useTheme } from '@mui/material/styles';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React example components
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
// import Footer from "layouts/authentication/components/Footer";

// Custom styles for the Baise
// import styles from "layouts/authentication/components/CoverLayout/styles";

// Soft UI Dashboard React page layout routes
// import routes from "routes";


const useStyles = (theme, image) => {
  const { functions, borders } = theme;
  const { pxToRem } = functions;
  const { borderRadius } = borders;
  return makeStyles(() => ({
    coverLayout: {
      // minHeight: "75vh",
      minHeight: "inherit",
      margin: 0,
    },
    coverLayout_imageBox: {
      transform: "skewX(-10deg)",
      height: "100%",
      overflow: "hidden",
      marginRight: pxToRem(-128),
      borderBottomLeftRadius: borderRadius.lg,
    },
    coverLayout_image: {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      transform: "skewX(10deg)",
      marginLeft: pxToRem(-64),
      // height: "100%",
      // height: "100vh",
      minHeight: "100%",
    },
  }));
};

// function CoverLayout({ color, header, title, description, image, top, children }) {
function CoverLayout({ color, header, title, description, image, children }) {
  // const classes = styles({ image });
  const theme = useTheme();
  const classes = useStyles(theme, image)();

  return (
    <PageLayout background="white">
      {/* <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://appseed.us/product/django-react-soft-dashboard",
          label: "free download",
          color: "dark",
        }}
      /> */}
      <Grid container justifyContent="center" className={classes.coverLayout}>
        <Grid item xs={11} sm={8} md={5} xl={3} style={{ display: "flex", alignItems: "center", }}>
          {/* <SuiBox mt={top}> */}
          <SuiBox>
            {/* <SuiBox pt={3} px={3}> */}
            <SuiBox pt={2} px={2}>
              {!header ? (
                <>
                  <SuiBox mb={1}>
                    <SuiTypography variant="h3" fontWeight="bold" textColor={color} textGradient>
                      {title}
                    </SuiTypography>
                  </SuiBox>
                  <SuiTypography variant="body2" fontWeight="regular" textColor="text">
                    {description}
                  </SuiTypography>
                </>
              ) : (
                // header
                <>
                  <SuiTypography variant="h4" fontWeight="bold" mb={6} style={{ display: "flex", alignItems: "center", fontSize: 26, }}>
                    <SuiBox component="img" mr={1} width="15%" src={`${process.env.PUBLIC_URL}/InvoiceBooks-icon.png`} alt="InvoiceBooks Icon" />
                    InvoiceBooks
                  </SuiTypography>
                  <SuiBox mb={1}>
                    <SuiTypography variant="h4" textColor={color} style={{ fontSize: 22, }}>
                      {title}
                    </SuiTypography>
                  </SuiBox>
                  <SuiTypography variant="body2" fontWeight="regular" textColor="text" style={{ fontSize: 14, }}>
                    {description}
                  </SuiTypography>
                </>
              )}
            </SuiBox>
            {/* <SuiBox p={3}>{children}</SuiBox> */}
            <SuiBox p={2}>{children}</SuiBox>
          </SuiBox>
        </Grid>
        <Grid item xs={12} md={5}>
          <SuiBox
            display={{ xs: "none", md: "block" }}
            position="relative"
            right={{ md: "-12rem", xl: "-16rem" }}
            customClass={classes.coverLayout_imageBox}
          >
            <SuiBox customClass={classes.coverLayout_image} />
          </SuiBox>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  // header: "",
  header: true,
  title: "",
  description: "",
  color: "info",
  // top: 20,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  // header: PropTypes.node,
  header: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  // top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
