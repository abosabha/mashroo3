// بيانات المنتجات
const products = [
    {
        id: 1,
        name: "معالج Intel Core i9-13900K",
        category: "processors",
        price: 2499,
        oldPrice: 2799,
        discount: true,
        used: false,
        rating: 4.8,
        image: "https://via.placeholder.com/300x200?text=Intel+i9",
        description: "معالج قوي للألعاب والمهام الثقيلة بسرعة تصل إلى 5.8 جيجاهرتز",
        stock: 15,
        date: "2023-10-15"
    },
    {
        id: 2,
        name: "كرت شاشة NVIDIA RTX 4090",
        category: "gpus",
        price: 6999,
        oldPrice: 0,
        discount: false,
        used: false,
        rating: 4.9,
        image: "https://via.placeholder.com/300x200?text=RTX+4090",
        description: "أقوى كرت شاشة للألعاب والتصميم ثلاثي الأبعاد",
        stock: 8,
        date: "2023-09-20"
    },
    {
        id: 3,
        name: "لوحة أم ASUS ROG Maximus Z790",
        category: "motherboards",
        price: 1899,
        oldPrice: 1999,
        discount: true,
        used: false,
        rating: 4.7,
        image: "https://via.placeholder.com/300x200?text=ASUS+Z790",
        description: "لوحة أم مميزة لدعم أحدث معالجات إنتل",
        stock: 12,
        date: "2023-08-05"
    },
    {
        id: 4,
        name: "ذاكرة RAM Corsair 32GB DDR5",
        category: "ram",
        price: 899,
        oldPrice: 0,
        discount: false,
        used: true,
        rating: 4.5,
        image: "https://via.placeholder.com/300x200?text=Corsair+RAM",
        description: "ذاكرة عالية الأداء بسرعة 5600MHz",
        stock: 20,
        date: "2023-07-12"
    },
    {
        id: 5,
        name: "SSD Samsung 980 Pro 1TB",
        category: "storage",
        price: 599,
        oldPrice: 699,
        discount: true,
        used: false,
        rating: 4.8,
        image: "https://via.placeholder.com/300x200?text=Samsung+SSD",
        description: "وحدة تخزين سريعة بسرعة قراءة تصل إلى 7000MB/s",
        stock: 25,
        date: "2023-06-18"
    },
    {
        id: 6,
        name: "شاشة LG UltraGear 27 بوصة",
        category: "monitors",
        price: 2199,
        oldPrice: 0,
        discount: false,
        used: false,
        rating: 4.6,
        image: "https://via.placeholder.com/300x200?text=LG+Monitor",
        description: "شاشة ألعاب بدقة QHD ومعدل تحديث 144Hz",
        stock: 10,
        date: "2023-05-22"
    },
    {
        id: 7,
        name: "لوحة مفاتيح ميكانيكية Razer BlackWidow",
        category: "accessories",
        price: 499,
        oldPrice: 599,
        discount: true,
        used: true,
        rating: 4.4,
        image: "https://via.placeholder.com/300x200?text=Razer+Keyboard",
        description: "لوحة مفاتيح ميكانيكية بمفاتيح خضراء",
        stock: 18,
        date: "2023-04-30"
    },
    {
        id: 8,
        name: "ماوس لاسلكي Logitech MX Master 3",
        category: "accessories",
        price: 399,
        oldPrice: 0,
        discount: false,
        used: false,
        rating: 4.7,
        image: "https://via.placeholder.com/300x200?text=Logitech+Mouse",
        description: "ماوس لاسلكي متقدم للمحترفين",
        stock: 14,
        date: "2023-03-15"
    },
    {
        id: 9,
        name: "سماعات رأس SteelSeries Arctis Pro",
        category: "accessories",
        price: 899,
        oldPrice: 999,
        discount: true,
        used: false,
        rating: 4.6,
        image: "https://via.placeholder.com/300x200?text=SteelSeries+Headset",
        description: "سماعات ألعاب عالية الجودة مع صوت Hi-Res",
        stock: 7,
        date: "2023-02-10"
    },
    {
        id: 10,
        name: "كرت شاشة مستعمل AMD RX 6800 XT",
        category: "gpus",
        price: 2499,
        oldPrice: 3499,
        discount: true,
        used: true,
        rating: 4.3,
        image: "https://via.placeholder.com/300x200?text=AMD+GPU",
        description: "كرت شاشة قوي للألعاب بحالة جيدة",
        stock: 3,
        date: "2023-01-05"
    }
];

// التصنيفات
const categories = [
    { id: "all", name: "الكل" },
    { id: "processors", name: "المعالجات" },
    { id: "gpus", name: "كروت الشاشة" },
    { id: "motherboards", name: "لوحات الأم" },
    { id: "ram", name: "الذاكرة العشوائية" },
    { id: "storage", name: "وحدات التخزين" },
    { id: "monitors", name: "الشاشات" },
    { id: "accessories", name: "ملحقات" }
];

// متغيرات التصفية والترتيب
let currentCategory = "all";
let currentFilters = {
    discount: false,
    used: false,
    priceRange: 5000
};
let currentSort = "default";
let displayedProducts = 6; // عدد المنتجات المعروضة حالياً

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    renderCategories();
    renderProducts();
    setupEventListeners();
});

