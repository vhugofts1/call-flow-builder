import { createContext, useContext, useState, ReactNode } from "react";
import { Profile, PROFILES, DEFAULT_PROFILE } from "./profiles";

type Ctx = {
  profile: Profile;
  setProfileId: (id: string) => void;
  profiles: Profile[];
};

const ProfileContext = createContext<Ctx | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const setProfileId = (id: string) => {
    const p = PROFILES.find((p) => p.id === id);
    if (p) setProfile(p);
  };
  return (
    <ProfileContext.Provider value={{ profile, setProfileId, profiles: PROFILES }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be inside ProfileProvider");
  return ctx;
};
