import { Profile } from "@/model/profile";
import { dataLabels } from "./profileConstants";

export function getOtherUserAbout(user: Profile | null) {
  // console.log("other user", user);
  return [
    { label: dataLabels.dob, value: user?.dateOfBirth },
    { label: dataLabels.gender, value: user?.gender },
    { label: dataLabels.nationality, value: user?.nationality },
    { label: dataLabels.passport, value: user?.passport },
    { label: dataLabels.address, value: user?.address },
  ];
}

export function getCurrentUserAbout(user: Profile | null) {
  // console.log("current user", user);

  return [
    {
      label: "Name",
      value: user?.firstName + " " + user?.middleName + " " + user?.lastName,
    },
    { label: "Email", value: user?.email },
    { label: "Phone No", value: "09756042421" },
    ...getOtherUserAbout(user),
  ];
}

export function getEmgContact(user: Profile | null) {
  return [
    { label: dataLabels.emgName, value: user?.info?.emergency_contact_name },
    { label: dataLabels.emgPhone, value: user?.info?.emergency_contact_phone },
  ];
}

export function getStaffInfo(user: Profile | null) {
  return [
    ...getEmgContact(user),
    { label: dataLabels.startDate, value: user?.info?.start_date },
    { label: dataLabels.endDate, value: user?.info?.end_date },
  ];
}

export function getStudentInfo(user: Profile | null) {
  return [
    { label: dataLabels.major, value: user?.info?.major_id },
    // ...getEmgContact(user),
    { label: dataLabels.enrollmentDate, value: user?.info?.enrollment_date },
    { label: dataLabels.graduationDate, value: user?.info?.graduation_date },
    { label: dataLabels.currentYear, value: user?.info?.current_year },
  ];
}

export function getTutorInfo(user: Profile | null) {
  return [
    { label: dataLabels.subject, value: user?.info?.subject_id },
    { label: dataLabels.qualifications, value: user?.info?.qualifications },
    { label: dataLabels.experience, value: user?.info?.experience + " years" },
  ];
}
