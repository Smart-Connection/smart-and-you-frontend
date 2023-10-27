import axios from "axios";
import { Pagination, Error } from "~/types/api/Global";

export const useFetchApi = async <T>(options: {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  body?: any;
  params?: any;
}) => {
  // Composable
  const config = useRuntimeConfig();
  const token = useCookie("token", {
    maxAge: parseInt(config.public.maxAuthCookieAge),
  });

  // Data
  const baseUrl = config.public.apiUrl;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.value}`,
  };

  try {
    const apiResponse = await axios({
      headers: headers,
      method: options.method ?? "GET",
      url: baseUrl + options.url,
      data: options.body,
      params: options.params,
    });

    const data = apiResponse.data;

    return data;
  } catch (e: any) {
    throw e;
  }
};
