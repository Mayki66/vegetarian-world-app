export function generateSlug(dishName: string): string {
    return dishName
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "") // Enlève les accents
      .replace(/[^a-z0-9]+/g, "-") // Remplace tout caractère non alphanumérique par tiret
      .replace(/(^-|-$)+/g, ""); // Supprime les tirets en début/fin
  }
  