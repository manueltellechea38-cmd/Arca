import { state } from "../core/state.js";
import { createProjectCard, handleProjectAction } from "./proyectos.js";
import { isFavorite, isPinned } from "./favoritos.js";

const pinnedProjects = document.getElementById("pinnedProjects");
const favoriteProjects = document.getElementById("favoriteProjects");

export function initSavedProjectsView() {
    pinnedProjects?.addEventListener("click", forwardProjectAction);
    favoriteProjects?.addEventListener("click", forwardProjectAction);

    renderSavedProjects();
}

export function renderSavedProjects() {
    renderCollection(
        pinnedProjects,
        state.projects.filter((project) => isPinned(project.id)),
        "No tenés proyectos anclados."
    );

    renderCollection(
        favoriteProjects,
        state.projects.filter((project) => isFavorite(project.id)),
        "No tenés proyectos favoritos."
    );
}

function renderCollection(container, projects, emptyMessage) {
    if (!container) {
        return;
    }

    container.innerHTML = projects.length
        ? projects.map(createProjectCard).join("")
        : `<p class="empty-state">${emptyMessage}</p>`;
}

function forwardProjectAction(event) {
    const actionButton = event.target.closest("[data-project-action]");
    const card = event.target.closest("[data-project-id]");

    if (!actionButton || !card) {
        return;
    }

    handleProjectAction(card.dataset.projectId, actionButton.dataset.projectAction);
}
