// import { getTutors } from "@/api/services/tutors";
// import Tab from "@/components/allocate/Tab";
// import TutorTable from "@/components/table/allocation/TutorTable";
// import { User, userFromJson } from "@/model/user";

// export default async function AllocatePage({
//   searchParams,
// }: {
//   searchParams: Promise<{
//     page?: number;
//     name?: string;
//   }>;
// }) {
//   const params = await searchParams;
//   const page = Number(params.page) || 1;
//   const name = params.name || "";

//   let tutorData: User[] = [];
//   let pageCount = 1;

//   try {
//     const response = await getTutors(page, name);
//     console.log("tutors", response);
//     tutorData = response?.data.map(userFromJson);
//     pageCount = response.meta.last_page;
//   } catch (error) {
//     console.error("Failed to fetch tutors:", error);
//   }
//   return (
//     <div>
//       <div className="ms-[2.5%]">
//         <Tab />
//       </div>
//       <div className="w-full sm:w-[95%] mx-auto">
//         <TutorTable tutors={tutorData} />
//       </div>
//     </div>
//   );
// }
