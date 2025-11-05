// src/components/Galeria.jsx
// Importa hooks do React para gerenciar estado e efeitos colaterais.
import { useState, useEffect } from 'react';

// Define o componente da Galeria de imagens.
const Galeria = () => {
  // Estado para rastrear o índice da imagem atualmente exibida no carrossel.
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Array com as URLs das imagens que serão exibidas na galeria.
  const galleryImages = [
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600',
    'https://static1.purepeople.com.br/articles/5/34/50/15/@/3932061-as-tendencias-em-corte-de-cabelo-masculi-1200x630-2.jpg',
    'https://www.guiadasemana.com.br/contentFiles/image/opt_w1280h960/2017/02/FEA/49393_shutterstock-barbearia.jpg',
    'https://negociosdebeleza.beautyfair.com.br/wp-content/uploads/2025/06/Barbearia-por-assinatura-1.webp',
  ];

  // Efeito que cria um intervalo para trocar a imagem automaticamente a cada 4 segundos.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  return (
    <section id="galeria" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gold">Nosso trabalho</h2>
        {/* Contêiner principal do carrossel de imagens. */}
        <div className="relative overflow-hidden rounded-xl shadow-xl h-96 border border-gray-800">
          {/* Faixa flexível que contém as imagens e se move horizontalmente. */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }} // Desloca o contêiner para mostrar a imagem correta.
          >
            {galleryImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Galeria ${index + 1}`}
                className="w-full h-96 object-cover flex-shrink-0"
              />
            ))}
          </div>

          {/* Indicadores de navegação (bolinhas) para mostrar qual imagem está ativa e permitir a troca manual. */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentImageIndex ? 'bg-gold' : 'bg-white/40'
                }`}
                aria-label={`Ir para imagem ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Exporta o componente Galeria.
export default Galeria;