import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Send, AlertCircle, CheckCircle2, Building2, User, AlertTriangle, Lock } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const TransferModal = ({ isOpen, onClose, onTransferSuccess, currentBalance, isEmergency = false }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    beneficiaryName: "",
    beneficiaryIban: "",
    beneficiaryAddress: "",
    amount: "",
    reference: "",
    urgency: "emergency",
    executionDate: new Date().toISOString().split('T')[0],
    justification: ""
  });
  const [errors, setErrors] = useState({});

  const { toast } = useToast();

  // Comprehensive IBAN validation for all countries
  const validateIban = (iban) => {
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();
    
    // IBAN patterns for major countries
    const ibanPatterns = {
      // Europe
      'CH': /^CH\d{2}\d{4}\d{4}\d{4}\d{4}\d{1}$/, // Switzerland
      'FR': /^FR\d{2}\d{5}\d{5}\d{11}\d{2}$/, // France  
      'DE': /^DE\d{2}\d{8}\d{10}$/, // Germany
      'GB': /^GB\d{2}[A-Z]{4}\d{6}\d{8}$/, // UK
      'IT': /^IT\d{2}[A-Z]{1}\d{5}\d{5}\d{12}$/, // Italy
      'ES': /^ES\d{2}\d{4}\d{4}\d{1}\d{1}\d{10}$/, // Spain
      'NL': /^NL\d{2}[A-Z]{4}\d{10}$/, // Netherlands
      'BE': /^BE\d{2}\d{3}\d{7}\d{2}$/, // Belgium
      'AT': /^AT\d{2}\d{5}\d{11}$/, // Austria
      
      // Americas
      'US': /^US\d{2}\d{8}\d{12}$/, // USA (fictitious, for demo)
      'CA': /^CA\d{2}\d{8}\d{12}$/, // Canada (fictitious, for demo)
      'BR': /^BR\d{2}\d{8}\d{5}\d{10}[A-Z]{1}[A-Z0-9]{1}$/, // Brazil
      
      // Asia-Pacific
      'AE': /^AE\d{2}\d{3}\d{16}$/, // UAE
      'QA': /^QA\d{2}[A-Z]{4}\d{21}$/, // Qatar
      'SA': /^SA\d{2}\d{2}[A-Z0-9]{18}$/, // Saudi Arabia
      'JP': /^JP\d{2}[A-Z0-9]{4}\d{16}$/, // Japan (fictitious, for demo)
      'AU': /^AU\d{2}\d{6}\d{10}$/, // Australia (fictitious, for demo)
      'SG': /^SG\d{2}[A-Z]{4}\d{12}$/, // Singapore (fictitious, for demo)
      
      // Africa
      'ZA': /^ZA\d{2}\d{6}\d{10}$/, // South Africa (fictitious, for demo)
      'EG': /^EG\d{2}\d{4}\d{4}\d{17}$/, // Egypt (fictitious, for demo)
    };

    if (cleanIban.length < 15 || cleanIban.length > 34) return false;
    
    const countryCode = cleanIban.substring(0, 2);
    const pattern = ibanPatterns[countryCode];
    
    return pattern ? pattern.test(cleanIban) : cleanIban.length >= 15; // Accept other formats
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.beneficiaryName.trim()) {
      newErrors.beneficiaryName = "Le nom du bénéficiaire est requis";
    }
    
    if (!formData.beneficiaryIban.trim()) {
      newErrors.beneficiaryIban = "L'IBAN/RIB est requis";
    } else if (!validateIban(formData.beneficiaryIban)) {
      newErrors.beneficiaryIban = "Format IBAN/RIB invalide";
    }
    
    if (!formData.beneficiaryAddress.trim()) {
      newErrors.beneficiaryAddress = "L'adresse du bénéficiaire est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    const amount = parseFloat(formData.amount);
    
    if (!formData.amount || isNaN(amount)) {
      newErrors.amount = "Le montant est requis";
    } else if (amount <= 0) {
      newErrors.amount = "Le montant doit être positif";
    } else if (amount > 1000000) {
      newErrors.amount = "Montant maximum : CHF 1'000'000.- pour virement d'urgence";
    }
    
    if (!formData.reference.trim()) {
      newErrors.reference = "La référence de paiement est requise";
    }

    if (isEmergency && !formData.justification.trim()) {
      newErrors.justification = "Justification obligatoire pour virement d'urgence";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const executeTransfer = async () => {
    setIsLoading(true);
    
    // Simulate enhanced security processing for blocked account
    setTimeout(() => {
      const transferData = {
        ...formData,
        amount: parseFloat(formData.amount),
        timestamp: new Date().toISOString(),
        transactionId: `URG${Date.now()}`,
        requiresApproval: true
      };
      
      onTransferSuccess(transferData);
      
      toast({
        title: "🚨 Virement d'urgence soumis",
        description: `${formatCurrency(formData.amount)} en attente d'autorisation manuelle`,
        variant: "destructive"
      });
      
      // Reset form and close
      setFormData({
        beneficiaryName: "",
        beneficiaryIban: "",
        beneficiaryAddress: "",
        amount: "",
        reference: "",
        urgency: "emergency",
        executionDate: new Date().toISOString().split('T')[0],
        justification: ""
      });
      setStep(1);
      setIsLoading(false);
      onClose();
    }, 4000); // Longer processing time for emergency transfers
  };

  const handleClose = () => {
    if (!isLoading) {
      setStep(1);
      setErrors({});
      onClose();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF'
    }).format(amount);
  };

  const getCountryFromIban = (iban) => {
    const countryCode = iban.substring(0, 2).toUpperCase();
    const countries = {
      'CH': '🇨🇭 Suisse', 'FR': '🇫🇷 France', 'DE': '🇩🇪 Allemagne', 'GB': '🇬🇧 Royaume-Uni',
      'IT': '🇮🇹 Italie', 'ES': '🇪🇸 Espagne', 'NL': '🇳🇱 Pays-Bas', 'BE': '🇧🇪 Belgique',
      'AT': '🇦🇹 Autriche', 'US': '🇺🇸 États-Unis', 'CA': '🇨🇦 Canada', 'BR': '🇧🇷 Brésil',
      'AE': '🇦🇪 Émirats Arabes Unis', 'QA': '🇶🇦 Qatar', 'SA': '🇸🇦 Arabie Saoudite',
      'JP': '🇯🇵 Japon', 'AU': '🇦🇺 Australie', 'SG': '🇸🇬 Singapour', 'ZA': '🇿🇦 Afrique du Sud'
    };
    return countries[countryCode] || `${countryCode} Autre pays`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-semibold text-red-900">
            {isEmergency ? "Virement d'Urgence" : "Nouveau Virement"}
          </DialogTitle>
          {isEmergency && (
            <p className="text-red-600 text-sm font-medium">
              ⚠️ Procédure exceptionnelle - Autorisation manuelle requise
            </p>
          )}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && <div className={`w-8 h-0.5 ${step > stepNum ? 'bg-red-600' : 'bg-gray-200'}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </DialogHeader>

        {/* Step 1: Beneficiary Details */}
        {step === 1 && (
          <div className="space-y-6 mt-6">
            <div className="text-center text-sm text-gray-600">
              Étape 1/3 : Destinataire International
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="beneficiaryName" className="text-sm font-medium text-gray-700">
                  Nom complet du bénéficiaire *
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="beneficiaryName"
                    name="beneficiaryName"
                    value={formData.beneficiaryName}
                    onChange={handleInputChange}
                    placeholder="Nom et prénom du destinataire"
                    className={`pl-10 ${errors.beneficiaryName ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.beneficiaryName && (
                  <p className="text-red-500 text-sm mt-1">{errors.beneficiaryName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="beneficiaryIban" className="text-sm font-medium text-gray-700">
                  IBAN/RIB International *
                </Label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="beneficiaryIban"
                    name="beneficiaryIban"
                    value={formData.beneficiaryIban}
                    onChange={handleInputChange}
                    placeholder="Ex: GB29 NWBK 6016 1331 9268 19, US12 ABCD 1234 5678 9012 34..."
                    className={`pl-10 font-mono text-sm ${errors.beneficiaryIban ? 'border-red-500' : ''}`}
                  />
                </div>
                {formData.beneficiaryIban && validateIban(formData.beneficiaryIban) && (
                  <p className="text-green-600 text-sm mt-1">
                    ✓ {getCountryFromIban(formData.beneficiaryIban)}
                  </p>
                )}
                {errors.beneficiaryIban && (
                  <p className="text-red-500 text-sm mt-1">{errors.beneficiaryIban}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Accepté : IBAN UE, USA, Canada, Émirats, Asie, Afrique...
                </p>
              </div>

              <div>
                <Label htmlFor="beneficiaryAddress" className="text-sm font-medium text-gray-700">
                  Adresse complète du bénéficiaire *
                </Label>
                <Textarea
                  id="beneficiaryAddress"
                  name="beneficiaryAddress"
                  value={formData.beneficiaryAddress}
                  onChange={handleInputChange}
                  placeholder="Adresse, ville, code postal, pays"
                  className={`${errors.beneficiaryAddress ? 'border-red-500' : ''}`}
                  rows={3}
                />
                {errors.beneficiaryAddress && (
                  <p className="text-red-500 text-sm mt-1">{errors.beneficiaryAddress}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={handleClose}>
                Annuler
              </Button>
              <Button onClick={handleNext} className="bg-red-600 hover:bg-red-700">
                Suivant
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Transfer Details */}
        {step === 2 && (
          <div className="space-y-6 mt-6">
            <div className="text-center text-sm text-gray-600">
              Étape 2/3 : Montant et justification
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                  Montant à transférer *
                </Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    CHF
                  </span>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max="1000000"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className={`pl-12 text-right text-lg font-semibold ${errors.amount ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
                <div className="bg-red-50 p-3 rounded-lg mt-2">
                  <p className="text-red-700 text-sm font-medium">⚠️ Compte bloqué - Solde disponible théorique:</p>
                  <p className="text-red-600 font-semibold">{formatCurrency(currentBalance)}</p>
                </div>
              </div>

              <div>
                <Label htmlFor="reference" className="text-sm font-medium text-gray-700">
                  Motif du virement *
                </Label>
                <Input
                  id="reference"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  placeholder="Détails de la transaction"
                  className={`${errors.reference ? 'border-red-500' : ''}`}
                />
                {errors.reference && (
                  <p className="text-red-500 text-sm mt-1">{errors.reference}</p>
                )}
              </div>

              {isEmergency && (
                <div>
                  <Label htmlFor="justification" className="text-sm font-medium text-red-700">
                    Justification d'urgence * (Obligatoire)
                  </Label>
                  <Textarea
                    id="justification"
                    name="justification"
                    value={formData.justification}
                    onChange={handleInputChange}
                    placeholder="Expliquez pourquoi ce virement est urgent malgré le blocage du compte"
                    className={`${errors.justification ? 'border-red-500' : ''}`}
                    rows={3}
                  />
                  {errors.justification && (
                    <p className="text-red-500 text-sm mt-1">{errors.justification}</p>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="urgency" className="text-sm font-medium text-gray-700">
                  Type de traitement
                </Label>
                <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({...prev, urgency: value}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">🚨 Urgence exceptionnelle - CHF 100.-</SelectItem>
                    <SelectItem value="priority">⚡ Priorité haute - CHF 50.-</SelectItem>
                    <SelectItem value="standard">📋 Standard avec autorisation - CHF 25.-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <Button variant="outline" onClick={handlePrevious}>
                Précédent
              </Button>
              <Button onClick={handleNext} className="bg-red-600 hover:bg-red-700">
                Suivant
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6 mt-6">
            <div className="text-center text-sm text-gray-600">
              Étape 3/3 : Confirmation et autorisation
            </div>
            
            <div className="bg-red-50 rounded-lg p-6 space-y-4 border border-red-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {formatCurrency(parseFloat(formData.amount))}
                </div>
                <p className="text-gray-600">sera transféré vers</p>
                <p className="font-semibold text-gray-900">{formData.beneficiaryName}</p>
                <p className="text-sm text-gray-600">{getCountryFromIban(formData.beneficiaryIban)}</p>
              </div>
              
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">IBAN destinataire:</span>
                  <span className="font-mono text-sm">{formData.beneficiaryIban}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Motif:</span>
                  <span>{formData.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Traitement:</span>
                  <span className="capitalize text-red-600">{formData.urgency}</span>
                </div>
                {isEmergency && formData.justification && (
                  <div className="bg-red-100 p-3 rounded border-l-4 border-red-500">
                    <p className="text-red-800 font-medium text-xs">JUSTIFICATION D'URGENCE:</p>
                    <p className="text-red-700 text-sm">{formData.justification}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-orange-800">
                  <p className="font-medium mb-1">⚠️ Autorisation manuelle requise</p>
                  <p>Ce virement sera soumis à validation par notre équipe de sécurité en raison du blocage actuel. Traitement sous 24-48h ouvrables.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <Button variant="outline" onClick={handlePrevious} disabled={isLoading}>
                Modifier
              </Button>
              <Button 
                onClick={executeTransfer} 
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Validation sécurisée...</span>
                  </div>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Soumettre à autorisation
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransferModal;