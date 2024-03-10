import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const testimoniesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt - b.createdAt
});

const initialState = testimoniesAdapter.getInitialState();

export const testimoniesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTestimonyComments: builder.query({
            query: ({ feedId }) => ({
                url: `/testimonies/${feedId}/comments`,
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
        addNewTestimonyComment: builder.mutation({
            query: ({ feedId, ...comment }) => ({
                url: `/testimonies/${feedId}/comments`,
                method: "POST",
                body: comment,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "SComment", id: "LIST" }]
        }),
        updateTestimonyComment: builder.mutation({
            query: ({ feedId, commentId, ...comment }) => ({
                url: `/testimonies/${feedId}/comments/${commentId}`,
                method: "PATCH",
                body: comment,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "SComment", id: arg.id }
            ]
        }),
        deleteTestimonyComment: builder.mutation({
            query: ({ feedId, commentId }) => ({
                url: `/testimonies/${feedId}/comments/${commentId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "SComment", id: arg.id }
            ]
        }),

        getTestimonies: builder.query({
            query: () => ({
                url: "/testimonies",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Testimony", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Testimony", id }))
                    ];
                } else return [{ type: "Testimony", id: "LIST" }];
            }
        }),
        addNewTestimony: builder.mutation({
            query: value => ({
                url: "/testimonies",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Testimony", id: "LIST" }]
        }),
        updateTestimony: builder.mutation({
            query: value => ({
                url: `/testimonies/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Testimony", id: arg.id }
            ]
        }),
        deleteTestimony: builder.mutation({
            query: ({feedId}) => ({
                url: `/testimonies/${feedId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Testimony", id: arg.id }
            ]
        }),

        getTestimonyReactions: builder.query({
            query: ({ feedId }) => ({
                url: `/testimonies/${feedId}/reactions`,
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
        addNewTestimonyReaction: builder.mutation({
            query: ({ feedId, ...reaction }) => ({
                url: `/testimonies/${feedId}/reactions`,
                method: "POST",
                body: reaction,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "SReaction", id: "LIST" }]
        }),
        updateTestimonyReaction: builder.mutation({
            query: ({ feedId, reactionId, ...reaction }) => ({
                url: `/testimonies/${feedId}/reactions/${reactionId}`,
                method: "PATCH",
                body: reaction,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "SReaction", id: arg.id }
            ]
        }),
        deleteTestimonyReaction: builder.mutation({
            query: ({ feedId, reactionId }) => ({
                url: `/testimonies/${feedId}/reactions/${reactionId}`,
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
    useGetTestimonyCommentsQuery,
    useAddNewTestimonyCommentMutation,
    useUpdateTestimonyCommentMutation,
    useDeleteTestimonyCommentMutation,
    useGetTestimoniesQuery,
    useAddNewTestimonyMutation,
    useUpdateTestimonyMutation,
    useDeleteTestimonyMutation,
    useGetTestimonyReactionsQuery,
    useAddNewTestimonyReactionMutation,
    useUpdateTestimonyReactionMutation,
    useDeleteTestimonyReactionMutation
} = testimoniesApiSlice;

// returns the query result object
export const selectTestimonyResult = testimoniesApiSlice.endpoints.getTestimonies.select();

// creates memoized selector
const selectTestimonyData = createSelector(
    selectTestimonyResult,
    testimoniesResult => testimoniesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTestimony,
    selectById: selectTestimonyById,
    selectIds: selectTestimonyIds
    // Pass in a selector that returns the testimonies slice of state
} = testimoniesAdapter.getSelectors(
    state => selectTestimonyData(state) ?? initialState
);
