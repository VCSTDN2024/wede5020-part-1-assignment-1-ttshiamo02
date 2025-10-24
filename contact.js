// contact.js - Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initQuickActions();
    initDynamicForm();
    initCharacterCounter();
    initFormSubmission();
});

// Quick Action Cards
function initQuickActions() {
    const actionCards = document.querySelectorAll('.quick-action-btn');
    const modal = document.getElementById('actionModal');
    const closeModal = document.querySelector('.close-modal');
    
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const action = this.closest('.action-card').dataset.action;
            openQuickActionModal(action);
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

function openQuickActionModal(action) {
    const modal = document.getElementById('actionModal');
    const modalBody = document.getElementById('modalBody');
    
    let content = '';
    let title = '';
    
    switch(action) {
        case 'delivery':
            title = '🚚 Order Midnight Delivery';
            content = `
                <h4>Get Treats Delivered Until Midnight!</h4>
                <p>Place your delivery order through our quick system:</p>
                <div class="delivery-options">
                    <div class="option">
                        <h5>🦇 Standard Delivery</h5>
                        <p>Order by 10 PM for delivery by midnight<br>
                        <strong>Fee:</strong> R35 (within 5km)</p>
                    </div>
                    <div class="option">
                        <h5>🌙 Express Delivery</h5>
                        <p>Order by 11 PM for urgent cravings<br>
                        <strong>Fee:</strong> R50 (within 5km)</p>
                    </div>
                </div>
                <div class="modal-actions">
                    <a href="products.html" class="btn">Browse Menu & Order</a>
                    <button class="btn-outline" onclick="document.getElementById('actionModal').style.display='none'">Maybe Later</button>
                </div>
            `;
            break;
            
        case 'workshop':
            title = '🎓 Book a Baking Workshop';
            content = `
                <h4>Join Our Spooky Baking Classes</h4>
                <p>Choose from our nocturnal workshop schedule:</p>
                <div class="workshop-options">
                    <div class="option">
                        <h5>🎂 Gothic Cupcake Decorating</h5>
                        <p><strong>When:</strong> Fridays 8 PM<br>
                        <strong>Price:</strong> R250 per person</p>
                    </div>
                    <div class="option">
                        <h5>🍞 Vampire Bread Making</h5>
                        <p><strong>When:</strong> Saturdays 7 PM<br>
                        <strong>Price:</strong> R300 per person</p>
                    </div>
                    <div class="option">
                        <h5>🍪 Spooky Cookie Decorating</h5>
                        <p><strong>When:</strong> Sundays 6 PM<br>
                        <strong>Price:</strong> R200 per person</p>
                    </div>
                </div>
                <div class="modal-actions">
                    <a href="services.html" class="btn">View All Workshops</a>
                    <a href="enquiry.html" class="btn-outline">Book Specific Workshop</a>
                </div>
            `;
            break;
            
        case 'custom':
            title = '🎂 Order Custom Cake';
            content = `
                <h4>Create Your Dream Gothic Cake</h4>
                <p>Start your custom cake journey:</p>
                <div class="cake-options">
                    <div class="option">
                        <h5>📞 Quick Consultation</h5>
                        <p>15-minute phone call to discuss your vision<br>
                        <strong>Free</strong> with any cake order</p>
                    </div>
                    <div class="option">
                        <h5>🎨 Design Session</h5>
                        <p>1-hour in-person design consultation<br>
                        <strong>R100</strong> (credited to final order)</p>
                    </div>
                </div>
                <div class="price-range">
                    <h5>💰 Price Range</h5>
                    <p><strong>Small cakes:</strong> R350 - R500<br>
                    <strong>Medium cakes:</strong> R500 - R800<br>
                    <strong>Large cakes:</strong> R800 - R1500+</p>
                </div>
                <div class="modal-actions">
                    <a href="enquiry.html" class="btn">Start Custom Order</a>
                    <button class="btn-outline" onclick="document.getElementById('actionModal').style.display='none'">Browse Gallery First</button>
                </div>
            `;
            break;
            
        case 'catering':
            title = '🍽️ Event Catering';
            content = `
                <h4>Spooky Treats for Your Event</h4>
                <p>Make your event unforgettable with our catering:</p>
                <div class="catering-options">
                    <div class="option">
                        <h5>👻 Small Gathering (10-20 people)</h5>
                        <p>Assorted treats and mini cakes<br>
                        <strong>From R85 per person</strong></p>
                    </div>
                    <div class="option">
                        <h5>🦇 Medium Event (20-50 people)</h5>
                        <p>Full dessert table with themed treats<br>
                        <strong>From R75 per person</strong></p>
                    </div>
                    <div class="option">
                        <h5>🌙 Large Celebration (50+ people)</h5>
                        <p>Complete catering with custom options<br>
                        <strong>From R65 per person</strong></p>
                    </div>
                </div>
                <div class="modal-actions">
                    <a href="enquiry.html" class="btn">Get Catering Quote</a>
                    <button class="btn-outline" onclick="document.getElementById('actionModal').style.display='none'">View Sample Menus</button>
                </div>
            `;
            break;
    }
    
    modalBody.innerHTML = `
        <h3>${title}</h3>
        ${content}
    `;
    modal.style.display = 'block';
}

// Dynamic Form Fields
function initDynamicForm() {
    const subjectSelect = document.getElementById('subject');
    const orderDetailsField = document.querySelector('.order-details-field');
    const urgencyField = document.querySelector('.urgency-field');
    
    subjectSelect.addEventListener('change', function() {
        const value = this.value;
        
        // Show/hide order details field
        if (value === 'order' || value === 'delivery' || value === 'custom-cake') {
            orderDetailsField.style.display = 'block';
        } else {
            orderDetailsField.style.display = 'none';
        }
        
        // Show/hide urgency field
        if (value === 'order' || value === 'delivery' || value === 'custom-cake' || value === 'catering') {
            urgencyField.style.display = 'block';
        } else {
            urgencyField.style.display = 'none';
        }
    });
}

// Character Counter
function initCharacterCounter() {
    const messageTextarea = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');
    
    messageTextarea.addEventListener('input', function() {
        const length = this.value.length;
        charCounter.textContent = length;
        
        if (length > 900) {
            charCounter.style.color = 'var(--accent-red)';
        } else if (length > 750) {
            charCounter.style.color = 'var(--accent-purple)';
        } else {
            charCounter.style.color = 'var(--text-muted)';
        }
    });
}

// Enhanced Form Submission
function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showFormSuccess();
                contactForm.reset();
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Check terms agreement
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        showFieldError(termsCheckbox, 'You must agree to the terms and conditions');
        isValid = false;
    }
    
    return isValid;
}

function showFormSuccess() {
    const notification = document.createElement('div');
    notification.className = 'form-success-message';
    notification.innerHTML = `
        <div class="success-content">
            <h4>🦇 Message Sent Successfully!</h4>
            <p>Thank you for reaching out! We'll get back to you within 24 hours.</p>
            <p><strong>What happens next?</strong></p>
            <ul>
                <li>You'll receive a confirmation email shortly</li>
                <li>Our team will review your message</li>
                <li>We'll contact you during your preferred time</li>
            </ul>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--card-bg);
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1000;
        max-width: 500px;
        width: 90%;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Helper functions (can be moved to form-validation.js)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}