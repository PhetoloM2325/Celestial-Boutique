import { useState } from 'react'
import { ArrowRight, Leaf, PackageCheck, Plane } from 'lucide-react'
import { useCurrency } from '../context/CurrencyContext'

const deliveryDays: Record<string, string> = { US: '2–4 business days', GB: '3–5 business days', EU: '4–6 business days', JP: '5–7 business days', ZA: '5–8 business days', AU: '5–8 business days' }

export default function DeliveryCalculator() {
  const { country, formatPrice } = useCurrency()
  const [postal, setPostal] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [eco, setEco] = useState(true)
  return (
    <section className="delivery-section" id="delivery">
      <div className="delivery-left"><span className="eyebrow">FROM OUR HANDS TO YOURS</span><h2>Good things<br /><em>travel well.</em></h2><p>Choose a lower-impact delivery option and plastic-free packaging for a more considered arrival.</p><div className="delivery-promise"><span><Leaf size={16} /> Lower-impact delivery option</span><span><PackageCheck size={16} /> Plastic-free packaging</span></div></div>
      <div className="delivery-calculator"><div className="delivery-calculator-head"><span>DELIVERY, CONSIDERED</span><Plane size={17} /></div><label className="country-summary">SHIPPING TO <b>{country.name.toUpperCase()}</b><span>{country.currency}</span></label><form onSubmit={(event) => { event.preventDefault(); if (postal.trim()) setSubmitted(true) }}><label className="postal-label" htmlFor="postal">Postal code or city</label><div className="postal-row"><input id="postal" value={postal} onChange={(event) => { setPostal(event.target.value); setSubmitted(false) }} placeholder={country.code === 'US' ? 'e.g. 10013' : 'Enter your postal code'} required /><button className="button button-dark" type="submit" aria-label="Estimate delivery"><ArrowRight size={16} /></button></div></form><label className="eco-toggle"><input type="checkbox" checked={eco} onChange={(event) => setEco(event.target.checked)} /><span className="toggle-mark" /><span><b>Lower-impact delivery</b><small>Choose the consolidated route when available</small></span><Leaf size={16} /></label>{submitted && <div className="delivery-result"><span className="eyebrow">ESTIMATE FOR {postal.toUpperCase()}</span><b>{deliveryDays[country.code]}</b><p>{eco ? 'Carbon-conscious consolidated delivery' : 'Standard express dispatch'} · duties and taxes included in your checkout total.</p><small>Complimentary shipping on orders over {formatPrice(250)}.</small></div>}<div className="duty-note"><span>NO SURPRISES</span><p>All prices include applicable local taxes at checkout.</p></div></div>
      <p className="delivery-disclaimer">Illustrative estimates only. Live carrier rates, delivery windows, duties, and taxes are not connected.</p>
    </section>
  )
}
