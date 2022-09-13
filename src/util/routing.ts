import { ROUTES, RouteType } from "../app/AppRoutes";

const routeIdValueRegex = /\d+/;
const routeIdSubstitutionString = ":id";

export function routeWithId(route: string, id: string | number): string {
  return route.replace(":id", id.toString());
}

export function getCurrentRoute(): RouteType | undefined {
  return Object.values(ROUTES).find((route) => {
    const path = route.path.replace(routeIdSubstitutionString, "");
    const actualPath = window.location.pathname.replace(routeIdValueRegex, "");
    return path === actualPath;
  });
}

export function getCurrentRouteId() {
  const match = window.location.pathname.match(routeIdValueRegex);
  return match ? match[0] : null;
}
