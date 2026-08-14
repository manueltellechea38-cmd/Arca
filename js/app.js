const APP_VERSION = "0.3.3";
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

const MOTIVATIONAL_PHRASES = [
  {
    "reference": "Arca",
    "text": "Avanzar poco sigue siendo avanzar.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Lo que controlás hoy te da libertad mañana.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Un gasto pensado vale más que una compra impulsiva.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Tu progreso no necesita ser perfecto para ser real.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Cada decisión pequeña construye un resultado grande.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Ahorrar también es elegir qué futuro querés.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Que tu dinero tenga un propósito antes de tener un destino.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Disciplina es recordar lo que querés cuando aparece una tentación.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Un buen plan convierte una meta lejana en pasos concretos.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Lo importante no es empezar con mucho, sino mantener el rumbo.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Registrar lo que hacés te permite mejorar lo que hacés.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El progreso financiero se construye con constancia.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "No necesitás gastar más para vivir mejor.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una meta clara hace más fácil decir que no a lo innecesario.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El dinero que no gastás por impulso puede trabajar para tus objetivos.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Ordenar tus finanzas también ordena tus decisiones.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Comparate con tu versión anterior, no con la vida de los demás.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El mejor momento para organizarte es antes de necesitar hacerlo.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Cada peso tiene más valor cuando sabés para qué lo querés.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una buena decisión repetida termina convirtiéndose en un hábito.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Los resultados grandes suelen empezar con acciones pequeñas.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Podés cambiar el rumbo sin tener que empezar de cero.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Lo que hoy parece lento mañana puede verse como constancia.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Elegir con calma también es una forma de ahorrar.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Tu objetivo merece más atención que una compra momentánea.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una semana ordenada puede cambiar un mes entero.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Primero claridad, después velocidad.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "No gastes para impresionar a personas que no pagan tus cuentas.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una meta escrita es más difícil de olvidar.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Tu tranquilidad también forma parte de tu patrimonio.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El presupuesto no limita tu vida; le pone dirección.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "No todo lo que podés comprar necesitás comprarlo.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Ser constante vale más que ser intenso durante dos días.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Tu futuro se beneficia de las decisiones que nadie ve.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Dejar pasar una compra también puede ser una victoria.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El hábito de revisar vale más que intentar recordar todo.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una meta grande se vuelve manejable cuando la dividís.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El control empieza cuando dejás de adivinar.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Cada mes es una nueva oportunidad de ajustar el rumbo.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Ahorrar no significa no disfrutar; significa elegir.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El dinero bien organizado compra tiempo y tranquilidad.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una decisión consciente hoy puede evitar una preocupación mañana.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El progreso se nota cuando mirás varios meses juntos.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "No necesitás hacerlo rápido; necesitás seguir haciéndolo.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Lo que medís, lo podés mejorar.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una compra puede esperar; una meta también necesita atención.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El equilibrio vale más que los extremos.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Tu plan puede cambiar sin que tu objetivo desaparezca.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Separar antes de gastar hace más fácil ahorrar.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Lo simple que funciona es mejor que lo complejo que abandonás.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El orden financiero se construye movimiento por movimiento.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Tu dinero debería ayudarte a vivir como querés, no controlarte.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Pensar antes de pagar es una habilidad que se entrena.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una deuda más pequeña también es progreso.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Reservar dinero es darle prioridad a tu yo del futuro.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "No subestimes veinte decisiones pequeñas bien tomadas.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Un límite sirve para cuidarte, no para castigarte.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una meta visible es una meta más presente.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Cuando sabés cuánto tenés, decidís con más tranquilidad.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Los hábitos sostenibles ganan a los planes perfectos.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Un mes difícil no borra todo lo que ya avanzaste.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Empezá con lo que tenés y mejoralo sobre la marcha.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Cada pago pendiente que resolvés libera espacio mental.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Tu progreso merece ser registrado.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El objetivo no es gastar cero; es gastar con intención.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Pensar en el mañana no significa olvidarte de hoy.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Un buen sistema hace fácil repetir una buena decisión.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Guardá primero para lo importante y decidí después sobre el resto.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Tu saldo cuenta una historia; vos decidís cómo sigue.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Los números no juzgan: te muestran dónde estás.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una decisión simple puede cambiar el cierre de tu mes.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El ahorro crece cuando deja de depender de lo que sobra.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Priorizar también significa renunciar a algunas cosas.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Tu meta está más cerca cada vez que elegís conscientemente.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "El dinero es una herramienta; el plan decide cómo usarla.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Lo que hoy reservás puede convertirse en algo que realmente querés.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Organizarte no te quita libertad; te da opciones.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Las metas se construyen antes de alcanzarse.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Una compra menos puede ser un paso más.",
    "kind": "motivation"
  },
  {
    "reference": "Arca",
    "text": "Tu mejor presupuesto es el que realmente podés mantener.",
    "kind": "motivation"
  }
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
  background: "default",
  showWelcome: true,
  showSeconds: false,
  verseInterval: 30,
  inspirationMode: "bible",
  backupReminderDays: 14,
  lastBackupAt: null,
  financeSections: {},
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
  settings: normalizeSettings(loadMigrated("settings", {})),
  goals: loadNew("goals", []),
  recurring: loadNew("recurring", []),
  debts: loadNew("debts", [])
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

  const refreshWelcome = () => {
    $("#welcomeDate").textContent = new Intl.DateTimeFormat("es-UY", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }).format(new Date());

    $("#welcomeBalance").textContent =
      privacyHidden ? "••••••" : formatMoney(currentBalance());
  };

  const showWelcome = () => {
    refreshWelcome();
    screen.hidden = false;
    screen.classList.remove("is-hidden");
    shell.setAttribute("aria-hidden", "true");
  };

  const enter = () => {
    screen.classList.add("is-hidden");
    shell.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      if (screen.classList.contains("is-hidden")) {
        screen.hidden = true;
      }
    }, 450);
  };

  refreshWelcome();

  $("#enterApp").addEventListener("click", enter);

  screen.hidden = false;
  screen.classList.remove("is-hidden");
  shell.setAttribute("aria-hidden", "true");

  let wentToBackground = false;

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      wentToBackground = true;
      return;
    }

    if (document.visibilityState === "visible" && wentToBackground) {
      wentToBackground = false;
      showWelcome();
    }
  });
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
    if (route === "goals") renderGoals();
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
  renderSmartHome();
}

