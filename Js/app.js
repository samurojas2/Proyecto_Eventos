let iconos = []
let selecciones = []
let contar = 0

function cargarIconos() {
    iconos = [
    '<img src="../img/amazon.jpg"><img/>',
    '<img src="../img/aguas.jpg"><img/>',
    '<img src="../img/amazoni.jpg"><img/>',
    '<img src="../img/Amazonie.jpg"><img/>',
    '<img src="../img/arapaima.jpg" ></img>',
    '<img src="../img/canaima.jpg"><img/>',
    '<img src="../img/delfin.jpg"><img/>',
    '<img src="../img/Indian.jpg"><img/>',
    '<img src="../img/Jaguar.jpg"><img/>',
    '<img src="../img/rio.jpg"><img/>',
    '<img src="../img/victoria.jpg"><img/>',
    '<img src="../img/amazonia.jpg"><img/>',
    ]
    
    iconos.sort(function() { return 0.5 - Math.random() });
}


function nuevoJuego(){
    const boton = document.getElementById("tablero")

    boton.innerHTML = `<button class="nuevoJuego" onclick="location.reload()">Nuevo Juego</button>`;

}

function mostrarModal() {
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');
    const point = document.getElementById('puntos')

    // Muestra el modal automáticamente al llamar a la función

    modal.classList.add('modal--show');
    point.innerHTML = `Tu puntaje fué: ${contar}`

    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        let intentos2 = document.getElementById("contador")
        intentos2.innerHTML = ``
        modal.classList.remove('modal--show');
        nuevoJuego();
    });
}

function generarTablero(facil){
    cargarIconos()
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < facil; i++) {
        tarjetas.push(`
            <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                    <i class="fa-regular fa-circle-question"></i>
                </div>
            </div>
        </div>`)
        if (i%2==1){
            iconos.splice(0,1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML=tarjetas.join('')
}

function seleccionarTarjeta(i){
    let intentos = document.getElementById("contador")
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {

        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }

    if (selecciones.length == 2){
        deseleccionar(selecciones)
        selecciones = []

        contar++;
        intentos.innerHTML = `Intentos: ${contar}`
    }
}

function deseleccionar(selecciones){
    setTimeout(() => {
        
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])

        if(trasera1.innerHTML != trasera2.innerHTML){

            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"

        }else{

            trasera1.style.visibility = "hidden"
            trasera2.style.visibility = "hidden"
            setTimeout(verificarTarjetasOcultas, 500);
        }
    }, 500);
}

function verificarTarjetasOcultas() {
    // Obtén todas las tarjetas
    let tarjetas = document.getElementsByClassName('cara trasera');
    
    // Verifica si todas las tarjetas están ocultas
    for (let i = 0; i < tarjetas.length; i++) {
        if (tarjetas[i].style.visibility != 'hidden') {
            return; // Si alguna tarjeta no está oculta, simplemente retorna
        }
    }
    
    // Si todas las tarjetas están ocultas, muestra una alerta
    mostrarModal();
    
}
