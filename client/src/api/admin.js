const hostname = process.env.REACT_APP_BACKEND_URL;

export const getUnapprovedSellers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(`${hostname}/api/v1/admin/sellers/unapproved`, {
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
    }).then((response) => response.json());
};

export const approveSellerById = async (sellerId) => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(`${hostname}/api/v1/admin/sellers/${sellerId}/approve`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
    });
};