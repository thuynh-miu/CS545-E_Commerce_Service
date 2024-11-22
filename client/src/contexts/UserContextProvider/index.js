import React, { useContext, useReducer, useState, useEffect } from "react";
import { getCurrentUserInfo,  } from "../../api";
import { getCart } from "../../api/cart"
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
    const [cartItems, setCartItems] = useState([]);
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

    const addProduct = (product) => {
        setCartItems((items) => {
            const found = items.find((item) => item.id === product.id);
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
        setCartItems((items) => {
            const found = items.find((item) => item.id === product.id);
            if (found) {
                if (found.quantity === 1) {
                    return [...items.filter((item) => item.id !== product.id)];
                }
                found.quantity -= 1;
            }
            return [...items];
        });
    };

    const syncCart = async () => {
        const data = await getCart();
        console.log(data)
    }

    useEffect(() => {
        syncCart();
    }, [])

    return (
        <UserContext.Provider
            value={{
                userData: state,
                userDispatch: dispatch,
                cartItems,
                addProduct,
                removeProduct,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
