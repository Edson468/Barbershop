// src/components/Servicos.jsx
// Define o componente que exibe a lista de serviços oferecidos.
const Servicos = () => {
  // Array de objetos, onde cada objeto representa um serviço com nome, descrição e preço.
  const servicos = [
    { nome: 'Corte Social', descricao: 'Corte clássico e elegante', preco: 'R$ 45' },
    { nome: 'Degradê', descricao: 'Transição suave com máquina', preco: 'R$ 55' },
    { nome: 'Barba Completa', descricao: 'Modelagem, corte e finalização', preco: 'R$ 40' },
    { nome: 'Pacote Estilo', descricao: 'Corte + Barba + Hidratação', preco: 'R$ 85' },
    { nome: 'Sobrancelha', descricao: 'Modelagem com navalha', preco: 'R$ 25' },
    { nome: 'Luzes no Cabelo', descricao: 'Efeito natural premium', preco: 'R$ 70' },
  ];

  return (
    <section id="servicos" className="py-16 bg-black">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gold">Nossos Serviços</h2>
        {/* Grid que organiza os cartões de serviço em colunas responsivas. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicos.map((servico, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gold transition group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold">{servico.nome}</h3>
              <p className="text-gray-400 mb-4">{servico.descricao}</p>
              <div className="text-gold font-bold text-xl">{servico.preco}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Exporta o componente Servicos.
export default Servicos;