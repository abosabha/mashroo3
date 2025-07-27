// shared.js - سيتم استخدامه في جميع الصفحات

// بيانات العروض المشتركة
const sharedOffers = [
    {
        id: "offer1",
        title: "خصم 30% على اللابتوبات",
        discount: "30%",
        description: "احصل على خصم 30% على جميع اللابتوبات من ماركات ديل، اتش بي، لينوفو ومايكروسوفت",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "laptops",
        endDate: "2023-12-31"
    },
    {
        id: "offer2",
        title: "خصم 50% على السماعات",
        discount: "50%",
        description: "خصم 50% على جميع أنواع السماعات اللاسلكية من سوني، جي بي ال، وبوز",
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        category: "headphones",
        endDate: "2023-12-15"
    }
];

// دالة لعرض العروض في الصفحة الرئيسية
function displayOffersInHome() {
    if (document.getElementById('offers-container')) {
        const container = document.getElementById('offers-container');
        
        sharedOffers.forEach(offer => {
            const offerHTML = `
                <div class="offer-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 relative">
                    <div class="discount-badge">${offer.discount} خصم</div>
                    <div class="p-4">
                        <h3 class="font-bold text-gray-800 mb-2">${offer.title}</h3>
                        <div class="h-32 flex items-center justify-center mb-4">
                            <img src="${offer.image}" alt="${offer.title}" class="max-h-full max-w-full">
                        </div>
                        <p class="text-gray-600 text-sm mb-3">${offer.description}</p>
                        <a href="offers.html" class="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">عرض التفاصيل</a>
                    </div>
                </div>
            `;
            
            container.innerHTML += offerHTML;
        });
    }
}

// دالة لعرض العروض في صفحة العروض
function displayOffersInOffersPage() {
    if (document.getElementById('special-offers-container')) {
        const container = document.getElementById('special-offers-container');
        
        sharedOffers.forEach(offer => {
            const offerHTML = `
                <div class="bg-blue-50 rounded-lg overflow-hidden shadow-md border border-blue-100">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="font-bold text-xl text-blue-800">${offer.title}</h3>
                                <p class="text-blue-600">لمدة محدودة فقط</p>
                            </div>
                            <div class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">${offer.discount}</div>
                        </div>
                        <img src="${offer.image}" alt="${offer.title}" class="w-full h-48 object-contain mb-4">
                        <p class="text-gray-600 mb-4">${offer.description}</p>
                        <a href="products.html" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">تسوق الآن</a>
                    </div>
                </div>
            `;
            
            container.innerHTML += offerHTML;
        });
    }
}

// استدعاء الدوال عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    displayOffersInHome();
    displayOffersInOffersPage();
});