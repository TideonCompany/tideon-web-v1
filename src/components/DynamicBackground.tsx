'use client'

export default function DynamicBackground() {
  return (
    <div className="dynamic-bg">
      <div className="orb orb-1 orb-drift-a" />
      <div className="orb orb-2 orb-drift-b" />
      <div className="orb orb-3 orb-drift-c" />
      <div className="noise-overlay absolute inset-0 opacity-[0.025] pointer-events-none" />
    </div>
  )
}
