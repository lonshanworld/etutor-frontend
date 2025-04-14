import { GetRequest, PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";
import { User } from "@/model/user";

export async function getStudents(
  page: number = 1,
  search: string | null = null,
  filter: string | null = null
): Promise<any> {
  const baseurl = APIS.GET.getStudentList;

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

export async function createStudent(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.POST.createStudent);
  return response;
}

export async function updateStudent(body: any, id: number): Promise<any> {
  const response = await PostRequest(body, APIS.PATCH.updateStudent(id));
  return response;
}

export async function deactivateStudent(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.PATCH.deactivateStudent);
  return response;
}

export async function getMajors(): Promise<any> {
  const response = await GetRequest(APIS.GET.getMajors);
  return response;
}
