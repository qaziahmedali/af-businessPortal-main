import { IStatement } from './i-statement';
import { IUser, ILoading, ISystemConfiguration } from '.'
import { IVendor } from './i-vendor'

export interface IStoreModel {
  user: IUser
  loader: ILoading
  vendor: IVendor
  statement: IStatement
  systemConfiguration: ISystemConfiguration
}
