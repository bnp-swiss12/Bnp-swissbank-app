import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const LoginModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (formData.username && formData.password) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté à BNP Paribas Online Banking.",
        });
        onClose();
        setFormData({ username: "", password: "" });
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Veuillez remplir tous les champs.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleClose = () => {
    setFormData({ username: "", password: "" });
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Online Banking
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            Connectez-vous à votre espace client sécurisé
          </p>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-6 mt-6">
          {/* Username field */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Saisissez votre nom d'utilisateur"
                value={formData.username}
                onChange={handleInputChange}
                className="pl-10 h-12 border-gray-300 focus:border-green-600 focus:ring-green-600"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Mot de passe
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Saisissez votre mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-12 h-12 border-gray-300 focus:border-green-600 focus:ring-green-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-600"
              />
              <span className="text-sm text-gray-600">Se souvenir de moi</span>
            </label>
            <a
              href="#"
              className="text-sm text-green-600 hover:text-green-700 transition-colors"
            >
              Mot de passe oublié ?
            </a>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connexion en cours...</span>
              </div>
            ) : (
              "Se connecter"
            )}
          </Button>

          {/* Security notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-medium mb-1">Connexion sécurisée</p>
                <p>
                  Vos données sont protégées par un cryptage de niveau bancaire. 
                  Ne partagez jamais vos identifiants de connexion.
                </p>
              </div>
            </div>
          </div>

          {/* Help links */}
          <div className="text-center space-y-2 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">Besoin d'aide ?</p>
            <div className="flex justify-center space-x-4 text-sm">
              <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
                Support technique
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
                Première connexion
              </a>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;