import { useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { agents, classificationLabel, getPortfolioItem, normalize, type Agent, type Vision } from '../data/catalog';
import { ModelBadge, PortfolioIcon, SectionHeading } from './Shared';

type Filter = 'all' | 'standard' | 'specialists' | 'assistants';
const filters: { value: Filter; label: string; count: number }[] = [
  { value: 'all', label: 'Todos', count: agents.length },
  { value: 'standard', label: 'Agentes Padrão', count: 43 },
  { value: 'specialists', label: 'Especialistas OES', count: 10 },
  { value: 'assistants', label: 'Assistentes OES', count: 2 },
];

export default function Catalog({ onAgent, vision }: { onAgent: (agent: Agent) => void; vision: Vision }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [segment, setSegment] = useState('all');
  const [product, setProduct] = useState('all');
  const [limit, setLimit] = useState(6);
  const segments = useMemo(() => [...new Set(agents.filter(agent => filter === 'all' || agent.family === filter).map(agent => agent.segment))].sort((a, b) => a.localeCompare(b, 'pt-BR')), [filter]);
  const products = useMemo(() => [...new Set(agents.filter(agent => filter === 'all' || agent.family === filter).flatMap(agent => agent.products))].sort(), [filter]);
  const results = agents.filter(agent => (filter === 'all' || agent.family === filter) && (segment === 'all' || agent.segment === segment) && (product === 'all' || agent.products.includes(product)) && normalize(`${agent.name} ${agent.segment} ${agent.description} ${agent.products.join(' ')} ${getPortfolioItem(agent.family).name}`).includes(normalize(query)));
  const clear = () => { setQuery(''); setFilter('all'); setSegment('all'); setProduct('all'); setLimit(6); };

  return <section className="catalog-section section-shell" id="ofertas" aria-labelledby="catalog-title">
    <SectionHeading index="04" eyebrow="OFERTAS E PRODUTOS DE IA" title={<span id="catalog-title">Encontre uma possibilidade.<br /><span className="muted-heading">Imagine o impacto.</span></span>} text="Agentes Padrão são produtos que dão valor à oferta T-Coins. Especialistas e Assistentes integram as ofertas OES com contratação própria hoje."><div className="catalog-stat"><strong>55<span>+</span></strong><span>exemplos nos materiais<br />e um portfólio em expansão</span></div></SectionHeading>
    <div className="catalog-controls"><div className="catalog-filter-tabs" aria-label="Filtrar por família do portfólio">{filters.map(item => <button key={item.value} className={filter === item.value ? 'selected' : ''} aria-pressed={filter === item.value} onClick={() => { setFilter(item.value); setSegment('all'); setProduct('all'); setLimit(6); }}>{item.label}<span>{item.count}</span></button>)}</div><div className="catalog-search"><Search size={17} /><input aria-label="Buscar agente, processo ou produto" placeholder="Busque um agente, processo ou produto…" value={query} onChange={event => { setQuery(event.target.value); setLimit(6); }} />{query && <button className="icon-button" onClick={() => setQuery('')} aria-label="Limpar busca"><X size={15} /></button>}</div></div>
    <div className="catalog-refine"><div><SlidersHorizontal size={14} /><label className="sr-only" htmlFor="segment">Segmento ou processo</label><select id="segment" value={segment} onChange={event => { setSegment(event.target.value); setLimit(6); }}><option value="all">Todos os segmentos e processos</option>{segments.map(item => <option key={item}>{item}</option>)}</select><label className="sr-only" htmlFor="product">Produto ou ERP</label><select id="product" value={product} onChange={event => { setProduct(event.target.value); setLimit(6); }}><option value="all">Todos os produtos</option>{products.map(item => <option key={item}>{item}</option>)}</select></div><span role="status">{results.length} {results.length === 1 ? 'possibilidade encontrada' : 'possibilidades encontradas'}</span></div>
    <div className="agent-grid">{results.slice(0, limit).map(agent => {
      const item = getPortfolioItem(agent.family);
      return <button className={`agent-card accent-${item.accent}`} key={agent.id} onClick={() => onAgent(agent)}><div className="agent-card-top"><span className="micro">{agent.segment}</span><ArrowUpRight size={17} /></div><h3>{agent.name}</h3><span className="classification-label">{classificationLabel(item, vision)}</span><p>{agent.description}</p><div className="agent-products">{agent.products.length > 0 ? agent.products.map(product => <span key={product}>{product}</span>) : <span>Segmento {agent.segment}</span>}</div><div className="agent-card-footer"><span><PortfolioIcon id={agent.family} size={13} />{agent.family === 'standard' ? 'Padrão · Produtos' : 'OES'}</span><ModelBadge item={item} vision={vision} /></div><div className="agent-status"><span className={`tiny-dot ${agent.status === 'Disponível no material' ? 'available' : ''}`} />{agent.status}</div></button>;
    })}</div>
    {results.length === 0 && <div className="empty-results"><Search size={28} /><h3>Ainda não encontramos essa combinação.</h3><p>Tente outro termo ou amplie os filtros para explorar o portfólio.</p><button className="button outline" onClick={clear}>Limpar filtros</button></div>}
    {results.length > limit && <div className="catalog-more"><button className="button outline" onClick={() => setLimit(limit + 9)}>Explorar mais agentes<ChevronDown size={16} /></button><span>{Math.min(limit, results.length)} de {results.length} exemplos</span></div>}
    <p className="catalog-source"><InfoIcon />Inventário dos materiais de referência. Estágios de desenvolvimento e disponibilidade variam; esta página não é o Store de contratação.</p>
  </section>;
}

function InfoIcon() { return <span className="source-i" aria-hidden="true">i</span>; }
