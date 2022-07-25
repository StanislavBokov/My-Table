import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { Table, AddField, FilterField } from '../../components';
import { useDispatch } from 'react-redux';
import { fetchTableDataAction } from '../../store/table/actions';

export const MainPage:FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTableDataAction())
  }, [])
  return ( 
    <div className={styles.wrapper}>
      <Table />
      <div className={styles.wrapperFields}>  
        <AddField />
        <FilterField />
      </div>
    </div>
  )
}