let paso = 1; // Paso son las secciones que se mostraran
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
  id:'',
  nombre: '',
  fecha: '',
  hora: '',
  servicios: []
}

// cuando todo el documento este cargado se ejecutara la funcion
document.addEventListener('DOMContentLoaded', function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion(); // al cargar la pagina mostrara la seccion 1
  tabs(); // Cambia la seccion cuando se presionen los tabs
  botonesPaginador(); // Agrega o quita los botones del paginador
  paginaSiguiente();
  paginaAnterior();

  consultarAPI(); // Consulta la API en el backend de PHP

  idCliente();

  nombreCliente(); // Añade el nombre del cliente al objeto de cita
  seleccionarFecha(); // Añade la fecha de la cita en el objeto
  seleccionarHora();

  mostrarResumen();
}

function mostrarSeccion() {
  // Ocultar la seccion que tenga la clase de mostrar
  const seccionAterior = document.querySelector('.mostrar');
  if (seccionAterior) {
    seccionAterior.classList.remove('mostrar');
  }

  // Seleccionar la seccion con el paso ...
  const pasoSelector = `#paso-${paso}`;
  const seccion = document.querySelector(pasoSelector);
  seccion.classList.add('mostrar');

  // Quita la clase actual a la tab anterior
  const tabAnterior = document.querySelector('.actual');
  if (tabAnterior);
  tabAnterior.classList.remove('actual')

  // Resalta el Tab actual
  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add('actual');
}

function tabs() {
  // Seleccionar todos los botones de la clase .tabs, regresa un arreglo
  const botones = document.querySelectorAll('.tabs button');
  botones.forEach(boton => { // Recorrer el arreglo
    boton.addEventListener('click', function (e) { // A cada elemento se le agrega un evento de click, este evento se manda como parametro con la variable e
      paso = parseInt(e.target.dataset.paso) // del evento se estrae el dataset personalizado que se llama paso
      mostrarSeccion();
      botonesPaginador();

      // if(paso==3){ //ya esta el codigo en botonesPaginador
      //   mostrarResumen();
      // }
    });
  });
}

function botonesPaginador() {
  const paginaAnterior = document.querySelector('#anterior');
  const paginaSiguiente = document.querySelector('#siguiente');

  if (paso === 1) {
    paginaAnterior.classList.add('ocultar');
    paginaSiguiente.classList.remove('ocultar');
  } else if (paso === 3) {
    paginaAnterior.classList.remove('ocultar');
    paginaSiguiente.classList.add('ocultar');

    mostrarResumen();
  } else {
    paginaAnterior.classList.remove('ocultar');
    paginaSiguiente.classList.remove('ocultar');
  }

  mostrarSeccion();
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector('#anterior');
  paginaAnterior.addEventListener('click', function () {
    if (paso <= pasoInicial) return;
    paso--;
    botonesPaginador();
  });
}

function paginaSiguiente() {
  const paginaSiguiente = document.querySelector('#siguiente');
  paginaSiguiente.addEventListener('click', function () {
    if (paso >= pasoFinal) return;
    paso++;
    botonesPaginador();
  });
}

// Funcion asincrona
async function consultarAPI() {
  try {
    const url = 'http://localhost:3000/api/servicios';
    const resultados = await fetch(url);
    const servicios = await resultados.json();
    mostrarServicios(servicios);
  } catch (error) {
    console.log(error);
  }
}

function mostrarServicios(servicios) {
  servicios.forEach(servicio => { // Recorrer todos los servicios
    const { id, nombre, precio } = servicio; // Destructurar cada servicios

    const nombreServicio = document.createElement('P');//Crear un parrafo, por convencion se pone el nombre en mayuscula de la etiqueta
    nombreServicio.classList.add('nombre-servicio');
    nombreServicio.textContent = nombre;

    const precioServicio = document.createElement('P');
    precioServicio.classList.add('precio-servicio');
    precioServicio.textContent = `$${precio}`; // Template string

    const servicioDiv = document.createElement('DIV');
    servicioDiv.classList.add('servicio');
    servicioDiv.dataset.idServicio = id;// dataset permite crear atributos personalizados, idServicio es una convencion que dara en el HTML data-id-servicio="id"
    //servicioDiv.onclick = seleccionarServicio;// Referencia a la funcion, cuando el click ocurra ya se ejecutara la funcion, en la funcion puede recibir el evento y de ahi sacar la informacion
    servicioDiv.onclick = function () { //Uso de callback
      seleccionarServicio(servicio);
    };

    //Agregar el nombre y precio del servicio al div
    servicioDiv.appendChild(nombreServicio);
    servicioDiv.appendChild(precioServicio);

    //Del cocumento seleccionamos el div con Id se servicios y agregamos los servicios.
    document.querySelector('#servicios').appendChild(servicioDiv);
  });
}

function seleccionarServicio(servicio) {
  const { id } = servicio;
  const { servicios } = cita; // Del objeto cita obtener el arreglo servicios

  // Identificar al elemento que se le da click
  const divServicio = document.querySelector(`[data-id-servicio="${id}"]`)

  // Comprobar si un servicio ya fue agregado
  if (servicios.some(agregado => agregado.id === id)) {//some itera sobre el arreglo, agregado representa un servicio(objeto) sobre servicios
    // Eliminarlo
    cita.servicios = servicios.filter(agregado => agregado.id !== id);
    divServicio.classList.remove('seleccionado');
  } else {
    //agregarlo
    cita.servicios = [...servicios, servicio];//El arreglo servios tendra el arreglo anterior mas el nuevo servicio, es una forma algo resfuscada para agregar un nuevo servicio al arreglo.
    //Agregar una clase al servicio seleccioando  
    divServicio.classList.add('seleccionado');
  }

  //console.log(cita);
}

