import axios from "axios";

export const baseURL = 'https://api.dinnre.com';

export const dbObject = axios.create({
    withCredentials: true,
    baseURL
});