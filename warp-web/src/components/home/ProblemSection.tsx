import { motion } from "framer-motion";
import WarpCard from "@/components/shared/WarpCard";
import { Ban, ArrowRight, Zap } from "lucide-react";

const ProblemSection = () => {
  return (
    <section id="protocol" className="py-24 px-6 bg-warp-white border-t-2 border-warp-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="inline-block bg-warp-red text-warp-white px-3 py-1 font-mono text-xs font-bold uppercase border-2 border-warp-black mb-4 transform -rotate-1">
            THE PROBLEM
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-[0.9]">
            ATTENTION ECONOMY<br />
            <span className="text-warp-red" style={{ WebkitTextStroke: "2px black" }}>IS DEAD</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <WarpCard className="h-full bg-neutral-100/50 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2 mb-6 border-b-2 border-black pb-4">
                <Ban className="w-6 h-6 text-warp-red" />
                <span className="font-mono text-sm font-bold uppercase text-warp-red">BEFORE W.A.R.P.</span>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3 p-4 bg-white border-2 border-warp-grey">
                  <span className="text-muted-foreground font-bold">01.</span>
                  <span>Free API → Agent scrapes data</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border-2 border-warp-grey">
                  <span className="text-muted-foreground font-bold">02.</span>
                  <span>Rate limit hit → 429 Too Many Requests</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-warp-red/10 border-2 border-warp-red">
                  <span className="text-warp-red font-bold">03.</span>
                  <span className="text-warp-red font-bold">Dead End. No revenue. API dies.</span>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="border-2 border-warp-black p-4 text-center bg-white">
                  <div className="font-display text-3xl font-black">73%</div>
                  <div className="font-mono text-[10px] font-bold uppercase mt-1">Free-Riding Agents</div>
                </div>
                <div className="border-2 border-warp-black p-4 text-center bg-white">
                  <div className="font-display text-3xl font-black text-warp-red">$2.1B</div>
                  <div className="font-mono text-[10px] font-bold uppercase mt-1">Lost API Revenue</div>
                </div>
              </div>
            </WarpCard>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <WarpCard active className="h-full bg-warp-yellow">
              <div className="flex items-center gap-2 mb-6 border-b-2 border-black pb-4">
                <Zap className="w-6 h-6 text-warp-black fill-current" />
                <span className="font-mono text-sm font-bold uppercase">AFTER W.A.R.P.</span>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3 p-4 bg-white border-2 border-warp-black">
                  <span className="font-bold">01.</span>
                  <span>Agent requests data</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-warp-black text-warp-yellow border-2 border-warp-black">
                  <span className="font-bold">02.</span>
                  <span className="font-bold">402 Payment Required → Auto-Pay STX</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border-2 border-warp-black">
                  <ArrowRight className="w-4 h-4" />
                  <span className="font-bold">200 OK → Access granted. Revenue earned.</span>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="border-2 border-warp-black p-4 text-center bg-white shadow-[4px_4px_0px_0px_#000]">
                  <div className="font-display text-3xl font-black">~6s</div>
                  <div className="font-mono text-[10px] font-bold uppercase mt-1">Settlement Time</div>
                </div>
                <div className="border-2 border-warp-black p-4 text-center bg-white shadow-[4px_4px_0px_0px_#000]">
                  <div className="font-display text-3xl font-black text-green-600">$0</div>
                  <div className="font-mono text-[10px] font-bold uppercase mt-1">Chargebacks</div>
                </div>
              </div>
            </WarpCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
