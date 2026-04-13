import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Mail, User } from "lucide-react";
import iconDownload from "@/assets/icon-download.png";
import { supabase } from "@/integrations/supabase/client";

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  redirectUrl: string;
  plataforma: string;
}

const LeadFormModal = ({ open, onClose, redirectUrl, plataforma }: LeadFormModalProps) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase.from("leads").insert({
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        plataforma,
      });

      if (dbError) throw dbError;

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("trackCustom", "LeadCaptured", { plataforma });
      }

      window.open(redirectUrl, "_blank");
      onClose();
      setNome("");
      setEmail("");
      setTelefone("");
    } catch {
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="relative w-full max-w-[420px] overflow-hidden rounded-3xl shadow-[0_25px_60px_-15px_hsl(var(--primary)/0.3)]"
          >
            {/* Top accent gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />

            {/* Glow effects */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative bg-card border border-border/50 rounded-b-3xl p-7">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={iconDownload} alt="" className="w-11 h-11 object-contain" />
                </motion.div>
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold text-foreground leading-tight">
                    Quase lá! 🎵
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Preencha para liberar o download
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-border/60 my-4" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Nome */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full h-12 rounded-xl border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                    maxLength={100}
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="relative"
                >
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 rounded-xl border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                    maxLength={255}
                  />
                </motion.div>

                {/* Telefone */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <Smartphone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="tel"
                    placeholder="Seu telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full h-12 rounded-xl border border-input bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                    maxLength={20}
                  />
                </motion.div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-destructive font-medium"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 w-full h-13 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-sm tracking-wide hover:shadow-[0_8px_25px_-5px_hsl(var(--primary)/0.4)] transition-shadow duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>🔓 Liberar Download</>
                  )}
                </motion.button>

                <p className="text-[11px] text-muted-foreground/60 text-center mt-1">
                  Seus dados estão seguros e não serão compartilhados.
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadFormModal;
