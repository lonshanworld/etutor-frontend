"use client";

import { UserRole } from "@/model/user";
import { Button } from "../ui/button";
import { useFormStore } from "@/stores/useFormStore";
import { useSelectedUser } from "@/stores/useSelectedUser";
import { useUserStore } from "@/stores/useUserStore";

const CreateFormButton = ({ role }: { role: UserRole }) => {
  const {
    setShowForm,
    setFormData,
    setRole,
    isUpdateFormRendered,
    setUpdateFormRendered,
  } = useFormStore();
  const { selectedUser, setSelectedUser } = useSelectedUser();
  const { isReadOnly } = useUserStore();
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
      className="max-sm:text-sm font-semibold p-3 sm:p-5 text-white max-sm:me-3"
      onClick={handleClick}
      disabled={isReadOnly}
    >
      Create Account
    </Button>
  );
};

export default CreateFormButton;
