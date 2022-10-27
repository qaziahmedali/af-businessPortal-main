import { Action, Thunk } from 'easy-peasy'
import { IStoreModel } from './i-store'

export interface IStatement {
  statements: any[]
  statementsWithDetail: any[]
  curtMonth: number | null
  curtYear: number | null
  limit: number
  loading: boolean
  loadingDetail: boolean
  page: number
  totalMonthly: number

  setStatements: Action<this, any[]>
  setStatementsWithDetail: Action<this, any[]>
  setCurtMonth: Action<this, number | null>
  setCurtYear: Action<this, number | null>
  setPage: Action<this, number | null>
  setLoadingDetail: Action<this, boolean | null>
  setLoading: Action<this, boolean | null>
  setTotalMonthly: Action<this, number | null>

  getStatementYear: Thunk<this, IStatementPayload, any, IStoreModel>
  getStatementMonth: Thunk<this, IStatementPayload, any, IStoreModel>
}
export interface IStatementPayload {
  year?: number
  month?: number
  page?: number
  limit?: number
}
