import React, { useContext, useState, useEffect } from "react";
import { getCurrentUserInfo } from "../../api";
import { addToCart, getCart } from "../../api/cart";
import { UserContext } from "../UserContextProvider";
import { LoginContext } from "../LoginStatusProvider";
import { UserRole } from "../../constants/UserRole";

export const CartContext = React.createContext();

export const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const { userData } = useContext(UserContext);
    const { isLoggedIn } = useContext(LoginContext);

    useEffect(() => {
        if (!isLoggedIn || userData?.role !== UserRole.BUYER) {
            setCartItems([]);
        } else {
        }
    }, [isLoggedIn, userData]);

    const addProduct = (product) => {
        const found = cartItems.find((item) => item.id === product.id);
        const quantity = found ? found.quantity + 1 : 1;
        addToCart(product.id, quantity)
            .then((response) => response.json())
            .then((cartData) => {
                setTotalPrice(cartData.totalPrice);
                const items = cartData.cartItems.map((item) => ({
                    id: item.product.id,
                    name: item.product.name,
                    description: item.product.description,
                    price: item.product.price,
                    quantity: item.quantity,
                    imageUrl: item.product.imageUrl,
                }));
                setCartItems(items);
            });
    };

    const reduceProduct = (product) => {
        const found = cartItems.find((item) => item.id === product.id);
        if (!found) {
            return;
        }
        const quantity = found.quantity - 1;
        addToCart(product.id, quantity)
            .then((response) => response.json())
            .then((cartData) => {
                setTotalPrice(cartData.totalPrice);
                const items = cartData.cartItems.map((item) => ({
                    id: item.product.id,
                    name: item.product.name,
                    description: item.product.description,
                    price: item.product.price,
                    quantity: item.quantity,
                    imageUrl: item.product.imageUrl,
                }));
                setCartItems(items);
            });
    };

    const removeProduct = (product) => {
        addToCart(product.id, 0)
            .then((response) => response.json())
            .then((cartData) => {
                setTotalPrice(cartData.totalPrice);
                const items = cartData.cartItems.map((item) => ({
                    id: item.product.id,
                    name: item.product.name,
                    description: item.product.description,
                    price: item.product.price,
                    quantity: item.quantity,
                    imageUrl: item.product.imageUrl,
                }));
                setCartItems(items);
            });
    };

    const syncCart = async () => {
        const cartData = await getCart();

        setTotalPrice(cartData.totalPrice);
        const items = cartData.cartItems.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            description: item.product.description,
            price: item.product.price,
            quantity: item.quantity,
            imageUrl: item.product.imageUrl,
        }));
        setCartItems(items);
    };

    useEffect(() => {
        syncCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems: cartItems,
                addProduct: addProduct,
                reduceProduct: reduceProduct,
                removeProduct: removeProduct,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};
