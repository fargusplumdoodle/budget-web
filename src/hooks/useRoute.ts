import { ROUTES, RouteType } from "../app/AppRoutes";
import { useLocation } from "react-router-dom";
import { routeIdSubstitutionString, routeIdValueRegex } from "../util/routing";

const removeIdTemplateFromPath = (path: string) =>
  path.replace(routeIdSubstitutionString, "");

const removeIdFromPath = (path: string) => path.replace(routeIdValueRegex, "");

const getRouteFromPathname = (pathname: string): RouteType | undefined =>
  Object.values(ROUTES).find((route) => {
    const path = removeIdTemplateFromPath(route.path);
    const actualPath = removeIdFromPath(pathname);
    return path === actualPath;
  });

const useRoute = (): RouteType | null => {
  const { pathname } = useLocation();
  if (!pathname) return null;

  const route = getRouteFromPathname(pathname);
  return route || null;
};

export default useRoute;
