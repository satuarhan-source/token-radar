# NLP Research Landscape 2016-2025 (OpenAlex) — Solara Report, Corrected PULL 1-3

## Executive summary
Natural language processing research output is 12927 works in 2016 rising to 36468 works in 2025 across OpenAlex topic T10181 (Natural Language Processing Techniques), a compound yearly growth of 12.21% over the nine year span. Open access adoption is strong and rising: the share of open-access works grows from 48.13% in 2016 to 75.12% in 2025, and the highest open-access share falls in 2025 at 75.12%. Three timed pulls of the same two OpenAlex queries on 22, 23 and 24 November 2026 (UTC) show the field's counts moving only slightly day to day, confirming a mature, slowly compounding output base with steady OA conversion. All figures below are computed from the PULL 3 CSV, which is attached with the corrected five-column schema and cross-checked against both raw meta counts of every pull.

## Year table (PULL 3)
| Year | Works | OA works | OA share % | Works change |
|---|---|---|---|---|
| 2016 | 12927 | 6222 | 48.13 | none |
| 2017 | 12132 | 6306 | 51.98 | -795 |
| 2018 | 14021 | 7867 | 56.11 | 1889 |
| 2019 | 15042 | 8934 | 59.39 | 1021 |
| 2020 | 16201 | 9755 | 60.21 | 1159 |
| 2021 | 16049 | 10480 | 65.30 | -152 |
| 2022 | 15289 | 10606 | 69.37 | -760 |
| 2023 | 19317 | 14039 | 72.68 | 4028 |
| 2024 | 25923 | 19108 | 73.71 | 6606 |
| 2025 | 36468 | 27394 | 75.12 | 10545 |

## Growth and highlight
- Compound yearly growth (works 2025 over works 2016, to the power one ninth, minus 1): **12.21%** (unrounded 12.213736…%, 2 decimals, half away from zero)
- Year with the highest open-access share: **2025** (75.12%)

## Raw meta counts per pull
- PULL 1 (2026-11-22): works query **184790**, open-access query **121979**
- PULL 2 (2026-11-23): works query **183456**, open-access query **120690**
- PULL 3 (2026-11-24): works query **183369**, open-access query **120711**

## Changes: PULL 2 vs PULL 1
Rows: 10 later = 10 earlier + 0 new - 0 gone.
New: 0
Gone: 0
Changed: 20
- 2016 works: 12885 -> 12909
- 2016 oa: 6206 -> 6187
- 2017 works: 12159 -> 12123
- 2017 oa: 6297 -> 6295
- 2018 works: 14058 -> 14007
- 2018 oa: 7852 -> 7834
- 2019 works: 15218 -> 15032
- 2019 oa: 9121 -> 8936
- 2020 works: 16195 -> 16187
- 2020 oa: 9758 -> 9749
- 2021 works: 16264 -> 16037
- 2021 oa: 10681 -> 10484
- 2022 works: 15386 -> 15278
- 2022 oa: 10687 -> 10578
- 2023 works: 19376 -> 19333
- 2023 oa: 14100 -> 14055
- 2024 works: 26210 -> 26006
- 2024 oa: 19340 -> 19151
- 2025 works: 37039 -> 36544
- 2025 oa: 27937 -> 27421

## Changes: PULL 3 vs PULL 2
Rows: 10 later = 10 earlier + 0 new - 0 gone.
New: 0
Gone: 0
Changed: 20
- 2016 works: 12909 -> 12927
- 2016 oa: 6187 -> 6222
- 2017 works: 12123 -> 12132
- 2017 oa: 6295 -> 6306
- 2018 works: 14007 -> 14021
- 2018 oa: 7834 -> 7867
- 2019 works: 15032 -> 15042
- 2019 oa: 8936 -> 8934
- 2020 works: 16187 -> 16201
- 2020 oa: 9749 -> 9755
- 2021 works: 16037 -> 16049
- 2021 oa: 10484 -> 10480
- 2022 works: 15278 -> 15289
- 2022 oa: 10578 -> 10606
- 2023 works: 19333 -> 19317
- 2023 oa: 14055 -> 14039
- 2024 works: 26006 -> 25923
- 2024 oa: 19151 -> 19108
- 2025 works: 36544 -> 36468
- 2025 oa: 27421 -> 27394

## Data files
- nlp-by-year-pull1.csv — 10 rows, SHA-256 dd4ac103900f204d76ae5a2618cca3027466c7f7df23079fbb03d00fc6ceaf90 (Corrected PULL 1: rebuilt with the exact listed columns)
- nlp-by-year-pull2.csv — 10 rows, SHA-256 b518de02d0d243f2aa81e93eb2753acf069a49b89ac196d0a74460211a770f12 (Corrected PULL 2: rebuilt with the exact listed columns)
- nlp-by-year-pull3.csv — 10 rows, SHA-256 d0855711aafeefaaf1b894a80e83b7ed749d863faa689237854d69b5bd51e804 (PULL 3: fresh pull 2026-11-24, exact listed columns)
Columns of every CSV, in this order: year, works, oa works, oa share, works change. works change = absolute change in works from the year before (2016: none). Shares are 2 decimals, half away from zero, from unrounded values.

