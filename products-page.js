// products-page.js
let currentPage = 1;
const productsPerPage = 6;
let filteredProducts = [];

document.addEventListener('DOMContentLoaded', function() {
    // عرض التصنيفات
    const categories = [...new Set(allProducts.map(product => product.category))];
    const categoriesList = document.getElementById('categories-list');
    
    categories.forEach(category => {
        categoriesList.innerHTML += `
            <li>
                <a href="#" class="category-link text-gray-600 hover:text-blue-600" data-category="${category}">
                    ${getCategoryName(category)}
                </a>
            </li>
        `;
    });

    // عرض جميع المنتجات في البداية
    filteredProducts = [...allProducts];
    renderProducts();
    
    // إضافة event listeners للفلاتر
    document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    document.getElementById('sort-by').addEventListener('change', applyFilters);
    
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            filteredProducts = allProducts.filter(p => p.category === category);
            renderProducts();
        });
    });
    
    document.getElementById('load-more').addEventListener('click', function() {
        currentPage++;
        renderProducts();
    });
});

function applyFilters() {
    const showDiscounted = document.querySelector('[data-filter="discount"]').checked;
    const showUsed = document.querySelector('[data-filter="used"]').checked;
    const sortBy = document.getElementById('sort-by').value;
    
    filteredProducts = [...allProducts];
    
    // تطبيق الفلاتر
    if (showDiscounted) {
        filteredProducts = filteredProducts.filter(p => p.discount || p.isOnSale);
    }
    
    if (showUsed) {
        filteredProducts = filteredProducts.filter(p => p.isUsed);
    }
    
    // تطبيق الترتيب
    switch(sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            // يمكن إضافة تاريخ للمنتجات للترتيب حسب الأحدث
            break;
    }
    
    currentPage = 1;
    renderProducts();
}

function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(0, endIndex);
    
    const container = document.getElementById('all-products-container');
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
        container.innerHTML += createProductCard(product);
    });
    
    document.getElementById('products-count').textContent = filteredProducts.length;
    
    // إخفاء زر "عرض المزيد" إذا تم عرض جميع المنتجات
    if (endIndex >= filteredProducts.length) {
        document.getElementById('load-more').style.display = 'none';
    } else {
        document.getElementById('load-more').style.display = 'block';
    }
}

function getCategoryName(category) {
    const names = {
        'laptops': 'لابتوبات',
        'phones': 'هواتف',
        'headphones': 'سماعات',
        'processors': 'معالجات',
        'gpus': 'كروت شاشة',
        'ram': 'ذاكرة RAM'
    };
    
    return names[category] || category;
}