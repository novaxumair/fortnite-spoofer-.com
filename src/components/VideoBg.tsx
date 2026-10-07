import { useEffect, useRef, useState } from 'react'
import { FN_HERO, FN_HOME_VIDEO } from '../data/media'

type VideoBgProps = {
  /** Static fallback when reduced motion / save-data */
  image?: string
  imageAlt?: string
}

function prefersStaticHero() {
  if (typeof window === 'undefined') return false
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return reduceMotion || conn?.saveData === true
}

/** Full-bleed hero video — muted loop, cover fit. */
export function VideoBg({
  image = FN_HERO,
  imageAlt = 'Fortnite gameplay preview on Windows PC',
}: VideoBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [posterOnly, setPosterOnly] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (prefersStaticHero()) {
      setPosterOnly(true)
      video.pause()
      video.removeAttribute('autoplay')
      return
    }

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const tryPlay = () => {
      if (video.paused) void video.play().catch(() => {})
    }

    tryPlay()
    video.addEventListener('canplay', tryPlay, { once: true })
    video.addEventListener('loadeddata', tryPlay, { once: true })

    const onVisibility = () => {
      if (!document.hidden) tryPlay()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  if (posterOnly) {
    return (
      <div className="hero-video-wrap absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          src={image}
          alt={imageAlt}
          className="hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="hero-video-tint pointer-events-none absolute inset-0 z-[2]" aria-hidden />
        <div className="hero-video-tint-glow pointer-events-none absolute inset-0 z-[2]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-z-bg via-z-bg/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-z-bg/70 to-transparent" />
      </div>
    )
  }

  return (
    <div className="hero-video-wrap absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 z-0 bg-z-bg" aria-hidden />
      <video
        ref={videoRef}
        className="hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={FN_HOME_VIDEO.poster}
        aria-label={FN_HOME_VIDEO.title}
      >
        <source src={FN_HOME_VIDEO.src} type="video/webm" />
      </video>
      <span className="sr-only">{imageAlt}</span>
      <div className="hero-video-tint pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="hero-video-tint-glow pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-z-bg via-z-bg/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-z-bg/70 to-transparent" />
    </div>
  )
}
