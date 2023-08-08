import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJubyI6IjAwNjk4NTE0Iiwid2ViX2lkIjoidGVzdDEiLCJ3aXRoX2lkIjoiaXdkNDM1OTkwIiwidXNlcl9ubyI6IjI2MDYwIiwiaWF0IjoxNjg5OTE5ODcyLCJleHAiOjE3Njg5NzU4NzJ9.Itbt0MuAP3if-y1omE63blIxzwA0SRh8fIxi_yed5Cs";
const baseUrl = "http://127.0.0.1:4444/api/v1";

export const requestAPI = createApi({
  reducerPath: "requestAPI",
  tagTypes: ["request"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRequest: builder.query({
      providesTags: ["request"],
      query: () => {
        return `/cscenter/myRequestList?sort=reg_date`;
      },
      transformResponse: (rawResult) => {
        return rawResult as any[];
      },
    }),
    deleteRequest: builder.mutation({
      query: ({ cmt_no }: { cmt_no: string }) => {
        return {
          url: `/cscenter/request/delete`,
          body: { cmt_no },
          method: "POST",
        };
      },
      async onQueryStarted(body, { dispatch }) {
        const patchCollection = dispatch(
          requestAPI.util.updateQueryData("getRequest", null, (draft) => {
            return draft.filter(
              (f: any) => String(f.no) !== String(body.cmt_no)
            );
          })
        );
        patchCollection.patches;
      },
      invalidatesTags: (result, error, { cmt_no }) => [
        { type: "request", no: cmt_no },
      ],
    }),
  }),
});

export const { useGetRequestQuery, useDeleteRequestMutation } = requestAPI;
export const getRequestMutate = (currentFn: (value: any) => void) => {
  return requestAPI.util.updateQueryData("getRequest", null, (draft) => {
    return currentFn(draft);
  });
};
