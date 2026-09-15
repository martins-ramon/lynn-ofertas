import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Layers3, Store, Wallet, Zap } from 'lucide-react';
import { agents, classificationLabel, commercialLabel, constructionLabel, getPortfolioItem, portfolio, type Agent, type PortfolioId, type PortfolioItem } from '../data/catalog';
import { Coin, ModelBadge, PortfolioIcon } from './Shared';
import GardenDetails from './GardenDetails';
import { workflowOffers, workflowRows } from '../data/workflow';

export type Detail = { kind: 'portfolio'; item: PortfolioItem } | { kind: 'agent'; agent: Agent } | { kind: 'contract' | 'store' | 'wallet' | 'sources' };

export default function PortfolioDetails({ detail, onPortfolio, onAgent, onWallet }: { detail: Detail; onPortfolio: (item: PortfolioItem) => void; onAgent: (agent: Agent) => void; onWallet: () => void }) {
  if (detail.kind === 'portfolio') return <ItemDetails item={detail.item} onAgent={onAgent} onPortfolio={onPortfolio} />;
  if (detail.kind === 'agent') return <AgentDetails agent={detail.agent} onPortfolio={onPortfolio} />;
  if (detail.kind === 'store') return <StoreDetails />;
  if (detail.kind === 'sources') return <Sources />;
  if (detail.kind === 'wallet') return <>
    <span className="detail-hero-icon accent-mint"><Wallet size={30} /></span><span className="eyebrow">ACOMPANHAR O CONSUMO DA OFERTA T-COINS</span><h2 id="detail-title">Uma carteira.<br />Toda a sua história de uso.</h2>
    <p className="modal-lead">A wallet reúne os créditos de T-Coins e os débitos gerados pelo uso dos produtos de IA. Na matriz, Agentes TOTVS tem contratação OES por franquia de requisições e consumo via pacotes de T-Coins no Agent Store.</p>
    <ul className="detail-list"><li>Saldo de créditos e validade de cada entrada.</li><li>Consumo identificado por produto de IA e sua métrica.</li><li>Alertas de consumo e mudanças de faixa.</li><li>Novos créditos se somam ao saldo ainda válido. Validade de 180 dias por entrada.</li></ul>
    <div className="detail-callout"><strong>Uma wallet, modelos comerciais por oferta.</strong><p>A wallet de T-Coins atravessa a matriz Workflow Redesign. Cada oferta tem sua proposta e seu modelo comercial; a demonstração abaixo explica somente um ciclo de consumo de agentes.</p></div>
    <button className="button primary" onClick={onWallet}>Vivencie um ciclo de consumo<ArrowRight size={17} /></button>
    <div className="source-note">Experiência conceitual. Reunião de 09/09/2026, 00:47:56–00:48:58, e definição comercial atualizada pelo projeto. O extrato visual foi descrito como em desenvolvimento.</div>
  </>;
  return <>
    <Coin /><span className="eyebrow">WALLET · T-COINS</span><h2 id="detail-title">Créditos para consumir.<br />Agentes para gerar valor.</h2>
    <p className="modal-lead">T-Coins são os créditos de consumo da wallet. A contratação é estruturada pela assinatura Start, com acesso e franquia inicial, e por eventual pacote de expansão. No Workflow Redesign, a oferta Agentes TOTVS organiza as automações de Produtos, OES e franquias. O ciclo Start e expansão abaixo é uma referência didática de consumo.</p>
    <div className="contract-formula"><div><span>01</span><strong>Assinatura Start</strong><small>Recorrência fixa + franquia</small></div><span>+</span><div><span>02 · QUANDO NECESSÁRIO</span><strong>Pacote de expansão</strong><small>Uma faixa recorrente de créditos</small></div></div>
    <div className="detail-callout"><strong>TaaS · trabalho executado como serviço</strong><p>Os produtos de IA executam tarefas nos processos de gestão. A volumetria e a métrica de cada produto orientam o consumo dos T-Coins contratados. Resultado de trabalho executado não significa garantia de retorno financeiro.</p></div>
    <ul className="detail-list"><li>A contratação da Start é expressa. É possível começar somente com ela ou escolher um pacote de expansão.</li><li>Ao ultrapassar uma faixa, ocorre troca automática para a próxima. A faixa atingida passa a ser a recorrência.</li><li>Os pacotes se substituem na cobrança; não são somados. Excedente unitário só entra depois da última faixa.</li><li>Créditos são disponibilizados antes da cobrança. O corte define a faixa para faturamento posterior, sem pró-rata no modelo descrito.</li></ul>
    <div className="detail-callout lavender-callout"><strong>Contratação por oferta e canal.</strong><p>Em Agentes TOTVS, OES combina subscrição por franquia, implantação e excedente; o Agent Store trabalha com pacotes de T-Coins. LYNN Enterprise combina subscrição por usuário e franquia mínima de requisições. LYNN Garden tem franquia mínima recorrente por usuário.</p></div>
    <button className="button primary" onClick={onWallet}>Entenda pela wallet<ArrowRight size={17} /></button><div className="source-note">Estratégia TOTVS de IA, seção 3.3; reunião de 09/09/2026, 00:00:00–00:33:10; Workflow Redesign como referência de posicionamento. Quantidades e preços ainda a definir.</div>
  </>;
}

