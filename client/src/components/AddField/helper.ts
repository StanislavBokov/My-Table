import { DataAddField, ErrorMessages } from "../../types/components/fields";

export const inputHelper = [
  { id: 1,name: "name", placeholder: "name", error: '' },
  { id: 2,name: "amount", placeholder: "amount", error: '' },
  { id: 3,name: "distance", placeholder: "distance", error: '' }
]

export const validate = (data:DataAddField, setErrors:any) => {
  const errors:any = {}
  if(!data.amount.value.match(/^\d+$/)) {
    errors.amount = `Only number`
  }
  if(!data.distance.value.match(/^\d+$/)) {
    errors.distance = `Only number`
  }
  for(const fieldName in data) {
    if(!data[fieldName].value) {
      errors[fieldName] = `${fieldName} is required`
    }
  }
  setErrors(errors)
};

export const isEmptyErrors = (errors: ErrorMessages) => {
  for(const field in errors) {
    if(errors[field].length) return true
  }
  return false
}