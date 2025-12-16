"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

// Types
export interface ContactMessage {
  id: string
  name: string
  contact: string
  message: string
  date: string
  status: "new" | "read" | "replied"
}

export interface StoreSettings {
  storeName: string
  logo?: string
  whatsappNumber: string
  productOrderTemplate: string
  customOrderTemplate: string
  address: string
  businessHours: string
  phone: string
  email: string
  instagram: string
  facebook: string
  twitter: string
  mapLocation: string
  mapLat: number
  mapLng: number
}

export interface FooterSettings {
  description: { en: string; ar: string }
  quickLinks: { label: { en: string; ar: string }; href: string }[]
  showSocialLinks: boolean
}

export interface AdminSettings {
  name: string
  email: string
  password: string
}

export interface SectionNames {
  hero: { en: string; ar: string }
  products: { en: string; ar: string }
  gallery: { en: string; ar: string }
  reviews: { en: string; ar: string }
  ourStory: { en: string; ar: string }
}

export interface ContentSettings {
  heroTitle: { en: string; ar: string }
  heroSubtitle: { en: string; ar: string }
  heroImage: string
  storyText: { en: string; ar: string }
  storyText2: { en: string; ar: string }
  aboutImage: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

export interface Review {
  id: string
  name: string
  rating: number
  text: { en: string; ar: string }
  avatar: string
}

export interface Product {
  id: number
  name: { en: string; ar: string }
  price: number
  description: { en: string; ar: string }
  images: string[]
  colors: string[]
  availability: boolean
  category: string
}

export interface Notification {
  id: string
  message: string
  time: string
  read: boolean
  sourceId: string
}

export interface Category {
  id: string
  name: { en: string; ar: string }
  description?: { en: string; ar: string }
}

export interface AdminTranslations {
  sidebar: {
    dashboard: { en: string; ar: string }
    products: { en: string; ar: string }
    categories: { en: string; ar: string }
    gallery: { en: string; ar: string }
    reviews: { en: string; ar: string }
    contacts: { en: string; ar: string }
    content: { en: string; ar: string }
    translations: { en: string; ar: string }
    adminTranslations: { en: string; ar: string }
    footer: { en: string; ar: string }
    settings: { en: string; ar: string }
  }
  common: {
    save: { en: string; ar: string }
    cancel: { en: string; ar: string }
    delete: { en: string; ar: string }
    edit: { en: string; ar: string }
    add: { en: string; ar: string }
    search: { en: string; ar: string }
    actions: { en: string; ar: string }
    status: { en: string; ar: string }
    name: { en: string; ar: string }
    description: { en: string; ar: string }
    price: { en: string; ar: string }
    category: { en: string; ar: string }
    availability: { en: string; ar: string }
    inStock: { en: string; ar: string }
    outOfStock: { en: string; ar: string }
  }
  dashboard: {
    title: { en: string; ar: string }
    totalProducts: { en: string; ar: string }
    totalReviews: { en: string; ar: string }
    totalMessages: { en: string; ar: string }
    recentMessages: { en: string; ar: string }
  }
  products: {
    title: { en: string; ar: string }
    addProduct: { en: string; ar: string }
    editProduct: { en: string; ar: string }
    productName: { en: string; ar: string }
    productDescription: { en: string; ar: string }
    productPrice: { en: string; ar: string }
    productImages: { en: string; ar: string }
    productColors: { en: string; ar: string }
  }
  categories: {
    title: { en: string; ar: string }
    addCategory: { en: string; ar: string }
    editCategory: { en: string; ar: string }
    categoryName: { en: string; ar: string }
    categoryDescription: { en: string; ar: string }
    noCategories: { en: string; ar: string }
  }
  settings: {
    title: { en: string; ar: string }
    storeInfo: { en: string; ar: string }
    storeName: { en: string; ar: string }
    contactInfo: { en: string; ar: string }
    socialMedia: { en: string; ar: string }
    adminCredentials: { en: string; ar: string }
  }
  notifications: {
    title: { en: string; ar: string }
    markAllRead: { en: string; ar: string }
    noNotifications: { en: string; ar: string }
    viewAllMessages: { en: string; ar: string }
  }
  header: {
    logout: { en: string; ar: string }
    profile: { en: string; ar: string }
    settings: { en: string; ar: string }
  }
}

interface StoreContextType {
  // Contact Messages
  contactMessages: ContactMessage[]
  addContactMessage: (message: Omit<ContactMessage, "id" | "date" | "status">) => void
  updateMessageStatus: (id: string, status: ContactMessage["status"]) => void
  deleteMessage: (id: string) => void

