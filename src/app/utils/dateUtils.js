
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