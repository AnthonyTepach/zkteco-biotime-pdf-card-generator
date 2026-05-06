import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { obtenerNumeroSemana } from "@/app/utils/dateUtils";

/**
 * Genera y descarga un PDF con los reportes de empleados
 * @param {Array} data_api - Datos de empleados
 * @param {string} date_one - Fecha inicial en formato YYYY-MM-DD
 * @param {string} date_two - Fecha final en formato YYYY-MM-DD
 * @param {string} type - Tipo de reporte ("SEMANA" o "QUINCENA")
 */
export const downloadPDF = async (data_api, date_one, date_two, type) => {
  // Determinar la imagen de fondo según el tipo de reporte
  const background_color = type === "QUINCENA" ? "Qfte.png" : "Sfte.png";
  
  // Array con los meses en español
  const meses_texto = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  // Crear el documento PDF con orientación horizontal
  const page_doc = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [8.5, 11],
  });

  // Procesar cada empleado
  data_api.forEach((employee) => {
    page_doc.addPage();
    
    // Agregar imagen de fondo
    page_doc.addImage(
      `../resources_pdf/${background_color}`,
      "JPEG",
      0,
      0,
      page_doc.internal.pageSize.width,
      page_doc.internal.pageSize.height
    );
    
    // Agregar información del empleado
    page_doc.text(9.1, 1.64, employee.emp_code);
    
    // Departamento del empleado
    const positionName = employee.position_name;
    if (positionName.length < 20) {
      page_doc.setFontSize(16);
      page_doc.text(7.12, 1.64, positionName);
    } else {
      page_doc.setFontSize(12);
      page_doc.text(7, 1.64, positionName);
      page_doc.setFontSize(16);
    }
    
    // Nombre completo del empleado
    page_doc.text(1.25, 1.64, `${employee.first_name} ${employee.last_name}`);
    
    // Número de semana
    const weekNumber = obtenerNumeroSemana(new Date(date_two).toISOString().substring(0, 10));
    page_doc.text(1.35, 2.04, weekNumber);
    
    // Fechas del reporte
    const dateParts = date_two.split("-");
    page_doc.text(2.8, 2.04, date_one.split("-")[2]);
    page_doc.text(4, 2.04, date_two.split("-")[2]);
    page_doc.text(6.5, 2.04, meses_texto[parseInt(dateParts[1]) - 1]);
    page_doc.text(9.3, 2.04, dateParts[0]);
    
    // Firma del empleado
    page_doc.setFontSize(12);
    page_doc.text(7.1, 6, `${employee.first_name} ${employee.last_name}`);
    page_doc.setFontSize(16);
    
    // Foto del empleado
    page_doc.addImage(
      `../resources_pdf/photos/${employee.emp_code}.jpg`,
      "JPEG",
      page_doc.internal.pageSize.width - 3,
      page_doc.internal.pageSize.height - 5.66,
      1.5,
      2
    );
    
    // Configurar colores según el departamento
    const color = employee.dept_name === "SEMANA" 
      ? [60, 236, 218] 
      : employee.dept_name === "QUINCENA" 
        ? [241, 19, 34] 
        : [0, 0, 0];
    
    // Configurar encabezados y datos para la tabla de checadas
    const headers_punch_time = [["Fecha", "Hora", "Dispositivo"]];
    const data_punch_time = employee.punch_times.map((punch) => [
      punch.fecha,
      punch.hora,
      punch.checo_en,
    ]);
    
    // Dividir los datos en dos conjuntos para dos tablas
    const firstRows = data_punch_time.slice(0, 13);
    const secondRows = data_punch_time.slice(13);
    
    // Crear primera tabla
    page_doc.autoTable({
      head: headers_punch_time,
      body: firstRows,
      styles: { fontSize: 11 },
      headStyles: { fontStyle: "bold", halign: "center", fillColor: color },
      tableWidth: "wrap",
      avoidFirstPage: true,
      startY: 2.5,
    });
    
    // Crear segunda tabla
    page_doc.autoTable({
      head: headers_punch_time,
      body: secondRows,
      styles: { fontSize: 11 },
      headStyles: { fontStyle: "bold", halign: "center", fillColor: color },
      tableWidth: "wrap",
      avoidFirstPage: true,
      startY: 2.5,
      margin: { left: 3.5, right: 3.5 },
    });
  });
  
  // Eliminar la primera página que se crea por defecto
  page_doc.deletePage(1); 
  page_doc.save(`REPORTE_${type}_${date_one}_${date_two}.pdf`);
};