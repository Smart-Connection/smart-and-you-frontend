import axios from "axios";
import { Error } from "~/types/api/Global";

export const useFetchApi = async <T>(options: {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PUT";
  body?: any;
  params?: any;
}): Promise<{ data: T | null; error: Error | null }> => {
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
    const error = null;

    return { data, error };
  } catch (e: any) {
    const data = null;
    const error: Error = {
      message: e.response.data.message,
      code: e.response.status,
    };

    return { data, error };
  }
};
