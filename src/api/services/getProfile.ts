import { APIS } from "../api-constants";
import { GetRequest, PostRequest } from "../general-api-services";
import { Profile, profileFromJson } from "@/model/profile";

// export async function getProfile(token: string): Promise<Profile> {
//   const response = await GetRequest(APIS.GET.getMyProfile, token);
export async function getProfile(): Promise<Profile> {
  const response = await GetRequest(APIS.GET.getMyProfile);

  return profileFromJson(response);
}

export async function changePassword(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.POST.changePassword);

  return response;
}
