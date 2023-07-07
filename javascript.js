// Api news
let key = '3a8c4bda836045938acb956d1ca24988';
let pais = 'ar';
let topic = 'bancos';
let url = `https://newsapi.org/v2/top-headlines?country=${pais}&apiKey=${key}`;

let mostrarNoticias = document.getElementById('news');

fetch(url)
.then((response) => response.json())
.then((dato) => {
    console.log(dato);

    let noticias = dato.articles;
    noticias.map(function (numero) {
    let div = document.createElement('news');
    div.innerHTML = `<br>
                    
                        <h1>${numero.title}</h1>
                        <h2>${numero.publishedAt}</h2>
                        <h3>${numero.author}</h3>`;

    mostrarNoticias.appendChild(div);
    });
});

// Obtener el botón por su id
let verificarBtn = document.getElementById("verificarBtn");

// Obtener el campo de fecha de nacimiento
let fechaNacimientoInput = document.getElementById("fechaNacimiento");

// Asignar el evento al botón
verificarBtn.addEventListener("click", verificarEdad);

// Verificar la edad del usuario
function verificarEdad() {
    let fechaNacimiento = fechaNacimientoInput.value;
    let fechaActual = new Date();

    // Calcular la diferencia de años
    let edad = fechaActual.getFullYear() - new Date(fechaNacimiento).getFullYear();

    if (edad >= 18) {
        // Mostrar el contenido de la página
        document.getElementById("ageVerificationModal").style.display = "none";
        document.getElementById("content").style.display = "block";
        document.body.classList.remove("modal-open"); // Remover clase modal-open del body
    } else {
        // Mostrar mensaje de error en el modal y agregar animación "swing"
        let modal = document.getElementById("ageVerificationModal");
        modal.classList.add("animate__animated","animate__wobble");

        var errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.innerText = "Debe ser mayor de 18 años para acceder al contenido.";
    
        modal.appendChild(errorMessage);
    
        // Remover la clase "error" después de la animación
        modal.addEventListener("animationend", function () {
        modal.classList.remove("animate__animated","animate__wobble");
        });


        // Mantener el mensaje de error después de la animación
        modal.addEventListener("animationiteration", function () {
        errorMessage.style.display = "block";
        });
    
        // Desaparecer el mensaje de error después de 2 segundos
        setTimeout(function () {
        errorMessage.style.display = "none";
        }, 3000);
    }
    }
// Agregar evento de teclado para activar el botón "Verificar" al presionar Enter
fechaNacimientoInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { // Código de tecla "Enter"
        event.preventDefault();
        verificarEdad();
    }
});




//listas de bancos


// Definición del objeto modelo para los bancos
function banco (nombre, monto_minimo, interes_30, interes_60, interes_90, interes_180, interes_365_tna) {
    this.nombre = nombre;
    this.monto_minimo = monto_minimo;
    this.interes_30 = interes_30;
    this.interes_60 = interes_60;
    this.interes_90 = interes_90;
    this.interes_180 = interes_180;
    this.interes_365_tna = interes_365_tna;
}

// Creación de los objetos bancos usando el objeto modelo
let bancos = [
    new banco("Banco de la Nacion", 1500, 7.97, 15.94, 23.9, 47.83, 97),
    new banco("Banco Santander", 500, 8.1, 16.2, 32.4, 48.6, 97),
    new banco("Banco Galicia", 1000, 8.1, 16, 32.4, 48.6, 97),
    new banco("Banco Provincia", 1000, 8.1, 15.94, 24.3, 48.6, 97.2),
    new banco("Banco BBVA", 1000, 7.9, 15.94, 24.18, 48.6, 97),
    new banco("Banco Macro", 1000, 0.5, 0.5, 0.5, 0.5, 97),
    new banco("Banco HSBC", 300, 8.1, 16.2, 24.3, 48.6, 97.2),
    new banco("Banco Credicoop", 1000, 0.5, 0.5, 0.5, 0.5, 97),
    new banco("Banco ICBC", 1000, 0.5, 0.5, 0.5, 0.5, 97),
    new banco("Banco Ciudad", 1000, 0.5, 0.5, 0.5, 0.5, 97)
];


// Obtener el botón por su id
let calcularBtn = document.getElementById("calcularBtn");

// Asignar el evento al botón
calcularBtn.addEventListener("click", calcularPlazoFijo);


function calcularPlazoFijo() {
    // Obtener los valores seleccionados por el usuario
    let selectBanco = document.getElementById("banco");
    let bancoSeleccionado = selectBanco.value;

    let monto = parseFloat(document.getElementById("monto").value);

    let selectPlazo = document.getElementById("plazo");
    let plazoSeleccionado = parseInt(selectPlazo.value);

    // Buscar el banco en el array de bancos
    let banco = bancos.find(function (b) {
    return b.nombre.toLowerCase() === bancoSeleccionado.toLowerCase();
    });

    // Verificar si se encontró el banco
    if (!banco) {
    mostrarMensaje("Banco no encontrado. Intente nuevamente.");
    return;
    }

    // Verificar si el monto es válido
    if (isNaN(monto) || monto < banco.monto_minimo) {
    mostrarMensaje(
        "Monto inválido. El monto mínimo es de " + banco.monto_minimo + "."
    );
    return;
    }

    // Calcular los intereses para el plazo seleccionado
    let interes = (banco["interes_" + plazoSeleccionado] / 100) * monto;

    // Calcular la tasa de interés anual
    let tasaAnual = banco.interes_365_tna;

    // Mostrar el título de los resultados
    let resultadosTitulo = document.getElementById("resultadosTitulo");
    resultadosTitulo.style.display = "block";

    // Mostrar los resultados
    let resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = `
        <p>Resultados del plazo fijo en ${banco.nombre}:</p>
        <p>Monto ingresado: $${monto.toFixed(2)}</p>
        <p>Intereses a ${plazoSeleccionado} días: $${interes.toFixed(2)}</p>
        <p>Tasa de interés anual: ${tasaAnual}%</p>
    `;

    // Mostrar el div de los resultados
    resultadosDiv.style.display = "block";


    

    // Guardar los resultados en el almacenamiento local
    let resultados = {
    banco: banco.nombre,
    monto: monto.toFixed(2),
    interes: interes.toFixed(2),
    tasaAnual: tasaAnual,
    };
    localStorage.setItem("plazoFijo", JSON.stringify(resultados));
}


calcularPlazoFijo();

