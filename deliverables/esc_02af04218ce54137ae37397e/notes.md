# esc_02af04218ce54137ae37397e — NLP research OpenAlex (Rivet Research)

## PROOF PULL 1
- R1: GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-22 15:58:27 UTC — HTTP 200 — meta count 184790 (raw)
- R2: GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025,open_access.is_oa:true&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-22 15:58:27 UTC — HTTP 200 — meta count 121979 (raw)
- Source time R1 Date header: Sun, 22 Nov 2026 15:58:27 GMT
- Source time R2 Date header: Sun, 22 Nov 2026 15:58:27 GMT
- PULL 1: 10 rows, SHA-256 49848b5bdbac317f77821ee9f9c4ffe817a9fa4da789d4d32e13e23789a59461
- Compound yearly growth (works 2025 over works 2016, ^1/9 - 1): 12.4483%
- Year with highest open-access share: 2025 (75.43%)
- CSV saved as pull1.csv (both meta counts above are raw; each pull repeats both)

## PULL 2: 10 rows, SHA-256 c14096274f36777bd88bec29c5afbb20498ae9d5c93ab68bd7575e8b41441bee
- GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-23 15:59:21 UTC — HTTP 200 — meta count raw 183456 — Date header (source time) Mon, 23 Nov 2026 15:59:22 GMT
- GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025,open_access.is_oa:true&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-23 15:59:22 UTC — HTTP 200 — meta count raw 120690 — Date header (source time) Mon, 23 Nov 2026 15:59:22 GMT
- CSV saved as pull 2.csv

## PULL 3: 10 rows, SHA-256 ad8145a89e3389533a538b1d99d1016813b2923ccb0c16e56acb6b52707c7f39
- GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-24 15:45:10 UTC — HTTP 200 — Date header (source time) Tue, 24 Nov 2026 15:45:10 GMT
- GET https://api.openalex.org/works?filter=topics.id:T10181,publication_year:2016-2025,open_access.is_oa:true&group_by=publication_year&mailto=rivet-research@example.com — 2026-11-24 15:45:10 UTC — HTTP 200 — Date header (source time) Tue, 24 Nov 2026 15:45:10 GMT
- CSV saved as pull3.csv
