import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type CountryCode = 'US' | 'GB' | 'EU' | 'JP' | 'ZA' | 'AU'

type Country = { code: CountryCode; name: string; currency: string; symbol: string; rate: number }

export const countries: Country[] = [
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$', rate: 1 },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'EU', name: 'European Union', currency: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'JP', name: 'Japan', currency: 'JPY', symbol: '¥', rate: 149.5 },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', symbol: 'R', rate: 18.1 },
  { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$', rate: 1.52 },
]

type CurrencyValue = {
  country: Country
  setCountry: (code: CountryCode) => void
  formatPrice: (usd: number) => string
}

const CurrencyContext = createContext<CurrencyValue | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryCode] = useState<CountryCode>('US')
  const value = useMemo(() => {
    const country = countries.find((item) => item.code === countryCode) ?? countries[0]
    const formatPrice = (usd: number) => {
      const amount = usd * country.rate
      return `${country.symbol}${new Intl.NumberFormat(country.code === 'JP' ? 'ja-JP' : 'en-US', {
        minimumFractionDigits: country.code === 'JP' ? 0 : 0,
        maximumFractionDigits: country.code === 'JP' ? 0 : 2,
      }).format(amount)}`
    }
    return { country, setCountry: setCountryCode, formatPrice }
  }, [countryCode])

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const value = useContext(CurrencyContext)
  if (!value) throw new Error('useCurrency must be used inside CurrencyProvider')
  return value
}
