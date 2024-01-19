import axios from "axios";
let refresh = false;
import { vm } from "@/main";

axios.defaults.baseURL = "https://husanu.ltct.ro/api/v1";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (
      error.config.url === "/auth/login" ||
      error.config.url === "/auth/updateMyPassword"
    ) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !refresh) {
      const token = localStorage.getItem("token");
      refresh = true;
      const { status, data } = await axios.patch(
        "/auth/refreshToken",
        { refreshToken: localStorage.getItem("refresh_token") },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (status === 200) {
        console.log(data);
        localStorage.setItem("token", data.data.accessToken);
        localStorage.setItem("refresh_token", data.data.refreshToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
        return axios(error.config);
      } else {
        vm.$store.dispatch("fetchLogout");
        vm.$store.dispatch("spawnNotification", {
          type: "danger",
          message: "Something went wrong. Please log in again.",
          action1: { label: "OK" },
          hasNoTimeout: true,
        });
      }
    }
    refresh = false;
    if (error.config.url === "/auth/refreshToken") {
      return error;
    } else {
      return Promise.reject(error);
    }
  }
);
