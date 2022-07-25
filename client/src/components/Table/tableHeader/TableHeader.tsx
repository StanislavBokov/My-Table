import { FC } from 'react';
import styles from './styles.module.scss';
import { headerHelper } from './TableHeader.helper';
import { chevron } from '../../../assets/icons';
import cn from 'clsx';

interface TableHeaderProps {
    handleSortBy: (head: string) => void,
    path: string,
    order: string
}
export const TableHeader:FC<TableHeaderProps> = ({ handleSortBy, path, order }) => {
    
  const sortedItems = (head: string) => {
    if(head !== 'date' && head) return true // Показываем chevron только для полей name, amount, distance
  }
  return ( 
    <div className={styles.thead}>
      {headerHelper.map(({ id, head }) => (
        <div key={id} className={styles.th}  onClick={() => handleSortBy(head)}>{head}
          {(path === head) && sortedItems(head) &&  <img src={chevron} alt="chevronImg" className={cn(styles.chevron, { [styles.chevronActive]: order === 'asc' })}/>}
        </div>
      ))}
    </div>
  )
}