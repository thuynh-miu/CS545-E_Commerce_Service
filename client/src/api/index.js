const hostname = process.env.REACT_APP_BACKEND_URL;

console.log('hostname', hostname)
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
    return fetch(`${hostname}/api/v1/authenticate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => response.json())
        .then((data) => console.log("here", data));
};
