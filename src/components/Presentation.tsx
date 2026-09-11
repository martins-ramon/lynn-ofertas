import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Coins, Globe2, Layers3, Store, Wallet } from 'lucide-react';
import { classificationLabel, portfolio } from '../data/catalog';
import { ArchitectureScene } from './Hero';
import { Coin, Modal, PortfolioIcon } from './Shared';
import { BrandLockup, LynnLogo } from './Brand';

const slides = [
  { label: 'O ECOSSISTEMA', title: <>Um foundation.<br /><em>Muitas formas de gerar valor.</em></>, text: 'Oferta é o que pode ser comercializado. Hoje, T-Coins e soluções OES com modelo próprio são ofertas. Agentes Padrão e parceiros são produtos de IA que tornam a oferta T-Coins relevante para o cliente.', takeaway: 'Você contrata ofertas e utiliza produtos de IA. Foundation é a base de construção, não uma oferta.' },
  { label: 'A ESCOLHA DO CLIENTE', title: <>Contrate a oferta.<br /><em>Utilize os produtos de IA.</em></>, text: 'T-Coins são a oferta comercial, contratada via Start e expansão. Produtos executam tarefas e geram consumo conforme sua métrica. O Store será o ponto de descoberta e ativação desses produtos.', takeaway: 'O produto dá uma razão para contratar T-Coins. TaaS traduz o trabalho executado como serviço.' },
  { label: 'OFERTAS E PRODUTOS DE IA', title: <>Necessidades diferentes.<br /><em>Um portfólio que se complementa.</em></>, text: 'Agentes Padrão e parceiros são produtos vinculados a T-Coins. OES oferece soluções com contratação própria. Garden é um produto com comercialização a definir: T-Coins ou modelo próprio.', takeaway: 'Ter nome, agentes ou funcionalidades não torna um produto uma oferta comercial isolada.' },
  { label: 'A BASE DE CONSTRUÇÃO', title: <>Foundation LYNN.<br /><em>Da ideia à operação governada.</em></>, text: 'Agent Builder constrói. Enterprise Layer conecta contexto e operação. Governance acompanha uso, custo e ações. T-Cloud, APIs, dados e sistemas preparados habilitam a escala.', takeaway: 'Garden é um projeto independente que usa LYNN Proxy. Sua convergência aos três pilares do Foundation ainda precisa ser definida.' },
  { label: 'A EXPERIÊNCIA DE CONSUMO', title: <>Uma wallet.<br /><em>Uma história de uso transparente.</em></>, text: 'Cada produto tem sua métrica. O uso gera débitos dos T-Coins contratados. As faixas se substituem e a faixa atingida passa a ser a recorrência até uma alteração elegível.', takeaway: 'Exemplo com dois Agentes Padrão. Garden não participa da simulação de consumo de T-Coins.' },
  { label: 'O PRÓXIMO CAPÍTULO', title: <>O portfólio se expande.<br /><em>A lógica permanece clara.</em></>, text: 'Novos produtos ampliam as razões para contratar as ofertas. OES poderá convergir para T-Coins. Para Garden, tanto o enquadramento comercial quanto a convergência arquitetural estão em discussão.', takeaway: 'Oferta, produto, construção sobre LYNN e consumo de T-Coins são conceitos distintos.' },
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
    {step === 1 && <div className="presentation-flow"><div className="presentation-flow-main"><Coin /><strong>Start + T-Coins</strong><span>Contratação expressa</span></div><ArrowRight size={24} /><div className="presentation-flow-small"><Store size={31} /><strong>Store</strong><span>Em construção</span></div></div>}
    {step === 2 && <div className="presentation-offers">{portfolio.map(item => <div className={`accent-${item.accent}`} key={item.id}><PortfolioIcon id={item.id} size={27} /><strong>{item.name}</strong><span>{item.id === 'garden' ? 'Produto · modelo a definir' : classificationLabel(item, 'current')}</span></div>)}<span>···</span></div>}
    {step === 4 && <div className="presentation-wallet"><div><Wallet size={22} /><span>WALLET DO CLIENTE</span></div><span className="micro">SALDO · EXEMPLO DIDÁTICO</span><strong>125 <small>T-Coins</small></strong><p>Start + Expansão 2</p><div className="presentation-ledger"><span><Coins size={16} />Créditos da oferta T-Coins</span><span>+350</span></div><div className="presentation-ledger"><span>Uso de dois Agentes Padrão</span><span>−225</span></div><small>Documentos + crédito · quantidades fictícias</small></div>}
    {step === 5 && <div className="presentation-future"><div><Layers3 size={30} /><strong>Portfólio sobre LYNN</strong><span>Padrão, OES e parceiros</span></div><span className="future-plus">+</span><div><Globe2 size={30} /><strong>Garden e outras soluções</strong><span>Integrações e modelos a definir</span></div><div className="presentation-future-wallet"><Wallet size={20} /><span>Novos produtos podem ampliar o consumo da oferta T-Coins</span></div></div>}
    </div></div><div className="presentation-takeaway"><Check size={19} /><p>{slide.takeaway}</p></div><div className="presentation-bottom"><span>Use <kbd>←</kbd> <kbd>→</kbd> para navegar · <kbd>Esc</kbd> para sair</span><div className="slide-dots" aria-label="Ir para uma etapa">{slides.map((item, i) => <button key={item.label} className={i === step ? 'selected' : ''} aria-label={`Etapa ${i + 1}: ${item.label}`} aria-current={i === step ? 'step' : undefined} onClick={() => setStep(i)} />)}</div><div><button className="icon-button" disabled={step === 0} onClick={() => setStep(step - 1)} aria-label="Slide anterior"><ArrowLeft size={20} /></button><button className="button primary" onClick={() => step === slides.length - 1 ? onClose() : setStep(step + 1)}>{step === slides.length - 1 ? 'Explorar o site' : 'Continuar'}<ArrowRight size={17} /></button></div></div></Modal>;
}
