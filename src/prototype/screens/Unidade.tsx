import { MapPin } from "lucide-react";

const CIDADES = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba"];
const UNIDADES = [
  { n: "DM Centro", c: "SP", id: "001" },
  { n: "DM Pinheiros", c: "SP", id: "002" },
  { n: "DM Moema", c: "SP", id: "003" },
  { n: "DM Vila Olímpia", c: "SP", id: "004" },
  { n: "DM Itaim", c: "SP", id: "005" },
  { n: "DM Tatuapé", c: "SP", id: "006" },
];

export const Unidade = ({ onSelect }: { onSelect: (n: string, c: string) => void }) => (
  <div className="flex h-[760px] flex-col gradient-dark p-5">
    <div className="mb-4">
      <p className="text-xs uppercase tracking-widest text-accent">Etapa 2 de 4</p>
      <h2 className="mt-1 text-xl font-bold">Selecione a unidade</h2>
    </div>

    <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
      {CIDADES.map((c, i) => (
        <button
          key={c}
          className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium ${
            i === 0 ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card text-muted-foreground"
          }`}
        >
          {c}
        </button>
      ))}
    </div>

    <div className="grid flex-1 grid-cols-2 gap-2 overflow-auto">
      {UNIDADES.map((u) => (
        <button
          key={u.id}
          onClick={() => onSelect(u.n, "São Paulo")}
          className="rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-accent hover:glow-orange"
        >
          <MapPin className="h-4 w-4 text-accent" />
          <p className="mt-2 text-sm font-semibold">{u.n}</p>
          <p className="text-[10px] text-muted-foreground">#{u.id} · {u.c}</p>
        </button>
      ))}
    </div>
  </div>
);
