const homeProducts = [
    // لابتوبات
    {
        id: 1,
        name: "لابتوب ديل XPS 15",
        category: "laptops",
        price: 4299,
        oldPrice: 5099,
        discount: true,
        used: false,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "لابتوب قوي بشاشة 4K ومعالج Core i9"
    },
    {
        id: 2,
        name: "لابتوب ماك بوك برو M2",
        category: "laptops",
        price: 5999,
        oldPrice: 0,
        discount: false,
        used: false,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "أداء مذهل مع شريحة M2 وبطارية تدوم طويلاً"
    },
    {
        id: 3,
        name: "لابتوب لينوفو Legion 5",
        category: "laptops",
        price: 3799,
        oldPrice: 4299,
        discount: true,
        used: true,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1593640408182-31c228ca3563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "لابتوب ألعاب بمواصفات عالية بحالة ممتازة"
    },

    // هواتف
    {
        id: 4,
        name: "هاتف سامسونج S23 Ultra",
        category: "phones",
        price: 4899,
        oldPrice: 0,
        discount: false,
        used: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "كاميرا 200 ميجابكسل وشاشة Dynamic AMOLED 2X"
    },
    {
        id: 5,
        name: "هاتف آيفون 14 Pro Max",
        category: "phones",
        price: 5299,
        oldPrice: 5799,
        discount: true,
        used: false,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1587202372775-e229f1727040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "شريحة A16 بايونيك ودييناميك آيلاند"
    },
    {
        id: 6,
        name: "هاتف شاومي Redmi Note 12",
        category: "phones",
        price: 1299,
        oldPrice: 0,
        discount: false,
        used: true,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "أفضل هاتف بفئة السعر بحالة جيدة جداً"
    },

    // سماعات
    {
        id: 7,
        name: "سماعات Sony WH-1000XM5",
        category: "headphones",
        price: 1299,
        oldPrice: 1499,
        discount: true,
        used: false,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "الأفضل في إلغاء الضوضاء وجودة الصوت"
    },
    {
        id: 8,
        name: "سماعات AirPods Pro 2",
        category: "headphones",
        price: 999,
        oldPrice: 0,
        discount: false,
        used: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "إلغاء ضوضاء فعال وتصميم مدمج"
    },
    {
        id: 9,
        name: "سماعات JBL Tune 510BT",
        category: "headphones",
        price: 299,
        oldPrice: 399,
        discount: true,
        used: true,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "بسعر مميز وجودة صوت عالية بحالة ممتازة"
    },

    // معالجات
    {
        id: 10,
        name: "معالج Intel Core i9-13900K",
        category: "processors",
        price: 2499,
        oldPrice: 2799,
        discount: true,
        used: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "أقوى معالج من إنتل للألعاب والمهام الثقيلة"
    },
    {
        id: 11,
        name: "معالج AMD Ryzen 9 7950X",
        category: "processors",
        price: 2699,
        oldPrice: 0,
        discount: false,
        used: false,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1587202372775-e229f1727040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "16 نواة و32 مسار مع أداء مذهل في التطبيقات المتعددة"
    },
    {
        id: 12,
        name: "معالج Intel Core i7-12700K",
        category: "processors",
        price: 1799,
        oldPrice: 2199,
        discount: true,
        used: true,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1593640408182-31c228ca3563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "معالج قوي بحالة ممتازة مع ضمان 6 أشهر"
    },

    // كروت شاشة
    {
        id: 13,
        name: "كرت شاشة NVIDIA RTX 4090",
        category: "gpus",
        price: 7999,
        oldPrice: 0,
        discount: false,
        used: false,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1592155931584-901ac15763e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "أقوى كرت شاشة من NVIDIA للألعاب والمحترفين"
    },
    {
        id: 14,
        name: "كرت شاشة AMD RX 7900 XTX",
        category: "gpus",
        price: 4999,
        oldPrice: 5499,
        discount: true,
        used: false,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1587202372775-e229f1727040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "أداء مذهل في الألعاب بدقة 4K"
    },
    {
        id: 15,
        name: "كرت شاشة NVIDIA RTX 3080 Ti",
        category: "gpus",
        price: 3999,
        oldPrice: 4999,
        discount: true,
        used: true,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1593640408182-31c228ca3563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "كرت شاشة قوي بحالة ممتازة مع ضمان سنة"
    },

    // ذاكرة RAM
    {
        id: 16,
        name: "ذاكرة Corsair 32GB DDR5",
        category: "ram",
        price: 899,
        oldPrice: 999,
        discount: true,
        used: false,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1581093450021-5cd168dfd8f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "ذاكرة عالية الأداء بسرعة 5600MHz"
    },
    {
        id: 17,
        name: "ذاكرة G.Skill 64GB DDR4",
        category: "ram",
        price: 1299,
        oldPrice: 0,
        discount: false,
        used: true,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1593640408182-31c228ca3563?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "سعة كبيرة لمحترفي التصميم والمونتاج"
    },
    {
        id: 18,
        name: "ذاكرة Kingston 16GB DDR4",
        category: "ram",
        price: 499,
        oldPrice: 599,
        discount: true,
        used: false,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1581093450021-5cd168dfd8f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        description: "حل ممتاز للترقية بسرعة 3200MHz"
    }
];

