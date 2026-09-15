import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Coins, Globe2, Layers3, Store, Wallet } from 'lucide-react';
import { workflowOffers } from '../data/workflow';
import { ArchitectureScene } from './Hero';
import { Coin, Modal, PortfolioIcon } from './Shared';
import { BrandLockup, LynnLogo } from './Brand';

const slides = [
  { label: 'WORKFLOW REDESIGN', title: <>Um foundation.<br /><em>Três caminhos de valor.</em></>, text: 'Agentes TOTVS, LYNN Enterprise e LYNN Garden são desenvolvidos a partir do Foundation. A matriz organiza categorias, públicos, diferenciais, GTM Q1 2027 e modelos comerciais.', takeaway: 'Uma base comum para ofertas de agentes e plataformas.' },
  { label: 'AGENTES TOTVS', title: <>Automação.<br /><em>Ganho de produtividade.</em></>, text: 'Agentes desenvolvidos pelos times de Produtos, OES e franquias levam IA aos softwares TOTVS. O foco está em SMB e nos operadores que executam os processos do negócio.', takeaway: 'Redução de TCO: integração ao legado, governança de ponta a ponta e pagamento por uso (TaaS).' },
  { label: 'PLATAFORMAS', title: <>Engenharia de agentes.<br /><em>Orquestração de IA.</em></>, text: 'LYNN Enterprise atende engenheiros no mercado Mid / High com Agent Engineering. LYNN Garden atende usuários não técnicos de SMB com AI Orchestration e IA governada para uso corporativo.', takeaway: 'Enterprise: por usuário + franquia mínima de requisições. Garden: franquia mínima recorrente por usuário.' },
  { label: 'A BASE COMUM', title: <>Foundation LYNN.<br /><em>Construir, governar e conectar.</em></>, text: 'Builder, Governance e Layer sustentam todas as ofertas. As telas de referência mostram criação de agentes, contexto de operação, permissões e acompanhamento de tarefas.', takeaway: 'LYNN Enterprise é a plataforma de Agent Engineering. Enterprise Layer é um pilar do Foundation.' },
  { label: 'A EXPERIÊNCIA DE CONSUMO', title: <>Uma wallet.<br /><em>Uma história de uso transparente.</em></>, text: 'A wallet de T-Coins acompanha os créditos e o consumo de IA. Cada oferta tem seu modelo comercial; o exemplo do site mostra um ciclo didático com dois Agentes Padrão dentro de Agentes TOTVS.', takeaway: 'Start, faixas e valores fictícios ajudam a entender o ciclo, sem substituir os modelos comerciais da matriz.' },
  { label: 'GTM · Q1 2027', title: <>Uma estratégia comum.<br /><em>Uma jornada por oferta.</em></>, text: 'Agentes TOTVS leva automação aos produtos. LYNN Enterprise oferece engenharia de agentes ao ecossistema. LYNN Garden aproxima a IA governada do trabalho das equipes.', takeaway: 'GTM Q1 2027: catálogos, operação de CS, atendimento, precificação e times de produto por oferta.' },
];

export default function Presentation({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const slide = slides[step];
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); setStep(index => Math.min(index + 1, slides.length - 1)); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setStep(index => Math.max(index - 1, 0)); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);
  return <Modal titleId="presentation-title" onClose={onClose} className="presentation-modal"><div className="presentation-top"><BrandLockup /><span className="micro">VISÃO EXECUTIVA · {String(step + 1).padStart(2, '0')} / 06</span></div><div className="presentation-slide" key={step} tabIndex={0} role="region" aria-label="Conteúdo da etapa"><div className="presentation-copy"><span className="eyebrow">{slide.label}</span><h2 id="presentation-title">{slide.title}</h2><p>{slide.text}</p></div><div className="presentation-art">
    {step === 0 && <ArchitectureScene compact />}
    {step === 3 && <div className="presentation-platform"><LynnLogo /><div className="presentation-platform-screen"><img src="/media/enterprise-tasks-preview.webp" width={1120} height={575} alt="Enterprise Layer do LYNN: agentes e acompanhamento de tarefas na operação." /></div><div className="presentation-platform-pillars"><span>Agent Builder</span><span>Enterprise Layer</span><span>Governance</span></div><small>Tela do Foundation fornecida como referência.</small></div>}
    {step === 1 && <div className="presentation-flow"><div className="presentation-flow-main"><Coin /><strong>Agentes TOTVS</strong><span>Automação por uso</span></div><ArrowRight size={24} /><div className="presentation-flow-small"><Store size={31} /><strong>Store</strong><span>Em construção</span></div></div>}
    {step === 2 && <div className="presentation-offers">{workflowOffers.map(item => <div className={`accent-${item.accent}`} key={item.id}><PortfolioIcon id={item.id} size={27} /><strong>{item.name}</strong><span>{item.cells.category[0]}</span></div>)}</div>}
    {step === 4 && <div className="presentation-wallet"><div><Wallet size={22} /><span>WALLET DO CLIENTE</span></div><span className="micro">SALDO · EXEMPLO DIDÁTICO</span><strong>125 <small>T-Coins</small></strong><p>Start + Expansão 2</p><div className="presentation-ledger"><span><Coins size={16} />Créditos da oferta T-Coins</span><span>+350</span></div><div className="presentation-ledger"><span>Uso de dois Agentes Padrão</span><span>−225</span></div><small>Documentos + crédito · quantidades fictícias</small></div>}
    {step === 5 && <div className="presentation-future"><div><Layers3 size={30} /><strong>Agentes TOTVS</strong><span>Produtos, OES e franquias</span></div><span className="future-plus">+</span><div><Globe2 size={30} /><strong>Plataformas LYNN</strong><span>Enterprise e Garden</span></div><div className="presentation-future-wallet"><Wallet size={20} /><span>Foundation comum · Wallet de T-Coins</span></div></div>}
    </div></div><div className="presentation-takeaway"><Check size={19} /><p>{slide.takeaway}</p></div><div className="presentation-bottom"><span>Use <kbd>←</kbd> <kbd>→</kbd> para navegar · <kbd>Esc</kbd> para sair</span><div className="slide-dots" aria-label="Ir para uma etapa">{slides.map((item, i) => <button key={item.label} className={i === step ? 'selected' : ''} aria-label={`Etapa ${i + 1}: ${item.label}`} aria-current={i === step ? 'step' : undefined} onClick={() => setStep(i)} />)}</div><div><button className="icon-button" disabled={step === 0} onClick={() => setStep(step - 1)} aria-label="Slide anterior"><ArrowLeft size={20} /></button><button className="button primary" onClick={() => step === slides.length - 1 ? onClose() : setStep(step + 1)}>{step === slides.length - 1 ? 'Explorar o site' : 'Continuar'}<ArrowRight size={17} /></button></div></div></Modal>;
}
