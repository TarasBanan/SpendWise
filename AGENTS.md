# AGENTS.md — SpendWise

Drop-in operating instructions for coding agents. Read this file before every task.

**Working code only. Finish the job. Plausibility is not correctness.**

---

## 0. Non-negotiables

These rules override everything else when in conflict:

1. **No flattery, no filler.** Skip "Great question", "You're absolutely right", "I'd be happy to". Start with the action.
2. **Disagree when you disagree.** Wrong premise → say so first, then proceed. Silent agreement is the worst failure mode.
3. **Never fabricate.** Not file paths, not function names, not test results. If you're unsure — read the file, run the command, or say "I don't know, let me check."
4. **Stop when confused.** Two plausible interpretations? Ask. Don't pick silently.
5. **Touch only what you must.** Every changed line must trace directly to the request. No drive-by refactors.
6. **Never typecast. Never use `as`.** TypeScript only — enforce with the compiler, not workarounds.

---

## 1. Before writing code

- State your plan in 1–2 sentences. For anything non-trivial, produce a numbered list of steps with a verification check for each.
- Read the files you will touch, and the files that call them.
- Read `DESIGN.md` before touching any UI component, color, spacing, or layout. It is the single source of truth for visual decisions.
- Match existing patterns. If the project uses pattern X, use pattern X.
- Surface assumptions: "I'm assuming X. If wrong, say so." Don't bury assumptions in the implementation.

---

## 2. Writing code: simplicity first

- No features beyond what was asked.
- No abstractions for single-use code. No hooks, configs, or extension points that were not requested.
- No error handling for impossible scenarios. Handle failures that can actually happen.
- If the solution is 200 lines and could be 50, rewrite before showing it.
- Never add "for future extensibility" — future extensibility is a future decision.
- Bias toward deleting code over adding it.

The test: would a senior engineer call this overcomplicated? If yes, simplify.

---

## 3. Surgical changes

- Do not improve adjacent code, comments, or imports that are not part of the task.
- Do not refactor working code just because you're in the file.
- Do not delete pre-existing dead code unless asked. Mention it in the summary instead.
- Do clean up orphans your own edit creates: unused imports, variables, functions.
- Match existing style exactly: indentation, quotes, naming, file layout.

The test: every changed line traces directly to the request. If a line fails, revert it.

---

## 4. Goal-driven execution

Rewrite vague asks into verifiable goals before starting:

- "Add validation" → "Write tests for invalid inputs (empty, malformed, oversized), then make them pass."
- "Fix the bug" → "Write a failing test reproducing the symptom, then make it pass."
- "Refactor X" → "Existing tests pass before and after. No public API changes."

For every task:

1. State success criteria before writing code.
2. Write the verification (test, script, screenshot diff) where practical.
3. Run the verification. Read the output. Do not claim success without checking.
4. If verification fails, fix the cause, not the test.

---

## 5. DESIGN.md

`DESIGN.md` lives at the repo root and is the single source of truth for all visual decisions.

**Always read `DESIGN.md` before:**
- Creating or modifying any Vue component with UI output
- Touching colors, spacing, typography, icons, or layout
- Adding a new page or route

**What belongs in `DESIGN.md`:**
- Color palette with CSS variable names (light/dark)
- Typography scale (font family, sizes, weights)
- Spacing and border-radius tokens
- Chart color sequences (Chart.js datasets)
- Icon library and usage rules (e.g. which icon = which category)
- Component patterns: cards, modals, form inputs, progress bars
- Dark mode toggle behavior

**Rules:**
- Never hardcode hex values or pixel sizes in components. Always use tokens defined in `DESIGN.md`.
- If a design decision isn't in `DESIGN.md`, add it there first, then implement it.
- When in conflict between DESIGN.md and existing component code, DESIGN.md wins. Fix the component.

---

## 6. Tool use and verification

- Prefer running code to guessing. Test suite exists? Run it. Linter exists? Run it. Type checker exists? Run it.
- Never report "done" based on a plausible diff alone.
- When debugging, address root causes, not symptoms. Suppressing an error is not fixing it.
- For UI changes: screenshot before, screenshot after, describe the diff.
- Read full logs and stack traces. Half-read traces produce wrong fixes.

---

## 7. Session hygiene

- After two failed corrections on the same issue, stop. Summarize what you learned and ask for a session reset with a sharper prompt.
- Long sessions with accumulated failed attempts perform worse than fresh ones.
- When committing: subject under 72 chars, body explains the why. No "update file" or "fix bug". No "Co-Authored-By: Claude" unless explicitly wanted.

