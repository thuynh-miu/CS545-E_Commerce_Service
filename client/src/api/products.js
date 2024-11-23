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

export const deleteReview = async (reviewId) => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(`${hostname}/api/v1/admin/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
    });
};

export const createReview = async (productId, payload) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await  fetch(`${hostname}/api/v1/products/${productId}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accessToken: accessToken,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Review failed");
        }
    } catch (error) {
        throw error;
    }
};
