'use client'

import Link from 'next/link'

export default function ShopTile() {
  return (
    <Link
      href="/shop"
      style={{
        position: 'fixed', bottom: '32px', right: '32px', zIndex: 100,
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'rgba(249,247,242,0.92)', backdropFilter: 'blur(16px)',
        border: '1px solid rgba(168,136,122,0.25)',
        borderRadius: '16px', padding: '14px 20px',
        textDecoration: 'none', boxShadow: '0 8px 32px rgba(44,40,37,0.18)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.04)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(44,40,37,0.28)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(44,40,37,0.18)'
      }}
    >
      {/* "Tideon" in site font */}
      <span style={{
        fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
        fontWeight: 900, fontSize: '13px', letterSpacing: '-0.02em', color: '#2C2825',
        lineHeight: 1,
      }}>
        Tideon
      </span>

      {/* "Etsy" in Playfair Display — matches Etsy brand serif, orange, tilted */}
      <span style={{
        display: 'inline-block',
        transform: 'rotate(-9deg) translateY(-1px)',
        fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
        fontWeight: 700,
        fontStyle: 'italic',
        fontSize: '17px',
        color: '#F1641E',
        lineHeight: 1,
        letterSpacing: '-0.01em',
      }}>
        Etsy
      </span>

      <span style={{
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em',
        color: '#A8887A', textTransform: 'uppercase',
      }}>Shop →</span>
    </Link>
  )
}
