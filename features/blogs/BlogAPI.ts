import { IBlog } from "@/interfaces/product.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IAPIResponse {
  blogs: IBlog[];
  blog: IBlog;
}

export const BlogAPI = createApi({
  reducerPath: "blogAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api"
  }),
  endpoints: (builder) => ({
    postBlogs: builder.mutation({
      query: (blogs: FormData) => ({
        url: "/blogs",
        method: "POST",
        body: blogs
      })
    }),
    getBlogs: builder.query<IAPIResponse, void>({
      query: () => ({
        url: "/blogs",
        method: "GET"
      })
    }),
    getBlogById: builder.query<IAPIResponse, string>({
      query: (slug) => ({
        url: `/blogs/${slug}`,
        method: "GET"
      })
    })
  })
});

export const { usePostBlogsMutation, useGetBlogsQuery, useGetBlogByIdQuery } =
  BlogAPI;
