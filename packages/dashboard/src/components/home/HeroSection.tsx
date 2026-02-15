import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileCode, Lock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-warp-white border-b-2 border-warp-black">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* Hero Text */}
        <motion.div
          className="z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block border border-warp-black px-2 py-1 mb-6 text-xs font-bold bg-warp-white">
            SYSTEM STATUS: NORMAL
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] mb-8">
            Speed has<br />
            <span className="text-transparent bg-clip-text bg-warp-black stroke-black" style={{ WebkitTextStroke: "2px black", color: "white" }}>
              No Friction
            </span>
          </h1>
          <p className="font-mono text-lg mb-10 max-w-md leading-relaxed">
            A sterile, high-frequency settlement layer for the open web.
            Zero curves. Zero latency. Pure acceleration.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button className="btn-warp px-8 py-4 text-base">
              INITIATE_SEQUENCE
            </button>
            <Link to="/docs">
              <button className="btn-warp-ghost px-8 py-4 text-base flex items-center gap-3">
                <FileCode className="w-4 h-4" />
                READ_DOCS
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Hero Graphic / Interactive 402 Mockup */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Decorative Grid Lines behind */}
          <div className="absolute -top-10 -right-10 w-full h-full border border-dashed border-warp-black opacity-20 pointer-events-none"></div>

          {/* The "Data Plate" Card */}
          <div className="card-warp p-0 shadow-xl drop-shadow-none filter-none">
            {/* Header Strip */}
            <div className="h-2 w-full bg-warp-yellow border-b border-warp-black"></div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase">Payment<br />Required</h3>
                  <div className="font-mono text-xs mt-1 text-gray-500">ERROR 402 // PROTOCOL LEVEL</div>
                </div>
                <Lock className="w-8 h-8" strokeWidth={1.5} />
              </div>

              {/* The "402" Input Field */}
              <div className="space-y-4">
                <label className="font-mono text-xs font-bold uppercase">Destination Address</label>
                <div className="input-warp border-2 border-warp-black p-4 flex items-center justify-between transition-colors duration-100">
                  <input type="text" placeholder="ENTER_STX_ADDRESS..." className="w-full font-mono text-sm placeholder:text-gray-400" />
                  <div className="w-3 h-3 bg-warp-black animate-pulse"></div>
                </div>
              </div>

              {/* Data Row */}
              <div className="mt-8 pt-6 border-t border-dashed border-warp-black flex justify-between font-mono text-sm">
                <span>EST_GAS</span>
                <span className="font-bold">0.0000002 GWEI</span>
              </div>
              <div className="mt-2 flex justify-between font-mono text-sm">
                <span>VELOCITY</span>
                <span className="font-bold">INSTANT</span>
              </div>

              <div className="mt-8">
                <button className="w-full bg-warp-black text-warp-white border border-warp-black py-3 font-mono text-sm uppercase hover:bg-warp-yellow hover:text-warp-black transition-colors font-bold">
                  SIGN_TRANSACTION
                </button>
              </div>
            </div>
          </div>

          {/* Floating Decor */}
          <div className="absolute -bottom-8 -left-8 bg-warp-white border border-warp-black p-4 hidden md:block">
            <div className="barcode h-8">
              <div className="bar w-1"></div>
              <div className="bar w-3"></div>
              <div className="bar w-1"></div>
              <div className="bar w-2"></div>
              <div className="bar w-4"></div>
              <div className="bar w-1"></div>
            </div>
            <div className="font-mono text-[10px] mt-2">S/N 893-21</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
