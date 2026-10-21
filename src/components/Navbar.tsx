import { useEffect, useState } from 'react'
import { ArrowDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { countries, useCurrency, type CountryCode } from '../context/CurrencyContext'

type Props = { cartCount: number; wishlistCount: number; onCartClick: () => void; onCategorySelect: (category: string) => void }

const announcements = [
  'Welcome to Celestial Boutique.',
  'Fashion for every body.',
  'Discover your next favourite look.',
  'Worldwide style, wherever you are.',
]

export default function Navbar({ cartCount, wishlistCount, onCartClick, onCategorySelect }: Props) {
  const { country, setCountry } = useCurrency()
  const [menuOpen, setMenuOpen] = useState(false)
  const [announcementIndex, setAnnouncementIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      setAnnouncementIndex((index) => (index + 1) % announcements.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const links = [
    ['Home', '#top', ''],
    ['Shop All', '#shop', 'All pieces'],
    ['New arrivals', '#shop', 'New arrivals'],
    ['Clothing', '#shop', 'Clothing'],
    ['Dresses', '#shop', 'Dresses'],
    ['Tops', '#shop', 'Tops'],
    ['Bottoms', '#shop', 'Bottoms'],
    ['Plus Size', '#shop', 'Plus Size'],
    ['Accessories', '#shop', 'Accessories'],
    ['Reviews', '#reviews', ''],
    ['Contact', '#contact', ''],
  ]

  return (
    <header className="site-header">
      <div className="announcement" aria-live="off">{announcements[announcementIndex]} <span aria-hidden="true">✧</span></div>
      <div className="nav-shell">
        <button className="icon-button mobile-menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <a className="wordmark celestial-wordmark" href="#top" onClick={closeMenu}><span className="wordmark-star">✧</span> CELESTIAL <span>BOUTIQUE</span><small>YOUR BODY · YOUR STYLE · YOUR UNIVERSE</small></a>
        <nav id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {links.map(([label, href, nextCategory]) => <a href={href} key={label} onClick={() => { closeMenu(); if (nextCategory) onCategorySelect(nextCategory) }}>{label}</a>)}
        </nav>
        <div className="nav-actions">
          <label className="country-select" aria-label="Select country and currency">
            <span>{country.code}</span><ArrowDown size={12} />
            <select value={country.code} onChange={(event) => setCountry(event.target.value as CountryCode)} aria-label="Country and currency">
              {countries.map((item) => <option value={item.code} key={item.code}>{item.name} · {item.currency}</option>)}
            </select>
          </label>
          <button className="icon-button search-action" aria-label="Search the collection" onClick={() => { closeMenu(); document.querySelector<HTMLInputElement>('#catalog-search')?.focus(); document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }) }}><Search size={17} /></button>
          <a className="icon-button account-action" aria-label="Newsletter and account updates" href="#newsletter" onClick={closeMenu}><UserRound size={17} /></a>
          <button className="icon-button wishlist-action" aria-label={`Wishlist, ${wishlistCount} items`} onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}>
            <Heart size={18} /><span className="nav-count">{wishlistCount}</span>
          </button>
          <button className="icon-button bag-action" aria-label={`Shopping bag, ${cartCount} items`} onClick={onCartClick}>
            <ShoppingBag size={18} /><span className="nav-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
