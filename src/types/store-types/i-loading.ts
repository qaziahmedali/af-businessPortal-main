import { Action } from 'easy-peasy'

export interface ILoading {
  isAppLoading: boolean
  loadingBackgroundColor: string

  setisAppLoading: Action<this, boolean>
  setLoadingBackgroundColor: Action<this, string>
}
