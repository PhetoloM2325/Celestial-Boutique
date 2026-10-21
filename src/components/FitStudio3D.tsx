import { useMemo, useState, type CSSProperties } from 'react'
import { ArrowRight, Check, Ruler, Sparkles } from 'lucide-react'
import { products } from '../data/products'
import { useCurrency } from '../context/CurrencyContext'
import type { BodyType, Product } from '../types'

type Props = { onAddToCart: (product: Product) => void }
const bodyTypes: BodyType[] = ['Hourglass', 'Pear', 'Rectangle', 'Athletic', 'Apple', 'Full figure']
const vibes = ['Effortless minimalist', 'Bold & avant-garde', 'Romantic & soft', 'Corporate chic', 'Edgy street']
const shapeAnchor: Record<BodyType, string> = {
  Hourglass: 'column-dress', Pear: 'sculpted-blazer', Rectangle: 'soft-structure-knit',
  Athletic: 'sculpted-blazer', Apple: 'soft-structure-knit', 'Full figure': 'everyday-trouser',
}
const skinTones = [
  { name: 'Porcelain', hex: '#f5dfce' }, { name: 'Almond', hex: '#e8c3a2' },
  { name: 'Honey', hex: '#d5a078' }, { name: 'Golden', hex: '#bb8053' },
  { name: 'Sienna', hex: '#986344' }, { name: 'Cocoa', hex: '#704a39' },
  { name: 'Umber', hex: '#4f3329' }, { name: 'Espresso', hex: '#2d201c' },
]

