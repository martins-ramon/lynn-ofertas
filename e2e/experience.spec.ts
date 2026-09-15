import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
});

test('matriz compara as três ofertas e abre as famílias de Agentes TOTVS', async ({ page }) => {
  const map = page.locator('#ecossistema');
  const table = map.getByRole('table');
  await expect(table.getByRole('button')).toHaveCount(3);
  await expect(table).toContainText('Redução do TCO');
  await expect(table).toContainText('SOM: 15% → R$ 1,0 bi');
  await expect(table).toContainText('Subscrição por usuário + franquia recorrente mínima de requisições.');
  await expect(table).not.toContainText('Transcrição em confirmação');
  await expect(map.locator('.workflow-foundation')).toContainText('Base comum de todas as ofertas');
  await expect(table.getByRole('rowheader')).toHaveText(['Oferta', 'Categoria', 'Proposta de valor', 'SAM / SOM', 'Mercado / persona / decisor', 'Atributos e diferenciais', 'Competidores', 'GTM · Q1 2027', 'Modelo comercial']);
  await map.locator('.workflow-filters').getByRole('button', { name: 'LYNN Enterprise', exact: true }).click();
  await expect(table.getByRole('button')).toHaveCount(1);
  await expect(table).toContainText('Agent Engineering');
  await map.locator('.workflow-filters').getByRole('button', { name: 'Todas', exact: true }).click();
  await table.getByRole('button', { name: 'Agentes TOTVS', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('button', { name: /Agentes Especialistas/ }).click();
  await expect(dialog.getByRole('heading', { name: 'Agentes Especialistas', exact: true })).toBeVisible();
  await expect(dialog.locator('.detail-facts')).toContainText('Foundation LYNN');
  await page.keyboard.press('Escape');
  await map.getByRole('button', { name: /Store/ }).click();
  await dialog.getByRole('switch', { name: 'Incluir exemplo Agentes Especialistas', exact: true }).click();
  await expect(dialog.locator('.store-lab-summary > div').first()).toContainText('1');
  await expect(dialog.locator('.store-lab-summary > div').nth(1)).toContainText('1');
  await dialog.getByRole('switch', { name: 'Remover exemplo Agentes Especialistas', exact: true }).click();
  await expect(dialog.locator('.store-lab-summary > div').first()).toContainText('0');
});

test('jornada separa ativação, consumo, substituição e saldo acumulado', async ({ page }) => {
  const wallet = page.locator('#wallet');
  const next = wallet.getByRole('button', { name: 'Próximo momento' });
  await next.click();
  await expect(wallet.locator('.balance-number')).toHaveText('100T-Coins');
  await expect(wallet.locator('.activation-notice')).toContainText('0 T-Coins debitados');
  await next.click();
  await expect(wallet.locator('.balance-number')).toHaveText('60T-Coins');
  await next.click();
  await expect(wallet.locator('.usage-alert')).toBeVisible();
  await next.click();
  await expect(wallet.locator('.wallet-plan')).toContainText('Start + Expansão 1');
  await next.click();
  await expect(wallet.locator('.balance-number')).toHaveText('125T-Coins');
  await next.click();
  await expect(wallet.locator('.invoice-notice')).toContainText('Assinatura Start + Expansão 2');
  await next.click();
  await expect(wallet.locator('.balance-number')).toHaveText('475T-Coins');
  await expect(wallet.locator('.credit-lots')).toContainText('Vencem no dia 198');
  await wallet.getByRole('button', { name: /Ver as 9 movimentações/ }).click();
  await expect(wallet.locator('.statement-entry')).toHaveCount(9);
  await expect(wallet.locator('.statement')).not.toContainText('Garden');
  await expect(wallet.locator('.statement')).toContainText('Documentos · Fluig · Padrão');
  await expect(wallet.locator('.statement')).toContainText('Liberação de crédito · Protheus · Padrão');
  await wallet.getByRole('button', { name: 'Entenda as hipóteses' }).click();
  await expect(page.getByRole('dialog')).toContainText('hipóteses ilustrativas');
  await page.keyboard.press('Escape');
  await wallet.getByRole('button', { name: 'Recomeçar' }).click();
  await expect(wallet.locator('.balance-number')).toHaveText('100T-Coins');
});

test('catálogo combina busca sem acentos com filtros e abre detalhes', async ({ page }) => {
  const catalog = page.locator('#ofertas');
  await catalog.getByRole('button', { name: 'Especialistas OES 10' }).click();
  await expect(catalog.getByRole('status')).toHaveText('10 possibilidades encontradas');
  await catalog.getByLabel('Buscar agente, processo ou produto').fill('classificacao');
  await expect(catalog.locator('.agent-card')).toHaveCount(1);
  await catalog.locator('.agent-card').click();
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Classificação de Notas', exact: true })).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('página 1');
  await page.getByRole('button', { name: 'Fechar painel' }).click();
  await catalog.getByLabel('Buscar agente, processo ou produto').fill('nenhuma-correspondencia');
  await expect(catalog.locator('.empty-results')).toBeVisible();
  await catalog.getByRole('button', { name: 'Limpar filtros' }).click();
  await expect(catalog.getByRole('status')).toContainText('55');
  await catalog.getByLabel('Produto ou ERP').selectOption('Protheus');
  await catalog.getByLabel('Buscar agente, processo ou produto').fill('credito');
  await expect(catalog.locator('.agent-card')).toHaveCount(1);
  await expect(catalog.locator('.agent-card h3')).toHaveText('Liberação de crédito inteligente');
});

test('apresentação navega por teclado e devolve o foco ao sair', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Apresentar', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('#presentation-title')).toContainText('Um foundation.');
  await expect(dialog.getByRole('button', { name: 'Continuar', exact: true })).toBeInViewport();
  for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('#presentation-title')).toContainText('Uma estratégia comum.');
  await expect(dialog.getByRole('button', { name: 'Explorar o site', exact: true })).toBeInViewport();
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.locator('#presentation-title')).toContainText('Uma wallet.');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('matriz em tela cheia mantém conteúdo, filtros, acesso aos detalhes e foco', async ({ page }, testInfo) => {
  const trigger = page.getByRole('button', { name: 'Ver matriz em tela cheia' });
  const originalRows = await page.locator('#ecossistema tbody').innerText();
  await trigger.click();
  const dialog = page.locator('.workflow-modal');
  await expect(dialog.getByRole('heading', { name: 'Workflow Redesign', exact: true })).toBeVisible();
  expect(await dialog.locator('tbody').innerText()).toBe(originalRows);
  await dialog.locator('.workflow-filters').getByRole('button', { name: 'LYNN Garden', exact: true }).click();
  await expect(dialog.getByRole('table').getByRole('button')).toHaveCount(1);
  await expect(dialog.getByRole('table')).toContainText('AI Orchestration');
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.failureSummary) }))).toEqual([]);
  if (process.env.CAPTURE_UI) await page.screenshot({ path: testInfo.outputPath('overview.png') });
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('table').getByRole('button', { name: 'LYNN Enterprise', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(1);
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'LYNN Enterprise', exact: true })).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('Agent Engineering');
});

