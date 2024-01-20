let iconos = []
let selecciones = []
let contar = 0

generarTablero()

function cargarIconos() {
    iconos = [
    '<img src="../img/amazon.jpeg"><img/>',
    '<i class="fa-sharp fa-solid fa-heart"></i>',
    '<i class="fa-solid fa-headphones"></i>',
    '<i class="fa-solid fa-volleyball"></i>',
    '<i class="fa-solid fa-dice-six"></i>',
    '<i class="fa-solid fa-chess-knight"></i>',
    '<i class="fa-solid fa-hand"></i>',
    '<i class="fa-solid fa-music"></i>',
    '<i class="fa-solid fa-cloud"></i>',
    '<i class="fa-solid fa-bell"></i>',
    '<i class="fa-solid fa-bolt"></i>',
    '<img src="../img/amazonia.jpg"><img/>',
    ]
}

function nuevoJuego(){
    const boton = document.getElementById("tablero")

    boton.innerHTML = `<button class="novoJogo" onclick="location.reload()">Nuevo Juego</button>`;

}

function mostrarModal() {
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.modal__close');

    // Muestra el modal automáticamente al llamar a la función

    modal.classList.add('modal--show');

    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        let intentos2 = document.getElementById("contador")
        intentos2.innerHTML = ``
        modal.classList.remove('modal--show');
    });
}

function generarTablero(){
    cargarIconos()
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < 4; i++) {
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
    nuevoJuego();
}
