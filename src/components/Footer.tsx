import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-cyber border-t border-white/10 pt-16 pb-12 px-6 text-white font-display">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">⚡</span>
            <span className="font-black text-xl tracking-wider text-white">
              TITANFORGE <span className="text-volt">3D</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
            Kolkata’s premier high-performance strength & biomechanics athletic facility. Engineered for athletes, powerlifters, and fitness purists.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <span>📍 Park Street / Salt Lake, Kolkata</span>
            <span>·</span>
            <span>📞 +91 81708 59653</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-mono text-volt uppercase tracking-widest mb-4">
            NAVIGATION
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li><a href="#membership-section" className="hover:text-volt transition-colors">VIP Membership Pass</a></li>
            <li><Link to="/workouts" className="hover:text-volt transition-colors">Olympian Workouts</Link></li>
            <li><Link to="/trainers" className="hover:text-volt transition-colors">Certified Coaches</Link></li>
            <li><Link to="/dashboard" className="hover:text-volt transition-colors">Member Turnstile Pass</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-mono text-volt uppercase tracking-widest mb-4">
            HOURS & PROTOCOL
          </h4>
          <p className="text-sm text-gray-300 mb-2">
            <strong>Mon – Sat:</strong> 5:00 AM – 11:00 PM
          </p>
          <p className="text-sm text-gray-300 mb-4">
            <strong>Sunday:</strong> 6:00 AM – 8:00 PM
          </p>
          <span className="inline-block px-3 py-1 bg-volt/10 text-volt text-xs font-mono font-bold rounded-full border border-volt/30">
            🟢 24/7 VIP BIOMETRIC ENTRY ACTIVE
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-mono gap-4">
        <span>© 2026 TITANFORGE 3D Performance Lab. All rights reserved.</span>
        <span>Built with React 19, Three.js, GSAP & Lenis</span>
      </div>
    </footer>
  )
}
