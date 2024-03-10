import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const devotionsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = devotionsAdapter.getInitialState();

export const devotionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDevotions: builder.query({
            query: () => ({
                url: "/devotions",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Devotion", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Devotion", id }))
                    ];
                } else return [{ type: "Devotion", id: "LIST" }];
            }
        }),
        addNewDevotion: builder.mutation({
            query: value => ({
                url: "/devotions",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Devotion", id: "LIST" }]
        }),
        updateDevotion: builder.mutation({
            query: value => ({
                url: "/devotions/" + value._id,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Devotion", id: arg.id }
            ]
        }),
        deleteDevotion: builder.mutation({
            query: id => ({
                url: "/devotions/" + id,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Devotion", id: arg.id }
            ]
        })
    })
});

export const {
    useGetDevotionsQuery,
    useAddNewDevotionMutation,
    useUpdateDevotionMutation,
    useDeleteDevotionMutation
} = devotionsApiSlice;

// returns the query result object
export const selectDevotionsResult =
    devotionsApiSlice.endpoints.getDevotions.select();

// creates memoized selector
const selectDevotionsData = createSelector(
    selectDevotionsResult,
    devotionsResult => devotionsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDevotions,
    selectById: selectDevotionById,
    selectIds: selectDevotionIds
    // Pass in a selector that returns the devotions slice of state
} = devotionsAdapter.getSelectors(
    state => selectDevotionsData(state) ?? initialState
);
