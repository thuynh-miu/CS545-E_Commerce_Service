import axios from "axios";

const hostname = process.env.REACT_APP_BACKEND_URL;

export const getCart = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${hostname}/api/v1/cart`, {
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
    });

    if (response.status === 200) {
        return response.json();
    }
    return null;
};

export const addToCart = async (productId, quantity) => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(
        `${hostname}/api/v1/cart?productId=${productId}&quantity=${quantity}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accessToken: accessToken,
            },
        }
    );
};

export const removeFromCart = async (productId) => {
    const data = await axios.get(`${hostname}/api/v1/cart?productId=${productId}`);
};

export const placeOrder = async (payload) => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(`${hostname}/api/v1/orders/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
        body: JSON.stringify(payload),
    });
};
