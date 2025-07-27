
 // عرض/إخفاء كلمة المرور
 document.getElementById('togglePassword').addEventListener('click', function() {
     const passwordInput = document.getElementById('password');
     const icon = this.querySelector('i');
     
     if (passwordInput.type === 'password') {
         passwordInput.type = 'text';
         icon.classList.replace('fa-eye', 'fa-eye-slash');
     } else {
         passwordInput.type = 'password';
         icon.classList.replace('fa-eye-slash', 'fa-eye');
     }
 });
 
 // قوة كلمة المرور
 document.getElementById('password').addEventListener('input', function() {
     const strengthBar = document.getElementById('passwordStrengthBar');
     const strength = calculatePasswordStrength(this.value);
     
     strengthBar.style.width = strength.percentage + '%';
     strengthBar.style.backgroundColor = strength.color;
 });
 
 function calculatePasswordStrength(password) {
     let strength = 0;
     
     // طول كلمة المرور
     if (password.length > 7) strength += 25;
     if (password.length > 10) strength += 15;
     
     // أحرف متنوعة
     if (/[A-Z]/.test(password)) strength += 15;
     if (/[0-9]/.test(password)) strength += 15;
     if (/[^A-Za-z0-9]/.test(password)) strength += 15;
     
     // تكرار الأحرف
     if (!/(.)\1{2,}/.test(password)) strength += 15;
     
     strength = Math.min(strength, 100);
     
     let color;
     if (strength < 40) color = '#ef4444'; // أحمر
     else if (strength < 70) color = '#f59e0b'; // أصفر
     else color = '#10b981'; // أخضر
     
     return { percentage: strength, color };
 }
 
 // تأكيد كلمة المرور
 document.getElementById('confirmPassword').addEventListener('input', function() {
     const password = document.getElementById('password').value;
     const errorElement = document.getElementById('passwordMatchError');
     
     if (this.value && password !== this.value) {
         errorElement.classList.remove('hidden');
     } else {
         errorElement.classList.add('hidden');
     }
 });
 
 // إرسال النموذج
 document.getElementById('registerForm').addEventListener('submit', function(e) {
     e.preventDefault();
     
     const name = document.getElementById('name').value;
     const email = document.getElementById('email').value;
     const phone = document.getElementById('phone').value;
     const password = document.getElementById('password').value;
     const confirmPassword = document.getElementById('confirmPassword').value;
     
     // التحقق من تطابق كلمة المرور
     if (password !== confirmPassword) {
         alert('كلمة المرور غير متطابقة!');
         return;
     }
     
     // التحقق من الموافقة على الشروط
     if (!document.getElementById('terms').checked) {
         alert('يجب الموافقة على الشروط والأحكام');
         return;
     }
     
     // هنا يمكنك إضافة كود إرسال البيانات إلى الخادم
     console.log('بيانات التسجيل:', { name, email, phone, password });
     
     // عرض رسالة نجاح
     alert('تم إنشاء الحساب بنجاح! سيتم توجيهك إلى صفحة تسجيل الدخول.');
     
     // توجيه المستخدم إلى صفحة تسجيل الدخول
     window.location.href = 'login.html';
 });
   