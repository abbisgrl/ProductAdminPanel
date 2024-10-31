import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://product-adminpanel.vercel.app',
  }),
  reducerPath: 'adminApi',
  tagTypes: [
    'Auth',
    'User',
    'Products',
    'Customers',
    'Transactions',
    'Geographic',
    'TotalStats',
    'Dashboard',
    'Management',
  ],
  endpoints: (build) => ({
    // Add auth endpoint
    login: build.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      providesTags: ['Auth'],
    }),

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
      query: (searchText = '') => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/client/productList',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
          params: { searchText },
        }
      },
      providesTags: ['Products'],
    }),

    addProduct: build.mutation({
      query: (productInfo) => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/client/addProduct',
          method: 'POST',
          body: productInfo,
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['Products'],
    }),

    // Add customers api endpoint
    getCustomerList: build.query({
      query: (searchText = '') => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/client/customerList',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
          params: { searchText },
        }
      },
      providesTags: ['Customers'],
    }),

    addCustomer: build.mutation({
      query: (customerInfo) => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/client/addCustomer',
          method: 'POST',
          body: customerInfo,
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['Customer'],
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

    addTransaction: build.mutation({
      query: (transactionInfo) => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/client/addTransaction',
          method: 'POST',
          body: transactionInfo,
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['Transaction'],
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

    // Add sales api endpoint
    getTotalStats: build.query({
      query: () => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/sales/totalSales',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['TotalStats'],
    }),

    // Add dashboard api endpoint
    getDashboardData: build.query({
      query: () => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/general/dashboard',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['Dashboard'],
    }),

    // Add admin api endpoint
    getUsersList: build.query({
      query: () => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/management/users',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['Management'],
    }),

    updateUserDetails: build.mutation({
      query: ({ userDetails }) => {
        const token = localStorage.getItem('token') // Assuming token is stored in localStorage
        return {
          url: '/management/user/update',
          method: 'POST',
          body: userDetails,
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
          },
        }
      },
      providesTags: ['Management'],
    }),
  }),
})

export const {
  useLoginMutation, // Add login mutation hook
  useSignupMutation,
  useGetUserQuery,
  useGetProductsListQuery,
  useAddProductMutation,
  useGetCustomerListQuery,
  useAddCustomerMutation,
  useGetTransactionsListQuery,
  useAddTransactionMutation,
  useGetGeographyDataQuery,
  useGetTotalStatsQuery,
  useGetDashboardDataQuery,
  useGetUsersListQuery,
  useUpdateUserDetailsMutation,
} = api
