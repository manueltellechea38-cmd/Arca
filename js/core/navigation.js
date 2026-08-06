let activeRoute = "dashboard";

export function initNavigation(onRouteChange) {
    const routeButtons = document.querySelectorAll("[data-route]");
    const routeTargets = document.querySelectorAll("[data-route-target]");

    routeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.route, onRouteChange);
        });
    });

    routeTargets.forEach((button) => {
        button.addEventListener("click", () => {
            navigateTo(button.dataset.routeTarget, onRouteChange);
        });
    });

    navigateTo(activeRoute, onRouteChange, false);
}

export function navigateTo(route, onRouteChange, moveFocus = true) {
    const targetView = document.querySelector(`[data-view="${route}"]`);

    if (!targetView) {
        return;
    }

    activeRoute = route;

    document.querySelectorAll("[data-view]").forEach((view) => {
        const isActive = view === targetView;
        view.hidden = !isActive;
        view.classList.toggle("is-active", isActive);
    });

    document.querySelectorAll("[data-route]").forEach((button) => {
        const isActive = button.dataset.route === route;
        button.classList.toggle("is-active", isActive);

        if (isActive) {
            button.setAttribute("aria-current", "page");
        } else {
            button.removeAttribute("aria-current");
        }
    });

    if (moveFocus) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        targetView.querySelector("h2")?.focus?.({ preventScroll: true });
    }

    onRouteChange?.(route);
}

export function getActiveRoute() {
    return activeRoute;
}
