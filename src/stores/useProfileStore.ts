import { getProfileById } from "@/api/services/getProfile";
import { Profile } from "@/model/profile";
import { capitalizeFirstLetter } from "@/utils/formatData";
import { create } from "zustand";

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
  major: string | null;
  enrollDate: string | null;

  // sensitive
  emergencyName: string | null;
  emergencyPhone: string | null;
}

interface TutorExtras {
  qualification: string | null;
  experience: string | null;
  subject: string | null;
}

export type ProfileData = BaseProfileData &
  Partial<StudentExtras & TutorExtras>;

interface ProfileStore {
  profiles: Record<number, ProfileData>;
  getProfile: (userId: number) => ProfileData | undefined;
  fetchProfile: (
    userId: number,
    viewer: Profile
  ) => Promise<ProfileData | null>; // fetch from API
  clearProfiles: () => void;
}

// Cache TTL
const CACHE_TTL = 4 * 60 * 1000;

// Permission checker
const createPermissionChecker = (userId: number, viewer: Profile) => {
  const isSelf = viewer.id === userId;
  const isStaff = viewer.role === "staff";
  const isTutor = viewer.role === "tutor";

  return {
    canViewBasicInfo: true, // Everyone can view basic info
    canViewExtendedInfo: isSelf || isStaff || isTutor,
    canViewSensitiveInfo: isSelf || isStaff,
  };
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profiles: {},

  getProfile: (userId) => {
    const profile = get().profiles[userId];

    if (profile && Date.now() - profile.fetchedAt > CACHE_TTL) {
      // Profile is expired, return undefined to trigger a re-fetch
      return undefined;
    }

    return profile;
  },

  fetchProfile: async (userId, viewer) => {
    try {
      const existing = get().profiles[userId];

      // Return cached profile if not expired
      if (existing && Date.now() - existing.fetchedAt < CACHE_TTL) {
        return existing;
      }

      const response = await getProfileById(userId);
      if (!response) {
        console.error("Failed to fetch profile for user:", userId);
        return null;
      }

      const permissions = createPermissionChecker(userId, viewer);
      const now = Date.now();
      const profileRole = response.role;

      // Handle role-specific data
      let extraData: Partial<StudentExtras & TutorExtras> = {};

      if (profileRole === "student" && permissions.canViewExtendedInfo) {
        extraData = {
          major: response.info?.major_name || null,
          enrollDate: response.info?.enrollment_date || null,
          emergencyName:
            permissions.canViewSensitiveInfo ?
              response.info?.emergency_contact_name || null
            : null,
          emergencyPhone:
            permissions.canViewSensitiveInfo ?
              response.info?.emergency_contact_phone || null
            : null,
        };
      } else if (profileRole === "tutor" && permissions.canViewBasicInfo) {
        extraData = {
          qualification: response.info?.qualifications || null,
          experience: response.info?.experience || null,
          subject: response.info?.subject_name || null,
        };
      }

      const profile: ProfileData = {
        fetchedAt: now,
        userId,
        firstName: response.firstName,
        middleName: response.middleName || null,
        lastName: response.lastName || null,
        email: response.email,
        phone: response.phoneNumber || null,
        role: response.role || "",
        profileUrl: response.profileImagePath || null,
        status: response.status,
        dob: response.dateOfBirth || null,
        gender: capitalizeFirstLetter(response.gender || ""),
        nationality: response.nationality || null,

        // Sensitive info only available with appropriate permissions
        address:
          permissions.canViewSensitiveInfo ? response.address || null : null,
        passport:
          permissions.canViewSensitiveInfo ? response.passport || null : null,
        ...extraData,
      };

      set((state) => ({
        profiles: {
          ...state.profiles,
          [userId]: profile,
        },
      }));

      return profile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  },

  clearProfiles: () => {
    set({ profiles: {} });
  },
}));
