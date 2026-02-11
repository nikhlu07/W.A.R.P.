import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileCode, Lock, Cpu, Zap, ShieldAlert, ArrowUpRight } from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
  const [address, setAddress] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      {/* TOP TICKER */}
      <div className="ticker-wrap font-mono text-sm uppercase font-bold tracking-widest">
        <div className="ticker">
          WARP PROTOCOL // V 1.0 // CLINICAL ACCELERATION // ZERO FRICTION // PAYMENT REQUIRED // 402 STATUS // GAS OPTIMIZED // WARP PROTOCOL // V 1.0 // CLINICAL ACCELERATION // ZERO FRICTION // PAYMENT REQUIRED // 402 STATUS // GAS OPTIMIZED //
        </div>
      </div>



      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center border-l border-r border-warp-grey bg-warp-white relative">

          {/* Hero Text */}
          <div className="z-10">
            <div className="inline-block border border-warp-black px-2 py-1 mb-6 text-xs font-bold bg-warp-white">
              SYSTEM STATUS: NORMAL
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.85] mb-8">
              Speed has<br />
              <span className="text-transparent bg-clip-text bg-warp-black stroke-black" style={{ WebkitTextStroke: '2px black', color: 'white' }}>No Friction</span>
            </h1>
            <p className="font-mono text-lg mb-10 max-w-md leading-relaxed">
              A sterile, high-frequency settlement layer for the open web.
              Zero curves. Zero latency. Pure acceleration.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="btn-warp px-8 py-4 text-base">
                INITIATE_SEQUENCE
              </button>
              <Link to="/docs" className="btn-warp-ghost px-8 py-4 text-base flex items-center gap-3">
                <FileCode className="w-4 h-4" />
                READ_DOCS
              </Link>
            </div>
          </div>

          {/* Hero Graphic / Interactive 402 Mockup */}
          <div className="relative">
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
                  <Lock className="w-8 h-8" />
                </div>

                {/* The "402" Input Field */}
                <div className="space-y-4">
                  <label className="font-mono text-xs font-bold uppercase">Destination Address</label>
                  <div className="input-warp border-2 border-warp-black p-4 flex items-center justify-between transition-colors duration-100">
                    <input
                      type="text"
                      placeholder="ENTER_STX_ADDRESS..."
                      className="w-full font-mono text-sm placeholder:text-gray-400 bg-transparent outline-none"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
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
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="border-t-2 border-b-2 border-warp-black bg-warp-yellow">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-warp-black">
            <div className="p-10 flex flex-col justify-between hover:bg-white transition-colors group">
              <div className="font-mono text-xs font-bold mb-4">TOTAL_VOLUME</div>
              <div className="font-display text-4xl font-bold group-hover:translate-x-2 transition-transform">$42.8B</div>
            </div>
            <div className="p-10 flex flex-col justify-between hover:bg-white transition-colors group">
              <div className="font-mono text-xs font-bold mb-4">AVG_LATENCY</div>
              <div className="font-display text-4xl font-bold group-hover:translate-x-2 transition-transform">12ms</div>
            </div>
            <div className="p-10 flex flex-col justify-between hover:bg-white transition-colors group">
              <div className="font-mono text-xs font-bold mb-4">ACTIVE_NODES</div>
              <div className="font-display text-4xl font-bold group-hover:translate-x-2 transition-transform">8,902</div>
            </div>
          </div>
        </section>

        {/* FEATURES / PHILOSOPHY */}
        <section className="py-24 bg-warp-white">
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
              {/* Feature 1 */}
              <div className="card-warp hover:-translate-y-2 transition-transform duration-200">
                <div className="mb-6 border border-warp-black w-12 h-12 flex items-center justify-center bg-warp-black text-warp-yellow">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-4">Direct Execution</h3>
                <p className="font-mono text-sm text-gray-600 leading-relaxed mb-6">
                  No mempools. No waiting. Transactions are executed atomically against the sequencer.
                </p>
                <div className="font-mono text-xs font-bold uppercase border-t border-gray-200 pt-4 flex justify-between">
                  <span>Status</span>
                  <span className="text-green-600">ONLINE</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="card-warp hover:-translate-y-2 transition-transform duration-200">
                <div className="mb-6 border border-warp-black w-12 h-12 flex items-center justify-center bg-warp-white text-warp-black">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-4">Flash Liquidity</h3>
                <p className="font-mono text-sm text-gray-600 leading-relaxed mb-6">
                  Access deep liquidity pools instantly. Borrow, trade, and repay in the same block.
                </p>
                <div className="font-mono text-xs font-bold uppercase border-t border-gray-200 pt-4 flex justify-between">
                  <span>Access</span>
                  <span>PUBLIC</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="card-warp hover:-translate-y-2 transition-transform duration-200">
                <div className="mb-6 border border-warp-black w-12 h-12 flex items-center justify-center bg-warp-white text-warp-black">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold uppercase mb-4">Hazard Proof</h3>
                <p className="font-mono text-sm text-gray-600 leading-relaxed mb-6">
                  Formal verification on all smart contracts. Audited by the paranoid.
                </p>
                <div className="font-mono text-xs font-bold uppercase border-t border-gray-200 pt-4 flex justify-between">
                  <span>Audit</span>
                  <span>PASSED</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEVELOPER SNIPPET */}
        <section className="py-20 border-t border-warp-black bg-neutral-50">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-warp-black text-warp-white p-6 font-mono text-sm relative border-2 border-warp-black shadow-[8px_8px_0px_0px_#D9FF00]">
              <div className="absolute top-0 right-0 bg-warp-yellow text-warp-black px-2 py-1 text-xs font-bold">
                BASH
              </div>
              <pre className="overflow-x-auto">
                <span className="text-gray-500"># Install the CLI</span>{'\n'}
                npm install -g @warp-protocol/cli{'\n\n'}
                <span className="text-gray-500"># Initialize a node</span>{'\n'}
                warp init --mode=aggressive{'\n\n'}
                <span className="text-warp-yellow">{'>'} Initializing WARP Core...</span>{'\n'}
                <span className="text-warp-yellow">{'>'} Optimizing routing paths...</span>{'\n'}
                <span className="text-green-400">{'>'} DONE. Latency: 0.00ms</span>
              </pre>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-black uppercase mb-6 leading-[0.9]">Built for the<br />Terminal</h2>
              <p className="font-mono text-lg mb-8">
                Fully composable SDKs available in Rust, Go, and TypeScript. Integrate WARP speed into your dApp with three lines of code.
              </p>
              <a href="#" className="inline-flex items-center gap-2 font-bold uppercase border-b-2 border-warp-black hover:bg-warp-yellow hover:border-transparent transition-colors">
                View Documentation <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>


    </div>
  );
}
