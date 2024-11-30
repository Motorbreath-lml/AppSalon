document.addEventListener('DOMContentLoaded', function(){
  iniciarApp();
});

function iniciarApp(){
  buscarPorFecha();
}

function buscarPorFecha(){
  const fechaInput = document.querySelector('#fecha');
  fechaInput.addEventListener('input', function(e){
    const fechaSeleccionada = e.target.value;

    // La siguiente linea redirecciona a la misma url pero le agrega el atributo fecha, esta fecha se maneja en PHP con get
    window.location = `?fecha=${fechaSeleccionada}`;
  });
}