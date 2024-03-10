import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const newsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt - b.createdAt
});

const initialState = newsAdapter.getInitialState();

export const newsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNewsComments: builder.query({
            query: ({ feedId }) => ({
                url: `/news/${feedId}/comments`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "NComment", id: "LIST" },
                        ...result.ids.map(id => ({ type: "NComment", id }))
                    ];
                } else return [{ type: "NComment", id: "LIST" }];
            }
        }),
        addNewNewsComment: builder.mutation({
            query: ({ feedId, ...comment }) => ({
                url: `/news/${feedId}/comments`,
                method: "POST",
                body: comment,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "NComment", id: "LIST" }]
        }),
        updateNewsComment: builder.mutation({
            query: ({ feedId, commentId, ...comment }) => ({
                url: `/news/${feedId}/comments/${commentId}`,
                method: "PATCH",
                body: comment,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "NComment", id: arg.id }
            ]
        }),
        deleteNewsComment: builder.mutation({
            query: ({ feedId, commentId }) => ({
                url: `/news/${feedId}/comments/${commentId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "NComment", id: arg.id }
            ]
        }),

        getNews: builder.query({
            query: () => ({
                url: "/news",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "News", id: "LIST" },
                        ...result.ids.map(id => ({ type: "News", id }))
                    ];
                } else return [{ type: "News", id: "LIST" }];
            }
        }),
        addNewNews: builder.mutation({
            query: value => ({
                url: "/news",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "News", id: "LIST" }]
        }),
        updateNews: builder.mutation({
            query: value => ({
                url: `/news/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "News", id: arg.id }
            ]
        }),
        deleteNews: builder.mutation({
            query: ({feedId}) => ({
                url: `/news/${feedId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "News", id: arg.id }
            ]
        }),

        getNewsReactions: builder.query({
            query: ({ feedId }) => ({
                url: `/news/${feedId}/reactions`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "NReaction", id: "LIST" },
                        ...result.ids.map(id => ({ type: "NReaction", id }))
                    ];
                } else return [{ type: "NReaction", id: "LIST" }];
            }
        }),
        addNewNewsReaction: builder.mutation({
            query: ({ feedId, ...reaction }) => ({
                url: `/news/${feedId}/reactions`,
                method: "POST",
                body: reaction,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "NReaction", id: "LIST" }]
        }),
        updateNewsReaction: builder.mutation({
            query: ({ feedId, reactionId, ...reaction }) => ({
                url: `/news/${feedId}/reactions/${reactionId}`,
                method: "PATCH",
                body: reaction,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "NReaction", id: arg.id }
            ]
        }),
        deleteNewsReaction: builder.mutation({
            query: ({ feedId, reactionId }) => ({
                url: `/news/${feedId}/reactions/${reactionId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "NReaction", id: arg.id }
            ]
        })
    })
});

export const {
    useGetNewsCommentsQuery,
    useAddNewNewsCommentMutation,
    useUpdateNewsCommentMutation,
    useDeleteNewsCommentMutation,
    useGetNewsQuery,
    useAddNewNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
    useGetNewsReactionsQuery,
    useAddNewNewsReactionMutation,
    useUpdateNewsReactionMutation,
    useDeleteNewsReactionMutation
} = newsApiSlice;

// returns the query result object
export const selectNewsResult = newsApiSlice.endpoints.getNews.select();

// creates memoized selector
const selectNewsData = createSelector(
    selectNewsResult,
    newsResult => newsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNews,
    selectById: selectNewsById,
    selectIds: selectNewsIds
    // Pass in a selector that returns the news slice of state
} = newsAdapter.getSelectors(state => selectNewsData(state) ?? initialState);
