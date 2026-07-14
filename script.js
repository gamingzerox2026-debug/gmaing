/* ============================================
   ZEROX x CHEAT - Premium Gaming Website
   JavaScript Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    
    function hideLoadingScreen() {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }
    
    // Hide loading screen after content loads
    if (document.readyState === 'complete') {
        setTimeout(hideLoadingScreen, 1500);
    } else {
        window.addEventListener('load', function() {
            setTimeout(hideLoadingScreen, 1500);
        });
    }
    
    // ============================================
    // NAVIGATION SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Check on load
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    }
    
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // PARTICLE SYSTEM (Hero Background)
    // ============================================
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 8;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.5 + 0.2;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = left + '%';
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';
            particle.style.opacity = opacity;
            
            // Random neon colors
            const colors = ['#00d4ff', '#00f0ff', '#8b5cf6', '#00ff88'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // ============================================
    // ANIMATED COUNTER (Hero Stats)
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    function animateCounters() {
        if (countersStarted) return;
        
        const heroSection = document.getElementById('hero');
        const heroRect = heroSection.getBoundingClientRect();
        
        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            countersStarted = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out)
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);
                    
                    stat.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                }
                
                requestAnimationFrame(updateCounter);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load
    
    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    function revealOnScroll() {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.85;
            
            if (elementTop < triggerPoint) {
                const delay = element.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    element.classList.add('revealed');
                }, parseInt(delay));
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
    
    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('back-to-top');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleBackToTop);
    
    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const plan = formData.get('plan');
        const message = formData.get('message');
        
        // Create a visually appealing alert
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(10, 10, 20, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 16px;
            padding: 40px;
            text-align: center;
            z-index: 10000;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.2);
            font-family: 'Rajdhani', sans-serif;
        `;
        
        alertBox.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 16px;">&#10003;</div>
            <h3 style="font-family: 'Orbitron', sans-serif; font-size: 1.3rem; color: #00d4ff; margin-bottom: 12px;">Message Sent!</h3>
            <p style="color: rgba(255,255,255,0.7); margin-bottom: 24px; line-height: 1.6;">
                Thanks ${name}, we have received your message. We will get back to you within 30 minutes via WhatsApp or email.
            </p>
            <button id="close-alert" style="
                background: #00d4ff;
                color: #050508;
                border: none;
                padding: 12px 32px;
                border-radius: 8px;
                font-family: 'Orbitron', sans-serif;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">OK</button>
        `;
        
        document.body.appendChild(alertBox);
        
        // Close alert functionality
        document.getElementById('close-alert').addEventListener('click', function() {
            alertBox.style.opacity = '0';
            alertBox.style.transform = 'translate(-50%, -50%) scale(0.9)';
            alertBox.style.transition = 'all 0.3s ease';
            setTimeout(() => alertBox.remove(), 300);
        });
        
        // Reset form
        contactForm.reset();
    });
    
    // ============================================
    // PARALLAX EFFECT (Subtle)
    // ============================================
    const glowOrbs = document.querySelectorAll('.glow-orb');
    
    function parallaxEffect() {
        const scrollY = window.scrollY;
        
        glowOrbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
    
    // Only apply parallax on non-touch devices
    if (!window.matchMedia('(pointer: coarse)').matches) {
        window.addEventListener('scroll', parallaxEffect);
    }
    
    // ============================================
    // MOUSE GLOW EFFECT (Desktop Only)
    // ============================================
    if (!window.matchMedia('(pointer: coarse)').matches) {
        document.addEventListener('mousemove', function(e) {
            const cards = document.querySelectorAll('.feature-card, .pricing-card');
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    card.style.setProperty('--mouse-x', x + 'px');
                    card.style.setProperty('--mouse-y', y + 'px');
                }
            });
        });
    }
    
    // ============================================
    // GALLERY ITEM HOVER EFFECT
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create lightbox effect
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(5, 5, 8, 0.95);
                backdrop-filter: blur(10px);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const content = this.querySelector('.gallery-content').cloneNode(true);
            content.style.cssText = `
                text-align: center;
                padding: 40px;
            `;
            
            const closeBtn = document.createElement('div');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: 24px;
                right: 24px;
                font-size: 2rem;
                color: #fff;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: rgba(255,255,255,0.1);
                transition: all 0.3s ease;
            `;
            
            overlay.appendChild(content);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            
            // Animate in
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
            });
            
            // Close on click
            overlay.addEventListener('click', function() {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            });
        });
    });
    
    // ============================================
    // PRICING CARD EDITABLE (Double-click to edit)
    // ============================================
    const pricingPrices = document.querySelectorAll('.price-amount');
    
    pricingPrices.forEach(price => {
        price.style.cursor = 'pointer';
        price.title = 'Double-click to edit price';
        
        price.addEventListener('dblclick', function() {
            const currentValue = this.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.style.cssText = `
                background: transparent;
                border: 1px solid #00d4ff;
                border-radius: 4px;
                color: #fff;
                font-family: 'Orbitron', sans-serif;
                font-size: 3.5rem;
                font-weight: 800;
                width: 150px;
                text-align: center;
                outline: none;
            `;
            
            this.parentNode.replaceChild(input, this);
            input.focus();
            input.select();
            
            function saveEdit() {
                const newValue = input.value || currentValue;
                const span = document.createElement('span');
                span.className = 'price-amount';
                span.textContent = newValue;
                span.style.cursor = 'pointer';
                span.title = 'Double-click to edit price';
                
                // Re-attach event listener
                span.addEventListener('dblclick', arguments.callee);
                
                input.parentNode.replaceChild(span, input);
            }
            
            input.addEventListener('blur', saveEdit);
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    saveEdit();
                }
            });
        });
    });
    
    // ============================================
    // KEYBOARD NAVIGATION SUPPORT
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Escape to close mobile menu
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
    });
    
    // ============================================
    // PERFORMANCE: Intersection Observer for animations
    // ============================================
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, parseInt(delay));
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        scrollRevealElements.forEach(el => revealObserver.observe(el));
    }
    
    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c ZEROX x CHEAT ', 'background: #00d4ff; color: #050508; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Premium Gaming Tools - Built for Champions ', 'color: #00d4ff; font-size: 14px;');
    
});