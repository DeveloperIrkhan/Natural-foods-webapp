import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const AuthAPI = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth"
  }),
  endpoints: (_builder) => ({
    signIn: _builder.mutation({
      query: (creds) => ({
        url: "/signin",
        method: "POST",
        body: creds
      })
    }),
    signUp: _builder.mutation({
      query: (creds) => ({
        url: "/signup",
        method: "POST",
        body: creds
      })
    })
  })
});

export const { useSignInMutation, useSignUpMutation } = AuthAPI;
