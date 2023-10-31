import axios from "axios";

export const baseURL = 'http://localhost:8000/user';
// export const baseURL = 'https://api.dinnre.com';

export const dbObject = axios.create({
    withCredentials: true,
    baseURL
});