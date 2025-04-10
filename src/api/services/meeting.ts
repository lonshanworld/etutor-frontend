import { isErrorModel } from "@/model/ErrorModel";
import {
  MeetingJsonData,
  meetingsFromJson,
  newMeetingFromJson,
} from "@/model/meeting";
import { APIS } from "../api-constants";
import { GetRequest, PostRequest } from "../general-api-services";

export async function getActiveMeetings(): Promise<MeetingJsonData> {
  const response = await GetRequest(APIS.GET.getActiveMeetings);

  if (isErrorModel(response)) {
    throw response;
  }

  const data = meetingsFromJson(response);
  return data;
}

export async function getHistoryMeetings(): Promise<MeetingJsonData> {
  const response = await GetRequest(APIS.GET.getHistoryMeetings);

  if (isErrorModel(response)) {
    throw response;
  }

  const data = meetingsFromJson(response);
  return data;
}

export async function createMeeting(formData: any): Promise<any> {
  const response = await PostRequest(formData, APIS.POST.createMeeting);
  console.log("res", response);

  if (isErrorModel(response)) {
    throw response;
  }
  const data = newMeetingFromJson(response);
  return data;
}
