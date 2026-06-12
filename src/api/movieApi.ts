import axios from "axios";
import type { MovieItem } from "../types/movie";

const api = axios.create({
  baseURL: "https://api.sampleapis.com/movies",
  timeout: 10000,
});

export const fetchMoviesByCategory = async (category: string): Promise<MovieItem[]> => {
  const response = await api.get<MovieItem[]>(`/${category}`);
  return response.data;
};