function idCliente() {
  cita.id = document.querySelector('#id').value;
}

function nombreCliente() {
  cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector('#fecha');
  inputFecha.addEventListener('input', function (e) { // Se pasa el evento
    const dia = new Date(e.target.value).getUTCDay();// Delevento obtiene la fecha, se crea un nuevo objeto Date, de este se obtiene el numero de dia, 6 es sabado 0 es domigo
    if ([6, 0].includes(dia)) { // Si el dia esta en el arreglo, cae en fin de semana y no se trabaja en el Salon
      e.target.value = '';//Pone la fecha en limpio
      mostrarAlerta('Finaes de semana no permitidos', 'error', '.formulario');
    } else {
      cita.fecha = e.target.value;
    }
  });
}

function seleccionarHora() {
  const inputHora = document.querySelector('#hora');
  inputHora.addEventListener('input', function (e) {
    const horaCita = e.target.value;
    const hora = horaCita.split(":")[0];
    if (hora < 10 || hora > 18) {
      e.target.value = '';
      cita.hora = '';
      mostrarAlerta('Hora No Válida', 'error', '.formulario');
    } else {
      cita.hora = e.target.value;
      //console.log(cita);
    }
  });
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
  // Revisar si ya habia una alerta
  const alertaPrevia = document.querySelector('.alerta');
  if (alertaPrevia) {
    alertaPrevia.remove();
  }

  // Crear alerta colocando tipo y mensaje
  const alerta = document.createElement('DIV');
  alerta.textContent = mensaje;
  alerta.classList.add('alerta');
  alerta.classList.add(tipo);

  // Agregar la alerta al formulrio
  const formulario = document.querySelector(elemento);
  formulario.appendChild(alerta);

  if (desaparece) {
    // Quitar la alerta despues de 3 segundos
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }

}

function mostrarResumen() {
  const resumen = document.querySelector('.contenido-resumen');

  // Limpiar el contenido de Resumen
  while(resumen.firstChild){
    resumen.removeChild(resumen.firstChild);
  }

  if (Object.values(cita).includes('') || cita.servicios.length === 0) {
    mostrarAlerta('Faltan datos de Servicios, Fecha u Hora', 'error', '.contenido-resumen',false);
    return;
  }

  // Formatear el div resumen
  const {nombre, fecha, hora, servicios}=cita;

  // Heading para servicios en Resumen
  const headingServicios = document.createElement('H3');
  headingServicios.textContent = 'Resumen de servicios';
  resumen.appendChild(headingServicios);

  // Mostrar los servicos seleccionados al usuario
  servicios.forEach(servicio => {
    const { id, precio, nombre } = servicio;
    const contenedorServicio = document.createElement('DIV');
    contenedorServicio.classList.add('contenedor-servicio');

    const textoServicio = document.createElement('P');
    textoServicio.textContent = nombre;

    const precioServicio = document.createElement('P');
    precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);

    resumen.appendChild(contenedorServicio);
  });

  // Heading para cita en Resumen
  const headingCita = document.createElement('H3');
  headingCita.textContent = 'Resumen de Cita';
  resumen.appendChild(headingCita);

  const nombreCliente = document.createElement('P');
  nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

  // Formatear la fecha en español, no era necesario todo el proceso de iniciar tantas fechas
  // fechaFormateada = fecha.toLocaleDateString('es-MX',{weekday:'long', year:'numeric', month:'long', day:'numeric'})
  const fechaObj = new Date(fecha);
  const mes = fechaObj.getMonth();
  const dia = fechaObj.getDate() + 2; // por el desfase de Date y por el uso de UTC hay dos dias de desfase
  const year = fechaObj.getFullYear();

  const fechaUTC = new Date(Date.UTC(year, mes, dia));
  const opciones = {weekday:'long', year:'numeric', month:'long', day:'numeric'};// Parametros par poner la fecha como mejor nos parezca
  const fechaFormateada = fechaUTC.toLocaleDateString('es-MX',opciones); // Poner la fecha como se acostumbra en Mexico 

  const fechaCliente = document.createElement('P');
  fechaCliente.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;

  const horaCita = document.createElement('P');
  horaCita.innerHTML = `<span>Hora:</span> ${hora} Horas`;

  // Boton para crear una cita
  const botonReservar = document.createElement('BUTTON');
  botonReservar.classList.add('boton');
  botonReservar.textContent = 'Reservar Cita';
  botonReservar.onclick = reservarCita;

  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCliente);
  resumen.appendChild(horaCita);

  resumen.appendChild(botonReservar);
}

async function reservarCita(){
  const {nombre, fecha, hora, servicios, id} =cita;
  const idServicio = servicios.map(servicio => servicio.id);

  const datos = new FormData();
  //datos.append('nombre', nombre);
  datos.append('fecha', fecha);
  datos.append('hora', hora);
  datos.append('usuarioId', id);
  datos.append('servicios', idServicio);

  // Petición hacia la api
  const url ='http://localhost:3000/api/citas';
  
  // Por si la peticion falla
  try {
    const respuesta = await fetch(url,{
      method:'POST',
      body: datos
    });

    const resultado = await respuesta.json();
    console.log(resultado);
    
    if(resultado.resultado){ // Si la respuesta es afirmativa
      Swal.fire({ // Se crea una alerta con sweet alert
        title: "Cita Creada",
        text: "Tu cita fue creada correctamente",
        icon: "success",
        confirmButtonText: "OK"
      }).then(()=>{ // Cuando la cita fue creada se recarga la pagina
        setTimeout(()=>{
          window.location.reload();
        }, 3000);
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un error al guardar la cita",      
    });
  }

  

  //Una forma de debuguear lo que se manda
  //console.log([...datos]);
}