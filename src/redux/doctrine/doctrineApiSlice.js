import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const doctrinesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = doctrinesAdapter.getInitialState();

export const doctrinesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDoctrines: builder.query({
            query: () => ({
                url: "/doctrines",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Doctrine", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Doctrine", id }))
                    ];
                } else return [{ type: "Doctrine", id: "LIST" }];
            }
        }),
        addNewDoctrine: builder.mutation({
            query: value => ({
                url: "/doctrines",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Doctrine", id: "LIST" }]
        }),
        updateDoctrine: builder.mutation({
            query: value => ({
                url: "/doctrines/" + value._id,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Doctrine", id: arg.id }
            ]
        }),
        deleteDoctrine: builder.mutation({
            query: id => ({
                url: "/doctrines/" + id,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Doctrine", id: arg.id }
            ]
        })
    })
});

export const {
    useGetDoctrinesQuery,
    useAddNewDoctrineMutation,
    useUpdateDoctrineMutation,
    useDeleteDoctrineMutation
} = doctrinesApiSlice;

// returns the query result object
export const selectDoctrinesResult =
    doctrinesApiSlice.endpoints.getDoctrines.select();

// creates memoized selector
const selectDoctrinesData = createSelector(
    selectDoctrinesResult,
    doctrinesResult => doctrinesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDoctrines,
    selectById: selectDoctrineById,
    selectIds: selectDoctrineIds
    // Pass in a selector that returns the doctrines slice of state
} = doctrinesAdapter.getSelectors(
    state => selectDoctrinesData(state) ?? initialState
);
