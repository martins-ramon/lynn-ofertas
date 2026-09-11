import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Layers3, Store, Wallet, Zap } from 'lucide-react';
import { agents, classificationLabel, commercialLabel, compositionCounts, constructionLabel, getPortfolioItem, portfolio, type Agent, type PortfolioId, type PortfolioItem, type Vision } from '../data/catalog';
import { Coin, ModelBadge, PortfolioIcon } from './Shared';
import GardenDetails from './GardenDetails';

export type Detail = { kind: 'portfolio'; item: PortfolioItem } | { kind: 'agent'; agent: Agent } | { kind: 'contract' | 'store' | 'wallet' | 'sources' };

export default function PortfolioDetails({ detail, vision, onPortfolio, onAgent, onWallet }: { detail: Detail; vision: Vision; onPortfolio: (item: PortfolioItem) => void; onAgent: (agent: Agent) => void; onWallet: () => void }) {
  if (detail.kind === 'portfolio') return <ItemDetails item={detail.item} vision={vision} onAgent={onAgent} />;
  if (detail.kind === 'agent') return <AgentDetails agent={detail.agent} vision={vision} onPortfolio={onPortfolio} />;
  if (detail.kind === 'store') return <StoreDetails vision={vision} />;
  if (detail.kind === 'sources') return <Sources />;
  if (detail.kind === 'wallet') return <>
    <span className="detail-hero-icon accent-mint"><Wallet size={30} /></span><span className="eyebrow">ACOMPANHAR O CONSUMO DA OFERTA T-COINS</span><h2 id="detail-title">Uma carteira.<br />Toda a sua história de uso.</h2>
    <p className="modal-lead">A wallet reúne os créditos contratados e os débitos gerados pelos produtos de IA vinculados à oferta T-Coins. O cliente contrata a oferta e utiliza os produtos; a carteira mostra esse consumo.</p>
    <ul className="detail-list"><li>Saldo de créditos e validade de cada entrada.</li><li>Consumo identificado por produto de IA e sua métrica.</li><li>Alertas de consumo e mudanças de faixa.</li><li>Novos créditos se somam ao saldo ainda válido. Validade de 180 dias por entrada.</li></ul>
    <div className="detail-callout"><strong>A cobrança é independente do Foundation.</strong><p>Outras soluções podem, futuramente, integrar o consumo de T-Coins diretamente pela cobrança. Isso não implica construção sobre LYNN. OES tem ofertas próprias hoje; o modelo comercial do Garden está em discussão.</p></div>
    <button className="button primary" onClick={onWallet}>Vivencie um ciclo de consumo<ArrowRight size={17} /></button>
    <div className="source-note">Experiência conceitual. Reunião de 09/09/2026, 00:47:56–00:48:58, e definição comercial atualizada pelo projeto. O extrato visual foi descrito como em desenvolvimento.</div>
  </>;
  return <>
    <Coin /><span className="eyebrow">OFERTA COMERCIAL · T-COINS</span><h2 id="detail-title">Você contrata T-Coins.<br />Os produtos entregam valor.</h2>
    <p className="modal-lead">T-Coins são o objeto da oferta comercial. A contratação é estruturada pela assinatura Start, com acesso e franquia inicial, e por eventual pacote de expansão. Agentes Padrão e produtos de parceiros dão razões concretas para contratar e consumir essa oferta.</p>
    <div className="contract-formula"><div><span>01</span><strong>Assinatura Start</strong><small>Recorrência fixa + franquia</small></div><span>+</span><div><span>02 · QUANDO NECESSÁRIO</span><strong>Pacote de expansão</strong><small>Uma faixa recorrente de créditos</small></div></div>
    <div className="detail-callout"><strong>TaaS · trabalho executado como serviço</strong><p>Os produtos de IA executam tarefas nos processos de gestão. A volumetria e a métrica de cada produto orientam o consumo dos T-Coins contratados. Resultado de trabalho executado não significa garantia de retorno financeiro.</p></div>
    <ul className="detail-list"><li>A contratação da Start é expressa. É possível começar somente com ela ou escolher um pacote de expansão.</li><li>Ao ultrapassar uma faixa, ocorre troca automática para a próxima. A faixa atingida passa a ser a recorrência.</li><li>Os pacotes se substituem na cobrança; não são somados. Excedente unitário só entra depois da última faixa.</li><li>Créditos são disponibilizados antes da cobrança. O corte define a faixa para faturamento posterior, sem pró-rata no modelo descrito.</li></ul>
    <div className="detail-callout lavender-callout"><strong>As outras ofertas efetivas são as de OES.</strong><p>Especialistas, Personalizados e Assistentes de OES utilizam contratação própria hoje. Já são construídos sobre LYNN. Sua convergência ao consumo de T-Coins é uma hipótese futura; Garden permanece com modelo a definir.</p></div>
    <button className="button primary" onClick={onWallet}>Entenda pela wallet<ArrowRight size={17} /></button><div className="source-note">Estratégia TOTVS de IA, seção 3.3; reunião de 09/09/2026, 00:00:00–00:33:10; esclarecimento canônico de oferta e produto. Quantidades e preços ainda a definir.</div>
  </>;
}

