import { state, persistState } from "../core/state.js";
import { createId, escapeHtml, formatCurrency, formatShortDate, showToast } from "../core/ui.js";

const expenseForm = document.getElementById("expenseForm");
const limitForm = document.getElementById("limitForm");
const limitsSummary = document.getElementById("limitsSummary");
const expenseHistory = document.getElementById("expenseHistory");

export function initExpenses() {
    expenseForm?.addEventListener("submit", handleExpenseSubmit);
    limitForm?.addEventListener("submit", handleLimitSubmit);
    expenseHistory?.addEventListener("click", handleExpenseListClick);

    renderExpenses();
}

export function renderExpenses() {
    renderLimits();
    renderHistory();
}

export function getCurrentMonthExpenses() {
    const now = new Date();

    return state.expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);

        return (
            expenseDate.getFullYear() === now.getFullYear() &&
            expenseDate.getMonth() === now.getMonth()
        );
    });
}

export function getMonthlyExpenseTotal() {
    return getCurrentMonthExpenses().reduce((total, expense) => total + expense.amount, 0);
}

export function getConfiguredLimitTotal() {
    return Object.values(state.limits).reduce((total, limit) => total + Number(limit || 0), 0);
}

function handleExpenseSubmit(event) {
    event.preventDefault();

    const formData = new FormData(expenseForm);
    const amount = Number(formData.get("amount"));

    if (!Number.isFinite(amount) || amount <= 0) {
        showToast("Ingresá un monto válido.");
        return;
    }

    state.expenses.unshift({
        id: createId("expense"),
        category: String(formData.get("category")),
        amount,
        note: String(formData.get("note") || "").trim(),
        date: new Date().toISOString()
    });

    persistState("expenses");
    expenseForm.reset();
    renderExpenses();

    document.dispatchEvent(new CustomEvent("expenses:changed"));
    showExpenseLimitMessage(String(formData.get("category")));
}

function handleLimitSubmit(event) {
    event.preventDefault();

    const formData = new FormData(limitForm);
    const category = String(formData.get("category"));
    const amount = Number(formData.get("amount"));

    if (!Number.isFinite(amount) || amount <= 0) {
        showToast("Ingresá un límite válido.");
        return;
    }

    state.limits[category] = amount;
    persistState("limits");
    limitForm.reset();
    renderExpenses();

    document.dispatchEvent(new CustomEvent("expenses:changed"));
    showToast(`Límite guardado para ${category}.`);
}

function handleExpenseListClick(event) {
    const deleteButton = event.target.closest("[data-delete-expense]");

    if (!deleteButton) {
        return;
    }

    const expenseId = deleteButton.dataset.deleteExpense;
    state.expenses = state.expenses.filter((expense) => expense.id !== expenseId);
    persistState("expenses");
    renderExpenses();

    document.dispatchEvent(new CustomEvent("expenses:changed"));
    showToast("Gasto eliminado.");
}

function renderLimits() {
    const categories = Object.keys(state.limits);

    if (!limitsSummary) {
        return;
    }

    if (categories.length === 0) {
        limitsSummary.innerHTML = '<p class="empty-state">Todavía no configuraste límites mensuales.</p>';
        return;
    }

    const monthExpenses = getCurrentMonthExpenses();

    limitsSummary.innerHTML = categories
        .sort((a, b) => a.localeCompare(b, "es"))
        .map((category) => {
            const limit = Number(state.limits[category]);
            const spent = monthExpenses
                .filter((expense) => expense.category === category)
                .reduce((total, expense) => total + expense.amount, 0);

            const rawPercentage = limit > 0 ? (spent / limit) * 100 : 0;
            const visualPercentage = Math.min(rawPercentage, 100);
            const status = rawPercentage >= 100 ? "danger" : rawPercentage >= 80 ? "warning" : "safe";

            return `
                <article class="limit-item" data-status="${status}">
                    <div class="limit-item__header">
                        <div>
                            <p class="limit-item__title">${escapeHtml(category)}</p>
                            <p class="limit-item__meta">${Math.round(rawPercentage)}% utilizado</p>
                        </div>
                        <span class="limit-item__value">${formatCurrency(spent)} / ${formatCurrency(limit)}</span>
                    </div>

                    <div class="progress-track" aria-label="${escapeHtml(category)}: ${Math.round(rawPercentage)}%">
                        <div class="progress-bar" style="--progress: ${visualPercentage}%"></div>
                    </div>
                </article>
            `;
        })
        .join("");
}

function renderHistory() {
    if (!expenseHistory) {
        return;
    }

    if (state.expenses.length === 0) {
        expenseHistory.innerHTML = '<p class="empty-state">Todavía no registraste gastos.</p>';
        return;
    }

    expenseHistory.innerHTML = state.expenses
        .slice(0, 30)
        .map((expense) => `
            <article class="expense-item">
                <div>
                    <p class="expense-item__title">${escapeHtml(expense.category)}</p>
                    <p class="expense-item__meta">
                        ${formatShortDate(expense.date)}
                        ${expense.note ? ` · ${escapeHtml(expense.note)}` : ""}
                    </p>
                </div>

                <div class="expense-item__actions">
                    <span class="expense-item__amount">${formatCurrency(expense.amount)}</span>
                    <button
                        class="expense-delete"
                        type="button"
                        data-delete-expense="${escapeHtml(expense.id)}"
                        aria-label="Eliminar gasto de ${escapeHtml(expense.category)}"
                    >
                        Eliminar
                    </button>
                </div>
            </article>
        `)
        .join("");
}

function showExpenseLimitMessage(category) {
    const limit = Number(state.limits[category]);

    if (!limit) {
        showToast("Gasto guardado.");
        return;
    }

    const categoryTotal = getCurrentMonthExpenses()
        .filter((expense) => expense.category === category)
        .reduce((total, expense) => total + expense.amount, 0);

    const percentage = (categoryTotal / limit) * 100;

    if (percentage >= 100) {
        showToast(`Superaste el límite de ${category}.`);
        return;
    }

    if (percentage >= 80) {
        showToast(`Usaste ${Math.round(percentage)}% del límite de ${category}.`);
        return;
    }

    showToast("Gasto guardado.");
}
