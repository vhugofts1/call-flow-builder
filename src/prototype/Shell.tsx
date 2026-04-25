import { ReactNode } from "react";
import { ScreenId } from "./types";
import { cn } from "@/lib/utils";
import { ChevronLeft, Zap } from "lucide-react";

const FLOW: { id: ScreenId; label: string }[] = [
  { id: "home", label: "1. Home" },
  { id: "tipo", label: "2. Tipo" },
  { id: "admin", label: "3a. Admin" },
  { id: "unidade", label: "3b. Unidade" },
  { id: "descricao", label: "4. Descrição" },
  { id: "protocolo", label: "5. Protocolo" },
  { id: "notificacao", label: "6. Atendente" },
  { id: "historico", label: "7. Histórico" },
  { id: "global", label: "8. Global" },
  { id: "resolucao", label: "9. Resolução" },
];

interface ShellProps {
  current: ScreenId;
  onNavigate: (id: ScreenId) => void;
  onBack?: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  device?: "mobile" | "desktop";
}

export const Shell = ({ current, onNavigate, onBack, title, subtitle, children, device = "mobile" }: ShellProps) => {
  return (
    <div className="min-h-screen bg-background bg-glow">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary glow-orange">
              <Zap className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-wide text-glow">DELMATCH</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Chamados · Protótipo</div>
            </div>
          </div>
          <div className="ml-4 hidden flex-wrap gap-1 md:flex">
            {FLOW.map((s) => (
              <button
                key={s.id}
                onClick={() => onNavigate(s.id)}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-medium transition-all",
                  current === s.id
                    ? "gradient-primary text-primary-foreground glow-orange"
                    : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Screen container */}
      <main className="mx-auto max-w-[1600px] px-4 py-8">
        <div className={cn("flex items-start gap-3", onBack ? "" : "")}>
          {onBack && (
            <button
              onClick={onBack}
              className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-all hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-glow">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            <div
              className={cn(
                "rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]",
                device === "mobile" ? "mx-auto max-w-[440px] overflow-hidden" : "p-6"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
