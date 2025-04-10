import "./globals.css";

export const metadata = {
  title: "Vegetarian World App",
  description: "Explorer des plats végétariens du monde entier",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="">
      <body className="bg-white text-black dark:bg-zinc-900 dark:text-white font-sans m-0">
        {children}
      </body>
    </html>
  );
}