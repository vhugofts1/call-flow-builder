import { CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Protocolo = ({ protocolo, onTrack, onHome }: { protocolo: string; onTrack: () => void; onHome: () => void }) => (
  <div className="flex h-[760px] flex-col items-center justify-center gap-6 gradient-dark p-6 text-center">
    <div className="relative">
      <div className="absolute inset-0 animate-pulse rounded-full bg-primary/30 blur-2xl" />
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full gradient-primary glow-orange">
        <CheckCircle2 className="h-12 w-12 text-primary-foreground" />
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-glow">Chamado aberto!</h2>
      <p className="mt-1 text-sm text-muted-foreground">Você receberá atualizações em tempo real</p>
    </div>

    <div className="w-full rounded-2xl border border-primary/40 bg-card p-4 glow-orange">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Protocolo</p>
      <p className="font-mono text-3xl font-bold text-primary text-glow">{protocolo}</p>
    </div>

    <div className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-warning" />
        <div className="text-left">
          <p className="text-xs text-muted-foreground">SLA</p>
          <p className="text-sm font-semibold">Resposta em 4h</p>
        </div>
      </div>
      <span className="rounded-full bg-warning/20 px-2 py-1 text-xs font-medium text-warning">03:58:42</span>
    </div>

    <div className="mt-auto w-full space-y-2">
      <Button onClick={onTrack} size="lg" className="h-12 w-full gradient-primary font-bold text-primary-foreground glow-orange">
        Acompanhar chamado
      </Button>
      <Button onClick={onHome} variant="ghost" size="lg" className="h-12 w-full">
        Voltar para o início
      </Button>
    </div>
  </div>
);
