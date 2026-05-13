import { Activity, TrendingUp, AlertTriangle, CheckCircle2, ListFilter, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProfile } from "../ProfileContext";
import { useMemo } from "react";
import { CONTATOS_UNIDADES } from "../data";

export const Global = ({ onCidade }: { onCidade: () => void }) => {
  const { profile } = useProfile();
  
  const STATS_PESSOAIS = [
    { n: "Resolvidos", v: 84, c: "text-success", b: "bg-success", h: "h-40" },
    { n: "Em Andamento", v: 12, c: "text-primary", b: "gradient-primary", h: "h-20" },
    { n: "Abertos", v: 7, c: "text-warning", b: "bg-warning", h: "h-14" },
  ];

  // Lógica para extrair cidades únicas e gerar volumes dinâmicos para o Top 6
  const topCidades = useMemo(() => {
    // 1. Pega nomes únicos de cidades
    const cidadesUnicas = Array.from(new Set(CONTATOS_UNIDADES.map(c => c.cidade)));
    
    // 2. Gera dados de volume fictícios para o protótipo
    // Usamos um cálculo baseado no índice para que os valores fiquem consistentes ao recarregar
    const dadosMapeados = cidadesUnicas.map((nome, index) => {
      const volumeBase = 45 - (index * 7); // Decrescente para visual de escada
      const risco = Math.max(0, index === 0 ? 8 : index === 1 ? 4 : 0); // Alguns com risco
      
      // Define a classe de altura (h-40, h-32, etc) proporcional ao volume
      let alturaClass = "h-10";
      if (volumeBase > 40) alturaClass = "h-40";
      else if (volumeBase > 30) alturaClass = "h-32";
      else if (volumeBase > 20) alturaClass = "h-24";
      else if (volumeBase > 10) alturaClass = "h-16";

      return {
        n: nome,
        v: Math.max(5, volumeBase),
        r: risco,
        h: alturaClass
      };
    });

    // 3. Ordena por volume e pega o TOP 6
    return dadosMapeados
      .sort((a, b) => b.v - a.v)
      .slice(0, 6);
  }, []);

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

      {/* KPIs de Impacto da Operação */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Alertas Críticos de SLA */}
        <div className="relative overflow-hidden rounded-2xl border border-destructive/50 bg-destructive/10 p-6 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
          <div className="absolute -right-2 -top-2 opacity-10">
            <AlertTriangle className="h-20 w-20 text-destructive" />
          </div>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Alertas Críticos (SLA)</p>
          </div>
          <p className="mt-2 text-4xl font-black text-destructive">12</p>
          <p className="mt-1 text-[10px] text-destructive/70 font-medium">Ações imediatas necessárias na rede</p>
        </div>

        {/* Backlog Ativo Global */}
        <div className="rounded-2xl border border-border bg-card p-6 border-l-4 border-l-primary shadow-lg shadow-primary/5">
          <div className="flex items-center gap-2 text-primary">
            <ListFilter className="h-4 w-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Backlog Ativo</p>
          </div>
          <p className="mt-2 text-4xl font-black text-foreground">142</p>
          <p className="mt-1 text-[10px] text-muted-foreground font-medium">Volume total em aberto no sistema</p>
        </div>

        {/* Total Resolvido Operação */}
        <div className="rounded-2xl border border-border bg-card p-6 border-l-4 border-l-success">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-4 w-4" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Resolvidos (Operação / Mês)</p>
          </div>
          <p className="mt-2 text-4xl font-black text-success">1.240</p>
          <p className="mt-1 text-[10px] text-muted-foreground font-medium">Eficiência global acumulada no período</p>
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
            {topCidades.map((c) => (
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
        {/* Ranking de Assuntos por Unidade */}
        <div className="col-span-1 lg:col-span-3 rounded-2xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <p className="text-sm font-bold uppercase tracking-wider">Ranking de Assuntos Recorrentes (Top 6 Cidades)</p>
            </div>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest bg-secondary/50 px-2 py-1 rounded">Consolidado</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-2">
            {[
              { n: "Retorno por Devolução", v: 42, p: "w-[85%]", c: "bg-primary" },
              { n: "Taxa de Deslocamento", v: 31, p: "w-[65%]", c: "bg-accent" },
              { n: "Reembolso Loja", v: 19, p: "w-[40%]", c: "bg-warning" },
              { n: "Outros Assuntos", v: 12, p: "w-[25%]", c: "bg-muted-foreground" },
            ].map((item, i) => (
              <div key={i} className="group space-y-2.5">
                <div className="flex items-end justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">{item.n}</p>
                    <p className="text-xs font-bold text-foreground/80">{item.v} chamados abertos</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-accent">{item.p.match(/\d+/)?.[0]}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div className={cn(
                    "h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-125",
                    item.c,
                    item.p
                  )} />
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
