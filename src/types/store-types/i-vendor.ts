import { Action, Computed } from 'easy-peasy'

export interface IVendor {
  selectedVendor: any
  banks: any[]
  parsedSelectedVendor: Computed<this, object>

  setSelectedVendors: Action<this, object>
  setBanks: Action<this, any[]>
}
