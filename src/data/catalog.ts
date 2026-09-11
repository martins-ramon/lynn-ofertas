export type Vision = 'current' | 'future';
export type PortfolioId = 'garden' | 'standard' | 'specialists' | 'custom' | 'assistants' | 'partners';
export type CommercialModel = 'tcoin' | 'own' | 'undecided';
export type PortfolioNature = 'offer' | 'product';
export type Status = 'Em desenvolvimento' | 'Planejado para 2027' | 'Em discovery' | 'Disponibilidade a confirmar' | 'Disponível no material';

export interface PortfolioItem {
  id: PortfolioId;
  name: string;
  owner: string;
  accent: string;
  tagline: string;
  description: string;
  audience: string;
  highlights: string[];
  source: string;
  oes: boolean;
  commercialModel: CommercialModel;
  foundationRelation: 'foundation' | 'proxy';
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'garden', name: 'LYNN Garden', owner: 'Eficiência operacional', accent: 'mint',
    tagline: 'Da sua ideia ao seu agente.',
    description: 'Produto de IA para criar e utilizar agentes de eficiência operacional por meio de instruções, templates e conexões. É um protótipo em validação controlada, originado para uso interno na TOTVS. Seu modelo de comercialização está em discussão: T-Coins ou modelo próprio.',
    audience: 'Pessoas e equipes que querem transformar tarefas repetitivas em tempo para o que importa.',
    highlights: ['Criar agentes com templates, instruções e conexões; conversar e organizar agentes do usuário', 'Conexões apresentadas no protótipo: Gmail, Drive, Docs, Sheets, Calendar, Chat, Slides e Slack', 'Projeto independente, construído com OpenAI Agents SDK; usa LYNN Proxy para acesso aos modelos', 'Convergência ao Foundation LYNN e modelo comercial ainda a definir'],
    source: 'LYNN Garden — contexto fornecido em lynn_garden.md e quatro telas do protótipo; esclarecimentos comerciais do projeto.', oes: false, commercialModel: 'undecided', foundationRelation: 'proxy',
  },
  {
    id: 'standard', name: 'Agentes Padrão', owner: 'Time de Produtos', accent: 'cyan',
    tagline: 'Inteligência dentro da operação.',
    description: 'Produtos de IA desenvolvidos pelos times de Produtos para automatizar e apoiar rotinas dos sistemas TOTVS. Cada agente atende uma necessidade concreta e torna tangível o valor da oferta T-Coins, que é o objeto de contratação.',
    audience: 'Empresas que querem ganhar eficiência nos processos que já executam com os produtos TOTVS.',
    highlights: ['43 agentes em 16 segmentos e linhas no material de agosto/2026', 'Do planejamento educacional à auditoria de folha e à gestão de estoque', 'Ativação prevista no Store, conforme disponibilização e evolução de cada agente'],
    source: 'Agentes de IA — Segmentos, Fase 1 + Fase 2, agosto/2026, páginas 2–24; nomenclatura e taxonomia atualizadas conforme o projeto.', oes: false, commercialModel: 'tcoin', foundationRelation: 'foundation',
  },
  {
    id: 'specialists', name: 'Agentes Especialistas', owner: 'OES · Ofertas e Serviços / IDeIA', accent: 'lavender',
    tagline: 'Especialização que move processos.',
    description: 'Agentes com foco em processos de negócio, desenvolvidos por OES sobre LYNN. O material reúne rotinas fiscais, financeiras, de compras e de recursos humanos para Protheus, RM e Datasul.',
    audience: 'Equipes que precisam de automações especializadas em processos recorrentes do negócio.',
    highlights: ['10 especialistas relacionados no material OES', 'Fiscal, contas a pagar, contas a receber, compras, conciliação e férias', 'Construídos sobre LYNN; contratação própria hoje e convergência pretendida para T-Coin'],
    source: 'Agentes Especialistas e Personalizados, página 1; esclarecimentos do responsável pelo projeto.', oes: true, commercialModel: 'own', foundationRelation: 'foundation',
  },
  {
    id: 'custom', name: 'Agentes Personalizados', owner: 'OES · Ofertas e Serviços / IDeIA', accent: 'lavender',
    tagline: 'O seu processo. A sua inteligência.',
    description: 'Agentes construídos sobre LYNN para o processo e as regras de cada cliente. A jornada começa identificando oportunidades, prioriza o retorno esperado e segue com implantação e sustentação.',
    audience: 'Empresas com necessidades específicas que pedem um escopo desenhado para sua operação.',
    highlights: ['Descoberta: oportunidades, análise de retorno e priorização', 'Implantação: desenvolvimento de acordo com as regras do cliente', 'Sustentação: acompanhamento e manutenção em produção'],
    source: 'Agentes Especialistas e Personalizados, páginas 2–3; esclarecimentos do responsável pelo projeto.', oes: true, commercialModel: 'own', foundationRelation: 'foundation',
  },
  {
    id: 'assistants', name: 'Assistentes de IA', owner: 'OES · Ofertas e Serviços / IDeIA', accent: 'lavender',
    tagline: 'Mais compreensão. Menos esforço.',
    description: 'Assistentes para ler imagens e documentos, analisar informações e gerar resultados conforme a diretriz do cliente. Apoiam as pessoas na interpretação do conteúdo e na execução dos processos.',
    audience: 'Equipes que lidam com documentos, evidências visuais e validação de informações.',
    highlights: ['Leitura de imagens e leitura de documentos', 'Entrada de conteúdo → leitura e validação → resultado', 'Os dois assistentes são informados como disponíveis no material de referência'],
    source: 'Agentes Especialistas e Personalizados, páginas 4–6; esclarecimentos do responsável pelo projeto.', oes: true, commercialModel: 'own', foundationRelation: 'foundation',
  },
  {
    id: 'partners', name: 'Parceiros e franquias', owner: 'Ecossistema TOTVS', accent: 'peach',
    tagline: 'Mais criadores. Mais possibilidades.',
    description: 'Parceiros e franquias ampliam o portfólio ao desenvolver produtos de IA sobre o Foundation LYNN e publicá-los no Store. Esses agentes geram razões para contratar e consumir a oferta T-Coins; não são ofertas comerciais isoladas neste modelo.',
    audience: 'Parceiros e franquias que querem transformar sua especialização em produtos de IA para clientes TOTVS.',
    highlights: ['Construir sobre LYNN e publicar no Store', 'Consumo em T-Coin no modelo pretendido para o ecossistema', 'Referência de remuneração 70/30 no briefing; condições e repasses ainda em definição'],
    source: 'Briefing do projeto e reunião de 09/09/2026, 00:34:19–00:51:52; esclarecimento da taxonomia comercial.', oes: false, commercialModel: 'tcoin', foundationRelation: 'foundation',
  },
];

