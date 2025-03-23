export type StudentInfo = {
  studentId: number;
  majorId: number;
  currentYear: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  enrollmentDate: string;
  graduationDate: string;
};

export type TutorInfo = {
  tutorId: number;
  experience: number;
  qualifications: string;
  subjectId: 3;
};

export type StaffInfo = {
  staffId: number;
  emergencyContactName: string;
  emergencyContactPhone: string;
  endDate: string;
  startDate: string;
};

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
  profileImagePath?: string;
  passport?: string;
  status: string;
  roleID?: string;
  role?: string;
  info: any;
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
    profileImagePath: data.image_id,
    passport: data.passport,
    status: data.status,
    roleID: data.role?.id,
    role: data.role?.name === "admin" ? "staff" : data.role?.name,
    info: data.staff || data.admin || data.student || data.tutor || null,
  };

  return profile;
}
