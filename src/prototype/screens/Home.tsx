import { Plus, Bell, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/prototype/ProfileContext";

export const Home = ({ onOpen }: { onOpen: () => void }) => {
  const { profile } = useProfile();
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

    <div className="mt-6 flex-1 px-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recentes</p>
      <div className="space-y-2">
        {[
          { p: "#2451", t: "Equipamento PDV", s: "Em andamento", c: "bg-primary/20 text-primary" },
          { p: "#2447", t: "Reposição material", s: "Resolvido", c: "bg-success/20 text-success" },
          { p: "#2440", t: "Erro sistema", s: "Aberto", c: "bg-warning/20 text-warning" },
        ].map((t, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-card/60 p-3">
            <div>
              <p className="text-xs text-muted-foreground">{t.p}</p>
              <p className="text-sm font-medium">{t.t}</p>
            </div>
            <span className={`rounded-full px-2 py-1 text-[10px] font-medium ${t.c}`}>{t.s}</span>
          </div>
        ))}
      </div>
    </div>

    <div className="p-5">
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
