import { create } from "zustand";
import { getProfileById } from "@/api/services/getProfile";
import { capitalizeFirstLetter, formatName } from "@/utils/formatData";
import { useUserStore } from "./useUserStore";

interface BaseProfileData {
  fetchedAt: number;
  userId: number;
  firstName: string;
  middleName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  role: string;
  profileUrl: string | null;
  status: string;
  dob: string | null;
  gender: string;
  nationality: string | null;

  // sensitive
  address: string | null;
  passport: string | null;
}

interface StudentExtras {
  emergencyName: string | null;
  emergencyPhone: string | null;
  major: string | null;
  enrollDate: string | null;
}

interface TutorExtras {
  qualification: string | null;
  experience: string | null;
  subject: string | null;
}

type ProfileData = BaseProfileData & Partial<StudentExtras & TutorExtras>;

interface ProfileStore {
  profiles: Record<number, ProfileData>;
  getProfile: (userId: number) => ProfileData | undefined;
  fetchProfile: (userId: number, user: any) => Promise<ProfileData>;
}

const TTL = 2 * 60 * 1000; // 2 minutes

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profiles: {},

  getProfile: (userId) => {
    const profile = get().profiles[userId];

    if (profile && Date.now() - profile.fetchedAt > TTL) {
      // Expired - remove from state
      set((state) => {
        const newProfiles = { ...state.profiles };
        delete newProfiles[userId];
        return { profiles: newProfiles };
      });
      return undefined;
    }

    return profile;
  },

  fetchProfile: async (userId, viewer) => {
    const existing = get().profiles[userId];

    if (existing && Date.now() - existing.fetchedAt < TTL) {
      return existing;
    }

    const response = await getProfileById(userId);
    console.log(response);

    const role = response.role;
    const now = Date.now();

    // const isViewerTutor = user.role === "tutor";
    // const isOwnProfile = user.id === userId;
    const isViewerAllowed =
      viewer.id === userId ||
      viewer.role === "staff" ||
      viewer.role === "tutor";

    let extraData: Partial<StudentExtras & TutorExtras> = {};

    if (role === "student") {
      extraData = {
        emergencyName:
          isViewerAllowed ? response.info.emergency_contact_name || null : null,
        emergencyPhone:
          isViewerAllowed ?
            response.info.emergency_contact_phone || null
          : null,
        major: isViewerAllowed ? response.info.major_name || null : null,
        enrollDate:
          isViewerAllowed ? response.info.enrollment_date || null : null,
      };
    } else if (role === "tutor") {
      extraData = {
        qualification:
          isViewerAllowed ? response.info.qualification || null : null,
        experience: isViewerAllowed ? response.info.experience || null : null,
        subject: isViewerAllowed ? response.info.subject_name || null : null,
      };
    }

    const profile: ProfileData = {
      fetchedAt: now,
      userId,
      firstName: response.firstName,
      middleName: response.middleName,
      lastName: response.lastName,
      email: response.email,
      phone: response.phoneNumber,
      role: response.role || "",
      profileUrl: response.profileImagePath || null,
      status: response.status,
      dob: response.dateOfBirth || null,
      gender: capitalizeFirstLetter(response.gender),
      nationality: response.nationality,
      address: isViewerAllowed ? response.address : null,
      passport: isViewerAllowed ? response.passport || null : null,
      ...extraData,
    };

    set((state) => ({
      profiles: {
        ...state.profiles,
        [userId]: profile,
      },
    }));

    return profile;
  },
}));
