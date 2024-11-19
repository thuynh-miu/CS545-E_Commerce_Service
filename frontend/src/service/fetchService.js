import { API } from "../config/api.js";
import axios from "axios";
import Cookies from "js-cookie";

export const refreshAccessToken = async () => {
    try {
        const refreshToken = Cookies.get('refreshToken');
        console.log('refreshToken', refreshToken);
        const res = await API.post('authenticate/refresh', { refreshToken });
        const { accessToken } = res.data;
        return accessToken;
    } catch (err) {
        console.error('Failed to refresh token', err);
        throw err; // Handle logout or error appropriately
    }
};


API.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            // Assume 401 means token expired
            try {
                const newAccessToken = await refreshAccessToken();
                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios.request(error.config);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

const get = async (url) => {
    try {
        let data = [];
        data = (await API.get(url)).data;
        return data;
    } catch (error) {
        console.log(error.message)
        return [];
    }
}

const getMultipleEndpoints = async (urls) => {
    try {
        let data = [];
        let endpoints = [...urls];

        data = await axios.all(endpoints.map((endpoint) => API.get(endpoint)));
        return buildData(data);
    } catch (error) {
        console.log(error.message)
        return [];
    }
}

const post = async (url, data) => {
    try {
        let result = [];
        result = await API.post(url, data);
        return result;
    } catch (error) {
        console.log("Error with POST: ", error);
        return [];
    }


};
/**
 * This will take the title from the pocketguides and merge them into to the corresponding
 * @param arr
 * @returns {*[]}
 */
const buildData = (arr) => {
    // implementation
    return null;
}


export const fetchService = {
    get,
    getMultipleEndpoints,
    post
};