  // Store Settings
  storeSettings: StoreSettings
  updateStoreSettings: (settings: Partial<StoreSettings>) => void

  // Footer Settings
  footerSettings: FooterSettings
  updateFooterSettings: (settings: Partial<FooterSettings>) => void

  // Admin Settings
  adminSettings: AdminSettings
  updateAdminSettings: (settings: Partial<AdminSettings>) => void

  // Section Names
  sectionNames: SectionNames
  updateSectionNames: (names: Partial<SectionNames>) => void

  // Content Settings
  contentSettings: ContentSettings
  updateContentSettings: (settings: Partial<ContentSettings>) => void

  // Gallery
  galleryImages: GalleryImage[]
  addGalleryImage: (image: Omit<GalleryImage, "id">) => void
  removeGalleryImage: (id: string) => void
  updateGalleryImage: (id: string, image: Partial<GalleryImage>) => void

  // Reviews
  reviews: Review[]
  addReview: (review: Omit<Review, "id">) => void
  removeReview: (id: string) => void
  updateReview: (id: string, review: Partial<Review>) => void

  // Products
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  removeProduct: (id: number) => void
  updateProduct: (id: number, product: Partial<Product>) => void

  notifications: Notification[]
  markNotificationAsRead: (id: string) => void
  markAllNotificationsAsRead: () => void

  categories: Category[]
  addCategory: (category: Omit<Category, "id">) => void
  updateCategory: (id: string, category: Partial<Category>) => void
  removeCategory: (id: string) => void

