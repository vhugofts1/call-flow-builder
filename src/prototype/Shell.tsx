import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ScreenId } from "./types";
import { cn } from "@/lib/utils";
import { ChevronLeft, Zap, ChevronDown, LogIn, LogOut } from "lucide-react";
import { useProfile } from "./ProfileContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { profile, setProfileId, profiles, authedAtendente, signOut } = useProfile();
  const roleColor: Record<string, string> = {
    solicitante: "text-primary border-primary/40 bg-primary/10",
    atendente: "text-accent border-accent/40 bg-accent/10",
    gestor: "text-warning border-warning/40 bg-warning/10",
  };
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

          {/* Profile switcher */}
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-2 py-1.5 transition-all hover:opacity-90",
                    roleColor[profile.role]
                  )}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-[10px] font-bold">
                    {profile.iniciais}
                  </span>
                  <div className="hidden text-left leading-tight sm:block">
                    <div className="text-[11px] font-semibold">{profile.nome}</div>
                    <div className="text-[9px] uppercase tracking-wider opacity-80">{profile.role}</div>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Ver protótipo como
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {profiles.map((p) => (
                  <DropdownMenuItem
                    key={p.id}
                    onClick={() => setProfileId(p.id)}
                    className={cn("flex items-start gap-3 py-2", profile.id === p.id && "bg-secondary")}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-bold",
                        roleColor[p.role]
                      )}
                    >
                      {p.iniciais}
                    </span>
                    <div className="leading-tight">
                      <div className="text-sm font-semibold">{p.nome}</div>
                      <div className="text-[10px] text-muted-foreground">{p.cargo}</div>
                    </div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                {authedAtendente ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => setProfileId("auth")}
                      className={cn("flex items-start gap-3 py-2", profile.id === authedAtendente.id && "bg-secondary")}
                    >
                      <span className={cn("flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-bold", roleColor.atendente)}>
                        {authedAtendente.iniciais}
                      </span>
                      <div className="leading-tight">
                        <div className="text-sm font-semibold">{authedAtendente.nome} <span className="text-[9px] text-success">● logado</span></div>
                        <div className="text-[10px] text-muted-foreground">{authedAtendente.cargo}</div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut} className="gap-2 text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" /> Sair da conta
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to="/login-atendente" className="gap-2">
                      <LogIn className="h-4 w-4" /> Entrar como atendente
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
