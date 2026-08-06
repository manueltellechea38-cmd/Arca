import { state, persistState } from "../core/state.js";

export function isFavorite(projectId) {
    return state.favorites.includes(projectId);
}

export function isPinned(projectId) {
    return state.pinned.includes(projectId);
}

export function isHidden(projectId) {
    return state.hidden.includes(projectId);
}

export function toggleFavorite(projectId) {
    state.favorites = toggleId(state.favorites, projectId);
    persistState("favorites");
    return isFavorite(projectId);
}

export function togglePinned(projectId) {
    state.pinned = toggleId(state.pinned, projectId);
    persistState("pinned");
    return isPinned(projectId);
}

export function hideProject(projectId) {
    if (!state.hidden.includes(projectId)) {
        state.hidden.push(projectId);
        persistState("hidden");
    }
}

export function restoreHiddenProjects() {
    state.hidden = [];
    persistState("hidden");
}

function toggleId(collection, id) {
    if (collection.includes(id)) {
        return collection.filter((currentId) => currentId !== id);
    }

    return [...collection, id];
}
