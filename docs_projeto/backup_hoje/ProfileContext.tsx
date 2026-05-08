import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Profile, PROFILES, DEFAULT_PROFILE } from "./profiles";
import { supabase } from "@/integrations/supabase/client";

type Ctx = {
  profile: Profile;
  setProfileId: (id: string) => void;
  profiles: Profile[];
  authedAtendente: Profile | null;
  signOut: () => Promise<void>;
};

const ProfileContext = createContext<Ctx | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [authedAtendente, setAuthedAtendente] = useState<Profile | null>(null);

  useEffect(() => {
    const buildAtendente = async (userId: string, email: string) => {
      const { data } = await supabase
        .from("profiles")
        .select("nome, cidade, cargo")
        .eq("id", userId)
        .maybeSingle();
      const nome = data?.nome || email.split("@")[0];
      const cidade = data?.cidade || "São Paulo";
      const cargo = data?.cargo || "Atendente";
      const iniciais = nome.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
      const real: Profile = {
        id: "auth:" + userId,
        nome,
        primeiroNome: nome.split(" ")[0],
        saudacao: "Bem-vindo,",
        role: "atendente",
        cargo: `${cargo} · ${cidade}`,
        cidade,
        iniciais,
        sexo: "masculino", // Default para simulação, pode ser expandido depois
      };
      setAuthedAtendente(real);
      setProfile(real);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        setTimeout(() => buildAtendente(session.user.id, session.user.email || ""), 0);
      } else {
        setAuthedAtendente(null);
        setProfile(DEFAULT_PROFILE);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) buildAtendente(data.session.user.id, data.session.user.email || "");
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const setProfileId = (id: string) => {
    if (id === "auth" && authedAtendente) {
      setProfile(authedAtendente);
      return;
    }
    const p = PROFILES.find((p) => p.id === id);
    if (p) setProfile(p);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfileId, profiles: PROFILES, authedAtendente, signOut }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be inside ProfileProvider");
  return ctx;
};
