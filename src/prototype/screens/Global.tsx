import { Activity, TrendingUp, AlertTriangle, CheckCircle2, ListFilter, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProfile } from "../ProfileContext";

export const Global = ({ onCidade }: { onCidade: () => void }) => {
  const { profile } = useProfile();
  
  const STATS_PESSOAIS = [
    { n: "Resolvidos", v: 84, c: "text-success", b: "bg-success", h: "h-40" },
    { n: "Em Andamento", v: 12, c: "text-primary", b: "gradient-primary", h: "h-20" },
    { n: "Abertos", v: 7, c: "text-warning", b: "bg-warning", h: "h-14" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header do Perfil no Dashboard */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card/50 p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-sm font-bold text-white shadow-lg">
            {profile.iniciais}
          </div>
          <div>
            <h2 className="text-sm font-bold leading-none">Dashboard de {profile.nome}</h2>
            <p className="mt-1 text-[10px] text-muted-foreground uppercase tracking-widest">{profile.cargo} · Visão Geral</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[10px] font-bold text-success border border-success/20">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Online
          </span>
        </div>
      </div>

      {/* Meus KPIs de Impacto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* SLA em Risco Crítico */}
        <div className="relative overflow-hidden rounded-2xl border border-destructive/50 bg-destructive/10 p-6 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
          <div className="absolute -right-2 -top-2 opacity-10">
            <AlertTriangle className="h-20 w-20 text-destructive" />
          </div>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Meus em Risco</p>
          </div>
          <p className="mt-2 text-4xl font-black text-destructive">03</p>
          <p className="mt-1 text-[10px] text-destructive/70 font-medium">Priorize estas tratativas agora</p>
        </div>

        {/* Meus Chamados Abertos/Ativos */}
        <div className="rounded-2xl border border-border bg-card p-6 border-l-4 border-l-primary">
          <div className="flex items-center gap-2 text-primary">
            <ListFilter className="h-4 w-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Sob Minha Responsabilidade</p>
          </div>
          <p className="mt-2 text-4xl font-black text-foreground">19</p>
          <p className="mt-1 text-[10px] text-muted-foreground font-medium">Chamados aguardando interação</p>
        </div>

        {/* Meus Resolvidos */}
        <div className="rounded-2xl border border-border bg-card p-6 border-l-4 border-l-success">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-4 w-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Total Resolvido (Mês)</p>
          </div>
          <p className="mt-2 text-4xl font-black text-success">84</p>
          <p className="mt-1 text-[10px] text-muted-foreground font-medium">Produtividade pessoal acumulada</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Volume por Cidade (Barras Verticais) */}
        <div className="col-span-1 lg:col-span-2 rounded-2xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="text-sm font-bold uppercase tracking-wider">Volume de Incidentes por Cidade</p>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground px-2 py-1 bg-secondary rounded-md uppercase">Visão Geral</span>
          </div>
          
          <div className="flex items-end justify-between gap-4 h-56 pt-6">
            {[
              { n: "São Paulo", v: 42, r: 8, h: "h-40" },
              { n: "Araçatuba", v: 31, r: 4, h: "h-32" },
              { n: "Rio de Janeiro", v: 28, r: 2, h: "h-28" },
              { n: "BH", v: 19, r: 1, h: "h-20" },
              { n: "Curitiba", v: 15, r: 0, h: "h-16" },
              { n: "Salvador", v: 8, r: 0, h: "h-10" },
            ].map((c) => (
              <button key={c.n} onClick={onCidade} className="group flex flex-1 flex-col items-center gap-3">
                <div className="flex w-full flex-col items-center justify-end h-full relative">
                  {c.r > 0 && (
                    <div className="absolute -top-7 flex flex-col items-center">
                      <span className="text-[9px] font-bold text-destructive animate-bounce">{c.r}!</span>
                    </div>
                  )}
                  <span className="mb-1 text-[11px] font-black text-primary transition-transform group-hover:scale-125">{c.v}</span>
                  <div 
                    className={cn(
                      "w-full rounded-t-xl transition-all duration-500 group-hover:glow-orange",
                      c.r > 5 ? "bg-destructive shadow-[0_0_15px_rgba(239,68,68,0.3)]" : "gradient-primary shadow-lg",
                      c.h
                    )} 
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-foreground group-hover:text-primary transition-colors">{c.n}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Status do Atendente (Barras Horizontais) */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <p className="text-sm font-bold uppercase tracking-wider">Meus Status de Chamados</p>
          </div>
          <div className="space-y-6 pt-4">
            {[
              { n: "Resolvidos", v: 84, p: "w-[100%]", c: "text-success", b: "bg-success" },
              { n: "Em Andamento", v: 12, p: "w-[35%]", c: "text-primary", b: "bg-primary" },
              { n: "Abertos", v: 7, p: "w-[15%]", c: "text-warning", b: "bg-warning" },
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-muted-foreground uppercase">{s.n}</span>
                  <span className={cn("text-lg", s.c)}>{s.v}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden shadow-inner">
                  <div className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    s.b,
                    s.p
                  )} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Atividade Recente do Atendente */}
        <div className="col-span-1 lg:col-span-3 rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-accent" />
            <p className="text-sm font-bold uppercase tracking-wider">Atividade ao Vivo do Sistema</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { c: "São Paulo", a: "Novo chamado #2451", t: "agora", type: "new" },
              { c: "Araçatuba", a: "SLA em Risco Crítico", t: "5 min", type: "risk" },
              { c: "Rio de Janeiro", a: "Chamado Resolvido #2398", t: "1h", type: "resolved" },
              { c: "Belo Horizonte", a: "Técnico em deslocamento", t: "3h", type: "info" },
              { c: "Curitiba", a: "Aguardando aprovação", t: "4h", type: "info" },
              { c: "Porto Alegre", a: "Manutenção preventiva", t: "5h", type: "info" },
            ].map((e, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border/50 bg-secondary/30 p-3 hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className={cn(
                  "mt-1 h-2 w-2 rounded-full",
                  e.type === "new" ? "bg-primary animate-pulse" : e.type === "risk" ? "bg-destructive" : e.type === "resolved" ? "bg-success" : "bg-muted-foreground"
                )} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-foreground">{e.c}</p>
                    <span className="text-[9px] text-muted-foreground font-mono">{e.t}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{e.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={onCidade} size="lg" className="flex-1 gradient-primary font-bold text-white glow-orange h-14 text-base">
          Ir para Fila de Chamados (Histórico) →
        </Button>
      </div>
    </div>
  );
};
