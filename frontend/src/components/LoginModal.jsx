import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Eye, EyeOff, Lock, User, Shield, AlertCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  // Identifiants valides
  const VALID_CREDENTIALS = {
    username: "Monicka127",
    password: "1447mOnicka"
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials
      if (formData.username === VALID_CREDENTIALS.username && 
          formData.password === VALID_CREDENTIALS.password) {
        
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${formData.username} ! Redirection vers votre espace client...`,
        });
        
        // Close modal and redirect to dashboard
        onClose();
        onLoginSuccess(formData.username);
        setFormData({ username: "", password: "" });
        
      } else {
        // Invalid credentials
        setError("Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer.");
        toast({
          title: "Erreur de connexion",
          description: "Identifiants incorrects. Vérifiez vos informations.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleClose = () => {
    setFormData({ username: "", password: "" });
    setShowPassword(false);
    setError("");
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
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium mb-1">Erreur de connexion</p>
                  <p>{error}</p>
                </div>
              </div>
            </div>
          )}

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
                className={`pl-10 h-12 border-gray-300 focus:border-green-600 focus:ring-green-600 ${
                  error ? 'border-red-300 focus:border-red-600 focus:ring-red-600' : ''
                }`}
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
                className={`pl-10 pr-12 h-12 border-gray-300 focus:border-green-600 focus:ring-green-600 ${
                  error ? 'border-red-300 focus:border-red-600 focus:ring-red-600' : ''
                }`}
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
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium transition-colors disabled:opacity-50"
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

          {/* Demo credentials hint */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Démonstration</p>
                <p className="mb-2">Utilisez ces identifiants pour tester :</p>
                <div className="bg-blue-100 rounded p-2 font-mono text-xs">
                  <div>👤 Utilisateur : <strong>Monicka127</strong></div>
                  <div>🔐 Mot de passe : <strong>1447mOnicka</strong></div>
                </div>
              </div>
            </div>
          </div>

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