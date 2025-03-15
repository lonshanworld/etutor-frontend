"use client";

import { UserRole } from "@/model/user";
import { Button } from "../ui/button";
import { useFormStore } from "@/stores/useFormStore";
import { useSelectedUser } from "@/stores/useSelectedUser";

const CreateFormButton = ({ role }: { role: UserRole }) => {
  const {
    setShowForm,
    setFormData,
    setRole,
    isUpdateFormRendered,
    setUpdateFormRendered,
  } = useFormStore();
  const { selectedUser, setSelectedUser } = useSelectedUser();
  const handleClick = () => {
    setShowForm();
    setRole(role);
    setSelectedUser(null);
    if (isUpdateFormRendered) {
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        nationality: "",
        gender: null,
        dob: null,
        passportNo: "",
        phoneNo: "",
        email: "",
        password: "",
      });
      setUpdateFormRendered(false);
    }
  };
  return (
    <Button
      variant="default"
      className="text-md font-semibold p-5 text-white"
      onClick={handleClick}
    >
      Create Account
    </Button>
  );
};

export default CreateFormButton;
