import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const announcementsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = announcementsAdapter.getInitialState();

export const announcementsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAnnouncements: builder.query({
            query: () => ({
                url: "/announcements",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Announcement", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Announcement", id }))
                    ];
                } else return [{ type: "Announcement", id: "LIST" }];
            }
        }),
        addNewAnnouncement: builder.mutation({
            query: value => ({
                url: "/announcements",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Announcement", id: "LIST" }]
        }),
        updateAnnouncement: builder.mutation({
            query: value => ({
                url: "/announcements/" + value._id,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Announcement", id: arg.id }
            ]
        }),
        deleteAnnouncement: builder.mutation({
            query: id => ({
                url: "/announcements/" + id,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Announcement", id: arg.id }
            ]
        })
    })
});

export const {
    useGetAnnouncementsQuery,
    useAddNewAnnouncementMutation,
    useUpdateAnnouncementMutation,
    useDeleteAnnouncementMutation
} = announcementsApiSlice;

// returns the query result object
export const selectAnnouncementsResult =
    announcementsApiSlice.endpoints.getAnnouncements.select();

// creates memoized selector
const selectAnnouncementsData = createSelector(
    selectAnnouncementsResult,
    announcementsResult => announcementsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAnnouncements,
    selectById: selectAnnouncementById,
    selectIds: selectAnnouncementIds
    // Pass in a selector that returns the announcements slice of state
} = announcementsAdapter.getSelectors(
    state => selectAnnouncementsData(state) ?? initialState
);
