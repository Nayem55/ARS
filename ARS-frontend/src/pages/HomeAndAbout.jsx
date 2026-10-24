import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Settings,
  Factory,
  Truck,
  CheckCircle2,
} from 'lucide-react'
import { useData } from '../context/DataContext'
import { Eyebrow } from '../components/Layout'
import { ContactSection } from '../components/Widgets'

export function HomePage({ onSelectProduct }) {
  const { products, industries } = useData()
  const featured = products.slice(0, 6)

  return (
    <>
      {/* HERO — matches Home.png */}
      <section className="relative overflow-hidden bg-surface">
        {/* Diagonal navy accent on the right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[36%] bg-navy lg:block"
          style={{ clipPath: 'polygon(26% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left column */}
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">
                Packaging Solutions for a Stronger Tomorrow
              </p>
              <h1 className="mt-3 text-4xl leading-[1.1] font-extrabold tracking-tight text-navy sm:text-5xl lg:text-[3.35rem]">
                Reliable Packaging{' '}
                <span className="block">
                  for a <span className="text-brand">Growing World</span>
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Adnan Rais &amp; Sons is a trusted manufacturer and supplier of industrial and packaging
                products, serving businesses across Bangladesh with quality, consistency and customized
                solutions.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2.5 rounded-lg bg-navy px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-mid"
                >
                  Our Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-navy/30 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-navy hover:bg-slate-50"
                >
                  Contact Us
                </Link>
              </div>

              {/* 3 trust badges below buttons */}
              <div className="mt-10 grid grid-cols-1 gap-4 border-t border-slate-200/90 pt-7 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-7 w-7 shrink-0 text-navy" strokeWidth={1.75} />
                  <span className="text-sm leading-tight font-semibold text-navy">
                    Quality Products
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:border-l sm:border-slate-200 sm:pl-4">
                  <Users className="h-7 w-7 shrink-0 text-navy" strokeWidth={1.75} />
                  <span className="text-sm leading-tight font-semibold text-navy">
                    Trusted Partnership
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:border-l sm:border-slate-200 sm:pl-4">
                  <Settings className="h-7 w-7 shrink-0 text-navy" strokeWidth={1.75} />
                  <span className="text-sm leading-tight font-semibold text-navy">
                    Customized Solutions
                  </span>
                </div>
              </div>
            </div>

            {/* Right column — product showcase image */}
            <div className="relative lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/images/hero-collage.jpg"
                  alt="Adnan Rais & Sons packaging range — shrink film rolls, PP strapping belt, printed bags, disposable cups, plates and ARS tape"
                  className="block h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PRODUCTS — 6-card clean showcase from Home.png */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-600 uppercase">
                Our Products
              </p>
              <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Complete Packaging Solutions
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:text-navy"
            >
              View All 12 Categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {featured.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => onSelectProduct(p)}
                className="group flex flex-col items-center rounded-xl border border-slate-200/80 bg-white p-4 text-center shadow-xs transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
              >
                <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-lg bg-surface p-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="max-h-24 w-auto object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="mt-3 text-xs font-semibold text-navy group-hover:text-brand sm:text-sm">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT ADNAN RAIS & SONS — dark navy banner from Home.png */}
      <section className="relative overflow-hidden bg-navy text-white">
        <img
          src="/images/facility.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-25 mix-blend-luminosity lg:block"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70"
        />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-300 uppercase">
                About Adnan Rais &amp; Sons
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Built on Trust. Driven by Quality.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
                Adnan Rais &amp; Sons is a leading manufacturer and supplier of industrial and packaging
                products in Bangladesh. We are committed to providing high-quality packaging solutions
                that meet the diverse needs of our clients across various industries.
              </p>
              <div className="mt-7">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-navy"
                >
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-8 text-center lg:col-span-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <div className="flex flex-col items-center">
                <Factory className="h-8 w-8 text-brand" strokeWidth={1.6} />
                <span className="mt-3 text-xs font-semibold sm:text-sm">
                  Wide Range
                  <br />
                  of Products
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-8 w-8 text-brand" strokeWidth={1.6} />
                <span className="mt-3 text-xs font-semibold sm:text-sm">
                  Serving Diverse
                  <br />
                  Industries
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-8 w-8 text-brand" strokeWidth={1.6} />
                <span className="mt-3 text-xs font-semibold sm:text-sm">
                  Reliable
                  <br />
                  Supply &amp; Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE — clean 4-card strip */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-600 uppercase">
                Industries We Serve
              </p>
              <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Packaging Solutions for Every Industry
              </h2>
            </div>
            <Link
              to="/why-us"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark hover:text-navy"
            >
              Why Partner With ARS
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs transition hover:shadow-md"
              >
                <div className="aspect-[3/2] overflow-hidden bg-surface">
                  <img
                    src={ind.image}
                    alt={ind.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-navy">{ind.name}</h3>
                  <p className="mt-1 text-xs text-slate-600">{ind.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GET IN TOUCH */}
      <ContactSection />
    </>
  )
}

export function AboutPage() {
  const { industries } = useData()
  const values = [
    {
      icon: ShieldCheck,
      title: 'Quality',
      text: 'We maintain high standards in every product we deliver.',
    },
    {
      icon: Users,
      title: 'Partnership',
      text: 'We believe in long-term relationships with our clients.',
    },
    {
      icon: Settings,
      title: 'Customization',
      text: 'We provide tailored solutions to meet diverse industry needs.',
    },
  ]

  const storyPillars = [
    {
      title: 'Consistent Material Standards',
      text: 'Carefully sourced virgin and industrial-grade resins for dependable clarity, seal strength and durability.',
    },
    {
      title: 'Tailored to Your Specification',
      text: 'Custom roll widths, film thicknesses, bag sizes and multi-colour printing built around your line.',
    },
    {
      title: 'Dependable Dhaka Supply Network',
      text: 'Prompt dispatch and responsive communication from our Lalbagh base to factories and businesses nationwide.',
    },
  ]

  const facilityPoints = [
    'Modern production facilities',
    'Consistent quality control',
    'Flexible order capacity',
    'Reliable supply & support',
  ]

  return (
    <>
      {/* 1. HERO — matches Abouut Us.png */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">
                About Us
              </p>
              <h1 className="mt-3 text-4xl leading-[1.12] font-extrabold tracking-tight text-navy sm:text-5xl">
                Built on Trust
                <span className="block">Driven by Quality</span>
              </h1>
              <div className="mt-4 h-0.5 w-10 bg-brand" />
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                Adnan Rais &amp; Sons is a leading manufacturer and supplier of industrial and packaging
                products in Bangladesh. We are committed to providing reliable, high-quality solutions
                that help businesses package, protect and grow.
              </p>
              <a
                href="#our-story"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-brand"
              >
                Our Journey
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="relative lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/images/about-hero.jpg"
                  alt="Industrial plastic film roll being wound on precision machinery"
                  className="h-full max-h-[440px] w-full object-cover"
                />
                <div className="absolute right-5 bottom-5 rounded-lg bg-navy-dark/80 px-4 py-3 text-[10px] leading-relaxed font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-xs">
                  <span className="mb-1.5 block h-0.5 w-5 bg-brand" />
                  Packaging
                  <br />
                  Solutions
                  <br />
                  for a Stronger
                  <br />
                  Tomorrow
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY — warm cream background, 2-column layout (pillars on right instead of unverified numbers) */}
      <section id="our-story" className="bg-warm py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 lg:pr-8">
              <Eyebrow>Our Story</Eyebrow>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                A Reliable Partner
                <span className="block">for Growing Industries</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                Adnan Rais &amp; Sons was established with a simple goal — to deliver high-quality
                packaging solutions that businesses can rely on. Over the years, we have built strong
                relationships with a wide range of industries by consistently providing quality products,
                timely service and customized solutions.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                From industrial packaging to food-grade products, our focus has always been on
                understanding our clients’ needs and helping them grow with the right packaging
                solutions.
              </p>
            </div>

            <div className=" divide-y divide-slate-200/90 border-t border-slate-200 pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              {storyPillars.map((item) => (
                <div key={item.title} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES — What Drives Us */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Eyebrow>Our Values</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">What Drives Us</h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:divide-x sm:divide-slate-200">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={v.title} className={i > 0 ? 'sm:pl-8' : ''}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand-dark">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-navy">{v.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{v.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. OUR COMMITMENT — 50/50 split with granules photo & dark navy panel */}
      <section className="grid lg:grid-cols-12">
        <div className="relative min-h-[340px] lg:col-span-6">
          <img
            src="/images/commitment-granules.jpg"
            alt="Virgin polymer resin granules in hand"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-6 left-6 text-xs leading-relaxed font-semibold tracking-[0.22em] text-white/90 uppercase">
            Materials
            <br />
            People
            <br />
            Possibilities
          </div>
        </div>
        <div className="flex items-center bg-navy-dark px-6 py-16 text-white sm:px-12 lg:col-span-6 lg:py-24">
          <div className="max-w-lg">
            <Eyebrow light>Our Commitment</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Packaging a
              <span className="block">Better Tomorrow</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-300">
              We are committed to supporting businesses with sustainable, reliable and innovative
              packaging solutions that create value and contribute to a cleaner, safer and more
              efficient future.
            </p>
            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand"
            >
              Our Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. OUR FACILITY — 50/50 split with ARS building & checklist */}
      <section className="grid bg-warm lg:grid-cols-12">
        <div className="min-h-[340px] lg:col-span-6">
          <img
            src="/images/facility.jpg"
            alt="Adnan Rais & Sons facility exterior"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex items-center px-6 py-16 sm:px-12 lg:col-span-6 lg:py-24">
          <div className="max-w-lg">
            <Eyebrow>Our Facility</Eyebrow>
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Equipped
              <span className="block">for Excellence</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Our manufacturing and supply network is equipped to handle a wide range of packaging
              products, ensuring consistent quality and timely delivery.
            </p>
            <ul className="mt-6 space-y-3">
              {facilityPoints.map((pt) => (
                <li key={pt} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
