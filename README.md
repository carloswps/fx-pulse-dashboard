# FX Pulse

> Dashboard de monitoramento de câmbio em tempo real com integração à Google Finance e coleta automatizada de dados.

![License](https://img.shields.io/badge/license-Private-red)
![React](https://img.shields.io/badge/React-19.2.6-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178c6)
![Vite](https://img.shields.io/badge/Vite-8.0.12-646cff)
![MUI](https://img.shields.io/badge/MUI-9.0.1-007fff)

---

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Docker](#docker)
- [APIs e Integrações](#apis-e-integrações)
- [Temas e Design System](#temas-e-design-system)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Contribuição](#contribuição)
- [Licença](#licença)

---

## Visão Geral

O **FX Pulse** é uma aplicação web moderna para monitoramento de taxas de câmbio em tempo real. O projeto combina dados de mercado coletados automaticamente com uma interface responsiva e elegante, oferecendo:

- **Cotações em tempo real** de pares de moedas (USD/BRL, EUR/USD, GBP/USD, USD/JPY)
- **Gráficos interativos** com múltiplos períodos (1D, 5D, 1M, 1Y, MAX)
- **Resumo de mercado** com métricas calculadas automaticamente (Day's High/Low, Open, Prev Close, 52-Week Range)
- **Conversor de moedas** integrado com taxa mid-market
- **Modo claro/escuro** com persistência em localStorage
- **Health check** da API com indicadores visuais de status

---

## Funcionalidades

### Dashboard Principal
- **Main Quote Card**: Exibe a cotação principal com bandeiras dos países, variação percentual e gráfico de linha dinâmico
- **Market Summary Card**: Resumo estatístico com métricas calculadas a partir dos dados históricos
- **Currency Converter**: Conversão entre moedas com taxa em tempo real e botão de swap
- **Quick Links**: Atalhos para recursos externos

### Header
- Logo e identificação do ambiente (Production/Staging/Development)
- Barra de busca estilizada
- Indicadores de status: Database, Worker, Timestamp e Health
- Toggle de tema claro/escuro

### Footer
- Links para políticas e termos
- Atribuição de dados (Google Finance)
- Indicador de status pulsante

### Gráficos
- Renderização via SVG com polyline dinâmica
- Gradiente de preenchimento sob a linha
- Seleção de período com botões estilizados
- Labels de tempo no eixo X

---

## Arquitetura

```
─────────────────────────────────────────────────────────────┐
│                        FX Pulse                              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   React 19   │  │  TypeScript  │  │     Vite 8       │  │
│  │   (UI)       │  │   (Types)    │  │   (Build)        │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  MUI v9      │  │ React Query  │  │   React Router   │  │
│  │  (Components)│  │  (Cache)     │  │    (Routing)     │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Backend (Railway)                    │  │
│  │  /Health          → Health check do sistema          │  │
│  │  /v1/collect      → Dados históricos de câmbio       │  │
│  └──────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  ──────────────────────────────────────────────────────┐  │
│  │           Google Finance (Unofficial)                 │  │
│  │  Dados de mercado em tempo real                       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Estrutura do Projeto

```
fx-pulse/
├── .github/                    # Workflows de CI/CD
├── public/                     # Assets estáticos
│   ── favicon.svg             # Ícone da aplicação
├── src/
│   ├── app/
│   │   └── layouts/
│   │       └── DashboardLayout.tsx    # Layout principal com Header + Outlet
│   ├── features/
│   │   └── dashboard/
│   │       ├── components/
│   │       │   ├── ChartWidget.tsx          # Gráfico SVG dinâmico com seleção de período
│   │       │   ├── CurrencyConverter.tsx    # Conversor de moedas com swap
│   │       │   ├── MainQuoteCard.tsx        # Card principal com cotação e gráfico
│   │       │   └── MarketSummaryCard.tsx    # Resumo estatístico do mercado
│   │       └── pages/
│   │           └── DashboardPage.tsx        # Página principal do dashboard
│   ├── shared/
│   │   ├── components/
│   │   │   ├── Footer/
│   │   │   │   └── Footer.tsx               # Rodapé com links e atribuição
│   │   │   ├── Header/
│   │   │   │   └── Header.tsx               # Barra superior com status e busca
│   │   │   └── style/
│   │   │       └── SearchBar.tsx            # Componente estilizado de busca
│   │   ├── query/
│   │   │   ── queryClient.ts               # Configuração do TanStack Query
│   │   ├── services/
│   │   │   ├── client.ts                    # Cliente HTTP para API backend
│   │   │   └── marketService.ts             # Serviço de dados de mercado (mock)
│   │   ├── theme/
│   │   │   ├── index.ts                     # Export do tema
│   │   │   └── theme.ts                     # Configuração completa do MUI Theme
│   │   └── types/
│   │       ├── market.ts                    # Tipos de dados de mercado
│   │       └── types.ts                     # Tipos de resposta da API
│   ├── utils/
│   │   ├── calculateMarketSummary.ts        # Lógica de cálculo de métricas
│   │   ├── currencyFormatterMarketSummary.ts # Formatter Intl para moeda
│   │   ├── formatTimestamp.ts               # Formatação de timestamps
│   │   └── getFlagUrl.ts                    # Geração de URLs de bandeiras
│   ├── App.tsx                              # Configuração de rotas
│   ├── index.css                            # Estilos globais e fontes
│   └── main.tsx                             # Entry point da aplicação
├── .dockerignore                             # Arquivos excluídos do build Docker
── .env                                      # Variáveis de ambiente
├── .gitignore                                # Arquivos ignorados pelo Git
├── biome.json                                # Configuração do Biome (lint/format)
├── Dockerfile                                # Build multi-stage (Node + Nginx)
├── index.html                                # HTML base com script de tema
├── nginx.conf                                # Configuração do Nginx para SPA
├── package.json                              # Dependências e scripts
├── package-lock.json                         # Lockfile do npm
├── tsconfig.json                             # Configuração raiz do TypeScript
├── tsconfig.app.json                         # Configuração TS para app
├── tsconfig.node.json                        # Configuração TS para node/vite
└── vite.config.ts                            # Configuração do Vite
```

---

## Tecnologias

### Core
| Tecnologia | Versão | Descrição |
|---|---|---|
| **React** | 19.2.6 | Biblioteca UI com React 19 |
| **TypeScript** | 6.0.2 | Tipagem estática |
| **Vite** | 8.0.12 | Build tool e dev server |
| **React Router** | 7.15.1 | Roteamento client-side |

### UI/UX
| Tecnologia | Versão | Descrição |
|---|---|---|
| **MUI Material** | 9.0.1 | Componentes e sistema de design |
| **MUI Icons** | 9.0.1 | Ícones Material Design |
| **Emotion** | 11.14.x | CSS-in-JS engine do MUI |

### Fontes
| Fonte | Uso |
|---|---|
| **Public Sans** | Títulos e headings |
| **Inter** | Corpo de texto |
| **Hanken Grotesk** | Elementos alternativos |
| **JetBrains Mono** | Code/captions |

### Data & State
| Tecnologia | Versão | Descrição |
|---|---|---|
| **TanStack Query** | 5.100.10 | Cache e gerenciamento de server state |

### Tooling
| Tecnologia | Versão | Descrição |
|---|---|---|
| **Biome** | 2.4.15 | Linter e formatter (substituto do ESLint/Prettier) |
| **lightweight-charts** | 5.2.0 | Biblioteca de gráficos financeiros (TradingView) |

### Infraestrutura
| Tecnologia | Descrição |
|---|---|
| **Docker** | Containerização multi-stage |
| **Nginx** | Servidor web para produção |
| **Railway** | Plataforma de deploy do backend |

---

## Pré-requisitos

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Docker** (opcional, para containerização)

---

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/fx-pulse.git
cd fx-pulse
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_BASE_URL=https://rpa-data-collector-production.up.railway.app/api
VITE_GOOGLE_FINANCE_API=https://www.google.com/finance/beta/quote/USD-BRL
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_BASE_URL` | URL base da API backend | `https://api.exemplo.com/api` |
| `VITE_GOOGLE_FINANCE_API` | URL da Google Finance para atribuição | `https://www.google.com/finance/beta/quote/USD-BRL` |

> **Nota**: Variáveis com prefixo `VITE_` são expostas ao cliente pelo Vite.

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Compila TypeScript e gera build de produção |
| `npm run lint` | Executa linting com Biome |
| `npm run format` | Formata código com Biome |
| `npm run check` | Executa lint + type check com Biome |
| `npm run preview` | Preview do build de produção localmente |

---

## Docker

### Build da imagem

```bash
docker build . --file Dockerfile --tag fx-pulse-dashboard:latest
```

### Executar o container

```bash
docker run -d -p 80:80 --name fx-pulse fx-pulse-dashboard:latest
```

### Dockerfile (Multi-stage)

O projeto utiliza um **Dockerfile multi-stage** otimizado:

**Stage 1 - Builder:**
- Base: `node:20-alpine`
- Instala dependências
- Compila o projeto com `npm run build`

**Stage 2 - Runtime:**
- Base: `nginx:alpine`
- Configuração customizada do Nginx com:
  - Gzip compression
  - Cache agressivo para assets (1 ano)
  - No-cache para `index.html`
  - SPA fallback (try_files)
- Health check a cada 30s

---

## APIs e Integrações

### Backend API

| Endpoint | Método | Descrição | Autenticação |
|---|---|---|---|
| `/Health` | GET | Health check do sistema | Não |
| `/v1/collect` | GET | Dados históricos de câmbio | Bearer Token |

### Health Response

```json
{
  "status": "healthy",
  "version": "0.0.0.0",
  "database": "connected",
  "worker": {
    "status": "stopped",
    "last_scraping": "2026-05-19T17:19:22.428427Z"
  },
  "timestamp": "2026-05-19T17:44:13.4530659Z",
  "envoriment": "Production",
  "machineName": "0b0a9a3d7892"
}
```

### Dashboard Response

```json
{
  "id": "f6204972-1db9-484d-acfc-cac63508c1b3",
  "value": 50565,
  "coin": "USD-BRL",
  "date": "2026-05-19T19:19:25.419467Z",
  "fontUrl": "https://www.google.com/finance/quote/USD-BRL"
}
```

> **Nota**: Os valores de cotação são retornados multiplicados por 10.000 pela API. O frontend divide por 10.000 antes de exibir.

### Google Finance

Integração não-oficial para atribuição de dados de mercado. O link é exibido no footer com `target="_blank"`.

---

## Temas e Design System

### Paleta de Cores

#### Light Mode
| Token | Valor |
|---|---|
| Primary | `#ec5b13` |
| Secondary | `#475569` |
| Success | `#10b981` |
| Error | `#ef4444` |
| Warning | `#f59e0b` |
| Info | `#3b82f6` |
| Background | `#f8f6f6` |
| Paper | `#ffffff` |

#### Dark Mode
| Token | Valor |
|---|---|
| Primary | `#f97316` |
| Background | `#0f172a` |
| Paper | `#1e293b` |

### Tipografia

| Elemento | Fonte | Tamanho | Peso |
|---|---|---|---|
| H1 | Public Sans | 3.5rem | 700 |
| H2 | Public Sans | 2rem | 600 |
| H3 | Public Sans | 1.5rem | 600 |
| Body | Inter | 1rem | 400 |
| Caption | JetBrains Mono | 0.75rem | 400 |
| Overline | Public Sans | 0.75rem | 700 |

### Componentes Customizados

- **Cards**: `borderRadius: 2`, border sutil, sem elevation
- **Buttons**: `textTransform: none`, `borderRadius: 2`
- **Chips**: `borderRadius: 999` (pill shape)
- **AppBar**: Sem elevation, border-bottom sutil
- **TextField**: Background customizado, focus com border-width 2

---

## Gerenciamento de Estado

### TanStack Query (React Query)

Configuração global em `src/shared/query/queryClient.ts`:

```typescript
{
  retry: 2,              // Tenta 2x em caso de erro
  staleTime: 30_000,     // Dados fresh por 30s
  refetchOnWindowFocus: true  // Refetch ao voltar à aba
}
```

### Queries Ativas

| Query Key | Descrição | Enabled |
|---|---|---|
| `['pairs']` | Lista de pares de moedas | Sempre |
| `['dashboard']` | Dados históricos de câmbio | Quando há pares |

### Padrão de Dados

1. **Fetch inicial**: Busca dados da API
2. **Cache**: Dados ficam em cache por 30s (`staleTime`)
3. **Refetch**: Ao voltar à aba ou após staleTime
4. **Retry**: Até 2 tentativas em caso de falha

---

## Estrutura de Tipos

### CurrencyPair

```typescript
interface CurrencyPair {
  code: string;        // "USD-BRL"
  base: string;        // "USD"
  quote: string;       // "BRL"
  name: string;        // "US Dollar / Brazilian Real"
  rate: number;        // 5.4321
  change: number;      // 0.0132
  changePercent: number; // 0.24
  high: number;        // 5.45
  low: number;         // 5.41
  volume: number;      // 1_234_567
}
```

### DashboardApiResponse

```typescript
interface DashboardApiResponse {
  id: string;          // UUID
  value: number;       // Cotação * 10000
  coin: string;        // "USD-BRL"
  date: string;        // ISO 8601
  fontUrl: string;     // URL da fonte
}
```

### HealthApiResponse

```typescript
interface HealthApiResponse {
  status: string;      // "healthy"
  version: string;     // "0.0.0.0"
  database: string;    // "connected"
  worker: {
    status: string;    // "running" | "stopped"
    last_scraping: string; // ISO 8601
  };
  timestamp: string;   // ISO 8601
  envoriment: string;  // "Production"
  machineName: string; // Container ID
}
```

### TimeRange

```typescript
type TimeRange = '1D' | '5D' | '1M' | '1Y' | 'MAX';
```

---

## Utilitários

### calculateMarketSummary

Calcula métricas de mercado a partir dos dados históricos:

- **Day's High/Low**: Máximo e mínimo do dia atual
- **Open**: Primeiro valor do dia
- **Prev Close**: Último valor do dia anterior
- **52-Week Range**: Máximo e mínimo do último ano
- **Sentiment**: Bullish/Bearish baseado na variação

### currencyFormatterMarketSummary

Formatter `Intl.NumberFormat` para moeda brasileira:

```typescript
{
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 4
}
```

### getFlagUrl

Gera URLs de bandeiras via FlagCDN:

```typescript
getFlagUrl('USD') // → https://flagcdn.com/w80/us.png
getFlagUrl('BRL') // → https://flagcdn.com/w80/br.png
```

Mapeamento de moedas:
- `USD` → `US`
- `BRL` → `BR`
- Outros → `UN` (bandeira da ONU)

### formatTimestamp

Formata timestamps ISO para locale brasileiro:

```typescript
formatTimestamp('2026-05-19T17:44:13.4530659Z')
// → "19/05/2026 14:44:13"
```

---

## Nginx Configuration

O `nginx.conf` inclui otimizações para SPA:

```nginx
# Gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;

# Cache agressivo para assets (hash no filename)
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# No-cache para index.html (sempre fetch latest)
location = /index.html {
    expires -1;
    add_header Cache-Control "no-store, no-cache, must-revalidate";
}

# SPA fallback
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## Biome Configuration

O projeto utiliza **Biome** para linting e formatação:

```json
{
  "formatter": {
    "indentStyle": "tab"
  },
  "linter": {
    "rules": {
      "recommended": true,
      "correctness": {
        "noUnusedVariables": "off"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single"
    }
  }
}
```

---

## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                     Fluxo de Dados                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. DashboardPage monta                                     │
│     ↓                                                       │
│  2. useQuery(['pairs']) → fetchPairs() → MOCK_PAIRS         │
│     ↓                                                       │
│  3. useQuery(['dashboard']) → client.fetchDashboardData()   │
│     ↓                                                       │
│  4. Dados passam por calculateMarketSummary()               │
│     ↓                                                       │
│  5. Valores são normalizados (/10000)                       │
│     ↓                                                       │
│  6. Formatação via Intl.NumberFormat                        │
│     ↓                                                       │
│  7. Renderização nos componentes                            │
│                                                             │
─────────────────────────────────────────────────────────────┘
```

---

## Performance

### Otimizações Implementadas

1. **Code Splitting**: Vite faz split automático por route
2. **Tree Shaking**: Apenas componentes usados são incluídos
3. **Gzip Compression**: Assets comprimidos pelo Nginx
4. **Cache Strategy**: Assets com hash cacheados por 1 ano
5. **React Query Cache**: Reduz chamadas desnecessárias à API
6. **useMemo**: Cálculos pesados memoizados
7. **Font Loading**: Fontes carregadas via @fontsource (subset)

### Bundle Size

| Tipo | Tamanho (gzipped) |
|---|---|
| JS | ~150 KB |
| CSS | ~15 KB |
| Fonts | ~80 KB |
| Total | ~245 KB |

---

## Acessibilidade

- **ARIA labels** em elementos interativos
- **Semantic HTML** (header, main, footer)
- **Keyboard navigation** suportada
- **Color contrast** conforme WCAG AA
- **Focus visible** em elementos interativos

---

## Browser Support

| Browser | Versão Mínima |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## Troubleshooting

### Tela branca no desenvolvimento

1. Verifique o console do navegador (F12)
2. Confirme que `VITE_BASE_URL` está definido no `.env`
3. Verifique se o backend está rodando e acessível

### Erro de CORS

Se receber erro de CORS, configure o backend para permitir origens do frontend:

```
Access-Control-Allow-Origin: http://localhost:5173
```

### Build Docker falhando

1. Verifique se `node_modules` não está sendo copiado (`.dockerignore`)
2. Confirme que todos os arquivos TypeScript compilam (`npm run build` local)
3. Verifique logs do container: `docker logs fx-pulse`

---

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Convenções de Commit

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Manutenção

---

## Licença

Projeto privado. Todos os direitos reservados.

---

## Contato

Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento.

---

*Última atualização: Maio 2026*
