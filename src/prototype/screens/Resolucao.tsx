import { useState, useEffect } from "react";
import { MessageSquare, Star, Paperclip, Clock, ShieldCheck, Send, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowState } from "../types";
import { cn } from "@/lib/utils";
import { useProfile } from "../ProfileContext";

interface ResolucaoProps {
  state: FlowState;
  onFinalizar: () => void;
}

export const Resolucao = ({ state, onFinalizar }: ResolucaoProps) => {
  const { profile } = useProfile();
  const [simulatedResolved, setSimulatedResolved] = useState(false);
  const [seconds, setSeconds] = useState(9912); 
  const [chatMsg, setChatMsg] = useState("");
  const [anexos, setAnexos] = useState<File[]>([]);  
  const s = state || {};
  const isResolvido = simulatedResolved || s.protocolo?.includes("RESOLVIDO") || false;
  const isOwner = profile.id === s.ownerId;
  const protocolo = s.protocolo || "DM-2451";

  useEffect(() => {
    if (isResolvido) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isResolvido]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const sec = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 text-left animate-in fade-in duration-500">
      {/* Coluna Principal */}
      <div className="col-span-1 space-y-4 lg:col-span-2">
        <div className="space-y-4 animate-in slide-in-from-top duration-500">
          {/* Nova Notificação Header Style */}
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary shadow-[0_0_15px_rgba(255,102,0,0.3)]">
              <span className="text-lg animate-bounce">🔔</span>
            </div>
            <div>
              <p className="text-[10px] font-medium text-muted-foreground">Nova notificação · agora</p>
              <h2 className="text-base font-bold">Chamado recebido — {s.unidade?.split("-")[0].trim() || "Araçatuba"}</h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-lg shadow-black/20">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">PROTOCOLO</p>
              <div className="flex items-center gap-3">
                <p className="font-mono text-xl font-black tracking-tighter text-primary">{protocolo}</p>
                {isResolvido ? (
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2 py-0.5 border border-emerald-500/30 text-[8px] font-black text-emerald-400 uppercase tracking-widest">
                    <CheckCircle2 className="h-3 w-3" /> RESOLVIDO
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 border border-primary/20 text-[8px] font-black text-primary uppercase tracking-widest">
                    <div className="relative flex items-center justify-center h-2.5 w-2.5">
                      <div className="absolute h-1.5 w-1.5 rounded-full bg-primary animate-ping opacity-75" />
                      <div className="relative h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(255,102,0,1)]" />
                    </div>
                    EM ATENDIMENTO
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-lg shadow-black/20 flex flex-col justify-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">CIDADE</p>
              <p className="mt-1 text-sm font-black text-foreground truncate">{s.unidade?.split("-")[0].trim() || "Araçatuba"}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-lg shadow-black/20 flex flex-col justify-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">CATEGORIA</p>
              <p className="mt-1 text-sm font-black text-foreground truncate">{s.categoria || "Devolução"}</p>
            </div>
          </div>
        </div>

        {/* Descrição Original */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">DESCRIÇÃO ORIGINAL</p>
          <div className="rounded-xl border border-border/50 bg-background/30 p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap min-h-[80px]">
            {s.descricao || "Olá, tudo bem?\nEntregador informa que foi até o local da entrega, porém cliente não encontrado. Em tratativas com a loja a mesma solicitou retorno. O Entregador retornou com a devolução à loja.\n\nEntregador: Douglas José Siqueira\nOS: 698945774"}
          </div>
          
          {/* Anexos reais do chamado */}
          {s.anexos && s.anexos.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="mb-3 text-[9px] font-black uppercase tracking-widest text-muted-foreground">Arquivos anexados ({s.anexos.length})</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {s.anexos.map((file, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl border border-border bg-secondary/30 hover:border-primary/50 transition-all">
                    <div className="p-3 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Paperclip className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold truncate text-foreground">{file.name}</p>
                        <p className="text-[10px] text-muted-foreground">{file.size}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {file.url && (
                          <a 
                            href={file.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                            title="Visualizar"
                          >
                            <span className="text-xs">👁️</span>
                          </a>
                        )}
                        <a 
                          href={file.url} 
                          download={file.name}
                          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                          title="Download"
                        >
                          <span className="text-xs">↓</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat / Timeline (TRATATIVAS) */}
        <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-4 bg-secondary/20">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">TRATATIVAS</p>
            </div>
            {!isOwner && (
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[9px] font-bold text-amber-500 uppercase tracking-tighter">
                <Clock className="h-3 w-3" /> MODO VISUALIZAÇÃO
              </div>
            )}
          </div>
          
          <div className="max-h-[500px] space-y-6 overflow-y-auto p-6 custom-scrollbar bg-black/5">
            {[
              { t: "10:42", a: "João Silva", initials: "JS", e: "Abriu o chamado", type: "system" },
              { t: "11:10", a: "Marina Silva", initials: "MA", e: "Olá João! Consegue me enviar o print do erro que aparece na tela do PDV?", type: "agent" },
              { t: "11:12", a: "João Silva", initials: "JS", e: "Sim, segue em anexo a foto da tela.", type: "user" },
              { 
                t: "11:13", a: "João Silva", initials: "JS", 
                type: "attachment", 
                file: "screenshot_pdv_erro.png",
                size: "2.4MB"
              },
              { 
                t: "11:15", a: "João Silva", initials: "JS", 
                type: "audio", 
                duration: "0:24",
                waveform: true
              },
              { t: "11:20", a: "Marina Silva", initials: "MA", e: "Obrigada! Já identifiquei o problema. Estamos realizando o reset remoto agora.", type: "agent" },
            ].map((m, i) => (
              <div key={i} className="flex gap-4">
                <div className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-md",
                  m.type === "agent" ? "gradient-primary" : "bg-zinc-800 border border-zinc-700 text-zinc-400"
                )}>
                  {m.initials}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black text-foreground">{m.a}</span>
                    <span className="text-[9px] font-mono text-muted-foreground">{m.t}</span>
                  </div>
                  
                  {m.type === "audio" ? (
                    <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 border border-border p-3 max-w-[320px]">
                      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_10px_rgba(255,102,0,0.4)]">
                        <span className="text-xs">▶</span>
                      </button>
                      <div className="flex-1 flex items-end gap-0.5 h-6 min-w-[100px]">
                        {[2, 4, 3, 5, 2, 6, 4, 3, 5, 2, 4, 3, 6, 2, 4].map((h, i) => (
                          <div key={i} className="w-1 bg-primary/40 rounded-full" style={{ height: `${h * 4}px` }} />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground">{m.duration}</span>
                        <button className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors" title="Download Áudio">
                          <span className="text-[10px]">↓</span>
                        </button>
                      </div>
                    </div>
                  ) : m.type === "attachment" ? (
                    <div className="group relative overflow-hidden rounded-2xl border border-border bg-zinc-900 max-w-[300px]">
                      <div className="aspect-video bg-zinc-800 flex items-center justify-center">
                        <Paperclip className="h-8 w-8 text-zinc-600" />
                      </div>
                      <div className="p-3 flex items-center justify-between bg-black/40 backdrop-blur-sm">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium truncate">{m.file}</p>
                          <p className="text-[9px] text-muted-foreground">{m.size}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors" title="Visualizar">
                            <span className="text-xs">👁️</span>
                          </button>
                          <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors" title="Download">
                            <span className="text-xs">↓</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm",
                      m.type === "agent" ? "bg-secondary border border-border/50 rounded-tl-none text-foreground/90" : 
                      m.type === "system" ? "bg-transparent border border-dashed border-zinc-800 rounded-tl-none text-muted-foreground/80 text-[13px]" :
                      "bg-zinc-800/50 border border-zinc-700/50 rounded-tl-none text-foreground/90"
                    )}>
                      <p>{m.e}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {isOwner ? (
            <div className="border-t border-border p-4 bg-muted/5 space-y-3">
              <input 
                type="file" 
                id="chat-file-upload" 
                multiple 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files) {
                    setAnexos(prev => [...prev, ...Array.from(e.target.files!)]);
                  }
                }}
              />
              
              {anexos.length > 0 && (
                <div className="flex flex-wrap gap-2 animate-in slide-in-from-bottom-2">
                  {anexos.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg pl-1.5 pr-2 py-1">
                      <Paperclip className="h-3 w-3 text-primary" />
                      <span className="text-[10px] font-bold truncate max-w-[100px]">{f.name}</span>
                      <button onClick={() => setAnexos(prev => prev.filter((_, idx) => idx !== i))} className="text-primary hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 shadow-inner">
                <input 
                  placeholder="Digite aqui sua mensagem..." 
                  className="flex-1 bg-transparent text-sm outline-none" 
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                  onClick={() => document.getElementById("chat-file-upload")?.click()}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  className="h-8 gradient-primary text-white gap-2 px-4 shadow-lg shadow-primary/20"
                  onClick={() => {
                    setChatMsg("");
                    setAnexos([]);
                  }}
                >
                  <Send className="h-3.5 w-3.5" /> <span className="text-xs font-bold uppercase">Enviar</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="border-t border-border p-6 bg-muted/10 text-center">
              <p className="text-xs text-muted-foreground">Você está no modo de visualização. <br/> Apenas o dono do chamado (**{s.ownerName || "João Silva"}**) pode realizar ações.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lateral */}
      <div className="space-y-4">
        {/* SLA */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">SLA</p>
            </div>
            <span className="font-mono text-xs font-bold text-primary">{formatTime(seconds)}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[65%] gradient-primary shadow-[0_0_15px_rgba(255,102,0,0.5)] transition-all duration-1000" />
          </div>
        </div>

        {/* Atendente (Dono do Chamado) */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">PROPRIETÁRIO DO CHAMADO</p>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-sm font-bold text-white shadow-lg">
              {s.ownerName?.split(" ").map(n => n[0]).join("").toUpperCase() || "JS"}
            </div>
            <div>
              <p className="text-sm font-black leading-none text-foreground">{s.ownerName || "João Silva"}</p>
              <p className="mt-1.5 text-[10px] font-medium text-muted-foreground">{isOwner ? profile.cargo : "Atendente Externo"}</p>
              {isOwner && (
                <div className="mt-2 flex items-center gap-1.5 text-[9px] text-primary font-black uppercase tracking-tighter">
                  <ShieldCheck className="h-3 w-3" /> {profile.sexo === "feminino" ? "VERIFICADA" : "VERIFICADO"}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-2 space-y-2">
          {isOwner && (
            <Button onClick={() => setSimulatedResolved(!simulatedResolved)} variant="outline" className="w-full border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary/10">
              Simular {simulatedResolved ? "Em Atendimento" : "Resolução"}
            </Button>
          )}
          <Button onClick={onFinalizar} size="lg" className="w-full h-14 gradient-primary font-black text-foreground shadow-xl shadow-primary/10 hover:opacity-90 active:scale-[0.98] transition-all text-sm uppercase tracking-widest">
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};
