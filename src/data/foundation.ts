export type PillarId = 'builder' | 'enterprise' | 'governance';

export interface ProductScreen {
  id: string;
  pillar: PillarId;
  title: string;
  tab: string;
  file: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  highlights: { title: string; text: string; x: number; y: number }[];
}

export const productScreens: ProductScreen[] = [
  {
    id: 'builder-diagram', pillar: 'builder', title: 'Agent Builder · Diagrama do agente', tab: 'Diagrama', file: 'lynn_foundation_builder_agente_diagrama.png', width: 1916, height: 982,
    alt: 'Agent Builder do LYNN: fluxo visual com início, etapa de IA e encerramento, conectado a um painel de conversa para teste.',
    caption: 'A visão de diagrama organiza as etapas do agente. O exemplo fornecido é um analista de releases, com um painel de conversa para experimentar o fluxo.',
    highlights: [
      { title: 'Dê forma ao fluxo', text: 'As etapas conectadas tornam visível como o agente percorre a tarefa, do início ao encerramento.', x: 31, y: 22 },
      { title: 'Conecte as capacidades', text: 'A etapa de IA reúne as capacidades usadas pelo agente, como ferramentas e memória, dentro de uma sequência de trabalho.', x: 20, y: 32 },
      { title: 'Experimente a interação', text: 'O painel de conversa permite testar o comportamento do agente durante sua construção.', x: 74, y: 77 },
    ],
  },
  {
    id: 'builder-prompt', pillar: 'builder', title: 'Agent Builder · Instruções do agente', tab: 'Instruções', file: 'lynn_foundation_builder_agente_prompt.png', width: 1912, height: 987,
    alt: 'Agent Builder do LYNN com editor de instruções, acesso a ferramentas e bases de conhecimento, painel de configurações e conversa de teste.',
    caption: 'As instruções descrevem o papel, as regras e a sequência de trabalho. Ferramentas e bases de conhecimento complementam o que o agente pode fazer.',
    highlights: [
      { title: 'Traduza a regra de negócio', text: 'As instruções definem o papel do agente, o que ele deve fazer e quando a pessoa participa da decisão.', x: 27, y: 43 },
      { title: 'Escolha os recursos', text: 'Ferramentas, bases de conhecimento e integrações conectam as instruções às capacidades necessárias para executar a tarefa.', x: 36, y: 23 },
      { title: 'Configure e teste', text: 'Configurações do agente e conversa de teste ficam acessíveis durante a elaboração do fluxo.', x: 83, y: 16 },
    ],
  },
  {
    id: 'builder-manifest', pillar: 'builder', title: 'Agent Builder · Manifesto do agente', tab: 'Manifesto', file: 'lynn_foundation_builder_agente_manifesto.png', width: 1918, height: 987,
    alt: 'Agent Builder do LYNN na visão de manifesto, com a definição estruturada do agente e um painel lateral de conversa para teste.',
    caption: 'O manifesto é a representação estruturada das definições do agente. É uma visão mais detalhada para quem configura e desenvolve a aplicação.',
    highlights: [
      { title: 'Uma definição estruturada', text: 'Nome, descrição e etapas aparecem organizados em uma definição legível pelas ferramentas de desenvolvimento.', x: 27, y: 18 },
      { title: 'Detalhe o comportamento', text: 'As configurações registram como cada etapa e seus recursos participam da execução.', x: 20, y: 61 },
      { title: 'Valide a experiência', text: 'A conversa de teste aproxima a definição do agente da experiência que ele entrega.', x: 73, y: 66 },
    ],
  },
  {
    id: 'enterprise-conversation', pillar: 'enterprise', title: 'Enterprise Layer · Interação com o agente', tab: 'Conversa', file: 'lynn_foundation_enterprise_layer_agente_conversacional.png', width: 1914, height: 986,
    alt: 'Enterprise Layer do LYNN com lista de agentes à esquerda, conversa com o Agente Documentação ao centro e painel de tarefas à direita.',
    caption: 'A experiência reúne agentes, interação e tarefas no mesmo ambiente. A conversa é uma das formas de participação das pessoas na operação.',
    highlights: [
      { title: 'Encontre o agente certo', text: 'Os agentes aparecem organizados no ambiente de trabalho, com acesso à experiência de cada um.', x: 13, y: 35 },
      { title: 'Participe da execução', text: 'A conversa cria um ponto de interação com a pessoa. O agente opera com o contexto e as regras do cliente.', x: 47, y: 34 },
      { title: 'Acompanhe o trabalho', text: 'O painel reúne tarefas pendentes, em execução, com erros e finalizadas para acompanhar a operação.', x: 80, y: 20 },
    ],
  },
  {
    id: 'enterprise-tasks', pillar: 'enterprise', title: 'Enterprise Layer · Agentes e tarefas', tab: 'Tarefas', file: 'lynn_foundation_enterprise_layer_lista_agentes_e_acoes_realizadas.png', width: 1912, height: 982,
    alt: 'Enterprise Layer do LYNN com agentes disponíveis e painel de tarefas que mostra estados, agente responsável por cada ação e detalhes da execução.',
    caption: 'A lista de tarefas mostra a operação acontecendo: estados, agentes envolvidos, responsáveis e acesso ao detalhamento de cada trabalho.',
    highlights: [
      { title: 'Veja o estado da operação', text: 'Pendências, erros, execuções e finalizações ajudam a identificar o que precisa de acompanhamento.', x: 40, y: 20 },
      { title: 'Conecte ação e responsabilidade', text: 'Cada tarefa identifica o agente envolvido e a pessoa responsável por acompanhar aquela situação.', x: 50, y: 36 },
      { title: 'Aprofunde quando necessário', text: 'O acesso aos detalhes permite sair da visão geral e investigar uma tarefa específica.', x: 91, y: 33 },
    ],
  },
  {
    id: 'admin-agents', pillar: 'governance', title: 'Administração · Agentes e permissões', tab: 'Agentes', file: 'lynn_foundation_admin_agentes.png', width: 1914, height: 991,
    alt: 'Tela administrativa do LYNN com lista de agentes, versões, permissões e acesso à utilização e às coleções de registro.',
    caption: 'A administração torna agentes, versões e permissões visíveis. É uma evidência de gestão dentro do Foundation, com acesso a utilização e registros.',
    highlights: [
      { title: 'Organize os agentes', text: 'A listagem reúne agentes e suas versões para administrar o ambiente de forma consistente.', x: 26, y: 31 },
      { title: 'Defina quem pode acessar', text: 'O controle de permissões fica disponível por agente, aproximando o acesso das regras da organização.', x: 87, y: 24 },
      { title: 'Acesse utilização e registros', text: 'A tela oferece pontos de entrada para utilização de agentes e coleções de registro.', x: 81, y: 11 },
    ],
  },
  {
    id: 'admin-details', pillar: 'governance', title: 'Administração · Detalhes do projeto de agentes', tab: 'Projeto', file: 'lynn_foundation_admin_agente_detalhes.png', width: 1920, height: 707,
    alt: 'Tela administrativa do LYNN com agentes e subagentes de um projeto, estado de rascunho e abas de documentação, parâmetros, segredos, agendamentos e registros.',
    caption: 'Os detalhes do projeto reúnem agentes e subagentes, configuração e registros. O estado de rascunho identifica a situação exibida no exemplo.',
    highlights: [
      { title: 'Entenda a composição', text: 'Agente principal e subagentes aparecem como partes de um mesmo projeto de trabalho.', x: 39, y: 58 },
      { title: 'Centralize a administração', text: 'Documentação, parâmetros, agendamentos e registros ficam reunidos no contexto do projeto.', x: 36, y: 23 },
      { title: 'Identifique o estado', text: 'A indicação de rascunho permite reconhecer o estágio mostrado nesta tela de referência.', x: 93, y: 15 },
    ],
  },
];

