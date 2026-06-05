import { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import SectorsIndexPage from './pages/SectorsIndexPage'
import SectorPage from './pages/SectorPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import AboutIntroPage from './pages/AboutIntroPage'
import AboutValuesPage from './pages/AboutValuesPage'
import CareersPage from './pages/CareersPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage, { isAuthenticated } from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import WorkspacePage from './pages/WorkspacePage'

function ProtectedPage({ children }: { children: ReactNode }) {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/intro" element={<AboutIntroPage />} />
            <Route path="/about/values" element={<AboutValuesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedPage><DashboardPage /></ProtectedPage>} />
            <Route path="/workspace" element={<ProtectedPage><WorkspacePage /></ProtectedPage>} />
            <Route path="/sectors" element={<SectorsIndexPage />} />
            <Route path="/sectors/:slug" element={<SectorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
