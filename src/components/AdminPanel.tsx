"use client";

import { useState, useEffect } from "react";
import { Project, mockProjects } from "@/lib/data";

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real scenario, this would fetch from Supabase (or an App Route API)
    // For now we load the mock data from the array
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setProjects(data);
        else setProjects(mockProjects); // Fallback if API is not set up yet
        setLoading(false);
      })
      .catch(() => {
        setProjects(mockProjects);
        setLoading(false);
      });
  }, []);

  const moveProject = (index: number, direction: 'up' | 'down') => {
    const newItems = [...projects];
    if (direction === 'up' && index > 0) {
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    }
    
    // Update order property
    newItems.forEach((p, i) => { p.order = i + 1; });
    setProjects(newItems);
  };

  const handleSave = async () => {
    // Call Supabase or API to save the new exact order and details
    setLoading(true);
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projects)
      });
      alert('Alterações salvas com sucesso! Atualize a página e mude o código para a Real DB.');
      onClose();
    } catch (e) {
      alert('Erro ao salvar. Verifique se o banco de dados está configurado.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold font-['Playfair_Display'] text-[#00315E]">
            Painel de Administração
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <i className="ph-bold ph-x text-2xl"></i>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10">Carregando dados...</div>
        ) : (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-[#005090]">Gerenciar Empreendimentos (Home)</h3>
            <p className="text-sm text-gray-600 mb-4">
              Arraste ou use as setas para alterar a ordem dos cards na página inicial.
            </p>

            <div className="space-y-3">
              {projects.map((project, index) => (
                <div key={project.id} className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-4 rounded border">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveProject(index, 'up')} disabled={index === 0} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30">
                      <i className="ph-bold ph-caret-up"></i>
                    </button>
                    <button onClick={() => moveProject(index, 'down')} disabled={index === projects.length - 1} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30">
                      <i className="ph-bold ph-caret-down"></i>
                    </button>
                  </div>
                  
                  <img src={project.heroImage} alt={project.title} className="w-24 h-24 object-cover rounded" />
                  
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={project.title} 
                      onChange={(e) => {
                        const newProjects = [...projects];
                        newProjects[index].title = e.target.value;
                        setProjects(newProjects);
                      }}
                      className="w-full text-lg font-bold border-b mb-1 px-1 focus:outline-none focus:border-[#00315E] bg-transparent" 
                    />
                    <input 
                       type="text"
                       value={project.status}
                       onChange={(e) => {
                         const newProjects = [...projects];
                         newProjects[index].status = e.target.value;
                         setProjects(newProjects);
                       }}
                       className="text-sm border-b px-1 w-[150px] mb-2 focus:outline-none"
                    />
                    <textarea 
                      value={project.desc}
                      onChange={(e) => {
                        const newProjects = [...projects];
                        newProjects[index].desc = e.target.value;
                        setProjects(newProjects);
                      }}
                      className="w-full text-sm border p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#00315E]"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-6 border-t pt-6">
              <button 
                onClick={onClose}
                className="px-6 py-2 border rounded font-semibold text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2 bg-[#00315E] text-white rounded font-semibold hover:bg-[#005090] disabled:opacity-50"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