  adminTranslations: AdminTranslations
  updateAdminTranslations: (translations: Partial<AdminTranslations>) => void
}

const defaultStoreSettings: StoreSettings = {
  storeName: "Whispering Petals",
  logo: "",
  whatsappNumber: "+201234567890",
  productOrderTemplate: `Hello {storeName}!

I would like to order:
Product: {productName}
Product ID: {productId}
Color: {color}
Quantity: {quantity}
Total: {total}

Thank you!`,
  customOrderTemplate: `Hello {storeName}!

I would like to place a custom order.

Please contact me to discuss my requirements.

Thank you!`,
  address: "Alexandria, Egypt",
  businessHours: "Daily: 10:00 AM - 6:00 PM",
  phone: "+20 123 456 7890",
  email: "hello@whisperingpetals.com",
  instagram: "",
  facebook: "",
  twitter: "",
  mapLocation: "Alexandria, Egypt",
  mapLat: 31.2001,
  mapLng: 29.9187,
}

const defaultFooterSettings: FooterSettings = {
  description: {
    en: "Handcrafted with passion, our blooms whisper tales of romance and elegance.",
    ar: "صُنعت بشغف، زهورنا تهمس بحكايات الرومانسية والأناقة.",
  },
  quickLinks: [
    { label: { en: "Home", ar: "الرئيسية" }, href: "/" },
    { label: { en: "Shop", ar: "المتجر" }, href: "/shop" },
    { label: { en: "About", ar: "من نحن" }, href: "/about" },
  ],
  showSocialLinks: true,
}

const defaultAdminSettings: AdminSettings = {
  name: "Admin",
  email: "admin@whisperingpetals.com",
  password: "admin123",
}

const defaultSectionNames: SectionNames = {
  hero: { en: "Welcome", ar: "مرحباً" },
  products: { en: "Products", ar: "المنتجات" },
  gallery: { en: "Gallery", ar: "معرض الصور" },
  reviews: { en: "Customer Reviews", ar: "آراء العملاء" },
  ourStory: { en: "Our Story", ar: "قصتنا" },
}

const defaultContentSettings: ContentSettings = {
  heroTitle: { en: "Whispering Petals of Affection", ar: "همسات بتلات المحبة" },
  heroSubtitle: {
    en: "Discover our curated collection for moments of love and grace.",
    ar: "اكتشف مجموعتنا المختارة للحظات الحب والرقي.",
  },
  heroImage: "/elegant-pink-roses-bouquet-arrangement.jpg",
  storyText: {
    en: "Founded in 2015, Whispering Petals began as a small dream nurtured by a passion for floristry and a love for creating meaningful connections through flowers. We believe every bloom tells a story and every arrangement creates a memory.",
    ar: "تأسست همسات البتلات في عام ٢٠١٥، بدأت كحلم صغير نما بشغف لفن الزهور وحب خلق روابط ذات معنى من خلال الورود. نؤمن أن كل زهرة تحكي قصة وكل ترتيب يخلق ذكرى.",
  },
  storyText2: {
    en: "From weekend farmers market arrangements to a beloved boutique, we continue to craft beauty with the same passion and attention to detail.",
    ar: "من ترتيبات أسواق المزارعين في نهاية الأسبوع إلى متجر محبوب، نواصل صياغة الجمال بنفس الشغف والاهتمام بالتفاصيل.",
  },
  aboutImage: "/flower-shop-interior.png",
}

const defaultGalleryImages: GalleryImage[] = [
  { id: "1", src: "/vibrant-mixed-flower-bouquet.jpg", alt: "Vibrant mixed flower bouquet" },
  { id: "2", src: "/roses-in-workspace.jpg", alt: "Roses in workspace" },
  { id: "3", src: "/delicate-pink-peonies.jpg", alt: "Delicate pink peonies" },
  { id: "4", src: "/colorful-spring-flower-arrangement.jpg", alt: "Colorful spring arrangement" },
]

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "Sarah M.",
    rating: 5,
    text: {
      en: "Absolutely stunning arrangements! The flowers were fresh and lasted for weeks.",
      ar: "ترتيبات مذهلة! كانت الزهور طازجة واستمرت لأسابيع.",
    },
    avatar: "/diverse-woman-avatar.png",
  },
  {
    id: "2",
    name: "Ahmed K.",
    rating: 5,
    text: {
      en: "Perfect for my anniversary. My wife loved them!",
      ar: "مثالية لذكرى زواجي. زوجتي أحبتها!",
    },
    avatar: "/man-avatar.png",
  },
  {
    id: "3",
    name: "Fatima H.",
    rating: 5,
    text: {
      en: "The most beautiful flowers I've ever received. Excellent service!",
      ar: "أجمل زهور تلقيتها على الإطلاق. خدمة ممتازة!",
    },
    avatar: "/woman-hijab-avatar.jpg",
  },
]

const defaultCategories: Category[] = [
  {
    id: "1",
    name: { en: "Bouquets", ar: "باقات" },
    description: { en: "Beautiful flower bouquets", ar: "باقات زهور جميلة" },
  },
  {
    id: "2",
    name: { en: "Box Arrangements", ar: "ترتيبات صندوق" },
    description: { en: "Elegant box arrangements", ar: "ترتيبات صندوق أنيقة" },
  },
  {
    id: "3",
    name: { en: "Arrangements", ar: "ترتيبات" },
    description: { en: "Custom arrangements", ar: "ترتيبات مخصصة" },
  },
  { id: "4", name: { en: "Baskets", ar: "سلال" }, description: { en: "Flower baskets", ar: "سلال زهور" } },
  { id: "5", name: { en: "Premium", ar: "فاخر" }, description: { en: "Premium selections", ar: "اختيارات فاخرة" } },
]

