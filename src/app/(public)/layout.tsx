import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VanillaScripts from "@/components/VanillaScripts";
import { getProjects } from "@/lib/data";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projects = await getProjects();
  return (
    <div className="public-site">
      {/* Public-only stylesheet scoped to this layout */}
      <link rel="stylesheet" href="/css/style.css" />
      <Navbar projects={projects} />
      {children}
      <Footer />
      <VanillaScripts />
    </div>
  );
}
