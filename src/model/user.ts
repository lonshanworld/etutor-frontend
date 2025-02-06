export type User = {
    id : number;
    firstName? : string;
    middleName? : string;
    lastName? : string;
    email : string;
    profileImagePath? : string;
    role : UserRole;
}

export enum UserRole {
    "student",
    "tutor",
    "staff",
}