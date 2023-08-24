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

// clsx is a utility for constructing className strings conditionally
import clsx from "clsx";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Custom styles for PlaceholderCard
// import styles from "examples/Cards/PlaceholderCard/styles";

const useStyles = (theme) => {
  const { grey, transparent } = theme.palette;
  const { borderWidth } = theme.borders;
  return makeStyles(({ hasBorder }) => ({
    placeholderCard: {
      height: "100%",
      border: hasBorder ? `${borderWidth[1]} solid ${grey[300]}` : "none",
    },
    placeholderCard_outlined: {
      backgroundColor: transparent.main,
      // border: `${borderWidth[1]} solid ${grey[300]} !important`,
      // border: `2px dashed ${grey[300]} !important`,
      border: "2px dashed #cdd4d9 !important",
      boxShadow: "none",
    },
  }));
};

function PlaceholderCard({ icon, title, hasBorder, outlined }) {
  // const classes = styles({ hasBorder });
  const theme = useTheme();
  const classes = useStyles(theme)({ hasBorder });

  return (
    <Card
      raised
      className={clsx(classes.placeholderCard, {
        [classes.placeholderCard_outlined]: outlined,
      })}
    >
      <SuiBox
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        height="100%"
        p={3}
      >
        <SuiBox color="secondary" mb={0.5}>
          <Icon fontSize="medium" className="font-bold" style={{ color: "#37a703", fontSize: "xx-large", }}>
            {icon}
          </Icon>
        </SuiBox>
        {/* <SuiTypography variant={title.variant} textColor="secondary"> */}
        <SuiTypography variant={title.variant}>
          {title.text}
        </SuiTypography>
      </SuiBox>
    </Card>
  );
}

// Setting default values for the props of PlaceholderCard
PlaceholderCard.defaultProps = {
  icon: "add",
  hasBorder: false,
  outlined: false,
};

// Typechecking props for the PlaceholderCard
PlaceholderCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.shape({
    variant: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  hasBorder: PropTypes.bool,
  outlined: PropTypes.bool,
};

export default PlaceholderCard;
