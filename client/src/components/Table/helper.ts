import { getDate } from "../../utils/getDate"

export const filteredData = (column: string, condition: string, valueFilter: string, tableData: any) => {
   
  if(column === "date") {
    if(condition === "Contain") {
      return tableData.filter((item: any) => getDate(new Date(Date.parse(item.createdAt))).includes(valueFilter))
    }
    if(condition === "Equal") {
      return tableData.filter((item: any) => getDate(new Date(Date.parse(item.createdAt))) === valueFilter)
    }
    if(condition === "More") {
      
      return tableData.filter((item: any) => {
        const tableDataArr = (item.createdAt).split('-')
        const tableMonth = tableDataArr[1]
        const tableDay = tableDataArr[2].split('T')[0]
          
        const valueDataArr = valueFilter.split('.')
        const valueMonth = valueDataArr[1]
        const valueDay = valueDataArr[0]
          
        if(Number(tableMonth) > Number(valueMonth)) return true
        if(Number(tableMonth) === Number(valueMonth)) return Number(tableDay) > Number(valueDay)
      })
    }
    if(condition === "Less") {
      return tableData.filter((item: any) => {
        const tableDataArr = (item.createdAt).split('-')
        const tableMonth = tableDataArr[1]
        const tableDay = tableDataArr[2].split('T')[0]

        const valueDataArr = valueFilter.split('.')
        const valueMonth = valueDataArr[1]
        const valueDay = valueDataArr[0]
          
        if(Number(tableMonth) < Number(valueMonth)) return true
        if(Number(tableMonth) === Number(valueMonth))   return Number(tableDay) < Number(valueDay)
      })
    }
  }

  if(condition === "Equal") {
    if(column === "name") {
      return tableData.filter((item: any) => item[column] === valueFilter)
    } else {
      return tableData.filter((item: any) => item[column] === Number(valueFilter))
    }
     
  } else if(condition === "More") {
    return tableData.filter((item: any) => item[column] > valueFilter)
  }
  else if(condition === "Less") {
    return tableData.filter((item: any) => item[column] < valueFilter)
  }
  else if(condition === "Contain") {
    return tableData.filter((item: any) => item[column].toString().includes(valueFilter))
  }
   
}
