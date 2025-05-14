// src/components/Employee.js
import Image from "next/image";
import React from "react";
import { convertirFechaTexto } from "@/app/utils/dateUtils";

const Employee = ({ punchData, dOne, dTwo }) => {
  const punchTimes = punchData?.[0]?.punch_times || [];
  const punchTimesGrouped = punchTimes.reduce((acc, curr) => {
    if (!acc[curr.fecha]) {
      acc[curr.fecha] = [];
    }
    acc[curr.fecha].push(curr);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden">
        {/* Perfil del empleado */}
        <div className="relative">
          {/* Banner de fondo */}
          <div className="h-32 bg-gradient-to-r from-slate-700 to-slate-800"></div>
          
          {/* Información del perfil */}
          <div className="flex flex-col items-center -mt-16 pb-6">
            <div className="ring-4 ring-slate-50 dark:ring-slate-900 rounded-full overflow-hidden">
              <Image
                src={`/resources_pdf/photos/${punchData?.[0]?.emp_code}.jpg`}
                alt={`Foto de ${punchData?.[0]?.first_name} ${punchData?.[0]?.last_name}`}
                width={128}
                height={128}
                className="w-32 h-32 object-cover"
              />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {punchData?.[0]?.first_name} {punchData?.[0]?.last_name}
            </h2>
            <div className="flex items-center mt-1 space-x-2">
              <span className="px-3 py-1 bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200 text-xs font-medium rounded-full">
                {punchData?.[0]?.position_name}
              </span>
              <span className="px-3 py-1 bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-300 text-xs font-medium rounded-full">
                N° {punchData?.[0]?.emp_code}
              </span>
            </div>
          </div>
        </div>

        {/* Encabezado de la tabla */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Registro de entradas y salidas
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium">{convertirFechaTexto(dOne)}</span>{" "}
                <span className="mx-1">al</span>{" "}
                <span className="font-medium">{convertirFechaTexto(dTwo)}</span>
              </p>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{punchTimes.length} Registros</span>
            </div>
          </div>
        </div>

        {/* Tabla de registros */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {Object.entries(punchTimesGrouped).map(([fecha, registros]) => (
                <React.Fragment key={fecha}>
                  <tr>
                    <td
                      colSpan="3"
                      className="sticky top-0 bg-gradient-to-r from-slate-800 to-slate-700 text-slate-100 font-medium px-6 py-3"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {convertirFechaTexto(fecha)}
                      </div>
                    </td>
                  </tr>
                  {registros.map((punch, index) => (
                    <tr key={index} className="hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="whitespace-nowrap">
                        <div className="px-6 py-4">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                              {punch.hora}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">
                        <div className="px-6 py-4">
                          <span className="text-slate-500 dark:text-slate-400">—</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">
                        <div className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-medium ${
                            punch.checo_en === 'Entrada' 
                              ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200' 
                              : 'bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                          }`}>
                            {punch.checo_en === 'Entrada' ? (
                              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                              </svg>
                            )}
                            {punch.checo_en}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pie de página */}
        <div className="flex justify-end px-6 py-4 border-t border-slate-200 dark:border-slate-800">
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-slate-100 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
            Exportar registros
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employee;