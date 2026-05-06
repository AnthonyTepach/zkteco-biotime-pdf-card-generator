import { convertirFechaTexto } from "@/app/utils/dateUtils";
import config from '@/app/config/settings';

/**
 * Descarga datos como archivo JSON
 * @param {Array} data_api - Datos a descargar
 * @param {string} date_one - Fecha inicial en formato YYYY-MM-DD
 * @param {string} date_two - Fecha final en formato YYYY-MM-DD
 * @param {string} type - Tipo de reporte
 */
export const downloadJSON = async (data_api, date_one, date_two, type) => {
  try {
    if (!data_api) {
      console.error("No se obtuvieron datos del servidor.");
      return;
    }
    
    const jsonString = JSON.stringify(data_api, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = `${type}_${date_one}_TO_${date_two}.json`;
    document.body.appendChild(link);
    link.click();
    
    // Liberar recursos después de la descarga
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al descargar el archivo JSON:", error);
  }
};

/**
 * Descarga datos como archivo CSV
 * @param {Array} data_api - Datos a descargar
 * @param {string} date_one - Fecha inicial en formato YYYY-MM-DD
 * @param {string} date_two - Fecha final en formato YYYY-MM-DD
 * @param {string} type - Tipo de reporte
 */
export const downloadCSV = async (data_api, date_one, date_two, type) => {
  try {
    if (!data_api) {
      console.error("No se obtuvieron datos del servidor.");
      return;
    }
    
    const csvData = convertToCSV(data_api);
    
    // Agregar BOM (Byte Order Mark) para UTF-8
    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvData;
    
    // Crear el blob con tipo de contenido que especifica UTF-8
    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = `${type}_${date_one}_TO_${date_two}.csv`;
    document.body.appendChild(link);
    link.click();
    
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al descargar el archivo CSV:", error);
  }
};

/**
 * Convierte una hora en formato HH:MM:SS a minutos
 * @param {string} horaStr - Hora en formato HH:MM:SS
 * @returns {number|null} - Hora en minutos o null si inválido
 */
const horaAMinutos = (horaStr) => {
  if (!horaStr) return null;
  
  const [horas, minutos, segundos] = horaStr.split(":").map(Number);
  return horas * 60 + minutos + segundos / 60;
};

/**
 * Verifica si una entrada es temprana y califica para horas extras
 * @param {string} horaEntrada - Hora de entrada en formato HH:MM:SS
 * @param {string} departamento - Nombre del departamento
 * @returns {string} - Valor de horas extras o cadena vacía
 */
const calcularExtrasEntrada = (horaEntrada, departamento) => {
  if (!horaEntrada) return "";
  
  const minutosEntrada = horaAMinutos(horaEntrada);
  
  // Entrada: 5:00 a 7:32:59 se añade 0.5 hrs extras (excepto intendencia y embarques)
  if (minutosEntrada >= 300 && minutosEntrada < 453) {
    if (departamento !== "Intendencia" && departamento !== "Embarques") {
      return "0.5";
    }
  }
  
  return "";
};

/**
 * Verifica si hay retardo en la entrada
 * @param {string} horaEntrada - Hora de entrada en formato HH:MM:SS
 * @returns {string} - Tiempo de retardo o cadena vacía
 */
const calcularRetardo = (horaEntrada) => {
  if (!horaEntrada) return "";
  
  const minutosEntrada = horaAMinutos(horaEntrada);
  
  // Entrada: 8:01 a 12:00 añadir columna, mostrando el retardo
  if (minutosEntrada >= 481 && minutosEntrada <= 720) {
    const minutosRetardo = minutosEntrada - 480; // 8:00 son 480 minutos
    const horasRetardo = Math.floor(minutosRetardo / 60);
    const minutosRestantes = minutosRetardo % 60;
    
    return `${horasRetardo}:${minutosRestantes.toString().padStart(2, "0")}`;
  }
  
  return "";
};

/**
 * Calcula horas extras en la salida (después de 18:30, en bloques de 30 minutos)
 * @param {string} horaSalida - Hora de salida en formato HH:MM:SS
 * @returns {number|string} - Valor de horas extras o cadena vacía
 */
const calcularExtrasSalida = (horaSalida) => {
  if (!horaSalida) return "";
  
  const minutosSalida = horaAMinutos(horaSalida);
  const baseSalida = 1110; // 18:30 en minutos
  
  // Validar que la salida fue después de 18:30 y antes de medianoche
  if (minutosSalida > baseSalida && minutosSalida <= 1440) {
    const minutosExtras = minutosSalida - baseSalida;
    const bloquesMediaHora = Math.floor(minutosExtras / 30);
    return bloquesMediaHora * 0.5;
  }
  
  return "";
};

/**
 * Convierte datos a formato CSV
 * @param {Array} data - Datos a convertir
 * @returns {string} - Contenido CSV
 */
const convertToCSV = (data) => {
  const headers = config.csvConfig.headers;
  
  // Ordenar los datos por código de empleado para asegurar que estén agrupados
  data.sort((a, b) => a.emp_code - b.emp_code);
  
  let rows = [];
  let lastEmpCode = null;
  
  data.forEach((entry) => {
    // Agrupar registros por fecha
    const punchTimes = entry.punch_times.reduce((accumulator, punch) => {
      accumulator[punch.fecha] = accumulator[punch.fecha] || [];
      accumulator[punch.fecha].push(punch.hora);
      return accumulator;
    }, {});
    
    // Si cambiamos de empleado y no es el primer empleado, añadir línea en blanco
    if (lastEmpCode !== null && lastEmpCode !== entry.emp_code) {
      rows.push(Array(headers.length).fill("")); // Añade una fila vacía
    }
    
    // Actualizar el código del último empleado procesado
    lastEmpCode = entry.emp_code;
    
    Object.keys(punchTimes).forEach((fecha) => {
      // Obtener los registros de hora, asegurando que siempre haya 6 elementos (pueden ser vacíos)
      const horas = punchTimes[fecha];
      const horasFormateadas = [
        horas[0] || "",
        horas[1] || "",
        horas[2] || "",
        horas[3] || "",
        horas[4] || "",
        horas[5] || "",
      ];
      
      const horaEntrada = horas[0] || "";
      const horaSalida = horas.length >= 2 ? horas[horas.length - 1] : "";
      
      // Calcular extras y retardos
      const extrasEntrada = calcularExtrasEntrada(horaEntrada, entry.dept_name);
      const retardo = calcularRetardo(horaEntrada);
      const extrasSalida = calcularExtrasSalida(horaSalida);
      
      rows.push([
        entry.emp_code,
        entry.first_name,
        entry.last_name,
        entry.position_name,
        entry.dept_name,
        convertirFechaTexto(fecha),
        fecha,
        ...horasFormateadas, // Usar el array fijo de 6 elementos
        extrasEntrada,
        retardo,
        extrasSalida,
      ]);
    });
  });
  
  rows.unshift(headers);
  
  // Función para escapar caracteres especiales en CSV
  const escapeCSV = (field) => {
    if (field === null || field === undefined) {
      return "";
    }
    
    // Convertir a string y escapar caracteres especiales
    let stringField = String(field);
    
    // Si el campo contiene comas, comillas o saltos de línea, encerrarlo en comillas
    if (
      stringField.includes(",") ||
      stringField.includes('"') ||
      stringField.includes("\n")
    ) {
      // Escapar las comillas dobles duplicándolas
      stringField = stringField.replace(/"/g, '""');
      // Encerrar el campo en comillas
      stringField = `"${stringField}"`;
    }
    
    return stringField;
  };
  
  // Aplica el escape a cada campo y luego une las filas
  return rows.map((row) => row.map(escapeCSV).join(",")).join("\n");
};
