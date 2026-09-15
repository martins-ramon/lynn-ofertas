import { useState } from 'react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { gardenScreens } from '../data/garden';
import ImageViewer from './ImageViewer';

export default function GardenDetails() {
  const [screen, setScreen] = useState(gardenScreens[0]);
  const [expanded, setExpanded] = useState(false);
  return <div className="garden-details">
    <div className="garden-current-status"><span className="micro">WORKFLOW REDESIGN · AI ORCHESTRATION</span><h3>IA governada para o trabalho.</h3><p>LYNN Garden é a plataforma para usuários não técnicos, com foco em SMB e sponsors de negócio. A oferta se desenvolve a partir do Foundation, junto de Agentes TOTVS e LYNN Enterprise.</p></div>
    <div className="garden-decisions"><div><span className="micro">MODELO COMERCIAL</span><strong>Franquia mínima recorrente por usuário</strong><p>IA Orchestration para usuários não técnicos, com controles de governança e conexões às ferramentas de trabalho.</p></div><div><span className="micro">BASE COMUM</span><strong>Foundation LYNN</strong><p>Builder, Governance e Layer sustentam a estratégia da plataforma. As capturas abaixo são referências do protótipo e ilustram a experiência de uso.</p></div></div>
    <div className="related-heading"><h3>Conheça o Garden por dentro</h3><span>4 telas do protótipo</span></div>
    <div className="garden-gallery">
      <div className="product-screen-tabs" aria-label="Telas do Garden">{gardenScreens.map(item => <button key={item.id} className={item.id === screen.id ? 'selected' : ''} aria-pressed={item.id === screen.id} onClick={() => setScreen(item)}>{item.tab}</button>)}</div>
      <button className="garden-screen-open" onClick={() => setExpanded(true)} aria-label={`Ampliar tela: ${screen.title}`}><img key={screen.id} src={`/media/${screen.id}-preview.webp`} width={screen.width} height={screen.height} alt={screen.alt} loading="lazy" decoding="async" /><span><Maximize2 size={14} />Ampliar tela</span></button>
      <p aria-live="polite">{screen.caption}</p>
    </div>
    <a className="text-link" href="https://garden.totvs.io/" target="_blank" rel="noreferrer">Acessar Garden<ArrowUpRight size={15} /></a><p className="fine-print">Acesso sujeito às permissões do protótipo. As telas apresentadas não comprovam disponibilidade comercial nem integração com a wallet de T-Coins.</p>
    {expanded && <ImageViewer screen={screen} screens={gardenScreens} label="LYNN GARDEN · PROTÓTIPO" onScreen={setScreen} onClose={() => setExpanded(false)} />}
  </div>;
}
