import { CheckCircle2, MessageSquare, Star, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Resolucao = ({ protocolo, onFinalizar }: { protocolo: string; onFinalizar: () => void }) => (
  <div className="grid grid-cols-3 gap-6">
    <div className="col-span-2 space-y-4">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Protocolo</p>
            <p className="font-mono text-xl font-bold text-primary">{protocolo}</p>
          </div>
          <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-bold text-success">RESOLVIDO</span>
        </div>
        <h3 className="text-lg font-bold">Equipamento PDV travando</h3>
        <p className="mt-1 text-sm text-muted-foreground">Categoria: Equipamento · Prioridade: Média · DM Centro - SP</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold">Linha do tempo</p>
        </div>
        <div className="space-y-4">
          {[
            { t: "10:42", a: "João Silva", e: "Abriu o chamado", c: "" },
            { t: "10:45", a: "Sistema", e: "Atribuído a Marina S. (SP)", c: "bg-primary/10" },
            { t: "11:10", a: "Marina S.", e: "Solicitei foto do erro. Você consegue enviar?", c: "" },
            { t: "11:15", a: "João Silva", e: "Foto enviada", c: "bg-secondary" },
            { t: "12:30", a: "Marina S.", e: "Reset realizado. Equipamento operando.", c: "bg-success/10" },
          ].map((m, i) => (
            <div key={i} className={`flex gap-3 rounded-xl p-3 ${m.c || "bg-card/40"}`}>
              <span className="font-mono text-xs text-muted-foreground">{m.t}</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-primary">{m.a}</p>
                <p className="text-sm">{m.e}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-3">
        <div className="flex items-center gap-2">
          <input
            placeholder="Adicionar comentário..."
            className="flex-1 bg-transparent px-2 text-sm outline-none"
          />
          <Button variant="ghost" size="sm"><Paperclip className="h-4 w-4" /></Button>
          <Button size="sm" className="gradient-primary text-primary-foreground">Enviar</Button>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div className="rounded-2xl border border-success/30 bg-card p-5">
        <CheckCircle2 className="h-8 w-8 text-success" />
        <p className="mt-2 text-sm font-bold">Chamado resolvido</p>
        <p className="mt-1 text-xs text-muted-foreground">Resolvido em 1h48 · Dentro do SLA</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-xs font-semibold text-muted-foreground">AVALIE O ATENDIMENTO</p>
        <div className="mt-3 flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className={`h-7 w-7 ${s <= 5 ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">Excelente!</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-xs font-semibold text-muted-foreground">RESPONSÁVEL</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">MS</div>
          <div>
            <p className="text-sm font-semibold">Marina Silva</p>
            <p className="text-[10px] text-muted-foreground">Suporte Técnico · SP</p>
          </div>
        </div>
      </div>

      <Button onClick={onFinalizar} size="lg" className="w-full gradient-primary font-bold text-primary-foreground glow-orange">
        Finalizar e voltar
      </Button>
    </div>
  </div>
);
