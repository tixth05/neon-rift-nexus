
import { useState } from "react";
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Mock token data
const tokens = [
  { id: "nrf", name: "NeonRift", symbol: "NRF", price: 2.45, change: 5.2, balance: 150.5, icon: "🟦" },
  { id: "cbt", name: "CyberToken", symbol: "CBT", price: 0.87, change: -2.1, balance: 300.75, icon: "🟪" },
  { id: "ptk", name: "PixelToken", symbol: "PTK", price: 1.34, change: 1.7, balance: 75.25, icon: "⬜" },
  { id: "vtx", name: "VirtualX", symbol: "VTX", price: 5.21, change: 8.3, balance: 25.0, icon: "🟧" },
  { id: "ntk", name: "NeonToken", symbol: "NTK", price: 0.42, change: -0.5, balance: 500.0, icon: "🟩" },
];

const Exchange = () => {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [amount, setAmount] = useState("0");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Exchange rate calculation (mock)
  const exchangeRate = fromToken.price / toToken.price;
  const estimatedAmount = parseFloat(amount) * exchangeRate;
  
  // Mock transaction fee (0.5%)
  const fee = parseFloat(amount) * 0.005;
  
  // Handle token selection changes
  const handleFromTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = tokens.find(token => token.id === e.target.value) || tokens[0];
    if (selected.id === toToken.id) {
      // Swap tokens if same selection
      setToToken(fromToken);
    }
    setFromToken(selected);
  };
  
  const handleToTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = tokens.find(token => token.id === e.target.value) || tokens[1];
    if (selected.id === fromToken.id) {
      // Swap tokens if same selection
      setFromToken(toToken);
    }
    setToToken(selected);
  };
  
  // Handle token swap
  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };
  
  // Handle amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimal points
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };
  
  // Handle max amount
  const handleMaxAmount = () => {
    setAmount(fromToken.balance.toString());
  };
  
  // Refresh rates
  const handleRefreshRates = () => {
    setIsRefreshing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Just a visual effect - in a real app this would fetch new rates
      setIsRefreshing(false);
      toast({
        title: "Exchange rates updated",
        description: "Latest market rates have been fetched",
      });
    }, 1000);
  };
  
  // Handle exchange submission
  const handleExchange = () => {
    const numAmount = parseFloat(amount);
    
    // Validate amount
    if (numAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to exchange",
        variant: "destructive",
      });
      return;
    }
    
    // Check balance
    if (numAmount > fromToken.balance) {
      toast({
        title: "Insufficient balance",
        description: `Your ${fromToken.symbol} balance is too low for this exchange`,
        variant: "destructive",
      });
      return;
    }
    
    // Simulate successful exchange
    toast({
      title: "Exchange successful",
      description: `Exchanged ${numAmount} ${fromToken.symbol} for ${estimatedAmount.toFixed(4)} ${toToken.symbol}`,
    });
    
    // Reset form (in a real app, we would update balances from API)
    setAmount("0");
  };
  
  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold neon-text-blue mb-4">Token Exchange</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trade tokens seamlessly across the NeonRift ecosystem. Enjoy low fees and real-time exchange rates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Market Overview */}
            <div className="lg:col-span-1">
              <Card className="bg-cyber-dark border-cyber-blue/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Market</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-cyber-blue hover:text-cyber-blue-neon"
                      onClick={handleRefreshRates}
                    >
                      <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                    </Button>
                  </CardTitle>
                  <CardDescription>Current token market rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tokens.map(token => (
                      <div key={token.id} className="flex items-center justify-between p-2 border-b border-cyber-blue/10">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{token.icon}</span>
                          <div>
                            <p className="font-medium">{token.name}</p>
                            <p className="text-sm text-gray-400">{token.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${token.price.toFixed(2)}</p>
                          <p className={`text-sm ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {token.change >= 0 ? <ArrowUp size={12} className="inline" /> : <ArrowDown size={12} className="inline" />}
                            {Math.abs(token.change).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Exchange Interface */}
            <div className="lg:col-span-2">
              <Card className="bg-cyber-dark border-cyber-blue/20">
                <CardHeader>
                  <CardTitle>Exchange Tokens</CardTitle>
                  <CardDescription>Swap between tokens with real-time rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* From Token */}
                    <div className="p-4 border border-cyber-blue/20 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-400">From</label>
                        <div className="text-sm text-gray-400">
                          Balance: <span className="text-white">{fromToken.balance} {fromToken.symbol}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            className="w-full bg-cyber-dark text-white border border-cyber-blue/20 rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-cyber-blue-neon"
                            placeholder="0.00"
                          />
                        </div>
                        
                        <div className="w-1/3">
                          <select
                            value={fromToken.id}
                            onChange={handleFromTokenChange}
                            className="w-full bg-cyber-dark text-white border border-cyber-blue/20 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyber-blue-neon"
                          >
                            {tokens.map(token => (
                              <option key={token.id} value={token.id}>
                                {token.icon} {token.symbol}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-cyber-blue hover:text-cyber-blue-neon"
                          onClick={handleMaxAmount}
                        >
                          MAX
                        </Button>
                      </div>
                    </div>
                    
                    {/* Swap Button */}
                    <div className="flex justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-cyber-dark border border-cyber-blue/20 rounded-full h-10 w-10 hover:bg-cyber-blue/10"
                        onClick={handleSwapTokens}
                      >
                        <ArrowDown className="text-cyber-blue" />
                      </Button>
                    </div>
                    
                    {/* To Token */}
                    <div className="p-4 border border-cyber-blue/20 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-400">To</label>
                        <div className="text-sm text-gray-400">
                          Balance: <span className="text-white">{toToken.balance} {toToken.symbol}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={parseFloat(amount) > 0 ? estimatedAmount.toFixed(4) : "0"}
                            className="w-full bg-cyber-dark text-white border border-cyber-blue/20 rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-1 focus:ring-cyber-blue-neon"
                            placeholder="0.00"
                            readOnly
                          />
                        </div>
                        
                        <div className="w-1/3">
                          <select
                            value={toToken.id}
                            onChange={handleToTokenChange}
                            className="w-full bg-cyber-dark text-white border border-cyber-blue/20 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyber-blue-neon"
                          >
                            {tokens.map(token => (
                              <option key={token.id} value={token.id}>
                                {token.icon} {token.symbol}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Exchange Info */}
                    <div className="space-y-2 text-sm text-gray-400 p-2">
                      <div className="flex justify-between">
                        <span>Exchange Rate</span>
                        <span className="text-white">1 {fromToken.symbol} = {exchangeRate.toFixed(4)} {toToken.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee (0.5%)</span>
                        <span className="text-white">{fee.toFixed(4)} {fromToken.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>You will receive</span>
                        <span className="text-white">{estimatedAmount.toFixed(4)} {toToken.symbol}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-cyber-blue hover:bg-cyber-blue-dark text-white py-3"
                    onClick={handleExchange}
                  >
                    Exchange Now
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

export default Exchange;
