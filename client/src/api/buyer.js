const hostname = process.env.REACT_APP_BACKEND_URL;

export const getOrdersHistory = async () => {
    const accessToken = localStorage.getItem('accessToken');
    return fetch(`${hostname}/api/v1/orders/history`, {
        headers: {
            "Content-Type": "application/json",
            "accessToken": accessToken
        },
    }).then((response) => response.json());
};
