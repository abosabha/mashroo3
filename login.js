// Toggle between login and register forms
document.getElementById('show-register').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
});

document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});

// Form Submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Here you would typically send data to server
    console.log('Login attempt with:', email, password);
    alert('تم تسجيل الدخول بنجاح! سيتم توجيهك الآن.');
    // window.location.href = 'profile.html';
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('كلمة المرور غير متطابقة!');
        return;
    }
    
    // Here you would typically send data to server
    console.log('Registration data:', { name, email, phone, password });
    alert('تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    this.reset();
});
 