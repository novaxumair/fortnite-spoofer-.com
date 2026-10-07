import { useEffect, useRef } from 'react'
import { FN_HOME_VIDEO } from '../data/media'

type ProductPreviewProps = {
  className?: string
}

/** Muted loop preview for product sections (cover fit). */
export function ProductPreview({ className = '' }: ProductPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    const play = () => void video.play().catch(() => {})
    video.addEventListener('canplay', play, { once: true })
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) play()
    return () => video.removeEventListener('canplay', play)
  }, [])

  return (
    <div className={`overflow-hidden rounded-2xl border border-z-soft/15 bg-black/40 ${className}`}>
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={FN_HOME_VIDEO.poster}
          aria-label={FN_HOME_VIDEO.title}
        >
          <source src={FN_HOME_VIDEO.src} type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <p className="sr-only">{FN_HOME_VIDEO.title}</p>
    </div>
  )
}
