import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Login form schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
});

// Registration form schema
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  // Password strength meter
  const calculatePasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "" };
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    let label = "";
    if (strength <= 2) label = "Weak";
    else if (strength <= 4) label = "Medium";
    else label = "Strong";
    
    return { strength, label };
  };

  const passwordStrength = calculatePasswordStrength(registerForm.watch("password"));

  // Form submissions
  const onLoginSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful",
        description: "Welcome back to NeonRift",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden cityscape-bg">
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold neon-text-blue cyber-font">
              {isLogin ? "ACCESS PORTAL" : "REGISTER IDENTITY"}
            </h1>
            <p className="mt-2 text-gray-400">
              {isLogin 
                ? "Connect to the NeonRift platform" 
                : "Create your digital identity on NeonRift"}
            </p>
          </div>

          <div className="cyber-panel p-6 rounded-lg relative overflow-hidden">
            <div className="mb-6 flex justify-center">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`px-6 py-2 rounded-l-md transition-all duration-300 ${
                    isLogin 
                      ? "bg-cyber-blue text-white shadow-neon-blue" 
                      : "bg-transparent border border-gray-600 text-gray-400"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`px-6 py-2 rounded-r-md transition-all duration-300 ${
                    !isLogin 
                      ? "bg-cyber-purple text-white shadow-neon-purple" 
                      : "bg-transparent border border-gray-600 text-gray-400"
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-300">
                              <Mail size={16} className="text-cyber-blue" />
                              Email
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="your@email.com"
                                  className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue-neon focus:shadow-neon-blue pl-10"
                                  {...field}
                                />
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              </div>
                            </FormControl>
                            <FormMessage className="flex items-center gap-2">
                              <AlertCircle size={14} className="text-red-500" />
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-300">
                              <Lock size={16} className="text-cyber-blue" />
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="••••••••"
                                  className="bg-cyber-dark border-cyber-blue/30 focus:border-cyber-blue-neon focus:shadow-neon-blue pl-10 pr-10"
                                  {...field}
                                />
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <button
                                  type="button"
                                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage className="flex items-center gap-2">
                              <AlertCircle size={14} className="text-red-500" />
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between">
                        <FormField
                          control={loginForm.control}
                          name="rememberMe"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-cyber-blue data-[state=checked]:border-cyber-blue"
                                />
                              </FormControl>
                              <FormLabel className="text-sm text-gray-400">Remember me</FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <a href="#" className="text-sm text-cyber-blue hover:text-cyber-blue-neon underline">
                          Forgot password?
                        </a>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-cyber-blue hover:bg-cyber-blue-dark text-white shadow-lg hover:shadow-neon-blue transition-all duration-300"
                        disabled={isLoading}
                      >
                        {isLoading ? "Connecting..." : "Login to NeonRift"}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 text-center">
                    <p className="text-gray-400">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setIsLogin(false)}
                        className="text-cyber-blue hover:text-cyber-blue-neon underline"
                      >
                        Register now
                      </button>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-300">
                              <User size={16} className="text-cyber-purple" />
                              Username
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="cybernaut"
                                  className="bg-cyber-dark border-cyber-purple/30 focus:border-cyber-purple focus:shadow-neon-purple pl-10"
                                  {...field}
                                />
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              </div>
                            </FormControl>
                            <FormMessage className="flex items-center gap-2">
                              <AlertCircle size={14} className="text-red-500" />
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-300">
                              <Mail size={16} className="text-cyber-purple" />
                              Email
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="your@email.com"
                                  className="bg-cyber-dark border-cyber-purple/30 focus:border-cyber-purple focus:shadow-neon-purple pl-10"
                                  {...field}
                                />
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              </div>
                            </FormControl>
                            <FormMessage className="flex items-center gap-2">
                              <AlertCircle size={14} className="text-red-500" />
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-300">
                              <Lock size={16} className="text-cyber-purple" />
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="••••••••"
                                  className="bg-cyber-dark border-cyber-purple/30 focus:border-cyber-purple focus:shadow-neon-purple pl-10 pr-10"
                                  {...field}
                                />
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <button
                                  type="button"
                                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                              </div>
                            </FormControl>
                            
                            {field.value && (
                              <div className="mt-2">
                                <div className="flex items-center justify-between">
                                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden flex">
                                    <div 
                                      className={`h-full transition-all duration-300 ${
                                        passwordStrength.label === "Weak" ? "bg-red-500 w-1/3" :
                                        passwordStrength.label === "Medium" ? "bg-yellow-500 w-2/3" :
                                        "bg-green-500 w-full"
                                      }`}
                                    ></div>
                                  </div>
                                  <span className={`text-xs ml-2 ${
                                    passwordStrength.label === "Weak" ? "text-red-500" :
                                    passwordStrength.label === "Medium" ? "text-yellow-500" :
                                    "text-green-500"
                                  }`}>
                                    {passwordStrength.label}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Password should be at least 8 characters with mix of letters, numbers & symbols
                                </p>
                              </div>
                            )}
                            
                            <FormMessage className="flex items-center gap-2">
                              <AlertCircle size={14} className="text-red-500" />
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-300">
                              <Lock size={16} className="text-cyber-purple" />
                              Confirm Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showConfirmPassword ? "text" : "password"}
                                  placeholder="••••••••"
                                  className="bg-cyber-dark border-cyber-purple/30 focus:border-cyber-purple focus:shadow-neon-purple pl-10 pr-10"
                                  {...field}
                                />
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <button
                                  type="button"
                                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage className="flex items-center gap-2">
                              <AlertCircle size={14} className="text-red-500" />
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="acceptTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-cyber-purple data-[state=checked]:border-cyber-purple"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm text-gray-400">
                                I agree to the{" "}
                                <a className="text-cyber-purple hover:text-cyber-purple-light underline">
                                  Terms of Service
                                </a>{" "}
                                and{" "}
                                <a className="text-cyber-purple hover:text-cyber-purple-light underline">
                                  Privacy Policy
                                </a>
                              </FormLabel>
                              <FormMessage className="flex items-center gap-2">
                                <AlertCircle size={14} className="text-red-500" />
                              </FormMessage>
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-cyber-purple hover:bg-cyber-purple-dark text-white shadow-lg hover:shadow-neon-purple transition-all duration-300"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Identity..." : "Register New Account"}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 text-center">
                    <p className="text-gray-400">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setIsLogin(true)}
                        className="text-cyber-purple hover:text-cyber-purple-light underline"
                      >
                        Login now
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
