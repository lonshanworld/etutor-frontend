export type MyStudent = {
  user_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string | null;
  profile_picture: string | null;
  email: string;
  phone_number: string | null;
};

export type MyStudentResponse = {
  data: MyStudent[];
};

export function myStudentsFromJson(jsonData: MyStudentResponse): {
  myStudents: MyStudent[];
} {
  return {
    myStudents: jsonData.data.map((student: any) => ({
      user_id: student.user_id,
      first_name: student.first_name,
      middle_name: student.middle_name,
      last_name: student.last_name,
      profile_picture: student.profile_picture,
      email: student.email,
      phone_number: student.phone_number,
    })),
  };
}

export type MyTutor = {
  user_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string | null;
  profile_picture: string | null;
  subject_name: string;
  qualification: string | null;
  // start_date: string | null;
  experience: number;
  email: string;
  phone_number: string | null;
  role_name: string;
  gender: string | null;
};

export function myTutorFromJson(jsonData: any): MyTutor | null {
  if (!jsonData || !jsonData.data) {
    return null;
  }

  const data = jsonData.data;
  return {
    user_id: data.user_id,
    first_name: data.first_name,
    middle_name: data.middle_name,
    last_name: data.last_name,
    profile_picture: data.profile_picture,
    subject_name: data.subject_name,
    qualification: data.qualification,
    experience: data.experience,
    email: data.email,
    phone_number: data.phone_number,
    role_name: data.role_name,
    gender: data.gender,
  };
}
