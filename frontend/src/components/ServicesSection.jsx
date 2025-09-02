import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Entreprises et institutionnels */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Corporate Banking"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-green-600 bg-opacity-60 flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-semibold mb-4">
                    Vous êtes une entreprise ou une institution ?
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    Nos équipes vous accompagnent.
                  </p>
                  <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Clients privés */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1573166673479-29d25d5b5fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Private Banking"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-green-600 bg-opacity-60 flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-semibold mb-4">
                    <span className="font-semibold">Vous êtes u</span>n client privé ?
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    Découvrez nos offres dédiées à notre clientèle privée.
                  </p>
                  <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;