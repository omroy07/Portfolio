/*=============== MOBILE NAV TOGGLE ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

function toggleMenu() {
    const isOpen = navMenu.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', String(isOpen));
}

if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
}

document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

/*=============== ACTIVE NAV LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function setActiveLink() {
    const scrollY = window.pageYOffset;
    let currentId = sections[0] ? sections[0].id : '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;
        if (scrollY >= sectionTop) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active-link');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

/*=============== HEADER SHADOW + SCROLL-TO-TOP VISIBILITY ===============*/
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 60;
    if (header) header.style.boxShadow = scrolled ? '0 2px 18px -8px rgba(26,36,32,0.18)' : 'none';
    if (scrollTopBtn) scrollTopBtn.classList.toggle('is-visible', window.scrollY > 480);
});

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.contact__button');
        const originalLabel = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { Accept: 'application/json' },
            });

            if (response.ok) {
                contactForm.reset();
                if (successMessage) {
                    successMessage.classList.add('is-visible');
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            submitBtn.textContent = 'Something went wrong — try again';
            setTimeout(() => {
                submitBtn.textContent = originalLabel;
            }, 2500);
            submitBtn.disabled = false;
            return;
        }

        submitBtn.textContent = originalLabel;
        submitBtn.disabled = false;
    });
}

/*=============== FOOTER YEAR ===============*/
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/*=============== SCROLL REVEAL ===============*/
if (window.ScrollReveal) {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '24px',
        duration: 700,
        delay: 80,
        reset: false,
        easing: 'cubic-bezier(.4,0,.2,1)',
    });

    sr.reveal('.home__data', { origin: 'left', distance: '32px' });
    sr.reveal('.home__img', { origin: 'right', distance: '32px', delay: 160 });
    sr.reveal('.section__head', {});
    sr.reveal('.about__img, .about__content', { interval: 120 });
    sr.reveal('.skills__group', { interval: 80 });
    sr.reveal('.work__item', { interval: 90 });
    sr.reveal('.timeline__item', { interval: 100 });
    sr.reveal('.achievement__item', { interval: 100 });
    sr.reveal('.certificate__item', { interval: 70 });
    sr.reveal('.contact__form, .contact__aside', { interval: 120 });
}
