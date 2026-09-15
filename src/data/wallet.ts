// All quantities, rates, allocation and thresholds below are teaching fixtures,
// not a pricing table or an implementation of TOTVS billing.
export const DEMO_CAPACITIES = [100, 200, 350, 500] as const;
export const tierName = (tier: number) => tier === 0 ? 'Somente Start' : `Start + Expansão ${tier}`;
export interface CreditLot { id: string; amount: number; remaining: number; day: number; expires: number }
export interface Entry { id: string; label: string; detail: string; amount: number; day: number; type: 'credit' | 'debit' | 'note' | 'overage' }
export interface Wallet {
  lots: CreditLot[];
  entries: Entry[];
  active: string[];
  tier: number;
  used: number;
  overage: number;
  day: number;
  invoice: { tier: number; overage: number } | null;
}
export const emptyWallet = (): Wallet => ({ lots: [], entries: [], active: [], tier: 0, used: 0, overage: 0, day: 0, invoice: null });
export const balance = (wallet: Wallet) => wallet.lots.filter(lot => lot.expires > wallet.day).reduce((sum, lot) => sum + lot.remaining, 0);

function addCredit(wallet: Wallet, amount: number, label: string): Wallet {
  const id = `credit-${wallet.entries.length}`;
  return { ...wallet,
    lots: [...wallet.lots, { id, amount, remaining: amount, day: wallet.day, expires: wallet.day + 180 }],
    entries: [...wallet.entries, { id, label, detail: `Validade: dia ${wallet.day + 180}`, amount, day: wallet.day, type: 'credit' }],
  };
}

export const activate = (wallet: Wallet, name: string): Wallet => ({ ...wallet, active: [...new Set([...wallet.active, name])] });

export function useCredits(original: Wallet, amount: number, label: string, detail: string): Wallet {
  if (!Number.isFinite(amount) || amount <= 0) throw new Error('O consumo deve ser positivo.');
  let wallet = { ...original, lots: original.lots.map(lot => ({ ...lot })), entries: [...original.entries] };
  // Teaching assumption: an upgrade tops up the difference between total capacities.
  while (balance(wallet) < amount && wallet.tier < DEMO_CAPACITIES.length - 1) {
    const oldTier = wallet.tier;
    wallet = { ...wallet, tier: oldTier + 1 };
    wallet = addCredit(wallet, DEMO_CAPACITIES[wallet.tier] - DEMO_CAPACITIES[oldTier], `Troca para Expansão ${wallet.tier}`);
  }
  let remaining = amount;
  // Teaching assumption: consume the soonest-expiring valid lot first.
  for (const lot of [...wallet.lots].sort((a, b) => a.expires - b.expires)) {
    if (lot.expires <= wallet.day) continue;
    const debit = Math.min(lot.remaining, remaining);
    lot.remaining -= debit;
    remaining -= debit;
  }
  wallet.entries.push({ id: `use-${wallet.entries.length}`, label, detail, amount: -amount, day: wallet.day, type: 'debit' });
  if (remaining > 0) wallet.entries.push({ id: `over-${wallet.entries.length}`, label: 'Excedente após a última faixa', detail: 'Cobrança unitária prevista; preço a definir.', amount: remaining, day: wallet.day, type: 'overage' });
  return { ...wallet, used: wallet.used + amount, overage: wallet.overage + remaining };
}

export function closeCycle(wallet: Wallet): Wallet {
  return { ...wallet, invoice: { tier: wallet.tier, overage: wallet.overage }, entries: [...wallet.entries, { id: `cut-${wallet.entries.length}`, label: 'Ciclo fechado', detail: `${tierName(wallet.tier)}. As faixas anteriores não se somam.`, amount: 0, day: wallet.day, type: 'note' }] };
}

export function renewCycle(wallet: Wallet, day: number): Wallet {
  return addCredit({ ...wallet, day, used: 0, overage: 0 }, DEMO_CAPACITIES[wallet.tier], `Renovação · ${tierName(wallet.tier)}`);
}

