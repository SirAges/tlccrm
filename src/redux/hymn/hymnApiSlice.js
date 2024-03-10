import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const hymnsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = hymnsAdapter.getInitialState();

export const hymnsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getHymns: builder.query({
            query: () => ({
                url: "/hymns",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Hymn", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Hymn", id }))
                    ];
                } else return [{ type: "Hymn", id: "LIST" }];
            }
        }),
        addNewHymn: builder.mutation({
            query: value => ({
                url: "/hymns",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Hymn", id: "LIST" }]
        }),
        updateHymn: builder.mutation({
            query: value => ({
                url: "/hymns/" + value._id,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Hymn", id: arg.id }
            ]
        }),
        deleteHymn: builder.mutation({
            query: id => ({
                url: "/hymns/" + id,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Hymn", id: arg.id }
            ]
        })
    })
});

export const {
    useGetHymnsQuery,
    useAddNewHymnMutation,
    useUpdateHymnMutation,
    useDeleteHymnMutation
} = hymnsApiSlice;

// returns the query result object
export const selectHymnsResult =
    hymnsApiSlice.endpoints.getHymns.select();

// creates memoized selector
const selectHymnsData = createSelector(
    selectHymnsResult,
    hymnsResult => hymnsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllHymns,
    selectById: selectHymnById,
    selectIds: selectHymnIds
    // Pass in a selector that returns the hymns slice of state
} = hymnsAdapter.getSelectors(
    state => selectHymnsData(state) ?? initialState
);
