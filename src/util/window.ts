export function getServerURL(api = false): string {
  const webPort =
    window.location.port === "3000" ? `:${window.location.port}` : "";
  const port =
    api && process.env.NODE_ENV === "development" ? ":8000" : webPort;
  const apiRoute = api ? "/api" : "";
  return `${window.location.protocol}//${window.location.hostname}${port}${apiRoute}`;
}
