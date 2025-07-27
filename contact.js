  // FAQ Accordion
        document.querySelectorAll('.border-b button').forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('i');
                
                content.classList.toggle('hidden');
                icon.classList.toggle('transform');
                icon.classList.toggle('rotate-180');
            });
        });
        
        // Form Submission
        const contactForm = document.querySelector('form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Here you would typically send the form data to a server
                alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
                this.reset();
            });
        }