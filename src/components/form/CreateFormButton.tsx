"use client";

import { UserRole } from "@/model/user";
import { Button } from "../ui/button";
import { useFormStore } from "@/stores/useFormStore";

const CreateFormButton = ({ role }: { role: UserRole }) => {
  const { setShowForm, setRole } = useFormStore();
  const handleClick = () => {
    setShowForm();
    setRole(role.toString());
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