function ItemDetails({ item, vision, onAgent }: { item: PortfolioItem; vision: Vision; onAgent: (agent: Agent) => void }) {
  const related = agents.filter(agent => agent.family === item.id);
  return <>
    <span className={`detail-hero-icon accent-${item.accent}`}><PortfolioIcon id={item.id} size={32} /></span><span className="eyebrow">{classificationLabel(item, vision)} · {item.owner}</span><h2 id="detail-title">{item.name}</h2><p className="detail-tagline">{item.tagline}</p><p className="modal-lead">{item.description}</p>
    <div className="detail-facts"><div><span className="micro">RELAÇÃO COM O FOUNDATION</span><strong><Layers3 size={16} />{constructionLabel(item, vision)}</strong></div><div><span className="micro">{vision === 'current' ? 'MODELO COMERCIAL ATUAL / PREVISTO' : 'HIPÓTESE DE EVOLUÇÃO'}</span><strong>{commercialLabel(item, vision)}</strong></div></div>
    {item.oes && vision === 'future' && <div className="detail-callout"><strong>Como ler este cenário</strong><p>Hoje, esta é uma oferta OES com contratação própria. Na hipótese de substituir essa contratação pela oferta T-Coins, o agente passa a ser apresentado como produto de IA vinculado a ela. Esse enquadramento comercial não está concluído.</p></div>}
    <h3>Para quem faz a diferença</h3><p>{item.audience}</p><ul className="detail-list">{item.highlights.map(text => <li key={text}>{text}</li>)}</ul>
    {item.id === 'garden' && <GardenDetails />}
    {item.id === 'custom' && <div className="detail-case"><span className="micro">EXEMPLO DO MATERIAL · LATICÍNIO AVIAÇÃO</span><h3>Processos próprios, agentes sob medida.</h3><p>O caso reúne sete agentes para rotinas financeiras e de frete no Protheus, como geração de romaneio, conciliação bancária, contas a pagar e a receber.</p><div><strong>7<span>agentes no caso</span></strong><strong>48%<span>ROI reportado no material</span></strong></div><small>Resultado do caso apresentado; não representa uma promessa de retorno para outras operações.</small></div>}
    {item.id === 'assistants' && <div className="detail-case"><span className="micro">EXEMPLO DO MATERIAL · CAGECE</span><h3>Evidências que apoiam a decisão.</h3><p>O caso de agente auditor avalia decisões de uma equipe com base em fotos e relatórios. O material reporta 80% de assertividade no piloto, específica daquele contexto.</p></div>}
    {related.length > 0 && <><div className="related-heading"><h3>Conheça os exemplos</h3><span>{related.length} no material</span></div><div className="related-agents">{related.map(agent => <button key={agent.id} onClick={() => onAgent(agent)}><span><strong>{agent.name}</strong><small>{agent.segment} · {agent.status}</small></span><ArrowUpRight size={16} /></button>)}</div></>}
    <div className="detail-callout"><strong>Oferta é o que pode ser comercializado.</strong><p>Hoje, T-Coins e as soluções OES com modelo próprio são ofertas. Agentes Padrão e parceiros são produtos de IA vinculados à oferta T-Coins. Garden tem modelo a definir. Foundation é a base de construção, não uma oferta comercial.</p></div><div className="source-note">Fonte: {item.source}</div>
  </>;
}

