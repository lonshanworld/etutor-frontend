import { GetRequest, PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";
import { Login, loginFromJson } from "@/model/login";
import { otpFromJson, resetPasswordFromJson } from "@/model/resetPassword";
import { isErrorModel } from "@/model/ErrorModel";

export async function login(email: string, password: string): Promise<Login> {
  const response = await PostRequest(
    {
      email: email,
      password: password,
    },
    APIS.POST.login
  );

  if (isErrorModel(response)) {
    throw response;
  }
  const data = loginFromJson(response);
  return data;
}

export async function logout(): Promise<any> {
  const response = await PostRequest({}, APIS.POST.logout);

  return response; // server response 204 with no body if success
}

export async function checkEmailExists(email: string): Promise<any> {
  const response = await GetRequest(
    `${APIS.GET.checkEmail}?email=${encodeURIComponent(email)}`
  );

  if (isErrorModel(response)) {
    throw response;
  }

  const data = otpFromJson(response);
  return data;
}

export async function confirmOtp(email: string, otp: string): Promise<any> {
  const response = await GetRequest(
    `${APIS.GET.confirmOtp}?email=${encodeURIComponent(
      email
    )}&otp=${encodeURIComponent(otp)}`
  );

  if (isErrorModel(response)) {
    throw response;
  }

  const data = otpFromJson(response);
  return data;
}

export async function resetPassword(
  email: string,
  password: string,
  passwordConfirm: string,
  otp: string
): Promise<any> {
  const response = await PostRequest(
    {
      email: email,
      password: password,
      password_confirmation: passwordConfirm,
      otp: otp,
    },
    APIS.PATCH.updatePassword
  );

  if (isErrorModel(response)) {
    throw response;
  }

  const data = resetPasswordFromJson(response);
  return data;
}
