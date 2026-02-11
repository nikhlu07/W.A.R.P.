import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { connectWallet, getStxAddress, disconnect, isConnected } from "../../utils/auth";

const Navbar = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isConnected()) {
      setAddress(getStxAddress());
    }
  }, []);

  const handleConnect = async () => {
    try {
      const response = await connectWallet();
      if (response && response.addresses && response.addresses.length > 0) {
        // The connect() method returns a flat list of addresses in response.addresses
        // We need to find the one with symbol 'STX' (or just take the first one if we assume it's STX)
        const stxAddressEntry = response.addresses.find(a => a.symbol === 'STX') || response.addresses[0];
        if (stxAddressEntry) {
          setAddress(stxAddressEntry.address);
          // Reload to trigger the Dashboard view in Index.tsx
          window.location.reload();
        }
      } else {
        const addr = getStxAddress();
        if (addr) {
          setAddress(addr);
          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Connect failed", err);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setAddress(null);
    window.location.reload();
  };

  return (
    <nav className="w-full border-b-2 border-warp-black bg-warp-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src="/logo.svg" className="w-20" alt="WARP" />
          </div>
          <span className="font-display font-black text-2xl tracking-tighter glitch-text cursor-default" data-text="WARP">WARP</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-mono text-sm tracking-tight font-bold">
          {address ? (
            <>
              <Link to="/" className="hover:bg-warp-black hover:text-warp-yellow px-1 transition-colors">DASHBOARD</Link>
              <Link to="/playground" className="hover:bg-warp-black hover:text-warp-yellow px-1 transition-colors">PLAYGROUND</Link>
              <Link to="/docs" className="hover:bg-warp-black hover:text-warp-yellow px-1 transition-colors">DOCS</Link>
            </>
          ) : (
            <>
              <a href="#protocol" className="hover:bg-warp-black hover:text-warp-yellow px-1 transition-colors">PROTOCOL</a>
              <a href="#features" className="hover:bg-warp-black hover:text-warp-yellow px-1 transition-colors">FEATURES</a>
              <a href="#stack" className="hover:bg-warp-black hover:text-warp-yellow px-1 transition-colors">STACK</a>
              <a href="#developers" className="hover:bg-warp-black hover:text-warp-yellow px-1 transition-colors">DEVELOPERS</a>
            </>
          )}
        </div>

        {/* CTA */}
        {address ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="btn-warp px-6 py-3 text-sm flex items-center gap-2"
            >
              <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-warp-white border-2 border-warp-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
                <button
                  onClick={handleDisconnect}
                  className="w-full text-left px-4 py-3 text-sm font-mono font-bold hover:bg-warp-black hover:text-warp-yellow transition-colors flex items-center gap-2"
                >
                  DISCONNECT
                </button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={handleConnect} className="btn-warp px-6 py-3 text-sm flex items-center gap-2">
            <span>CONNECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
