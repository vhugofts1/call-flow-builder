import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, ArrowRight, ArrowLeft, X, Mail, Phone, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Responsavel = {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  iniciais: string;
  cor: string;
};

type Unidade = {
  id: string;
  nome: string;
  responsaveis: Responsavel[];
};

type Cidade = {
  id: string;
  nome: string;
  uf: string;
  unidades: Unidade[];
};

const CIDADES: Cidade[] = [
  {
    id: "aracatuba",
    nome: "Araçatuba",
    uf: "SP",
    unidades: [
      {
        id: "5768",
        nome: "DM Araçatuba - 5768",
        responsaveis: [
          { id: "p1", nome: "Deikisson dos Santos Moura", cargo: "Proprietário", email: "deikisson@delmatch.com", telefone: "(18) 99876-1122", iniciais: "DE", cor: "bg-orange-500" },
          { id: "p2", nome: "Jonathan Gabriel Rocha Paschoal", cargo: "Proprietário", email: "jonathan@delmatch.com", telefone: "(18) 99732-4451", iniciais: "JO", cor: "bg-zinc-700" },
          { id: "p3", nome: "Meriellen Cristina Gomes de Carvalho", cargo: "Gerente", email: "meriellen@delmatch.com", telefone: "(18) 99645-9920", iniciais: "ME", cor: "bg-pink-500" },
          { id: "p4", nome: "Michelle Heloisa Gomes de Carvalho", cargo: "Supervisora", email: "michelle@delmatch.com", telefone: "(18) 99511-3340", iniciais: "MI", cor: "bg-orange-500" },
        ],
      },
    ],
  },
  {
    id: "araraquara",
    nome: "Araraquara",
    uf: "SP",
    unidades: [
      {
        id: "2742",
        nome: "Araraquara - 2742",
        responsaveis: [
          { id: "ara1", nome: "Ana Maria Berardo Magalhães", cargo: "Consultor de Vendas", email: "ana.maria@delmatch.com", telefone: "(16) 99123-0001", iniciais: "AN", cor: "bg-orange-500" },
          { id: "ara2", nome: "Antonio Carlos de Almeida Junior", cargo: "Consultor de Vendas", email: "antonio.carlos@delmatch.com", telefone: "(16) 99123-0002", iniciais: "AC", cor: "bg-zinc-800" },
          { id: "ara3", nome: "Empresa Full", cargo: "Estabelecimento comercial", email: "full@delmatch.com", telefone: "(16) 99123-0003", iniciais: "EM", cor: "bg-orange-600" },
          { id: "ara4", nome: "José Carlos Castanheira", cargo: "Proprietário", email: "jose.carlos@delmatch.com", telefone: "(16) 99123-0004", iniciais: "JC", cor: "bg-zinc-700" },
        ],
      },
    ],
  },
  {
    id: "bauru",
    nome: "Bauru",
    uf: "SP",
    unidades: [
      {
        id: "5084",
        nome: "Bauru - 5084",
        responsaveis: [
          { id: "bau1", nome: "Felype Yukio Nakayama", cargo: "Motoboy Líder", email: "felype@delmatch.com", telefone: "(14) 99123-0005", iniciais: "FE", cor: "bg-zinc-800" },
          { id: "bau2", nome: "Gabriele Cristina Huss", cargo: "Administrativo", email: "gabriele@delmatch.com", telefone: "(14) 99123-0006", iniciais: "GA", cor: "bg-pink-500" },
          { id: "bau3", nome: "Matheus Ferreira Degelo", cargo: "Proprietário", email: "matheus@delmatch.com", telefone: "(14) 99123-0007", iniciais: "MA", cor: "bg-zinc-700" },
          { id: "bau4", nome: "Melissa Carolina Ferreira", cargo: "Proprietário", email: "melissa@delmatch.com", telefone: "(14) 99123-0008", iniciais: "ME", cor: "bg-orange-500" },
        ],
      },
    ],
  },
  {
    id: "bebedouro",
    nome: "Bebedouro",
    uf: "SP",
    unidades: [
      {
        id: "3440",
        nome: "Bebedouro - 3440",
        responsaveis: [
          { id: "beb1", nome: "Alexandre Rodrigues Neves", cargo: "Proprietário", email: "alexandre@delmatch.com", telefone: "(17) 99123-0009", iniciais: "AL", cor: "bg-orange-500" },
        ],
      },
    ],
  },
  {
    id: "botucatu",
    nome: "Botucatu",
    uf: "SP",
    unidades: [
      {
        id: "bo1",
        nome: "BOTUCATU",
        responsaveis: [
          { id: "bot1", nome: "Caio Henrique Silva", cargo: "Proprietário", email: "caio@delmatch.com", telefone: "(14) 99123-0010", iniciais: "CA", cor: "bg-orange-500" },
          { id: "bot2", nome: "Lucas dos Santos São Romão", cargo: "Proprietário", email: "lucas@delmatch.com", telefone: "(14) 99123-0011", iniciais: "LU", cor: "bg-orange-600" },
        ],
      },
    ],
  },
  {
    id: "catanduva",
    nome: "Catanduva",
    uf: "SP",
    unidades: [
      {
        id: "6710",
        nome: "Catanduva - 6710",
        responsaveis: [
          { id: "cat1", nome: "João Cesar Marqui Brocca", cargo: "Proprietário", email: "joao.cesar@delmatch.com", telefone: "(17) 99123-0012", iniciais: "JO", cor: "bg-orange-500" },
        ],
      },
    ],
  },
  {
    id: "divinopolis",
    nome: "Divinópolis",
    uf: "MG",
    unidades: [
      {
        id: "5341",
        nome: "Divinópolis - 5341",
        responsaveis: [
          { id: "div1", nome: "Darlon Gomes Fernandes", cargo: "Proprietário", email: "darlon@delmatch.com", telefone: "(37) 99123-0013", iniciais: "DA", cor: "bg-orange-500" },
          { id: "div2", nome: "Paula Barbosa Ferreira", cargo: "Consultor de Vendas", email: "paula@delmatch.com", telefone: "(37) 99123-0014", iniciais: "PA", cor: "bg-orange-600" },
          { id: "div3", nome: "Vitor Antonio Martins", cargo: "Consultor de Vendas", email: "vitor@delmatch.com", telefone: "(37) 99123-0015", iniciais: "VI", cor: "bg-orange-500" },
          { id: "div4", nome: "Wesley Aparecido Candido", cargo: "Gerente Comercial", email: "wesley@delmatch.com", telefone: "(37) 99123-0016", iniciais: "WE", cor: "bg-orange-600" },
        ],
      },
    ],
  },
  {
    id: "jau",
    nome: "Jaú",
    uf: "SP",
    unidades: [
      {
        id: "5085",
        nome: "Jaú - 5085",
        responsaveis: [
          { id: "jau1", nome: "Luciane Colli Tani", cargo: "Proprietário", email: "luciane@delmatch.com", telefone: "(14) 99123-0017", iniciais: "LU", cor: "bg-orange-500" },
          { id: "jau2", nome: "Matheus Ferreira Degelo", cargo: "Proprietário", email: "matheus.jau@delmatch.com", telefone: "(14) 99123-0018", iniciais: "MA", cor: "bg-zinc-800" },
        ],
      },
    ],
  },
  {
    id: "hortolandia",
    nome: "Hortolândia",
    uf: "SP",
    unidades: [
      {
        id: "5767",
        nome: "Hortolândia - 5767",
        responsaveis: [
          { id: "hor1", nome: "André Luis Machado", cargo: "Proprietário", email: "andre.luis@delmatch.com", telefone: "(19) 99123-0019", iniciais: "AN", cor: "bg-zinc-800" },
        ],
      },
    ],
  },
  {
    id: "franca",
    nome: "Franca",
    uf: "SP",
    unidades: [
      {
        id: "6450",
        nome: "Franca - 6450",
        responsaveis: [
          { id: "fra1", nome: "Enzo A. Bronzatti", cargo: "Proprietário", email: "enzo@delmatch.com", telefone: "(16) 99123-0020", iniciais: "EN", cor: "bg-zinc-800" },
        ],
      },
    ],
  },
  {
    id: "jundiai",
    nome: "Jundiaí",
    uf: "SP",
    unidades: [
      {
        id: "6190",
        nome: "Jundiaí - 6190",
        responsaveis: [
          { id: "jun1", nome: "Gustavo Ferreira Porfirio", cargo: "Motoboy Líder", email: "gustavo@delmatch.com", telefone: "(11) 99123-0021", iniciais: "GU", cor: "bg-orange-500" },
          { id: "jun2", nome: "Vitor Thomazini", cargo: "Proprietário", email: "vitor.t@delmatch.com", telefone: "(11) 99123-0022", iniciais: "VI", cor: "bg-zinc-800" },
        ],
      },
    ],
  },
  {
    id: "matao",
    nome: "Matão",
    uf: "SP",
    unidades: [
      {
        id: "3575",
        nome: "Matão - 3575",
        responsaveis: [
          { id: "mat1", nome: "Guilherme Alexandre Sanches", cargo: "Proprietário", email: "guilherme@delmatch.com", telefone: "(16) 99123-0023", iniciais: "GU", cor: "bg-orange-500" },
          { id: "mat2", nome: "Michelle Cristine Pereira Sanches", cargo: "Proprietário", email: "michelle.p@delmatch.com", telefone: "(16) 99123-0024", iniciais: "MI", cor: "bg-orange-600" },
        ],
      },
    ],
  },
  {
    id: "piracicaba",
    nome: "Piracicaba",
    uf: "SP",
    unidades: [
      {
        id: "6743",
        nome: "Piracicaba - 6743",
        responsaveis: [
          { id: "pir1", nome: "Júlia Fernanda Moro de Morais", cargo: "Proprietário", email: "julia@delmatch.com", telefone: "(19) 99123-0025", iniciais: "JÚ", cor: "bg-orange-500" },
          { id: "pir2", nome: "Laura Cristine Moro de Morais", cargo: "Proprietário", email: "laura@delmatch.com", telefone: "(19) 99123-0026", iniciais: "LA", cor: "bg-orange-600" },
        ],
      },
    ],
  },
  {
    id: "ribeiraopreto",
    nome: "Ribeirão Preto",
    uf: "SP",
    unidades: [
      {
        id: "5766",
        nome: "Ribeirão Preto - 5766",
        responsaveis: [
          { id: "rib1", nome: "Ricardo da Silva Correa", cargo: "Proprietário", email: "ricardo@delmatch.com", telefone: "(16) 99123-0027", iniciais: "RI", cor: "bg-zinc-800" },
        ],
      },
    ],
  },
  {
    id: "rioclaro",
    nome: "Rio Claro",
    uf: "SP",
    unidades: [
      {
        id: "6189",
        nome: "Rio Claro - 6189",
        responsaveis: [
          { id: "rio1", nome: "Alessandro Luiz Garcia", cargo: "Proprietário", email: "alessandro@delmatch.com", telefone: "(19) 99123-0028", iniciais: "AL", cor: "bg-orange-500" },
          { id: "rio2", nome: "Márcia de Lima", cargo: "Proprietário", email: "marcia@delmatch.com", telefone: "(19) 99123-0029", iniciais: "MÁ", cor: "bg-orange-600" },
          { id: "rio3", nome: "Murilo Lima De Andrade", cargo: "Proprietário", email: "murilo@delmatch.com", telefone: "(19) 99123-0030", iniciais: "MU", cor: "bg-orange-500" },
        ],
      },
    ],
  },
  {
    id: "saocarlos",
    nome: "São Carlos",
    uf: "SP",
    unidades: [
      {
        id: "3441",
        nome: "São Carlos - 3441",
        responsaveis: [
          { id: "sc1", nome: "Alessandro Luiz Garcia", cargo: "Proprietário", email: "alessandro.sc@delmatch.com", telefone: "(16) 99123-0031", iniciais: "AL", cor: "bg-orange-500" },
          { id: "sc2", nome: "Diego Oswaldo Ribeiro da Silva", cargo: "Proprietário", email: "diego@delmatch.com", telefone: "(16) 99123-0032", iniciais: "DI", cor: "bg-orange-600" },
          { id: "sc3", nome: "Márcia de Lima", cargo: "Proprietário", email: "marcia.sc@delmatch.com", telefone: "(16) 99123-0033", iniciais: "MÁ", cor: "bg-orange-500" },
          { id: "sc4", nome: "Murilo Lima De Andrade", cargo: "Proprietário", email: "murilo.sc@delmatch.com", telefone: "(16) 99123-0034", iniciais: "MU", cor: "bg-orange-600" },
        ],
      },
    ],
  },
  {
    id: "sjrp",
    nome: "São José do Rio Preto",
    uf: "SP",
    unidades: [
      {
        id: "6581",
        nome: "São José do Rio Preto - 6581",
        responsaveis: [
          { id: "rp1", nome: "Alessandro Luiz Garcia", cargo: "Proprietário", email: "alessandro.rp@delmatch.com", telefone: "(17) 99123-0035", iniciais: "AL", cor: "bg-orange-500" },
          { id: "rp2", nome: "Márcia de Lima", cargo: "Proprietário", email: "marcia.rp@delmatch.com", telefone: "(17) 99123-0036", iniciais: "MÁ", cor: "bg-orange-600" },
          { id: "rp3", nome: "Matheus Porta Escobar", cargo: "Proprietário", email: "matheus.p@delmatch.com", telefone: "(17) 99123-0037", iniciais: "MA", cor: "bg-zinc-800" },
          { id: "rp4", nome: "Murilo Lima De Andrade", cargo: "Proprietário", email: "murilo.rp@delmatch.com", telefone: "(17) 99123-0038", iniciais: "MU", cor: "bg-orange-500" },
        ],
      },
    ],
  },
  {
    id: "varzeapaulista",
    nome: "Várzea Paulista",
    uf: "SP",
    unidades: [
      {
        id: "vp1",
        nome: "VÁRZEA PAULISTA",
        responsaveis: [
          { id: "vp1_1", nome: "Alessandro Luiz Garcia", cargo: "Proprietário", email: "alessandro.vp@delmatch.com", telefone: "(11) 99123-0039", iniciais: "AL", cor: "bg-orange-500" },
          { id: "vp1_2", nome: "Márcia de Lima", cargo: "Proprietário", email: "marcia.vp@delmatch.com", telefone: "(11) 99123-0040", iniciais: "MÁ", cor: "bg-orange-600" },
          { id: "vp1_3", nome: "Murilo Lima De Andrade", cargo: "Proprietário", email: "murilo.vp@delmatch.com", telefone: "(11) 99123-0041", iniciais: "MU", cor: "bg-orange-500" },
        ],
      },
    ],
  },
];

