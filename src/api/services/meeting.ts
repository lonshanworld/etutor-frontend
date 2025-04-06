import { isErrorModel } from "@/model/ErrorModel";
import { APIS } from "../api-constants";
import { GetRequest, PostRequest } from "../general-api-services";
import { myStudentFromJson } from "@/model/meeting";

export async function getMyStudents(tutorId: number): Promise<any> {
  const response = await GetRequest(APIS.GET.getMyStudents(tutorId));

  if (isErrorModel(response)) {
    throw response;
  }
  const data = myStudentFromJson(response);
  return data;
}

export async function getActiveMeeting(): Promise<any> {
  const response = await GetRequest(APIS.GET.getActiveMeetings);

  if (isErrorModel(response)) {
    throw response;
  }

  return response;
}

export async function getHistoryMeeting(): Promise<any> {
  const response = await GetRequest(APIS.GET.getHistoryMeetings);

  if (isErrorModel(response)) {
    throw response;
  }

  return response;
}

export async function createMeeting(): Promise<any> {
  const response = await PostRequest(APIS.POST.createMeeting);

  if (isErrorModel(response)) {
    throw response;
  }

  return response;
}
