import { fork } from "@redux-saga/core/effects";
import fetchTableDataSaga from "./table/sagas/fetchTableData";
import addTableDataSaga from "./table/sagas/addTableData";
import deleteTableDataSaga from "./table/sagas/deleteTableData";
import editTableDataSaga from "./table/sagas/editTableData";

export default function* rootSaga() {
  yield fork(fetchTableDataSaga);
  yield fork(addTableDataSaga);
  yield fork(deleteTableDataSaga);
  yield fork(editTableDataSaga)
}