import { useState } from 'react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { gardenScreens } from '../data/garden';
import ImageViewer from './ImageViewer';

export default function GardenDetails() {
  const [screen, setScreen] = useState(gardenScreens[0]);
  const [expanded, setExpanded] = useState(false);
  return <div className="garden-details">
    <div className="garden-current-status"><span className="micro">SITUAÇÃO ATUAL · PROTÓTIPO INTERNO</span><h3>Eficiência operacional em validação.</h3><p>O Garden nasceu para atender áreas internas da TOTVS. O contexto fornecido relata cerca de 500 usuários internos em validação controlada, com acesso integrado ao Google.</p></div>
    <div className="garden-decisions"><div><span className="micro">COMERCIALIZAÇÃO</span><strong>T-Coins ou modelo próprio?</strong><p>A decisão está em discussão. Garden é apresentado como produto de IA com modelo a definir, e não como uma oferta comercial já estabelecida.</p></div><div><span className="micro">ARQUITETURA</span><strong>Projeto independente + LYNN Proxy</strong><p>Construído com OpenAI Agents SDK, usa LYNN Proxy para acesso aos modelos. Isso não equivale à construção sobre os três pilares do Foundation. A estratégia de convergência ainda precisa ser definida.</p></div></div>
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
