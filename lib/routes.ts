// lib/routes.ts

export const ROUTES = {
    home: "/",
    table: "/tableau",
    add: "/ajouter",
    dish: (slug: string) => `/plat/${slug}`,
  };
  