"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Star, StarOff } from "lucide-react";

// 🌍 Base enrichie de plats végétariens
const vegetarianDishes = [
  // Afrique — Maroc
  { country: "Maroc", dish: "Tajine aux légumes", carbs: ["semoule"], recipe: "https://www.196flavors.com/fr/maroc-tajine-aux-legumes/", continent: "Afrique" },
  { country: "Maroc", dish: "Harira végétarienne", carbs: ["pois chiches", "lentilles"], recipe: "https://www.cuisineaz.com/recettes/harira-vegetarienne-107347.aspx", continent: "Afrique" },
  { country: "Maroc", dish: "Couscous de légumes", carbs: ["semoule"], recipe: "https://www.marmiton.org/recettes/recette_couscous-de-legumes_23113.aspx", continent: "Afrique" },
  { country: "Éthiopie", dish: "Injera aux légumes épicés", carbs: ["teff"], recipe: "https://veganpratique.fr/recettes/injera-et-mets-ethiopiens/", continent: "Afrique" },
  { country: "Sénégal", dish: "Thiebou dieune végétarien", carbs: ["riz"], recipe: "https://lameilleurecette.fr/recette/thieboudienne-vegetarien/", continent: "Afrique" },
  { country: "Côte d'Ivoire", dish: "Attiéké aux légumes", carbs: ["manioc"], recipe: "https://www.afrik-cuisine.com/attiéké-aux-légumes/", continent: "Afrique" },
  { country: "Tunisie", dish: "Ojja végétarienne", carbs: ["pain"], recipe: "https://www.750g.com/ojja-vegetarienne-r202066.htm", continent: "Afrique" },
  { country: "Afrique du Sud", dish: "Chakalaka", carbs: ["haricots"], recipe: "https://www.africanbites.com/chakalaka/", continent: "Afrique" },
  { country: "Ghana", dish: "Waakye végétarien", carbs: ["riz", "haricots"], recipe: "https://www.blackveganrecipes.com/waakye-vegan", continent: "Afrique" },
  { country: "Algérie", dish: "Chorba végétarienne", carbs: ["vermicelles"], recipe: "https://cuisine.notrefamille.com/recettes-cuisine/chorba-vegetarienne-o217999-r234.html", continent: "Afrique" },

  // Asie — Inde + autres
  { country: "Inde", dish: "Chana Masala", carbs: ["riz", "pois chiches"], recipe: "https://www.chefdehome.com/Recipes/343/chana-masala", continent: "Asie" },
  { country: "Inde", dish: "Aloo Gobi", carbs: ["pommes de terre"], recipe: "https://www.750g.com/aloo-gobi-r201132.htm", continent: "Asie" },
  { country: "Inde", dish: "Dhal lentilles corail", carbs: ["lentilles"], recipe: "https://www.cuisineactuelle.fr/recettes/dhal-de-lentilles-corail-187176", continent: "Asie" },
  { country: "Thaïlande", dish: "Pad Thaï végétarien", carbs: ["nouilles de riz"], recipe: "https://www.cuisineaz.com/recettes/pad-thai-vegetarien-109071.aspx", continent: "Asie" },
  { country: "Japon", dish: "Donburi tofu et légumes", carbs: ["riz"], recipe: "https://www.hervecuisine.com/recette/donburi-au-tofu/", continent: "Asie" },
  { country: "Chine", dish: "Raviolis végétariens", carbs: ["farine de blé"], recipe: "https://www.jesuisuncuisinier.fr/fr/raviolis-chinois-vegetariens/", continent: "Asie" },
  { country: "Vietnam", dish: "Banh xeo végé (crêpe riz)", carbs: ["riz"], recipe: "https://www.cuisine-et-mets.com/recette/banh-xeo-vegetarien/", continent: "Asie" },
  { country: "Corée", dish: "Bibimbap végétarien", carbs: ["riz"], recipe: "https://lacuisinedejeanphilippe.com/recette/bibimbap-vegetarien/", continent: "Asie" },
  { country: "Sri Lanka", dish: "Curry de légumes", carbs: ["riz"], recipe: "https://www.marmiton.org/recettes/recette_curry-vegetarien-sri-lankais_230114.aspx", continent: "Asie" },

  // Europe — France, Italie...
  { country: "France", dish: "Gratin dauphinois", carbs: ["pommes de terre"], recipe: "https://www.cuisineactuelle.fr/recettes/gratin-dauphinois-traditionnel-187579", continent: "Europe" },
  { country: "France", dish: "Quiche sans lardons", carbs: ["pâte brisée"], recipe: "https://www.750g.com/quiche-vegetarienne-r96984.htm", continent: "Europe" },
  { country: "France", dish: "Ratatouille provençale", carbs: ["pain"], recipe: "https://www.marmiton.org/recettes/recette_ratatouille-facile_29373.aspx", continent: "Europe" },
  { country: "Italie", dish: "Lasagnes aux légumes", carbs: ["pâtes"], recipe: "https://www.marmiton.org/recettes/recette_lasagnes-aux-legumes-faciles_23125.aspx", continent: "Europe" },
  { country: "Italie", dish: "Risotto aux champignons", carbs: ["riz"], recipe: "https://www.750g.com/risotto-aux-champignons-r97183.htm", continent: "Europe" },
  { country: "Grèce", dish: "Moussaka végétarienne", carbs: ["pommes de terre"], recipe: "https://larecette.net/recette/moussaka-vegetarienne/", continent: "Europe" },
  { country: "Espagne", dish: "Tortilla de patatas", carbs: ["pommes de terre"], recipe: "https://www.hervecuisine.com/recette/tortilla-espagnole/", continent: "Europe" },
  { country: "Allemagne", dish: "Spätzle au fromage", carbs: ["pâtes"], recipe: "https://www.recettes-vegetariennes.fr/spatzle-au-fromage/", continent: "Europe" },

  // Amérique — Mexique, USA...
  { country: "Mexique", dish: "Tacos aux haricots noirs", carbs: ["maïs"], recipe: "https://www.papillesetpupilles.fr/2022/05/tacos-vegetariens-aux-haricots-noirs.html/", continent: "Amérique" },
  { country: "Mexique", dish: "Chili sin carne", carbs: ["haricots rouges"], recipe: "https://www.750g.com/chili-sin-carne-r96883.htm", continent: "Amérique" },
  { country: "États-Unis", dish: "Mac and cheese végétarien", carbs: ["pâtes"], recipe: "https://www.750g.com/mac-and-cheese-r200439.htm", continent: "Amérique" },
  { country: "Pérou", dish: "Quinoa aux légumes andins", carbs: ["quinoa"], recipe: "https://www.750g.com/quinoa-aux-legumes-r97169.htm", continent: "Amérique" },
  { country: "Brésil", dish: "Feijoada végé", carbs: ["haricots noirs", "riz"], recipe: "https://www.papillesetpupilles.fr/2020/04/feijoada-vegetarienne.html/", continent: "Amérique" },

  // Moyen-Orient
  { country: "Liban", dish: "Moudardara (lentilles et riz)", carbs: ["riz", "lentilles"], recipe: "https://www.cuisine-liban.fr/moudardara/", continent: "Moyen-Orient" },
  { country: "Liban", dish: "Taboulé libanais", carbs: ["boulgour"], recipe: "https://www.750g.com/taboule-libanais-r96345.htm", continent: "Moyen-Orient" },
  { country: "Israël", dish: "Shakshuka", carbs: ["pain pita"], recipe: "https://www.marmiton.org/recettes/recette_shakshuka_347107.aspx", continent: "Moyen-Orient" },
  { country: "Iran", dish: "Kuku sabzi", carbs: ["pain lavash"], recipe: "https://www.papillesetpupilles.fr/2022/03/kuku-sabzi-omelette-persane-aux-herbes.html/", continent: "Moyen-Orient" },
  { country: "Turquie", dish: "Lentil kofte", carbs: ["boulgour", "lentilles"], recipe: "https://www.chefkoch.de/rezepte/3363481496743944/Lentil-Koefte.html", continent: "Moyen-Orient" },

  // Océanie
  { country: "Australie", dish: "Pie aux lentilles", carbs: ["pâte brisée"], recipe: "https://www.veganfreestyle.com/aussie-lentil-pie/", continent: "Océanie" },
  { country: "Nouvelle-Zélande", dish: "Pavlova aux fruits (végane)", carbs: ["sucre"], recipe: "https://simpleveganblog.com/fr/pavlova-vegan/", continent: "Océanie" },
  { country: "Fidji", dish: "Curry de légumes fidjien", carbs: ["riz"], recipe: "https://www.wholefoodsmarket.com/recipes/fijian-vegetable-curry", continent: "Océanie" }
];

