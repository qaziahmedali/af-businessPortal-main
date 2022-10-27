import { ISystemConfiguration, ISystemConfigurationResponse } from "@/types/store-types";
import { apiManager } from "@/utils/api-manager";
import { AbhiResponse } from "@/utils/api-manager/responses";
import { AxiosResponse } from "axios";
import { action, thunk } from "easy-peasy";

export const systemConfiguration: ISystemConfiguration = {
  configuration: null,
  getSystemConfiguration: thunk(async ({ setSystemConfiguration }) => {
    const response: AxiosResponse<AbhiResponse<ISystemConfigurationResponse>> = await apiManager.fetch<ISystemConfigurationResponse>({
      name: "GetSystemConfiguration"
    });
    setSystemConfiguration(response.data.data);
    return response;
  }),
  setSystemConfiguration: action((state, config) => {
    state.configuration = config;
  }),
  removeAnnouncement: action(state => {
    if (state.configuration) {
      state.configuration.jsonConfigPrivate.announcement = null;
    }
  })
}
