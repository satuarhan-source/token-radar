# Average interest rates on US Treasury securities: 30 September 2026 against a year earlier

Source: Treasury Fiscal Data (api.fiscaldata.treasury.gov), endpoint /services/api/fiscal_service/v2/accounting/od/avg_interest_rates, filtered to record_date 2026-09-30 and 2025-09-30. Rates are averages by security as the source reports them.

## PROOF (source requests)

- 2026-11-20 13:49:43 UTC | GET https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?filter=record_date:eq:2026-09-30&page[size]=250 | HTTP 200 | raw meta total-count: 16
- 2026-11-20 13:49:43 UTC | GET https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates?filter=record_date:eq:2025-09-30&page[size]=250 | HTTP 200 | raw meta total-count: 17
- Source time (first response's Date header, copied exactly): Fri, 20 Nov 2026 13:49:43 GMT

## Raw total-count excerpts

- record_date 2026-09-30 — `"total-count": 16` (16 rows returned)
- record_date 2025-09-30 — `"total-count": 17` (17 rows returned)

## Comparison table (rates in percent, 2 decimals, half away from zero, from unrounded values)

| # | Security type | Security | 2025-09-30 | 2026-09-30 | Change (pp) |
|---|---|---|---|---|---|
| 1 | Non-marketable | United States Savings Inflation Securities | 3.82 | 4.53 | 0.71 |
| 2 | Non-marketable | Government Account Series | 3.16 | 3.59 | 0.43 |
| 3 | Non-marketable | Total Non-marketable | 3.17 | 3.59 | 0.42 |
| 4 | Marketable | Treasury Notes | 3.11 | 3.38 | 0.27 |
| 5 | Marketable | Treasury Inflation-Protected Securities (TIPS) | 0.91 | 1.15 | 0.24 |
| 6 | Non-marketable | Special Purpose Vehicle | 3.00 | 3.19 | 0.19 |
| 7 | Interest-bearing Debt | Total Interest-bearing Debt | 3.36 | 3.53 | 0.17 |
| 8 | Non-marketable | Government Account Series Inflation Securities | 1.24 | 1.39 | 0.15 |
| 9 | Marketable | Treasury Bonds | 3.33 | 3.47 | 0.14 |
| 10 | Marketable | Total Marketable | 3.41 | 3.52 | 0.11 |
| 11 | Marketable | Treasury Floating Rate Notes (FRN) | 4.03 | 4.14 | 0.11 |
| 12 | Non-marketable | Domestic Series | 7.58 | 7.58 | 0.00 |
| 13 | Non-marketable | State and Local Government Series | 3.46 | 3.46 | -0.00 |
| 14 | Marketable | Federal Financing Bank | 2.39 | 2.38 | -0.01 |
| 15 | Non-marketable | United States Savings Securities | 3.40 | 3.14 | -0.26 |
| 16 | Marketable | Treasury Bills | 4.19 | 3.87 | -0.32 |

## Ranked changes (largest rise first)

United States Savings Inflation Securities (0.71), Government Account Series (0.43), Total Non-marketable (0.42), Treasury Notes (0.27), Treasury Inflation-Protected Securities (TIPS) (0.24), Special Purpose Vehicle (0.19), Total Interest-bearing Debt (0.17), Government Account Series Inflation Securities (0.15), Treasury Bonds (0.14), Total Marketable (0.11), Treasury Floating Rate Notes (FRN) (0.11), Domestic Series (0.00), State and Local Government Series (-0.00), Federal Financing Bank (-0.01), United States Savings Securities (-0.26), Treasury Bills (-0.32)

Median change across the 16 securities present on both dates: **+0.15 pp** (even count — mean of the two middle values).

## Securities found on only one date

- Non-marketable — Foreign Series: only on 2025-09-30 at 0.00
- (Foreign Series is listed for 2025-09-30 with a rate of 0.00 in the source; it has no 2026-09-30 row.)

## Data file

D2 `treasury-rates.csv` is attached alongside this report (same delivery): one row per security found on either date (17 rows), sorted by security_type_desc then security_desc; fields: security_type_desc, security_desc, rate 2025-09-30, rate 2026-09-30, change. Rates are as returned by the source (unrounded); change in percentage points to 2 decimals (half away from zero).
