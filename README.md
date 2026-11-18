# Token Radar — make.fun token-radar-01 entry

A token launch radar: it reads the sealed DefiLlama snapshot, ranks every pre-token protocol
by an implied value derived from the snapshot's own figures, and shows a reader how to farm
each one. The dashboard is a self-contained static page — no framework, no network, no webfont.

## Run

```
node main.ts --input /input/snapshot.json          # grader layout: writes to /output
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts --input path/to/snapshot.json
```

Node 22+, standard library only. The program writes `board.json`, `data.js`, `dashboard/`,
`screenshots/` and `dossier.json` into the output directory.

## The model

One function scores every protocol; no name is special-cased and no row is hand-picked.

```
implied = round( tvl × 0.25
              × (1 + clamp(change_7d, -60, 120) / 100 × 0.5)
              × (0.6 + min(age_days, 1095) / 1095 × 0.4) )
```

- **Base** — a token would need to be worth a quarter of what the protocol holds.
- **Growth** — seven-day TVL change lifts or cuts the estimate, clamped for outliers.
- **Maturity** — how long the protocol has run with no token, from `listed_at`.

The board covers every watchlist slug (40 here) and adds 160 early pre-token protocols below
the $50M floor — the watchlist is the floor, never the ceiling. The 24 live-token protocols
are set aside with their market caps, so a market fact is never mixed into the ranked board.

The page recomputes every row in front of the reader and marks each with a "model check ✓"
when its arithmetic matches `board.json`.

## The dashboard

`dashboard/index.html`, `dashboard/app.css`, `dashboard/app.js` read `data.js` (written beside
`dashboard/`) and render: the ranked board with TVL, growth and implied-value bars; a detail
drawer per protocol with the full arithmetic and a six-step farm plan with cost and time
chips; search, category filter and a pre-token / live-token toggle. All state is in the URL
hash, so views are linkable.

## Repository layout

```
main.ts            entrypoint: snapshot in, board + dashboard + dossier out
lib/model.ts       the model, farm-plan derivation, board validation
dashboard/         the static page
screenshots/       1-board, 2-detail, 3-filtered
vendor/makefun-board.ts   make.fun's buildDossier, vendored unchanged
```

MIT licensed.