const allResponsavelIds = (cidades: Cidade[]) =>
  cidades.flatMap((c) => c.unidades.flatMap((u) => u.responsaveis.map((r) => r.id)));

interface UnidadeProps {
  onSelect: (unidades: string[], pessoas: string[], responsaveis: import("../types").ResponsavelInfo[]) => void;
}

export const Unidade = ({ onSelect }: UnidadeProps) => {
  // Tudo pré-selecionado por padrão — usuário só desmarca o que não quer
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());
  const [busca, setBusca] = useState("");
  const [expandidas, setExpandidas] = useState<Set<string>>(new Set());

  // Mapa: responsavelId -> {cidade, unidade} para resolver nomes no envio
  const respMap = useMemo(() => {
    const m = new Map<string, { cidade: string; unidade: string; resp: Responsavel }>();
    CIDADES.forEach((c) =>
      c.unidades.forEach((u) =>
        u.responsaveis.forEach((r) => m.set(r.id, { cidade: c.nome, unidade: u.nome, resp: r }))
      )
    );
    return m;
  }, []);

  const cidadesFiltradas = useMemo(() => {
    if (!busca.trim()) return CIDADES;
    const q = busca.toLowerCase();
    return CIDADES.map((c) => {
      const cidadeMatch = c.nome.toLowerCase().includes(q);
      const unidadesFiltradas = c.unidades
        .map((u) => {
          const unidadeMatch = u.nome.toLowerCase().includes(q);
          const respFiltrados = u.responsaveis.filter(
            (r) => r.nome.toLowerCase().includes(q) || r.cargo.toLowerCase().includes(q)
          );
          if (cidadeMatch || unidadeMatch) return u;
          if (respFiltrados.length > 0) return { ...u, responsaveis: respFiltrados };
          return null;
        })
        .filter((u): u is Unidade => u !== null);
      if (cidadeMatch) return c;
      if (unidadesFiltradas.length > 0) return { ...c, unidades: unidadesFiltradas };
      return null;
    }).filter((c): c is Cidade => c !== null);
  }, [busca]);

  // Auto-expandir resultados quando há busca
  useEffect(() => {
    if (busca.trim()) {
      setExpandidas(new Set(cidadesFiltradas.map((c) => c.id)));
    }
  }, [busca, cidadesFiltradas]);

  const toggleResp = (id: string) =>
    setSelecionados((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleCidade = (cidade: Cidade) => {
    const ids = cidade.unidades.flatMap((u) => u.responsaveis.map((r) => r.id));
    const todos = ids.every((id) => selecionados.has(id));
    setSelecionados((prev) => {
      const next = new Set(prev);
      if (todos) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  };

  const toggleUnidade = (u: Unidade) => {
    const ids = u.responsaveis.map((r) => r.id);
    const todos = ids.every((id) => selecionados.has(id));
    setSelecionados((prev) => {
      const next = new Set(prev);
      if (todos) ids.forEach((id) => next.delete(id));
      else ids.forEach((id) => next.add(id));
      return next;
    });
  };

  const toggleExpand = (id: string) =>
    setExpandidas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selecionarTudo = () => setSelecionados(new Set(allResponsavelIds(CIDADES)));
  const limparTudo = () => setSelecionados(new Set());

  const totalResp = allResponsavelIds(CIDADES).length;
  const cidadesSel = new Set<string>();
  const unidadesSel = new Set<string>();
  selecionados.forEach((id) => {
    const info = respMap.get(id);
    if (info) {
      cidadesSel.add(info.cidade);
      unidadesSel.add(info.unidade);
    }
  });

  const handleNext = () => {
    const respList = Array.from(selecionados)
      .map((id) => {
        const info = respMap.get(id);
        if (!info) return null;
        return {
          id: info.resp.id,
          nome: info.resp.nome,
          cargo: info.resp.cargo,
          iniciais: info.resp.iniciais,
          cor: info.resp.cor,
          cidade: info.cidade,
          unidade: info.unidade,
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
    onSelect(Array.from(unidadesSel), Array.from(cidadesSel), respList);
  };

  return (
    <div className="space-y-4">
      {/* Header explicativo */}
      <div className="rounded-2xl border border-accent/30 bg-accent/5 px-4 py-3">
        <p className="text-[11px] uppercase tracking-widest text-accent">Etapa 2 de 4 · Chamado em massa</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Selecione abaixo as <strong className="text-foreground">cidades e responsáveis</strong> que devem receber a notificação deste chamado.
        </p>
      </div>

      {/* Barra de ações */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-secondary/60 px-2 py-1.5 min-w-[220px]">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar cidade, unidade ou responsável..."
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
        </div>
        <Button size="sm" variant="secondary" onClick={selecionarTudo} className="h-8 text-xs">
          Selecionar todos
        </Button>
        <Button size="sm" variant="ghost" onClick={limparTudo} className="h-8 gap-1 text-xs">
          <X className="h-3.5 w-3.5" /> Limpar
        </Button>
      </div>

      {/* Accordion por cidade */}
      <div className="space-y-2">
        {cidadesFiltradas.map((cidade) => {
          const cidadeIds = cidade.unidades.flatMap((u) => u.responsaveis.map((r) => r.id));
          const cidadeSelCount = cidadeIds.filter((id) => selecionados.has(id)).length;
          const cidadeAllSel = cidadeSelCount === cidadeIds.length && cidadeIds.length > 0;
          const cidadeAlgunsSel = cidadeSelCount > 0 && !cidadeAllSel;
          const aberta = expandidas.has(cidade.id);

          return (
            <div
              key={cidade.id}
              className={cn(
                "overflow-hidden rounded-2xl border transition-colors",
                cidadeAllSel ? "border-accent/60 bg-accent/5" : cidadeAlgunsSel ? "border-accent/30" : "border-border bg-card"
              )}
            >
              {/* Header cidade */}
              <div className="flex items-center gap-3 px-4 py-3">
                <Checkbox
                  checked={cidadeAllSel ? true : cidadeAlgunsSel ? "indeterminate" : false}
                  onCheckedChange={() => toggleCidade(cidade)}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={() => toggleExpand(cidade.id)}
                  className="flex flex-1 items-center justify-between gap-3 text-left"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span className="text-sm font-semibold">{cidade.nome}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {cidade.uf}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {cidadeSelCount}/{cidadeIds.length} responsáveis
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        aberta && "rotate-180"
                      )}
                    />
                  </div>
                </button>
              </div>

              {/* Conteúdo expandido */}
              {aberta && (
                <div className="border-t border-border bg-background/40 px-4 py-3 space-y-3">
                  {cidade.unidades.map((u) => {
                    const ids = u.responsaveis.map((r) => r.id);
                    const selCount = ids.filter((id) => selecionados.has(id)).length;
                    const allSel = selCount === ids.length;
                    const algunsSel = selCount > 0 && !allSel;

                    return (
                      <div key={u.id} className="rounded-xl border border-border/60 bg-card/60">
                        <div className="flex items-center gap-2 border-b border-border/40 px-3 py-2">
                          <Checkbox
                            checked={allSel ? true : algunsSel ? "indeterminate" : false}
                            onCheckedChange={() => toggleUnidade(u)}
                          />
                          <span className="text-xs font-semibold">{u.nome}</span>
                          <span className="ml-auto text-[10px] text-muted-foreground">
                            {selCount}/{ids.length}
                          </span>
                        </div>
                        <ul className="divide-y divide-border/40">
                          {u.responsaveis.map((r) => {
                            const sel = selecionados.has(r.id);
                            return (
                              <li
                                key={r.id}
                                onClick={() => toggleResp(r.id)}
                                className={cn(
                                  "flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors hover:bg-secondary/40",
                                  sel && "bg-accent/5"
                                )}
                              >
                                <Checkbox
                                  checked={sel}
                                  onCheckedChange={() => toggleResp(r.id)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <span
                                  className={cn(
                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white",
                                    r.cor
                                  )}
                                >
                                  {r.iniciais}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium">{r.nome}</p>
                                  <p className="text-[10px] text-muted-foreground">{r.cargo}</p>
                                </div>
                                <div className="hidden flex-col items-end gap-0.5 text-[10px] text-muted-foreground sm:flex">
                                  <span className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" /> {r.email}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" /> {r.telefone}
                                  </span>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {cidadesFiltradas.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 py-10 text-center text-xs text-muted-foreground">
            Nenhum resultado para "{busca}".
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="sticky bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 backdrop-blur-xl">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Anterior
        </Button>
        <div className="text-xs text-muted-foreground">
          <strong className="text-foreground">{cidadesSel.size}</strong> cidade(s) ·{" "}
          <strong className="text-foreground">{unidadesSel.size}</strong> unidade(s) ·{" "}
          <strong className="text-foreground">{selecionados.size}</strong>/{totalResp} responsáveis
        </div>
        <Button
          size="sm"
          disabled={selecionados.size === 0}
          onClick={handleNext}
          className="gap-2 gradient-primary text-primary-foreground glow-orange"
        >
          Próximo <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