function inspirationCollection() {
  if (state.settings.inspirationMode === "motivation") {
    return MOTIVATIONAL_PHRASES;
  }

  return VERSES.map((item) => ({ ...item, kind: "bible" }));
}

function inspirationForNow() {
  const collection = inspirationCollection();
  if (!collection.length) return null;

  const intervalMinutes = Math.max(1, Number(state.settings.verseInterval || 30));
  const slot = Math.floor(Date.now() / (intervalMinutes * 60_000));

  // El multiplicador primo recorre toda la colección antes de repetir.
  const index = (slot * 17 + 11) % collection.length;
  return collection[index];
}

function updateVerse(force = false) {
  const card = $("#inspirationCard");
  if (!card) return;

  if (state.settings.inspirationMode === "off") {
    card.hidden = true;
    return;
  }

  card.hidden = false;

  const item = inspirationForNow();
  if (!item) return;

  const changed = !currentVerse ||
    currentVerse.reference !== item.reference ||
    currentVerse.text !== item.text ||
    currentVerse.kind !== item.kind;

  if (force || changed) {
    currentVerse = item;
    $("#verseText").textContent = item.text;

    if (item.kind === "motivation") {
      $("#inspirationLabel").textContent = "Frase motivacional";
      $("#verseReference").textContent = "Arca";
    } else {
      $("#inspirationLabel").textContent = "Versículo";
      $("#verseReference").textContent = `${item.reference} · Reina-Valera 1909`;
    }
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
    const suffix = currentVerse.kind === "motivation" ? "" : `
${currentVerse.reference}`;
    copyText(`${currentVerse.text}${suffix}`);
  });

  $("#saveVerse").addEventListener("click", () => {
    if (!currentVerse) return;

    const exists = state.savedVerses.some((item) =>
      item.text === currentVerse.text &&
      item.reference === currentVerse.reference &&
      (item.kind || "bible") === (currentVerse.kind || "bible")
    );

    if (exists) {
      toast("Ya está guardado.");
      return;
    }

    state.savedVerses.unshift({
      id: uid("saved"),
      originalReference: currentVerse.reference,
      reference: currentVerse.reference,
      text: currentVerse.text,
      note: "",
      pinned: false,
      kind: currentVerse.kind || "bible",
      savedAt: new Date().toISOString()
    });

    save("savedVerses", state.savedVerses);
    toast("Guardado.");
  });
}

function initPrivacy() {
  $("#privacyToggle").addEventListener("click", () => {
    privacyHidden = !privacyHidden;
    renderHome();
    renderFinance();
  });
}


function initFinanceCollapsibles() {
  const financeView = $('[data-view="finance"]');

  if (!financeView) return;

  const descriptors = [
    {
      key: "summary",
      element: financeView.querySelector(".finance-hero"),
      title: "Estado financiero"
    },
    {
      key: "movements",
      element: financeView.querySelector(".finance-grid"),
      title: "Nuevo movimiento y saldo inicial"
    },
    {
      key: "recurring",
      heading: "Pagos fijos y recurrentes"
    },
    {
      key: "upcoming",
      heading: "Próximos pagos"
    },
    {
      key: "debts",
      heading: "Deudas y préstamos"
    },
    {
      key: "limits",
      heading: "Límites mensuales"
    },
    {
      key: "categories",
      heading: "Categorías"
    },
    {
      key: "history",
      heading: "Historial mensual"
    }
  ];

  descriptors.forEach((descriptor) => {
    let section = descriptor.element;

    if (!section && descriptor.heading) {
      const heading = [...financeView.querySelectorAll("h3")]
        .find((item) =>
          item.textContent.trim() === descriptor.heading
        );

      section = heading?.closest(".liquid-card");
    }

    if (!section || section.dataset.collapsibleReady === "true") {
      return;
    }

    prepareFinanceCollapsible(
      section,
      descriptor.key,
      descriptor.title || descriptor.heading
    );
  });
}

function prepareFinanceCollapsible(section, key, title) {
  section.dataset.collapsibleReady = "true";
  section.dataset.financeSection = key;
  section.classList.add("finance-collapsible");

  const wrapper = document.createElement("div");
  wrapper.className = "finance-collapsible__content";

  while (section.firstChild) {
    wrapper.appendChild(section.firstChild);
  }

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "finance-section-toggle";

  toggle.innerHTML = `
    <span>${escapeHtml(title)}</span>
    <span class="finance-section-chevron" aria-hidden="true">⌄</span>
  `;

  section.appendChild(toggle);
  section.appendChild(wrapper);

  const saved =
    state.settings.financeSections?.[key];

  const expanded = saved !== false;

  applyFinanceSectionState(
    section,
    expanded,
    false
  );

  toggle.addEventListener("click", () => {
    const current =
      toggle.getAttribute("aria-expanded") === "true";

    applyFinanceSectionState(
      section,
      !current,
      true
    );
  });
}

