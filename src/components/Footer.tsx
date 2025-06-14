
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Sobre a CIMEB', href: '#sobre' },
    { label: 'Como se Associar', href: '#associacao' },
    { label: 'CIMEB Academy', href: '#academy' },
    { label: 'Livraria Digital', href: '#livraria' },
    { label: 'Loja Online', href: '#loja' },
    { label: 'Contato', href: '#contato' }
  ];

  const legalLinks = [
    { label: 'Política de Privacidade', href: '#privacy' },
    { label: 'Termos de Uso', href: '#terms' },
    { label: 'LGPD', href: '#lgpd' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">C</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">CIMEB</h3>
                <p className="text-sm text-blue-200">Convenção de Igrejas</p>
              </div>
            </div>
            <p className="text-blue-100 leading-relaxed mb-6">
              Unidos pela Palavra de Deus, fortalecendo o Reino através da 
              união de ministros e igrejas evangélicas em todo o Brasil.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <span className="text-sm">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <span className="text-sm">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <span className="text-sm">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <span className="text-sm">📺</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-blue-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-blue-200 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-400 mt-1">📍</span>
                <div>
                  <p className="text-blue-100 text-sm">
                    Endereço da CIMEB<br />
                    Cidade - Estado<br />
                    CEP: 00000-000
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-yellow-400">📧</span>
                <a href="mailto:contato@cimeb.org.br" className="text-blue-200 hover:text-yellow-400 transition-colors">
                  contato@cimeb.org.br
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-yellow-400">📱</span>
                <a href="tel:+5511999999999" className="text-blue-200 hover:text-yellow-400 transition-colors">
                  (11) 99999-9999
                </a>
              </div>

              <div className="bg-blue-700 rounded-lg p-4 mt-6">
                <p className="text-sm text-blue-100 mb-2">PIX para Associação:</p>
                <p className="text-yellow-400 font-mono text-sm break-all">
                  CNPJ.DA.CIMEB@PIX
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-blue-200 text-sm">
              © {currentYear} CIMEB - Convenção de Igrejas e Ministros Evangélicos no Brasil. 
              Todos os direitos reservados.
            </p>
            <p className="text-blue-300 text-sm mt-2 sm:mt-0">
              Desenvolvido com ❤️ para o Reino de Deus
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
