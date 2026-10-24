import { useEffect, useState } from 'react'
import { X, MessageCircle, Mail, Check, ArrowRight, User, Phone, MapPin } from 'lucide-react'
import { useData } from '../context/DataContext'

export function ProductModal({ product, onClose }) {
  const { company } = useData()
  const [qty, setQty] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    if (!product) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [product, onClose])

  if (!product) return null

  const msg = `Assalamu Alaikum ${company.name},\n\nI would like a quote for: *${product.name}*${
    qty ? `\nQuantity / Specs: ${qty}` : ''
  }${notes ? `\nNotes: ${notes}` : ''}\n\nPlease let me know pricing and availability.`

  const emailBody = `Hello ${company.name},\n\nI would like to request a quote for: ${product.name}\n${
    qty ? `Quantity / Specifications: ${qty}\n` : ''
  }${notes ? `Additional notes: ${notes}\n` : ''}\nThank you.`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/70 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-6 sm:grid-cols-12 sm:items-center">
          <div className=" flex items-center justify-center rounded-xl bg-surface p-4 sm:col-span-5">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-44 w-auto object-contain"
            />
          </div>
          <div className="sm:col-span-7">
            <img
              src="/images/logo.png"
              alt="Adnan Rais & Sons"
              className="h-8 w-auto object-contain"
            />
            <h2 id="modal-product-title" className="mt-2 text-2xl font-bold text-navy">
              {product.name}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{product.description}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-xl bg-surface p-4 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Common Uses</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              {product.uses.map((u) => (
                <li key={u} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Available Options</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              {product.options.map((o) => (
                <li key={o} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-brand" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-5">
          <h3 className="text-sm font-semibold text-navy">Request a Quote for {product.name}</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="q-qty" className="block text-xs font-medium text-slate-600">
                Size, thickness or quantity (optional)
              </label>
              <input
                id="q-qty"
                type="text"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="e.g. 500 kg, 18 inch roll, printed"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-navy focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="q-notes" className="block text-xs font-medium text-slate-600">
                Your company / phone (optional)
              </label>
              <input
                id="q-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Your name or business"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-navy focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              <MessageCircle className="h-4 w-4" />
              Send via WhatsApp
            </a>
            <a
              href={`mailto:${company.email}?subject=${encodeURIComponent(`Quote Request: ${product.name}`)}&body=${encodeURIComponent(emailBody)}`}
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-mid"
            >
              <Mail className="h-4 w-4" />
              Send via Email
            </a>
            <a
              href={`tel:${company.phones[0]}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-navy"
            >
              <Phone className="h-4 w-4 text-brand" />
              Call {company.phones[0]}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ContactSection({ defaultProduct = '' }) {
  const { company, products } = useData()
  const [name, setName] = useState('')
  const [phoneOrEmail, setPhoneOrEmail] = useState('')
  const [product, setProduct] = useState(defaultProduct)
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState('whatsapp')

  useEffect(() => {
    if (defaultProduct) setProduct(defaultProduct)
  }, [defaultProduct])

  const buildText = () => {
    const lines = [
      `Assalamu Alaikum ${company.name},`,
      '',
      name && `Name: ${name}`,
      phoneOrEmail && `Contact: ${phoneOrEmail}`,
      product && `Product of interest: ${product}`,
      message && `Message: ${message}`,
    ].filter(Boolean)
    return lines.join('\n')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = buildText()
    if (channel === 'whatsapp') {
      window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    } else {
      const subject = product ? `Inquiry: ${product} — ${name || 'Website Visitor'}` : `Packaging Inquiry — ${name || 'Website Visitor'}`
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
    }
  }

  return (
    <section className="bg-surface py-16 sm:py-24" id="contact-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-0.5 w-7 bg-brand" />
              <span className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
                Get in Touch
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Let’s Build Something Better Together
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              We are always ready to support your packaging needs. Get in touch with us for inquiries,
              quotations or custom orders.
            </p>

            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                  <User className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-navy">{company.proprietor}</p>
                  <p className="text-slate-500">{company.role}</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium text-navy">{company.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 inline-block text-xs font-semibold text-brand-dark hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="font-semibold text-navy">
                  <a href={`tel:${company.phones[0]}`} className="hover:text-brand">{company.phones[0]}</a>
                  <span className="mx-2 text-slate-300">|</span>
                  <a href={`tel:${company.phones[1]}`} className="hover:text-brand">{company.phones[1]}</a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <a href={`mailto:${company.email}`} className="font-semibold text-navy hover:text-brand">
                    {company.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-9"
            >
              <h3 className="text-xl font-bold text-navy">Send Us a Message</h3>
              <p className="mt-1 text-xs text-slate-500">
                Choose WhatsApp or Email below — your message opens pre-filled and ready to send.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="block text-xs font-semibold text-slate-700">
                    Your Name *
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="c-contact" className="block text-xs font-semibold text-slate-700">
                    Phone or Email *
                  </label>
                  <input
                    id="c-contact"
                    type="text"
                    required
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="017XXXXXXXX or email"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-navy focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="c-product" className="block text-xs font-semibold text-slate-700">
                  Product / Solution (optional)
                </label>
                <select
                  id="c-product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 focus:border-navy focus:outline-none"
                >
                  <option value="">General Inquiry / Multiple Products</option>
                  {products.map((p) => (
                    <option key={p.slug} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label htmlFor="c-msg" className="block text-xs font-semibold text-slate-700">
                  Your Message *
                </label>
                <textarea
                  id="c-msg"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us the item, size, quantity or any custom printing requirement..."
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-navy focus:outline-none"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  onClick={() => setChannel('whatsapp')}
                  className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-mid"
                >
                  <MessageCircle className="h-4 w-4 text-brand" />
                  Send via WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  onClick={() => setChannel('email')}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-navy transition hover:bg-slate-50"
                >
                  <Mail className="h-4 w-4" />
                  Send via Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
