import { GOOGLE_AUTH_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    verifyOTP: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/verifyOTP`,
        method: "POST",
        body: data,
      }),
    }),
    resendOTPVerificationCode: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resendOTPVerifcationCode`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/auth/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      keepUnusedDataFor: 5,
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resetPassword`,
        method: "PUT",
        body: data,
      }),
    }),
    remindUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/remind`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: USERS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      providesTags: ["Users"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    loginGoogleAuth: builder.mutation({
      query: (data) => ({
        url: `${GOOGLE_AUTH_URL}/google`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    // getGoogleSuccessUser: builder.query({
    //   query: () => ({
    //     url: "/auth/google/success",
    //     credentials: "include",
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyOTPMutation,
  useResendOTPVerificationCodeMutation,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
  useResetPasswordMutation,
  useRemindUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useLoginGoogleAuthMutation,
  // useGetGoogleSuccessUserQuery,
} = usersApiSlice;
