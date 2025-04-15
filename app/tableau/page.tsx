"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Star, StarOff } from "lucide-react";
import AddRecipeModal from "@/components/ui/add-recipe-modal";
import { vegetarianDishes as initialDishes } from "@/data/dishes";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { Dish } from "@/lib/types";

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

  const continents = ["Tous", ...new Set(initialDishes.map((d) => d.continent))];
  const allCarbs = Array.from(new Set(initialDishes.flatMap((d) => d.carbs)));
  const carbs = ["Tous", ...allCarbs];

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (dishName: string) => {
    setFavorites((prev) =>
      prev.includes(dishName)
        ? prev.filter((name) => name !== dishName)
        : [...prev, dishName]
    );
  };

  const filteredDishes = initialDishes.filter((dish) => {
    const matchesContinent =
      selectedContinent === "Tous" || dish.continent === selectedContinent;
    const matchesCarb =
      selectedCarb === "Tous" || dish.carbs.includes(selectedCarb);
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      dish.dish.toLowerCase().includes(searchLower) ||
      dish.carbs.some((carb) => carb.toLowerCase().includes(searchLower));
    return matchesContinent && matchesCarb && matchesSearch;
  });

  const handleExportExcel = () => {
    const csvContent = [
      ["Pays", "Plat", "Glucides", "Lien de recette"],
      ...filteredDishes.map((d) => [
        d.country,
        d.dish,
        d.carbs.join(" / "),
        `${ROUTES.dish(d.slug)}`,
      ]),
    ]
      .map((e) => e.map((v) => `"${v}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "plats_vegetariens.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="p-4">
      <CardContent>
        <h1 className="text-2xl font-bold mb-4">Plats végétariens du monde</h1>

        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="font-medium md:mr-2 md:whitespace-nowrap">
              Continent :
            </label>
            <Select onValueChange={setSelectedContinent} defaultValue="Tous">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Continent" />
              </SelectTrigger>
              <SelectContent>
                {continents.map((c, i) => (
                  <SelectItem key={i} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="font-medium md:mr-2 md:whitespace-nowrap">
              Glucide :
            </label>
            <Select onValueChange={setSelectedCarb} defaultValue="Tous">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Glucide" />
              </SelectTrigger>
              <SelectContent>
                {carbs.map((c, i) => (
                  <SelectItem key={i} value={c}>
                    {c}
                  </SelectItem>
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
            <Button onClick={handleExportExcel} variant="outline">
              💾 Export Excel
            </Button>
            <AddRecipeModal />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>⭐</TableHead>
              <TableHead>Pays</TableHead>
              <TableHead>Plat</TableHead>
              <TableHead>Glucides</TableHead>
              <TableHead>Recette</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDishes.map((dish, index) => (
              <TableRow
                key={index}
                className={favorites.includes(dish.dish) ? "bg-yellow-50" : ""}
              >
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
                <TableCell className="flex gap-2 flex-wrap">
                  {dish.carbs.map((carb, i) => (
                    <Badge key={i}>{carb}</Badge>
                  ))}
                </TableCell>
                <TableCell>
                  <Link
                    href={ROUTES.dish(dish.slug)}
                    className="text-blue-600 hover:underline"
                  >
                    Voir la recette
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
