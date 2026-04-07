import { motion } from "framer-motion";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import TrustedBy from "@/components/landing/TrustedBy";
import Composers from "@/components/landing/Composers";
import Footer from "@/components/landing/Footer";
import FloatingDownloadButtons from "@/components/landing/FloatingDownloadButtons";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingDownloadButtons />
      {/* Dark zone — matches hero bg image tone until Parceiros */}
      <div className="relative overflow-hidden bg-background">
        <Hero />
        <Features />
      </div>

      <TrustedBy />
      <Composers />
      <Footer />
    </div>
  );
};

export default Index;
