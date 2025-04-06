import { GetRequest, PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";

export async function getStaffs(
  page: number = 1,
  name: string | null = null
): Promise<any> {
  const baseurl = APIS.GET.getStaffList;

  const geturl = () => {
    if (page && name) return baseurl + `?page=${page}&name=${name}`;
    if (page) return baseurl + `?page=${page}`;
    if (name) return baseurl + `?name=${name}`;
    return baseurl;
  };
  const URL = geturl();
  const response = await GetRequest(URL);
  console.log("res", response);
  return response;
}

export async function createStaff(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.POST.createStaff);
  return response;
}

export async function updateStaff(body: any, id: number): Promise<any> {
  const response = await PostRequest(body, APIS.PATCH.updateStaff(id));
  return response;
}

export async function deactivateStaff(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.PATCH.deactivateStudent);
  return response;
}
