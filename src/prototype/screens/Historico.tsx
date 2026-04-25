import { Filter, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROWS = [
  { p: "#2451", t: "Equipamento PDV", c: "Equipamento", pr: "Média", s: "Em andamento", sla: "03:58", risk: false },
  { p: "#2450", t: "Erro login sistema", c: "Sistema/TI", pr: "Alta", s: "Aberto", sla: "00:42", risk: true },
  { p: "#2447", t: "Reposição embalagem", c: "Estoque", pr: "Baixa", s: "Resolvido", sla: "—", risk: false },
  { p: "#2440", t: "Falha cobrança", c: "Financeiro", pr: "Alta", s: "Em andamento", sla: "01:15", risk: true },
  { p: "#2438", t: "Treinamento novo func.", c: "Pessoas", pr: "Média", s: "Resolvido", sla: "—", risk: false },
];

export const Historico = ({ onSelect, onGlobal }: { onSelect: () => void; onGlobal: () => void }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {["Todos", "SLA risco", "Abertos", "Em andamento", "Resolvidos"].map((f, i) => (
          <button
            key={f}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
              i === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filtros</Button>
        <Button onClick={onGlobal} size="sm" className="gradient-primary text-primary-foreground">Visão global →</Button>
      </div>
    </div>

    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary text-xs uppercase text-muted-foreground">
          <tr>
            <th className="p-3 text-left">Protocolo</th>
            <th className="p-3 text-left">Título</th>
            <th className="p-3 text-left">Categoria</th>
            <th className="p-3 text-left">Prioridade</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">SLA</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.p} className="border-t border-border hover:bg-secondary/50">
              <td className="p-3 font-mono text-primary">{r.p}</td>
              <td className="p-3 font-medium">{r.t}</td>
              <td className="p-3 text-muted-foreground">{r.c}</td>
              <td className="p-3">
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  r.pr === "Alta" ? "bg-destructive/20 text-destructive" : r.pr === "Média" ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"
                }`}>{r.pr}</span>
              </td>
              <td className="p-3">
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  r.s === "Resolvido" ? "bg-success/20 text-success" : r.s === "Aberto" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                }`}>{r.s}</span>
              </td>
              <td className={`p-3 font-mono text-xs ${r.risk ? "text-destructive font-bold" : "text-muted-foreground"}`}>{r.sla}</td>
              <td className="p-3">
                <Button onClick={onSelect} variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
