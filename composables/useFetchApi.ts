import axios from "axios";
import { useStorage } from "@vueuse/core";

export const useFetchApi = async (options: {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  body?: any;
  params?: any;
}) => {
  // Composable
  const router = useRouter();
  const token = useStorage("token", "");

  // Data
  const baseUrl = "http://127.0.0.1:8000/api";

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  let data = null;
  let error = null;

  try {
    const apiResponse = await axios({
      headers: headers,
      method: options.method ?? "GET",
      url: baseUrl + options.url,
      data: options.body,
      params: options.params,
    });

    data = apiResponse.data;
  } catch (e: any) {
    error = {
      message: e.response.data.message,
      code: e.response.status,
    };
  }

  return { data, error };
};
