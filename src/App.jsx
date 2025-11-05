// src/App.jsx
// Importa os componentes que serão utilizados na página.
import Header from './components/Header';
import Localizacao from './components/Localizacao';
import Servicos from './components/Servicos';
import Agendamento from './components/Agendamento';
import Galeria from './components/Galeria';
import Contato from './components/Contato';
import Footer from './components/Footer';

// Define o componente principal da aplicação.
function App() {
  return (
    <div className="font-sans bg-gray-900 text-gray-200">
      {/* Renderiza o cabeçalho fixo da página. */}
      <Header />

      {/* Adiciona um espaçamento no topo para compensar a altura do cabeçalho fixo. */}
      <div className="pt-19">
        {/* Seção "Hero", a primeira dobra da página com imagem de fundo e chamada para ação. */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <img
            src="/assets/hero.jpg"
            alt="Barbearia Estilo – Ambiente Premium em Fortaleza"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600";
            }}
          />
          {/* Camada escura sobre a imagem para melhorar a legibilidade do texto. */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          {/* Conteúdo de texto e botão da seção "Hero". */}
          <div className="relative z-10 text-center px-4 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gold">
              Corte impecável, estilo garantido
            </h2>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Sua barbearia premium em Fortaleza – CE com os melhores profissionais da cidade.
            </p>
            {/* Botão que rola a página suavemente até a seção de agendamento. */}
            <button
              onClick={() => {
                document.getElementById('agendamento')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="inline-block bg-gold hover:bg-gold-dark text-black font-bold py-3 px-8 rounded-full text-lg transition shadow-lg cursor-pointer"
            >
              Agendar agora
            </button>
          </div>
        </section>

        {/* Renderiza as demais seções da landing page. */}
        <Localizacao />
        <Servicos />
        <Agendamento />
        <Galeria />
        <Contato />
        <Footer />
      </div>
    </div>
  );
}

// Exporta o componente App para ser usado em outras partes da aplicação.
export default App;