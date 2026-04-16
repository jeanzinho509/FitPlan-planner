# 🏋️ FitPlan — AI Fitness Planner & Monthly Progress Tracker

> Webapp completo de planejamento mensal de progresso para academia com IA e machine learning, focado em objetivos realistas, biotipos, treinos, dietas e estimativas de "natural máximo".

---

## 📸 Preview

> *(Screenshots e GIFs do app em breve)*

---

## 🚀 Sobre o Projeto

O **FitPlan** é uma plataforma web full-stack voltada para atletas naturais e praticantes de musculação que querem acompanhar sua evolução de forma **séria, científica e personalizada**.

Diferente dos apps genéricos de fitness, o FitPlan combina:

- **Planejamento mensal real** — não é só log de treinos, é um sistema de periodização
- **IA com regras científicas** — detecção de platôs, análise de consistência, cálculo de natural máximo via FFMI e modelo de Martin Berkhan
- **Estimativas realistas** — baseadas em ciência do treinamento (Dr. Mike Israetel, Eric Helms, Casey Butt)
- **Dashboard orientado a dados** — 5 métricas em tempo real, compliance diário, progresso visual

---
## 🧱 Stack Técnica

### Frontend
| Tecnologia | Uso |
|---|---|
| React 19 + TypeScript | UI e lógica de componentes |
| TailwindCSS 4 | Estilização utilitária |
| shadcn/ui | Design system de componentes |
| Wouter | Roteamento leve |
| TanStack Query + tRPC | Data fetching type-safe |
| Recharts | Gráficos de progresso |
| Framer Motion | Animações e transições |
| React Hook Form + Zod | Formulários com validação |

### Backend
| Tecnologia | Uso |
|---|---|
| Express.js | Servidor HTTP |
| tRPC | API type-safe fim-a-fim |
| Drizzle ORM | Queries type-safe para PostgreSQL |
| Supabase (PostgreSQL) | Banco de dados principal |
| JWT / José | Autenticação e sessões |
| Zod | Validação de schemas |

### Dev & Build
| Tecnologia | Uso |
|---|---|
| Vite 7 | Build e dev server |
| pnpm | Gerenciamento de pacotes |
| TypeScript 5.9 | Type safety full-stack |
| Vitest | Testes unitários |

---

## 🗂️ Arquitetura do Projeto

```
fitplan/
├── client/                  # Frontend React
│   └── src/
│       ├── _core/           # Hooks de auth e utilities core
│       ├── components/      # Componentes reutilizáveis (shadcn/ui + custom)
│       ├── contexts/        # React contexts (Theme, etc.)
│       ├── hooks/           # Custom hooks
│       ├── lib/             # Utilitários (trpc, cn, etc.)
│       └── pages/           # Páginas da aplicação
│
├── server/                  # Backend Express + tRPC
│   ├── _core/               # Auth, context, SDK, LLM, storage
│   └── routers.ts           # Routers tRPC
│
├── drizzle/                 # Schema, migrations e seeds
│   ├── schema.ts            # 17 tabelas tipadas
│   ├── relations.ts         # Relações Drizzle
│   └── seed-exercises.ts    # 60+ exercícios pré-cadastrados
│
└── shared/                  # Tipos e constantes compartilhados
```

---
## ✅ Status de Desenvolvimento

```
████████████░░░░░░░░░  ~40% completo
```

| Fase | Status | Descrição |
|---|---|---|
| **Fase 1** — Database Schema | ✅ Completo | 17 tabelas, relações, seeds, índices |
| **Fase 2** — Onboarding | ✅ Completo | 6 steps com validação por etapa e save progressivo |
| **Fase 2.5** — Dashboard Base | ✅ Completo | System Status, Monthly Adaptation, Daily Compliance, Progress Indicators |
| **Fase 3** — Sistema de Treino | 🔄 Em progresso | Workout Planner, Exercise Library, Logger |
| **Fase 4** — Nutrição | ⬜ Pendente | Meal Planner, Food Logger, Macros |
| **Fase 5** — IA Avançada | ⬜ Pendente | Geração de planos, análise preditiva |
| **Fase 6** — Polish & Launch | ⬜ Pendente | PWA, testes, otimização |

---

## 🧠 Engine de IA

O FitPlan usa um sistema de IA baseado em regras científicas (não LLM puro):

### Natural Maximum Calculator
- **FFMI Model** — limite natural ~25 FFMI
- **Martin Berkhan Model** — estimativa de peso máximo por altura
- **Casey Butt Model** — estimativa baseada em estrutura óssea

### AI Insights Engine
- Detecção de platô (3-4 semanas sem progresso)
- Análise de consistência de treino
- Avaliação de recuperação (sono, estresse, volume)
- Análise de progressão de peso vs objetivo

### Recovery Score
```
Base: 100%
- Sono < 6h:    -30%  |  Sono < 7h:  -15%  |  Sono < 8h:   -5%
- Stress > 8:   -25%  |  Stress > 6: -15%  |  Stress > 4:  -5%
- Volume > 5x:  -10%
```

---## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona X'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

### Convenção de Commits

```
feat:     nova funcionalidade
fix:      correção de bug
chore:    tarefas de manutenção
docs:     documentação
refactor: refatoração sem mudança de comportamento
test:     adição ou correção de testes
```

---

## 📚 Referências Científicas

O FitPlan é construído sobre evidências:

- **Ciência do Treino**: Dr. Mike Israetel, Jeff Nippard, Eric Helms
- **Nutrição**: Layne Norton, Renaissance Periodization
- **Limites Naturais**: Casey Butt, Martin Berkhan, Lyle McDonald
- **Natural Max via FFMI**: Kouri et al. (1995) — New England Journal of Medicine

---

## 📄 Licença

MIT © 2026 — Veja [LICENSE](./LICENSE) para mais detalhes.

---

<div align="center">
  <sub>Construído com ☕ e muito treino pesado</sub>
</div>
