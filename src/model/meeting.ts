import { formatName } from "@/utils/formatData";

export type Participant = {
  id: number;
  name: string;
  email: string;
};

export type Creator = Participant & {
  profile_picture: string | null;
};

export type Meeting = {
  id: number;
  creator_id: number;
  subject: string;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:MM:SS
  type: "In-Person" | "Online";
  location: string | null;
  platform: string | null;
  link: string | null;
  creator: Creator;
  participants: Participant[];
};

export type MeetingList = Meeting[];

export function myStudentFromJson(jsonData: any): any {
  return {
    myStudent: jsonData.data.map((student: any) => ({
      studentId: student.id,
      userId: student.user_id,
      name: formatName(
        student.user.first_name,
        student.user.middle_name,
        student.user.last_name
      ),
      profile_picture: student.user.profile_picture,
    })),
  };
}
