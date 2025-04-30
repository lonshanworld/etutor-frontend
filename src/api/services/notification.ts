import { isErrorModel } from "@/model/ErrorModel";
import { APIS } from "../api-constants";
import { GetRequest, PostRequest } from "../general-api-services";
import { Profile, profileFromJson } from "@/model/profile";

export async function getNotifications(): Promise<any> {
  const response = await GetRequest(APIS.GET.getNoti);

  if (isErrorModel(response)) {
    throw response;
  }
  return response;
}

export async function readNotification(
  body: any = {},
  id: number
): Promise<any> {
  const response = await PostRequest(body, APIS.POST.readNoti + "?" + id);
  return response;
}
