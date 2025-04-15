import { GetRequest, PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";

export async function getTutors(
  page: number = 1,
  search: string | null = null,
  filter: string | null = null
): Promise<any> {
  const baseurl = APIS.GET.getTutorList;

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

export async function updateTutor(body: any, id: number): Promise<any> {
  const response = await PostRequest(body, APIS.PATCH.updateTutor(id));
  return response;
}

export async function createTutor(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.POST.createTutor);
  return response;
}


export async function deactivateTutor(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.PATCH.deactivateStudent);
  return response;
}

export async function getSubjects(): Promise<any> {
  const response = await GetRequest(APIS.GET.getSubjects);
  return response;
}
