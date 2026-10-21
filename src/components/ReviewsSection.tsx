import { useMemo, useState } from 'react'
import { ArrowUpRight, Star } from 'lucide-react'
import type { BodyType } from '../types'

const reviews = [
  { name: 'Nia W.', city: 'Brooklyn, NY', shape: 'Hourglass' as BodyType, height: '160–169 cm', tone: 'Deep', item: 'The Column Dress', quote: 'For once, the waist hits where it should. I wore it straight from work to dinner and never thought about adjusting it.', image: 'photo-1534528741775-53994a69daeb', color: '#786963', initials: 'NW', stars: 5 },
  { name: 'Clara M.', city: 'London, UK', shape: 'Pear' as BodyType, height: '170–179 cm', tone: 'Light', item: 'Everyday Trouser', quote: 'The most comfortable trouser I own, and somehow still the sharpest. The length is perfect on me.', image: 'photo-1531123897727-8f129e1688ce', color: '#9b7c61', initials: 'CM', stars: 5 },
  { name: 'Aisha R.', city: 'Cape Town, ZA', shape: 'Full figure' as BodyType, height: '160–169 cm', tone: 'Deep', item: 'Sculpted Blazer', quote: 'The shoulder gives me shape without feeling rigid. I sized for my hips and the complimentary alteration made it mine.', image: 'photo-1524504388940-b1c1722653e1', color: '#634b40', initials: 'AR', stars: 5 },
  { name: 'Morgan L.', city: 'Melbourne, AU', shape: 'Rectangle' as BodyType, height: '170–179 cm', tone: 'Medium', item: 'Soft Structure Knit', quote: 'Beautifully soft, and the fabric has real substance. It feels like something I’ll keep for years.', image: 'photo-1529139574466-a303027c1d8b', color: '#8c725c', initials: 'ML', stars: 4 },
  { name: 'Jun S.', city: 'Tokyo, JP', shape: 'Athletic' as BodyType, height: '150–159 cm', tone: 'Medium', item: 'Sculpted Blazer', quote: 'I appreciate that the fit notes are about the garment, not about what my body should look like.', image: 'photo-1534528741775-53994a69daeb', color: '#77634b', initials: 'JS', stars: 5 },
  { name: 'Elena P.', city: 'Lisbon, PT', shape: 'Apple' as BodyType, height: '160–169 cm', tone: 'Light', item: 'Everyday Trouser', quote: 'The rise and drape are thoughtful. Such a relief to find a label that pays attention to the actual fit.', image: 'photo-1524250502761-1ac6f2e30d43', color: '#7d7867', initials: 'EP', stars: 5 },
]
const shapes = ['All shapes', 'Hourglass', 'Pear', 'Rectangle', 'Athletic', 'Apple', 'Full figure']
const heights = ['All heights', '150–159 cm', '160–169 cm', '170–179 cm', '180+ cm']
const tones = ['All tones', 'Light', 'Medium', 'Deep']

export default function ReviewsSection() {
  const [shape, setShape] = useState('All shapes')
  const [height, setHeight] = useState('All heights')
  const [tone, setTone] = useState('All tones')
  const filtered = useMemo(() => reviews.filter((review) => (shape === 'All shapes' || review.shape === shape) && (height === 'All heights' || review.height === height) && (tone === 'All tones' || review.tone === tone)), [shape, height, tone])
  return (
    <section className="section reviews-section" id="reviews">
      <div className="reviews-heading"><div><span className="eyebrow">NOTES FROM THE COMMUNITY</span><h2>Worn out there.<br /><em>Loved right here.</em></h2></div><div className="review-score"><b>06 <small>STORIES</small></b><span>ILLUSTRATIVE DEMO CONTENT</span></div></div>
      <div className="review-filters"><span>FIND YOUR FIT STORY</span><label>Shape<select value={shape} onChange={(event) => setShape(event.target.value)}>{shapes.map((item) => <option key={item}>{item}</option>)}</select></label><label>Height<select value={height} onChange={(event) => setHeight(event.target.value)}>{heights.map((item) => <option key={item}>{item}</option>)}</select></label><label>Skin tone<select value={tone} onChange={(event) => setTone(event.target.value)}>{tones.map((item) => <option key={item}>{item}</option>)}</select></label><span className="review-result-count">{filtered.length} STORIES</span></div>
      <div className="review-grid">{filtered.length ? filtered.map((review, index) => <article className="review-card" key={review.name} style={{ animationDelay: `${index * 60}ms` }}><div className="review-photo" style={{ backgroundColor: review.color }}><img src={`https://images.unsplash.com/${review.image}?auto=format&fit=crop&w=700&q=80`} alt={`${review.name}, illustrative Celestial Boutique customer`} loading="lazy" /><span className="review-photo-tag">{review.shape}</span></div><div className="review-card-meta"><div className="review-stars">{Array.from({ length: review.stars }).map((_, i) => <Star size={11} key={i} />)}</div><span>{review.height}</span></div><p className="review-quote">“{review.quote}”</p><div className="review-author"><span className="review-initials">{review.initials}</span><span><b>{review.name}</b><small>{review.city} · {review.item}</small></span><ArrowUpRight size={15} /></div></article>) : <div className="no-reviews">No notes for this combination just yet. Try broadening your filters.</div>}</div>
      <p className="review-disclaimer">Community stories shown here are illustrative demo content.</p>
    </section>
  )
}
