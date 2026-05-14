import { createContext, useContext, useState, ReactNode } from "react";
import { Profile, DEFAULT_PROFILE } from "./profiles";

type Ctx = {
  profile: Profile;
};

const ProfileContext = createContext<Ctx | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile] = useState<Profile>(DEFAULT_PROFILE);

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be inside ProfileProvider");
  return ctx;
};
