import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { obtenerNumeroSemana } from "@/app/utils/dateUtils";

export const downloadPDF = async (data_api, date_one, date_two, type) => {
    
  var background_color = "Sfte.png";
  if (type === "QUINCENA") {
    background_color = "Qfte.png";
  }
  const meses_texto = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const page_doc = new jsPDF({
    orientation: "landscape",
    unit: "in",
    format: [8.5, 11],
  });

  data_api.forEach((employee) => {
    //inicio foreach employee
    page_doc.addPage();
    page_doc.addImage(
      `../resources_pdf/${background_color}`,
      "JPEG",
      0,
      0,
      page_doc.internal.pageSize.width,
      page_doc.internal.pageSize.height
    );
    //numero de empleado
    page_doc.text(9.1, 1.64, employee.emp_code);
    //Departamento de empleado
    if (employee.position_name.length < 20) {
      page_doc.setFontSize(16);
      page_doc.text(7.12, 1.64, employee.position_name);
    } else {
      page_doc.setFontSize(12);
      page_doc.text(7, 1.64, employee.position_name);
      page_doc.setFontSize(16);
    }
    //nombre de empleado
    page_doc.text(1.25, 1.64, employee.first_name + " " + employee.last_name);
    //nuemero de semana
    page_doc.text(1.35, 2.04, obtenerNumeroSemana(new Date(date_two).toISOString().substring(0, 10)));
    //Del ${date_one} al ${date_two}
    page_doc.text(2.8, 2.04, date_one.split("-")[2]);
    page_doc.text(4, 2.04, date_two.split("-")[2]);
    //del mes de:
    page_doc.text(6.5, 2.04, meses_texto[date_two.split("-")[1] - 1]);
    //del año
    page_doc.text(9.3, 2.04, date_two.split("-")[0]);
    //nombre de la firma
    page_doc.setFontSize(12);
    page_doc.text(7.1, 6, employee.first_name + " " + employee.last_name);
    page_doc.setFontSize(16);
    //foto empleado
    page_doc.addImage(
      `../resources_pdf/photos/${employee.emp_code}.jpg`,
      "JPEG",
      page_doc.internal.pageSize.width - 3,
      page_doc.internal.pageSize.height - 5.66,
      1.5,
      2
    );
    //tablas de checadas
    let color = [0, 0, 0];
    if (employee.dept_name === "SEMANA") {
      color = [60, 236, 218];
    } else if (employee.dept_name === "QUINCENA") {
      color = [241, 19, 34];
    }
    const headers_punch_time = [["Fecha", "Hora", "Dispositivo"]];

    const data_punch_time = employee.punch_times.map((punch) => [
      punch.fecha,
      punch.hora,
      punch.checo_en,
    ]);

    // Divide los datos en dos conjuntos de filas
    const firstRows = data_punch_time.slice(0, 13);
    const secondRows = data_punch_time.slice(13);

    // Crea la primera tabla
    page_doc.autoTable({
      head: headers_punch_time,
      body: firstRows,
      styles: { fontSize: 11 },
      headStyles: { fontStyle: "bold", halign: "center", fillColor: color },
      tableWidth: "wrap",
      avoidFirstPage: true,
      startY: 2.5,
    });

    // Crea la segunda tabla
    page_doc.autoTable({
      head: headers_punch_time,
      body: secondRows,
      styles: { fontSize: 11 },
      headStyles: { fontStyle: "bold", halign: "center", fillColor: color },
      tableWidth: "wrap",
      avoidFirstPage: true,
      startY: 2.5,
      margin: { left: 3.5, right: 3.5 }, // La posición horizontal debe ser igual al ancho de la tabla anterior + 10
    });
  }); //fin foreach empleado
  page_doc.deletePage(1); 
  page_doc.save(`REPORTE_${type}_${date_one}_${date_two}.pdf`);
};
