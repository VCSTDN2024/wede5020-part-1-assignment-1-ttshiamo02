// enquiry.js - Enquiry Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initEnquiryWizard();
    initQuoteCalculator();
    initServicePreview();
    initFormSteps();
    initEnquirySubmission();
});


function initEnquiryWizard() {
    const progressSteps = document.querySelectorAll('.progress-step');
    const formSteps = document.querySelectorAll('.form-step');
    
    // Initialize first step
    showStep(1);
}

function showStep(stepNumber) {
    
    document.querySelectorAll('.progress-step').forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.dataset.step) <= stepNumber) {
            step.classList.add('active');
        }
    });
    
    // Show corresponding form step
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.dataset.step) === stepNumber) {
            step.classList.add('active');
        }
    });
}

// Quote Calculator
function initQuoteCalculator() {
    const serviceType = document.getElementById('service-type');
    const guestCount = document.getElementById('guest-count');
    const complexity = document.getElementById('complexity');
    const estimatedPrice = document.getElementById('estimated-price');
    
    function calculateQuote() {
        const service = serviceType.value;
        const guests = parseInt(guestCount.value) || 1;
        const complex = complexity.value;
        
        let basePrice = 0;
        let multiplier = 1;
        
        // Base prices
        switch(service) {
            case 'custom-cake':
                basePrice = 350;
                break;
            case 'workshop':
                basePrice = 250;
                break;
            case 'catering':
                basePrice = 65 * guests;
                break;
            case 'wholesale':
                basePrice = 1500;
                break;
            default:
                basePrice = 0;
        }
        
        // Complexity multipliers
        switch(complex) {
            case 'simple':
                multiplier = 0.8;
                break;
            case 'standard':
                multiplier = 1;
                break;
            case 'complex':
                multiplier = 1.5;
                break;
            case 'custom':
                multiplier = 2;
                break;
        }
        
        const finalPrice = Math.round(basePrice * multiplier);
        estimatedPrice.textContent = `R${finalPrice}`;
    }
    
    // Event listeners
    serviceType.addEventListener('change', calculateQuote);
    guestCount.addEventListener('input', calculateQuote);
    complexity.addEventListener('change', calculateQuote);
    
    // Initial calculation
    calculateQuote();
}

// Service Preview
function initServicePreview() {
    const enquiryType = document.getElementById('enquiryType');
    const servicePreview = document.getElementById('servicePreview');
    const previewTitle = document.getElementById('previewTitle');
    const previewDescription = document.getElementById('previewDescription');
    const previewFeatures = document.getElementById('previewFeatures');
    
    const serviceData = {
        'custom-cake': {
            title: '🎂 Custom Cake Service',
            description: 'Bespoke gothic cake creations tailored to your vision',
            features: [
                'Custom designs and themes',
                'Vegan and gluten-free options',
                '3-5 day notice required',
                'Starting from R350',
                'Free design consultation'
            ]
        },
        'workshop': {
            title: '🎓 Baking Workshops',
            description: 'Learn spooky baking techniques in our nocturnal classes',
            features: [
                'Small group sessions (max 12 people)',
                'All materials included',
                'Take home your creations',
                'Private groups available',
                'Perfect for team building'
            ]
        },
        'catering': {
            title: '🍽️ Event Catering',
            description: 'Spooky treats that make your event unforgettable',
            features: [
                'Full dessert table setup',
                'Themed decorations included',
                'Staffing available',
                'Dietary requirements accommodated',
                'Starting from R65 per person'
            ]
        },
        'wholesale': {
            title: '🤝 Wholesale Partnership',
            description: 'Stock Bat Bakery products in your establishment',
            features: [
                'Custom product development',
                'Regular delivery schedules',
                'Branded packaging',
                'Marketing support',
                'Competitive wholesale pricing'
            ]
        },
        'other': {
            title: '🦇 Other Services',
            description: 'Tell us about your unique requirements',
            features: [
                'Custom service development',
                'Special collaborations',
                'Unique event concepts',
                'Let\'s create something amazing together'
            ]
        }
    };
    
    enquiryType.addEventListener('change', function() {
        const selectedService = this.value;
        
        if (selectedService && serviceData[selectedService]) {
            const data = serviceData[selectedService];
            
            previewTitle.textContent = data.title;
            previewDescription.textContent = data.description;
            
            previewFeatures.innerHTML = data.features.map(feature => 
                `<li>${feature}</li>`
            ).join('');
            
            servicePreview.style.display = 'block';
        } else {
            servicePreview.style.display = 'none';
        }
    });
}

// Form Step Navigation
function initFormSteps() {
    // Next step buttons
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.dataset.next);
            if (validateStep(nextStep - 1)) {
                showStep(nextStep);
                updateEnquirySummary();
            }
        });
    });
    
    // Previous step buttons
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.dataset.prev);
            showStep(prevStep);
        });
    });
    

    const enquiryType = document.getElementById('enquiryType');
    enquiryType.addEventListener('change', function() {
        const serviceType = this.value;
        
        // Hide all service field groups
        document.querySelectorAll('.service-field-group').forEach(group => {
            group.style.display = 'none';
        });
        
        // Show relevant field group
        if (serviceType) {
            const fieldGroup = document.querySelector(`.${serviceType}-fields`);
            if (fieldGroup) {
                fieldGroup.style.display = 'block';
            }
        }
    });
}

