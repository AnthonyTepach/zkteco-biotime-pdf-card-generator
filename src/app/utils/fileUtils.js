import { convertirFechaTexto } from "@/app/utils/dateUtils"
export const downloadJSON = async (data_api, date_one, date_two, type) => {
  try {
    if (!data_api) {
      console.error("No se obtuvieron datos del servidor.");
      return;
    }
    const jsonString = JSON.stringify(data_api, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_${date_one}_TO_${date_two}.json`; // Puedes cambiar el nombre del archivo según tu preferencia
    document.body.appendChild(a);
    a.click();
    // Libera los recursos después de la descarga
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error al descargar el archivo JSON:", error);
  }
};

export const downloadCSV = async (data_api, date_one, date_two, type) => {
  try {
    if (!data_api) {
      console.error("No se obtuvieron datos del servidor.");
      return;
    }
    const csvData = convertToCSV(data_api);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_${date_one}_TO_${date_two}.csv`; // Puedes cambiar el nombre del archivo según tu preferencia
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error al descargar el archivo CSV:", error);
  }
};

const convertToCSV = (data) => {
  const headers = [
    "N° Empleado",
    "Nombre(s)",
    "Apellidos",
    "Area",
    "Tipo",
    "Dia Semana",
    "Fecha",
    "H1",
    "H2",
    "H3",
    "H4",
  ];

  const rows = data.reduce((accumulator, entry) => {
    const punchTimes = entry.punch_times.reduce((punchAccumulator, punch) => {
      punchAccumulator[punch.fecha] = punchAccumulator[punch.fecha] || [];
      punchAccumulator[punch.fecha].push(punch.hora);
      return punchAccumulator;
    }, {});

    Object.keys(punchTimes).forEach((fecha) => {
      accumulator.push([
        entry.emp_code,
        entry.first_name,
        entry.last_name,
        entry.position_name,
        entry.dept_name,
        convertirFechaTexto(fecha),
        ...punchTimes[fecha],
      ]);
    });

    return accumulator;
  }, []);

  rows.unshift(headers);

  return rows.map((row) => row.join(",")).join("\n");
};
