import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Input } from '..';
import { inputHelper, validate, isEmptyErrors } from './helper';
import { useDispatch } from 'react-redux';
import { addTableDataAction } from '../../store/table/actions';
import { DataAddField, ErrorMessages } from '../../types/components/fields';

export const AddField:FC = () => {
  const dispatch = useDispatch();
    
  const [data, setData] = useState<DataAddField>({
    name: { value: '', isBlur: false },
    amount: { value: '', isBlur: false },
    distance: { value: '', isBlur: false }
  });

  const [errors, setErrors] = useState<ErrorMessages>({
    name: '',
    amount: '',
    distance: ''
  });
     
  const handleChange = ({ target }: any) => {       
    setData((prevState:DataAddField) => ({
      ...prevState,
      [target.name]: { ...data[target.name], value: target.value  }
    }));
  };

  const handleBlur = ({ target }:any) => {        
    setData((prevState:DataAddField) => ({
      ...prevState,
      [target.name]: { ...data[target.name], isBlur: true  }
    }));
  };

  useEffect(() => {
    validate(data, setErrors)
  }, [data])

  const addTableData = () => {
    dispatch(addTableDataAction({ 
      name: data.name.value,
      amount: Number(data.amount.value), 
      distance: Number(data.distance.value) 
    }))
    setData({
      name: { value: '', isBlur: false },
      amount: { value: '', isBlur: false },
      distance: { value: '', isBlur: false }
    })
  }

  return (
    <div className={styles.wrapperField}>
      <h3 className={styles.titles}>Add Field</h3>
      {inputHelper.map(({ id, name, placeholder }) => (
        <Input 
          id={id}
          key={id}
          name={name} 
          placeholder={placeholder} 
          onChange={handleChange} 
          value={data[name].value}
          error={errors[name]}
          onBlur={handleBlur}
          blur={data[name].isBlur}
        />
      ))}
      <button className={styles.addBtn} disabled={isEmptyErrors(errors)} onClick={addTableData}>Add</button>
    </div>
  )
}