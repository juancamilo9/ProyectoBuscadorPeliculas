let datosJson;
let url;
let seleccionConsulta = document.getElementById("seleccionConsulta");
let listaElementos = document.getElementById("miListado");
let boton = document.getElementById("buscar");
let input = document.getElementById("busqueda");


// funciones
function establecerDatos(event){
    if(seleccionConsulta.value == "peliculas")
        url = './peliculas.json';
    else
        url = './series.json';
    console.log(url);
    let evento = new CustomEvent('avisoCambio');
    seleccionConsulta.dispatchEvent(evento);
}

function cambioModo(){
    alert(`Ahora el archovo base es: ${event.target.value}`)
}

function verificarIngresos(event){
    if((event.keyCode < 65 || event.keyCode > 90) && event.keyCode != 32 && event.keyCode != 8)
        event.preventDefault;
}


function buscar(){
    listaElementos.innerHTML = "";
    console.log(typeof(url));
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(function(salida){
        datosJson = salida.data
        for(let item of datosJson){
            if(item.nombre.startsWith(input.value.toUpperCase())){
                let p = document.createElement("p");
                p.id= item.nombre;
                p.innerHTML = item.sinopsis;
                p.style.display='none';

                let li = document.createElement("li");
                li.innerHTML = item.nombre;
                li.addEventListener('mouseover', function(){
                    let p = document.getElementById(item.nombre);
                    p.style.display = 'block';
                })

                li.addEventListener('mouseout', function(){
                    let p = document.getElementById(item.nombre);
                    p.style.display = 'none';
                })

                li.appendChild(p);
                listaElementos.appendChild(li);
            }
        }
    }).catch(function(error){
        console.log(error);
    });
}
// ESCUCHADORES DE EVENTOS

seleccionConsulta.addEventListener('change',establecerDatos);
seleccionConsulta.addEventListener('avisoCambio',cambioModo);
input.addEventListener('keydown', verificarIngresos);
boton.addEventListener('click', buscar)