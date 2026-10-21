import { useMemo, useState } from 'react'
import { ArrowRight, Check, Heart, Plus, Search, ShoppingBag, Star, X } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FitStudio3D from './components/FitStudio3D'
import FabricLab from './components/FabricLab'
import InspoUploader from './components/InspoUploader'
import ReviewsSection from './components/ReviewsSection'
import DeliveryCalculator from './components/DeliveryCalculator'
import { products } from './data/products'
import { useCurrency } from './context/CurrencyContext'
import type { Product } from './types'

type BagItem = { product: Product; size: string }

const categories = ['All pieces', 'New arrivals', 'Clothing', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Plus Size', 'Petite', 'Tall', 'Accessories']

export default function App() {
  const [cart, setCart] = useState<BagItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutStarted, setCheckoutStarted] = useState(false)
  const [newsletterDone, setNewsletterDone] = useState(false)
  const [category, setCategory] = useState('All pieces')
  const [search, setSearch] = useState('')
  const [quickView, setQuickView] = useState<Product | null>(null)
  const [quickViewSize, setQuickViewSize] = useState('')
  const [imageZoomed, setImageZoomed] = useState(false)
  const [cardSizes, setCardSizes] = useState<Record<string, string>>({})
  const { formatPrice } = useCurrency()
  const addToCart = (product: Product, size = product.sizes[0]) => {
    setCart((items) => [...items, { product, size }])
    setCheckoutStarted(false)
    setCartOpen(true)
    setQuickView(null)
  }
  const removeFromCart = (index: number) => setCart((items) => items.filter((_, itemIndex) => itemIndex !== index))
  const toggleWishlist = (id: string) => setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
  const total = cart.reduce((sum, item) => sum + item.product.price, 0)
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'All pieces'
      || (category === 'Clothing' && product.category !== 'Accessories')
      || (category === 'New arrivals' && product.badge === 'New arrival')
      || (category === 'Plus Size' && product.category === 'Curve collection')
      || (category === 'Petite' && product.fit.toLowerCase().includes('petite'))
      || (category === 'Tall' && product.fit.toLowerCase().includes('tall'))
      || product.category.toLowerCase() === category.toLowerCase()
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || `${product.name} ${product.category} ${product.color} ${product.fit}`.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  }), [category, search])
  const showQuickView = (product: Product) => {
    setQuickView(product)
    setQuickViewSize(product.sizes[0])
    setImageZoomed(false)
  }

  return (
    <>
      <Navbar cartCount={cart.length} wishlistCount={wishlist.length} onCartClick={() => setCartOpen(true)} onCategorySelect={(nextCategory) => { setCategory(nextCategory); setSearch('') }} />
      <main className="min-h-screen">
        <Hero />
        <section className="ticker-band" aria-label="Celestial Boutique values"><div className="ticker-track"><span>YOUR BODY, YOUR STYLE, YOUR UNIVERSE</span><i>✧</i><span>MADE TO MOVE WITH YOU</span><i>✧</i><span>STYLE WITHOUT A SIZE</span><i>✧</i><span>YOUR BODY, YOUR STYLE, YOUR UNIVERSE</span><i>✧</i><span>MADE TO MOVE WITH YOU</span></div></section>
        <section className="shop-section" id="shop">
          <div className="section collection-heading"><div><span className="eyebrow">THE CELESTIAL EDIT · NEW SEASON</span><h2>Pieces to keep.<br /><em>And keep reaching for.</em></h2></div><a className="text-action" href="#fabric">OUR MATERIALS <span>↗</span></a></div>
          <div className="catalog-tools">
            <div className="category-tabs" role="group" aria-label="Filter products by category">{categories.map((item) => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <label className="catalog-search"><Search size={15} /><input id="catalog-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search pieces, colour, fit" aria-label="Search products" />{search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}><X size={13} /></button>}</label>
          </div>
          <p className="catalog-note">Sizes shown are available for each individual piece. Ratings, product details, and currency conversions are illustrative demo content.</p>
          {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product, index) => <article className="product-card" key={product.id}>
            <div className="product-image-wrap"><img src={product.image} alt={`${product.name} in ${product.color}`} loading={index > 1 ? 'lazy' : 'eager'} /><span className="product-index">{(index + 1).toString().padStart(2, '0')}</span><span className="product-badge">{product.badge}</span><button className={wishlist.includes(product.id) ? 'favorite-button favorited' : 'favorite-button'} aria-label={wishlist.includes(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} onClick={() => toggleWishlist(product.id)}><Heart size={17} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} /></button><span className="product-image-label">{product.category}</span><button className="quick-view-button" onClick={() => showQuickView(product)}>Quick view <ArrowRight size={13} /></button></div>
            <div className="product-details"><div><span className="product-color">{product.color}</span><h3>{product.name}</h3></div><b>{formatPrice(product.price)}</b></div>
            <div className="product-rating"><span><Star size={11} fill="currentColor" /> {product.rating.toFixed(1)}</span><span>({product.reviewCount} notes)</span></div>
            <div className="product-availability"><span>Sizes</span><b>{product.sizes.join(' · ')}</b><small>{product.fit}</small></div>
            <div className="product-bottom"><span>{product.note}</span><label className="quick-add-size"><span className="sr-only">Select size for {product.name}</span><select value={cardSizes[product.id] ?? product.sizes[0]} onChange={(event) => setCardSizes((sizes) => ({ ...sizes, [product.id]: event.target.value }))}>{product.sizes.map((size) => <option key={size}>{size}</option>)}</select><button onClick={() => addToCart(product, cardSizes[product.id] ?? product.sizes[0])} aria-label={`Add ${product.name} to bag`}><Plus size={15} /> Add</button></label></div>
          </article>)}</div> : <div className="catalog-empty"><span className="eyebrow">A QUIETER CORNER OF THE EDIT</span><p>No pieces match just yet. Try another category or search.</p><button className="text-action" onClick={() => { setCategory('All pieces'); setSearch('') }}>View all pieces <span>↗</span></button></div>}
          <div className="collection-footnote"><span>{filteredProducts.length.toString().padStart(2, '0')} PIECES</span><span>CONSIDERED STYLE, MADE FOR REAL LIFE</span><span>COMPLIMENTARY ALTERATIONS</span></div>
        </section>
        <section className="fit-promo"><span className="fit-promo-star">✧</span><div><span className="eyebrow">A MORE PERSONAL WAY TO GET DRESSED</span><h2>Discover Your <em>3D Fit.</em></h2><p>Shape your on-screen fit preview and explore pieces selected around your proportions and personal style.</p><a className="button button-dark" href="#fit">Enter the Fit Studio <ArrowRight size={15} /></a><small>Interactive avatar and recommendations are an illustrative demo, not a sizing guarantee.</small></div><span className="fit-promo-orbit" aria-hidden="true">✧</span></section>
        <FitStudio3D onAddToCart={addToCart} />
        <FabricLab />
        <InspoUploader />
        <section className="editorial-band"><div className="editorial-image" role="img" aria-label="A group of friends in contemporary fashion" /><div className="editorial-copy"><span className="eyebrow">A NOTE ON HOW WE MAKE</span><h2>Not more.<br /><em>Just more considered.</em></h2><p>Small runs, lasting materials, and a fit process built around real lives. We make fewer things, so each one can mean more.</p><a className="text-action" href="#reviews">OUR POINT OF VIEW <span>↗</span></a></div></section>
        <section className="inspiration-gallery" aria-labelledby="inspiration-heading"><div className="inspiration-gallery-heading"><div><span className="eyebrow">THE CELESTIAL COMMUNITY · @CELESTIALBOUTIQUE</span><h2 id="inspiration-heading">Your style, <em>in orbit.</em></h2></div><a className="text-action" href="#inspo">CREATE YOUR EDIT <span>↗</span></a></div><div className="inspiration-tiles"><a href="#shop" className="inspiration-tile inspiration-tile-one"><span>01 · THE SOFT STRUCTURE</span><b>Quietly<br />confident</b></a><a href="#shop" className="inspiration-tile inspiration-tile-two"><span>02 · THE AFTER HOURS</span><b>Made for<br />the moment</b></a><a href="#shop" className="inspiration-tile inspiration-tile-three"><span>03 · EVERYDAY, REIMAGINED</span><b>Room to<br />be yourself</b></a></div></section>
        <ReviewsSection />
        <DeliveryCalculator />
        <section className="newsletter-section" id="newsletter"><span className="eyebrow">LETTERS, OCCASIONALLY</span><h2>A little more <em>Celestial.</em></h2><p>New pieces, thoughtful notes, and first access. Never noise.</p>{newsletterDone ? <div className="newsletter-success"><Check size={16} /> You’re on the list. Talk soon.</div> : <form onSubmit={(event) => { event.preventDefault(); setNewsletterDone(true) }}><input type="email" required placeholder="Your email address" aria-label="Email address" /><button aria-label="Subscribe to newsletter"><ArrowRight size={17} /></button></form>}<small>By subscribing, you agree to receive Celestial Boutique notes. Newsletter signup is a demo and does not save your email.</small></section>
      </main>
      <footer className="site-footer" id="contact"><div className="footer-top"><a className="wordmark footer-wordmark" href="#top"><span className="wordmark-star">✧</span> CELESTIAL <span>BOUTIQUE</span><small>YOUR BODY · YOUR STYLE · YOUR UNIVERSE</small></a><p>Clothes that move<br />with you.</p><div className="footer-links"><a href="#shop">Shop the collection</a><a href="#fit">Discover your fit</a><a href="#delivery">Delivery & returns</a><a href="#reviews">Community notes</a></div></div><div className="footer-bottom"><span>© 2026 CELESTIAL BOUTIQUE</span><span>MADE WITH INTENTION · WORN YOUR WAY</span><a href="#top">BACK TO TOP ↑</a></div></footer>
      {quickView && <div className="product-modal-overlay" role="presentation" onClick={() => setQuickView(null)}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="quick-view-title" onClick={(event) => event.stopPropagation()}><button className="icon-button product-modal-close" aria-label="Close quick view" onClick={() => setQuickView(null)}><X size={19} /></button><button className={imageZoomed ? 'product-modal-image is-zoomed' : 'product-modal-image'} aria-label={imageZoomed ? 'Zoom out of product image' : 'Zoom in on product image'} onClick={() => setImageZoomed(!imageZoomed)}><img src={quickView.image} alt={`${quickView.name} in ${quickView.color}`} /><span>{imageZoomed ? '−' : '+'} ZOOM</span></button><div className="product-modal-content"><span className="eyebrow">{quickView.badge} · {quickView.category}</span><h2 id="quick-view-title">{quickView.name}</h2><div className="modal-price">{formatPrice(quickView.price)} <span><Star size={12} fill="currentColor" /> {quickView.rating.toFixed(1)} · {quickView.reviewCount} notes</span></div><p>{quickView.description}</p><div className="modal-spec"><span>FIT</span><b>{quickView.fit}</b></div><div className="modal-spec"><span>COLOUR</span><b>{quickView.colors.join(' · ')}</b></div><div className="modal-spec"><span>COMPOSITION</span><b>{quickView.composition}</b></div><div className="modal-spec"><span>CARE</span><b>{quickView.care}</b></div><label className="modal-size-label">Select size<select value={quickViewSize} onChange={(event) => setQuickViewSize(event.target.value)}>{quickView.sizes.map((size) => <option key={size}>{size}</option>)}</select></label><p className="modal-size-note">Available sizes for this piece: {quickView.sizes.join(', ')}</p><button className="button button-dark modal-add-button" onClick={() => addToCart(quickView, quickViewSize)}>Add size {quickViewSize} to bag <ArrowRight size={15} /></button></div></section></div>}
      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Shopping bag"><div className="cart-head"><div><span className="eyebrow">YOUR CELESTIAL EDIT</span><h2>Shopping bag <small>({cart.length})</small></h2></div><button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X size={19} /></button></div>{cart.length ? <><div className="cart-items">{cart.map(({ product, size }, index) => <div className="cart-item" key={`${product.id}-${index}`}><img src={product.image} alt={product.name} /><div><span>{product.category} · Size {size}</span><h3>{product.name}</h3><b>{formatPrice(product.price)}</b><button onClick={() => removeFromCart(index)}>Remove</button></div><span className="cart-quantity">01</span></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><b>{formatPrice(total)}</b></div><p>Taxes and delivery calculated at checkout.</p>{checkoutStarted ? <div className="checkout-note"><Check size={15} /> Checkout is a demo and is not connected to payment processing.</div> : <button className="button button-dark checkout-button" onClick={() => setCheckoutStarted(true)}>Continue to checkout <ArrowRight size={15} /></button>}<span className="cart-free-shipping">Complimentary shipping over {formatPrice(250)}</span></div></> : <div className="cart-empty"><ShoppingBag size={24} /><h3>Your edit starts here.</h3><p>Pieces you love will find their way into this space.</p><button className="button button-dark" onClick={() => { setCartOpen(false); document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' }) }}>Explore the collection <ArrowRight size={14} /></button></div>}</aside></div>}
    </>
  )
}
