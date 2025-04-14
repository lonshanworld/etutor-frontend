import { isErrorModel } from "@/model/ErrorModel";
import { MyStudent, myStudentsFromJson, myTutorFromJson } from "@/model/home";
import { APIS } from "../api-constants";
import { GetRequest, PostRequest } from "../general-api-services";

export async function getMyStudents(
  userId: number
): Promise<{ myStudents: MyStudent[] }> {
  const response = await PostRequest(
    {
      user_id: userId,
    },
    APIS.POST.getMyStudents
  );

  if (isErrorModel(response)) {
    throw response;
  }
  const data = myStudentsFromJson(response);
  return data;
}

export async function getMyTutor(userId: number): Promise<any> {
  const response = await PostRequest(
    {
      user_id: userId,
    },
    APIS.POST.getMyTutor
  );
  if (isErrorModel(response)) {
    throw response;
  }

  const data = myTutorFromJson(response);
  return data;
}
