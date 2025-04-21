import googleMeet from "@/assets/svgs/meeting-icons/google-meet.svg";
import zoom from "@/assets/svgs/meeting-icons/zoom.svg";
import teams from "@/assets/svgs/meeting-icons/microsoft-teams.svg";
import other from "@/assets/svgs/meeting-icons/fallback-meeting.svg";
import inPerson from "@/assets/svgs/meeting-icons/in-person-meeting.svg";
import online from "@/assets/images/meeting/online.png";

export const getMeetingIcon = (meetingType: string) => {
  if (meetingType === "In-Person") {
    return inPerson;
  } else {
    return online;
  }
};

export const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Google Meet":
      return googleMeet;
    case "Zoom":
      return zoom;
    case "Teams":
      return teams;
    default:
      return other;
  }
};
