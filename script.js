const menuToggle = document.getElementById('menu-toggle');
    const navTabs = document.getElementById('nav-tabs');

    menuToggle.addEventListener('click', () => {
        navTabs.classList.toggle('active');
        
        // Rotar el ícono
        const icon = menuToggle.querySelector('i');
        if (navTabs.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times'); // Cambia a "X"
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Opcional: cerrar el menú al hacer clic en una pestaña
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navTabs.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Ajustar al cambiar el tamaño de la ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navTabs.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
    });
    
// Tab Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {

    const buttons = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-card');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Actualizar botón activo
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                projects.forEach(project => {
                    const categories = project.getAttribute('data-category');
                    if (filter === 'all' || categories.includes(filter)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });


    // Get all tab buttons and tab content sections
    const tabButtons = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Add click event listener to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Set current year in footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll for timeline items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Observe education cards
    document.querySelectorAll('.education-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe tech categories
    document.querySelectorAll('.tech-category').forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        category.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(category);
    });

    // Observe competency items
    document.querySelectorAll('.competency-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // Add hover effect to tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        const avatar = document.querySelector('.avatar-circle');
        
        if (scrolled > 100) {
            header.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });

    // Add typing effect to the title (optional enhancement)
    const title = document.querySelector('.title');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        let index = 0;

        function typeWriter() {
            if (index < originalText.length) {
                title.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Add ripple effect to nav tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add print functionality
    window.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });

    // Add keyboard navigation for tabs
    let currentTabIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            
            if (e.key === 'ArrowRight') {
                currentTabIndex = (currentTabIndex + 1) % tabButtons.length;
            } else {
                currentTabIndex = (currentTabIndex - 1 + tabButtons.length) % tabButtons.length;
            }
            
            tabButtons[currentTabIndex].click();
        }
    });

    // Add dark mode toggle functionality (optional)
    function createDarkModeToggle() {
        const toggle = document.createElement('button');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        toggle.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        `;
        
        toggle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        toggle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        toggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
        
        document.body.appendChild(toggle);
    }

    // Uncomment the line below to enable dark mode toggle
    // createDarkModeToggle();

    // Add loading animation
    function addLoadingAnimation() {
        const loader = document.createElement('div');
        loader.innerHTML = '<div class="loader"></div>';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loader {
                width: 50px;
                height: 50px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #667eea;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    }

    // Uncomment the line below to enable loading animation
    // addLoadingAnimation();

    // Add mobile menu functionality for smaller screens
    function createMobileMenu() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.nav');
            const navTabs = document.querySelector('.nav-tabs');
            
            const menuButton = document.createElement('button');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            menuButton.style.cssText = `
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #667eea;
                cursor: pointer;
                z-index: 10;
            `;
            
            nav.style.position = 'relative';
            nav.appendChild(menuButton);
            
            menuButton.addEventListener('click', function() {
                navTabs.style.display = navTabs.style.display === 'flex' ? 'none' : 'flex';
                navTabs.style.flexDirection = 'column';
                navTabs.style.position = 'absolute';
                navTabs.style.top = '100%';
                navTabs.style.left = '0';
                navTabs.style.right = '0';
                navTabs.style.background = 'white';
                navTabs.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                navTabs.style.zIndex = '1000';
            });
        }
    }

    // Uncomment the line below to enable mobile menu
    // createMobileMenu();

    // Add tooltip functionality
    function addTooltips() {
        const techTags = document.querySelectorAll('.tech-tag');
        
        techTags.forEach(tag => {
            tag.title = `Experiencia con ${tag.textContent}`;
            tag.style.cursor = 'help';
        });
    }

    addTooltips();

    // Add print-specific styles
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            .nav {
                position: static;
                box-shadow: none;
            }
            
            .nav-tabs {
                display: none;
            }
            
            .tab-content {
                display: block !important;
            }
            
            .header {
                position: static;
            }
            
            .footer {
                margin-top: 2rem;
            }
            
            body {
                background: white;
            }
        }
    `;
    
    document.head.appendChild(printStyle);

    // Add accessibility improvements
    function improveAccessibility() {
        // Add ARIA labels to tabs
        tabButtons.forEach((button, index) => {
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', button.classList.contains('active'));
            button.setAttribute('aria-controls', button.getAttribute('data-tab'));
            button.setAttribute('tabindex', button.classList.contains('active') ? '0' : '-1');
        });
        
        // Add ARIA labels to tab content
        tabContents.forEach(content => {
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('aria-labelledby', content.id);
        });
        
        // Add skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #667eea;
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    improveAccessibility();

    // Add performance optimization
    function optimizePerformance() {
        // Lazy load images if any
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        }
    }

    optimizePerformance();

    // Add error handling
    window.addEventListener('error', function(e) {
        console.error('Error occurred:', e.error);
        // You could add user-friendly error handling here
    });

    // Add analytics placeholder (replace with actual analytics code)
    function addAnalytics() {
        // Placeholder for Google Analytics or other analytics
        console.log('Analytics would be initialized here');
    }

    addAnalytics();

    // Add social sharing functionality
    function addSocialSharing() {
        const shareData = {
            title: 'Alejandro Rodríguez de la Cruz - Portafolio Profesional',
            text: 'Especialista IT | Líder de proyectos | Analista de datos | Desarrollador | QA',
            url: window.location.href
        };

        if (navigator.share) {
            const shareButton = document.createElement('button');
            shareButton.innerHTML = '<i class="fas fa-share-alt"></i> Compartir';
            shareButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 25px;
                padding: 12px 24px;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
            `;
            
            shareButton.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            shareButton.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            shareButton.addEventListener('click', async () => {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.log('Error sharing:', err);
                }
            });
            
            document.body.appendChild(shareButton);
        }
    }

    addSocialSharing();

    console.log('Portafolio cargado exitosamente!');
});