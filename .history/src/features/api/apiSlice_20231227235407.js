import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    tagTypes: ["Videos"], //1
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
            keepUnusedDataFor: 600, //refetch data after 10 minute
            providesTags: ["Videos"],//2
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
        addVideo: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Videos"],//3
        }),
    })
})
export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation } = apiSlice;