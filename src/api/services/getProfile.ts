import { isErrorModel } from "@/model/ErrorModel";
import { APIS } from "../api-constants";
import { GetRequest, PostRequest } from "../general-api-services";
import { Profile, profileFromJson } from "@/model/profile";

export async function getProfile(): Promise<Profile> {
  const response = await GetRequest(APIS.GET.getMyProfile);

  if (isErrorModel(response)) {
    throw response;
  }
  console.log("profile res", response);
  const data = profileFromJson(response);
  return data;
}

export async function getProfileById(userId: number): Promise<Profile> {
  const response = await GetRequest(APIS.GET.getProfile(userId));

  if (isErrorModel(response)) {
    throw response;
  }
  const data = profileFromJson(response);
  return data;
}

export async function changePassword(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.POST.changePassword);

  return response;
}

export async function updateProfile(body: FormData): Promise<any> {
  const response = await PostRequest(body, APIS.POST.updateProfile);
  return response;
}
