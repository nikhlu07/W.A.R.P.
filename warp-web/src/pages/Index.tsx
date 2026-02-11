import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import MetricsSection from "@/components/home/MetricsSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import FlowDiagram from "@/components/home/FlowDiagram";
import FeaturesSection from "@/components/home/FeaturesSection";
import TechStackSection from "@/components/home/TechStackSection";
import CodeSection from "@/components/home/CodeSection";
import Ticker from "@/components/shared/Ticker";
import { isConnected } from "@/utils/auth";
import DashboardPage from "./DashboardPage";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { useEffect, useState } from "react";

const Index = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check connection status immediately
    setConnected(isConnected());
    // Stop loading after animation or immediately if already connected? 
    // Plan says "simulate loading delay", so we keep it true initially.
    // Actually, let's allow the LoadingScreen to control the delay via its onComplete callback.
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (connected) {
    return <DashboardPage />;
  }

  return (
    <div className="min-h-screen bg-warp-white flex flex-col">
      <Ticker />
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <MetricsSection />
        <ProblemSection />
        <SolutionSection />
        <FlowDiagram />
        <FeaturesSection />
        <TechStackSection />
        <CodeSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
