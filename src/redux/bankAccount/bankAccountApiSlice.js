import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const bankAccountsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt - a.createdAt
});

const initialState = bankAccountsAdapter.getInitialState();

export const bankAccountsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBankAccounts: builder.query({
            query: () => ({
                url: "/bankaccounts",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "BankAccount", id: "LIST" },
                        ...result.ids.map(id => ({ type: "BankAccount", id }))
                    ];
                } else return [{ type: "BankAccount", id: "LIST" }];
            }
        }),
        addNewBankAccount: builder.mutation({
            query: value => ({
                url: "/bankaccounts",
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: [{ type: "BankAccount", id: "LIST" }]
        }),
        updateBankAccount: builder.mutation({
            query: value => ({
                url: "/bankaccounts/" + value._id,
                method: "PATCH",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "BankAccount", id: arg.id }
            ]
        }),
        deleteBankAccount: builder.mutation({
            query: id => ({
                url: "/bankaccounts/" + id,
                method: "DELETE",
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "BankAccount", id: arg.id }
            ]
        })
    })
});

export const {
    useGetBankAccountsQuery,
    useAddNewBankAccountMutation,
    useUpdateBankAccountMutation,
    useDeleteBankAccountMutation
} = bankAccountsApiSlice;

// returns the query result object
export const selectBankAccountsResult =
    bankAccountsApiSlice.endpoints.getBankAccounts.select();

// creates memoized selector
const selectBankAccountsData = createSelector(
    selectBankAccountsResult,
    bankAccountsResult => bankAccountsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllBankAccounts,
    selectById: selectBankAccountById,
    selectIds: selectBankAccountIds
    // Pass in a selector that returns the bankAccounts slice of state
} = bankAccountsAdapter.getSelectors(
    state => selectBankAccountsData(state) ?? initialState
);