export interface Agent {
  id: string;
  name: string;
  segment: string;
  products: string[];
  description: string;
  family: 'standard' | 'specialists' | 'assistants';
  status: Status;
  page: number;
}

type ProductRow = [name: string, segment: string, products: string[], description: string, page: number, status?: Status];
const productRows: ProductRow[] = [
  ['Planejamento de oferta educacional', 'Educacional', [], 'Monta cenários de grades horárias e alocação de professores, considerando regras, restrições e preferências da instituição.', 2],
  ['Auditor de Faturamento', 'Jurídico', [], 'Identifica inconsistências nas movimentações de casos e contratos que afetam o faturamento mensal do escritório.', 3],
  ['Alterações em lote', 'Jurídico', [], 'Realiza alterações de dados por linguagem natural, respeitando os modelos de negócio e as jornadas do produto.', 3],
  ['Emissão de pré-faturas', 'Jurídico', [], 'Emite pré-faturas de contratos conforme instruções e agendamentos, incluindo tarefas posteriores como o envio de e-mails.', 4],
  ['Revisão de pré-faturas', 'Jurídico', [], 'Interpreta instruções da revisão e aplica ajustes, com autonomia ou confirmação humana conforme o impacto.', 4],
  ['Time Sheet', 'Jurídico', [], 'Simplifica operações e consultas da rotina de apontamento de horas no módulo de faturamento.', 5],
  ['Agente de casos', 'Jurídico', [], 'Atende solicitações em linguagem natural relacionadas às operações e consultas de casos do escritório.', 5],
  ['Escrituração Contábil', 'BO RM', ['RM'], 'Monitora lançamentos contábeis para identificar anomalias e recomendar correções antes do fechamento.', 6],
  ['Gestor de contratos', 'BO RM', ['RM'], 'Monitora a saúde financeira e operacional dos contratos, identificando riscos e oportunidades de forma preventiva.', 6],
  ['Liberação de Pedido de Vendas', 'Varejo e Distribuição', ['Winthor'], 'Avalia pedidos bloqueados por motivos financeiros com base em crédito, histórico e regras comerciais.', 7],
  ['TOTVS Loja Alta Performance', 'Varejo e Distribuição', ['Protheus'], 'Analisa indicadores de lojas e vendedores e recomenda ações para melhorar vendas, ticket médio e margem.', 7],
  ['Auditor de Taxa Contratada', 'Varejo e Distribuição', ['Equals'], 'Compara taxas cobradas pelas adquirentes com as negociadas em contrato e consolida as divergências.', 8],
  ['Agente Conciliador', 'Varejo e Distribuição', ['Equals'], 'Concilia vendas registradas pelas adquirentes e pelo ERP, apontando inconsistências e automatizando baixas.', 8],
  ['Sugestão de fornecedores', 'BO Protheus', ['Protheus'], 'Recomenda fornecedores para cotações a partir do histórico de compras e das políticas da empresa.', 9],
  ['Liberação de crédito inteligente', 'BO Protheus', ['Protheus'], 'Analisa pedidos bloqueados por crédito e apoia sua liberação. Quando não aprova, apresenta o racional para decisão humana.', 9],
  ['Central de notas autônoma', 'Supermercados', [], 'Analisa notas fiscais recebidas, identifica inconsistências e sugere ou executa ações de correção.', 10],
  ['Insights de preços', 'Supermercados', [], 'Monitora preços e recomenda ajustes para recompor margem, calibrar promoções e reduzir perdas.', 10],
  ['Otimizador de verba', 'Supermercados', [], 'Analisa histórico de vendas e potencial de retorno para sugerir aplicação de verbas, com validação antes da execução.', 11, 'Planejado para 2027'],
  ['Validador SPED Fiscal', 'Supermercados', [], 'Apoia a geração e a correção dos arquivos SPED, mantendo consistência com as informações no ERP.', 11, 'Planejado para 2027'],
  ['Libra · Agente de Compras', 'Hospitalidade', [], 'Cruza ocupação prevista, consumo e estoque para sugerir compras, mantendo o comprador no controle da aprovação.', 12],
  ['Mercúrio · Conciliação Contábil', 'Hospitalidade', [], 'Compara razão contábil e sistemas de origem, explica divergências e prepara sugestões para revisão humana.', 12],
  ['Monitoramento de Recebimento', 'Supply e Logística', ['WMS SaaS'], 'Monitora o recebimento e identifica notas e recursos que precisam ser priorizados para evitar rupturas.', 13],
  ['Priorização de Expedição', 'Supply e Logística', ['WMS SaaS'], 'Prioriza pedidos urgentes conforme as regras do planejador e orienta ações na operação de expedição.', 13],
  ['Monitor de Integridade de Custos', 'Manufatura', [], 'Detecta irregularidades nas movimentações e ordens de produção para apoiar a integridade do fechamento de custos.', 14],
  ['Acelerador de Planejamento', 'Manufatura', [], 'Interpreta recomendações de planejamento e prioriza ajustes em ordens de compra e produção.', 14],
  ['Pendências de Apontamentos Mobile', 'Manufatura', ['Minha Produção'], 'Traduz mensagens de erro em ações corretivas e apoia o diagnóstico dos registros de produção. Previsto para H2/2026 no material.', 15],
  ['Análise de Ordem de Produção no CRP', 'Manufatura', ['Protheus'], 'Explica as decisões do cálculo de alocação de uma ordem de produção com base em seu histórico de processamento. Previsto para H2/2026.', 15],
  ['Retorno de Industrialização', 'Manufatura Moda', [], 'Interpreta notas fiscais e concilia o retorno da produção terceirizada com remessas, produção, fiscal e estoque.', 16],
  ['Sequenciamento de Produção', 'Manufatura Moda', [], 'Analisa capacidade, ordens e restrições da fábrica para recomendar cenários de sequenciamento da produção.', 16],
  ['Enriquecimento de Cadastro de Produto', 'Manufatura Moda', [], 'Interpreta, classifica e valida informações de produtos para estruturar cadastros mais consistentes no ERP.', 17],
  ['Auditor de estoque', 'BO Datasul', ['Datasul'], 'Monitora movimentos e tendências do estoque e gera solicitações de transferência e compras.', 18],
  ['Auditor de documentos eletrônicos', 'BO Datasul', ['Datasul'], 'Monitora retornos da SEFAZ e sugere correções de notas, cadastros ou reprocessamento.', 18],
  ['Agente de Processos', 'Fluig', ['Fluig'], 'Interpreta linguagem natural e documentos para preencher formulários e abrir solicitações no Fluig.', 19],
  ['Agente de Documentos', 'Fluig', ['Fluig'], 'Analisa, resume e classifica documentos, organiza informações e facilita consultas ao conhecimento corporativo.', 19],
  ['Auditoria de Folha de Pagamento', 'RH', [], 'Identifica discrepâncias e anomalias nos cálculos da folha antes do fechamento mensal.', 20],
  ['Encargos de Folha de Pagamento', 'RH', [], 'Cruza informações da folha e do governo e orienta a correção de divergências de encargos trabalhistas.', 20, 'Em discovery'],
  ['Validador de documentos de reembolso', 'Saúde', [], 'Valida documentos de reembolso e realiza o preenchimento de dados da solicitação.', 21],
  ['Auditor de reembolsos', 'Saúde', [], 'Analisa a consistência dos reembolsos e sinaliza suspeitas de fraude ou solicitações fora da cobertura.', 21],
  ['Inclusão de beneficiário', 'Saúde', [], 'Valida a documentação exigida, sinaliza pendências e prepara informações para o cadastro do beneficiário.', 22],
  ['Auditor de guias', 'Saúde', [], 'Cruza critérios clínicos, contratuais e históricos para emitir um parecer preliminar à validação do auditor médico.', 22],
  ['Multicultivo · Auditor do campo', 'Agro', [], 'Analisa dados agrícolas e identifica desvios nos apontamentos e insumos para melhorar a qualidade da informação.', 23],
  ['Multicultivo · Fechamento Ágil de Custos', 'Agro', [], 'Automatiza etapas do fechamento de custos agrícolas, identificando inconsistências e sugerindo ações.', 23],
  ['Atendimentos ao Cliente', 'Construção', ['RM'], 'Classifica e direciona atendimentos, resume o histórico e sugere respostas ao atendente com base no conhecimento disponível.', 24],
];

