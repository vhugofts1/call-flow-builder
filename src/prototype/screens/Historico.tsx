import { Filter, Eye, Clock, User, CheckCircle2, ChevronRight, X, MapPin, LayoutGrid, List, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FlowState } from "../types";
import { useState, useMemo } from "react";
import { CONTATOS_UNIDADES, CIDADES } from "../data";
import { useProfile } from "../ProfileContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ROWS_BASE = [
  { p: "#2451", t: "Equipamento PDV", c: "Equipamento", s: "Em andamento", sla: "03:58", risk: false, resp: "GP", cidade: "Araçatuba", ownerId: "joao" },
  { p: "#2450", t: "Erro login sistema", c: "Sistema/TI", s: "Aberto", sla: "00:42", risk: true, resp: "AL", cidade: "Araçatuba", ownerId: "marina" },
  { p: "#2447", t: "Reposição embalagem", c: "Estoque", s: "Resolvido", sla: "—", risk: false, resp: "ML", cidade: "Araraquara", ownerId: "joao" },
  { p: "#2440", t: "Falha cobrança", c: "Financeiro", s: "Em andamento", sla: "01:15", risk: true, resp: "VA", cidade: "Bauru", ownerId: "marina" },
  { p: "#2438", t: "Treinamento novo func.", c: "Pessoas", s: "Resolvido", sla: "—", risk: false, resp: "JC", cidade: "Jundiaí", ownerId: "joao" },
];

interface HistoricoProps {
  onSelect: () => void;
  onGlobal: () => void;
  chamadoNovo?: FlowState;
}

