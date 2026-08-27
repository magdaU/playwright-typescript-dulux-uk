# UAT Sign-off Template — Dulux E2E

A reusable User Acceptance Testing template, aligned with the ISTQB Foundation Level definition of acceptance
testing (business-facing validation that the system meets user/business needs, distinct from the technical
verification already covered by [TEST_PLAN.md](TEST_PLAN.md) and the automated regression suite). Copy this
file per UAT cycle into `docs/qa/uat/` (e.g. `docs/qa/uat/2026-Q3.md`) and fill in the blank columns — don't
edit this template in place. See [docs/qa/README.md](README.md) for the full workflow.

## Document control

| Field               | Value                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| UAT cycle / release |                                                                                                                                                      |
| Prepared by         |                                                                                                                                                      |
| Date prepared       |                                                                                                                                                      |
| Target environment  | Production — `https://www.dulux.co.uk` (see [TEST_STRATEGY §5](../../TEST_STRATEGY.md#5-environments--coverage) — no dedicated staging is available) |

## Purpose & scope

Confirm, from a business/user perspective, that the tester-purchase customer journey works end to end and is
acceptable for release. This is **not** a re-run of the automated regression suite — it's a business
stakeholder validating outcomes that matter to them (can a customer find a colour, buy a tester, and see it in
their basket), using the same scenarios as [TEST_SCENARIOS.md](../../TEST_SCENARIOS.md) as a starting point but
signed off by a human, not a script.

**In scope:** tester purchase journey (desktop + mobile). **Out of scope:** accessibility audit findings and
cross-browser differences (tracked separately as non-blocking findings — see
[BUG_REPORTS.md](../../BUG_REPORTS.md) / [KEY_FINDINGS.md](../../KEY_FINDINGS.md) — not gating criteria for UAT
sign-off unless the business explicitly decides otherwise for this cycle).

## Entry criteria

- [ ] Automated `@regression` suite is green (see latest [Test Summary Report](TEST_SUMMARY_REPORT.md)).
- [ ] Build/commit under test is identified and frozen for the duration of UAT.
- [ ] UAT testers have access to the target environment and this template.

## Exit / sign-off criteria

- [ ] All scenarios below are executed and marked Pass or Fail.
- [ ] Any Fail has a linked defect (see "Defects raised" below) and an agreed disposition (fix before release /
      accept and release / defer).
- [ ] Sign-off section completed by all required roles.

## UAT scenarios

| ID              | Scenario                                                                                                                                      | Steps (business-facing summary)                                                                                         | Expected result                                                     | Actual result | Status (Pass/Fail) | Tester | Date |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------- | ------------------ | ------ | ---- |
| UAT-PURCHASE-01 | Desktop customer finds a colour and buys a tester (mirrors [TC-PURCHASE-01](../../TEST_SCENARIOS.md#tester-purchase-journey))                 | Start with an empty basket → find "Violet" → choose "Sugared Lilac" → buy a tester → dismiss confirmation → open basket | Basket shows 1 "Dulux Colour Tester" in "Sugared Lilac", quantity 1 |               |                    |        |      |
| UAT-PURCHASE-02 | Mobile customer completes the same journey via the hamburger menu (mirrors [TC-PURCHASE-02](../../TEST_SCENARIOS.md#tester-purchase-journey)) | Same as above, starting from the mobile hamburger menu instead of the top nav                                           | Same as above                                                       |               |                    |        |      |
| UAT-BASKET-01   | Customer can see an empty-basket state clearly                                                                                                | Open the basket with nothing added                                                                                      | Basket clearly communicates "Your basket is empty"                  |               |                    |        |      |

Add rows for any additional business-critical scenario for this cycle — this table is a starting point, not an
exhaustive list.

## Defects raised during UAT

| ID  | Linked scenario | Description | Severity | Disposition (fix before release / accept / defer) |
| --- | --------------- | ----------- | -------- | ------------------------------------------------- |
|     |                 |             |          |                                                   |

## Sign-off

| Role                   | Name | Decision (Accept / Accept with known issues / Reject) | Date | Signature |
| ---------------------- | ---- | ----------------------------------------------------- | ---- | --------- |
| Product/Business Owner |      |                                                       |      |           |
| QA Lead                |      |                                                       |      |           |
| Development Lead       |      |                                                       |      |           |
