import axios from "axios";
import { LocalStorageKey } from "../constants/key";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.accessToken)}`,
  }
});