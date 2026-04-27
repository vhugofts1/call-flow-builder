import { useState } from "react";
import { Plus, Bell, Clock, CheckCircle2, AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useProfile } from "@/prototype/ProfileContext";
import { cn } from "@/lib/utils";

type Chamado = {
  p: string;
  t: string;
  s: string;
  c: string;
  abertura: string;
  sla: string;
  slaColor: string;
  destino: string;
};

const RECENTES: Chamado[] = [
  { p: "#2451", t: "Equipamento PDV", s: "Em andamento", c: "bg-primary/20 text-primary", abertura: "27/04/2026 · 09:14", sla: "4h restantes", slaColor: "text-success", destino: "DM Pinheiros" },
  { p: "#2447", t: "Reposição material", s: "Resolvido", c: "bg-success/20 text-success", abertura: "26/04/2026 · 16:42", sla: "Resolvido em 3h12", slaColor: "text-muted-foreground", destino: "Suprimentos" },
  { p: "#2440", t: "Erro sistema", s: "Aberto", c: "bg-warning/20 text-warning", abertura: "26/04/2026 · 08:05", sla: "SLA em risco · 30min", slaColor: "text-warning", destino: "TI Nacional" },
];

const TODOS: Chamado[] = [
  ...RECENTES,
  { p: "#2438", t: "Ar-condicionado com defeito", s: "Resolvido", c: "bg-success/20 text-success", abertura: "24/04/2026 · 14:20", sla: "Resolvido em 6h45", slaColor: "text-muted-foreground", destino: "DM Pinheiros" },
  { p: "#2431", t: "Solicitação de uniforme", s: "Resolvido", c: "bg-success/20 text-success", abertura: "22/04/2026 · 10:08", sla: "Resolvido em 1d2h", slaColor: "text-muted-foreground", destino: "RH" },
  { p: "#2425", t: "Falha na impressora fiscal", s: "Resolvido", c: "bg-success/20 text-success", abertura: "20/04/2026 · 18:55", sla: "Resolvido em 2h10", slaColor: "text-muted-foreground", destino: "TI Nacional" },
  { p: "#2418", t: "Pedido de reembolso", s: "Resolvido", c: "bg-success/20 text-success", abertura: "18/04/2026 · 11:30", sla: "Resolvido em 4d", slaColor: "text-muted-foreground", destino: "Financeiro" },
  { p: "#2410", t: "Manutenção bancada", s: "Cancelado", c: "bg-muted text-muted-foreground", abertura: "15/04/2026 · 09:00", sla: "—", slaColor: "text-muted-foreground", destino: "DM Pinheiros" },
];

const ChamadoCard = ({ t, showDestino }: { t: Chamado; showDestino?: boolean }) => (
  <div className="rounded-xl border border-border bg-card/60 p-3">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{t.p}{showDestino && <span className="ml-1">· {t.destino}</span>}</p>
        <p className="text-sm font-medium">{t.t}</p>
      </div>
      <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${t.c}`}>{t.s}</span>
    </div>
    <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/50 pt-2">
      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Aberto em {t.abertura}</span>
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-medium ${t.slaColor}`}>
        <AlertTriangle className="h-3 w-3" />
        <span>{t.sla}</span>
      </div>
    </div>
  </div>
);

export const Home = ({ onOpen }: { onOpen: () => void }) => {
  const { profile } = useProfile();
  const [filtro, setFiltro] = useState<"todos" | "abertos" | "resolvidos">("todos");

  const filtrados = TODOS.filter((c) => {
    if (filtro === "abertos") return c.s === "Aberto" || c.s === "Em andamento";
    if (filtro === "resolvidos") return c.s === "Resolvido";
    return true;
  });

  return (
    <div className="flex h-[760px] flex-col gradient-dark">
      <div className="flex items-center justify-between p-5">
        <div>
          <p className="text-xs text-muted-foreground">{profile.saudacao}</p>
          <p className="text-lg font-semibold">{profile.nome}</p>
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary glow-orange" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 px-5">
        {[
          { icon: Clock, n: "3", l: "Abertos", c: "text-primary" },
          { icon: AlertTriangle, n: "1", l: "SLA risco", c: "text-warning" },
          { icon: CheckCircle2, n: "12", l: "Resolvidos", c: "text-success" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-3">
            <s.icon className={`h-4 w-4 ${s.c}`} />
            <p className="mt-2 text-xl font-bold">{s.n}</p>
            <p className="text-[10px] text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="recentes" className="mt-5 flex flex-1 flex-col overflow-hidden">
        <div className="px-5">
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger value="recentes" className="text-xs">Recentes</TabsTrigger>
            <TabsTrigger value="todos" className="text-xs">Todos os chamados</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="recentes" className="mt-3 flex-1 overflow-y-auto px-5 pb-2">
          <div className="space-y-2">
            {RECENTES.map((t, i) => <ChamadoCard key={i} t={t} />)}
          </div>
        </TabsContent>

        <TabsContent value="todos" className="mt-3 flex-1 overflow-y-auto px-5 pb-2">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card/60 px-2 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Buscar por protocolo ou título"
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="mb-3 flex gap-1">
            {([
              { id: "todos", l: "Todos" },
              { id: "abertos", l: "Abertos" },
              { id: "resolvidos", l: "Resolvidos" },
            ] as const).map((f) => (
              <button
                key={f.id}
                onClick={() => setFiltro(f.id)}
                className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-medium transition-all",
                  filtro === f.id ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {f.l}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {filtrados.map((t, i) => <ChamadoCard key={i} t={t} showDestino />)}
            {filtrados.length === 0 && (
              <p className="py-8 text-center text-xs text-muted-foreground">Nenhum chamado encontrado.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="border-t border-border p-5">
        <Button
          onClick={onOpen}
          size="lg"
          className="h-14 w-full gradient-primary text-base font-bold text-primary-foreground glow-orange hover:opacity-90"
        >
          <Plus className="h-6 w-6" /> Abrir novo chamado
        </Button>
      </div>
    </div>
  );
};
