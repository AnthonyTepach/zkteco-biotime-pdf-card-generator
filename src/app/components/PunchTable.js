// PunchTable.js
import React from "react";
import { convertirFechaTexto } from "@/app/services/dateUtils";
import { fetchPunchTime } from "../services/biotimepro";
import XLSX from "xlsx";
import Image from "next/image";
const PunchTable = ({ punchs, type, date_one, date_two }) => {
  const numberOfRecords = punchs.length;
  const downloadJSON = async () => {
    try {
      // Supongamos que fetchPunchTime retorna el JSON que deseas descargar
      const data = await fetchPunchTime(type, date_one, date_two);

      // Verifica si la respuesta contiene datos
      if (!data) {
        console.error("No se obtuvieron datos del servidor.");
        return;
      }

      // Convierte los datos a una cadena JSON con formato legible
      const jsonString = JSON.stringify(data, null, 2);

      // Crea un objeto Blob con los datos JSON
      const blob = new Blob([jsonString], { type: "application/json" });

      // Crea una URL para el Blob
      const url = window.URL.createObjectURL(blob);

      // Crea un enlace de descarga y simula un clic para iniciar la descarga
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
  const downloadCSV = async () => {
    try {
      // Supongamos que fetchPunchTime retorna el JSON que deseas descargar
      const data = await fetchPunchTime(type, date_one, date_two);

      // Verifica si la respuesta contiene datos
      if (!data) {
        console.error("No se obtuvieron datos del servidor.");
        return;
      }

      // Convierte los datos a formato CSV
      const csvData = convertToCSV(data);

      // Crea un objeto Blob con los datos CSV
      const blob = new Blob([csvData], { type: "text/csv" });

      // Crea una URL para el Blob
      const url = window.URL.createObjectURL(blob);

      // Crea un enlace de descarga y simula un clic para iniciar la descarga
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}_${date_one}_TO_${date_two}.csv`; // Puedes cambiar el nombre del archivo según tu preferencia
      document.body.appendChild(a);
      a.click();

      // Libera los recursos después de la descarga
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error al descargar el archivo CSV:", error);
    }
  };

  // Función para convertir datos a formato CSV
  const convertToCSV = (data) => {
    // Encabezados
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

    // Filas de datos
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

    // Agregar encabezados a la primera fila
    rows.unshift(headers);

    // Convertir a cadena CSV
    return rows.map((row) => row.join(",")).join("\n");
  };

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Regitro de entradas y salidas ({type})
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {`${convertirFechaTexto(date_one)}`} <strong>al</strong>{" "}
                      {convertirFechaTexto(date_two)}
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <a
                        onClick={downloadJSON}
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                        </svg>
                        JSON
                      </a>
                      <a
                        onClick={downloadCSV}
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                        </svg>
                        Excel
                      </a>
                      <a
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                        href="#"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                        </svg>
                        PDF
                      </a>
                    </div>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-slate-800">
                    <tr>
                      <th
                        scope="col"
                        className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left"
                      >
                        <div className="flex items-center gap-x-2 ml-4">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Nombre Completo
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Departamento
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            N° Empleado
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Total Registros
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-right"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {punchs.map((punch, index) => (
                      <tr key={index}>
                        <td className="h-px w-px whitespace-nowrap">
                          <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                            <div className="flex items-center gap-x-3">
                              <Image
                                src={`http://192.168.200.12:8080/files/photo/${punch.emp_code}.jpg`}
                                alt="Image Description"
                                width={32} // adjust width as needed
                                height={32} // adjust height as needed
                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
                              />
                              <div className="grow">
                                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                  {punch.first_name}
                                </span>
                                <span className="block text-sm text-gray-500">
                                  {punch.last_name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                              {punch.position_name}
                            </span>
                            <span className="block text-sm text-gray-500">
                              {punch.dept_name}
                            </span>
                          </div>
                        </td>
                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <svg
                                className="w-2.5 h-2.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                              {punch.emp_code}
                            </span>
                          </div>
                        </td>
                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <div className="flex items-center gap-x-3">
                              <span className="text-xs text-gray-500">
                                {punch.punch_times.length} Registros
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-1.5">
                            {/* <a
                              className="inline-flex items-center gap-x-1.5 text-sm text-gray-500 decoration-2 hover:underline font-medium"
                              
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              Ver más
                            </a> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {numberOfRecords}
                      </span>{" "}
                      Resultados
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PunchTable;
