import { ROUTES, RouteType } from "../app/AppRoutes";

export function routeWithId(route: string, id: number): string {
  return route.replace(":id", id.toString());
}

export function getCurrentRoute(): RouteType | undefined {
  return Object.values(ROUTES).find(
    (route) => route.path === window.location.pathname
  );
}
