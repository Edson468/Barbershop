// src/components/Agendamento.jsx
// Importa hooks do React e funções da biblioteca date-fns para manipulação de datas.
import { useState, useMemo } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaArrowRight } from 'react-icons/fa';

// Define o componente de Agendamento.
const Agendamento = () => {
  // Estados para controlar a data selecionada, animações, visibilidade do formulário e dados do formulário.
  const [selectedDate, setSelectedDate] = useState(null);
  const [showArrow, setShowArrow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isFormAnimating, setIsFormAnimating] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Memoriza uma lista de horários já reservados para otimizar o desempenho.
  const reservedAppointments = useMemo(() => ({
    '2025-11-06': ['10:00', '14:00', '16:00'],
    '2025-11-07': ['09:00', '11:00'],
    '2025-11-10': ['18:00'],
  }), []);

  // Funções para navegar entre os meses do calendário.
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Calcula e memoriza os dias a serem exibidos no calendário do mês atual.
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;
    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  // Formata uma data para uma chave de string no formato 'yyyy-MM-dd'.
  const formatDateKey = (date) => format(date, 'yyyy-MM-dd');

  // Gera uma lista de horários disponíveis, das 08:00 às 20:00.
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = 8 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Verifica se um determinado horário está reservado na data selecionada.
  const isTimeReserved = (time) => {
    if (!selectedDate) return false;
    const key = formatDateKey(selectedDate);
    return reservedAppointments[key]?.includes(time) || false;
  };

  // Lida com o clique em um dia do calendário, controlando as animações e a exibição do formulário.
  const handleDayClick = (day) => {
    if (isSameMonth(day, currentMonth)) {
      setSelectedDate(day);
      setSelectedTime(null);
      setShowArrow(false);
      setShowForm(false);
      setIsFormAnimating(false);

      setTimeout(() => setShowArrow(true), 100);
      setTimeout(() => setShowForm(true), 100);
      setTimeout(() => setIsFormAnimating(true), 350);
    }
  };

  // Lida com a ação de voltar para a visualização do calendário, escondendo o formulário.
  const handleBackToCalendar = () => {
    setIsFormAnimating(false);
    setTimeout(() => {
      setShowForm(false);
      setShowArrow(false);
      setSelectedDate(null);
    }, 800);
  };

  // Atualiza o estado do formulário conforme o usuário digita nos campos.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Define o horário selecionado pelo usuário, se não estiver reservado.
  const handleTimeSelect = (time) => {
    if (!isTimeReserved(time)) {
      setSelectedTime(time);
    }
  };

  // Processa o envio do formulário, exibindo um alerta com os detalhes do agendamento.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !formData.service) {
      alert('Por favor, preencha todos os campos e selecione um horário disponível.');
      return;
    }
    alert(`Agendamento confirmado!\n\nData: ${format(selectedDate, 'dd/MM', { locale: ptBR })}\nHorário: ${selectedTime}\nServiço: ${formData.service}\nNome: ${formData.name}\nTelefone: ${formData.phone}`);
  };

  return (
    <section id="agendamento" className="py-16 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gold">Agende seu horário</h2>

        {/* Renderiza o calendário em tela cheia se nenhuma data estiver selecionada. */}
        {!selectedDate ? ( 
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <button onClick={prevMonth} className="text-gold hover:text-gold-light">
                &larr; Mês anterior
              </button>
              <h3 className="text-xl font-semibold text-white">
                {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
              </h3>
              <button onClick={nextMonth} className="text-gold hover:text-gold-light">
                Próximo mês &rarr;
              </button>
            </div>

            {/* Cabeçalho com os dias da semana. */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="text-center text-gray-400 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid com os dias do mês. */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  onClick={() => handleDayClick(day)}
                  className={`h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-500
                    ${!isSameMonth(day, currentMonth) ? 'text-gray-700' : 'text-white'}
                    ${isSameDay(day, new Date()) && isSameMonth(day, currentMonth) ? 'bg-gray-700' : ''}
                    ${isSameDay(day, selectedDate) ? 'bg-gold text-black font-bold' : ''}
                    ${isSameMonth(day, currentMonth) ? 'hover:bg-gray-800' : ''}
                  `}
                >
                  {format(day, 'd')}
                </div>
              ))}
            </div>
          </div>
        ) : ( 
          // Renderiza a visualização dividida (calendário e formulário) quando uma data é selecionada.
          <div className="flex flex-col md:flex-row items-start gap-6 max-w-6xl mx-auto">
            {/* Calendário em formato menor, à esquerda. */}
            <div
              className={`bg-gray-900 p-4 rounded-xl border border-gray-800 w-full md:w-2/5
                transition-all duration-1800 ease-[cubic-bezier(0.12,0.9,0.3,1)]
                transform ${selectedDate ? 'scale-95 opacity-100' : 'scale-100 opacity-100'}
                transition-shadow duration-1800`}
              style={{ minHeight: '460px' }}
            >
              <div className="flex justify-between items-center mb-4">
                <button onClick={prevMonth} className="text-gold text-sm">&larr;</button>
                <span className="text-white font-medium">{format(currentMonth, 'MMM yyyy', { locale: ptBR })}</span>
                <button onClick={nextMonth} className="text-gold text-sm">&rarr;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                  <div key={i} className="text-center text-gray-500">{d}</div>
                ))}
                {calendarDays.map((day, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleDayClick(day)}
                    className={`h-8 flex items-center justify-center rounded cursor-pointer
                      ${!isSameMonth(day, currentMonth) ? 'text-gray-700' : 'text-gray-300'}
                      ${isSameDay(day, selectedDate) ? 'bg-gold text-black font-bold' : ''}
                      ${isSameMonth(day, currentMonth) ? 'hover:bg-gray-700' : ''}
                    `}
                  >
                    {format(day, 'd')}
                  </div>
                ))}
              </div>
              {/* Botão para voltar à seleção de data em tela cheia. */}
              <div className="mt-auto pt-4">
                <button
                  onClick={handleBackToCalendar}
                  className="text-sm text-gray-400 hover:text-gold flex items-center"
                >
                  ← Escolher outro dia
                </button>
              </div>
            </div>

            {/* Ícone de seta animado que aparece entre o calendário e o formulário. */}
            <div className="hidden md:flex items-center justify-center">
              <FaArrowRight
                className={`text-gold transition-all duration-1000 ease-in-out
                  ${showArrow ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
                size={24}
              />
            </div>

            {/* Formulário de agendamento, renderizado condicionalmente com animação. */}
            {showForm && (
              <div
                className={`w-full md:w-3/5 transition-all duration-1800 ease-[cubic-bezier(0.12,0.9,0.3,1)] ${
                  isFormAnimating
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-full'
                }`}
              >
                <div
                  className={`bg-gray-900 p-6 rounded-xl border border-gray-800 h-full transition-shadow duration-1800 ${
                    isFormAnimating ? 'shadow-2xl shadow-black/50' : 'shadow-none'
                  }`}
                  style={{ minHeight: '500px' }}
                >
                  <h3 className="text-xl font-bold text-gold mb-4">
                    {format(selectedDate, 'EEEE, dd/MM', { locale: ptBR })}
                  </h3>

                  {/* Campos de entrada para nome, telefone e seleção de serviço. */}
                  <div className="mb-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gold focus:outline-none"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(85) 99999-9999"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gold focus:outline-none"
                    />

                    <label className="block text-gray-300 mb-2">Serviço desejado</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-gold focus:outline-none"
                    >
                      <option value="">Selecione um serviço</option>
                      <option value="Corte Social - R$ 45">Corte Social - R$ 45</option>
                      <option value="Degradê - R$ 55">Degradê - R$ 55</option>
                      <option value="Barba Completa - R$ 40">Barba Completa - R$ 40</option>
                      <option value="Pacote Estilo - R$ 85">Pacote Estilo - R$ 85</option>
                      <option value="Sobrancelha - R$ 25">Sobrancelha - R$ 25</option>
                      <option value="Luzes no Cabelo - R$ 70">Luzes no Cabelo - R$ 70</option>
                    </select>
                  </div>

                  {/* Seção para escolher um horário disponível. */}
                  <h4 className="text-lg font-semibold text-white mb-3">Escolha um horário:</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        disabled={isTimeReserved(time)}
                        className={`py-2 rounded text-sm font-medium transition
                          ${
                            isTimeReserved(time)
                              ? 'bg-red-900/70 text-red-300 cursor-not-allowed'
                              : selectedTime === time
                              ? 'bg-gold text-black'
                              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  {/* Botão para confirmar e submeter o agendamento. */}
                  <div className="mt-auto pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={!selectedTime || !formData.service}
                      className={`w-full py-3 rounded-lg font-bold transition ${
                        selectedTime && formData.service
                          ? 'bg-gold hover:bg-gold-dark text-black'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Confirmar Agendamento
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// Exporta o componente Agendamento.
export default Agendamento;