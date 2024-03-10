import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: value => ({
                url: "/auth/login",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data && data !== undefined) {
                        dispatch(setCredentials(data));
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        register: builder.mutation({
            query: value => ({
                url: "/auth/register",
                method: "POST",
                body: value
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                     if (data && data !== undefined) {
                        dispatch(setCredentials(data));
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                responseHandler: "text"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "POST"
                // responseHandler: "text"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setCredentials(data));
                } catch (err) {
                    console.log(err);
                }
            }
        })
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshMutation
} = authApiSlice;
