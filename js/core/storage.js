const PREFIX = "woodmanager";

export function readStorage(key, fallbackValue) {
    try {
        const storedValue = localStorage.getItem(`${PREFIX}:${key}`);

        if (storedValue === null) {
            return fallbackValue;
        }

        return JSON.parse(storedValue);
    } catch (error) {
        console.warn(`No se pudo leer ${key} desde localStorage.`, error);
        return fallbackValue;
    }
}

export function writeStorage(key, value) {
    try {
        localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn(`No se pudo guardar ${key} en localStorage.`, error);
        return false;
    }
}

export function clearAppStorage() {
    Object.keys(localStorage)
        .filter((key) => key.startsWith(`${PREFIX}:`))
        .forEach((key) => localStorage.removeItem(key));
}
