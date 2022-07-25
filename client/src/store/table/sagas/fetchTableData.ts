import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import axios from 'axios';
import { upDateStore, fetchLoading, fetchTableDataError } from '../reducer';

export function* fetchTableDataWorker() {
  try {    
    yield put(fetchLoading())
    const { data } = yield axios.get('http://localhost:5566/api/table')
    yield put(upDateStore(data))
  } catch (err) {
    console.error(err);
    fetchTableDataError()
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.FETCH_TABLE_DATA, fetchTableDataWorker);

}
