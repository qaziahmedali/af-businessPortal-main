import { action, computed } from 'easy-peasy'
import { IVendor } from '../types/store-types'

const vendor: IVendor = {
  banks: [],
  selectedVendor: {},
  parsedSelectedVendor: computed((state) => ({
    phoneNo: state.selectedVendor?.phoneNo || '',
    email: state.selectedVendor.email || '',
    name: state.selectedVendor?.name || '',
    ntn: state.selectedVendor?.ntn || '',
    vendorId: state.selectedVendor.vendorId || '',
    accountBank: state.selectedVendor.selectedBankAccount?.bankId || '',
    accountBankName: state.selectedVendor.selectedBankAccount?.bank.bankName || 'None',
    accountTitle: state.selectedVendor.selectedBankAccount?.accountTitle || '',
    accountNumber: state.selectedVendor.selectedBankAccount?.accountNumber || '',
    payment: state.selectedVendor?.payment,
    selectAccountBankID: state.selectedVendor?.selectedBankAccountId
  })),

  setSelectedVendors: action((state, payload) => {
    state.selectedVendor = payload
  }),

  setBanks: action((state, payload) => {
    state.banks = payload
  })
}

export default vendor
