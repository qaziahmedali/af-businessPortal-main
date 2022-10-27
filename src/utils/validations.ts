import { isValidPhoneNumber } from 'libphonenumber-js'

export const validateEmail = (email: string) => {
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
    return true
  } else {
    return false
  }
}

export const validatePhoneNumber = (number: string) => {
  const isValid = isValidPhoneNumber(number, 'PK')
  if (!isValid) {
    return false
  } else {
    // const { countryCallingCode, nationalNumber, number, country } = isValid;
    return true
  }
}

export const validatePassword = (pwd: string) => {
  // TODO: validate password with regex pattern
  return pwd.length > 0
}