// سلة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(homeProducts);
    setupEventListeners();
    updateCartUI();
});

// عرض المنتجات
function renderProducts(productsToShow) {
    const productsContainer = document.getElementById('products-container');
    const offersContainer = document.getElementById('offers-container');
    
    productsContainer.innerHTML = '';
    offersContainer.innerHTML = '';

    // عرض المنتجات المميزة
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });

    // عرض العروض الخاصة (المنتجات التي لديها خصم)
    const offers = productsToShow.filter(p => p.discount);
    offers.forEach(product => {
        const offerCard = createProductCard(product);
        offersContainer.appendChild(offerCard);
    });
}

// إنشاء بطاقة منتج
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 relative';
    card.dataset.category = product.category;

    card.innerHTML = `
        ${product.discount ? '<div class="discount-badge">15% خصم</div>' : ''}
        ${product.used ? '<div class="used-badge">مستعمل</div>' : ''}
        <div class="p-4">
            <div class="h-40 flex items-center justify-center mb-4">
                <img src="${product.image}" alt="${product.name}" class="max-h-full max-w-full">
            </div>
            <h3 class="font-bold text-gray-800 mb-1">${product.name}</h3>
            <div class="flex items-center mb-2">
                ${generateRatingStars(product.rating)}
                <span class="text-gray-500 text-sm mr-2">(${Math.floor(Math.random() * 100)})</span>
            </div>
            <div class="flex items-center">
                <span class="text-lg font-bold text-gray-800">${product.price.toLocaleString()} ر.س</span>
                ${product.oldPrice ? `<span class="text-sm text-gray-500 line-through mr-2">${product.oldPrice.toLocaleString()} ر.س</span>` : ''}
            </div>
        </div>
        <div class="p-4 border-t border-gray-100">
            <button class="add-to-cart w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">
                أضف إلى السلة
            </button>
        </div>
    `;
    
    return card;
}

// توليد نجوم التقييم
function generateRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star text-yellow-400"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
        } else {
            stars += '<i class="far fa-star text-yellow-400"></i>';
        }
    }
    return stars;
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تصفية حسب الفئة
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            filterProductsByCategory(category);
        });
    });

    // إضافة إلى السلة
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
            const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
            addToCart(
                parseInt(button.dataset.id),
                button.dataset.name,
                parseFloat(button.dataset.price),
                button.dataset.image
            );
        }
    });

    // فتح/إغلاق سلة التسوق
    document.getElementById('cart-button').addEventListener('click', toggleCartDropdown);
}

// تصفية المنتجات حسب الفئة
function filterProductsByCategory(category) {
    if (category === 'all') {
        renderProducts(homeProducts);
        return;
    }
    
    const filteredProducts = homeProducts.filter(product => product.category === category);
    renderProducts(filteredProducts);
}

// إضافة إلى السلة
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification(`تمت إضافة ${name} إلى السلة`);
}

// تحديث واجهة سلة التسوق
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartItemsContainer.innerHTML = cart.length === 0 ? 
        '<p class="text-gray-500 text-center py-4">السلة فارغة</p>' : 
        cart.map(item => `
            <div class="flex items-center justify-between p-2 border-b border-gray-100">
                <div class="flex items-center">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                    <div class="mr-3">
                        <h4 class="text-sm font-medium">${item.name}</h4>
                        <p class="text-gray-600 text-xs">${item.price.toLocaleString()} ر.س × ${item.quantity}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <span class="text-sm font-medium">${(item.price * item.quantity).toLocaleString()} ر.س</span>
                    <button class="remove-from-cart ml-2 text-red-500" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = total.toLocaleString() + ' ر.س';
    
    // إضافة مستمعي الأحداث لأزرار الحذف
    document.querySelectorAll('.remove-from-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(parseInt(this.dataset.id));
        });
    });
}

// إزالة من السلة
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification('تمت إزالة المنتج من السلة');
}

// تبديل عرض سلة التسوق
function toggleCartDropdown(e) {
    e.stopPropagation();
    document.getElementById('cart-dropdown').classList.toggle('hidden');
}

// إغلاق السلة عند النقر خارجها
document.addEventListener('click', () => {
    document.getElementById('cart-dropdown').classList.add('hidden');
});

// منع إغلاق السلة عند النقر عليها
document.getElementById('cart-dropdown').addEventListener('click', e => {
    e.stopPropagation();
});

// عرض الإشعارات
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.querySelector('#notification-message').textContent = message;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}