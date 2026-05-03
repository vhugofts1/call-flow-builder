import { Bell, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsavelInfo } from "../types";
import { cn } from "@/lib/utils";

interface NotificacaoProps {
  protocolo: string;
  cidade: string;
  categoria?: string;
  responsaveis?: ResponsavelInfo[];
  onAceitar: () => void;
}

export const Notificacao = ({ protocolo, cidade, categoria, responsaveis, onAceitar }: NotificacaoProps) => {
  // Filtra apenas responsáveis da cidade onde o atendente está logado (1ª cidade do chamado)
  const cidadePrincipal = cidade.split(",")[0].trim();
  const respCidade = (responsaveis || []).filter((r) => r.cidade === cidadePrincipal);
  const respExibir = respCidade.length > 0 ? respCidade : (responsaveis || []).slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-primary/30 bg-card p-5 glow-orange">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
            <Bell className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Nova notificação · agora</p>
            <p className="font-bold">Chamado recebido — {cidadePrincipal}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="rounded-xl bg-secondary p-3">
            <p className="text-[10px] uppercase text-muted-foreground">Protocolo</p>
            <p className="font-mono text-sm font-bold text-primary">{protocolo}</p>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <p className="text-[10px] uppercase text-muted-foreground">Cidade</p>
            <p className="text-sm font-semibold">{cidadePrincipal}</p>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <p className="text-[10px] uppercase text-muted-foreground">Categoria</p>
            <p className="text-sm font-semibold">{categoria || "—"}</p>
          </div>
          <div className="rounded-xl bg-accent/15 p-3">
            <p className="flex items-center gap-1 text-[10px] uppercase text-accent">
              <Clock className="h-3 w-3" /> SLA Atendimento
            </p>
            <p className="text-sm font-bold text-accent">04:00</p>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Responsáveis recebendo este chamado em {cidadePrincipal} ({respExibir.length})
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {respExibir.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/50"
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                  r.cor
                )}
              >
                {r.iniciais}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{r.nome}</p>
                <p className="truncate text-[11px] text-muted-foreground">{r.cargo} · {r.unidade}</p>
              </div>
            </div>
          ))}
          {respExibir.length === 0 && (
            <p className="col-span-full text-xs text-muted-foreground">Nenhum responsável vinculado a esta cidade.</p>
          )}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          🔒 Cada cidade visualiza apenas os chamados destinados aos seus próprios responsáveis.
        </p>
      </div>

      <Button onClick={onAceitar} size="lg" className="w-full gradient-primary font-bold text-primary-foreground glow-orange">
        Atribuir e atender <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
