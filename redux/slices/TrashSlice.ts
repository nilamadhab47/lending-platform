import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RaisedInvoiceData } from '@/components/Form/RaisedInvoiceForm';// Import the FormData type

interface TrashFormState {
  formSubmitted: boolean;
  editTrashData: RaisedInvoiceData | null; // Add this line to store edit data
}

const initialState: TrashFormState = {
  formSubmitted: false,
  editTrashData: null,
};

export const TrashFormSlice = createSlice({
  name: 'TrashForm',
  initialState,
  reducers: {
    updateFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
    },
    setEditTrashData: (state, action: PayloadAction<RaisedInvoiceData | null>) => { // Define a reducer to set edit data
      state.editTrashData = action.payload;
    },
  },
});

export const { updateFormSubmitted, setEditTrashData } = TrashFormSlice.actions;

export default TrashFormSlice.reducer;