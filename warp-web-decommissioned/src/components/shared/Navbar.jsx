import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';


export default function Navbar() {
    return (
        <nav className="w-full border-b-2 border-warp-black bg-warp-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-4">
                        {/* 
              If logo.svg doesn't exist, we might need a fallback. 
              For now, I'll comment out the image and rely on the text 
              until I verify asset existence or user provides it.
              The landing.html used 'logo.svg'.
            */}
                        {/* <div className="w-8 h-8 flex items-center justify-center">
              <img src={logo} className="w-20" alt="WARP" />
            </div> */}
                        <span className="font-display font-black text-2xl tracking-tighter glitch-text cursor-default">WARP</span>
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 font-mono text-sm tracking-tight font-bold">
                    <Link to="/" className="hover:bg-warp-black hover:text-warp-yellow px-1">PROTOCOL</Link>
                    <Link to="/developers" className="hover:bg-warp-black hover:text-warp-yellow px-1">DEVELOPERS</Link>
                    <Link to="/governance" className="hover:bg-warp-black hover:text-warp-yellow px-1">GOVERNANCE</Link>
                </div>

                {/* CTA */}
                <button className="btn-warp px-6 py-3 text-sm flex items-center gap-2">
                    <span>CONNECT</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </nav>
    );
}
