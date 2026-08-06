import { clearAppStorage } from "../core/storage.js";
import { state, updateSettings } from "../core/state.js";
import { showToast } from "../core/ui.js";

const settingsForm = document.getElementById("settingsForm");
const hourlyRateInput = document.getElementById("hourlyRate");
const materialFactorSelect = document.getElementById("materialFactor");
const themePreferenceSelect = document.getElementById("themePreference");
const remoteCatalogUrlInput = document.getElementById("remoteCatalogUrl");
const resetLocalDataButton = document.getElementById("resetLocalData");
const themeToggleButton = document.getElementById("themeToggle");

export function initSettings() {
    fillSettingsForm();
    applyTheme(state.settings.themePreference);

    settingsForm?.addEventListener("submit", handleSettingsSubmit);
    resetLocalDataButton?.addEventListener("click", handleReset);
    themeToggleButton?.addEventListener("click", toggleTheme);
}

export function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
        "content",
        theme === "dark" ? "#111714" : "#173f35"
    );
}

function fillSettingsForm() {
    if (hourlyRateInput) {
        hourlyRateInput.value = String(state.settings.hourlyRate);
    }

    if (materialFactorSelect) {
        materialFactorSelect.value = String(state.settings.materialFactor);
    }

    if (themePreferenceSelect) {
        themePreferenceSelect.value = state.settings.themePreference;
    }

    if (remoteCatalogUrlInput) {
        remoteCatalogUrlInput.value = state.settings.remoteCatalogUrl;
    }
}

function handleSettingsSubmit(event) {
    event.preventDefault();

    updateSettings({
        hourlyRate: Number(hourlyRateInput.value),
        materialFactor: Number(materialFactorSelect.value),
        themePreference: themePreferenceSelect.value,
        remoteCatalogUrl: remoteCatalogUrlInput.value.trim()
    });

    applyTheme(state.settings.themePreference);
    document.dispatchEvent(new CustomEvent("settings:changed"));
    showToast("Configuración guardada.");
}

function toggleTheme() {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    updateSettings({ themePreference: nextTheme });

    if (themePreferenceSelect) {
        themePreferenceSelect.value = nextTheme;
    }

    applyTheme(nextTheme);
    showToast(nextTheme === "dark" ? "Tema oscuro activado." : "Tema claro activado.");
}

function handleReset() {
    const confirmed = window.confirm(
        "Se borrarán gastos, límites, favoritos, anclados y configuración de este dispositivo."
    );

    if (!confirmed) {
        return;
    }

    clearAppStorage();
    window.location.reload();
}
