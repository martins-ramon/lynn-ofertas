import { useEffect, useRef, type ReactNode } from 'react';
import { Sprout, Blocks, ScanLine, SlidersHorizontal, Network, Fingerprint, X, ArrowUpRight, Coins } from 'lucide-react';
import { commercialLabel, commercialModelFor, type PortfolioId, type PortfolioItem, type Vision } from '../data/catalog';

const portfolioIcons = { garden: Sprout, standard: Blocks, specialists: Fingerprint, custom: SlidersHorizontal, assistants: ScanLine, partners: Network };
export function PortfolioIcon({ id, size = 24 }: { id: PortfolioId; size?: number }) {
  const Icon = portfolioIcons[id];
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
}

export function Coin({ small = false }: { small?: boolean }) {
  return <span className={`coin ${small ? 'coin-small' : ''}`} aria-hidden="true">T<span>·</span></span>;
}

export function SectionHeading({ index, eyebrow, title, text, children }: { index: string; eyebrow: string; title: ReactNode; text?: string; children?: ReactNode }) {
  return <div className="section-heading">
    <div><div className="eyebrow"><span>{index}</span>{eyebrow}</div><h2>{title}</h2>{text && <p>{text}</p>}</div>
    {children}
  </div>;
}

export function Modal({ titleId, children, onClose, className = '' }: { titleId: string; children: ReactNode; onClose: () => void; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = oldOverflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} aria-labelledby={titleId} className={`modal ${className}`} onCancel={event => { event.preventDefault(); event.stopPropagation(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) { event.stopPropagation(); onClose(); } }}>
    <div className="modal-content">
      <button autoFocus className="icon-button modal-close" onClick={onClose} aria-label="Fechar painel"><X size={21} /></button>
      {children}
    </div>
  </dialog>;
}

export function TextLink({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button className="text-link" onClick={onClick}>{children}<ArrowUpRight size={16} aria-hidden="true" /></button>;
}

export function ModelBadge({ item, vision }: { item: PortfolioItem; vision: Vision }) {
  const model = commercialModelFor(item, vision);
  return <span className={`model-badge ${model === 'own' ? 'own-model' : model === 'undecided' ? 'undecided-model' : ''}`}>
    {model === 'tcoin' ? <Coins size={12} aria-hidden="true" /> : <span className="tiny-dot" />}
    {commercialLabel(item, vision)}
  </span>;
}
