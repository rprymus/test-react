import { createAppSlice } from "@/lib/createAppSlice";
import { fetchPeople as fetch } from "@/lib/api";
import type { Person } from "@/lib/types";

export interface PeopleSliceState {
  value: Person[];
  status: "idle" | "loading" | "failed";
}

const initialState: PeopleSliceState = {
  value: [],
  status: "idle",
};

export const peopleSlice = createAppSlice({
  name: "people",
  initialState,
  reducers: (create) => ({
    fetchPeople: create.asyncThunk(
      async () => {
        const response = await fetch();

        return response.results;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.value = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    collection: (people) => people.value,
    status: (people) => people.status,
  },
});

export const { fetchPeople } = peopleSlice.actions;
export const { collection, status } = peopleSlice.selectors;
