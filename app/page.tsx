"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-white dark:bg-zinc-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="max-w-xl w-full text-center border border-zinc-200 dark:border-zinc-700">
        <CardContent>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">
              🌍 Explorer les plats végétariens du monde
            </h1>
            <p className="text-zinc-600 dark:text-zinc-300">
              Découvrez des dizaines de recettes végétariennes traditionnelles, classées par pays, type de glucides et continents. Filtrez, cherchez, exportez ou imprimez les plats à volonté !
            </p>
            <Link href="/tableau">
              <Button className="mt-4" variant="default">
                Voir le tableau complet 🥗
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
