export { intlayerProxy as middleware } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|fleets$|.*\\..*|_next).*)",
};
