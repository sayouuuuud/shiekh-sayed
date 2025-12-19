(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTranslations",
    ()=>getTranslations,
    "isRTL",
    ()=>isRTL,
    "translations",
    ()=>translations
]);
const translations = {
    en: {
        // Navigation
        home: "Home",
        shop: "Shop",
        favorites: "Favorites",
        profile: "Profile",
        about: "About",
        // Hero
        heroTitle: "Whispering Petals of Affection",
        heroSubtitle: "Discover our curated collection for moments of love and grace.",
        exploreCollection: "EXPLORE COLLECTION",
        // Products
        gardenFavorites: "Garden Favorites",
        products: "Products",
        shopNow: "Shop Now",
        addToFavorites: "Add to Favorites",
        // About
        ourStory: "Our Story",
        ourStoryText: "Handcrafted with passion, our blooms whisper tales of romance and elegance. Learn about our journey.",
        readMore: "READ MORE",
        visitBoutique: "Visit Our Boutique",
        address: "123 Rose Lane, Blossom City, CA 90210",
        openHours: "Open Daily: 10 AM - 6 PM",
        contactUs: "Contact Us",
        gallery: "Gallery",
        customerReviews: "Customer Reviews",
        // Contact Form
        yourName: "Your Name",
        phoneOrEmail: "Phone or Email",
        message: "Message",
        sendMessage: "Send Message",
        contactViaWhatsApp: "Contact via WhatsApp",
        messageSent: "Message sent successfully!",
        messageError: "Failed to send message. Please try again.",
        // Footer
        quickLinks: "Quick Links",
        followUs: "Follow Us",
        phone: "Phone",
        email: "Email",
        allRightsReserved: "All rights reserved.",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        // Product Details
        color: "Color",
        quantity: "Quantity",
        orderViaWhatsApp: "Order via WhatsApp",
        inStock: "In Stock",
        outOfStock: "Out of Stock",
        customOrder: "Custom Order",
        customOrderText: "Looking for something special? We create custom arrangements tailored to your vision.",
        // Shop Page
        ourCollection: "Our Collection",
        discoverPerfect: "Discover the perfect arrangement for every moment",
        filterByCategory: "Filter by Category",
        allCategories: "All Categories",
        // Admin
        adminDashboard: "Admin Dashboard",
        totalProducts: "Total Products",
        available: "Available",
        categories: "Categories",
        addProduct: "Add Product",
        editProduct: "Edit Product",
        deleteProduct: "Delete Product",
        whatsappSettings: "WhatsApp Settings",
        whatsappNumber: "WhatsApp Number",
        messageTemplate: "Message Template",
        saveSettings: "Save Settings",
        logout: "Logout",
        dashboard: "Dashboard",
        orders: "Orders",
        reviews: "Reviews",
        content: "Content",
        translations: "Translations",
        totalSales: "Total Sales",
        mostViewed: "Most Viewed",
        mostRequested: "Most Requested",
        contactSubmissions: "Contact Submissions",
        // Common
        loading: "Loading...",
        error: "Error",
        success: "Success",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit"
    },
    ar: {
        // Navigation
        home: "الرئيسية",
        shop: "المتجر",
        favorites: "المفضلة",
        profile: "الملف الشخصي",
        about: "من نحن",
        // Hero
        heroTitle: "همسات بتلات المحبة",
        heroSubtitle: "اكتشف مجموعتنا المختارة للحظات الحب والرقي.",
        exploreCollection: "استكشف المجموعة",
        // Products
        gardenFavorites: "المفضلة من الحديقة",
        products: "المنتجات",
        shopNow: "تسوق الآن",
        addToFavorites: "أضف للمفضلة",
        // About
        ourStory: "قصتنا",
        ourStoryText: "صُنعت بشغف، زهورنا تهمس بحكايات الرومانسية والأناقة. تعرف على رحلتنا.",
        readMore: "اقرأ المزيد",
        visitBoutique: "زر متجرنا",
        address: "١٢٣ طريق الورد، مدينة الزهور",
        openHours: "مفتوح يومياً: ١٠ ص - ٦ م",
        contactUs: "اتصل بنا",
        gallery: "معرض الصور",
        customerReviews: "آراء العملاء",
        // Contact Form
        yourName: "اسمك",
        phoneOrEmail: "الهاتف أو البريد الإلكتروني",
        message: "الرسالة",
        sendMessage: "إرسال الرسالة",
        contactViaWhatsApp: "تواصل عبر واتساب",
        messageSent: "تم إرسال الرسالة بنجاح!",
        messageError: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
        // Footer
        quickLinks: "روابط سريعة",
        followUs: "تابعنا",
        phone: "الهاتف",
        email: "البريد الإلكتروني",
        allRightsReserved: "جميع الحقوق محفوظة.",
        privacyPolicy: "سياسة الخصوصية",
        termsOfService: "شروط الخدمة",
        // Product Details
        color: "اللون",
        quantity: "الكمية",
        orderViaWhatsApp: "اطلب عبر واتساب",
        inStock: "متوفر",
        outOfStock: "غير متوفر",
        customOrder: "طلب مخصص",
        customOrderText: "تبحث عن شيء مميز؟ نصنع ترتيبات مخصصة حسب رؤيتك.",
        // Shop Page
        ourCollection: "مجموعتنا",
        discoverPerfect: "اكتشف الترتيب المثالي لكل لحظة",
        filterByCategory: "تصفية حسب الفئة",
        allCategories: "جميع الفئات",
        // Admin
        adminDashboard: "لوحة التحكم",
        totalProducts: "إجمالي المنتجات",
        available: "متوفر",
        categories: "الفئات",
        addProduct: "إضافة منتج",
        editProduct: "تعديل المنتج",
        deleteProduct: "حذف المنتج",
        whatsappSettings: "إعدادات واتساب",
        whatsappNumber: "رقم واتساب",
        messageTemplate: "نموذج الرسالة",
        saveSettings: "حفظ الإعدادات",
        logout: "تسجيل الخروج",
        dashboard: "لوحة التحكم",
        orders: "الطلبات",
        reviews: "التقييمات",
        content: "المحتوى",
        translations: "الترجمات",
        totalSales: "إجمالي المبيعات",
        mostViewed: "الأكثر مشاهدة",
        mostRequested: "الأكثر طلباً",
        contactSubmissions: "رسائل التواصل",
        // Common
        loading: "جاري التحميل...",
        error: "خطأ",
        success: "نجاح",
        save: "حفظ",
        cancel: "إلغاء",
        delete: "حذف",
        edit: "تعديل"
    }
};
function getTranslations(locale) {
    return translations[locale];
}
function isRTL(locale) {
    return locale === "ar";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/language-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const defaultValue = {
    locale: "en",
    setLocale: ()=>{},
    t: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslations"])("en"),
    isRTL: false
};
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(defaultValue);
function LanguageProvider({ children }) {
    _s();
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("en");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            const saved = localStorage.getItem("locale");
            if (saved && (saved === "en" || saved === "ar")) {
                setLocaleState(saved);
            }
        }
    }["LanguageProvider.useEffect"], []);
    const setLocale = (newLocale)=>{
        setLocaleState(newLocale);
        localStorage.setItem("locale", newLocale);
    };
    const value = {
        locale,
        setLocale,
        t: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslations"])(locale),
        isRTL: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRTL"])(locale)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/language-context.tsx",
        lineNumber: 44,
        columnNumber: 10
    }, this);
}
_s(LanguageProvider, "khLE4e6Saw106TElYr78R7Ktb24=");
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    return context;
}
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/store-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StoreProvider",
    ()=>StoreProvider,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const defaultStoreSettings = {
    storeName: "Whispering Petals",
    logo: "",
    whatsappNumber: "+201234567890",
    productOrderTemplate: `Hello {storeName}!\n\nI would like to order:\nProduct: {productName}\nProduct ID: {productId}\nColor: {color}\nQuantity: {quantity}\nTotal: {total}\n\nThank you!`,
    customOrderTemplate: `Hello {storeName}!\n\nI would like to place a custom order.\n\nPlease contact me to discuss my requirements.\n\nThank you!`,
    address: "Alexandria, Egypt",
    businessHours: "Daily: 10:00 AM - 6:00 PM",
    phone: "+20 123 456 7890",
    email: "hello@whisperingpetals.com",
    instagram: "",
    facebook: "",
    twitter: "",
    mapLocation: "Alexandria, Egypt",
    mapLat: 31.2001,
    mapLng: 29.9187
};
const defaultFooterSettings = {
    description: {
        en: "Handcrafted with passion, our blooms whisper tales of romance and elegance.",
        ar: "صُنعت بشغف، زهورنا تهمس بحكايات الرومانسية والأناقة."
    },
    quickLinks: [
        {
            label: {
                en: "Home",
                ar: "الرئيسية"
            },
            href: "/"
        },
        {
            label: {
                en: "Shop",
                ar: "المتجر"
            },
            href: "/shop"
        },
        {
            label: {
                en: "About",
                ar: "من نحن"
            },
            href: "/about"
        }
    ],
    showSocialLinks: true
};
const defaultAdminSettings = {
    name: "Admin",
    email: "admin@whisperingpetals.com",
    password: "admin123"
};
const defaultSectionNames = {
    hero: {
        en: "Welcome",
        ar: "مرحباً"
    },
    products: {
        en: "Products",
        ar: "المنتجات"
    },
    gallery: {
        en: "Gallery",
        ar: "معرض الصور"
    },
    reviews: {
        en: "Customer Reviews",
        ar: "آراء العملاء"
    },
    ourStory: {
        en: "Our Story",
        ar: "قصتنا"
    }
};
const defaultContentSettings = {
    heroTitle: {
        en: "Whispering Petals of Affection",
        ar: "همسات بتلات المحبة"
    },
    heroSubtitle: {
        en: "Discover our curated collection for moments of love and grace.",
        ar: "اكتشف مجموعتنا المختارة للحظات الحب والرقي."
    },
    heroImage: "/beautiful-pink-roses-flower-arrangement-elegant.jpg",
    storyText: {
        en: "Founded in 2015, Whispering Petals began as a small dream nurtured by a passion for floristry and a love for creating meaningful connections through flowers.",
        ar: "تأسست همسات البتلات في عام ٢٠١٥، بدأت كحلم صغير نما بشغف لفن الزهور وحب خلق روابط ذات معنى من خلال الورود."
    },
    storyText2: {
        en: "From weekend farmers market arrangements to a beloved boutique, we continue to craft beauty with the same passion and attention to detail.",
        ar: "من ترتيبات أسواق المزارعين في نهاية الأسبوع إلى متجر محبوب، نواصل صياغة الجمال بنفس الشغف والاهتمام بالتفاصيل."
    },
    aboutImage: "/flower-shop-storefront-elegant-boutique.jpg"
};
const defaultGalleryImages = [
    {
        id: "1",
        src: "/vibrant-mixed-flower-bouquet-colorful.jpg",
        alt: "Vibrant mixed flower bouquet"
    },
    {
        id: "2",
        src: "/roses-in-workspace-elegant-arrangement.jpg",
        alt: "Roses in workspace"
    },
    {
        id: "3",
        src: "/delicate-pink-peonies-soft-petals.jpg",
        alt: "Delicate pink peonies"
    },
    {
        id: "4",
        src: "/colorful-spring-flower-arrangement.jpg",
        alt: "Colorful spring arrangement"
    },
    {
        id: "5",
        src: "/elegant-white-roses-bouquet.jpg",
        alt: "Elegant white roses"
    },
    {
        id: "6",
        src: "/lavender-flower-arrangement-purple.jpg",
        alt: "Lavender arrangement"
    }
];
const defaultReviews = [
    {
        id: "1",
        name: "Sarah M.",
        rating: 5,
        text: {
            en: "Absolutely stunning arrangements! The flowers were fresh and lasted for weeks.",
            ar: "ترتيبات مذهلة! كانت الزهور طازجة واستمرت لأسابيع."
        },
        avatar: "/professional-woman-avatar.png"
    },
    {
        id: "2",
        name: "Ahmed K.",
        rating: 5,
        text: {
            en: "Perfect for my anniversary. My wife loved them!",
            ar: "مثالية لذكرى زواجي. زوجتي أحبتها!"
        },
        avatar: "/professional-man-avatar.png"
    },
    {
        id: "3",
        name: "Fatima H.",
        rating: 5,
        text: {
            en: "The most beautiful flowers I've ever received. Excellent service!",
            ar: "أجمل زهور تلقيتها على الإطلاق. خدمة ممتازة!"
        },
        avatar: "/woman-hijab-avatar-professional.jpg"
    }
];
const defaultCategories = [
    {
        id: "1",
        name: {
            en: "Bouquets",
            ar: "باقات"
        },
        description: {
            en: "Beautiful flower bouquets",
            ar: "باقات زهور جميلة"
        }
    },
    {
        id: "2",
        name: {
            en: "Box Arrangements",
            ar: "ترتيبات صندوق"
        },
        description: {
            en: "Elegant box arrangements",
            ar: "ترتيبات صندوق أنيقة"
        }
    },
    {
        id: "3",
        name: {
            en: "Arrangements",
            ar: "ترتيبات"
        },
        description: {
            en: "Custom arrangements",
            ar: "ترتيبات مخصصة"
        }
    },
    {
        id: "4",
        name: {
            en: "Baskets",
            ar: "سلال"
        },
        description: {
            en: "Flower baskets",
            ar: "سلال زهور"
        }
    },
    {
        id: "5",
        name: {
            en: "Premium",
            ar: "فاخر"
        },
        description: {
            en: "Premium selections",
            ar: "اختيارات فاخرة"
        }
    }
];
const defaultAdminTranslations = {
    sidebar: {
        dashboard: {
            en: "Dashboard",
            ar: "لوحة التحكم"
        },
        products: {
            en: "Products",
            ar: "المنتجات"
        },
        categories: {
            en: "Categories",
            ar: "الفئات"
        },
        gallery: {
            en: "Gallery",
            ar: "المعرض"
        },
        reviews: {
            en: "Reviews",
            ar: "التقييمات"
        },
        contacts: {
            en: "Contact Messages",
            ar: "رسائل التواصل"
        },
        content: {
            en: "Content",
            ar: "المحتوى"
        },
        translations: {
            en: "Translations",
            ar: "الترجمات"
        },
        adminTranslations: {
            en: "Admin Translations",
            ar: "ترجمات الإدارة"
        },
        footer: {
            en: "Footer",
            ar: "التذييل"
        },
        settings: {
            en: "Settings",
            ar: "الإعدادات"
        },
        quiz: {
            en: "Flower Quiz",
            ar: "اختبار الأزهار"
        }
    },
    common: {
        save: {
            en: "Save",
            ar: "حفظ"
        },
        cancel: {
            en: "Cancel",
            ar: "إلغاء"
        },
        delete: {
            en: "Delete",
            ar: "حذف"
        },
        edit: {
            en: "Edit",
            ar: "تعديل"
        },
        add: {
            en: "Add",
            ar: "إضافة"
        },
        search: {
            en: "Search",
            ar: "بحث"
        },
        actions: {
            en: "Actions",
            ar: "إجراءات"
        },
        status: {
            en: "Status",
            ar: "الحالة"
        },
        name: {
            en: "Name",
            ar: "الاسم"
        },
        description: {
            en: "Description",
            ar: "الوصف"
        },
        price: {
            en: "Price",
            ar: "السعر"
        },
        category: {
            en: "Category",
            ar: "الفئة"
        },
        availability: {
            en: "Availability",
            ar: "التوفر"
        },
        inStock: {
            en: "In Stock",
            ar: "متوفر"
        },
        outOfStock: {
            en: "Out of Stock",
            ar: "غير متوفر"
        }
    },
    dashboard: {
        title: {
            en: "Dashboard",
            ar: "لوحة التحكم"
        },
        totalProducts: {
            en: "Total Products",
            ar: "إجمالي المنتجات"
        },
        totalReviews: {
            en: "Total Reviews",
            ar: "إجمالي التقييمات"
        },
        totalMessages: {
            en: "Total Messages",
            ar: "إجمالي الرسائل"
        },
        recentMessages: {
            en: "Recent Messages",
            ar: "الرسائل الأخيرة"
        }
    },
    products: {
        title: {
            en: "Products",
            ar: "المنتجات"
        },
        addProduct: {
            en: "Add Product",
            ar: "إضافة منتج"
        },
        editProduct: {
            en: "Edit Product",
            ar: "تعديل منتج"
        },
        productName: {
            en: "Product Name",
            ar: "اسم المنتج"
        },
        productDescription: {
            en: "Product Description",
            ar: "وصف المنتج"
        },
        productPrice: {
            en: "Product Price",
            ar: "سعر المنتج"
        },
        productImages: {
            en: "Product Images",
            ar: "صور المنتج"
        },
        productColors: {
            en: "Product Colors",
            ar: "ألوان المنتج"
        }
    },
    categories: {
        title: {
            en: "Categories",
            ar: "الفئات"
        },
        addCategory: {
            en: "Add Category",
            ar: "إضافة فئة"
        },
        editCategory: {
            en: "Edit Category",
            ar: "تعديل فئة"
        },
        categoryName: {
            en: "Category Name",
            ar: "اسم الفئة"
        },
        categoryDescription: {
            en: "Category Description",
            ar: "وصف الفئة"
        },
        noCategories: {
            en: "No categories found",
            ar: "لا توجد فئات"
        }
    },
    settings: {
        title: {
            en: "Settings",
            ar: "الإعدادات"
        },
        storeInfo: {
            en: "Store Information",
            ar: "معلومات المتجر"
        },
        storeName: {
            en: "Store Name",
            ar: "اسم المتجر"
        },
        contactInfo: {
            en: "Contact Information",
            ar: "معلومات التواصل"
        },
        socialMedia: {
            en: "Social Media",
            ar: "وسائل التواصل الاجتماعي"
        },
        adminCredentials: {
            en: "Admin Credentials",
            ar: "بيانات اعتماد المسؤول"
        }
    },
    notifications: {
        title: {
            en: "Notifications",
            ar: "الإشعارات"
        },
        markAllRead: {
            en: "Mark all read",
            ar: "تحديد الكل كمقروء"
        },
        noNotifications: {
            en: "No new notifications",
            ar: "لا توجد إشعارات جديدة"
        },
        viewAllMessages: {
            en: "View all messages",
            ar: "عرض كل الرسائل"
        }
    },
    header: {
        logout: {
            en: "Logout",
            ar: "تسجيل الخروج"
        },
        profile: {
            en: "Profile",
            ar: "الملف الشخصي"
        },
        settings: {
            en: "Settings",
            ar: "الإعدادات"
        }
    }
};
const defaultProducts = [
    {
        id: 1,
        name: {
            en: "Blush Harmony Bouquet",
            ar: "باقة الانسجام الوردية"
        },
        price: 95,
        description: {
            en: "Exquisite harmony bouquet with blush, autumn tones and hints of romance and elegance.",
            ar: "باقة انسجام رائعة بألوان وردية وخريفية ولمسات من الرومانسية والأناقة."
        },
        images: [
            "/pink-roses-bouquet-elegant-blush.jpg"
        ],
        colors: [
            "Baby Pink",
            "Blush Rose",
            "Soft Coral"
        ],
        availability: true,
        category: "Bouquets"
    },
    {
        id: 2,
        name: {
            en: "Eternal Grace Box",
            ar: "صندوق الرقي الأبدي"
        },
        price: 120,
        description: {
            en: "A stunning arrangement of premium roses in an elegant box.",
            ar: "ترتيب مذهل من الورود الفاخرة في صندوق أنيق."
        },
        images: [
            "/luxury-flower-box-roses-elegant-gift.jpg"
        ],
        colors: [
            "Classic Red",
            "Soft Pink",
            "Pure White"
        ],
        availability: true,
        category: "Box Arrangements"
    },
    {
        id: 3,
        name: {
            en: "Velvet Romance Arrangement",
            ar: "ترتيب الرومانسية المخملية"
        },
        price: 110,
        description: {
            en: "Velvet-textured roses paired with delicate greenery.",
            ar: "ورود بملمس مخملي مع خضرة رقيقة."
        },
        images: [
            "/velvet-red-roses-arrangement-romantic.jpg"
        ],
        colors: [
            "Deep Red",
            "Burgundy",
            "Rose Gold"
        ],
        availability: true,
        category: "Arrangements"
    },
    {
        id: 4,
        name: {
            en: "Garden Dream Basket",
            ar: "سلة أحلام الحديقة"
        },
        price: 85,
        description: {
            en: "A whimsical basket filled with garden-fresh blooms.",
            ar: "سلة خيالية مليئة بالأزهار الطازجة من الحديقة."
        },
        images: [
            "/garden-flower-basket-arrangement-colorful.jpg"
        ],
        colors: [
            "Mixed Pastels",
            "Lavender Dreams",
            "Sunny Yellow"
        ],
        availability: true,
        category: "Baskets"
    },
    {
        id: 5,
        name: {
            en: "Peony Paradise",
            ar: "جنة الفاوانيا"
        },
        price: 145,
        description: {
            en: "Luxurious peonies in full bloom.",
            ar: "فاوانيا فاخرة في تفتح كامل."
        },
        images: [
            "/peony-flower-arrangement-luxury-pink.jpg"
        ],
        colors: [
            "Blush Pink",
            "Coral Charm",
            "White Cloud"
        ],
        availability: true,
        category: "Premium"
    },
    {
        id: 6,
        name: {
            en: "Sunset Serenade",
            ar: "سيريناد الغروب"
        },
        price: 75,
        description: {
            en: "Warm sunset tones dance through this enchanting arrangement.",
            ar: "ألوان غروب دافئة ترقص عبر هذا الترتيب الساحر."
        },
        images: [
            "/sunset-colored-flower-arrangement-orange-coral.jpg"
        ],
        colors: [
            "Sunset Orange",
            "Coral Pink",
            "Golden Yellow"
        ],
        availability: true,
        category: "Bouquets"
    }
];
const StoreContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function StoreProvider({ children }) {
    _s();
    const [contactMessages, setContactMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [storeSettings, setStoreSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultStoreSettings);
    const [footerSettings, setFooterSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultFooterSettings);
    const [adminSettings, setAdminSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultAdminSettings);
    const [sectionNames, setSectionNames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSectionNames);
    const [contentSettings, setContentSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultContentSettings);
    const [galleryImages, setGalleryImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultGalleryImages);
    const [reviews, setReviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultReviews);
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultProducts);
    const [notifications, setNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultCategories);
    const [adminTranslations, setAdminTranslations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultAdminTranslations);
    const [quizzes, setQuizzes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeQuiz, setActiveQuiz] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quizResults, setQuizResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const prevMessageCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const prevQuizResultCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const initialLoadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    const isAdminPageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const playNotificationSound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[playNotificationSound]": ()=>{
            if (!isAdminPageRef.current) return;
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.frequency.value = 800;
                oscillator.type = "sine";
                gainNode.gain.value = 0.3;
                oscillator.start();
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.stop(audioContext.currentTime + 0.3);
            } catch (e) {
            // Ignore errors
            }
        }
    }["StoreProvider.useCallback[playNotificationSound]"], []);
    const setIsAdminPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setIsAdminPage]": (isAdmin)=>{
            isAdminPageRef.current = isAdmin;
        }
    }["StoreProvider.useCallback[setIsAdminPage]"], []);
    const playAdminNotificationSound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[playAdminNotificationSound]": ()=>{
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                oscillator.frequency.value = 800;
                oscillator.type = "sine";
                gainNode.gain.value = 0.3;
                oscillator.start();
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.stop(audioContext.currentTime + 0.3);
            } catch (e) {
            // Ignore errors
            }
        }
    }["StoreProvider.useCallback[playAdminNotificationSound]"], []);
    const clearAllNotifications = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[clearAllNotifications]": ()=>{
            setNotifications([]);
            localStorage.setItem("notifications", JSON.stringify([]));
        }
    }["StoreProvider.useCallback[clearAllNotifications]"], []);
    // Load from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            setMounted(true);
            try {
                const savedMessages = localStorage.getItem("contactMessages");
                if (savedMessages) setContactMessages(JSON.parse(savedMessages));
                const savedStoreSettings = localStorage.getItem("storeSettings");
                if (savedStoreSettings) setStoreSettings({
                    ...defaultStoreSettings,
                    ...JSON.parse(savedStoreSettings)
                });
                const savedFooterSettings = localStorage.getItem("footerSettings");
                if (savedFooterSettings) setFooterSettings({
                    ...defaultFooterSettings,
                    ...JSON.parse(savedFooterSettings)
                });
                const savedAdminSettings = localStorage.getItem("adminSettings");
                if (savedAdminSettings) setAdminSettings({
                    ...defaultAdminSettings,
                    ...JSON.parse(savedAdminSettings)
                });
                const savedSectionNames = localStorage.getItem("sectionNames");
                if (savedSectionNames) setSectionNames({
                    ...defaultSectionNames,
                    ...JSON.parse(savedSectionNames)
                });
                const savedContentSettings = localStorage.getItem("contentSettings");
                if (savedContentSettings) setContentSettings({
                    ...defaultContentSettings,
                    ...JSON.parse(savedContentSettings)
                });
                const savedGalleryImages = localStorage.getItem("galleryImages");
                if (savedGalleryImages) setGalleryImages(JSON.parse(savedGalleryImages));
                const savedReviews = localStorage.getItem("reviews");
                if (savedReviews) setReviews(JSON.parse(savedReviews));
                const savedProducts = localStorage.getItem("products");
                if (savedProducts) setProducts(JSON.parse(savedProducts));
                const savedCategories = localStorage.getItem("categories");
                if (savedCategories) setCategories(JSON.parse(savedCategories));
                const savedAdminTranslations = localStorage.getItem("adminTranslations");
                if (savedAdminTranslations) {
                    const parsed = JSON.parse(savedAdminTranslations);
                    setAdminTranslations({
                        ...defaultAdminTranslations,
                        ...parsed,
                        sidebar: {
                            ...defaultAdminTranslations.sidebar,
                            ...parsed.sidebar
                        }
                    });
                }
                const savedQuizzes = localStorage.getItem("quizzes");
                if (savedQuizzes) {
                    const parsedQuizzes = JSON.parse(savedQuizzes);
                    setQuizzes(parsedQuizzes);
                    const active = parsedQuizzes.find({
                        "StoreProvider.useEffect.active": (q)=>q.isActive
                    }["StoreProvider.useEffect.active"]);
                    if (active) setActiveQuiz(active);
                }
                const savedQuizResults = localStorage.getItem("quizResults");
                if (savedQuizResults) setQuizResults(JSON.parse(savedQuizResults));
                const savedNotifications = localStorage.getItem("notifications");
                if (savedNotifications) {
                    const parsed = JSON.parse(savedNotifications);
                    setNotifications(parsed);
                }
                // Set initial counts after loading
                setTimeout({
                    "StoreProvider.useEffect": ()=>{
                        const msgs = localStorage.getItem("contactMessages");
                        if (msgs) {
                            const parsed = JSON.parse(msgs);
                            prevMessageCountRef.current = parsed.filter({
                                "StoreProvider.useEffect": (m)=>m.status === "new"
                            }["StoreProvider.useEffect"]).length;
                        }
                        const results = localStorage.getItem("quizResults");
                        if (results) {
                            prevQuizResultCountRef.current = JSON.parse(results).length;
                        }
                        initialLoadRef.current = false;
                    }
                }["StoreProvider.useEffect"], 100);
            } catch (error) {
                console.error("[v0] Error loading from localStorage:", error);
            }
        }
    }["StoreProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            if (!mounted || initialLoadRef.current) return;
            const newMessages = contactMessages.filter({
                "StoreProvider.useEffect.newMessages": (m)=>m.status === "new"
            }["StoreProvider.useEffect.newMessages"]);
            if (newMessages.length > prevMessageCountRef.current) {
                const existingIds = notifications.map({
                    "StoreProvider.useEffect.existingIds": (n)=>n.sourceId
                }["StoreProvider.useEffect.existingIds"]);
                const newNotifs = newMessages.filter({
                    "StoreProvider.useEffect.newNotifs": (m)=>!existingIds.includes(m.id)
                }["StoreProvider.useEffect.newNotifs"]).map({
                    "StoreProvider.useEffect.newNotifs": (m)=>({
                            id: `notif-${m.id}`,
                            message: `New message from ${m.name}`,
                            time: new Date(m.date).toLocaleString(),
                            read: false,
                            sourceId: m.id,
                            type: "message"
                        })
                }["StoreProvider.useEffect.newNotifs"]);
                if (newNotifs.length > 0) {
                    setNotifications({
                        "StoreProvider.useEffect": (prev)=>{
                            const updated = [
                                ...newNotifs,
                                ...prev
                            ].slice(0, 50);
                            localStorage.setItem("notifications", JSON.stringify(updated));
                            return updated;
                        }
                    }["StoreProvider.useEffect"]);
                    if (isAdminPageRef.current) {
                        playNotificationSound();
                    }
                }
            }
            prevMessageCountRef.current = newMessages.length;
        }
    }["StoreProvider.useEffect"], [
        contactMessages,
        mounted,
        notifications
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            if (!mounted || initialLoadRef.current || quizResults.length === 0) return;
            if (quizResults.length > prevQuizResultCountRef.current) {
                const existingIds = notifications.map({
                    "StoreProvider.useEffect.existingIds": (n)=>n.sourceId
                }["StoreProvider.useEffect.existingIds"]);
                const newNotifs = quizResults.filter({
                    "StoreProvider.useEffect.newNotifs": (r)=>!existingIds.includes(r.id)
                }["StoreProvider.useEffect.newNotifs"]).map({
                    "StoreProvider.useEffect.newNotifs": (r)=>({
                            id: `quiz-notif-${r.id}`,
                            message: `Quiz completed: ${r.score}/${r.totalQuestions} correct`,
                            time: new Date(r.date).toLocaleString(),
                            read: false,
                            sourceId: r.id,
                            type: "quiz"
                        })
                }["StoreProvider.useEffect.newNotifs"]);
                if (newNotifs.length > 0) {
                    setNotifications({
                        "StoreProvider.useEffect": (prev)=>{
                            const updated = [
                                ...newNotifs,
                                ...prev
                            ].slice(0, 50);
                            localStorage.setItem("notifications", JSON.stringify(updated));
                            return updated;
                        }
                    }["StoreProvider.useEffect"]);
                    if (isAdminPageRef.current) {
                        playNotificationSound();
                    }
                }
            }
            prevQuizResultCountRef.current = quizResults.length;
        }
    }["StoreProvider.useEffect"], [
        quizResults,
        mounted,
        notifications
    ]);
    const saveToStorage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[saveToStorage]": (key, value)=>{
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error(`[v0] Error saving ${key}:`, error);
            }
        }
    }["StoreProvider.useCallback[saveToStorage]"], []);
    const markNotificationAsRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[markNotificationAsRead]": (id)=>{
            setNotifications({
                "StoreProvider.useCallback[markNotificationAsRead]": (prev)=>{
                    const updated = prev.map({
                        "StoreProvider.useCallback[markNotificationAsRead].updated": (n)=>n.id === id ? {
                                ...n,
                                read: true
                            } : n
                    }["StoreProvider.useCallback[markNotificationAsRead].updated"]);
                    localStorage.setItem("notifications", JSON.stringify(updated));
                    return updated;
                }
            }["StoreProvider.useCallback[markNotificationAsRead]"]);
        }
    }["StoreProvider.useCallback[markNotificationAsRead]"], []);
    const markAllNotificationsAsRead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[markAllNotificationsAsRead]": ()=>{
            setNotifications({
                "StoreProvider.useCallback[markAllNotificationsAsRead]": (prev)=>{
                    const updated = prev.map({
                        "StoreProvider.useCallback[markAllNotificationsAsRead].updated": (n)=>({
                                ...n,
                                read: true
                            })
                    }["StoreProvider.useCallback[markAllNotificationsAsRead].updated"]);
                    localStorage.setItem("notifications", JSON.stringify(updated));
                    return updated;
                }
            }["StoreProvider.useCallback[markAllNotificationsAsRead]"]);
        }
    }["StoreProvider.useCallback[markAllNotificationsAsRead]"], []);
    const updateSectionNames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateSectionNames]": (names)=>{
            setSectionNames({
                "StoreProvider.useCallback[updateSectionNames]": (prev)=>{
                    const updated = {
                        ...prev,
                        ...names
                    };
                    saveToStorage("sectionNames", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateSectionNames]"]);
        }
    }["StoreProvider.useCallback[updateSectionNames]"], [
        saveToStorage
    ]);
    const updateContentSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateContentSettings]": (settings)=>{
            setContentSettings({
                "StoreProvider.useCallback[updateContentSettings]": (prev)=>{
                    const updated = {
                        ...prev,
                        ...settings
                    };
                    saveToStorage("contentSettings", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateContentSettings]"]);
        }
    }["StoreProvider.useCallback[updateContentSettings]"], [
        saveToStorage
    ]);
    const addGalleryImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addGalleryImage]": (image)=>{
            const newImage = {
                ...image,
                id: Date.now().toString()
            };
            setGalleryImages({
                "StoreProvider.useCallback[addGalleryImage]": (prev)=>{
                    const updated = [
                        ...prev,
                        newImage
                    ];
                    saveToStorage("galleryImages", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[addGalleryImage]"]);
        }
    }["StoreProvider.useCallback[addGalleryImage]"], [
        saveToStorage
    ]);
    const removeGalleryImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[removeGalleryImage]": (id)=>{
            setGalleryImages({
                "StoreProvider.useCallback[removeGalleryImage]": (prev)=>{
                    const updated = prev.filter({
                        "StoreProvider.useCallback[removeGalleryImage].updated": (img)=>img.id !== id
                    }["StoreProvider.useCallback[removeGalleryImage].updated"]);
                    saveToStorage("galleryImages", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[removeGalleryImage]"]);
        }
    }["StoreProvider.useCallback[removeGalleryImage]"], [
        saveToStorage
    ]);
    const updateGalleryImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateGalleryImage]": (id, image)=>{
            setGalleryImages({
                "StoreProvider.useCallback[updateGalleryImage]": (prev)=>{
                    const updated = prev.map({
                        "StoreProvider.useCallback[updateGalleryImage].updated": (img)=>img.id === id ? {
                                ...img,
                                ...image
                            } : img
                    }["StoreProvider.useCallback[updateGalleryImage].updated"]);
                    saveToStorage("galleryImages", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateGalleryImage]"]);
        }
    }["StoreProvider.useCallback[updateGalleryImage]"], [
        saveToStorage
    ]);
    const addReview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addReview]": (review)=>{
            const newReview = {
                ...review,
                id: Date.now().toString()
            };
            setReviews({
                "StoreProvider.useCallback[addReview]": (prev)=>{
                    const updated = [
                        ...prev,
                        newReview
                    ];
                    saveToStorage("reviews", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[addReview]"]);
        }
    }["StoreProvider.useCallback[addReview]"], [
        saveToStorage
    ]);
    const removeReview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[removeReview]": (id)=>{
            setReviews({
                "StoreProvider.useCallback[removeReview]": (prev)=>{
                    const updated = prev.filter({
                        "StoreProvider.useCallback[removeReview].updated": (r)=>r.id !== id
                    }["StoreProvider.useCallback[removeReview].updated"]);
                    saveToStorage("reviews", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[removeReview]"]);
        }
    }["StoreProvider.useCallback[removeReview]"], [
        saveToStorage
    ]);
    const updateReview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateReview]": (id, review)=>{
            setReviews({
                "StoreProvider.useCallback[updateReview]": (prev)=>{
                    const updated = prev.map({
                        "StoreProvider.useCallback[updateReview].updated": (r)=>r.id === id ? {
                                ...r,
                                ...review
                            } : r
                    }["StoreProvider.useCallback[updateReview].updated"]);
                    saveToStorage("reviews", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateReview]"]);
        }
    }["StoreProvider.useCallback[updateReview]"], [
        saveToStorage
    ]);
    const addProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addProduct]": (product)=>{
            const newProduct = {
                ...product,
                id: Date.now()
            };
            setProducts({
                "StoreProvider.useCallback[addProduct]": (prev)=>{
                    const updated = [
                        ...prev,
                        newProduct
                    ];
                    saveToStorage("products", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[addProduct]"]);
        }
    }["StoreProvider.useCallback[addProduct]"], [
        saveToStorage
    ]);
    const removeProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[removeProduct]": (id)=>{
            setProducts({
                "StoreProvider.useCallback[removeProduct]": (prev)=>{
                    const updated = prev.filter({
                        "StoreProvider.useCallback[removeProduct].updated": (p)=>p.id !== id
                    }["StoreProvider.useCallback[removeProduct].updated"]);
                    saveToStorage("products", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[removeProduct]"]);
        }
    }["StoreProvider.useCallback[removeProduct]"], [
        saveToStorage
    ]);
    const updateProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateProduct]": (id, product)=>{
            setProducts({
                "StoreProvider.useCallback[updateProduct]": (prev)=>{
                    const updated = prev.map({
                        "StoreProvider.useCallback[updateProduct].updated": (p)=>p.id === id ? {
                                ...p,
                                ...product
                            } : p
                    }["StoreProvider.useCallback[updateProduct].updated"]);
                    saveToStorage("products", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateProduct]"]);
        }
    }["StoreProvider.useCallback[updateProduct]"], [
        saveToStorage
    ]);
    const addCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addCategory]": (category)=>{
            const newCategory = {
                ...category,
                id: Date.now().toString()
            };
            setCategories({
                "StoreProvider.useCallback[addCategory]": (prev)=>{
                    const updated = [
                        ...prev,
                        newCategory
                    ];
                    saveToStorage("categories", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[addCategory]"]);
        }
    }["StoreProvider.useCallback[addCategory]"], [
        saveToStorage
    ]);
    const updateCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateCategory]": (id, category)=>{
            setCategories({
                "StoreProvider.useCallback[updateCategory]": (prev)=>{
                    const updated = prev.map({
                        "StoreProvider.useCallback[updateCategory].updated": (c)=>c.id === id ? {
                                ...c,
                                ...category
                            } : c
                    }["StoreProvider.useCallback[updateCategory].updated"]);
                    saveToStorage("categories", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateCategory]"]);
        }
    }["StoreProvider.useCallback[updateCategory]"], [
        saveToStorage
    ]);
    const removeCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[removeCategory]": (id)=>{
            setCategories({
                "StoreProvider.useCallback[removeCategory]": (prev)=>{
                    const updated = prev.filter({
                        "StoreProvider.useCallback[removeCategory].updated": (c)=>c.id !== id
                    }["StoreProvider.useCallback[removeCategory].updated"]);
                    saveToStorage("categories", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[removeCategory]"]);
        }
    }["StoreProvider.useCallback[removeCategory]"], [
        saveToStorage
    ]);
    const updateAdminTranslations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateAdminTranslations]": (translations)=>{
            setAdminTranslations({
                "StoreProvider.useCallback[updateAdminTranslations]": (prev)=>{
                    const updated = {
                        ...prev,
                        ...translations
                    };
                    saveToStorage("adminTranslations", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateAdminTranslations]"]);
        }
    }["StoreProvider.useCallback[updateAdminTranslations]"], [
        saveToStorage
    ]);
    const addQuiz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addQuiz]": (quiz)=>{
            const newQuiz = {
                ...quiz,
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            };
            setQuizzes({
                "StoreProvider.useCallback[addQuiz]": (prev)=>{
                    let updated = [
                        ...prev,
                        newQuiz
                    ];
                    if (newQuiz.isActive) {
                        updated = updated.map({
                            "StoreProvider.useCallback[addQuiz]": (q)=>q.id === newQuiz.id ? q : {
                                    ...q,
                                    isActive: false
                                }
                        }["StoreProvider.useCallback[addQuiz]"]);
                        setActiveQuiz(newQuiz);
                    }
                    saveToStorage("quizzes", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[addQuiz]"]);
        }
    }["StoreProvider.useCallback[addQuiz]"], [
        saveToStorage
    ]);
    const updateQuiz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateQuiz]": (id, quiz)=>{
            setQuizzes({
                "StoreProvider.useCallback[updateQuiz]": (prev)=>{
                    let updated = prev.map({
                        "StoreProvider.useCallback[updateQuiz].updated": (q)=>q.id === id ? {
                                ...q,
                                ...quiz
                            } : q
                    }["StoreProvider.useCallback[updateQuiz].updated"]);
                    if (quiz.isActive) {
                        updated = updated.map({
                            "StoreProvider.useCallback[updateQuiz]": (q)=>q.id === id ? q : {
                                    ...q,
                                    isActive: false
                                }
                        }["StoreProvider.useCallback[updateQuiz]"]);
                        const active = updated.find({
                            "StoreProvider.useCallback[updateQuiz].active": (q)=>q.id === id
                        }["StoreProvider.useCallback[updateQuiz].active"]);
                        if (active) setActiveQuiz(active);
                    }
                    saveToStorage("quizzes", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateQuiz]"]);
        }
    }["StoreProvider.useCallback[updateQuiz]"], [
        saveToStorage
    ]);
    const deleteQuiz = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[deleteQuiz]": (id)=>{
            setQuizzes({
                "StoreProvider.useCallback[deleteQuiz]": (prev)=>{
                    const updated = prev.filter({
                        "StoreProvider.useCallback[deleteQuiz].updated": (q)=>q.id !== id
                    }["StoreProvider.useCallback[deleteQuiz].updated"]);
                    saveToStorage("quizzes", updated);
                    if (activeQuiz?.id === id) setActiveQuiz(null);
                    return updated;
                }
            }["StoreProvider.useCallback[deleteQuiz]"]);
        }
    }["StoreProvider.useCallback[deleteQuiz]"], [
        saveToStorage,
        activeQuiz
    ]);
    const setActiveQuizById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[setActiveQuizById]": (id)=>{
            setQuizzes({
                "StoreProvider.useCallback[setActiveQuizById]": (prev)=>{
                    const updated = prev.map({
                        "StoreProvider.useCallback[setActiveQuizById].updated": (q)=>({
                                ...q,
                                isActive: q.id === id
                            })
                    }["StoreProvider.useCallback[setActiveQuizById].updated"]);
                    const active = updated.find({
                        "StoreProvider.useCallback[setActiveQuizById].active": (q)=>q.id === id
                    }["StoreProvider.useCallback[setActiveQuizById].active"]);
                    if (active) setActiveQuiz(active);
                    saveToStorage("quizzes", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[setActiveQuizById]"]);
        }
    }["StoreProvider.useCallback[setActiveQuizById]"], [
        saveToStorage
    ]);
    const addQuizResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addQuizResult]": (result)=>{
            const newResult = {
                ...result,
                id: Date.now().toString()
            };
            setQuizResults({
                "StoreProvider.useCallback[addQuizResult]": (prev)=>{
                    const updated = [
                        newResult,
                        ...prev
                    ];
                    saveToStorage("quizResults", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[addQuizResult]"]);
        }
    }["StoreProvider.useCallback[addQuizResult]"], [
        saveToStorage
    ]);
    const clearQuizResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[clearQuizResults]": ()=>{
            setQuizResults([]);
            saveToStorage("quizResults", []);
        }
    }["StoreProvider.useCallback[clearQuizResults]"], [
        saveToStorage
    ]);
    const value = {
        contactMessages,
        addContactMessage: (message)=>{
            const newMessage = {
                ...message,
                id: Date.now().toString(),
                date: new Date().toISOString(),
                status: "new"
            };
            setContactMessages((prev)=>{
                const updated = [
                    newMessage,
                    ...prev
                ];
                saveToStorage("contactMessages", updated);
                return updated;
            });
        },
        updateMessageStatus: (id, status)=>{
            setContactMessages((prev)=>{
                const updated = prev.map((m)=>m.id === id ? {
                        ...m,
                        status
                    } : m);
                saveToStorage("contactMessages", updated);
                return updated;
            });
        },
        deleteMessage: (id)=>{
            setContactMessages((prev)=>{
                const updated = prev.filter((m)=>m.id !== id);
                saveToStorage("contactMessages", updated);
                return updated;
            });
        },
        storeSettings,
        updateStoreSettings: (settings)=>{
            setStoreSettings((prev)=>{
                const updated = {
                    ...prev,
                    ...settings
                };
                saveToStorage("storeSettings", updated);
                return updated;
            });
        },
        footerSettings,
        updateFooterSettings: (settings)=>{
            setFooterSettings((prev)=>{
                const updated = {
                    ...prev,
                    ...settings
                };
                saveToStorage("footerSettings", updated);
                return updated;
            });
        },
        adminSettings,
        updateAdminSettings: (settings)=>{
            setAdminSettings((prev)=>{
                const updated = {
                    ...prev,
                    ...settings
                };
                saveToStorage("adminSettings", updated);
                return updated;
            });
        },
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
        clearAllNotifications,
        playAdminNotificationSound,
        setIsAdminPage,
        categories,
        addCategory,
        updateCategory,
        removeCategory,
        adminTranslations,
        updateAdminTranslations,
        quizzes,
        activeQuiz,
        quizResults,
        addQuiz,
        updateQuiz,
        deleteQuiz,
        setActiveQuizById,
        addQuizResult,
        clearQuizResults
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoreContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/store-context.tsx",
        lineNumber: 1116,
        columnNumber: 10
    }, this);
}
_s(StoreProvider, "LbC0DyNHsM+Oc94mCKSefuqS0WY=");
_c = StoreProvider;
function useStore() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StoreContext);
    if (context === undefined) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
}
_s1(useStore, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "StoreProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_a167d269._.js.map