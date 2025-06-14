const Testimonials = () => {
  const testimonials = [
    {
      name: "Pastor João Silva",
      church: "Igreja Batista da Paz - São Paulo/SP",
      content: "A CIMEB transformou minha visão ministerial. Os recursos da Academy e a rede de contatos me ajudaram a crescer como pastor e líder. Recomendo para todos os ministros que buscam excelência.",
      rating: 5
    },
    {
      name: "Pastora Maria Santos",
      church: "Ministério Restauração - Rio de Janeiro/RJ",
      content: "Ser associada à CIMEB foi uma das melhores decisões que tomei. O suporte, os cursos e a comunidade ministerial são excepcionais. Sinto-me verdadeiramente apoiada em minha jornada.",
      rating: 5
    },
    {
      name: "Pastor Carlos Oliveira",
      church: "Igreja Evangélica Renascer - Belo Horizonte/MG",
      content: "A CIMEB oferece uma plataforma completa para o ministério. Desde a formação teológica até os recursos práticos, tudo é pensado para o crescimento do Reino de Deus. Excelente trabalho!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-textured relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            O que Dizem Nossos Associados
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conheça as experiências de pastores e líderes que fazem parte da família CIMEB 
            e descobriram o verdadeiro valor da união ministerial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100"
            >
              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.church}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Números que Confirmam Nossa Excelência
            </h3>
            <p className="text-blue-100 text-lg">
              Resultados que demonstram o impacto da CIMEB na vida ministerial
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">98%</div>
              <div className="text-blue-100 text-sm sm:text-base">Taxa de Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-blue-100 text-sm sm:text-base">Ministros Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">25+</div>
              <div className="text-blue-100 text-sm sm:text-base">Anos de História</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-blue-100 text-sm sm:text-base">Igrejas Parceiras</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
