// Main application functionality
class StudLinkApp {
    constructor() {
        this.user = null;
        this.socket = null;
        this.init();
    }

    async init() {
        await this.checkAuthStatus();
        this.setupEventListeners();
        this.initializeSocket();
        this.loadStats();
    }

    async checkAuthStatus() {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            try {
                // Verify token with backend
                const response = await fetch('/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    this.user = data.user;
                    this.showUserMenu();
                } else {
                    this.clearAuth();
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                this.clearAuth();
            }
        } else {
            this.showAuthButtons();
        }
    }

    showUserMenu() {
        document.getElementById('authButtons').classList.add('hidden');
        document.getElementById('userMenu').classList.remove('hidden');
        
        // Update user info
        document.getElementById('userName').textContent = this.user.name;
        document.getElementById('userAvatar').src = this.user.profilePicture || '/images/default-avatar.png';
        document.getElementById('userAvatar').alt = this.user.name;
    }

    showAuthButtons() {
        document.getElementById('authButtons').classList.remove('hidden');
        document.getElementById('userMenu').classList.add('hidden');
    }

    clearAuth() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.user = null;
        this.showAuthButtons();
    }

    setupEventListeners() {
        // User menu toggle
        const userMenuBtn = document.getElementById('userMenuBtn');
        if (userMenuBtn) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                document.getElementById('userDropdown').classList.toggle('hidden');
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Intersection Observer for animations
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('.card-3d, [data-aos]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    initializeSocket() {
        if (this.user) {
            this.socket = io();
            this.socket.emit('authenticate', { userId: this.user.id });

            this.socket.on('connect', () => {
                console.log('Connected to server');
            });

            this.socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            this.socket.on('new_community_message', (message) => {
                this.handleNewMessage(message);
            });
        }
    }

    async loadStats() {
        try {
            const response = await fetch('/api/stats');
            if (response.ok) {
                const data = await response.json();
                document.getElementById('statsUsers').textContent = data.users + '+';
                document.getElementById('statsCommunities').textContent = data.communities + '+';
                document.getElementById('statsConnections').textContent = data.connections + '+';
                document.getElementById('statsProjects').textContent = data.projects + '+';
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    handleNewMessage(message) {
        // Update notifications
        const notificationDot = document.querySelector('.notification-dot');
        if (notificationDot) {
            notificationDot.style.display = 'block';
        }
        
        // Show desktop notification
        if (Notification.permission === 'granted') {
            new Notification('New Message', {
                body: `New message in community`,
                icon: '/images/logo.png'
            });
        }
    }
}

// Global functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    showNotification('Logged out successfully', 'success');
    setTimeout(() => window.location.reload(), 1000);
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new StudLinkApp();
    window.app = app;
});

// Global check auth function
async function checkAuthStatus() {
    if (window.app) {
        await window.app.checkAuthStatus();
    }
}

// Global load stats function
async function loadStats() {
    if (window.app) {
        await window.app.loadStats();
    }
}