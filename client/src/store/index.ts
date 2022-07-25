import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import TableReducer from './table/reducer';
import FilterReducer from './filtration/reducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    table: TableReducer,
    filter: FilterReducer
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
    serializableCheck: {
      // ignoredActions: [actionTypes.CONNECT_TO_METAMASK]
    }
  }).concat(sagaMiddleware)
});
sagaMiddleware.run(rootSaga);

export default store;