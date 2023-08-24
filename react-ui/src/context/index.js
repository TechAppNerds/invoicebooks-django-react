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

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

// import { createContext, useContext, useReducer } from "react";
import {
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// The Soft UI Dashboard React main context
const SoftUI = createContext();
// export const SoftUI = createContext();

// Soft UI Dashboard React reducer
function reducer(state, action) {
  const { type, value } = action;
  switch (type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: value };
    }
    case "DIRECTION": {
      return { ...state, direction: value };
    }
    case "LAYOUT": {
      return { ...state, layout: value };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

// Soft UI Dashboard React context provider
function SoftUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  // console.log("controller in SoftUIControllerProvider = ",controller);
  // console.log("dispatch in SoftUIControllerProvider = ",dispatch);
  // console.log("reducer in SoftUIControllerProvider = ",reducer);

  // return <SoftUI.Provider value={[controller, dispatch]}>{children}</SoftUI.Provider>;

  // const contextValue = useMemo(() => ({controller, dispatch}), [controller, dispatch])
  const contextValue = useMemo(() => {
    return { controller, dispatch };
  }, [controller, dispatch]);
  // const contextValue = {controller, dispatch};

  // console.log("contextValue in SoftUIControllerProvider = ", JSON.stringify(contextValue, null, 2));

  return <SoftUI.Provider value={contextValue}>{children}</SoftUI.Provider>;
}

// Soft UI Dashboard React custom hook for using context
function useSoftUIController() {
  // return useContext(SoftUI);
  const context = useContext(SoftUI);
  // console.log("context in useSoftUIController = ", JSON.stringify(context, null, 2));
  if (context === undefined) {
    throw new Error('Context Provider is missing');
  }
  return context;
}

// Typechecking props for the SoftUIControllerProvider
SoftUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { SoftUIControllerProvider, useSoftUIController };
