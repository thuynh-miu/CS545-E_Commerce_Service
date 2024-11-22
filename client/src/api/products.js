const hostname = process.env.REACT_APP_BACKEND_URL;

export const deleteProductById = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(`${hostname}/api/v1/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
    });
};

export const getProductById = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(`${hostname}/api/v1/products/${id}`, {
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
    });
};

export const updateProductById = async (id, payload) => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(`${hostname}/api/v1/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
        body: JSON.stringify(payload),
    });
};

export const createProduct = async (payload) => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(`${hostname}/api/v1/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
        body: JSON.stringify(payload),
    });
};