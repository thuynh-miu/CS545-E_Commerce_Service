
const hostname = process.env.REACT_APP_BACKEND_URL;

// export const getOrders = async () => {
//     return fetch(`${hostname}/api/v1/authenticate`, {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });
// };

export const getInventories = async () => {
    const accessToken = localStorage.getItem('accessToken');
    return fetch(`${hostname}/api/v1/products/seller`, {
        headers: {
            "Content-Type": "application/json",
            "accessToken": accessToken
        },
    }).then((response) => response.json());
};