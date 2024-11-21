import React, { useReducer } from "react";

export const UserContext = React.createContext();

function reducer(state, action) {
    switch (action) {
        case "set_user_data":
            return action.data;
    }
}

const initUserData = {
    name: "Cuong",
    roles: [],
};

export const UserContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initUserData);

    return (
        <UserContext.Provider
            value={{ userData: state, userDispatch: dispatch }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
