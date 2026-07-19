import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { AuthContext } from "../context/AuthContext";

export default function WelcomeScreen() {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const splashRef = useRef(null);
  const welcomeRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(splashRef.current, { display: "none" });
      gsap.set(welcomeRef.current, { opacity: 1 });
      gsap.set(".welcome-icon, .welcome-title, .welcome-desc, .welcome-btn, .welcome-or, .welcome-google, .welcome-version", { opacity: 1, y: 0 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline();

      // Splash: icon scales in
      tl.fromTo(".splash-icon", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
        // Splash: hold with subtle glow pulse
        .to(".splash-icon", { boxShadow: "0 0 40px rgba(37, 99, 235, 0.4)", duration: 0.5, ease: "sine.inOut" }, "-=0.1")
        .to(".splash-icon", { boxShadow: "0 0 20px rgba(37, 99, 235, 0.2)", duration: 0.5, ease: "sine.inOut" })
        // Splash: fade out
        .to(splashRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" }, "+=0.2")
        // Welcome: stagger elements in
        .to(welcomeRef.current, { opacity: 1, duration: 0.2 }, "-=0.1")
        .fromTo(".welcome-icon", { opacity: 0, scale: 0.6, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.1")
        .fromTo(".welcome-title", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.2")
        .fromTo(".welcome-desc", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")
        .fromTo(".welcome-btn", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.1, ease: "power2.out" }, "-=0.15")
        .fromTo(".welcome-or", { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=0.1")
        .fromTo(".welcome-google", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.1")
        .fromTo(".welcome-version", { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=0.1");
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#141130] to-[#1a1a2e] flex items-center justify-center p-6 overflow-hidden">
      {/* Mesh gradient blobs */}
      <div className="absolute top-[-20%] left-[-15%] w-[700px] h-[700px] rounded-full bg-blue-500/8 blur-3xl" />
      <div className="absolute bottom-[-25%] right-[-15%] w-[800px] h-[800px] rounded-full bg-indigo-500/6 blur-3xl" />
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] rounded-full bg-violet-500/5 blur-3xl" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-teal-400/3 blur-3xl" />
      <div className="absolute top-[60%] left-[30%] w-[350px] h-[350px] rounded-full bg-amber-500/3 blur-3xl" />

      {/* Splash phase */}
      <div ref={splashRef} className="absolute inset-0 z-20 flex items-center justify-center">
        <img src="/keel-icon.webp" alt="Keel" className="splash-icon w-20 h-20" />
      </div>

      {/* Welcome phase */}
      <div ref={welcomeRef} className="relative z-10 w-full max-w-sm text-center opacity-0">
        <img src="/keel-icon.webp" alt="Keel" className="welcome-icon w-16 h-16 mx-auto mb-6" />

        <h1 className="welcome-title text-3xl font-bold text-white mb-2 tracking-tight">
          Keel
        </h1>
        <p className="welcome-desc text-base text-slate-400 mb-10 leading-relaxed">
          Your shop, simplified.
        </p>

        <div className="welcome-btn space-y-3">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-3 px-4 rounded-xl transition-all active:scale-[0.98]"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/login?signup=1")}
            className="w-full bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium py-3 px-4 rounded-xl border border-white/10 transition-all active:scale-[0.98]"
          >
            Create Account
          </button>
        </div>

        <div className="welcome-or relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#0f0f23] px-3 text-slate-500">
              or
            </span>
          </div>
        </div>

        <button
          onClick={signInWithGoogle}
          className="welcome-google w-full flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium py-3 px-4 rounded-xl border border-white/10 transition-all active:scale-[0.98]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.73 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.73 17.57C14.73 18.23 13.46 18.63 12 18.63C9.14 18.63 6.71 16.7 5.84 14.12H2.18V16.95C4 20.64 7.71 23 12 23Z" fill="#34A853"/>
            <path d="M5.84 14.12C5.62 13.46 5.5 12.75 5.5 12C5.5 11.25 5.62 10.54 5.84 9.88V7.05H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.95L5.84 14.12Z" fill="#FBBC05"/>
            <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.46 2.09 14.97 1 12 1C7.71 1 4 3.36 2.18 7.05L5.84 9.88C6.71 7.3 9.14 5.38 12 5.38Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="welcome-version text-xs text-slate-600 mt-10">
          Keel Desktop v1.3.0
        </p>
      </div>
    </div>
  );
}
