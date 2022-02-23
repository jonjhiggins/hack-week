import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`
  },
});

export { axiosInstance }