function ItemDetails({ item, onAgent, onPortfolio }: { item: PortfolioItem; onAgent: (agent: Agent) => void; onPortfolio: (item: PortfolioItem) => void }) {
  const related = agents.filter(agent => agent.family === item.id);
  const workflow = workflowOffers.find(offer => offer.id === item.id);
  return <>
    <span className={`detail-hero-icon accent-${item.accent}`}><PortfolioIcon id={item.id} size={32} /></span><span className="eyebrow">{classificationLabel(item)} · {item.owner}</span><h2 id="detail-title">{item.name}</h2><p className="detail-tagline">{item.tagline}</p><p className="modal-lead">{item.description}</p>
    <div className="detail-facts"><div><span className="micro">RELAÇÃO COM O FOUNDATION</span><strong><Layers3 size={16} />{constructionLabel(item)}</strong></div><div><span className="micro">MODELO COMERCIAL · WORKFLOW REDESIGN</span><strong>{commercialLabel(item)}</strong></div></div>
    <h3>Para quem faz a diferença</h3><p>{item.audience}</p><ul className="detail-list">{item.highlights.map(text => <li key={text}>{text}</li>)}</ul>
    {workflow && <div className="source-cards">{workflowRows.filter(row => ['sam', 'competitors', 'gtm', 'commercial'].includes(row.id)).map(row => <div key={row.id}><h3>{row.label}</h3><ul className="detail-list">{workflow.cells[row.id].map(text => <li key={text}>{text}</li>)}</ul></div>)}</div>}
    {item.id === 'agents' && <div className="detail-callout"><strong>Produtos, OES e franquias</strong><p>Agentes Padrão, Especialistas, Personalizados e Assistentes compõem a oferta Agentes TOTVS. Os exemplos abaixo do site preservam as famílias e a origem de cada material.</p></div>}
    {item.id === 'agents' && <div className="related-agents">{portfolio.filter(family => !['agents', 'enterprise', 'garden'].includes(family.id)).map(family => <button key={family.id} onClick={() => onPortfolio(family)}><span><strong>{family.name}</strong><small>{family.owner}</small></span><ArrowUpRight size={16} /></button>)}</div>}
    {item.id === 'enterprise' && <div className="detail-callout"><strong>Plataforma para engenharia de agentes</strong><p>LYNN Enterprise é o label da oferta de Agent Engineering. A Enterprise Layer é um dos pilares do Foundation que a sustenta, junto de Builder e Governance.</p></div>}
    {item.id === 'garden' && <GardenDetails />}
    {item.id === 'custom' && <div className="detail-case"><span className="micro">EXEMPLO DO MATERIAL · LATICÍNIO AVIAÇÃO</span><h3>Processos próprios, agentes sob medida.</h3><p>O caso reúne sete agentes para rotinas financeiras e de frete no Protheus, como geração de romaneio, conciliação bancária, contas a pagar e a receber.</p><div><strong>7<span>agentes no caso</span></strong><strong>48%<span>ROI reportado no material</span></strong></div><small>Resultado do caso apresentado; não representa uma promessa de retorno para outras operações.</small></div>}
    {item.id === 'assistants' && <div className="detail-case"><span className="micro">EXEMPLO DO MATERIAL · CAGECE</span><h3>Evidências que apoiam a decisão.</h3><p>O caso de agente auditor avalia decisões de uma equipe com base em fotos e relatórios. O material reporta 80% de assertividade no piloto, específica daquele contexto.</p></div>}
    {related.length > 0 && <><div className="related-heading"><h3>Conheça os exemplos</h3><span>{related.length} no material</span></div><div className="related-agents">{related.map(agent => <button key={agent.id} onClick={() => onAgent(agent)}><span><strong>{agent.name}</strong><small>{agent.segment} · {agent.status}</small></span><ArrowUpRight size={16} /></button>)}</div></>}
    <div className="detail-callout"><strong>Agentes e plataformas com uma base comum.</strong><p>Agentes TOTVS, LYNN Enterprise e LYNN Garden são as três ofertas do Workflow Redesign. Builder, Governance e Layer formam o Foundation que sustenta todas elas.</p></div><div className="source-note">Fonte: {item.source}</div>
  </>;
}

