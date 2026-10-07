import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown, Gamepad2, Sparkles } from 'lucide-react'
import { EAC_BAN_CHECKER_GAMES, type EacGame } from '../data/eac-games'

type EacGameSelectProps = {
  value: string
  onChange: (gameId: string) => void
}

export function EacGameSelect({ value, onChange }: EacGameSelectProps) {
  const [open, setOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listboxId = useId()
  const labelId = useId()

  const selected = EAC_BAN_CHECKER_GAMES.find((g) => g.id === value)

  useEffect(() => {
    if (!open) return
    const onDocPointer = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocPointer)
    document.addEventListener('touchstart', onDocPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocPointer)
      document.removeEventListener('touchstart', onDocPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const idx = EAC_BAN_CHECKER_GAMES.findIndex((g) => g.id === value)
    setHighlightIndex(idx >= 0 ? idx : 0)
  }, [open, value])

  useEffect(() => {
    if (!open || !listRef.current) return
    const el = listRef.current.querySelector<HTMLElement>(`[data-index="${highlightIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [highlightIndex, open])

  function pick(game: EacGame) {
    onChange(game.id)
    setOpen(false)
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((o) => !o)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setHighlightIndex(0)
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex((i) => Math.min(i + 1, EAC_BAN_CHECKER_GAMES.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex((i) => Math.max(i - 1, 0))
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const game = EAC_BAN_CHECKER_GAMES[highlightIndex]
      if (game) pick(game)
    }
    if (e.key === 'Home') {
      e.preventDefault()
      setHighlightIndex(0)
    }
    if (e.key === 'End') {
      e.preventDefault()
      setHighlightIndex(EAC_BAN_CHECKER_GAMES.length - 1)
    }
  }

  const shellClass = open
    ? 'overflow-hidden rounded-2xl border border-z-soft/40 bg-[rgba(14,11,28,0.98)] shadow-[0_24px_80px_rgba(0,0,0,0.55)]'
    : ''

  const triggerClass = open
    ? 'rounded-b-none border-0 bg-z-accent/10 shadow-none hover:bg-z-accent/10'
    : 'border-white/15 bg-white/[0.04] hover:border-z-soft/35 hover:bg-white/[0.06]'

  return (
    <div ref={rootRef} className={`relative ${shellClass}`}>
      <button
        type="button"
        id={labelId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className={`flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left normal-case tracking-normal transition-all sm:px-6 sm:py-5 ${triggerClass}`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-z-accent/20">
          <Gamepad2 className="h-5 w-5 text-z-soft" strokeWidth={1.75} />
        </span>
        <span className="min-w-0 flex-1">
          {selected ? (
            <>
              <span className="block text-base font-semibold text-white sm:text-lg">{selected.name}</span>
              {selected.cleanerIncluded ? (
                <span className="mt-1 inline-flex items-center gap-1 text-sm text-z-soft">
                  <Sparkles className="h-3.5 w-3.5" />
                  Cleaner included
                </span>
              ) : (
                <span className="mt-1 block text-sm text-white/45">Easy Anti-Cheat title</span>
              )}
            </>
          ) : (
            <>
              <span className="block text-base font-semibold text-white/90 sm:text-lg">Select your EAC game</span>
              <span className="mt-1 block text-sm text-white/45">Fortnite, Rust, Apex, and more</span>
            </>
          )}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-z-soft transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>

      {open ? (
        <div onKeyDown={onListKeyDown} className="border-t border-white/10">
          <div className="bg-gradient-to-r from-z-accent/15 via-transparent to-transparent px-5 py-3 sm:px-6">
            <p className="text-sm font-semibold normal-case tracking-normal text-z-soft">Easy Anti-Cheat games</p>
            <p className="mt-0.5 text-sm normal-case text-white/45">
              {EAC_BAN_CHECKER_GAMES.length} titles supported
            </p>
          </div>
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={labelId}
            className="eac-game-select-scroll max-h-[min(20rem,50vh)] overflow-y-auto overscroll-contain px-3 pb-4 pt-2 sm:px-4"
          >
            {EAC_BAN_CHECKER_GAMES.map((game, index) => {
              const isSelected = game.id === value
              const isHighlighted = index === highlightIndex
              return (
                <li key={game.id} role="presentation" className="py-0.5">
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    data-index={index}
                    onMouseEnter={() => setHighlightIndex(index)}
                    onClick={() => pick(game)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left normal-case tracking-normal transition-colors ${
                      isHighlighted
                        ? 'bg-z-accent/30 ring-1 ring-z-soft/35'
                        : 'hover:bg-white/[0.06]'
                    } ${isSelected && !isHighlighted ? 'bg-z-accent/15' : ''}`}
                  >
                    <span className="min-w-0 flex-1 pr-2">
                      <span className="block text-base font-medium leading-snug text-white">{game.name}</span>
                      {game.cleanerIncluded ? (
                        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-z-soft/25 bg-z-accent/15 px-2.5 py-0.5 text-xs font-medium text-z-soft">
                          <Sparkles className="h-3 w-3 shrink-0" />
                          Cleaner included
                        </span>
                      ) : (
                        <span className="mt-1.5 block text-sm text-white/45">EAC protected</span>
                      )}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-z-accent/30 ${
                        isSelected ? 'opacity-100' : 'opacity-0'
                      }`}
                      aria-hidden={!isSelected}
                    >
                      <Check className="h-4 w-4 text-z-soft" strokeWidth={2.5} />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
