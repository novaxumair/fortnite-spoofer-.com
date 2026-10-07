import { useMemo, useState } from 'react'
import {
  ChevronRight,
  Clock,
  Cpu,
  Globe,
  HelpCircle,
  RotateCcw,
  ShieldQuestion,
  Sparkles,
  User,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { CheckoutLink } from '../components/CheckoutLink'
import { EacGameSelect } from '../components/EacGameSelect'
import { EAC_BAN_CHECKER_GAMES } from '../data/eac-games'
import { articlePath, forumPath } from '../data/blog-paths'
import {
  classifyBanType,
  type BanCheckerAnswers,
  type BanCheckerResult,
} from '../lib/ban-checker'
import { SITE_NAME } from '../data/site'

type StepId = keyof Omit<BanCheckerAnswers, 'gameId'>

const STEPS: { id: StepId; question: string; options: { value: string; label: string }[] }[] = [
  {
    id: 'canLoginOriginal',
    question: 'Can you still log in with the banned account?',
    options: [
      { value: 'yes', label: 'Yes, I can log in' },
      { value: 'no', label: 'No, login is blocked' },
      { value: 'unknown', label: 'Not sure / no message' },
    ],
  },
  {
    id: 'newAccountSamePc',
    question: 'On the same PC, what happens with a brand-new account?',
    options: [
      { value: 'banned_fast', label: 'Banned quickly again' },
      { value: 'works', label: 'Works normally' },
      { value: 'not_tried', label: 'Have not tried' },
    ],
  },
  {
    id: 'vpnHelps',
    question: 'Does a VPN or different network change the outcome?',
    options: [
      { value: 'yes', label: 'Yes, it helps' },
      { value: 'no', label: 'No change' },
      { value: 'not_tried', label: 'Have not tried' },
    ],
  },
  {
    id: 'reinstallHelped',
    question: 'Did a clean Windows reinstall change anything?',
    options: [
      { value: 'yes', label: 'Yes, problem went away' },
      { value: 'no', label: 'No change' },
      { value: 'not_tried', label: 'Have not reinstalled' },
    ],
  },
  {
    id: 'otherAccountsAffected',
    question: 'Did another person’s account fail on your PC?',
    options: [
      { value: 'yes', label: 'Yes, same PC issue' },
      { value: 'no', label: 'No, only my account' },
      { value: 'unknown', label: 'Not tested' },
    ],
  },
  {
    id: 'duration',
    question: 'How long has the restriction lasted?',
    options: [
      { value: 'hours', label: 'Less than 24 hours' },
      { value: 'days', label: 'A few days' },
      { value: 'weeks', label: 'Weeks or longer' },
      { value: 'permanent_unknown', label: 'Permanent / unknown' },
    ],
  },
  {
    id: 'noticeMentionsHardware',
    question: 'Does the notice mention device, machine, or hardware?',
    options: [
      { value: 'yes', label: 'Yes, hardware or machine wording' },
      { value: 'no', label: 'No, account-only wording' },
      { value: 'unknown', label: 'No notice / unclear' },
    ],
  },
]

const BAN_TYPE_LEGEND = [
  {
    icon: Cpu,
    title: 'HWID ban',
    text: 'New accounts fail on the same PC — buy HWID spoofer; no need to replace your machine.',
  },
  {
    icon: User,
    title: 'Account',
    text: 'Only the original login is blocked while fresh accounts play fine.',
  },
  {
    icon: Globe,
    title: 'Network / IP',
    text: 'Different network or VPN changes whether you can connect.',
  },
  {
    icon: Clock,
    title: 'Temporary',
    text: 'Short cooldowns or queue holds — not always a permanent ban.',
  },
] as const

const RESULT_BADGE_LABEL: Record<BanCheckerResult['type'], string> = {
  hwid_likely: 'Likely match',
  account_likely: 'Diagnostic result',
  ip_likely: 'Diagnostic result',
  temporary_possible: 'Diagnostic result',
  inconclusive: 'Diagnostic result',
}

const RESULT_META: Record<
  BanCheckerResult['type'],
  { icon: LucideIcon; ring: string; badge: string; panel: string; glow: string }
> = {
  hwid_likely: {
    icon: Cpu,
    ring: 'ring-rose-400/40',
    badge: 'bg-rose-500/20 text-rose-200 border-rose-400/25',
    panel: 'from-rose-500/12 via-[rgba(18,12,28,0.98)] to-[rgba(10,8,18,0.99)]',
    glow: 'shadow-[0_0_70px_rgba(244,63,94,0.15)]',
  },
  account_likely: {
    icon: User,
    ring: 'ring-amber-400/40',
    badge: 'bg-amber-500/20 text-amber-200 border-amber-400/25',
    panel: 'from-amber-500/10 via-[rgba(18,12,28,0.98)] to-[rgba(10,8,18,0.99)]',
    glow: 'shadow-[0_0_60px_rgba(251,191,36,0.12)]',
  },
  ip_likely: {
    icon: Globe,
    ring: 'ring-sky-400/40',
    badge: 'bg-sky-500/20 text-sky-200 border-sky-400/25',
    panel: 'from-sky-500/12 via-[rgba(18,12,28,0.98)] to-[rgba(10,8,18,0.99)]',
    glow: 'shadow-[0_0_60px_rgba(56,189,248,0.14)]',
  },
  temporary_possible: {
    icon: Clock,
    ring: 'ring-emerald-400/40',
    badge: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/25',
    panel: 'from-emerald-500/10 via-[rgba(18,12,28,0.98)] to-[rgba(10,8,18,0.99)]',
    glow: 'shadow-[0_0_60px_rgba(52,211,153,0.12)]',
  },
  inconclusive: {
    icon: HelpCircle,
    ring: 'ring-z-soft/35',
    badge: 'bg-z-accent/25 text-z-soft border-z-soft/25',
    panel: 'from-violet-500/10 via-[rgba(18,12,28,0.98)] to-[rgba(10,8,18,0.99)]',
    glow: 'shadow-[0_0_50px_rgba(139,92,246,0.12)]',
  },
}

function ResultPanel({ result, gameName }: { result: BanCheckerResult; gameName: string }) {
  const meta = RESULT_META[result.type]
  const Icon = meta.icon

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${meta.panel} p-6 ring-1 sm:p-8 ${meta.ring} ${meta.glow}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-black/30">
          <Icon className="h-6 w-6 text-z-soft" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p
            className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${meta.badge}`}
          >
            {RESULT_BADGE_LABEL[result.type]}
          </p>
          <h2 className="mt-3 text-2xl font-semibold normal-case tracking-tight text-white">{result.title}</h2>
        </div>
      </div>
      <p className="mt-4 text-base leading-relaxed text-white/70">
        {result.summary}{' '}
        <span className="text-white/90">
          Game: {gameName} · Easy Anti-Cheat
        </span>
      </p>
      <ul className="mt-5 space-y-2.5 rounded-xl border border-white/10 bg-black/20 p-4">
        {result.nextSteps.map((step, i) => (
          <li key={step} className="flex gap-3 text-sm text-white/65">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-z-accent/30 text-[11px] font-bold text-z-soft">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <CheckoutLink
          productId="fortnite-spoofer"
          className="cta-gradient flex-1 rounded-full px-5 py-3 text-center text-sm font-semibold text-white"
        >
          {result.type === 'hwid_likely' ? 'Buy HWID spoofer' : 'View spoofer plans'}
        </CheckoutLink>
        <a
          href={forumPath('complete-setup')}
          className="flex-1 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-center text-sm font-semibold text-white/90 hover:bg-white/[0.08]"
        >
          Setup guide
        </a>
      </div>
    </div>
  )
}

export function BanCheckerPage() {
  const [gameId, setGameId] = useState('')
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Partial<BanCheckerAnswers>>({})
  const [result, setResult] = useState<BanCheckerResult | null>(null)

  const game = EAC_BAN_CHECKER_GAMES.find((g) => g.id === gameId)
  const currentStep = STEPS[stepIndex]

  const canStart = Boolean(gameId)

  function reset() {
    setGameId('')
    setStepIndex(0)
    setAnswers({})
    setResult(null)
  }

  function setStepAnswer(value: string) {
    if (!currentStep) return
    const nextAnswers = { ...answers, [currentStep.id]: value } as Partial<BanCheckerAnswers>
    setAnswers(nextAnswers)

    if (stepIndex >= STEPS.length - 1) {
      const full: BanCheckerAnswers = {
        gameId,
        canLoginOriginal: nextAnswers.canLoginOriginal ?? 'unknown',
        newAccountSamePc: nextAnswers.newAccountSamePc ?? 'not_tried',
        vpnHelps: nextAnswers.vpnHelps ?? 'not_tried',
        reinstallHelped: nextAnswers.reinstallHelped ?? 'not_tried',
        otherAccountsAffected: nextAnswers.otherAccountsAffected ?? 'unknown',
        duration: nextAnswers.duration ?? 'permanent_unknown',
        noticeMentionsHardware: nextAnswers.noticeMentionsHardware ?? 'unknown',
      }
      setResult(classifyBanType(full))
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  const progress = useMemo(() => {
    if (result) return 100
    if (!canStart) return 8
    return Math.round(((stepIndex + 1) / (STEPS.length + 1)) * 100)
  }, [canStart, stepIndex, result])

  return (
    <div className="content-surface min-h-screen overflow-x-hidden text-white">
      <Navbar currentPath="/ban-checker" />

      <main className="page-x pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start gap-4">
            <div className="icon-well shrink-0">
              <ShieldQuestion className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-z-soft/25 bg-z-accent/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-z-soft">
                <Sparkles className="h-4 w-4" />
                Free diagnostic
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                HWID ban checker
              </h1>
              <p className="mt-3 text-base leading-relaxed text-white/60">
                Compare your symptoms with account, IP, HWID ban, and temporary-restriction patterns
                for Easy Anti-Cheat games. This is not an official EAC database lookup.
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {BAN_TYPE_LEGEND.map(({ icon: Icon, title, text }) => (
              <li key={title} className="glass rounded-2xl p-4">
                <Icon className="h-5 w-5 text-z-soft" strokeWidth={1.75} />
                <p className="mt-2 text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/55">{text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center justify-between gap-4">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-white/50">Progress</p>
            <p className="text-sm tabular-nums text-z-soft">{progress}%</p>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-z-accent via-violet-400 to-z-soft transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-z-soft/20 bg-[rgba(12,10,26,0.92)] shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="border-b border-white/10 bg-gradient-to-r from-z-accent/15 via-transparent to-transparent px-7 py-6">
              <p className="text-base font-semibold text-white">What game were you banned from?</p>
              <p className="mt-1 text-sm text-white/50">
                Easy Anti-Cheat titles only — matches {SITE_NAME} coverage.
              </p>
            </div>

            <div className="p-7 sm:p-8">
              <EacGameSelect
                value={gameId}
                onChange={(id) => {
                  setGameId(id)
                  setStepIndex(0)
                  setAnswers({})
                  setResult(null)
                }}
              />

              {!canStart ? (
                <p className="mt-6 rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-5 text-center text-base text-white/50">
                  Open the list above and pick your game to start the questionnaire.
                </p>
              ) : result && game ? (
                <div className="mt-8 animate-[fadeIn_0.35s_ease-out]">
                  <ResultPanel result={result} gameName={game.name} />
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-z-soft hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Start over
                  </button>
                </div>
              ) : currentStep ? (
                <div key={stepIndex} className="mt-8 animate-[fadeIn_0.3s_ease-out]">
                  <div className="flex flex-wrap items-center gap-2">
                    {STEPS.map((_, i) => (
                      <span
                        key={STEPS[i].id}
                        className={`h-1.5 flex-1 min-w-[2rem] max-w-[3rem] rounded-full transition-colors ${
                          i < stepIndex
                            ? 'bg-z-soft'
                            : i === stepIndex
                              ? 'bg-gradient-to-r from-z-accent to-z-soft'
                              : 'bg-white/10'
                        }`}
                        aria-hidden
                      />
                    ))}
                  </div>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-z-soft/90">
                    Question {stepIndex + 1} of {STEPS.length}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {currentStep.question}
                  </h2>
                  <div className="mt-6 grid gap-3">
                    {currentStep.options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setStepAnswer(opt.value)}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left text-base text-white/90 transition-all hover:border-z-soft/45 hover:bg-white/[0.07]"
                      >
                        {opt.label}
                        <ChevronRight className="h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:translate-x-0.5 group-hover:text-z-soft" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <section className="mt-14 space-y-6">
            <div className="glass rounded-2xl p-6 sm:p-7">
              <h2 className="text-xl font-semibold text-white">What is an HWID ban?</h2>
              <p className="mt-3 text-base leading-relaxed text-white/60">
                Enforcement can bind to firmware, storage, and OS identifiers — not just one Epic login.
                Reinstalling Windows or buying a new PC is not the fix most players need;{' '}
                <a href="/store" className="text-z-soft hover:text-white">
                  HWID spoofer
                </a>{' '}
                gives you a clean hardware profile on the PC you already own.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 sm:p-7">
              <h2 className="text-xl font-semibold text-white">Learn before you buy</h2>
              <p className="mt-3 text-base leading-relaxed text-white/60">
                Read our{' '}
                <a href={articlePath('how-hwid-bans-work')} className="text-z-soft hover:text-white">
                  HWID ban guide
                </a>{' '}
                and{' '}
                <a href={articlePath('games-that-hwid-ban')} className="text-z-soft hover:text-white">
                  EAC games list
                </a>{' '}
                — then check{' '}
                <a href="/status" className="text-z-soft hover:text-white">
                  loader status
                </a>{' '}
                before checkout.
              </p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
