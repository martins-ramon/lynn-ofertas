import { ArrowUpRight, Coins, Maximize2, Store, Wallet } from 'lucide-react';
import { getPortfolioItem, type PortfolioItem } from '../data/catalog';
import { SectionHeading } from './Shared';
import WorkflowMatrix from './WorkflowMatrix';
export default function Ecosystem({ onPortfolio, onCommercial, onOverview }: { onPortfolio: (item: PortfolioItem) => void; onCommercial: (kind: 'contract' | 'store' | 'wallet') => void; onOverview: () => void }) {
  return <section className="ecosystem section-shell" id="ecossistema" aria-labelledby="map-title">
    <SectionHeading index="01" eyebrow="ESTRATÉGIA DE OFERTAS · Q1 2027" title={<span id="map-title">Workflow Redesign.<br /><span className="muted-heading">Uma base. Três caminhos de valor.</span></span>} text="Agentes TOTVS, LYNN Enterprise e LYNN Garden: compare a proposta, o público e o modelo de cada oferta, todas desenvolvidas a partir do Foundation.">
      <button className="button outline" onClick={onOverview}><Maximize2 size={16} />Ver matriz em tela cheia</button>
    </SectionHeading>
    <WorkflowMatrix onOffer={id => onPortfolio(getPortfolioItem(id))} />
    <div className="workflow-commerce">{[
      { kind: 'contract' as const, name: 'T-Coins', text: 'Entenda o consumo por uso.', Icon: Coins },
      { kind: 'store' as const, name: 'Store', text: 'Explore a composição de produtos.', Icon: Store },
      { kind: 'wallet' as const, name: 'Wallet', text: 'Acompanhe créditos e consumo.', Icon: Wallet },
    ].map(({ kind, name, text, Icon }) => <button className="commerce-card" key={kind} onClick={() => onCommercial(kind)}><Icon size={22} /><div><h3>{name}</h3><p>{text}</p></div><ArrowUpRight size={17} /></button>)}</div>
  </section>;
}