test('Garden apresenta AI Orchestration sobre Foundation e preserva as quatro telas', async ({ page }, testInfo) => {
  await page.locator('#ecossistema table').getByRole('button', { name: 'LYNN Garden', exact: true }).click();
  const details = page.locator('.detail-modal');
  await expect(details.getByRole('heading', { name: 'LYNN Garden', exact: true })).toBeVisible();
  await expect(details.locator('.detail-facts')).toContainText('Foundation LYNN');
  await expect(details).toContainText('AI Orchestration');
  await expect(details.locator('.garden-decisions')).toContainText('Franquia mínima recorrente por usuário');
  const picture = details.locator('.garden-screen-open img');
  for (const tab of ['Conexões', 'Criar agente', 'Meus agentes', 'Chat']) {
    await details.getByRole('button', { name: tab, exact: true }).click();
    await picture.scrollIntoViewIfNeeded();
    await expect.poll(() => picture.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  }
  // Capture the viewport: an element taller than a native dialog is clipped by
  // its scroll container and cannot be captured reliably as a full element.
  if (process.env.CAPTURE_UI) await page.screenshot({ path: testInfo.outputPath('garden-details.png') });
  await details.getByRole('button', { name: 'Ampliar tela: LYNN Garden · Chat', exact: true }).click();
  const viewer = page.locator('.product-lightbox');
  await expect(viewer.getByRole('heading', { name: 'LYNN Garden · Chat', exact: true })).toBeVisible();
  await viewer.getByRole('button', { name: 'Ver tamanho original' }).click();
  await expect.poll(() => viewer.locator('img.image-original-size').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth === 2920)).toBe(true);
  await viewer.getByRole('button', { name: 'Ajustar à tela' }).click();
  await viewer.getByRole('button', { name: 'Tela anterior' }).click();
  await expect(viewer.getByRole('heading', { name: 'LYNN Garden · Agentes do usuário' })).toBeVisible();
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations.map(item => ({ rule: item.id, nodes: item.nodes.map(node => node.failureSummary) }))).toEqual([]);
  if (process.env.CAPTURE_UI) await page.screenshot({ path: testInfo.outputPath('garden-viewer.png') });
  await page.keyboard.press('Escape');
  await expect(viewer).toHaveCount(0);
  await expect(details).toBeVisible();
  await expect(details.getByRole('button', { name: /Ampliar tela: LYNN Garden/ })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('#ecossistema table').getByRole('button', { name: 'LYNN Garden', exact: true })).toBeFocused();
  await expect(page.getByText('Agentes Enterprise', { exact: true })).toHaveCount(0);
});

