document.addEventListener('DOMContentLoaded', () => {

    const radioOptions = document.querySelectorAll('input[name="condicion_fisica_cognitiva"]');
    const explicacionContainer = document.getElementById('explicacionContainer');
    const explicacionInput = document.getElementById('explicacion');

    radioOptions.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'si') {
                explicacionContainer.classList.add('active');
                explicacionInput.setAttribute('required', 'true');
            } else {
                explicacionContainer.classList.remove('active');
                explicacionInput.removeAttribute('required');
                explicacionInput.value = '';
            }
        });
    });

    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const datos = {
            curso_select: document.getElementById('curso').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            cedula: document.getElementById('cedula').value,
            correo: document.getElementById('correo').value,
            whatsapp: document.getElementById('whatsapp').value,
            edad: document.getElementById('edad').value,
            fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
            grado_instruccion: document.getElementById('instruccion').value,
            trabaja_actualmente: document.getElementById('trabaja').value,
            direccion_habitacion: document.getElementById('direccion').value,
            condicion_fisica_cognitiva: document.querySelector('input[name="condicion_fisica_cognitiva"]:checked')?.value || 'no',
            experiencia: document.querySelector('input[name="experiencia"]:checked')?.value || 'no',
            referencia: document.getElementById('referencia').value,
            monto: document.getElementById('monto').value
        };

        try {
            const res = await fetch('http://localhost:4000/api/inscripciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const result = await res.json();
            if (result.success) {
                form.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            alert('Error de conexión con el servidor');
        }
    });

});
