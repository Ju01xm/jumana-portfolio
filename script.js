// =========================================
// 1. تغيير اللغة (ويتذكر اختيارك بين الصفحات)
// =========================================
const langBtn = document.getElementById('lang-btn');
const html = document.documentElement;

function setLang(lang) {
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    if (langBtn) langBtn.textContent = lang === 'ar' ? 'English' : 'عربي';
    document.querySelectorAll('[data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text !== null) el.innerHTML = text;
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem('lang'); } catch (e) {}
if (saved === 'en') setLang('en');

if (langBtn) {
    langBtn.addEventListener('click', () => {
        setLang(html.getAttribute('lang') === 'en' ? 'ar' : 'en');
    });
}

// =========================================
// 2. أسهم المشاريع (إن وجدت في صفحات المشاريع)
// =========================================
const track = document.querySelector('.projects-grid');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

if (track && prevBtn && nextBtn) {
    const step = () => {
        const card = track.querySelector('.project-card');
        return (card ? card.offsetWidth : 300) + 24;
    };
    const move = (forward) => {
        const rtl = html.getAttribute('dir') === 'rtl';
        const dir = (forward ? 1 : -1) * (rtl ? -1 : 1);
        track.scrollBy({ left: dir * step(), behavior: 'smooth' });
    };
    nextBtn.addEventListener('click', () => move(true));
    prevBtn.addEventListener('click', () => move(false));
}

// =========================================
// 3. تفعيل فتح وإغلاق البادج باللمس على الجوال
// =========================================
const skillsStack = document.querySelector('.skills-stack');
if (skillsStack) {
    skillsStack.addEventListener('click', () => {
        skillsStack.classList.toggle('is-open');
    });
}