function AgentDetails({ agent, onPortfolio }: { agent: Agent; onPortfolio: (item: PortfolioItem) => void }) {
  const item = getPortfolioItem(agent.family);
  return <>
    <button className="back-link" onClick={() => onPortfolio(item)}><ArrowLeft size={15} />{item.name}</button><span className={`detail-hero-icon accent-${item.accent}`}><PortfolioIcon id={agent.family} size={32} /></span><span className="eyebrow">{classificationLabel(item)} · {agent.segment}</span><h2 id="detail-title">{agent.name}</h2><span className="agent-detail-status"><span className="tiny-dot" />{agent.status}</span><p className="modal-lead">{agent.description}</p>
    <div className="detail-facts"><div><span className="micro">QUEM DESENVOLVE</span><strong>{agent.family === 'standard' ? 'Time de Produtos' : 'OES · Ofertas e Serviços / IDeIA'}</strong></div><div><span className="micro">MODELO COMERCIAL</span><strong>{commercialLabel(item)}</strong></div></div>
    {agent.products.length > 0 && <><h3>Sistemas citados no material</h3><div className="tags">{agent.products.map(product => <span key={product}>{product}</span>)}</div></>}
    <div className="detail-callout"><strong>Como este exemplo se encaixa?</strong><p>Integra a família {item.name}, dentro da oferta Agentes TOTVS. A matriz reúne agentes dos times de Produtos, OES e franquias para automação e ganho de produtividade, todos desenvolvidos a partir do Foundation LYNN.</p></div>
    {agent.products.includes('Equals') && <div className="detail-callout"><strong>Integração em discussão</strong><p>A reunião cita adequações de agentes Equals ao ecossistema. Sua presença no inventário não confirma migração concluída. Uma solução externa pode ter integração à cobrança distinta de sua construção sobre LYNN.</p></div>}
    <p className="fine-print">{agent.status === 'Disponível no material' ? 'Disponibilidade informada no documento de referência; não implica disponibilidade no Store ou integração a T-Coins.' : 'O inventário descreve produtos e ofertas em evolução, não confirma disponibilidade para ativação no Store.'}</p><div className="source-note">Fonte: {agent.family === 'standard' ? 'Agentes de IA — Segmentos, Fase 1 + Fase 2, agosto/2026' : 'Agentes Especialistas e Personalizados'}, página {agent.page}. Classificação comercial conforme esclarecimentos do projeto.</div>
  </>;
}

