const currencyFormatter = new Intl.NumberFormat("es-UY", {
    style: "currency",
    currency: "UYU",
    maximumFractionDigits: 0
});

const dateFormatter = new Intl.DateTimeFormat("es-UY", {
    day: "2-digit",
    month: "short"
});

let toastTimer;

export function formatCurrency(value) {
    return currencyFormatter.format(Number(value) || 0);
}

export function formatShortDate(value) {
    return dateFormatter.format(new Date(value));
}

export function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");

    toastTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 2600);
}

export function createId(prefix = "item") {
    if (window.crypto?.randomUUID) {
        return `${prefix}-${window.crypto.randomUUID()}`;
    }

    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function roundToNearest(value, step = 50) {
    return Math.ceil(value / step) * step;
}

export function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
