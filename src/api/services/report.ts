import { ReportActiveUser } from "@/model/reportActiveUser";
import { GetRequest } from "../general-api-services";
import { APIS } from "../api-constants";
import { isErrorModel } from "@/model/ErrorModel";


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