function applyFinanceSectionState(
  section,
  expanded,
  persist = true
) {
  const toggle =
    section.querySelector(".finance-section-toggle");

  const content =
    section.querySelector(".finance-collapsible__content");

  if (!toggle || !content) return;

  toggle.setAttribute(
    "aria-expanded",
    String(expanded)
  );

  content.hidden = !expanded;

  section.classList.toggle(
    "is-collapsed",
    !expanded
  );

  if (persist) {
    const key = section.dataset.financeSection;

    state.settings.financeSections = {
      ...(state.settings.financeSections || {}),
      [key]: expanded
    };

    save("settings", state.settings);
  }
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
  renderRecurring();
  renderUpcomingPayments();
  renderDebts();
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
          <strong>
            ${escapeHtml(category)} - 
            <span data-money>
              ${privacyHidden ? "••••••" : formatMoney(limit.amount)}
            </span>
          </strong>

          <small>
            ${escapeHtml(limit.description || "Sin descripción")} - 
            ${Math.round(percentage)}% - 
            <span data-money>
              ${privacyHidden ? "••••" : formatMoney(spent)}
            </span>
          </small>
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
  renderGoals();
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


function daysBetween(dateA, dateB) {
  const oneDay = 86_400_000;
  const a = new Date(dateA);
  const b = new Date(dateB);
  return Math.ceil((b - a) / oneDay);
}

function recurringPeriodKey(item, date = new Date()) {
  const d = new Date(date);
  if (item.frequency === "weekly") {
    const start = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil((((d - start) / 86_400_000) + start.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${week}`;
  }

  if (item.frequency === "yearly") {
    return String(d.getFullYear());
  }

  return monthKey(d);
}

function nextRecurringDate(item) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let next = new Date(`${item.nextDue}T12:00:00`);
  if (Number.isNaN(next.getTime())) return now;

  // Un pago vencido permanece visible hasta que el usuario lo marque como pagado.
  // Solo avanzamos cuando ese período ya fue confirmado como pagado.
  while (item.lastPaidPeriod === recurringPeriodKey(item, next)) {
    if (item.frequency === "weekly") {
      next.setDate(next.getDate() + 7);
    } else if (item.frequency === "yearly") {
      next.setFullYear(next.getFullYear() + 1);
    } else {
      next.setMonth(next.getMonth() + 1);
    }
  }

  return next;
}

function estimatedRecurringAmount(item) {
  return Number(item.lastAmount || item.amount || 0);
}

function pendingMandatoryAmount() {
  const currentMonth = currentMonthKey();

  return state.recurring
    .filter((item) => item.active !== false && item.mandatory)
    .reduce((sum, item) => {
      const next = nextRecurringDate(item);
      if (monthKey(next) !== currentMonth) return sum;
      return sum + estimatedRecurringAmount(item);
    }, 0);
}

function goalsReservedAmount() {
  return state.goals.reduce((sum, goal) => sum + Number(goal.current || 0), 0);
}

function realAvailableBalance() {
  return currentBalance() - pendingMandatoryAmount() - goalsReservedAmount();
}

function renderSmartHome() {
  const available = realAvailableBalance();
  const mandatory = pendingMandatoryAmount();
  const reserved = goalsReservedAmount();

  $("#realAvailable").textContent =
    privacyHidden ? "••••••" : formatMoney(available);

  $("#realAvailableDetail").textContent =
    `Pagos obligatorios: ${privacyHidden ? "••••" : formatMoney(mandatory)} · Metas: ${privacyHidden ? "••••" : formatMoney(reserved)}`;

  const now = new Date();
  const nextMonthStart = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1,
    0,
    0,
    0,
    0
  );

  const nextMonthEnd = new Date(
    now.getFullYear(),
    now.getMonth() + 2,
    0,
    23,
    59,
    59,
    999
  );

  const upcomingPayments = state.recurring
    .filter((item) => item.active !== false)
    .map((item) => ({
      item,
      date: nextRecurringDate(item)
    }))
    .filter(({ date }) =>
      date >= nextMonthStart &&
      date <= nextMonthEnd
    )
    .sort((a, b) => a.date - b.date);

  if (upcomingPayments.length) {
    const nextMonthName = new Intl.DateTimeFormat("es-UY", {
      month: "long"
    }).format(nextMonthStart);

    $("#nextPaymentName").textContent =
      `${upcomingPayments.length} pago${upcomingPayments.length === 1 ? "" : "s"} pendiente${upcomingPayments.length === 1 ? "" : "s"} en ${nextMonthName}`;

    $("#nextPaymentDetail").innerHTML = upcomingPayments
      .map(({ item, date }) => {
        const dateLabel = new Intl.DateTimeFormat("es-UY", {
          day: "2-digit",
          month: "short"
        }).format(date);

        const amountLabel = privacyHidden
          ? "••••"
          : formatMoney(estimatedRecurringAmount(item));

        return `
          <span class="home-payment-item">
            <span class="home-payment-item__name">${escapeHtml(item.name)}</span>
            <strong>${dateLabel} · ${amountLabel}</strong>
          </span>
        `;
      })
      .join("");
  } else {
    $("#nextPaymentName").textContent = "Sin pagos pendientes";
    $("#nextPaymentDetail").textContent =
      "No tenés pagos recurrentes pendientes para el próximo mes.";
  }

  const mainGoal = [...state.goals]
    .filter((goal) =>
      Number(goal.current || 0) < Number(goal.target || 0)
    )
    .sort((a, b) =>
      Number(b.current || 0) / Math.max(1, Number(b.target || 0)) -
      Number(a.current || 0) / Math.max(1, Number(a.target || 0))
    )[0];

  const preview = $("#homeGoalPreview");

  if (!mainGoal) {
    preview.hidden = true;
  } else {
    const percentage = Math.min(
      100,
      Math.round(
        (Number(mainGoal.current || 0) /
          Math.max(1, Number(mainGoal.target || 0))) *
        100
      )
    );

    preview.hidden = false;

    preview.innerHTML = `
      <div class="goal-preview-home">
        ${mainGoal.photo ? `<img src="${mainGoal.photo}" alt="">` : ""}
        <div>
          <p class="eyebrow">Meta principal</p>
          <h3>${escapeHtml(mainGoal.name)}</h3>
          <strong data-money>
            ${
              privacyHidden
                ? "••••••"
                : `${formatMoney(mainGoal.current)} / ${formatMoney(mainGoal.target)}`
            }
          </strong>
          <div class="progress">
            <span style="width:${percentage}%"></span>
          </div>
          <small>${percentage}% completado</small>
        </div>
      </div>
    `;
  }

  renderBackupReminder();
}

async function compressGoalPhoto(file) {
  if (!file) return "";

  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo seleccionado no es una imagen.");
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("No se pudo leer la imagen."));

    reader.readAsDataURL(file);
  });

  const image = await new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("No se pudo abrir la imagen."));
    img.src = dataUrl;
  });

  const maxSize = 520;
  const scale = Math.min(
    1,
    maxSize / Math.max(image.naturalWidth, image.naturalHeight)
  );

  const width = Math.max(
    1,
    Math.round(image.naturalWidth * scale)
  );

  const height = Math.max(
    1,
    Math.round(image.naturalHeight * scale)
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d", {
    alpha: false
  });

  context.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.68);
}

function resetGoalForm(form) {
  form.reset();

  $("#goalDate").value = "";
  $("#goalPhoto").value = "";

  randomizePrivateFieldNames(form);

  const firstField = form.querySelector('[data-field="goal-name"]');
  firstField?.focus({ preventScroll: true });
}

function initGoals() {
  const form = $("#goalForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = event.submitter ||
      form.querySelector('button[type="submit"]');

    if (submitButton?.disabled) return;

    const name = fieldValue(form, "goal-name").trim();
    const target = parseAmount(
      fieldValue(form, "goal-target")
    );

    const currentRaw = fieldValue(form, "goal-current").trim();
    const current = currentRaw
      ? parseAmount(currentRaw)
      : 0;

    const file = $("#goalPhoto").files?.[0] || null;

    if (
      !name ||
      !Number.isFinite(target) ||
      target <= 0 ||
      !Number.isFinite(current) ||
      current < 0
    ) {
      toast("Revisá el nombre y los importes de la meta.");
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText =
        submitButton.textContent;
      submitButton.textContent = "Guardando…";
    }

    try {
      const photo = file
        ? await compressGoalPhoto(file)
        : "";

      const goal = {
        id: uid("goal"),
        name,
        target,
        current,
        targetDate: $("#goalDate").value || "",
        photo,
        createdAt: new Date().toISOString()
      };

      state.goals.unshift(goal);

      try {
        save("goals", state.goals);
      } catch (error) {
        state.goals = state.goals.filter(
          (item) => item.id !== goal.id
        );

        throw new Error(
          "No hay suficiente espacio para guardar la meta."
        );
      }

      renderGoals();
      renderHome();

      resetGoalForm(form);

      toast("Meta guardada.");
    } catch (error) {
      console.error(error);

      toast(
        error?.message ||
        "No se pudo guardar la meta."
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent =
          submitButton.dataset.originalText ||
          "Crear meta";
      }
    }
  });

  $("#goalsList").addEventListener(
    "click",
    handleGoalAction
  );
}

function renderGoals() {
  const container = $("#goalsList");

  if (!state.goals.length) {
    container.innerHTML = `<article class="liquid-card empty-state">Todavía no creaste metas de ahorro.</article>`;
    return;
  }

  container.innerHTML = state.goals.map((goal) => {
    const current = Number(goal.current || 0);
    const target = Number(goal.target || 0);
    const percentage = Math.min(100, Math.round((current / Math.max(1, target)) * 100));
    const remaining = Math.max(0, target - current);
    let pace = "";

    if (goal.targetDate) {
      const days = Math.max(1, daysBetween(new Date(), new Date(`${goal.targetDate}T12:00:00`)));
      const months = Math.max(1, days / 30.44);
      pace = ` · ${privacyHidden ? "••••" : formatMoney(remaining / months)} por mes aprox.`;
    }

    return `
      <article class="liquid-card goal-card">
        ${goal.photo ? `<img class="goal-photo" src="${goal.photo}" alt="${escapeHtml(goal.name)}">` : `<div class="goal-photo goal-photo--empty">◎</div>`}
        <div class="goal-card__body">
          <div class="card-heading">
            <div>
              <p class="eyebrow">Meta</p>
              <h3>${escapeHtml(goal.name)}</h3>
            </div>
            <strong>${percentage}%</strong>
          </div>

          <strong class="goal-amount" data-money>${privacyHidden ? "••••••" : `${formatMoney(current)} / ${formatMoney(target)}`}</strong>
          <div class="progress"><span style="width:${percentage}%"></span></div>
          <small>Faltan ${privacyHidden ? "••••" : formatMoney(remaining)}${pace}</small>

          <div class="goal-actions">
            <button class="glass-primary" data-goal-add="${goal.id}">Agregar ahorro</button>
            <button class="mini-control" data-goal-edit="${goal.id}">Editar</button>
            <button class="mini-control danger" data-goal-delete="${goal.id}">Borrar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function handleGoalAction(event) {
  const add = event.target.closest("[data-goal-add]");
  const edit = event.target.closest("[data-goal-edit]");
  const remove = event.target.closest("[data-goal-delete]");

  if (add) {
    const goal = state.goals.find((item) => item.id === add.dataset.goalAdd);
    if (!goal) return;

    const raw = prompt(`¿Cuánto querés agregar a "${goal.name}"?`, "0,00");
    if (raw === null) return;

    const amount = parseAmount(raw);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast("Importe inválido.");
      return;
    }

    goal.current = Number(goal.current || 0) + amount;
    save("goals", state.goals);
    renderGoals();
    renderHome();
    toast("Ahorro agregado.");
  }

  if (edit) {
    const goal = state.goals.find((item) => item.id === edit.dataset.goalEdit);
    if (!goal) return;

    openEditor(
      "Editar meta",
      `
        <input type="hidden" name="id" value="${goal.id}">
        <label>Nombre<input name="name" value="${escapeHtml(goal.name)}" required></label>
        <label>Objetivo<input name="target" type="text" inputmode="decimal" value="${formatInputMoney(goal.target)}" required></label>
        <label>Ahorrado<input name="current" type="text" inputmode="decimal" value="${formatInputMoney(goal.current)}" required></label>
        <label>Fecha objetivo<input name="date" type="date" value="${escapeHtml(goal.targetDate || "")}"></label>
      `,
      (form) => {
        const targetGoal = state.goals.find((item) => item.id === form.get("id"));
        const target = parseAmount(form.get("target"));
        const current = parseAmount(form.get("current"));

        if (!targetGoal || !Number.isFinite(target) || target <= 0 || !Number.isFinite(current)) {
          toast("Revisá los importes.");
          return false;
        }

        targetGoal.name = String(form.get("name") || "").trim();
        targetGoal.target = target;
        targetGoal.current = Math.max(0, current);
        targetGoal.targetDate = String(form.get("date") || "");

        save("goals", state.goals);
        renderGoals();
        toast("Meta actualizada.");
      }
    );
  }

  if (remove && confirm("¿Borrar esta meta?")) {
    state.goals = state.goals.filter((item) => item.id !== remove.dataset.goalDelete);
    save("goals", state.goals);
    renderGoals();
    renderHome();
    toast("Meta borrada.");
  }
}

function initRecurring() {
  $("#recurringDueDate").value = todayInput();

  $("#recurringForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = fieldValue(event.currentTarget, "recurring-name").trim();
    const amount = parseAmount(fieldValue(event.currentTarget, "recurring-amount"));

    if (!name || !Number.isFinite(amount) || amount <= 0) {
      toast("Revisá el nombre y el importe.");
      return;
    }

    state.recurring.unshift({
      id: uid("recurring"),
      name,
      category: $("#recurringCategory").value,
      amount,
      lastAmount: amount,
      nextDue: $("#recurringDueDate").value,
      frequency: $("#recurringFrequency").value,
      mandatory: $("#recurringMandatory").checked,
      active: true,
      lastPaidPeriod: null,
      createdAt: new Date().toISOString()
    });

    save("recurring", state.recurring);
    event.currentTarget.reset();
    $("#recurringDueDate").value = todayInput();
    $("#recurringMandatory").checked = true;
    randomizePrivateFieldNames(event.currentTarget);
    renderRecurring();
    renderUpcomingPayments();
    renderHome();
    toast("Pago recurrente agregado.");
  });

  $("#recurringList").addEventListener("click", handleRecurringAction);
}

function renderRecurring() {
  $("#recurringCategory").innerHTML = state.categories.expense
    .map((category) => `<option>${escapeHtml(category)}</option>`)
    .join("");

  const container = $("#recurringList");

  if (!state.recurring.length) {
    container.innerHTML = `<p class="empty-state">Todavía no agregaste pagos recurrentes.</p>`;
    return;
  }

  container.innerHTML = state.recurring.map((item) => {
    const next = nextRecurringDate(item);
    const amount = estimatedRecurringAmount(item);

    return `
      <article class="list-row">
        <div class="list-row__main">
          <strong>${escapeHtml(item.name)} ${item.mandatory ? '<span class="status-pill">Obligatorio</span>' : ""}</strong>
          <small>${new Intl.DateTimeFormat("es-UY", { day: "2-digit", month: "short", year: "numeric" }).format(next)} · ${item.frequency === "weekly" ? "semanal" : item.frequency === "yearly" ? "anual" : "mensual"} · estimado ${privacyHidden ? "••••" : formatMoney(amount)}</small>
        </div>
        <div class="list-actions">
          <button class="mini-control" data-recurring-pay="${item.id}">Marcar pagado</button>
          <button class="mini-control" data-recurring-edit="${item.id}">Editar</button>
          <button class="mini-control danger" data-recurring-delete="${item.id}">Borrar</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderUpcomingPayments() {
  const items = state.recurring
    .filter((item) => item.active !== false)
    .map((item) => ({ item, date: nextRecurringDate(item) }))
    .sort((a, b) => a.date - b.date)
    .slice(0, 10);

  $("#upcomingPayments").innerHTML = items.length
    ? items.map(({ item, date }) => {
        const days = daysBetween(new Date(), date);
        return `
          <article class="list-row">
            <div class="list-row__main">
              <strong>${escapeHtml(item.name)}</strong>
              <small>${days <= 0 ? "Hoy" : `En ${days} día${days === 1 ? "" : "s"}`} · ${escapeHtml(item.category)}</small>
            </div>
            <strong data-money>${privacyHidden ? "••••" : formatMoney(estimatedRecurringAmount(item))}</strong>
          </article>
        `;
      }).join("")
    : `<p class="empty-state">No hay pagos próximos.</p>`;
}

function handleRecurringAction(event) {
  const pay = event.target.closest("[data-recurring-pay]");
  const edit = event.target.closest("[data-recurring-edit]");
  const remove = event.target.closest("[data-recurring-delete]");

  if (pay) {
    const item = state.recurring.find(
      (entry) => entry.id === pay.dataset.recurringPay
    );

    if (!item) return;

    const dueDate = nextRecurringDate(item);
    const period = recurringPeriodKey(item, dueDate);

    if (item.lastPaidPeriod === period) {
      toast("Este vencimiento ya está marcado como pagado.");
      return;
    }

    const raw = prompt(
      `Importe pagado de ${item.name}:`,
      formatInputMoney(estimatedRecurringAmount(item))
    );

    if (raw === null) return;

    const amount = parseAmount(raw);

    if (!Number.isFinite(amount) || amount <= 0) {
      toast("Importe inválido.");
      return;
    }

    state.transactions.unshift({
      id: uid("tx"),
      type: "expense",
      category: item.category,
      amount,
      note: item.name,
      date: new Date().toISOString()
    });

    item.lastAmount = amount;
    item.amount = amount;
    item.lastPaidPeriod = recurringPeriodKey(item, dueDate);

    const next = new Date(dueDate);
    if (item.frequency === "weekly") next.setDate(next.getDate() + 7);
    else if (item.frequency === "yearly") next.setFullYear(next.getFullYear() + 1);
    else next.setMonth(next.getMonth() + 1);

    item.nextDue = new Date(next.getTime() - next.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);

    save("transactions", state.transactions);
    save("recurring", state.recurring);

    renderMonths();
    renderFinance();
    renderHome();
    toast("Pago registrado y próximo importe actualizado.");
  }

  if (edit) {
    const item = state.recurring.find((entry) => entry.id === edit.dataset.recurringEdit);
    if (!item) return;

    openEditor(
      "Editar pago recurrente",
      `
        <input type="hidden" name="id" value="${item.id}">
        <label>Nombre<input name="name" value="${escapeHtml(item.name)}" required></label>
        <label>Importe estimado<input name="amount" type="text" inputmode="decimal" value="${formatInputMoney(estimatedRecurringAmount(item))}" required></label>
        <label>Próximo vencimiento<input name="nextDue" type="date" value="${escapeHtml(item.nextDue)}" required></label>
        <label>Frecuencia
          <select name="frequency">
            <option value="monthly" ${item.frequency === "monthly" ? "selected" : ""}>Mensual</option>
            <option value="weekly" ${item.frequency === "weekly" ? "selected" : ""}>Semanal</option>
            <option value="yearly" ${item.frequency === "yearly" ? "selected" : ""}>Anual</option>
          </select>
        </label>
        <label class="check"><input name="mandatory" type="checkbox" ${item.mandatory ? "checked" : ""}> Gasto obligatorio</label>
      `,
      (form) => {
        const target = state.recurring.find((entry) => entry.id === form.get("id"));
        const amount = parseAmount(form.get("amount"));
        if (!target || !Number.isFinite(amount) || amount <= 0) return false;

        target.name = String(form.get("name") || "").trim();
        target.amount = amount;
        target.lastAmount = amount;

        const newNextDue = String(form.get("nextDue"));

        if (target.nextDue !== newNextDue) {
          target.lastPaidPeriod = null;
        }

        target.nextDue = newNextDue;
        target.frequency = String(form.get("frequency"));
        target.mandatory = form.get("mandatory") === "on";

        save("recurring", state.recurring);
        renderRecurring();
        renderUpcomingPayments();
        toast("Pago recurrente actualizado.");
      }
    );
  }

  if (remove && confirm("¿Borrar este pago recurrente?")) {
    state.recurring = state.recurring.filter((item) => item.id !== remove.dataset.recurringDelete);
    save("recurring", state.recurring);
    renderRecurring();
    renderUpcomingPayments();
    renderHome();
    toast("Pago recurrente borrado.");
  }
}

function initDebts() {
  $("#debtForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const person = fieldValue(event.currentTarget, "debt-person").trim();
    const amount = parseAmount(fieldValue(event.currentTarget, "debt-amount"));

    if (!person || !Number.isFinite(amount) || amount <= 0) {
      toast("Revisá la persona y el importe.");
      return;
    }

    state.debts.unshift({
      id: uid("debt"),
      type: $("#debtType").value,
      person,
      amount,
      paid: 0,
      dueDate: $("#debtDueDate").value || "",
      note: fieldValue(event.currentTarget, "debt-note").trim(),
      createdAt: new Date().toISOString()
    });

    save("debts", state.debts);
    event.currentTarget.reset();
    randomizePrivateFieldNames(event.currentTarget);
    renderDebts();
    toast("Deuda guardada.");
  });

  $("#debtList").addEventListener("click", handleDebtAction);
}

function renderDebts() {
  const owedToMe = state.debts
    .filter((item) => item.type === "owedToMe")
    .reduce((sum, item) => sum + Math.max(0, Number(item.amount) - Number(item.paid || 0)), 0);

  const iOwe = state.debts
    .filter((item) => item.type === "iOwe")
    .reduce((sum, item) => sum + Math.max(0, Number(item.amount) - Number(item.paid || 0)), 0);

  $("#debtSummary").innerHTML = `
    <div><span>Me deben</span><strong data-money>${privacyHidden ? "••••" : formatMoney(owedToMe)}</strong></div>
    <div><span>Yo debo</span><strong data-money>${privacyHidden ? "••••" : formatMoney(iOwe)}</strong></div>
    <div><span>Registros</span><strong>${state.debts.length}</strong></div>
  `;

  $("#debtList").innerHTML = state.debts.length
    ? state.debts.map((item) => {
        const remaining = Math.max(0, Number(item.amount) - Number(item.paid || 0));
        return `
          <article class="list-row ${remaining === 0 ? "settled" : ""}">
            <div class="list-row__main">
              <strong>${escapeHtml(item.person)} · ${item.type === "owedToMe" ? "Me deben" : "Yo debo"}</strong>
              <small>${escapeHtml(item.note || "Sin descripción")}${item.dueDate ? ` · vence ${escapeHtml(item.dueDate)}` : ""}</small>
            </div>
            <div class="list-actions">
              <strong data-money>${privacyHidden ? "••••" : formatMoney(remaining)}</strong>
              ${remaining > 0 ? `<button class="mini-control" data-debt-pay="${item.id}">Registrar pago</button>` : '<span class="status-pill">Saldado</span>'}
              <button class="mini-control danger" data-debt-delete="${item.id}">Borrar</button>
            </div>
          </article>
        `;
      }).join("")
    : `<p class="empty-state">No hay deudas ni préstamos registrados.</p>`;
}

function handleDebtAction(event) {
  const pay = event.target.closest("[data-debt-pay]");
  const remove = event.target.closest("[data-debt-delete]");

  if (pay) {
    const debt = state.debts.find((item) => item.id === pay.dataset.debtPay);
    if (!debt) return;

    const remaining = Math.max(0, Number(debt.amount) - Number(debt.paid || 0));
    const raw = prompt("Importe del pago:", formatInputMoney(remaining));
    if (raw === null) return;

    const amount = parseAmount(raw);
    if (!Number.isFinite(amount) || amount <= 0 || amount > remaining) {
      toast("Importe inválido.");
      return;
    }

    debt.paid = Number(debt.paid || 0) + amount;

    state.transactions.unshift({
      id: uid("tx"),
      type: debt.type === "owedToMe" ? "income" : "expense",
      category: debt.type === "owedToMe"
        ? (state.categories.income.includes("Cobros pendientes") ? "Cobros pendientes" : state.categories.income[0])
        : (state.categories.expense.includes("Otros") ? "Otros" : state.categories.expense[0]),
      amount,
      note: debt.type === "owedToMe" ? `Cobro deuda - ${debt.person}` : `Pago deuda - ${debt.person}`,
      date: new Date().toISOString()
    });

    save("debts", state.debts);
    save("transactions", state.transactions);
    renderMonths();
    renderFinance();
    renderHome();
    toast("Pago registrado.");
  }

  if (remove && confirm("¿Borrar este registro de deuda?")) {
    state.debts = state.debts.filter((item) => item.id !== remove.dataset.debtDelete);
    save("debts", state.debts);
    renderDebts();
    toast("Registro borrado.");
  }
}

function renderBackupReminder() {
  const days = Number(state.settings.backupReminderDays || 0);
  const status = $("#backupStatus");

  if (status) {
    if (!days) {
      status.textContent = "Recordatorio desactivado.";
    } else if (!state.settings.lastBackupAt) {
      status.textContent = "Todavía no registramos una copia de seguridad.";
    } else {
      const elapsed = daysBetween(new Date(state.settings.lastBackupAt), new Date());
      status.textContent = elapsed >= days
        ? `Pasaron ${elapsed} días desde la última copia. Conviene exportar una.`
        : `Última copia hace ${elapsed} día${elapsed === 1 ? "" : "s"}.`;
    }
  }
}


function renderSaved() {
  const container = $("#savedList");
  const items = [...state.savedVerses].sort((a, b) => {
    if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
    return new Date(b.savedAt) - new Date(a.savedAt);
  });

  if (!items.length) {
    container.innerHTML = `<p class="empty-state">Todavía no guardaste ninguna inspiración.</p>`;
    return;
  }

  container.innerHTML = items.map((item) => {
    const kind = item.kind || "bible";
    return `
      <article class="saved-verse ${item.pinned ? "is-pinned" : ""}">
        <span class="status-pill">${kind === "motivation" ? "Frase" : "Versículo"}</span>
        <blockquote>${escapeHtml(item.text)}</blockquote>
        <div class="saved-verse__bottom">
          <div>
            <strong>${kind === "motivation" ? "Arca" : escapeHtml(item.reference)}</strong>
            <small>${item.note ? escapeHtml(item.note) : kind === "motivation" ? "Frase motivacional" : "Reina-Valera 1909"}</small>
          </div>
          <div class="list-actions">
            <button class="mini-control" data-saved-copy="${item.id}">Copiar</button>
            <button class="mini-control" data-saved-edit="${item.id}">Editar</button>
            <button class="mini-control" data-saved-pin="${item.id}">${item.pinned ? "Desanclar" : "Anclar"}</button>
            <button class="mini-control danger" data-saved-delete="${item.id}">Borrar</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function initSaved() {
  $("#savedList").addEventListener("click", (event) => {
    const copyButton = event.target.closest("[data-saved-copy]");
    const editButton = event.target.closest("[data-saved-edit]");
    const pinButton = event.target.closest("[data-saved-pin]");
    const deleteButton = event.target.closest("[data-saved-delete]");

    if (copyButton) {
      const item = state.savedVerses.find((verse) => verse.id === copyButton.dataset.savedCopy);
      if (item) copyText((item.kind || "bible") === "motivation" ? item.text : `${item.text}\n${item.reference}`);
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
  $("#backgroundPreference").value = state.settings.background || "default";
  $("#inspirationMode").value = state.settings.inspirationMode || "bible";
  $("#backupReminder").value = String(state.settings.backupReminderDays || 0);
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
    state.settings.background = $("#backgroundPreference").value;
    state.settings.inspirationMode = $("#inspirationMode").value;
    state.settings.backupReminderDays = Number($("#backupReminder").value);
    state.settings.showWelcome = $("#welcomePreference").checked;
    state.settings.showSeconds = $("#secondsPreference").checked;
    state.settings.verseInterval = Number($("#verseInterval").value);
    state.settings.privacyOnStart = $("#privacyPreference").checked;

    save("settings", state.settings);
    applyAppearance();
    renderHome();
  };

  ["themePreference", "accentPreference", "backgroundPreference", "inspirationMode", "welcomePreference", "secondsPreference", "verseInterval", "privacyPreference", "backupReminder"]
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
  document.documentElement.dataset.background = state.settings.background || "default";
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
      goals: state.goals,
      recurring: state.recurring,
      debts: state.debts,
      settings: state.settings
    }
  };

  state.settings.lastBackupAt = new Date().toISOString();
  save("settings", state.settings);
  payload.data.settings = state.settings;
  renderBackupReminder();

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
      state.goals = Array.isArray(data.goals) ? data.goals : [];
      state.recurring = Array.isArray(data.recurring) ? data.recurring : [];
      state.debts = Array.isArray(data.debts) ? data.debts : [];
      state.settings = normalizeSettings(data.settings);

      save("transactions", state.transactions);
      save("limits", state.limits);
      save("categories", state.categories);
      save("savedVerses", state.savedVerses);
      save("goals", state.goals);
      save("recurring", state.recurring);
      save("debts", state.debts);
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


let waitingServiceWorker = null;

function showUpdateBanner(worker) {
  waitingServiceWorker = worker;

  const banner = $("#updateBanner");

  if (banner) {
    banner.hidden = false;
  }
}

function initUpdateControls() {
  $("#appVersion").textContent = APP_VERSION;

  $("#updateLater")?.addEventListener(
    "click",
    () => {
      $("#updateBanner").hidden = true;
    }
  );

  $("#updateNow")?.addEventListener(
    "click",
    () => {
      const button = $("#updateNow");

      if (!waitingServiceWorker) {
        location.reload();
        return;
      }

      button.disabled = true;
      button.textContent = "Actualizando…";

      waitingServiceWorker.postMessage({
        type: "SKIP_WAITING"
      });
    }
  );
}

async function registerArcaServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    let refreshing = false;

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      () => {
        if (refreshing) return;

        refreshing = true;
        location.reload();
      }
    );

    const registration =
      await navigator.serviceWorker.register(
        "./sw.js",
        {
          updateViaCache: "none"
        }
      );

    if (registration.waiting) {
      showUpdateBanner(
        registration.waiting
      );
    }

    registration.addEventListener(
      "updatefound",
      () => {
        const worker =
          registration.installing;

        if (!worker) return;

        worker.addEventListener(
          "statechange",
          () => {
            if (
              worker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              showUpdateBanner(worker);
            }
          }
        );
      }
    );

    const check = () => {
      registration.update().catch(() => {});
    };

    check();

    document.addEventListener(
      "visibilitychange",
      () => {
        if (
          document.visibilityState === "visible"
        ) {
          check();
        }
      }
    );

    setInterval(
      check,
      60 * 60 * 1000
    );
  } catch (error) {
    console.warn(
      "No se pudo comprobar actualizaciones.",
      error
    );
  }
}


function init() {
  applyAppearance();
  hardenTextFields();

  $("#transactionDate").value = todayInput();

  initWelcome();
  initUpdateControls();
  initClock();
  initVerseActions();
  initPrivacy();
  initFinance();
  initFinanceCollapsibles();
  initSaved();
  initGoals();
  initRecurring();
  initDebts();
  initSettings();
  initNavigation();

  renderHome();
  renderFinance();
  renderSaved();

  window.addEventListener("load", () => {
    registerArcaServiceWorker();
  });
}

init();
