import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Play, X } from 'lucide-react';
import Hero from './components/Hero';
import Ecosystem from './components/Ecosystem';
import WalletJourney from './components/WalletJourney';
import Catalog from './components/Catalog';
import PortfolioDetails, { type Detail } from './components/PortfolioDetails';
import Presentation from './components/Presentation';
import Overview from './components/Overview';
import FoundationTour from './components/FoundationTour';
import { BrandLockup, LynnLogo } from './components/Brand';
import { Modal } from './components/Shared';
import type { Agent, PortfolioItem, Vision } from './data/catalog';

export default function App() {
  const [vision, setVision] = useState<Vision>('current');
  const [detail, setDetail] = useState<Detail | null>(null);
  const [presenting, setPresenting] = useState(false);
  const [overview, setOverview] = useState(false);
  const [menu, setMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('ecossistema');
  const onPortfolio = (item: PortfolioItem) => setDetail({ kind: 'portfolio', item });
  const onAgent = (agent: Agent) => setDetail({ kind: 'agent', agent });
  const present = () => { setMenu(false); setPresenting(true); };
  useEffect(() => {
    if (!detail) return;
    const dialog = document.querySelector<HTMLDialogElement>('.detail-modal');
    dialog?.scrollTo({ top: 0, behavior: 'instant' });
    const title = document.getElementById('detail-title');
    if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); }
  }, [detail]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
    ['ecossistema', 'foundation', 'wallet', 'ofertas'].forEach(id => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);
  const goWallet = () => {
    setDetail(null);
    window.setTimeout(() => document.getElementById('wallet')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }), 50);
  };

  return <><a className="skip-link" href="#main">Ir para o conteúdo</a><header className="site-header"><div className="header-inner"><a className="brand-link" href="#" aria-label="TOTVS LYNN, início"><BrandLockup /></a><nav className={menu ? 'nav-open' : ''} aria-label="Navegação principal" id="site-nav">{[{ id: 'ecossistema', label: 'O ecossistema' }, { id: 'foundation', label: 'O Foundation' }, { id: 'wallet', label: 'Como funciona' }, { id: 'ofertas', label: 'O portfólio de IA' }].map(link => <a className={activeSection === link.id ? 'active' : ''} key={link.id} href={`#${link.id}`} onClick={() => setMenu(false)}>{link.label}</a>)}</nav><div className="header-actions"><button className="presentation-button" onClick={present}><Play size={13} fill="currentColor" /><span>Apresentar</span></button><button className="icon-button mobile-menu" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} aria-controls="site-nav" onClick={() => setMenu(!menu)}>{menu ? <X size={21} /> : <Menu size={21} />}</button></div></div></header>
    <main id="main">
      <Hero onPresent={present} />
      <Ecosystem vision={vision} setVision={setVision} onPortfolio={onPortfolio} onCommercial={kind => setDetail({ kind })} onOverview={() => setOverview(true)} />
      <FoundationTour />
      <WalletJourney />
      <Catalog onAgent={onAgent} vision={vision} />
      <section className="closing-section section-shell"><div className="closing-brand"><LynnLogo /></div><span className="eyebrow">OFERTAS PARA CONTRATAR. PRODUTOS PARA UTILIZAR.</span><h2>O próximo agente.<br />O próximo resultado.<br /><span>A próxima possibilidade.</span></h2><p>T-Coins e ofertas OES são objetos de contratação.<br />Produtos de IA transformam capacidades em valor para o negócio.</p><button className="button primary" onClick={present}>Veja a história completa<ArrowUpRight size={18} /></button></section>
    </main>
    <footer className="site-footer"><div className="section-shell"><BrandLockup /><p>Ofertas e Produtos de IA · Universo TOTVS 2026</p><button onClick={() => setDetail({ kind: 'sources' })}>Sobre esta experiência e fontes<ArrowUpRight size={13} /></button></div></footer>
    {detail && <Modal titleId="detail-title" onClose={() => setDetail(null)} className="detail-modal"><div key={detail.kind === 'portfolio' ? detail.item.id : detail.kind === 'agent' ? detail.agent.id : detail.kind}><PortfolioDetails detail={detail} vision={vision} onPortfolio={onPortfolio} onAgent={onAgent} onWallet={goWallet} /></div></Modal>}
    {presenting && <Presentation onClose={() => setPresenting(false)} />}
    {overview && <Overview vision={vision} setVision={setVision} onClose={() => setOverview(false)} onPortfolio={item => { setOverview(false); onPortfolio(item); }} />}
  </>;
}
