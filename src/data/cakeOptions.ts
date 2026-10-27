export interface CakeSize {
  id: string
  label: string
  weightKg: number
  basePrice: number
  servings: string
  popular?: boolean
  description: string
}

export interface CakeFlavor {
  id: string
  name: string
  extraPrice: number
  description: string
  tag: string
  badgeColor: string
  iconName: string
}

export interface CustomizationOption {
  id: 'eggless' | 'extraFrosting' | 'multiTier'
  label: string
  subtitle: string
  price: number
  icon: string
  badge?: string
}

export const CAKE_SIZES: CakeSize[] = [
  {
    id: '0.5kg',
    label: '0.5 kg',
    weightKg: 0.5,
    basePrice: 600,
    servings: '4 - 6 Servings',
    description: 'Perfect for intimate celebrations & mini cakes'
  },
  {
    id: '1kg',
    label: '1.0 kg',
    weightKg: 1.0,
    basePrice: 1100,
    servings: '8 - 12 Servings',
    popular: true,
    description: 'Most popular choice for family parties & birthdays'
  },
  {
    id: '1.5kg',
    label: '1.5 kg',
    weightKg: 1.5,
    basePrice: 1600,
    servings: '14 - 18 Servings',
    description: 'Ideal for medium gatherings & celebrations'
  },
  {
    id: '2kg',
    label: '2.0 kg',
    weightKg: 2.0,
    basePrice: 2100,
    servings: '20 - 25 Servings',
    description: 'Grand centerpiece for milestone events'
  }
]

export const CAKE_FLAVORS: CakeFlavor[] = [
  {
    id: 'vanilla',
    name: 'Classic Vanilla',
    extraPrice: 0,
    description: 'Madagascar vanilla bean sponge with velvety smooth crumb',
    tag: 'Classic',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    iconName: 'Sparkles'
  },
  {
    id: 'dark-chocolate',
    name: 'Belgian Dark Chocolate',
    extraPrice: 150,
    description: 'Rich 54.5% Callebaut dark chocolate ganache layering',
    tag: 'Bestseller',
    badgeColor: 'bg-stone-200 text-stone-900 border-stone-300',
    iconName: 'Coffee'
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet Cream Cheese',
    extraPrice: 200,
    description: 'Traditional buttermilk cocoa sponge with tangy Philadelphia cream cheese',
    tag: 'Signature',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    iconName: 'Heart'
  },
  {
    id: 'mango-berry',
    name: 'Fresh Mango / Berry',
    extraPrice: 250,
    description: 'Seasonal fruit compote infusion with light whipped mascarpone cream',
    tag: 'Seasonal Fresh',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    iconName: 'Flame'
  }
]

export const CUSTOMIZATIONS: CustomizationOption[] = [
  {
    id: 'eggless',
    label: '100% Eggless Preparation',
    subtitle: 'Ultra-soft, melt-in-mouth sponge without eggs or animal gelatin',
    price: 100,
    icon: 'Leaf',
    badge: 'Pure Veg'
  },
  {
    id: 'extraFrosting',
    label: 'Extra Frosting / Fondant Details',
    subtitle: 'Hand-crafted figurines, edible gold leaf, custom 3D accents & piped floral piping',
    price: 250,
    icon: 'Wand2',
    badge: 'Artisanal'
  },
  {
    id: 'multiTier',
    label: 'Multi-Tier Structure',
    subtitle: 'Sturdy structural support dowels & tiered elevation for party displays',
    price: 400,
    icon: 'Layers',
    badge: 'Statement'
  }
]

export const TIME_SLOTS = [
  '10:00 AM - 1:00 PM (Morning)',
  '1:00 PM - 5:00 PM (Afternoon)',
  '5:00 PM - 8:30 PM (Evening)',
  '8:30 PM - 10:00 PM (Late Night / Surprise)'
]

export const WHATSAPP_PHONE_NUMBER = '918310569703'
