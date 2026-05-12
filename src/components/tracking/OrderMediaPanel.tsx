export default function OrderMediaPanel({ assetUrl }: { assetUrl?: string }) {
  const src = assetUrl ?? '/Extruder.mp4'
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm')

  return (
    <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-[#edfaf8] to-[#f5f5f7] rounded-2xl p-6 min-h-[240px] overflow-hidden">
      {/* Glow rings */}
      <div className="absolute w-48 h-48 rounded-full bg-[#00f5d1]/10 blur-2xl" aria-hidden="true" />
      <div className="absolute w-36 h-36 rounded-full border border-[#00897b]/15" aria-hidden="true" />
      <div className="absolute w-52 h-52 rounded-full border border-[#00897b]/08" aria-hidden="true" />

      {/* Media */}
      <div className="relative z-10 w-full max-w-[200px]">
        {isVideo ? (
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-contain drop-shadow-md"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Order product" className="w-full h-auto object-contain drop-shadow-md" />
        )}
      </div>

      {/* Status label */}
      <div className="relative z-10 mt-4 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00897b] animate-pulse" aria-hidden="true" />
        <span className="text-[11px] text-zinc-500 font-medium">Custom production in progress</span>
      </div>
    </div>
  )
}
