import { GetRequest, PostRequest } from "../general-api-services";
import { APIS } from "../api-constants";

export async function getTutors(
  page: number = 1,
  name: string | null = null
): Promise<any> {
  const baseurl = APIS.GET.getTutorList;

  const geturl = () => {
    if (page && name) return baseurl + `?page=${page}&name=${name}`;
    if (page) return baseurl + `?page=${page}`;
    if (name) return baseurl + `?name=${name}`;
    return baseurl;
  };
  const URL = geturl();
  const response = await GetRequest(URL);
  return response;
}

export async function createTutor(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.POST.createTutor);
  return response;
}

export async function updateTutor(body: any, id: number): Promise<any> {
  const response = await PostRequest(body, APIS.PATCH.updateTutor(id));
  return response;
}

export async function deactivateTutor(body: any): Promise<any> {
  const response = await PostRequest(body, APIS.PATCH.deactivateTutor);
  return response;
}

export async function getSubjects(): Promise<any> {
  const response = await GetRequest(APIS.GET.getSubjects);
  return response;
}
