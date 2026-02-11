import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Disc } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-warp-black text-warp-white py-16 border-t-4 border-warp-yellow">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="font-display text-3xl font-bold mb-6">WARP //</h2>
                        <p className="font-mono text-sm text-gray-400 max-w-xs mb-6">
                            Bright brutalism for the decentralized economy. Speed is the only metric that matters.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:bg-warp-yellow hover:text-warp-black hover:border-warp-yellow transition-colors cursor-pointer">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/warp-protocol" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:bg-warp-yellow hover:text-warp-black hover:border-warp-yellow transition-colors cursor-pointer">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://discord.gg/warp" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-600 flex items-center justify-center hover:bg-warp-yellow hover:text-warp-black hover:border-warp-yellow transition-colors cursor-pointer">
                                <Disc className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-mono font-bold text-warp-yellow mb-6 uppercase">Protocol</h4>
                        <ul className="font-mono text-sm space-y-4 text-gray-400">
                            <li><Link to="/status" className="hover:text-white">Network Status</Link></li>
                            <li><Link to="/validators" className="hover:text-white">Validators</Link></li>
                            <li><Link to="/bridge" className="hover:text-white">Bridge</Link></li>
                            <li><Link to="/explorer" className="hover:text-white">Explorer</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-mono font-bold text-warp-yellow mb-6 uppercase">Legal</h4>
                        <ul className="font-mono text-sm space-y-4 text-gray-400">
                            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                            <li><Link to="/risk" className="hover:text-white">Risk Disclosure</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center font-mono text-xs text-gray-500">
                    <div className="flex gap-2 items-center mb-4 md:mb-0">
                        <div className="w-2 h-2 bg-warp-yellow rounded-none"></div>
                        <span>OPERATIONAL</span>
                    </div>
                    <div className="uppercase">
                        © 2024 WARP Protocol Inc.
                    </div>
                </div>
            </div>
        </footer>
    );
}
