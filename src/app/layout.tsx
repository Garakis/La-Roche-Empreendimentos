import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VanillaScripts from "@/components/VanillaScripts";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "La Roche Empreendimentos | Alto Padrão",
  description: "La Roche Empreendimentos - Incorporadora focada em projetos de alto padrão e luxo.",
  icons: {
    icon: "/assets/logo.png"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = await getProjects();
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/style.css" />
        <script src="https://unpkg.com/@phosphor-icons/web" async></script>
      </head>
      <body className="antialiased">
        <Navbar projects={projects} />
        {children}
        <Footer />
        <VanillaScripts />
      </body>
    </html>
  );
}
