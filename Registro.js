const scriptURL = "https://script.google.com/macros/s/AKfycbygS8NPD_RMI2xBZoVezLUUOyl2ctS2-mNuwPKoGIWxPMEsxGwV3M7aZfi1D7ZW1oXu/exec"

const form = document.forms['form-creativity']

function validarFormulario() {
    // Verificar si el checkbox de términos está marcado
    var checkbox = document.getElementById("acepto");
    if (!checkbox.checked) {
        alert("Debes aceptar los Términos y Condiciones para enviar el formulario.");
        return false;
    }
    
    window.location.href = "http://127.0.0.1:3000/Bienvenido.html";

    return true;

}