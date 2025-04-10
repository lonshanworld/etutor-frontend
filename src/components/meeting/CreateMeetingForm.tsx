import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiArrowLeft } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import ProfilePic from "../ProfilePic";
import AddStudent, { myStudent } from "./AddStudent";
import { z } from "zod";
import { meetingSchema } from "@/utils/validationSchema";
import MeetingDropdown from "./MeetingDropdown";
import MeetingInputField from "../inputfields/MeetingInputField";
import { createMeeting } from "@/api/services/meeting";
import { useToast } from "@/stores/useToast";

type FormData = z.infer<typeof meetingSchema>;

interface Props {
  onBack: () => void;
  isOpen: boolean;
  onNewMeetingCreated: (newMeeting: any) => void;
}

const CreateMeetingForm = ({ onBack, isOpen, onNewMeetingCreated }: Props) => {
  const [studentOverlay, setStudentOverlay] = useState(false);
  const [assignedStudents, setAssignedStudents] = useState<myStudent[]>([]);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    control,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(meetingSchema),
    mode: "onBlur",
    defaultValues: {
      meeting_subject: "",
      meeting_time: "",
      meeting_date: "",
      location: "",
      platform: "",
      meeting_link: "",
      meeting_type: "Virtual",
      users: [],
    },
  });

  const meetingType = watch("meeting_type");

  // Sync assigned students with form state
  useEffect(() => {
    setValue(
      "users",
      assignedStudents.map((s) => s.userId),
      { shouldValidate: true }
    );

    // Trigger validation when students change
    trigger("users");
  }, [assignedStudents, setValue, trigger]);

  useEffect(() => {
    if (meetingType === "In-Person") {
      setValue("meeting_link", "", { shouldValidate: true });
      setValue("platform", "", { shouldValidate: true });
    } else {
      setValue("location", "", { shouldValidate: true });
    }
  }, [meetingType, setValue]);

  const handleRemove = (id: number) => {
    setAssignedStudents((prev) => prev.filter((s) => s.userId !== id));
  };

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      ...data,
      location: data.meeting_type === "Virtual" ? null : data.location,
      platform: data.meeting_type === "In-Person" ? null : data.platform,
      meeting_link:
        data.meeting_type === "In-Person" ? null : data.meeting_link,
      users: assignedStudents.map((s) => s.userId),
    };
    console.log("Form Submitted:", formattedData); // log

    try {
      const response = await createMeeting(formattedData);
      onNewMeetingCreated(response);
      showToast("Meeting created successfully", "success");
      onBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    clearErrors();
    reset();
    setAssignedStudents([]);
  }, [onBack]);

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
        className={`overflow-auto scrollbar-none fixed top-0 right-0 h-screen bg-formBackground md:w-[750px] p-9 sm:p-14 w-svw z-20 
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
          <div className='grid grid-cols-1 w-full gap-y-6'>
            <div className='flex flex-col w-full'>
              <MeetingInputField
                id='meeting_subject'
                type='text'
                label='Subject'
                register={register("meeting_subject")}
                error={{
                  name: errors.meeting_subject ? "meeting_subject" : null,
                  message: errors?.meeting_subject?.message,
                }}
              />
            </div>

            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='flex flex-col w-full'>
                <label className='text-primaryText pb-1 text-sm'>Time</label>
                <input
                  className='border border-inputBorder w-full px-3 py-2 bg-transparent rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500'
                  type='time'
                  {...register("meeting_time")}
                />
                {errors.meeting_time && (
                  <span className='text-red-500 text-sm'>
                    {errors.meeting_time.message}
                  </span>
                )}
              </div>

              <div className='flex flex-col w-full'>
                <label className='text-primaryText pb-1 text-sm'>Date</label>
                <input
                  className='border border-inputBorder w-full px-3 py-2 bg-transparent rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500'
                  type='date'
                  {...register("meeting_date")}
                />
                {errors.meeting_date && (
                  <span className='text-red-500 text-sm'>
                    {errors.meeting_date.message}
                  </span>
                )}
              </div>
            </div>

            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='flex flex-col w-full'>
                <MeetingDropdown
                  label='Meeting Type'
                  name='meeting_type'
                  control={control}
                  placeholder='Select meeting type'
                  options={["Virtual", "In-Person"]}
                />
              </div>
              <div className='flex flex-col w-full'>
                <MeetingInputField
                  id='location'
                  type='text'
                  label='Location'
                  register={register("location")}
                  disabled={meetingType === "Virtual"}
                  error={{
                    name: errors.location ? "location" : null,
                    message: errors?.location?.message,
                  }}
                />
              </div>
            </div>

            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='flex flex-col w-full'>
                <MeetingDropdown
                  label='Platform'
                  name='platform'
                  control={control}
                  placeholder='-- Select --'
                  options={["Zoom", "Teams", "Google Meet", "Other"]}
                  className={
                    meetingType === "In-Person" ?
                      "opacity-25 pointer-events-none"
                    : ""
                  }
                />
                {errors.platform && (
                  <span className='text-red-500 text-sm'>
                    {errors.platform.message}
                  </span>
                )}
              </div>

              <div className='flex flex-col w-full'>
                <MeetingInputField
                  id='meeting_link'
                  type='text'
                  label='Link'
                  disabled={meetingType === "In-Person"}
                  register={register("meeting_link")}
                  error={{
                    name: errors.meeting_link ? "meeting_link" : null,
                    message: errors?.meeting_link?.message,
                  }}
                />
              </div>
            </div>

            {/* Assign Students */}
            <div className=''>
              <div className='flex justify-end gap-2 pb-1'>
                <button
                  type='button'
                  className='p-2 bg-red-500 text-white w-[100px]'
                  onClick={() => setAssignedStudents([])}
                >
                  Clear
                </button>
                <button
                  type='button'
                  className='p-2 bg-theme text-white'
                  onClick={() => setStudentOverlay(true)}
                >
                  {assignedStudents.length > 0 ? "Edit" : "Assign"} Student
                </button>
              </div>
              <div className='border border-inputBorder h-32 w-full flex flex-wrap content-start gap-x-2 gap-y-2 p-1 overflow-y-auto scrollbar-cus-1 select-none'>
                {assignedStudents.length > 0 ?
                  assignedStudents.map((student) => (
                    <div
                      key={student.userId}
                      className='flex items-center gap-2 px-3 bg-meetingCard h-8 text-white rounded-sm'
                    >
                      <div className='max-sm:hidden'>
                        <ProfilePic
                          profileUrl={student.profileUrl}
                          size={20}
                        />
                      </div>
                      <span>{student.name}</span>
                      <RxCross2
                        size={20}
                        className='cursor-pointer'
                        onClick={() => handleRemove(student.userId)}
                      />
                    </div>
                  ))
                : <p className='text-sm text-secondaryText p-1'>
                    No student assigned to the meeting yet
                  </p>
                }
              </div>
              {errors.users && (
                <span className='text-red-500 text-sm'>
                  At least one student must be assigned.
                </span>
              )}
            </div>

            <div className='w-full'>
              <button
                className='p-2 bg-theme w-full text-white mb-6'
                type='submit'
              >
                Create
              </button>
            </div>
          </div>

          {/* Submit Button */}
        </form>
      </div>

      {/* Student Selector */}
      {studentOverlay && (
        <AddStudent
          onBack={() => setStudentOverlay(false)}
          onAdd={(students) => {
            setAssignedStudents(students);
            setStudentOverlay(false);
            setValue(
              "users",
              assignedStudents.map((s) => s.userId),
              { shouldValidate: true }
            );

            trigger("users");
          }}
          preSelectedStudents={assignedStudents}
        />
      )}
    </div>
  );
};

export default CreateMeetingForm;
