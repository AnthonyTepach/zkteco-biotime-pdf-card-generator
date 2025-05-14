// PunchTable.js
import React from "react";
import { convertirFechaTexto } from "@/app/utils/dateUtils";
import { fetchPunchTime } from "../services/biotimepro";
import { downloadJSON, downloadCSV } from "../utils/fileUtils";
import { downloadPDF } from "../utils/generatePDF";
import Image from "next/image";
import swal from "sweetalert";
import Link from "next/link";

const PunchTable = ({ punchs, type, date_one, date_two }) => {
  const numberOfRecords = punchs.length;

  let data_api;

  const fetchDataAPI = async () => {
    try {
      data_api = await fetchPunchTime(type, date_one, date_two);
      if (!data_api) {
        console.error("No se obtuvieron datos del servidor.");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  fetchDataAPI();

  return (
    <>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden dark:bg-slate-900 dark:border-slate-700 transition-all duration-300">
                {/* Header section */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      Registro de entradas y salidas ({type})
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      {`${convertirFechaTexto(date_one)}`} <strong className="text-indigo-600 dark:text-indigo-400">al</strong>{" "}
                      {convertirFechaTexto(date_two)}
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      {/* JSON Button */}
                      <a
                        onClick={() =>
                          downloadJSON(data_api, date_one, date_two, type)
                        }
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-gray-300 font-medium bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white dark:hover:border-blue-500 dark:focus:ring-offset-slate-800"
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
                          className="text-indigo-500 dark:text-indigo-400"
                        >
                          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                        </svg>
                        JSON
                      </a>
                      {/* Excel Button */}
                      <a
                        onClick={() =>
                          downloadCSV(data_api, date_one, date_two, type)
                        }
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-gray-300 font-medium bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-600 transition-all text-sm dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white dark:hover:border-green-500 dark:focus:ring-offset-slate-800"
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
                          className="text-green-500 dark:text-green-400"
                        >
                          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                        </svg>
                        Excel
                      </a>
                      {/* PDF Button */}
                      <a
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-gray-300 font-medium bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-600 transition-all text-sm dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white dark:hover:border-red-500 dark:focus:ring-offset-slate-800"
                        href="#"
                        onClick={() => {
                          swal(
                            "Estamos preparando tu archivo PDF",
                            "Este proceso puede tomar unos momentos. \n¡Gracias por tu paciencia!",
                            "success"
                          );
                          setTimeout(() => {
                            downloadPDF(data_api, date_one, date_two, type);
                          }, 200);
                        }}
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
                          className="text-red-500 dark:text-red-400"
                        >
                          <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                        </svg>
                        PDF
                      </a>
                    </div>
                  </div>
                </div>

                {/* Table Header */}
                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                  <thead className="bg-gray-100 dark:bg-slate-800">
                    <tr>
                      <th
                        scope="col"
                        className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3 text-left"
                      >
                        <div className="flex items-center gap-x-2 ml-4">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-slate-200">
                            Nombre Completo
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-slate-200">
                            Departamento
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-slate-200">
                            N° Empleado
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-left">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-slate-200">
                            Total Registros
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-right"></th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {punchs.map((punch, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-gray-50 dark:hover:bg-slate-800/70 transition-colors duration-200"
                      >
                        <td className="h-px w-px whitespace-nowrap">
                          <div className="pl-6 lg:pl-3 xl:pl-0 pr-6 py-3">
                            <div className="flex items-center gap-x-3">
                              <Image
                                src={`/resources_pdf/photos/${punch.emp_code}.jpg`}
                                alt="Image Description"
                                width={32}
                                height={32}
                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-700 object-cover shadow-sm"
                              />
                              <div className="grow">
                                <span className="block text-sm font-semibold text-gray-800 dark:text-slate-200">
                                  {punch.first_name}
                                </span>
                                <span className="block text-sm text-gray-500 dark:text-slate-400">
                                  {punch.last_name}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="block text-sm font-semibold text-gray-800 dark:text-slate-200">
                              {punch.position_name}
                            </span>
                            <span className="block text-sm text-gray-500 dark:text-slate-400">
                              {punch.dept_name}
                            </span>
                          </div>
                        </td>
                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
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
                              <Link
                                href={`/Reportes/Individual/${punch.emp_code}?date_one=${date_one}&date_two=${date_two}`}
                              >
                                <span className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 hover:underline">
                                  Ver {punch.punch_times.length} Registros
                                </span>
                              </Link>
                            </div>
                          </div>
                        </td>

                        <td className="h-px w-px whitespace-nowrap">
                          <div className="px-6 py-1.5">
                            {/* Aquí puedes agregar más acciones si lo deseas */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Footer Section */}
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      <span className="font-semibold text-gray-800 dark:text-slate-200">
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