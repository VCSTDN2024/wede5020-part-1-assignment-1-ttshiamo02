function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', validateEnquiryForm);
    }
    
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
            
        case 'email':
            if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            if (value && !isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
            
        case 'eventDate':
            if (value && !isValidDate(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid future date';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidDate(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today;
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

function clearFieldError(e) {
    const field = e.target || e;
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function validateContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    if (isValid) {
        submitContactForm(form);
    }
}

function validateEnquiryForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    if (isValid) {
        submitEnquiryForm(form);
    }
}

function submitContactForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    showFormSuccess(form, 'Thank you for your message! We will get back to you soon.');
    
    setTimeout(() => {
        form.reset();
        const successElement = form.querySelector('.form-success');
        if (successElement) successElement.style.display = 'none';
    }, 5000);
}

function submitEnquiryForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    let responseMessage = 'Thank you for your enquiry! ';
    
    switch (data.enquiryType) {
        case 'custom-cake':
            responseMessage += 'Our custom cakes start from R350. Our bakery manager will contact you within 24 hours.';
            break;
        case 'workshop':
            responseMessage += 'Our baking workshops are R250 per person. We have availability for the next 4 weeks.';
            break;
        case 'catering':
            responseMessage += 'Our catering services start from R85 per person. We will send you a detailed quote within 2 hours.';
            break;
        default:
            responseMessage += 'We will get back to you within 24 hours with more information.';
    }
    
    showFormSuccess(form, responseMessage);
    
    setTimeout(() => {
        form.reset();
        const successElement = form.querySelector('.form-success');
        if (successElement) successElement.style.display = 'none';
    }, 5000);
}

function showFormSuccess(form, message) {
    let successElement = form.querySelector('.form-success');
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.className = 'form-success';
        form.insertBefore(successElement, form.firstChild);
    }
    successElement.textContent = message;
    successElement.style.display = 'block';
}