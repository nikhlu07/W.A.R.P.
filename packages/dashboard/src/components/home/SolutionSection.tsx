import { motion } from "framer-motion";
import WarpCard from "@/components/shared/WarpCard";
import WarpBadge from "@/components/shared/WarpBadge";
import { Shield, Bot, Layers } from "lucide-react";

const solutions = [
  {
    icon: Shield,
    title: "FOR SELLERS",
    description: "Monetize any API endpoint in 3 lines. Set per-route pricing. Get paid in STX with zero chargebacks.",
    tag: "EARN",
  },
  {
    icon: Bot,
    title: "FOR AGENTS",
    description: "Autonomous payment handling. Your agent detects x402 headers, pays via Stacks, and retries — all without human intervention.",
    tag: "PAY",
  },
  {
    icon: Layers,
    title: "FOR STACKS",
    description: "Every W.A.R.P. transaction is a Stacks transaction. More agents = more STX demand = more network activity.",
    tag: "SETTLE",
  },
];

const SolutionSection = () => {
  return (
    <section id="solutions" className="py-24 px-6 border-t-2 border-warp-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-block bg-warp-black text-warp-yellow px-3 py-1 font-mono text-xs font-bold uppercase mb-4">
            THE SOLUTION
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-[0.9]">
            EXECUTION<br />
            <span className="text-transparent bg-clip-text bg-warp-black" style={{ WebkitTextStroke: "2px black", color: "transparent" }}>ECONOMY</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <WarpCard className="h-full group hover:bg-warp-yellow transition-colors duration-200">
                <div className="mb-6 flex justify-between items-start">
                  <WarpBadge className="bg-warp-white text-warp-black border-2 border-warp-black group-hover:bg-warp-black group-hover:text-warp-yellow transition-colors">{s.tag}</WarpBadge>
                  <s.icon className="w-10 h-10 stroke-[1.5px]" />
                </div>
                <h3 className="font-display text-2xl font-black uppercase mb-4 leading-tight">{s.title}</h3>
                <p className="font-mono text-sm leading-relaxed border-t-2 border-warp-black pt-4">
                  {s.description}
                </p>
              </WarpCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
