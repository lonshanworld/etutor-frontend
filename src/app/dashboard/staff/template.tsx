import { getMajors } from "@/api/services/students";
import { getSubjects } from "@/api/services/tutors";
import Major from "@/components/getMajor/Major";
import { majorSubjectFromJson } from "@/model/major";

export default async function StaffDashboardTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let majors: any = [];
  let subjects: any = [];
  try {
    const majorResponse = await getMajors();
    const subjectResponse = await getSubjects();
    majors = majorResponse?.data.map(majorSubjectFromJson);
    subjects = subjectResponse?.data.map(majorSubjectFromJson);
  } catch (error) {
    console.log("error", error);
  }
  return (
    <div className="h-full max-h-svh overflow-y-auto custom-scrollbar pt-8 pb-24 border-t-2 border-secondaryBackground">
      {children}
      <Major majors={majors} subjects={subjects} />
    </div>
  );
}
