import { state } from "./core/state.js";
import { initNavigation } from "./core/navigation.js";
import { loadCatalog } from "./services/catalogo.js";
import { initExpenses, renderExpenses } from "./modules/gastos.js";
import { initProjects, renderProjectCatalog } from "./modules/proyectos.js";
import { initSavedProjectsView, renderSavedProjects } from "./modules/favoritos-view.js";
import { initDashboard, renderDashboard } from "./modules/dashboard.js";
import { initSettings } from "./modules/configuracion.js";
import { showToast } from "./core/ui.js";

async function bootstrap() {
    initSettings();
    initExpenses();

    try {
        state.projects = await loadCatalog(state.settings.remoteCatalogUrl);
    } catch (error) {
        console.error(error);
        showToast("No se pudo cargar el catálogo.");
        state.projects = [];
    }

    initProjects();
    initSavedProjectsView();
    initDashboard();

    initNavigation((route) => {
        if (route === "dashboard") {
            renderDashboard();
        }

        if (route === "gastos") {
            renderExpenses();
        }

        if (route === "proyectos") {
            renderProjectCatalog();
        }

        if (route === "favoritos") {
            renderSavedProjects();
        }
    });

    document.addEventListener("expenses:changed", () => {
        renderDashboard();
    });

    document.addEventListener("projects:selection-changed", () => {
        renderProjectCatalog();
        renderSavedProjects();
        renderDashboard();
    });

    document.addEventListener("settings:changed", async () => {
        try {
            state.projects = await loadCatalog(state.settings.remoteCatalogUrl);
        } catch (error) {
            console.error(error);
            showToast("Se mantuvo el catálogo anterior.");
        }

        renderProjectCatalog();
        renderSavedProjects();
        renderDashboard();
    });

    registerServiceWorker();
}

function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
        return;
    }

    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch((error) => {
            console.warn("No se pudo registrar el service worker.", error);
        });
    });
}

bootstrap();
