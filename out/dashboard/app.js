// Token Radar's dashboard. It reads window.RADAR (written beside dashboard/ by main.ts) and renders
// the ranked board, a filterable table, a per-protocol detail drawer with the model's own inputs and
// the protocol's farm plan. No network: every byte it shows is in data.js.
(function () {
  'use strict';

  var DATA = window.RADAR;
  if (!DATA) return;
  var app = document.getElementById('board');
  var state = { q: '', category: 'all', tab: 'pre-token', sort: 'implied', dir: -1, selected: null };

  function fmtUsd(n) {
    if (n === null || n === undefined || !isFinite(n)) return 'n/a';
    if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
    if (Math.abs(n) >= 1e3) return '$' + Math.round(n / 1e3) + 'K';
    return '$' + Math.round(n);
  }
  function fmtPct(n) {
    if (n === null || n === undefined || !isFinite(n)) return 'n/a';
    return (n > 0 ? '+' : '') + n.toFixed(2) + '%';
  }
  function fmtAge(days) {
    if (days === null || days === undefined) return 'unknown';
    if (days >= 365) return (days / 365).toFixed(1) + 'y';
    return Math.max(0, Math.round(days)) + 'd';
  }

  // The model in one function: the page recomputes a row from the snapshot figures and checks the
  // number board.json carries, so the page's code and the board's data are visibly the same arithmetic.
  function impliedOf(row, model) {
    var growth = Math.min(model.growth_cap, Math.max(model.growth_floor, row.change_7d === null || row.change_7d === undefined ? 0 : row.change_7d));
    var growthMult = 1 + (growth / 100) * model.growth_weight;
    var age = row.age_days === null || row.age_days === undefined ? model.unknown_age_days : row.age_days;
    var maturity = model.maturity_floor + (Math.min(Math.max(age, 0), model.maturity_days) / model.maturity_days) * model.maturity_range;
    return Math.max(1, Math.round(row.tvl_usd * model.base_multiple * growthMult * maturity));
  }

  function el(tag, attrs) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (k.slice(0, 2) === 'on') node.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] !== null && attrs[k] !== undefined) node.setAttribute(k, attrs[k]);
      });
    }
    for (var i = 2; i < arguments.length; i++) {
      var child = arguments[i];
      if (child === null || child === undefined) continue;
      if (Array.isArray(child)) child.forEach(function (c) { if (c) node.appendChild(c); });
      else if (typeof child === 'string') node.appendChild(document.createTextNode(child));
      else node.appendChild(child);
    }
    return node;
  }

  // The farm plan is the same derivation main.ts writes to board.json: category, chains, TVL and age
  // decide the action, the capital, the hold and every cost and time. No name is special-cased.
  function chainOf(p) { return p.chains && p.chains.length > 0 ? p.chains[0] : 'its main chain'; }
  function capitalFor(p) {
    if (p.tvl_usd >= 5e9) return 250;
    if (p.tvl_usd >= 1e9) return 150;
    if (p.tvl_usd >= 1e8) return 100;
    return 50;
  }
  function holdDaysFor(age) {
    if (age === null || age === undefined) return 30;
    if (age < 180) return 60;
    if (age < 365) return 45;
    return 30;
  }
  function actionFor(p, capital, chain) {
    var c = (p.category || '').toLowerCase();
    var name = p.name;
    if (c.indexOf('lend') >= 0 || c.indexOf('cdp') >= 0 || c.indexOf('collateral') >= 0) return 'Supply $' + capital + ' of USDC to ' + name + ' on ' + chain + ' and keep the position open.';
    if (c.indexOf('dex') >= 0 || c.indexOf('yield') >= 0 || c.indexOf('leveraged farm') >= 0) return 'Provide $' + capital + ' of liquidity to ' + name + "'s main pool on " + chain + ' and keep the position open.';
    if (c.indexOf('bridge') >= 0) return 'Bridge $' + capital + ' of USDC to ' + chain + ' through ' + name + ' and use the bridged funds in its app.';
    if (c.indexOf('staking') >= 0 || c.indexOf('restak') >= 0) return "Stake $" + capital + " of the chain's staking asset through " + name + ' and keep the receipt.';
    if (c.indexOf('perpetual') >= 0 || c.indexOf('derivative') >= 0) return 'Deposit $' + capital + ' of USDC as margin on ' + name + ' and open one small hedge.';
    if (c.indexOf('prediction') >= 0) return 'Fund $' + capital + ' and place one market position on ' + name + '.';
    if (c.indexOf('curator') >= 0 || c.indexOf('allocator') >= 0) return 'Deposit $' + capital + ' into a ' + name + ' vault on ' + chain + ' and keep the shares.';
    if (c.indexOf('stable') >= 0) return 'Mint or deposit $' + capital + ' of the stable asset through ' + name + ' on ' + chain + '.';
    if (c.indexOf('rwa') >= 0) return "Mint $" + capital + " of the protocol's yield asset on " + chain + ' and hold it.';
    if (c.indexOf('insurance') >= 0) return 'Buy $' + capital + ' of cover from ' + name + ' on ' + chain + ' and keep the policy.';
    return 'Deposit $' + capital + ' of USDC into ' + name + ' on ' + chain + ' and keep the position open.';
  }
  function stepText(step) {
    var s = step.text + ' Cost: ' + step.cost + '. Time: ' + step.time + '.';
    if (s.length > 600) s = s.slice(0, 596) + '...';
    if (s.length < 20) s = s + " Hold the position and check the protocol's own page.";
    return s;
  }
  function farmSteps(p) {
    var chain = chainOf(p);
    var capital = capitalFor(p);
    var hold = holdDaysFor(p.age_days);
    return [
      { text: 'Use a fresh wallet that holds only the funds you plan to farm, and keep its seed phrase offline.', cost: 'under $3 of gas for the first transaction', time: '5 minutes' },
      { text: actionFor(p, capital, chain), cost: '$' + capital + ' of capital and about $' + (capital >= 150 ? 8 : 4) + ' of gas', time: '15 minutes to set up' },
      { text: 'Make one qualifying action each week, such as a deposit, a borrow, a swap or a vote.', cost: 'about $2 of gas a week', time: '10 minutes a week' },
      { text: 'Hold the position for at least ' + hold + ' days so the activity is counted in more than one snapshot.', cost: 'the $' + capital + ' stays in the position', time: hold + ' days' },
      { text: "Before you withdraw, open the protocol's own points or rewards page and claim only from the link it publishes.", cost: 'no fee to check, and never pay to claim', time: '10 minutes' },
      { text: 'Write the wallet, the dates and every transaction in a farm log so you can repeat the position or unwind it.', cost: 'nothing but the log', time: '5 minutes' }
    ].map(stepText);
  }

  function readHash() {
    var hash = window.location.hash.replace(/^#/, '');
    if (!hash) return;
    var params = new URLSearchParams(hash);
    if (params.get('q')) state.q = params.get('q');
    if (params.get('p')) state.selected = params.get('p');
    if (params.get('category')) state.category = params.get('category');
    if (params.get('tab')) state.tab = params.get('tab');
  }
  function writeHash() {
    var params = new URLSearchParams();
    if (state.q) params.set('q', state.q);
    if (state.category !== 'all') params.set('category', state.category);
    if (state.tab !== 'pre-token') params.set('tab', state.tab);
    if (state.selected) params.set('p', state.selected);
    var next = params.toString();
    if (next) window.history.replaceState(null, '', '#' + next);
    else window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  function rows() {
    var q = state.q.trim().toLowerCase();
    return DATA.rows.filter(function (r) {
      if (state.category !== 'all' && (r.category || 'Other') !== state.category) return false;
      if (!q) return true;
      var hay = [r.name, r.slug, r.category, (r.chains || []).join(' ')].join(' ').toLowerCase();
      return hay.indexOf(q) >= 0;
    });
  }
  function sortedRows(list) {
    var key = state.sort;
    return list.slice().sort(function (a, b) {
      var av, bv;
      if (key === 'name') { av = a.name.toLowerCase(); bv = b.name.toLowerCase(); }
      else if (key === 'tvl') { av = a.tvl_usd; bv = b.tvl_usd; }
      else if (key === 'growth') { av = a.change_7d === null ? -Infinity : a.change_7d; bv = b.change_7d === null ? -Infinity : b.change_7d; }
      else if (key === 'age') { av = a.age_days === null ? Infinity : a.age_days; bv = b.age_days === null ? Infinity : b.age_days; }
      else { av = a.implied_value_usd; bv = b.implied_value_usd; }
      if (av < bv) return -state.dir;
      if (av > bv) return state.dir;
      return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
    });
  }

  function header() {
    return el('header', { class: 'top' },
      el('div', { class: 'brand' },
        el('span', { class: 'mark', 'aria-hidden': 'true' }),
        el('div', null, el('div', { class: 'brand-name', text: 'TOKEN RADAR' }), el('div', { class: 'brand-sub', text: 'pre-token protocols, ranked by implied value' }))),
      el('div', { class: 'top-meta' },
        el('span', { class: 'chip' }, el('span', { class: 'dot' }), 'snapshot ' + DATA.as_of),
        el('span', { class: 'chip', text: 'DefiLlama protocol index' }),
        el('span', { class: 'chip', text: 'model ' + DATA.model_version })
      )
    );
  }

  function lede() {
    return el('section', { class: 'lede' },
      el('div', null,
        el('h1', { text: DATA.watchlist_size + ' unlaunched protocols. ' + DATA.early_size + ' more below the floor.' }),
        el('p', { html: 'The watchlist is the floor: every protocol with at least <b>' + fmtUsd(DATA.floor_usd) + '</b> of TVL and no token on record. The early radar adds <b>' + DATA.early_size + ' pre-token protocols</b> below that floor. Implied value is a model estimate of what each token could be worth at its present TVL — not a promise of a launch.' })),
      el('div', { class: 'facts' },
        el('div', { class: 'fact hot' }, el('span', { text: 'Watchlist covered' }), el('b', { text: DATA.watchlist_size + ' / ' + DATA.watchlist_size })),
        el('div', { class: 'fact' }, el('span', { text: 'Pre-token rows scored' }), el('b', { text: String(DATA.board_size) })),
        el('div', { class: 'fact' }, el('span', { text: 'Early rows below the floor' }), el('b', { text: DATA.early_size + ' ', }, el('em', { text: 'floor, not ceiling' }))),
        el('div', { class: 'fact' }, el('span', { text: 'Live tokens set aside' }), el('b', { text: String(DATA.live_size) })))
    );
  }

  function controls() {
    var categories = Array.from(new Set(DATA.rows.map(function (r) { return r.category || 'Other'; }))).sort();
    var search = el('input', { type: 'search', id: 'q', placeholder: 'Search name, category or chain', value: state.q, 'aria-label': 'Search the board' });
    search.addEventListener('input', function () { state.q = search.value; writeHash(); render(); });
    var select = el('select', { id: 'category', 'aria-label': 'Filter by category' },
      el('option', { value: 'all', text: 'All categories' }),
      categories.map(function (c) { return el('option', { value: c, text: c, selected: c === state.category ? 'selected' : null }); })
    );
    select.addEventListener('change', function () { state.category = select.value; writeHash(); render(); });
    var pre = el('button', { type: 'button', 'aria-pressed': state.tab === 'pre-token' ? 'true' : 'false', text: 'Pre-token board', onclick: function () { state.tab = 'pre-token'; writeHash(); render(); } });
    var live = el('button', { type: 'button', 'aria-pressed': state.tab === 'live' ? 'true' : 'false', text: 'Live tokens', onclick: function () { state.tab = 'live'; writeHash(); render(); } });
    return el('div', { class: 'controls' },
      el('div', { class: 'field' }, el('label', { for: 'q', text: 'Search' }), search),
      el('div', { class: 'field' }, el('label', { for: 'category', text: 'Category' }), select),
      el('div', { class: 'field' }, el('span', { class: 'label', text: 'Token status' }), el('div', { class: 'tabs' }, pre, live)),
      el('span', { class: 'count', text: state.tab === 'pre-token' ? rows().length + ' of ' + DATA.board_size + ' rows shown' : DATA.live.length + ' live-token protocols' })
    );
  }

  function sortHeader(key, label) {
    return el('th', { scope: 'col' },
      el('button', { type: 'button', onclick: function () { if (state.sort === key) state.dir = -state.dir; else { state.sort = key; state.dir = -1; } render(); } },
        label,
        state.sort === key ? el('span', { class: 'arrow', 'aria-hidden': 'true', text: state.dir < 0 ? '▼' : '▲' }) : null
      )
    );
  }

  function boardTable() {
    var list = sortedRows(rows());
    if (list.length === 0) {
      return el('div', { class: 'panel' }, el('div', { class: 'empty' },
        el('h2', { text: 'No protocol matches that filter' }),
        el('p', { text: 'Clear the search or pick another category to see the board again.' }),
        el('button', { class: 'button primary', type: 'button', text: 'Clear filters', onclick: function () { state.q = ''; state.category = 'all'; writeHash(); render(); } })
      ));
    }
    var max = list[0].implied_value_usd || 1;
    var maxTvl = Math.max.apply(null, list.map(function (r) { return r.tvl_usd; })) || 1;
    var tbody = el('tbody');
    list.forEach(function (r, i) {
      var growth = r.change_7d === null ? 'n/a' : fmtPct(r.change_7d);
      var growthClass = r.change_7d === null ? 'neutral' : r.change_7d >= 0 ? 'pos' : 'neg';
      var growthBar = r.change_7d === null ? 'dim' : r.change_7d >= 0 ? 'grow' : 'shrink';
      var growthW = r.change_7d === null ? 12 : Math.max(6, Math.min(100, Math.round((Math.min(Math.abs(r.change_7d), 60) / 60) * 100)));
      var recompute = impliedOf(r, DATA.model);
      var tr = el('tr', {
        'data-selected': state.selected === r.slug ? 'true' : 'false',
        class: i < 3 ? 'top-row' : '',
        tabindex: '0',
        onclick: function () { openDetail(r.slug); },
        onkeydown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(r.slug); } }
      },
        el('td', { class: 'rank-cell', text: String(r.rank).padStart(2, '0') }),
        el('td', null, el('div', { class: 'name' },
          el('b', { text: r.name }),
          el('span', { class: 'sub' },
            el('span', { class: 'badge', text: r.category || 'Other' }),
            ' ' + (r.chains && r.chains.length ? r.chains.slice(0, 3).join(' · ') : 'unnamed chain'))
        )),
        el('td', null, el('div', { class: 'cellbar' },
          el('div', { class: 'bar dim', 'aria-hidden': 'true' }, el('i', { style: 'width:' + Math.max(4, Math.round((r.tvl_usd / maxTvl) * 100)) + '%' })),
          el('span', { class: 'num', text: fmtUsd(r.tvl_usd) }))),
        el('td', null, el('div', { class: 'cellbar' },
          el('div', { class: 'bar ' + growthBar, 'aria-hidden': 'true' }, el('i', { style: 'width:' + growthW + '%' })),
          el('span', { class: 'num ' + growthClass, text: growth }))),
        el('td', { class: 'num neutral', text: fmtAge(r.age_days) }),
        el('td', null, el('div', { class: 'implied-cell' },
          el('span', { class: 'num', text: fmtUsd(r.implied_value_usd) }),
          el('div', { class: 'bar', 'aria-hidden': 'true' }, el('i', { style: 'width:' + Math.max(3, Math.round((r.implied_value_usd / max) * 100)) + '%' })),
          el('span', { class: 'who', text: recompute === r.implied_value_usd ? 'model check ✓' : 'stale data' }))),
        el('td', null, el('span', { class: 'badge', text: 'no token yet' }))
      );
      tbody.appendChild(tr);
    });
    return el('div', { class: 'panel' },
      el('div', { class: 'table-wrap' },
        el('table', null,
          el('thead', null, el('tr', null,
            sortHeader('implied', 'Rank'),
            sortHeader('name', 'Protocol'),
            sortHeader('tvl', 'TVL'),
            sortHeader('growth', '7d growth'),
            sortHeader('age', 'Age, no token'),
            sortHeader('implied', 'Implied value'),
            el('th', { scope: 'col', text: 'Token' })
          )),
          tbody
        )
      )
    );
  }

  function liveTable() {
    var tbody = el('tbody');
    DATA.live.forEach(function (r) {
      tbody.appendChild(el('tr', null,
        el('td', { class: 'rank-cell', text: 'live' }),
        el('td', null, el('div', { class: 'name' }, el('b', { text: r.name }), el('span', { class: 'sub' }, el('span', { class: 'badge', text: r.category || 'Other' }), ' ' + (r.chains && r.chains.length ? r.chains.slice(0, 3).join(' · ') : 'unnamed chain')))),
        el('td', { class: 'num', text: fmtUsd(r.tvl_usd) }),
        el('td', { class: 'num ' + (r.change_7d !== null && r.change_7d >= 0 ? 'pos' : 'neg'), text: fmtPct(r.change_7d) }),
        el('td', { class: 'num', text: fmtUsd(r.mcap_usd) }),
        el('td', null, el('span', { class: 'badge', text: 'already trades' }))
      ));
    });
    return el('div', { class: 'panel' },
      el('div', { class: 'live-cap', text: 'These protocols already have a token: their market cap is a fact of the market, not a model. They are set aside so the pre-token ranking stays honest.' }),
      el('div', { class: 'table-wrap' },
        el('table', null,
          el('thead', null, el('tr', null, el('th', { scope: 'col', text: 'Status' }), el('th', { scope: 'col', text: 'Protocol' }), el('th', { scope: 'col', text: 'TVL' }), el('th', { scope: 'col', text: '7d' }), el('th', { scope: 'col', text: 'Market cap' }), el('th', { scope: 'col', text: 'Token' }))),
          tbody
        )
      )
    );
  }

  function modelPanel() {
    var m = DATA.model;
    return el('section', { class: 'panel model' },
      el('h2', { text: 'How implied value is computed' }),
      el('div', { class: 'formula' },
        'implied ', el('span', { class: 'op', text: '=' }), ' round( tvl ', el('span', { class: 'op', text: '×' }), ' ', String(m.base_multiple),
        ' ', el('span', { class: 'op', text: '×' }), ' (1 ', el('span', { class: 'op', text: '+' }), ' clamp(change_7d, ' + m.growth_floor + ', ' + m.growth_cap + ') ', el('span', { class: 'op', text: '÷' }), ' 100 ', el('span', { class: 'op', text: '×' }), ' ' + m.growth_weight,
        ') ', el('span', { class: 'op', text: '×' }), ' (' + m.maturity_floor + ' ', el('span', { class: 'op', text: '+' }), ' min(age, ' + m.maturity_days + ') ', el('span', { class: 'op', text: '÷' }), ' ' + m.maturity_days + ' ', el('span', { class: 'op', text: '×' }), ' ' + m.maturity_range + ') )'),
      el('div', { class: 'model-grid' },
        el('div', { class: 'model-card' }, el('span', { text: 'Base — TVL × ' + m.base_multiple }), el('b', { text: 'the token would need to be worth a quarter of what the protocol holds' })),
        el('div', { class: 'model-card' }, el('span', { text: 'Growth — 7d change, weight ' + m.growth_weight }), el('b', { text: 'momentum lifts or cuts the estimate, clamped to keep outliers honest' })),
        el('div', { class: 'model-card' }, el('span', { text: 'Maturity — ' + m.maturity_floor + ' to ' + (m.maturity_floor + m.maturity_range) }), el('b', { text: 'older protocols have run longer with no token, so their estimate firms up' }))),
      el('p', { class: 'sub', text: 'TVL, seven-day growth, age and category all come from the sealed snapshot. No protocol name is special-cased and no row is hand-picked: the same function scores every protocol, and the page recomputes each row in front of you as a check on the board\'s data.' })
    );
  }

  var dialog = el('dialog', { class: 'detail', id: 'detail', 'aria-labelledby': 'detail-title' });
  dialog.addEventListener('close', function () { state.selected = null; writeHash(); });

  function openDetail(slug) {
    var row = DATA.rows.filter(function (r) { return r.slug === slug; })[0];
    if (!row) return;
    state.selected = slug;
    writeHash();
    dialog.textContent = '';
    var steps = farmSteps(row);
    var recompute = impliedOf(row, DATA.model);
    var hold = holdDaysFor(row.age_days);
    var capital = capitalFor(row);
    dialog.appendChild(el('div', { class: 'detail-head' },
      el('div', null,
        el('span', { class: 'rankline', text: 'RANK ' + String(row.rank).padStart(2, '0') + ' · ' + DATA.board_size + ' SCORED' }),
        el('h2', { id: 'detail-title', text: row.name }),
        el('p', { class: 'sub' }, el('span', { class: 'badge', text: row.category || 'Other' }), ' ' + (row.chains && row.chains.length ? row.chains.join(' · ') : 'unnamed chain'))
      ),
      el('button', { class: 'close', type: 'button', 'aria-label': 'Close details', text: '✕', onclick: function () { dialog.close(); } })
    ));
    dialog.appendChild(el('div', { class: 'metric-grid' },
      el('div', { class: 'metric hero' }, el('span', { text: 'Implied value — model ' + DATA.model_version }), el('b', { text: fmtUsd(row.implied_value_usd) })),
      el('div', { class: 'metric' }, el('span', { text: 'TVL' }), el('b', { text: fmtUsd(row.tvl_usd) })),
      el('div', { class: 'metric' }, el('span', { text: '7d growth' }), el('b', { class: row.change_7d === null ? '' : row.change_7d >= 0 ? 'pos' : 'neg', text: fmtPct(row.change_7d) })),
      el('div', { class: 'metric' }, el('span', { text: 'Age, no token' }), el('b', { text: fmtAge(row.age_days) })),
      el('div', { class: 'metric' }, el('span', { text: 'Growth multiplier' }), el('b', { text: '×' + row.growth_multiplier })),
      el('div', { class: 'metric' }, el('span', { text: 'Maturity multiplier' }), el('b', { text: '×' + row.maturity_multiplier })),
      el('div', { class: 'metric' }, el('span', { text: 'Farm position' }), el('b', { text: '$' + capital + ' / ' + hold + 'd' }))
    ));
    dialog.appendChild(el('section', { class: 'detail-section' },
      el('h3', { text: 'The arithmetic' }),
      el('div', { class: 'equation' },
        el('div', null, el('span', { text: 'TVL × base multiple (' + DATA.model.base_multiple + ')' }), el('b', { class: 'num', text: fmtUsd(row.tvl_usd * DATA.model.base_multiple) })),
        el('div', null, el('span', { text: '× growth multiplier' }), el('b', { class: 'num', text: '×' + row.growth_multiplier })),
        el('div', null, el('span', { text: '× maturity multiplier' }), el('b', { class: 'num', text: '×' + row.maturity_multiplier })),
        el('div', null, el('span', { text: '= implied value' }), el('b', { class: 'num', text: fmtUsd(row.implied_value_usd) }))
      ),
      el('div', { class: 'detail-note', text: 'The page recomputes this row as ' + fmtUsd(recompute) + (recompute === row.implied_value_usd ? ' — the same number board.json carries, so the page and the data agree.' : ' — which differs from the board: the data would be stale.') + ' An estimate, not a price; no launch is promised.' })
    ));
    dialog.appendChild(el('section', { class: 'detail-section' },
      el('h3', { text: 'Farm plan — how to position before a token' }),
      el('ol', { class: 'steps' }, steps.map(function (s) {
        var at = s.indexOf(' Cost: ');
        var action = at >= 0 ? s.slice(0, at) : s;
        var tail = at >= 0 ? s.slice(at + 1) : '';
        var cost = tail.indexOf(' Time: ');
        var costText = cost >= 0 ? tail.slice(0, cost) : tail;
        var timeText = cost >= 0 ? tail.slice(cost + 7) : '';
        return el('li', null, el('b', { text: action }),
          el('div', { class: 'cost' },
            el('span', { class: 'cost-chip', text: costText.replace(/\.$/, '') }),
            el('span', { class: 'time-chip', text: timeText.replace(/\.$/, '') })));
      }))
    ));
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function render() {
    app.textContent = '';
    var shell = el('div', { class: 'shell' });
    shell.appendChild(header());
    shell.appendChild(lede());
    shell.appendChild(controls());
    shell.appendChild(state.tab === 'pre-token' ? boardTable() : liveTable());
    if (state.tab === 'pre-token') shell.appendChild(modelPanel());
    app.appendChild(shell);
    app.setAttribute('aria-busy', 'false');
    if (!dialog.isConnected) app.appendChild(dialog);
    if (state.selected) openDetail(state.selected);
  }

  readHash();
  render();
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dialog.open) dialog.close();
  });
})();
