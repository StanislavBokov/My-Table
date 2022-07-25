import { FC, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { TableDataItem } from '../../../types';
import { deleteTableDataAction, editTableDataAction } from '../../../store/table/actions';
import cn from 'clsx';
import { validate, isEmptyErrors } from './helper';
import { getDate } from '../../../utils/getDate';

interface TableBodyProps {
    slicedDataArray: TableDataItem[]
}

export const TableBody:FC<TableBodyProps> = ({ slicedDataArray }) => {
  const dispatch = useDispatch();

  const { TableData, loading } = useSelector((state:RootStateOrAny) => state.table);

  const [editActiveId, setEditActiveId] = useState(''); // Записываем id изминяемого элемента 

  const selectedEditItem = () => {
    return TableData.find((item: TableDataItem) => item._id === editActiveId)
  };
  const selectedItem = selectedEditItem()

  const [editData, setEditData] = useState<TableDataItem>({
    name: '',
    amount: '',
    distance: ''
  });
  const [errors, setErrors] = useState<{[key:string]:boolean}>({
    amount: false,
    distance: false
  });

  useEffect(() => {
    validate(editData, setErrors) 
  }, [editData.amount, editData.distance]) // Валидируем только поля amount и distance
    
  useEffect(() => {
    setEditData({ // Записываем в valueField старые значения 
      name: selectedItem?.name || '',
      amount: selectedItem?.amount || '',
      distance: selectedItem?.distance || ''
    })
  }, [selectedItem])
    
  const handleChangeEditData = ({ target }: any) => {
    setEditData((prevState: TableDataItem) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const deleteTableItem = (id: string) => {
    dispatch(deleteTableDataAction(id));
  };

  const editTableItem = (id: string) => {
    if(editActiveId === id) { // Находясь в сессии изминения данных, сохраняем данные и чистим поля
      dispatch(editTableDataAction({ id, editData }))
      setEditActiveId('')
      setEditData({
        name: '',
        amount: '',
        distance: ''
      })       
    } else {
      setEditActiveId(id) // Заходим в сессии изминения данных
    }
  };
    
  if(loading) {
    return <span>Loading...</span>
  }   

  return ( 
    <div className={styles.tbody}>
      {slicedDataArray.map((item:TableDataItem) => (
 
        <div className={styles.tr} key={item._id}>
          <div className={styles.td}>{getDate(new Date(Date.parse(item.createdAt)))}</div>
          {editActiveId === item._id // В случае изминения элемента, мы показываем input куда можно записать новые данные 
            ? <input 
              className={styles.editInput} 
              value={editData.name} name="name" 
              onChange={handleChangeEditData} 
            /> 
            : <div className={styles.td}>{item.name}</div>}

          {editActiveId === item._id 
            ? <input 
              className={cn(styles.editInput, { [styles.editError]: errors.amount })} 
              value={editData.amount} 
              name="amount" 
              onChange={handleChangeEditData} 
            /> 
            : <div className={styles.td}>{item.amount}</div>}

          {editActiveId === item._id 
            ? <input 
              className={cn(styles.editInput, { [styles.editError]: errors.distance })} 
              value={editData.distance} 
              name="distance" 
              onChange={handleChangeEditData} 
            />
            : <div className={styles.td}>{item.distance}</div>}

          <button 
            disabled={editActiveId === item._id && isEmptyErrors(errors)} 
            className={styles.btns} onClick={() => editTableItem(item._id!)}
          >
            {editActiveId === item._id ? 'Save' : 'Edit'}
          </button>
          <button 
            className={cn(styles.btns, styles.deleteBtn)} 
            onClick={() => deleteTableItem(item._id!)}
          >
                    &times;
          </button>
        </div>          
      ))}
    </div>
  )
}