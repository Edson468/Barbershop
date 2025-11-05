// src/components/Footer.jsx
// Importa o ícone do Instagram da biblioteca react-icons.
import { FaInstagram } from 'react-icons/fa';

// Define o componente do rodapé da página.
const Footer = () => {
  return (
    <footer className="bg-black text-gray-500 py-8 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {/* Link para o perfil do Instagram, que abre em uma nova aba. */}
          <a
            href="https://instagram.com/seuperfil"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition"
            aria-label="Instagram"
          >
            <FaInstagram className="text-2xl" />
          </a>
        </div>
        {/* Informações de direitos autorais e endereço da barbearia. */}
        <p className="mb-2">© 2025 Barbearia Estilo. Todos os direitos reservados.</p>
        <p className="text-gray-600">Rua das Palmeiras, 123 – Fortaleza/CE</p>
      </div>
    </footer>
  );
};

// Exporta o componente Footer para ser utilizado em outras partes da aplicação.
export default Footer;