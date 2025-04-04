
import { useState } from "react";
import { X, Mail, Lock, AlertCircle, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleRedirectToLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 z-50"
          >
            <div className="cyber-panel rounded-lg overflow-hidden relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              
              {/* Header */}
              <div className="p-6 pb-2">
                <h2 className="text-2xl font-bold neon-text-blue cyber-font">ACCESS PORTAL</h2>
                <p className="text-gray-400 mt-1">Connect to the NeonRift platform</p>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-center text-gray-300 mb-6">
                  To access all features of NeonRift, please sign in to your account
                </p>
                
                <Button
                  onClick={handleRedirectToLogin}
                  className="w-full bg-cyber-blue hover:bg-cyber-blue-dark text-white shadow-lg hover:shadow-neon-blue transition-all duration-300 mb-4"
                >
                  Go to Login Page
                </Button>
                
                <p className="text-center text-gray-400 text-sm">
                  Don't have an account yet? You can register on the login page.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
