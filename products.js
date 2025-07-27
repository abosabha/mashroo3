// متغيرات التصفية والترتيب
let currentCategory = "all";
let currentFilters = {
    discount: false,
    used: false,
    priceRange: 10000
};
let currentSort = "default";
let displayedProducts = 6; // عدد المنتجات المعروضة حالياً

// متغيرات سلة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    renderCategories();
    renderProducts();
    setupEventListeners();
    setupCartToggle();
    updateCartUI();
});

// عرض التصنيفات
function renderCategories() {
    const categoriesList = document.getElementById('categories-list');
    
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
            <button class="category-btn w-full text-right py-2 px-3 rounded hover:bg-gray-200 transition" data-category="${category.id}">
                ${category.name}
            </button>
        `;
        categoriesList.appendChild(li);
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

// تحديث واجهة سلة التسوق
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // تحديث عدد العناصر في السلة
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    // عرض العناصر في السلة
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">السلة فارغة</p>';
        cartTotalElement.textContent = '0.00 ر.س';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;
        
        total += product.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'flex items-center justify-between p-2 border-b border-gray-100';
        cartItem.innerHTML = `
            <div class="flex items-center">
                <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded">
                <div class="mr-3">
                    <h4 class="text-sm font-medium">${product.name}</h4>
                    <p class="text-gray-600 text-xs">${product.price.toLocaleString()} ر.س × ${item.quantity}</p>
                </div>
            </div>
            <div class="flex items-center">
                <span class="text-sm font-medium">${(product.price * item.quantity).toLocaleString()} ر.س</span>
                <button class="remove-from-cart ml-2 text-red-500" data-id="${product.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // عرض المجموع الكلي
    cartTotalElement.textContent = total.toLocaleString() + ' ر.س';
    
    // إضافة مستمعي الأحداث لأزرار الحذف
    document.querySelectorAll('.remove-from-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeFromCart(parseInt(this.dataset.id));
        });
    });
}

// إضافة منتج إلى السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // التحقق مما إذا كان المنتج موجوداً بالفعل في السلة
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }
    
    // حفظ السلة في localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // تحديث واجهة المستخدم
    updateCartUI();
    
    // عرض تنبيه مؤقت
    showCartAlert(`${product.name} تمت إضافته إلى السلة`);
}

// إزالة منتج من السلة
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showCartAlert('تمت إزالة المنتج من السلة');
}

// عرض تنبيه للسلة
function showCartAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center';
    alert.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => alert.remove(), 300);
    }, 2000);
}

// فتح/إغلاق سلة التسوق
function setupCartToggle() {
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.getElementById('cart-dropdown');
    
    cartButton.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.classList.toggle('hidden');
    });
    
    // إغلاق السلة عند النقر خارجها
    document.addEventListener('click', function() {
        cartDropdown.classList.add('hidden');
    });
    
    // منع إغلاق السلة عند النقر عليها
    cartDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}