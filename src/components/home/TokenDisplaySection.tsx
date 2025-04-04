
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

// Mock token data
const mockTokens = [
  { id: 1, name: "NeonCoin", symbol: "NCN", price: 23.45, change: 5.67, volume: "1.2M", color: "cyber-blue" },
  { id: 2, name: "RiftToken", symbol: "RFT", price: 7.82, change: -2.34, volume: "890K", color: "cyber-purple" },
  { id: 3, name: "CyberCredit", symbol: "CBC", price: 0.65, change: 12.44, volume: "3.5M", color: "cyber-green" },
  { id: 4, name: "NexusByte", symbol: "NBT", price: 134.21, change: -1.02, volume: "456K", color: "cyber-pink" },
];

const TokenCard = ({ token, index }: { token: typeof mockTokens[0], index: number }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className="cyber-panel rounded-lg p-4 transition-all duration-300 hover:border-cyber-blue hover:shadow-neon-blue"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full bg-${token.color}/20 flex items-center justify-center text-${token.color}`}>
            {token.symbol.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium">{token.name}</h3>
            <p className="text-sm text-gray-400">{token.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold">${token.price.toFixed(2)}</p>
          <p className={`text-sm ${token.change >= 0 ? "text-cyber-green" : "text-red-500"}`}>
            {token.change >= 0 ? "+" : ""}{token.change}%
          </p>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-cyber-blue/10 flex justify-between items-center">
        <p className="text-sm text-gray-400">Vol: {token.volume}</p>
        <Link to="/exchange" className="text-cyber-blue text-sm hover:underline hover:text-cyber-blue-neon">
          Trade
        </Link>
      </div>
    </motion.div>
  );
};

const TokenDisplaySection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const headingControls = useAnimation();

  useEffect(() => {
    if (inView) {
      headingControls.start({ opacity: 1, y: 0 });
    }
  }, [inView, headingControls]);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-cyber-black to-cyber-dark">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent"></div>
      <div className="absolute -top-40 right-10 w-80 h-80 bg-cyber-blue/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 left-10 w-64 h-64 bg-cyber-purple/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={headingControls}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Digital <span className="neon-text-blue">Tokens</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Explore and trade the most popular digital tokens on our secure exchange platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {mockTokens.map((token, index) => (
            <TokenCard key={token.id} token={token} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="neon-button"
          >
            <Link to="/exchange">
              View All Tokens <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TokenDisplaySection;
