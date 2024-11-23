const hostname = process.env.REACT_APP_BACKEND_URL;

export const register = async (payload) => {
    try {
        const response = await fetch(
            `${hostname}/api/v1/authenticate/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        if (!response.ok) {
            throw new Error("Registration failed");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const login = async (payload) => {
    return fetch(`${hostname}/api/v1/authenticate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
};

export const getProducts = async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${hostname}/api/v1/products?${queryString}`;
    return fetch(url).then((response) => response.json());
};

export const getProductById = async (id) => {
    return fetch(`${hostname}/api/v1/products/${id}`).then((response) =>
        response.json()
    );
};

export const getReviewsByProductId = async (id) => {
    return fetch(`${hostname}/api/v1/products/${id}/reviews`).then((response) =>
        response.json()
    );
};

export const getCurrentUserInfo = async () => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(`${hostname}/api/v1/users/info`, {
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error();
        })
        .then(({ username, email, role }) => ({
            username: username,
            email: email,
            role: role.role,
        }))
        .catch((error) => {
            return null;
        });
};

export const getOrderById = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    return fetch(`${hostname}/api/v1/orders/${id}`, {
        headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
        },
    }).then((response) => response.json());
};
