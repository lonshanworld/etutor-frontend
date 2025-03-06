import { UserRole } from "@/model/user";
import { create } from "zustand";

type State = {
  showForm: boolean;
  page: number;
  role: string;
  formData: {
    firstName: string;
    middleName?: string;
    lastName: string | null;
    address?: string | null;
    nationality?: string | null;
    gender: string | null;
    dob: string | null;
    passportNo?: string | null;
    phoneNo: string;
    email: string;
    password: string;
    role: any;
  };
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
  setRole: (role: string) => void;
  setFormData: (data: State["formData"]) => void;
  setStudentData: (data: State["studentData"]) => void;
  setTutorData: (data: State["tutorData"]) => void;
  setStaffData: (data: State["staffData"]) => void;
};

export const useFormStore = create<State & Action>((set) => ({
  showForm: false,
  page: 1,
  role: "",
  formData: {
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
    role: "",
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
  resetFormData: () => {
    set({
      formData: {
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
        role: "",
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
