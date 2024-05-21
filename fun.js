 // Datos de ejemplo
let tareas = [
    { id: 1, tarea: "Hacer la tarea" },
    { id: 2, tarea: "Leer un libro" },
    { id: 3, tarea: "Salir a caminar" }
];

// Función para renderizar las tareas
function renderizarTareas(tareasRenderizar) {
    const cuerpoTabla = document.querySelector('#taskTable tbody');
    cuerpoTabla.innerHTML = '';
    tareasRenderizar.forEach(tarea => {
        const fila = `<tr>
        <td class="center-text">${tarea.tarea}</td>
        <td>
            <div class="button-container">
                <button onclick="abrirModal(${tarea.id})"><i class="fas fa-edit"></i> Editar</button>
                <button class="btn-delete" onclick="borrarTarea(${tarea.id})"><i class="fas fa-trash-alt"></i> Eliminar</button>
            </div>
        </td>

    </tr>`;
cuerpoTabla.innerHTML += fila;
});
}

// Función para agregar tarea
function agregarTarea(nombreTarea) {
    const nuevaTarea = {
        id: tareas.length + 1,
        tarea: nombreTarea
    };
    tareas.push(nuevaTarea);
    renderizarTareas(tareas);
}

// Función para borrar tarea
function borrarTarea(idTarea) {
    tareas = tareas.filter(tarea => tarea.id !== idTarea);
    renderizarTareas(tareas);
}

// Función para abrir modal de edición de tarea
function abrirModal(idTarea) {
    const modal = document.getElementById('myModal');
    const inputEdit = document.getElementById('editTaskInput');
    const tarea = tareas.find(t => t.id === idTarea);
    inputEdit.value = tarea.tarea;
    modal.style.display = 'block';
    // Evento al presionar "Cerrar" en el modal
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    // Evento al presionar "Actualizar Tarea" en el modal
    const updateBtn = document.getElementById('updateTaskBtn');
    updateBtn.onclick = function() {
        const nuevaTarea = inputEdit.value.trim();
        if (nuevaTarea !== '') {
            tarea.tarea = nuevaTarea;
            renderizarTareas(tareas);
            modal.style.display = 'none';
        } else {
            alert('El nombre de la tarea no puede estar vacío!');
        }
    }
}

// Función para buscar tareas
function buscarTareas(consultaBusqueda) {
    const tareasFiltradas = tareas.filter(tarea =>
        tarea.tarea.toLowerCase().includes(consultaBusqueda.toLowerCase())
    );
    renderizarTareas(tareasFiltradas);
}

// Función para limpiar búsqueda y mostrar todas las tareas
function limpiarBusqueda() {
    document.getElementById('searchInput').value = '';
    renderizarTareas(tareas);
}

// Event listener para envío de formulario (Agregar Tarea)
document.getElementById('todoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const entradaTarea = document.getElementById('taskInput');
    const nombreTarea = entradaTarea.value.trim();
    if (nombreTarea !== '') {
        agregarTarea(nombreTarea);
        entradaTarea.value = '';
    } else {
        alert('El nombre de la tarea no puede estar vacío!');
    }
});

// Event listener para envío de formulario (Búsqueda)
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const entradaBusqueda = document.getElementById('searchInput');
    const consultaBusqueda = entradaBusqueda.value.trim();
    buscarTareas(consultaBusqueda);
});

// Event listener para el botón Limpiar Búsqueda
document.getElementById('clearSearch').addEventListener('click', function() {
    limpiarBusqueda();
});

// Renderizado inicial de tareas
renderizarTareas(tareas);