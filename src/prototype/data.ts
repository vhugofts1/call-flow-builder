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

export const CIDADES = [
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

export const MASTER_CONTATOS = [...CONTATOS_ADMIN, ...CONTATOS_UNIDADES];
