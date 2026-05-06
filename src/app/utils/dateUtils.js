
/**
 * Convierte una fecha en formato de texto legible
 *
 * @param {string|Date} fecha - La fecha a convertir
 * @returns {string} - Fecha en formato de texto, por ejemplo, "lunes, 1 de enero de 2023"
 */
export const convertirFechaTexto = (fecha) => {
    try {
        // Crear un objeto Date a partir del parámetro fecha
        const fechaObj = new Date(fecha);

        // Verificar si la fecha es válida
        if (isNaN(fechaObj.getTime())) {
            throw new Error('La fecha proporcionada no es válida');
        }

        // Opciones para formatar la fecha en español (México)
        const opciones = {
            timeZone: 'UTC',
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        };

        // Convertir la fecha a un string legible
        return fechaObj.toLocaleDateString('es-MX', opciones);
    } catch (error) {
        console.error('Error al convertir la fecha:', error.message);
        return 'Fecha inválida';
    }
};

/**
 * Obtiene el número de semana del año para una fecha dada
 *
 * @param {string|Date} fecha - La fecha para calcular la semana
 * @returns {string} - Número de semana como cadena, por ejemplo, "1"
 */
export const obtenerNumeroSemana = (fecha) => {
    try {
        // Crear un objeto Date a partir del parámetro fecha
        const nuevaFecha = new Date(fecha);

        // Verificar si la fecha es válida
        if (isNaN(nuevaFecha.getTime())) {
            throw new Error('La fecha proporcionada no es válida');
        }

        // Conseguir el primer día del año de la fecha dada
        const primerDiaDelAño = new Date(nuevaFecha.getFullYear(), 0, 1);

        // Calcular la diferencia en días entre la nueva fecha y el primer día del año
        const diferenciaEnDias = (nuevaFecha - primerDiaDelAño) / 86400000; // 86400000 es el número de milisegundos en un día

        // Calcular el número de semana, ajustando para que la semana empiece el domingo
        const numeroSemana = Math.ceil((diferenciaEnDias + primerDiaDelAño.getDay() + 1) / 7);

        return numeroSemana.toString();
    } catch (error) {
        console.error('Error al obtener el número de semana:', error.message);
        return '0';
    }
};