import { useEffect, useRef } from 'react'
import { FN_HOME_VIDEO } from '../data/media'

type HeroPanelVideoProps = {
  variant?: 'home' | 'forums'
}

/** Plays hero.webm only inside the hero panel (absolute fill). */
export function HeroPanelVideo({ variant = 'home' }: HeroPanelVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    if (!root || !video) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (reduceMotion || conn?.saveData) {
      video.pause()
      video.removeAttribute('autoplay')
      return
    }

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const markPlaying = () => {
      root.setAttribute('data-playing', 'true')
    }

    const tryPlay = () => {
      if (video.paused) void video.play().then(markPlaying).catch(() => {})
      else markPlaying()
    }

    const onError = () => {
      if (video.dataset.fallbackUsed === '1') return
      video.dataset.fallbackUsed = '1'
      video.src = '/videos/hero.mp4'
      video.load()
      tryPlay()
    }

    tryPlay()
    video.addEventListener('canplay', tryPlay)
    video.addEventListener('loadeddata', tryPlay, { once: true })
    video.addEventListener('playing', markPlaying)
    video.addEventListener('error', onError)
    video.addEventListener('pause', () => {
      if (!document.hidden) tryPlay()
    })

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tryPlay()
    })

    const retry = window.setInterval(tryPlay, 400)
    window.setTimeout(() => window.clearInterval(retry), 12000)

    return () => {
      window.clearInterval(retry)
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('error', onError)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="hero-video-wrap pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      data-hero-video
      aria-hidden
    >
      <video
        ref={videoRef}
        className="hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={D2_HOME_VIDEO.title}
      >
        <source src={D2_HOME_VIDEO.src} type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-tint pointer-events-none absolute inset-0 z-[2]" />
      <div className="hero-video-tint-glow pointer-events-none absolute inset-0 z-[2]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-z-bg via-z-bg/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-z-bg/70 to-transparent" />
    </div>
  )
}
