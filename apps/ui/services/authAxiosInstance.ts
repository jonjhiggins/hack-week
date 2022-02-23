import axios from "axios";

const authAxiosInstance = axios.create({
  headers: {
    Authorization: process.env.NEXT_PUBLIC_FICIONEERS_VISIBLE_API_KEY
  },
});

export { authAxiosInstance }
