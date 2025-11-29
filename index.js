let navlink = document.querySelector(".navlink");

document.querySelector("#menuBtn").onclick = () => {
    navlink.classList.toggle('active');
}

// insert current year into footer
    try { document.getElementById('year').textContent = new Date().getFullYear(); } catch(e){}

// Contact form validation + success message
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    function showStatus(message, isError) {
        let status = form.querySelector('.form-status');
        if (!status) {
            status = document.createElement('div');
            status.className = 'form-status';
            form.prepend(status);
        }
        status.textContent = message;
        status.setAttribute('role', 'status');
        status.style.background = isError ? '#fff0f0' : '#f0fff4';
        status.style.color = isError ? '#8a0b0b' : '#0b5a2b';
        status.style.padding = '10px 12px';
        status.style.borderRadius = '8px';
        status.style.marginBottom = '12px';
        status.style.border = isError ? '1px solid #f5c2c2' : '1px solid #c6efda';
    }

    function clearStatus() {
        const status = form.querySelector('.form-status');
        if (status) status.remove();
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearStatus();
        const name = (form.querySelector('#name') || {}).value || '';
        const email = (form.querySelector('#email') || {}).value || '';
        const subject = (form.querySelector('#subject') || {}).value || '';
        const message = (form.querySelector('#message') || {}).value || '';

        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            showStatus('Please complete all required fields.', true);
            return;
        }

        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(email.trim())) {
            showStatus('Please enter a valid email address.', true);
            return;
        }

        // If validation passes — show success message and reset form
        showStatus('Thank you for contacting us. we in touch shortly.', false);
        form.reset();
    });

    // Clear status when user edits fields
    ['#name', '#email', '#subject', '#message'].forEach(function (sel) {
        const el = form.querySelector(sel);
        if (el) el.addEventListener('input', clearStatus);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const inputs = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        terms: document.getElementById('terms')
    };

    const errors = {
        fullName: document.getElementById('fullNameError'),
        email: document.getElementById('emailError'),
        password: document.getElementById('passwordError'),
        confirmPassword: document.getElementById('confirmPasswordError'),
        terms: document.getElementById('termsError')
    };

    // Real-time validation
    inputs.fullName.addEventListener('input', validateFullName);
    inputs.email.addEventListener('input', validateEmail);
    inputs.password.addEventListener('input', validatePassword);
    inputs.confirmPassword.addEventListener('input', validateConfirmPassword);
    inputs.terms.addEventListener('change', validateTerms);

    // Social login buttons
    document.querySelector('.social-btn.google').addEventListener('click', function() {
        alert('Google sign up would be implemented here');
    });

    document.querySelector('.social-btn.facebook').addEventListener('click', function() {
        alert('Facebook sign up would be implemented here');
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsValid = validateTerms();

        if (isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isTermsValid) {
            // Simulate form submission
            simulateSubmission();
        }
    });

    function validateFullName() {
        const value = inputs.fullName.value.trim();
        if (value === '') {
            showError('fullName', 'Full name is required');
            return false;
        } else if (value.length < 2) {
            showError('fullName', 'Full name must be at least 2 characters');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
            showError('fullName', 'Full name can only contain letters and spaces');
            return false;
        } else {
            showSuccess('fullName');
            return true;
        }
    }

    function validateEmail() {
        const value = inputs.email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showError('email', 'Email is required');
            return false;
        } else if (!emailRegex.test(value)) {
            showError('email', 'Please enter a valid email address');
            return false;
        } else {
            showSuccess('email');
            return true;
        }
    }

    function validatePassword() {
        const value = inputs.password.value;
        
        if (value === '') {
            showError('password', 'Password is required');
            return false;
        } else if (value.length < 8) {
            showError('password', 'Password must be at least 8 characters');
            return false;
        } else if (!/(?=.[a-z])(?=.[A-Z])(?=.*\d)/.test(value)) {
            showError('password', 'Password must contain uppercase, lowercase, and numbers');
            return false;
        } else {
            showSuccess('password');
            return true;
        }
    }

    function validateConfirmPassword() {
        const value = inputs.confirmPassword.value;
        const passwordValue = inputs.password.value;
        
        if (value === '') {
            showError('confirmPassword', 'Please confirm your password');
            return false;
        } else if (value !== passwordValue) {
            showError('confirmPassword', 'Passwords do not match');
            return false;
        } else {
            showSuccess('confirmPassword');
            return true;
        }
    }

    function validateTerms() {
        if (!inputs.terms.checked) {
            showError('terms', 'You must agree to the terms and conditions');
            return false;
        } else {
            showSuccess('terms');
            return true;
        }
    }

    function showError(field, message) {
        errors[field].textContent = message;
        if (inputs[field] && inputs[field].classList) {
            inputs[field].classList.add('invalid');
            inputs[field].classList.remove('valid');
        }
    }

    function showSuccess(field) {
        errors[field].textContent = '';
        if (inputs[field] && inputs[field].classList) {
            inputs[field].classList.add('valid');
            inputs[field].classList.remove('invalid');
        }
    }

    function simulateSubmission() {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Account created successfully! Welcome to our platform.');
            form.reset();
            
            // Reset all visual states
            Object.keys(inputs).forEach(key => {
                if (inputs[key] && inputs[key].classList) {
                    inputs[key].classList.remove('valid', 'invalid');
                }
            });
            Object.keys(errors).forEach(key => {
                if (errors[key]) {
                    errors[key].textContent = '';
                }
            });
            
            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Add input focus effects
    Object.keys(inputs).forEach(key => {
        if (inputs[key] && inputs[key].addEventListener) {
            inputs[key].addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            inputs[key].addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        }
    });
});