const form = document.getElementById('form-creativity');
var contador = obtenerContador() || 0;
var registrosCompletados = obtenerRegistrosCompletados() || 0;

function obtenerContador() {
    return parseInt(localStorage.getItem('contador'), 10) || 0;
}

function guardarContador() {
    localStorage.setItem('contador', contador.toString());
}

function obtenerRegistrosCompletados() {
    return parseInt(localStorage.getItem('registrosCompletados'), 10) || 0;
}

function guardarRegistrosCompletados() {
    localStorage.setItem('registrosCompletados', registrosCompletados.toString());
}

function generarNumeroContador() {
    // Incrementar el contador solo si se han completado 5 registros
    if (contador > 0 && contador % 5 === 0) {
        registrosCompletados++;
        guardarRegistrosCompletados();
        contador = 0;  // Reiniciar el contador para el próximo grupo de 5 registros
    }

    // Formatear el contador para que tenga tres dígitos
    var numero = registrosCompletados < 10 ? '00' + registrosCompletados : registrosCompletados < 100 ? '0' + registrosCompletados : registrosCompletados.toString();

    // Concatenar el prefijo "MS" y el número formateado
    var resultado = "MS" + numero;

    // Incrementar el contador para el siguiente registro dentro del grupo de 5
    contador++;

    // Guardar el contador actualizado en localStorage
    guardarContador();

    return resultado;
}

function validarFormulario(event) {
    event.preventDefault();

    var checkbox = document.getElementById("acepto");
    if (!checkbox.checked) {
        alert("Debes aceptar los Términos y Condiciones para enviar el formulario.");
        return false;
    }

    const numeroAleatorio = generarNumeroContador();

    const numeroAleatorioInput = document.createElement('input');
    numeroAleatorioInput.type = 'hidden';
    numeroAleatorioInput.name = 'codigo';
    numeroAleatorioInput.value = numeroAleatorio;
    form.appendChild(numeroAleatorioInput);

    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = `/Bienvenido.html?numero=${numeroAleatorio}`;
    })
    .catch(error => {
        console.error('Error al enviar el formulario:', error);
    });

    return false;
}

form.addEventListener('submit', validarFormulario);
