import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../services/usersApi";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    deleteUser: (state, action) => {
      const id = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
    addUser: (state, action) => {
      const newUser = action.payload;
      const users = state.users;
      users.push({
        id: state.users.length + 1,
        ...newUser,
      });
      state.users = users;
    },
    editUser: (state, action) => {
      const updateUser = action.payload;
      const { id } = updateUser;
      state.users = state.users.map((user) => {
        if (user.id === id) {
          return Object.assign(user, updateUser);
        } else {
          return user;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.getUsers.matchFulfilled,
      (state, action) => {
        const results = action.payload.results;
        const usersWithRelevantValues = results.map((user) => {
          const { title, first, last } = user.name;
          const { email } = user;
          const { medium } = user.picture;
          const { city, country } = user.location;
          const { name, number } = user.location.street;
          const { uuid } = user.login;
          return {
            nameTitle: title,
            firstName: first,
            lastName: last,
            email,
            userImage: medium,
            city,
            country,
            streetName: name,
            streetNumber: number,
            id: uuid,
          };
        });

        state.users = usersWithRelevantValues;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { addUser, deleteUser, editUser } = usersSlice.actions;

export default usersSlice.reducer;
