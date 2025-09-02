import React, { useState, useEffect } from "react";
import { 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Eye, 
  EyeOff,
  Download,
  Send,
  Plus,
  Bell,
  Settings,
  LogOut,
  Home,
  PieChart,
  FileText,
  Phone,
  Banknote,
  Building2,
  CreditCard as CreditCardIcon,
  Lock,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "../hooks/use-toast";
import TransferModal from "./TransferModal";

const Dashboard = ({ username, onLogout }) => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [accountData, setAccountData] = useState({
    blockedAccount: {
      balance: 50247.63,
      iban: "CH93 0076 2011 6238 5295 7",
      accountNumber: "1623-8529-57",
      status: "BLOQUÉ TEMPORAIREMENT",
      reason: "Procédure de vérification en cours"
    },
    savingsAccount: {
      balance: 185430.89,
      iban: "CH58 0076 2011 6238 5295 8"
    },
    creditCard: {
      balance: -1850.45,
      limit: 25000,
      cardNumber: "**** **** **** 8529"
    }
  });
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "blocked",
      description: "BLOCAGE ADMINISTRATIF",
      amount: 0,
      date: "2025-01-27",
      category: "Sécurité",
      reference: "BLK-2025-0127-SEC",
      status: "ACTIF"
    },
    {
      id: 2,
      type: "outgoing",
      description: "Virement international - Smith John",
      amount: -5240.00,
      date: "2025-01-26",
      category: "Virement International",
      reference: "SWIFT: BNPAFRPPXXX",
      status: "EN ATTENTE DE DÉBLOCAGE"
    },
    {
      id: 3,
      type: "incoming",
      description: "Virement reçu - Entreprise Global SA",
      amount: 12500.00,
      date: "2025-01-25",
      category: "Virement International",
      reference: "REF: CONTRACT-2025-001",
      status: "BLOQUÉ - VÉRIFICATION"
    },
    {
      id: 4,
      type: "outgoing",
      description: "Tentative de virement - Dubai Bank",
      amount: -8750.50,
      date: "2025-01-24",
      category: "Virement International",
      reference: "AE07 0331 2345 6789 0123 456",
      status: "SUSPENDU"
    },
    {
      id: 5,
      type: "incoming",
      description: "Dépôt client - Cryptocurrency Exchange",
      amount: 25800.00,
      date: "2025-01-23",
      category: "Dépôt numérique",
      reference: "BTC-ETH-USDT-CONVERSION",
      status: "SOUS INVESTIGATION"
    }
  ]);

  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate periodic security checks
  useEffect(() => {
    const securityInterval = setInterval(() => {
      toast({
        title: "⚠️ Vérification de sécurité",
        description: "Système de surveillance active - Compte sous protection renforcée",
        variant: "destructive"
      });
    }, 300000); // Every 5 minutes

    return () => clearInterval(securityInterval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleQuickAction = (action) => {
    if (action === "Déblocage urgent") {
      toast({
        title: "🚨 Procédure de déblocage initiée",
        description: "Un conseiller spécialisé va vous contacter sous 24h pour la levée du blocage.",
        variant: "destructive"
      });
    } else if (action === "Virement d'urgence") {
      setIsTransferModalOpen(true);
    } else {
      toast({
        title: `${action}`,
        description: "Service disponible uniquement après déblocage du compte.",
        variant: "destructive"
      });
    }
  };

  const handleTransferSuccess = (transferData) => {
    // For blocked account, we don't actually deduct but show as pending
    const newTransaction = {
      id: Date.now(),
      type: "outgoing",
      description: `Virement urgent vers ${transferData.beneficiaryName}`,
      amount: -transferData.amount,
      date: new Date().toISOString().split('T')[0],
      category: "Virement d'urgence",
      reference: transferData.reference,
      status: "EN ATTENTE D'AUTORISATION",
      temporary: true
    };

    setTransactions(prev => [newTransaction, ...prev]);

    toast({
      title: "🔒 Virement en attente",
      description: `${formatCurrency(transferData.amount)} en cours de traitement. Autorisation requise.`,
      variant: "destructive"
    });
  };

  const cardTypes = [
    {
      name: "Carte Premium Bloquée",
      number: "**** **** **** 8529",
      type: "Débit - SUSPENDUE",
      status: "Bloquée",
      color: "red"
    },
    {
      name: "Carte Business Limitée",
      number: "**** **** **** 7841",
      type: "Crédit - RESTREINTE", 
      status: "Limitations actives",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Security Alert Banner */}
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">COMPTE SOUS SURVEILLANCE RENFORCÉE - ACCÈS LIMITÉ</span>
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
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
                <span className="text-red-600 font-medium">Espace Sécurisé - Accès Restreint</span>
              </div>
            </div>

            {/* User info and actions */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentTime.toLocaleString('fr-CH')}
              </div>
              <Button variant="ghost" size="sm" className="text-red-600">
                <Bell className="w-5 h-5" />
                <span className="ml-1 bg-red-600 text-white text-xs rounded-full px-1">!</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Client sous surveillance - {username}</div>
                  <div className="text-xs text-red-500">⚠️ Compte bloqué depuis le 27/01/2025</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onLogout}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion sécurisée
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Warning Section */}
        <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-start space-x-3">
            <Lock className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-2xl font-semibold text-red-900 mb-2">
                Compte Temporairement Bloqué 🔒
              </h1>
              <p className="text-red-700 mb-4">
                Votre compte fait l'objet d'une procédure de vérification de sécurité suite à des transactions inhabituelles. 
                Toutes les opérations sont temporairement suspendues pour votre protection.
              </p>
              <div className="bg-red-100 p-4 rounded border border-red-200">
                <p className="text-red-800 font-medium">Raison du blocage:</p>
                <p className="text-red-700">• Virements internationaux suspects détectés</p>
                <p className="text-red-700">• Activité de trading cryptocurrency signalée</p>
                <p className="text-red-700">• Montants élevés non justifiés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Blocked Account */}
          <Card className="border-l-4 border-l-red-600 bg-red-50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-red-600" />
                  <CardTitle className="text-lg font-medium text-red-900">Compte Bloqué</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                >
                  {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-red-600 font-medium">{accountData.blockedAccount.status}</p>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900 mb-2">
                ⚠️ {balanceVisible ? formatCurrency(accountData.blockedAccount.balance) : "••••••"}
              </div>
              <p className="text-xs text-gray-500 mb-2">{accountData.blockedAccount.iban}</p>
              <p className="text-xs text-red-600 mb-4">{accountData.blockedAccount.reason}</p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50"
                  onClick={() => handleQuickAction("Déblocage urgent")}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Déblocage
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50"
                  onClick={() => setIsTransferModalOpen(true)}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Savings Account */}
          <Card className="border-l-4 border-l-orange-600 bg-orange-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-orange-900">Épargne - Accès Limité</CardTitle>
              <p className="text-sm text-orange-600">Retraits suspendus</p>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900 mb-2">
                🔒 {balanceVisible ? formatCurrency(accountData.savingsAccount.balance) : "••••••"}
              </div>
              <p className="text-xs text-gray-500 mb-4">{accountData.savingsAccount.iban}</p>
              <div className="flex items-center text-orange-600 text-sm">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Accès suspendu temporairement
              </div>
            </CardContent>
          </Card>

          {/* Credit Card */}
          <Card className="border-l-4 border-l-red-600 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-red-900">Carte - Bloquée</CardTitle>
              <p className="text-sm text-red-600">{accountData.creditCard.cardNumber}</p>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 mb-2">
                🚫 {balanceVisible ? formatCurrency(accountData.creditCard.balance) : "••••••"}
              </div>
              <div className="text-xs text-gray-500 mb-4">
                Limite: {formatCurrency(accountData.creditCard.limit)}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full w-full opacity-50"></div>
              </div>
              <p className="text-xs text-red-600 mt-2">❌ Tous paiements bloqués</p>
            </CardContent>
          </Card>
        </div>

        {/* Cards Section */}
        <Card className="mb-8 bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-xl font-medium flex items-center text-red-900">
              <CreditCardIcon className="w-6 h-6 mr-2" />
              Cartes Bancaires - État Suspendu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {cardTypes.map((card, index) => (
                <div key={index} className={`p-6 rounded-xl text-white relative overflow-hidden ${
                  card.color === 'red' ? 'bg-gradient-to-br from-red-600 to-red-800' : 
                  'bg-gradient-to-br from-orange-500 to-orange-700'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm opacity-90">{card.type}</p>
                      <p className="font-semibold">{card.name}</p>
                    </div>
                    <div className="text-xs font-medium px-2 py-1 bg-white bg-opacity-20 rounded">
                      {card.status}
                    </div>
                  </div>
                  <div className="text-lg font-mono tracking-wider mb-4">
                    {card.number}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Exp: 12/28</span>
                    <span>🚫 BLOQUÉE</span>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Actions */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-xl font-medium text-orange-900">Actions d'Urgence Disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-orange-100 border-orange-300"
                onClick={() => handleQuickAction("Virement d'urgence")}
              >
                <Send className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm">Virement d'urgence</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-red-100 border-red-300"
                onClick={() => handleQuickAction("Déblocage urgent")}
              >
                <Lock className="w-6 h-6 mb-2 text-red-600" />
                <span className="text-sm">Déblocage urgent</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-blue-100 border-blue-300"
                onClick={() => handleQuickAction("Support juridique")}
              >
                <FileText className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm">Support juridique</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-purple-100 border-purple-300"
                onClick={() => handleQuickAction("Conseiller urgence")}
              >
                <Phone className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm">Conseiller urgence</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Blocked Transactions */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium text-red-900 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Opérations Suspendues & En Attente
              </CardTitle>
              <Button variant="outline" size="sm" className="border-red-300 text-red-600">
                Rapport complet
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                  transaction.type === 'blocked' ? 'bg-red-100 border-red-300' :
                  transaction.status?.includes('ATTENTE') ? 'bg-yellow-100 border-yellow-300' :
                  transaction.status?.includes('BLOQUÉ') ? 'bg-red-100 border-red-300' :
                  'bg-orange-100 border-orange-300'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'blocked' ? 'bg-red-200' :
                      transaction.type === 'incoming' ? 'bg-yellow-200' : 'bg-orange-200'
                    }`}>
                      {transaction.type === 'blocked' ? 
                        <Lock className="w-5 h-5 text-red-600" /> :
                        transaction.type === 'incoming' ? 
                        <ArrowDownLeft className="w-5 h-5 text-yellow-600" /> : 
                        <ArrowUpRight className="w-5 h-5 text-orange-600" />
                      }
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                      <div className="text-sm text-gray-600">
                        {transaction.reference} • {transaction.date}
                      </div>
                      <div className={`text-xs font-medium mt-1 ${
                        transaction.status?.includes('BLOQUÉ') ? 'text-red-600' :
                        transaction.status?.includes('ATTENTE') ? 'text-yellow-600' :
                        'text-orange-600'
                      }`}>
                        📍 {transaction.status}
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-yellow-600' : 
                    transaction.amount === 0 ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {transaction.amount === 0 ? 'BLOQUÉ' : 
                     transaction.amount > 0 ? `+${formatCurrency(transaction.amount)}` : 
                     formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Emergency Transfer Modal */}
      <TransferModal 
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onTransferSuccess={handleTransferSuccess}
        currentBalance={accountData.blockedAccount.balance}
        isEmergency={true}
      />
    </div>
  );
};

export default Dashboard;