# 🎭 Playwright TypeScript — Dulux UK E2E Automation

### TypeScript · Playwright · Allure · Docker · CI/CD

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-green)](https://playwright.dev/)
[![Allure](https://img.shields.io/badge/Allure-reporting-orange)](https://allurereport.org/)
[![View Allure Report](https://img.shields.io/badge/Allure%20Report-View%20latest%20results-orange?logo=qameta&logoColor=white)](https://magdau.github.io/playwright-typescript-dulux-uk/)

## 📌 Overview

A TypeScript end-to-end UI automation suite built with Playwright for selected [dulux.co.uk](https://www.dulux.co.uk) customer journeys.

Demonstrates maintainable test automation using **Page Object Model, custom fixtures, API preconditions, accessibility auditing, reporting and CI/CD**.

See [TEST_STRATEGY.md](TEST_STRATEGY.md) for scope and CI details, [TEST_SCENARIOS.md](TEST_SCENARIOS.md) for the scenarios behind the suite, [BUG_REPORTS.md](BUG_REPORTS.md) for real production defects found, [KEY_FINDINGS.md](KEY_FINDINGS.md) for what running the suite has shown, [TEST_TODO.md](TEST_TODO.md) for open follow-up work on the suite itself, and [`docs/qa/`](docs/qa/) for the formal ISTQB/IEEE 829-style QA documentation set.

## 🧪 Test Coverage

| Area                           | Coverage       |
| ------------------------------ | -------------- |
| Tester purchase journey        | ✅             |
| Colour search (negative case)  | ✅             |
| Visualizer App journey         | ✅             |
| Desktop                        | ✅             |
| Mobile                         | ✅             |
| API preconditions              | ✅             |
| Accessibility (axe-core)       | ✅             |
| Cross-browser (Firefox/WebKit) | ✅ (on demand) |
| Allure reporting               | ✅             |
| Docker                         | ✅             |
| GitHub Actions                 | ✅             |

## 🏗️ Architecture

```text
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

### Design Patterns

- Page Object Model
- Component Objects (`NavigationComponent`, `AlertComponent`)
- Base Page
- Custom Playwright fixtures for dependency wiring
- Web-first, auto-retrying assertions
- Storage state reuse (cookie consent captured once per suite)

## 📊 Reporting & CI/CD

- Allure reporting, published to GitHub Pages on every push to `main`
- Playwright HTML report
- Screenshots + video on failure, trace on first retry
- GitHub Actions
- Dockerized test execution

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

More commands (mobile/API/a11y/cross-browser/trace/lint) are in [TEST_STRATEGY.md](TEST_STRATEGY.md).

## 🧰 Tech Stack

**TypeScript · Playwright Test · ESLint · Prettier · Allure · Docker · GitHub Actions**

## 📚 Documentation

- [Test Strategy](TEST_STRATEGY.md)
- [Test Scenarios](TEST_SCENARIOS.md)
- [Bug Reports](BUG_REPORTS.md)
- [Key Findings](KEY_FINDINGS.md)
- [Test TODO](TEST_TODO.md)
- [QA docs (Test Plan, UAT, Feature Guide)](docs/qa/README.md)

## 🚀 Future Improvements

- Full cross-browser suite once Firefox/WebKit behavioural differences are root-caused
- Visual regression testing
- Parallel sharding in CI
- Improved test-data management
- AI-assisted test analysis

> Portfolio project demonstrating TypeScript-based UI automation and modern QA engineering practices.
