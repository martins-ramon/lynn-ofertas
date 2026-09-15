# LYNN — Ofertas e Produtos de IA TOTVS

Site interativo em português, preparado para Replit. A matriz Workflow Redesign organiza Agentes TOTVS, LYNN Enterprise e LYNN Garden, todas desenvolvidas a partir do Foundation. Inclui comparação por oferta e tela cheia, sete telas do Foundation, quatro telas do Garden, catálogo de 55 exemplos, laboratório de composição, wallet e apresentação executiva.

## Executar localmente

Requisito: **Node.js 22.12+** (recomendado: Node 22 atualizado).

```bash
npm ci
npm run dev
```

Abra `http://localhost:5000`. A aplicação escuta em `0.0.0.0`.

Se a porta 5000 estiver ocupada (por exemplo, pelo AirPlay no macOS), use `PORT=5173 npm run dev` e abra `http://localhost:5173`. Os testes usam uma porta isolada (4173).

## Hospedar no Replit

1. Importe o repositório ou envie os arquivos do projeto, incluindo `package-lock.json` e `.replit`.
2. Execute `npm ci` no Shell, caso as dependências não tenham sido instaladas automaticamente.
3. Clique em **Run** para abrir o ambiente de desenvolvimento na porta 5000.
4. Em **Publish / Deploy**, use o modo **Autoscale** com as configurações:
   - Build: `npm ci && npm run build`
   - Run: `npm start`
   - Porta local: `5000`, ou a porta fornecida na variável `PORT`.

O arquivo `.replit` já contém esses comandos. Não são necessários banco de dados, chaves de API, serviços externos nem secrets. A interface é uma experiência demonstrativa; não faz transações nem ativa agentes reais.

O servidor de produção (`server.mjs`) serve **somente `dist/`**, com suporte a `PORT` e escuta em `0.0.0.0`. As versões otimizadas das marcas, das sete telas do Foundation e das quatro telas do Garden ficam em `public/media/` e são publicadas. PDFs, textos e transcrições originais não são copiados ao build nem servidos pela aplicação de produção.

Também é possível usar hospedagem estática: execute o build e publique `dist/`.

## Build e verificações

```bash
npm run build
npm test
npx playwright install chromium
npm run test:e2e
```

Os testes unitários cobrem a wallet, a integridade do inventário e o enquadramento das três ofertas sobre o Foundation. Os testes de navegador validam os fluxos, as galerias, os diálogos e a acessibilidade em desktop e celular usando o servidor de produção. Execute um novo build antes de testar alterações na interface.

Para registrar imagens da interface durante os testes:

```bash
CAPTURE_UI=1 npm run test:e2e
```

As imagens ficam em `test-results/` (ignorado no Git).

## Onde editar

| Arquivo | Responsabilidade |
|---|---|
| `src/data/workflow.ts` | Conteúdo compartilhado da matriz Workflow Redesign |
| `src/data/catalog.ts` | Portfólio, Agentes Padrão, classificação oferta/produto, modelos comerciais e relação com LYNN |
| `src/data/garden.ts` | Quatro telas do protótipo Garden e suas legendas |
| `src/data/foundation.ts` | Definições dos pilares, sete telas de referência, destaques e habilitadores de IA |
| `src/data/wallet.ts` | Cenários e hipóteses da demonstração de consumo |
| `src/components/Ecosystem.tsx` | Seção Workflow Redesign e atalhos de consumo |
| `src/components/WorkflowMatrix.tsx` | Tabela acessível compartilhada com filtros e rolagem |
| `src/components/Overview.tsx` | Matriz em tela cheia, com filtros e acesso aos detalhes |
| `src/components/Brand.tsx` | Logos oficiais LYNN e TOTVS para fundos claros e escuros |
| `src/components/FoundationTour.tsx` | Exploração dos pilares, imagens com destaques, ampliação e zoom |
| `src/components/PortfolioDetails.tsx` | Painéis das ofertas e famílias, T-Coins, composição e fontes |
| `src/components/GardenDetails.tsx` | Posicionamento AI Orchestration e galeria do Garden |
| `src/components/ImageViewer.tsx` | Visualizador compartilhado das galerias, com zoom e navegação |
| `src/components/WalletJourney.tsx` | Jornada de consumo e extrato conceitual |
| `src/components/Catalog.tsx` | Busca e filtros por família, processo e produto |
| `src/components/Presentation.tsx` | Narrativa executiva de seis etapas |
| `src/styles.css`, `src/responsive.css`, `src/foundation.css` , `src/portfolio.css` e `src/workflow.css` | Identidade visual, marcas, taxonomia e adaptação de tela |
| `scripts/prepare-media.mjs` | Otimização explícita das marcas e telas aprovadas para a experiência |
| `server.mjs` e `.replit` | Execução em produção e Replit |

### Premissas editoriais

