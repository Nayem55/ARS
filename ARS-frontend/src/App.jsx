import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { Navbar, Footer } from './components/Layout'
import { ProductModal } from './components/Widgets'
import { HomePage, AboutPage } from './pages/HomeAndAbout'
import {
  ProductsPage,
  CapabilitiesPage,
  WhyUsPage,
  ContactPage,
} from './pages/CatalogAndOther'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider, useData } from './context/DataContext'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import ManageProducts from './pages/admin/ManageProducts'
import ManageSite from './pages/admin/ManageSite'
import { Toaster } from 'react-hot-toast'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const els = document.querySelectorAll('main section')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    els.forEach((el, idx) => {
      if (idx === 0) return // keep hero instant
      el.classList.add('reveal')
      io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])
  return null
}

function Protected({ children }) { const { admin, loading } = useAuth(); if (loading) return null; return admin ? children : <Navigate to="/admin/login" replace /> }

function PublicSite() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { company } = useData()

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage onSelectProduct={setSelectedProduct} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage onSelectProduct={setSelectedProduct} />} />
            <Route path="/capabilities" element={<CapabilitiesPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage onSelectProduct={setSelectedProduct} />} />
          </Routes>
        </main>
        <Footer />

        {/* Floating WhatsApp quick-chat button */}
        <a
          href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Assalamu Alaikum, I would like to inquire about packaging products from ${company.name}.`)}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Adnan Rais & Sons on WhatsApp"
          className="fixed right-5 bottom-5 z-30 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-brand-dark hover:shadow-xl"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>

        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </div>
    </>
  )
}

export default function App() {
  return <BrowserRouter><AuthProvider><DataProvider><Toaster position="top-right" /><Routes>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<Protected><AdminDashboard /></Protected>} />
    <Route path="/admin/products" element={<Protected><ManageProducts /></Protected>} />
    <Route path="/admin/site" element={<Protected><ManageSite /></Protected>} />
    <Route path="/*" element={<PublicSite />} />
  </Routes></DataProvider></AuthProvider></BrowserRouter>
}
