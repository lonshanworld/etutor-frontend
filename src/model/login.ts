export type Login = {
  message: string;
  token?: string;
};

export function loginFromJson(jsonData: any) {
  const data: Login = {
    message: jsonData.message,
    token: jsonData.token,
  };

  return data;
}
