# LYNN — Ofertas e Produtos de IA TOTVS

Site interativo em português, preparado para Replit. Distingue ofertas comercializáveis (T-Coins e soluções OES com modelo próprio) dos produtos de IA que dão valor à contratação de T-Coins. Inclui mapa de três camadas, perspectivas atual/futura, marcas oficiais, sete telas do Foundation, quatro telas do Garden, catálogo, laboratório de composição, wallet e apresentação executiva.

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

Os testes unitários cobrem a wallet, a taxonomia oferta/produto, o modelo indefinido do Garden em ambas as perspectivas e a exclusão de Garden/OES dos débitos simulados. Os testes de navegador validam os fluxos, as galerias, os diálogos e a acessibilidade em desktop e celular usando o servidor de produção. Execute um novo build antes de testar alterações na interface.

Para registrar imagens da interface durante os testes:

```bash
CAPTURE_UI=1 npm run test:e2e
```

As imagens ficam em `test-results/` (ignorado no Git).

## Onde editar

| Arquivo | Responsabilidade |
|---|---|
| `src/data/catalog.ts` | Portfólio, Agentes Padrão, classificação oferta/produto, modelos comerciais e relação com LYNN |
| `src/data/garden.ts` | Quatro telas do protótipo Garden e suas legendas |
| `src/data/foundation.ts` | Definições dos pilares, sete telas de referência, destaques e habilitadores de IA |
| `src/data/wallet.ts` | Cenários e hipóteses da demonstração de consumo |
| `src/components/Ecosystem.tsx` | Mapa de três camadas e perspectivas atual/futura |
| `src/components/Overview.tsx` | Visão resumida das três camadas em uma tela no desktop |
| `src/components/Brand.tsx` | Logos oficiais LYNN e TOTVS para fundos claros e escuros |
| `src/components/FoundationTour.tsx` | Exploração dos pilares, imagens com destaques, ampliação e zoom |
| `src/components/PortfolioDetails.tsx` | Painéis do portfólio, oferta T-Coins, composição e fontes |
| `src/components/GardenDetails.tsx` | Contexto e galeria do Garden, com modelo e convergência a definir |
| `src/components/ImageViewer.tsx` | Visualizador compartilhado das galerias, com zoom e navegação |
| `src/components/WalletJourney.tsx` | Jornada de consumo e extrato conceitual |
| `src/components/Catalog.tsx` | Busca e filtros por família, processo e produto |
| `src/components/Presentation.tsx` | Narrativa executiva de seis etapas |
| `src/styles.css`, `src/responsive.css`, `src/foundation.css` e `src/portfolio.css` | Identidade visual, marcas, taxonomia e adaptação de tela |
| `scripts/prepare-media.mjs` | Otimização explícita das marcas e telas aprovadas para a experiência |
| `server.mjs` e `.replit` | Execução em produção e Replit |

### Premissas editoriais

- **Oferta** é o que pode ser comercializado. As ofertas efetivas hoje são **T-Coins** e as soluções de **OES com modelo próprio**. Start e expansão estruturam a contratação da oferta T-Coins.
- **Agentes Padrão** (time de Produtos) e agentes de parceiros/franquias são **produtos de IA**. Entregam capacidades e dão razões para contratar e consumir a oferta T-Coins; não são tratados como ofertas isoladas.
- A camada intermediária chama-se **Ofertas e Produtos de IA**. As categorias não são determinadas apenas por nome, interface ou existência de agentes.
- **Garden é um produto com modelo comercial a definir**: T-Coins ou comercialização própria. Permanece indefinido tanto no modelo atual quanto na perspectiva futura, sem ser contado como oferta própria ou consumidor de T-Coins.
- **Garden é um projeto independente**, com OpenAI Agents SDK e uso de LYNN Proxy para acesso aos modelos. Sua convergência ao Foundation completo está em discussão. Não se afirma que já foi construído sobre os três pilares.
- Foundation LYNN é a base de IA B2B da TOTVS, lançada em fevereiro de 2026: Agent Builder, Enterprise Layer e Governance. Sustenta da concepção à operação governada em escala; não é vendido isoladamente nem apresentado como pacote de agentes.
- Agent Builder concebe, constrói e orquestra agentes conectados a ERP, CRM e demais aplicações. Enterprise Layer fornece contexto dos dados, sistemas e regras do cliente e registra metadados. Governance governa uso e custo dos modelos, ações, rastreabilidade e regras de proteção.
- Os metadados proprietários de uso e resultado permitem medir eficácia, otimizar custo por tarefa e melhorar as aplicações. Os modelos de IA são intercambiáveis.
- T-Cloud, APIs, bases organizadas e sistemas atualizados são habilitadores da estratégia de IA. São apresentados como contexto de prontidão do ambiente do cliente, sem criar uma quarta camada comercial.
- TaaS (Task as a Service) é explicado como trabalho executado como serviço: a volumetria de tarefas orienta o consumo. Start, pacotes e wallet detalham a dinâmica de créditos; não se promete retorno financeiro ou resultado comercial garantido.
- OES já constrói sobre LYNN. Especialistas, Personalizados e Assistentes têm contratação própria hoje, sem consumo de T-Coins. Na perspectiva futura, o site ilustra a hipótese de substituir esse enquadramento por produtos vinculados à oferta T-Coins, não uma decisão comercial concluída.
- Start oferece acesso e franquia mensal; expansão substitui a faixa anterior e torna-se recorrência. A contratação de Start é expressa.
- Ativação e débito são eventos distintos. Uso e métrica determinam consumo.
- Créditos têm validade de 180 dias por entrada. Faixas não se somam na cobrança; créditos válidos podem acumular.
- A cobrança é independente de LYNN. Soluções externas podem integrar a wallet no futuro, sem precisar ser representadas como construídas sobre o Foundation.
- Store e interface de extrato são identificados como em construção/conceituais, conforme os materiais.
- Agentes Equals estão no inventário de Produtos; os detalhes registram a discussão de integração citada na reunião, sem afirmar migração concluída.
- O inventário contém 43 Agentes Padrão, 10 especialistas OES e dois assistentes. O conjunto é aberto, e cada registro informa seu estágio.
- A revisão estratégica tem como referência `model-context/totvs_ia_estrategia_lynn_foundation.md`, seções 3.1–3.3. As imagens administrativas ilustram gestão, permissões e registros; não são apresentadas como prova de todos os recursos de Governance nem confundidas com Store ou wallet.

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
- Layouts para desktop, tablet e celular; estilos de impressão do mapa.
