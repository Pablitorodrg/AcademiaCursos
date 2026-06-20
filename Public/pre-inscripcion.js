document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('preForm');
    const btnPre = document.getElementById('btnPre');
    const btnText = btnPre.querySelector('.btn-text');
    const btnLoading = btnPre.querySelector('.btn-loading');
    const preSuccess = document.getElementById('preSuccess');
    const cursoSelect = document.getElementById('curso');

    // Animate fields in
    const animateFields = () => {
        const els = document.querySelectorAll('.animate-in');
        els.forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120);
        });
    };
    animateFields();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const datos = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            whatsapp: document.getElementById('whatsapp').value,
            curso_select: cursoSelect.value
        };

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        btnPre.classList.add('loading');
        btnPre.disabled = true;

        try {
            const res = await fetch('http://localhost:4000/solicitudes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const result = await res.json();
            if (res.ok) {
                form.style.display = 'none';
                preSuccess.style.display = 'block';
            } else {
                alert('Error: ' + (result.error || 'Error al registrar'));
            }
        } catch (error) {
            console.error('Error al enviar:', error); alert('Error de conexión con el servidor. Verifica que el servidor Express esté corriendo en http://localhost:4000');
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            btnPre.classList.remove('loading');
            btnPre.disabled = false;
        }
    });

});
