// Enhanced DevOps Portfolio JavaScript
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupNavigation();
        this.setupParticles();
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupCounters();
        this.setupProjectModals();
        this.setupContactForm();
        this.setupMobileMenu();
        this.setupDashboard();
        this.setupFooter();
    }

    // Theme Toggle Functionality
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add smooth transition effect
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }

    // Enhanced Navigation Functionality
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                }
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            }
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Particle Background
    setupParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    // Scroll Animations
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

        // Animate elements on scroll
        const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .cert-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Animated Skill Progress Bars
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                    }, 200);
                    
                    skillObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Animated Counters
    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 100;
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Project Modals
    setupProjectModals() {
        const projectBtns = document.querySelectorAll('.project-btn');
        const modal = document.getElementById('projectModal');
        const modalClose = document.getElementById('modalClose');
        const modalBody = document.getElementById('modalBody');

        const projectData = {
            1: {
                title: 'Multi-Cloud Infrastructure',
                description: 'A comprehensive multi-cloud architecture solution that provides seamless failover capabilities and cost optimization across AWS, Azure, and Google Cloud Platform.',
                features: [
                    'Automated failover between cloud providers',
                    'Cost optimization algorithms',
                    'Real-time monitoring and alerting',
                    'Infrastructure as Code with Terraform',
                    'Kubernetes orchestration',
                    'CI/CD pipeline integration'
                ],
                technologies: ['Terraform', 'AWS', 'Azure', 'GCP', 'Kubernetes', 'Prometheus', 'Grafana'],
                metrics: {
                    uptime: '99.9%',
                    costReduction: '40%',
                    deploymentTime: '15 min',
                    services: '25+'
                },
                github: '#',
                demo: '#'
            },
            2: {
                title: 'CI/CD Pipeline Automation',
                description: 'A complete CI/CD pipeline solution with automated testing, security scanning, and zero-downtime deployments for modern applications.',
                features: [
                    'Automated code quality checks',
                    'Security vulnerability scanning',
                    'Zero-downtime deployments',
                    'Multi-environment support',
                    'Rollback capabilities',
                    'Performance monitoring'
                ],
                technologies: ['Jenkins', 'Docker', 'SonarQube', 'Ansible', 'GitLab', 'Kubernetes'],
                metrics: {
                    timeSaved: '80%',
                    successRate: '100%',
                    deployments: '500+',
                    environments: '4'
                },
                github: '#',
                demo: '#'
            },
            3: {
                title: 'Monitoring & Observability',
                description: 'A comprehensive monitoring and observability platform providing real-time insights into microservices performance and health.',
                features: [
                    'Real-time metrics collection',
                    'Custom dashboard creation',
                    'Intelligent alerting system',
                    'Log aggregation and analysis',
                    'Distributed tracing',
                    'Performance optimization insights'
                ],
                technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'Jaeger', 'AlertManager', 'Fluentd'],
                metrics: {
                    services: '50+',
                    monitoring: '24/7',
                    alerts: '99.5%',
                    retention: '90 days'
                },
                github: '#',
                demo: '#'
            }
        };

        projectBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const projectId = btn.getAttribute('data-project');
                const project = projectData[projectId];
                
                if (project) {
                    modalBody.innerHTML = `
                        <div class="modal-header">
                            <h2>${project.title}</h2>
                        </div>
                        <div class="modal-content-body">
                            <p class="project-modal-description">${project.description}</p>
                            
                            <div class="modal-section">
                                <h3>Key Features</h3>
                                <ul class="feature-list">
                                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <div class="modal-section">
                                <h3>Technologies Used</h3>
                                <div class="tech-tags">
                                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            </div>
                            
                            <div class="modal-section">
                                <h3>Project Metrics</h3>
                                <div class="metrics-grid">
                                    ${Object.entries(project.metrics).map(([key, value]) => `
                                        <div class="metric-item">
                                            <span class="metric-value">${value}</span>
                                            <span class="metric-label">${key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <div class="modal-actions">
                                <a href="${project.github}" class="btn btn-secondary">
                                    <i class="fab fa-github"></i>
                                    <span>View Code</span>
                                </a>
                                <a href="${project.demo}" class="btn btn-primary">
                                    <i class="fas fa-external-link-alt"></i>
                                    <span>Live Demo</span>
                                </a>
                            </div>
                        </div>
                    `;
                    
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Prepare UI state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            submitBtn.disabled = true;

            const API_BASE = window.PORTFOLIO_API_BASE || 'http://127.0.0.1:8000';

            fetch(`${API_BASE}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    honeypot: data.honeypot || ''
                })
            })
            .then(async (res) => {
                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err.detail || `Request failed (${res.status})`);
                }
                return res.json();
            })
            .then(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
                submitBtn.style.background = 'var(--success-color)';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                }, 1600);
            })
            .catch((err) => {
                console.error('Contact submit error:', err);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Send Failed</span>';
                submitBtn.style.background = 'var(--danger-color, #dc2626)';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2200);
            });
        });

        // Floating label effect
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value) {
                group.classList.add('focused');
            }
        });
    }

    // Enhanced Mobile Menu Setup
    setupMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Dashboard Functionality
    setupDashboard() {
        this.updateDashboardTime();
        this.setupLiveLogs();
        
        // Update time every second
        setInterval(() => {
            this.updateDashboardTime();
        }, 1000);
        
        // Update logs every 3 seconds
        setInterval(() => {
            this.addNewLogEntry();
        }, 3000);
    }

    updateDashboardTime() {
        const dashboardTime = document.getElementById('dashboardTime');
        if (dashboardTime) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            dashboardTime.textContent = `${timeString} UTC`;
        }
    }

    setupLiveLogs() {
        const logMessages = [
            { type: 'success', message: '[INFO] ML model deployed to production' },
            { type: 'info', message: '[INFO] Neural network training completed' },
            { type: 'success', message: '[INFO] AI inference endpoint healthy' },
            { type: 'info', message: '[INFO] Model accuracy: 94.2%' },
            { type: 'success', message: '[INFO] AutoML pipeline executed' },
            { type: 'info', message: '[INFO] Feature store updated' },
            { type: 'success', message: '[INFO] A/B test model deployed' },
            { type: 'info', message: '[INFO] GPU cluster auto-scaled' },
            { type: 'success', message: '[INFO] Data drift detection active' },
            { type: 'info', message: '[INFO] MLOps pipeline optimized' }
        ];

        this.logMessages = logMessages;
        this.currentLogIndex = 0;
    }

    addNewLogEntry() {
        const logContent = document.getElementById('liveLogs');
        if (!logContent) return;

        // Remove oldest log if we have more than 3
        const existingLogs = logContent.querySelectorAll('.log-line');
        if (existingLogs.length >= 3) {
            existingLogs[0].remove();
        }

        // Add new log entry
        const logEntry = this.logMessages[this.currentLogIndex];
        const logElement = document.createElement('div');
        logElement.className = `log-line ${logEntry.type}`;
        logElement.textContent = logEntry.message;
        logElement.style.opacity = '0';
        logElement.style.transform = 'translateY(10px)';
        
        logContent.appendChild(logElement);
        
        // Animate in
        setTimeout(() => {
            logElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            logElement.style.opacity = '1';
            logElement.style.transform = 'translateY(0)';
        }, 100);

        // Move to next message
        this.currentLogIndex = (this.currentLogIndex + 1) % this.logMessages.length;
    }

    // Footer helpers
    setupFooter() {
        // Year
        const yearEl = document.getElementById('currentYear');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }
}

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add some additional interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Orbit item tooltips
    const orbitItems = document.querySelectorAll('.orbit-item');
    orbitItems.forEach(item => {
        const tech = item.getAttribute('data-tech');
        if (tech) {
            item.title = tech;
        }
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                line.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const floatingCard = document.querySelector('.floating-card');
        
        if (hero && floatingCard) {
            const rate = scrolled * -0.5;
            floatingCard.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Add CSS for modal styles dynamically
const modalStyles = `
.modal {
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
}

.modal-content {
    background: var(--bg-card);
    border-radius: var(--border-radius-xl);
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: var(--shadow-xl);
    border: 1px solid var(--border-color);
}

.modal-close {
    position: absolute;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-normal);
}

.modal-close:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.modal-header {
    padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.75rem;
    font-weight: 600;
}

.modal-content-body {
    padding: var(--spacing-xl);
}

.project-modal-description {
    color: var(--text-secondary);
    font-size: 1.125rem;
    line-height: 1.6;
    margin-bottom: var(--spacing-xl);
}

.modal-section {
    margin-bottom: var(--spacing-xl);
}

.modal-section h3 {
    color: var(--text-primary);
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: var(--spacing-md);
}

.feature-list {
    list-style: none;
    padding: 0;
}

.feature-list li {
    padding: var(--spacing-sm) 0;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.feature-list li::before {
    content: '✓';
    color: var(--success-color);
    font-weight: bold;
    font-size: 1.1rem;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-lg);
}

.metric-item {
    text-align: center;
    padding: var(--spacing-md);
    background: var(--bg-secondary);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--border-color);
}

.metric-item .metric-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    line-height: 1;
}

.metric-item .metric-label {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-weight: 500;
    text-transform: capitalize;
}

.modal-actions {
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-xl);
    border-top: 1px solid var(--border-color);
}

.form-group {
    position: relative;
    margin-bottom: var(--spacing-xl);
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    background: var(--bg-card);
    color: var(--text-primary);
    font-size: 1rem;
    transition: all var(--transition-normal);
    outline: none;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-group label {
    position: absolute;
    left: var(--spacing-md);
    top: var(--spacing-md);
    color: var(--text-muted);
    font-size: 1rem;
    transition: all var(--transition-normal);
    pointer-events: none;
    background: var(--bg-card);
    padding: 0 var(--spacing-xs);
}

.form-group.focused label,
.form-group input:focus + label,
.form-group textarea:focus + label {
    top: -8px;
    left: 12px;
    font-size: 0.75rem;
    color: var(--primary-color);
}

.form-group textarea {
    min-height: 120px;
    resize: vertical;
}

@media (max-width: 768px) {
    .modal {
        padding: var(--spacing-md);
    }
    
    .modal-content {
        max-height: 95vh;
    }
    
    .modal-header,
    .modal-content-body {
        padding: var(--spacing-lg);
    }
    
    .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .modal-actions {
        flex-direction: column;
    }
}
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
