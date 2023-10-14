import axios from "axios";

// export const baseURL = 'http://localhost:8000';
export const baseURL = 'https://api.dinnre.com';

export const dbObject = axios.create({
    withCredentials: true,
    baseURL
});