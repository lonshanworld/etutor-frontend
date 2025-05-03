import { isErrorModel } from "@/model/ErrorModel";
import { APIS } from "../api-constants";
import { GetRequest, PostRequest } from "../general-api-services";
import { Profile, profileFromJson } from "@/model/profile";

export async function getNotifications(page: number): Promise<any> {
  const response = await GetRequest(APIS.GET.getNoti + "?page=" + page);

  if (isErrorModel(response)) {
    throw response;
  }
  return response;
}

export async function readNotification(id: number): Promise<any> {
  const response = await PostRequest(null, APIS.POST.readNoti + "?uuid=" + id);
  console.log(APIS.POST.readNoti + "?uuid=" + id);
  return response;
}
