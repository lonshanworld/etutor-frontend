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

export interface MeetingJsonData {
  meetings: {
    id: number;
    creator_id: number;
    subject: string;
    date: string;
    time: string;
    type: "In-Person" | "Online";
    location: string | null;
    platform: string | null;
    link: string | null;
    creator: {
      id: number;
      name: string;
      email: string;
      profile_picture: string | null;
    };
    participants: {
      id: number;
      name: string;
      email: string;
    }[];
  }[];
}

export type MeetingList = Meeting[];

export function meetingsFromJson(jsonData: MeetingJsonData): {
  meetings: Meeting[];
} {
  return {
    meetings: jsonData.meetings.map((meeting: any) => ({
      id: meeting.id,
      creator_id: meeting.creator_id,
      subject: meeting.subject,
      date: meeting.date,
      time: meeting.time,
      type: meeting.type,
      location: meeting.location,
      platform: meeting.platform,
      link: meeting.link,
      creator: {
        id: meeting.creator.id,
        name: meeting.creator.name,
        email: meeting.creator.email,
        profile_picture: meeting.creator.profile_picture,
      },
      participants: meeting.participants.map((p: any) => ({
        id: p.id,
        name: p.name,
        email: p.email,
      })),
    })),
  };
}

interface NewMeeting {
  id: number;
  creator_id: number;
  subject: string;
  date: string;
  time: string;
  type: string;
  location: string | null;
  platform: string | null;
  link: string | null;
  creator: Creator;
  participants: Participant[];
}

export function newMeetingFromJson(jsonData: NewMeeting): NewMeeting {
  return {
    id: jsonData.id,
    creator_id: jsonData.creator_id,
    subject: jsonData.subject,
    date: jsonData.date,
    time: jsonData.time,
    type: jsonData.type,
    location: jsonData.location,
    platform: jsonData.platform,
    link: jsonData.link,
    creator: jsonData.creator,
    participants: jsonData.participants,
  };
}
