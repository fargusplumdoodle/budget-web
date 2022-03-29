export function routeWithId(route: string, id: number): string {
  return route.replace(":id", id.toString());
}
