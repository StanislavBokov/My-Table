export const isEmptyErrors = (errors:any) => {
  for(const field in errors) {
    if(errors[field]) return true
  }
  return false
}
export const validate = (data:any, setErrors:any) => { // Валидируем только на число, поля можно оставлять пустыми
  const errors:any = {}

  if(!data.amount.toString().match(/^\d+$/) && data.amount) {
    errors.amount = true
  }
  if(!data.distance.toString().match(/^\d+$/) && data.distance) {
    errors.distance = true
  }
  setErrors(errors)
};