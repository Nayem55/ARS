import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Search,
  ArrowRight,
  Settings,
  Users,
  ShieldCheck,
  Package,
  Truck,
  Layers,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  User,
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { Eyebrow, CtaBanner } from '../components/Layout'
import { ContactSection } from '../components/Widgets'

export function ProductsPage({ onSelectProduct }) {
  const { categories, products } = useData()
  const [params, setParams] = useSearchParams()
  const activeCat = params.get('cat') || 'all'
  const [query, setQuery] = useState('')

  const setCat = (id) => {
    if (id === 'all') setParams({})
    else setParams({ cat: id })
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((p) => {
      const catOk = activeCat === 'all' || p.category === activeCat
      const qOk =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      return catOk && qOk
    })
  }, [activeCat, query, products])

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">
                Our Products
              </p>
              <h1 className="mt-2.5 text-4xl leading-[1.12] font-extrabold tracking-tight text-navy sm:text-5xl">
                Packaging Solutions
                <span className="block text-brand">for Real Needs</span>
              </h1>
              <div className="mt-4 h-0.5 w-10 bg-brand" />
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                A comprehensive range of industrial and packaging products, designed to support
                businesses across multiple industries with quality, reliability and customized
                solutions.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-lg">
                <img
                  src="/images/hero-products.jpg"
                  alt="ARS packaging product lineup"
                  className="h-full max-h-[340px] w-full object-cover object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR + 3-COLUMN CATALOG */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-center">
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Product categories">
              {categories.map((c) => {
                const active = activeCat === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCat(c.id)}
                    className={`rounded-lg px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                      active
                        ? 'bg-navy text-white shadow-xs'
                        : 'bg-surface text-slate-600 hover:bg-slate-200/70 hover:text-navy'
                    }`}
                  >
                    {c.label}
                  </button>
                )
              })}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full rounded-lg border border-slate-300 bg-white py-2 pr-3.5 pl-10 text-sm focus:border-navy focus:outline-none"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-base font-semibold text-navy">No matching products found.</p>
              <p className="mt-1 text-sm text-slate-500">
                Try another search term or view all categories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCat('all')
                  setQuery('')
                }}
                className="mt-4 rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <article
                  key={p.slug}
                  onClick={() => onSelectProduct(p)}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
                >
                  <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-surface p-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="max-h-36 w-auto object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <h2 className="text-base font-bold text-navy group-hover:text-brand">
                        {p.name}
                      </h2>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600">{p.short}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-xs font-semibold text-brand">
                        View Details &amp; Quote
                      </span>
                      <ArrowRight className="h-4 w-4 text-navy transition group-hover:translate-x-1 group-hover:text-brand" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}

