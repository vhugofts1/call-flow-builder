import { Building2, Store, ArrowRight } from "lucide-react";

export const Tipo = ({ onSelect }: { onSelect: (t: "admin" | "unidade") => void }) => (
  <div className="flex h-[760px] flex-col gradient-dark p-5">
    <div className="mb-6">
      <p className="text-xs uppercase tracking-widest text-primary">Etapa 1 de 4</p>
      <h2 className="mt-1 text-xl font-bold">Para quem é o chamado?</h2>
      <p className="text-sm text-muted-foreground">Escolha o destino da solicitação</p>
    </div>

    <div className="space-y-3">
      <button
        onClick={() => onSelect("admin")}
        className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-all hover:border-primary hover:glow-orange"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
          <Building2 className="h-7 w-7 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-bold">Administrativo</p>
          <p className="text-xs text-muted-foreground">RH, Financeiro, TI, Jurídico</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </button>

      <button
        onClick={() => onSelect("unidade")}
        className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-all hover:border-accent hover:glow-orange"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
          <Store className="h-7 w-7 text-accent-foreground" />
        </div>
        <div className="flex-1">
          <p className="font-bold">Unidade / Loja</p>
          <p className="text-xs text-muted-foreground">Operação, equipamento, estoque</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
      </button>
    </div>

    <div className="mt-auto rounded-xl border border-border bg-card/40 p-3 text-[11px] text-muted-foreground">
      💡 A escolha define o time responsável e o SLA aplicado.
    </div>
  </div>
);
