import { motion } from "framer-motion";
import { features } from "@/data/mockData";
import { Cpu, Zap, ShieldAlert, Code, Globe, Activity } from "lucide-react";

// Map tags/titles to icons for consistent visual style with mockData
const getIcon = (tag: string) => {
  switch (tag) {
    case "UX": return Cpu;
    case "DX": return Code;
    case "PRICING": return Globe;
    case "SECURITY": return ShieldAlert;
    case "PROTOCOL": return Zap;
    case "ANALYTICS": return Activity;
    default: return Cpu;
  }
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-warp-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase max-w-xl leading-[0.9]">
            Constructed for<br />Extreme Load
          </h2>
          <p className="font-mono text-sm max-w-sm border-l-4 border-warp-yellow pl-4">
            We removed the UI curves to save rendering time. We removed the friction to save your money.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = getIcon(feature.tag);
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-warp hover:-translate-y-2 transition-transform duration-200 p-8"
              >
                <div className="mb-6 border border-warp-black w-12 h-12 flex items-center justify-center bg-warp-black text-warp-yellow">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-4">{feature.title}</h3>
                <p className="font-mono text-sm text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="font-mono text-xs font-bold uppercase border-t border-gray-200 pt-4 flex justify-between">
                  <span>TAG</span>
                  <span className="text-warp-black">{feature.tag}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
