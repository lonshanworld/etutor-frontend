"use client";
import { getMajors } from "@/api/services/students";
import { getSubjects } from "@/api/services/tutors";
import { useMajor } from "@/stores/useMajor";
import { useEffect } from "react";

const Major = ({ majors, subjects }: { majors: any; subjects: any }) => {
  const { setMajors, setSubjects } = useMajor();

  useEffect(() => {
    setMajors(majors);
    setSubjects(subjects);
  }, []);
  return null;
};

export default Major;
