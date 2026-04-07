import { motion } from "framer-motion";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import TrustedBy from "@/components/landing/TrustedBy";
import Composers from "@/components/landing/Composers";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Wrapper with animated background gradient curves */}
      <div className="relative overflow-hidden">
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
