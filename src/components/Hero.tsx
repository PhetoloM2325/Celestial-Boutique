import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-image" role="img" aria-label="Model wearing a sculptural neutral-toned look" />
      <div className="hero-grain" />
      <div className="hero-content">
        <span className="eyebrow light-eyebrow"><i /> YOUR BODY. YOUR STYLE. YOUR UNIVERSE.</span>
        <h1>Fashion That<br /><em>Moves With</em><br />You.</h1>
        <p>Discover thoughtfully curated styles designed to celebrate every body, every silhouette, and every version of you.</p>
        <div className="hero-actions"><a className="button button-light" href="#shop">Shop the Collection <ArrowRight size={16} /></a><a className="button button-outline-light" href="#fit"><Sparkles size={15} /> Find Your Fit</a></div>
      </div>
      <div className="hero-meta"><span>01 / 04</span><span>THE CELESTIAL EDIT · 2026</span><ArrowDownRight size={17} /></div>
      <div className="hero-side-note">YOUR BODY · YOUR STYLE · YOUR UNIVERSE</div>
    </section>
  )
}
