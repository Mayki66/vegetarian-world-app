# Vegetarian World App 🌱🌍

> **Tableau interactif pour découvrir des recettes végétariennes du monde entier.**

---

## 🚀 Aperçu

Un tableau filtrable et dynamique pour explorer des plats végétariens classés par **pays**, **continent** et **type de glucides** principaux. 

🌓 **Dark mode** intégré — avec possibilité de marquer vos plats préférés ⭐

🔍 Recherchez par ingrédients ou par nom

📦 Exportez le tableau en CSV — ou imprimez-le

➕ Ajoutez vous-même vos recettes 🌱

---

## 📸 Démo en ligne

🌐 [Voir la version déployée sur Vercel](https://vegetarian-world-app-4u1o.vercel.app/)

---

## ✨ Fonctionnalités

- 🌍 Filtrage par continent (Europe, Asie, Afrique...)
- 🍚 Filtrage par type de glucides (pâtes, riz, semoule...)
- 🔎 Barre de recherche
- ⭐ Système de favoris (stocké dans le navigateur)
- 📥 Export du tableau en CSV
- 🖨️ Impression PDF
- 🌒 Dark mode toggle
- ➕ Ajout manuel de recettes depuis une modale (formulaire)

---

## 🛠️ Installation locale

### 1. Cloner le projet
```bash
git clone https://github.com/TonPseudo/vegetarian-world-app.git
cd vegetarian-world-app
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer l’environnement de développement
```bash
npm run dev
```

L’application est alors disponible sur :
```
http://localhost:3000
```

---

## 📁 Arborescence principale

```
vegetarian-world-app/
├── app/
│   └── tableau/         # Composant principal (tableau)
├── components/ui/       # Composants UI (Table, Button, Modal...)
├── lib/                 # Fichiers utilitaires (données, validation de lien)
├── public/              # Fichiers statiques (favicon...)
├── tailwind.config.js   # Configuration de Tailwind CSS
└── ...
```

---

## 🧭 Roadmap (à venir)

- [x] Ajouter le bouton "Ajouter une recette manuellement"
- [x] Permettre d’ajouter une recette depuis un formulaire
- [ ] Intégrer la vérification de lien automatiquement
- [x] Organiser tes données dans un fichier dishes.json
- [ ] Faire un système de sauvegarde/export de recettes (CSV ou localStorage)
- [ ] Ajouter un vrai dark mode toggle (amélioré)
- [ ] Ajouter des visuels / drapeaux pour chaque pays
- [ ] Ajouter une page pour les ingrédients que nous avons déjà
- [ ] Ajouter un tableau qui fera des recettes en fonctions des ingrédients que nous avons déjà

### 📱 Optimisation mobile (à venir)

- [ ] Ajouter un scroll horizontal fluide pour le tableau (`overflow-x-auto`)
- [ ] Adapter la taille des polices sur petits écrans (`text-sm`, `md:text-base`)
- [ ] Repenser l'ordre des filtres sur mobile (Continent > Glucide > Recherche > Boutons)
- [ ] Optimiser les marges et espacements pour une meilleure lisibilité
- [ ] Améliorer l’accessibilité du bouton "Ajouter une recette"
- [ ] Tester les formulaires pour clavier mobile (focus, padding...)
- [ ] Ajouter un dark mode toggle mobile-friendly
- [ ] Préparer une version PWA (Progressive Web App)

---

## 👤 Auteur

Développé par [Mayki66](https://github.com/Mayki66) — projet personnel passion 🌍🥗

---

## 🧾 Licence

Projet open source sous licence [MIT](LICENSE) — libre à vous d’améliorer le projet !