function AgentDetails({ agent, vision, onPortfolio }: { agent: Agent; vision: Vision; onPortfolio: (item: PortfolioItem) => void }) {
  const item = getPortfolioItem(agent.family);
  return <>
    <button className="back-link" onClick={() => onPortfolio(item)}><ArrowLeft size={15} />{item.name}</button><span className={`detail-hero-icon accent-${item.accent}`}><PortfolioIcon id={agent.family} size={32} /></span><span className="eyebrow">{classificationLabel(item, vision)} · {agent.segment}</span><h2 id="detail-title">{agent.name}</h2><span className="agent-detail-status"><span className="tiny-dot" />{agent.status}</span><p className="modal-lead">{agent.description}</p>
    <div className="detail-facts"><div><span className="micro">QUEM DESENVOLVE</span><strong>{agent.family === 'standard' ? 'Time de Produtos' : 'OES · Ofertas e Serviços / IDeIA'}</strong></div><div><span className="micro">MODELO COMERCIAL</span><strong>{commercialLabel(item, vision)}</strong></div></div>
    {agent.products.length > 0 && <><h3>Sistemas citados no material</h3><div className="tags">{agent.products.map(product => <span key={product}>{product}</span>)}</div></>}
    <div className="detail-callout"><strong>Como este exemplo se encaixa?</strong><p>Integra a família {item.name}, na camada de Ofertas e Produtos de IA. {item.oes ? 'Hoje, faz parte das ofertas OES com contratação própria e construção sobre LYNN. No cenário de convergência, passa a produto de IA vinculado à oferta T-Coins.' : 'É um produto de IA, não uma oferta vendida separadamente. A oferta contratada é T-Coins; o agente entrega a capacidade que motiva sua contratação e consumo, conforme integração e disponibilização.'}</p></div>
    {agent.products.includes('Equals') && <div className="detail-callout"><strong>Integração em discussão</strong><p>A reunião cita adequações de agentes Equals ao ecossistema. Sua presença no inventário não confirma migração concluída. Uma solução externa pode ter integração à cobrança distinta de sua construção sobre LYNN.</p></div>}
    <p className="fine-print">{agent.status === 'Disponível no material' ? 'Disponibilidade informada no documento de referência; não implica disponibilidade no Store ou integração a T-Coins.' : 'O inventário descreve produtos e ofertas em evolução, não confirma disponibilidade para ativação no Store.'}</p><div className="source-note">Fonte: {agent.family === 'standard' ? 'Agentes de IA — Segmentos, Fase 1 + Fase 2, agosto/2026' : 'Agentes Especialistas e Personalizados'}, página {agent.page}. Classificação comercial conforme esclarecimentos do projeto.</div>
  </>;
}

function StoreDetails({ vision }: { vision: Vision }) {
  const [selected, setSelected] = useState<PortfolioId[]>([]);
  const counts = compositionCounts(selected, vision);
  return <>
    <span className="detail-hero-icon accent-cyan"><Store size={32} /></span><span className="eyebrow">DESCOBRIR PRODUTOS · STORE EM CONSTRUÇÃO</span><h2 id="detail-title">Contrate a oferta.<br />Escolha os produtos de IA.</h2><p className="modal-lead">O Store será o ponto de descoberta e ativação dos produtos vinculados à oferta T-Coins. As ofertas OES são contratadas no seu modelo próprio hoje. Experimente compor uma operação com as diferentes famílias.</p>
    <div className="store-lab"><div className="store-lab-heading"><Zap size={15} /><span>Laboratório de composição · {vision === 'current' ? 'modelo atual' : 'hipótese de evolução'}</span></div><p>Seleções ilustrativas, sem contratação nem ativação reais. OES e Garden aparecem como contexto da composição; isso não confirma sua presença no Store. Garden não é somado ao consumo de T-Coins em nenhuma perspectiva.</p>
      {portfolio.map(item => <div className={`store-choice accent-${item.accent}`} key={item.id}><span className="offer-icon"><PortfolioIcon id={item.id} size={18} /></span><div><strong>{item.name}</strong><small className="classification-label">{classificationLabel(item, vision)}</small><ModelBadge item={item} vision={vision} /></div><button role="switch" aria-checked={selected.includes(item.id)} aria-label={`${selected.includes(item.id) ? 'Remover' : 'Incluir'} exemplo ${item.name}`} className={`toggle-switch ${selected.includes(item.id) ? 'on' : ''}`} onClick={() => setSelected(selected.includes(item.id) ? selected.filter(id => id !== item.id) : [...selected, item.id])}><span /></button></div>)}
      <div className="store-lab-summary" role="status"><div><strong>{counts.total}</strong><span>itens selecionados</span></div><div><strong>{counts.tcoin}</strong><span>produtos T-Coins{vision === 'future' ? ' no cenário' : ''}</span></div><div><strong>{counts.own}</strong><span>ofertas próprias</span></div><div><strong>{counts.undecided}</strong><span>modelo a definir</span></div></div><div className="activation-notice"><CheckCircle2 size={16} /><span>Selecionar uma família não gera débito. O consumo depende do uso dos produtos habilitados e de sua métrica.</span></div>
    </div><div className="source-note">Briefing, contexto Garden e reunião de 09/09/2026. Laboratório didático de composição de Ofertas e Produtos de IA; não é uma tela oficial do Store.</div>
  </>;
}

