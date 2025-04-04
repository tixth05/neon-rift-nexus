
import { useState } from "react";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import TokenDisplaySection from "../components/home/TokenDisplaySection";
import GamesPreviewSection from "../components/home/GamesPreviewSection";
import LeaderboardPreview from "../components/home/LeaderboardPreview";
import CallToAction from "../components/home/CallToAction";
import AuthModal from "../components/auth/AuthModal";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <TokenDisplaySection />
      <GamesPreviewSection />
      <LeaderboardPreview />
      <CallToAction />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </Layout>
  );
};

export default Index;
