export type ScreenId =
  | "tipo"
  | "admin"
  | "unidade"
  | "descricao"
  | "protocolo"
  | "historico"
  | "global"
  | "resolucao";

export type ResponsavelInfo = {
  id: string;
  nome: string;
  cargo: string;
  iniciais: string;
  cor: string;
  cidade: string;
  unidade: string;
};

export type FlowState = {
  tipo?: "admin" | "unidade";
  admin?: string;
  unidade?: string;
  cidade?: string;
  categoria?: string;
  prioridade?: string;
  descricao?: string;
  protocolo?: string;
  responsaveis?: ResponsavelInfo[];
  apoios?: ResponsavelInfo[];
  sla?: string;
  ownerId?: string;
  ownerName?: string;
  anexos?: { name: string; size: string; type: string; url?: string }[];
};
