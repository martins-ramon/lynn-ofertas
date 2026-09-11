import { describe, expect, it } from 'vitest';
import { activate, balance, closeCycle, getJourneyState, renewCycle, useCredits } from './wallet';
import { agents, commercialLabel, commercialModelFor, compositionCounts, constructionLabel, getPortfolioItem, portfolio, portfolioNature } from './catalog';

describe('cenários didáticos da wallet', () => {
  it('ativação não debita e não duplica agentes ativos', () => {
    const initial = getJourneyState(0);
    const activated = activate(activate(initial, 'Documentos · Padrão'), 'Documentos · Padrão');
    expect(balance(activated)).toBe(100);
    expect(activated.entries).toEqual(initial.entries);
    expect(activated.active).toEqual(['Documentos · Padrão']);
  });

  it('dois produtos Padrão consomem a mesma oferta T-Coins', () => {
    const wallet = getJourneyState(3);
    expect(balance(wallet)).toBe(15);
    expect(wallet.used).toBe(85);
    expect(wallet.entries.filter(entry => entry.type === 'debit')).toHaveLength(2);
  });

  it('troca faixa sem excedente intermediário e fatura só a faixa vigente', () => {
    const wallet = getJourneyState(6);
    expect(wallet.tier).toBe(2);
    expect(wallet.used).toBe(225);
    expect(balance(wallet)).toBe(125);
    expect(wallet.overage).toBe(0);
    expect(wallet.invoice).toEqual({ tier: 2, overage: 0 });
  });

  it('renova sem reduzir a recorrência nem apagar saldos e validades', () => {
    const wallet = getJourneyState(7);
    expect(balance(wallet)).toBe(475);
    expect(wallet.tier).toBe(2);
    expect(wallet.used).toBe(0);
    expect(wallet.lots.map(lot => lot.expires)).toEqual([181, 192, 198, 205]);
    expect(balance({ ...wallet, day: 199 })).toBe(350);
    expect(balance({ ...wallet, day: 205 })).toBe(0);
  });

  it('somente a última faixa admite excedente; consumo não é interrompido', () => {
    const initial = getJourneyState(0);
    const wallet = useCredits(initial, 540, 'Uso extraordinário', 'Exemplo');
    expect(wallet.tier).toBe(3);
    expect(wallet.overage).toBe(40);
    expect(balance(wallet)).toBe(0);
    expect(closeCycle(wallet).invoice).toEqual({ tier: 3, overage: 40 });
    expect(renewCycle(wallet, 25).overage).toBe(0);
    expect(balance(initial)).toBe(100);
  });

  it('não debita créditos expirados e rejeita consumo inválido', () => {
    const wallet = { ...getJourneyState(0), day: 182 };
    const used = useCredits(wallet, 20, 'Uso', 'Exemplo');
    expect(used.lots[0].remaining).toBe(100);
    expect(balance(used)).toBe(80);
    expect(() => useCredits(wallet, -1, '', '')).toThrow();
  });
});

describe('integridade editorial', () => {
  it('preserva inventário e distinção de origem dos materiais', () => {
    const standard = agents.filter(agent => agent.family === 'standard');
    expect(standard).toHaveLength(43);
    expect(new Set(standard.map(agent => agent.segment)).size).toBe(16);
    expect(agents.filter(agent => agent.family === 'specialists')).toHaveLength(10);
    expect(agents.filter(agent => agent.family === 'assistants')).toHaveLength(2);
    expect(new Set(agents.map(agent => agent.id)).size).toBe(agents.length);
  });
  it('mantém contratação própria OES hoje e convergência apenas prevista', () => {
    for (const id of ['specialists', 'custom', 'assistants'] as const) {
      expect(commercialLabel(getPortfolioItem(id), 'current')).toBe('Contratação própria');
      expect(commercialLabel(getPortfolioItem(id), 'future')).toContain('prevista');
      expect(portfolioNature(getPortfolioItem(id), 'current')).toBe('offer');
      expect(portfolioNature(getPortfolioItem(id), 'future')).toBe('product');
    }
  });
  it('não transforma Garden em oferta nem atribui T-Coins ou Foundation completo', () => {
    const garden = getPortfolioItem('garden');
    for (const vision of ['current', 'future'] as const) {
      expect(commercialModelFor(garden, vision)).toBe('undecided');
      expect(portfolioNature(garden, vision)).toBe('product');
      expect(commercialLabel(garden, vision)).toBe('Modelo a definir');
      expect(compositionCounts(['garden'], vision)).toEqual({ total: 1, tcoin: 0, own: 0, undecided: 1 });
    }
    expect(constructionLabel(garden, 'current')).toContain('LYNN Proxy');
    expect(constructionLabel(garden, 'future')).toContain('a definir');
  });
  it('classifica Padrão e parceiros como produtos; ofertas do meio são apenas OES hoje', () => {
    expect(getPortfolioItem('standard').name).toBe('Agentes Padrão');
    expect(portfolio.filter(item => portfolioNature(item, 'current') === 'offer').every(item => item.oes)).toBe(true);
    expect(compositionCounts(portfolio.map(item => item.id), 'current')).toEqual({ total: 6, tcoin: 2, own: 3, undecided: 1 });
    expect(compositionCounts(portfolio.map(item => item.id), 'future')).toEqual({ total: 6, tcoin: 5, own: 0, undecided: 1 });
  });
  it('a wallet demonstra exclusivamente produtos Padrão, sem cobrança de Garden ou OES', () => {
    for (let step = 0; step < 8; step++) {
      const wallet = getJourneyState(step);
      expect(wallet.active.every(name => name.includes('Padrão'))).toBe(true);
      expect(wallet.entries.filter(entry => entry.type === 'debit').every(entry => entry.label.includes('Padrão'))).toBe(true);
      expect(JSON.stringify(wallet)).not.toMatch(/Garden|Enterprise|OES/);
    }
  });
});
