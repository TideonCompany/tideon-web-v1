'use client'

import { Check } from '@phosphor-icons/react'
import type { Stage, StageDate } from '@/types/order'

const STAGES: { key: Stage; label: string }[] = [
  { key: 'ordered',        label: 'Ordered' },
  { key: 'design',         label: 'Design Team' },
  { key: 'pre-production', label: 'Mockup Approval' },
  { key: 'production',     label: 'Production' },
  { key: 'delivery',       label: 'Delivery' },
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

  // Progress line width: from left edge of first circle to center of active circle
  const progressPct = activeIdx === 0 ? 0 : (activeIdx / (total - 1)) * 100

  return (
    <div aria-label="Order progress" className="w-full">

      {/* Mobile: horizontal scroll container */}
      <div className="overflow-x-auto -mx-1 px-1 pb-1">
        <div className="relative min-w-[480px]">

          {/* Background track */}
          <div
            className="absolute top-[18px] left-[10%] right-[10%] h-[2px] bg-zinc-200"
            aria-hidden="true"
          />
          {/* Completed track */}
          <div
            className="absolute top-[18px] left-[10%] h-[2px] bg-[#00897b] transition-all duration-700"
            style={{ width: `${progressPct * 0.8}%` }}
            aria-hidden="true"
          />

          {/* Steps */}
          <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}>
            {STAGES.map((stage, idx) => {
              const isCompleted = idx < activeIdx
              const isActive    = idx === activeIdx
              const isFuture    = idx > activeIdx

              return (
                <div
                  key={stage.key}
                  className="flex flex-col items-center"
                  aria-current={isActive ? 'step' : undefined}
                >
                  {/* Circle + pulse */}
                  <div className="relative flex items-center justify-center mb-3">
                    {isActive && (
                      <span
                        className="absolute w-9 h-9 rounded-full bg-[#00897b]/20 motion-safe:animate-ping"
                        style={{ animationDuration: '2s' }}
                        aria-hidden="true"
                      />
                    )}
                    <div
                      className={`relative w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-[#00897b] border-[#00897b]'
                          : isActive
                          ? 'bg-[#00897b] border-[#00897b] shadow-[0_0_0_4px_rgba(0,137,123,0.15)]'
                          : 'bg-white border-zinc-200'
                      }`}
                    >
                      {isCompleted ? (
                        <Check size={14} weight="bold" className="text-white" />
                      ) : isActive ? (
                        <span className="w-2.5 h-2.5 rounded-full bg-white" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-zinc-300" />
                      )}
                    </div>
                  </div>

                  {/* Label */}
                  <span
                    className={`text-center font-bold text-[13px] leading-snug max-w-[100px] ${
                      isCompleted || isActive ? 'text-[#00897b]' : 'text-zinc-400'
                    }`}
                  >
                    {stage.label}
                  </span>

                  {/* Date */}
                  {stageDates[stage.key] && (
                    <span className="text-center text-[11px] text-zinc-400 leading-snug mt-1">
                      {formatStageDate(stageDates[stage.key]!)}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
