export type Profile = {
  id: number;
  firstName?: string; // not null
  middleName?: string; // not null
  lastName?: string; // not null
  dateOfBirth?: string; // not null
  email: string; // not null
  nationality?: string;
  gender?: string;
  address?: string;
  phoneNumber?: string;
  //   profileImagePath?: string;
  passport?: string;
  status?: string;
  roleID?: string;
  role?: string;
};

export function profileFromJson(jsonData: any): Profile {
  const data = jsonData.data;

  const profile: Profile = {
    id: data.id,
    firstName: data.first_name,
    middleName: data.middle_name,
    lastName: data.last_name,
    dateOfBirth: data.date_of_birth,
    email: data.email,
    nationality: data.nationality,
    gender: data.gender,
    address: data.address,
    phoneNumber: data.phone_number,
    passport: data.passport,
    status: data.status,
    roleID: data.role?.id,
    role: data.role?.name,
  };

  return profile;
}
