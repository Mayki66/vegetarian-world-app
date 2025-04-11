# Vegetarian World App 🌱🌍

> **Tableau interactif pour découvrir des recettes végétariennes du monde entier.**

---

## 🚀 Aperçu

Un tableau filtrable et dynamique pour explorer des plats végétariens classés par **pays**, **continent** et **type de glucides** principaux. 

🌓 **Dark mode** intégré — avec possibilité de marquer vos plats préférés ⭐

🔍 Recherchez par ingrédients ou par nom

📦 Exportez le tableau en CSV — ou imprimez-le

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
- ➕ (à venir) Ajout manuel de recettes

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
├── components/ui/       # Composants UI (Table, Button...)
├── public/              # Fichiers statiques (favicon...)
├── lib/                 # Fichiers utilitaires (ex : validation de lien)
├── tailwind.config.js   # Configuration de Tailwind CSS
└── ...
```

---

## 📌 Roadmap (à venir)

- [ ] Ajout manuel de recette via un formulaire
- [ ] Validation automatique des liens
- [ ] Ajout d’un mode édition/suppression
- [ ] Visuels ou drapeaux des pays
- [ ] Ajout d’API nutritionnelles ou de labels

---

## 👤 Auteur

Développé par [Mayki66](https://github.com/Mayki66) — projet personnel passion 🌍🥗

---

## 🧾 Licence

Projet open source sous licence [MIT](LICENSE) — libre à vous d’améliorer le projet !
