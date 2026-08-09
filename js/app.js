const PREFIX = "woodmanager-v022:";
const OLD_PREFIX = "woodmanager-v021:";

const VERSES = [
  { reference: "Salmos 23:1", text: "JEHOVÁ es mi pastor; nada me faltará." },
  { reference: "Salmos 23:4", text: "Aunque ande en valle de sombra de muerte, no temeré mal alguno; porque tú estarás conmigo: tu vara y tu cayado me infundirán aliento." },
  { reference: "Salmos 119:105", text: "Lámpara es á mis pies tu palabra, Y lumbrera á mi camino." },
  { reference: "Salmos 119:114", text: "Mi escondedero y mi escudo eres tú: En tu palabra he esperado." },
  { reference: "Salmos 119:165", text: "Mucha paz tienen los que aman tu ley; Y no hay para ellos tropiezo." },
  { reference: "Proverbios 3:5-6", text: "Fíate de Jehová de todo tu corazón, Y no estribes en tu prudencia. Reconócelo en todos tus caminos, Y él enderezará tus veredas." },
  { reference: "Proverbios 3:13-14", text: "Bienaventurado el hombre que halla la sabiduría, Y que obtiene la inteligencia: Porque su mercadería es mejor que la mercadería de la plata, Y sus frutos más que el oro fino." },
  { reference: "Proverbios 3:24", text: "Cuando te acostares, no tendrás temor; Antes te acostarás, y tu sueño será suave." },
  { reference: "Mateo 6:33", text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas." },
  { reference: "Juan 3:16", text: "Porque de tal manera amó Dios al mundo, que ha dado á su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna." },
  { reference: "Romanos 8:28", text: "Y sabemos que á los que á Dios aman, todas las cosas les ayudan á bien, es á saber, á los que conforme al propósito son llamados." },
  { reference: "Filipenses 4:6-7", text: "Por nada estéis afanosos; sino sean notorias vuestras peticiones delante de Dios en toda oración y ruego, con hacimiento de gracias. Y la paz de Dios, que sobrepuja todo entendimiento, guardará vuestros corazones y vuestros entendimientos en Cristo Jesús." },
  { reference: "Filipenses 4:13", text: "Todo lo puedo en Cristo que me fortalece." },
  { reference: "Filipenses 4:19", text: "Mi Dios, pues, suplirá todo lo que os falta conforme á sus riquezas en gloria en Cristo Jesús." }
];

const DEFAULT_CATEGORIES = {
  expense: ["Comida", "Salidas", "Transporte", "Combustible", "Servicios", "Compras personales", "Materiales", "Herramientas", "Otros"],
  income: ["Venta de productos", "Trabajos por encargo", "Cobros pendientes", "Otros ingresos"]
};

const DEFAULT_SETTINGS = {
  openingBalance: 0,
  openingBalanceConfigured: false,
  hourlyRate: 250,
  theme: "system",
  accent: "green",
  showWelcome: true,
  showSeconds: false,
  verseInterval: 30,
  privacyOnStart: false,
  dashboardCards: [
    { id: "balance", visible: true },
    { id: "expense", visible: true },
    { id: "income", visible: true }
  ]
};

const state = {
  transactions: loadMigrated("transactions", []),
  limits: normalizeLimits(loadMigrated("limits", {})),
  categories: normalizeCategories(loadMigrated("categories", DEFAULT_CATEGORIES)),
  savedVerses: loadNew("savedVerses", []),
  settings: normalizeSettings(loadMigrated("settings", {}))
};

let currentVerse = null;
let privacyHidden = Boolean(state.settings.privacyOnStart);
let toastTimer = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const money = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "UYU",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadRaw(prefix, key) {
  try {
    const raw = localStorage.getItem(prefix + key);
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
}

function loadNew(key, fallback) {
  const value = loadRaw(PREFIX, key);
  return value === null ? clone(fallback) : value;
}

function loadMigrated(key, fallback) {
  const current = loadRaw(PREFIX, key);
  if (current !== null) return current;

  const older = loadRaw(OLD_PREFIX, key);
  if (older !== null) {
    localStorage.setItem(PREFIX + key, JSON.stringify(older));
    return older;
  }

  return clone(fallback);
}

function save(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

function normalizeCategories(value) {
  return {
    expense: Array.isArray(value?.expense) ? value.expense : clone(DEFAULT_CATEGORIES.expense),
    income: Array.isArray(value?.income) ? value.income : clone(DEFAULT_CATEGORIES.income)
  };
}

function normalizeLimits(value) {
  const normalized = {};
  Object.entries(value || {}).forEach(([category, limit]) => {
    normalized[category] = typeof limit === "number"
      ? { amount: limit, description: "" }
      : { amount: Number(limit?.amount) || 0, description: String(limit?.description || "") };
  });
  return normalized;
}

function normalizeSettings(value) {
  const settings = { ...DEFAULT_SETTINGS, ...(value || {}) };

  if (!("openingBalanceConfigured" in (value || {}))) {
    settings.openingBalanceConfigured = Number(settings.openingBalance) !== 0;
  }

  if (!Array.isArray(settings.dashboardCards)) {
    settings.dashboardCards = clone(DEFAULT_SETTINGS.dashboardCards);
  }

  const validCards = ["balance", "expense", "income"];
  settings.dashboardCards = settings.dashboardCards
    .filter((item) => validCards.includes(item.id))
    .map((item) => ({ id: item.id, visible: item.visible !== false }));

  validCards.forEach((id) => {
    if (!settings.dashboardCards.some((item) => item.id === id)) {
      settings.dashboardCards.push({ id, visible: true });
    }
  });

  return settings;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(value) {
  return money.format(Number(value) || 0);
}

function formatInputMoney(value) {
  return Number(value || 0).toFixed(2).replace(".", ",");
}

function parseAmount(value) {
  let text = String(value ?? "").trim().replace(/\s/g, "");
  if (!text) return NaN;

  const hasComma = text.includes(",");
  const hasDot = text.includes(".");

  if (hasComma && hasDot) {
    if (text.lastIndexOf(",") > text.lastIndexOf(".")) {
      text = text.replaceAll(".", "").replace(",", ".");
    } else {
      text = text.replaceAll(",", "");
    }
  } else if (hasComma) {
    text = text.replace(",", ".");
  }

  const number = Number(text);
  return Number.isFinite(number) ? number : NaN;
}

function uid(prefix = "id") {
  return `${prefix}-${crypto.randomUUID ? crypto.randomUUID() : Date.now() + "-" + Math.random().toString(16).slice(2)}`;
}

function hardenTextFields(root = document) {
  root.querySelectorAll("[data-field]").forEach((field) => {
    field.setAttribute("autocomplete", "off");
    field.setAttribute("autocorrect", "off");
    field.setAttribute("autocapitalize", "off");
    field.setAttribute("spellcheck", "false");
    field.setAttribute("name", uid("arca-field"));
  });
}

function fieldValue(root, key) {
  return root.querySelector(`[data-field="${key}"]`)?.value ?? "";
}

function toast(message) {
  const element = $("#toast");
  clearTimeout(toastTimer);
  element.textContent = message;
  element.classList.add("show");
  toastTimer = setTimeout(() => element.classList.remove("show"), 2400);
}

function todayInput() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

function monthKey(value) {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function currentMonthKey() {
  return monthKey(new Date());
}

function monthTotals(key = currentMonthKey()) {
  const items = state.transactions.filter((item) => monthKey(item.date) === key);
  const income = items.filter((item) => item.type === "income").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const expense = items.filter((item) => item.type === "expense").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return { items, income, expense, net: income - expense };
}

function currentBalance() {
  return Number(state.settings.openingBalance || 0) +
    state.transactions.reduce((sum, item) => sum + (item.type === "income" ? Number(item.amount) : -Number(item.amount)), 0);
}

function initWelcome() {
  const screen = $("#welcomeScreen");
  const shell = $("#appShell");

  $("#welcomeDate").textContent = new Intl.DateTimeFormat("es-UY", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date());

  $("#welcomeBalance").textContent = privacyHidden ? "••••••" : formatMoney(currentBalance());

  const enter = () => {
    screen.classList.add("is-hidden");
    shell.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      if (screen.classList.contains("is-hidden")) screen.hidden = true;
    }, 450);
  };

  $("#enterApp").addEventListener("click", enter);

  if (!state.settings.showWelcome) {
    screen.hidden = true;
    shell.setAttribute("aria-hidden", "false");
  }
}

function initNavigation() {
  const go = (route) => {
    $$("[data-view]").forEach((view) => {
      const active = view.dataset.view === route;
      view.hidden = !active;
      view.classList.toggle("active", active);
    });

    $$("[data-route]").forEach((button) => {
      button.classList.toggle("active", button.dataset.route === route);
    });

    if (route === "home") renderHome();
    if (route === "finance") renderFinance();
    if (route === "saved") renderSaved();
    if (route === "settings") renderSettings();

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  $$("[data-route]").forEach((button) => {
    button.addEventListener("click", () => go(button.dataset.route));
  });

  go("home");
}

function initClock() {
  const tick = () => {
    const now = new Date();
    const hour = now.getHours();

    $("#headerGreeting").textContent = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
    $("#greeting").textContent = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";

    $("#liveDate").textContent = new Intl.DateTimeFormat("es-UY", {
      weekday: "short",
      day: "2-digit",
      month: "short"
    }).format(now);

    $("#liveTime").textContent = new Intl.DateTimeFormat("es-UY", {
      hour: "2-digit",
      minute: "2-digit",
      ...(state.settings.showSeconds ? { second: "2-digit" } : {})
    }).format(now);

    updateVerse();
  };

  tick();
  setInterval(tick, 1000);
}

function dashboardCardDefinition(id, totals) {
  const definitions = {
    balance: {
      label: "Saldo actual",
      value: currentBalance(),
      helper: "Ingresos menos gastos registrados",
      primary: true
    },
    expense: {
      label: "Gastos del mes",
      value: totals.expense,
      helper: getExpenseStatus(totals.expense)
    },
    income: {
      label: "Ingresos del mes",
      value: totals.income,
      helper: "Movimientos de este mes"
    }
  };
  return definitions[id];
}

function getExpenseStatus(monthExpense) {
  const totalLimit = Object.values(state.limits).reduce((sum, limit) => sum + Number(limit.amount || 0), 0);
  if (!totalLimit) return "Sin límites configurados";
  const ratio = monthExpense / totalLimit;
  if (ratio >= 1) return "Superaste el total de límites";
  if (ratio >= 0.8) return "Cerca del total permitido";
  return "Dentro de lo previsto";
}

function renderDashboardCards() {
  const totals = monthTotals();
  const container = $("#dashboardStats");
  const cards = state.settings.dashboardCards.filter((card) => card.visible);

  if (!cards.length) {
    container.innerHTML = `<article class="liquid-card stat-card"><span class="stat-card__label">Panel personalizado</span><strong>Sin tarjetas</strong><small>Podés volver a mostrarlas desde Ajustes.</small></article>`;
    return;
  }

  container.innerHTML = cards.map((card) => {
    const data = dashboardCardDefinition(card.id, totals);
    return `
      <article class="liquid-card stat-card ${data.primary ? "is-primary" : ""}">
        <span class="stat-card__label">${escapeHtml(data.label)}</span>
        <strong class="money-value" data-money>${privacyHidden ? "••••••" : formatMoney(data.value)}</strong>
        <small>${escapeHtml(data.helper)}</small>
      </article>
    `;
  }).join("");
}

function renderHome() {
  renderDashboardCards();
  $("#welcomeBalance").textContent = privacyHidden ? "••••••" : formatMoney(currentBalance());
  document.body.classList.toggle("money-private", privacyHidden);
  $("#privacyIcon").textContent = privacyHidden ? "○" : "●";
  updateVerse(true);
}

function verseForNow() {
  const intervalMinutes = Math.max(1, Number(state.settings.verseInterval || 30));
  const slot = Math.floor(Date.now() / (intervalMinutes * 60_000));
  return VERSES[Math.abs(slot) % VERSES.length];
}

function updateVerse(force = false) {
  const verse = verseForNow();
  const changed = !currentVerse || currentVerse.reference !== verse.reference || currentVerse.text !== verse.text;

  if (force || changed) {
    currentVerse = verse;
    $("#verseText").textContent = verse.text;
    $("#verseReference").textContent = `${verse.reference} · Reina-Valera 1909`;
  }

  const minutes = Math.max(1, Number(state.settings.verseInterval || 30));
  const interval = minutes * 60_000;
  const remainingMs = interval - (Date.now() % interval);
  const remainingMinutes = Math.max(1, Math.ceil(remainingMs / 60_000));
  $("#verseTimer").textContent = `Cambia en ${remainingMinutes} min`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copiado.");
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    toast("Copiado.");
  }
}

function initVerseActions() {
  $("#copyVerse").addEventListener("click", () => {
    if (!currentVerse) return;
    copyText(`${currentVerse.text}\n${currentVerse.reference}`);
  });

  $("#saveVerse").addEventListener("click", () => {
    if (!currentVerse) return;

    const exists = state.savedVerses.some((item) =>
      item.originalReference === currentVerse.reference && item.text === currentVerse.text
    );

    if (exists) {
      toast("Ese versículo ya está guardado.");
      return;
    }

    state.savedVerses.unshift({
      id: uid("verse"),
      originalReference: currentVerse.reference,
      reference: currentVerse.reference,
      text: currentVerse.text,
      note: "",
      pinned: false,
      savedAt: new Date().toISOString()
    });

    save("savedVerses", state.savedVerses);
    toast("Versículo guardado.");
  });
}

function initPrivacy() {
  $("#privacyToggle").addEventListener("click", () => {
    privacyHidden = !privacyHidden;
    renderHome();
    renderFinance();
  });
}

function initFinance() {
  $("#transactionDate").value = todayInput();

  $("#transactionForm").addEventListener("change", (event) => {
    if (event.target.name === "type") {
      renderTransactionCategories(event.target.value);
    }
  });

  $("#transactionForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const amount = parseAmount(fieldValue(event.currentTarget, "transaction-amount"));

    if (!Number.isFinite(amount) || amount <= 0) {
      toast("Ingresá un monto válido.");
      return;
    }

    state.transactions.unshift({
      id: uid("tx"),
      type: String(form.get("type")),
      category: String(form.get("category")),
      amount,
      note: String(fieldValue(event.currentTarget, "transaction-note") || "").trim(),
      date: new Date(`${form.get("date")}T12:00:00`).toISOString()
    });

    save("transactions", state.transactions);

    event.currentTarget.reset();
    hardenTextFields(event.currentTarget);
    event.currentTarget.querySelector('[value="expense"]').checked = true;
    $("#transactionDate").value = todayInput();
    renderTransactionCategories("expense");
    renderMonths();
    renderFinance();
    renderHome();
    toast(`Movimiento guardado. Saldo: ${formatMoney(currentBalance())}`);
  });

  $("#balanceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const amount = parseAmount(fieldValue(event.currentTarget, "opening-balance"));

    if (!Number.isFinite(amount)) {
      toast("Ingresá un saldo válido.");
      return;
    }

    state.settings.openingBalance = amount;
    state.settings.openingBalanceConfigured = true;
    save("settings", state.settings);
    renderOpeningBalance();
    renderFinance();
    renderHome();
    toast("Saldo inicial guardado.");
  });

  $("#editOpeningBalance").addEventListener("click", () => {
    $("#openingBalanceConfigured").hidden = true;
    $("#openingBalanceSetup").hidden = false;
    const openingField = $('[data-field="opening-balance"]');
    openingField.value = formatInputMoney(state.settings.openingBalance);
    openingField.focus();
  });

  $("#limitForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const amount = parseAmount(fieldValue(event.currentTarget, "limit-amount"));

    if (!Number.isFinite(amount) || amount <= 0) {
      toast("Ingresá un límite válido.");
      return;
    }

    state.limits[String(form.get("category"))] = {
      amount,
      description: String(fieldValue(event.currentTarget, "limit-description") || "").trim()
    };

    save("limits", state.limits);
    event.currentTarget.reset();
    hardenTextFields(event.currentTarget);
    renderFinance();
    renderHome();
    toast("Límite guardado.");
  });

  $("#categoryForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const type = String(form.get("type"));
    const name = String(fieldValue(event.currentTarget, "category-name") || "").trim();

    if (!name) return;
    if (state.categories[type].some((item) => item.toLocaleLowerCase("es") === name.toLocaleLowerCase("es"))) {
      toast("Esa categoría ya existe.");
      return;
    }

    state.categories[type].push(name);
    state.categories[type].sort((a, b) => a.localeCompare(b, "es"));
    save("categories", state.categories);
    event.currentTarget.reset();
    hardenTextFields(event.currentTarget);
    renderTransactionCategories("expense");
    renderFinance();
    toast("Categoría agregada.");
  });

  $("#monthFilter").addEventListener("change", renderHistory);
  $("#transactionList").addEventListener("click", handleTransactionAction);
  $("#limitsList").addEventListener("click", handleLimitAction);
  $("#categoryList").addEventListener("click", handleCategoryAction);

  renderMonths();
  renderTransactionCategories("expense");
}

