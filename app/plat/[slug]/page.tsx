// app/plat/[slug]/page.tsx

import { notFound } from "next/navigation";
import { vegetarianDishes } from "@/data/dishes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export async function generateStaticParams() {
  return vegetarianDishes.map((dish) => ({ slug: dish.slug }));
}

export default function DishPage({ params }: { params: { slug: string } }) {
  const dish = vegetarianDishes.find((d) => d.slug === params.slug);
  if (!dish) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-2">
            {dish.dish} ({dish.country})
          </h1>
          <div className="mb-4 text-sm text-muted-foreground italic">
            <span className="font-medium">Continent :</span> {dish.continent}
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-1">Glucides :</h2>
            <div className="flex gap-2 flex-wrap">
              {dish.carbs.map((carb, index) => (
                <Badge key={index}>{carb}</Badge>
              ))}
            </div>
          </div>

          {dish.ingredients && (
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Ingrédients :</h2>
              <ul className="list-disc list-inside">
                {dish.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}

          {dish.description && (
            <div className="mb-4">
              <h2 className="font-semibold mb-1">Préparation :</h2>
              <p>{dish.description}</p>
            </div>
          )}

          <div className="text-right">
            <a
              href={dish.recipe}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Voir la recette d'origine
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Link href={ROUTES.tableau} className="text-sm text-blue-500 hover:underline">
          ← Retour au tableau
        </Link>
      </div>
    </div>
  );
}
