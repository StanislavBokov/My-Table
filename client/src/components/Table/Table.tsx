import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { TableHeader } from './tableHeader/TableHeader';
import { TableBody } from './tableBody/TableBody';
import { Pagination } from '../Pagination';
import { paginate } from '../../utils/paginate';
import { useSelector, RootStateOrAny } from 'react-redux';
import { filteredData } from './helper';

export const Table:FC = () => {

  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  const { TableData, loading } = useSelector((state:RootStateOrAny) => state.table);
  const { selectColumn, selectCondition, valueForFilter, isFiltered  } = useSelector((state:RootStateOrAny) => state.filter);

  const handleSortBy = (head: string) => { 
    if((head === 'date') || head === '' ) return // Не сортируем поле даты 

    sortBy.order !== 'asc' 
      ? setSortBy({ path: head, order:"asc" })
      : setSortBy({ path: head, order:"desc" }) // Записываем по каким данным будет происходить сортировка
  }
  const cloneArr = [...TableData] // Клонируем данные из стора для сортировки

  const sortedDataArray = () => {
    return cloneArr?.sort((a: any, b: any) => {

      return sortBy.order === "asc" 
        ? a[sortBy.path] > b[sortBy.path] ? 1 : -1
        : a[sortBy.path] < b[sortBy.path] ? 1 : -1
    })
  }

  const isFilteredData = isFiltered // Если мы находимся в сессии фильтрации, тогда отдаем функцию которая возвращает отфильтрованный массив
    ? filteredData(selectColumn, selectCondition, valueForFilter, sortedDataArray()) 
    : sortedDataArray()

  const slicedDataArray = paginate(isFilteredData, currentPage, pageSize ) 

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  if(!loading && loading !== null) { 
    if(!slicedDataArray.length) {
      if(currentPage !== 1) {
        setCurrentPage((prevState: number) => prevState - 1)  // Меняем текущую страницу на предыдущую, в случае удаления последнего элемента на странице
      }  
    }
  }
  
  return ( 
    <>
      <div className={styles.table}>
        <TableHeader 
          handleSortBy={handleSortBy}
          path={sortBy.path}  
          order={sortBy.order}
        />
        <TableBody 
          slicedDataArray={slicedDataArray}
        />
        {isFilteredData.length > pageSize && <Pagination // Не показываем пагинацию если кол-во элементов хватает только на одну страницу
          pageSize={pageSize} 
          currentPage={currentPage}
          changePage={changePage}
          length={isFilteredData.length}
        />}
      </div>    
    </>
       
  )
}