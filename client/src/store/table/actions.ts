import { createAction } from '@reduxjs/toolkit';
import actionsTypes from './actionTypes';
import { TableDataItem, EditDataState } from '../../types';

export const fetchTableDataAction = createAction(actionsTypes.FETCH_TABLE_DATA);
export const addTableDataAction = createAction<TableDataItem>(actionsTypes.ADD_TABLE_DATA);
export const deleteTableDataAction = createAction<string>(actionsTypes.DELETE_TABLE_DATA);
export const editTableDataAction = createAction<EditDataState>(actionsTypes.EDIT_TABLE_DATA);