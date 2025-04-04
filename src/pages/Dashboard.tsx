
import { useState } from "react";
import { BarChart3, Wallet, ArrowDownRight, ArrowUpRight, DollarSign, BarChart2, RefreshCw } from "lucide-react";
import Layout from "../components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock user data
const userData = {
  name: "Cyber User",
  balance: 1250.75,
  totalTokens: 4,
  profits: 287.21,
  profitPercentage: 12.4,
};

// Mock token holdings
const tokenHoldings = [
  { id: "nrf", name: "NeonRift", symbol: "NRF", amount: 150.5, value: 368.73, change: 5.2, icon: "🟦" },
  { id: "cbt", name: "CyberToken", symbol: "CBT", amount: 300.75, value: 261.65, change: -2.1, icon: "🟪" },
  { id: "ptk", name: "PixelToken", symbol: "PTK", amount: 75.25, value: 100.84, change: 1.7, icon: "⬜" },
  { id: "vtx", name: "VirtualX", symbol: "VTX", amount: 25.0, value: 130.25, change: 8.3, icon: "🟧" },
  { id: "ntk", name: "NeonToken", symbol: "NTK", amount: 500.0, value: 210.0, change: -0.5, icon: "🟩" },
];

// Mock recent transactions
const recentTransactions = [
  { id: 1, type: "buy", token: "NRF", amount: 50, value: 122.50, date: "2025-04-03" },
  { id: 2, type: "sell", token: "CBT", amount: 30, value: 26.10, date: "2025-04-02" },
  { id: 3, type: "exchange", fromToken: "PTK", toToken: "VTX", fromAmount: 20, toAmount: 5.2, date: "2025-04-01" },
  { id: 4, type: "buy", token: "NTK", amount: 100, value: 42.00, date: "2025-03-30" },
];

const Dashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Refresh data (mock functionality)
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };
  
  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold neon-text-blue">Dashboard</h1>
              <p className="text-gray-400 mt-2">Welcome back, {userData.name}</p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                className="text-cyber-blue border-cyber-blue/50"
                onClick={handleRefresh}
              >
                <RefreshCw size={16} className={isRefreshing ? "animate-spin mr-2" : "mr-2"} />
                Refresh
              </Button>
              <Button className="bg-cyber-blue hover:bg-cyber-blue-dark text-white">
                <Link to="/exchange" className="flex items-center">
                  Start Trading
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-cyber-dark border-cyber-blue/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <Wallet className="h-4 w-4 text-cyber-blue-neon" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${userData.balance.toFixed(2)}</div>
                <p className="text-xs text-gray-400">Across {userData.totalTokens} tokens</p>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-dark border-cyber-blue/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Profit/Loss</CardTitle>
                {userData.profitPercentage >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${Math.abs(userData.profits).toFixed(2)}
                </div>
                <p className={`text-xs ${userData.profitPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {userData.profitPercentage >= 0 ? '+' : '-'}{Math.abs(userData.profitPercentage).toFixed(1)}% all time
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-dark border-cyber-blue/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Top Token</CardTitle>
                <DollarSign className="h-4 w-4 text-cyber-blue-neon" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center">
                  {tokenHoldings[0].icon} {tokenHoldings[0].symbol}
                </div>
                <p className="text-xs text-gray-400">
                  ${tokenHoldings[0].value.toFixed(2)} ({tokenHoldings[0].amount.toFixed(2)})
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-dark border-cyber-blue/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Activity</CardTitle>
                <BarChart2 className="h-4 w-4 text-cyber-blue-neon" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentTransactions.length}</div>
                <p className="text-xs text-gray-400">Transactions this week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Token Holdings */}
            <div className="lg:col-span-2">
              <Card className="bg-cyber-dark border-cyber-blue/20">
                <CardHeader>
                  <CardTitle>Token Holdings</CardTitle>
                  <CardDescription>Your current token portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tokenHoldings.map(token => (
                      <div key={token.id} className="flex items-center justify-between p-3 border border-cyber-blue/10 rounded-lg hover:bg-cyber-blue/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{token.icon}</span>
                          <div>
                            <p className="font-medium">{token.name}</p>
                            <p className="text-xs text-gray-400">{token.amount.toFixed(2)} {token.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${token.value.toFixed(2)}</p>
                          <p className={`text-xs ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {token.change >= 0 ? '+' : ''}{token.change.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full border-cyber-blue/50 hover:bg-cyber-blue/10">
                    <Link to="/exchange">Trade Tokens</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card className="bg-cyber-dark border-cyber-blue/20">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map(transaction => (
                      <div key={transaction.id} className="border-b border-cyber-blue/10 pb-3 last:border-none">
                        <div className="flex justify-between items-start">
                          <div>
                            {transaction.type === "exchange" ? (
                              <p className="font-medium">
                                Exchanged {transaction.fromToken} to {transaction.toToken}
                              </p>
                            ) : (
                              <p className="font-medium">
                                {transaction.type === "buy" ? "Bought" : "Sold"} {transaction.token}
                              </p>
                            )}
                            <p className="text-xs text-gray-400">{transaction.date}</p>
                          </div>
                          <div className="text-right">
                            {transaction.type === "exchange" ? (
                              <p className="font-medium">
                                {transaction.fromAmount} → {transaction.toAmount}
                              </p>
                            ) : (
                              <p className="font-medium">
                                {transaction.type === "buy" ? "+" : "-"}{transaction.amount} 
                                <span className="text-xs ml-1 text-gray-400">(${transaction.value.toFixed(2)})</span>
                              </p>
                            )}
                            <p className={`text-xs ${transaction.type === "buy" ? "text-green-500" : transaction.type === "sell" ? "text-red-500" : "text-cyber-blue"}`}>
                              {transaction.type === "buy" ? "Purchase" : transaction.type === "sell" ? "Sale" : "Exchange"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full text-cyber-blue hover:text-cyber-blue-neon">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
