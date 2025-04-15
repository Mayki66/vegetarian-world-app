// app/recette/[slug]/page.tsx
import { notFound } from "next/navigation";
import { vegetarianDishes } from "@/data/dishes";
import { generateSlug } from "@/lib/generateSlug";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return vegetarianDishes.map((dish) => ({
    slug: dish.slug,
  }));
}

export default function DishPage({ params }: { params: { slug: string } }) {
  const dish = vegetarianDishes.find((d) => d.slug === params.slug);

  if (!dish) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{dish.dish}</h1>
      <p className="text-muted-foreground text-lg mb-2">
        Origine : <strong>{dish.country}</strong> ({dish.continent})
      </p>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Glucides / Ingrédients principaux :</h2>
        <div className="flex flex-wrap gap-2">
          {dish.carbs.map((carb, i) => (
            <Badge key={i}>{carb}</Badge>
          ))}
        </div>
      </div>

      <a
        href={dish.recipe}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mt-6 inline-block"
      >
        Voir la recette originale 🍽️
      </a>
    </div>
  );
}
