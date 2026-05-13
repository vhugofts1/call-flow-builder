import { ResponsavelInfo } from "./types";

// Unidades (18 Cidades)
export const CONTATOS_UNIDADES: ResponsavelInfo[] = [
  // Araçatuba
  { id: "p1", nome: "Deikisson dos Santos Moura", cargo: "Proprietário", unidade: "Araçatuba", cor: "bg-orange-500", iniciais: "DE", cidade: "Araçatuba" },
  { id: "p2", nome: "Jonathan Gabriel Rocha Paschoal", cargo: "Proprietário", unidade: "Araçatuba", cor: "bg-zinc-700", iniciais: "JO", cidade: "Araçatuba" },
  { id: "p3", nome: "Meriellen Cristina Gomes de Carvalho", cargo: "Gerente", unidade: "Araçatuba", cor: "bg-pink-500", iniciais: "ME", cidade: "Araçatuba" },
  { id: "p4", nome: "Michelle Heloisa Gomes de Carvalho", cargo: "Supervisora", unidade: "Araçatuba", cor: "bg-orange-500", iniciais: "MI", cidade: "Araçatuba" },
  // Araraquara
  { id: "ara1", nome: "Ana Maria Berardo Magalhães", cargo: "Consultor de Vendas", unidade: "Araraquara", cor: "bg-orange-500", iniciais: "AN", cidade: "Araraquara" },
  { id: "ara2", nome: "Antonio Carlos de Almeida Junior", cargo: "Consultor de Vendas", unidade: "Araraquara", cor: "bg-zinc-800", iniciais: "AC", cidade: "Araraquara" },
  { id: "ara3", nome: "Empresa Full", cargo: "Estabelecimento comercial", unidade: "Araraquara", cor: "bg-orange-600", iniciais: "EM", cidade: "Araraquara" },
  { id: "ara4", nome: "José Carlos Castanheira", cargo: "Proprietário", unidade: "Araraquara", cor: "bg-zinc-700", iniciais: "JC", cidade: "Araraquara" },
  // Bauru
  { id: "bau1", nome: "Felype Yukio Nakayama", cargo: "Motoboy Líder", unidade: "Bauru", cor: "bg-zinc-800", iniciais: "FE", cidade: "Bauru" },
  { id: "bau2", nome: "Gabriele Cristina Huss", cargo: "Administrativo", unidade: "Bauru", cor: "bg-pink-500", iniciais: "GA", cidade: "Bauru" },
  { id: "bau3", nome: "Matheus Ferreira Degelo", cargo: "Proprietário", unidade: "Bauru", cor: "bg-zinc-700", iniciais: "MA", cidade: "Bauru" },
  { id: "bau4", nome: "Melissa Carolina Ferreira", cargo: "Proprietário", unidade: "Bauru", cor: "bg-orange-500", iniciais: "ME", cidade: "Bauru" },
  // Jundiaí
  { id: "jun1", nome: "Gustavo Ferreira Porfirio", cargo: "Motoboy Líder", unidade: "Jundiaí", cor: "bg-orange-500", iniciais: "GU", cidade: "Jundiaí" },
  { id: "jun2", nome: "Vitor Thomazini", cargo: "Proprietário", unidade: "Jundiaí", cor: "bg-zinc-800", iniciais: "VI", cidade: "Jundiaí" },
  // Rio Claro
  { id: "rio1", nome: "Alessandro Luiz Garcia", cargo: "Proprietário", unidade: "Rio Claro", cor: "bg-orange-500", iniciais: "AL", cidade: "Rio Claro" },
  { id: "rio2", nome: "Márcia de Lima", cargo: "Proprietário", unidade: "Rio Claro", cor: "bg-orange-600", iniciais: "MÁ", cidade: "Rio Claro" },
  { id: "rio3", nome: "Murilo Lima De Andrade", cargo: "Proprietário", unidade: "Rio Claro", cor: "bg-orange-500", iniciais: "MU", cidade: "Rio Claro" },
];

// Administrativo
export const CONTATOS_ADMIN: ResponsavelInfo[] = [
  { id: "ad1", nome: "Wagner A. Ferreira", cargo: "CFO", unidade: "Financeiro", cor: "bg-blue-600", iniciais: "WA", cidade: "Matriz" },
  { id: "ad2", nome: "Matheus Gibraz", cargo: "CEO", unidade: "Tecnologia", cor: "bg-zinc-900", iniciais: "MG", cidade: "Matriz" },
  { id: "ad3", nome: "Milena Alanes", cargo: "Supervisora Suporte", unidade: "Suporte", cor: "bg-emerald-600", iniciais: "MA", cidade: "Matriz" },
  { id: "ad4", nome: "Marcos Vinícius", cargo: "Desenvolvedor", unidade: "Tecnologia", cor: "bg-blue-500", iniciais: "MV", cidade: "Matriz" },
  { id: "ad5", nome: "Victor Hugo da Silva", cargo: "Atendente", unidade: "Suporte", cor: "bg-orange-500", iniciais: "VH", cidade: "Matriz" },
  { id: "ad6", nome: "Carol Advogada", cargo: "Jurídico", unidade: "Jurídico", cor: "bg-indigo-600", iniciais: "CA", cidade: "Matriz" },
];

export const MASTER_CONTATOS = [...CONTATOS_ADMIN, ...CONTATOS_UNIDADES];
