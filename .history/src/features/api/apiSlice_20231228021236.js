import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    tagTypes: ["Videos", "Video", "RelatedVideo"], //1
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => "/videos",
            keepUnusedDataFor: 600, //refetch data after 10 minute
            providesTags: ["Videos"],//provide na korle toh bujhbe nah konta invalid korte hobe ????
        }),
        getVideo: builder.query({
            query: (videoId) => `/videos/${videoId}`,
            providesTags: (result, error, arg) => [{ type: "Video", id: arg }]
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
            invalidatesTags: ["Videos"],
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                "videos",
                { type: "Video", id: arg.id },
                { type: "RelatedVideos", id: arg.id },
            ]
        }),
    })
})
export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation, useEditVideoMutation } = apiSlice;