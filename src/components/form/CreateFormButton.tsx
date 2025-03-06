"use client";

import { Button } from "../ui/button";
import { useFormStore } from "@/stores/useFormStore";

const CreateFormButton = ({ role }: { role: string }) => {
  const { setShowForm, setRole } = useFormStore();
  const handleClick = () => {
    setShowForm();
    setRole(role);
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
