import { supabase } from '@/lib/supabase';

export interface Project {
  id: string;
  title: string;
  location: string;
  status: string;
  statusClass: string;
  desc: string;
  heroImage: string;
  innerImage: string;
  gallery: string[];
  order: number;
}

export const mockProjects: Project[] = [
  {
    order: 1,
    id: "casa-pinda-01",
    title: "Casa no condominio Vila Romana em Pindamonhangaba",
    location: "Pindamonhangaba, SP",
    status: "Pronto",
    statusClass: "ready",
    desc: "Conheça a Casa no condominio Vila Romana em Pindamonhangaba, um projeto excepcional localizado em Pindamonhangaba, destacando-se pela fachada imponente, conforto e exclusividade.",
    heroImage: "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.09.50.jpeg",
    innerImage: "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.30%20(2).jpeg",
    gallery: [
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.28%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.28%20(2).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.28.jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.29%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.29%20(2).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.29%20(3).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.29%20(4).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.29.jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.30%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.30%20(2).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.30%20(3).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.08.30.jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.09.50%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.09.50%20(2).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2001/WhatsApp%20Image%202026-03-12%20at%2007.09.50.jpeg"
    ]
  },
  {
    order: 2,
    id: "casa-pinda-02",
    title: "Casa no condominio Vila Romana em Pindamonhangaba",
    location: "Pindamonhangaba, SP",
    status: "Pronto",
    statusClass: "ready",
    desc: "Conheça a Casa no condominio Vila Romana em Pindamonhangaba, um empreendimento de alto padrão construído para oferecer a melhor experiência de vida e bem-estar para sua família.",
    heroImage: "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.48.jpeg",
    innerImage: "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.48.jpeg",
    gallery: [
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.48%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.48%20(2).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.48.jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.49%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.49%20(2).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.49%20(3).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.49%20(4).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.49.jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.50%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.50%20(2).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.50%20(3).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.50.jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.51%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.10.51.jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.57%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.57.jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.58%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.58%20(2).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.58%20(3).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.58%20(4).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.58.jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.59%20(1).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.59%20(2).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.59%20(3).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.59%20(4).jpeg",
      "/assets/empreendimentos/Casa%20Pinda%2002/WhatsApp%20Image%202026-03-12%20at%2007.12.59.jpeg"
    ]
  },
  {
    order: 3,
    id: "galpao-comercial-sjc",
    title: "Galpão Comercial - São José dos Campos",
    location: "São José dos Campos, SP",
    status: "Pronto",
    statusClass: "ready",
    desc: "O Galpão Comercial - São José dos Campos é a estrutura ideal para impulsionar seus negócios, com excelente localização, acessibilidade e flexibilidade de espaço.",
    heroImage: "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.08%20(1).jpeg",
    innerImage: "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.07%20(2).jpeg",
    gallery: [
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.06%20(1).jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.06%20(2).jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.06%20(3).jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.06.jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.07%20(1).jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.07%20(2).jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.07%20(3).jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.07%20(4).jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.07.jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.08%20(1).jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.08%20(2).jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.08%20(3).jpeg",
      "/assets/empreendimentos/Galp%C3%A3o%20Comercial%20SJC/WhatsApp%20Image%202026-03-12%20at%2007.14.08.jpeg"
    ]
  },
  {
    order: 4,
    id: "predio-pinda",
    title: "Predio - Condominio Villa D Europa - Pindamonhangaba",
    location: "Pindamonhangaba, SP",
    status: "Em Obras",
    statusClass: "construction",
    desc: "O Predio - Condominio Villa D Europa - Pindamonhangaba encontra-se em estágio de obras, trazendo o conceito moderno de engenharia e a tradição La Roche em cada detalhe de seu desenvolvimento.",
    heroImage: "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.10%20(3).jpeg",
    innerImage: "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.10%20(1).jpeg",
    gallery: [
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.10%20(1).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.10%20(2).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.10%20(3).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.10.jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.11%20(1).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.11%20(2).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.11.jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.12%20(1).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.12.jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.13%20(1).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.13%20(2).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.13.jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.14%20(1).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.14.jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.15%20(1).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.15%20(2).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.15%20(3).jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.15.jpeg",
      "/assets/empreendimentos/Predio%20Pinda/WhatsApp%20Image%202026-03-12%20at%2007.16.16.jpeg"
    ]
  },
  {
    order: 5,
    id: "villagio-gadioli-quiririm",
    title: "Villagio Gadioli Quiririm",
    location: "Quiririm, Taubaté, SP",
    status: "Lançamento",
    statusClass: "release",
    desc: "Conheça o Villagio Gadioli Quiririm, um lançamento exclusivo pensado em cada detalhe para as famílias que buscam viver cercado de qualidade e luxo.",
    heroImage: "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.08%20(1).jpeg",
    innerImage: "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.26%20(2).jpeg",
    gallery: [
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.26%20(1).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.26%20(2).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.26.jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.27%20(1).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.27%20(2).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.27%20(3).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.27.jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.28%20(1).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.28%20(2).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%207/WhatsApp%20Image%202026-03-12%20at%2007.21.28.jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%208/WhatsApp%20Image%202026-03-12%20at%2007.21.48%20(1).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%208/WhatsApp%20Image%202026-03-12%20at%2007.21.48%20(2).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%208/WhatsApp%20Image%202026-03-12%20at%2007.21.48.jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%208/WhatsApp%20Image%202026-03-12%20at%2007.21.49%20(1).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%208/WhatsApp%20Image%202026-03-12%20at%2007.21.49%20(2).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%208/WhatsApp%20Image%202026-03-12%20at%2007.21.49%20(3).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casa%208/WhatsApp%20Image%202026-03-12%20at%2007.21.49.jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.07.jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.08%20(1).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.08%20(2).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.08%20(3).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.08%20(4).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.08.jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.09%20(1).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.09%20(2).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.09%20(3).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.09%20(4).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.09.jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.10%20(1).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.10%20(2).jpeg",
      "/assets/empreendimentos/Villagio%20Gadioli%20Quiririm/Casas%201%20a%206/WhatsApp%20Image%202026-03-12%20at%2007.21.10.jpeg"
    ]
  }
];

export async function getProjects(): Promise<Project[]> {
  /* if (supabase['supabaseUrl'] && !supabase['supabaseUrl'].includes('placeholder')) {
    const { data, error } = await supabase.from('projects').select('*').order('order', { ascending: true });
    if (!error && data && data.length > 0) return data;
  } */
  return mockProjects.sort((a, b) => a.order - b.order);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  /* if (supabase['supabaseUrl'] && !supabase['supabaseUrl'].includes('placeholder')) {
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
    if (!error && data) return data;
  } */
  return mockProjects.find(p => p.id === id);
}
