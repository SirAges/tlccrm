import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const visionsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = visionsAdapter.getInitialState();

export const visionsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getVisions: builder.query({
            query: () => ({
                url: "/visions",
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
                url: "/visions",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Branch", id: "LIST" }]
        }),
        updateBranch: builder.mutation({
            query: value => ({
                url: "/visions/" + value._id,
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
                url: "/visions/" + id,
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
    useGetVisionsQuery,
    useAddNewBranchMutation,
    useUpdateBranchMutation,
    useDeleteBranchMutation
} = visionsApiSlice;

// returns the query result object
export const selectVisionsResult =
    visionsApiSlice.endpoints.getVisions.select();

// creates memoized selector
const selectVisionsData = createSelector(
    selectVisionsResult,
    visionsResult => visionsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllVisions,
    selectById: selectBranchById,
    selectIds: selectBranchIds
    // Pass in a selector that returns the visions slice of state
} = visionsAdapter.getSelectors(
    state => selectVisionsData(state) ?? initialState
);
