import { formatName } from "@/utils/formatData";

export interface ReportActiveUser {
    userId : number;
    name : string;
    email : string;
    visit_count : number;
}

export function reportActiveUserFromJson(jsonData : any) : ReportActiveUser{
    return {
        userId : jsonData.user.id,
        name : formatName(jsonData.user.first_name, jsonData.user.middle_name, jsonData.user.last_name),
        email : jsonData.user.email,
        visit_count : jsonData.visit_count
    }
}

