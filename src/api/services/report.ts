import { ReportActiveUser } from "@/model/reportActiveUser";
import { GetRequest } from "../general-api-services";
import { APIS } from "../api-constants";
import { isErrorModel } from "@/model/ErrorModel";
import { unassignedStudentFromJson, UnassignStudentModel } from "@/model/unassignStudentModel";


export async function getActiveUsers(currentPage : number) : Promise<any>{
    const response = await GetRequest(APIS.GET.getReportActiveUsers + `?page=${currentPage}`);
    if(isErrorModel(response)){
        throw response;
    }else{
        return response;
    }
}

export async function getBrowsersUsage() : Promise<any>{
    const response = await GetRequest(APIS.GET.getBrowsersUsage);
    console.log("Browsers Usage Response: ", response);
    if(isErrorModel(response)){
        throw response;
    }else{
        return response;
    }
}

export async function getViewPages() : Promise<any>{
    const response = await GetRequest(APIS.GET.getPageUsage);
    console.log("Page Usage Response: ", response);
    if(isErrorModel(response)){
        throw response;
    }else{
        return response;
    }
}


export async function getUnassignedStudents(currentPage : number, search? : string) : Promise<any>{
    const response = await GetRequest(APIS.GET.getUnassignedStudents + `?page=${currentPage}&search=${search ?? ""}`);
    console.log('check list response', response);
    if(isErrorModel(response)){
        throw response;
    }else{
        return response
    }
}

export async function getAllStudents(currentPage : number, search? : string) : Promise<any>{
    const response = await GetRequest(APIS.GET.getStudentList + `?page=${currentPage}&search=${search ?? ""}`);
    console.log('check list response', response);
    if(isErrorModel(response)){
        throw response;
    }else{
        return response
    }
}

export async function getChatMessageAll(currentPage : number, search? : string) : Promise<any>{
    const response = await GetRequest(APIS.GET.getChatMessageList + `?page=${currentPage}&search=${search ?? ""}`);
    if(isErrorModel(response)){
        throw response;
    }else{
        return response
    }
} 

export async function getChatMessageTutor(currentPage : number, search? : string) : Promise<any>{
    const response = await GetRequest(APIS.GET.getTutorList + `?page=${currentPage}&search=${search}`);
    if(isErrorModel(response)){
        throw response;
    }else{
        return {
            users : response.data,
            meta : response.meta,
        }
    }
} 

export async function getChatMessageStudent(currentPage : number, search? : string) : Promise<any>{
    const response = await GetRequest(APIS.GET.getStudentList + `?page=${currentPage}&search=${search}`);
    if(isErrorModel(response)){
        throw response;
    }else{
        return {
            users : response.data,
            meta : response.meta,
        }
    }
} 