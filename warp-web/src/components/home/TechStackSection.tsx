import { motion } from "framer-motion";
import { techStack } from "@/data/mockData";

const TechStackSection = () => {
  return (
    <section id="stack" className="py-24 px-6 bg-warp-yellow border-t-2 border-warp-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6"
        >
          <div>
            <div className="inline-block bg-warp-white border-2 border-warp-black px-3 py-1 font-mono text-xs font-bold uppercase mb-4">
              STACK
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-[0.9]">
              TECH<br />STACK
            </h2>
          </div>
          <div className="font-mono text-sm font-bold uppercase">
            // FULLY COMPOSABLE INFRASTRUCTURE
          </div>
        </motion.div>

        <div className="border-2 border-warp-black bg-warp-white shadow-[8px_8px_0px_0px_#050505]">
          <div className="grid grid-cols-3 bg-warp-black text-warp-white font-mono text-sm font-bold uppercase border-b-2 border-warp-black">
            <div className="px-6 py-4 border-r-2 border-warp-white/20">LAYER</div>
            <div className="px-6 py-4 border-r-2 border-warp-white/20">TECHNOLOGY</div>
            <div className="px-6 py-4">DESCRIPTION</div>
          </div>
          {techStack.map((row, i) => (
            <motion.div
              key={row.layer}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-3 border-b-2 border-warp-black last:border-0 hover:bg-neutral-50 transition-colors group"
            >
              <div className="px-6 py-4 font-mono text-sm font-bold uppercase border-r-2 border-warp-black">{row.layer}</div>
              <div className="px-6 py-4 font-mono text-sm font-bold border-r-2 border-warp-black text-warp-black">{row.tech}</div>
              <div className="px-6 py-4 font-mono text-sm text-gray-600 group-hover:text-black">{row.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
