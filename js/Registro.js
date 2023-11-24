// Registro.js
const form = document.getElementById('form-creativity');

function generarNumeroAleatorio() {
    // Generar un número aleatorio de 5 dígitos
    return Math.floor(10000 + Math.random() * 90000);
}

function validarFormulario(event) {
    // Detener el envío del formulario por defecto
    event.preventDefault();

    // Verificar si el checkbox de términos está marcado
    var checkbox = document.getElementById("acepto");
    if (!checkbox.checked) {
        alert("Debes aceptar los Términos y Condiciones para enviar el formulario.");
        return false;
    }

    // Generar un número aleatorio de 5 dígitos
    const numeroAleatorio = generarNumeroAleatorio();

    // Añadir el número aleatorio al formulario
    const numeroAleatorioInput = document.createElement('input');
    numeroAleatorioInput.type = 'hidden';
    numeroAleatorioInput.name = 'Codigo';
    numeroAleatorioInput.value = numeroAleatorio;
    form.appendChild(numeroAleatorioInput);

    // Enviar el formulario a Google Apps Script
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
    })
    .then(response => response.json())
    .then(data => {
        // Realizar la redirección después de validar el formulario
        window.location.href = `/Bienvenido.html?numero=${numeroAleatorio}`;
    })
    .catch(error => {
        console.error('Error al enviar el formulario:', error);
    });

    // Asegúrate de que el formulario no se envíe de manera convencional
    return false;
}

// Agregar un evento al formulario para llamar a validarFormulario() en el evento submit
form.addEventListener('submit', validarFormulario);
