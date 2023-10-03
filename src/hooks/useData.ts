import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { AxiosError, AxiosRequestConfig, CanceledError } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await apiClient.get<FetchResponse<T>>(endpoint, {
            signal: controller.signal,
            ...requestConfig,
          });
          setData(result.data.results);
          setLoading(false);
        } catch (error) {
          if (error instanceof CanceledError) return;
          setError((error as AxiosError).message);
          setLoading(false);
        }
      };
      fetchData();
      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
