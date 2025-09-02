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
  CreditCard as CreditCardIcon
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
    mainAccount: {
      balance: 50247.63,
      iban: "CH93 0076 2011 6238 5295 7",
      accountNumber: "1623-8529-57"
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
      type: "outgoing",
      description: "Coop Genève Centre",
      amount: -156.80,
      date: "2025-01-27",
      category: "Alimentaire",
      reference: "CB 2025-01-27 14:32"
    },
    {
      id: 2,
      type: "incoming",
      description: "Salaire Entreprise Suisse SA",
      amount: 7850.00,
      date: "2025-01-25",
      category: "Salaire",
      reference: "VIR MENSUEL JANVIER"
    },
    {
      id: 3,
      type: "outgoing",
      description: "Loyer Résidence Lac Léman",
      amount: -2200.00,
      date: "2025-01-25",
      category: "Logement",
      reference: "VIR PERMANENT"
    },
    {
      id: 4,
      type: "outgoing",
      description: "Swisscom Mobile AG",
      amount: -95.50,
      date: "2025-01-24",
      category: "Télécommunications",
      reference: "PRELEVEMENT MENSUEL"
    },
    {
      id: 5,
      type: "incoming",
      description: "Remboursement Assurance Maladie",
      amount: 580.50,
      date: "2025-01-23",
      category: "Assurance",
      reference: "REMB. FRAIS MEDICAUX"
    }
  ]);

  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Clean up old transactions (simulate 24h expiry)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = new Date();
      setTransactions(prev => prev.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const diffHours = (now - transactionDate) / (1000 * 60 * 60);
        return diffHours < 24 || transaction.id <= 5; // Keep original transactions
      }));
    }, 60000); // Check every minute

    return () => clearInterval(cleanupInterval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleQuickAction = (action) => {
    if (action === "Nouveau virement") {
      setIsTransferModalOpen(true);
    } else {
      toast({
        title: `${action}`,
        description: "Fonctionnalité en cours de développement par nos équipes.",
      });
    }
  };

  const handleTransferSuccess = (transferData) => {
    // Update account balance
    setAccountData(prev => ({
      ...prev,
      mainAccount: {
        ...prev.mainAccount,
        balance: prev.mainAccount.balance - transferData.amount
      }
    }));

    // Add transaction
    const newTransaction = {
      id: Date.now(),
      type: "outgoing",
      description: `Virement vers ${transferData.beneficiaryName}`,
      amount: -transferData.amount,
      date: new Date().toISOString().split('T')[0],
      category: "Virement",
      reference: transferData.reference,
      temporary: true
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Simulate crediting the beneficiary (for demo purposes)
    setTimeout(() => {
      toast({
        title: "Virement exécuté",
        description: `${formatCurrency(transferData.amount)} transféré avec succès à ${transferData.beneficiaryName}`,
      });
    }, 1000);
  };

  const cardTypes = [
    {
      name: "Carte Maestro",
      number: "**** **** **** 8529",
      type: "Débit",
      status: "Active",
      color: "blue"
    },
    {
      name: "Carte Visa Premier",
      number: "**** **** **** 7841",
      type: "Crédit",
      status: "Active", 
      color: "gold"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
                <span className="text-green-600 font-medium">Banking Professional</span>
              </div>
            </div>

            {/* User info and actions */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {currentTime.toLocaleString('fr-CH')}
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Client Premium - {username}</div>
                  <div className="text-xs text-gray-500">Session active depuis {currentTime.toLocaleTimeString('fr-CH')}</div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onLogout}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Espace Client Premium 💎
          </h1>
          <p className="text-gray-600">
            Gestion complète de vos comptes et services bancaires professionnels.
          </p>
        </div>

        {/* Account Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Main Account */}
          <Card className="border-l-4 border-l-green-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Compte Courant</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                >
                  {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-600">{accountData.mainAccount.accountNumber}</p>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {balanceVisible ? formatCurrency(accountData.mainAccount.balance) : "••••••"}
              </div>
              <p className="text-xs text-gray-500 mb-4">{accountData.mainAccount.iban}</p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setIsTransferModalOpen(true)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Virement
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Savings Account */}
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Compte Épargne Plus</CardTitle>
              <p className="text-sm text-gray-600">Épargne 3a Fiscalement Optimisée</p>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {balanceVisible ? formatCurrency(accountData.savingsAccount.balance) : "••••••"}
              </div>
              <p className="text-xs text-gray-500 mb-4">{accountData.savingsAccount.iban}</p>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +3.2% rendement annuel
              </div>
            </CardContent>
          </Card>

          {/* Credit Card */}
          <Card className="border-l-4 border-l-orange-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Carte de Crédit Premium</CardTitle>
              <p className="text-sm text-gray-600">{accountData.creditCard.cardNumber}</p>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 mb-2">
                {balanceVisible ? formatCurrency(accountData.creditCard.balance) : "••••••"}
              </div>
              <div className="text-xs text-gray-500 mb-4">
                Limite: {formatCurrency(accountData.creditCard.limit)}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full" 
                  style={{ width: `${(Math.abs(accountData.creditCard.balance) / accountData.creditCard.limit) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cards Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-medium flex items-center">
              <CreditCardIcon className="w-6 h-6 mr-2" />
              Mes Cartes Bancaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {cardTypes.map((card, index) => (
                <div key={index} className={`p-6 rounded-xl text-white relative overflow-hidden ${
                  card.color === 'blue' ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 
                  'bg-gradient-to-br from-yellow-500 to-yellow-700'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm opacity-90">{card.type}</p>
                      <p className="font-semibold">{card.name}</p>
                    </div>
                    <div className="text-sm font-medium px-2 py-1 bg-white bg-opacity-20 rounded">
                      {card.status}
                    </div>
                  </div>
                  <div className="text-lg font-mono tracking-wider mb-4">
                    {card.number}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Exp: 12/28</span>
                    <span>CVC: ***</span>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                  <div className="absolute top-6 right-6 w-8 h-8 bg-white bg-opacity-20 rounded-full"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-medium">Services Bancaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-green-50"
                onClick={() => handleQuickAction("Nouveau virement")}
              >
                <Send className="w-6 h-6 mb-2 text-green-600" />
                <span className="text-sm">Virement SEPA</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-blue-50"
                onClick={() => handleQuickAction("Payer facture")}
              >
                <FileText className="w-6 h-6 mb-2 text-blue-600" />
                <span className="text-sm">Paiement facture</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-purple-50"
                onClick={() => handleQuickAction("Demander crédit")}
              >
                <Banknote className="w-6 h-6 mb-2 text-purple-600" />
                <span className="text-sm">Crédit personnel</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col hover:bg-orange-50"
                onClick={() => handleQuickAction("Contacter conseiller")}
              >
                <Phone className="w-6 h-6 mb-2 text-orange-600" />
                <span className="text-sm">Conseiller privé</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium">Opérations Récentes</CardTitle>
              <Button variant="outline" size="sm">
                Historique complet
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className={`flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                  transaction.temporary ? 'bg-yellow-50 border-yellow-200' : ''
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'incoming' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'incoming' ? 
                        <ArrowDownLeft className="w-5 h-5 text-green-600" /> : 
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      }
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                      <div className="text-sm text-gray-500">
                        {transaction.reference} • {transaction.date}
                        {transaction.temporary && <span className="ml-2 text-yellow-600">• Temporaire (24h)</span>}
                      </div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Transfer Modal */}
      <TransferModal 
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onTransferSuccess={handleTransferSuccess}
        currentBalance={accountData.mainAccount.balance}
      />
    </div>
  );
};

export default Dashboard;