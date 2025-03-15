import { APIS } from "../api-constants";
import { GetRequest } from "../general-api-services";
import { Profile, profileFromJson } from "@/model/profile";

export async function getProfile(): Promise<Profile> {
  const response = await GetRequest(APIS.GET.getMyProfile);

  return profileFromJson(response);
}
