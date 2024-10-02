import axios from "axios";
import { accessToken, BaseUrl } from "../assets/constant";

const instance = () => {
  const token = localStorage.getItem(accessToken);
  return axios.create({
    baseURL: BaseUrl,
    headers: { Authorization: `Bearer ${token}` },
  });
};
export { instance };
