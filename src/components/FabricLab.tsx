import { useState } from 'react'
import { Sun, Waves } from 'lucide-react'

const fabrics = [
  { name: 'Silk charmeuse', group: 'SILK', weight: '19 momme', drape: 'Liquid, fluid drape', care: 'Dry clean or hand wash cold', texture: 'silk', detail: 'A soft, luminous finish that catches the light with every movement.' },
  { name: 'Organic linen', group: 'LINEN', weight: '180 gsm', drape: 'Airy, relaxed drape', care: 'Machine wash cool, line dry', texture: 'linen', detail: 'Naturally breathable with a lived-in texture that only gets better.' },
  { name: 'Heavyweight cashmere', group: 'KNIT', weight: '330 gsm', drape: 'Soft, sculptural drape', care: 'Hand wash, dry flat', texture: 'cashmere', detail: 'Cloud-soft warmth with enough structure to hold its shape.' },
  { name: 'Structured wool', group: 'TAILORING', weight: '280 gsm', drape: 'Crisp, tailored drape', care: 'Professional dry clean', texture: 'wool', detail: 'A resilient Italian weave with a clean, architectural finish.' },
  { name: 'Cotton poplin', group: 'COTTON', weight: '140 gsm', drape: 'Crisp, easy drape', care: 'Machine wash warm', texture: 'cotton', detail: 'Light, breathable cotton that keeps its polished shape.' },
  { name: 'Recycled satin', group: 'RECYCLED', weight: '165 gsm', drape: 'Fluid, glossy drape', care: 'Gentle wash, low iron', texture: 'satin', detail: 'A high-shine, low-impact alternative made from reclaimed yarns.' },
]

export default function FabricLab() {
  const [selected, setSelected] = useState(0)
  const [light, setLight] = useState<'daylight' | 'studio' | 'evening'>('daylight')
  const fabric = fabrics[selected]
  return (
    <section className="section fabric-section" id="fabric">
      <div className="section-heading"><div><span className="eyebrow">FEEL BEFORE YOU FIND</span><h2>Good things<br /><em>have a texture.</em></h2></div><p>Get to know the cloth: how it falls, how it feels, and how to care for it once it’s yours. <span className="fabric-demo-note">Fabric details and lighting previews are illustrative demo content.</span></p></div>
      <div className="fabric-layout">
        <div className={`fabric-preview texture-${fabric.texture} light-${light}`}><div className="fabric-preview-top"><span><Waves size={15} /> MATERIAL STUDY</span><span>0{selected + 1} / 06</span></div><div className="fabric-fold" /><div className="fabric-preview-caption"><span>{fabric.group}</span><h3>{fabric.name}</h3><p>{fabric.detail}</p></div><div className="light-control"><Sun size={14} /><span>LIGHT</span>{(['daylight', 'studio', 'evening'] as const).map((mode) => <button className={light === mode ? 'light-choice active' : 'light-choice'} key={mode} onClick={() => setLight(mode)}>{mode}</button>)}</div></div>
        <div className="fabric-list-wrap"><div className="fabric-list-title"><span>THE MATERIAL LIBRARY</span><span>06 MATERIALS</span></div><div className="fabric-list">{fabrics.map((item, index) => <button key={item.name} className={selected === index ? 'fabric-row active' : 'fabric-row'} onClick={() => setSelected(index)}><span className={`fabric-dot texture-${item.texture}`} /><span className="fabric-row-name"><b>{item.name}</b><small>{item.group}</small></span><span className="fabric-row-weight">{item.weight}</span><span className="fabric-row-arrow">↗</span></button>)}</div><div className="fabric-specs"><div><span>WEIGHT</span><b>{fabric.weight}</b></div><div><span>DRAPE</span><b>{fabric.drape}</b></div><div><span>CARE</span><b>{fabric.care}</b></div></div></div>
      </div>
    </section>
  )
}
