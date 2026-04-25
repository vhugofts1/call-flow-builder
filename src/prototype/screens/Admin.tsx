import { Search } from "lucide-react";

const AREAS = [
  { n: "Recursos Humanos", s: "online", t: "5 atendentes" },
  { n: "Financeiro", s: "online", t: "3 atendentes" },
  { n: "Tecnologia", s: "online", t: "8 atendentes" },
  { n: "Jurídico", s: "ocupado", t: "2 atendentes" },
  { n: "Marketing", s: "online", t: "4 atendentes" },
  { n: "Compras", s: "offline", t: "Resp. próx. dia útil" },
];

export const Admin = ({ onSelect }: { onSelect: (n: string) => void }) => (
  <div className="flex h-[760px] flex-col gradient-dark p-5">
    <div className="mb-4">
      <p className="text-xs uppercase tracking-widest text-primary">Etapa 2 de 4</p>
      <h2 className="mt-1 text-xl font-bold">Selecione a área</h2>
    </div>

    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        placeholder="Buscar área..."
        className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm outline-none focus:border-primary"
      />
    </div>

    <div className="flex-1 space-y-2 overflow-auto">
      {AREAS.map((a) => (
        <button
          key={a.n}
          onClick={() => onSelect(a.n)}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary hover:bg-card/80"
        >
          <div>
            <p className="text-sm font-semibold">{a.n}</p>
            <p className="text-[11px] text-muted-foreground">{a.t}</p>
          </div>
          <span
            className={`flex items-center gap-1.5 text-[10px] ${
              a.s === "online" ? "text-success" : a.s === "ocupado" ? "text-warning" : "text-muted-foreground"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                a.s === "online" ? "bg-success" : a.s === "ocupado" ? "bg-warning" : "bg-muted-foreground"
              }`}
            />
            {a.s}
          </span>
        </button>
      ))}
    </div>
  </div>
);
