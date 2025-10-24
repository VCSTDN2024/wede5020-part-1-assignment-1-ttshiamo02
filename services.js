// services.js - Services Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initServiceStats();
    initWorkshopFilter();
    initBookingSystem();
    initWishlist();
});

// Animated Statistics Counter
function initServiceStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.dataset.count);
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Workshop Filtering
function initWorkshopFilter() {
    const filterButtons = document.querySelectorAll('.workshop-filter-btn');
    const workshops = document.querySelectorAll('.workshop');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.workshop;
            
            // Filter workshops
            workshops.forEach(workshop => {
                if (filter === 'all' || workshop.dataset.level === filter || workshop.dataset.category === filter) {
                    workshop.style.display = 'block';
                    setTimeout(() => workshop.classList.add('animate-in'), 100);
                } else {
                    workshop.style.display = 'none';
                }
            });
        });
    });
}

// Booking System
function initBookingSystem() {
    const bookingButtons = document.querySelectorAll('.booking-btn');
    const modal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.dataset.service;
            openBookingModal(service);
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function openBookingModal(service) {
    const modal = document.getElementById('bookingModal');
    const modalBody = modal.querySelector('.modal-body');
    
    let content = '';
    switch(service) {
        case 'delivery':
            content = `
                <h4>🦇 Midnight Delivery Booking</h4>
                <p>You'll be redirected to our delivery booking system where you can:</p>
                <ul>
                    <li>Select your treats</li>
                    <li>Choose delivery time (until midnight)</li>
                    <li>Enter your delivery address</li>
                    <li>Make payment</li>
                </ul>
                <a href="contact.html" class="btn">Continue to Booking</a>
            `;
            break;
        case 'workshop':
            content = `
                <h4>🌙 Workshop Booking</h4>
                <p>You'll be redirected to our workshop booking system where you can:</p>
                <ul>
                    <li>Browse available workshop dates</li>
                    <li>Select number of attendees</li>
                    <li>Choose workshop level</li>
                    <li>Secure your spot with payment</li>
                </ul>
                <a href="enquiry.html" class="btn">Continue to Booking</a>
            `;
            break;
        case 'cake':
            content = `
                <h4>🎂 Custom Cake Consultation</h4>
                <p>You'll be redirected to our consultation booking where you can:</p>
                <ul>
                    <li>Describe your dream cake</li>
                    <li>Choose your event date</li>
                    <li>Select cake size and flavors</li>
                    <li>Schedule a design consultation</li>
                </ul>
                <a href="enquiry.html" class="btn">Continue to Booking</a>
            `;
            break;
    }
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
}

// Wishlist Functionality
function initWishlist() {
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const workshop = this.dataset.workshop;
            toggleWishlist(workshop, this);
        });
    });
}

function toggleWishlist(workshop, button) {
    let wishlist = JSON.parse(localStorage.getItem('batBakeryWishlist') || '[]');
    
    if (wishlist.includes(workshop)) {
        // Remove from wishlist
        wishlist = wishlist.filter(item => item !== workshop);
        button.textContent = '💜 Save';
        button.classList.remove('active');
        showNotification(`Removed ${workshop} from wishlist`);
    } else {
        // Add to wishlist
        wishlist.push(workshop);
        button.textContent = '💜 Saved!';
        button.classList.add('active');
        showNotification(`Added ${workshop} to wishlist`);
    }
    
    localStorage.setItem('batBakeryWishlist', JSON.stringify(wishlist));
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent-purple);
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}