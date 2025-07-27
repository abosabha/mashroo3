class ProductManager {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('products')) || [];
        this.currentProductId = null;
        this.initElements();
        this.initEvents();
        this.renderProductsTable();
    }

    initElements() {
        this.elements = {
            addProductBtn: document.getElementById('add-product-btn'),
            productsTableBody: document.getElementById('products-table-body'),
            productModal: document.getElementById('product-modal'),
            modalTitle: document.getElementById('modal-title'),
            productForm: document.getElementById('product-form'),
            productId: document.getElementById('product-id'),
            closeModal: document.getElementById('close-modal'),
            cancelBtn: document.getElementById('cancel-btn'),
            // إضافة العناصر الجديدة
            uploadTab: document.getElementById('upload-tab'),
            urlTab: document.getElementById('url-tab'),
            uploadSection: document.getElementById('upload-section'),
            urlSection: document.getElementById('url-section'),
            imageUpload: document.getElementById('image-upload'),
            imageUrl: document.getElementById('image-url'),
            hasDiscount: document.getElementById('has-discount'),
            discountFields: document.getElementById('discount-fields'), // تصحيح الخطأ الإملائي هنا
            discountPercentage: document.getElementById('discount-percentage'),
            oldPrice: document.getElementById('old-price'),
            price: document.getElementById('price')
        };
    }

    initEvents() {
        // فتح نموذج الإضافة
        this.elements.addProductBtn.addEventListener('click', () => this.openAddModal());
        
        // إغلاق النموذج
        this.elements.closeModal.addEventListener('click', () => this.closeModal());
        this.elements.cancelBtn.addEventListener('click', () => this.closeModal());
        
        // حفظ المنتج
        this.elements.productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

        // أحداث الصورة
        if (this.elements.uploadTab && this.elements.urlTab) {
            this.elements.uploadTab.addEventListener('click', () => this.switchImageTab('upload'));
            this.elements.urlTab.addEventListener('click', () => this.switchImageTab('url'));
        }

        // أحداث الخصم
        if (this.elements.hasDiscount) {
            this.elements.hasDiscount.addEventListener('change', () => {
                this.elements.discountFields.classList.toggle('hidden', !this.elements.hasDiscount.checked);
                if (this.elements.hasDiscount.checked && this.elements.price.value && !this.elements.oldPrice.value) {
                    this.elements.oldPrice.value = this.elements.price.value;
                }
            });
        }

        // أحداث حساب الخصم
        if (this.elements.discountPercentage && this.elements.price) {
            this.elements.discountPercentage.addEventListener('input', () => this.calculateDiscount());
            this.elements.price.addEventListener('input', () => this.calculateDiscount());
        }

        // معاينة الصورة المرفوعة
        if (this.elements.imageUpload) {
            this.elements.imageUpload.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const preview = document.getElementById('preview-image');
                        if (preview) {
                            preview.src = event.target.result;
                            document.getElementById('upload-preview').classList.remove('hidden');
                        }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
        }

        // معاينة صورة الرابط
        if (this.elements.imageUrl) {
            this.elements.imageUrl.addEventListener('blur', () => {
                const url = this.elements.imageUrl.value.trim();
                if (url) {
                    const preview = document.getElementById('preview-url-image');
                    if (preview) {
                        preview.src = url;
                        document.getElementById('url-preview').classList.remove('hidden');
                    }
                } else {
                    document.getElementById('url-preview').classList.add('hidden');
                }
            });
        }
    }

    switchImageTab(tab) {
        if (tab === 'upload') {
            this.elements.uploadTab.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-600');
            this.elements.uploadTab.classList.remove('border-gray-300', 'bg-white', 'text-gray-700');
            this.elements.urlTab.classList.add('border-gray-300', 'bg-white', 'text-gray-700');
            this.elements.urlTab.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-600');
            this.elements.uploadSection.classList.remove('hidden');
            this.elements.urlSection.classList.add('hidden');
        } else {
            this.elements.urlTab.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-600');
            this.elements.urlTab.classList.remove('border-gray-300', 'bg-white', 'text-gray-700');
            this.elements.uploadTab.classList.add('border-gray-300', 'bg-white', 'text-gray-700');
            this.elements.uploadTab.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-600');
            this.elements.urlSection.classList.remove('hidden');
            this.elements.uploadSection.classList.add('hidden');
        }
    }

    calculateDiscount() {
        if (this.elements.hasDiscount.checked && 
            this.elements.price.value && 
            this.elements.discountPercentage.value) {
            
            const currentPrice = parseFloat(this.elements.price.value);
            const discount = parseFloat(this.elements.discountPercentage.value);
            const originalPrice = currentPrice / (1 - (discount / 100));
            this.elements.oldPrice.value = originalPrice.toFixed(2);
            
            const discountMsg = document.getElementById('discount-message');
            if (discountMsg) {
                discountMsg.textContent = `الخصم: ${discount}% (فرق ${(originalPrice - currentPrice).toFixed(2)} ر.س)`;
            }
        }
    }

    openAddModal() {
        this.currentProductId = null;
        this.elements.modalTitle.textContent = 'إضافة منتج جديد';
        this.elements.productForm.reset();
        this.switchImageTab('upload');
        this.elements.discountFields.classList.add('hidden');
        this.elements.hasDiscount.checked = false;
        document.getElementById('upload-preview').classList.add('hidden');
        document.getElementById('url-preview').classList.add('hidden');
        this.elements.productModal.classList.remove('hidden');
    }

    openEditModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        this.currentProductId = productId;
        this.elements.modalTitle.textContent = 'تعديل المنتج';
        
        // تعبئة النموذج ببيانات المنتج
        this.elements.productId.value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('old-price').value = product.oldPrice || '';
        document.getElementById('category').value = product.category;
        document.querySelector(`input[name="condition"][value="${product.used ? 'used' : 'new'}"]`).checked = true;
        document.getElementById('description').value = product.description;
        document.getElementById('rating').value = product.rating;
        document.getElementById('stock').value = product.stock || 1;
        
        // تعبئة بيانات الصورة
        if (product.image.startsWith('blob:')) {
            // إذا كانت الصورة من رفع ملف (في الواقع الفعلي يجب حفظها في الخادم)
            this.switchImageTab('upload');
            // لا يمكن استعادة ملف محمل مسبقاً، لذا نعرض الصورة فقط
            const preview = document.getElementById('preview-image');
            if (preview) {
                preview.src = product.image;
                document.getElementById('upload-preview').classList.remove('hidden');
            }
        } else {
            // إذا كانت الصورة من رابط
            this.switchImageTab('url');
            this.elements.imageUrl.value = product.image;
            const preview = document.getElementById('preview-url-image');
            if (preview) {
                preview.src = product.image;
                document.getElementById('url-preview').classList.remove('hidden');
            }
        }
        
        // تعبئة بيانات الخصم
        if (product.discount) {
            this.elements.hasDiscount.checked = true;
            this.elements.discountFields.classList.remove('hidden');
            this.elements.discountPercentage.value = product.discountPercentage;
            this.elements.oldPrice.value = product.oldPrice;
        } else {
            this.elements.hasDiscount.checked = false;
            this.elements.discountFields.classList.add('hidden');
        }
        
        this.elements.productModal.classList.remove('hidden');
    }

    closeModal() {
        this.elements.productModal.classList.add('hidden');
    }

    saveProduct() {
        // التحقق من الصورة
        let imageValue = '';
        if (this.elements.uploadSection.classList.contains('hidden')) {
            // إذا كان المستخدم قد اختار رابط صورة
            imageValue = this.elements.imageUrl.value.trim();
            if (!imageValue) {
                alert('الرجاء إدخال رابط صورة صالح');
                return;
            }
        } else {
            // إذا كان المستخدم قد اختار رفع صورة
            if (this.elements.imageUpload.files.length === 0) {
                alert('الرجاء اختيار صورة للمنتج');
                return;
            }
            // في تطبيق حقيقي، هنا يجب رفع الملف إلى الخادم
            // ولكن للتجربة سنستخدم رابط مؤقت
            imageValue = URL.createObjectURL(this.elements.imageUpload.files[0]);
        }

        // التحقق من الحقول المطلوبة
        const name = document.getElementById('name').value.trim();
        const priceValue = this.elements.price.value;
        const category = document.getElementById('category').value;
        
        if (!name || !priceValue || !category) {
            alert('الرجاء ملء جميع الحقول المطلوبة');
            return;
        }

        // جمع بيانات المنتج
        const productData = {
            id: this.currentProductId || Date.now(),
            name: name,
            price: parseFloat(priceValue),
            category: category,
            used: document.querySelector('input[name="condition"]:checked').value === 'used',
            image: imageValue,
            description: document.getElementById('description').value.trim(),
            rating: parseFloat(document.getElementById('rating').value),
            stock: parseInt(document.getElementById('stock').value) || 1,
            date: new Date().toISOString().split('T')[0]
        };

        // معالجة الخصم إذا كان موجوداً
        if (this.elements.hasDiscount.checked) {
            const discountValue = parseFloat(this.elements.discountPercentage.value);
            const oldPriceValue = parseFloat(this.elements.oldPrice.value);
            
            if (discountValue > 0 && oldPriceValue > 0) {
                productData.oldPrice = oldPriceValue;
                productData.discountPercentage = discountValue;
                productData.discount = true;
            }
        }

        // حفظ أو تحديث المنتج
        if (this.currentProductId) {
            const index = this.products.findIndex(p => p.id === this.currentProductId);
            if (index !== -1) {
                this.products[index] = productData;
            }
        } else {
            this.products.push(productData);
        }

        this.saveToLocalStorage();
        this.renderProductsTable();
        this.closeModal();
        
        alert('تم حفظ المنتج بنجاح');
    }

    deleteProduct(productId) {
        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            this.products = this.products.filter(p => p.id !== productId);
            this.saveToLocalStorage();
            this.renderProductsTable();
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    renderProductsTable() {
        this.elements.productsTableBody.innerHTML = '';
        
        if (this.products.length === 0) {
            this.elements.productsTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="px-6 py-4 text-center text-gray-500">لا توجد منتجات</td>
                </tr>
            `;
            return;
        }

        this.products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4">
                    <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded">
                </td>
                <td class="px-6 py-4">${product.name}</td>
                <td class="px-6 py-4">${this.getCategoryName(product.category)}</td>
                <td class="px-6 py-4">${product.price.toLocaleString()} ر.س</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs ${product.used ? 'bg-gray-200 text-gray-800' : 'bg-green-200 text-green-800'}">
                        ${product.used ? 'مستعمل' : 'جديد'}
                    </span>
                </td>
                <td class="px-6 py-4">
                    ${product.discount ? `<span class="px-2 py-1 rounded-full text-xs bg-red-200 text-red-800">${product.discountPercentage}%</span>` : '---'}
                </td>
                <td class="px-6 py-4">
                    <button class="edit-btn text-blue-600 hover:text-blue-800 mr-2" data-id="${product.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn text-red-600 hover:text-red-800" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            this.elements.productsTableBody.appendChild(row);
        });

        // إضافة مستمعي الأحداث للأزرار
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openEditModal(parseInt(btn.dataset.id)));
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.deleteProduct(parseInt(btn.dataset.id)));
        });
    }

    getCategoryName(categoryKey) {
        const categories = {
            'laptops': 'لابتوبات',
            'phones': 'هواتف',
            'headphones': 'سماعات',
            'processors': 'معالجات',
            'gpus': 'كروت شاشة',
            'ram': 'ذاكرة RAM'
        };
        return categories[categoryKey] || categoryKey;
    }
}

// تهيئة مدير المنتجات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    new ProductManager();
});