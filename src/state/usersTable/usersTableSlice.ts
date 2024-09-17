import { Filters, Header, User } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../api";

export interface UsersTableState {
  filters: Filters;
  users: User[];
  fetchedUsers: User[];
}

type ActionFilter = {
  payload: {
    property: Header;
    value: string;
  };
};

const filters: Filters = {
  name: "",
  username: "",
  email: "",
  phone: "",
};

const initialState: UsersTableState = {
  filters,
  users: [],
  fetchedUsers: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateFilter: (state, { payload }: ActionFilter) => {
      state.filters[payload.property] = payload.value;
    },
    clearFilters: (state) => {
      state.filters = filters;
    },
    filter: (state) => {
      state.users = state.fetchedUsers;
      for (const [key, value] of Object.entries(state.filters))
        state.users = state.users.filter((user) => {
          return (
            user[key as Header].toLowerCase().startsWith(value.toLowerCase()) ||
            (key === "phone" &&
              user[key as Header]
                .replace(/\D/g, "")
                .startsWith(value.toLowerCase()))
          );
        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialData.fulfilled, (state, { payload }) => {
      state.fetchedUsers = [...payload];
      state.users = [...payload];
    });
  },
});

export const getInitialData = createAsyncThunk(
  "users/getInitialData",
  async () => {
    return await getUsers();
  }
);

export const { updateFilter, filter, clearFilters } = usersSlice.actions;

export default usersSlice.reducer;
