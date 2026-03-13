import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Roche Empreendimentos | Imóveis de Alto Padrão e Exclusividade",
  description: "Descubra o padrão La Roche. Incorporadora especializada em empreendimentos de luxo, casas de alto padrão e projetos comerciais exclusivos no Vale do Paraíba.",
  icons: {
    icon: "/assets/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/@phosphor-icons/web" async></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
