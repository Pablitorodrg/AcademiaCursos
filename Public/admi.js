// ---- LOGIN PASSWORD ----
(function() {
    var overlay = document.getElementById('login-overlay');
    var pass = document.getElementById('login-pass');
    var btn = document.getElementById('login-btn');
    var error = document.getElementById('login-error');

    if (!overlay || !pass || !btn) return;

    function verificar() {
        if (pass.value === 'admin123') {
            overlay.style.display = 'none';
            cargarEstadoProceso();
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

const API = 'http://localhost:4000/cursos';

function mostrarSeccion(id) {
    document.querySelectorAll('.seccion').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    document.querySelectorAll('.navbar-links .nav-link').forEach(l => l.classList.remove('active'));
    document.querySelector(`.navbar-links .nav-link[data-section="${id}"]`)?.classList.add('active');
    document.getElementById('navbarLinks')?.classList.remove('open');
    if(id === 'cursos') cargarCursos();
    if(id === 'inscripciones') { cargarInscripciones(); document.getElementById('search-inscripciones').value = ''; }
    if(id === 'preinscripciones') { cargarPreinscripciones(); document.getElementById('search-preinscripciones').value = ''; }
}

function filtrarTabla(seccion) {
    const input = document.getElementById(`search-${seccion}`);
    const filtro = input.value.toLowerCase();
    const tbody = document.getElementById(seccion === 'inscripciones' ? 'cuerpo-inscripciones' : 'cuerpo-preinscripciones');
    const filas = tbody.getElementsByTagName('tr');
    for (let fila of filas) {
        let coincide = false;
        const celdas = fila.getElementsByTagName('td');
        for (let celda of celdas) {
            if (celda.textContent.toLowerCase().includes(filtro)) {
                coincide = true;
                break;
            }
        }
        fila.style.display = coincide ? '' : 'none';
    }
}

document.getElementById('navbarToggle')?.addEventListener('click', () => {
    document.getElementById('navbarLinks')?.classList.toggle('open');
});

// ---- CURSOS ----
async function cargarCursos() {
    const res = await fetch(API);
    const data = await res.json();
    const iconMap = {
        'DESARROLLO WEB': '🌐',
        'PASTELERÍA': '🎂',
        'FISIOTERAPIA': '💚',
        'ESTÉTICA Y BIENESTAR': '✨',
        'TECNOLOGÍA Y ADMINISTRACIÓN': '⚙',
        'SALUD Y OFICIOS': '🏥',
        'IDIOMAS Y JURÍDICO': '⚖'
    };
    document.getElementById('cuerpo-tabla').innerHTML = data.map(c => `
        <tr>
            <td><span class="course-icon">${iconMap[c.area.toUpperCase()] || '📚'}</span> ${c.nombre}</td>
            <td><span class="area-badge area-${c.area.toLowerCase().replace(/[^a-z0-9]/g,'')}">${c.area}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-edit" onclick="prepararEdicion(${c.id}, '${c.nombre.replace(/'/g, "\\'")}', '${c.area.replace(/'/g, "\\'")}')">
                    <i class="bi bi-pencil-square"></i> Editar
                </button>
                <button class="btn btn-sm btn-delete" onclick="eliminarCurso(${c.id})">
                    <i class="bi bi-trash3"></i> Eliminar
                </button>
            </td>
        </tr>
    `).join('');
    document.getElementById('total-cursos').textContent = data.length;
}

async function agregarCurso() {
    const n = document.getElementById('nombre').value;
    const a = document.getElementById('area').value;
    if (!n.trim()) return;
    await fetch(API, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ nombre: n, area: a }) });
    document.getElementById('nombre').value = '';
    cargarCursos();
}

async function eliminarCurso(id) {
    if(confirm("¿Eliminar?")) { await fetch(`${API}/${id}`, { method: 'DELETE' }); cargarCursos(); }
}

function prepararEdicion(id, n, a) {
    document.getElementById('nombre').value = n; document.getElementById('area').value = a;
    const b = document.getElementById('btn-accion');
    b.innerHTML = '<i class="bi bi-check-lg"></i> Guardar Cambios';
    b.setAttribute("onclick", `actualizarCurso(${id})`);
}

async function actualizarCurso(id) {
    const n = document.getElementById('nombre').value;
    const a = document.getElementById('area').value;
    await fetch(`${API}/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ nombre: n, area: a }) });
    const b = document.getElementById('btn-accion');
    b.innerHTML = '<i class="bi bi-plus-lg"></i> Agregar Curso';
    b.setAttribute("onclick", "agregarCurso()");
    document.getElementById('nombre').value = '';
    cargarCursos();
}

// ---- INSCRIPCIONES ----
async function cargarInscripciones() {
    const res = await fetch('http://localhost:4000/solicitudes/inscripciones');
    const data = await res.json();
    document.getElementById('cuerpo-inscripciones').innerHTML = data.map(i => `
        <tr>
            <td><span class="fw-semibold">${i.num}</span></td>
            <td>${i.nombre} ${i.apellido}</td>
            <td>${i.whatsapp}</td>
            <td>${i.cedula}</td>
            <td>${i.correo}</td>
            <td>${i.grado_instruccion}</td>
            <td>${i.trabaja_actualmente ? '<span class="text-success">Sí</span>' : '<span class="text-secondary">No</span>'}</td>
            <td>${i.direccion_habitacion}</td>
            <td>${i.condicion_fisica_cognitiva}</td>
            <td>${i.referencia}</td>
            <td>${i.monto ? 'Bs. ' + parseFloat(i.monto).toFixed(2) : '-'}</td>
            <td>${i.edad || '-'}</td>
            <td>${i.fecha_nacimiento ? new Date(i.fecha_nacimiento).toLocaleDateString() : '-'}</td>
            <td>${i.experiencia === 'si' ? '<span class="text-success">Sí</span>' : '<span class="text-secondary">No</span>'}</td>
            <td>${new Date(i.fecha_registro).toLocaleDateString()}</td>
            <td>${i.curso_select}</td>
        </tr>
    `).join('');
}

async function cargarPreinscripciones() {
    const res = await fetch('http://localhost:4000/solicitudes/preinscripciones');
    const data = await res.json();
    document.getElementById('cuerpo-preinscripciones').innerHTML = data.map(p => `
        <tr>
            <td><span class="fw-semibold">${p.num}</span></td>
            <td>${p.nombre} ${p.apellido}</td>
            <td>${p.whatsapp}</td>
            <td>${new Date(p.fecha_registro).toLocaleDateString()}</td>
            <td>${p.curso_select}</td>
        </tr>
    `).join('');
}

// ---- CONTROL DE PROCESO ----
async function cargarEstadoProceso() {
    try {
        const res = await fetch('http://localhost:4000/solicitudes/proceso-actual');
        const data = await res.json();
        document.getElementById('estado-proceso').textContent = data.proceso_actual;
        document.getElementById('toggle-label').textContent =
            data.proceso_actual === 'PREINSCRIPCION' ? 'INSCRIPCION' : 'PREINSCRIPCION';
        document.getElementById('btn-toggle-proceso').className =
            data.proceso_actual === 'PREINSCRIPCION' ? 'btn btn-toggle-proceso to-inscripcion' : 'btn btn-toggle-proceso to-preinscripcion';
    } catch (e) {
        console.error('Error al cargar estado del proceso:', e);
    }
}

async function toggleProceso() {
    const actual = document.getElementById('estado-proceso').textContent;
    const nuevo = actual === 'PREINSCRIPCION' ? 'INSCRIPCION' : 'PREINSCRIPCION';
    await fetch('http://localhost:4000/solicitudes/cambiar-proceso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nuevoEstado: nuevo })
    });
    cargarEstadoProceso();
}

cargarCursos();
