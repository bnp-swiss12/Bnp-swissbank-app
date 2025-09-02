import React, { useState } from "react";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const navigationItems = [
    "À PROPOS",
    "ENTREPRISES ET INSTITUTIONNELS", 
    "WEALTH MANAGEMENT",
    "FONDATION BNP PARIBAS SUISSE",
    "CARRIÈRE",
    "ACTUALITÉS",
    "CONTACT"
  ];

  return (
    <>
      {/* Accessibility links bar */}
      <div className="bg-gray-100 py-2 px-4 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto flex space-x-6">
          <a href="#content" className="hover:text-green-600 transition-colors">
            ACCÈS DIRECT AU CONTENU
          </a>
          <a href="#search" className="hover:text-green-600 transition-colors">
            ACCÈS DIRECT À LA RECHERCHE
          </a>
          <a href="#nav-primary" className="hover:text-green-600 transition-colors">
            ACCÈS DIRECT AU MENU PRINCIPAL
          </a>
          <a href="#nav-banking" className="hover:text-green-600 transition-colors">
            ACCÈS DIRECT AU MENU BANQUE EN LIGNE
          </a>
        </div>
      </div>

      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
              YouTube
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
              GROUPE BNP PARIBAS
            </a>
            <div className="relative">
              <button className="text-gray-600 hover:text-green-600 transition-colors flex items-center space-x-1">
                <span>ONLINE BANKING</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-sm flex items-center justify-center">
                <div className="text-white font-bold text-sm">BNP</div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-semibold text-gray-900">BNP PARIBAS</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">SUISSE</span>
                <span className="text-green-600 font-medium">La banque d'un monde qui change</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" id="nav-primary">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium text-sm"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:border-green-600 transition-colors"
                >
                  <span className="text-sm font-medium">FR</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showLanguageMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg py-2 min-w-[100px]">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">FR</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">EN</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">DE</a>
                  </div>
                )}
              </div>

              {/* Search button */}
              <Button variant="ghost" size="sm" className="hover:bg-green-50">
                <Search className="w-5 h-5 text-green-600" />
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-3">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium py-2"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;