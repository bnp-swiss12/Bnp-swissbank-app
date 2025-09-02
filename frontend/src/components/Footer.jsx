import React from "react";
import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-lg mb-4">BNP Paribas in Switzerland</p>
          <div className="flex justify-center">
            <a 
              href="#" 
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Suivez-nous sur LinkedIn !</span>
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">À propos</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Notre histoire</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Notre management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gouvernance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Corporate Banking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wealth Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Asset Management</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Responsabilité</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Développement durable</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fondation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mécénat</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Carrières</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Offres d'emploi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Stages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Diversité</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <div className="flex flex-wrap justify-center space-x-6">
              <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Plan du site</a>
            </div>
            <p className="mt-4">© 2025 BNP Paribas - Tous droits réservés</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;