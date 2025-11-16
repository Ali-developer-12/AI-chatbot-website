// Professional JavaScript for NexusAI Website
class NexusAI {
    constructor() {
        this.init();
    }

    // Initialize all features
    init() {
        this.setupNavigation();
        this.setupAnimations();
        this.setupForms();
        this.setupChat();
        this.setupScrollEffects();
        this.setupLoadingStates();
        this.setupErrorHandling();
    }

    // Navigation setup
    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        this.setupNavbarScroll();
    }

    // Navbar scroll effect
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.padding = '0.5rem 0';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.padding = '1rem 0';
                navbar.style.backdropFilter = 'blur(5px)';
            }

            // Hide/show navbar on scroll
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', this.throttle(handleScroll, 100));
    }

    // Animations setup
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add stagger effect for feature cards
                    if (entry.target.classList.contains('feature-card')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                        entry.target.style.transitionDelay = `${delay}ms`;
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .section-title, .hero-title, .about-image').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Setup hover effects
        this.setupHoverEffects();
    }

    // Hover effects for interactive elements
    setupHoverEffects() {
        // Button hover effects
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });

        // Feature card hover effects
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-10px) scale(1)';
            });
        });
    }

    // Forms setup with validation
    setupForms() {
        // Login form handling
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }

        // Signup form handling
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', this.handleSignup.bind(this));
        }

        // Form validation
        this.setupFormValidation();
    }

    // Login form handler
    async handleLogin(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }

        // Show loading state
        this.setLoadingState(submitBtn, true);

        try {
            // Simulate API call
            await this.simulateAPICall(1500);
            
            // Show success message
            this.showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to chat page after success
            setTimeout(() => {
                window.location.href = 'chat.html';
            }, 1000);
            
        } catch (error) {
            this.showNotification('Login failed. Please try again.', 'error');
        } finally {
            this.setLoadingState(submitBtn, false);
        }
    }

    // Signup form handler
    async handleSignup(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }

        // Validate password match
        const password = form.querySelector('#signupPassword').value;
        const confirmPassword = form.querySelector('#confirmPassword').value;
        
        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match!', 'error');
            return;
        }

        // Validate password strength
        if (!this.validatePassword(password)) {
            this.showNotification('Password must be at least 8 characters with letters and numbers.', 'error');
            return;
        }

        // Show loading state
        this.setLoadingState(submitBtn, true);

        try {
            // Simulate API call
            await this.simulateAPICall(2000);
            
            // Show success message
            this.showNotification('Account created successfully! Welcome to NexusAI.', 'success');
            
            // Redirect to chat page after success
            setTimeout(() => {
                window.location.href = 'chat.html';
            }, 1500);
            
        } catch (error) {
            this.showNotification('Signup failed. Please try again.', 'error');
        } finally {
            this.setLoadingState(submitBtn, false);
        }
    }

    // Form validation
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                // Real-time validation
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        });
    }

    // Validate individual field
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                isValid = this.isValidEmail(value);
                message = 'Please enter a valid email address.';
                break;
            case 'password':
                if (field.id === 'signupPassword') {
                    isValid = this.validatePassword(value);
                    message = 'Password must be at least 8 characters with letters and numbers.';
                } else {
                    isValid = value.length >= 6;
                    message = 'Password must be at least 6 characters.';
                }
                break;
            case 'text':
                isValid = value.length >= 2;
                message = 'This field is required.';
                break;
        }

        if (!isValid && value) {
            this.showFieldError(field, message);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    // Validate entire form
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Field error handling
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback d-block';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('is-invalid');
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Utility functions
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= 8 && hasLetter && hasNumber;
    }

    // Chat functionality
    setupChat() {
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendButton');
        const suggestionButtons = document.querySelectorAll('.suggestion-btn');

        if (!chatMessages) return;

        // Send message function
        const sendMessage = async () => {
            const message = chatInput.value.trim();
            if (!message) return;

            // Add user message
            this.addMessage(message, true);
            chatInput.value = '';

            // Show typing indicator
            this.showTypingIndicator();

            try {
                // Simulate AI thinking
                await this.simulateAPICall(1000 + Math.random() * 1000);
                
                // Remove typing indicator
                this.removeTypingIndicator();
                
                // Generate AI response
                const response = this.generateAIResponse(message);
                this.addMessage(response, false);
                
            } catch (error) {
                this.removeTypingIndicator();
                this.addMessage('I apologize, but I seem to be having trouble responding right now. Please try again.', false);
            }
        };

        // Event listeners
        if (sendButton) {
            sendButton.addEventListener('click', sendMessage);
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            // Auto-focus on chat input
            chatInput.focus();
        }

        // Suggestion buttons
        suggestionButtons.forEach(button => {
            button.addEventListener('click', () => {
                chatInput.value = button.textContent;
                sendMessage();
            });
        });
    }

    // Add message to chat
    addMessage(text, isUser = false) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = `<i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getCurrentTime();
        
        contentDiv.appendChild(textDiv);
        contentDiv.appendChild(timeDiv);
        
        if (isUser) {
            messageDiv.appendChild(contentDiv);
            messageDiv.appendChild(avatarDiv);
        } else {
            messageDiv.appendChild(avatarDiv);
            messageDiv.appendChild(contentDiv);
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="message-text typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove typing indicator
    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Generate AI response
    generateAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        const responses = {
            'hello': 'Hello there! How can I assist you today? I\'m here to help with questions, creative tasks, problem-solving, and much more!',
            'hi': 'Hi! Nice to meet you. What would you like to know or create today?',
            'what is nexusai': 'NexusAI is an advanced artificial intelligence platform designed to revolutionize human-computer interaction. We provide intelligent conversations, creative assistance, problem-solving, and educational support through cutting-edge machine learning algorithms.',
            'tell me a joke': 'Why did the AI cross the road? To optimize the other side! 🤖\n\nHere\'s another: Why was the computer cold? It left its Windows open!',
            'help with coding': 'I\'d be happy to help with coding! I can assist with:\n• Debugging and code review\n• Algorithm explanations\n• Best practices and patterns\n• Learning new programming concepts\n• Code optimization\n\nWhat specific area would you like help with?',
            'weather': 'I can provide general weather patterns and climate information, but for real-time weather updates specific to your location, you\'ll need to use a dedicated weather service with location access.',
            'thank': 'You\'re welcome! Is there anything else I can help you with today?',
            'how are you': 'I\'m functioning optimally, thank you for asking! I\'m here and ready to assist you with whatever you need. How can I help you today?',
            'what can you do': `I'm capable of assisting with a wide range of tasks:

