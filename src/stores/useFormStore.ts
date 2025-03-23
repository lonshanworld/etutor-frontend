import { FormData } from "@/model/form";
import { UserRole } from "@/model/user";
import { create } from "zustand";

type State = {
  showForm: boolean;
  createPage: number;
  updatePage: number;
  role: UserRole;
  isUpdateFormRendered: boolean;
  isUpdateFormModified: boolean;
  selectedMajor: string;
  formData: FormData;
  isBackClicked: boolean;
  updatedData: any;
  studentData?: {
    emgContactName?: string;
    emgContactPhone?: string;
    majorId?: number | undefined;
  };
  tutorData?: {
    qualifications?: string;
    experience?: number | undefined;
    subject?: string | undefined;
  };
  staffData?: {
    emgContactName?: string;
    emgContactPhone?: string;
    accessLevel?: string;
    startDate?: string;
  };
};

type Action = {
  setCreatePage: (page: number) => void;
  setUpdatePage: (page: number) => void;
  setShowForm: () => void;
  setRole: (role: UserRole) => void;
  setUpdateFormRendered: (value: boolean) => void;
  setUpdateFormModified: (value: boolean) => void;
  setSelectedMajor: (value: string) => void;
  setFormData: (data: any) => void;
  setStudentData: (data: State["studentData"]) => void;
  setTutorData: (data: State["tutorData"]) => void;
  setStaffData: (data: State["staffData"]) => void;
  setUpdateFormData: (data: any) => void;
  setUpdateStudentData: (data: any) => void;
  setUpdateStaffData: (data: any) => void;
  setUpdateTutorData: (data: any) => void;
  resetFormData: () => void;
  setIsBackClick: (value: boolean) => void;
  setUpdatedData: (data: any) => void;
};

export const useFormStore = create<State & Action>((set) => ({
  showForm: false,
  createPage: 1,
  updatePage: 1,
  role: UserRole.student,
  isUpdateFormRendered: false,
  isUpdateFormModified: false,
  selectedMajor: "",
  isBackClicked: false,
  updatedData: null,
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
    majorId: undefined,
  },
  tutorData: {
    qualifications: "",
    experience: undefined,
    startDate: undefined,
  },
  staffData: {
    emgContactName: "",
    emgContactPhone: "",
    accessLevel: "",
    startDate: undefined,
  },
  setUpdateFormRendered: (value) => {
    set({ isUpdateFormRendered: value });
  },
  setUpdateFormModified: (value) => {
    set({ isUpdateFormModified: value });
  },
  setIsBackClick: (value) => {
    set({ isBackClicked: value });
  },
  setSelectedMajor: (value) => {
    set({ selectedMajor: value });
  },
  setCreatePage: (page) => {
    set({ createPage: page });
  },
  setUpdatePage: (page) => {
    set({ updatePage: page });
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
        subject: data?.subject,
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
  setUpdatedData: (data) => {
    set((state) => ({ updatedData: { ...state.updatedData, ...data } }));
  },
  setUpdateStudentData: (data) => {
    set((state) => ({ studentData: { ...state.studentData, ...data } }));
  },
  setUpdateStaffData: (data) => {
    set((state) => ({ staffData: { ...state.studentData, ...data } }));
  },
  setUpdateTutorData: (data) => {
    set((state) => ({ tutorData: { ...state.studentData, ...data } }));
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
        majorId: undefined,
      },
    });
    set({
      tutorData: {
        qualifications: "",
        experience: undefined,
        subject: undefined,
      },
    });
    set({
      staffData: {
        emgContactName: "",
        emgContactPhone: "",
        accessLevel: "",
        startDate: undefined,
      },
    });
  },
}));
