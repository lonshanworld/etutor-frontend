export type Login = {
  message: string;
  errorMessage?: string;
  token?: string;
};

export function loginFromJson(jsonData: any) {
  const login: Login = {
    message: jsonData.message,
    errorMessage: jsonData.errorMessage,
    token: jsonData.token,
  };

  return login;
}