• Answering questions and providing detailed information
• Creative writing and content generation
• Problem-solving and analytical thinking
• Code assistance across multiple programming languages
• Learning support and educational explanations
• Idea generation and brainstorming
• Text analysis and summarization
• And much more!

What would you like to explore?`
        };

        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        return `Thank you for your message! I'm NexusAI, your intelligent assistant. I specialize in helping with questions, creative tasks, problem-solving, coding, and learning support. Could you tell me more about what you're looking for help with today?`;
    }

    // Scroll effects
    setupScrollEffects() {
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallaxSpeed = 0.5;
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            });
        }

        // Progress indicator
        this.setupProgressIndicator();
    }

    // Progress scroll indicator
    setupProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-indicator';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset;
            const progress = (scrollTop / documentHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }

    // Loading states
    setupLoadingStates() {
        // Add loading state to all buttons with async actions
        document.querySelectorAll('form button[type="submit"]').forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.type === 'submit') {
                    // Loading state will be handled in form submission
                }
            });
        });
    }

    // Set loading state for buttons
    setLoadingState(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
            button.style.opacity = '0.7';
        } else {
            button.disabled = false;
            // Restore original content based on button type
            if (button.closest('#loginForm')) {
                button.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i>Sign In';
            } else if (button.closest('#signupForm')) {
                button.innerHTML = '<i class="fas fa-user-plus me-2"></i>Create Account';
            }
            button.style.opacity = '1';
        }
    }

    // Error handling
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.showNotification('An unexpected error occurred. Please refresh the page.', 'error');
        });

        // Unhandled promise rejection
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.showNotification('Something went wrong. Please try again.', 'error');
        });
    }

    // Notification system
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.custom-notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `custom-notification alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            border: none;
            border-radius: 10px;
        `;
        
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    // Utility functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    async simulateAPICall(duration) {
        return new Promise((resolve, reject) => {
            // 10% chance of failure for realism
            const shouldFail = Math.random() < 0.1;
            
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error('Simulated API failure'));
                } else {
                    resolve('Success');
                }
            }, duration);
        });
    }
}

// Additional CSS for new features
const additionalStyles = `
    .spinner-border-sm {
        width: 1rem;
        height: 1rem;
    }
    
    .typing-indicator .typing-dots {
        display: flex;
        gap: 4px;
    }
    
    .typing-indicator .typing-dots span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--gray-color);
        animation: typing-bounce 1.4s ease-in-out infinite both;
    }
    
    .typing-indicator .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-indicator .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing-bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
    }
    
    .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;
    }
    
    .custom-notification {
        animation: slideInRight 0.3s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add additional styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);

    // Initialize NexusAI
    new NexusAI();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NexusAI;
}