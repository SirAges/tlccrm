import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const sermonsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt - b.createdAt
});

const initialState = sermonsAdapter.getInitialState();

export const sermonsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSermonComments: builder.query({
            query: ({ feedId }) => ({
                url: `/sermons/${feedId}/comments`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "SComment", id: "LIST" },
                        ...result.ids.map(id => ({ type: "SComment", id }))
                    ];
                } else return [{ type: "SComment", id: "LIST" }];
            }
        }),
        addNewSermonComment: builder.mutation({
            query: ({ feedId, ...comment }) => ({
                url: `/sermons/${feedId}/comments`,
                method: "POST",
                body: comment,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "SComment", id: "LIST" }]
        }),
        updateSermonComment: builder.mutation({
            query: ({ feedId, commentId, ...comment }) => ({
                url: `/sermons/${feedId}/comments/${commentId}`,
                method: "PATCH",
                body: comment,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "SComment", id: arg.id }
            ]
        }),
        deleteSermonComment: builder.mutation({
            query: ({ feedId, commentId }) => ({
                url: `/sermons/${feedId}/comments/${commentId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "SComment", id: arg.id }
            ]
        }),

        getSermons: builder.query({
            query: () => ({
                url: "/sermons",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Sermon", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Sermon", id }))
                    ];
                } else return [{ type: "Sermon", id: "LIST" }];
            }
        }),
        addNewSermon: builder.mutation({
            query: value => ({
                url: "/sermons",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Sermon", id: "LIST" }]
        }),
        updateSermon: builder.mutation({
            query: value => ({
                url: `/sermons/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Sermon", id: arg.id }
            ]
        }),
        deleteSermon: builder.mutation({
            query: ({feedId}) => ({
                url: `/sermons/${feedId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Sermon", id: arg.id }
            ]
        }),

        getSermonReactions: builder.query({
            query: ({ feedId }) => ({
                url: `/sermons/${feedId}/reactions`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "SReaction", id: "LIST" },
                        ...result.ids.map(id => ({ type: "SReaction", id }))
                    ];
                } else return [{ type: "SReaction", id: "LIST" }];
            }
        }),
        addNewSermonReaction: builder.mutation({
            query: ({ feedId, ...reaction }) => ({
                url: `/sermons/${feedId}/reactions`,
                method: "POST",
                body: reaction,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "SReaction", id: "LIST" }]
        }),
        updateSermonReaction: builder.mutation({
            query: ({ feedId, reactionId, ...reaction }) => ({
                url: `/sermons/${feedId}/reactions/${reactionId}`,
                method: "PATCH",
                body: reaction,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "SReaction", id: arg.id }
            ]
        }),
        deleteSermonReaction: builder.mutation({
            query: ({ feedId, reactionId }) => ({
                url: `/sermons/${feedId}/reactions/${reactionId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "SReaction", id: arg.id }
            ]
        })
    })
});

export const {
    useGetSermonCommentsQuery,
    useAddNewSermonCommentMutation,
    useUpdateSermonCommentMutation,
    useDeleteSermonCommentMutation,
    useGetSermonsQuery,
    useAddNewSermonMutation,
    useUpdateSermonMutation,
    useDeleteSermonMutation,
    useGetSermonReactionsQuery,
    useAddNewSermonReactionMutation,
    useUpdateSermonReactionMutation,
    useDeleteSermonReactionMutation
} = sermonsApiSlice;

// returns the query result object
export const selectSermonResult = sermonsApiSlice.endpoints.getSermons.select();

// creates memoized selector
const selectSermonData = createSelector(
    selectSermonResult,
    sermonsResult => sermonsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllSermon,
    selectById: selectSermonById,
    selectIds: selectSermonIds
    // Pass in a selector that returns the sermons slice of state
} = sermonsAdapter.getSelectors(
    state => selectSermonData(state) ?? initialState
);
