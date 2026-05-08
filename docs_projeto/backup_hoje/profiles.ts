export type ProfileRole = "solicitante" | "atendente" | "gestor";

export type Profile = {
  id: string;
  nome: string;
  primeiroNome: string;
  saudacao: string;
  role: ProfileRole;
  cargo: string;
  cidade?: string;
  unidade?: string;
  area?: string;
  iniciais: string;
  sexo: "masculino" | "feminino";
};

export const PROFILES: Profile[] = [
  {
    id: "joao",
    nome: "João Silva",
    primeiroNome: "João",
    saudacao: "Olá,",
    role: "solicitante",
    cargo: "Solicitante · DM Pinheiros",
    cidade: "São Paulo",
    unidade: "DM Pinheiros",
    iniciais: "JS",
    sexo: "masculino",
  },
  {
    id: "marina",
    nome: "Marina Souza",
    primeiroNome: "Marina",
    saudacao: "Bem-vinda,",
    role: "atendente",
    cargo: "Atendente · São Paulo",
    cidade: "São Paulo",
    area: "Suporte SP",
    iniciais: "MS",
    sexo: "feminino",
  },
  {
    id: "roberto",
    nome: "Roberto Lima",
    primeiroNome: "Roberto",
    saudacao: "Bem-vindo,",
    role: "gestor",
    cargo: "Gestor · Suporte Nacional",
    iniciais: "RL",
    sexo: "masculino",
  },
];

export const DEFAULT_PROFILE = PROFILES[0];
