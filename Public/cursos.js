const COLORS = {
    'ESTÉTICA Y BIENESTAR': 'teal',
    'TECNOLOGÍA Y ADMINISTRACIÓN': 'blue',
    'SALUD Y OFICIOS': 'green',
    'IDIOMAS Y JURÍDICO': 'orange'
};

const ICONS = {
    'ESTÉTICA Y BIENESTAR': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 6 6 6 9c0 2 1 4 3 5v8h6v-8c2-1 3-3 3-5 0-3-2-7-6-7zm-2 18v-2h4v2h-4z"/></svg>`,
    'TECNOLOGÍA Y ADMINISTRACIÓN': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 14H3V5h18v12zM5 15h14v2H5v-2zm0-8h14v6H5V7z"/></svg>`,
    'SALUD Y OFICIOS': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`,
    'IDIOMAS Y JURÍDICO': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
};

const DECOS = {
    'ESTÉTICA Y BIENESTAR': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>`,
    'TECNOLOGÍA Y ADMINISTRACIÓN': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
    'SALUD Y OFICIOS': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    'IDIOMAS Y JURÍDICO': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>`
};

async function cargarCursos() {
    const container = document.getElementById('cursos-container');
    if (!container) return;
    try {
        const res = await fetch('http://localhost:4000/cursos');
        const cursos = await res.json();
        if (!cursos.length) {
            container.innerHTML = '<p class="text-center text-muted">No hay cursos disponibles.</p>';
            return;
        }
        const agrupados = {};
        cursos.forEach(c => {
            const area = c.area.toUpperCase();
            if (!agrupados[area]) agrupados[area] = [];
            agrupados[area].push(c);
        });
        container.innerHTML = Object.entries(agrupados).map(([area, lista]) => {
            const color = COLORS[area] || 'teal';
            const icon = ICONS[area] || ICONS['ESTÉTICA Y BIENESTAR'];
            const deco = DECOS[area] || DECOS['ESTÉTICA Y BIENESTAR'];
            const titulo = area.replace('Y', '<br>');
            return `
                <div class="course-card ${color}">
                    <div class="course-icon">${icon}</div>
                    <h3 class="course-title">${titulo}</h3>
                    <ul class="course-list">
                        ${lista.map(c => `<li>${c.nombre}</li>`).join('')}
                    </ul>
                    <div class="course-deco">${deco}</div>
                </div>
            `;
        }).join('');
    } catch (err) {
        container.innerHTML = '<p class="text-center text-muted">Error al cargar los cursos.</p>';
        console.error('Error al cargar cursos:', err);
    }
}

document.addEventListener('DOMContentLoaded', cargarCursos);