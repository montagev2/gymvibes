import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/common/ErrorBoundary'
import LenisProvider from './components/common/LenisProvider'
import Home from './pages/Home'
import Workouts from './pages/Workouts'
import Trainers from './pages/Trainers'
import MemberDashboard from './pages/MemberDashboard'

export default function App() {
  return (
    <ErrorBoundary>
      <LenisProvider>
        <HashRouter>
          <div className="bg-void min-h-screen flex flex-col justify-between selection:bg-volt selection:text-black">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/dashboard" element={<MemberDashboard />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </LenisProvider>
    </ErrorBoundary>
  )
}
