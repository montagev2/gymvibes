import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { to: '/', label: '3D Studio' },
    { to: '/workouts', label: 'Workouts' },
    { to: '/trainers', label: 'Olympians' },
    { to: '/dashboard', label: 'Member Pass' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 backdrop-blur-xl bg-void/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-volt flex items-center justify-center text-black font-black text-xl shadow-volt-glow group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg text-white tracking-wider leading-none">
              TITANFORGE <span className="text-volt">3D</span>
            </span>
            <span className="text-[9px] font-mono text-gray-400 tracking-widest uppercase">
              KOLKATA PERFORMANCE LAB
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-cyber/80 border border-white/10 p-1.5 rounded-full">
          {links.map((l) => {
            const active = location.pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  active
                    ? 'bg-volt text-black shadow-volt-glow'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href="#membership-section"
            className="px-5 py-2.5 rounded-xl bg-volt text-black font-black text-xs uppercase tracking-wider shadow-volt-glow hover:bg-volt/90 transition-all cursor-pointer"
          >
            ⚡ Join VIP
          </a>
        </div>
      </div>
    </header>
  )
}
