import { GetRequest } from "../general-api-services";
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
