import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const ministriesAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt - b.createdAt
});

const initialState = ministriesAdapter.getInitialState();

export const ministriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMinAnnouncements: builder.query({
            query: minId => ({
                url: `/ministries/${minId}/announcements`,
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
        addNewMinAnnouncement: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/ministries/${minId}/announcements`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DAnnouncement", id: "LIST" }]
        }),
        updateMinAnnouncement: builder.mutation({
            query: ({ minId, value }) => ({
                url: `/ministries/${minId}/announcements/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DAnnouncement", id: arg.id }
            ]
        }),
        deleteMinAnnouncement: builder.mutation({
            query: ({ minId, announcementId }) => ({
                url: `/ministries/${minId}/announcements/${announcementId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DAnnouncement", id: arg.id }
            ]
        }),

        getMinAdmins: builder.query({
            query: minId => ({
                url: `/ministries/${minId}/admins`,
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
        addNewMinAdmin: builder.mutation({
            query: ({ minId, adminId }) => ({
                url: `/ministries/${minId}/admins/${adminId}`,
                method: "POST",
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DAdmin", id: "LIST" }]
        }),
        updateMinAdmin: builder.mutation({
            query: ({ minId, adminId }) => ({
                url: `/ministries/${minId}/admins/${adminId}`,
                method: "PATCH",

                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DAdmin", id: arg.id }
            ]
        }),
        deleteMinAdmin: builder.mutation({
            query: ({ minId, adminId }) => ({
                url: `/ministries/${minId}/admins/${adminId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DAdmin", id: arg.id }
            ]
        }),

        getMinBlocks: builder.query({
            query: minId => ({
                url: `/ministries/${minId}/blocks`,
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
        addNewMinBlock: builder.mutation({
            query: ({ minId, blockId }) => ({
                url: `/ministries/${minId}/blocks/${blockId}`,
                method: "POST",
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DBlock", id: "LIST" }]
        }),
        updateMinBlock: builder.mutation({
            query: ({ minId, blockId }) => ({
                url: `/ministries/${minId}/blocks/${blockId}`,
                method: "PATCH",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DBlock", id: arg.id }
            ]
        }),
        deleteMinBlock: builder.mutation({
            query: ({ minId, blockId }) => ({
                url: `/ministries/${minId}/blocks/${blockId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DBlock", id: arg.id }
            ]
        }),

        getMinChats: builder.query({
            query: minId => ({
                url: `/ministries/${minId}/chats`,
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
        addNewMinChat: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/ministries/${minId}/chats`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DChat", id: "LIST" }]
        }),
        updateMinChat: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/ministries/${minId}/chats/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DChat", id: arg.id }
            ]
        }),
        deleteMinChat: builder.mutation({
            query: ({ minId, chatId }) => ({
                url: `/ministries/${minId}/chats/${chatId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DChat", id: arg.id }
            ]
        }),

        getMinCocs: builder.query({
            query: minId => ({
                url: `/ministries/${minId}/cocs`,
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
        addNewMinCoc: builder.mutation({
            query: ({ minId, value }) => ({
                url: `/ministries/${minId}/cocs`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DCoc", id: "LIST" }]
        }),
        updateMinCoc: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/ministries/${minId}/cocs/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DCoc", id: arg.id }
            ]
        }),
        deleteMinCoc: builder.mutation({
            query: ({ minId, cocId }) => ({
                url: `/ministries/${minId}/cocs/${cocId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DCoc", id: arg.id }
            ]
        }),

        getMinComments: builder.query({
            query: ({ minId, feedId }) => ({
                url: `/ministries/${minId}/feeds/${feedId}/comments`,
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
        addNewMinComment: builder.mutation({
            query: ({ minId, feedId, ...comment }) => ({
                url: `/ministries/${minId}/feeds/${feedId}/comments`,
                method: "POST",
                body: comment,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DComment", id: "LIST" }]
        }),
        updateMinComment: builder.mutation({
            query: ({ minId, feedId, commentId, ...comment }) => ({
                url: `/ministries/${minId}/feeds/${feedId}/comments/${commentId}`,
                method: "PATCH",
                body: comment,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DComment", id: arg.id }
            ]
        }),
        deleteMinComment: builder.mutation({
            query: ({ minId, feedId, commentId }) => ({
                url: `/ministries/${minId}/feeds/${feedId}/comments/${commentId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DComment", id: arg.id }
            ]
        }),

        getMinFeeds: builder.query({
            query: minId => ({
                url: `/ministries/${minId}/feeds`,
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
        addNewMinFeed: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/ministries/${minId}/feeds`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DFeed", id: "LIST" }]
        }),
        updateMinFeed: builder.mutation({
            query: ({ minId, value }) => ({
                url: `/ministries/${minId}/feeds/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DFeed", id: arg.id }
            ]
        }),
        deleteMinFeed: builder.mutation({
            query: ({ minId, feedId }) => ({
                url: `/ministries/${minId}/feeds/${feedId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DFeed", id: arg.id }
            ]
        }),

        getMinMembers: builder.query({
            query: minId => ({
                url: `/ministries/${minId}/members`,
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
        addNewMinMember: builder.mutation({
            query: ({ minId, userId }) => ({
                url: `/ministries/${minId}/members/${userId}`,
                method: "POST",
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DMember", id: "LIST" }]
        }),
        updateMinMember: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/ministries/${minId}/members/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DMember", id: arg.id }
            ]
        }),
        deleteMinMember: builder.mutation({
            query: ({ minId, memberId }) => ({
                url: `/ministries/${minId}/members/${memberId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DMember", id: arg.id }
            ]
        }),

        getMinistries: builder.query({
            query: () => ({
                url: "/ministries",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Ministry", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Ministry", id }))
                    ];
                } else return [{ type: "Ministry", id: "LIST" }];
            }
        }),
        addNewMinistry: builder.mutation({
            query: value => ({
                url: "/ministries",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "Ministry", id: "LIST" }]
        }),
        updateMinistry: builder.mutation({
            query: value => ({
                url: `/ministries/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Ministry", id: arg.id }
            ]
        }),
        deleteMinistry: builder.mutation({
            query: minId => ({
                url: `/ministries/${minId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Ministry", id: arg.id }
            ]
        }),

        getMinReactions: builder.query({
            query: ({ minId, feedId }) => ({
                url: `/ministries/${minId}/feeds/${feedId}/reactions`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "MReaction", id: "LIST" },
                        ...result.ids.map(id => ({ type: "MReaction", id }))
                    ];
                } else return [{ type: "MReaction", id: "LIST" }];
            }
        }),
        addNewMinReaction: builder.mutation({
            query: ({ minId, feedId, ...reaction }) => ({
                url: `/ministries/${minId}/feeds/${feedId}/reactions`,
                method: "POST",
                body: reaction,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "MReaction", id: "LIST" }]
        }),
        updateMinReaction: builder.mutation({
            query: ({ minId, feedId, reactionId, ...reaction }) => ({
                url: `/ministries/${minId}/feeds/${feedId}/reactions/${reactionId}`,
                method: "PATCH",
                body: reaction,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "MReaction", id: arg.id }
            ]
        }),
        deleteMinReaction: builder.mutation({
            query: ({ minId, feedId, reactionId }) => ({
                url: `/ministries/${minId}/feeds/${feedId}/reactions/${reactionId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "MReaction", id: arg.id }
            ]
        }),
         getMinRequests: builder.query({
            query: minId => ({
                url: `/ministries/${minId}/requests`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "DRequest", id: "LIST" },
                        ...result.ids.map(id => ({ type: "DRequest", id }))
                    ];
                } else return [{ type: "DRequest", id: "LIST" }];
            }
        }),
        addNewMinRequest: builder.mutation({
            query: ({ minId, userId }) => ({
                url: `/ministries/${minId}/requests/${userId}`,
                method: "POST",
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "DRequest", id: "LIST" }]
        }),
        updateMinRequest: builder.mutation({
            query: ({ minId, ...value }) => ({
                url: `/ministries/${minId}/requests/${value._id}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DRequest", id: arg.id }
            ]
        }),
        deleteMinRequest: builder.mutation({
            query: ({ minId, requestId }) => ({
                url: `/ministries/${minId}/requests/${requestId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "DRequest", id: arg.id }
            ]
        }),
    })
});

export const {
    useGetMinAdminsQuery,
    useAddNewMinAdminMutation,
    useUpdateMinAdminMutation,
    useDeleteMinAdminMutation,
    useGetMinBlocksQuery,
    useAddNewMinBlockMutation,
    useUpdateMinBlockMutation,
    useDeleteMinBlockMutation,
    useGetMinAnnouncementsQuery,
    useAddNewMinAnnouncementMutation,
    useUpdateMinAnnouncementMutation,
    useDeleteMinAnnouncementMutation,
    useGetMinChatsQuery,
    useAddNewMinChatMutation,
    useUpdateMinChatMutation,
    useDeleteMinChatMutation,
    useGetMinCommentsQuery,
    useAddNewMinCommentMutation,
    useUpdateMinCommentMutation,
    useDeleteMinCommentMutation,
    useGetMinCocsQuery,
    useAddNewMinCocMutation,
    useUpdateMinCocMutation,
    useDeleteMinCocMutation,
    useGetMinFeedsQuery,
    useAddNewMinFeedMutation,
    useUpdateMinFeedMutation,
    useDeleteMinFeedMutation,
    useGetMinMembersQuery,
    useAddNewMinMemberMutation,
    useUpdateMinMemberMutation,
    useDeleteMinMemberMutation,
    useGetMinistriesQuery,
    useAddNewMinistryMutation,
    useUpdateMinistryMutation,
    useDeleteMinistryMutation,
    useGetMinReactionsQuery,
    useAddNewMinReactionMutation,
    useUpdateMinReactionMutation,
    useDeleteMinReactionMutation,
    useGetMinRequestsQuery,
    useAddNewMinRequestMutation,
    useUpdateMinRequestMutation,
    useDeleteMinRequestMutation
} = ministriesApiSlice;

// returns the query result object
export const selectMinistriesResult =
    ministriesApiSlice.endpoints.getMinistries.select();

// creates memoized selector
const selectMinistriesData = createSelector(
    selectMinistriesResult,
    ministriesResult => ministriesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllMinistries,
    selectById: selectMinistryById,
    selectIds: selectMinistryIds
    // Pass in a selector that returns the ministries slice of state
} = ministriesAdapter.getSelectors(
    state => selectMinistriesData(state) ?? initialState
);
