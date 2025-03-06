export type Login = {
  message: string;
  data?: any[];
  token?: string;
};

export function loginFromJson(jsonData: any): Login {
  const data: Login = {
    message: jsonData.message,
    token: jsonData.token,
    data: jsonData.data || [],
  };

  return data;
}
