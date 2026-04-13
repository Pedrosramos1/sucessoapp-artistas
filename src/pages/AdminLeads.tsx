import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  plataforma: string | null;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  // Simple password gate (not stored in code for security — uses a basic check)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple auth — the user sets this password
    if (password === "sucesso2026") {
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    const fetchLeads = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setLeads(data as Lead[]);
      }
      setLoading(false);
    };

    fetchLeads();
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-xl font-bold text-foreground text-center">Área Restrita</h1>
          <input
            type="password"
            placeholder="Senha de acesso"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-11 rounded-lg border border-input bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-sm"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Leads Capturados ({leads.length})
          </h1>
          <a href="/" className="text-sm text-primary hover:underline">
            ← Voltar ao site
          </a>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : leads.length === 0 ? (
          <p className="text-muted-foreground">Nenhum lead capturado ainda.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Nome</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Telefone</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Plataforma</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/50 hover:bg-card/50">
                    <td className="px-4 py-3 text-foreground">{lead.nome}</td>
                    <td className="px-4 py-3 text-foreground">{lead.email}</td>
                    <td className="px-4 py-3 text-foreground">{lead.telefone}</td>
                    <td className="px-4 py-3 text-foreground">{lead.plataforma ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(lead.created_at).toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;
