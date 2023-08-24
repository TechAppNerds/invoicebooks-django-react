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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard Materail-UI example components
import Table from "examples/Table";

// Custom styles for the Projects
// import styles from "layouts/dashboard/components/Projects/styles";

// Data
import data from "layouts/dashboard/components/Projects/data";

const useStyles = (theme) => {
  const { palette, functions, borders } = theme;
  const { white } = palette;
  const { pxToRem } = functions;
  const { borderWidth, borderColor } = borders;
  return makeStyles(() => ({
    projects_table: {
      "& .MuiTableRow-root:not(:last-child)": {
        "& td": {
          borderBottom: `${borderWidth[1]} solid ${borderColor}`,
        },
      },
    },

    projects_tableAvatar: {
      border: `${borderWidth[2]} solid ${white.main}`,
      cursor: "pointer",
      position: "relative",

      "&:not(:first-child)": {
        marginLeft: pxToRem(-12),
      },

      "&:hover, &:focus": {
        zIndex: "10",
      },
    },
  }));
};

function Projects() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  // const classes = styles();
  const theme = useTheme();
  const classes = useStyles(theme)();

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SuiBox>
          <SuiTypography variant="h6" gutterBottom>
            Projects
          </SuiTypography>
          <SuiBox display="flex" alignItems="center" lineHeight={0}>
            <Icon className="font-bold text-info">done</Icon>
            <SuiTypography variant="button" fontWeight="regular" textColor="text">
              &nbsp;<strong>30 done</strong> this month
            </SuiTypography>
          </SuiBox>
        </SuiBox>
        <SuiBox color="text" px={2}>
          <Icon className="cursor-pointer font-bold" fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </SuiBox>
        {renderMenu}
      </SuiBox>
      <SuiBox customClass={classes.projects_table}>
        <Table columns={columns} rows={rows} />
      </SuiBox>
    </Card>
  );
}

export default Projects;
