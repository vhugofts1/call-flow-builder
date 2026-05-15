import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Plus, Image, UserPlus, Check, Search as SearchIcon, X, AlertCircle, Copy } from "lucide-react";
import { toast } from "sonner";
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
  "Taxa de Deslocamento": `Olá. Tudo bem?
O Entregador(a) coletou o pedido na loja, porém, o destino o localizador do GPS mandou o mesmo para o endereço incorreto. O mesmo se deslocou até o endereço informado na OS, e deu continuidade na rota. Após finalizada, nos avisou. Por gentileza, adicione a taxa de deslocamento.

Entregador: Thomaz Cesar Bin
OS: 705083710`,
  "Reembolso Loja": `Olá, tudo bem?
Loja solicita o reembolso do pedido

A loja informa que o pedido em questão não foi entregue ao cliente final gerando uma insatisfação. O pedido foi aceito pelo entregador às 21:15:50, porém até as 22:18 o pedido não havia sido entregue ao cliente. 

Em tratativa, o suporte não obteve contato com o entregador.

Podem verificar por gentileza?

Reembolso do pedido no valor de R$ 100,97

Entregador: Juliany Sousa Da Silva
Estabelecimento: SEO ESPETO
OS: 699525956`,
  "Outros": "",
};

const APOIO_SUGESTOES: ResponsavelInfo[] = [
  { id: "ad2", nome: "Matheus Gibraz", cargo: "CEO", unidade: "Tecnologia", cor: "bg-zinc-900", iniciais: "MG", cidade: "Matriz" },
  { id: "ad1", nome: "Wagner A. Ferreira", cargo: "CFO", unidade: "Financeiro", cor: "bg-blue-600", iniciais: "WA", cidade: "Matriz" },
  { id: "ad3", nome: "Milena Alanes", cargo: "Supervisora Suporte", unidade: "Suporte", cor: "bg-emerald-600", iniciais: "MA", cidade: "Matriz" },
];

interface DescricaoProps {
  onSubmit: (cat: string, prio: string, desc: string, anexos: File[], apoio?: ResponsavelInfo[]) => void;
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

  // Extração dinâmica de dados da descrição para os alertas
  const extractedData = useMemo(() => {
    const entregadorMatch = desc.match(/Entregador:\s*(.*)/i);
    const osMatch = desc.match(/OS:\s*(.*)/i);
    const lojaMatch = desc.match(/Estabelecimento:\s*(.*)/i);
    
    const rawOs = osMatch ? osMatch[1].trim() : "12246";
    const cleanOs = rawOs.startsWith("#") ? rawOs.slice(1) : rawOs;

    return {
      nome: entregadorMatch ? entregadorMatch[1].trim() : "[Nome do Entregador]",
      primeiroNome: entregadorMatch ? entregadorMatch[1].trim().split(" ")[0] : "Entregador",
      os: cleanOs,
      loja: lojaMatch ? lojaMatch[1].trim() : "SEO ESPETO"
    };
  }, [desc]);

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

        {/* Alerta de Procedimento para Reembolso */}
        {cat === "Reembolso Loja" && (
          <div className="rounded-2xl border border-amber-500/50 bg-amber-500/10 p-5 space-y-4 animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 text-amber-500">
              <AlertCircle className="h-5 w-5" />
              <p className="text-[11px] font-black uppercase tracking-widest">Procedimento Obrigatório (ChatMatch)</p>
            </div>
            
            <div className="space-y-3">
              <div className="rounded-xl bg-background/50 p-3 border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black text-amber-500 uppercase tracking-tighter">1. Enviar ao Responsável</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-bold text-amber-600/70 italic bg-amber-500/5 px-1.5 py-0.5 rounded">
                      Detectado: {extractedData.nome} | OS: #{extractedData.os}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-amber-500 hover:bg-amber-500/20"
                      onClick={() => {
                        const text = `Olá, tudo bem? Aqui é o Victor do suporte da Del Match. Foi aberto um chamado de Reembolso pela loja: #${extractedData.os} - Deixei tudo especificado no chamado. Poderia por gentileza bloquear a carteira de créditos do entregador em questão?\n\nObs: Assim que for validado o reembolso para o lojista, por favor anexar comprovante de pagamento.\nObrigado!\n\nEntregador: ${extractedData.nome}`;
                        navigator.clipboard.writeText(text);
                        toast.success("Texto para o Responsável copiado!");
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-[10px] leading-relaxed text-muted-foreground italic">
                  "Olá, tudo bem? Aqui é o Victor do suporte da Del Match..."
                </p>
              </div>

              <div className="rounded-xl bg-background/50 p-3 border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-black text-amber-500 uppercase tracking-tighter">2. Enviar ao Entregador</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-bold text-amber-600/70 italic bg-amber-500/5 px-1.5 py-0.5 rounded">
                      Loja: {extractedData.loja} | OS: #{extractedData.os}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-amber-500 hover:bg-amber-500/20"
                      onClick={() => {
                        const text = `Olá ${extractedData.primeiroNome}, tudo bem? Aqui é o suporte/monitoramento da Del Match. Foi aberto um chamado: #${extractedData.os} a pedido da empresa ${extractedData.loja} para o reembolso do pedido, gerando uma insatisfação do cliente final. Será analisado pela liderança todas as tratativas! Sendo necessários, estamos à disposição!`;
                        navigator.clipboard.writeText(text);
                        toast.success("Texto para o Entregador copiado!");
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-[10px] leading-relaxed text-muted-foreground italic">
                  "Olá, tudo bem? Aqui é o suporte/monitoramento da Del Match..."
                </p>
              </div>
            </div>
            <p className="text-[9px] text-amber-500/70 font-medium italic text-center">
              ⚠️ Informe a liderança sobre o travamento da carteira antes de prosseguir.
            </p>
          </div>
        )}

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
        onClick={() => onSubmit(cat, "Média", desc || "Chamado de teste do protótipo", anexos, apoios)}
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
