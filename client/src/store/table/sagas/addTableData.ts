import { takeLatest, put } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import axios from 'axios';
import { addTableDataAction } from '../actions';
import { upDateStore } from '../reducer';

export function* addTableDataWorker({ payload }: ReturnType<typeof addTableDataAction>) {
  try {    
    const { data } = yield axios.post('http://localhost:5566/api/table/add', {
      ...payload
    })
    yield put(upDateStore(data))
 
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.ADD_TABLE_DATA, addTableDataWorker);

}
