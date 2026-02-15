import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CodeSection = () => {
  return (
    <section id="developers" className="py-24 bg-warp-black text-warp-white border-t-2 border-warp-yellow relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-warp-yellow/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        <motion.div
          className="order-2 lg:order-1 bg-warp-black text-warp-white p-6 font-mono text-sm relative border-2 border-warp-black shadow-[8px_8px_0px_0px_#D9FF00]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 bg-warp-yellow text-warp-black px-2 py-1 text-xs font-bold">
            BASH
          </div>
          <pre className="overflow-x-auto">
            <code>
              <span className="text-gray-500"># Install the CLI</span>
              {"\n"}npm install -g @warp-protocol/cli{"\n\n"}
              <span className="text-gray-500"># Initialize a node</span>
              {"\n"}warp init --mode=aggressive{"\n\n"}
              <span className="text-warp-yellow">&gt; Initializing WARP Core...</span>
              {"\n"}
              <span className="text-warp-yellow">&gt; Optimizing routing paths...</span>
              {"\n"}
              <span className="text-[#00ff41]">&gt; DONE. Latency: 0.00ms</span>
            </code>
          </pre>
        </motion.div>

        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black uppercase mb-6 leading-[0.9]">Built for the<br />Terminal</h2>
          <p className="font-mono text-lg mb-8">
            Fully composable SDKs available in Rust, Go, and TypeScript. Integrate WARP speed into your dApp with three lines of code.
          </p>
          <a href="#" className="inline-flex items-center gap-2 font-bold uppercase border-b-2 border-warp-black hover:bg-warp-yellow hover:border-transparent transition-colors">
            View Documentation <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default CodeSection;
