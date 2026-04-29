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
    id: "saopaulo",
    nome: "São Paulo",
    uf: "SP",
    unidades: [
      {
        id: "5701",
        nome: "DM Pinheiros - 5701",
        responsaveis: [
          { id: "p5", nome: "Rafael Lima", cargo: "Gerente", email: "rafael@delmatch.com", telefone: "(11) 98123-4400", iniciais: "RA", cor: "bg-blue-500" },
          { id: "p6", nome: "Ana Beatriz Souza", cargo: "Atendente", email: "ana.souza@delmatch.com", telefone: "(11) 97765-2289", iniciais: "AN", cor: "bg-pink-500" },
        ],
      },
      {
        id: "5712",
        nome: "DM Moema - 5712",
        responsaveis: [
          { id: "p7", nome: "Carlos Henrique Alves", cargo: "Gerente", email: "carlos@delmatch.com", telefone: "(11) 98889-1010", iniciais: "CA", cor: "bg-purple-500" },
        ],
      },
    ],
  },
  {
    id: "rj",
    nome: "Rio de Janeiro",
    uf: "RJ",
    unidades: [
      {
        id: "5820",
        nome: "DM Centro - 5820",
        responsaveis: [
          { id: "p8", nome: "Fernanda Ribeiro", cargo: "Proprietária", email: "fernanda@delmatch.com", telefone: "(21) 99211-7788", iniciais: "FE", cor: "bg-emerald-500" },
          { id: "p9", nome: "Lucas Pereira", cargo: "Caixa", email: "lucas@delmatch.com", telefone: "(21) 98654-3322", iniciais: "LU", cor: "bg-emerald-600" },
        ],
      },
    ],
  },
  {
    id: "bh",
    nome: "Belo Horizonte",
    uf: "MG",
    unidades: [
      {
        id: "5905",
        nome: "DM Savassi - 5905",
        responsaveis: [
          { id: "p10", nome: "Juliana Castro", cargo: "Supervisora", email: "juliana@delmatch.com", telefone: "(31) 99845-6677", iniciais: "JU", cor: "bg-pink-500" },
        ],
      },
    ],
  },
  {
    id: "ctba",
    nome: "Curitiba",
    uf: "PR",
    unidades: [
      {
        id: "6001",
        nome: "DM Batel - 6001",
        responsaveis: [
          { id: "p11", nome: "Marcos Vinícius Teixeira", cargo: "Proprietário", email: "marcos@delmatch.com", telefone: "(41) 99770-1199", iniciais: "MA", cor: "bg-indigo-500" },
        ],
      },
    ],
  },
];

const allResponsavelIds = (cidades: Cidade[]) =>
  cidades.flatMap((c) => c.unidades.flatMap((u) => u.responsaveis.map((r) => r.id)));

interface UnidadeProps {
  onSelect: (unidades: string[], pessoas: string[]) => void;
}

export const Unidade = ({ onSelect }: UnidadeProps) => {
  // Tudo pré-selecionado por padrão — usuário só desmarca o que não quer
  const [selecionados, setSelecionados] = useState<Set<string>>(
    () => new Set(allResponsavelIds(CIDADES))
  );
  const [busca, setBusca] = useState("");
  const [expandidas, setExpandidas] = useState<Set<string>>(() => new Set(CIDADES.map((c) => c.id)));

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
    onSelect(Array.from(unidadesSel), Array.from(cidadesSel));
  };

  return (
    <div className="space-y-4">
      {/* Header explicativo */}
      <div className="rounded-2xl border border-accent/30 bg-accent/5 px-4 py-3">
        <p className="text-[11px] uppercase tracking-widest text-accent">Etapa 2 de 4 · Chamado em massa</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Todos os responsáveis estão{" "}
          <strong className="text-foreground">pré-selecionados</strong>. Use os checkboxes para ajustar
          quem deve receber este chamado.
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
