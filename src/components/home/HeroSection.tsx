
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNextSection = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden grid-bg">
      {/* Animated background with scanlines effect */}
      <div className="absolute inset-0 bg-cyber-black">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(transparent_0%,_transparent_calc(100%_-_1px),_#00f3ff_100%)] bg-[length:100%_3px]"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid lines - horizontal */}
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[linear-gradient(0deg,transparent_24%,rgba(0,243,255,0.1)_25%,rgba(0,243,255,0.1)_26%,transparent_27%,transparent_74%,rgba(0,243,255,0.1)_75%,rgba(0,243,255,0.1)_76%,transparent_77%,transparent)] bg-[size:100%_8px]"></div>
        
        {/* Animated grid lines - vertical */}
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[linear-gradient(90deg,transparent_24%,rgba(0,243,255,0.1)_25%,rgba(0,243,255,0.1)_26%,transparent_27%,transparent_74%,rgba(0,243,255,0.1)_75%,rgba(0,243,255,0.1)_76%,transparent_77%,transparent)] bg-[size:8px_100%]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 pt-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className={`md:w-1/2 mb-10 md:mb-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="neon-text-blue">NEON</span>
              <span className="neon-text-purple">RIFT</span>
              <span className="block mt-2">DIGITAL NEXUS</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl">
              The future of token exchange and play-to-earn gaming in one cyberpunk-inspired platform. Trade digital assets, compete, and earn in our immersive ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-cyber-blue to-cyber-purple text-white border border-cyber-blue/50 shadow-neon-blue transition-all duration-300 hover:shadow-neon-purple"
              >
                <Link to="/exchange">
                  Start Trading <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="neon-button"
              >
                <Link to="/games">
                  Explore Games
                </Link>
              </Button>
            </div>
          </div>
          <div className={`md:w-2/5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              {/* Token 3D model placeholder */}
              <div className="w-full aspect-square bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 rounded-full flex items-center justify-center overflow-hidden border border-cyber-blue/30 animate-float shadow-neon-blue">
                <div className="w-4/5 h-4/5 rounded-full bg-gradient-to-br from-cyber-blue-neon to-cyber-purple flex items-center justify-center animate-spin-slow relative">
                  <div className="absolute inset-2 rounded-full bg-cyber-dark flex items-center justify-center">
                    <div className="text-6xl font-bold cyber-font neon-text-blue">NR</div>
                  </div>
                  {/* Orbital rings */}
                  <div className="absolute inset-0 border-2 border-cyber-blue/30 rounded-full transform rotate-45"></div>
                  <div className="absolute inset-4 border border-cyber-purple/30 rounded-full transform -rotate-45"></div>
                </div>
              </div>
              
              {/* Glowing particle effects */}
              <div className="absolute -top-5 -right-5 w-20 h-20 bg-cyber-blue/30 rounded-full filter blur-xl animate-pulse"></div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-cyber-purple/30 rounded-full filter blur-xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center mt-10 animate-bounce">
          <button onClick={scrollToNextSection} className="text-cyber-blue-neon" aria-label="Scroll down">
            <ChevronDown size={30} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
