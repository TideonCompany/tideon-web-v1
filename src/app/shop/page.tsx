'use client'

import { motion, useAnimation } from 'framer-motion'
import { ArrowUpRight, Droplets, Package, Cpu, CircleDot } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useRef } from 'react'

const categories = [
  {
    id: 'aquatics',
    label: 'Aquatics',
    tagline: 'Precision-crafted feeding rings & aquatic accessories',
    description:
      'Beautifully engineered 3D-printed accessories for aquariums and pond keeping. Feeding rings, surface skimmers, and custom mounts — designed for function, finished to look at home in any setup.',
    icon: Droplets,
    accent: '#6BAED6',
    etsy: 'https://www.etsy.com',
    tags: ['Feeding Rings', 'Skimmers', 'Mounts'],
  },
  {
    id: 'edc',
    label: 'Everyday Carry',
    tagline: 'Pocket whistles, keychains & carry essentials',
    description:
      'Compact objects built to last. Our EDC line focuses on everyday utility with a premium finish — whistle pendants with perfect tone, minimalist keychains, and accessories that earn their place in your pocket.',
    icon: Package,
    accent: '#A8887A',
    etsy: 'https://www.etsy.com',
    tags: ['Whistles', 'Keychains', 'Clips'],
  },
  {
    id: 'tech',
    label: 'Tech & PC',
    tagline: 'Custom PC parts & precision mods',
    description:
      'Cable management solutions, fan grills, GPU supports, and bespoke PC components. Each piece is modeled to fit specific builds — clean lines, tight tolerances, and a finish that photographs beautifully.',
    icon: Cpu,
    accent: '#74C69D',
    etsy: 'https://www.etsy.com',
    tags: ['Cable Mgmt', 'Fan Grills', 'GPU Supports'],
  },
  {
    id: 'fidgets',
    label: 'Fidgets',
    tagline: 'Precision spinners engineered for feel',
    description:
      'Not toys — instruments. Our spinners are balanced to sub-gram tolerances using multi-material prints and precision bearings. The spin time and tactile weight are dialed in obsessively.',
    icon: CircleDot,
    accent: '#C9A96E',
    etsy: 'https://www.etsy.com',
    tags: ['Spinners', 'Rollers', 'Clickers'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

const shakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -5, 5, -4, 4, -2, 2, 0],
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
}

const magicalVariants = {
  visible: { opacity: 1, transition: { duration: 0.4 } },
  fade: {
    opacity: [1, 0, 1],
    transition: { duration: 3.5, ease: 'easeInOut', times: [0, 0.15, 1] },
  },
}

function MagicalText() {
  const controls = useAnimation()
  const spanRef = useRef<HTMLSpanElement>(null)
  const firedRef = useRef(false)

  const handleHover = useCallback(async () => {
    // Only fire once ever
    if (firedRef.current) return
    firedRef.current = true

    const el = spanRef.current
    if (el) {
      const rect = el.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) / window.innerWidth
      const y = (rect.top + rect.height / 2) / window.innerHeight
      const confetti = (await import('canvas-confetti')).default
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x, y },
        colors: ['#8B5E3C', '#A8887A', '#C9A96E', '#F9F7F2', '#2C2825'],
        scalar: 0.8,
        gravity: 0.9,
        drift: 0.1,
        ticks: 180,
      })
    }
    controls.start('fade')
  }, [controls])

  return (
    <motion.span
      ref={spanRef}
      variants={magicalVariants}
      animate={controls}
      onHoverStart={handleHover}
      onTap={handleHover}
      style={{
        background: 'linear-gradient(135deg, #C9A96E 0%, #E8C99A 50%, #C9A96E 100%)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        cursor: 'default', display: 'inline-block',
      }}
    >
      Purely Magical.
    </motion.span>
  )
}