export default function FitStudio3D({ onAddToCart }: Props) {
  const [height, setHeight] = useState(168)
  const [weight, setWeight] = useState(66)
  const [bodyType, setBodyType] = useState<BodyType>('Hourglass')
  const [toneIndex, setToneIndex] = useState(3)
  const [vibe, setVibe] = useState(vibes[0])
  const [previewId, setPreviewId] = useState<string | null>(null)
  const { formatPrice } = useCurrency()
  const bmi = weight / ((height / 100) ** 2)
  const width = Math.min(1.1, 0.74 + (weight - 45) / 160 + (bodyType === 'Full figure' ? 0.13 : bodyType === 'Pear' ? 0.05 : 0))
  const outfitColors = ['soft olive', 'warm ivory', 'muted terracotta']
  const toneNote = toneIndex < 2 ? 'cool undertones' : toneIndex > 5 ? 'deep, warm undertones' : 'golden-neutral undertones'
  const previewProduct = products.find((product) => product.id === previewId)
  const recommendation = useMemo(() => {
    const ordered = vibe.includes('Bold') ? [products[1], products[0], products[2]]
      : vibe.includes('Romantic') ? [products[0], products[3], products[2]]
        : vibe.includes('Corporate') ? [products[1], products[2], products[3]]
          : vibe.includes('Edgy') ? [products[1], products[2], products[0]]
            : [products[2], products[3], products[0]]
    const heightAnchor = height < 158 ? 'everyday-trouser' : height >= 176 ? 'column-dress' : ''
    const score = (product: Product) => (product.id === shapeAnchor[bodyType] ? 2 : 0) + (product.id === heightAnchor ? 1 : 0)
    return ordered.sort((first, second) => score(second) - score(first)).slice(0, 2)
  }, [bodyType, height, vibe])

  return (
    <section className="section fit-section" id="fit">
      <div className="section-heading">
        <div><span className="eyebrow">A BETTER STARTING POINT</span><h2>Your body.<br /><em>Your proportions.</em></h2></div>
        <p>See your shape in the pieces you love. A thoughtful fit begins with you, not a size chart.</p>
      </div>
      <div className="fit-layout">
        <div className="avatar-panel">
          <div className="avatar-topline"><span>FIT STUDIO <b>01</b></span><span className="live-mark"><i /> LIVE PREVIEW</span></div>
          <div className="avatar-stage">
            <div className="stage-caption">YOUR SILHOUETTE, IN MOTION</div>
            <div className="avatar-shadow" />
            <div className="avatar" style={{ '--skin': skinTones[toneIndex].hex, '--avatar-width': width, '--avatar-height': 0.94 + (height - 150) / 300 } as CSSProperties}>
              <div className="avatar-hair" /><div className="avatar-head" /><div className="avatar-neck" />
              <div className={previewProduct ? `avatar-torso avatar-torso-${previewProduct.id}` : 'avatar-torso'} /><div className="avatar-arm avatar-arm-left" /><div className="avatar-arm avatar-arm-right" />
              <div className="avatar-leg avatar-leg-left" /><div className="avatar-leg avatar-leg-right" />
            </div>
            <span className="avatar-label">{previewProduct ? `PREVIEW · ${previewProduct.name.toUpperCase()}` : `${bodyType.toUpperCase()} · ${height} CM`}</span>
          </div>
          <div className="avatar-stats"><div><span>EST. BMI</span><b>{bmi.toFixed(1)}</b></div><div><span>HEIGHT</span><b>{height} <small>cm</small></b></div><div><span>WEIGHT</span><b>{weight} <small>kg</small></b></div><div><span>FIT PROFILE</span><b>{bodyType}</b></div></div>
        </div>
        <div className="fit-controls">
          <div className="control-block">
            <div className="control-title"><span><Ruler size={15} /> Your measurements</span><span className="control-hint">Adjust to see your shape update</span></div>
            <label className="range-row"><span>Height</span><input type="range" min="145" max="200" value={height} onChange={(event) => setHeight(Number(event.target.value))} /><strong>{height}<small> cm</small></strong></label>
            <label className="range-row"><span>Weight</span><input type="range" min="42" max="140" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /><strong>{weight}<small> kg</small></strong></label>
            <p className="fine-print">Measurements are used only to personalise fit suggestions. BMI is shown as a fit reference, not a health measure.</p>
          </div>
          <div className="control-block">
            <div className="control-title"><span>How would you describe your shape?</span></div>
            <div className="shape-grid">{bodyTypes.map((shape) => <button className={bodyType === shape ? 'choice-chip selected' : 'choice-chip'} key={shape} onClick={() => setBodyType(shape)}>{shape}</button>)}</div>
          </div>
          <div className="control-block">
            <div className="control-title"><span>Your skin tone</span><span className="control-hint">{skinTones[toneIndex].name}</span></div>
            <div className="tone-row" role="group" aria-label="Choose skin tone">{skinTones.map((tone, index) => <button key={tone.name} aria-label={tone.name} aria-pressed={toneIndex === index} className={toneIndex === index ? 'tone-swatch active' : 'tone-swatch'} style={{ backgroundColor: tone.hex }} onClick={() => setToneIndex(index)}>{toneIndex === index && <Check size={15} />}</button>)}</div>
          </div>
          <div className="control-block vibe-block">
            <label className="control-title" htmlFor="vibe-select"><span>Your style feeling</span></label>
            <select id="vibe-select" className="field-select" value={vibe} onChange={(event) => setVibe(event.target.value)}>{vibes.map((item) => <option key={item}>{item}</option>)}</select>
          </div>
        </div>
      </div>
      <div className="recommendations">
        <div className="recommendation-heading"><span className="eyebrow"><Sparkles size={13} /> A CAPSULE FOR YOU</span><p>Chosen for a {bodyType.toLowerCase()} silhouette, {toneNote}, and a {vibe.toLowerCase()} mood. Try {outfitColors[toneIndex % outfitColors.length]} tones.</p></div>
        <div className="recommendation-grid">{recommendation.map((product) => <article className="recommendation-item" key={product.id}>
          <div className="recommendation-image"><img src={product.image} alt={product.name} loading="lazy" /><span>FIT STUDIO PICK</span></div>
          <div className="recommendation-info"><div><h3>{product.name}</h3><p>{product.note}</p></div><b>{formatPrice(product.price)}</b></div>
          <div className="recommendation-actions"><button className="button button-dark" onClick={() => onAddToCart(product)}>Add to bag <ArrowRight size={14} /></button><button className={previewId === product.id ? 'text-action is-previewing' : 'text-action'} onClick={() => setPreviewId(previewId === product.id ? null : product.id)}>{previewId === product.id ? 'Previewing on your profile' : 'Try on'} <span>↗</span></button></div>
        </article>)}</div>
      </div>
    </section>
  )
}
