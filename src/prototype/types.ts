export type ScreenId =
  | "home"
  | "tipo"
  | "admin"
  | "unidade"
  | "descricao"
  | "protocolo"
  | "notificacao"
  | "historico"
  | "global"
  | "resolucao";

export type FlowState = {
  tipo?: "admin" | "unidade";
  admin?: string;
  unidade?: string;
  cidade?: string;
  categoria?: string;
  prioridade?: string;
  descricao?: string;
  protocolo?: string;
};
