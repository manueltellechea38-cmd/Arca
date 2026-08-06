import { state } from "../core/state.js";
import { escapeHtml, formatCurrency, roundToNearest, showToast } from "../core/ui.js";
import {
    hideProject,
    isFavorite,
    isHidden,
    isPinned,
    toggleFavorite,
    togglePinned
} from "./favoritos.js";

const projectCatalog = document.getElementById("projectCatalog");
const searchInput = document.getElementById("projectSearch");
const categoryFilter = document.getElementById("projectCategoryFilter");
const sortSelect = document.getElementById("projectSort");
const dialog = document.getElementById("projectDialog");
const dialogContent = document.getElementById("projectDialogContent");
const closeDialogButton = document.getElementById("closeProjectDialog");

export function initProjects() {
    searchInput?.addEventListener("input", renderProjectCatalog);
    categoryFilter?.addEventListener("change", renderProjectCatalog);
    sortSelect?.addEventListener("change", renderProjectCatalog);
    projectCatalog?.addEventListener("click", handleCatalogClick);

    closeDialogButton?.addEventListener("click", () => dialog?.close());
    dialog?.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    renderProjectCatalog();
}

export function renderProjectCatalog() {
    if (!projectCatalog) {
        return;
    }

    const projects = getFilteredProjects();

    if (projects.length === 0) {
        projectCatalog.innerHTML = '<p class="empty-state">No hay proyectos que coincidan con la búsqueda.</p>';
        return;
    }

    projectCatalog.innerHTML = projects.map(createProjectCard).join("");
}

export function getProjectEstimate(project) {
    const adjustedMaterials = Number(project.materialCost || 0) * Number(state.settings.materialFactor || 1);
    const labor = Number(project.hours || 0) * Number(state.settings.hourlyRate || 0);
    const consumables = Number(project.consumablesCost || 0);
    const totalCost = roundToNearest(adjustedMaterials + labor + consumables, 10);

    const minimumSale = totalCost * Number(project.saleMultiplier || 2);
    const suggestedSale = roundToNearest(Math.max(Number(project.baseSale || 0), minimumSale), 50);
    const profit = suggestedSale - totalCost;
    const margin = suggestedSale > 0 ? (profit / suggestedSale) * 100 : 0;

    return {
        totalCost,
        suggestedSale,
        profit,
        margin
    };
}

export function createProjectCard(project) {
    const estimate = getProjectEstimate(project);
    const favorite = isFavorite(project.id);
    const pinned = isPinned(project.id);

    return `
        <article class="project-card" data-project-id="${escapeHtml(project.id)}">
            <img
                class="project-card__image"
                src="${escapeHtml(project.image)}"
                alt="${escapeHtml(project.imageAlt || project.name)}"
                loading="lazy"
                referrerpolicy="no-referrer"
            >

            <div class="project-card__body">
                <div class="project-card__header">
                    <div>
                        <span class="project-card__category">${escapeHtml(project.category)}</span>
                        <h3 class="project-card__title">${escapeHtml(project.name)}</h3>
                    </div>
                </div>

                <p class="project-card__description">${escapeHtml(project.description)}</p>

                <div class="project-card__metrics">
                    <div class="project-metric">
                        <span>Costo estimado</span>
                        <strong>${formatCurrency(estimate.totalCost)}</strong>
                    </div>
                    <div class="project-metric">
                        <span>Ganancia</span>
                        <strong>${formatCurrency(estimate.profit)}</strong>
                    </div>
                    <div class="project-metric">
                        <span>Tiempo</span>
                        <strong>${Number(project.hours)} h</strong>
                    </div>
                    <div class="project-metric">
                        <span>Margen</span>
                        <strong>${Math.round(estimate.margin)}%</strong>
                    </div>
                </div>

                <div class="project-card__actions">
                    <button class="project-action project-action--primary" type="button" data-project-action="details">
                        Ver detalle
                    </button>
                    <button
                        class="project-action ${favorite ? "is-active" : ""}"
                        type="button"
                        data-project-action="favorite"
                        aria-pressed="${favorite}"
                    >
                        Favorito
                    </button>
                    <button
                        class="project-action ${pinned ? "is-active" : ""}"
                        type="button"
                        data-project-action="pin"
                        aria-pressed="${pinned}"
                    >
                        Anclar
                    </button>
                </div>
            </div>
        </article>
    `;
}

