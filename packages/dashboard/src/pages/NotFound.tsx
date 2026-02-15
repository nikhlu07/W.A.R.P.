import GlitchText from "@/components/shared/GlitchText";
import WarpButton from "@/components/shared/WarpButton";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="inline-block mb-6 bg-warp-yellow text-warp-black font-mono text-xs font-bold uppercase px-4 py-2 border border-warp-black">
            ERROR
          </div>
          <GlitchText text="402" className="text-[8rem] md:text-[12rem] leading-none mb-4" />
          <h2 className="font-unbounded text-2xl font-extrabold mb-4">PAYMENT REQUIRED</h2>
          <p className="font-mono text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            This page requires payment. Unfortunately, we can't find what you're looking for either.
            Perhaps you need to pay more STX.
          </p>
          <Link to="/">
            <WarpButton>RETURN HOME</WarpButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
