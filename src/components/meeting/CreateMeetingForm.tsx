import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowLeft } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import ProfilePic from "../ProfilePic";
import AddStudent from "./AddStudent";
import { z } from "zod";
import { meetingSchema } from "@/utils/validationSchema";

type FormData = z.infer<typeof meetingSchema>;

interface myStudent {
  userId: number;
  studentId: number;
  name: string;
  profile_picture: string;
}

interface Props {
  onBack: () => void;
  isOpen: boolean;
}

const CreateMeetingForm = ({ onBack, isOpen }: Props) => {
  const [studentOverlay, setStudentOverlay] = useState(false);
  const [assignedStudents, setAssignedStudents] = useState<myStudent[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      subject: "",
      time: "",
      date: "",
      location: "",
      platform: "",
      link: "",
      meetingType: "Virtual",
      students: [],
    },
  });

  const meetingType = watch("meetingType");

  // Sync assigned students with form state
  useEffect(() => {
    console.log("Updated students:", assignedStudents);
    setValue("students", assignedStudents, { shouldValidate: true });
    // Trigger validation when students change
    trigger("students");
  }, [assignedStudents, setValue, trigger]);

  const handleRemove = (id: number) => {
    setAssignedStudents((prev) => prev.filter((s) => s.studentId !== id));
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    // handle your API logic here
  };

  return (
    <div>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className='bg-black/70 w-full h-full fixed top-0 left-0 z-10'
          onClick={onBack}
        ></div>
      )}

      {/* Sliding Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen bg-formBackground md:w-[750px] p-14 w-svw z-20 
        transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col h-full'
        >
          {/* Back Button */}
          <div className='pb-8'>
            <FiArrowLeft
              size={48}
              className='text-backgroundOpposite bg-transparent border border-backgroundOpposite rounded-full p-3 hover:text-theme hover:border-theme cursor-pointer transition-200'
              onClick={onBack}
            />
          </div>

          {/* Header */}
          <div className='pb-8'>
            <h2 className='text-3xl font-semibold text-primaryText'>
              Create Meeting
            </h2>
            <div className='bg-theme w-16 h-1'></div>
          </div>

          {/* Form Fields */}
          <div className='grid grid-cols-2 w-full gap-x-10 gap-y-6 overflow-y-auto'>
            <div className='flex flex-col col-span-2'>
              <label>Subject</label>
              <input
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                type='text'
                {...register("subject")}
              />
              {errors.subject && (
                <span className='text-red-500 text-sm'>
                  {errors.subject.message}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label>Time</label>
              <input
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                type='time'
                {...register("time")}
              />
              {errors.time && (
                <span className='text-red-500 text-sm'>
                  {errors.time.message}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label>Date</label>
              <input
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                type='date'
                {...register("date")}
              />
              {errors.date && (
                <span className='text-red-500 text-sm'>
                  {errors.date.message}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label>Meeting Type</label>
              <select
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                {...register("meetingType")}
              >
                <option value='Virtual'>Virtual</option>
                <option value='In-Person'>In-Person</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <label>Platform</label>
              <select
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                disabled={meetingType === "In-Person"}
                {...register("platform")}
              >
                <option value=''>-- Select --</option>
                <option value='Zoom'>Zoom</option>
                <option value='Teams'>Teams</option>
                <option value='Google Meet'>Google Meet</option>
              </select>
              {errors.platform && (
                <span className='text-red-500 text-sm'>
                  {errors.platform.message}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label>Location</label>
              <input
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                type='text'
                disabled={meetingType === "Virtual"}
                {...register("location")}
              />
              {errors.location && (
                <span className='text-red-500 text-sm'>
                  {errors.location.message}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label>Link</label>
              <input
                className='border p-2 rounded-lg border-inputBorder bg-transparent'
                type='text'
                disabled={meetingType === "In-Person"}
                {...register("link")}
              />
              {errors.link && (
                <span className='text-red-500 text-sm'>
                  {errors.link.message}
                </span>
              )}
            </div>

            {/* Assign Students */}
            <div className='col-span-2'>
              <button
                type='button'
                className='p-2 bg-theme text-white'
                onClick={() => setStudentOverlay(true)}
              >
                {assignedStudents.length > 0 ? "Edit" : "Assign"} Student
              </button>
              <div className='border border-inputBorder h-24 w-full flex flex-wrap content-start gap-x-2 gap-y-2 p-1 overflow-y-auto scrollbar-cus-1 select-none'>
                {assignedStudents.length > 0 ?
                  assignedStudents.map((student) => (
                    <div
                      key={student.studentId}
                      className='flex items-center gap-2 px-3 bg-meetingCard h-8 text-white rounded-sm'
                    >
                      <ProfilePic
                        profileUrl={student.profile_picture}
                        size={20}
                      />
                      <span>{student.name}</span>
                      <RxCross2
                        size={22}
                        className='cursor-pointer'
                        onClick={() => handleRemove(student.studentId)}
                      />
                    </div>
                  ))
                : <p className='text-sm text-secondaryText p-1'>
                    No student assigned to the meeting yet
                  </p>
                }
              </div>
              {errors.students && (
                <span className='text-red-500 text-sm'>
                  At least one student must be assigned.
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-5'>
            <button
              className='p-2 bg-theme w-full text-white'
              type='submit'
            >
              Create
            </button>
          </div>
        </form>
      </div>

      {/* Student Selector */}
      {studentOverlay && (
        <AddStudent
          onBack={() => setStudentOverlay(false)}
          onAdd={(students) => {
            setAssignedStudents(students);
            setStudentOverlay(false);
            setValue("students", students, { shouldValidate: true });
            trigger("students");
          }}
          preSelectedStudents={assignedStudents}
        />
      )}
    </div>
  );
};

export default CreateMeetingForm;
