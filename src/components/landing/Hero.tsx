import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTA_LINK = "#"; // Replace with actual link

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide">
            Para Artistas
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
            Encontre um hit para{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              chamar de Seu
            </span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Acesse músicas dos compositores por trás dos maiores sucessos do Brasil e compre seu repertório em até 12x, com licenças automáticas em poucos cliques.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-[0_0_30px_hsl(250_80%_60%/0.3)] hover:shadow-[0_0_50px_hsl(250_80%_60%/0.4)] transition-all"
            >
              <a href={CTA_LINK} target="_blank" rel="noopener noreferrer">
                Explorar músicas agora
              </a>
            </Button>
          </div>

          <p className="mt-4 text-muted-foreground text-sm">(Gratuito para artistas)</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
