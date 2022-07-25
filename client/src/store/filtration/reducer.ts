/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../../types';

const initialState: FilterState = {
  selectColumn: '',
  selectCondition: '',
  valueForFilter: '',
  isFiltered: false
};

export const FilterReducer = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<FilterState>) => ({
      ...state,
      ...action.payload
    })
   
  }
});
export const { setValue } = FilterReducer.actions;
export default FilterReducer.reducer;