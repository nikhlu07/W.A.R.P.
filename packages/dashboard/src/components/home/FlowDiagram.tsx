import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  { label: "AGENT", desc: "GET /api/data", color: "bg-warp-white" },
  { label: "402", desc: "Payment Required", color: "bg-warp-yellow" },
  { label: "SIGN TX", desc: "STX Transfer", color: "bg-warp-white" },
  { label: "BROADCAST", desc: "Stacks Network", color: "bg-warp-white" },
  { label: "CONFIRM", desc: "~6 seconds", color: "bg-warp-yellow" },
  { label: "200 OK", desc: "Access Granted", color: "bg-warp-yellow" },
];

const FlowDiagram = () => {
  return (
    <section className="py-24 px-6 border-t-2 border-warp-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-warp-black text-warp-yellow px-3 py-1 font-mono text-xs font-bold uppercase mb-4">
            PROTOCOL FLOW
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black uppercase leading-[0.9]">
            HOW IT<br />WORKS
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-full max-w-md relative group"
            >
              <div className={`${step.color} border-2 border-warp-black p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_#050505] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all`}>
                <div>
                  <div className="font-display text-lg font-black uppercase">{step.label}</div>
                  <div className="font-mono text-xs text-black font-bold mt-1">{step.desc}</div>
                </div>
                <div className="font-mono text-xs font-bold border-l-2 border-warp-black pl-4">STEP 0{i + 1}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="w-6 h-6 text-warp-black stroke-[3px]" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowDiagram;
