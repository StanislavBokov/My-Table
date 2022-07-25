export  const getDate = (date: Date) => {
  let result = ''

  const normalizeDate = (number: number) => {
    if(number < 10) {
      return `0${number}`
    } else {
      return `${number}`
    }
  }
  result += `${normalizeDate(Number(date.getDate()))}.`
  result += normalizeDate(Number(date.getMonth()) +1)
  return result
};