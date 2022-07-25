import React, { ChangeEvent } from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';

interface InputProops {
    value: string,
    name: string,
    placeholder?: string;
    error?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string,
    onBlur?: (evevnt: ChangeEvent<HTMLInputElement>) => void,
    blur?: boolean,
    id: number | string
}

export const Input:React.FC<InputProops> = ({ 
  value, 
  name,
  placeholder,
  error,
  onChange,
  className,
  onBlur,
  blur,
  id
}) => {

  return (
    <div className={cn(styles.wrapperInput, className)}>
      <label htmlFor={`${id}`}>
        <span className={cn(styles.span,  { [styles.isValue]: value }, { [styles.error]:error && blur } )}>{placeholder}</span>
        <input 
          id={`${id}`}
          type="text"
          value={value} name={name} onChange={onChange} 
          className={cn(styles.Input, { [styles.error]:error && blur })} 
          autoComplete="off"
          onBlur={onBlur}
        />
        {blur && <span className={styles.errorMessage}>{error}</span>}
      </label>
    </div>
  );
};