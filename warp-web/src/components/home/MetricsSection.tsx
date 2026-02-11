import { motion } from "framer-motion";

const metrics = [
    { label: "TOTAL_VOLUME", value: "$42.8B", delay: 0 },
    { label: "AVG_LATENCY", value: "12ms", delay: 0.1 },
    { label: "ACTIVE_NODES", value: "8,902", delay: 0.2 },
];

const MetricsSection = () => {
    return (
        <section className="border-t-2 border-b-2 border-warp-black bg-warp-yellow">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-warp-black">
                {metrics.map((metric) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: metric.delay, duration: 0.5 }}
                        className="p-10 flex flex-col justify-between hover:bg-white transition-colors group cursor-default"
                    >
                        <div className="font-mono text-xs font-bold mb-4">{metric.label}</div>
                        <div className="font-display text-4xl font-bold group-hover:translate-x-2 transition-transform">
                            {metric.value}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default MetricsSection;
