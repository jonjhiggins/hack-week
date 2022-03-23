import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FICTIONEERS_AUDIENCE_API_HOST,
  headers: {
    Authorization: process.env.NEXT_PUBLIC_FICTIONEERS_VISIBLE_API_KEY
  },
});

export { authAxiosInstance }
