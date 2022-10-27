import { action, thunk } from 'easy-peasy'
import { apiManager } from '../utils/api-manager'
import { IStatement } from '../types/store-types'

const statement: IStatement = {
  statements: [],
  statementsWithDetail: [],
  curtMonth: null,
  curtYear: null,
  limit: 5,
  loading: false,
  loadingDetail: false,
  page: 1,
  totalMonthly: 0,

  setStatements: action((state, payload) => {
    state.statements = payload
  }),

  setStatementsWithDetail: action((state, payload) => {
    state.statementsWithDetail = payload
  }),

  setCurtMonth: action((state, payload) => {
    state.curtMonth = payload
  }),

  setCurtYear: action((state, payload) => {
    state.curtYear = payload
  }),

  setLoading: action((state, payload:boolean) => {
    state.loading = payload
  }),

  setLoadingDetail: action((state, payload:boolean) => {
    state.loadingDetail = payload
  }),

  setPage: action((state, payload:number) => {
    state.page = payload
  }),

  setTotalMonthly: action((state, payload:number) => {
    state.totalMonthly = payload
  }),

  getStatementMonth: thunk(
    async ({ setStatementsWithDetail, setCurtMonth, setLoadingDetail, setTotalMonthly }, { year, month }, { getState }) => {
      setLoadingDetail(true)
      try {
        month && setCurtMonth(month)
        setStatementsWithDetail([])

        const { curtMonth, curtYear, limit, page } = getState()

        const { data } = await apiManager.fetch({
          name: 'OrganizationGetVendorSettlements',
          queryParams: { year: year || curtYear, month: month || curtMonth, page, limit }
        })

        const response:any = data.data;

        setStatementsWithDetail(response?.settlements as any)
        setTotalMonthly(response?.total as number)
      } finally {
        // setisAppLoading(false)
        setLoadingDetail(false)
      }
    }
  ),

  getStatementYear: thunk(async ({ setStatements, setCurtYear, setLoading }, { year = new Date().getFullYear() }) => {
    setLoading(true)
    try {
      const { data } = await apiManager.fetch({
        name: 'OrganizationGetVendorSettlements',
        queryParams: { year }
      })

      setCurtYear(year)

      setStatements(data.data as any)
    } finally {
        setLoading(false)
      // setisAppLoading(false)
    }
    
  })
}

export default statement
