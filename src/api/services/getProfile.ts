import { User, userFromJson } from "@/model/user";
import { APIS } from "../api-constants";
import { GetRequest } from "../general-api-services";

export async function getProfile(token: string): Promise<User> {
  const response = await GetRequest(APIS.GET.getMyProfile, token);

  return userFromJson(response);
}
