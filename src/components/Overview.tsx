import { getPortfolioItem, type PortfolioItem } from '../data/catalog';
import { BrandLockup } from './Brand';
import { Modal } from './Shared';
import WorkflowMatrix from './WorkflowMatrix';
export default function Overview({ onClose, onPortfolio }: { onClose: () => void; onPortfolio: (item: PortfolioItem) => void }) {
  return <Modal titleId="overview-title" onClose={onClose} className="workflow-modal">
    <header className="workflow-modal-header"><BrandLockup /><div><span className="eyebrow">ESTRATÉGIA DE OFERTAS · Q1 2027</span><h2 id="overview-title">Workflow Redesign</h2><p>Todas as ofertas partem do Foundation LYNN.</p></div></header>
    <WorkflowMatrix onOffer={id => onPortfolio(getPortfolioItem(id))} />
  </Modal>;
}
