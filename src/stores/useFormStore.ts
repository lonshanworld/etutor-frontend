import { FormData } from "@/model/form";
import { UserRole } from "@/model/user";
import { create } from "zustand";

type State = {
  showForm: boolean;
  page: number;
  role: UserRole;
  isUpdateFormRendered: boolean;
  isUpdateFormModified: boolean;
  formData: FormData;
  studentData?: {
    emgContactName?: string;
    emgContactPhone?: string;
    majorId?: number | null;
  };
  tutorData?: {
    qualifications?: string;
    experience?: number | null;
    startDate?: string | null;
  };
  staffData?: {
    emgContactName?: string;
    emgContactPhone?: string;
    accessLevel?: string;
    startDate?: string | null;
  };
};

type Action = {
  setPageForm: (page: number) => void;
  setShowForm: () => void;
  setRole: (role: UserRole) => void;
  setUpdateFormRendered: (value: boolean) => void;
  setUpdateFormModified: (value: boolean) => void;
  setFormData: (data: any) => void;
  setStudentData: (data: State["studentData"]) => void;
  setTutorData: (data: State["tutorData"]) => void;
  setStaffData: (data: State["staffData"]) => void;
  setUpdateFormData: (data: any) => void;
  setUpdateStudentData: (data: any) => void;
  resetFormData: () => void;
};

export const useFormStore = create<State & Action>((set) => ({
  showForm: false,
  page: 1,
  role: UserRole.student,
  isUpdateFormRendered: false,
  isUpdateFormModified: false,
  formData: {
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    nationality: "",
    gender: "",
    dob: "",
    passportNo: "",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: UserRole.student,
  },
  studentData: {
    emgContactName: "",
    emgContactPhone: "",
    majorId: null,
  },
  tutorData: {
    qualifications: "",
    experience: null,
    startDate: null,
  },
  staffData: {
    emgContactName: "string",
    emgContactPhone: "",
    accessLevel: "",
    startDate: null,
  },
  setUpdateFormRendered: (value) => {
    set({ isUpdateFormRendered: value });
  },
  setUpdateFormModified: (value) => {
    set({ isUpdateFormModified: value });
  },
  setPageForm: (page) => {
    set({ page });
  },
  setShowForm: () =>
    set((state) => {
      return { showForm: !state.showForm };
    }),
  setRole: (role) => {
    set({ role });
  },
  setFormData: (data) => {
    set({
      formData: {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        address: data.address,
        nationality: data.nationality,
        gender: data.gender,
        dob: data.dob,
        passportNo: data.passportNo,
        phoneNo: data.phoneNo,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        role: data.role,
      },
    });
  },
  setStudentData: (data) => {
    set({
      studentData: {
        emgContactName: data?.emgContactName,
        emgContactPhone: data?.emgContactPhone,
        majorId: data?.majorId,
      },
    });
  },
  setTutorData: (data) => {
    set({
      tutorData: {
        qualifications: data?.qualifications,
        experience: data?.experience,
        startDate: data?.startDate,
      },
    });
    console.log("tutor", data);
  },
  setStaffData: (data) => {
    set({
      staffData: {
        emgContactName: data?.emgContactName,
        emgContactPhone: data?.emgContactPhone,
        accessLevel: data?.accessLevel,
        startDate: data?.startDate,
      },
    });
  },
  setUpdateFormData: (data) => {
    set((state) => ({ formData: { ...state.formData, ...data } }));
  },
  setUpdateStudentData: (data) => {
    set((state) => ({ studentData: { ...state.studentData, ...data } }));
  },
  resetFormData: () => {
    set({
      formData: {
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        nationality: "",
        gender: "",
        dob: "",
        passportNo: "",
        phoneNo: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: UserRole.student,
      },
    });
    set({
      studentData: {
        emgContactName: "",
        emgContactPhone: "",
        majorId: null,
      },
    });
    set({
      tutorData: {
        qualifications: "",
        experience: null,
        startDate: null,
      },
    });
    set({
      staffData: {
        emgContactName: "string",
        emgContactPhone: "",
        accessLevel: "",
        startDate: null,
      },
    });
  },
}));
