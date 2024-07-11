import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RaisedInvoiceData } from '@/components/Form/RaisedInvoiceForm';// Import the FormData type

interface SettledInvoiceFormState {
  formSubmitted: boolean;
  editSettledInvoiceData: RaisedInvoiceData | null; // Add this line to store edit data
}

const initialState: SettledInvoiceFormState = {
  formSubmitted: false,
  editSettledInvoiceData: null,
};

export const SettledInvoiceFormSlice = createSlice({
  name: 'SettledInvoiceForm',
  initialState,
  reducers: {
    updateFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
    },
    setEditSettledInvoiceData: (state, action: PayloadAction<RaisedInvoiceData | null>) => { // Define a reducer to set edit data
      state.editSettledInvoiceData = action.payload;
    },
  },
});

export const { updateFormSubmitted, setEditSettledInvoiceData } = SettledInvoiceFormSlice.actions;

export default SettledInvoiceFormSlice.reducer;