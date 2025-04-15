import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Vegetarian World App",
  description: "Explorer des plats végétariens du monde entier",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
