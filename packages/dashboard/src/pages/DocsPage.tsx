import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WarpBadge from "@/components/shared/WarpBadge";
import { docsContent } from "@/data/mockData";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { cn } from "@/lib/utils";

SyntaxHighlighter.registerLanguage("javascript", js);

const sections = ["overview", "quickstart", "api-reference", "error-codes", "security"] as const;
type Section = typeof sections[number];

const sectionLabels: Record<Section, string> = {
  overview: "Overview",
  quickstart: "Quick Start",
  "api-reference": "API Reference",
  "error-codes": "Error Codes",
  security: "Security",
};

const DocsPage = () => {
  const [active, setActive] = useState<Section>("overview");

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-14 flex min-h-[calc(100vh-3.5rem)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-warp-black p-6 shrink-0 hidden md:block">
          <div className="font-mono text-xs font-bold uppercase text-muted-foreground mb-4">DOCUMENTATION</div>
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s}
                onClick={() => setActive(s)}
                className={cn(
                  "block w-full text-left font-mono text-xs uppercase px-3 py-2 transition-colors",
                  active === s
                    ? "bg-warp-yellow text-warp-black font-bold border border-warp-black"
                    : "text-foreground hover:bg-warp-grey"
                )}
              >
                {sectionLabels[s]}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 md:p-12 max-w-4xl">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {active === "overview" && (
              <div>
                <WarpBadge className="mb-4">OVERVIEW</WarpBadge>
                <h1 className="font-unbounded text-3xl font-extrabold mb-6">W.A.R.P. PROTOCOL</h1>
                <p className="font-mono text-sm leading-relaxed text-foreground whitespace-pre-line">
                  {docsContent.overview.content}
                </p>
              </div>
            )}

            {active === "quickstart" && (
              <div>
                <WarpBadge className="mb-4">QUICK START</WarpBadge>
                <h1 className="font-unbounded text-3xl font-extrabold mb-6">GET STARTED</h1>

                <div className="mb-4 border border-warp-black p-4 bg-warp-yellow">
                  <code className="font-mono text-sm font-bold">npm install warp-protocol</code>
                </div>

                <h3 className="font-unbounded text-lg font-extrabold mt-8 mb-4">SERVER SETUP</h3>
                <div className="border border-warp-black mb-8">
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomOneLight}
                    customStyle={{ margin: 0, padding: "1.5rem", background: "#FFFFFF", fontSize: "0.75rem", borderRadius: 0 }}
                  >
                    {docsContent.quickstart.serverCode}
                  </SyntaxHighlighter>
                </div>

                <h3 className="font-unbounded text-lg font-extrabold mt-8 mb-4">CLIENT SETUP</h3>
                <div className="border border-warp-black">
                  <SyntaxHighlighter
                    language="javascript"
                    style={atomOneLight}
                    customStyle={{ margin: 0, padding: "1.5rem", background: "#FFFFFF", fontSize: "0.75rem", borderRadius: 0 }}
                  >
                    {docsContent.quickstart.clientCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {active === "api-reference" && (
              <div>
                <WarpBadge className="mb-4">REFERENCE</WarpBadge>
                <h1 className="font-unbounded text-3xl font-extrabold mb-6">API REFERENCE</h1>
                <h3 className="font-unbounded text-lg font-extrabold mb-4">W.A.R.P. HEADERS</h3>
                <div className="border border-warp-black">
                  <div className="grid grid-cols-3 bg-warp-black text-warp-yellow font-mono text-xs font-bold uppercase">
                    <div className="px-4 py-3 border-r border-warp-yellow/20">HEADER</div>
                    <div className="px-4 py-3 border-r border-warp-yellow/20">DESCRIPTION</div>
                    <div className="px-4 py-3">EXAMPLE</div>
                  </div>
                  {docsContent.apiReference.headers.map((h) => (
                    <div key={h.name} className="grid grid-cols-3 border-t border-warp-black font-mono text-xs">
                      <div className="px-4 py-3 font-bold border-r border-warp-grey">{h.name}</div>
                      <div className="px-4 py-3 text-muted-foreground border-r border-warp-grey">{h.description}</div>
                      <div className="px-4 py-3 bg-warp-grey/30">{h.example}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === "error-codes" && (
              <div>
                <WarpBadge className="mb-4">ERRORS</WarpBadge>
                <h1 className="font-unbounded text-3xl font-extrabold mb-6">ERROR CODES</h1>
                <div className="space-y-4">
                  {docsContent.errorCodes.codes.map((c) => (
                    <div key={c.code} className="border border-warp-black p-4 flex items-start gap-4">
                      <div className={cn(
                        "font-unbounded text-2xl font-extrabold shrink-0 w-16",
                        c.code === 402 ? "text-warp-black" : c.code === 403 ? "text-warp-red" : "text-muted-foreground"
                      )}>
                        {c.code}
                      </div>
                      <div>
                        <div className="font-mono text-sm font-bold uppercase">{c.name}</div>
                        <div className="font-mono text-xs text-muted-foreground mt-1">{c.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === "security" && (
              <div>
                <WarpBadge className="mb-4">SECURITY</WarpBadge>
                <h1 className="font-unbounded text-3xl font-extrabold mb-6">SECURITY</h1>
                <div className="space-y-6 font-mono text-sm leading-relaxed">
                  <div>
                    <h3 className="font-unbounded text-lg font-extrabold mb-2">REPLAY PROTECTION</h3>
                    <p className="text-muted-foreground">
                      Every payment proof includes a unique nonce, timestamp, and the block height at which the transaction
                      was confirmed. The server validates all three fields against the Stacks blockchain to prevent
                      double-spend attacks and transaction reuse.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-unbounded text-lg font-extrabold mb-2">VERIFICATION</h3>
                    <p className="text-muted-foreground">
                      W.A.R.P. middleware verifies payment proofs by querying the Stacks node directly. The transaction
                      must: (1) transfer the correct amount, (2) to the correct address, (3) be confirmed in a recent
                      block, and (4) not have been used before.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocsPage;
