import { User, userFromJson } from "@/model/user";
import { PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";

export async function login(email: string, password: string): Promise<User> {
  const response = await PostRequest(
    {
      email: email,
      password: password,
    },
    APIS.POST.login
  );

  const data = userFromJson(response.data);
  return data;
}
