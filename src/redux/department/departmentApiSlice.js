import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const departmentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt - b.createdAt
});

const initialState = departmentsAdapter.getInitialState();

export const departmentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDeptAnnouncements: builder.query({
            query: minId => ({
                url: `/departments/${minId}/announcements`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "DAnnouncement", id: "LIST" },
                        ...result.ids.map(id => ({ type: "DAnnouncement", id }))
                    ];
                } else return [{ type: "DAnnouncement", id: "LIST" }];
            }
        }),
        addNewDeptAnnouncement: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/departments/${minId}/announcements`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DAnnouncement", id: "LIST" }]
        }),
        updateDeptAnnouncement: builder.mutation({
            query: ({ minId, value }) => ({
                url: `/departments/${minId}/announcements/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DAnnouncement", id: arg.id }
            ]
        }),
        deleteDeptAnnouncement: builder.mutation({
            query: ({ minId, announcementId }) => ({
                url: `/departments/${minId}/announcements/${announcementId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DAnnouncement", id: arg.id }
            ]
        }),

        getDeptAdmins: builder.query({
            query: minId => ({
                url: `/departments/${minId}/admins`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "DAdmin", id: "LIST" },
                        ...result.ids.map(id => ({ type: "DAdmin", id }))
                    ];
                } else return [{ type: "DAdmin", id: "LIST" }];
            }
        }),
        addNewDeptAdmin: builder.mutation({
            query: ({ minId, adminId }) => ({
                url: `/departments/${minId}/admins/${adminId}`,
                method: "POST",
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DAdmin", id: "LIST" }]
        }),
        updateDeptAdmin: builder.mutation({
            query: ({ minId, adminId }) => ({
                url: `/departments/${minId}/admins/${adminId}`,
                method: "PATCH",

                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DAdmin", id: arg.id }
            ]
        }),
        deleteDeptAdmin: builder.mutation({
            query: ({ minId, adminId }) => ({
                url: `/departments/${minId}/admins/${adminId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DAdmin", id: arg.id }
            ]
        }),

        getDeptBlocks: builder.query({
            query: minId => ({
                url: `/departments/${minId}/blocks`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "DBlock", id: "LIST" },
                        ...result.ids.map(id => ({ type: "DBlock", id }))
                    ];
                } else return [{ type: "DBlock", id: "LIST" }];
            }
        }),
        addNewDeptBlock: builder.mutation({
            query: ({ minId, blockId }) => ({
                url: `/departments/${minId}/blocks/${blockId}`,
                method: "POST",
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DBlock", id: "LIST" }]
        }),
        updateDeptBlock: builder.mutation({
            query: ({ minId, blockId }) => ({
                url: `/departments/${minId}/blocks/${blockId}`,
                method: "PATCH",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DBlock", id: arg.id }
            ]
        }),
        deleteDeptBlock: builder.mutation({
            query: ({ minId, blockId }) => ({
                url: `/departments/${minId}/blocks/${blockId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DBlock", id: arg.id }
            ]
        }),

        getDeptChats: builder.query({
            query: minId => ({
                url: `/departments/${minId}/chats`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "DChat", id: "LIST" },
                        ...result.ids.map(id => ({ type: "DChat", id }))
                    ];
                } else return [{ type: "DChat", id: "LIST" }];
            }
        }),
        addNewDeptChat: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/departments/${minId}/chats`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DChat", id: "LIST" }]
        }),
        updateDeptChat: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/departments/${minId}/chats/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DChat", id: arg.id }
            ]
        }),
        deleteDeptChat: builder.mutation({
            query: ({ minId, chatId }) => ({
                url: `/departments/${minId}/chats/${chatId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DChat", id: arg.id }
            ]
        }),

        getDeptCocs: builder.query({
            query: minId => ({
                url: `/departments/${minId}/cocs`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "DCoc", id: "LIST" },
                        ...result.ids.map(id => ({ type: "DCoc", id }))
                    ];
                } else return [{ type: "DCoc", id: "LIST" }];
            }
        }),
        addNewDeptCoc: builder.mutation({
            query: ({ minId, value }) => ({
                url: `/departments/${minId}/cocs`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DCoc", id: "LIST" }]
        }),
        updateDeptCoc: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/departments/${minId}/cocs/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DCoc", id: arg.id }
            ]
        }),
        deleteDeptCoc: builder.mutation({
            query: ({ minId, cocId }) => ({
                url: `/departments/${minId}/cocs/${cocId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DCoc", id: arg.id }
            ]
        }),

        getDeptComments: builder.query({
            query: ({ minId, feedId }) => ({
                url: `/departments/${minId}/feeds/${feedId}/comments`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "DComment", id: "LIST" },
                        ...result.ids.map(id => ({ type: "DComment", id }))
                    ];
                } else return [{ type: "DComment", id: "LIST" }];
            }
        }),
        addNewDeptComment: builder.mutation({
            query: ({ minId, feedId, ...comment }) => ({
                url: `/departments/${minId}/feeds/${feedId}/comments`,
                method: "POST",
                body: comment,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DComment", id: "LIST" }]
        }),
        updateDeptComment: builder.mutation({
            query: ({ minId, feedId, commentId, ...comment }) => ({
                url: `/departments/${minId}/feeds/${feedId}/comments/${commentId}`,
                method: "PATCH",
                body: comment,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DComment", id: arg.id }
            ]
        }),
        deleteDeptComment: builder.mutation({
            query: ({ minId, feedId, commentId }) => ({
                url: `/departments/${minId}/feeds/${feedId}/comments/${commentId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DComment", id: arg.id }
            ]
        }),

        getDeptFeeds: builder.query({
            query: minId => ({
                url: `/departments/${minId}/feeds`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "DFeed", id: "LIST" },
                        ...result.ids.map(id => ({ type: "DFeed", id }))
                    ];
                } else return [{ type: "DFeed", id: "LIST" }];
            }
        }),
        addNewDeptFeed: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/departments/${minId}/feeds`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DFeed", id: "LIST" }]
        }),
        updateDeptFeed: builder.mutation({
            query: ({ minId, value }) => ({
                url: `/departments/${minId}/feeds/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DFeed", id: arg.id }
            ]
        }),
        deleteDeptFeed: builder.mutation({
            query: ({ minId, feedId }) => ({
                url: `/departments/${minId}/feeds/${feedId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DFeed", id: arg.id }
            ]
        }),

        getDeptMembers: builder.query({
            query: minId => ({
                url: `/departments/${minId}/members`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "DMember", id: "LIST" },
                        ...result.ids.map(id => ({ type: "DMember", id }))
                    ];
                } else return [{ type: "DMember", id: "LIST" }];
            }
        }),
        addNewDeptMember: builder.mutation({
            query: ({ minId, userId }) => ({
                url: `/departments/${minId}/members/${userId}`,
                method: "POST",
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DMember", id: "LIST" }]
        }),
        updateDeptMember: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/departments/${minId}/members/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DMember", id: arg.id }
            ]
        }),
        deleteDeptMember: builder.mutation({
            query: ({ minId, memberId }) => ({
                url: `/departments/${minId}/members/${memberId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DMember", id: arg.id }
            ]
        }),

        getDepartments: builder.query({
            query: () => ({
                url: "/departments",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Department", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Department", id }))
                    ];
                } else return [{ type: "Department", id: "LIST" }];
            }
        }),
        addNewDepartment: builder.mutation({
            query: value => ({
                url: "/departments",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Department", id: "LIST" }]
        }),
        updateDepartment: builder.mutation({
            query: value => ({
                url: `/departments/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Department", id: arg.id }
            ]
        }),
        deleteDepartment: builder.mutation({
            query: minId => ({
                url: `/departments/${minId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Department", id: arg.id }
            ]
        }),

        getDeptReactions: builder.query({
            query: ({ minId, feedId }) => ({
                url: `/departments/${minId}/feeds/${feedId}/reactions`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "DReaction", id: "LIST" },
                        ...result.ids.map(id => ({ type: "DReaction", id }))
                    ];
                } else return [{ type: "DReaction", id: "LIST" }];
            }
        }),
        addNewDeptReaction: builder.mutation({
            query: ({ minId, feedId, ...reaction }) => ({
                url: `/departments/${minId}/feeds/${feedId}/reactions`,
                method: "POST",
                body: reaction,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DReaction", id: "LIST" }]
        }),
        updateDeptReaction: builder.mutation({
            query: ({ minId, feedId, reactionId, ...reaction }) => ({
                url: `/departments/${minId}/feeds/${feedId}/reactions/${reactionId}`,
                method: "PATCH",
                body: reaction,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DReaction", id: arg.id }
            ]
        }),
        deleteDeptReaction: builder.mutation({
            query: ({ minId, feedId, reactionId }) => ({
                url: `/departments/${minId}/feeds/${feedId}/reactions/${reactionId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DReaction", id: arg.id }
            ]
        })
    })
});

export const {
    useGetDeptAdminsQuery,
    useAddNewDeptAdminMutation,
    useUpdateDeptAdminMutation,
    useDeleteDeptAdminMutation,
    useGetDeptBlocksQuery,
    useAddNewDeptBlockMutation,
    useUpdateDeptBlockMutation,
    useDeleteDeptBlockMutation,
    useGetDeptAnnouncementsQuery,
    useAddNewDeptAnnouncementMutation,
    useUpdateDeptAnnouncementMutation,
    useDeleteDeptAnnouncementMutation,
    useGetDeptChatsQuery,
    useAddNewDeptChatMutation,
    useUpdateDeptChatMutation,
    useDeleteDeptChatMutation,
    useGetDeptCommentsQuery,
    useAddNewDeptCommentMutation,
    useUpdateDeptCommentMutation,
    useDeleteDeptCommentMutation,
    useGetDeptCocsQuery,
    useAddNewDeptCocMutation,
    useUpdateDeptCocMutation,
    useDeleteDeptCocMutation,
    useGetDeptFeedsQuery,
    useAddNewDeptFeedMutation,
    useUpdateDeptFeedMutation,
    useDeleteDeptFeedMutation,
    useGetDeptMembersQuery,
    useAddNewDeptMemberMutation,
    useUpdateDeptMemberMutation,
    useDeleteDeptMemberMutation,
    useGetDepartmentsQuery,
    useAddNewDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
    useGetDeptReactionsQuery,
    useAddNewDeptReactionMutation,
    useUpdateDeptReactionMutation,
    useDeleteDeptReactionMutation
} = departmentsApiSlice;

// returns the query result object
export const selectDepartmentsResult =
    departmentsApiSlice.endpoints.getDepartments.select();

// creates memoized selector
const selectDepartmentsData = createSelector(
    selectDepartmentsResult,
    departmentsResult => departmentsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDepartments,
    selectById: selectDepartmentById,
    selectIds: selectDepartmentIds
    // Pass in a selector that returns the departments slice of state
} = departmentsAdapter.getSelectors(
    state => selectDepartmentsData(state) ?? initialState
);
