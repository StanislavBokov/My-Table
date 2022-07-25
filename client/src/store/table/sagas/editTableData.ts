import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import axios from 'axios';
import { editTableDataAction } from '../actions';
import { upDateStore } from '../reducer';

export function* editTableDataWorker({ payload }: ReturnType<typeof editTableDataAction>) {
  try {          
    const { data } = yield axios.put('http://localhost:5566/api/table/edit', {
      _id: payload.id,
      ...payload.editData
    })
    yield put(upDateStore(data))
 
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.EDIT_TABLE_DATA, editTableDataWorker);

}
