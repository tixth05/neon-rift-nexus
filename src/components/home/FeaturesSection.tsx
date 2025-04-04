
import { Coins, Gamepad2, BarChart2, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: string;
  index: number;
}

const FeatureCard = ({ title, description, icon, link, color, index }: FeatureCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      <Link 
        to={link}
        className={`block h-full cyber-panel rounded-lg p-6 transition-all duration-300 border border-${color}/30 hover:border-${color} hover:shadow-neon-${color.includes("blue") ? "blue" : color.includes("purple") ? "purple" : "green"}`}
      >
        <div className={`h-12 w-12 rounded-full bg-${color}/20 flex items-center justify-center mb-4 text-${color}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 cyber-font">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </Link>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      title: "Token Exchange",
      description: "Trade digital tokens across various games and platforms with our secure and fast exchange system.",
      icon: <Coins size={24} />,
      link: "/exchange",
      color: "cyber-blue",
    },
    {
      title: "Play-to-Earn Games",
      description: "Participate in immersive mini-games and earn tokens based on your skills and achievements.",
      icon: <Gamepad2 size={24} />,
      link: "/games",
      color: "cyber-green",
    },
    {
      title: "Leaderboards",
      description: "Compete with players worldwide and climb the ranks in our dynamic leaderboard system.",
      icon: <BarChart2 size={24} />,
      link: "/leaderboard",
      color: "cyber-purple",
    },
    {
      title: "User Dashboard",
      description: "Track your tokens, transaction history, and game performance in a customizable dashboard.",
      icon: <LayoutDashboard size={24} />,
      link: "/dashboard",
      color: "cyber-pink",
    },
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden bg-cyber-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform <span className="neon-text-blue">Features</span></h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Explore the core features of our cyberpunk-inspired digital token platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Abstract background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyber-blue/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyber-purple/10 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default FeaturesSection;
