
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          nav.classList.remove('open');
        }
      });
    });

    // Intersection observer for fade-in animation
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.course-card, .feature-item, .cta-banner').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    function mostrarAdminLink() {
        const link = document.getElementById('admin-link');
        if (link) {
            link.style.opacity = '1';
            link.style.pointerEvents = 'auto';
            link.style.position = 'static';
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'F2') {
            e.preventDefault();
            mostrarAdminLink();
        }
    });

    // Triple click/tap en el logo — revela enlace admin
    // El click normal no hace nada (navegación desactivada)
    let clickTimes = [];
    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        const now = Date.now();
        clickTimes = clickTimes.filter(t => now - t < 500);
        clickTimes.push(now);
        if (clickTimes.length >= 3) {
            clickTimes = [];
            mostrarAdminLink();
        }
    });

    async function cargarProcesoActual() {
        try {
            const res = await fetch('http://localhost:4000/solicitudes/proceso-actual');
            const data = await res.json();
            const btnInsc = document.getElementById('btn-inscribete');
            const btnPre = document.getElementById('btn-preinscripcion');
            if (!btnInsc || !btnPre) return;
            if (data.proceso_actual === 'INSCRIPCION') {
                btnInsc.classList.remove('d-none');
                btnPre.classList.add('d-none');
            } else {
                btnInsc.classList.add('d-none');
                btnPre.classList.remove('d-none');
            }
        } catch (e) {
            console.error('Error al obtener proceso:', e);
        }
    }

    cargarProcesoActual();
    setInterval(cargarProcesoActual, 5000);

    
(function() {
    var overlay = document.getElementById('login-overlay');
    var pass = document.getElementById('login-pass');
    var btn = document.getElementById('login-btn');
    var error = document.getElementById('login-error');

    function verificar() {
        if (pass.value === 'admin123') {
            overlay.style.display = 'none';
        } else {
            error.style.display = '';
            pass.value = '';
            pass.focus();
        }
    }

    btn.addEventListener('click', verificar);
    pass.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') verificar();
        if (e.key === 'Escape') window.location.href = 'index.html';
    });
})();
