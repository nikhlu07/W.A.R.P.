import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WarpButton from "@/components/shared/WarpButton";
import WarpBadge from "@/components/shared/WarpBadge";
import { RotateCcw, Play, Gauge } from "lucide-react";

interface LogEntry {
  type: "info" | "request" | "response" | "payment" | "success" | "error";
  text: string;
}

const PlaygroundPage = () => {
  const [url, setUrl] = useState("https://api.example.com/v1/weather?city=tokyo");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [wallet, setWallet] = useState({ balance: 10.0, spent: 0, txCount: 0 });
  const [responseData, setResponseData] = useState<object | null>(null);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = useCallback((entry: LogEntry) => {
    setLogs((prev) => [...prev, entry]);
  }, []);

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms / speed));

  const runSimulation = async () => {
    if (running) return;
    setRunning(true);
    setLogs([]);
    setResponseData(null);

    addLog({ type: "info", text: "▸ Initializing W.A.R.P. Agent v0.1.0..." });
    await delay(500);

    addLog({ type: "request", text: `> GET ${url}` });
    addLog({ type: "info", text: "> Headers: { Authorization: Bearer warp_*** }" });
    await delay(1000);

    addLog({ type: "response", text: "< HTTP/1.1 402 Payment Required" });
    addLog({ type: "response", text: "< X-WARP-Price: 0.25 STX" });
    addLog({ type: "response", text: "< X-WARP-Address: SP2J6ZY...V6CET" });
    addLog({ type: "response", text: "< X-WARP-Token: STX" });
    addLog({ type: "response", text: "< X-WARP-Expiry: 300" });
    await delay(1500);

    addLog({ type: "payment", text: "⚡ Invoice received: 0.25 STX" });
    addLog({ type: "payment", text: "⚡ Constructing STX transfer transaction..." });
    addLog({ type: "payment", text: "⚡ Signing with agent private key..." });
    await delay(1000);

    addLog({ type: "payment", text: "⚡ Broadcasting to Stacks network..." });
    addLog({ type: "info", text: "  TxID: 0x7a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a" });
    await delay(2000);

    addLog({ type: "payment", text: "⚡ Waiting for confirmation..." });
    addLog({ type: "payment", text: "⚡ Block #148,392 mined — Transaction confirmed ✓" });
    await delay(1000);

    addLog({ type: "info", text: "> Retrying original request with payment proof..." });
    addLog({ type: "request", text: `> GET ${url}` });
    addLog({ type: "info", text: "> X-WARP-TxProof: 0x7a3f...7f8a" });
    await delay(500);

    addLog({ type: "success", text: "< HTTP/1.1 200 OK ✓" });
    addLog({ type: "success", text: '< { "city": "Tokyo", "temp": "22°C", "conditions": "Clear" }' });
    addLog({ type: "success", text: "▸ W.A.R.P. cycle complete. 0.25 STX paid." });

    setWallet((prev) => ({
      balance: +(prev.balance - 0.25).toFixed(2),
      spent: +(prev.spent + 0.25).toFixed(2),
      txCount: prev.txCount + 1,
    }));

    setResponseData({
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-WARP-Verified": "true",
        "X-WARP-TxBlock": "148392",
      },
      body: {
        city: "Tokyo",
        temp: "22°C",
        conditions: "Clear",
        wind: "12 km/h NW",
        humidity: "45%",
      },
    });

    setRunning(false);
  };

  const reset = () => {
    setLogs([]);
    setRunning(false);
    setResponseData(null);
    setWallet({ balance: 10.0, spent: 0, txCount: 0 });
  };

  const getLogColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "request": return "text-[#00ff41]";
      case "response": return "text-warp-yellow";
      case "payment": return "text-[#00bfff]";
      case "success": return "text-warp-yellow font-bold";
      case "error": return "text-warp-red";
      default: return "text-warp-grey";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-14">
        {/* Header bar */}
        <div className="border-b border-warp-black bg-background px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <WarpBadge>PLAYGROUND</WarpBadge>
            <span className="font-mono text-xs text-muted-foreground">W.A.R.P. Protocol Simulator v0.1.0</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSpeed(speed === 1 ? 2 : speed === 2 ? 4 : 1)}
              className="flex items-center gap-1 font-mono text-xs border border-warp-black px-3 py-1.5 hover:bg-warp-yellow transition-colors"
            >
              <Gauge className="w-3 h-3" />
              {speed}x
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1 font-mono text-xs border border-warp-black px-3 py-1.5 hover:bg-warp-red hover:text-background transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              RESET
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-5 min-h-[calc(100vh-7rem)]">
          {/* Left: Request Panel */}
          <div className="md:col-span-2 border-r border-warp-black p-6 flex flex-col gap-4">
            <div className="font-mono text-xs font-bold uppercase text-muted-foreground mb-2">REQUEST</div>
            <div className="flex gap-2">
              <span className="bg-warp-yellow text-warp-black font-mono text-xs font-bold px-3 py-3 border border-warp-black">
                GET
              </span>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="border-2 border-warp-black p-3 font-mono text-xs bg-background w-full focus:outline-none focus:border-warp-yellow focus:shadow-[4px_4px_0px_0px_#D9FF00] transition-all"
              />
            </div>
            <WarpButton onClick={runSimulation} disabled={running} className="w-full flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              {running ? "RUNNING..." : "SEND REQUEST"}
            </WarpButton>

            {/* Wallet */}
            <div className="mt-auto border border-warp-black p-4">
              <div className="font-mono text-xs font-bold uppercase text-muted-foreground mb-3">WALLET SIMULATOR</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="font-unbounded text-lg font-extrabold">{wallet.balance}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase">BALANCE STX</div>
                </div>
                <div className="text-center">
                  <div className="font-unbounded text-lg font-extrabold text-warp-red">{wallet.spent}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase">SPENT STX</div>
                </div>
                <div className="text-center">
                  <div className="font-unbounded text-lg font-extrabold">{wallet.txCount}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase">TX COUNT</div>
                </div>
              </div>
            </div>

            {/* Response */}
            {responseData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-warp-black p-4"
              >
                <div className="font-mono text-xs font-bold uppercase text-muted-foreground mb-2">RESPONSE</div>
                <pre className="font-mono text-[10px] overflow-auto whitespace-pre-wrap text-foreground">
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              </motion.div>
            )}
          </div>

          {/* Right: Terminal */}
          <div className="md:col-span-3 bg-warp-black p-0 flex flex-col">
            <div className="px-4 py-2 border-b border-[#00ff41]/20 flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#00ff41]/50">TERMINAL</span>
              <span className="font-mono text-[10px] text-[#00ff41]/30">— W.A.R.P. Protocol Output</span>
            </div>
            <div ref={termRef} className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed">
              {logs.length === 0 && (
                <div className="text-[#00ff41]/30">
                  <p>W.A.R.P. Protocol Simulator ready.</p>
                  <p>Click "SEND REQUEST" to begin.</p>
                  <p className="animate-blink mt-2">█</p>
                </div>
              )}
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={getLogColor(log.type)}
                >
                  {log.text}
                </motion.div>
              ))}
              {logs.length > 0 && !running && (
                <span className="animate-blink text-[#00ff41]">█</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaygroundPage;