export default function VegetarianWorldTable() {
  const [selectedContinent, setSelectedContinent] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarb, setSelectedCarb] = useState("Tous");
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    }
    return [];
  });

  const continents = ["Tous", ...new Set(vegetarianDishes.map(d => d.continent))];
  const allCarbs = Array.from(new Set(vegetarianDishes.flatMap(d => d.carbs)));
  const carbs = ["Tous", ...allCarbs];

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (dishName: string) => {
    setFavorites((prev: string[]) =>
      prev.includes(dishName)
        ? prev.filter(name => name !== dishName)
        : [...prev, dishName]
    );
  };

  const filteredDishes = vegetarianDishes.filter(dish => {
    const matchesContinent = selectedContinent === "Tous" || dish.continent === selectedContinent;
    const matchesCarb = selectedCarb === "Tous" || dish.carbs.includes(selectedCarb);
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      dish.dish.toLowerCase().includes(searchLower) ||
      dish.carbs.some(carb => carb.toLowerCase().includes(searchLower));
    return matchesContinent && matchesCarb && matchesSearch;
  });

  const handleExportExcel = () => {
    const csvContent = [
      ["Pays", "Plat", "Glucides", "Lien de recette"],
      ...filteredDishes.map(d => [d.country, d.dish, d.carbs.join(" / "), d.recipe])
    ].map(e => e.map(v => `"${v}"`).join(",")).join("\n");

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
            <label className="font-medium">Continent :</label>
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

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="font-medium">Glucide :</label>
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
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full md:w-[250px]"
          />

          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline">
              🖨️ Imprimer / PDF
            </Button>
            <Button onClick={handleExportExcel} variant="outline">
              💾 Export Excel
            </Button>
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
              <TableRow key={index} className={favorites.includes(dish.dish) ? "bg-yellow-50" : ""}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(dish.dish)}
                  >
                    {favorites.includes(dish.dish) ? <Star className="text-yellow-500" /> : <StarOff />}
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