const specialistRows: [string, string, string, boolean?][] = [
  ['Classificação de Notas', 'Fiscal', 'Realiza a classificação fiscal e valida os dados da nota no ERP.'],
  ['Validador de Títulos', 'Contas a pagar', 'Valida títulos a pagar antes da liquidação, com conferência padronizada e rastreável.'],
  ['Borderô e Remessa', 'Contas a pagar', 'Automatiza a criação de borderôs e a geração de remessas de pagamento.'],
  ['Retorno Bancário · Contas a pagar', 'Contas a pagar', 'Lê e trata o retorno bancário para atualizar as informações de pagamento.'],
  ['Agente de Fatura', 'Contas a receber', 'Automatiza a análise e o tratamento de faturas para reduzir atividades repetitivas.'],
  ['Boleto e Remessa', 'Contas a receber', 'Automatiza a emissão de boletos e a geração de remessas.'],
  ['Retorno Bancário · Contas a receber', 'Contas a receber', 'Processa o retorno bancário para conciliar informações e atualizar registros.'],
  ['Compras Spot', 'Compras', 'Realiza cotações e agiliza a seleção de fornecedores no processo de compras spot.', true],
  ['Conciliação Bancária', 'Financeiro', 'Compara lançamentos de contas a pagar e a receber e identifica divergências bancárias.', true],
  ['Férias', 'RH', 'Identifica riscos e pendências e sugere períodos de férias considerando o impacto operacional.', true],
];

