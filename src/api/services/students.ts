import { GetRequest, PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";
import { User } from "@/model/user";

export async function getStudents(
  page: number = 1,
  name: string | null = null
): Promise<any> {
  const baseurl = APIS.GET.getStudentList;

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
