import { Link } from "react-router-dom";
import { Twitter, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cyber-dark border-t border-cyber-blue/20 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <h2 className="text-xl font-bold neon-text-blue cyber-font">NEON<span className="neon-text-purple">RIFT</span></h2>
            </Link>
            <p className="mt-3 text-gray-400">
              The future of digital token exchange and play-to-earn gaming.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                <span>D</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 neon-text-blue">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/exchange" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  Token Exchange
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  Play-to-Earn Games
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  User Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 neon-text-blue">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 neon-text-blue">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-400 hover:text-cyber-blue-neon transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cyber-blue/10">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} NeonRift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
