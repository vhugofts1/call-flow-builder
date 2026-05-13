import { CheckCircle2, Clock, UserCheck, MapPin, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsavelInfo } from "../types";
import { cn } from "@/lib/utils";

interface ProtocoloProps {
  protocolo: string;
  cidade: string;
  categoria?: string;
  responsaveis?: ResponsavelInfo[];
  apoios?: ResponsavelInfo[];
  onTrack: () => void;
  onHome: () => void;
}

export const Protocolo = ({ protocolo, cidade, categoria, responsaveis, apoios, onTrack, onHome }: ProtocoloProps) => {
  const cidadePrincipal = cidade.split(",")[0].trim();
  const respExibir = (responsaveis || []).filter(r => r.cidade === cidadePrincipal).length > 0 
    ? (responsaveis || []).filter(r => r.cidade === cidadePrincipal)
    : (responsaveis || []).slice(0, 4);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-success/30 blur-2xl" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success glow-success">
            <CheckCircle2 className="h-10 w-10 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-glow">Chamado Aberto com Sucesso!</h2>
          <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
            Seu protocolo foi gerado e os responsáveis já foram notificados.
          </p>
        </div>
      </div>

      {/* Protocol Card */}
      <div className="rounded-3xl border border-primary/40 bg-card p-6 glow-orange text-center relative overflow-hidden group hover:border-primary transition-all">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-1">Número do Protocolo</p>
        <p className="font-mono text-4xl font-black text-primary tracking-tight text-glow select-all cursor-copy group-active:scale-95 transition-transform">
          {protocolo}
        </p>
      </div>

      {/* Summary Info Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-border bg-card p-3 flex flex-col gap-1">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <p className="text-[9px] uppercase font-bold text-muted-foreground">Unidade</p>
          <p className="text-[11px] font-bold truncate">{cidadePrincipal}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-3 flex flex-col gap-1">
          <Tag className="h-3.5 w-3.5 text-accent" />
          <p className="text-[9px] uppercase font-bold text-muted-foreground">Categoria</p>
          <p className="text-[11px] font-bold truncate">{categoria || "—"}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-3 flex flex-col gap-1">
          <Clock className="h-3.5 w-3.5 text-warning" />
          <p className="text-[9px] uppercase font-bold text-muted-foreground">Prazo SLA</p>
          <p className="text-[11px] font-bold truncate text-warning">04:00h</p>
        </div>
      </div>

      {/* Responsibles Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <UserCheck className="h-3.5 w-3.5 text-success" />
            Responsáveis Notificados ({respExibir.length + (apoios?.length || 0)})
          </p>
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Apoio Cards */}
          {apoios?.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-2xl border-2 border-indigo-500/30 bg-indigo-500/5 p-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-2 py-0.5 bg-indigo-500 text-[8px] font-black text-white rounded-bl-lg tracking-widest">APOIO</div>
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white shadow-lg", p.cor)}>
                {p.iniciais}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-foreground">{p.nome}</p>
                <p className="truncate text-[10px] text-indigo-400 font-bold uppercase tracking-tight">{p.cargo} · {p.cidade}</p>
              </div>
            </div>
          ))}

          {respExibir.map((r) => (
            <div key={r.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 p-3 hover:bg-secondary/30 transition-colors group">
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white shadow-lg", r.cor)}>
                {r.iniciais}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-foreground group-hover:text-primary transition-colors">{r.nome}</p>
                <p className="truncate text-[10px] text-muted-foreground font-medium">{r.cargo} · {r.unidade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex flex-col gap-3">
        <Button onClick={onTrack} size="lg" className="h-14 w-full rounded-2xl gradient-primary font-black text-primary-foreground text-sm uppercase tracking-wider shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all group">
          Acompanhar Chamado Agora
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button onClick={onHome} variant="ghost" size="lg" className="h-12 w-full rounded-2xl text-xs font-bold text-muted-foreground hover:text-foreground">
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};
