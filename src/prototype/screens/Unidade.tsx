import { useMemo, useState } from "react";
import { Search, Building2, Users, ArrowRight, ArrowLeft, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Empresa = {
  id: string;
  nome: string;
  cidade: string;
  uf: string;
  iniciais: string;
  cor: string;
};

type Pessoa = {
  id: string;
  nome: string;
  qualificacao: string;
  cargo: string;
  empresaId: string;
  iniciais: string;
  cor: string;
};

const EMPRESAS: Empresa[] = [
  { id: "5768", nome: "Araçatuba - 5768", cidade: "ARAÇATUBA", uf: "SP", iniciais: "AR", cor: "bg-orange-500" },
  { id: "5701", nome: "Pinheiros - 5701", cidade: "SÃO PAULO", uf: "SP", iniciais: "PI", cor: "bg-blue-500" },
  { id: "5712", nome: "Moema - 5712", cidade: "SÃO PAULO", uf: "SP", iniciais: "MO", cor: "bg-purple-500" },
  { id: "5820", nome: "Centro - 5820", cidade: "RIO DE JANEIRO", uf: "RJ", iniciais: "CE", cor: "bg-emerald-500" },
  { id: "5905", nome: "Savassi - 5905", cidade: "BELO HORIZONTE", uf: "MG", iniciais: "SA", cor: "bg-pink-500" },
  { id: "6001", nome: "Batel - 6001", cidade: "CURITIBA", uf: "PR", iniciais: "BA", cor: "bg-indigo-500" },
];

const PESSOAS: Pessoa[] = [
  { id: "p1", nome: "Deikisson dos Santos Moura", qualificacao: "Proprietário", cargo: "Proprietário", empresaId: "5768", iniciais: "DE", cor: "bg-orange-500" },
  { id: "p2", nome: "Jonathan Gabriel Rocha Paschoal", qualificacao: "Proprietário", cargo: "Proprietário", empresaId: "5768", iniciais: "JO", cor: "bg-zinc-700" },
  { id: "p3", nome: "Meriellen Cristina Gomes de Carvalho", qualificacao: "Proprietário", cargo: "Proprietário", empresaId: "5768", iniciais: "ME", cor: "bg-zinc-700" },
  { id: "p4", nome: "Michelle Heloisa Gomes de Carvalho", qualificacao: "Proprietário", cargo: "Proprietário", empresaId: "5768", iniciais: "MI", cor: "bg-orange-500" },
  { id: "p5", nome: "Rafael Lima", qualificacao: "Gestor", cargo: "Gerente", empresaId: "5701", iniciais: "RA", cor: "bg-blue-500" },
  { id: "p6", nome: "Ana Beatriz Souza", qualificacao: "Operacional", cargo: "Atendente", empresaId: "5701", iniciais: "AN", cor: "bg-pink-500" },
  { id: "p7", nome: "Carlos Henrique Alves", qualificacao: "Gestor", cargo: "Gerente", empresaId: "5712", iniciais: "CA", cor: "bg-purple-500" },
  { id: "p8", nome: "Fernanda Ribeiro", qualificacao: "Proprietário", cargo: "Proprietário", empresaId: "5820", iniciais: "FE", cor: "bg-emerald-500" },
  { id: "p9", nome: "Lucas Pereira", qualificacao: "Operacional", cargo: "Caixa", empresaId: "5820", iniciais: "LU", cor: "bg-emerald-500" },
  { id: "p10", nome: "Juliana Castro", qualificacao: "Gestor", cargo: "Supervisor", empresaId: "5905", iniciais: "JU", cor: "bg-pink-500" },
  { id: "p11", nome: "Marcos Vinícius Teixeira", qualificacao: "Proprietário", cargo: "Proprietário", empresaId: "6001", iniciais: "MA", cor: "bg-indigo-500" },
];

interface UnidadeProps {
  onSelect: (unidades: string[], pessoas: string[]) => void;
}

export const Unidade = ({ onSelect }: UnidadeProps) => {
  const [empresasSel, setEmpresasSel] = useState<string[]>([]);
  const [pessoasSel, setPessoasSel] = useState<string[]>([]);
  const [buscaEmp, setBuscaEmp] = useState("");
  const [buscaPes, setBuscaPes] = useState("");
  const [filtroQual, setFiltroQual] = useState<string>("todas");
  const [filtroCargo, setFiltroCargo] = useState<string>("todos");

  const empresasFiltradas = useMemo(
    () =>
      EMPRESAS.filter(
        (e) =>
          e.nome.toLowerCase().includes(buscaEmp.toLowerCase()) ||
          e.cidade.toLowerCase().includes(buscaEmp.toLowerCase())
      ),
    [buscaEmp]
  );

  const pessoasDisponiveis = useMemo(() => {
    if (empresasSel.length === 0) return [];
    return PESSOAS.filter((p) => empresasSel.includes(p.empresaId));
  }, [empresasSel]);

  const pessoasFiltradas = useMemo(
    () =>
      pessoasDisponiveis.filter((p) => {
        const matchBusca =
          p.nome.toLowerCase().includes(buscaPes.toLowerCase()) ||
          p.cargo.toLowerCase().includes(buscaPes.toLowerCase());
        const matchQual = filtroQual === "todas" || p.qualificacao === filtroQual;
        const matchCargo = filtroCargo === "todos" || p.cargo === filtroCargo;
        return matchBusca && matchQual && matchCargo;
      }),
    [pessoasDisponiveis, buscaPes, filtroQual, filtroCargo]
  );

  const qualificacoes = useMemo(
    () => Array.from(new Set(PESSOAS.map((p) => p.qualificacao))),
    []
  );
  const cargos = useMemo(() => Array.from(new Set(PESSOAS.map((p) => p.cargo))), []);

  const toggleEmpresa = (id: string) =>
    setEmpresasSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const togglePessoa = (id: string) =>
    setPessoasSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const todasEmpresas = () => setEmpresasSel(empresasFiltradas.map((e) => e.id));
  const limparEmpresas = () => {
    setEmpresasSel([]);
    setPessoasSel([]);
  };
  const todasPessoas = () => setPessoasSel(pessoasFiltradas.map((p) => p.id));
  const limparPessoas = () => setPessoasSel([]);

  const empresaNomes = empresasSel
    .map((id) => EMPRESAS.find((e) => e.id === id)?.nome ?? "")
    .filter(Boolean);
  const pessoaNomes = pessoasSel
    .map((id) => PESSOAS.find((p) => p.id === id)?.nome ?? "")
    .filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-accent/30 bg-accent/5 px-4 py-3">
        <p className="text-[11px] uppercase tracking-widest text-accent">Etapa 2 de 4 · Chamado em massa</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Selecione uma ou mais <strong className="text-foreground">unidades/empresas</strong> e em seguida os{" "}
          <strong className="text-foreground">responsáveis</strong> que receberão o chamado.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* PAINEL ESQUERDO — EMPRESAS */}
        <Panel
          title="Selecionar Empresas/Unidades"
          icon={<Building2 className="h-4 w-4" />}
          counter={`${empresasSel.length} selecionada${empresasSel.length === 1 ? "" : "s"}`}
        >
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-secondary/40 px-3 py-2">
            <Button
              size="sm"
              variant={empresasSel.length === empresasFiltradas.length && empresasFiltradas.length > 0 ? "default" : "secondary"}
              onClick={todasEmpresas}
              className="h-8 gap-1 text-xs"
            >
              <Checkbox checked={empresasSel.length === empresasFiltradas.length && empresasFiltradas.length > 0} className="pointer-events-none" />
              Todas as Empresas
            </Button>
            <Button size="sm" variant="ghost" onClick={limparEmpresas} className="h-8 gap-1 text-xs">
              <X className="h-3.5 w-3.5" /> Desmarcar Todas
            </Button>
            <div className="ml-auto flex min-w-[180px] flex-1 items-center gap-2 rounded-md border border-border bg-card px-2 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={buscaEmp}
                onChange={(e) => setBuscaEmp(e.target.value)}
                placeholder="Pesquisar..."
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="max-h-[460px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="w-10 py-2"></th>
                  <th className="py-2 text-left font-medium">Empresa</th>
                  <th className="py-2 pr-3 text-left font-medium">Cidade</th>
                </tr>
              </thead>
              <tbody>
                {empresasFiltradas.map((e) => {
                  const sel = empresasSel.includes(e.id);
                  return (
                    <tr
                      key={e.id}
                      onClick={() => toggleEmpresa(e.id)}
                      className={cn(
                        "cursor-pointer border-b border-border/50 transition-colors hover:bg-secondary/60",
                        sel && "bg-accent/10"
                      )}
                    >
                      <td className="py-2 pl-3">
                        <Checkbox checked={sel} onCheckedChange={() => toggleEmpresa(e.id)} />
                      </td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <span className={cn("flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white", e.cor)}>
                            {e.iniciais}
                          </span>
                          <span className="font-medium">{e.nome}</span>
                        </div>
                      </td>
                      <td className="py-2 pr-3 text-xs text-muted-foreground">
                        {e.cidade} - {e.uf}
                      </td>
                    </tr>
                  );
                })}
                {empresasFiltradas.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-xs text-muted-foreground">
                      Nenhuma empresa encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* PAINEL DIREITO — PESSOAS */}
        <Panel
          title="Selecionar Responsáveis"
          icon={<Users className="h-4 w-4" />}
          counter={`${pessoasSel.length} pessoa${pessoasSel.length === 1 ? "" : "s"}`}
        >
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-secondary/40 px-3 py-2">
            <Button
              size="sm"
              variant={pessoasSel.length === pessoasFiltradas.length && pessoasFiltradas.length > 0 ? "default" : "secondary"}
              onClick={todasPessoas}
              disabled={pessoasFiltradas.length === 0}
              className="h-8 gap-1 text-xs"
            >
              <Checkbox checked={pessoasSel.length === pessoasFiltradas.length && pessoasFiltradas.length > 0} className="pointer-events-none" />
              Todas as Pessoas
            </Button>
            <Button size="sm" variant="ghost" onClick={limparPessoas} className="h-8 gap-1 text-xs">
              <X className="h-3.5 w-3.5" /> Desmarcar Todas
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-2 border-b border-border bg-card/60 px-3 py-2 sm:grid-cols-3">
            <Select value={filtroQual} onValueChange={setFiltroQual}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Qualificação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as Qualificações</SelectItem>
                {qualificacoes.map((q) => (
                  <SelectItem key={q} value={q}>
                    {q}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filtroCargo} onValueChange={setFiltroCargo}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Cargos</SelectItem>
                {cargos.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={buscaPes}
                onChange={(e) => setBuscaPes(e.target.value)}
                placeholder="Pesquisar..."
                className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="max-h-[400px] overflow-auto">
            {empresasSel.length === 0 ? (
              <div className="flex h-[200px] flex-col items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                <Building2 className="h-8 w-8 opacity-40" />
                <p>Selecione uma empresa para listar os responsáveis</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-card text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr className="border-b border-border">
                    <th className="w-10 py-2"></th>
                    <th className="py-2 text-left font-medium">Pessoa</th>
                    <th className="py-2 text-left font-medium">Qualificação</th>
                    <th className="py-2 text-left font-medium">Cargo</th>
                    <th className="py-2 pr-3 text-left font-medium">Unidade</th>
                  </tr>
                </thead>
                <tbody>
                  {pessoasFiltradas.map((p) => {
                    const sel = pessoasSel.includes(p.id);
                    const empresa = EMPRESAS.find((e) => e.id === p.empresaId);
                    return (
                      <tr
                        key={p.id}
                        onClick={() => togglePessoa(p.id)}
                        className={cn(
                          "cursor-pointer border-b border-border/50 transition-colors hover:bg-secondary/60",
                          sel && "bg-accent/10"
                        )}
                      >
                        <td className="py-2 pl-3">
                          <Checkbox checked={sel} onCheckedChange={() => togglePessoa(p.id)} />
                        </td>
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <span className={cn("flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white", p.cor)}>
                              {p.iniciais}
                            </span>
                            <span className="font-medium">{p.nome}</span>
                          </div>
                        </td>
                        <td className="py-2 text-xs text-muted-foreground">{p.qualificacao}</td>
                        <td className="py-2 text-xs text-muted-foreground">{p.cargo}</td>
                        <td className="py-2 pr-3 text-xs text-muted-foreground">{empresa?.nome}</td>
                      </tr>
                    );
                  })}
                  {pessoasFiltradas.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-xs text-muted-foreground">
                        Nenhum responsável encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-3 py-2 text-xs">
            <span className="text-muted-foreground">
              Encontrado {pessoasFiltradas.length} pessoa{pessoasFiltradas.length === 1 ? "" : "s"}.
            </span>
            <span className="font-medium">
              {pessoasSel.length} Pessoa{pessoasSel.length === 1 ? "" : "s"} Selecionada{pessoasSel.length === 1 ? "" : "s"}
            </span>
          </div>
        </Panel>
      </div>

      {/* RODAPÉ AÇÕES */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Anterior
        </Button>
        <div className="text-xs text-muted-foreground">
          {empresasSel.length > 0 && (
            <span>
              <strong className="text-foreground">{empresasSel.length}</strong> unidade(s) ·{" "}
              <strong className="text-foreground">{pessoasSel.length}</strong> responsável(eis)
            </span>
          )}
        </div>
        <Button
          size="sm"
          disabled={empresasSel.length === 0 || pessoasSel.length === 0}
          onClick={() => onSelect(empresaNomes, pessoaNomes)}
          className="gap-2 gradient-primary text-primary-foreground glow-orange"
        >
          Próximo <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const Panel = ({
  title,
  icon,
  counter,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  counter: string;
  children: React.ReactNode;
}) => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card">
    <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-4 py-2.5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </div>
      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
        {counter}
      </span>
    </div>
    {children}
  </div>
);
