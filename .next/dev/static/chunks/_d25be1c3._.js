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
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
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
        lineNumber: 37,
        columnNumber: 10
    }, this);
}
_s(LanguageProvider, "khLE4e6Saw106TElYr78R7Ktb24=");
_c = LanguageProvider;
function useLanguage() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
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
    heroImage: "/elegant-pink-roses-bouquet-arrangement.jpg",
    storyText: {
        en: "Founded in 2015, Whispering Petals began as a small dream nurtured by a passion for floristry and a love for creating meaningful connections through flowers. We believe every bloom tells a story and every arrangement creates a memory.",
        ar: "تأسست همسات البتلات في عام ٢٠١٥، بدأت كحلم صغير نما بشغف لفن الزهور وحب خلق روابط ذات معنى من خلال الورود. نؤمن أن كل زهرة تحكي قصة وكل ترتيب يخلق ذكرى."
    },
    storyText2: {
        en: "From weekend farmers market arrangements to a beloved boutique, we continue to craft beauty with the same passion and attention to detail.",
        ar: "من ترتيبات أسواق المزارعين في نهاية الأسبوع إلى متجر محبوب، نواصل صياغة الجمال بنفس الشغف والاهتمام بالتفاصيل."
    },
    aboutImage: "/flower-shop-interior.png"
};
const defaultGalleryImages = [
    {
        id: "1",
        src: "/vibrant-mixed-flower-bouquet.jpg",
        alt: "Vibrant mixed flower bouquet"
    },
    {
        id: "2",
        src: "/roses-in-workspace.jpg",
        alt: "Roses in workspace"
    },
    {
        id: "3",
        src: "/delicate-pink-peonies.jpg",
        alt: "Delicate pink peonies"
    },
    {
        id: "4",
        src: "/colorful-spring-flower-arrangement.jpg",
        alt: "Colorful spring arrangement"
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
        avatar: "/diverse-woman-avatar.png"
    },
    {
        id: "2",
        name: "Ahmed K.",
        rating: 5,
        text: {
            en: "Perfect for my anniversary. My wife loved them!",
            ar: "مثالية لذكرى زواجي. زوجتي أحبتها!"
        },
        avatar: "/man-avatar.png"
    },
    {
        id: "3",
        name: "Fatima H.",
        rating: 5,
        text: {
            en: "The most beautiful flowers I've ever received. Excellent service!",
            ar: "أجمل زهور تلقيتها على الإطلاق. خدمة ممتازة!"
        },
        avatar: "/woman-hijab-avatar.jpg"
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
            en: "Exquisite harmony bouquet with blush, autumn tones and hints of romance and elegance. Perfect for anniversaries, birthdays, or expressing your deepest affections.",
            ar: "باقة انسجام رائعة بألوان وردية وخريفية ولمسات من الرومانسية والأناقة. مثالية للذكرى السنوية وأعياد الميلاد أو التعبير عن أعمق مشاعرك."
        },
        images: [
            "/pink-roses-bouquet-elegant.jpg"
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
            en: "A stunning arrangement of premium roses in an elegant box, symbolizing eternal love and grace.",
            ar: "ترتيب مذهل من الورود الفاخرة في صندوق أنيق، يرمز إلى الحب والرقي الأبديين."
        },
        images: [
            "/luxury-flower-box-roses.jpg"
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
            en: "Velvet-textured roses paired with delicate greenery create this romantic masterpiece.",
            ar: "ورود بملمس مخملي مع خضرة رقيقة تخلق هذه التحفة الرومانسية."
        },
        images: [
            "/velvet-red-roses-arrangement.jpg"
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
            en: "A whimsical basket filled with garden-fresh blooms, bringing the beauty of nature indoors.",
            ar: "سلة خيالية مليئة بالأزهار الطازجة من الحديقة، تجلب جمال الطبيعة إلى الداخل."
        },
        images: [
            "/garden-flower-basket-arrangement.jpg"
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
            en: "Luxurious peonies in full bloom, representing prosperity and romance.",
            ar: "فاوانيا فاخرة في تفتح كامل، ترمز إلى الازدهار والرومانسية."
        },
        images: [
            "/peony-flower-arrangement-luxury.jpg"
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
            "/sunset-colored-flower-arrangement.jpg"
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
// Helper function to safely set localStorage items
const safeSetItem = (key, value)=>{
    try {
        localStorage.setItem(key, value);
        return true;
    } catch  {
        console.warn(`Failed to save ${key} to localStorage - quota exceeded`);
        return false;
    }
};
// Helper function to compress image data
const compressImageData = async (imageData, maxWidth = 400)=>{
    // If it's not a base64 data URL, return as-is
    if (!imageData.startsWith("data:image")) {
        return imageData;
    }
    return new Promise((resolve)=>{
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = ()=>{
            const canvas = document.createElement("canvas");
            const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
            canvas.width = img.width * ratio;
            canvas.height = img.height * ratio;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // Compress to JPEG with 0.6 quality
                const compressed = canvas.toDataURL("image/jpeg", 0.6);
                resolve(compressed);
            } else {
                resolve(imageData);
            }
        };
        img.onerror = ()=>resolve(imageData);
        img.src = imageData;
    });
};
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
    // Load from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            const loadFromStorage = {
                "StoreProvider.useEffect.loadFromStorage": (key, setter, defaultVal)=>{
                    try {
                        const saved = localStorage.getItem(key);
                        if (saved) setter(JSON.parse(saved));
                    } catch  {
                        setter(defaultVal);
                    }
                }
            }["StoreProvider.useEffect.loadFromStorage"];
            loadFromStorage("contactMessages", setContactMessages, []);
            loadFromStorage("storeSettings", setStoreSettings, defaultStoreSettings);
            loadFromStorage("footerSettings", setFooterSettings, defaultFooterSettings);
            loadFromStorage("adminSettings", setAdminSettings, defaultAdminSettings);
            loadFromStorage("sectionNames", setSectionNames, defaultSectionNames);
            loadFromStorage("contentSettings", setContentSettings, defaultContentSettings);
            loadFromStorage("galleryImages", setGalleryImages, defaultGalleryImages);
            loadFromStorage("reviews", setReviews, defaultReviews);
            loadFromStorage("products", setProducts, defaultProducts);
            loadFromStorage("notifications", setNotifications, []);
            loadFromStorage("categories", setCategories, defaultCategories);
            loadFromStorage("adminTranslations", setAdminTranslations, defaultAdminTranslations);
        }
    }["StoreProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoreProvider.useEffect": ()=>{
            const newNotifications = contactMessages.filter({
                "StoreProvider.useEffect.newNotifications": (m)=>m.status === "new"
            }["StoreProvider.useEffect.newNotifications"]).filter({
                "StoreProvider.useEffect.newNotifications": (m)=>!notifications.some({
                        "StoreProvider.useEffect.newNotifications": (n)=>n.sourceId === m.id
                    }["StoreProvider.useEffect.newNotifications"])
            }["StoreProvider.useEffect.newNotifications"]).map({
                "StoreProvider.useEffect.newNotifications": (m)=>({
                        id: `notif-${m.id}`,
                        message: `New message from ${m.name}`,
                        time: new Date(m.date).toLocaleString(),
                        read: false,
                        sourceId: m.id
                    })
            }["StoreProvider.useEffect.newNotifications"]);
            if (newNotifications.length > 0) {
                setNotifications({
                    "StoreProvider.useEffect": (prev)=>{
                        const updated = [
                            ...newNotifications,
                            ...prev
                        ].slice(0, 20);
                        localStorage.setItem("notifications", JSON.stringify(updated));
                        return updated;
                    }
                }["StoreProvider.useEffect"]);
            }
        }
    }["StoreProvider.useEffect"], [
        contactMessages,
        notifications
    ]);
    // Save to localStorage helpers
    const saveToStorage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[saveToStorage]": (key, value)=>{
            const stringified = JSON.stringify(value);
            if (!safeSetItem(key, stringified)) {
                console.warn("Attempting to clear old storage data...");
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
                    saveToStorage("notifications", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[markNotificationAsRead]"]);
        }
    }["StoreProvider.useCallback[markNotificationAsRead]"], [
        saveToStorage
    ]);
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
                    saveToStorage("notifications", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[markAllNotificationsAsRead]"]);
        }
    }["StoreProvider.useCallback[markAllNotificationsAsRead]"], [
        saveToStorage
    ]);
    // Contact Messages
    const addContactMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addContactMessage]": (message)=>{
            const newMessage = {
                ...message,
                id: Date.now().toString(),
                date: new Date().toISOString(),
                status: "new"
            };
            setContactMessages({
                "StoreProvider.useCallback[addContactMessage]": (prev)=>{
                    const updated = [
                        newMessage,
                        ...prev
                    ];
                    saveToStorage("contactMessages", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[addContactMessage]"]);
        }
    }["StoreProvider.useCallback[addContactMessage]"], [
        saveToStorage
    ]);
    const updateMessageStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateMessageStatus]": (id, status)=>{
            setContactMessages({
                "StoreProvider.useCallback[updateMessageStatus]": (prev)=>{
                    const updated = prev.map({
                        "StoreProvider.useCallback[updateMessageStatus].updated": (m)=>m.id === id ? {
                                ...m,
                                status
                            } : m
                    }["StoreProvider.useCallback[updateMessageStatus].updated"]);
                    saveToStorage("contactMessages", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateMessageStatus]"]);
        }
    }["StoreProvider.useCallback[updateMessageStatus]"], [
        saveToStorage
    ]);
    const deleteMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[deleteMessage]": (id)=>{
            setContactMessages({
                "StoreProvider.useCallback[deleteMessage]": (prev)=>{
                    const updated = prev.filter({
                        "StoreProvider.useCallback[deleteMessage].updated": (m)=>m.id !== id
                    }["StoreProvider.useCallback[deleteMessage].updated"]);
                    saveToStorage("contactMessages", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[deleteMessage]"]);
        }
    }["StoreProvider.useCallback[deleteMessage]"], [
        saveToStorage
    ]);
    // Store Settings
    const updateStoreSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateStoreSettings]": (settings)=>{
            setStoreSettings({
                "StoreProvider.useCallback[updateStoreSettings]": (prev)=>{
                    const updated = {
                        ...prev,
                        ...settings
                    };
                    saveToStorage("storeSettings", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateStoreSettings]"]);
        }
    }["StoreProvider.useCallback[updateStoreSettings]"], [
        saveToStorage
    ]);
    // Footer Settings
    const updateFooterSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateFooterSettings]": (settings)=>{
            setFooterSettings({
                "StoreProvider.useCallback[updateFooterSettings]": (prev)=>{
                    const updated = {
                        ...prev,
                        ...settings
                    };
                    saveToStorage("footerSettings", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateFooterSettings]"]);
        }
    }["StoreProvider.useCallback[updateFooterSettings]"], [
        saveToStorage
    ]);
    // Admin Settings
    const updateAdminSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[updateAdminSettings]": (settings)=>{
            setAdminSettings({
                "StoreProvider.useCallback[updateAdminSettings]": (prev)=>{
                    const updated = {
                        ...prev,
                        ...settings
                    };
                    saveToStorage("adminSettings", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateAdminSettings]"]);
        }
    }["StoreProvider.useCallback[updateAdminSettings]"], [
        saveToStorage
    ]);
    // Section Names
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
    // Content Settings
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
    // Gallery
    const addGalleryImage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addGalleryImage]": (image)=>{
            setGalleryImages({
                "StoreProvider.useCallback[addGalleryImage]": (prev)=>{
                    const updated = [
                        ...prev,
                        {
                            ...image,
                            id: Date.now().toString()
                        }
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
                        "StoreProvider.useCallback[removeGalleryImage].updated": (i)=>i.id !== id
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
                        "StoreProvider.useCallback[updateGalleryImage].updated": (i)=>i.id === id ? {
                                ...i,
                                ...image
                            } : i
                    }["StoreProvider.useCallback[updateGalleryImage].updated"]);
                    saveToStorage("galleryImages", updated);
                    return updated;
                }
            }["StoreProvider.useCallback[updateGalleryImage]"]);
        }
    }["StoreProvider.useCallback[updateGalleryImage]"], [
        saveToStorage
    ]);
    // Reviews
    const addReview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addReview]": (review)=>{
            setReviews({
                "StoreProvider.useCallback[addReview]": (prev)=>{
                    const updated = [
                        ...prev,
                        {
                            ...review,
                            id: Date.now().toString()
                        }
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
    // Products
    const addProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addProduct]": async (product)=>{
            // Compress images before storing
            const compressedImages = await Promise.all(product.images.map({
                "StoreProvider.useCallback[addProduct]": (img)=>compressImageData(img, 400)
            }["StoreProvider.useCallback[addProduct]"]));
            setProducts({
                "StoreProvider.useCallback[addProduct]": (prev)=>{
                    const maxId = prev.reduce({
                        "StoreProvider.useCallback[addProduct].maxId": (max, p)=>Math.max(max, p.id)
                    }["StoreProvider.useCallback[addProduct].maxId"], 0);
                    const newProduct = {
                        ...product,
                        id: maxId + 1,
                        images: compressedImages
                    };
                    const updated = [
                        ...prev,
                        newProduct
                    ];
                    const stringified = JSON.stringify(updated);
                    if (!safeSetItem("products", stringified)) {
                        const fallbackProduct = {
                            ...product,
                            id: maxId + 1,
                            images: [
                                "/vibrant-flower-bouquet.png"
                            ]
                        };
                        const fallbackUpdated = [
                            ...prev,
                            fallbackProduct
                        ];
                        safeSetItem("products", JSON.stringify(fallbackUpdated));
                        return fallbackUpdated;
                    }
                    return updated;
                }
            }["StoreProvider.useCallback[addProduct]"]);
        }
    }["StoreProvider.useCallback[addProduct]"], []);
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
        "StoreProvider.useCallback[updateProduct]": async (id, product)=>{
            let processedProduct = product;
            if (product.images) {
                const compressedImages = await Promise.all(product.images.map({
                    "StoreProvider.useCallback[updateProduct]": (img)=>compressImageData(img, 400)
                }["StoreProvider.useCallback[updateProduct]"]));
                processedProduct = {
                    ...product,
                    images: compressedImages
                };
            }
            setProducts({
                "StoreProvider.useCallback[updateProduct]": (prev)=>{
                    const updated = prev.map({
                        "StoreProvider.useCallback[updateProduct].updated": (p)=>p.id === id ? {
                                ...p,
                                ...processedProduct
                            } : p
                    }["StoreProvider.useCallback[updateProduct].updated"]);
                    const stringified = JSON.stringify(updated);
                    if (!safeSetItem("products", stringified)) {
                        const noImageUpdate = prev.map({
                            "StoreProvider.useCallback[updateProduct].noImageUpdate": (p)=>p.id === id ? {
                                    ...p,
                                    ...product,
                                    images: p.images
                                } : p
                        }["StoreProvider.useCallback[updateProduct].noImageUpdate"]);
                        safeSetItem("products", JSON.stringify(noImageUpdate));
                        return noImageUpdate;
                    }
                    return updated;
                }
            }["StoreProvider.useCallback[updateProduct]"]);
        }
    }["StoreProvider.useCallback[updateProduct]"], []);
    const addCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoreProvider.useCallback[addCategory]": (category)=>{
            setCategories({
                "StoreProvider.useCallback[addCategory]": (prev)=>{
                    const updated = [
                        ...prev,
                        {
                            ...category,
                            id: Date.now().toString()
                        }
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoreContext.Provider, {
        value: {
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
            updateAdminTranslations
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/store-context.tsx",
        lineNumber: 935,
        columnNumber: 5
    }, this);
}
_s(StoreProvider, "xcc9bUGfX6MFrBpB6A3/7llkHlA=");
_c = StoreProvider;
function useStore() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StoreContext);
    if (!context) {
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
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/node_modules/@vercel/analytics/dist/next/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Analytics",
    ()=>Analytics2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/nextjs/index.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// src/nextjs/utils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
"use client";
;
;
// package.json
var name = "@vercel/analytics";
var version = "1.3.1";
// src/queue.ts
var initQueue = ()=>{
    if (window.va) return;
    window.va = function a(...params) {
        (window.vaq = window.vaq || []).push(params);
    };
};
// src/utils.ts
function isBrowser() {
    return typeof window !== "undefined";
}
function detectEnvironment() {
    try {
        const env = ("TURBOPACK compile-time value", "development");
        if ("TURBOPACK compile-time truthy", 1) {
            return "development";
        }
    } catch (e) {}
    return "production";
}
function setMode(mode = "auto") {
    if (mode === "auto") {
        window.vam = detectEnvironment();
        return;
    }
    window.vam = mode;
}
function getMode() {
    const mode = isBrowser() ? window.vam : detectEnvironment();
    return mode || "production";
}
function isDevelopment() {
    return getMode() === "development";
}
function computeRoute(pathname, pathParams) {
    if (!pathname || !pathParams) {
        return pathname;
    }
    let result = pathname;
    try {
        const entries = Object.entries(pathParams);
        for (const [key, value] of entries){
            if (!Array.isArray(value)) {
                const matcher = turnValueToRegExp(value);
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[${key}]`);
                }
            }
        }
        for (const [key, value] of entries){
            if (Array.isArray(value)) {
                const matcher = turnValueToRegExp(value.join("/"));
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[...${key}]`);
                }
            }
        }
        return result;
    } catch (e) {
        return pathname;
    }
}
function turnValueToRegExp(value) {
    return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// src/generic.ts
var DEV_SCRIPT_URL = "https://va.vercel-scripts.com/v1/script.debug.js";
var PROD_SCRIPT_URL = "/_vercel/insights/script.js";
function inject(props = {
    debug: true
}) {
    var _a;
    if (!isBrowser()) return;
    setMode(props.mode);
    initQueue();
    if (props.beforeSend) {
        (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
    }
    const src = props.scriptSrc || (isDevelopment() ? DEV_SCRIPT_URL : PROD_SCRIPT_URL);
    if (document.head.querySelector(`script[src*="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
    script.dataset.sdkv = version;
    if (props.disableAutoTrack) {
        script.dataset.disableAutoTrack = "1";
    }
    if (props.endpoint) {
        script.dataset.endpoint = props.endpoint;
    }
    if (props.dsn) {
        script.dataset.dsn = props.dsn;
    }
    script.onerror = ()=>{
        const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
        console.log(`[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`);
    };
    if (isDevelopment() && props.debug === false) {
        script.dataset.debug = "false";
    }
    document.head.appendChild(script);
}
function pageview({ route, path }) {
    var _a;
    (_a = window.va) == null ? void 0 : _a.call(window, "pageview", {
        route,
        path
    });
}
// src/react.tsx
function Analytics(props) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            inject({
                framework: props.framework || "react",
                ...props.route !== void 0 && {
                    disableAutoTrack: true
                },
                ...props
            });
        }
    }["Analytics.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            if (props.route && props.path) {
                pageview({
                    route: props.route,
                    path: props.path
                });
            }
        }
    }["Analytics.useEffect"], [
        props.route,
        props.path
    ]);
    return null;
}
;
var useRoute = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const finalParams = {
        ...Object.fromEntries(searchParams.entries()),
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be empty in pages router
        ...params || {}
    };
    return {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be empty in pages router
        route: params ? computeRoute(path, finalParams) : null,
        path
    };
};
// src/nextjs/index.tsx
function AnalyticsComponent(props) {
    const { route, path } = useRoute();
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(Analytics, {
        path,
        route,
        ...props,
        framework: "next"
    });
}
function Analytics2(props) {
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: null
    }, /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(AnalyticsComponent, {
        ...props
    }));
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_d25be1c3._.js.map