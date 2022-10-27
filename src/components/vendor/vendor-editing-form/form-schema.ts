import moment from 'moment'
import { validatePhoneNumber, validateEmail } from '../../../utils/validations'

const isValidPhoneNumber = (phone: string) => {
  // in this case, please validate in the view
  if (phone === '' || phone === null || phone === undefined) return true

  return validatePhoneNumber(phone) ? true : 'Please provide valid phone number!'
}

const isValidEmail = (email: string) => {
  // in this case, please validate in the view
  if (email === '' || email === null || email === undefined) return true

  return validateEmail(email) ? true : 'Please provide valid email!'
}

const isValidSalary = (salary: string) => {
  // in this case, please validate in the view
  if (!salary.includes("-") || parseInt(salary) > 0) return true
  else return "Salary amount must be greater than 0"
}

const isValidInputString = (description: string) => {
  const pattern = /^[a-zA-Z0-9_]*$/
  if (description.length <= 32 && pattern.test(description)) return true
  else return "Maximum 32 alphanumeric characters "
}

const isValidAlphanumeric = (string: string) => {
  const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/

  if(string == "" ) return true
  else return pattern.test(string) ? true : 'Please provide a valid Vendor ID!'
}

export const formSchema: any = {
  vendorId: {
    label: 'Vendor ID',
    placeholder: 'Vendor ID',
    // options: {
    //   validate: { isValidAlphanumeric }
    // }
  },
  // firstName: {
  //   placeholder: 'First Name',
  //   options: {
  //     required: 'Please fill out this field!'
  //   }
  // },

  name: {
    label: 'Vendor Name',
    placeholder: 'Vendor Name',
    options: {
      required: 'Please fill out this field!'
    }
  },

  // ntn: {
  //   placeholder: 'NTN',
  //   options: {
  //     required: 'Please fill out this field!'
  //   }
  // },

  payment: {
    label: 'Payment',
    placeholder: 'Payment',
    type: 'number',
    options: {
      required: 'Please fill out this field!'
    }
  },

  phoneNo: {
    label: 'Phone Number',
    placeholder: 'Phone Number',
    options: {
      validate: { isValidPhoneNumber }
    }
  },
  email: {
    label: 'Email',
    placeholder: 'Email',
    type: 'email',
    options: {
      validate: { isValidEmail }
    }
  },
  ntn: {
    label: 'NTN',
    placeholder: 'NTN/CNIC',
    type: 'number',
    options: {
      required: 'Please fill out this field!',
      validate: { isValidInputString }
    }
  },
  // dob: {
  //   label: 'date of birth',
  //   type: 'date',
  //   placeholder:"1/1/1950",
  //   default: moment("1/1/1970").format('YYYY-MM-DD'),
  //   max: moment().format('YYYY-MM-DD'),
  // },
  // dateOfJoining: {
  //   label: 'date of joining',
  //   type: 'date',
  //   max: moment().format('YYYY-MM-DD'),
  //   default: moment().format('YYYY-MM-DD')
  // },
  accountTitle: {
    label: 'Account Name',
    placeholder: 'Account title'
    // options: {
    //   required: 'Please fill out this field!'
    // }
  },
  accountNumber: {
    label: 'Account Number',
    placeholder: 'Bank account or IBAN',
    options: {
      required: 'Please fill out this field!',
      validate: { isValidInputString }
    }
  },
  // description: {
  //   placeholder: 'Description',
  //   type: 'string',
  //   options: {
  //     required: 'Please fill out this field!',
  //     validate: { isValidInputString }
  //   }
  // }
}
