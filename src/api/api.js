import axios from "axios";
import { URL } from "./url";

const instance = axios.create({
  baseURL: `${URL}/api`,

  headers: {
    "content-type": "application/json; charset=utf-8",
  },
});

export const $api = async ({ url, type = "GET", auth = true, body }) => {
  if (auth) {
    const token = localStorage.getItem("token");
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  let data;

  try {
    switch (type) {
      case "GET":
      default:
        data = await instance.get(url);
        break;

      case "POST":
        data = await instance.post(url, body);
        break;

      case "PUT":
        data = await instance.put(url, body);
        break;

      case "DELETE":
        data = await instance.delete(url);
        break;
    }

    return data.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : error.message;
  }
};
