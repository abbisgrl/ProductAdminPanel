import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8001' }),
  reducerPath: 'adminApi',
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    // Add Login endpoint
    login: build.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Add Signup endpoint
    signup: build.mutation({
      query: (userInfo) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userInfo,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const {
  useLoginMutation, // Add login mutation hook
  useSignupMutation,
} = api
