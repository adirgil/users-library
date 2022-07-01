import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://randomuser.me/api",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (amount) => `?results=${amount}`,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
