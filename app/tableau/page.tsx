"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, StarOff } from "lucide-react";
import AddRecipeModal from "@/components/ui/add-recipe-modal";
import { vegetarianDishes as initialDishes } from "@/lib/dishes";

export default function VegetarianWorldTable() {
  const [selectedContinent, setSelectedContinent] = useState("Tous");
  const [selectedCarb, setSelectedCarb] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    }
    return [];
  });
  const [dishes, setDishes] = useState(initialDishes);

  const continents = ["Tous", ...Array.from(new Set(initialDishes.map((d) => d.continent)))];
  const allCarbs = Array.from(new Set(initialDishes.flatMap((d) => d.carbs)));
  const carbs = ["Tous", ...allCarbs];

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (dishName: string) => {
    setFavorites((prev) =>
      prev.includes(dishName) ? prev.filter((name) => name !== dishName) : [...prev, dishName]
    );
  };

  const filteredDishes = dishes.filter((dish) => {
    const matchesContinent = selectedContinent === "Tous" || dish.continent === selectedContinent;
    const matchesCarb = selectedCarb === "Tous" || dish.carbs.includes(selectedCarb);
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      dish.dish.toLowerCase().includes(searchLower) ||
      dish.carbs.some((carb) => carb.toLowerCase().includes(searchLower));
    return matchesContinent && matchesCarb && matchesSearch;
  });

  const handleExportCSV = () => {
    const csvContent = [
      ["Pays", "Plat", "Glucides", "Lien de recette"],
      ...filteredDishes.map((d) => [d.country, d.dish, d.carbs.join(" / "), d.recipe]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "plats_vegetariens.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => window.print();

  const handleAddRecipe = (newRecipe: any) => {
    setDishes((prev) => [...prev, newRecipe]);
  };

  return (
    <Card className="p-4">
      <CardContent>
        <h1 className="text-2xl font-bold mb-4">Plats végétariens du monde</h1>

        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:flex-wrap">
          <div className="flex items-center gap-2">
            <label className="font-medium whitespace-nowrap">Continent :</label>
            <Select onValueChange={setSelectedContinent} defaultValue="Tous">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Continent" />
              </SelectTrigger>
              <SelectContent>
                {continents.map((c, i) => (
                  <SelectItem key={i} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium whitespace-nowrap">Glucide :</label>
            <Select onValueChange={setSelectedCarb} defaultValue="Tous">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Glucide" />
              </SelectTrigger>
              <SelectContent>
                {carbs.map((c, i) => (
                  <SelectItem key={i} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Input
            type="text"
            placeholder="Rechercher un plat ou un ingrédient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[250px]"
          />

          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline">
              🖨️ Imprimer / PDF
            </Button>
            <Button onClick={handleExportCSV} variant="outline">
              📀 Export CSV
            </Button>
            <AddRecipeModal onAdd={handleAddRecipe} />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>⭐</TableHead>
              <TableHead>Pays</TableHead>
              <TableHead>Plat</TableHead>
              <TableHead>Glucides principaux</TableHead>
              <TableHead>Recette</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDishes.map((dish, index) => (
              <TableRow key={index} className={favorites.includes(dish.dish) ? "bg-yellow-50" : ""}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(dish.dish)}
                  >
                    {favorites.includes(dish.dish) ? (
                      <Star className="text-yellow-500" />
                    ) : (
                      <StarOff />
                    )}
                  </Button>
                </TableCell>
                <TableCell>{dish.country}</TableCell>
                <TableCell>{dish.dish}</TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  {dish.carbs.map((carb: string, i: number) => (
                    <Badge key={i}>{carb}</Badge>
                  ))}
                </TableCell>
                <TableCell>
                  <a
                    href={dish.recipe}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Voir la recette
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
