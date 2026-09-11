import { useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpRight, Check, ChevronRight, Coins, Globe2, Infinity as InfinityIcon, Layers3, LockKeyhole, Maximize2, Plus, Store, Wallet, X } from 'lucide-react';
import { classificationLabel, foundations, getPortfolioItem, portfolio, type PortfolioItem, type Vision } from '../data/catalog';
import { Coin, ModelBadge, PortfolioIcon, SectionHeading } from './Shared';
import { LynnLogo } from './Brand';

export default function Ecosystem({ vision, setVision, onPortfolio, onCommercial, onOverview }: { vision: Vision; setVision: (vision: Vision) => void; onPortfolio: (item: PortfolioItem) => void; onCommercial: (kind: 'contract' | 'store' | 'wallet') => void; onOverview: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [foundation, setFoundation] = useState<number | null>(null);
  const future = vision === 'future';
  const garden = getPortfolioItem('garden');
  return <section className="ecosystem section-shell" id="ecossistema" aria-labelledby="map-title">
    <SectionHeading index="01" eyebrow="CONECTE OS PONTOS" title={<span id="map-title">Três camadas.<br /><span className="muted-heading">Cada uma com seu papel.</span></span>} text="Um mapa para entender o conjunto. Toque nos blocos para descobrir os detalhes.">
      <div className="vision-control"><span>ESCOLHA A PERSPECTIVA</span><div className="segmented" aria-label="Perspectiva do modelo"><button aria-pressed={!future} className={!future ? 'selected' : ''} onClick={() => setVision('current')}>Modelo atual</button><button aria-pressed={future} className={future ? 'selected' : ''} onClick={() => setVision('future')}>Visão de evolução<ArrowUpRight size={13} /></button></div><button className="overview-trigger" onClick={onOverview}><Maximize2 size={13} />Ver mapa em tela cheia</button></div>
    </SectionHeading>
    <div className="portfolio-taxonomy"><div><span className="micro">OFERTA · O QUE PODE SER COMERCIALIZADO</span><p><strong>T-Coins e soluções OES com modelo próprio.</strong> São os objetos de contratação efetivos hoje.</p></div><div><span className="micro">PRODUTO DE IA · O QUE ENTREGA A CAPACIDADE</span><p><strong>Agentes Padrão e parceiros dão valor à oferta T-Coins.</strong> Garden é produto com modelo comercial a definir.</p></div></div>
    <div className={`vision-note ${future ? 'is-future' : ''}`} role="status"><span className="status-dot" /><p>{future ? <><strong>Hipótese de evolução, não contratação já definida.</strong> Se a contratação própria de OES for substituída pela oferta T-Coins, seus agentes passam a produtos vinculados a ela. Garden mantém comercialização e convergência ao Foundation a definir.</> : <><strong>Ofertas e produtos têm papéis diferentes.</strong> T-Coins são contratados para utilizar produtos de IA. OES tem ofertas próprias. Garden é independente e usa LYNN Proxy; seu modelo comercial está em discussão.</>}</p></div>
    <div className={`architecture-map ${future ? 'future-map' : ''}`}>
      <div className="map-row commerce-row">
        <div className="layer-label"><span className="layer-number">01</span><h3>Você <br />contrata e ativa.</h3><p>A relação com o cliente.</p></div>
        <div className="commerce-grid">
          <button className="commerce-card contract-card" onClick={() => onCommercial('contract')}><div className="card-top"><Coin small /><ArrowUpRight size={17} /></div><span className="micro">OFERTA COMERCIAL</span><h4>T-Coins</h4><p>Contratação via Start e expansão.<br />Produtos de IA geram seu consumo.</p><span className="card-foot">A oferta que o cliente contrata<Coins size={13} /></span></button>
          <button className="commerce-card" onClick={() => onCommercial('store')}><div className="card-top"><Store size={26} strokeWidth={1.5} /><span className="construction-badge">Em construção</span></div><span className="micro">ATIVAÇÃO</span><h4>Store</h4><p>Descubra e ative produtos de IA.<br />Amplie os usos dos T-Coins.</p><span className="card-foot">Ponto de descoberta e ativação<ArrowUpRight size={15} /></span></button>
          <button className="commerce-card" onClick={() => onCommercial('wallet')}><div className="card-top"><Wallet size={26} strokeWidth={1.5} /><ArrowUpRight size={17} /></div><span className="micro">ACOMPANHAMENTO</span><h4>Wallet do cliente</h4><p>Créditos, consumo e validade.<br />Uma oferta, múltiplos produtos.</p><span className="card-foot">Extrato do consumo de T-Coins<ArrowUpRight size={15} /></span></button>
        </div>
      </div>
      <div className="map-connector consumption"><span /><div><ArrowDown size={15} /><span>{future ? 'T-Coins para Padrão e parceiros; OES na hipótese de convergência · Garden a definir' : 'Produtos Padrão e parceiros consomem a oferta T-Coins · OES tem contratação própria'}</span></div><span /></div>
      <div className="map-row offers-row">
        <div className="layer-label"><span className="layer-number">02</span><h3>Ofertas e Produtos de IA</h3><p>Capacidades para diferentes necessidades.</p><div className="open-label"><InfinityIcon size={20} />Portfólio aberto</div></div>
        <div className="offers-container">
          <div className="foundation-backed-portfolio"><div className="portfolio-group-label"><Layers3 size={13} />ARQUITETURA DE REFERÊNCIA SOBRE O FOUNDATION LYNN</div><div className="offers-grid">{portfolio.filter(item => item.foundationRelation === 'foundation').map(item => <button key={item.id} className={`offer-card accent-${item.accent}`} onClick={() => onPortfolio(item)}>
            <div className="card-top"><span className="offer-icon"><PortfolioIcon id={item.id} /></span><ArrowUpRight className="card-arrow" size={17} /></div>
            <span className="micro">{item.owner}</span><h4>{item.name}</h4><span className={`classification-label ${item.oes && !future ? 'is-offer' : ''}`}>{classificationLabel(item, vision)}</span><p>{item.tagline}</p>
            <div className="offer-card-bottom"><ModelBadge item={item} vision={vision} /><span className="detail-hint">Explorar</span></div>
          </button>)}<button className="offer-card future-grid-card" aria-expanded={expanded} aria-controls="future-offer-content" onClick={() => setExpanded(!expanded)}><span className="ellipsis">···</span><h4>E o próximo capítulo?</h4><p>Novos produtos, novos formatos e possibilidades comerciais a definir.</p><span className="future-grid-action">{expanded ? 'Recolher possibilidades' : 'Explorar possibilidades'}{expanded ? <X size={16} /> : <Plus size={17} />}</span></button></div>
          {expanded && <div className="future-possibilities" id="future-offer-content"><div><span className="micro">POSSIBILIDADE FUTURA</span><h5>Builder para o cliente</h5><p>Acesso à criação de agentes. Seu enquadramento como produto ou nova oferta depende da definição comercial.</p></div><div><span className="micro">POSSIBILIDADE FUTURA</span><h5>Conjuntos de produtos de IA</h5><p>Agentes organizados por objetivo ou segmento. Um nome próprio não torna um conjunto uma oferta comercial por si só.</p></div><div><span className="micro">UM ESPAÇO SEM FIM</span><h5>Sua próxima ideia</h5><p>Novas capacidades ampliam o valor dos produtos e as razões para contratar as ofertas.</p></div></div>}</div>
          <div className="garden-map-exception"><button className="offer-card garden-map-card accent-mint" onClick={() => onPortfolio(garden)}><span className="offer-icon"><PortfolioIcon id="garden" /></span><div><span className="micro">PRODUTO DE IA · PROTÓTIPO INTERNO</span><h4>LYNN Garden</h4><p>{future ? 'Convergência ao Foundation a definir.' : 'Projeto independente · usa LYNN Proxy.'}</p></div><div><ModelBadge item={garden} vision={vision} /><span className="garden-map-detail">Conheça as 4 telas<ArrowUpRight size={15} /></span></div></button><p>Conexão atual: acesso aos modelos via LYNN Proxy. T-Coins ou modelo próprio e integração aos três pilares permanecem em discussão.</p></div>
        </div>
      </div>
      <div className="map-connector construction"><span /><div><ArrowUp size={15} /><span>Construção: Agentes Padrão, OES e parceiros · Garden tem ligação parcial via Proxy</span><ArrowUp size={15} /></div><span /></div>
      <div className="map-row foundation-row">
        <div className="layer-label"><span className="layer-number">03</span><h3>Foundation LYNN</h3><p>A base de construção.</p></div>
        <div className="foundation-block"><div className="foundation-heading"><div className="foundation-name"><h4>Foundation <LynnLogo /></h4></div><span className="foundation-badge"><LockKeyhole size={12} />Não comercializado isoladamente</span></div>
          <div className="foundation-parts">{foundations.map((item, i) => <button key={item.name} aria-expanded={foundation === i} onClick={() => setFoundation(foundation === i ? null : i)}><span className="micro">{item.verb}</span><strong>{item.name}</strong><ChevronRight size={15} className={foundation === i ? 'rotate' : ''} /></button>)}</div>
          {foundation !== null && <p className="foundation-detail">{foundations[foundation].description}</p>}
          <p className="foundation-message"><Check size={14} />Da concepção à operação governada em escala. Uma base comum, não um pacote de agentes.</p>
          <a className="foundation-tour-link" href="#foundation">Conheça os pilares nas telas do LYNN<ArrowUpRight size={15} /></a>
        </div>
      </div>
    </div>
    {future && <div className="external-connection"><div className="external-icon"><Globe2 size={27} /></div><div><span className="micro">ALÉM DAS OFERTAS CONSTRUÍDAS SOBRE LYNN · POSSIBILIDADE FUTURA</span><h4>A wallet também pode conectar outros universos.</h4><p>Soluções externas, integrações e recursos digitais podem reportar consumo diretamente à cobrança. Consumir T-Coin não exige, por si só, ser construído sobre LYNN. Integração e condições ainda a definir.</p></div><span className="external-route"><Wallet size={17} />Wallet<ArrowUpRight size={17} /></span></div>}
    <div className="map-takeaway"><span className="micro">GUARDE ESTA IDEIA</span><p>Você contrata <strong>ofertas</strong>.<br className="mobile-break" /> Utiliza <strong>produtos de IA</strong>.</p><Layers3 size={28} strokeWidth={1.2} /></div>
  </section>;
}
