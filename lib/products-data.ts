export interface Product {
  id: number
  name: string
  price: number
  description: string
  images: string[]
  colors: string[]
  availability: boolean
  category: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Blush Harmony Bouquet",
    price: 95,
    description:
      "Exquisite harmony bouquet with blush, autumn tones and hints of romance and elegance. Perfect for anniversaries, birthdays, or expressing your deepest affections.",
    images: ["/pink-roses-bouquet-elegant.jpg", "/blush-pink-flower-arrangement.jpg", "/romantic-rose-bouquet-side-view.jpg"],
    colors: ["Baby Pink", "Blush Rose", "Soft Coral"],
    availability: true,
    category: "Bouquets",
  },
  {
    id: 2,
    name: "Eternal Grace Box",
    price: 120,
    description:
      "A stunning arrangement of premium roses in an elegant box, symbolizing eternal love and grace. Hand-selected blooms that last longer than traditional bouquets.",
    images: ["/luxury-flower-box-roses.jpg", "/elegant-rose-arrangement-box.jpg", "/premium-flower-gift-box.jpg"],
    colors: ["Classic Red", "Soft Pink", "Pure White"],
    availability: true,
    category: "Box Arrangements",
  },
  {
    id: 3,
    name: "Velvet Romance Arrangement",
    price: 110,
    description:
      "Velvet-textured roses paired with delicate greenery create this romantic masterpiece. Ideal for proposals, anniversaries, or any moment that calls for elegance.",
    images: ["/velvet-red-roses-arrangement.jpg", "/romantic-flower-arrangement.jpg", "/luxury-rose-bouquet.jpg"],
    colors: ["Deep Red", "Burgundy", "Rose Gold"],
    availability: true,
    category: "Arrangements",
  },
  {
    id: 4,
    name: "Garden Dream Basket",
    price: 85,
    description:
      "A whimsical basket filled with garden-fresh blooms, bringing the beauty of nature indoors. Features seasonal flowers in soft, dreamy hues.",
    images: ["/garden-flower-basket-arrangement.jpg", "/spring-flowers-basket.jpg", "/cottage-style-flower-arrangement.jpg"],
    colors: ["Mixed Pastels", "Lavender Dreams", "Sunny Yellow"],
    availability: true,
    category: "Baskets",
  },
  {
    id: 5,
    name: "Peony Paradise",
    price: 145,
    description:
      "Luxurious peonies in full bloom, representing prosperity and romance. This premium arrangement features the most sought-after seasonal blooms.",
    images: ["/peony-flower-arrangement-luxury.jpg", "/pink-peonies-bouquet.png", "/elegant-peony-arrangement.jpg"],
    colors: ["Blush Pink", "Coral Charm", "White Cloud"],
    availability: true,
    category: "Premium",
  },
  {
    id: 6,
    name: "Sunset Serenade",
    price: 75,
    description:
      "Warm sunset tones dance through this enchanting arrangement. Orange roses, coral carnations, and golden accents create a symphony of color.",
    images: ["/sunset-colored-flower-arrangement.jpg", "/orange-coral-flower-bouquet.jpg", "/placeholder.svg?height=400&width=400"],
    colors: ["Sunset Orange", "Coral Pink", "Golden Yellow"],
    availability: true,
    category: "Bouquets",
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}
