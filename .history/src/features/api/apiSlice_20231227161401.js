import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`
        }),
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                const tags = title.split(" ")
            }
        })
    })
})
export const { useGetVideosQuery, useGetVideoQuery } = apiSlice;