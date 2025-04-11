import { isErrorModel } from "@/model/ErrorModel";
import { MyStudent, myStudentsFromJson, myTutorFromJson } from "@/model/home";
import { APIS } from "../api-constants";
import { GetRequest } from "../general-api-services";

export async function getMyStudents(): Promise<{ myStudents: MyStudent[] }> {
  const response = await GetRequest(APIS.GET.getMyStudents);

  if (isErrorModel(response)) {
    throw response;
  }
  const data = myStudentsFromJson(response);
  return data;
}

export async function getMyTutor(): Promise<any> {
  const response = await GetRequest(APIS.GET.getMyTutor);
  if (isErrorModel(response)) {
    throw response;
  }

  const data = myTutorFromJson(response);
  return data;
}
