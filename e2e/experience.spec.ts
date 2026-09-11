import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
});

test('mapa distingue ofertas de produtos e mantém Garden com modelo a definir', async ({ page }) => {
  const map = page.locator('#ecossistema');
  await expect(map.locator('.own-model')).toHaveCount(3);
  await expect(map.getByRole('heading', { name: 'Ofertas e Produtos de IA', exact: true })).toBeVisible();
  await expect(map.locator('.foundation-backed-portfolio')).not.toContainText('LYNN Garden');
  await expect(map.locator('.garden-map-card')).toContainText('Modelo a definir');
  await map.locator('.offer-card').filter({ hasText: 'Agentes Especialistas' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'Agentes Especialistas', exact: true })).toBeVisible();
  await expect(dialog.locator('.detail-facts')).toContainText('Foundation LYNN');
  await expect(dialog.locator('.detail-facts')).toContainText('Contratação própria');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await map.getByRole('button', { name: /ATIVAÇÃO Store/ }).click();
  await dialog.getByRole('switch', { name: 'Incluir exemplo Agentes Especialistas', exact: true }).click();
  await expect(dialog.locator('.store-lab-summary > div').nth(1)).toContainText('0');
  await expect(dialog.locator('.store-lab-summary > div').nth(2)).toContainText('1');
  await dialog.getByRole('switch', { name: 'Remover exemplo Agentes Especialistas', exact: true }).click();
  await expect(dialog.locator('.store-lab-summary > div').first()).toContainText('0');
  await dialog.getByRole('switch', { name: 'Incluir exemplo LYNN Garden', exact: true }).click();
  await expect(dialog.locator('.store-lab-summary > div').nth(1)).toContainText('0');
  await expect(dialog.locator('.store-lab-summary > div').nth(2)).toContainText('0');
  await expect(dialog.locator('.store-lab-summary > div').nth(3)).toContainText('1');
  await dialog.getByRole('button', { name: 'Fechar painel' }).click();
  await map.getByRole('button', { name: 'Visão de evolução' }).click();
  await expect(map.locator('.own-model')).toHaveCount(0);
  await expect(map.locator('.offer-card .model-badge').filter({ hasText: 'convergência prevista' })).toHaveCount(3);
  await expect(map.locator('.garden-map-card')).toContainText('Modelo a definir');
  await map.getByRole('button', { name: /ATIVAÇÃO Store/ }).click();
  await dialog.getByRole('switch', { name: 'Incluir exemplo LYNN Garden', exact: true }).click();
  await expect(dialog.locator('.store-lab-summary > div').nth(1)).toContainText('0');
  await expect(dialog.locator('.store-lab-summary > div').nth(3)).toContainText('1');
  await dialog.getByRole('button', { name: 'Fechar painel', exact: true }).click();
  await expect(map.locator('.external-connection')).toBeVisible();
  await map.getByRole('button', { name: /E o próximo capítulo/ }).click();
  await expect(map.getByRole('heading', { name: 'Builder para o cliente' })).toBeVisible();
  await map.getByRole('button', { name: 'Criar Agent Builder' }).click();
  await expect(map.locator('.foundation-detail')).toContainText('conceber, construir e orquestrar');
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
  await expect(dialog.locator('#presentation-title')).toContainText('Uma base.');
  await expect(dialog.getByRole('button', { name: 'Continuar', exact: true })).toBeInViewport();
  for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('#presentation-title')).toContainText('O portfólio se expande.');
  await expect(dialog.getByRole('button', { name: 'Explorar o site', exact: true })).toBeInViewport();
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.locator('#presentation-title')).toContainText('Uma wallet.');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('mapa de tela cheia conecta as três camadas e abre o portfólio', async ({ page }, testInfo) => {
  await page.getByRole('button', { name: 'Ver mapa em tela cheia' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'Ofertas para contratar. Produtos para utilizar.' })).toBeVisible();
  await expect(dialog.locator('.overview-label').nth(1)).toContainText('Ofertas e Produtos de IA');
  await expect(dialog.locator('.overview-garden')).toContainText('independente · LYNN Proxy');
  await expect(dialog.locator('.overview-garden')).toContainText('Modelo a definir');
  if (testInfo.project.name === 'desktop') {
    for (const viewport of [{ width: 1440, height: 960 }, { width: 1366, height: 768 }]) {
      await page.setViewportSize(viewport);
      await expect(dialog.locator('.overview-commerce')).toBeInViewport({ ratio: 1 });
      await expect(dialog.locator('.overview-foundation')).toBeInViewport({ ratio: 1 });
    }
  }
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations.map(item => item.id)).toEqual([]);
  await dialog.getByRole('button', { name: 'Visão de evolução' }).click();
  await expect(dialog.locator('.overview-external')).toBeVisible();
  if (process.env.CAPTURE_UI) await page.screenshot({ path: testInfo.outputPath('overview.png') });
  await dialog.getByRole('button', { name: /Agentes Personalizados/ }).click();
  await expect(page.getByRole('dialog')).toHaveCount(1);
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Agentes Personalizados', exact: true })).toBeVisible();
});

test('Garden mostra quatro telas sem afirmar oferta própria, T-Coins ou Foundation completo', async ({ page }, testInfo) => {
  await page.locator('.garden-map-card').click();
  const details = page.locator('.detail-modal');
  await expect(details.getByRole('heading', { name: 'LYNN Garden', exact: true })).toBeVisible();
  await expect(details.locator('.detail-facts')).toContainText('Independente · usa LYNN Proxy');
  await expect(details.locator('.detail-facts')).toContainText('Modelo a definir');
  await expect(details.locator('.garden-decisions')).toContainText('OpenAI Agents SDK');
  await expect(details.locator('.garden-decisions')).toContainText('não equivale à construção sobre os três pilares');
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
  await expect(page.locator('.garden-map-card')).toBeFocused();
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