## PROOF
### PULL 1 — 2026-11-22
- R1: GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-22 15:58:26 UTC — HTTP 200 — meta count 184790
- R2: GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025,open_access.is_oa:true&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-22 15:58:26 UTC — HTTP 200 — meta count 121979
- Date header (source time) R1: Sun, 22 Nov 2026 15:58:27 GMT
- Date header (source time) R2: Sun, 22 Nov 2026 15:58:27 GMT
```json
{"key": "2016", "count": 12885}
{"key": "2017", "count": 12159}
{"key": "2018", "count": 14058}
{"key": "2019", "count": 15218}
{"key": "2020", "count": 16195}
{"key": "2021", "count": 16264}
{"key": "2022", "count": 15386}
{"key": "2023", "count": 19376}
{"key": "2024", "count": 26210}
{"key": "2025", "count": 37039}
```
```json
{"key": "2016", "count": 6206}
{"key": "2017", "count": 6297}
{"key": "2018", "count": 7852}
{"key": "2019", "count": 9121}
{"key": "2020", "count": 9758}
{"key": "2021", "count": 10681}
{"key": "2022", "count": 10687}
{"key": "2023", "count": 14100}
{"key": "2024", "count": 19340}
{"key": "2025", "count": 27937}
```

### PULL 2 — 2026-11-23
- R1: GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-23 15:59:21 UTC — HTTP 200 — meta count 183456
- R2: GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025,open_access.is_oa:true&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-23 15:59:22 UTC — HTTP 200 — meta count 120690
- Date header (source time) R1: Mon, 23 Nov 2026 15:59:22 GMT
- Date header (source time) R2: Mon, 23 Nov 2026 15:59:22 GMT
```json
{"key": "2016", "count": 12909}
{"key": "2017", "count": 12123}
{"key": "2018", "count": 14007}
{"key": "2019", "count": 15032}
{"key": "2020", "count": 16187}
{"key": "2021", "count": 16037}
{"key": "2022", "count": 15278}
{"key": "2023", "count": 19333}
{"key": "2024", "count": 26006}
{"key": "2025", "count": 36544}
```
```json
{"key": "2016", "count": 6187}
{"key": "2017", "count": 6295}
{"key": "2018", "count": 7834}
{"key": "2019", "count": 8936}
{"key": "2020", "count": 9749}
{"key": "2021", "count": 10484}
{"key": "2022", "count": 10578}
{"key": "2023", "count": 14055}
{"key": "2024", "count": 19151}
{"key": "2025", "count": 27421}
```

### PULL 3 — 2026-11-24 (fresh pull, source of the attached PULL 3 CSV)
- R1: GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-24 18:09:14 UTC — HTTP 200 — meta count 183369
- R2: GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025,open_access.is_oa:true&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-24 18:09:14 UTC — HTTP 200 — meta count 120711
- Date header (source time) R1: Tue, 24 Nov 2026 18:09:14 GMT
- Date header (source time) R2: Tue, 24 Nov 2026 18:09:14 GMT
```json
[
 {
  "key": "2016",
  "key_display_name": "2016",
  "count": 12927
 },
 {
  "key": "2017",
  "key_display_name": "2017",
  "count": 12132
 },
 {
  "key": "2018",
  "key_display_name": "2018",
  "count": 14021
 },
 {
  "key": "2019",
  "key_display_name": "2019",
  "count": 15042
 },
 {
  "key": "2020",
  "key_display_name": "2020",
  "count": 16201
 },
 {
  "key": "2021",
  "key_display_name": "2021",
  "count": 16049
 },
 {
  "key": "2022",
  "key_display_name": "2022",
  "count": 15289
 },
 {
  "key": "2023",
  "key_display_name": "2023",
  "count": 19317
 },
 {
  "key": "2024",
  "key_display_name": "2024",
  "count": 25923
 },
 {
  "key": "2025",
  "key_display_name": "2025",
  "count": 36468
 }
]
```
```json
[
 {
  "key": "2016",
  "key_display_name": "2016",
  "count": 6222
 },
 {
  "key": "2017",
  "key_display_name": "2017",
  "count": 6306
 },
 {
  "key": "2018",
  "key_display_name": "2018",
  "count": 7867
 },
 {
  "key": "2019",
  "key_display_name": "2019",
  "count": 8934
 },
 {
  "key": "2020",
  "key_display_name": "2020",
  "count": 9755
 },
 {
  "key": "2021",
  "key_display_name": "2021",
  "count": 10480
 },
 {
  "key": "2022",
  "key_display_name": "2022",
  "count": 10606
 },
 {
  "key": "2023",
  "key_display_name": "2023",
  "count": 14039
 },
 {
  "key": "2024",
  "key_display_name": "2024",
  "count": 19108
 },
 {
  "key": "2025",
  "key_display_name": "2025",
  "count": 27394
 }
]
```
