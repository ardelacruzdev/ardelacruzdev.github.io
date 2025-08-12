// === Menú hamburguesa ===
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

// Cerrar menú al hacer clic en una pestaña (móvil)
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

// === Funcionalidad principal del sitio ===
document.addEventListener('DOMContentLoaded', function() {
    // Filtros del portafolio
    const buttons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projects.forEach(project => {
                const categories = project.getAttribute('data-category');
                if (filter === 'all' || (categories && categories.includes(filter))) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Navegación entre pestañas
    const tabButtons = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Año actual en el footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Animaciones al hacer scroll
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

    // Aplicar animaciones a elementos
    ['.timeline-item', '.education-card', '.tech-category', '.competency-item'].forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    });

    // Efecto hover en etiquetas de tecnología
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => tag.style.transform = 'scale(1.1)');
        tag.addEventListener('mouseleave', () => tag.style.transform = 'scale(1)');
    });

    // Efecto en el header al hacer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.style.boxShadow = window.pageYOffset > 100 
            ? '0 8px 16px rgba(0, 0, 0, 0.15)' 
            : '0 4px 6px rgba(0, 0, 0, 0.1)';
    });

    // Mejoras de accesibilidad
    function improveAccessibility() {
        tabButtons.forEach((button, index) => {
            button.setAttribute('role', 'tab');
            button.setAttribute('aria-selected', button.classList.contains('active'));
            button.setAttribute('aria-controls', button.getAttribute('data-tab'));
            button.setAttribute('tabindex', button.classList.contains('active') ? '0' : '-1');
        });

        tabContents.forEach(content => {
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('aria-labelledby', content.id);
        });

        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to content';
        skipLink.style.cssText = `
            position: absolute; top: -40px; left: 0; background: #667eea;
            color: white; padding: 8px; text-decoration: none; z-index: 100;
        `;
        skipLink.addEventListener('focus', () => skipLink.style.top = '0');
        skipLink.addEventListener('blur', () => skipLink.style.top = '-40px');
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    improveAccessibility();

    // Lazy loading de imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }

    // Compartir en redes sociales
    if (navigator.share) {
        const shareData = {
            title: 'Alejandro Rodríguez de la Cruz - Portafolio Profesional',
            text: 'Especialista IT | Líder de proyectos | Analista de datos | Desarrollador | QA',
            url: window.location.href
        };

        const shareButton = document.createElement('button');
        shareButton.innerHTML = '<i class="fas fa-share-alt"></i> Compartir';
        shareButton.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; border: none; border-radius: 25px; padding: 12px 24px; cursor: pointer; z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease;
        `;
        shareButton.addEventListener('mouseenter', () => shareButton.style.transform = 'scale(1.05)');
        shareButton.addEventListener('mouseleave', () => shareButton.style.transform = 'scale(1)');
        shareButton.addEventListener('click', () => navigator.share(shareData).catch(err => console.log('Error:', err)));
        document.body.appendChild(shareButton);
    }

    console.log('Portafolio cargado exitosamente!');
});