# 🎭 Playwright TypeScript E2E Automation Framework

### UI end-to-end test automation for [Dulux UK](https://www.dulux.co.uk) — TypeScript · Playwright · Allure · CI/CD

[![E2E Tests](https://github.com/magdaU/playwright-typescript-dulux-uk/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/magdaU/playwright-typescript-dulux-uk/actions/workflows/e2e-tests.yml)
[![View Allure Report](https://img.shields.io/badge/Allure%20Report-View%20latest%20results-orange?logo=qameta&logoColor=white)](https://magdau.github.io/playwright-typescript-dulux-uk/)

---

## 📖 Overview

TypeScript-based UI end-to-end automation suite for real Dulux UK customer journeys (buy a colour tester, launch the Visualizer app), built with a Page Object Model architecture on Playwright Test.

---

## 🧰 Tech Stack

| Tool | Purpose |
|---|---|
| TypeScript | Language |
| Playwright Test | Browser automation & test runner (Chromium, Firefox, WebKit) |
| ESLint / Prettier | Linting & formatting |
| Allure | Test reporting |
| Docker | Containerised, reproducible test runs |
| GitHub Actions | CI/CD pipeline, GitHub Pages |

---

## 🏛 Architecture

**Page Object Model + Component Objects**, with custom Playwright fixtures wiring pages and API preconditions into each test.

```
Playwright Test
       ↓
Custom Fixtures
       ↓
Page Objects + Components
       ↓
Playwright
       ↓
Dulux UK
```

---

## ▶️ Run Tests

### Local

```bash
npm install
npx playwright install --with-deps chromium
npm test
```

### Smoke

```bash
npm run test:smoke
```

### Docker

```bash
docker build -t dulux-e2e .
docker run --rm dulux-e2e
```

More commands (mobile/API/a11y/cross-browser/trace/lint) are in [Test Strategy](TEST_STRATEGY.md).

---

## 📚 Docs

- [Test Strategy](TEST_STRATEGY.md) — scope, CI details.
- [Test Scenarios](TEST_SCENARIOS.md) — the scenarios behind the suite.
- [Bug Reports](BUG_REPORTS.md) — real production defects found.
- [Key Findings](KEY_FINDINGS.md) — what running the suite has shown.
- [Lessons Learned](LESSONS_LEARNED.md) — real issues this suite caught, root-caused and fixed.
- [Test TODO](TEST_TODO.md) — open follow-up work on the suite itself.
- [QA docs (Test Plan, UAT, Feature Guide)](docs/qa/README.md) — the formal ISTQB/IEEE 829-style QA documentation set.

---

## 🚀 Future Improvements

* Full cross-browser suite once Firefox/WebKit behavioural differences are root-caused
* Visual regression testing
* Parallel sharding in CI
* Improved test-data management
* AI-assisted test analysis

---

## 👩‍💻 Author

**Magdalena Ukleja**

[![GitHub](https://img.shields.io/badge/GitHub-magdaU-181717?logo=github&logoColor=white)](https://github.com/magdaU)

QA Automation Engineer — Java · Python · TypeScript · Playwright · BDD · CI/CD.
