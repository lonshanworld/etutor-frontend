import { ErrorModel, isErrorModel } from "@/model/ErrorModel";
import { APIS } from "../api-constants";
import { ChatFilePostFormDataRequest } from "../general-api-services";

export async function sendChatFiles(formData : FormData) : Promise<string[]>{
    const response = await ChatFilePostFormDataRequest(formData, APIS.POST.uploadAttachment );
    if(isErrorModel(response)){
        throw response;
    }

    const pathList : string[] = [];
    console.log("check respone", response);
    response.data.forEach((item : any) => {
        console.log("check item", item);
        pathList.push(item.path);
    })
    console.log("checking path list", pathList);
    return pathList;
}