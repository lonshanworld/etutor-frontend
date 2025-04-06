"use client";

import Form from "@/components/form/Form";
import CreateFormButton from "@/components/form/CreateFormButton";
import { UserRole } from "@/model/user";
import { useUserStore } from "@/stores/useUserStore";

export default function TutorPageTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUserStore();

  return (
    <>
      {children}
      {user?.role === UserRole.staff && (
        <div className="me-8">
          <div className="mt-5 flex justify-end">
            <CreateFormButton role={UserRole.tutor} />
          </div>
          <Form />
        </div>
      )}
    </>
  );
}
