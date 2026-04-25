import { Activity, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const CIDADES = [
  { n: "São Paulo", a: 24, r: 3, h: "h-32" },
  { n: "Rio de Janeiro", a: 18, r: 2, h: "h-24" },
  { n: "Belo Horizonte", a: 12, r: 1, h: "h-20" },
  { n: "Curitiba", a: 9, r: 0, h: "h-16" },
  { n: "Porto Alegre", a: 7, r: 1, h: "h-14" },
  { n: "Salvador", a: 5, r: 0, h: "h-12" },
];

export const Global = ({ onCidade }: { onCidade: () => void }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-4 gap-3">
      {[
        { l: "Total ativos", v: "75", c: "text-primary" },
        { l: "SLA risco", v: "7", c: "text-destructive" },
        { l: "Cidades online", v: "6", c: "text-success" },
        { l: "Resolvidos hoje", v: "42", c: "text-accent" },
      ].map((k) => (
        <div key={k.l} className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">{k.l}</p>
          <p className={`mt-1 text-3xl font-bold ${k.c}`}>{k.v}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold">Volume por cidade</p>
        </div>
        <div className="flex items-end justify-between gap-3 h-40">
          {CIDADES.map((c) => (
            <button key={c.n} onClick={onCidade} className="group flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-col items-center justify-end h-full">
                <span className="mb-1 text-[10px] font-bold text-primary">{c.a}</span>
                <div className={`w-full rounded-t-lg gradient-primary transition-all group-hover:glow-orange ${c.h}`} />
              </div>
              <p className="text-[10px] text-muted-foreground group-hover:text-primary">{c.n.split(" ")[0]}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" />
          <p className="text-sm font-semibold">Atividade ao vivo</p>
        </div>
        <div className="space-y-2">
          {[
            { c: "São Paulo", a: "Novo chamado #2451" },
            { c: "Rio de Janeiro", a: "Resolvido #2398" },
            { c: "BH", a: "Atendente atribuído" },
            { c: "Curitiba", a: "SLA em risco" },
          ].map((e, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-secondary p-2">
              <MapPin className="mt-0.5 h-3 w-3 text-accent" />
              <div>
                <p className="text-xs font-medium">{e.c}</p>
                <p className="text-[10px] text-muted-foreground">{e.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <Button onClick={onCidade} size="lg" className="w-full gradient-primary font-bold text-primary-foreground glow-orange">
      Abrir histórico da cidade selecionada →
    </Button>
  </div>
);
