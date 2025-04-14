export interface ChatUserProfile {
    id : number;
    first_name ?: string;
    middle_name? : string | null;
    last_name? : string | null;
    date_of_birth? : string | null;
    email : string;
    nationality? : string | null;
    gender : string;
    address? : string | null;
    phone_number? : string | null;
    passport? : string | null;
    status? : string | null;
    role : {
        id : number;
        name : string;
    }
    profile_picture ? : string | null;
}

export function chatUserProfileFromJson(jsonData : any) : ChatUserProfile {
    return {
        id : jsonData.id,
        first_name : jsonData.first_name,
        middle_name : jsonData.middle_name,
        last_name : jsonData.last_name,
        date_of_birth : jsonData.date_of_birth,
        email : jsonData.email,
        nationality : jsonData.nationality,
        gender : jsonData.gender,
        address : jsonData.address,
        phone_number : jsonData.phone_number,
        passport : jsonData.passport,
        status : jsonData.status,
        role : {
            id : jsonData.role.id,
            name : jsonData.role.name,
        },
        profile_picture : jsonData.profile_picture,
    }
}