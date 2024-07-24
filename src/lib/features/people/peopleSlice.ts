import { createAppSlice } from "@/lib/createAppSlice";

import { fetchPeople as fetch } from "@/lib/api";
import type { Person } from "@/lib/types";

export interface PeopleSliceState {
  value: Person[];
  status: "empty" | "idle" | "loading" | "failed";
}

const initialState: PeopleSliceState = {
  value: [],
  status: "empty",
};

export const peopleSlice = createAppSlice({
  name: "people",
  initialState,
  reducers: (create) => ({
    fetchPeople: create.asyncThunk(async () => {
      fetch({
        onSuccess: (data) => {
          return data;
        },
      });
    }),
  }),
  selectors: {
    collection: (people) => people.value,
    status: (people) => people.status,
  },
});

export const { fetchPeople } = peopleSlice.actions;
export const { collection, status } = peopleSlice.selectors;
