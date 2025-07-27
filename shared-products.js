class ProductRenderer {
    static getAllProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    static getFeaturedProducts() {
        const products = this.getAllProducts();
        return products.slice(0, 8); // عرض أول 8 منتجات في الصفحة الرئيسية
    }

    static getDiscountedProducts() {
        const products = this.getAllProducts();
        return products.filter(product => product.discount);
    }

    static getProductsByCategory(category) {
        const products = this.getAllProducts();
        return products.filter(product => product.category === category);
    }

    static createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 relative';
        card.dataset.category = product.category;

        card.innerHTML = `
            ${product.discount ? `<div class="discount-badge">${product.discountPercentage}% خصم</div>` : ''}
            ${product.used ? '<div class="used-badge">مستعمل</div>' : ''}
            <div class="p-4">
                <div class="h-40 flex items-center justify-center mb-4">
                    <img src="${product.image}" alt="${product.name}" class="max-h-full max-w-full">
                </div>
                <h3 class="font-bold text-gray-800 mb-1">${product.name}</h3>
                <div class="flex items-center mb-2">
                    ${this.generateRatingStars(product.rating)}
                    <span class="text-gray-500 text-sm mr-2">(${Math.floor(Math.random() * 50 + 20)})</span>
                </div>
                <div class="flex items-center">
                    <span class="text-lg font-bold text-gray-800">${product.price.toLocaleString()} ر.س</span>
                    ${product.oldPrice > 0 ? `<span class="text-sm text-gray-500 line-through mr-2">${product.oldPrice.toLocaleString()} ر.س</span>` : ''}
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

    static generateRatingStars(rating) {
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
}