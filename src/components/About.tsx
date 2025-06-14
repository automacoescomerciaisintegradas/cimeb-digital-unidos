
const About = () => {
  return (
    <section id="sobre" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Sobre a CIMEB
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            A Convenção de Igrejas e Ministros Evangélicos no Brasil é uma organização que 
            busca unir pastores e líderes evangélicos em torno da Palavra de Deus, promovendo 
            a comunhão, o crescimento espiritual e o fortalecimento do Reino de Deus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Nossa Missão</h3>
              <p className="text-gray-600 leading-relaxed">
                Promover a união dos ministros evangélicos através da Palavra de Deus, 
                oferecendo recursos, formação e comunhão para o fortalecimento do Reino 
                de Deus no Brasil e no mundo.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Nossa Visão</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser a principal referência em união ministerial no Brasil, conectando 
                pastores e líderes em uma rede sólida de apoio, crescimento e impacto 
                para a obra de Deus.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Nossos Valores</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Unidade na diversidade ministerial
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Compromisso com a Palavra de Deus
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Excelência no serviço cristão
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Transparência e integridade
                </li>
              </ul>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-blue-900">✝</span>
                </div>
                <h4 className="text-2xl font-bold">Benefícios da Associação</h4>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Carteira de Ministro Reconhecida
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Acesso à CIMEB Academy
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Rede de Contatos Ministeriais
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Recursos Teológicos Exclusivos
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Suporte Jurídico Ministerial
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
