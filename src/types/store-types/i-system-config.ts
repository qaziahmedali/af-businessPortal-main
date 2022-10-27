import { AbhiResponse } from "@/utils/api-manager/responses";
import { AxiosResponse } from "axios";
import { Action, Thunk } from "easy-peasy";
import { IStoreModel } from ".";

export interface IJsonConfig {}
export interface IJsonConfigPrivate {
  systemDown: boolean,
  systemDownMessage: string,
  systemDownWhiteList: string[],
  announcement: string | null,
}

export interface ISystemConfigurationResponse {
  jsonConfig: IJsonConfig,
  jsonConfigPrivate: IJsonConfigPrivate,
}

export interface ISystemConfiguration {
  configuration: ISystemConfigurationResponse | null,
  getSystemConfiguration: Thunk<this, void, void, IStoreModel, Promise<AxiosResponse<AbhiResponse<ISystemConfigurationResponse>>>>;
  setSystemConfiguration: Action<this, ISystemConfigurationResponse>;
  removeAnnouncement: Action<this>;
}