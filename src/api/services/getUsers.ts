import { User, userFromJson } from "@/model/user";
import { GetRequest } from "../general-api-services";
import { APIS } from "../api-constants";

export async function getTutors(page: number): Promise<User[]> {
  const response = await GetRequest(APIS.GET.getTutorList + page);

  console.log("tutor", response);
  return response.data;
}

export async function getStudents(page: number): Promise<User[]> {
  const response = await GetRequest(APIS.GET.getStudentList + page);

  console.log("student", response);
  return response.data;
}

export async function getStaffs(page: number): Promise<User[]> {
  const response = await GetRequest(APIS.GET.getStaffList + page);

  console.log("staff", response);
  return response.data;
}
