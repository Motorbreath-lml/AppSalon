use appsalon_mvc;
-- Traera toda la informacion de las 4 tablas, en donde existe una cita y la fecha indicada
SELECT * FROM citas 
LEFT OUTER JOIN usuarios ON citas.usuarioId=usuarios.id
LEFT OUTER JOIN citasservicios ON citasservicios.citaId=citas.id
LEFT OUTER JOIN servicios ON servicios.id=citasservicios.servicioId
WHERE fecha="2024-10-15";

-- Traera cierta informacion de las tablas
SELECT citas.id, citas.hora, CONCAT(usuarios.nombre, ' ', usuarios.apellido) as cliente,
usuarios.email, usuarios.telefono, servicios.nombre as servicio, servicios.precio
FROM citas 
LEFT OUTER JOIN usuarios ON citas.usuarioId=usuarios.id
LEFT OUTER JOIN citasservicios ON citasservicios.citaId=citas.id
LEFT OUTER JOIN servicios ON servicios.id=citasservicios.servicioId;