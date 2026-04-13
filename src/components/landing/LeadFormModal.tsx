import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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

      // Track event
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("trackCustom", "LeadCaptured", { plataforma });
      }

      // Redirect after saving
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
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-foreground mb-1">
              Quase lá! 🎵
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              Preencha seus dados para liberar o download.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                maxLength={100}
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                maxLength={255}
              />
              <input
                type="tel"
                placeholder="Seu telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                maxLength={20}
              />

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full h-12 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "🔓 Liberar Download"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadFormModal;
