const hostname = process.env.REACT_APP_BACKEND_URL;

export const register = async (payload) => {
    return fetch(`${hostname}/api/v1/authenticate/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }).then((response) => response.json());
};

export const login = async (payload) => {
    return fetch(`${hostname}/api/v1/authenticate/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    }).then((response) => response.json());
};
