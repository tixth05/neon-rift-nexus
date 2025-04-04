
import { useState } from "react";
import { Trophy, Users, TrendingUp, Search, ChevronDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock leaderboard data
const leaderboardData = [
  { id: 1, rank: 1, name: "CyberTrader", avatar: "🧑‍💻", totalValue: 24850.75, tokenCount: 6, profitPercent: 18.7, change: 2 },
  { id: 2, rank: 2, name: "NeonHunter", avatar: "🦹‍♀️", totalValue: 18320.50, tokenCount: 8, profitPercent: 15.2, change: 0 },
  { id: 3, rank: 3, name: "PixelMaster", avatar: "🧙‍♂️", totalValue: 15750.25, tokenCount: 5, profitPercent: 12.8, change: 1 },
  { id: 4, rank: 4, name: "RiftWalker", avatar: "🦸‍♂️", totalValue: 12430.80, tokenCount: 4, profitPercent: 10.5, change: -2 },
  { id: 5, rank: 5, name: "CyberQueen", avatar: "👸", totalValue: 10870.60, tokenCount: 7, profitPercent: 9.2, change: 3 },
  { id: 6, rank: 6, name: "TokenWhale", avatar: "🐋", totalValue: 9540.30, tokenCount: 3, profitPercent: 8.1, change: -1 },
  { id: 7, rank: 7, name: "DigitalNomad", avatar: "🧳", totalValue: 8320.15, tokenCount: 5, profitPercent: 7.4, change: 0 },
  { id: 8, rank: 8, name: "VirtualGhost", avatar: "👻", totalValue: 7150.90, tokenCount: 6, profitPercent: 6.8, change: 4 },
  { id: 9, rank: 9, name: "CryptoWizard", avatar: "🧙", totalValue: 6420.75, tokenCount: 4, profitPercent: 5.9, change: 1 },
  { id: 10, rank: 10, name: "NeonDreamer", avatar: "😎", totalValue: 5780.40, tokenCount: 5, profitPercent: 5.2, change: -3 },
];

// Filter options
const timeFilters = ["All Time", "This Week", "This Month", "This Year"];
const typeFilters = ["Value", "Profit %", "Trade Volume"];

const Leaderboard = () => {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("All Time");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("Value");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic (simple mock)
  const filteredData = leaderboardData.filter(
    (user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold neon-text-blue mb-4">Leaderboard</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See who's leading the NeonRift ecosystem. Top traders and token holders compete for glory and rewards.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-cyber-dark border-cyber-blue/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Top Trader</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="text-2xl">{leaderboardData[0].avatar}</div>
                  <div>
                    <div className="text-xl font-bold">{leaderboardData[0].name}</div>
                    <p className="text-xs text-gray-400">${leaderboardData[0].totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-dark border-cyber-blue/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Traders</CardTitle>
                <Users className="h-4 w-4 text-cyber-blue-neon" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leaderboardData.length * 7}</div>
                <p className="text-xs text-gray-400">Users competing this week</p>
              </CardContent>
            </Card>
            
            <Card className="bg-cyber-dark border-cyber-blue/20">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Platform Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+24.5%</div>
                <p className="text-xs text-gray-400">Trading volume since last week</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <select
                  value={selectedTimeFilter}
                  onChange={(e) => setSelectedTimeFilter(e.target.value)}
                  className="appearance-none bg-cyber-dark border border-cyber-blue/20 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-cyber-blue-neon"
                >
                  {timeFilters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-blue" />
              </div>
              <div className="relative">
                <select
                  value={selectedTypeFilter}
                  onChange={(e) => setSelectedTypeFilter(e.target.value)}
                  className="appearance-none bg-cyber-dark border border-cyber-blue/20 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-cyber-blue-neon"
                >
                  {typeFilters.map((filter) => (
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyber-blue" />
              </div>
            </div>
            
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-cyber-dark border border-cyber-blue/20 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-1 focus:ring-cyber-blue-neon"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          {/* Leaderboard Table */}
          <Card className="bg-cyber-dark border-cyber-blue/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyber-blue/20">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trader</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Tokens</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Profit</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((user) => (
                    <tr 
                      key={user.id} 
                      className="border-b border-cyber-blue/10 hover:bg-cyber-blue/5 transition-colors"
                    >
                      <td className="px-4 py-4">
                        {user.rank <= 3 ? (
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
                            user.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' : 
                            user.rank === 2 ? 'bg-gray-400/20 text-gray-400' : 
                            'bg-amber-700/20 text-amber-700'
                          } font-bold`}>
                            {user.rank}
                          </span>
                        ) : (
                          <span className="text-gray-400 pl-2">{user.rank}</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{user.avatar}</div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-gray-400">Member since 2025</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-medium">
                        ${user.totalValue.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right">
                        {user.tokenCount}
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-green-500">
                        +{user.profitPercent}%
                      </td>
                      <td className="px-4 py-4 text-right">
                        {user.change === 0 ? (
                          <span className="text-gray-400">-</span>
                        ) : user.change > 0 ? (
                          <div className="flex items-center justify-end gap-1 text-green-500">
                            <ArrowUpRight size={14} />
                            <span>{user.change}</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1 text-red-500">
                            <ArrowDownRight size={14} />
                            <span>{Math.abs(user.change)}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* View More Button */}
          <div className="flex justify-center mt-8">
            <Button className="bg-cyber-blue hover:bg-cyber-blue-dark text-white px-8">
              View More
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
