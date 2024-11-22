import React, { useContext, useReducer, useState } from "react";

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
    const [cartItems, setCartItems] = useState([]);

    const addProduct = (product) => {
        setCartItems(items => {
            const found = items.find(item => item.id === product.id);
            if (found) {
                found.quantity += 1;
            } else {
                product.quantity = 1;
                items.push(product);
            }

            return [...items];
        });
    };

    const removeProduct = (product) => {
        setCartItems(items => {
            const found = items.find(item => item.id === product.id);
            if (found) {
                if (found.quantity === 1) {
                    return [...items.filter(item => item.id !== product.id)]
                }
                found.quantity -= 1;
            }
            return [...items];
        });
    };

    return (
        <UserContext.Provider
            value={{ 
                userData: state, 
                userDispatch: dispatch, 
                cartItems,
                addProduct,
                removeProduct
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext)