import { useState } from "react";
import { Shell } from "@/prototype/Shell";
import { ProfileProvider } from "@/prototype/ProfileContext";
import { ScreenId, FlowState } from "@/prototype/types";
import { Home } from "@/prototype/screens/Home";
import { Tipo } from "@/prototype/screens/Tipo";
import { Admin } from "@/prototype/screens/Admin";
import { Unidade } from "@/prototype/screens/Unidade";
import { Descricao } from "@/prototype/screens/Descricao";
import { Protocolo } from "@/prototype/screens/Protocolo";
import { Notificacao } from "@/prototype/screens/Notificacao";
import { Historico } from "@/prototype/screens/Historico";
import { Global } from "@/prototype/screens/Global";
import { Resolucao } from "@/prototype/screens/Resolucao";

import { useProfile } from "@/prototype/ProfileContext";

const titles: Record<ScreenId, { t: string; s: string; d: "mobile" | "desktop" }> = {
  home: { t: "Tela 1 · Home do solicitante", s: "Ponto de partida do fluxo — botão de ação principal", d: "desktop" },
  tipo: { t: "Tela 2 · Tipo de chamado", s: "Decisão: administrativo ou unidade", d: "desktop" },
  admin: { t: "Tela 3a · Selecionar área administrativa", s: "Caminho 'Administrativo'", d: "desktop" },
  unidade: { t: "Tela 3b · Selecionar unidade", s: "Seleção em massa: empresas (cidades) + responsáveis", d: "desktop" },
  descricao: { t: "Tela 4 · Descrição do chamado", s: "Categoria, prioridade e detalhes", d: "desktop" },
  protocolo: { t: "Tela 5 · Protocolo gerado", s: "Confirmação + SLA iniciado", d: "desktop" },
  historico: { t: "Tela 6 · Histórico por cidade", s: "Gestão de chamados ativos da cidade", d: "desktop" },
  resolucao: { t: "Tela 7 · Visualizar chamado", s: "Acompanhamento em tempo real + histórico de tratativas", d: "desktop" },
  global: { t: "Tela 8 · Visão global do suporte", s: "Dashboard executivo multi-cidade", d: "desktop" },
};

const MainFlow = () => {
  const { profile } = useProfile();
  const [screen, setScreen] = useState<ScreenId>("home");
  const [history, setHistory] = useState<ScreenId[]>([]);
  const [state, setState] = useState<FlowState>({});

  const go = (next: ScreenId, patch?: Partial<FlowState>) => {
    setHistory((h) => [...h, screen]);
    if (patch) setState((s) => ({ ...s, ...patch }));
    setScreen(next);
  };

  const back = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setScreen(prev);
  };

  const jump = (id: ScreenId) => {
    setHistory((h) => [...h, screen]);
    setScreen(id);
  };

  const reset = () => {
    setHistory([]);
    setState({});
    setScreen("home");
  };

  const meta = titles[screen];
  const protocolo = state.protocolo || "DM-2451";

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <Home onOpen={() => go("tipo")} />;
      case "tipo":
        return <Tipo onSelect={(t) => go(t === "admin" ? "admin" : "unidade", { tipo: t })} />;
      case "admin":
        return <Admin onSelect={(n) => go("descricao", { admin: n })} />;
      case "unidade":
        return <Unidade onSelect={(unidades, pessoas, responsaveis) => go("descricao", { unidade: unidades.join(", "), cidade: pessoas.join(", "), responsaveis })} />;
      case "descricao":
        return (
          <Descricao
            destino={state.admin || state.unidade}
            onSubmit={(cat, prio, desc, anexosFiles, apoios) => {
              const anexosData = anexosFiles.map(f => ({
                name: f.name,
                size: (f.size / 1024).toFixed(1) + " KB",
                type: f.type,
                url: URL.createObjectURL(f)
              }));
              go("protocolo", { 
                categoria: cat, 
                prioridade: prio, 
                descricao: desc, 
                apoios: apoios,
                anexos: anexosData,
                protocolo: "DM-" + Math.floor(2400 + Math.random() * 200),
                ownerId: profile.id,
                ownerName: profile.nome
              });
            }}
          />
        );
      case "protocolo":
        return (
          <Protocolo
            protocolo={protocolo}
            cidade={state.cidade || "São Paulo"}
            categoria={state.categoria}
            responsaveis={state.responsaveis}
            apoios={state.apoios}
            onTrack={() => go("historico")}
            onHome={reset}
          />
        );
      case "historico":
        return <Historico chamadoNovo={state} onSelect={() => go("resolucao")} onGlobal={() => go("global")} />;
      case "resolucao":
        return <Resolucao state={state} onFinalizar={reset} />;
      case "global":
        return <Global onCidade={() => go("historico")} />;
    }
  };

  return (
    <Shell
      current={screen}
      onNavigate={jump}
      onBack={history.length > 0 ? back : undefined}
      title={meta.t}
      subtitle={meta.s}
      device={meta.d}
    >
      {renderScreen()}
    </Shell>
  );
};

const Index = () => {
  return (
    <ProfileProvider>
      <MainFlow />
    </ProfileProvider>
  );
};

export default Index;
