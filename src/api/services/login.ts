import { PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";
import { Login, loginFromJson } from "@/model/login";

export async function login(email: string, password: string): Promise<Login> {
  const response = await PostRequest(
    {
      email: email,
      password: password,
    },
    APIS.POST.login
  );

  const data = loginFromJson(response);
  return data;
}
