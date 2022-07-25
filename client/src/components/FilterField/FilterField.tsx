import React ,{ FC, useState, useEffect } from 'react';
import styles from './styles.module.scss';
import { MySelect, Input } from '..';
import { optionColumn, optionCondition, validate, isEmptyErrors } from './helper';
import { setValue } from '../../store/filtration/reducer';
import { ErrorMessages, Blur } from '../../types/components/fields';
import { useDispatch } from 'react-redux';

export const FilterField:FC = () => {
  const dispatch = useDispatch();
  const [selectColumn, setSelectColumn] = useState('');
  const [selectCondition, setSelectCondition] = useState('');
  const [valueForFilter, setValueForFilter] = useState('');

  const [errors, setErrors] = useState<ErrorMessages>({
    selectColumn: '',
    selectCondition: '',
    valueForFilter: ''
  });

  useEffect(() => {
    validate(selectColumn, selectCondition, valueForFilter, setErrors)
  }, [selectColumn, selectCondition, valueForFilter])
 
  const handleChange = ({ target }: any) => {
    setValueForFilter(target.value)
  }
  const filterTableData = () => {
    dispatch(setValue({ selectColumn, selectCondition, valueForFilter, isFiltered:true }))
  }
  const [blur, setBlur] = useState<Blur>({ 
    selectColumn: false,
    selectCondition: false,
    valueForFilter: false
  });
  const columnBlurChange = () => {
    setBlur((prevState: Blur) => ({
      ...prevState, selectColumn:true
    }))
  };
  const conditionBlurChange = () => {
    setBlur((prevState: Blur) => ({
      ...prevState, selectCondition:true
    }))
  };
  const valueForFilterBlurChange = () => {
    setBlur((prevState: Blur) => ({
      ...prevState, valueForFilter:true
    }))
  };

  const resetFilterData = () => {
    setSelectColumn('')
    setSelectCondition('')
    setValueForFilter('')
    dispatch(setValue({ selectColumn, selectCondition, valueForFilter, isFiltered:false }))
    setBlur({
      selectColumn: false,
      selectCondition: false,
      valueForFilter: false
    }) 
  }
  
  return (
    <div className={styles.wrapperFilterField}>
      <h3 className={styles.titles}>Filtration</h3>
      <div className={styles.wrapperSelects}>
        <MySelect 
          options={optionColumn} 
          value={selectColumn} 
          setValue={setSelectColumn} 
          placeholder="Column" 
          onBlur={columnBlurChange} 
          blur={blur.selectColumn} 
          error={errors.selectColumn}/>
      </div>
      <div className={styles.wrapperSelects}>
        <MySelect 
          options={optionCondition} 
          value={selectCondition} 
          setValue={setSelectCondition} 
          placeholder="Condition"
          onBlur={conditionBlurChange} 
          blur={blur.selectCondition} 
          error={errors.selectCondition}
        />  
      </div>    
      <Input 
        id="filterValue"
        placeholder="value" 
        name="filterValue" 
        value={valueForFilter} 
        onChange={handleChange}
        blur={blur.valueForFilter}
        onBlur={valueForFilterBlurChange}
        error={errors.valueForFilter}
      />
      <button className={styles.btns} onClick={filterTableData}  disabled={isEmptyErrors(errors)}>Filter</button><br/>
      <button className={styles.btns} onClick={resetFilterData} >Reset</button>
    </div>
  )
}