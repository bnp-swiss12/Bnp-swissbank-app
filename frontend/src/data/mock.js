// Mock data for BNP Paribas Switzerland website clone
// Note: This is mock data used for demonstration purposes

export const mockData = {
  // Company information
  company: {
    name: "BNP PARIBAS",
    location: "SUISSE",
    tagline: "La banque d'un monde qui change",
    heroTitle: "BNP Paribas en\nSuisse",
    heroSubtitle: "Au service de nos clients en Suisse depuis plus de 150 ans",
    description: "BNP Paribas est présent en Suisse depuis plus de 150 ans, ce qui en fait l'un des établissements les plus historiques et les plus ancrés du Groupe en dehors de la France. Depuis 1872, nous accompagnons des clients suisses et internationaux à travers les grandes transitions économiques – en bâtissant la confiance, en faisant preuve de résilience et en nous engageant dans des partenariats de long terme."
  },

  // Navigation menu items
  navigation: [
    "À PROPOS",
    "ENTREPRISES ET INSTITUTIONNELS", 
    "WEALTH MANAGEMENT",
    "FONDATION BNP PARIBAS SUISSE",
    "CARRIÈRE",
    "ACTUALITÉS",
    "CONTACT"
  ],

  // Business model services
  services: {
    cib: {
      title: "Corporate & Institutional Banking (CIB)",
      items: [
        "Corporate & Institutional Banking",
        "Global Banking", 
        "Global Markets",
        "Securities Services"
      ]
    },
    investment: {
      title: "Investment & Protection Services",
      items: [
        "Wealth Management",
        "Asset Management"
      ]
    },
    commercial: {
      title: "Commercial, Personal Banking & Services",
      items: [
        "Arval",
        "Leasing Solutions"
      ]
    }
  },

  // Focus section items
  focus: [
    {
      title: "Notre Management",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Une banque responsable", 
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Fondation BNP Paribas Suisse",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ],

  // Awards and distinctions
  awards: [
    {
      title: "Euromoney Private Banking Awards 2025",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Swiss LGBTI Label",
      image: "https://images.unsplash.com/photo-1590845947670-c009801ffa74?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ],

  // Memberships
  memberships: [
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
  ],

  // Latest news
  news: [
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
  ],

  // Client service sections
  clientServices: [
    {
      type: "corporate",
      title: "Vous êtes une entreprise ou une institution ?",
      subtitle: "Nos équipes vous accompagnent.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/entreprises-et-institutionnels"
    },
    {
      type: "private",
      title: "Vous êtes un client privé ?",
      subtitle: "Découvrez nos offres dédiées à notre clientèle privée.",
      image: "https://images.unsplash.com/photo-1573166673479-29d25d5b5fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/clients-prives"
    }
  ],

  // Contact and social media
  social: {
    linkedin: "https://www.linkedin.com/company/bnp-paribas-switzerland/",
    youtube: "#"
  },

  // Footer sections
  footer: {
    sections: [
      {
        title: "À propos",
        links: [
          { name: "Notre histoire", url: "#" },
          { name: "Notre management", url: "#" },
          { name: "Gouvernance", url: "#" }
        ]
      },
      {
        title: "Services",
        links: [
          { name: "Corporate Banking", url: "#" },
          { name: "Wealth Management", url: "#" },
          { name: "Asset Management", url: "#" }
        ]
      },
      {
        title: "Responsabilité",
        links: [
          { name: "Développement durable", url: "#" },
          { name: "Fondation", url: "#" },
          { name: "Mécénat", url: "#" }
        ]
      },
      {
        title: "Carrières",
        links: [
          { name: "Offres d'emploi", url: "#" },
          { name: "Stages", url: "#" },
          { name: "Diversité", url: "#" }
        ]
      }
    ],
    legal: [
      { name: "Mentions légales", url: "#" },
      { name: "Politique de confidentialité", url: "#" },
      { name: "Cookies", url: "#" },
      { name: "Plan du site", url: "#" }
    ]
  }
};

export default mockData;