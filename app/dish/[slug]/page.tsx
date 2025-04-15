// app/dish/[slug]/page.tsx
import { notFound } from "next/navigation";
import { vegetarianDishes } from "@/data/dishes";

interface DishPageProps {
  params: {
    slug: string;
  };
}

export default function DishPage({ params }: DishPageProps) {
  const dish = vegetarianDishes.find((d) => d.slug === params.slug);

  if (!dish) return notFound();

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{dish.dish}</h1>
      <p className="text-lg mb-1 text-gray-700">
        <strong>Pays :</strong> {dish.country} – <strong>Continent :</strong> {dish.continent}
      </p>
      <p className="mb-2">
        <strong>Glucides :</strong>{" "}
        {dish.carbs.length > 0 ? dish.carbs.join(", ") : "Aucun précisé"}
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Lien source :</h2>
        <a
          href={dish.recipe}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Consulter la recette originale
        </a>
      </div>
      <p className="text-gray-600 italic">Recette détaillée bientôt disponible ici.</p>
    </main>
  );
}
