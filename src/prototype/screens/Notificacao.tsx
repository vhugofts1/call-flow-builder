import { Bell, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Notificacao = ({ protocolo, cidade, onAceitar }: { protocolo: string; cidade: string; onAceitar: () => void }) => (
  <div className="space-y-6">
    <div className="rounded-2xl border border-primary/30 bg-card p-5 glow-orange">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
          <Bell className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Nova notificação · agora</p>
          <p className="font-bold">Chamado recebido — {cidade}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-xl bg-secondary p-3">
          <p className="text-[10px] uppercase text-muted-foreground">Protocolo</p>
          <p className="font-mono text-sm font-bold text-primary">{protocolo}</p>
        </div>
        <div className="rounded-xl bg-secondary p-3">
          <p className="text-[10px] uppercase text-muted-foreground">Cidade</p>
          <p className="text-sm font-semibold">{cidade}</p>
        </div>
        <div className="rounded-xl bg-secondary p-3">
          <p className="text-[10px] uppercase text-muted-foreground">Categoria</p>
          <p className="text-sm font-semibold">Equipamento</p>
        </div>
        <div className="rounded-xl bg-warning/20 p-3">
          <p className="text-[10px] uppercase text-warning">Prioridade</p>
          <p className="text-sm font-bold text-warning">Média</p>
        </div>
      </div>
    </div>

    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Atendentes disponíveis na cidade</p>
      <div className="grid grid-cols-3 gap-3">
        {[
          { n: "Marina S.", t: "12 abertos", s: true },
          { n: "Carlos R.", t: "8 abertos", s: false },
          { n: "Ana P.", t: "15 abertos", s: false },
        ].map((a) => (
          <button
            key={a.n}
            className={`rounded-xl border p-4 text-left transition-all ${
              a.s ? "border-primary bg-primary/10 glow-orange" : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <Users className={`h-5 w-5 ${a.s ? "text-primary" : "text-muted-foreground"}`} />
            <p className="mt-2 text-sm font-semibold">{a.n}</p>
            <p className="text-[11px] text-muted-foreground">{a.t}</p>
          </button>
        ))}
      </div>
    </div>

    <Button onClick={onAceitar} size="lg" className="w-full gradient-primary font-bold text-primary-foreground glow-orange">
      Atribuir e atender <ArrowRight className="h-4 w-4" />
    </Button>
  </div>
);