const defaultAdminTranslations: AdminTranslations = {
  sidebar: {
    dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
    products: { en: "Products", ar: "المنتجات" },
    categories: { en: "Categories", ar: "الفئات" },
    gallery: { en: "Gallery", ar: "المعرض" },
    reviews: { en: "Reviews", ar: "التقييمات" },
    contacts: { en: "Contact Messages", ar: "رسائل التواصل" },
    content: { en: "Content", ar: "المحتوى" },
    translations: { en: "Translations", ar: "الترجمات" },
    adminTranslations: { en: "Admin Translations", ar: "ترجمات الإدارة" },
    footer: { en: "Footer", ar: "التذييل" },
    settings: { en: "Settings", ar: "الإعدادات" },
  },
  common: {
    save: { en: "Save", ar: "حفظ" },
    cancel: { en: "Cancel", ar: "إلغاء" },
    delete: { en: "Delete", ar: "حذف" },
    edit: { en: "Edit", ar: "تعديل" },
    add: { en: "Add", ar: "إضافة" },
    search: { en: "Search", ar: "بحث" },
    actions: { en: "Actions", ar: "إجراءات" },
    status: { en: "Status", ar: "الحالة" },
    name: { en: "Name", ar: "الاسم" },
    description: { en: "Description", ar: "الوصف" },
    price: { en: "Price", ar: "السعر" },
    category: { en: "Category", ar: "الفئة" },
    availability: { en: "Availability", ar: "التوفر" },
    inStock: { en: "In Stock", ar: "متوفر" },
    outOfStock: { en: "Out of Stock", ar: "غير متوفر" },
  },
  dashboard: {
    title: { en: "Dashboard", ar: "لوحة التحكم" },
    totalProducts: { en: "Total Products", ar: "إجمالي المنتجات" },
    totalReviews: { en: "Total Reviews", ar: "إجمالي التقييمات" },
    totalMessages: { en: "Total Messages", ar: "إجمالي الرسائل" },
    recentMessages: { en: "Recent Messages", ar: "الرسائل الأخيرة" },
  },
  products: {
    title: { en: "Products", ar: "المنتجات" },
    addProduct: { en: "Add Product", ar: "إضافة منتج" },
    editProduct: { en: "Edit Product", ar: "تعديل منتج" },
    productName: { en: "Product Name", ar: "اسم المنتج" },
    productDescription: { en: "Product Description", ar: "وصف المنتج" },
    productPrice: { en: "Product Price", ar: "سعر المنتج" },
    productImages: { en: "Product Images", ar: "صور المنتج" },
    productColors: { en: "Product Colors", ar: "ألوان المنتج" },
  },
  categories: {
    title: { en: "Categories", ar: "الفئات" },
    addCategory: { en: "Add Category", ar: "إضافة فئة" },
    editCategory: { en: "Edit Category", ar: "تعديل فئة" },
    categoryName: { en: "Category Name", ar: "اسم الفئة" },
    categoryDescription: { en: "Category Description", ar: "وصف الفئة" },
    noCategories: { en: "No categories found", ar: "لا توجد فئات" },
  },
  settings: {
    title: { en: "Settings", ar: "الإعدادات" },
    storeInfo: { en: "Store Information", ar: "معلومات المتجر" },
    storeName: { en: "Store Name", ar: "اسم المتجر" },
    contactInfo: { en: "Contact Information", ar: "معلومات التواصل" },
    socialMedia: { en: "Social Media", ar: "وسائل التواصل الاجتماعي" },
    adminCredentials: { en: "Admin Credentials", ar: "بيانات اعتماد المسؤول" },
  },
  notifications: {
    title: { en: "Notifications", ar: "الإشعارات" },
    markAllRead: { en: "Mark all read", ar: "تحديد الكل كمقروء" },
    noNotifications: { en: "No new notifications", ar: "لا توجد إشعارات جديدة" },
    viewAllMessages: { en: "View all messages", ar: "عرض كل الرسائل" },
  },
  header: {
    logout: { en: "Logout", ar: "تسجيل الخروج" },
    profile: { en: "Profile", ar: "الملف الشخصي" },
    settings: { en: "Settings", ar: "الإعدادات" },
  },
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: { en: "Blush Harmony Bouquet", ar: "باقة الانسجام الوردية" },
    price: 95,
    description: {
      en: "Exquisite harmony bouquet with blush, autumn tones and hints of romance and elegance. Perfect for anniversaries, birthdays, or expressing your deepest affections.",
      ar: "باقة انسجام رائعة بألوان وردية وخريفية ولمسات من الرومانسية والأناقة. مثالية للذكرى السنوية وأعياد الميلاد أو التعبير عن أعمق مشاعرك.",
    },
    images: ["/pink-roses-bouquet-elegant.jpg"],
    colors: ["Baby Pink", "Blush Rose", "Soft Coral"],
    availability: true,
    category: "Bouquets",
  },
  {
    id: 2,
    name: { en: "Eternal Grace Box", ar: "صندوق الرقي الأبدي" },
    price: 120,
    description: {
      en: "A stunning arrangement of premium roses in an elegant box, symbolizing eternal love and grace.",
      ar: "ترتيب مذهل من الورود الفاخرة في صندوق أنيق، يرمز إلى الحب والرقي الأبديين.",
    },
    images: ["/luxury-flower-box-roses.jpg"],
    colors: ["Classic Red", "Soft Pink", "Pure White"],
    availability: true,
    category: "Box Arrangements",
  },
  {
    id: 3,
    name: { en: "Velvet Romance Arrangement", ar: "ترتيب الرومانسية المخملية" },
    price: 110,
    description: {
      en: "Velvet-textured roses paired with delicate greenery create this romantic masterpiece.",
      ar: "ورود بملمس مخملي مع خضرة رقيقة تخلق هذه التحفة الرومانسية.",
    },
    images: ["/velvet-red-roses-arrangement.jpg"],
    colors: ["Deep Red", "Burgundy", "Rose Gold"],
    availability: true,
    category: "Arrangements",
  },
  {
    id: 4,
    name: { en: "Garden Dream Basket", ar: "سلة أحلام الحديقة" },
    price: 85,
    description: {
      en: "A whimsical basket filled with garden-fresh blooms, bringing the beauty of nature indoors.",
      ar: "سلة خيالية مليئة بالأزهار الطازجة من الحديقة، تجلب جمال الطبيعة إلى الداخل.",
    },
    images: ["/garden-flower-basket-arrangement.jpg"],
    colors: ["Mixed Pastels", "Lavender Dreams", "Sunny Yellow"],
    availability: true,
    category: "Baskets",
  },
  {
    id: 5,
    name: { en: "Peony Paradise", ar: "جنة الفاوانيا" },
    price: 145,
    description: {
      en: "Luxurious peonies in full bloom, representing prosperity and romance.",
      ar: "فاوانيا فاخرة في تفتح كامل، ترمز إلى الازدهار والرومانسية.",
    },
    images: ["/peony-flower-arrangement-luxury.jpg"],
    colors: ["Blush Pink", "Coral Charm", "White Cloud"],
    availability: true,
    category: "Premium",
  },
  {
    id: 6,
    name: { en: "Sunset Serenade", ar: "سيريناد الغروب" },
    price: 75,
    description: {
      en: "Warm sunset tones dance through this enchanting arrangement.",
      ar: "ألوان غروب دافئة ترقص عبر هذا الترتيب الساحر.",
    },
    images: ["/sunset-colored-flower-arrangement.jpg"],
    colors: ["Sunset Orange", "Coral Pink", "Golden Yellow"],
    availability: true,
    category: "Bouquets",
  },
]

