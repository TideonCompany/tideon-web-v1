'use client'

import { Check } from '@phosphor-icons/react'
import type { Stage, StageDate } from '@/types/order'

const STAGES: { key: Stage; label: string; shortLabel: string }[] = [
  { key: 'ordered',        label: 'Ordered',        shortLabel: 'Ordered' },
  { key: 'design',         label: 'Design Team',    shortLabel: 'Design' },
  { key: 'pre-production', label: 'Pre-Production', shortLabel: 'Pre-Prod' },
  { key: 'production',     label: 'Production',     shortLabel: 'Prod.' },
  { key: 'delivery',       label: 'Delivery',       shortLabel: 'Delivery' },
]

function stageIndex(stage: Stage): number {
  return STAGES.findIndex((s) => s.key === stage)
}

function formatStageDate(d: StageDate): string {
  const fmt = (iso: string) =>
    new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return d.end ? `${fmt(d.start)} – ${fmt(d.end)}` : fmt(d.start)
}

interface Props {
  currentStage: Stage
  stageDates?: Partial<Record<Stage, StageDate>>
}

export default function OrderStageBar({ currentStage, stageDates = {} }: Props) {
  const activeIdx = stageIndex(currentStage)
  const total = STAGES.length

  return (
    <div aria-label="Order progress" className="w-full">
      {/* Track + circles */}
      <div className="relative flex items-start justify-between">

        {/* Background track */}
        <div
          className="absolute top-[14px] left-[14px] right-[14px] h-[2px] bg-zinc-200"
          aria-hidden="true"
        />
        {/* Completed track */}
        <div
          className="absolute top-[14px] left-[14px] h-[2px] bg-[#00897b] transition-all duration-700"
          style={{ width: activeIdx === 0 ? '0%' : `${(activeIdx / (total - 1)) * (100 - (28 / 4))}%` }}
          aria-hidden="true"
        />

        {STAGES.map((stage, idx) => {
          const isCompleted = idx < activeIdx
          const isActive = idx === activeIdx
          const isFuture = idx > activeIdx

          return (
            <div
              key={stage.key}
              className="relative flex flex-col items-center z-10"
              style={{ width: `${100 / total}%` }}
              aria-current={isActive ? 'step' : undefined}
            >
              {/* Pulse ring on active */}
              {isActive && (
                <span
                  className="absolute top-0 w-7 h-7 rounded-full bg-[#00897b]/25 motion-safe:animate-ping"
                  style={{ animationDuration: '2s' }}
                  aria-hidden="true"
                />
              )}

              {/* Circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#00897b] border-[#00897b]'
                    : isActive
                    ? 'bg-[#00897b] border-[#00897b] shadow-[0_0_0_4px_rgba(0,137,123,0.15)]'
                    : 'bg-white border-zinc-200'
                }`}
              >
                {isCompleted ? (
                  <Check size={12} weight="bold" className="text-white" />
                ) : isActive ? (
                  <span className="w-2 h-2 rounded-full bg-white" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                )}
              </div>

              {/* Label */}
              <div className="flex flex-col items-center text-center mt-2 gap-0.5 px-0.5">
                <span
                  className={`font-semibold leading-tight ${
                    isCompleted || isActive ? 'text-[#00897b]' : 'text-zinc-400'
                  } text-[9px] sm:text-[11px]`}
                >
                  <span className="sm:hidden">{stage.shortLabel}</span>
                  <span className="hidden sm:inline">{stage.label}</span>
                </span>
                {stageDates[stage.key] && (
                  <span className="text-[9px] text-zinc-400 leading-tight hidden md:block">
                    {formatStageDate(stageDates[stage.key]!)}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
