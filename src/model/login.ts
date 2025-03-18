export type Login = {
  message: string;
  errorMessage?: string;
  token?: string;
};

export function loginFromJson(jsonData: any) : Login {
  const login: Login = {
    message: jsonData.message,
    errorMessage: jsonData.errorMessage,
    token: jsonData.token,
  };

  return login;
}