function Sources() {
  const references = [
    { label: '01 · DEFINIÇÃO CANÔNICA', title: 'Oferta e produto têm papéis distintos', text: 'Oferta é aquilo que pode ser comercializado. Hoje, as ofertas efetivas são T-Coins e as soluções OES com modelo próprio. Agentes Padrão e parceiros são produtos de IA que dão valor à contratação e ao consumo de T-Coins. Garden é produto com comercialização a definir. A camada intermediária se chama Ofertas e Produtos de IA.' },
    { label: '02 · ESTRATÉGIA TOTVS DE IA', title: 'Escalar, governar e extrair retorno', text: 'Documento TOTVS IA — Estratégia LYNN Foundation. Seções 3.1–3.3: T-Cloud, APIs, dados e sistemas; Agent Builder, Enterprise Layer, Governance, metadados e TaaS. Nomenclatura comercial interpretada conforme o esclarecimento canônico do projeto.' },
    { label: '03 · PRODUTOS PADRÃO', title: 'Agentes de IA — Segmentos', text: 'Fase 1 + Fase 2 · agosto/2026. 43 Agentes Padrão em 16 segmentos e linhas, páginas 2–24. Cada exemplo preserva o estágio informado no material.' },
    { label: '04 · OFERTAS OES', title: 'Especialistas, Personalizados e Assistentes', text: 'Material de seis páginas com 10 especialistas, jornada dos personalizados, dois assistentes e casos. OES já constrói sobre LYNN, tem contratação própria hoje e poderá convergir ao consumo de T-Coins.' },
    { label: '05 · MODELO COMERCIAL', title: 'Reunião de 09/09/2026', text: 'Start, faixas e consumo: 00:00:00–00:33:10. Expansão do ecossistema e independência da cobrança: 00:34:19–00:51:52. T-Coins são a oferta; a métrica de cada produto orienta seu consumo.' },
    { label: '06 · LYNN GARDEN', title: 'Protótipo independente, convergência em discussão', text: 'lynn_garden.md e quatro capturas: conexões, criação, agentes do usuário e chat. Projeto independente com OpenAI Agents SDK e uso de LYNN Proxy para acesso aos modelos. Não se afirma construção sobre o Foundation completo. Comercialização em T-Coins ou modelo próprio ainda a definir.' },
    { label: '07 · MARCAS E TELAS DO FOUNDATION', title: 'A plataforma em imagens', text: 'Logos oficiais fornecidos e sete capturas do Foundation: administração de agentes e projetos; Agent Builder em diagrama, instruções e manifesto; Enterprise Layer em conversa e tarefas. Administração da plataforma e cobrança na wallet têm responsabilidades distintas.' },
  ];
  return <><span className="eyebrow">CONTEXTO E REFERÊNCIAS</span><h2 id="detail-title">Uma visão conectada<br />aos materiais do projeto.</h2><p className="modal-lead">Estratégia de IA, ofertas comercializáveis, produtos, telas da plataforma e dinâmica de consumo se complementam para explicar o ecossistema.</p><div className="source-cards">{references.map(item => <div key={item.label}><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div><div className="detail-callout"><strong>Definições em evolução</strong><p>Comercialização e convergência do Garden; preços, faixas, métricas finais, alertas, calendário, redução e cancelamento; integração de soluções externas e condições de parceria. Simulações são didáticas e não constituem proposta comercial.</p></div><p className="fine-print">Imagens otimizadas das telas e marcas fornecidas. PDFs, textos e transcrições originais não são distribuídos. A disponibilidade indicada em uma referência não confirma disponibilidade atual no Store.</p></>;
}
