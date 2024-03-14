import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const servicesAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = servicesAdapter.getInitialState();

export const servicesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getServices: builder.query({
            query: () => ({
                url: "/services",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Service", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Service", id }))
                    ];
                } else return [{ type: "Service", id: "LIST" }];
            }
        }),
        addNewService: builder.mutation({
            query: value => ({
                url: "/services",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Service", id: "LIST" }]
        }),
        updateService: builder.mutation({
            query: value => ({
                url: "/services/" + value._id,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Service", id: arg.id }
            ]
        }),
        deleteService: builder.mutation({
            query: id => ({
                url: "/services/" + id,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Service", id: arg.id }
            ]
        })
    })
});

export const {
    useGetServicesQuery,
    useAddNewServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation
} = servicesApiSlice;

// returns the query result object
export const selectServicesResult =
    servicesApiSlice.endpoints.getServices.select();

// creates memoized selector
const selectServicesData = createSelector(
    selectServicesResult,
    servicesResult => servicesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllServices,
    selectById: selectServiceById,
    selectIds: selectServiceIds
    // Pass in a selector that returns the services slice of state
} = servicesAdapter.getSelectors(
    state => selectServicesData(state) ?? initialState
);
