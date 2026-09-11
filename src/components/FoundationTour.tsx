import { useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Check, ChevronDown, Cloud, Database, GitBranch, KeyRound, Maximize2, Network, RotateCw, ShieldCheck } from 'lucide-react';
import { aiEnablers, foundationPillars, productScreens, type PillarId, type ProductScreen } from '../data/foundation';
import { LynnLogo, TotvsLogo } from './Brand';
import { SectionHeading } from './Shared';
import ImageViewer from './ImageViewer';

const pillarIcons = { builder: GitBranch, enterprise: Network, governance: ShieldCheck };
const enablerIcons = { cloud: Cloud, apis: KeyRound, data: Database };

export default function FoundationTour() {
  const [pillarId, setPillarId] = useState<PillarId>('builder');
  const [screenId, setScreenId] = useState('builder-diagram');
  const [highlight, setHighlight] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const pillar = foundationPillars.find(item => item.id === pillarId)!;
  const screen = productScreens.find(item => item.id === screenId)!;
  const screens = productScreens.filter(item => item.pillar === pillarId);

  const selectPillar = (id: PillarId) => {
    setPillarId(id);
    setScreenId(foundationPillars.find(item => item.id === id)!.initialScreen);
    setHighlight(0);
  };
  const selectScreen = (item: ProductScreen) => {
    setPillarId(item.pillar);
    setScreenId(item.id);
    setHighlight(0);
  };
  const tabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % foundationPillars.length;
    else if (event.key === 'ArrowLeft') next = (index + foundationPillars.length - 1) % foundationPillars.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = foundationPillars.length - 1;
    else return;
    event.preventDefault();
    selectPillar(foundationPillars[next].id);
    document.getElementById(`pillar-tab-${foundationPillars[next].id}`)?.focus();
  };

  return <section className="foundation-tour section-shell" id="foundation" aria-labelledby="foundation-tour-title">
    <SectionHeading index="02" eyebrow="DA CONCEPÇÃO À OPERAÇÃO EM ESCALA" title={<span id="foundation-tour-title">A base ganha forma.<br /><span className="muted-heading">O negócio ganha inteligência.</span></span>} text="O foundation de IA B2B da TOTVS, lançado em fevereiro de 2026. Um caminho padronizado e reaproveitável para construir, conectar e governar IA, com acesso a modelos intercambiáveis.">
      <div className="foundation-signature"><LynnLogo /><span>FOUNDATION DE INTELIGÊNCIA ARTIFICIAL</span></div>
    </SectionHeading>
    <div className="foundation-tabs" role="tablist" aria-label="Pilares do Foundation">{foundationPillars.map((item, index) => {
      const Icon = pillarIcons[item.id];
      return <button key={item.id} role="tab" id={`pillar-tab-${item.id}`} aria-controls="foundation-tour-panel" aria-selected={pillarId === item.id} tabIndex={pillarId === item.id ? 0 : -1} className={`accent-${item.accent} ${pillarId === item.id ? 'selected' : ''}`} onClick={() => selectPillar(item.id)} onKeyDown={event => tabKey(event, index)}><Icon size={19} strokeWidth={1.6} /><span><strong>{item.name}</strong><small>{item.verb}</small></span><span className="pillar-tab-number">0{index + 1}</span></button>;
    })}</div>
    <div className={`foundation-tour-panel accent-${pillar.accent}`} id="foundation-tour-panel" role="tabpanel" aria-labelledby={`pillar-tab-${pillar.id}`} tabIndex={0}>
      <div className="pillar-story" key={pillar.id}><span className="micro">{pillar.name.toUpperCase()} · {pillar.verb.toUpperCase()}</span><h3>{pillar.headline}</h3><p>{pillar.description}</p><div className="pillar-value"><Check size={16} /><p>{pillar.value}</p></div><span className="micro screen-guide-label">EXPLORE OS DESTAQUES DA TELA</span><div className="screen-highlights">{screen.highlights.map((item, index) => <button key={`${screen.id}-${index}`} aria-pressed={highlight === index} className={highlight === index ? 'selected' : ''} onClick={() => setHighlight(index)}><span>{index + 1}</span><strong>{item.title}</strong><ArrowUpRight size={13} /></button>)}</div></div>
      <div className="product-gallery"><div className="product-window"><div className="product-window-bar"><TotvsLogo dark /><span>Foundation LYNN<span className="window-path"> / {pillar.id === 'governance' ? 'Administração' : pillar.name}</span></span><button onClick={() => setLightbox(true)} aria-label={`Ampliar tela: ${screen.title}`}><Maximize2 size={15} /><span>Ampliar</span></button></div>
        <div className="product-screen-stage"><div className="product-screen-image" key={screen.id}>
          <img src={`/media/${screen.id}-preview.webp`} srcSet={`/media/${screen.id}-preview.webp 1120w, /media/${screen.id}.webp ${screen.width}w`} sizes="(min-width: 1600px) 880px, (min-width: 960px) 65vw, 94vw" width={screen.width} height={screen.height} alt={screen.alt} loading="lazy" decoding="async" />
          {screen.highlights.map((item, index) => <button key={index} className={`screen-hotspot ${index === highlight ? 'selected' : ''}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} aria-label={`Na imagem: ${item.title}`} aria-pressed={index === highlight} onClick={() => setHighlight(index)}>{index + 1}</button>)}
        </div></div>
        <div className="product-screen-tabs" aria-label={`Telas de ${pillar.name}`}>{screens.map(item => <button key={item.id} aria-pressed={item.id === screen.id} className={item.id === screen.id ? 'selected' : ''} onClick={() => selectScreen(item)}>{item.tab}</button>)}<span>{screens.findIndex(item => item.id === screen.id) + 1} / {screens.length}</span></div>
      </div><div className="screen-explanation" aria-live="polite" aria-atomic="true"><span className="explanation-index">0{highlight + 1}</span><div><strong>{screen.highlights[highlight].title}</strong><p>{screen.highlights[highlight].text}</p></div></div><p className="screen-reference">Telas fornecidas do Foundation LYNN · {pillar.note}</p></div>
    </div>
    <div className="intelligence-loop"><div><RotateCw size={21} /><div><h3>Operar. Medir. Aprimorar.</h3><p>Metadados proprietários de uso e resultado ajudam a evoluir cada aplicação.</p></div></div><ol><li>Medir eficácia</li><li>Otimizar custo por tarefa</li><li>Melhorar continuamente</li></ol></div>
    <div className="ai-enablers"><div className="enablers-intro"><span className="micro">HABILITADORES DA ESTRATÉGIA</span><h3>A escala começa<br />no ambiente do cliente.</h3><p>Sem dados íntegros, acessíveis e em prontidão, não tem IA.</p></div><div className="enablers-grid">{aiEnablers.map(item => {
      const Icon = enablerIcons[item.id as keyof typeof enablerIcons];
      return <details key={item.id}><summary><Icon size={22} strokeWidth={1.5} /><span><strong>{item.title}</strong><small>{item.subtitle}</small></span><ChevronDown size={15} /></summary><p>{item.description}</p></details>;
    })}</div></div>
    {lightbox && <ImageViewer screen={screen} screens={productScreens} label="TELAS DO FOUNDATION" onScreen={selectScreen} onClose={() => setLightbox(false)} />}
  </section>;
}
