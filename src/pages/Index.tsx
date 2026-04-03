import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import WaveformDivider from "@/components/landing/WaveformDivider";
import TrustedBy from "@/components/landing/TrustedBy";
import Composers from "@/components/landing/Composers";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <WaveformDivider />
      <Features />
      <TrustedBy />
      <Composers />
      <Footer />
    </div>
  );
};

export default Index;
