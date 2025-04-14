import { ErrorModel, isErrorModel } from "@/model/ErrorModel";
import { APIS } from "../api-constants";
import { ChatFilePostFormDataRequest, GetRequest } from "../general-api-services";
import { ChatUserProfile, chatUserProfileFromJson } from "@/model/chatUserProfile";

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

export async function getChatProfileById(id : number) : Promise<ChatUserProfile> {
    const response = await GetRequest(APIS.GET.getChatProfile(id));
    if(isErrorModel(response)){
        throw response;
    }

    return chatUserProfileFromJson(response.data);
}