export const agents: Agent[] = [
  ...productRows.map(([name, segment, products, description, page, status], i): Agent => ({
    id: `standard-${i + 1}`, name, segment, products, description, page,
    family: 'standard', status: status ?? 'Em desenvolvimento',
  })),
  ...specialistRows.map(([name, segment, description, developing], i): Agent => ({
    id: `specialist-${i + 1}`, name, segment, products: ['Protheus', 'RM', 'Datasul'], description, page: 1,
    family: 'specialists', status: developing ? 'Em desenvolvimento' : 'Disponibilidade a confirmar',
  })),
  { id: 'image-reader', name: 'Leitura de Imagens', segment: 'Análise de conteúdo', products: [], family: 'assistants', status: 'Disponível no material', page: 5, description: 'Recebe imagens, descreve e analisa seu conteúdo e gera resultados conforme as diretrizes do cliente.' },
  { id: 'document-reader', name: 'Leitura de Documentos', segment: 'Análise de conteúdo', products: [], family: 'assistants', status: 'Disponível no material', page: 5, description: 'Recebe documentos, lê e valida os dados e produz uma análise orientada às necessidades do cliente.' },
];

export const getPortfolioItem = (id: PortfolioId) => portfolio.find(item => item.id === id)!;
export const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function commercialModelFor(item: PortfolioItem, vision: Vision): CommercialModel {
  // Garden stays undecided in both perspectives. OES migration is hypothetical.
  if (item.commercialModel === 'undecided') return 'undecided';
  if (item.oes && vision === 'future') return 'tcoin';
  return item.commercialModel;
}

