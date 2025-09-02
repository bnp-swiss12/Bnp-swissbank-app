import React from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const BusinessModelSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Introduction */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            BNP Paribas est présent en Suisse depuis plus de 150 ans, ce qui en fait l'un des établissements les plus 
            historiques et les plus ancrés du Groupe en dehors de la France. Depuis 1872, nous accompagnons des clients 
            suisses et internationaux à travers les grandes transitions économiques – en bâtissant la confiance, en faisant 
            preuve de résilience et en nous engageant dans des partenariats de long terme. Aujourd'hui, la Suisse est un 
            pays stratégique pour le Groupe BNP Paribas, et nous offrons une large gamme de services à travers plusieurs 
            lignes de métier.
          </p>
        </div>

        {/* Map section */}
        <div className="mb-16 text-center">
          <div className="relative inline-block">
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="BNP Paribas presence map" 
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
            <div className="absolute inset-0 bg-green-600 bg-opacity-10 rounded-lg"></div>
          </div>
          <div className="mt-6">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
              <Download className="w-4 h-4 mr-2" />
              Télécharger notre factsheet
            </Button>
          </div>
        </div>

        {/* Business model title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            <span className="font-semibold">Un business model diversifié et intégré</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Notre présence en Suisse va bien au-delà de la banque traditionnelle. Aux côtés de Corporate & Institutional 
            Banking et de Wealth Management, plusieurs autres entités de BNP Paribas opèrent localement pour répondre à un 
            large éventail de besoins clients. Cette offre diversifiée nous permet de proposer une expertise intégrée et 
            transversale, adaptée aux besoins spécifiques des entreprises, des institutions et des particuliers en Suisse.
          </p>
        </div>

        <div className="text-center mb-12">
          <p className="text-lg font-medium text-gray-900">
            Découvrez les solutions et lignes de métier de BNP Paribas en Suisse :
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Corporate & Institutional Banking */}
          <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Corporate & Institutional Banking (CIB)</h3>
            <ul className="space-y-3">
              {[
                "Corporate & Institutional Banking",
                "Global Banking", 
                "Global Markets",
                "Securities Services"
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-green-600 hover:text-green-700 transition-colors underline">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Investment & Protection Services */}
          <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Investment & Protection Services</h3>
            <ul className="space-y-3">
              {[
                "Wealth Management",
                "Asset Management"
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-green-600 hover:text-green-700 transition-colors underline">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Commercial Services */}
        <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Commercial, Personal Banking & Services</h3>
          <ul className="space-y-3">
            {[
              "Arval",
              "Leasing Solutions"
            ].map((service, index) => (
              <li key={index} className="text-center">
                <a href="#" className="text-green-600 hover:text-green-700 transition-colors underline">
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelSection;