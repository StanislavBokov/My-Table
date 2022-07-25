import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import axios from 'axios';
import { deleteTableDataAction } from '../actions';
import { upDateStore } from '../reducer';

export function* deleteTableDataWorker({ payload }: ReturnType<typeof deleteTableDataAction>) {
  try {    
    const { data } = yield axios.delete('http://localhost:5566/api/table/delete', {
      data: {
        _id: payload
      }
    })
    yield put(upDateStore(data))
 
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.DELETE_TABLE_DATA, deleteTableDataWorker);

}
