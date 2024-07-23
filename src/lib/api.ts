import axios from "axios";
import type { Person } from "./types";

const API_BASE_URL = "https://swapi.dev/api";

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchPeople = async () => {
  try {
    const response = await apiService.get("/people");
    const data = response.data as { results: Person[] };
    console.log(response.data);

    return data;
  } catch (error) {
    throw error;
  }
};
