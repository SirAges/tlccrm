import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: "/users",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map(id => ({ type: "User", id }))
                    ];
                } else return [{ type: "User", id: "LIST" }];
            }
        }),
        updateUser: builder.mutation({
            query: ({ userId, value }) => ({
                url: `/users/${userId}`,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: id => ({
                url: "/users/" + id,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id }
            ]
        }),
        getUserRequests: builder.query({
            query: ({ userId }) => ({
                url: `/users/${userId}/requests`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "URequest", id: "LIST" },
                        ...result.ids.map(id => ({ type: "URequest", id }))
                    ];
                } else return [{ type: "URequest", id: "LIST" }];
            }
        }),
        addNewUserRequest: builder.mutation({
            query: ({ userId, requestId }) => ({
                url: `/users/${userId}/requests/${requestId}`,
                method: "POST",
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "URequest", id: "LIST" }]
        }),
        updateUserRequest: builder.mutation({
            query: ({ userId, requestId }) => ({
                url: `/users/${userId}/requests/${requestId}}`,
                method: "PATCH",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "URequest", id: arg.id }
            ]
        }),
        deleteUserRequest: builder.mutation({
            query: ({ userId, requestId }) => ({
                url: `/users/${userId}/requests/${requestId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "URequest", id: arg.id }
            ]
        }),

        getUserHiddens: builder.query({
            query: ({ userId }) => ({
                url: `/users/${userId}/hiddens`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "UHidden", id: "LIST" },
                        ...result.ids.map(id => ({ type: "UHidden", id }))
                    ];
                } else return [{ type: "UHidden", id: "LIST" }];
            }
        }),
        addNewUserHidden: builder.mutation({
            query: ({ userId, hiddenId }) => ({
                url: `/users/${userId}/hiddens/${hiddenId}`,
                method: "POST",
                responseHandler: "text"
            }),

            invalidatesTags: [{ type: "UHidden", id: "LIST" }]
        }),
        updateUserHidden: builder.mutation({
            query: ({ userId, hiddenId }) => ({
                url: `/users/${userId}/hiddens/${hiddenId}}`,
                method: "PATCH",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "UHidden", id: arg.id }
            ]
        }),
        deleteUserHidden: builder.mutation({
            query: ({ userId, hiddenId }) => ({
                url: `/users/${userId}/hiddens/${hiddenId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "UHidden", id: arg.id }
            ]
        }),

        getUserFriends: builder.query({
            query: ({ userId }) => ({
                url: `/users/${userId}/friends`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "UFriend", id: "LIST" },
                        ...result.ids.map(id => ({ type: "UFriend", id }))
                    ];
                } else return [{ type: "UFriend", id: "LIST" }];
            }
        }),
        addNewUserFriend: builder.mutation({
            query: ({ userId, friendId }) => ({
                url: `/users/${userId}/friends/${friendId}`,
                method: "POST",
                responseHandler: "text"
            }),

            invalidatesTags: [{ type: "UFriend", id: "LIST" }]
        }),
        updateUserFriend: builder.mutation({
            query: ({ userId, friendId }) => ({
                url: `/users/${userId}/friends/${friendId}}`,
                method: "PATCH",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "UFriend", id: arg.id }
            ]
        }),
        deleteUserFriend: builder.mutation({
            query: ({ userId, friendId }) => ({
                url: `/users/${userId}/friends/${friendId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "UFriend", id: arg.id }
            ]
        }),
        
        getUserDepartments: builder.query({
            query: ({ userId }) => ({
                url: `/users/${userId}/departments`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "UDepartment", id: "LIST" },
                        ...result.ids.map(id => ({ type: "UDepartment", id }))
                    ];
                    
                } else return [{ type: "UDepartment", id: "LIST" }];
            }
        }),
        addNewUserDepartment: builder.mutation({
            query: ({ userId, ...department }) => ({
                url: `/users/${userId}/departments`,
                method: "POST",
                body: department,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "UDepartment", id: "LIST" }]
        }),
        updateUserDepartment: builder.mutation({
            query: ({ userId, departmentId }) => ({
                url: `/users/${userId}/departments/${departmentId}}`,
                method: "PATCH",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "UDepartment", id: arg.id }
            ]
        }),
        deleteUserDepartment: builder.mutation({
            query: ({ userId, departmentId }) => ({
                url: `/users/${userId}/departments/${departmentId}`,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "UDepartment", id: arg.id }
            ]
        })
    })
});

export const {
    useGetUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetUserFriendsQuery,
    useAddNewUserFriendMutation,
    useUpdateUserFriendMutation,
    useDeleteUserFriendMutation,
    useGetUserDepartmentsQuery,
    useAddNewUserDepartmentMutation,
    useUpdateUserDepartmentMutation,
    useDeleteUserDepartmentMutation,
    useGetUserRequestsQuery,
    useAddNewUserRequestMutation,
    useUpdateUserRequestMutation,
    useDeleteUserRequestMutation,
    useGetUserHiddensQuery,
    useAddNewUserHiddenMutation,
    useUpdateUserHiddenMutation,
    useDeleteUserHiddenMutation
} = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);
