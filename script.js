
     // Mobile Menu Toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Cart Toggle
        const cartButton = document.getElementById('cart-button');
        const cartDropdown = document.getElementById('cart-dropdown');
        
        cartButton.addEventListener('click', (e) => {
            e.stopPropagation();
            cartDropdown.classList.toggle('hidden');
        });
        
        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartDropdown.contains(e.target) && e.target !== cartButton) {
                cartDropdown.classList.add('hidden');
            }
        });
        
        // Shopping Cart Functionality
        let cart = [];
        
        // Load cart from localStorage if available
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            updateCart();
        }
        
        // Add to cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const name = button.getAttribute('data-name');
                const price = parseFloat(button.getAttribute('data-price'));
                const image = button.getAttribute('data-image');
                
                // Check if item already in cart
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
                
                // Save to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Update cart UI
                updateCart();
                
                // Show notification
                showNotification(`تمت إضافة ${name} إلى السلة`);
            });
        });
        
        // Update cart UI
        function updateCart() {
            const cartCount = document.getElementById('cart-count');
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            
            // Update count
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update items list
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="text-gray-500 text-center py-4">السلة فارغة</p>';
            } else {
                cartItems.innerHTML = '';
                
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'flex items-center py-3 border-b border-gray-200';
                    cartItem.innerHTML = `
                        <div class="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                        </div>
                        <div class="mr-3 flex-grow">
                            <h4 class="font-medium text-gray-800 text-sm">${item.name}</h4>
                            <div class="flex justify-between items-center mt-1">
                                <span class="text-gray-600 text-sm">${item.price.toFixed(2)} ر.س × ${item.quantity}</span>
                                <span class="font-medium">${(item.price * item.quantity).toFixed(2)} ر.س</span>
                            </div>
                        </div>
                        <button class="remove-from-cart text-red-500 hover:text-red-700" data-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    
                    cartItems.appendChild(cartItem);
                });
                
                // Add event listeners to remove buttons
                const removeButtons = document.querySelectorAll('.remove-from-cart');
                removeButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const id = button.getAttribute('data-id');
                        removeFromCart(id);
                    });
                });
            }
            
            // Update total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = total.toFixed(2) + ' ر.س';
        }
        
        // Remove from cart
        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
            showNotification('تمت إزالة المنتج من السلة');
        }
        
        // Show notification
        function showNotification(message) {
            const notification = document.getElementById('notification');
            const notificationMessage = document.getElementById('notification-message');
            
            notificationMessage.textContent = message;
            notification.classList.remove('hidden');
            notification.classList.add('notification');
            
            setTimeout(() => {
                notification.classList.remove('notification');
                notification.classList.add('hide');
                
                setTimeout(() => {
                    notification.classList.add('hidden');
                    notification.classList.remove('hide');
                }, 300);  
            }, 3000);
        }

          // تصفية المنتجات حسب الفئة
        const categoryButtons = document.querySelectorAll('.category-card');
        const allProducts = document.querySelectorAll('.product-card');
        const categoriesContainer = document.getElementById('categories-container');

        // إنشاء زر "الكل" وإضافته إلى قائمة الفئات
        const showAllButton = document.createElement('a');
        showAllButton.href = '#';
        showAllButton.className = 'category-card bg-white p-4 rounded-lg shadow-md text-center transition duration-300 active';
        showAllButton.setAttribute('data-category', 'all');
        showAllButton.innerHTML = `
            <div class="bg-gray-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <i class="fas fa-th-large text-gray-600 text-2xl"></i>
            </div>
            <h3 class="font-medium text-gray-800">الكل</h3>
        `;

        categoriesContainer.prepend(showAllButton);

        // تصفية المنتجات
        function filterProducts(category) {
            allProducts.forEach(product => {
                product.style.opacity = '0';
                product.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    const productCategory = product.getAttribute('data-category');
                    
                    if (category === 'all' || productCategory === category) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                    
                    setTimeout(() => {
                        product.style.opacity = '1';
                    }, 50);
                }, 300);
            });
        }

        // إضافة event listeners لأزرار الفئات
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // إزالة التنشيط من جميع الأزرار
                document.querySelectorAll('.category-card').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // تنشيط الزر المحدد
                button.classList.add('active');
                
                const selectedCategory = button.getAttribute('data-category');
                filterProducts(selectedCategory);
            });
        });

        // إضافة event listener لزر "الكل"
        showAllButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // إزالة التنشيط من جميع الأزرار
            document.querySelectorAll('.category-card').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // تنشيط زر "الكل"
            showAllButton.classList.add('active');
            
            filterProducts('all');
        });

        // عند تحميل الصفحة، عرض جميع المنتجات
        window.addEventListener('load', () => {
            filterProducts('all');
        });