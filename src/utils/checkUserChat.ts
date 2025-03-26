export function getOtherChatData(currentUserId : number, chat : {
        user1: {
            userId : number;
            firstName : string;
            middleName? : string | null;
            lastName? :string | null;
            email : string;
            role : string;
            profileImagePath? : string | null;
            gender? : string | null;
        };
        user2: {
            userId : number;
            firstName : string;
            middleName? : string | null;
            lastName? :string | null;
            email : string;
            role : string;
            profileImagePath? : string | null;
            gender? : string | null;
        };
    }) : {
        userId : number;
        firstName : string;
        middleName? : string | null;
        lastName? :string | null;
        email : string;
        role : string;
        profileImagePath? : string | null;
        gender? : string | null;
    } {
        if(chat.user1.userId === currentUserId){
            return chat.user2;
        }else{
            return chat.user1;
        }
    }

    export function getOwnChatData(currentUserId : number, chat : {
       
        user1: {
            userId : number;
            firstName : string;
            middleName? : string | null;
            lastName? :string | null;
            email : string;
            role : string;
            profileImagePath? : string | null;
            gender? : string | null;
        };
        user2: {
            userId : number;
            firstName : string;
            middleName? : string | null;
            lastName? :string | null;
            email : string;
            role : string;
            profileImagePath? : string | null;
            gender? : string | null;
        };
    }) : {
        userId : number;
        firstName : string;
        middleName? : string | null;
        lastName? :string | null;
        email : string;
        role : string;
        profileImagePath? : string | null;
        gender? : string | null;
    }{
        if(chat.user1.userId === currentUserId){
            return chat.user1;
        }else{
            return chat.user2;
        }
    }