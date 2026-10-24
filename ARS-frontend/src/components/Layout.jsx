import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Mail, Menu, X, Phone, MapPin, ArrowRight, MessageCircle } from 'lucide-react'
import { useData } from '../context/DataContext'

export function Logo({ light = false, className = '' }) {
  return (
    <img
      src={light ? '/images/logo-light.png' : '/images/logo.png'}
      alt="Adnan Rais & Sons — Packaging Solutions"
      className={`h-12 w-auto object-contain select-none sm:h-14 ${className}`}
    />
  )
}

export function Eyebrow({ children, light = false }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="h-0.5 w-7 bg-brand" aria-hidden="true" />
      <span
        className={`text-xs font-semibold tracking-[0.2em] uppercase ${
          light ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        {children}
      </span>
    </div>
  )
}

export function Navbar() {
  const { company, nav } = useData()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium transition-colors ${
                  isActive ? 'font-semibold text-navy' : 'text-slate-600 hover:text-navy'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-mid active:scale-[0.99]"
          >
            <Mail className="h-4 w-4" />
            Get in Touch
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2.5 text-navy hover:bg-slate-100 lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 pt-3 pb-6 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-base font-medium ${
                    isActive ? 'bg-surface font-semibold text-navy' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-200 pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold text-white"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </Link>
            <a
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Assalamu Alaikum, I would like to inquire about packaging products from ${company.name}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-5 py-2.5 text-sm font-semibold text-brand-dark"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp: {company.phones[0]}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export function Footer() {
  const { company, nav, products } = useData()
  return (
    <footer className="bg-navy-dark text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Manufacturer and supplier of industrial and packaging products in Bangladesh — committed to
              quality, consistency and customized solutions.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-slate-400 transition hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white">Our Products</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">{products.slice(0, 6).map((p) => <li key={p.slug}><Link to={`/products?cat=${p.category}`} className="hover:text-white">{p.name}</Link></li>)}</ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white">Get in Touch</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{company.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand" />
                <span>
                  <a href={`tel:${company.phones[0]}`} className="hover:text-white">{company.phones[0]}</a>
                  {' · '}
                  <a href={`tel:${company.phones[1]}`} className="hover:text-white">{company.phones[1]}</a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex items-center gap-2 tracking-[0.18em] uppercase">
            <span className="h-0.5 w-4 bg-brand" />
            <span>{company.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function CtaBanner({
  eyebrow = 'Need a specific solution?',
  title = 'Let’s Find the Right Packaging Solution for You',
  text = 'Tell us about your requirements. Our team will help you with the right material, size and printing for your business.',
  buttonText = 'Get in Touch',
  onQuoteClick,
}) {
  const { company } = useData()
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <img
        src="/images/warehouse.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-15 mix-blend-luminosity"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow light>{eyebrow}</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-base text-slate-300">{text}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              {onQuoteClick ? (
                <button
                  type="button"
                  onClick={onQuoteClick}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-slate-100"
                >
                  {buttonText}
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-slate-100"
                >
                  {buttonText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <a
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello ${company.name}, I would like to discuss a packaging requirement.`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <MessageCircle className="h-4 w-4 text-brand" />
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="border-t border-white/15 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-10">
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-brand" />
                <div>
                  <a href={`tel:${company.phones[0]}`} className="block font-medium hover:underline">{company.phones[0]}</a>
                  <a href={`tel:${company.phones[1]}`} className="block text-slate-300 hover:underline">{company.phones[1]}</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-brand" />
                <a href={`mailto:${company.email}`} className="hover:underline">{company.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span className="text-slate-200">{company.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
