import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import Form from "@/components/form/Form";
import CreateFormButton from "@/components/form/CreateFormButton";
import { BiFilterAlt } from "react-icons/bi";
import { User, userFromJson, UserRole } from "@/model/user";
import { getStudents } from "@/api/services/students";
import { AppRouter } from "@/router";
import StudentListPage from "../../staff/students/page";

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    name?: string;
  }>;
}) {

  return (
    <StudentListPage searchParams={searchParams} />
  );  
  
}
