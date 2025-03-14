import { GetRequest, PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";
import { Login, loginFromJson } from "@/model/login";
import { otpFromJson } from "@/model/otp";

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

export async function logout(token: string): Promise<any> {
  const response = await PostRequest({}, APIS.POST.logout, token);

  return response; // server response 204 with no body if success
}

export async function checkEmailExists(email: string): Promise<any> {
  const response = await GetRequest(
    `${APIS.GET.checkEmail}?email=${encodeURIComponent(email)}`
  );

  const data = otpFromJson(response);
  return data;
}

export async function confirmOtp(email: string, otp: string): Promise<any> {
  const response = await GetRequest(
    `${APIS.GET.confirmOtp}?email=${encodeURIComponent(
      email
    )}&otp=${encodeURIComponent(otp)}`
  );

  const data = otpFromJson(response);
  return data;
}
