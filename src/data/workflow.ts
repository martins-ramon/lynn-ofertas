export type WorkflowId = 'agents' | 'enterprise' | 'garden';
export type WorkflowRowId = 'offer' | 'category' | 'value' | 'sam' | 'audience' | 'attributes' | 'competitors' | 'gtm' | 'commercial';
export const workflowRows: { id: WorkflowRowId; label: string }[] = [
  { id: 'offer', label: 'Oferta' },
  { id: 'category', label: 'Categoria' }, { id: 'value', label: 'Proposta de valor' },
  { id: 'sam', label: 'SAM / SOM' }, { id: 'audience', label: 'Mercado / persona / decisor' },
  { id: 'attributes', label: 'Atributos e diferenciais' }, { id: 'competitors', label: 'Competidores' },
  { id: 'gtm', label: 'GTM · Q1 2027' }, { id: 'commercial', label: 'Modelo comercial' },
];
export interface WorkflowOffer {
  id: WorkflowId; name: string; group: string; accent: string; commercialSummary: string;
  cells: Record<WorkflowRowId, string[]>;
}
// Canonical source: the legible, typed workflow-redesign.png supplied alongside
// the whiteboard photo. Questions in that source remain questions, not promises.
export const workflowOffers: WorkflowOffer[] = [
  {
    id: 'agents', name: 'Agentes TOTVS', group: 'Agentes', accent: 'cyan',
    commercialSummary: 'OES: subscrição por franquia · Agent Store: T-Coins',
    cells: {
      offer: ['Agentes OES + agentes de segmentos + franquias / parceiros'],
      category: ['Automação para ganho de produtividade'],
      value: ['Redução do TCO sobre produtos TOTVS.'],
      sam: ['SAM: R$ 6,7 bi', 'SOM: 15% → R$ 1,0 bi'],
      audience: ['SMB', 'Operador de software', 'CTO (CFO)'],
      attributes: [
        'Não libera API de modelo do próprio cliente.',
        'Nativo: atualização automática a cada release de produto (≠ RPA).',
        'Governança TOTVS de ponta a ponta.',
        'Flexibilidade de implantar agentes personalizados.',
        'Roda integrado ao legado TOTVS (plug & play).',
        'Só paga proporcional ao uso (TaaS).',
      ],
      competitors: ['Robôs · Agentes prontos · Systock'],
      gtm: [
        'Pré-requisito: precificação e repasse para franquias.',
        'Pré-requisito: organizar a área de CS e homologação de agentes.',
        'Pré-requisito: organizar atendimento N1 e N2.',
        'Desejável: para franquias, enquanto não houver catálogo de tools, usar AI Orchestration.',
      ],
      commercial: [
        'OES: subscrição fixa por franquia de requisições + implantação → cobrança adicional de excedente.',
        'Agent Store: pacote de T-Coins → consumo de requisições.',
      ],
    },
  },
  {
    id: 'enterprise', name: 'LYNN Enterprise', group: 'Plataformas', accent: 'lavender',
    commercialSummary: 'Por usuário + franquia mínima de requisições',
    cells: {
      offer: ['Plataformas'],
      category: ['Agent Engineering'],
      value: ['O melhor sistema de agentes para o ecossistema TOTVS.'],
      sam: ['Percentual dos R$ 6,7 bi indicados no BP.'],
      audience: ['Mid / High', 'Engenheiros', 'CTO (CIO)'],
      attributes: [
        'Em discussão: liberar API de modelo próprio do cliente? Possibilidade futura de tokens em T-Cloud; competidores liberam, como n8n.',
        'Acesso aos MCPs / APIs TOTVS (exclusivo?).',
        'Agnóstico de modelo.',
        'IA + Data.',
        'Layer nativo.',
        'UI: “vídeo do Foundation”.',
        'Conectores diversos, além de TOTVS.',
      ],
      competitors: ['RPA · LangChain · n8n · Azure · Databricks / Snowflake · Make · Getdemo'],
      gtm: [
        'Pré-requisito: catálogo de tools (MCPs) da TOTVS.',
        'Pré-requisito: precificação e cobrança para franquias.',
        'Pré-requisito: organizar a área de Customer Success e atendimento N1 / N2.',
        'Pré-requisito: organizar time de produto dedicado.',
        'Desejável: governança de inferência e de Data Residency.',
      ],
      commercial: ['Subscrição por usuário + franquia recorrente mínima de requisições.'],
    },
  },
  {
    id: 'garden', name: 'LYNN Garden', group: 'Plataformas', accent: 'mint',
    commercialSummary: 'Franquia mínima recorrente por usuário',
    cells: {
      offer: ['Plataformas'],
      category: ['AI Orchestration'],
      value: ['A melhor IA governada para uso corporativo.'],
      sam: ['Percentual dos R$ 6,7 bi indicados no BP.'],
      audience: ['SMB', 'Usuário não técnico', 'CTO (CFO) + sponsors de negócio'],
      attributes: [
        'Em discussão: liberar API de modelo próprio do cliente? Possibilidade futura de tokens em T-Cloud; alguns competidores não liberam, como Cowork e Work.',
        'Acesso aos MCPs / APIs TOTVS (exclusivo?).',
        'Distribuição TOTVS.',
        'Agnóstico de modelo.',
        'Conectores diversos também.',
        'Granularidade de controles de governança e guardrails.',
        'Layer habilitável.',
      ],
      competitors: ['Digibee · Work · Cowork · Genspark · Make · Workflow Studio · SalesBud · UpFlux'],
      gtm: [
        'Pré-requisito: catálogo de conectores de mercado.',
        'Pré-requisito: instanciamento por tenant de cliente.',
        'Pré-requisito: área de Customer Success e atendimento N1 e N2.',
        'Pré-requisito: precificação e cobrança de franquias.',
        'Pré-requisito: organizar time de produto dedicado.',
        'Desejável: catálogo de tools (MCPs) da TOTVS, governança de inferência e guardrails.',
      ],
      commercial: ['Franquia mínima recorrente por usuário.'],
    },
  },
];
