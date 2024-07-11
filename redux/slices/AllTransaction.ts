import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RaisedInvoiceData } from '@/components/Form/RaisedInvoiceForm';// Import the FormData type

interface AllTransactionFormState {
  formSubmitted: boolean;
  editAllTransactionData: RaisedInvoiceData | null; // Add this line to store edit data
}

const initialState: AllTransactionFormState = {
  formSubmitted: false,
  editAllTransactionData: null,
};

export const AllTransactionFormSlice = createSlice({
  name: 'AllTransactionForm',
  initialState,
  reducers: {
    updateFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
    },
    setEditAllTransactionData: (state, action: PayloadAction<RaisedInvoiceData | null>) => { // Define a reducer to set edit data
      state.editAllTransactionData = action.payload;
    },
  },
});

export const { updateFormSubmitted, setEditAllTransactionData } = AllTransactionFormSlice.actions;

export default AllTransactionFormSlice.reducer;