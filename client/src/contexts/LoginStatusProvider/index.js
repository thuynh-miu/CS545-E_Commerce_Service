import React, { useState } from "react";
import _ from "lodash";
export const LoginContext = React.createContext();

export const LoginContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        _.isString(localStorage.getItem("accessToken"))
    );

    return (
        <LoginContext.Provider
            value={{ isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn }}
        >
            {children}
        </LoginContext.Provider>
    );
};