function validateStep(step) {
    let isValid = true;
    
    switch(step) {
        case 1:
            const enquiryType = document.getElementById('enquiryType');
            if (!enquiryType.value) {
                showFieldError(enquiryType, 'Please select a service type');
                isValid = false;
            } else {
                clearFieldError(enquiryType);
            }
            break;
            
        case 2:
            const requiredFields = document.querySelectorAll('[data-step="2"] [required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    showFieldError(field, 'This field is required');
                    isValid = false;
                } else {
                    clearFieldError(field);
                }
            });
            break;
    }
    
    return isValid;
}

// Enquiry Summary
function updateEnquirySummary() {
    const summaryDetails = document.getElementById('summaryDetails');
    const enquiryType = document.getElementById('enquiryType');
    const enquiryName = document.getElementById('enquiryName');
    const enquiryEmail = document.getElementById('enquiryEmail');
    const eventDate = document.getElementById('eventDate');
    
    const serviceNames = {
        'custom-cake': 'Custom Cake Order',
        'workshop': 'Baking Workshop',
        'catering': 'Event Catering',
        'wholesale': 'Wholesale Partnership',
        'other': 'Other Service'
    };
    
    let summaryHTML = `
        <div class="summary-item">
            <strong>Service:</strong> ${serviceNames[enquiryType.value] || 'Not selected'}
        </div>
        <div class="summary-item">
            <strong>Contact:</strong> ${enquiryName.value} (${enquiryEmail.value})
        </div>
    `;
    
    if (eventDate.value) {
        summaryHTML += `
            <div class="summary-item">
                <strong>Event Date:</strong> ${new Date(eventDate.value).toLocaleDateString()}
            </div>
        `;
    }
    
    
    const serviceType = enquiryType.value;
    if (serviceType === 'custom-cake') {
        const cakeSize = document.getElementById('cake-size');
        const cakeFlavor = document.getElementById('cake-flavor');
        if (cakeSize.value) {
            summaryHTML += `<div class="summary-item"><strong>Cake Size:</strong> ${cakeSize.options[cakeSize.selectedIndex].text}</div>`;
        }
        if (cakeFlavor.value) {
            summaryHTML += `<div class="summary-item"><strong>Flavor:</strong> ${cakeFlavor.options[cakeFlavor.selectedIndex].text}</div>`;
        }
    } else if (serviceType === 'workshop') {
        const participantCount = document.getElementById('participant-count');
        if (participantCount.value) {
            summaryHTML += `<div class="summary-item"><strong>Participants:</strong> ${participantCount.value}</div>`;
        }
    } else if (serviceType === 'catering') {
        const guestCount = document.getElementById('guest-count');
        if (guestCount.value) {
            summaryHTML += `<div class="summary-item"><strong>Guests:</strong> ${guestCount.value}</div>`;
        }
    }
    
    summaryDetails.innerHTML = summaryHTML;
}

// Form Submission
function initEnquirySubmission() {
    const enquiryForm = document.getElementById('enquiryForm');
    const submitBtn = document.getElementById('submitEnquiryBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateEnquiryForm()) {
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Simulate form processing
            setTimeout(() => {
                showSuccessModal();
                enquiryForm.reset();
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}

function validateEnquiryForm() {
    const requiredFields = document.querySelectorAll('#enquiryForm [required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        } else if (field.type === 'tel' && !isValidPhone(field.value)) {
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

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const successDetails = document.getElementById('successDetails');
    const enquiryType = document.getElementById('enquiryType');
    
    const serviceResponse = {
        'custom-cake': 'Our cake artist will contact you within 24 hours to discuss your design ideas and provide a detailed quote.',
        'workshop': 'We\'ll check availability for your preferred dates and send you workshop options within 24 hours.',
        'catering': 'Our catering manager will reach out to discuss your event details and create a custom menu proposal.',
        'wholesale': 'Our partnership coordinator will contact you to discuss wholesale terms and product options.',
        'other': 'We\'ve received your enquiry and will assign a specialist to help with your unique requirements.'
    };
    
    const response = serviceResponse[enquiryType.value] || 'We\'ve received your enquiry and will be in touch within 24 hours.';
    
    successDetails.innerHTML = `
        <p>Thank you for your enquiry! We're excited to help bring your spooky vision to life.</p>
        <p><strong>What to expect:</strong></p>
        <p>${response}</p>
        <div class="next-steps">
            <p><strong>Next Steps:</strong></p>
            <ol>
                <li>Check your email for confirmation</li>
                <li>We'll contact you within 24 hours</li>
                <li>Discuss details and get a formal quote</li>
                <li>Finalize your booking</li>
            </ol>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    showStep(1); // Reset to first step
}


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