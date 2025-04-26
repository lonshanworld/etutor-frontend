import { isErrorModel } from "@/model/ErrorModel";
import { APIS } from "../api-constants";
import { GetRequest } from "../general-api-services";
import { getLastActivityAgo } from "@/utils/datetime";

export async function getLastActiveAgo(id : number) : Promise<string>{
    const response = await GetRequest(APIS.GET.getSessionLogByUserId(id));
    if(isErrorModel(response)){
        throw response;
    }else{
        return getLastActivityAgo(response.data[0]);
    }
}