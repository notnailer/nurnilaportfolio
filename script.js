document.addEventListener('DOMContentLoaded', () => {

    
    // 1. Digital Starfield Background Animation
    const canvas = document.getElementById('starfieldCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const stars = [];
        const starCount = Math.floor((width * height) / 10000);

        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.8 + 0.5;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.alpha = Math.random() * 0.7 + 0.3;
                this.alphaChange = (Math.random() * 0.02) + 0.005;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                this.alpha += this.alphaChange;
                if (this.alpha > 1 || this.alpha < 0.2) {
                    this.alphaChange = -this.alphaChange;
                }

                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = document.body.classList.contains('light-mode') 
                    ? `rgba(37, 99, 235, ${this.alpha})` 
                    : `rgba(96, 165, 250, ${this.alpha})`;
                ctx.fill();
            }
        }

        function initStars() {
            stars.length = 0;
            for (let i = 0; i < starCount; i++) {
                stars.push(new Star());
            }
        }

        initStars();

        function animateStarfield() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < stars.length; i++) {
                stars[i].update();
                stars[i].draw();
            }

            requestAnimationFrame(animateStarfield);
        }

        animateStarfield();
    }

    // 2. Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Dynamic Typing Effect
    const typingElement = document.getElementById('typingEffect');
    const roles = ['a Multimedia Computing Student.'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingElement) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 90;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 4. Scroll Reveal Animation On Scroll
    const revealElements = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();

    // 5. Scroll-to-Top Button, Header Glow & Scroll Progress Bar
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const navbar = document.querySelector('.navbar');
    const scrollProgressBar = document.getElementById('scrollProgress');

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        if (scrollProgressBar) {
            scrollProgressBar.style.width = scrolled + '%';
        }

        if (scrollTopBtn) {
            scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        }
        
        if (navbar) {
            navbar.style.borderColor = window.scrollY > 50 ? 'rgba(59, 130, 246, 0.4)' : 'var(--border-color)';
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Active Navbar Link Highlighter based on Scroll Position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-nav');
            }
        });
    });

    // 7. Interactive Modal Popup & Toast Notification for Contact Form
    const openModalBtn = document.getElementById('openContactModal');
    const closeModalBtn = document.getElementById('closeContactModal');
    const contactModal = document.getElementById('contactModal');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // Toast dynamic element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = 'Your message has been sent successfully!';
    document.body.appendChild(toast);

    if (openModalBtn && contactModal && closeModalBtn) {
        openModalBtn.addEventListener('click', () => {
            contactModal.classList.add('active');
            contactModal.setAttribute('aria-hidden', 'false');
        });

        closeModalBtn.addEventListener('click', () => {
            contactModal.classList.remove('active');
            contactModal.setAttribute('aria-hidden', 'true');
        });

        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
                contactModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                formStatus.style.color = '#ff4d4d';
                formStatus.textContent = 'Please fill in all fields.';
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.style.color = '#ff4d4d';
                formStatus.textContent = 'Please enter a valid email address.';
                return;
            }

            contactForm.reset();
            contactModal.classList.remove('active');
            contactModal.setAttribute('aria-hidden', 'true');
            formStatus.textContent = '';

            // Paparkan Toast Notification moden
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        });
    }

    // 8. Dark Mode and Day Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Semak memori pelayar web (LocalStorage)
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggleBtn) themeToggleBtn.textContent = '🌙 Dark Mode';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                themeToggleBtn.textContent = '🌙 Dark Mode';
                localStorage.setItem('portfolioTheme', 'light');
            } else {
                themeToggleBtn.textContent = '☀️ Day Mode';
                localStorage.setItem('portfolioTheme', 'dark');
            }
        });
    }

    // 9. Certificate Image Lightbox Viewer for certificate only
    const lightboxModal = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');
    
    // zoom certificate image to see full size of the certificate
    const zoomableCertImages = document.querySelectorAll('.cert-img-full');

    zoomableCertImages.forEach(img => {
        img.addEventListener('click', () => {
            if (lightboxModal && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxModal.classList.add('active');
                lightboxModal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    if (closeLightbox && lightboxModal) {
        closeLightbox.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
        });

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
                lightboxModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // 10. Dynamic Greeting based on Local Time when user browsing the website
    const dynamicGreeting = document.getElementById('dynamicGreeting');
    if (dynamicGreeting) {
        const currentHour = new Date().getHours();
        let greetingText = "WELCOME TO MY PORTFOLIO SPACE";

        if (currentHour >= 5 && currentHour < 12) {
            greetingText = "☀️ GOOD MORNING! WELCOME TO MY PORTFOLIO";
        } else if (currentHour >= 12 && currentHour < 17) {
            greetingText = "🌤️ GOOD AFTERNOON! WELCOME TO MY PORTFOLIO";
        } else if (currentHour >= 17 && currentHour < 21) {
            greetingText = "🌆 GOOD EVENING! WELCOME TO MY PORTFOLIO";
        } else {
            greetingText = "🌙 LATE NIGHT BROWSING? WELCOME TO MY PORTFOLIO";
        }

        dynamicGreeting.textContent = greetingText;
    }

});