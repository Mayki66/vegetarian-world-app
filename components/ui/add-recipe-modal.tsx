"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddRecipeModal({ onAdd }: { onAdd: (recipe: any) => void }) {
  const [form, setForm] = useState({
    country: "",
    dish: "",
    carbs: "",
    recipe: "",
    continent: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newRecipe = {
      country: form.country,
      dish: form.dish,
      carbs: form.carbs.split(",").map((c) => c.trim()),
      recipe: form.recipe,
      continent: form.continent,
    };
    onAdd(newRecipe);
    setForm({ country: "", dish: "", carbs: "", recipe: "", continent: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">➕ Ajouter une recette</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une recette</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Pays"
            name="country"
            value={form.country}
            onChange={handleChange}
          />
          <Input
            placeholder="Nom du plat"
            name="dish"
            value={form.dish}
            onChange={handleChange}
          />
          <Input
            placeholder="Glucides (séparés par des virgules)"
            name="carbs"
            value={form.carbs}
            onChange={handleChange}
          />
          <Input
            placeholder="Lien de la recette"
            name="recipe"
            value={form.recipe}
            onChange={handleChange}
          />
          <Input
            placeholder="Continent"
            name="continent"
            value={form.continent}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Ajouter</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
