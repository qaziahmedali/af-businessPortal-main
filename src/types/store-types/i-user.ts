import { ServiceConfigJson } from '@/utils/api-manager/types'
import { Action, Thunk } from 'easy-peasy'
import { IStoreModel } from './i-store'

export interface IUser {
  loggedIn: boolean
  me: any
  token: string
  organizationManagementRole: string

  setUserData: Action<this, IEmployee>
  setRole: Action<this, IRole>
  setToken: Action<this, string>
  setLoggedIn: Action<this, boolean>

  login: Thunk<this, IAuthPayload, any, IStoreModel>
  logout: Action<this>
  fetchMe: Thunk<this, undefined, {}, IStoreModel, Promise<void>>
}
export interface IAuthPayload {
  username: string
  password: string
  rememberMe: boolean
}
export interface IRole {
  organizationManagementRole: string
}
export interface IUserData {
  data: any,
  token: string
}

export interface IDepartment {}

export interface IDesignation {
  designation: string
}

export interface IBankAccount {}

export interface IOrganizationEmployeeConfiguration {}

export interface IOfficialEmail {
  email: string
  contactType: string
}

export interface IOfficialPhone {
  phone: string
  contactType: string
}

export interface IPerson {}

export interface IUserInfo {
  username: string
  identifier: string
}

export interface IOrganization {
  id: string
  name: string
}

export type TOrganizationEmployeesConfigurations = IOrganizationEmployeeConfiguration[]

export interface IEmployee {
  id: string
  createdById: string
  createdAt: string
  updatedById: string
  updatedAt: string
  deletedDate: string | null
  employeeCode: string
  employeeBadge: string
  dataOfJoining: string
  designationId: string
  departmentId: string
  organizationId: string
  netSalary: string
  providentFund: string
  personId: string
  officialEmailId: string
  officialPhoneId: string
  selectedBankAccountId: string
  version: number
  department: IDepartment
  designation: IDesignation
  selectedBankAccount: IBankAccount
  organizationEmployeesConfigurations: TOrganizationEmployeesConfigurations
  officialEmail: IOfficialEmail
  officialPhone: IOfficialPhone
  person: IPerson
  user: IUserInfo
  organization: IOrganization
}

export interface IFetchUserAPIResult {
  serviceConfigurations: {
    jsonConfig: ServiceConfigJson
  },
  employee: IEmployee
}