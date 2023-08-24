import React from "react";
// import PropTypes from "prop-types";

// const AuthContext = React.createContext(null);

// export const AuthProvider = ({ userData, children }) => {
//   let [user, setUser] = React.useState(userData);
//   user = typeof user === "string" ? JSON.parse(user) : user;
//   console.log("user in AuthProvider = ", JSON.stringify(user, null, 2));

//   return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
// };

// AuthProvider.propTypes = {
//   userData: PropTypes.any,
//   children: PropTypes.any,
// };

// export const useAuth = () => React.useContext(AuthContext);

export const AuthContext = React.createContext(null);