export const Historico = ({ onSelect, onGlobal, chamadoNovo }: HistoricoProps) => {
  const { profile } = useProfile();
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "mine">("all");
  
  // 1. Extração dinâmica das cidades da lista completa (18 cidades)
  const cidadesAtivas = useMemo(() => {
    return CIDADES.map(c => c.nome).sort();
  }, []);

  const [currentCity, setCurrentCity] = useState(
    chamadoNovo?.cidade ? chamadoNovo.cidade.split(",")[0].trim() : "Araçatuba"
  );

  const novo = chamadoNovo?.protocolo
    ? [{
        p: "#" + chamadoNovo.protocolo.replace("DM-", ""),
        t: chamadoNovo.categoria || "Novo chamado",
        c: chamadoNovo.categoria || "—",
        s: "Aberto",
        sla: "04:00",
        risk: false,
        novo: true,
        resp: "VC",
        cidade: currentCity,
        ownerId: chamadoNovo.ownerId || profile.id
      }]
    : [];
  
  const allRows = [...novo, ...ROWS_BASE];
  
  // 2. Filtramos os chamados baseados na cidade, dono E termo de busca
  const ROWS = useMemo(() => {
    return allRows.filter(r => {
      const isMine = r.ownerId === profile.id;
      const matchesFilterMode = filterMode === "all" || isMine;
      const matchesCity = r.cidade === currentCity;
      const term = searchQuery.toLowerCase().trim();
      
      if (!term) return matchesCity && matchesFilterMode;

      // Se houver busca, procuramos em Protocolo, Título ou Cidade
      const matchesSearch = 
        r.p.toLowerCase().includes(term) || 
        r.t.toLowerCase().includes(term) || 
        r.cidade.toLowerCase().includes(term);

      return matchesSearch && matchesFilterMode;
    });
  }, [currentCity, chamadoNovo, searchQuery, filterMode, profile.id]);

  const columns = [
    { title: "Abertos", status: "Aberto", icon: <Clock className="h-4 w-4 text-primary" />, bg: "bg-primary/5", border: "border-primary/20" },
    { title: "Em andamento", status: "Em andamento", icon: <User className="h-4 w-4 text-accent" />, bg: "bg-accent/5", border: "border-accent/20" },
    { title: "Resolvidos", status: "Resolvido", icon: <CheckCircle2 className="h-4 w-4 text-success" />, bg: "bg-success/5", border: "border-success/20" },
  ];

  return (
    <div className="space-y-4">

      {/* Header e Controles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-3">
          {/* Seletor de Cidade (Dropdown Funcional) */}
          <div className="relative group">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/40 border border-border hover:border-primary/50 transition-all focus:outline-none">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">Unidade Selecionada</span>
                    <span className="text-sm font-bold text-foreground flex items-center gap-1">
                      {currentCity}
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-2xl border-border bg-card/95 backdrop-blur-xl shadow-2xl">
                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground p-3">Escolher Unidade</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                  {cidadesAtivas.map((cidade) => (
                    <DropdownMenuItem
                      key={cidade}
                      onClick={() => {
                        setCurrentCity(cidade);
                        setSearchQuery("");
                      }}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 mx-1 my-0.5 rounded-xl cursor-pointer transition-colors",
                        currentCity === cidade ? "bg-primary/10 text-primary font-bold" : "hover:bg-secondary text-muted-foreground"
                      )}
                    >
                      <span className="text-xs">{cidade}</span>
                      {currentCity === cidade && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="h-8 w-[1px] bg-border mx-1" />

          <div className="flex bg-secondary/50 p-1 rounded-xl border border-border">
            <button
              onClick={() => setFilterMode("all")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                filterMode === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterMode("mine")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                filterMode === "mine" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Meus
            </button>
          </div>

          <div className="h-8 w-[1px] bg-border mx-1" />

          <div className="flex bg-secondary/50 p-1 rounded-xl border border-border">
            <button
              onClick={() => setViewMode("kanban")}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                viewMode === "kanban" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              Quadro
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                viewMode === "list" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="h-3.5 w-3.5" />
              Lista
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar chamado ou cidade..." 
              className="pl-9 pr-4 py-2 rounded-xl bg-secondary/40 border border-border text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
            />
          </div>
          <Button onClick={onGlobal} size="sm" className="rounded-xl h-9 text-xs font-bold gradient-primary text-primary-foreground shadow-lg shadow-primary/20">
            Visão global →
          </Button>
        </div>
      </div>

      {viewMode === "kanban" ? (
        /* VISÃO KANBAN NATIVA */
        <div className="flex flex-col gap-2">
          <div className="px-2 flex items-center justify-between">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Monitorando em tempo real: {currentCity}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className={cn("p-1.5 rounded-lg bg-card border border-border shadow-sm", col.icon.props.className.replace("h-4 w-4", ""))}>
                      {col.icon}
                    </div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-foreground/70">{col.title}</h3>
                  </div>
                  <span className="text-[10px] font-bold bg-secondary text-muted-foreground px-2 py-0.5 rounded-md border border-border">
                    {ROWS.filter(r => r.s === col.status).length}
                  </span>
                </div>

                <div className={cn("flex-1 rounded-[2rem] p-4 border border-border/50 min-h-[400px] space-y-4", col.bg)}>
                  {ROWS.filter(r => r.s === col.status).map((item) => (
                    <div 
                      key={item.p} 
                      className="group bg-card rounded-2xl border border-border/60 p-4 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all cursor-pointer active:scale-[0.98]"
                      onClick={onSelect}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-mono font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md">{item.p}</span>
                        {item.sla !== "—" && (
                          <div className={cn("flex items-center gap-1.5 text-[10px] font-mono font-bold px-2 py-1 rounded-lg border shadow-sm", 
                            item.risk ? "bg-destructive/10 text-destructive border-destructive/20 animate-pulse" : "bg-secondary/80 text-muted-foreground border-border")}>
                            <Clock className="h-3 w-3" />
                            {item.sla}
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-1 leading-tight">{item.t}</h4>
                      <p className="text-[11px] text-muted-foreground mb-4 font-medium opacity-70">{item.c}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-[10px] font-black text-white border-2 border-card shadow-md">
                            {item.resp}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 leading-none">Responsável</span>
                            <span className="text-[10px] font-bold text-foreground/80 leading-tight">Membro Local</span>
                          </div>
                        </div>
                        <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                  {ROWS.filter(r => r.s === col.status).length === 0 && (
                    <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-border/30 rounded-[2rem] text-muted-foreground/30 italic text-[10px] font-bold uppercase tracking-widest">
                      Vazio
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VISÃO LISTA TRADICIONAL */
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="p-4 text-left font-bold">Protocolo</th>
                <th className="p-4 text-left font-bold">Título</th>
                <th className="p-4 text-left font-bold">Categoria</th>
                <th className="p-4 text-left font-bold">Status</th>
                <th className="p-4 text-left font-bold">SLA</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ROWS.map((r) => (
                <tr key={r.p} className={cn("group transition-colors hover:bg-secondary/30", (r as any).novo && "bg-primary/5")}>
                  <td className="p-4 font-mono text-primary font-bold">
                    {r.p}
                    {(r as any).novo && <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-primary-foreground">NOVO</span>}
                  </td>
                  <td className="p-4 font-bold text-foreground/90">{r.t}</td>
                  <td className="p-4 text-muted-foreground font-medium">{r.c}</td>
                  <td className="p-4">
                    <span className={cn("rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider border",
                      r.s === "Resolvido" ? "bg-success/10 text-success border-success/20" : 
                      r.s === "Aberto" ? "bg-primary/10 text-primary border-primary/20" : 
                      "bg-accent/10 text-accent border-accent/20"
                    )}>{r.s}</span>
                  </td>
                  <td className={cn("p-4 font-mono text-xs", r.risk ? "text-destructive font-black" : "text-muted-foreground font-bold")}>{r.sla}</td>
                  <td className="p-4 text-right">
                    <Button onClick={onSelect} variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