// Helper function to safely set localStorage items
const safeSetItem = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    console.warn(`Failed to save ${key} to localStorage - quota exceeded`)
    return false
  }
}

// Helper function to compress image data
const compressImageData = async (imageData: string, maxWidth = 400): Promise<string> => {
  // If it's not a base64 data URL, return as-is
  if (!imageData.startsWith("data:image")) {
    return imageData
  }

  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        // Compress to JPEG with 0.6 quality
        const compressed = canvas.toDataURL("image/jpeg", 0.6)
        resolve(compressed)
      } else {
        resolve(imageData)
      }
    }
    img.onerror = () => resolve(imageData)
    img.src = imageData
  })
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(defaultStoreSettings)
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(defaultFooterSettings)
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(defaultAdminSettings)
  const [sectionNames, setSectionNames] = useState<SectionNames>(defaultSectionNames)
  const [contentSettings, setContentSettings] = useState<ContentSettings>(defaultContentSettings)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(defaultGalleryImages)
  const [reviews, setReviews] = useState<Review[]>(defaultReviews)
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [adminTranslations, setAdminTranslations] = useState<AdminTranslations>(defaultAdminTranslations)

  // Load from localStorage on mount
  useEffect(() => {
    const loadFromStorage = (key: string, setter: (val: unknown) => void, defaultVal: unknown) => {
      try {
        const saved = localStorage.getItem(key)
        if (saved) setter(JSON.parse(saved))
      } catch {
        setter(defaultVal)
      }
    }

    loadFromStorage("contactMessages", setContactMessages, [])
    loadFromStorage("storeSettings", setStoreSettings, defaultStoreSettings)
    loadFromStorage("footerSettings", setFooterSettings, defaultFooterSettings)
    loadFromStorage("adminSettings", setAdminSettings, defaultAdminSettings)
    loadFromStorage("sectionNames", setSectionNames, defaultSectionNames)
    loadFromStorage("contentSettings", setContentSettings, defaultContentSettings)
    loadFromStorage("galleryImages", setGalleryImages, defaultGalleryImages)
    loadFromStorage("reviews", setReviews, defaultReviews)
    loadFromStorage("products", setProducts, defaultProducts)
    loadFromStorage("notifications", setNotifications, [])
    loadFromStorage("categories", setCategories, defaultCategories)
    loadFromStorage("adminTranslations", setAdminTranslations, defaultAdminTranslations)
  }, [])

  useEffect(() => {
    const newNotifications = contactMessages
      .filter((m) => m.status === "new")
      .filter((m) => !notifications.some((n) => n.sourceId === m.id))
      .map((m) => ({
        id: `notif-${m.id}`,
        message: `New message from ${m.name}`,
        time: new Date(m.date).toLocaleString(),
        read: false,
        sourceId: m.id,
      }))

    if (newNotifications.length > 0) {
      setNotifications((prev) => {
        const updated = [...newNotifications, ...prev].slice(0, 20)
        localStorage.setItem("notifications", JSON.stringify(updated))
        return updated
      })
    }
  }, [contactMessages, notifications])

  // Save to localStorage helpers
  const saveToStorage = useCallback((key: string, value: unknown) => {
    const stringified = JSON.stringify(value)
    if (!safeSetItem(key, stringified)) {
      console.warn("Attempting to clear old storage data...")
    }
  }, [])

  const markNotificationAsRead = useCallback(
    (id: string) => {
      setNotifications((prev) => {
        const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        saveToStorage("notifications", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }))
      saveToStorage("notifications", updated)
      return updated
    })
  }, [saveToStorage])

  // Contact Messages
  const addContactMessage = useCallback(
    (message: Omit<ContactMessage, "id" | "date" | "status">) => {
      const newMessage: ContactMessage = {
        ...message,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: "new",
      }
      setContactMessages((prev) => {
        const updated = [newMessage, ...prev]
        saveToStorage("contactMessages", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateMessageStatus = useCallback(
    (id: string, status: ContactMessage["status"]) => {
      setContactMessages((prev) => {
        const updated = prev.map((m) => (m.id === id ? { ...m, status } : m))
        saveToStorage("contactMessages", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const deleteMessage = useCallback(
    (id: string) => {
      setContactMessages((prev) => {
        const updated = prev.filter((m) => m.id !== id)
        saveToStorage("contactMessages", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  // Store Settings
  const updateStoreSettings = useCallback(
    (settings: Partial<StoreSettings>) => {
      setStoreSettings((prev) => {
        const updated = { ...prev, ...settings }
        saveToStorage("storeSettings", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  // Footer Settings
  const updateFooterSettings = useCallback(
    (settings: Partial<FooterSettings>) => {
      setFooterSettings((prev) => {
        const updated = { ...prev, ...settings }
        saveToStorage("footerSettings", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  // Admin Settings
  const updateAdminSettings = useCallback(
    (settings: Partial<AdminSettings>) => {
      setAdminSettings((prev) => {
        const updated = { ...prev, ...settings }
        saveToStorage("adminSettings", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  // Section Names
  const updateSectionNames = useCallback(
    (names: Partial<SectionNames>) => {
      setSectionNames((prev) => {
        const updated = { ...prev, ...names }
        saveToStorage("sectionNames", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  // Content Settings
  const updateContentSettings = useCallback(
    (settings: Partial<ContentSettings>) => {
      setContentSettings((prev) => {
        const updated = { ...prev, ...settings }
        saveToStorage("contentSettings", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  // Gallery
  const addGalleryImage = useCallback(
    (image: Omit<GalleryImage, "id">) => {
      setGalleryImages((prev) => {
        const updated = [...prev, { ...image, id: Date.now().toString() }]
        saveToStorage("galleryImages", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const removeGalleryImage = useCallback(
    (id: string) => {
      setGalleryImages((prev) => {
        const updated = prev.filter((i) => i.id !== id)
        saveToStorage("galleryImages", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateGalleryImage = useCallback(
    (id: string, image: Partial<GalleryImage>) => {
      setGalleryImages((prev) => {
        const updated = prev.map((i) => (i.id === id ? { ...i, ...image } : i))
        saveToStorage("galleryImages", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  // Reviews
  const addReview = useCallback(
    (review: Omit<Review, "id">) => {
      setReviews((prev) => {
        const updated = [...prev, { ...review, id: Date.now().toString() }]
        saveToStorage("reviews", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const removeReview = useCallback(
    (id: string) => {
      setReviews((prev) => {
        const updated = prev.filter((r) => r.id !== id)
        saveToStorage("reviews", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateReview = useCallback(
    (id: string, review: Partial<Review>) => {
      setReviews((prev) => {
        const updated = prev.map((r) => (r.id === id ? { ...r, ...review } : r))
        saveToStorage("reviews", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  // Products
  const addProduct = useCallback(async (product: Omit<Product, "id">) => {
    // Compress images before storing
    const compressedImages = await Promise.all(product.images.map((img) => compressImageData(img, 400)))

    setProducts((prev) => {
      const maxId = prev.reduce((max, p) => Math.max(max, p.id), 0)
      const newProduct: Product = {
        ...product,
        id: maxId + 1,
        images: compressedImages,
      }
      const updated = [...prev, newProduct]

      const stringified = JSON.stringify(updated)
      if (!safeSetItem("products", stringified)) {
        const fallbackProduct: Product = {
          ...product,
          id: maxId + 1,
          images: ["/vibrant-flower-bouquet.png"],
        }
        const fallbackUpdated = [...prev, fallbackProduct]
        safeSetItem("products", JSON.stringify(fallbackUpdated))
        return fallbackUpdated
      }

      return updated
    })
  }, [])

  const removeProduct = useCallback(
    (id: number) => {
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id)
        saveToStorage("products", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateProduct = useCallback(async (id: number, product: Partial<Product>) => {
    let processedProduct = product
    if (product.images) {
      const compressedImages = await Promise.all(product.images.map((img) => compressImageData(img, 400)))
      processedProduct = { ...product, images: compressedImages }
    }

    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...processedProduct } : p))
      const stringified = JSON.stringify(updated)
      if (!safeSetItem("products", stringified)) {
        const noImageUpdate = prev.map((p) => (p.id === id ? { ...p, ...product, images: p.images } : p))
        safeSetItem("products", JSON.stringify(noImageUpdate))
        return noImageUpdate
      }
      return updated
    })
  }, [])

  const addCategory = useCallback(
    (category: Omit<Category, "id">) => {
      setCategories((prev) => {
        const updated = [...prev, { ...category, id: Date.now().toString() }]
        saveToStorage("categories", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateCategory = useCallback(
    (id: string, category: Partial<Category>) => {
      setCategories((prev) => {
        const updated = prev.map((c) => (c.id === id ? { ...c, ...category } : c))
        saveToStorage("categories", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const removeCategory = useCallback(
    (id: string) => {
      setCategories((prev) => {
        const updated = prev.filter((c) => c.id !== id)
        saveToStorage("categories", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  const updateAdminTranslations = useCallback(
    (translations: Partial<AdminTranslations>) => {
      setAdminTranslations((prev) => {
        const updated = { ...prev, ...translations }
        saveToStorage("adminTranslations", updated)
        return updated
      })
    },
    [saveToStorage],
  )

  return (
    <StoreContext.Provider
      value={{
        contactMessages,
        addContactMessage,
        updateMessageStatus,
        deleteMessage,
        storeSettings,
        updateStoreSettings,
        footerSettings,
        updateFooterSettings,
        adminSettings,
        updateAdminSettings,
        sectionNames,
        updateSectionNames,
        contentSettings,
        updateContentSettings,
        galleryImages,
        addGalleryImage,
        removeGalleryImage,
        updateGalleryImage,
        reviews,
        addReview,
        removeReview,
        updateReview,
        products,
        addProduct,
        removeProduct,
        updateProduct,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        categories,
        addCategory,
        updateCategory,
        removeCategory,
        adminTranslations,
        updateAdminTranslations,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
