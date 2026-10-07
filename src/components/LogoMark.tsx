type LogoMarkProps = {
  className?: string
  /** Above-the-fold brand mark (header). Footer should omit for lazy load. */
  priority?: boolean
}

export function LogoMark({ className = '', priority = false }: LogoMarkProps) {
  return (
    <span className={`logo-float inline-flex shrink-0 ${className}`.trim()}>
      <img
        src="/logo.png"
        srcSet="/logo.png 1x, /logo.png 2x"
        width={82}
        height={82}
        alt="Fortnitespoofer.com logo"
        className="h-[72px] w-[72px] object-contain sm:h-[82px] sm:w-[82px]"
        decoding="async"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
      />
    </span>
  )
}
