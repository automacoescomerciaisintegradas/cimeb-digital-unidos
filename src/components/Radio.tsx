
const Radio = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Rádio CIMEB
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ouça nossa programação 24 horas com mensagens inspiradoras, 
              louvores e conteúdo edificante para toda a família cristã.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📻</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Transmissão ao Vivo
              </h3>
              <p className="text-gray-600">
                Programação cristã 24 horas por dia, 7 dias por semana
              </p>
            </div>

            {/* Radio Player */}
            <div className="bg-gray-50 rounded-xl p-6">
              <iframe 
                src="https://zeno.fm/player/cimeb-convencao-das-igrejas-e-ministros-evangelicos-no-brasil" 
                width="100%" 
                height="250" 
                frameBorder="0" 
                scrolling="no"
                className="rounded-lg"
                title="Rádio CIMEB"
              ></iframe>
              <a 
                href="https://zeno.fm/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs text-gray-500 hover:text-blue-600 transition-colors"
              >
                Powered by Zeno.FM
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Ao Vivo 24/7
              </div>
              <div className="flex items-center justify-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Música Gospel
              </div>
              <div className="flex items-center justify-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Mensagens Bíblicas
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Radio;
