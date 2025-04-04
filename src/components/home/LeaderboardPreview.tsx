
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Medal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for leaderboard preview
const tradersData = [
  { id: 1, rank: 1, username: "CyberTrader", avatar: "https://i.pravatar.cc/100?img=1", tokens: 45892, change: "+12.4%" },
  { id: 2, rank: 2, username: "NeonHunter", avatar: "https://i.pravatar.cc/100?img=2", tokens: 32567, change: "+8.7%" },
  { id: 3, rank: 3, username: "QuantumRift", avatar: "https://i.pravatar.cc/100?img=3", tokens: 29845, change: "+5.2%" },
  { id: 4, rank: 4, username: "SynthWave", avatar: "https://i.pravatar.cc/100?img=4", tokens: 26721, change: "+3.9%" },
  { id: 5, rank: 5, username: "BitRunner", avatar: "https://i.pravatar.cc/100?img=5", tokens: 21456, change: "+2.1%" },
];

const gamersData = [
  { id: 1, rank: 1, username: "NeuroLancer", avatar: "https://i.pravatar.cc/100?img=11", tokens: 38921, games: 124 },
  { id: 2, rank: 2, username: "NightCity", avatar: "https://i.pravatar.cc/100?img=12", tokens: 35782, games: 98 },
  { id: 3, rank: 3, username: "RiftRunner", avatar: "https://i.pravatar.cc/100?img=13", tokens: 32451, games: 156 },
  { id: 4, rank: 4, username: "TechMage", avatar: "https://i.pravatar.cc/100?img=14", tokens: 30126, games: 112 },
  { id: 5, rank: 5, username: "CyberSamurai", avatar: "https://i.pravatar.cc/100?img=15", tokens: 28753, games: 87 },
];

const LeaderboardPreview = () => {
  const [activeTab, setActiveTab] = useState("traders");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400";
      case 2:
        return "text-gray-300";
      case 3:
        return "text-amber-700";
      default:
        return "text-gray-400";
    }
  };

  return (
    <section className="py-20 bg-cyber-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 left-10 w-80 h-80 bg-cyber-purple/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 right-10 w-64 h-64 bg-cyber-blue/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top <span className="neon-text-purple">Performers</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Check out our top traders and gamers competing for glory and tokens
          </p>
        </motion.div>

        <div className="bg-cyber-dark rounded-lg border border-cyber-purple/20 shadow-md overflow-hidden max-w-4xl mx-auto">
          <Tabs 
            defaultValue="traders" 
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="border-b border-cyber-purple/20">
              <TabsList className="w-full bg-cyber-dark h-14 rounded-none">
                <TabsTrigger 
                  value="traders" 
                  className={`w-1/2 data-[state=active]:border-b-2 data-[state=active]:border-cyber-purple data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:neon-text-purple`}
                >
                  Top Traders
                </TabsTrigger>
                <TabsTrigger 
                  value="gamers" 
                  className={`w-1/2 data-[state=active]:border-b-2 data-[state=active]:border-cyber-green data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:neon-text-green`}
                >
                  Top Gamers
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="traders" className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-cyber-dark border-b border-cyber-purple/20">
                      <th className="px-4 py-3 text-left">Rank</th>
                      <th className="px-4 py-3 text-left">Trader</th>
                      <th className="px-4 py-3 text-right">Tokens</th>
                      <th className="px-4 py-3 text-right">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradersData.map((trader, index) => (
                      <motion.tr 
                        key={trader.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-b border-cyber-purple/10 hover:bg-cyber-purple/5`}
                      >
                        <td className="px-4 py-4">
                          <span className={`font-bold ${getRankColor(trader.rank)}`}>
                            {trader.rank <= 3 ? (
                              <Medal size={18} className="inline mr-1" />
                            ) : null}
                            #{trader.rank}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <img 
                              src={trader.avatar} 
                              alt={trader.username}
                              className="w-8 h-8 rounded-full mr-3 border border-cyber-purple/30"
                            />
                            <span>{trader.username}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right font-mono">
                          {trader.tokens.toLocaleString()} NCN
                        </td>
                        <td className="px-4 py-4 text-right text-green-500">
                          {trader.change}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="gamers" className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-cyber-dark border-b border-cyber-green/20">
                      <th className="px-4 py-3 text-left">Rank</th>
                      <th className="px-4 py-3 text-left">Gamer</th>
                      <th className="px-4 py-3 text-right">Tokens Earned</th>
                      <th className="px-4 py-3 text-right">Games Played</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gamersData.map((gamer, index) => (
                      <motion.tr 
                        key={gamer.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border-b border-cyber-green/10 hover:bg-cyber-green/5`}
                      >
                        <td className="px-4 py-4">
                          <span className={`font-bold ${getRankColor(gamer.rank)}`}>
                            {gamer.rank <= 3 ? (
                              <Medal size={18} className="inline mr-1" />
                            ) : null}
                            #{gamer.rank}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <img 
                              src={gamer.avatar} 
                              alt={gamer.username}
                              className="w-8 h-8 rounded-full mr-3 border border-cyber-green/30"
                            />
                            <span>{gamer.username}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right font-mono">
                          {gamer.tokens.toLocaleString()} NCN
                        </td>
                        <td className="px-4 py-4 text-right">
                          {gamer.games}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>

          <div className="p-4 border-t border-cyber-purple/20 bg-cyber-dark">
            <Button
              asChild
              variant="outline"
              className={activeTab === "traders" ? "neon-border-purple w-full" : "neon-border-green w-full"}
            >
              <Link to="/leaderboard">
                View Full Leaderboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;
