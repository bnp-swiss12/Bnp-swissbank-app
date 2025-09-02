import React from "react";
import { Button } from "./ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const NewsSection = () => {
  const newsItems = [
    {
      category: "Groupe BNP Paribas",
      title: "Groupe BNP Paribas : Résultats au 30 juin 2025",
      date: "24 juillet 2025",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      external: true
    },
    {
      category: "BNP Paribas en Suisse", 
      title: "BNP Paribas en Suisse signe un partenariat avec Advance en faveur de l'égalité des genres",
      date: "8 juillet 2025",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      external: false
    },
    {
      category: "Groupe BNP Paribas",
      title: "BNP Paribas fait évoluer sa gouvernance dans la perspective de son futur plan stratégique", 
      date: "7 juillet 2025",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      external: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Dernières actualités</h2>
        
        <div className="space-y-8">
          {newsItems.map((item, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="md:w-64 flex-shrink-0">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight">
                    {item.title}
                    {item.external && (
                      <span className="text-sm text-gray-500 ml-2">- Nouvelle fenêtre</span>
                    )}
                  </h3>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{item.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
            Toutes les actualités
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;