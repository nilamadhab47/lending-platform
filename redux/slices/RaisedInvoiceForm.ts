import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RaisedInvoiceData } from '@/components/Form/RaisedInvoiceForm';// Import the FormData type

interface RaisedFormState {
  formSubmitted: boolean;
  editRaisedInvoiceData: RaisedInvoiceData | null; // Add this line to store edit data
}

const initialState: RaisedFormState = {
  formSubmitted: false,
  editRaisedInvoiceData: null,
};

export const RaisedFormSlice = createSlice({
  name: 'RaisedForm',
  initialState,
  reducers: {
    updateFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
    },
    setEditRaisedInvoiceData: (state, action: PayloadAction<RaisedInvoiceData | null>) => { // Define a reducer to set edit data
      state.editRaisedInvoiceData = action.payload;
    },
  },
});

export const { updateFormSubmitted, setEditRaisedInvoiceData } = RaisedFormSlice.actions;

export default RaisedFormSlice.reducer;