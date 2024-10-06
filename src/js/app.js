let paso = 1; // Paso son las secciones que se mostraran
const pasoInicial = 1;
const pasoFinal = 3;

// cuando todo el documento este cargado se ejecutara la funcion
document.addEventListener('DOMContentLoaded', function(){
  iniciarApp();
});

function iniciarApp(){
  mostrarSeccion(); // al cargar la pagina mostrara la seccion 1
  tabs(); // Cambia la seccion cuando se presionen los tabs
  botonesPaginador(); // Agrega o quita los botones del paginador
  paginaSiguiente();
  paginaAnterior();
}

function mostrarSeccion(){
  // Ocultar la seccion que tenga la clase de mostrar
  const seccionAterior = document.querySelector('.mostrar');
  if(seccionAterior){
    seccionAterior.classList.remove('mostrar');
  }

  // Seleccionar la seccion con el paso ...
  const pasoSelector = `#paso-${paso}`;
  const seccion = document.querySelector(pasoSelector);
  seccion.classList.add('mostrar');

  // Quita la clase actual a la tab anterior
  const tabAnterior = document.querySelector('.actual');
  if(tabAnterior);
    tabAnterior.classList.remove('actual')

  // Resalta el Tab actual
  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add('actual');
}

function tabs(){
  // Seleccionar todos los botones de la clase .tabs, regresa un arreglo
  const botones = document.querySelectorAll('.tabs button');
  botones.forEach(boton => { // Recorrer el arreglo
    boton.addEventListener('click', function(e){ // A cada elemento se le agrega un evento de click, este evento se manda como parametro con la variable e
      paso = parseInt(e.target.dataset.paso) // del evento se estrae el dataset personalizado que se llama paso
      mostrarSeccion();
      botonesPaginador();
    });
  }); 
}

function botonesPaginador(){
  const paginaAnterior = document.querySelector('#anterior');
  const paginaSiguiente = document.querySelector('#siguiente');

  if(paso === 1){
    paginaAnterior.classList.add('ocultar');
    paginaSiguiente.classList.remove('ocultar');
  } else if(paso === 3){
    paginaAnterior.classList.remove('ocultar');
    paginaSiguiente.classList.add('ocultar');
  }else{
    paginaAnterior.classList.remove('ocultar');
    paginaSiguiente.classList.remove('ocultar');
  }

  mostrarSeccion();
}

function paginaAnterior(){
  const paginaAnterior = document.querySelector('#anterior');
  paginaAnterior.addEventListener('click', function(){
    if(paso <= pasoInicial) return;
    paso--;
    botonesPaginador();
  });
}

function paginaSiguiente(){
  const paginaSiguiente = document.querySelector('#siguiente');
  paginaSiguiente.addEventListener('click', function(){
    if(paso >= pasoFinal) return;
    paso++;
    botonesPaginador();
  });
}