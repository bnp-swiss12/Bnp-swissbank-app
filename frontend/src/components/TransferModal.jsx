import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Send, AlertCircle, CheckCircle2, Building2, User } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const TransferModal = ({ isOpen, onClose, onTransferSuccess, currentBalance }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    beneficiaryName: "",
    beneficiaryIban: "",
    beneficiaryAddress: "",
    amount: "",
    reference: "",
    urgency: "standard",
    executionDate: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  const { toast } = useToast();

  const validateIban = (iban) => {
    // Simplified IBAN validation for Swiss accounts
    const cleanIban = iban.replace(/\s/g, '');
    const swissIbanRegex = /^CH\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d$/;
    return swissIbanRegex.test(iban) && cleanIban.length === 21;
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
      newErrors.beneficiaryIban = "L'IBAN est requis";
    } else if (!validateIban(formData.beneficiaryIban)) {
      newErrors.beneficiaryIban = "Format IBAN invalide (format suisse attendu)";
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
    } else if (amount > currentBalance) {
      newErrors.amount = "Solde insuffisant";
    } else if (amount > 100000) {
      newErrors.amount = "Montant maximum : CHF 100'000.-";
    }
    
    if (!formData.reference.trim()) {
      newErrors.reference = "La référence de paiement est requise";
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
    
    // Simulate bank processing time
    setTimeout(() => {
      const transferData = {
        ...formData,
        amount: parseFloat(formData.amount),
        timestamp: new Date().toISOString(),
        transactionId: `TXN${Date.now()}`
      };
      
      onTransferSuccess(transferData);
      
      toast({
        title: "Virement exécuté avec succès",
        description: `CHF ${formData.amount} transféré à ${formData.beneficiaryName}`,
      });
      
      // Reset form and close
      setFormData({
        beneficiaryName: "",
        beneficiaryIban: "",
        beneficiaryAddress: "",
        amount: "",
        reference: "",
        urgency: "standard",
        executionDate: new Date().toISOString().split('T')[0]
      });
      setStep(1);
      setIsLoading(false);
      onClose();
    }, 3000);
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <Send className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Nouveau Virement SEPA
          </DialogTitle>
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && <div className={`w-8 h-0.5 ${step > stepNum ? 'bg-green-600' : 'bg-gray-200'}`} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </DialogHeader>

        {/* Step 1: Beneficiary Details */}
        {step === 1 && (
          <div className="space-y-6 mt-6">
            <div className="text-center text-sm text-gray-600">
              Étape 1/3 : Informations du bénéficiaire
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="beneficiaryName" className="text-sm font-medium text-gray-700">
                  Nom du bénéficiaire *
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="beneficiaryName"
                    name="beneficiaryName"
                    value={formData.beneficiaryName}
                    onChange={handleInputChange}
                    placeholder="Nom complet du destinataire"
                    className={`pl-10 ${errors.beneficiaryName ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.beneficiaryName && (
                  <p className="text-red-500 text-sm mt-1">{errors.beneficiaryName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="beneficiaryIban" className="text-sm font-medium text-gray-700">
                  IBAN du bénéficiaire *
                </Label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="beneficiaryIban"
                    name="beneficiaryIban"
                    value={formData.beneficiaryIban}
                    onChange={handleInputChange}
                    placeholder="CH93 0076 2011 XXXX XXXX X"
                    className={`pl-10 font-mono ${errors.beneficiaryIban ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.beneficiaryIban && (
                  <p className="text-red-500 text-sm mt-1">{errors.beneficiaryIban}</p>
                )}
              </div>

              <div>
                <Label htmlFor="beneficiaryAddress" className="text-sm font-medium text-gray-700">
                  Adresse du bénéficiaire *
                </Label>
                <Textarea
                  id="beneficiaryAddress"
                  name="beneficiaryAddress"
                  value={formData.beneficiaryAddress}
                  onChange={handleInputChange}
                  placeholder="Adresse complète (rue, ville, code postal, pays)"
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
              <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                Suivant
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Transfer Details */}
        {step === 2 && (
          <div className="space-y-6 mt-6">
            <div className="text-center text-sm text-gray-600">
              Étape 2/3 : Détails du virement
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                  Montant *
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
                    max="100000"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className={`pl-12 text-right ${errors.amount ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Solde disponible: {formatCurrency(currentBalance)}
                </p>
              </div>

              <div>
                <Label htmlFor="reference" className="text-sm font-medium text-gray-700">
                  Référence de paiement *
                </Label>
                <Input
                  id="reference"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  placeholder="Motif du virement"
                  className={`${errors.reference ? 'border-red-500' : ''}`}
                />
                {errors.reference && (
                  <p className="text-red-500 text-sm mt-1">{errors.reference}</p>
                )}
              </div>

              <div>
                <Label htmlFor="urgency" className="text-sm font-medium text-gray-700">
                  Type de virement
                </Label>
                <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({...prev, urgency: value}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (1-2 jours) - Gratuit</SelectItem>
                    <SelectItem value="express">Express (4h) - CHF 10.-</SelectItem>
                    <SelectItem value="instant">Instantané (30s) - CHF 25.-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="executionDate" className="text-sm font-medium text-gray-700">
                  Date d'exécution
                </Label>
                <Input
                  id="executionDate"
                  name="executionDate"
                  type="date"
                  value={formData.executionDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="flex justify-between space-x-4">
              <Button variant="outline" onClick={handlePrevious}>
                Précédent
              </Button>
              <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                Suivant
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6 mt-6">
            <div className="text-center text-sm text-gray-600">
              Étape 3/3 : Confirmation du virement
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {formatCurrency(parseFloat(formData.amount))}
                </div>
                <p className="text-gray-600">sera transféré à</p>
                <p className="font-semibold text-gray-900">{formData.beneficiaryName}</p>
              </div>
              
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">IBAN bénéficiaire:</span>
                  <span className="font-mono">{formData.beneficiaryIban}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Référence:</span>
                  <span>{formData.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="capitalize">{formData.urgency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date d'exécution:</span>
                  <span>{new Date(formData.executionDate).toLocaleDateString('fr-CH')}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Confirmation requise</p>
                  <p>Une fois confirmé, ce virement sera traité selon les conditions spécifiées et ne pourra plus être annulé.</p>
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
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Traitement en cours...</span>
                  </div>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirmer le virement
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