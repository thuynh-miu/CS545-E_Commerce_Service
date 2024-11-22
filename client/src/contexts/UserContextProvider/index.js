import React, { useContext, useReducer, useState, useEffect } from "react";
import { getCurrentUserInfo,  } from "../../api";
import { LoginContext } from "../LoginStatusProvider";

export const UserContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case "set_user_data":
            return action.data;
        case "log_out":
            return {};
    }
    throw Error(`Can not find action type ${action.type}`);
}

const initUserData = {};

export const UserContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initUserData);
    const { isLoggedIn } = useContext(LoginContext);

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch({ type: "log_out" });
        } else {
            getCurrentUserInfo().then((userData) =>
                dispatch({ type: "set_user_data", data: userData })
            );
        }
    }, [isLoggedIn]);

    return (
        <UserContext.Provider
            value={{
                userData: state,
                userDispatch: dispatch,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
