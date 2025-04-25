import { APIS } from "../api-constants";
import { PostRequest } from "../general-api-services";

export async function visitPage(route : string) : Promise<void>{
    console.log("check before sending page", route);
    const response = await PostRequest({}, APIS.POST.increasePageCount(route));
    console.log("checking visit page response", response);   
}

export async function visitBrowser(name : string) : Promise<void>{
    const response = await PostRequest({},APIS.POST.increaseBrowserCount(name));
    console.log("checking browser count response",response, name);
}