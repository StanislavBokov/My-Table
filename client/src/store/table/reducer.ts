import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableDataState, TableDataItem } from '../../types';
const initialState:TableDataState = {
  TableData: [],
  loading: null,
  error: false
};

export const TableReducer = createSlice({
  name: 'table',
  initialState,
  reducers: {
    fetchLoading: (state) => ({
      ...state,
      loading: true
    }),
    upDateStore: (state, action:PayloadAction<TableDataItem[]>) => ({
      ...state,
      TableData: action.payload,
      loading: false
    }),
    fetchTableDataError: (state) => ({
      ...state,
      loading: false,
      error: true
    })
  }
});
export const { fetchLoading, fetchTableDataError, upDateStore } = TableReducer.actions;
export default TableReducer.reducer;