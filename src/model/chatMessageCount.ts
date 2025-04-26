
export interface ChatMessageCount {
    id : number,
    first_name: string,
    middle_name?: string | null,
    last_name? : string | null,
    email : string ,
    role? : {
        id ?: number | null,
        name? : string | null,
    },
    message_count : number,
};

export function chatMessageCountFromJson(jsonData : any) : any {
    return  {
        id : jsonData.id,
        first_name: jsonData.first_name,
        middle_name: jsonData.middle_name,
        last_name : jsonData.last_name,
        email : jsonData.email,
      
        role : {
            id: jsonData.role.id,
            name : jsonData.role.name,
        },
    };
}