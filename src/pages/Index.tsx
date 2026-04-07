import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import TrustedBy from "@/components/landing/TrustedBy";
import Composers from "@/components/landing/Composers";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Wrapper with background gradient curves spanning Hero → Features → TrustedBy */}
      <div className="relative overflow-hidden">
        {/* Background gradient curves */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Large sweeping arc - blue */}
          <div
            className="absolute w-[200%] h-[60%] rounded-[50%] opacity-30"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, hsl(216 100% 50% / 0.35), transparent 60%)',
              top: '5%',
              left: '-50%',
            }}
          />
          {/* Purple arc top-right */}
          <div
            className="absolute w-[140%] h-[50%] rounded-[50%] opacity-25"
            style={{
              background: 'radial-gradient(ellipse at 70% 0%, hsl(274 79% 66% / 0.3), transparent 55%)',
              top: '-10%',
              right: '-40%',
            }}
          />
          {/* Curved line effect - blue sweep */}
          <div
            className="absolute w-[180%] h-[40%] opacity-20"
            style={{
              background: 'conic-gradient(from 200deg at 50% 80%, transparent 0deg, hsl(216 100% 50% / 0.4) 40deg, transparent 120deg)',
              top: '15%',
              left: '-40%',
            }}
          />
          {/* Secondary purple sweep */}
          <div
            className="absolute w-[160%] h-[35%] opacity-15"
            style={{
              background: 'conic-gradient(from 340deg at 60% 30%, transparent 0deg, hsl(274 79% 66% / 0.35) 30deg, transparent 100deg)',
              top: '0%',
              right: '-30%',
            }}
          />
          {/* Bottom glow extending through sections */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[30%] opacity-20"
            style={{
              background: 'linear-gradient(to top, hsl(216 100% 50% / 0.15), transparent)',
            }}
          />
        </div>

        <Hero />
        <Features />
        <TrustedBy />
      </div>

      <Composers />
      <Footer />
    </div>
  );
};

export default Index;
