import { isErrorModel } from "@/model/ErrorModel";
import {
  MeetingJsonData,
  meetingsFromJson,
  newMeetingFromJson,
} from "@/model/meeting";
import { APIS } from "../api-constants";
import { GetRequest, PostRequest } from "../general-api-services";

export async function getActiveMeetings(
  userId: number
): Promise<MeetingJsonData> {
  const response = await PostRequest(
    {
      user_id: userId,
    },
    APIS.POST.getActiveMeetings
  );

  if (isErrorModel(response)) {
    throw response;
  }

  const data = meetingsFromJson(response);
  return data;
}

export async function getHistoryMeetings(
  userId: number
): Promise<MeetingJsonData> {
  const response = await PostRequest(
    {
      user_id: userId,
    },
    APIS.POST.getHistoryMeetings
  );

  if (isErrorModel(response)) {
    throw response;
  }

  const data = meetingsFromJson(response);
  return data;
}

export async function createMeeting(formData: any): Promise<any> {
  const response = await PostRequest(formData, APIS.POST.createMeeting);

  if (isErrorModel(response)) {
    throw response;
  }
  const data = newMeetingFromJson(response);
  return data;
}
