import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react'
import { joinWaitlist } from './lib/waitlist'
import './App.css'

const products = [
  {
    name: 'Elongated Wool Coat',
    meta: 'Outerwear · Lengthened for 5\'9"+',
    price: '£485',
    image: '/images/hero-tall-coat.png',
    alt: 'Tall woman in floor-grazing charcoal wool coat',
  },
  {
    name: 'Column Silk Dress',
    meta: 'Dresses · Floor-true hem',
    price: '£320',
    image: '/images/product-silk-dress.png',
    alt: 'Tall woman in floor-length ivory silk dress',
  },
  {
    name: 'Extra-Long Tailored Trouser',
    meta: 'Trousers · 36" inseam',
    price: '£195',
    image: '/images/product-trousers.png',
    alt: 'Extra-long tailored charcoal trousers for tall women',
  },
  {
    name: 'Cashmere Turtleneck',
    meta: 'Knitwear · Extended sleeve & rise',
    price: '£240',
    image: '/images/product-cashmere.png',
    alt: 'Tall woman in elongated black cashmere turtleneck',
  },
] as const

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

function App() {
  const [navSolid, setNavSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [waitlistState, setWaitlistState] = useState<
    'idle' | 'loading' | 'done' | 'error'
  >('idle')

  const fitRef = useReveal<HTMLElement>()
  const collectionRef = useReveal<HTMLElement>()
  const lookbookRef = useReveal<HTMLElement>()
  const waitlistRef = useReveal<HTMLElement>()

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  async function onWaitlistSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || waitlistState === 'loading') return

    setWaitlistState('loading')

    try {
      await joinWaitlist(email)
      setWaitlistState('done')
      setEmail('')
    } catch {
      setWaitlistState('error')
    }
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="page">
      <header className={`nav ${navSolid || menuOpen ? 'nav--solid' : ''}`}>
        <a href="#top" className="nav__brand" onClick={closeMenu}>
          Adrielle
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href="#collection">Collection</a>
          <a href="#fit">The Fit</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#waitlist" className="nav__cta">
            Join Waitlist
          </a>
        </nav>

        <button
          type="button"
          className={`nav__toggle ${menuOpen ? 'is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <a href="#collection" onClick={closeMenu}>
          Collection
        </a>
        <a href="#fit" onClick={closeMenu}>
          The Fit
        </a>
        <a href="#lookbook" onClick={closeMenu}>
          Lookbook
        </a>
        <a href="#waitlist" onClick={closeMenu}>
          Join Waitlist
        </a>
      </div>

      <main id="top">
        <section className="hero" aria-label="Hero">
          <div className="hero__media">
            <img
              src="/images/hero-tall-coat.png"
              alt="Tall woman wearing Adrielle elongated charcoal coat"
              className="hero__image"
            />
            <div className="hero__veil" aria-hidden="true" />
          </div>

          <div className="hero__content">
            <p className="hero__brand">Adrielle</p>
            <h1 className="hero__headline">Designed for the tall frame.</h1>
            <p className="hero__lede">
              Elevated clothing proportioned exclusively for women 5&apos;9&quot; and above —
              no alterations, no compromise.
            </p>
            <div className="hero__actions">
              <a href="#collection" className="btn btn--light">
                Explore Collection
              </a>
              <a href="#waitlist" className="btn btn--ghost">
                Join the Waitlist
              </a>
            </div>
          </div>
        </section>

        <section id="fit" className="fit reveal" ref={fitRef}>
          <div className="fit__copy">
            <p className="eyebrow">The Fit</p>
            <h2>Every inch, considered.</h2>
            <p>
              Standard sizes shorten rises, sleeves, and hems. Adrielle drafts from
              tall proportions first — elongated torsos, true inseams, and seams that
              fall where they should.
            </p>
            <ul className="fit__list">
              <li>
                <strong>Inseams to 36&quot;</strong>
                <span>Trousers that reach the floor without a tailor.</span>
              </li>
              <li>
                <strong>Extended sleeve &amp; rise</strong>
                <span>Knits and trousers that honor longer limbs.</span>
              </li>
              <li>
                <strong>Floor-true hems</strong>
                <span>Dresses and coats cut for height, not cropped by default.</span>
              </li>
            </ul>
          </div>
          <figure className="fit__figure">
            <img
              src="/images/detail-atelier.png"
              alt="Close detail of Adrielle wool construction and elongated seams"
            />
            <figcaption>Atelier detail — elongated construction</figcaption>
          </figure>
        </section>

        <section id="collection" className="collection reveal" ref={collectionRef}>
          <div className="section-head">
            <p className="eyebrow">Collection</p>
            <h2>First edition pieces</h2>
            <p className="section-head__lede">
              A focused edit of essentials — tailored, fluid, and built for height.
            </p>
          </div>

          <div className="collection__grid">
            {products.map((product, i) => (
              <article
                key={product.name}
                className="product"
                style={{ '--delay': `${i * 80}ms` } as CSSProperties}
              >
                <div className="product__media">
                  <img src={product.image} alt={product.alt} loading="lazy" />
                </div>
                <div className="product__meta">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.meta}</p>
                  </div>
                  <span className="product__price">{product.price}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="lookbook" className="lookbook reveal" ref={lookbookRef}>
          <div className="lookbook__frame">
            <img
              src="/images/lookbook-gallery.png"
              alt="Two tall women in Adrielle coats and dresses in a sunlit gallery"
              loading="lazy"
            />
            <div className="lookbook__overlay">
              <p className="eyebrow eyebrow--light">Lookbook</p>
              <h2>Presence, uninterrupted.</h2>
              <p>Clothing that moves with you — long lines, quiet luxury, no apology.</p>
            </div>
          </div>
        </section>

        <section id="waitlist" className="waitlist reveal" ref={waitlistRef}>
          <div className="waitlist__inner">
            <p className="eyebrow">Early Access</p>
            <h2>Be first when we open.</h2>
            <p>
              Join the Adrielle waitlist for first looks, fit guides, and launch access.
            </p>

            {waitlistState === 'done' ? (
              <p className="waitlist__success" role="status">
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            ) : (
              <form className="waitlist__form" onSubmit={onWaitlistSubmit}>
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (waitlistState === 'error') setWaitlistState('idle')
                  }}
                  disabled={waitlistState === 'loading'}
                />
                <button
                  type="submit"
                  className="btn btn--dark"
                  disabled={waitlistState === 'loading'}
                >
                  {waitlistState === 'loading' ? 'Joining…' : 'Join Waitlist'}
                </button>
                {waitlistState === 'error' ? (
                  <p className="waitlist__error" role="alert">
                    Something went wrong. Please try again.
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__brand">
          <span className="footer__name">Adrielle</span>
          <p>Clothing exclusively for tall women.</p>
        </div>
        <div className="footer__cols">
          <div>
            <h3>Explore</h3>
            <a href="#collection">Collection</a>
            <a href="#fit">The Fit</a>
            <a href="#lookbook">Lookbook</a>
          </div>
          <div>
            <h3>Contact</h3>
            <a href="mailto:hello@adrielle.studio">hello@adrielle.studio</a>
            <a href="#waitlist">Waitlist</a>
          </div>
        </div>
        <div className="footer__base">
          <p>© {new Date().getFullYear()} Adrielle. All rights reserved.</p>
          <p>Proportioned for 5&apos;9&quot; and above.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
