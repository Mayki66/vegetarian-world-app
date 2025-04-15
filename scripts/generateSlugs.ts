// scripts/generateSlugs.ts
import fs from "fs";
import path from "path";
import { generateSlug } from "../lib/generateSlug";

const filePath = path.join(__dirname, "../data/dishes.ts");

let content = fs.readFileSync(filePath, "utf-8");
const regex = /{\s*country:.*?}/gs;

const updated = content.replace(regex, (match) => {
  if (match.includes("slug:")) return match; // Skip if slug already exists
  const nameMatch = match.match(/dish:\s*\"(.*?)\"/);
  if (!nameMatch) return match;
  const slug = generateSlug(nameMatch[1]);
  const insertionPoint = match.lastIndexOf("}");
  return (
    match.slice(0, insertionPoint) + `, slug: \"${slug}\"` + match.slice(insertionPoint)
  );
});

fs.writeFileSync(filePath, updated, "utf-8");
console.log("✅ Slugs ajoutés automatiquement dans dishes.ts");
