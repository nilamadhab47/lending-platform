import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/PostsSlice";
import  leadFormSlice  from "./slices/LeadFormSlice";
import  RaisedFormSlice  from "./slices/RaisedInvoiceForm";
import SettledInvoiceFormSlice from "./slices/SettledInvoiceFormSlice";
import  AllTransactionFormSlice  from "./slices/AllTransaction";
import  TrashFormSlice  from "./slices/TrashSlice";

export const store = configureStore({
    reducer: {
        posts: postsSlice,
        leadForm: leadFormSlice,
        raisedForm: RaisedFormSlice,
        settledForm: SettledInvoiceFormSlice,
        allTransactionForm: AllTransactionFormSlice,
        trash : TrashFormSlice
    }
})