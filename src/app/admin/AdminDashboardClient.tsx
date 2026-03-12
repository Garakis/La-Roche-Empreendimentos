"use client";

import { useState } from "react";
import { Project } from "@/lib/data";

export default function AdminDashboardClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  const moveProject = (index: number, direction: 'up' | 'down') => {
    const newItems = [...projects];
    if (direction === 'up' && index > 0) {
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    }
    
    // Update numerical order property to match new array index
    newItems.forEach((p, i) => { p.order = i + 1; });
    setProjects(newItems);
    setFeedback(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projects)
      });
      
      if (res.ok) {
        setFeedback({ type: 'success', msg: 'Alterações salvas com sucesso no banco de dados!' });
        setTimeout(() => setFeedback(null), 5000);
      } else {
        throw new Error("API Error");
      }
    } catch (e) {
      setFeedback({ type: 'error', msg: 'Erro ao salvar. Verifique sua conexão com o Supabase.' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
      
      {/* Sticky Action Bar */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b sticky top-0 bg-white z-10 pt-2">
        <h3 className="font-semibold text-lg text-gray-800">Vitrine Principal</h3>
        
        <div className="flex items-center gap-4">
           {feedback && (
            <span className={`text-sm font-medium px-3 py-1 rounded ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {feedback.msg}
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#00315E] text-white rounded-md font-semibold hover:bg-[#005090] disabled:opacity-50 transition-colors shadow-sm"
          >
            {loading ? (
              <i className="ph ph-spinner animate-spin text-xl"></i>
            ) : (
              <i className="ph ph-floppy-disk text-xl"></i>
            )}
            {loading ? "Salvando..." : "Salvar Alterações Globais"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={project.id} className="flex flex-col sm:flex-row items-center gap-6 bg-gray-50 hover:bg-gray-100 transition-colors p-5 rounded-lg border border-gray-200 shadow-sm relative group">
            
            {/* Reorder Controls */}
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => moveProject(index, 'up')} 
                disabled={index === 0} 
                className="p-1.5 bg-white border shadow-sm hover:bg-gray-50 rounded text-gray-600 disabled:opacity-30 transition-opacity"
                title="Mover para cima"
              >
                <i className="ph-bold ph-caret-up"></i>
              </button>
              <div className="text-center text-xs font-bold text-gray-400">
                #{index + 1}
              </div>
              <button 
                onClick={() => moveProject(index, 'down')} 
                disabled={index === projects.length - 1} 
                className="p-1.5 bg-white border shadow-sm hover:bg-gray-50 rounded text-gray-600 disabled:opacity-30 transition-opacity"
                title="Mover para baixo"
              >
                <i className="ph-bold ph-caret-down"></i>
              </button>
            </div>
            
            {/* Image Preview */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover rounded-md border shadow-sm" />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] font-bold uppercase rounded rounded-sm tracking-wider">
                Capa
              </div>
            </div>
            
            {/* Editor Fields */}
            <div className="flex-1 w-full space-y-3">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Título</label>
                  <input 
                    type="text" 
                    value={project.title} 
                    onChange={(e) => {
                      const newProjects = [...projects];
                      newProjects[index].title = e.target.value;
                      setProjects(newProjects);
                    }}
                    className="w-full text-lg font-bold border-b-2 border-transparent hover:border-gray-300 focus:border-[#00315E] bg-transparent pb-1 focus:outline-none transition-colors" 
                  />
                </div>
                
                <div className="w-40">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Status (Tag)</label>
                  <input 
                      type="text"
                      value={project.status}
                      onChange={(e) => {
                        const newProjects = [...projects];
                        newProjects[index].status = e.target.value;
                        setProjects(newProjects);
                      }}
                      className="w-full text-sm font-medium border bg-white px-3 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-[#00315E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Descrição Comercial</label>
                <textarea 
                  value={project.desc}
                  onChange={(e) => {
                    const newProjects = [...projects];
                    newProjects[index].desc = e.target.value;
                    setProjects(newProjects);
                  }}
                  className="w-full text-sm text-gray-700 border border-gray-300 bg-white p-2.5 rounded hover:border-gray-400 focus:outline-none focus:border-[#00315E] focus:ring-1 focus:ring-[#00315E] resize-y"
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