export const journey = [
  { title: 'Tudo começa com a Start.', short: 'Contratação', day: 'Dia 01', text: 'O cliente contrata a oferta T-Coins por meio da assinatura Start, com acesso e franquia inicial. Os produtos de IA entregam as capacidades que motivam essa contratação.', insight: 'Neste exemplo: 100 T-Coins na carteira. Os dois Agentes Padrão utilizados integram a oferta Agentes TOTVS.', focus: 'credit' },
  { title: 'Ativar é diferente de consumir.', short: 'Ativação', day: 'Dia 02', text: 'O cliente ativa dois Agentes Padrão: Documentos do Fluig e Liberação de crédito do Protheus. Habilitar os produtos, sozinho, não gera débito nesta demonstração.', insight: 'Este ciclo ilustra dois produtos dentro da oferta Agentes TOTVS. Os modelos de OES e das plataformas são apresentados na matriz Workflow Redesign.', focus: 'activation' },
  { title: 'O uso vira um débito visível.', short: 'Uso', day: 'Dia 05', text: 'O Agente de Documentos do Fluig processa quatro documentos. A métrica desse produto determina o consumo dos T-Coins contratados.', insight: 'Exemplo fictício: 4 documentos × 10 T-Coins = 40 T-Coins. Cada produto de IA tem sua própria métrica.', focus: 'debit' },
  { title: 'Uma carteira. Diferentes produtos.', short: 'Acompanhamento', day: 'Dia 10', text: 'O agente de Liberação de crédito do Protheus analisa três pedidos. O consumo sai da mesma wallet, e o cliente acompanha a aproximação do limite.', insight: '85% da franquia consumida neste exemplo. Alertas ajudam a antecipar a próxima faixa; percentuais finais estão a definir.', focus: 'alert' },
  { title: 'Sua operação cresce. A faixa acompanha.', short: 'Expansão', day: 'Dia 12', text: 'Mais cinco documentos ultrapassam a franquia. O modelo troca automaticamente para a próxima faixa, sem interromper o consumo no funcionamento normal descrito.', insight: 'A nova faixa vira a recorrência. Um pico pontual não faz o pacote voltar automaticamente no próximo mês.', focus: 'upgrade' },
  { title: 'Trocar não é somar pacotes.', short: 'Nova faixa', day: 'Dia 18', text: 'Seis novos pedidos levam à Expansão 2. Ela substitui a Expansão 1. O cliente segue usando os agentes e acompanha os movimentos na carteira.', insight: 'O exemplo complementa a diferença de créditos entre faixas. Essa alocação é uma hipótese didática, não uma regra final de billing.', focus: 'upgrade' },
  { title: 'O corte organiza a cobrança.', short: 'Fechamento', day: 'Dia 24', text: 'A faixa estabelecida no corte compõe a fatura posterior. A assinatura Start permanece, junto com o pacote vigente. O modelo descrito não tem pró-rata.', insight: 'Aqui: Start + Expansão 2. Não é Start + Expansão 1 + Expansão 2. Valores e calendário comercial ainda serão definidos.', focus: 'invoice' },
  { title: 'Novo ciclo. O saldo válido continua.', short: 'Renovação', day: 'Dia 25', text: 'A recorrência renova os créditos, que se somam ao saldo ainda válido. Cada entrada mantém sua própria validade de 180 dias.', insight: 'Os pacotes se substituem na cobrança. Os créditos ainda válidos podem se acumular na carteira.', focus: 'renewal' },
] as const;

export function getJourneyState(step: number): Wallet {
  let wallet = addCredit({ ...emptyWallet(), day: 1 }, 100, 'Franquia inicial · Start');
  if (step >= 1) wallet = activate(activate({ ...wallet, day: 2 }, 'Documentos · Fluig · Padrão'), 'Liberação de crédito · Protheus · Padrão');
  if (step >= 2) wallet = useCredits({ ...wallet, day: 5 }, 40, 'Documentos · Fluig · Padrão', '4 documentos × 10 T-Coins · fictício');
  if (step >= 3) wallet = useCredits({ ...wallet, day: 10 }, 45, 'Liberação de crédito · Protheus · Padrão', '3 pedidos × 15 T-Coins · fictício');
  if (step >= 4) wallet = useCredits({ ...wallet, day: 12 }, 50, 'Documentos · Fluig · Padrão', '5 documentos × 10 T-Coins · fictício');
  if (step >= 5) wallet = useCredits({ ...wallet, day: 18 }, 90, 'Liberação de crédito · Protheus · Padrão', '6 pedidos × 15 T-Coins · fictício');
  if (step >= 6) wallet = closeCycle({ ...wallet, day: 24 });
  if (step >= 7) wallet = renewCycle(wallet, 25);
  return wallet;
}

export const walletQuestions = [
  { question: 'E se eu ultrapassar a última faixa?', answer: 'O excedente unitário entra somente depois de esgotar a última faixa. Não há um pacote avulso de excedente entre faixas. O valor por T-Coin e a quantidade final de faixas ainda não foram definidos.' },
  { question: 'E se o aumento de consumo for pontual?', answer: 'A faixa atingida vira o novo padrão recorrente. Para reduzir, o cliente precisa solicitar a mudança; ela depende do consumo e da janela de corte. A reunião menciona atendimento CST, com o fluxo detalhado ainda a definir. Depois do corte, mudanças refletem no ciclo seguinte.' },
  { question: 'Posso começar em um pacote maior?', answer: 'Sim. O cliente pode contratar Start e escolher de saída um pacote de expansão adequado ao consumo que espera ter. A assinatura Start continua compondo a recorrência.' },
  { question: 'O que acontece com os créditos não utilizados?', answer: 'Os créditos válidos permanecem na carteira e se somam às novas entradas. Cada lote tem sua própria validade de 180 dias. O extrato conceitual destaca essas datas separadamente.' },
  { question: 'E se eu pedir o cancelamento?', answer: 'A reunião deixou em aberto o tratamento do consumo e de possíveis mudanças de faixa após o pedido de cancelamento. Não há neste material uma regra final de bloqueio, aviso prévio ou encerramento para simular.' },
];
