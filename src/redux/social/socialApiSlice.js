import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const socialsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = socialsAdapter.getInitialState();

export const socialsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSocials: builder.query({
            query: () => ({
                url: "/socials",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Social", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Social", id }))
                    ];
                } else return [{ type: "Social", id: "LIST" }];
            }
        }),
        addNewSocial: builder.mutation({
            query: value => ({
                url: "/socials",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Social", id: "LIST" }]
        }),
        updateSocial: builder.mutation({
            query: value => ({
                url: "/socials/" + value._id,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Social", id: arg.id }
            ]
        }),
        deleteSocial: builder.mutation({
            query: id => ({
                url: "/socials/" + id,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Social", id: arg.id }
            ]
        })
    })
});

export const {
    useGetSocialsQuery,
    useAddNewSocialMutation,
    useUpdateSocialMutation,
    useDeleteSocialMutation
} = socialsApiSlice;

// returns the query result object
export const selectSocialsResult =
    socialsApiSlice.endpoints.getSocials.select();

// creates memoized selector
const selectSocialsData = createSelector(
    selectSocialsResult,
    socialsResult => socialsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllSocials,
    selectById: selectSocialById,
    selectIds: selectSocialIds
    // Pass in a selector that returns the socials slice of state
} = socialsAdapter.getSelectors(
    state => selectSocialsData(state) ?? initialState
);
