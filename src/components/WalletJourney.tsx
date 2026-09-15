import { useEffect, useState } from 'react';
import { ArrowDownLeft, ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCheck, ChevronDown, Clock3, Coins, Info, Pause, Play, RefreshCw, Wallet as WalletIcon } from 'lucide-react';
import { balance, DEMO_CAPACITIES, getJourneyState, journey, tierName, walletQuestions } from '../data/wallet';
import { Coin, Modal, SectionHeading } from './Shared';

export default function WalletJourney() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [fullStatement, setFullStatement] = useState(false);
  const [assumptions, setAssumptions] = useState(false);
  const wallet = getJourneyState(step);
  const current = journey[step];
  const percentage = Math.min(100, Math.round(wallet.used / DEMO_CAPACITIES[wallet.tier] * 100));
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (step < journey.length - 1) setStep(step + 1);
      else setPlaying(false);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [playing, step]);

  const navigate = (next: number) => { setStep(next); setPlaying(false); };
  const entries = [...wallet.entries].reverse();
  return <section className="wallet-section" id="wallet" aria-labelledby="wallet-title"><div className="section-shell">
    <SectionHeading index="03" eyebrow="DO TRABALHO REALIZADO AO CONSUMO" title={<span id="wallet-title">O uso acontece.<br /><span className="muted-heading">A carteira conta a história.</span></span>} text="Acompanhe um ciclo fictício e veja tarefas, consumo de T-Coins e expansão se conectarem.">
      <button className={`button outline watch-button ${playing ? 'playing' : ''}`} onClick={() => { if (!playing && step === journey.length - 1) setStep(0); setPlaying(!playing); }}>{playing ? <Pause size={15} /> : <Play size={15} />}{playing ? 'Pausar jornada' : 'Assistir à jornada'}</button>
    </SectionHeading>
    <div className="taas-explainer"><div><span className="micro">TaaS · TASK AS A SERVICE</span><h3>O produto executa. A oferta é consumida.</h3><p>A volumetria e a métrica do produto de IA orientam o consumo de T-Coins no Agent Store. Start e faixas organizam os créditos neste exemplo da oferta Agentes TOTVS. A matriz apresenta os modelos das três ofertas.</p></div><ol><li><CheckCheck size={21} /><span>Produto executa a tarefa</span></li><li><Coins size={21} /><span>Uso é medido</span></li><li><WalletIcon size={21} /><span>T-Coins são debitados</span></li></ol></div>
    <div className="simulation-label"><span className="tiny-dot" />SIMULAÇÃO DIDÁTICA<span>Quantidades, métricas e datas fictícias</span><button onClick={() => setAssumptions(true)}><Info size={13} />Entenda as hipóteses</button></div>
    <div className="journey-timeline" aria-label="Etapas da jornada">{journey.map((item, i) => <button key={item.short} className={`${i === step ? 'current' : ''} ${i < step ? 'passed' : ''}`} aria-current={i === step ? 'step' : undefined} onClick={() => navigate(i)}><span className="step-marker">{i < step ? <Check size={12} /> : String(i + 1).padStart(2, '0')}</span><span>{item.short}</span></button>)}</div>
    <div className="journey-stage">
      <div className="journey-story" aria-live="polite" aria-atomic="true"><div className="story-inner" key={step}><div className="story-index"><span>{String(step + 1).padStart(2, '0')}</span><div><span className="micro">{current.short}</span><span><CalendarDays size={12} />{current.day} · exemplo</span></div></div><h3>{current.title}</h3><p>{current.text}</p><div className="story-insight"><span className="insight-line" /><p>{current.insight}</p></div></div>
        <div className="journey-navigation"><button className="icon-button" disabled={step === 0} onClick={() => navigate(step - 1)} aria-label="Etapa anterior"><ArrowLeft size={19} /></button><span>{step + 1}<span> / {journey.length}</span></span><button className="button primary" onClick={() => navigate(step === journey.length - 1 ? 0 : step + 1)}>{step === journey.length - 1 ? 'Recomeçar' : 'Próximo momento'}{step === journey.length - 1 ? <RefreshCw size={16} /> : <ArrowRight size={16} />}</button></div>
      </div>
      <div className={`wallet-demo focus-${current.focus}`}>
        <div className="wallet-demo-header"><span><WalletIcon size={18} />Minha wallet</span><span className="micro">EXEMPLO ILUSTRATIVO</span><span className="wallet-avatar">T</span></div>
        <div className="wallet-balance"><div><span className="micro">SALDO DISPONÍVEL</span><div className="balance-number" key={balance(wallet)}>{balance(wallet).toLocaleString('pt-BR')}<span>T-Coins</span></div><span className="balance-subtitle">Créditos válidos na sua carteira</span></div><div className="coin-display"><Coin /></div></div>
        <div className="wallet-plan"><div><span className="micro">RECORRÊNCIA DO EXEMPLO</span><strong key={wallet.tier}>{tierName(wallet.tier)}<span className="plan-dot" /></strong></div><span>{DEMO_CAPACITIES[wallet.tier]}<small>T-Coins / ciclo</small></span></div>
        <div className="usage-progress"><div><span>{wallet.used} T-Coins utilizados neste ciclo</span><strong>{percentage}%</strong></div><div className="progress-track" role="progressbar" aria-label="Consumo da franquia do ciclo ilustrativo" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}><span style={{ width: `${percentage}%` }} /></div>{step === 3 && <div className="usage-alert"><Info size={13} />Seu consumo está próximo da próxima faixa.</div>}</div>
        {step === 1 && <div className="activation-notice"><Check size={15} /><span>2 agentes habilitados · <strong>0 T-Coins debitados na ativação</strong></span></div>}
        {step === 6 && <div className="invoice-notice"><Check size={16} /><div><strong>Composição da fatura</strong><span>Assinatura Start + Expansão 2</span><small>A Expansão 1 foi substituída. Sem pró-rata.</small></div></div>}
        <div className="statement-title"><span>Movimentações</span><span>Dia {String(wallet.day).padStart(2, '0')} do exemplo</span></div>
        <div className={`statement ${fullStatement ? 'full-statement' : ''}`} aria-label="Movimentações da carteira">{(fullStatement ? entries : entries.slice(0, 3)).map(entry => <div className={`statement-entry entry-${entry.type}`} key={entry.id}><span className="entry-icon">{entry.type === 'credit' ? <ArrowDownLeft size={16} /> : entry.type === 'note' ? <Check size={16} /> : <ArrowUpRight size={16} />}</span><div><strong>{entry.label}</strong><span>{entry.detail}</span></div><span className="entry-value">{entry.type === 'note' ? '—' : `${entry.amount > 0 ? '+' : '−'}${Math.abs(entry.amount)}`}<small>{entry.type !== 'note' && 'T-Coins'}</small></span></div>)}</div>
        {entries.length > 3 && <button className="statement-toggle" onClick={() => setFullStatement(!fullStatement)}>{fullStatement ? 'Resumir extrato' : `Ver as ${entries.length} movimentações`}<ChevronDown size={13} className={fullStatement ? 'rotate' : ''} /></button>}
        {step === 7 && <div className="credit-lots"><span className="micro"><Clock3 size={12} />CADA ENTRADA TEM SEU ANIVERSÁRIO</span>{wallet.lots.filter(lot => lot.remaining > 0).map(lot => <div key={lot.id}><span>{lot.remaining} T-Coins restantes</span><span>Vencem no dia {lot.expires}</span></div>)}</div>}
        <div className="wallet-demo-footer"><span className="status-dot" />Extrato conceitual · sem conexão com contas reais</div>
      </div>
    </div>
    <div className="wallet-principles"><div><span>01</span><p><strong>Uma oferta, diferentes produtos.</strong> Cada produto de IA tem sua métrica de consumo.</p></div><div><span>02</span><p><strong>Faixas que se substituem.</strong> Não há soma de pacotes na fatura.</p></div><div><span>03</span><p><strong>Créditos com validade própria.</strong> Saldo válido acompanha o cliente.</p></div></div>
    <div className="questions-block"><div><span className="micro">OS DETALHES FAZEM DIFERENÇA</span><h3>E se…?</h3><p>Explore as situações que ajudam a entender o modelo.</p></div><div className="questions-list">{walletQuestions.map(item => <details key={item.question}><summary>{item.question}<PlusIcon /></summary><p>{item.answer}</p></details>)}</div></div>
    {assumptions && <Modal titleId="assumptions-title" onClose={() => setAssumptions(false)}><span className="eyebrow">COMO LER A DEMONSTRAÇÃO</span><h2 id="assumptions-title">Um exemplo para entender.<br />Não uma tabela comercial.</h2><p className="modal-lead">O ciclo ilustra a reunião de 09/09/2026, com dois produtos da família Agentes Padrão. Os números são fictícios.</p><ul className="detail-list"><li>Start com 100 T-Coins; capacidades totais de 200, 350 e 500 T-Coins nas faixas fictícias, incluindo a franquia Start.</li><li>Documentos do Fluig a 10 T-Coins por documento e Liberação de crédito do Protheus a 15 por pedido. Métricas e tarifas reais ainda a definir.</li><li>Na demonstração, a troca complementa a diferença de créditos entre faixas, e o lote válido que vence primeiro é consumido primeiro. São hipóteses ilustrativas.</li><li>Os dias de corte e renovação são fictícios. A validade de 180 dias por entrada vem da reunião.</li><li>Regras detalhadas de redução, cancelamento, preços, alertas e alocação de saldo na troca dependem de definição.</li><li>O ciclo demonstra apenas dois Agentes Padrão, dentro de Agentes TOTVS. Não simula a contratação de OES, LYNN Enterprise ou LYNN Garden.</li></ul><div className="source-note">Transcrição de 09/09/2026, 00:00:00–00:33:10; matriz Workflow Redesign para o posicionamento das ofertas. O extrato visual foi descrito como em desenvolvimento.</div></Modal>}
  </div></section>;
}

function PlusIcon() { return <span className="question-plus" aria-hidden="true">+</span>; }
