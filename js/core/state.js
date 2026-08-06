import { readStorage, writeStorage } from "./storage.js";

const defaultSettings = {
    hourlyRate: 250,
    materialFactor: 1,
    themePreference: "system",
    remoteCatalogUrl: ""
};

export const state = {
    expenses: readStorage("expenses", []),
    limits: readStorage("limits", {}),
    favorites: readStorage("favorites", []),
    pinned: readStorage("pinned", []),
    hidden: readStorage("hidden", []),
    settings: {
        ...defaultSettings,
        ...readStorage("settings", {})
    },
    projects: []
};

export function persistState(key) {
    return writeStorage(key, state[key]);
}

export function updateSettings(nextSettings) {
    state.settings = {
        ...state.settings,
        ...nextSettings
    };

    persistState("settings");
}
