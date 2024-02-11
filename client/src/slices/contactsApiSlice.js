import { apiSlice } from "./apiSlice";
import { CONTACTS_URL } from "../constants";

export const contactsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ pageNumber }) => ({
        url: CONTACTS_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Contacts"],
      keepUnusedDataFor: 5,
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: CONTACTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `${CONTACTS_URL}/${contactId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
} = contactsApiSlice;
