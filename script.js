// Particle Animation with Color Cycling
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    // Color palette: teal → blue → indigo → purple → pink
    const colors = [
        { r: 6, g: 182, b: 212 },
        { r: 59, g: 130, b: 246 },
        { r: 99, g: 102, b: 241 },
        { r: 139, g: 92, b: 246 },
        { r: 236, g: 72, b: 153 }
    ];

    function getCyclingColor(time, offset) {
        const speed = 0.0005;
        const t = ((time * speed) + offset) % 1;
        const idx = t * (colors.length - 1);
        const i = Math.floor(idx);
        const f = idx - i;
        const c1 = colors[i];
        const c2 = colors[Math.min(i + 1, colors.length - 1)];
        return {
            r: Math.round(c1.r + (c2.r - c1.r) * f),
            g: Math.round(c1.g + (c2.g - c1.g) * f),
            b: Math.round(c1.b + (c2.b - c1.b) * f)
        };
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.colorOffset = Math.random();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw(time) {
            const c = getCyclingColor(time, this.colorOffset);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 0.5)`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw(time);
        });

        const lineColor = getCyclingColor(time, 0);
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(${lineColor.r}, ${lineColor.g}, ${lineColor.b}, ${0.2 * (1 - distance / 150)})`;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Project Carousel
(function () {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    const counterCurrent = document.querySelector('.carousel-current');
    const counterTotal = document.querySelector('.carousel-total');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    const autoPlayDelay = 5000;

    // Set total count
    if (counterTotal) counterTotal.textContent = totalSlides;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to project ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        if (counterCurrent) counterCurrent.textContent = currentIndex + 1;
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Pause on hover
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    container.addEventListener('mouseleave', startAutoPlay);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoPlayInterval);
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        resetAutoPlay();
    }, { passive: true });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const rect = container.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (!isVisible) return;
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); }
        if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
    });

    startAutoPlay();
})();

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoUrl = `mailto:ikajalpatel21@gmail.com?subject=${subject}&body=${body}`;

        // Diagnostic log to help debug why mailto might not open in some environments
        console.log('Contact form mailto URL:', mailtoUrl);

        // First try: navigate to the mailto URL (works in most browsers when run from http/https)
        try {
            window.location.href = mailtoUrl;
        } catch (err) {
            console.warn('Direct navigation to mailto failed:', err);
        }

        // Fallback: create a temporary anchor and programmatically click it. This can succeed when
        // direct assignment to window.location is blocked (e.g., some file:// contexts or strict browsers).
        setTimeout(() => {
            const testAnchor = document.createElement('a');
            testAnchor.href = mailtoUrl;
            testAnchor.style.display = 'none';
            testAnchor.target = '_blank';
            document.body.appendChild(testAnchor);
            testAnchor.click();
            document.body.removeChild(testAnchor);
        }, 150);
    });
}

// Smooth scroll for navigation (exclude mailto and external links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Ensure mailto links work properly
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = this.getAttribute('href');
    });
});

// Add logging for mailto anchors to help debug when clicking email links doesn't open a mail client.
document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    a.addEventListener('click', (e) => {
        console.log('mailto link clicked:', a.href);
        // allow default behavior to proceed; if it's blocked we leave logs to investigate
        // Optional: preventDefault and try programmatic click fallback similar to the form if desired
    });
});