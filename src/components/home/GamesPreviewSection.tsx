
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";

// Mock games data
const mockGames = [
  {
    id: 1,
    title: "Neon Runner",
    description: "Race through a cyberpunk city avoiding obstacles and collecting tokens",
    image: "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf",
    reward: "Up to 500 NCN",
    players: "2.5K",
  },
  {
    id: 2,
    title: "Cyber Puzzle",
    description: "Solve complex puzzles to hack into the system and earn tokens",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    reward: "Up to 300 NCN",
    players: "1.8K",
  },
  {
    id: 3,
    title: "Rift Battles",
    description: "Strategic card game where you build decks and battle other players",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23",
    reward: "Up to 750 NCN",
    players: "4.2K",
  },
];

const GameCard = ({ game, index }: { game: typeof mockGames[0], index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 30 },
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
      className="group relative overflow-hidden rounded-lg h-full"
    >
      {/* Game image */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent"></div>
      </div>
      
      {/* Game info */}
      <div className="relative p-6 cyber-panel border-t-0 rounded-b-lg transform -translate-y-4">
        <h3 className="text-xl font-bold mb-2 cyber-font neon-text-blue">{game.title}</h3>
        <p className="text-gray-400 mb-4">{game.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Trophy size={16} className="text-cyber-yellow" />
            <span className="ml-2 text-sm text-cyber-yellow-neon">{game.reward}</span>
          </div>
          <span className="text-sm text-gray-400">{game.players} players</span>
        </div>
        
        <Link 
          to={`/games/${game.id}`}
          className="block w-full text-center py-2 neon-button"
        >
          Play Now
        </Link>
      </div>
    </motion.div>
  );
};

const GamesPreviewSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-cyber-dark relative overflow-hidden">
      {/* Grid lines background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[linear-gradient(0deg,transparent_24%,#00f3ff_25%,#00f3ff_26%,transparent_27%,transparent_74%,#00f3ff_75%,#00f3ff_76%,transparent_77%,transparent)] bg-[size:80px_80px]"></div>
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[linear-gradient(90deg,transparent_24%,#00f3ff_25%,#00f3ff_26%,transparent_27%,transparent_74%,#00f3ff_75%,#00f3ff_76%,transparent_77%,transparent)] bg-[size:80px_80px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Play-to-<span className="neon-text-green">Earn</span> Games
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Compete in futuristic games to earn tokens and climb the leaderboards
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {mockGames.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            className="bg-gradient-to-r from-cyber-green to-cyber-blue text-white border border-cyber-green/50 shadow-neon-green transition-all duration-300 hover:shadow-neon-blue"
          >
            <Link to="/games">
              Explore All Games <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GamesPreviewSection;
