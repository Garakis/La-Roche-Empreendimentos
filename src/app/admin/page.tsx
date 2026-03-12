import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import AdminDashboardClient from "./AdminDashboardClient";
import { getProjects } from "@/lib/data";

export default async function AdminDashboard() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gray-50 font-['Montserrat']">
      {/* Topbar */}
      <header className="bg-[#00315E] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <img src="/assets/logo.png" alt="La Roche" className="h-10 w-auto" />
              </Link>
              <div className="h-6 w-px bg-white/20 hidden sm:block"></div>
              <h1 className="text-lg font-semibold font-['Playfair_Display'] tracking-wide hidden sm:block">
                Painel de Controle
              </h1>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="/" target="_blank" className="text-sm text-gray-300 hover:text-white flex items-center gap-1 transition-colors">
                <i className="ph ph-arrow-square-out text-lg"></i>
                Ver Site
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 font-['Playfair_Display']">
            Gerenciamento de Empreendimentos
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Arraste os cards para reordenar a vitrine da página inicial ou modifique os textos diretamente.
          </p>
        </div>

        {/* Client Component for Interactive Drag & Drop and API Saving */}
        <AdminDashboardClient initialProjects={projects} />
      </main>
    </div>
  );
}
