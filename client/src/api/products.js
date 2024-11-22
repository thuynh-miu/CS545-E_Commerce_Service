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
