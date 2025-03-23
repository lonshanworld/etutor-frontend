import { create } from "zustand";

type State = {
  majors: any[];
  subjects: any[];
  majorsWithSubjects: any[];
};

type Action = {
  setMajors: (majors: any[]) => void;
  setSubjects: (subjects: any[]) => void;
  setMajorsWithSubjects: (majorsWithSubjects: any[]) => void;
};

export const useMajor = create<State & Action>((set) => ({
  majors: [],
  setMajors: (majors) => set({ majors }),
  subjects: [],
  setSubjects: (subjects) => set({ subjects }),
  majorsWithSubjects: [],
  setMajorsWithSubjects: (majorsWithSubjects) => set({ majorsWithSubjects }),
}));