function StoreDetails() {
  const [selected, setSelected] = useState<PortfolioId[]>([]);
  const families = portfolio.filter(item => !['agents', 'enterprise', 'garden'].includes(item.id));
  return <>
    <span className="detail-hero-icon accent-cyan"><Store size={32} /></span><span className="eyebrow">AGENTES TOTVS · STORE EM CONSTRUÇÃO</span><h2 id="detail-title">Uma oferta.<br />Muitas aplicações.</h2><p className="modal-lead">Produtos, OES e franquias ampliam a oferta Agentes TOTVS. O Store é o ponto de descoberta e ativação previsto para os produtos de IA.</p>
    <div className="store-lab"><div className="store-lab-heading"><Zap size={15} /><span>Laboratório de composição</span></div><p>Combine famílias de agentes para imaginar sua operação. As seleções são ilustrativas; não representam contratação ou ativação.</p>
      {families.map(item => <div className={`store-choice accent-${item.accent}`} key={item.id}><span className="offer-icon"><PortfolioIcon id={item.id} size={18} /></span><div><strong>{item.name}</strong><small className="classification-label">{classificationLabel(item)}</small><ModelBadge item={item} /></div><button role="switch" aria-checked={selected.includes(item.id)} aria-label={`${selected.includes(item.id) ? 'Remover' : 'Incluir'} exemplo ${item.name}`} className={`toggle-switch ${selected.includes(item.id) ? 'on' : ''}`} onClick={() => setSelected(selected.includes(item.id) ? selected.filter(id => id !== item.id) : [...selected, item.id])}><span /></button></div>)}
      <div className="store-lab-summary" role="status"><div><strong>{selected.length}</strong><span>famílias selecionadas</span></div><div><strong>{selected.filter(id => getPortfolioItem(id).oes).length}</strong><span>famílias OES</span></div><div><strong>{selected.includes('standard') ? 1 : 0}</strong><span>família Produtos</span></div><div><strong>{selected.includes('partners') ? 1 : 0}</strong><span>franquias e parceiros</span></div></div><div className="activation-notice"><CheckCircle2 size={16} /><span>Selecionar uma família não gera débito. O uso é medido conforme o modelo comercial da oferta.</span></div>
    </div><div className="source-note">Workflow Redesign e materiais de referência. Laboratório didático; não é uma tela oficial do Store.</div>
  </>;
}

function Sources() {
  const references = [
    { label: '01 · REFERÊNCIA PRINCIPAL', title: 'Workflow Redesign', text: 'Versão digitada em workflow-redesign.png, acompanhada da foto do quadro: categorias, labels, mercados e personas, atributos e diferenciais, competidores, GTM Q1 2027 e modelos comerciais. Agentes TOTVS, LYNN Enterprise e LYNN Garden são desenvolvidos a partir do Foundation. Esta revisão orienta a narrativa e substitui o mapa anterior.' },
    { label: '02 · FOUNDATION LYNN', title: 'Builder, Governance e Layer', text: 'Documento TOTVS IA — Estratégia LYNN Foundation e sete capturas: administração de agentes e projetos; Builder em diagrama, instruções e manifesto; Enterprise Layer em conversa e tarefas. As capturas ilustram capacidades da base comum.' },
    { label: '03 · INVENTÁRIO DE AGENTES', title: 'Exemplos de Produtos e OES', text: 'Agentes de IA — Segmentos, Fase 1 + Fase 2, agosto/2026: 43 exemplos em 16 segmentos e linhas. Agentes Especialistas e Personalizados: 10 especialistas, dois assistentes e casos. As famílias e os estágios do inventário preservam a origem dos materiais.' },
    { label: '04 · WALLET', title: 'Uma simulação de consumo', text: 'Reunião de 09/09/2026, 00:00:00–00:33:10: Start, faixas, validade e consumo. O ciclo com dois Agentes Padrão é didático; não é a tabela comercial das ofertas do Workflow Redesign.' },
    { label: '05 · LYNN GARDEN', title: 'Referências de interface', text: 'Quatro capturas do protótipo: conexões, criação de agentes, agentes do usuário e chat. O posicionamento da oferta segue o Workflow Redesign: AI Orchestration para o usuário não técnico, sobre o Foundation.' },
  ];
  return <><span className="eyebrow">CONTEXTO E REFERÊNCIAS</span><h2 id="detail-title">Uma visão conectada<br />aos materiais do projeto.</h2><p className="modal-lead">Estratégia de IA, ofertas comercializáveis, produtos, telas da plataforma e dinâmica de consumo se complementam para explicar o ecossistema.</p><div className="source-cards">{references.map(item => <div key={item.label}><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div><div className="detail-callout"><strong>Definições em evolução</strong><p>Preços, faixas, métricas finais, alertas, calendário, redução e cancelamento dependem das condições de cada oferta. Simulações são didáticas e não constituem proposta comercial.</p></div><p className="fine-print">Imagens otimizadas das telas e marcas fornecidas. PDFs, textos e transcrições originais não são distribuídos. A disponibilidade indicada em uma referência não confirma disponibilidade atual no Store.</p></>;
}
