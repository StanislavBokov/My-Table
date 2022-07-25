import React, { FC, useState } from "react";
import styles from './styles.module.scss';
import { Options } from "../../types/components/select";
import Select from 'react-select';

interface MySelectProps {
  options: Options[],
  value: string | string[],
  setValue: any,
  onInputChange?: any,
  isMulti?: boolean,
  placeholder?: string,
  error?: string,
  onBlur?: (event: any) => void,
  blur?: boolean
}

export const MySelect:FC<MySelectProps> = ({ 
  options, 
  value, 
  setValue, 
  onInputChange, 
  isMulti = false,
  placeholder,
  error,
  onBlur,
  blur
}) => {
  
  const handleChangeSelect = (newValue: any) => {
    setValue( isMulti? newValue.map((v: any) => v.value) : newValue.value);
  };
  const getValue = () => {
  
    if(value) {
      return isMulti
        ? options.filter((option: any) => value.indexOf(option.value) >=0 ) 
        : options.find((option:any) => option.value === value);
    } else {
      return isMulti ? [] : '';
    }
  };

  return (
    <div className={styles.wrapperSelect}>
      <Select 
        options={options} 
        className={styles.select}
        onChange={handleChangeSelect} 
        onBlur={onBlur}
        value={getValue()} 
        onInputChange={onInputChange} 
        isMulti={isMulti}
        placeholder={placeholder}
        classNamePrefix="custom-select"
      />
      {blur && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};