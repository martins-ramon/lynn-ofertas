import { useState } from 'react';
import { ArrowUpRight, Layers3, Wallet } from 'lucide-react';
import { workflowOffers, workflowRows, type WorkflowId } from '../data/workflow';

export default function WorkflowMatrix({ onOffer }: { onOffer: (id: WorkflowId) => void }) {
  const [selected, setSelected] = useState<WorkflowId | 'all'>('all');
  const offers = workflowOffers.filter(offer => selected === 'all' || offer.id === selected);
  return <div className="workflow-matrix">
    <div className="workflow-foundation"><div><Layers3 size={22} /><strong>Foundation LYNN</strong><span>Base comum de todas as ofertas</span></div><ul aria-label="Pilares do Foundation"><li>Builder</li><li>Governance</li><li>Layer</li></ul></div>
    <div className="workflow-wallet"><Wallet size={18} /><strong>Wallet de T-Coins</strong><span>Consumo de IA no ecossistema</span></div>
    <div className="workflow-toolbar"><span className="micro">COMPARE AS OFERTAS</span><div className="workflow-filters" aria-label="Filtrar colunas da matriz">{[{ id: 'all', name: 'Todas' }, ...workflowOffers].map(offer => <button key={offer.id} aria-pressed={selected === offer.id} onClick={() => setSelected(offer.id as WorkflowId | 'all')}>{offer.name}</button>)}</div></div>
    <div className="workflow-scroll" tabIndex={0} role="region" aria-label="Matriz Workflow Redesign. Role para explorar todas as linhas e comparar as ofertas.">
      <table className={`workflow-table ${selected !== 'all' ? 'workflow-single' : ''}`}>
        <caption className="sr-only">Workflow Redesign: categorias, produtos, mercado, SAM e SOM, atributos, competidores, GTM Q1 2027 e modelo comercial.</caption>
        <thead><tr className="workflow-groups"><th scope="col">Ofertas</th>{offers.some(offer => offer.id === 'agents') && <th scope="colgroup">Agentes</th>}{offers.some(offer => offer.id !== 'agents') && <th scope="colgroup" colSpan={offers.filter(offer => offer.id !== 'agents').length}>Plataformas</th>}</tr><tr><th scope="col">Label do produto</th>{offers.map(offer => <th scope="col" key={offer.id} className={`accent-${offer.accent}`}><button onClick={() => onOffer(offer.id)}>{offer.name}<ArrowUpRight size={18} /></button></th>)}</tr></thead>
        <tbody>{workflowRows.map(row => <tr key={row.id} className={`workflow-row-${row.id}`}><th scope="row">{row.label}</th>{offers.map(offer => <td key={offer.id} className={`accent-${offer.accent}`}>{offer.cells[row.id].length ? <ul>{offer.cells[row.id].map(text => <li key={text}>{text}</li>)}</ul> : null}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <p className="workflow-hint">Selecione uma oferta para ler sua coluna ou compare todas lado a lado. Os labels abrem os detalhes. Fonte: matriz Workflow Redesign. TCO: custo total de propriedade. SAM: mercado endereçável; SOM: parcela de mercado a conquistar.</p>
  </div>;
}
