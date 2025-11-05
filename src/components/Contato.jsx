// src/components/Contato.jsx
// Importa ícones do pacote react-icons.
import { FaWhatsapp, FaPhone, FaEnvelope } from 'react-icons/fa';

// Define o componente de Contato.
const Contato = () => {
  // Define o número de WhatsApp para o link.
  const whatsappNumber = '5511999999999';

  return (
    <section id="contato" className="py-16 bg-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gold">Fale conosco!</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
          Para um atendimento mais ágil, prefira o WhatsApp. Clique no botão abaixo para enviar sua mensagem!
        </p>
        {/* Link principal que abre uma conversa no WhatsApp. */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gold hover:bg-gold-dark text-black font-bold py-3 px-8 rounded-full text-lg transition shadow-lg"
        >
          <FaWhatsapp className="mr-3 text-2xl" />
          Enviar mensagem
        </a>
        {/* Informações de contato adicionais, como telefone e e-mail. */}
        <div className="mt-10 text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <FaPhone /> (11) 99999-9999
          </p>
          <p className="flex items-center justify-center gap-2 mt-2">
            <FaEnvelope /> contato@barbeariaestilo.com.br
          </p>
        </div>
      </div>
    </section>
  );
};

// Exporta o componente Contato.
export default Contato;