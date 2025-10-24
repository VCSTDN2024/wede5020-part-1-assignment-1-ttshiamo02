document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-navigation');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.main-navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    initImageLightbox();
    initProductFilter();
    initAccordions();
    initFormValidation();
    initAnimations();
});

function initImageLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const images = document.querySelectorAll('.gallery-image, .product-card img, .team-member img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            const lightboxImg = lightbox.querySelector('img');
            const caption = lightbox.querySelector('.lightbox-caption');
            
            lightboxImg.src = this.src;
            caption.textContent = this.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

function initProductFilter() {
    const searchInput = document.querySelector('.product-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    if (filterButtons) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterProducts();
            });
        });
    }
}

function filterProducts() {
    const searchTerm = document.querySelector('.product-search')?.value.toLowerCase() || '';
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const tags = Array.from(product.querySelectorAll('.product-tag')).map(tag => tag.textContent.toLowerCase());
        const description = product.querySelector('p').textContent.toLowerCase();
        
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
        
        if (matchesSearch && matchesFilter) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            const isActive = accordion.classList.contains('active');
            
            accordions.forEach(acc => {
                acc.classList.remove('active');
            });
            
            if (!isActive) {
                accordion.classList.add('active');
            }
        });
    });
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.product-card, .service-card, .team-member, .workshop');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}