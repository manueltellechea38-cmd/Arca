import { readStorage, writeStorage } from "../core/storage.js";

const LOCAL_CATALOG_URL = "data/proyectos.json";

async function requestCatalog(url) {
    const response = await fetch(url, {
        headers: {
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`El catálogo respondió con estado ${response.status}.`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new TypeError("El catálogo debe ser una lista de proyectos.");
    }

    return data;
}

export async function loadCatalog(remoteCatalogUrl = "") {
    const cachedCatalog = readStorage("catalog-cache", []);

    if (remoteCatalogUrl.trim()) {
        try {
            const remoteCatalog = await requestCatalog(remoteCatalogUrl.trim());
            writeStorage("catalog-cache", remoteCatalog);
            return remoteCatalog;
        } catch (error) {
            console.warn("No se pudo cargar el catálogo remoto.", error);
        }
    }

    try {
        const localCatalog = await requestCatalog(LOCAL_CATALOG_URL);
        writeStorage("catalog-cache", localCatalog);
        return localCatalog;
    } catch (error) {
        console.warn("No se pudo cargar el catálogo local.", error);

        if (cachedCatalog.length > 0) {
            return cachedCatalog;
        }

        throw error;
    }
}
