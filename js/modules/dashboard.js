import { state } from "../core/state.js";
import { formatCurrency, escapeHtml } from "../core/ui.js";
import { getConfiguredLimitTotal, getMonthlyExpenseTotal } from "./gastos.js";
import { getProjectEstimate } from "./proyectos.js";
import { isHidden } from "./favoritos.js";

const greeting = document.getElementById("dashboardGreeting");
const expenseTotal = document.getElementById("dashboardExpenseTotal");
const expenseStatus = document.getElementById("dashboardExpenseStatus");
const limitCount = document.getElementById("dashboardLimitCount");
const dailyProject = document.getElementById("dailyProject");

export function initDashboard() {
    renderDashboard();
}

export function renderDashboard() {
    renderGreeting();
    renderExpenseSummary();
    renderDailyProject();
}

function renderGreeting() {
    if (!greeting) {
        return;
    }

    const hour = new Date().getHours();
    const message = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
    greeting.textContent = message;
}

function renderExpenseSummary() {
    const total = getMonthlyExpenseTotal();
    const totalLimits = getConfiguredLimitTotal();
    const configuredCount = Object.keys(state.limits).length;

    if (expenseTotal) {
        expenseTotal.textContent = formatCurrency(total);
    }

    if (limitCount) {
        limitCount.textContent = String(configuredCount);
    }

    if (!expenseStatus) {
        return;
    }

    if (totalLimits <= 0) {
        expenseStatus.textContent = "Sin límites configurados";
        return;
    }

    const percentage = Math.round((total / totalLimits) * 100);

    if (percentage >= 100) {
        expenseStatus.textContent = `Superaste el total de límites (${percentage}%)`;
    } else if (percentage >= 80) {
        expenseStatus.textContent = `Cerca del total permitido (${percentage}%)`;
    } else {
        expenseStatus.textContent = `Dentro de lo previsto (${percentage}%)`;
    }
}

function renderDailyProject() {
    if (!dailyProject) {
        return;
    }

    const availableProjects = state.projects.filter((project) => !isHidden(project.id));

    if (availableProjects.length === 0) {
        dailyProject.innerHTML = '<p class="empty-state">No hay proyectos disponibles.</p>';
        return;
    }

    const project = availableProjects[getDailyIndex(availableProjects.length)];
    const estimate = getProjectEstimate(project);

    dailyProject.innerHTML = `
        <img
            class="daily-project__image"
            src="${escapeHtml(project.image)}"
            alt="${escapeHtml(project.imageAlt || project.name)}"
            referrerpolicy="no-referrer"
        >

        <div class="daily-project__content">
            <span class="project-card__category">${escapeHtml(project.category)}</span>
            <h3 class="daily-project__title">${escapeHtml(project.name)}</h3>
            <p class="daily-project__description">${escapeHtml(project.description)}</p>

            <div class="daily-project__metric">
                <span>Ganancia estimada</span>
                <strong>${formatCurrency(estimate.profit)}</strong>
            </div>

            <p class="summary-card__meta">
                Tiempo estimado: ${Number(project.hours)} horas · Margen: ${Math.round(estimate.margin)}%
            </p>
        </div>
    `;
}

function getDailyIndex(length) {
    const today = new Date();
    const seed = Number(
        `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`
    );

    return seed % length;
}
