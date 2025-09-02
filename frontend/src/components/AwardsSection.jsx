import React from "react";

const AwardsSection = () => {
  const awards = [
    {
      title: "Euromoney Private Banking Awards 2025",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Swiss LGBTI Label",
      image: "https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const memberships = [
    {
      name: "AFBS",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Swiss Bankers Association", 
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "SSF",
      image: "https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Awards */}
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-8">Distinctions et classements</h2>
            <div className="grid grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-lg p-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <img 
                      src={award.image}
                      alt={award.title}
                      className="w-full h-24 object-contain mb-2"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{award.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Memberships */}
          <div>
            <h2 className="text-2xl font-light text-gray-900 mb-8">Nos adhésions</h2>
            <div className="space-y-4">
              {memberships.map((membership, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center">
                  <img 
                    src={membership.image}
                    alt={membership.name}
                    className="w-16 h-12 object-contain mr-4"
                  />
                  <span className="text-gray-700 font-medium">{membership.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;