function getFilteredProjects() {
    const query = searchInput?.value.trim().toLocaleLowerCase("es") || "";
    const category = categoryFilter?.value || "all";
    const sort = sortSelect?.value || "recommended";

    const filtered = state.projects.filter((project) => {
        if (isHidden(project.id)) {
            return false;
        }

        if (category !== "all" && project.category !== category) {
            return false;
        }

        if (!query) {
            return true;
        }

        const searchableText = [
            project.name,
            project.description,
            project.client,
            project.need,
            ...(project.salesChannels || [])
        ]
            .join(" ")
            .toLocaleLowerCase("es");

        return searchableText.includes(query);
    });

    return sortProjects(filtered, sort);
}

function sortProjects(projects, sort) {
    const copy = [...projects];

    if (sort === "profit-desc") {
        return copy.sort((a, b) => getProjectEstimate(b).profit - getProjectEstimate(a).profit);
    }

    if (sort === "cost-asc") {
        return copy.sort((a, b) => getProjectEstimate(a).totalCost - getProjectEstimate(b).totalCost);
    }

    if (sort === "time-asc") {
        return copy.sort((a, b) => Number(a.hours) - Number(b.hours));
    }

    return copy.sort((a, b) => {
        const pinDifference = Number(isPinned(b.id)) - Number(isPinned(a.id));

        if (pinDifference !== 0) {
            return pinDifference;
        }

        return Number(b.demandScore || 0) - Number(a.demandScore || 0);
    });
}

function handleCatalogClick(event) {
    const actionButton = event.target.closest("[data-project-action]");
    const card = event.target.closest("[data-project-id]");

    if (!actionButton || !card) {
        return;
    }

    handleProjectAction(card.dataset.projectId, actionButton.dataset.projectAction);
}

export function handleProjectAction(projectId, action) {
    const project = state.projects.find((item) => item.id === projectId);

    if (!project) {
        return;
    }

    if (action === "details") {
        openProjectDialog(project);
        return;
    }

    if (action === "favorite") {
        const active = toggleFavorite(project.id);
        showToast(active ? "Proyecto guardado como favorito." : "Proyecto quitado de favoritos.");
    }

    if (action === "pin") {
        const active = togglePinned(project.id);
        showToast(active ? "Proyecto anclado." : "Proyecto desanclado.");
    }

    if (action === "hide") {
        hideProject(project.id);
        showToast("Proyecto ocultado.");
    }

    renderProjectCatalog();
    document.dispatchEvent(new CustomEvent("projects:selection-changed"));
}

function openProjectDialog(project) {
    if (!dialog || !dialogContent) {
        return;
    }

    const estimate = getProjectEstimate(project);

    dialogContent.innerHTML = `
        <div class="project-detail">
            <img
                class="project-detail__image"
                src="${escapeHtml(project.image)}"
                alt="${escapeHtml(project.imageAlt || project.name)}"
                referrerpolicy="no-referrer"
            >

            <div>
                <span class="project-card__category">${escapeHtml(project.category)}</span>
                <h3>${escapeHtml(project.name)}</h3>
                <p>${escapeHtml(project.description)}</p>
            </div>

            <div class="project-detail__grid">
                <div class="project-metric">
                    <span>Costo total</span>
                    <strong>${formatCurrency(estimate.totalCost)}</strong>
                </div>
                <div class="project-metric">
                    <span>Venta sugerida</span>
                    <strong>${formatCurrency(estimate.suggestedSale)}</strong>
                </div>
                <div class="project-metric">
                    <span>Ganancia</span>
                    <strong>${formatCurrency(estimate.profit)}</strong>
                </div>
            </div>

            <section class="project-detail__section">
                <h4>Cliente ideal</h4>
                <p>${escapeHtml(project.client)}</p>
            </section>

            <section class="project-detail__section">
                <h4>Necesidad que cubre</h4>
                <p>${escapeHtml(project.need)}</p>
            </section>

            <section class="project-detail__section">
                <h4>Dónde venderlo</h4>
                <ul>${(project.salesChannels || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </section>

            <section class="project-detail__section">
                <h4>Materiales principales</h4>
                <ul>${(project.materials || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </section>

            <section class="project-detail__section">
                <h4>Herramientas</h4>
                <ul>${(project.tools || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </section>

            <button class="secondary-button" type="button" data-hide-project="${escapeHtml(project.id)}">
                Ocultar esta sugerencia
            </button>
        </div>
    `;

    dialogContent.querySelector("[data-hide-project]")?.addEventListener("click", () => {
        hideProject(project.id);
        dialog.close();
        renderProjectCatalog();
        document.dispatchEvent(new CustomEvent("projects:selection-changed"));
        showToast("Proyecto ocultado.");
    });

    dialog.showModal();
}
