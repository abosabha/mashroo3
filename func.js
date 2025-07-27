function getProductsByCategory(categoryName) {
    if (categoryName === 'laptops') return laptops;
    if (categoryName === 'phones') return phones;
    if (categoryName === 'headphones') return headphones;
    if (categoryName === 'processors') return processors;
    if (categoryName === 'gpus') return gpus;
    if (categoryName === 'ram') return ram;
    return []; // إذا لم يتم العثور على الفئة
}
//عرض المنتج
function displayProducts(category) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // مسح المحتوى القديم
    
    const products = getProductsByCategory(category); // الحصول على المنتجات
    
    products.forEach(product => {
        container.innerHTML += createProductCard(product);
    });
}
// إنشاء بطاقة المنتج
function createProductCard(product) {
    return `
        <div class="product-card">
            ${product.discount ? `<div class="discount-badge">${product.discount}</div>` : ''}
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">
                <span>${product.price} ر.س</span>
                ${product.originalPrice ? `<del>${product.originalPrice} ر.س</del>` : ''}
            </div>
            <button onclick="addToCart('${product.id}')">أضف إلى السلة</button>
        </div> `;
}
//بحث 
function searchProducts(query) {
    const allProducts = [...laptops, ...phones, ...headphones, ...processors, ...gpus, ...ram];
    return allProducts.filter(product => 
        product.name.includes(query) || 
        product.specs.some(spec => spec.includes(query))
    );
}
//اضافة للسلة
function addToCart(productId) {
    const allProducts = [...laptops, ...phones, /*...*/];
    const product = allProducts.find(p => p.id === productId);
    
    // إضافة المنتج للسلة (يمكن استخدام localStorage)
    cart.push(product);
    updateCartUI();
}