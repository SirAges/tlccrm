import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const givesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = givesAdapter.getInitialState();

export const givesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getGives: builder.query({
            query: () => ({
                url: "/gives",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Give", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Give", id }))
                    ];
                } else return [{ type: "Give", id: "LIST" }];
            }
        }),
        addNewGive: builder.mutation({
            query: value => ({
                url: "/gives",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Give", id: "LIST" }]
        }),
        updateGive: builder.mutation({
            query: value => ({
                url: "/gives/" + value._id,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Give", id: arg.id }
            ]
        }),
        deleteGive: builder.mutation({
            query: id => ({
                url: "/gives/" + id,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Give", id: arg.id }
            ]
        })
    })
});

export const {
    useGetGivesQuery,
    useAddNewGiveMutation,
    useUpdateGiveMutation,
    useDeleteGiveMutation
} = givesApiSlice;

// returns the query result object
export const selectGivesResult =
    givesApiSlice.endpoints.getGives.select();

// creates memoized selector
const selectGivesData = createSelector(
    selectGivesResult,
    givesResult => givesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllGives,
    selectById: selectGiveById,
    selectIds: selectGiveIds
    // Pass in a selector that returns the gives slice of state
} = givesAdapter.getSelectors(
    state => selectGivesData(state) ?? initialState
);