export function portfolioNature(item: PortfolioItem, vision: Vision): PortfolioNature {
  return commercialModelFor(item, vision) === 'own' ? 'offer' : 'product';
}

export function classificationLabel(item: PortfolioItem, vision: Vision) {
  if (portfolioNature(item, vision) === 'offer') return 'Oferta OES';
  if (item.oes && vision === 'future') return 'Produto de IA · cenário futuro';
  return 'Produto de IA';
}

export function commercialLabel(item: PortfolioItem, vision: Vision) {
  if (item.commercialModel === 'undecided') return 'Modelo a definir';
  if (item.oes) return vision === 'current' ? 'Contratação própria' : 'T-Coins · convergência prevista';
  if (item.id === 'partners') return 'Consumo de T-Coins previsto';
  return 'Consome T-Coins';
}

export function constructionLabel(item: PortfolioItem, vision: Vision) {
  if (item.foundationRelation === 'proxy') return vision === 'current' ? 'Independente · usa LYNN Proxy' : 'Convergência ao Foundation a definir';
  return 'Foundation LYNN';
}

export function compositionCounts(ids: PortfolioId[], vision: Vision) {
  const items = portfolio.filter(item => ids.includes(item.id));
  return {
    total: items.length,
    tcoin: items.filter(item => commercialModelFor(item, vision) === 'tcoin').length,
    own: items.filter(item => commercialModelFor(item, vision) === 'own').length,
    undecided: items.filter(item => commercialModelFor(item, vision) === 'undecided').length,
  };
}

export { foundationPillars as foundations } from './foundation';
