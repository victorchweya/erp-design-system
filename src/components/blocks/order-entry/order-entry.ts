export interface ProduceItem {
  id: string
  name: string
  pack: string
  price: number
  stock: number
}

export interface OrderLine extends ProduceItem {
  quantity: number
}

export const produce: ProduceItem[] = [
  { id: 'FTF-TOM', name: 'Tomatoes', pack: '10 kg crate', price: 1200, stock: 22 },
  { id: 'FTF-CAR', name: 'Carrots', pack: '10 kg bag', price: 950, stock: 35 },
  { id: 'FTF-POT', name: 'Potatoes', pack: '20 kg bag', price: 1500, stock: 40 },
  { id: 'FTF-AVO', name: 'Avocados', pack: '10 kg crate', price: 1800, stock: 18 },
  { id: 'FTF-KAL', name: 'Kale', pack: '5 kg bag', price: 900, stock: 24 },
  { id: 'FTF-ONI', name: 'Red onions', pack: '10 kg bag', price: 1100, stock: 30 },
]

export function sampleOrder(): OrderLine[] {
  const quantities = [12, 10, 8, 6, 4]
  return produce.slice(0, 5).map((item, index) => ({ ...item, quantity: quantities[index]! }))
}

export const customer = {
  name: 'Green Basket Kitchen',
  contact: 'Amina Hassan',
  address: '14 Muthithi Road, Westlands, Nairobi — kitchen entrance',
  creditLimit: 100000,
  outstanding: 60000,
}

const currency = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0,
})
export const money = (amount: number) => currency.format(amount)