---

## 8. When to ask, when to proceed

**Ask before proceeding when:**
- Two plausible interpretations, the choice materially changes the output.
- The change touches auth, billing logic, data migrations, or Supabase schema.
- You need credentials or a production resource you don't have.
- The stated goal and literal request conflict.

**Proceed without asking when:**
- The task is trivial and reversible (typo, rename, add a log line).
- Ambiguity can be resolved by reading the code or running a command.
- The user already answered this question once in the session.

---

## 9. Project context

### Stack
- **Language:** TypeScript (strict, no `as`, no type casting)
- **Framework:** Vue 3 + Composition API (`<script setup>`)
- **Styling:** Pinia (state), CSS custom properties (design tokens from DESIGN.md)
- **Charts:** Chart.js / D3
- **Backend:** Firebase or Supabase (see `.env` for active config)
- **Build:** Vite
- **Package manager:** npm
- **Target:** PWA (offline-capable)

### Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Test (all): `npm run test`
- Test (single): `npm run test -- src/path/to/file.spec.ts`

### Repository layout

```
spendwise/
├── AGENTS.md               # This file
├── DESIGN.md               # Visual design tokens and component patterns
├── index.html
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── icons/              # PWA icons
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── router/
│   │   └── index.ts
│   ├── stores/             # Pinia stores, one file per domain
│   │   ├── transactions.ts
│   │   ├── budgets.ts
│   │   ├── goals.ts
│   │   ├── categories.ts
│   │   └── settings.ts
│   ├── pages/              # Route-level components (one per page)
│   │   ├── Dashboard.vue
│   │   ├── Transactions.vue
│   │   ├── Analytics.vue
│   │   ├── Budgets.vue
│   │   ├── Goals.vue
│   │   ├── Categories.vue
│   │   └── Settings.vue
│   ├── components/         # Reusable UI components
│   │   ├── charts/         # Chart.js / D3 wrappers
│   │   ├── forms/          # Input, Select, DatePicker, etc.
│   │   ├── layout/         # AppShell, Sidebar, Header, BottomNav
│   │   └── common/         # Card, Modal, ProgressBar, Badge, etc.
│   ├── composables/        # Shared logic (useFormatCurrency, useDateRange, etc.)
│   ├── services/           # Firebase/Supabase calls, CSV export, etc.
│   │   ├── db.ts           # DB client init and typed helpers
│   │   ├── export.ts       # CSV/Excel export logic
│   │   └── auth.ts
│   ├── types/              # Shared TypeScript interfaces and enums
│   │   └── index.ts
│   └── assets/
│       ├── styles/
│       │   ├── tokens.css  # CSS custom properties (generated from DESIGN.md)
│       │   └── global.css
│       └── icons/
├── tests/
│   ├── unit/
│   └── e2e/
└── .env.example
```

### Conventions

- **Naming:** PascalCase for components, camelCase for composables and stores, kebab-case for CSS classes.
- **Imports:** Use `@/` alias for `src/`. Never use relative `../../` imports that cross a directory boundary.
- **State:** All shared state lives in Pinia stores. No prop-drilling beyond one level; use stores or composables.
- **Types:** All domain types (Transaction, Category, Budget, Goal) are defined in `src/types/index.ts`. Stores and services import from there. No inline `type` or `interface` declarations inside components.
- **Components:** One component per file. No anonymous default exports.
- **Charts:** Chart.js config objects are built in composables under `src/composables/`. Components only render, they don't build configs.
- **Currency/dates:** Always format via `useFormatCurrency` and `useFormatDate` composables. Never call `toLocaleString` directly in templates.
- **Error handling:** Service calls are wrapped in `try/catch`. Errors surface via a toast composable, never `console.error` alone.

### Do not modify
- `src/types/index.ts` without updating all affected stores and services in the same commit.
- Supabase/Firebase schema without a corresponding migration file in `migrations/`.
- CSS variable names in `tokens.css` without updating `DESIGN.md` first.

### Forbidden
- `as` keyword in TypeScript — use type guards or proper narrowing.
- Hardcoded colors, hex values, or pixel sizes in component `<style>` blocks — use design tokens.
- `any` type — fix the type properly.
- Direct DOM manipulation outside of Vue directives or composables.
- `localStorage` for financial data — use the configured DB service.

---

## 10. Project Learnings

When the user corrects your approach, append a one-line rule before ending the session. Write it concretely ("Always use X for Y"), never abstractly ("be careful with Y"). Remove lines when the underlying issue is resolved.
