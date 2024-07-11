import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '@/components/Form/LeadForm'; // Import the FormData type

interface LeadFormState {
  formSubmitted: boolean;
  editData: FormData | null; // Add this line to store edit data
}

const initialState: LeadFormState = {
  formSubmitted: false,
  editData: null,
};

export const leadFormSlice = createSlice({
  name: 'leadForm',
  initialState,
  reducers: {
    updateFormSubmitted: (state, action: PayloadAction<boolean>) => {
      state.formSubmitted = action.payload;
    },
    setEditData: (state, action: PayloadAction<FormData | null>) => { // Define a reducer to set edit data
      state.editData = action.payload;
    },
  },
});

export const { updateFormSubmitted, setEditData } = leadFormSlice.actions;

export default leadFormSlice.reducer;