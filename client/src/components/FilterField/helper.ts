export const optionColumn = [
  { value: "date", label:"date" }, 
  { value:"name", label:"name" }, 
  { value:"amount", label:"amount" }, 
  { value:"distance", label:"distance"
  }];
export const optionCondition = [
  { value: "Equal", label:"Equal" }, 
  { value:"Contain", label:"Contain" }, 
  { value:"More", label:"More" }, 
  { value:"Less", label:"Less"
  }];

export const validate = (selectColumn: string, selectCondition: string, valueForFilter: string, setErrors: any ) => {
  const data:any = {
    selectColumn,
    selectCondition,
    valueForFilter
  }
  const errors:any = {}
  if(selectColumn === "date" && !valueForFilter.match(/\d{2}.\d{2}/)) {
    errors.valueForFilter = `Format MM-DD`
  }
  if(selectColumn === "name" && (selectCondition === "More" ||  selectCondition === "Less")) {
    errors.selectCondition = `You need select Contain`
  }
  if((selectColumn === "amount" || selectColumn === "distance") && !valueForFilter.match(/^\d+$/)) {
    errors.valueForFilter = `Only number`
  }
  for(const fieldName in data) {
    if(!data[fieldName]) {
      errors[fieldName] = `${fieldName} is required`
    }
  }
  setErrors(errors)
};

export const isEmptyErrors = (errors: any) => {
  for(const field in errors) {
    if(errors[field].length) return true
  }
  return false 
}