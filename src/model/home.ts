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
  subject: number;
  qualification: string | null;
  start_date: string | null;
  experience: number;
  email: string;
  phone_number: string | null;
  gender: string | null;
};

export function myTutorFromJson(jsonData: any): {
  myStudents: MyTutor;
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
