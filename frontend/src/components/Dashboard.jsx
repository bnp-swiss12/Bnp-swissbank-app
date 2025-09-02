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
  Phone
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "../hooks/use-toast";

const Dashboard = ({ username, onLogout }) => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for Monicka's account
  const accountData = {
    mainAccount: {
      balance: 45750.85,
      iban: "CH93 0076 2011 6238 5295 7",
      accountNumber: "1623-8529-57"
    },
    savingsAccount: {
      balance: 128340.20,
      iban: "CH58 0076 2011 6238 5295 8"
    },
    creditCard: {
      balance: -2150.60,
      limit: 15000,
      cardNumber: "**** **** **** 8529"
    }
  };

  const recentTransactions = [
    {
      id: 1,
      type: "outgoing",
      description: "Migros Genève",
      amount: -87.45,
      date: "2025-01-27",
      category: "Alimentaire"
    },
    {
      id: 2,
      type: "incoming",
      description: "Salaire - Entreprise SA",
      amount: 8500.00,
      date: "2025-01-25",
      category: "Salaire"
    },
    {
      id: 3,
      type: "outgoing",
      description: "Loyer Appartement",
      amount: -1850.00,
      date: "2025-01-25",
      category: "Logement"
    },
    {
      id: 4,
      type: "outgoing",
      description: "Swisscom AG",
      amount: -89.90,
      date: "2025-01-24",
      category: "Télécommunications"
    },
    {
      id: 5,
      type: "incoming",
      description: "Remboursement assurance",
      amount: 450.00,
      date: "2025-01-23",
      category: "Assurance"
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-CH', {
      style: 'currency',
      currency: 'CHF'
    }).format(amount);
  };

  const handleQuickAction = (action) => {
    toast({
      title: `Action: ${action}`,
      description: "Cette fonctionnalité sera bientôt disponible.",
    });
  };

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
                <span className="text-green-600 font-medium">Online Banking</span>
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
                  <div className="text-sm font-medium text-gray-900">Bienvenue, {username}</div>
                  <div className="text-xs text-gray-500">Dernière connexion: {currentTime.toLocaleDateString('fr-CH')}</div>
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
            Bonjour {username} 👋
          </h1>
          <p className="text-gray-600">
            Voici un aperçu de vos comptes et de votre activité récente.
          </p>
        </div>

        {/* Account Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Main Account */}
          <Card className="border-l-4 border-l-green-600">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Compte Principal</CardTitle>
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
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
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
              <CardTitle className="text-lg font-medium">Compte Épargne</CardTitle>
              <p className="text-sm text-gray-600">Épargne 3a</p>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {balanceVisible ? formatCurrency(accountData.savingsAccount.balance) : "••••••"}
              </div>
              <p className="text-xs text-gray-500 mb-4">{accountData.savingsAccount.iban}</p>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.1% cette année
              </div>
            </CardContent>
          </Card>

          {/* Credit Card */}
          <Card className="border-l-4 border-l-orange-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Carte de Crédit</CardTitle>
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

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-medium">Actions Rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => handleQuickAction("Nouveau virement")}
              >
                <Send className="w-6 h-6 mb-2" />
                <span className="text-sm">Nouveau virement</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => handleQuickAction("Payer facture")}
              >
                <FileText className="w-6 h-6 mb-2" />
                <span className="text-sm">Payer facture</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => handleQuickAction("Demander carte")}
              >
                <CreditCard className="w-6 h-6 mb-2" />
                <span className="text-sm">Demander carte</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex-col"
                onClick={() => handleQuickAction("Contacter conseiller")}
              >
                <Phone className="w-6 h-6 mb-2" />
                <span className="text-sm">Contacter conseiller</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium">Transactions Récentes</CardTitle>
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
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
                      <div className="text-sm text-gray-500">{transaction.category} • {transaction.date}</div>
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
    </div>
  );
};

export default Dashboard;