export function CapabilitiesPage() {
  const { capabilities } = useData()
  const strip = [
    { icon: Settings, label: 'Modern Equipment' },
    { icon: Users, label: 'Skilled Workforce' },
    { icon: ShieldCheck, label: 'Consistent Quality' },
    { icon: Package, label: 'Flexible Customization' },
  ]

  const processSteps = [
    {
      step: 'Material Selection',
      text: 'Virgin and industrial-grade resins sourced for clarity, seal strength and durability.',
    },
    {
      step: 'Production & Processing',
      text: 'Film extrusion, slitting, bag making and conversion with strict gauge control.',
    },
    {
      step: 'Printing & Finishing',
      text: 'Flexographic and gravure printing with sharp registration and clean finishing.',
    },
    {
      step: 'Quality Check & Dispatch',
      text: 'Inspected, packed and delivered on schedule to your factory or warehouse.',
    },
  ]

  return (
    <>
      {/* DARK HERO — matches Capabilities reference */}
      <section className="relative overflow-hidden bg-navy-dark text-white">
        <img
          src="/images/capabilities-hero.jpg"
          alt="Plastic film production roll on industrial machinery"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/90 to-navy-dark/30"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="max-w-xl">
            <Eyebrow light>Our Capabilities</Eyebrow>
            <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl">
              From Material
              <span className="block">to Meaningful</span>
              <span className="block text-brand">Solutions</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              With the right materials, modern machinery and an experienced team, we deliver
              packaging solutions that meet real business needs.
            </p>
          </div>
        </div>
      </section>

      {/* 4-ITEM ICON BAR */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {strip.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="flex items-center gap-3.5 py-5 lg:justify-center lg:px-4 lg:py-6">
                <Icon className="h-7 w-7 shrink-0 text-navy" strokeWidth={1.6} />
                <span className="text-sm font-bold text-navy">{s.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Eyebrow>What We Do</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Our Capabilities Across Every Step
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 lg:col-span-6">
              From raw material handling to final product delivery, our integrated capabilities allow
              us to maintain quality, ensure consistency and offer complete customization for our
              clients.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition hover:shadow-md"
              >
                <div className="aspect-[16/9] overflow-hidden bg-surface">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold text-navy">{c.title}</h3>
                    <span className="h-0.5 w-5 bg-brand" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow light>Our Process</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Consistent Quality at Every Step
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {processSteps.map((p, idx) => (
                  <div key={p.step} className="rounded-xl border border-white/15 bg-white/5 p-5">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand text-xs font-bold text-brand">
                      {idx + 1}
                    </span>
                    <h3 className="mt-3 text-base font-bold">{p.step}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-white/15 shadow-xl">
                <img
                  src="/images/warehouse.jpg"
                  alt="Palletized stretch film rolls ready for dispatch"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Built for your needs"
        title="Let’s Build Better Packaging Together"
        text="Share your requirements with our team and we’ll help you find the right solution for your business."
      />
    </>
  )
}

export function WhyUsPage() {
  const { industries } = useData()
  const reasons = [
    {
      icon: ShieldCheck,
      title: 'Quality Products',
      text: 'Consistent material quality, clean sealing and reliable thickness across every batch.',
    },
    {
      icon: Settings,
      title: 'Customized Solutions',
      text: 'Tailored dimensions, film gauges and multi-colour printing for your brand and product line.',
    },
    {
      icon: Truck,
      title: 'Reliable Supply',
      text: 'Dependable stock and timely delivery from our Lalbagh, Dhaka base to businesses nationwide.',
    },
    {
      icon: Layers,
      title: 'Complete Range Under One Roof',
      text: 'From industrial shrink films and strapping belts to printed pouches, tapes and food disposables.',
    },
  ]

  return (
    <>
      <section className="bg-surface py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <Eyebrow>Why Choose Us</Eyebrow>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              A Partner You Can Rely On
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Whether you run a factory floor, a food brand, a garment export line or a retail
              distribution network, Adnan Rais &amp; Sons delivers packaging that protects your
              product and keeps your supply chain moving.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => {
              const Icon = r.icon
              return (
                <div
                  key={r.title}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-lg font-bold text-navy">{r.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>Industries We Serve</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Packaging Solutions for Every Industry
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs"
              >
                <div className="aspect-[3/2] overflow-hidden bg-surface">
                  <img src={ind.image} alt={ind.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-navy">{ind.name}</h3>
                  <p className="mt-1.5 text-sm text-slate-600">{ind.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>Quality Assurance</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Consistent Quality Across Every Product
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                We source dependable raw materials and maintain strict quality checks across film
                extrusion, printing, slitting and conversion to ensure performance in every roll and
                bag we supply.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm font-medium text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand" />
                  High-grade raw materials
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand" />
                  Custom sizes, gauges &amp; printing
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand" />
                  Bulk &amp; repeat order reliability
                </li>
              </ul>
              <div className="mt-7">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-navy-mid"
                >
                  Explore All Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-2xl shadow-md">
                <img
                  src="/images/about-hero.jpg"
                  alt="Film roll quality check"
                  className="h-full max-h-[380px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}

export function ContactPage() {
  const { company } = useData()
  return (
    <>
      <section className="bg-navy py-14 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow light>Contact Adnan Rais &amp; Sons</Eyebrow>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Get in Touch With Our Team
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-300">
            Reach out via phone, WhatsApp, email or visit our office in Lalbagh, Dhaka for product
            inquiries, sample requests and bulk quotations.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href={`tel:${company.phones[0]}`}
              className="flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <Phone className="h-6 w-6 shrink-0 text-brand" />
              <div>
                <p className="text-xs text-slate-300">Call Directly</p>
                <p className="font-bold">
                  {company.phones[0]} / {company.phones[1]}
                </p>
              </div>
            </a>
            <a
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Assalamu Alaikum, I would like to inquire about packaging products from ${company.name}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <MessageCircle className="h-6 w-6 shrink-0 text-brand" />
              <div>
                <p className="text-xs text-slate-300">WhatsApp Chat</p>
                <p className="font-bold">{company.phones[0]}</p>
              </div>
            </a>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <Mail className="h-6 w-6 shrink-0 text-brand" />
              <div>
                <p className="text-xs text-slate-300">Email</p>
                <p className="font-bold">{company.email}</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <ContactSection />

      {/* Embedded map for Lalbagh, Dhaka */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
            <iframe
              title="Adnan Rais & Sons — 85-Khaje Dewan First Lane, Lalbagh, Dhaka-1211"
              src={`https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}
