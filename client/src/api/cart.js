import axios from "axios";

const host = "http://localhost:8080";
export const getCart = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`${host}/api/v1/cart`, {
        headers: {
            "Content-Type": "application/json",
            "accessToken": accessToken
        },
    });

    if (response.status === 200 && response.data) {
        return response.json();
    }
    return null;
}

export const addToCart = async (productId, quantity) => {
    const data = await axios.get(`${host}/api/v1/cart?productId=${productId}&quantity=${quantity}`);
    console.log(data)
}

export const removeFromCart = async (productId) => {
    const data = await axios.get(`${host}/api/v1/cart?productId=${productId}`);
    console.log(data)
}