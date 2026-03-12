import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="footer" id="contato">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo logo-light" aria-label="La Roche Home">
              <img src="/assets/logo.png" alt="La Roche Empreendimentos" className="brand-logo footer-logo" />
            </Link>
            <p className="footer-desc">Construindo legados de excelência e sofisticação no mercado imobiliário de alto padrão.</p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Navegação</h4>
            <ul>
              <li><Link href="/#home">Home</Link></li>
              <li><Link href="/#empreendimentos">Empreendimentos</Link></li>
              <li><Link href="/#institucional">Institucional</Link></li>
              <li><Link href="/#vendas">Portal do Cliente</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-heading">Contato</h4>
            <ul className="contact-list">
              <li>
                <i className="ph-fill ph-phone"></i>
                <div>
                  <span>Paulo Cordeiro</span><br />
                  <a href="tel:+5512996331400" style={{ color: "white", fontWeight: 500 }}>(12) 99633-1400</a>
                </div>
              </li>
              <li>
                <i className="ph-fill ph-phone"></i>
                <div>
                  <span>Paulo Cordeiro Filho</span><br />
                  <a href="tel:+5512996191400" style={{ color: "white", fontWeight: 500 }}>(12) 99619-1400</a>
                </div>
              </li>
              <li><i className="ph-fill ph-envelope-simple"></i> contato@laroche.com.br</li>
            </ul>
            <div className="social-links">
              <a href="https://www.instagram.com/laroche.empreendimentos/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="ph-fill ph-instagram-logo"></i>
              </a>
              <a href="#" aria-label="LinkedIn"><i className="ph-fill ph-linkedin-logo"></i></a>
              <a href="#" aria-label="Facebook"><i className="ph-fill ph-facebook-logo"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom container">
          <p>&copy; 2026 La Roche Empreendimentos. Todos os direitos reservados.</p>
          <p>Desenvolvido com <i className="ph-fill ph-heart"></i></p>
        </div>
      </footer>

      <a href="https://wa.me/5512996191400?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20empreendimentos%20da%20La%20Roche." className="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contato via WhatsApp">
        <i className="ph-fill ph-whatsapp-logo"></i>
      </a>
    </>
  );
}