export default function ShopPage() {
  const shakeControls = useAnimation()

  return (
    <main
      style={{
        background: '#F9F7F2',
        minHeight: '100vh',
        fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
        color: '#2C2825',
      }}
    >
      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 24px', borderBottom: '1px solid rgba(44,40,37,0.08)',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
            fontWeight: 900, fontSize: '20px', letterSpacing: '-0.04em', color: '#2C2825',
            lineHeight: 1,
          }}>
            TIDEON
          </span>
          {/* Etsy wordmark — Playfair Display italic, orange, tilted */}
          <span style={{
            display: 'inline-block',
            transform: 'rotate(-9deg) translateY(-2px)',
            fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontStyle: 'italic',
            fontSize: '24px',
            color: '#F1641E',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}>
            Etsy
          </span>
        </Link>
        {/* Desktop nav links — hidden on mobile */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}
          className="shop-nav-links">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} style={{
              fontSize: '12px', fontWeight: 500, letterSpacing: '0.04em',
              color: '#2C2825', textDecoration: 'none', opacity: 0.6, transition: 'opacity 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
            >
              {c.label.toUpperCase()}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile nav — category pills shown only on mobile */}
      <div className="shop-mobile-nav" style={{
        display: 'none', overflowX: 'auto', gap: '8px',
        padding: '12px 24px', borderBottom: '1px solid rgba(44,40,37,0.06)',
        scrollbarWidth: 'none',
      }}>
        {categories.map((c) => (
          <a key={c.id} href={`#${c.id}`} style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
            color: '#A8887A', textDecoration: 'none', whiteSpace: 'nowrap',
            background: 'rgba(168,136,122,0.1)', borderRadius: '100px',
            padding: '7px 14px', flexShrink: 0,
          }}>
            {c.label.toUpperCase()}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .shop-nav-links { display: none !important; }
          .shop-mobile-nav { display: flex !important; }
          .shop-hero { padding: 48px 24px 40px !important; }
          .shop-grid { padding: 0 24px 80px !important; }
          .shop-card { padding: 28px !important; border-radius: 16px !important; }
          .shop-footer { padding: 28px 24px !important; }
        }
      `}</style>

      {/* Hero */}
      <section className="shop-hero" style={{ padding: '40px 48px 32px', maxWidth: '900px' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em',
            color: '#A8887A', textTransform: 'uppercase', marginBottom: '10px',
          }}
        >
          Handcrafted · 3D Printed · Made to Order
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          style={{
            fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
            fontSize: 'clamp(52px, 8vw, 118px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {/* "Perfect" — grows 10% on hover/tap */}
          <motion.span
            whileHover={{ scale: 1.10 }}
            whileTap={{ scale: 1.10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            style={{
              display: 'inline-block', cursor: 'default', transformOrigin: 'left center',
              background: 'linear-gradient(135deg, #8B5E3C 0%, #C9A96E 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            Perfect,
          </motion.span>

          {/* "Practical" — subtle side-to-side shake on hover/tap */}
          <motion.span
            variants={shakeVariants}
            animate={shakeControls}
            onHoverStart={() => shakeControls.start('shake')}
            onHoverEnd={() => shakeControls.start('idle')}
            onTap={() => shakeControls.start('shake')}
            style={{
              display: 'inline-block', cursor: 'default',
              background: 'linear-gradient(135deg, #A8887A 0%, #C9A96E 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            Practical,
          </motion.span>

          {/* "And Purely Magical." — confetti + fade out/in */}
          <MagicalText />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          style={{
            fontSize: '17px', lineHeight: 1.7, color: '#6B6560',
            maxWidth: '560px', fontWeight: 400,
          }}
        >
          Every piece is modeled in-house, printed with industrial-grade machines,
          and finished by hand. Available exclusively on Etsy — ship worldwide.
        </motion.p>
      </section>

      {/* Category grid */}
      <section className="shop-grid" style={{ padding: '0 48px 120px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap: '24px',
        }}>
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.id}
                id={cat.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                className="shop-card"
                style={{
                  background: '#fff', borderRadius: '24px', padding: '48px',
                  display: 'flex', flexDirection: 'column', gap: '24px',
                  boxShadow: '0 2px 24px rgba(44,40,37,0.06)',
                  border: '1px solid rgba(44,40,37,0.06)',
                }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(44,40,37,0.12)' }}
              >
                {/* Icon + tags */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '16px',
                    background: `${cat.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={24} color={cat.accent} strokeWidth={1.5} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {cat.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
                        color: cat.accent, background: `${cat.accent}14`,
                        borderRadius: '100px', padding: '4px 12px',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h2 style={{
                    fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
                    fontSize: '28px', fontWeight: 900, letterSpacing: '-0.04em',
                    color: '#2C2825', marginBottom: '8px',
                  }}>
                    {cat.label}
                  </h2>
                  <p style={{
                    fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em',
                    color: cat.accent, textTransform: 'uppercase', marginBottom: '16px',
                  }}>
                    {cat.tagline}
                  </p>
                  <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#6B6560' }}>
                    {cat.description}
                  </p>
                </div>

                {/* CTA */}
                <a
                  href={cat.etsy}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: '#2C2825', color: '#F9F7F2', borderRadius: '100px',
                    padding: '14px 24px', fontSize: '13px', fontWeight: 700,
                    letterSpacing: '0.04em', textDecoration: 'none', alignSelf: 'flex-start',
                    transition: 'background 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = cat.accent; e.currentTarget.style.transform = 'scale(1.03)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#2C2825'; e.currentTarget.style.transform = 'scale(1)' }}
                >
                  View on Etsy <ArrowUpRight size={15} strokeWidth={2} />
                </a>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Bottom fade — matches main page */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '120px', pointerEvents: 'none', zIndex: 40,
        background: 'linear-gradient(to bottom, transparent 0%, rgba(249,247,242,0.7) 50%, rgba(249,247,242,0.98) 100%)',
        backdropFilter: 'blur(2px)',
      }} />

      {/* Footer */}
      <footer className="shop-footer" style={{
        borderTop: '1px solid rgba(44,40,37,0.08)', padding: '40px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
      }}>
        <span style={{ fontSize: '13px', color: '#A8A09A', fontWeight: 500 }}>
          © {new Date().getFullYear()} Tideon Prints. All rights reserved.
        </span>
        <Link href="/" style={{
          fontSize: '13px', fontWeight: 600, color: '#2C2825',
          textDecoration: 'none', letterSpacing: '0.04em', opacity: 0.5, transition: 'opacity 0.2s',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
        >
          ← Back to main site
        </Link>
      </footer>
    </main>
  )
}
