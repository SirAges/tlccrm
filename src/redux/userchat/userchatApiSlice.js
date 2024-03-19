import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userchatsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt - b.createdAt
});

const initialState = userchatsAdapter.getInitialState();

export const userchatsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getChatMessages: builder.query({
            query: userchatId => ({
                url: `/userchats/${userchatId}/messages`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "UCMessage", id: "LIST" },
                        ...result.ids.map(id => ({ type: "UCMessage", id }))
                    ];
                } else return [{ type: "UCMessage", id: "LIST" }];
            }
        }),
        addNewChatMessage: builder.mutation({
            query: ({ userchatId, ...value }) => ({
                url: `/userchats/${userchatId}/messages`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "UCMessage", id: "LIST" }]
        }),
        updateChatMessage: builder.mutation({
            query: ({ userchatId, value }) => ({
                url: `/userchats/${userchatId}/messages/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "UCMessage", id: arg.id }
            ]
        }),
        deleteChatMessage: builder.mutation({
            query: ({ chatId, messageId }) => ({
                url: `/userchats/${chatId}/messages/${messageId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "UCMessage", id: arg.id }
            ]
        }),

        getUserchats: builder.query({
            query: () => ({
                url: "/userchats",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Userchat", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Userchat", id }))
                    ];
                } else return [{ type: "Userchat", id: "LIST" }];
            }
        }),
        addNewUserchat: builder.mutation({
            query: value => ({
                url: "/userchats",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Userchat", id: "LIST" }]
        }),
        updateUserchat: builder.mutation({
            query: value => ({
                url: `/userchats/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Userchat", id: arg.id }
            ]
        }),
        deleteUserchat: builder.mutation({
            query: userchatId => ({
                url: `/userchats/${userchatId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Userchat", id: arg.id }
            ]
        })
    })
});

export const {
    useGetChatMessagesQuery,
    useAddNewChatMessageMutation,
    useUpdateChatMessageMutation,
    useDeleteChatMessageMutation,
    useGetUserchatsQuery,
    useAddNewUserchatMutation,
    useUpdateUserchatMutation,
    useDeleteUserchatMutation
} = userchatsApiSlice;

// returns the query result object
export const selectUserchatsResult =
    userchatsApiSlice.endpoints.getUserchats.select();

// creates memoized selector
const selectUserchatsData = createSelector(
    selectUserchatsResult,
    userchatsResult => userchatsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUserchats,
    selectById: selectUserchatById,
    selectIds: selectUserchatIds
    // Pass in a selector that returns the userchats slice of state
} = userchatsAdapter.getSelectors(
    state => selectUserchatsData(state) ?? initialState
);
