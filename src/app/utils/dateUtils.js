
export const convertirFechaTexto = (fecha)=>{
    const fechaObj = new Date(fecha);
    const opciones = {
        timeZone: "UTC",
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
      return fechaObj.toLocaleDateString("es-MX", opciones);
}


export const obtenerNumeroSemana = (fecha)=>{
  const fechanueva = new Date(fecha);
  const primerDia = new Date(fechanueva.getFullYear(), 0, 1);
  const diferencia = (fechanueva - primerDia) / 86400000;
  const numeroSemana = Math.ceil((diferencia + primerDia.getDay() + 1) / 7);
  return numeroSemana.toString();
}
