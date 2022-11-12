export const routeIdValueRegex = /\d+/;
export const routeIdSubstitutionString = ":id";

export function routeWithId(route: string, id: string | number): string {
  return route.replace(":id", id.toString());
}

export function getCurrentRouteId() {
  const match = window.location.pathname.match(routeIdValueRegex);
  return match ? match[0] : null;
}
