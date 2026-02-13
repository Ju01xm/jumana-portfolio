// =========================================
// 1. تغيير اللغة (Language Toggle)
// =========================================
const langBtn = document.getElementById('lang-btn');
const html = document.documentElement;

if (langBtn) {
    langBtn.addEventListener('click', () => {
        const currentLang = html.getAttribute('lang');
        const newLang = currentLang === 'en' ? 'ar' : 'en';

        // تغيير السمة والاتجاه
        html.setAttribute('lang', newLang);
        html.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');

        // تغيير نص الزر
        langBtn.textContent = newLang === 'ar' ? 'English' : 'عربي';

        // تغيير النصوص
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerHTML = el.getAttribute(`data-${newLang}`);
        });
    });
}

// =========================================
// 2. حركة السكرول التلقائي (Auto Scroll)
// =========================================
const scrollContainer = document.querySelector('.projects-grid');

if (scrollContainer) {
    
    function autoScroll() {
        // التحقق من اتجاه الصفحة (عربي أم إنجليزي)
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        // إذا عربي، الحركة تكون بالسالب (للخلف)، وإذا إنجليزي بالموجب
        const speed = isRTL ? -1 : 1; 

        // التوقف إذا كان الماوس فوق البطاقات أو عند السحب اليدوي
        if (scrollContainer.matches(':hover') || isDown) {
            requestAnimationFrame(autoScroll);
            return;
        }

        // تطبيق الحركة
        scrollContainer.scrollLeft += speed;

        // منطق التكرار (Loop) للعودة للبداية
        if (!isRTL) {
            // منطق الإنجليزي (LTR)
            if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth - 1)) {
                scrollContainer.scrollLeft = 0;
            }
        } else {
            // منطق العربي (RTL) - المتصفحات تختلف في حساب السالب
            // في أغلب المتصفحات: scrollLeft يبدأ من 0 وينزل للسالب
            // أو يبدأ من رقم سالب كبير ويزيد للصفر
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            // تحقق بسيط: إذا وصلنا للحد الأقصى (بالسالب أو المطلق)
            if (Math.abs(scrollContainer.scrollLeft) >= maxScroll - 1) {
                scrollContainer.scrollLeft = 0;
            }
        }
        
        requestAnimationFrame(autoScroll);
    }

    // تشغيل الحركة
    autoScroll();

    // =========================================
    // 3. السحب بالماوس (Drag to Scroll)
    // =========================================
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2; // سرعة السحب
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}