import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Plus, Image } from "lucide-react";

const CATEGORIAS = ["Retorno por Devolução", "Taxa de Deslocamento", "Reembolso Loja", "Outros"];

const TEMPLATES: Record<string, string> = {
  "Retorno por Devolução": `Olá, tudo bem?
Entregador informa que foi até o local da entrega, porém cliente não encontrado. Em tratativas com a loja a mesma solicitou retorno. O Entregador retornou com a devolução à loja.

Entregador: Douglas José Siqueira
OS: 698945774`,
  "Taxa de Deslocamento": "",
  "Reembolso Loja": "",
  "Outros": "",
};

const PRIORIDADES = [
  { n: "Baixa", c: "border-border text-muted-foreground", a: "bg-muted text-foreground" },
  { n: "Média", c: "border-warning/40 text-warning", a: "bg-warning text-background" },
  { n: "Alta", c: "border-destructive/40 text-destructive", a: "bg-destructive text-destructive-foreground" },
];

export const Descricao = ({ onSubmit, destino }: { onSubmit: (cat: string, prio: string, desc: string) => void; destino?: string }) => {
  const [cat, setCat] = useState("Retorno por Devolução");
  const [prio, setPrio] = useState("Média");
  const [desc, setDesc] = useState(TEMPLATES["Retorno por Devolução"]);

  const selectCategoria = (nova: string) => {
    setCat(nova);
    const novoTemplate = TEMPLATES[nova] ?? "";
    const isTemplate = Object.values(TEMPLATES).includes(desc);
    if (!desc.trim() || isTemplate) {
      setDesc(novoTemplate);
    } else if (novoTemplate) {
      const ok = window.confirm("Substituir a descrição atual pelo modelo desta categoria?");
      if (ok) setDesc(novoTemplate);
    }
  };

  return (
    <div className="flex h-[760px] flex-col gradient-dark p-5">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-widest text-primary">Etapa 3 de 4</p>
        <h2 className="mt-1 text-xl font-bold">Descreva o chamado</h2>
        {destino && <p className="text-xs text-muted-foreground">→ {destino}</p>}
      </div>

      <div className="flex-1 space-y-4 overflow-auto">
        <div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground">CATEGORIA</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map((c) => (
              <button
                key={c}
                onClick={() => selectCategoria(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground">DESCRIÇÃO</p>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Detalhe o que aconteceu..."
            rows={5}
            className="w-full resize-none rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card/40 py-3 text-xs text-muted-foreground hover:border-primary">
          <Paperclip className="h-4 w-4" /> Anexar foto ou arquivo
        </button>
      </div>

      <Button
        onClick={() => onSubmit(cat, prio, desc || "Chamado de teste do protótipo")}
        size="lg"
        className="mt-4 h-12 w-full gradient-primary font-bold text-primary-foreground glow-orange"
      >
        Enviar chamado →
      </Button>
    </div>
  );
};
