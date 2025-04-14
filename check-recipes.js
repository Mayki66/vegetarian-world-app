const https = require("https");
const http = require("http");

const dishes = require("./data/dishes.json"); // On mettra les plats ici

function checkUrl(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.request(url, { method: "HEAD" }, (res) => {
      resolve({ url, status: res.statusCode });
    });

    req.on("error", () => resolve({ url, status: "ERR" }));
    req.end();
  });
}

async function run() {
  console.log("🔍 Vérification des liens de recettes...");
  const results = [];

  for (const dish of dishes) {
    const { country, dish: name, recipe } = dish;
    const result = await checkUrl(recipe);
    const status = result.status === 200 ? "✅ OK" : `❌ ${result.status}`;
    results.push({ country, name, recipe, status });
    console.log(`[${status}] ${country} - ${name}`);
  }

  console.log("\n🎉 Terminé !");
}

run();
