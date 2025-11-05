// src/components/Header.jsx
// Importa o hook useState do React para gerenciar o estado do menu mobile.
import { useState } from 'react';

// Define o componente do cabeçalho.
const Header = () => {
  // Estado para controlar se o menu mobile está aberto ou fechado.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para rolar suavemente até uma seção específica da página.
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false); // Fecha o menu mobile após clicar em um link.
  };

  // Função para rolar suavemente de volta ao topo da página.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false); // Também fecha o menu mobile, se estiver aberto.
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/nome da barbearia que, ao ser clicado, leva ao topo da página. */}
        <button
          onClick={scrollToTop}
          className="text-2xl font-bold text-gold hover:text-gold-light transition cursor-pointer"
          aria-label="Voltar ao topo"
        >
          Barbearia Estilo
        </button>

        {/* Navegação para telas de desktop, visível em telas médias (md) ou maiores. */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => scrollToSection('servicos')}
                className="hover:text-gold transition"
              >
                Serviços
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('localizacao')}
                className="hover:text-gold transition"
              >
                Localização
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('agendamento')}
                className="hover:text-gold transition"
              >
                Agendar
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('galeria')}
                className="hover:text-gold transition"
              >
                Galeria
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contato')}
                className="hover:text-gold transition"
              >
                Contato
              </button>
            </li>
          </ul>
        </nav>

        {/* Botão "hambúrguer" para abrir/fechar o menu em dispositivos móveis. */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Alternar menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu suspenso para dispositivos móveis, renderizado condicionalmente. */}
      {isMenuOpen && ( 
        <div className="md:hidden bg-gray-900">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection('servicos')}
              className="text-left hover:text-gold transition"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('localizacao')}
              className="text-left hover:text-gold transition"
            >
              Localização
            </button>
            <button
              onClick={() => scrollToSection('agendamento')}
              className="text-left hover:text-gold transition"
            >
              Agendar
            </button>
            <button
              onClick={() => scrollToSection('galeria')}
              className="text-left hover:text-gold transition"
            >
              Galeria
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-left hover:text-gold transition"
            >
              Contato
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// Exporta o componente Header.
export default Header;