function renderFinance() {
  const totals = monthTotals();

  $("#financeBalance").textContent = privacyHidden ? "••••••" : formatMoney(currentBalance());
  $("#financeIncome").textContent = privacyHidden ? "••••••" : formatMoney(totals.income);
  $("#financeExpense").textContent = privacyHidden ? "••••••" : formatMoney(totals.expense);

  renderOpeningBalance();
  renderLimits();
  renderCategories();
  renderHistory();
}

function renderOpeningBalance() {
  const configured = Boolean(state.settings.openingBalanceConfigured);

  $("#openingBalanceSetup").hidden = configured;
  $("#openingBalanceConfigured").hidden = !configured;
  $("#openingBalanceDisplay").textContent = privacyHidden ? "••••••" : formatMoney(state.settings.openingBalance);

  if (!configured) {
    const openingField = $('[data-field="opening-balance"]');
    if (openingField) {
      openingField.value = state.settings.openingBalance ? formatInputMoney(state.settings.openingBalance) : "";
    }
  }
}

function renderTransactionCategories(type = "expense") {
  $("#transactionCategory").innerHTML = state.categories[type]
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    .join("");

  $("#limitCategory").innerHTML = state.categories.expense
    .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
    .join("");
}

function renderLimits() {
  const container = $("#limitsList");
  const entries = Object.entries(state.limits);
  const totals = monthTotals();

  if (!entries.length) {
    container.innerHTML = `<p class="empty-state">Todavía no configuraste límites.</p>`;
    return;
  }

  container.innerHTML = entries.map(([category, limit]) => {
    const spent = totals.items
      .filter((item) => item.type === "expense" && item.category === category)
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const percentage = limit.amount > 0 ? (spent / limit.amount) * 100 : 0;
    const status = percentage >= 100 ? "danger" : percentage >= 80 ? "warn" : "";

    return `
      <article class="list-row limit ${status}">
        <div class="list-row__main">
          <strong>${escapeHtml(category)} · <span data-money>${privacyHidden ? "••••••" : formatMoney(limit.amount)}</span></strong>
          <small>${escapeHtml(limit.description || "Sin descripción")} · ${Math.round(percentage)}% utilizado</small>
          <div class="progress"><span style="width:${Math.min(percentage, 100)}%"></span></div>
        </div>
        <div class="list-actions">
          <button class="mini-control" data-limit-edit="${escapeHtml(category)}">Editar</button>
          <button class="mini-control danger" data-limit-delete="${escapeHtml(category)}">Borrar</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderCategories() {
  $("#categoryList").innerHTML = ["expense", "income"].map((type) => `
    <section>
      <strong>${type === "expense" ? "Gastos" : "Ingresos"}</strong>
      <div class="category-chips">
        ${state.categories[type].map((name) => `
          <span class="category-chip">
            ${escapeHtml(name)}
            <button data-cat-edit="${escapeHtml(name)}" data-type="${type}">Editar</button>
            <button data-cat-delete="${escapeHtml(name)}" data-type="${type}">Borrar</button>
          </span>
        `).join("")}
      </div>
    </section>
  `).join("");
}

function renderMonths() {
  const select = $("#monthFilter");
  const previous = select.value;
  const keys = [...new Set([currentMonthKey(), ...state.transactions.map((item) => monthKey(item.date))])]
    .sort()
    .reverse();

  select.innerHTML = keys.map((key) => {
    const label = new Intl.DateTimeFormat("es-UY", {
      month: "long",
      year: "numeric"
    }).format(new Date(`${key}-01T12:00:00`));

    return `<option value="${key}">${escapeHtml(label)}</option>`;
  }).join("");

  select.value = keys.includes(previous) ? previous : currentMonthKey();
}

function renderHistory() {
  const totals = monthTotals($("#monthFilter").value || currentMonthKey());

  $("#monthSummary").innerHTML = `
    <div><span>Ingresos</span><strong data-money>${privacyHidden ? "••••••" : formatMoney(totals.income)}</strong></div>
    <div><span>Gastos</span><strong data-money>${privacyHidden ? "••••••" : formatMoney(totals.expense)}</strong></div>
    <div><span>Resultado</span><strong data-money>${privacyHidden ? "••••••" : formatMoney(totals.net)}</strong></div>
  `;

  const container = $("#transactionList");

  if (!totals.items.length) {
    container.innerHTML = `<p class="empty-state">No hay movimientos en este mes.</p>`;
    return;
  }

  container.innerHTML = [...totals.items]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((item) => `
      <article class="list-row">
        <div class="list-row__main">
          <strong>${escapeHtml(item.category)}</strong>
          <small>${new Intl.DateTimeFormat("es-UY", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(item.date))}${item.note ? ` · ${escapeHtml(item.note)}` : ""}</small>
        </div>
        <div class="list-actions">
          <strong class="amount ${item.type}" data-money>${privacyHidden ? "••••••" : `${item.type === "income" ? "+" : "-"}${formatMoney(item.amount)}`}</strong>
          <button class="mini-control" data-tx-edit="${item.id}">Editar</button>
          <button class="mini-control danger" data-tx-delete="${item.id}">Borrar</button>
        </div>
      </article>
    `).join("");
}

function handleTransactionAction(event) {
  const editButton = event.target.closest("[data-tx-edit]");
  const deleteButton = event.target.closest("[data-tx-delete]");

  if (editButton) openTransactionEditor(editButton.dataset.txEdit);

  if (deleteButton && confirm("¿Borrar este movimiento?")) {
    state.transactions = state.transactions.filter((item) => item.id !== deleteButton.dataset.txDelete);
    save("transactions", state.transactions);
    renderMonths();
    renderFinance();
    renderHome();
    toast("Movimiento borrado.");
  }
}

function handleLimitAction(event) {
  const editButton = event.target.closest("[data-limit-edit]");
  const deleteButton = event.target.closest("[data-limit-delete]");

  if (editButton) openLimitEditor(editButton.dataset.limitEdit);

  if (deleteButton && confirm("¿Borrar este límite?")) {
    delete state.limits[deleteButton.dataset.limitDelete];
    save("limits", state.limits);
    renderFinance();
    renderHome();
    toast("Límite borrado.");
  }
}

function handleCategoryAction(event) {
  const editButton = event.target.closest("[data-cat-edit]");
  const deleteButton = event.target.closest("[data-cat-delete]");

  if (editButton) {
    openCategoryEditor(editButton.dataset.type, editButton.dataset.catEdit);
  }

  if (deleteButton) {
    const type = deleteButton.dataset.type;
    const name = deleteButton.dataset.catDelete;
    const used = state.transactions.some((item) => item.category === name);

    if (used && !confirm("Esta categoría ya aparece en movimientos anteriores. Esos movimientos conservarán el nombre. ¿Borrarla igualmente?")) {
      return;
    }

    state.categories[type] = state.categories[type].filter((item) => item !== name);
    delete state.limits[name];

    save("categories", state.categories);
    save("limits", state.limits);

    renderTransactionCategories("expense");
    renderFinance();
    toast("Categoría borrada.");
  }
}

function openEditor(title, fieldsHtml, saveHandler, setupHandler) {
  const dialog = $("#editDialog");
  $("#editTitle").textContent = title;
  $("#editFields").innerHTML = fieldsHtml;
  hardenTextFields($("#editFields"));

  if (setupHandler) setupHandler();

  $("#editForm").onsubmit = (event) => {
    event.preventDefault();

    const submitter = event.submitter;
    if (submitter?.value === "cancel") {
      dialog.close();
      return;
    }

    const result = saveHandler(new FormData(event.currentTarget));
    if (result !== false) {
      dialog.close();
      renderFinance();
      renderHome();
      renderSaved();
    }
  };

  dialog.showModal();
}

function categoryOptions(type, selected) {
  return state.categories[type]
    .map((category) => `<option value="${escapeHtml(category)}" ${category === selected ? "selected" : ""}>${escapeHtml(category)}</option>`)
    .join("");
}

function openTransactionEditor(id) {
  const item = state.transactions.find((transaction) => transaction.id === id);
  if (!item) return;

  openEditor(
    "Editar movimiento",
    `
      <input type="hidden" name="id" value="${escapeHtml(item.id)}">
      <label>Tipo
        <select name="type" id="editTransactionType">
          <option value="expense" ${item.type === "expense" ? "selected" : ""}>Gasto</option>
          <option value="income" ${item.type === "income" ? "selected" : ""}>Ingreso</option>
        </select>
      </label>
      <label>Categoría
        <select name="category" id="editTransactionCategory">${categoryOptions(item.type, item.category)}</select>
      </label>
      <label>Monto
        <div class="money-input"><b>$</b><input data-field="edit-transaction-amount" type="text" inputmode="decimal" autocomplete="off" value="${formatInputMoney(item.amount)}" required></div>
      </label>
      <label>Detalle
        <input data-field="edit-transaction-note" type="text" maxlength="120" autocomplete="off" value="${escapeHtml(item.note)}">
      </label>
      <label>Fecha
        <input name="date" type="date" value="${new Date(item.date).toISOString().slice(0, 10)}" required>
      </label>
    `,
    (form) => {
      const target = state.transactions.find((transaction) => transaction.id === form.get("id"));
      const amount = parseAmount(fieldValue($("#editForm"), "edit-transaction-amount"));
      if (!target || !Number.isFinite(amount) || amount <= 0) {
        toast("Revisá el monto.");
        return false;
      }

      target.type = String(form.get("type"));
      target.category = String(form.get("category"));
      target.amount = amount;
      target.note = String(fieldValue($("#editForm"), "edit-transaction-note") || "").trim();
      target.date = new Date(`${form.get("date")}T12:00:00`).toISOString();

      save("transactions", state.transactions);
      renderMonths();
      toast("Movimiento actualizado.");
    },
    () => {
      $("#editTransactionType").addEventListener("change", (event) => {
        $("#editTransactionCategory").innerHTML = categoryOptions(event.target.value, "");
      });
    }
  );
}

function openLimitEditor(category) {
  const limit = state.limits[category];
  if (!limit) return;

  openEditor(
    "Editar límite",
    `
      <input type="hidden" name="category" value="${escapeHtml(category)}">
      <label>Monto
        <div class="money-input"><b>$</b><input data-field="edit-limit-amount" type="text" inputmode="decimal" autocomplete="off" value="${formatInputMoney(limit.amount)}" required></div>
      </label>
      <label>Descripción
        <input data-field="edit-limit-description" type="text" maxlength="120" autocomplete="off" value="${escapeHtml(limit.description)}">
      </label>
    `,
    (form) => {
      const amount = parseAmount(fieldValue($("#editForm"), "edit-limit-amount"));
      if (!Number.isFinite(amount) || amount <= 0) {
        toast("Revisá el límite.");
        return false;
      }

      state.limits[category] = {
        amount,
        description: String(fieldValue($("#editForm"), "edit-limit-description") || "").trim()
      };
      save("limits", state.limits);
      toast("Límite actualizado.");
    }
  );
}

function openCategoryEditor(type, oldName) {
  openEditor(
    "Editar categoría",
    `
      <input type="hidden" name="type" value="${escapeHtml(type)}">
      <input type="hidden" name="oldName" value="${escapeHtml(oldName)}">
      <label>Nombre
        <input data-field="edit-category-name" type="text" maxlength="40" autocomplete="off" value="${escapeHtml(oldName)}" required>
      </label>
    `,
    (form) => {
      const newName = String(fieldValue($("#editForm"), "edit-category-name") || "").trim();
      if (!newName) return false;

      if (state.categories[type].some((name) =>
        name !== oldName && name.toLocaleLowerCase("es") === newName.toLocaleLowerCase("es")
      )) {
        toast("Ya existe una categoría con ese nombre.");
        return false;
      }

      state.categories[type] = state.categories[type].map((name) => name === oldName ? newName : name);
      state.transactions.forEach((transaction) => {
        if (transaction.category === oldName) transaction.category = newName;
      });

      if (state.limits[oldName]) {
        state.limits[newName] = state.limits[oldName];
        delete state.limits[oldName];
      }

      save("categories", state.categories);
      save("transactions", state.transactions);
      save("limits", state.limits);
      renderTransactionCategories("expense");
      toast("Categoría actualizada.");
    }
  );
}

function renderSaved() {
  const container = $("#savedList");
  const items = [...state.savedVerses].sort((a, b) => {
    if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
    return new Date(b.savedAt) - new Date(a.savedAt);
  });

  if (!items.length) {
    container.innerHTML = `<p class="empty-state">Todavía no guardaste ningún versículo.</p>`;
    return;
  }

  container.innerHTML = items.map((item) => `
    <article class="saved-verse ${item.pinned ? "is-pinned" : ""}">
      <blockquote>${escapeHtml(item.text)}</blockquote>
      <div class="saved-verse__bottom">
        <div>
          <strong>${escapeHtml(item.reference)}</strong>
          <small>${item.note ? escapeHtml(item.note) : "Reina-Valera 1909"}</small>
        </div>
        <div class="list-actions">
          <button class="mini-control" data-saved-copy="${item.id}">Copiar</button>
          <button class="mini-control" data-saved-edit="${item.id}">Editar</button>
          <button class="mini-control" data-saved-pin="${item.id}">${item.pinned ? "Desanclar" : "Anclar"}</button>
          <button class="mini-control danger" data-saved-delete="${item.id}">Borrar</button>
        </div>
      </div>
    </article>
  `).join("");
}

function initSaved() {
  $("#savedList").addEventListener("click", (event) => {
    const copyButton = event.target.closest("[data-saved-copy]");
    const editButton = event.target.closest("[data-saved-edit]");
    const pinButton = event.target.closest("[data-saved-pin]");
    const deleteButton = event.target.closest("[data-saved-delete]");

    if (copyButton) {
      const item = state.savedVerses.find((verse) => verse.id === copyButton.dataset.savedCopy);
      if (item) copyText(`${item.text}\n${item.reference}`);
    }

    if (editButton) {
      openSavedVerseEditor(editButton.dataset.savedEdit);
    }

    if (pinButton) {
      const item = state.savedVerses.find((verse) => verse.id === pinButton.dataset.savedPin);
      if (item) {
        item.pinned = !item.pinned;
        save("savedVerses", state.savedVerses);
        renderSaved();
      }
    }

    if (deleteButton && confirm("¿Borrar este versículo guardado?")) {
      state.savedVerses = state.savedVerses.filter((verse) => verse.id !== deleteButton.dataset.savedDelete);
      save("savedVerses", state.savedVerses);
      renderSaved();
      toast("Versículo borrado.");
    }
  });
}

function openSavedVerseEditor(id) {
  const item = state.savedVerses.find((verse) => verse.id === id);
  if (!item) return;

  openEditor(
    "Editar guardado",
    `
      <input type="hidden" name="id" value="${escapeHtml(item.id)}">
      <label>Referencia
        <input data-field="saved-reference" type="text" maxlength="80" autocomplete="off" value="${escapeHtml(item.reference)}" required>
      </label>
      <label>Texto guardado
        <textarea data-field="saved-text" rows="6" maxlength="900" autocomplete="off" required>${escapeHtml(item.text)}</textarea>
      </label>
      <label>Nota personal
        <input data-field="saved-note" type="text" maxlength="180" autocomplete="off" value="${escapeHtml(item.note || "")}" placeholder="Opcional">
      </label>
    `,
    (form) => {
      const target = state.savedVerses.find((verse) => verse.id === form.get("id"));
      if (!target) return false;

      target.reference = String(fieldValue($("#editForm"), "saved-reference") || "").trim();
      target.text = String(fieldValue($("#editForm"), "saved-text") || "").trim();
      target.note = String(fieldValue($("#editForm"), "saved-note") || "").trim();

      save("savedVerses", state.savedVerses);
      toast("Guardado actualizado.");
    }
  );
}

function renderSettings() {
  $("#themePreference").value = state.settings.theme;
  $("#accentPreference").value = state.settings.accent;
  $("#welcomePreference").checked = Boolean(state.settings.showWelcome);
  $("#secondsPreference").checked = Boolean(state.settings.showSeconds);
  $("#verseInterval").value = String(state.settings.verseInterval);
  $("#privacyPreference").checked = Boolean(state.settings.privacyOnStart);
  renderDashboardCustomizer();
}

function initSettings() {
  const update = () => {
    state.settings.theme = $("#themePreference").value;
    state.settings.accent = $("#accentPreference").value;
    state.settings.showWelcome = $("#welcomePreference").checked;
    state.settings.showSeconds = $("#secondsPreference").checked;
    state.settings.verseInterval = Number($("#verseInterval").value);
    state.settings.privacyOnStart = $("#privacyPreference").checked;

    save("settings", state.settings);
    applyAppearance();
    renderHome();
  };

  ["themePreference", "accentPreference", "welcomePreference", "secondsPreference", "verseInterval", "privacyPreference"]
    .forEach((id) => {
      $("#" + id).addEventListener("change", update);
    });

  $("#dashboardCustomizer").addEventListener("click", handleDashboardCustomizer);
  $("#dashboardCustomizer").addEventListener("change", handleDashboardCustomizer);

  $("#exportBackup").addEventListener("click", exportBackup);
  $("#importBackup").addEventListener("change", importBackup);

  $("#resetData").addEventListener("click", () => {
    if (!confirm("¿Borrar todos los datos de Arca? Esta acción no se puede deshacer.")) return;

    [PREFIX, OLD_PREFIX].forEach((prefix) => {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(prefix))
        .forEach((key) => localStorage.removeItem(key));
    });

    location.reload();
  });

  renderSettings();
}

function applyAppearance() {
  document.documentElement.dataset.theme = state.settings.theme;
  document.documentElement.dataset.accent = state.settings.accent;
}

function renderDashboardCustomizer() {
  const names = {
    balance: "Saldo actual",
    expense: "Gastos del mes",
    income: "Ingresos del mes"
  };

  $("#dashboardCustomizer").innerHTML = state.settings.dashboardCards.map((card, index) => `
    <div class="customizer-row">
      <input type="checkbox" data-card-visible="${card.id}" ${card.visible ? "checked" : ""} aria-label="Mostrar ${escapeHtml(names[card.id])}">
      <span><strong>${escapeHtml(names[card.id])}</strong></span>
      <div class="order-controls">
        <button type="button" data-card-up="${card.id}" ${index === 0 ? "disabled" : ""}>↑</button>
        <button type="button" data-card-down="${card.id}" ${index === state.settings.dashboardCards.length - 1 ? "disabled" : ""}>↓</button>
      </div>
    </div>
  `).join("");
}

function handleDashboardCustomizer(event) {
  const visibility = event.target.closest("[data-card-visible]");
  const up = event.target.closest("[data-card-up]");
  const down = event.target.closest("[data-card-down]");

  if (visibility) {
    const card = state.settings.dashboardCards.find((item) => item.id === visibility.dataset.cardVisible);
    if (card) card.visible = visibility.checked;
  }

  const move = (id, direction) => {
    const index = state.settings.dashboardCards.findIndex((item) => item.id === id);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= state.settings.dashboardCards.length) return;
    [state.settings.dashboardCards[index], state.settings.dashboardCards[nextIndex]] =
      [state.settings.dashboardCards[nextIndex], state.settings.dashboardCards[index]];
  };

  if (up) move(up.dataset.cardUp, -1);
  if (down) move(down.dataset.cardDown, 1);

  save("settings", state.settings);
  renderDashboardCustomizer();
  renderHome();
}

function exportBackup() {
  const payload = {
    app: "Arca",
    version: "0.2.3",
    exportedAt: new Date().toISOString(),
    data: {
      transactions: state.transactions,
      limits: state.limits,
      categories: state.categories,
      savedVerses: state.savedVerses,
      settings: state.settings
    }
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `arca-backup-${todayInput()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  toast("Copia de seguridad exportada.");
}

function importBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      const data = payload.data || payload;

      if (!Array.isArray(data.transactions) || !data.categories || !data.settings) {
        throw new Error("Formato no válido");
      }

      state.transactions = data.transactions;
      state.limits = normalizeLimits(data.limits || {});
      state.categories = normalizeCategories(data.categories);
      state.savedVerses = Array.isArray(data.savedVerses) ? data.savedVerses : [];
      state.settings = normalizeSettings(data.settings);

      save("transactions", state.transactions);
      save("limits", state.limits);
      save("categories", state.categories);
      save("savedVerses", state.savedVerses);
      save("settings", state.settings);

      toast("Datos importados.");
      setTimeout(() => location.reload(), 500);
    } catch {
      toast("El archivo no parece ser una copia válida.");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function init() {
  applyAppearance();
  hardenTextFields();

  $("#transactionDate").value = todayInput();

  initWelcome();
  initClock();
  initVerseActions();
  initPrivacy();
  initFinance();
  initSaved();
  initSettings();
  initNavigation();

  renderHome();
  renderFinance();
  renderSaved();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }
}

init();