export const foundationPillars = [
  {
    id: 'builder' as const, name: 'Agent Builder', verb: 'Criar', accent: 'lavender',
    headline: 'Uma oportunidade vira um agente funcional.',
    description: 'O ambiente para conceber, construir e orquestrar agentes conectados ao ERP, CRM e demais aplicações TOTVS. Transforma uma necessidade de negócio em um fluxo capaz de raciocinar, acessar dados e executar ações, com autonomia ou participação humana.',
    value: 'Construção padronizada e reaproveitável, da ideia ao trabalho executado.',
    note: 'Diagrama, instruções e manifesto são visões do Agent Builder. No Workflow Redesign, Agentes TOTVS, LYNN Enterprise e LYNN Garden são desenvolvidos a partir do mesmo Foundation.',
    initialScreen: 'builder-diagram',
  },
  {
    id: 'enterprise' as const, name: 'Enterprise Layer', verb: 'Conectar', accent: 'cyan',
    headline: 'A inteligência participa da operação real.',
    description: 'Conecta os agentes aos dados, sistemas e regras de cada cliente, com contexto corporativo e acesso seguro. Registra metadados de uso e resultado que ajudam a medir e aprimorar as aplicações.',
    value: 'Respostas fundamentadas no negócio e ações conectadas à realidade da empresa.',
    note: 'As telas ilustram a experiência de interação e acompanhamento. O papel da Enterprise Layer também inclui contexto, integração e registro de uso e resultado. Este pilar do Foundation compõe a base da plataforma LYNN Enterprise, posicionada em Agent Engineering.',
    initialScreen: 'enterprise-conversation',
  },
  {
    id: 'governance' as const, name: 'Governance', verb: 'Governar', accent: 'mint',
    headline: 'Escalar com rastreabilidade e controle.',
    description: 'Governa o uso dos modelos, acompanha consumo e custo das requisições e dá visibilidade às ações dos agentes. Regras de proteção, segurança da informação e conformidade sustentam a operação.',
    value: 'Controle da aplicação em produção, com visibilidade para agir e evoluir.',
    note: 'As imagens mostram administração e permissões, uma parte dessa gestão. Controle dos modelos e custo das requisições pertencem a Governance; cobrança de T-Coins e wallet fazem parte do modelo comercial independente.',
    initialScreen: 'admin-agents',
  },
];

export const aiEnablers = [
  { id: 'cloud', title: 'T-Cloud', subtitle: 'Ambiente preparado', description: 'A universalização do T-Cloud é o habilitador para um ambiente seguro, soberano e padronizado em que a IA possa operar em escala.' },
  { id: 'apis', title: 'APIs', subtitle: 'Acesso e ação', description: 'O domínio das APIs permite que agentes e aplicações acessem informações e executem ações nos sistemas de gestão.' },
  { id: 'data', title: 'Dados e sistemas', subtitle: 'Prontidão para IA', description: 'Bases organizadas e sistemas atualizados asseguram dados íntegros, acessíveis e preparados para alimentar a operação de IA.' },
];
