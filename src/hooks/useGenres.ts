import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { AxiosError, CanceledError } from "axios";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const result = await apiClient.get<FetchGenresResponse>("/games", {
          signal: controller.signal,
        });
        setGenres(result.data.results);
        setLoading(false);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
        setLoading(false);
      }
    };
    fetchGenres();
    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
