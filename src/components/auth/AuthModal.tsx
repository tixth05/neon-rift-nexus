
import { useState } from "react";
import { X, Mail, Lock, AlertCircle, Github, Google, Discord } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent, action: "login" | "signup") => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (action === "login") {
        toast({
          title: "Logged in successfully",
          description: "Welcome back to NeonRift",
        });
      } else {
        toast({
          title: "Account created successfully",
          description: "Welcome to NeonRift",
        });
      }
      onClose();
    }, 1500);
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate OAuth flow
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `Logged in with ${provider}`,
        description: "Welcome to NeonRift",
      });
      onClose();
    }, 1500);
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
              
              {/* Tabs */}
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4 px-6">
                  <TabsTrigger value="login" className="data-[state=active]:neon-text-blue">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:neon-text-purple">Signup</TabsTrigger>
                </TabsList>
                
                {/* Login Tab */}
                <TabsContent value="login" className="px-6 pb-6">
                  <form onSubmit={(e) => handleSubmit(e, "login")}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Mail size={16} />
                          <span>Email</span>
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue-neon focus:shadow-neon-blue"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Lock size={16} />
                          <span>Password</span>
                        </label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue-neon focus:shadow-neon-blue"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="remember"
                            className="rounded border-gray-600 bg-cyber-dark text-cyber-blue focus:ring-cyber-blue"
                          />
                          <label htmlFor="remember" className="text-sm text-gray-400">
                            Remember me
                          </label>
                        </div>
                        <a href="#" className="text-sm text-cyber-blue hover:text-cyber-blue-neon">
                          Forgot password?
                        </a>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-cyber-blue hover:bg-cyber-blue-dark"
                        disabled={isLoading}
                      >
                        {isLoading ? "Connecting..." : "Login to Account"}
                      </Button>
                    </div>
                  </form>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-cyber-dark text-gray-400">or continue with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOAuthLogin("Google")}
                      className="neon-button flex items-center justify-center"
                      disabled={isLoading}
                    >
                      <Google size={18} />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOAuthLogin("Discord")}
                      className="neon-button flex items-center justify-center"
                      disabled={isLoading}
                    >
                      <Discord size={18} />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOAuthLogin("GitHub")}
                      className="neon-button flex items-center justify-center"
                      disabled={isLoading}
                    >
                      <Github size={18} />
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Signup Tab */}
                <TabsContent value="signup" className="px-6 pb-6">
                  <form onSubmit={(e) => handleSubmit(e, "signup")}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="signup-email" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Mail size={16} />
                          <span>Email</span>
                        </label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          className="bg-cyber-dark border-cyber-purple/30 focus:border-cyber-purple focus:shadow-neon-purple"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="signup-password" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Lock size={16} />
                          <span>Password</span>
                        </label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          className="bg-cyber-dark border-cyber-purple/30 focus:border-cyber-purple focus:shadow-neon-purple"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-600 bg-cyber-dark text-cyber-purple focus:ring-cyber-purple"
                            required
                          />
                        </div>
                        <label htmlFor="terms" className="text-sm text-gray-400">
                          I agree to the{" "}
                          <a href="#" className="text-cyber-purple hover:text-cyber-purple-light">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-cyber-purple hover:text-cyber-purple-light">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-cyber-purple hover:bg-cyber-purple-dark"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </div>
                  </form>
                  
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-cyber-dark text-gray-400">or signup with</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOAuthLogin("Google")}
                      className="neon-button flex items-center justify-center"
                      disabled={isLoading}
                    >
                      <Google size={18} />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOAuthLogin("Discord")}
                      className="neon-button flex items-center justify-center"
                      disabled={isLoading}
                    >
                      <Discord size={18} />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleOAuthLogin("GitHub")}
                      className="neon-button flex items-center justify-center"
                      disabled={isLoading}
                    >
                      <Github size={18} />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
