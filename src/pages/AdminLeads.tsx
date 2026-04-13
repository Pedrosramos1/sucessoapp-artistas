import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Download } from "lucide-react";
import DateRangeFilter, { DateRange } from "@/components/admin/DateRangeFilter";

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
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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

    // Realtime subscription
    const channel = supabase
      .channel("leads-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          setLeads((prev) => [payload.new as Lead, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "leads" },
        (payload) => {
          setLeads((prev) => prev.filter((l) => l.id !== (payload.old as Lead).id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authenticated]);

  const filteredLeads = useMemo(() => {
    if (!dateRange.from && !dateRange.to) return leads;
    return leads.filter((lead) => {
      const leadDate = new Date(lead.created_at);
      leadDate.setHours(0, 0, 0, 0);
      const from = dateRange.from ? new Date(dateRange.from.setHours(0, 0, 0, 0)) : null;
      const to = dateRange.to ? new Date(dateRange.to.setHours(23, 59, 59, 999)) : null;
      if (from && to) return leadDate >= from && leadDate <= to;
      if (from) return leadDate >= from;
      return true;
    });
  }, [leads, dateRange]);

  const handleDownloadCSV = () => {
    if (filteredLeads.length === 0) return;

    const headers = ["Nome", "Email", "Telefone", "Plataforma", "Data"];
    const rows = filteredLeads.map((lead) => [
      lead.nome,
      lead.email,
      lead.telefone,
      lead.plataforma ?? "",
      new Date(lead.created_at).toLocaleString("pt-BR"),
    ]);

    const csvContent =
      "\uFEFF" +
      [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const fileName = dateFilter ? `leads_${dateFilter}.csv` : "leads.csv";
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Leads Capturados ({filteredLeads.length})
            </h1>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Tempo real ativo</span>
            </div>
          </div>
          <a href="/" className="text-sm text-primary hover:underline">
            ← Voltar ao site
          </a>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
          <div className="relative">
            <CalendarDays size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-10 rounded-lg border border-input bg-card pl-9 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {dateFilter && (
            <button
              onClick={() => setDateFilter("")}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Limpar filtro
            </button>
          )}
          <button
            onClick={handleDownloadCSV}
            disabled={filteredLeads.length === 0}
            className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <Download size={16} />
            Baixar planilha
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-muted-foreground">Carregando...</p>
        ) : filteredLeads.length === 0 ? (
          <p className="text-muted-foreground">Nenhum lead encontrado.</p>
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
                {filteredLeads.map((lead) => (
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