test('layout sem overflow, sem erros e recursos locais em produção', async ({ page, request }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.reload();
  await page.evaluate(() => document.fonts.ready);
  const widths = testInfo.project.name === 'desktop' ? [1440, 1024, 768] : [390, 360, 320];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 960 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
  expect((await request.get('/model-context/transcricao_modelo_oferta.md')).status()).toBe(404);
  expect((await request.get('/assets/missing.js')).status()).toBe(404);
  expect((await request.get('/', { headers: { Host: 'exemplo.replit.app' } })).status()).toBe(200);
  if (process.env.CAPTURE_UI) {
    await page.setViewportSize(testInfo.project.name === 'desktop' ? { width: 1440, height: 960 } : { width: 390, height: 844 });
    await page.screenshot({ path: testInfo.outputPath('hero.png') });
    const style = '.site-header, .skip-link { visibility: hidden !important; }';
    await page.locator('#ecossistema').screenshot({ path: testInfo.outputPath('map.png'), style });
    await page.locator('#foundation').screenshot({ path: testInfo.outputPath('foundation.png'), style });
    await page.locator('#wallet').screenshot({ path: testInfo.outputPath('wallet.png'), style });
    await page.locator('#ofertas').screenshot({ path: testInfo.outputPath('catalog.png'), style });
  }
});

test('telas do Foundation conectam pilares, destaques e visualização ampliada', async ({ page, request }, testInfo) => {
  const tour = page.locator('#foundation');
  await tour.scrollIntoViewIfNeeded();
  const picture = tour.locator('.product-screen-image > img');
  const pictureReady = async () => expect.poll(() => picture.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  await pictureReady();
  await tour.getByRole('button', { name: 'Na imagem: Experimente a interação' }).click();
  await expect(tour.locator('.screen-explanation')).toContainText('testar o comportamento');
  for (const name of ['Instruções', 'Manifesto', 'Diagrama']) {
    await tour.getByRole('button', { name, exact: true }).click();
    await pictureReady();
  }
  await tour.getByRole('tab', { name: /Agent Builder/ }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(tour.getByRole('tab', { name: /Enterprise Layer/ })).toHaveAttribute('aria-selected', 'true');
  await pictureReady();
  await tour.getByRole('button', { name: 'Tarefas', exact: true }).click();
  await pictureReady();
  await tour.getByRole('tab', { name: /Governance/ }).click();
  await pictureReady();
  await tour.getByRole('button', { name: 'Projeto', exact: true }).click();
  await pictureReady();
  await expect(tour.locator('.screen-reference')).toContainText('modelo comercial independente');
  await tour.getByRole('button', { name: /Ampliar tela/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'Administração · Detalhes do projeto de agentes' })).toBeVisible();
  await expect.poll(() => dialog.locator('.product-lightbox-viewer img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth === 1920)).toBe(true);
  await dialog.getByRole('button', { name: 'Ver tamanho original' }).click();
  await expect(dialog.locator('.product-lightbox-viewer img')).toHaveClass('image-original-size');
  await dialog.getByRole('button', { name: 'Tela anterior' }).click();
  await expect(dialog.getByRole('heading', { name: 'Administração · Agentes e permissões' })).toBeVisible();
  await expect(dialog.locator('.product-lightbox-viewer img')).toHaveClass('image-fit');
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations.map(item => ({ rule: item.id, nodes: item.nodes.map(node => node.failureSummary) }))).toEqual([]);
  if (process.env.CAPTURE_UI) await page.screenshot({ path: testInfo.outputPath('foundation-lightbox.png') });
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(tour.getByRole('button', { name: /Ampliar tela/ })).toBeFocused();
  await tour.locator('.enablers-grid summary').filter({ hasText: 'Dados e sistemas' }).click();
  await expect(tour.locator('.enablers-grid details[open]')).toContainText('sistemas atualizados');
  expect((await request.get('/media/admin-agents.webp')).headers()['content-type']).toBe('image/webp');
  for (const image of await page.locator('.official-totvs, .official-lynn').all()) {
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
});

test('contraste e semântica acessíveis na página e nos painéis', async ({ page }, testInfo) => {
  const scan = async () => {
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.map(item => ({ rule: item.id, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) }))).toEqual([]);
  };
  await scan();
  await page.locator('#ecossistema .commerce-card').filter({ hasText: 'Store' }).click();
  await scan();
  if (process.env.CAPTURE_UI) await page.getByRole('dialog').screenshot({ path: testInfo.outputPath('store.png') });
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Apresentar', exact: true }).click();
  await scan();
  if (process.env.CAPTURE_UI) await page.screenshot({ path: testInfo.outputPath('presentation.png') });
});
