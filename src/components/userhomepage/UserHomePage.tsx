import FilterBox from "@/components/filterbox/FilterBox";
import SearchBar from "@/components/searchbar/SearchBar";
import TableDemo from "@/components/table/Table";
import Form from "@/components/form/Form";
import CreateFormButton from "../form/CreateFormButton";
import { BiFilterAlt } from "react-icons/bi";
import { User, UserRole } from "@/model/user";

type Props = {
  id: number;
  name: string;
  email: string;
  activityStatus: string;
};
export default function UserHomePage({ users }: { users: User[] }) {
  return (
    <div className="w-[97%] mx-auto">
      <div className="flex gap-5">
        <SearchBar placeholder="Search user" />
        <div className="flex items-center">
          <BiFilterAlt className="-me-6 z-10" />
          <FilterBox
            placeholder="Filter Users"
            options={["Name", "Email"]}
            className="ps-8"
          />
        </div>
      </div>
      <div className="mt-5">
        <TableDemo users={users} />
      </div>

      <div>
        <div className="float-end mt-5">
          <CreateFormButton role={ UserRole.student} />
        </div>
        <Form />
      </div>
    </div>
  );
}
