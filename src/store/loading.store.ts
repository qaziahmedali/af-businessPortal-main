import { action } from 'easy-peasy'
import { ILoading } from '../types/store-types'

const DEFAULT_BG_COLOR = 'rgba(0,0,0,0.5)'

const loading: ILoading = {
  isAppLoading: false,
  loadingBackgroundColor: DEFAULT_BG_COLOR,

  setisAppLoading: action((state, payload) => {
    state.isAppLoading = payload
    if (!payload) {
      // reset loading backgroundColor
      state.loadingBackgroundColor = DEFAULT_BG_COLOR
    }
  }),

  setLoadingBackgroundColor: action((state, payload) => {
    state.loadingBackgroundColor = payload
  })
}

export default loading
