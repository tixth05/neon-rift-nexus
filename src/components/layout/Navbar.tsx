
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, LogIn, BarChart2, Gamepad2, Coins, Menu, X
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  // For demo purposes, toggle login status
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-2 bg-cyber-dark/80 backdrop-blur-lg border-b border-cyber-blue/20" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold neon-text-blue cyber-font">NEON<span className="neon-text-purple">RIFT</span></h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/exchange" className="neon-text-blue hover:text-cyber-blue-neon flex items-center gap-2">
              <Coins size={18} />
              <span>Exchange</span>
            </Link>
            <Link to="/games" className="neon-text-blue hover:text-cyber-blue-neon flex items-center gap-2">
              <Gamepad2 size={18} />
              <span>Games</span>
            </Link>
            <Link to="/leaderboard" className="neon-text-blue hover:text-cyber-blue-neon flex items-center gap-2">
              <BarChart2 size={18} />
              <span>Leaderboard</span>
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Avatar className="border border-cyber-blue-neon hover:shadow-neon-blue transition-all duration-300">
                    <AvatarImage src="/images/avatar.png" />
                    <AvatarFallback className="bg-cyber-dark text-cyber-blue-neon">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Button 
                  onClick={toggleLogin} 
                  variant="outline" 
                  className="neon-button border-cyber-blue/50"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  onClick={toggleLogin} 
                  className="bg-cyber-blue hover:bg-cyber-blue-dark text-white flex items-center gap-2"
                >
                  <LogIn size={18} />
                  <span>Connect</span>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="neon-text-blue"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 cyber-panel rounded-md p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/exchange" className="neon-text-blue flex items-center gap-2 p-2 hover:bg-cyber-blue/10 rounded-md">
                <Coins size={18} />
                <span>Exchange</span>
              </Link>
              <Link to="/games" className="neon-text-blue flex items-center gap-2 p-2 hover:bg-cyber-blue/10 rounded-md">
                <Gamepad2 size={18} />
                <span>Games</span>
              </Link>
              <Link to="/leaderboard" className="neon-text-blue flex items-center gap-2 p-2 hover:bg-cyber-blue/10 rounded-md">
                <BarChart2 size={18} />
                <span>Leaderboard</span>
              </Link>

              {isLoggedIn ? (
                <div className="flex flex-col space-y-3 pt-2 border-t border-cyber-blue/20">
                  <Link to="/dashboard" className="flex items-center gap-2 p-2 hover:bg-cyber-blue/10 rounded-md">
                    <Avatar className="h-6 w-6 border border-cyber-blue-neon">
                      <AvatarImage src="/images/avatar.png" />
                      <AvatarFallback className="bg-cyber-dark text-cyber-blue-neon">
                        <User size={14} />
                      </AvatarFallback>
                    </Avatar>
                    <span className="neon-text-blue">Dashboard</span>
                  </Link>
                  <Button 
                    onClick={toggleLogin} 
                    variant="outline" 
                    className="neon-button border-cyber-blue/50"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="pt-2 border-t border-cyber-blue/20">
                  <Button 
                    onClick={toggleLogin} 
                    className="w-full bg-cyber-blue hover:bg-cyber-blue-dark text-white flex items-center justify-center gap-2"
                  >
                    <LogIn size={18} />
                    <span>Connect</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