// عرض التصنيفات
function renderCategories() {
    const categoriesList = document.getElementById('categories-list');
    
    categories.forEach(category => {
        if (category.id !== "all") {
            const li = document.createElement('li');
            li.innerHTML = `
                <button class="category-btn w-full text-right py-2 px-3 rounded hover:bg-gray-200 transition" data-category="${category.id}">
                    ${category.name}
                </button>
            `;
            categoriesList.appendChild(li);
        }
    });
}

// عرض المنتجات
function renderProducts() {
    const productsContainer = document.getElementById('all-products-container');
    productsContainer.innerHTML = '';
    
    // تصفية المنتجات
    let filteredProducts = filterProducts();
    
    // ترتيب المنتجات
    filteredProducts = sortProducts(filteredProducts);
    
    // تحديث عدد المنتجات
    document.getElementById('products-count').textContent = filteredProducts.length;
    
    // عرض المنتجات (حسب عدد المنتجات المعروضة حالياً)
    const productsToShow = filteredProducts.slice(0, displayedProducts);
    
    if (productsToShow.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-span-3 py-8 text-center">
                <i class="fas fa-box-open text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">لا توجد منتجات متطابقة مع بحثك</p>
            </div>
        `;
        document.getElementById('load-more').style.display = 'none';
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
    
    // إخفاء زر "عرض المزيد" إذا تم عرض كل المنتجات
    document.getElementById('load-more').style.display = 
        displayedProducts >= filteredProducts.length ? 'none' : 'block';
}

// إنشاء بطاقة منتج
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition';
    
    // صورة المنتج
    const imageSection = `
        <div class="relative h-48 overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
            ${product.discount ? '<span class="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">خصم</span>' : ''}
            ${product.used ? '<span class="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded">مستعمل</span>' : ''}
        </div>
    `;
    
    // معلومات المنتج
    const infoSection = `
        <div class="p-4">
            <h3 class="font-bold text-lg mb-2">${product.name}</h3>
            <p class="text-gray-600 text-sm mb-3">${product.description}</p>
            
            <div class="flex items-center mb-3">
                ${generateRatingStars(product.rating)}
                <span class="text-gray-500 text-sm mr-1">(${product.rating})</span>
            </div>
            
            <div class="flex items-center justify-between">
                <div>
                    <span class="font-bold text-lg">${product.price.toLocaleString()} ر.س</span>
                    ${product.oldPrice > 0 ? `<span class="text-gray-500 text-sm line-through mr-2">${product.oldPrice.toLocaleString()} ر.س</span>` : ''}
                </div>
                <button class="add-to-cart-btn bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `;
    
    card.innerHTML = imageSection + infoSection;
    return card;
}

// توليد نجوم التقييم
function generateRatingStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-yellow-400"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
    }
    
    for (let i = 0; i < 5 - Math.ceil(rating); i++) {
        stars += '<i class="far fa-star text-yellow-400"></i>';
    }
    
    return stars;
}

// تصفية المنتجات
function filterProducts() {
    return products.filter(product => {
        // تصفية حسب التصنيف
        if (currentCategory !== 'all' && product.category !== currentCategory) {
            return false;
        }
        
        // تصفية حسب العروض
        if (currentFilters.discount && !product.discount) {
            return false;
        }
        
        // تصفية حسب المستعمل
        if (currentFilters.used && !product.used) {
            return false;
        }
        
        // تصفية حسب نطاق السعر
        if (product.price > currentFilters.priceRange) {
            return false;
        }
        
        return true;
    });
}

// ترتيب المنتجات
function sortProducts(products) {
    switch (currentSort) {
        case 'price-asc':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price-desc':
            return [...products].sort((a, b) => b.price - a.price);
        case 'rating':
            return [...products].sort((a, b) => b.rating - a.rating);
        case 'newest':
            return [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
        default:
            return products;
    }
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تصنيفات المنتجات
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentCategory = this.dataset.category;
            displayedProducts = 6;
            
            // تحديث التصنيف النشط
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('bg-blue-100', 'text-blue-600');
            });
            this.classList.add('bg-blue-100', 'text-blue-600');
            
            renderProducts();
        });
    });
    
    // فلترة المنتجات
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            currentFilters[this.dataset.filter] = this.checked;
            displayedProducts = 6;
            renderProducts();
        });
    });
    
    // نطاق السعر
    const priceRange = document.getElementById('price-range');
    const priceRangeValue = document.getElementById('price-range-value');
    
    priceRange.addEventListener('input', function() {
        currentFilters.priceRange = parseInt(this.value);
        priceRangeValue.textContent = `${this.value} ر.س`;
        displayedProducts = 6;
        renderProducts();
    });
    
    // ترتيب المنتجات
    document.getElementById('sort-by').addEventListener('change', function() {
        currentSort = this.value;
        renderProducts();
    });
    
    // زر عرض المزيد
    document.getElementById('load-more').addEventListener('click', function() {
        displayedProducts += 6;
        renderProducts();
    });
    
    // إضافة إلى السلة
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
            const button = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
            const productId = parseInt(button.dataset.id);
            addToCart(productId);
        }
    });
}

// إضافة منتج إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // هنا يمكنك إضافة المنتج إلى سلة التسوق
    // هذه مجرد رسالة مؤقتة للإشارة إلى أن المنتج تمت إضافته
    alert(`تمت إضافة ${product.name} إلى سلة التسوق`);
    
    // في التطبيق الحقيقي، ستقوم بتحديث سلة التسوق وعنصر واجهة المستخدم
    // updateCartUI();
}

