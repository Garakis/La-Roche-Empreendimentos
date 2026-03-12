"use client";

import Link from 'next/link';
import { Project } from '@/lib/data';

export default function Navbar({ projects = [] }: { projects?: Project[] }) {
  return (
    <header className="navbar" id="navbar">
      <div className="container navbar-container">
        <Link href="/" className="logo" aria-label="La Roche Home">
          <img src="/assets/logo.png" alt="La Roche Empreendimentos" className="brand-logo" />
        </Link>

        <button className="mobile-menu-btn" aria-label="Menu" aria-expanded="false" onClick={() => {
            document.querySelector('.nav-links')?.classList.toggle('active');
            const expanded = document.querySelector('.mobile-menu-btn')?.getAttribute('aria-expanded') === 'true' || false;
            document.querySelector('.mobile-menu-btn')?.setAttribute('aria-expanded', (!expanded).toString());
        }}>
          <i className="ph ph-list"></i>
        </button>

        <nav className="nav-links">
          <div className="nav-dropdown">
            <Link href="/#empreendimentos" className="nav-link dropdown-toggle">
              Empreendimentos <i className="ph-bold ph-caret-down"></i>
            </Link>
            <div className="dropdown-menu">
              {projects.map(p => (
                <Link key={p.id} href={`/empreendimento/${p.id}`} className="dropdown-item">
                  {p.title}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/#institucional" className="nav-link">Institucional</Link>
          <Link href="/#vendas" className="nav-link">Vendas</Link>
          <Link href="/#contato" className="nav-link btn-primary-outline">Contato</Link>
        </nav>
      </div>
    </header>
  );
}
