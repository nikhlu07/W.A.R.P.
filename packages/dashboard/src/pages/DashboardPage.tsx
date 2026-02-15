import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WarpBadge from "@/components/shared/WarpBadge";
import WarpCard from "@/components/shared/WarpCard";
import WarpButton from "@/components/shared/WarpButton";
import { revenueData } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Zap, Users, ExternalLink, Play, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";

const DashboardPage = () => {
  const [realTransactions, setRealTransactions] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [stats, setStats] = useState([
    { label: "TOTAL REVENUE", value: "0 STX", icon: TrendingUp, change: "+0%" },
    { label: "PAYMENTS TODAY", value: "0", icon: Zap, change: "+0" },
    { label: "UNIQUE AGENTS", value: "0", icon: Users, change: "+0" },
  ]);

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const response = await fetch('https://w-a-r-p-1.onrender.com/simulate-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (!data.success) {
        console.error("Simulation failed:", data.error);
        alert("Simulation failed: " + data.error);
      }
    } catch (e) {
      console.error("Error triggering simulation:", e);
      alert("Error triggering simulation.");
    } finally {
      setIsSimulating(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // Subscribe to new inserts
    const channel = supabase
      .channel('realtime:transactions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, (payload) => {
        setRealTransactions(prev => [payload.new, ...prev]);
        updateStats([payload.new, ...realTransactions]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching transactions:", error);
    } else if (data) {
      setRealTransactions(data);
      updateStats(data);
    }
  };

  const updateStats = (txs: any[]) => {
    // Basic aggregation
    const totalRev = txs.reduce((acc, tx) => acc + (parseFloat(tx.amount) || 0), 0);
    const today = new Date();
    const todayTxs = txs.filter(tx => new Date(tx.created_at).toDateString() === today.toDateString());
    const uniqueAgents = new Set(txs.map(tx => tx.sender)).size;

    setStats([
      { label: "TOTAL REVENUE", value: `${(totalRev / 1000000).toFixed(2)} STX`, icon: TrendingUp, change: "Live" },
      { label: "PAYMENTS TODAY", value: todayTxs.length.toString(), icon: Zap, change: "Live" },
      { label: "UNIQUE AGENTS", value: uniqueAgents.toString(), icon: Users, change: "Live" },
    ]);
  };

  const topAgents = [
    { name: "TradingAI", total: 89.3 },
    { name: "GPT-4-Agent", total: 67.1 },
    { name: "ResearchAI", total: 45.8 },
    { name: "DataBot-v3", total: 38.2 },
    { name: "PriceOracle", total: 29.7 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-14 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <WarpBadge>DASHBOARD</WarpBadge>
              <span className="font-mono text-xs text-muted-foreground">API Revenue Analytics — Live Data</span>
            </div>

            <WarpButton
              onClick={handleSimulate}
              disabled={isSimulating}
              className="flex items-center gap-2"
            >
              {isSimulating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              {isSimulating ? "SIMULATING..." : "SIMULATE TRAFFIC"}
            </WarpButton>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <WarpCard active>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase text-muted-foreground mb-1">{s.label}</div>
                      <div className="font-unbounded text-3xl font-extrabold">{s.value}</div>
                    </div>
                    <div className="bg-warp-yellow p-2 border border-warp-black">
                      <s.icon className="w-5 h-5 text-warp-black" />
                    </div>
                  </div>
                  <div className="mt-2 font-mono text-xs text-[#00aa00] font-bold">{s.change}</div>
                </WarpCard>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mb-8">
            {/* Chart */}
            <div className="lg:col-span-2">
              <WarpCard className="h-full">
                <div className="font-mono text-xs font-bold uppercase text-muted-foreground mb-4">
                  REVENUE OVER TIME (STX)
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <XAxis
                      dataKey="date"
                      tick={{ fontFamily: "JetBrains Mono", fontSize: 10 }}
                      axisLine={{ stroke: "#050505" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontFamily: "JetBrains Mono", fontSize: 10 }}
                      axisLine={{ stroke: "#050505" }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        fontFamily: "JetBrains Mono",
                        fontSize: "12px",
                        border: "2px solid #050505",
                        borderRadius: 0,
                        background: "#D9FF00",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#D9FF00"
                      strokeWidth={3}
                      dot={{ fill: "#050505", r: 3, strokeWidth: 0 }}
                      activeDot={{ fill: "#D9FF00", stroke: "#050505", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </WarpCard>
            </div>

            {/* Leaderboard */}
            <WarpCard>
              <div className="font-mono text-xs font-bold uppercase text-muted-foreground mb-4">
                TOP AGENTS (MOCK)
              </div>
              <div className="space-y-3">
                {topAgents.map((a, i) => (
                  <div key={a.name} className="flex items-center justify-between border-b border-warp-grey pb-2 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="font-unbounded text-xs font-extrabold w-5">{i + 1}</span>
                      <span className="font-mono text-xs">{a.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold bg-warp-yellow px-2 py-0.5 border border-warp-black">
                      {a.total} STX
                    </span>
                  </div>
                ))}
              </div>
            </WarpCard>
          </div>

          {/* Transactions */}
          <WarpCard>
            <div className="font-mono text-xs font-bold uppercase text-muted-foreground mb-4">
              RECENT TRANSACTIONS (LIVE)
            </div>
            <div className="border border-warp-black overflow-x-auto">
              <div className="grid grid-cols-5 bg-warp-black text-warp-yellow font-mono text-[10px] font-bold uppercase min-w-[600px]">
                <div className="px-4 py-2">TX ID</div>
                <div className="px-4 py-2">SENDER</div>
                <div className="px-4 py-2">AMOUNT</div>
                <div className="px-4 py-2">TIME</div>
                <div className="px-4 py-2">STATUS</div>
              </div>
              {realTransactions.length === 0 ? (
                <div className="p-8 text-center font-mono text-sm text-gray-500">No transactions recorded yet.</div>
              ) : (
                realTransactions.map((tx) => (
                  <div key={tx.tx_id} className="grid grid-cols-5 border-t border-warp-grey font-mono text-xs hover:bg-warp-yellow/10 transition-colors min-w-[600px]">
                    <div className="px-4 py-2.5 flex items-center gap-1 overflow-hidden">
                      <span className="text-foreground truncate block w-24" title={tx.tx_id}>{tx.tx_id.substring(0, 10)}...</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    </div>
                    <div className="px-4 py-2.5 truncate" title={tx.sender}>{tx.sender.substring(0, 10)}...</div>
                    <div className="px-4 py-2.5 font-bold">{(tx.amount / 1000000).toFixed(6)} STX</div>
                    <div className="px-4 py-2.5 text-muted-foreground">{formatDistanceToNow(new Date(tx.created_at), { addSuffix: true })}</div>
                    <div className="px-4 py-2.5">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase border ${tx.status === "confirmed"
                        ? "bg-warp-yellow text-warp-black border-warp-black"
                        : "bg-warp-grey text-muted-foreground border-warp-grey"
                        }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </WarpCard>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
