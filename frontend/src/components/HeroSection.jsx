import React from "react";

const HeroSection = () => {
  return (
    <section 
      className="relative h-[600px] flex items-center justify-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 148, 100, 0.7), rgba(0, 148, 100, 0.8)), url('https://images.unsplash.com/photo-1545161296-d9c2c241f2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      id="content"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
          BNP Paribas en<br />
          <span className="font-normal">Suisse</span>
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
          Au service de nos clients en Suisse depuis plus de 150 ans
        </p>
      </div>
      
      {/* Subtle mountain silhouette overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent opacity-20"></div>
    </section>
  );
};

export default HeroSection;