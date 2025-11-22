'use strict';

// عناصر الملاحة
const overlay = document.querySelector('[data-overlay]');
const navOpenBtn = document.querySelector('[data-nav-open-btn]');
const navbar = document.querySelector('[data-navbar]');
const navCloseBtn = document.querySelector('[data-nav-close-btn]');
const navLinks = document.querySelectorAll('[data-nav-link]');

const navElems = [navOpenBtn, navCloseBtn, overlay];

const toggleNav = () => {
  navbar.classList.toggle('active');
  overlay.classList.toggle('active');
};

navElems.forEach((elem) => elem && elem.addEventListener('click', toggleNav));
navLinks.forEach((link, index) => {
  link.style.setProperty('--nav-delay', `${index * 50}ms`);
  link.addEventListener('click', toggleNav);
});

// تفعيل الخط الثابت والعودة للأعلى
const header = document.querySelector('[data-header]');
const goTopBtn = document.querySelector('[data-go-top]');

if (header && goTopBtn) {
  window.addEventListener('scroll', () => {
    const active = window.scrollY >= 160;
    header.classList.toggle('active', active);
    goTopBtn.classList.toggle('active', active);
  });
}

// تأثيرات الظهور التدريجي
const animatedElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
animatedElements.forEach((element) => observer.observe(element));

// تبديل الوضع الداكن / الفاتح
const themeToggle = document.querySelector('[data-theme-toggle]');
const body = document.body;
const savedTheme = localStorage.getItem('awab-theme');
if (savedTheme === 'dark') body.classList.add('dark-mode');
const syncThemeIcon = () => {
  const icon = themeToggle?.querySelector('.theme-icon');
  if (!icon) return;
  icon.setAttribute('name', body.classList.contains('dark-mode') ? 'sunny' : 'moon');
};
syncThemeIcon();

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('awab-theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
  syncThemeIcon();
});

// إرسال رسالة واتساب من نموذج الاتصال
const contactForm = document.querySelector('[data-whatsapp-form]');
const whatsappNumberFromLinks = document.querySelector('[data-whatsapp-link]')?.dataset.whatsappNumber;

const buildWhatsAppUrl = (number, message) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

if (contactForm) {
  const statusElement = contactForm.querySelector('.form-status');
  const submitButton = contactForm.querySelector("button[type='submit']");

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const number = contactForm.dataset.whatsappNumber || whatsappNumberFromLinks;

    if (!number) {
      statusElement.textContent = 'الرجاء ضبط رقم واتساب لاستقبال الرسائل.';
      statusElement.style.color = 'crimson';
      return;
    }

    const composed = `استفسار جديد من ${name}\nالبريد: ${email}\nالرسالة: ${message}`;
    const whatsappUrl = buildWhatsAppUrl(number, composed);

    submitButton.disabled = true;
    statusElement.textContent = 'جارٍ فتح واتساب...';
    statusElement.style.color = 'var(--muted)';

    window.open(whatsappUrl, '_blank');
    setTimeout(() => {
      statusElement.textContent = 'تم تمرير رسالتك إلى واتساب. ننتظر تواصلك!';
      statusElement.style.color = 'green';
      contactForm.reset();
      submitButton.disabled = false;
    }, 600);
  });
}
