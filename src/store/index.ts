import { createStore } from 'easy-peasy'

import { IStoreModel } from '../types/store-types'
import user from './user.store'
import loadingStore from './loading.store'
import vendor from './vendor.store'
import statement from './statement.store'
import { systemConfiguration } from './system-config.store'

export const store = createStore<IStoreModel>({
  user: user,
  loader: loadingStore,
  vendor,
  statement,
  systemConfiguration,
})
