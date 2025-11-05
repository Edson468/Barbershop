// src/components/Localizacao.jsx
// Importa o ícone de marcador de mapa da biblioteca react-icons.
import { FaMapMarkerAlt } from 'react-icons/fa';

// Define o componente de Localização.
const Localizacao = () => {
  return (
    <section id="localizacao" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-gold">Onde estamos?</h2>
        
        {/* Layout flexível que se ajusta de coluna para linha em telas maiores. */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Bloco de informações de endereço. */}
          <div className="md:w-1/2 w-full bg-black p-8 rounded-xl border border-gray-800 flex flex-col">
            <div className="mb-6">
              <FaMapMarkerAlt className="text-gold text-3xl mx-auto md:mx-0 mb-4" />
              <h3 className="text-xl font-bold text-gold mb-2">Barbearia Estilo</h3>
              <p className="text-lg text-white">Av. Beira Mar, 3500 – Meireles</p>
              <p className="text-gray-400 text-lg">Fortaleza – CE</p>
              <p className="text-gray-500 mt-4">Estacionamento gratuito · Ambiente climatizado</p>
            </div>
            {/* Botão que leva o usuário ao Google Maps com o endereço pré-definido. */}
            <div className="mt-auto pt-4">
              <a
                href="https://maps.google.com/?q=Av.+Beira+Mar,+3500,+Fortaleza,+CE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold hover:bg-gold-dark text-black font-semibold py-3 px-6 rounded-lg transition"
              >
                Ver no Google Maps
              </a>
            </div>
          </div>

          {/* Contêiner para o mapa incorporado do Google Maps. */}
          <div className="md:w-1/2 w-full rounded-xl overflow-hidden shadow-2xl border border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.348749020221!2d-38.49458442519519!3d-3.730826242745513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c887e3a8a4a4a5%3A0x5f5b5b5b5b5b5b5b!2sAv.%20Beira%20Mar%2C%203500%20-%20Meireles%2C%20Fortaleza%20-%20CE%2C%2060145-130!5e0!3m2!1spt-BR!2sbr!4v1730999999999!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Barbearia Estilo"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

// Exporta o componente Localizacao.
export default Localizacao;