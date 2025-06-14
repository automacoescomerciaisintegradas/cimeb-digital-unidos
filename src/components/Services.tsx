
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      id: 'academy',
      title: 'CIMEB Academy',
      description: 'Cursos de teologia online, formação ministerial e certificações reconhecidas para o crescimento espiritual e profissional.',
      features: [
        'Cursos de Teologia Online',
        'Certificados Reconhecidos',
        'Biblioteca Digital',
        'Mentoria Ministerial'
      ],
      gradient: 'from-blue-600 to-blue-700',
      icon: '🎓'
    },
    {
      id: 'livraria',
      title: 'Livraria Digital',
      description: 'Acesso a uma vasta coleção de livros evangélicos, estudos bíblicos, comentários teológicos e recursos espirituais.',
      features: [
        'E-books e Audiobooks',
        'Estudos Bíblicos',
        'Comentários Teológicos',
        'Downloads Ilimitados'
      ],
      gradient: 'from-green-600 to-green-700',
      icon: '📚'
    },
    {
      id: 'loja',
      title: 'Loja Online',
      description: 'Materiais para igreja, recursos ministeriais, produtos evangélicos e presentes cristãos com qualidade garantida.',
      features: [
        'Materiais para Igreja',
        'Recursos Ministeriais',
        'Produtos Evangélicos',
        'Entrega Nacional'
      ],
      gradient: 'from-purple-600 to-purple-700',
      icon: '🛍️'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Oferecemos uma plataforma completa de recursos para ministros, com educação, 
            materiais e produtos que fortalecem o ministério e a comunidade evangélica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${service.gradient} p-8 text-white relative`}>
                <div className="absolute top-4 right-4 text-3xl opacity-50">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-blue-100 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90 text-white py-3 rounded-lg font-semibold transition-all duration-300`}
                >
                  Explorar {service.title}
                </Button>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Pronto para começar sua jornada?
            </h3>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              Junte-se a centenas de ministros que já fazem parte da família CIMEB 
              e tenha acesso a todos os nossos recursos exclusivos.
            </p>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
              QUERO ME ASSOCIAR AGORA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
