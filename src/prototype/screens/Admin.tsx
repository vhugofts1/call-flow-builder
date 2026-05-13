import { Search, ChevronDown, ChevronRight, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Colaborador = {
  nome: string;
  funcao: string;
  qualificacao: string;
};

type Area = {
  nome: string;
  status: "online" | "ocupado" | "offline";
  statusLabel?: string;
  colaboradores: Colaborador[];
};

const AREAS: Area[] = [
  {
    nome: "Recursos Humanos",
    status: "online",
    colaboradores: [
      { nome: "Carol Advogada", funcao: "Jurídico", qualificacao: "Autônomo" },
      { nome: "Érica", funcao: "SDK - Franquias", qualificacao: "Funcionário" },
      { nome: "Fernando Byfford", funcao: "Fornecedor", qualificacao: "Autônomo" },
      { nome: "Mayara Maria", funcao: "Administrador", qualificacao: "Autônomo" },
      { nome: "Mick Bernardo", funcao: "A definir", qualificacao: "Autônomo" },
    ],
  },
  {
    nome: "Financeiro",
    status: "online",
    colaboradores: [
      { nome: "Jacqueline", funcao: "Financeiro", qualificacao: "Autônomo" },
      { nome: "Wagner A. Ferreira", funcao: "CFO", qualificacao: "Proprietário" },
      { nome: "José Carlos Hember", funcao: "Proprietário", qualificacao: "Proprietário" },
    ],
  },
  {
    nome: "Tecnologia",
    status: "online",
    colaboradores: [
      { nome: "Daniel Albuquerque Coutela", funcao: "Programador", qualificacao: "Funcionário" },
      { nome: "JR Infraestrutura", funcao: "Fornecedor", qualificacao: "Autônomo" },
      { nome: "Matheus Gibraz", funcao: "CEO", qualificacao: "Proprietário" },
      { nome: "Marcos Vinícius", funcao: "Desenvolvedor Regional", qualificacao: "Funcionário" },
      { nome: "Newton Ferreira", funcao: "Suporte e Monitoramento", qualificacao: "Funcionário" },
    ],
  },
  {
    nome: "Suporte/Monitoramento",
    status: "online",
    colaboradores: [
      { nome: "Milena Alanes", funcao: "Supervisora Suporte Técnico", qualificacao: "Funcionário" },
      { nome: "Gabriel Mendes D.", funcao: "Atendente", qualificacao: "Funcionário" },
      { nome: "Lucas Fernando da Silva", funcao: "Atendente", qualificacao: "Funcionário" },
      { nome: "Wilson André da Silva", funcao: "Atendente", qualificacao: "Funcionário" },
      { nome: "Victor Hugo da Silva", funcao: "Atendente", qualificacao: "Funcionário" },
    ],
  },
  {
    nome: "Jurídico",
    status: "ocupado",
    colaboradores: [
      { nome: "Carol Advogada", funcao: "Jurídico", qualificacao: "Autônomo" },
      { nome: "Renato Lima", funcao: "Proprietário", qualificacao: "Proprietário" },
    ],
  },
  {
    nome: "Marketing",
    status: "online",
    colaboradores: [
      { nome: "Mathos Rodrigo", funcao: "Marketing", qualificacao: "Funcionário" },
      { nome: "Rui Monteiro", funcao: "A definir", qualificacao: "Autônomo" },
      { nome: "Mukyanna Gráfica", funcao: "Fornecedor", qualificacao: "Autônomo" },
      { nome: "Suporte Byfford", funcao: "Fornecedor", qualificacao: "Autônomo" },
    ],
  },
  {
    nome: "Compras",
    status: "offline",
    statusLabel: "Resp. próx. dia útil",
    colaboradores: [
      { nome: "Fábio Araújo", funcao: "Fornecedor", qualificacao: "Funcionário" },
      { nome: "Valério Rui Rosa Rodrigues", funcao: "Funcionário", qualificacao: "Funcionário" },
      { nome: "NUTS", funcao: "Funcionário", qualificacao: "Proprietário" },
    ],
  },
];

export const Admin = ({ onSelect }: { onSelect: (n: string) => void }) => {
  const [expandedArea, setExpandedArea] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const toggleArea = (areaNome: string) => {
    setExpandedArea(expandedArea === areaNome ? null : areaNome);
  };

  const filteredAreas = AREAS.filter(
    (a) =>
      a.nome.toLowerCase().includes(search.toLowerCase()) ||
      a.colaboradores.some((c) => c.nome.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex h-[760px] flex-col gradient-dark p-5">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest text-primary">Etapa 2 de 4</p>
        <h2 className="mt-1 text-xl font-bold">Selecione a área</h2>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Buscar área ou colaborador..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="flex-1 space-y-2 overflow-auto pr-1 custom-scrollbar">
        {filteredAreas.map((a) => (
          <div key={a.nome} className="overflow-hidden rounded-xl border border-border bg-card transition-all">
            {/* Cabeçalho da Área */}
            <div
              className={cn(
                "flex w-full items-center justify-between p-4 text-left transition-all cursor-pointer hover:bg-card/80",
                expandedArea === a.nome && "border-b border-border bg-secondary/20"
              )}
              onClick={() => toggleArea(a.nome)}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                  {expandedArea === a.nome ? (
                    <ChevronDown className="h-4 w-4 text-primary transition-transform" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">{a.nome}</p>
                  <p className="text-[11px] text-muted-foreground">{a.colaboradores.length} atendentes</p>
                </div>
              </div>
              <span
                className={cn(
                  "flex items-center gap-1.5 text-[10px]",
                  a.status === "online"
                    ? "text-success"
                    : a.status === "ocupado"
                    ? "text-warning"
                    : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    a.status === "online"
                      ? "bg-success"
                      : a.status === "ocupado"
                      ? "bg-warning"
                      : "bg-muted-foreground"
                  )}
                />
                {a.statusLabel || a.status}
              </span>
            </div>

            {/* Dropdown com Colaboradores */}
            {expandedArea === a.nome && (
              <div className="animate-in slide-in-from-top-2 duration-300 bg-background/30">
                {a.colaboradores.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelect(a.nome)}
                    className={cn(
                      "flex w-full items-center gap-3 px-5 py-3 text-left transition-all hover:bg-primary/5 hover:pl-7",
                      idx !== a.colaboradores.length - 1 && "border-b border-border/30"
                    )}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary border border-border text-[10px] font-bold text-muted-foreground">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-foreground truncate">{c.nome}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{c.funcao}</p>
                    </div>
                    <span className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border",
                      c.qualificacao === "Proprietário"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : c.qualificacao === "Funcionário"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-accent/10 text-accent border-accent/20"
                    )}>
                      {c.qualificacao}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
