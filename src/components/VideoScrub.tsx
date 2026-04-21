'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

export default function VideoIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)

  // Runs before first paint — guaranteed to apply before user sees anything
  useLayoutEffect(() => {
    const video     = videoRef.current
    const container = containerRef.current
    const videoWrap = videoWrapRef.current
    if (!video || !container || !videoWrap) return

    const isMobile =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      'ontouchstart' in window ||
      window.innerWidth <= 1024

    if (isMobile) {
      // Size: fill full screen WIDTH so portrait phones get maximum size
      // (height-only sizing fails when video is landscape-format)
      video.style.width    = '100vw'
      video.style.height   = 'auto'
      video.style.maxWidth = 'none'

      // Position: small top padding, center video in remaining space
      container.style.paddingTop  = '3vh'
      videoWrap.style.alignItems  = 'center'
      videoWrap.style.marginTop   = '0px'
      videoWrap.style.paddingTop  = '0px'
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    const el    = containerRef.current
    if (!video || !el) return

    const isIOS     = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    const isAndroid = /Android/i.test(navigator.userAgent)
    const isMobile  = isIOS || isAndroid

    let rafId       = 0
    let ready       = false
    let displayTime = 0
    let lastTs      = 0

    const onReady = () => {
      video.currentTime = 0
      displayTime = 0
      ready = true

      // All platforms: keep video playing at rate 0 — GPU decode pipeline stays warm,
      // no play/pause jank. Rate adjustments are instant with no pipeline restarts.
      video.playbackRate = 0
      video.play().catch(() => {})

      rafId = requestAnimationFrame(tick)
    }

    if (isIOS) video.load()

    const tick = (ts: number) => {
      const delta = lastTs ? Math.min(ts - lastTs, 50) : 8
      lastTs = ts

      const scrollY = window.scrollY
      const vh      = window.innerHeight

      el.style.opacity = String(Math.max(0, 1 - scrollY / (vh * 1.08)))

      if (ready && video.duration) {
        const targetProgress = Math.min(1, scrollY / (vh * 1.2))
        const targetTime     = targetProgress * video.duration

        if (isIOS) {
          // iOS Safari: direct currentTime with lerp — playbackRate unreliable on WebKit
          const factor = 1 - Math.exp(-delta / 60)
          displayTime += (targetTime - displayTime) * factor
          try { video.currentTime = displayTime } catch (_) {}

        } else {
          // Desktop + Android: playbackRate only — never pause, never seek unless backward
          const diff = targetTime - video.currentTime
          if (diff > 0.012) {
            // Forward: ramp rate proportionally, cap at 8x for fast scrolls
            video.playbackRate = Math.min(8, Math.max(0.25, diff * 20))
          } else if (diff < -0.04) {
            // Backward: only case where we must seek
            video.playbackRate = 0
            try { video.currentTime = targetTime } catch (_) {}
          } else {
            // In sync — freeze
            video.playbackRate = 0
          }
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    video.preload = 'auto'

    if (video.readyState >= 4) {
      onReady()
    } else {
      video.addEventListener('canplaythrough', onReady, { once: true })
      setTimeout(() => { if (!ready && video.readyState >= 1) onReady() }, 2000)
    }

    return () => {
      cancelAnimationFrame(rafId)
      video.pause()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none bg-white"
      style={{
        willChange: 'opacity',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '6vh',
      }}
    >
      {/* Title */}
      <div
        style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        className="select-none"
      >
        <h1
          className="font-black text-[#1d1d1f]"
          style={{
            fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(56px, 14vw, 118px)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            margin: 0,
            padding: 0,
            textAlign: 'center',
            width: '100%',
          }}
        >
          TIDEON
        </h1>
        <span
          style={{
            fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(18px, 5vw, 21px)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginTop: '6px',
            display: 'block',
            textAlign: 'center',
            width: '100%',
            background: 'linear-gradient(135deg, #004d40 0%, #00897b 45%, #00f5d1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          PRINTS
        </span>
      </div>

      {/* Video wrapper */}
      <div
        ref={videoWrapRef}
        style={{
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          marginTop: '1vh',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src="/Extruder.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            height: 'clamp(300px, 62vh, 700px)',
            width: 'auto',
            maxWidth: '92%',
            objectFit: 'contain',
            pointerEvents: 'none',
            display: 'block',
            margin: '0 auto',
            opacity: 0.92,
            willChange: 'transform',
          }}
        />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.5) 60%, white 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Scroll arrow */}
      <div
        className="select-none"
        style={{
          position: 'absolute',
          bottom: '5vh',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          animation: 'bounce 2s infinite',
          zIndex: 20,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: '#a1a1aa', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 300 }}>Scroll</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 7L10 13L16 7" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}
