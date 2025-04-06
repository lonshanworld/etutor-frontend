import { PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";

export async function allocateStudent(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.POST.allocateStudent);
  return response;
}

export async function unassignedStudent(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.POST.unassignStudent);
  return response;
}
