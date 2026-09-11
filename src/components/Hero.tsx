import { ArrowDown, ArrowUpRight, Play, Layers3 } from 'lucide-react';

export function ArchitectureScene({ compact = false }: { compact?: boolean }) {
  return <div className={`architecture-scene ${compact ? 'scene-compact' : ''}`}>
    <div className="scene-halo" /><div className="scene-orbit orbit-one" /><div className="scene-orbit orbit-two" />
    <svg viewBox="0 0 600 480" className="scene-svg" role="img" aria-label="Arquitetura de referência em três camadas: oferta T-Coins e ativação no topo, Ofertas e Produtos de IA ao centro e Foundation LYNN como base. Garden tem conexão parcial via LYNN Proxy, detalhada no mapa.">
      <defs>
        <linearGradient id="baseTop" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#25394a" /><stop offset="1" stopColor="#0d1825" /></linearGradient>
        <linearGradient id="middleTop" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#28403d" /><stop offset="1" stopColor="#14252c" /></linearGradient>
        <linearGradient id="upperTop" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b8f293" stopOpacity=".24" /><stop offset="1" stopColor="#b8f293" stopOpacity=".03" /></linearGradient>
        <linearGradient id="coinTop" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#dcffbd" /><stop offset="1" stopColor="#8ed16f" /></linearGradient>
        <filter id="sceneGlow"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <g className="scene-base">
        <path d="M70 330 300 205 530 330 300 455Z" fill="#09131e" stroke="#395360" />
        <path d="M70 306 300 181 530 306 300 431Z" fill="url(#baseTop)" stroke="#577c82" strokeWidth="1.2" />
        <path d="M70 306v24l230 125v-24z" fill="#142432" stroke="#395360" /><path d="M300 431v24l230-125v-24z" fill="#0e1a28" stroke="#395360" />
        <path d="m98 307 202 109 201-109" fill="none" stroke="#79d2ce" opacity=".5" />
        <text x="310" y="439" transform="rotate(-28 310 439)" fill="#9fc3c9" fontSize="10" letterSpacing="3">FOUNDATION LYNN</text>
      </g>
      <g stroke="#8ee6bd" strokeDasharray="4 6" opacity=".5" className="scene-connections"><path d="M160 189v112M300 266v125M440 189v112" /></g>
      <g className="scene-middle">
        <path d="M70 221 300 96 530 221 300 346Z" fill="#0b1b23" stroke="#345750" />
        <path d="M70 210 300 85 530 210 300 335Z" fill="url(#middleTop)" stroke="#83bda4" strokeDasharray="6 5" />
        <path d="M70 210v11l230 125v-11z" fill="#1c3434" /><path d="M300 335v11l230-125v-11z" fill="#11282d" />
        {[[184, 192, '#b8f293'], [259, 151, '#78d5e0'], [334, 192, '#b7abf0'], [259, 233, '#b7abf0'], [409, 233, '#eab68a'], [334, 274, '#b7abf0']].map(([x, y, color], i) => <g key={i} className={`scene-tile tile-${i}`}>
          <path d={`M${x} ${Number(y) - 23}l42 23-42 23-42-23Z`} fill={String(color)} fillOpacity=".12" stroke={String(color)} strokeOpacity=".65" />
          <path d={`M${Number(x) - 13} ${y}l13-7 13 7-13 7Z`} fill="none" stroke={String(color)} strokeWidth="1.5" />
          <path d={`M${Number(x) - 13} ${Number(y) + 5}l13 7 13-7`} fill="none" stroke={String(color)} strokeWidth="1.5" />
        </g>)}
        <text x="88" y="234" transform="rotate(28 88 234)" fill="#a8c8ba" fontSize="10" letterSpacing="2.5">OFERTAS E PRODUTOS DE IA</text>
      </g>
      <g stroke="#b8f293" strokeDasharray="4 6" opacity=".6" className="scene-connections"><path d="M183 130v55M300 155v80M416 130v55" /></g>
      <g className="scene-top">
        <path d="M117 107 300 8 483 107 300 206Z" fill="url(#upperTop)" stroke="#b8f293" strokeOpacity=".6" />
        <path d="m133 108 167 89 167-89" fill="none" stroke="#b8f293" opacity=".25" />
        <ellipse cx="300" cy="92" rx="49" ry="27" fill="#b8f293" opacity=".1" filter="url(#sceneGlow)" />
        <g className="scene-coin">
          <ellipse cx="300" cy="93" rx="38" ry="21" fill="#6eab53" />
          <path d="M262 83v10a38 21 0 0 0 76 0V83" fill="#78b659" />
          <ellipse cx="300" cy="83" rx="38" ry="21" fill="url(#coinTop)" /><ellipse cx="300" cy="83" rx="31" ry="16" fill="none" stroke="#5d9545" strokeOpacity=".5" />
          <text x="299" y="93" textAnchor="middle" fill="#224126" fontWeight="700" fontSize="29" transform="skewX(-12)">T</text>
        </g>
        <text x="300" y="150" fill="#d3ebc7" fontSize="11" letterSpacing="4" textAnchor="middle">T-COIN + STORE</text>
      </g>
      <circle cx="70" cy="306" r="3" fill="#89dbd6" /><circle cx="530" cy="306" r="3" fill="#89dbd6" /><circle cx="300" cy="8" r="3" fill="#b8f293" />
    </svg>
    <span className="scene-note note-one"><span className="status-dot" />Uma moeda, múltiplos usos</span>
    <span className="scene-note note-two"><Layers3 size={14} />Foundation · base de construção</span>
  </div>;
}

export default function Hero({ onPresent }: { onPresent: () => void }) {
  return <section className="hero section-shell" aria-labelledby="hero-title">
    <div className="hero-copy">
      <div className="eyebrow hero-eyebrow"><span className="status-dot" />O UNIVERSO DE IA DA TOTVS</div>
      <h1 id="hero-title">Um foundation.<br />Infinitas<br /><span>possibilidades.</span></h1>
      <p>Você contrata ofertas. Utiliza produtos de IA. Entenda como T-Coins, soluções OES, Agentes Padrão e LYNN Garden se organizam — e qual é o papel do Foundation LYNN.</p>
      <div className="hero-actions"><a href="#ecossistema" className="button primary">Explore o ecossistema<ArrowUpRight size={19} /></a><button className="button quiet" onClick={onPresent}><Play size={16} />Comece pela visão geral</button></div>
      <div className="hero-meta"><span>Uma experiência interativa</span><span className="meta-divider" />Universo TOTVS · 2026</div>
    </div>
    <div className="hero-visual"><ArchitectureScene /><div className="scene-caption"><span>CONTRATAR</span><i />UTILIZAR<i />CONSTRUIR</div></div>
    <div className="hero-bottom"><span>Da arquitetura à experiência do cliente.</span><a href="#ecossistema" aria-label="Descer para o mapa do ecossistema"><ArrowDown size={18} /></a><span>Desça para conectar os pontos</span></div>
  </section>;
}
