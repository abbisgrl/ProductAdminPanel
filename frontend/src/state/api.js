import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8001' }),
  reducerPath: 'adminApi',
  tagTypes: [
    'Auth',
    'User',
    'Products',
    'Customers',
    'Transactions',
    'Geographic',
  ],
  endpoints: (build) => ({
    // Add Login endpoint
    login: build.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      providesTags: ['Auth'],
    }),

    // Add Signup endpoint
    signup: build.mutation({
      query: (userInfo) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userInfo,
      }),
      providesTags: ['Auth'],
    }),

    // Add userdetails api endpoint
    getUser: build.query({
      query: () => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: 'general/user/details',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['User'],
    }),

    // Add products api endpoint
    getProductsList: build.query({
      query: () => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/client/productList',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['Products'],
    }),

    // Add customers api endpoint
    getCustomerList: build.query({
      query: () => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/client/customerList',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['Customers'],
    }),

    // Add transactions api endpoint
    getTransactionsList: build.query({
      query: ({ page, pageSize, sort, search }) => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/client/transactionsList',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
          params: { page, pageSize, sort, search },
        }
      },
      providesTags: ['Transactions'],
    }),

    // Add geographic api endpoint
    getGeographyData: build.query({
      query: () => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/client/geographicData',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['Geographic'],
    }),
  }),
})

export const {
  useLoginMutation, // Add login mutation hook
  useSignupMutation,
  useGetUserQuery,
  useGetProductsListQuery,
  useGetCustomerListQuery,
  useGetTransactionsListQuery,
  useGetGeographyDataQuery,
} = api
