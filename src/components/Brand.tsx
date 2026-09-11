export function TotvsLogo({ dark = false }: { dark?: boolean }) {
  return <img className={`official-totvs ${dark ? 'totvs-on-light' : ''}`} src={`/media/totvs-${dark ? 'dark' : 'light'}.webp`} alt="TOTVS" width={dark ? 452 : 106} height={dark ? 131 : 31} decoding="async" />;
}

export function LynnLogo({ className = '' }: { className?: string }) {
  return <img className={`official-lynn ${className}`} src="/media/lynn-logo.webp" alt="LYNN" width={814} height={272} decoding="async" />;
}

export function BrandLockup() {
  return <span className="brand official-brand"><TotvsLogo /><span className="brand-divider" aria-hidden="true" /><LynnLogo /></span>;
}
