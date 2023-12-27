import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
            keepUnusedDataFor: 600, //refetch data after 10 minute
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`
        }),

        //?title_like=css&title_like=tailwind&_limit=4
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                const tags = title.split(" ");
                const likes = tags.map((tag) => `title_like=${tag}`)
                const queryString = `/videos?${likes.join("&")}&id_ne=${id}&_limit=4`;
                return queryString;
            }
        }),
        postVideo: builder.query({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data,
            })
        }),
    })
})
export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery } = apiSlice;