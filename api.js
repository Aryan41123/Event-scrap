import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

export const fetchEvents = () => axios.get(`${BASE_URL}/events`);

export const subscribeEmail = (email) =>
  axios.post(`${BASE_URL}/subscribe`, { email });