- A referência principal é `model-context/workflow-redesign.png`, versão digitada que complementa a foto `workflow-redesign.jpeg`. Ela substitui a taxonomia e a narrativa anteriores. Textos e capturas anteriores permanecem como referências de capacidades e exemplos.
- **Agentes TOTVS**: automação para ganho de produtividade, reunindo Produtos, OES e franquias; foco em SMB e operadores dos softwares.
- **LYNN Enterprise**: plataforma de Agent Engineering para engenheiros no mercado Mid / High.
- **LYNN Garden**: plataforma de AI Orchestration para usuários não técnicos, com IA governada para uso corporativo.
- Todas as ofertas são desenvolvidas a partir do **Foundation LYNN**, organizado em Builder, Governance e Layer.
- LYNN Enterprise é uma oferta de plataforma. Enterprise Layer é um pilar da base comum.
- Agentes TOTVS: OES por subscrição fixa de franquia de requisições, implantação e excedente; Agent Store por pacotes de T-Coins. Enterprise: subscrição por usuário + franquia mínima recorrente de requisições. Garden: franquia mínima recorrente por usuário.
- SAM de Agentes TOTVS: R$ 6,7 bi; SOM: 15%, correspondente a R$ 1,0 bi na matriz. Enterprise e Garden referenciam um percentual do SAM indicado no BP, sem especificá-lo.
- A wallet de T-Coins atravessa a matriz; o modelo de cada oferta deve seguir a transcrição confirmada do quadro. Não se deve deduzir valores ou regras a partir de materiais anteriores.
- A matriz e os painéis usam `src/data/workflow.ts` como fonte única. A versão digitada esclarece GTM, competidores, SAM / SOM, decisores e modelos comerciais. Questões abertas (API de modelo próprio e exclusividade de MCPs / APIs) são preservadas como questões.
- O inventário preserva 43 Agentes Padrão, 10 especialistas OES e dois assistentes. São exemplos dentro de Agentes TOTVS, com origem e estágio de cada material.
- Start, faixas e validade de 180 dias vêm da reunião de 09/09/2026 e são apresentados como uma demonstração específica, sem generalizar suas regras às plataformas.
- As capturas mostram interfaces de referência; o enquadramento das ofertas segue o Workflow Redesign.

### Marcas e telas

Os logos oficiais fornecidos são utilizados em componentes compartilhados. A versão clara TOTVS aparece em superfícies escuras; a versão escura aparece no cabeçalho claro da galeria. A arte LYNN mantém suas cores, proporções e fundo original. O ícone do navegador é um recorte do símbolo fornecido.

As sete capturas do Foundation são exploradas por pilar e visão, com destaques clicáveis. O painel Garden reúne suas quatro telas: conexões, criação de agentes, agentes do usuário e chat. O visualizador compartilhado permite ampliação, tamanho original, rolagem e navegação. Capturas e números do protótipo não comprovam disponibilidade comercial ou integração com a wallet.

As imagens otimizadas já estão em `public/media/`; o Replit não precisa processar os originais durante o build. Para regenerar após atualizar uma marca ou captura de referência:

```bash
npm run media:prepare
```

O script usa `sharp` e uma lista explícita de arquivos, cria WebP de tamanho original e prévias menores, remove apenas margens transparentes dos logos TOTVS e não altera os arquivos em `model-context/`. Ao adicionar capturas, atualize `src/data/foundation.ts` ou `src/data/garden.ts`.

### A simulação não é um motor comercial

O ciclo usa exclusivamente dois **Agentes Padrão**: Documentos do Fluig e Liberação de crédito do Protheus. Garden e OES não geram débitos no exemplo. Capacidades de 100/200/350/500 T-Coins, tarifas fictícias de 10 por documento e 15 por pedido, datas, complemento pela diferença de faixa e priorização do lote que vence primeiro são **hipóteses didáticas**. A validade de 180 dias vem da reunião. Preços e regras operacionais reais dependem de definição.

As simulações e escolhas são mantidas apenas em memória e reiniciam ao recarregar. Fontes tipográficas e ilustrações são locais; não há rastreamento nem chamadas para provedores de IA.

## Acessibilidade e apresentação

- Diálogos nativos com foco contido e fechamento por `Esc`.
- Busca e filtros rotulados; atualizações relevantes anunciadas por leitores de tela.
- Navegação da apresentação por `←` e `→`.
- Seleção dos pilares por teclado (`←`, `→`, `Home`, `End`), descrições alternativas das imagens e destaques com estado anunciado.
- Visualizador com `Esc`, telas anterior/próxima e região de imagem rolável pelo teclado quando ampliada.
- Animações respeitam a preferência `prefers-reduced-motion`.
- Jornada animada inicia apenas por ação do visitante e pode ser pausada.
- Layouts para desktop, tablet e celular; matriz comparativa com filtro de coluna para telas pequenas.
