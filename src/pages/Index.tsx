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
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Large blue arc - animated drift */}
          <motion.div
            className="absolute w-[200%] h-[60%] rounded-[50%] opacity-55"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, hsl(216 100% 50% / 0.6), transparent 60%)',
              top: '5%',
              left: '-50%',
            }}
            animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Extra blue glow center */}
          <motion.div
            className="absolute w-[120%] h-[50%] rounded-[50%] opacity-40"
            style={{
              background: 'radial-gradient(ellipse at 40% 60%, hsl(216 100% 55% / 0.5), transparent 50%)',
              top: '10%',
              left: '-10%',
            }}
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Purple arc top-right - animated */}
          <motion.div
            className="absolute w-[140%] h-[50%] rounded-[50%] opacity-35"
            style={{
              background: 'radial-gradient(ellipse at 70% 0%, hsl(274 79% 66% / 0.4), transparent 55%)',
              top: '-10%',
              right: '-40%',
            }}
            animate={{ x: [0, -25, 0], y: [0, 10, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Blue sweep - animated */}
          <motion.div
            className="absolute w-[180%] h-[40%] opacity-40"
            style={{
              background: 'conic-gradient(from 200deg at 50% 80%, transparent 0deg, hsl(216 100% 50% / 0.6) 40deg, transparent 120deg)',
              top: '15%',
              left: '-40%',
            }}
            animate={{ rotate: [0, 3, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Purple sweep - animated */}
          <motion.div
            className="absolute w-[160%] h-[35%] opacity-20"
            style={{
              background: 'conic-gradient(from 340deg at 60% 30%, transparent 0deg, hsl(274 79% 66% / 0.45) 30deg, transparent 100deg)',
              top: '0%',
              right: '-30%',
            }}
            animate={{ rotate: [0, -2, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Bottom blue glow */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[30%] opacity-35"
            style={{
              background: 'linear-gradient(to top, hsl(216 100% 50% / 0.25), transparent)',
            }}
            animate={{ opacity: [0.35, 0.25, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

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
