import { Medal, Timer, Crosshair, ShieldCheck } from '@phosphor-icons/react'

const features = [
  {
    icon: Medal,
    title: 'Industrial Grade Materials',
    desc: 'We use certified materials that meet the highest industry standards.',
  },
  {
    icon: Timer,
    title: 'Fast Turnaround',
    desc: 'Average 3 week turnaround from design to delivery.',
  },
  {
    icon: Crosshair,
    title: 'Precision Accuracy',
    desc: 'Sub-0.1mm precision on every layer of every part.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Guaranteed',
    desc: 'Every part is inspected and tested before it leaves our facility.',
  },
]

export default function OrderFeatureStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-t border-zinc-200 mt-10">
      {features.map((f) => {
        const Icon = f.icon
        return (
          <div key={f.title} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00897b]/10 flex items-center justify-center flex-shrink-0">
              <Icon size={17} weight="duotone" className="text-[#00897b]" />
            </div>
            <div>
              <div className="text-[#1d1d1f] font-semibold text-[13px] mb-1">{f.title}</div>
              <div className="text-zinc-500 text-[12px] leading-relaxed">{f.desc}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
