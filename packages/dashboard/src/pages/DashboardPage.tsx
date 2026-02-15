import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WarpBadge from "@/components/shared/WarpBadge";
import WarpCard from "@/components/shared/WarpCard";
import { revenueData, transactions } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Zap, Users, ExternalLink } from "lucide-react";

const stats = [
  { label: "TOTAL REVENUE", value: "342.1 STX", icon: TrendingUp, change: "+18.2%" },
  { label: "PAYMENTS TODAY", value: "127", icon: Zap, change: "+34" },
  { label: "UNIQUE AGENTS", value: "48", icon: Users, change: "+5" },
];

const topAgents = [
  { name: "TradingAI", total: 89.3 },
  { name: "GPT-4-Agent", total: 67.1 },
  { name: "ResearchAI", total: 45.8 },
  { name: "DataBot-v3", total: 38.2 },
  { name: "PriceOracle", total: 29.7 },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-14 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <WarpBadge>DASHBOARD</WarpBadge>
            <span className="font-mono text-xs text-muted-foreground">API Revenue Analytics — Mock Data</span>
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
                  <div className="mt-2 font-mono text-xs text-[#00aa00] font-bold">{s.change} from yesterday</div>
                </WarpCard>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mb-8">
            {/* Chart */}
            <div className="lg:col-span-2">
              <WarpCard cut={false} className="h-full">
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
            <WarpCard cut={false}>
              <div className="font-mono text-xs font-bold uppercase text-muted-foreground mb-4">
                TOP AGENTS
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
          <WarpCard cut={false}>
            <div className="font-mono text-xs font-bold uppercase text-muted-foreground mb-4">
              RECENT TRANSACTIONS
            </div>
            <div className="border border-warp-black overflow-x-auto">
              <div className="grid grid-cols-5 bg-warp-black text-warp-yellow font-mono text-[10px] font-bold uppercase min-w-[600px]">
                <div className="px-4 py-2">TX ID</div>
                <div className="px-4 py-2">AGENT</div>
                <div className="px-4 py-2">AMOUNT</div>
                <div className="px-4 py-2">TIME</div>
                <div className="px-4 py-2">STATUS</div>
              </div>
              {transactions.map((tx) => (
                <div key={tx.txId} className="grid grid-cols-5 border-t border-warp-grey font-mono text-xs hover:bg-warp-yellow/10 transition-colors min-w-[600px]">
                  <div className="px-4 py-2.5 flex items-center gap-1">
                    <span className="text-foreground">{tx.txId}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className="px-4 py-2.5">{tx.agent}</div>
                  <div className="px-4 py-2.5 font-bold">{tx.amount} STX</div>
                  <div className="px-4 py-2.5 text-muted-foreground">{tx.time}</div>
                  <div className="px-4 py-2.5">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase border ${
                      tx.status === "confirmed"
                        ? "bg-warp-yellow text-warp-black border-warp-black"
                        : "bg-warp-grey text-muted-foreground border-warp-grey"
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </WarpCard>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
