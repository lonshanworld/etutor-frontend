import { GetRequest, PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";

export async function getStaffs(
  page: number = 1,
  search: string | null = null,
  filter: string | null = null
): Promise<any> {
  const baseurl = APIS.GET.getStaffList;

  // Construct query parameters
  const queryParams = new URLSearchParams();
  if (page) queryParams.append("page", page.toString());
  if (search) queryParams.append("search", search);
  if (filter) queryParams.append("filter", filter);

  // Construct the final URL
  const url = queryParams.toString()
    ? `${baseurl}?${queryParams.toString()}`
    : baseurl;

  const response = await GetRequest(url);
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
