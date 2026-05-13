import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Plus, Image, UserPlus, Check, Search as SearchIcon, X } from "lucide-react";
import { ResponsavelInfo } from "../types";
import { cn } from "@/lib/utils";
import { MASTER_CONTATOS } from "../data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

const APOIO_SUGESTOES: ResponsavelInfo[] = [
  { id: "ad2", nome: "Matheus Gibraz", cargo: "CEO", unidade: "Tecnologia", cor: "bg-zinc-900", iniciais: "MG", cidade: "Matriz" },
  { id: "ad1", nome: "Wagner A. Ferreira", cargo: "CFO", unidade: "Financeiro", cor: "bg-blue-600", iniciais: "WA", cidade: "Matriz" },
  { id: "ad3", nome: "Milena Alanes", cargo: "Supervisora Suporte", unidade: "Suporte", cor: "bg-emerald-600", iniciais: "MA", cidade: "Matriz" },
];

interface DescricaoProps {
  onSubmit: (cat: string, prio: string, desc: string, apoio?: ResponsavelInfo) => void;
  destino?: string;
}

export const Descricao = ({ onSubmit, destino }: DescricaoProps) => {
  const [cat, setCat] = useState("Retorno por Devolução");
  const [desc, setDesc] = useState(TEMPLATES["Retorno por Devolução"]);
  const [apoios, setApoios] = useState<ResponsavelInfo[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [anexos, setAnexos] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAnexos(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeAnexo = (index: number) => {
    setAnexos(prev => prev.filter((_, i) => i !== index));
  };

  const filteredContatos = useMemo(() => {
    if (!searchTerm.trim()) return MASTER_CONTATOS;
    const q = searchTerm.toLowerCase();
    return MASTER_CONTATOS.filter(
      p => p.nome.toLowerCase().includes(q) || 
           p.cargo.toLowerCase().includes(q) || 
           p.cidade.toLowerCase().includes(q) ||
           p.unidade.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const toggleApoio = (p: ResponsavelInfo) => {
    setApoios(prev => {
      const exists = prev.find(a => a.id === p.id);
      if (exists) return prev.filter(a => a.id !== p.id);
      return [...prev, p];
    });
  };

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
    <div className="flex h-[760px] flex-col gradient-dark p-5 no-scrollbar overflow-y-auto">
      <input 
        type="file" 
        id="file-upload" 
        multiple 
        className="hidden" 
        onChange={handleFileChange}
      />
      
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-primary">Etapa 4 de 4</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight">Destaque o chamado</h2>
        {destino && (
          <div className="mt-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <p className="text-xs font-bold text-muted-foreground">Destino: {destino}</p>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-6">
        {/* Categorias */}
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Categoria do Chamado</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map((c) => (
              <button
                key={c}
                onClick={() => selectCategoria(c)}
                className={cn(
                  "rounded-xl border px-4 py-2 text-xs font-bold transition-all",
                  cat === c ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "border-border bg-card/50 text-muted-foreground hover:border-primary/40"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Apoio (Participante Extra) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Adicionar Apoio (Opcional)</p>
            {apoios.length > 0 && (
              <button onClick={() => setApoios([])} className="text-[9px] font-bold text-destructive hover:underline uppercase">Limpar Tudo</button>
            )}
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {APOIO_SUGESTOES.map((p) => {
              const isSelected = apoios.some(a => a.id === p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleApoio(p)}
                  className={cn(
                    "flex flex-col items-center gap-2 min-w-[100px] p-3 rounded-2xl border transition-all relative",
                    isSelected ? "bg-primary/5 border-primary shadow-inner" : "bg-card/40 border-border hover:border-primary/30"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                      <Check className="h-2.5 w-2.5" />
                    </div>
                  )}
                  <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-xs font-black text-white shadow-md", p.cor)}>
                    {p.iniciais}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold leading-tight">{p.nome.split(" ")[0]}</p>
                    <p className="text-[8px] text-muted-foreground truncate max-w-[80px]">{p.cargo}</p>
                  </div>
                </button>
              );
            })}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="flex flex-col items-center justify-center gap-2 min-w-[100px] p-3 rounded-2xl border border-dashed border-border bg-transparent text-muted-foreground hover:border-primary transition-all"
            >
              <div className="h-10 w-10 rounded-full border-2 border-dashed border-border flex items-center justify-center">
                <UserPlus className="h-4 w-4" />
              </div>
              <p className="text-[10px] font-bold">Ver outros</p>
            </button>
          </div>
          
          {/* Listagem de Apoios Selecionados */}
          {apoios.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {apoios.map(p => (
                <div key={p.id} className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg pl-1.5 pr-2 py-1">
                  <div className={cn("h-5 w-5 rounded-full flex items-center justify-center text-[8px] font-black text-white", p.cor)}>
                    {p.iniciais}
                  </div>
                  <span className="text-[10px] font-bold">{p.nome.split(" ")[0]}</span>
                  <button onClick={() => toggleApoio(p)} className="text-primary hover:text-primary-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Descrição */}
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-70">Descrição Detalhada</p>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Detalhe o que aconteceu..."
            rows={5}
            className="w-full resize-none rounded-2xl border border-border bg-card/60 p-4 text-sm outline-none focus:border-primary focus:bg-card transition-all placeholder:text-muted-foreground/30"
          />
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => document.getElementById("file-upload")?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card/40 py-4 text-xs font-bold text-muted-foreground hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <Paperclip className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" /> 
            Anexar evidências (Fotos, Áudios ou PDF)
          </button>

          {anexos.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {anexos.map((f, i) => (
                <div key={i} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-secondary/50 border border-border/50 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Image className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-[10px] font-bold truncate flex-1">{f.name}</p>
                  </div>
                  <button onClick={() => removeAnexo(i)} className="text-muted-foreground hover:text-destructive">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


      <Button
        onClick={() => onSubmit(cat, "Média", desc || "Chamado de teste do protótipo", apoios)}
        size="lg"
        className="mt-6 h-14 w-full rounded-2xl gradient-primary font-black text-primary-foreground text-sm uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        Finalizar e Enviar →
      </Button>

      {/* Modal de Busca Global de Apoio */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden border-border/40 bg-secondary/30 backdrop-blur-2xl">
          <DialogHeader className="p-6 bg-card border-b border-border">
            <DialogTitle className="text-xl font-black flex items-center gap-2 uppercase tracking-tight">
              <SearchIcon className="h-5 w-5 text-primary" />
              Buscar Apoio
            </DialogTitle>
            <div className="mt-4 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                autoFocus
                placeholder="Nome, cargo ou cidade..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </DialogHeader>

          <div className="max-h-[350px] overflow-y-auto p-2 space-y-1 no-scrollbar">
            {filteredContatos.map((p) => {
              const isSelected = apoios.some(a => a.id === p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => toggleApoio(p)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-xl transition-colors group relative",
                    isSelected ? "bg-primary/20" : "hover:bg-primary/10"
                  )}
                >
                  <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-xs font-black text-white shadow-md", p.cor)}>
                    {p.iniciais}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">{p.nome}</p>
                    <p className="text-[10px] text-muted-foreground font-medium truncate uppercase tracking-tighter">
                      {p.cargo} · <span className="text-primary/70">{p.cidade}</span>
                    </p>
                  </div>
                  <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center transition-all",
                    isSelected ? "bg-primary text-white scale-110" : "border border-border text-muted-foreground group-hover:border-primary group-hover:text-primary"
                  )}>
                    {isSelected ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-card border-t border-border flex items-center justify-between">
            <p className="text-xs font-bold text-muted-foreground">
              {apoios.length} {apoios.length === 1 ? "pessoa selecionada" : "pessoas selecionadas"}
            </p>
            <Button onClick={() => setIsSearchOpen(false)} size="sm" className="gradient-primary px-6 font-bold">
              Concluir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
