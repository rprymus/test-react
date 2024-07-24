import axios from "axios";
import type { Person, Film, PeopleResponse } from "./types";

const API_BASE_URL = "https://swapi.dev/api";

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchPeople = async ({
  url,
  onSuccess,
  onError = () => {},
}: {
  url?: string;
  onSuccess: (response: PeopleResponse) => void;
  onError?: (error: string) => void;
}) => {
  try {
    const response = await apiService.get(url || "/people");

    onSuccess(response.data as PeopleResponse);
  } catch (error: any) {
    onError(error.message);
    throw error;
  }
};

export const fetchPerson = async ({
  id,
  onSuccess,
  onError = () => {},
}: {
  id: number;
  onSuccess: (person: Person) => void;
  onError?: (error: string) => void;
}) => {
  try {
    const response = await apiService.get(`/people/${id}`);

    onSuccess(response.data as Person);
  } catch (error: any) {
    onError(error.message);
    throw error;
  }
};

export const fetchFilm = async ({
  id,
  onSuccess,
  onError = () => {},
}: {
  id: number;
  onSuccess: (film: Film) => void;
  onError?: (error: string) => void;
}) => {
  try {
    const response = await apiService.get(`/films/${id}`);

    onSuccess(response.data as Film);
  } catch (error: any) {
    onError(error.message);
    throw error;
  }
};
