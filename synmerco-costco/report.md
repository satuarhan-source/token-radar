# D1 Report — Costco SEC filings 2025–2026 (esc_43515fbd9d3241ba90c9b0d1)

## Source & PROOF

- GET https://data.sec.gov/submissions/CIK0000909832.json — 2026-11-24T23:51:40Z UTC — HTTP 200
- First response Date header (source time): Tue, 24 Nov 2026 23:51:40 GMT
- User-Agent sent: `Hermes Forge agent hermesforge@example.com` (contact header, as SEC requests). Single request; no other queries run.

### Raw excerpts (exactly as returned)
```json
"name":"COSTCO WHOLESALE CORP /NEW",
"tickers":["COST"],
"fiscalYearEnd":"0830",
```

## Kept entries
Filings with `filingDate` in 2025 or 2026: **179** rows (all rows of `filings.recent`; arrays at the same position).

## Filings per form (highest first; ties by form)

| form | count |
|---|---|
| 4 | 89 |
| 144 | 33 |
| 8-K | 21 |
| 10-Q | 5 |
| 3 | 5 |
| CORRESP | 5 |
| UPLOAD | 5 |
| 10-K | 2 |
| 11-K | 2 |
| 3/A | 2 |
| PX14A6G | 2 |
| SD | 2 |
| ARS | 1 |
| DEF 14A | 1 |
| DEFA14A | 1 |
| S-3ASR | 1 |
| SCHEDULE 13G | 1 |
| SCHEDULE 13G/A | 1 |

## Filings per filing month

| month | count |
|---|---|
| 2025-01 | 3 |
| 2025-02 | 1 |
| 2025-03 | 13 |
| 2025-04 | 5 |
| 2025-05 | 5 |
| 2025-06 | 10 |
| 2025-07 | 5 |
| 2025-08 | 3 |
| 2025-09 | 14 |
| 2025-10 | 24 |
| 2025-11 | 3 |
| 2025-12 | 10 |
| 2026-01 | 13 |
| 2026-03 | 11 |
| 2026-04 | 4 |
| 2026-05 | 3 |
| 2026-06 | 7 |
| 2026-07 | 2 |
| 2026-09 | 14 |
| 2026-10 | 23 |
| 2026-11 | 6 |

## 8-K item codes (form exactly `8-K`; multi-code entries count once per code)

| item | count |
|---|---|
| 9.01 | 16 |
| 8.01 | 9 |
| 2.02 | 7 |
| 5.02 | 6 |
| 5.07 | 2 |

## 10 latest filings (by filingDate then accessionNumber, newest first)

| accessionNumber | filingDate | reportDate | form | items |
|---|---|---|---|---|
| 0000909832-26-000138 | 2026-11-13 | 2026-11-12 | 4 |  |
| 0001959173-26-007966 | 2026-11-12 |  | 144 |  |
| 0001959173-26-007954 | 2026-11-12 |  | 144 |  |
| 0001959173-26-007945 | 2026-11-12 |  | 144 |  |
| 0000909832-26-000136 | 2026-11-12 | 2026-11-11 | 4 |  |
| 0000909832-26-000134 | 2026-11-10 | 2026-11-07 | 8-K | 5.02,8.01,9.01 |
| 0000909832-26-000131 | 2026-10-27 | 2026-10-22 | 4 |  |
| 0000909832-26-000129 | 2026-10-27 | 2026-10-22 | 4 |  |
| 0000909832-26-000127 | 2026-10-27 | 2026-10-22 | 4 |  |
| 0000909832-26-000125 | 2026-10-26 | 2026-10-22 | 4 |  |

## Checklist (numbered, per ACCEPTANCE)
1. ✅ PROOF quotes raw `name`, `tickers`, `fiscalYearEnd` above (excerpts block); D2 `costco-filings.csv` holds one row per entry filed in 2025 or 2026 — 179 rows, sorted by filingDate then accessionNumber.
2. ✅ D2 attached as data file with exactly the listed columns: accessionNumber, filingDate, reportDate, form, items.
3. ✅ Form, month and 8-K item tables above recomputed directly from the same CSV rows; values as returned by the source (no renaming, no reordering).

All counts and arithmetic reproduce from the excerpts/CSV: sum of form counts = sum of month counts = 179.

## Revision 1 — CHECKLIST (A3)

- **A3 [FIXED]** The form table did not sort ties by form name. Rows with equal counts are now ordered by the `form` string ascending (e.g. 10-Q, 3, CORRESP, UPLOAD at count 5; 10-K, 11-K, 3/A, PX14A6G, SD at count 2; SCHEDULE 13G before SCHEDULE 13G/A at count 1). Counts themselves are unchanged and still reproduce exactly from the attached CSV (form totals = month totals = 179).
- **A1, A2**: unchanged — no edits to the PROOF, excerpts or CSV in this round.