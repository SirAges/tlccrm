import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const branchesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = branchesAdapter.getInitialState();

export const branchesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBranchs: builder.query({
            query: () => ({
                url: "/branches",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Branch", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Branch", id }))
                    ];
                } else return [{ type: "Branch", id: "LIST" }];
            }
        }),
        addNewBranch: builder.mutation({
            query: value => ({
                url: "/branches",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Branch", id: "LIST" }]
        }),
        updateBranch: builder.mutation({
            query: value => ({
                url: "/branches/" + value._id,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Branch", id: arg.id }
            ]
        }),
        deleteBranch: builder.mutation({
            query: id => ({
                url: "/branches/" + id,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Branch", id: arg.id }
            ]
        })
    })
});

export const {
    useGetBranchsQuery,
    useAddNewBranchMutation,
    useUpdateBranchMutation,
    useDeleteBranchMutation
} = branchesApiSlice;

// returns the query result object
export const selectBranchsResult =
    branchesApiSlice.endpoints.getBranchs.select();

// creates memoized selector
const selectBranchsData = createSelector(
    selectBranchsResult,
    branchesResult => branchesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllBranchs,
    selectById: selectBranchById,
    selectIds: selectBranchIds
    // Pass in a selector that returns the branches slice of state
} = branchesAdapter.getSelectors(
    state => selectBranchsData(state) ?? initialState
);
