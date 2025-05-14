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
    <>
     
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                {
                    //inicio de info de empleado
                }
                <div class="w-full  bg-white border border-gray-200  dark:bg-slate-900 dark:border-gray-700">
                  <div class="flex justify-end px-4 pt-4"></div>
                  <div class="flex flex-col items-center pb-10">
                    <Image
                      src={`/resources_pdf/photos/${punchData?.[0]?.emp_code}.jpg`}
                      alt={`Foto de ${punchData?.[0]?.first_name} ${punchData?.[0]?.last_name}`}
                      width={96} // 24 * 4 (tailwind *rem base 4px) = 96px
                      height={96}
                      className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                      {punchData?.[0]?.first_name} {punchData?.[0]?.last_name}
                    </h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      N° de Empleado: {punchData?.[0]?.emp_code}
                    </span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">
                      {punchData?.[0]?.position_name}
                    </span>
                  </div>
                </div>
{
    //fin de info de empleado
}

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Regitro de entradas y salidas
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {`${convertirFechaTexto(dOne)}`} <strong>al</strong>{" "}
                      {convertirFechaTexto(dTwo)}
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2"></div>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {Object.entries(punchTimesGrouped).map(
                      ([fecha, registros]) => (
                        <React.Fragment key={fecha}>
                          <tr>
                            <td
                              colSpan="3"
                              className="bg-slate-800 text-gray-400 font-semibold px-6 py-2"
                            >
                              {convertirFechaTexto(fecha)}
                            </td>
                          </tr>
                          {registros.map((punch, index) => (
                            <tr key={index}>
                              <td className="h-px w-72 whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {punch.hora}
                                  </span>
                                </div>
                              </td>
                              <td className="h-px w-72 whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    {/* Puedes mostrar otro dato si lo necesitas */}
                                    —
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
                                    {punch.checo_en}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      )
                    )}
                  </tbody>
                </table>

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {punchTimes.length}
                      </span>{" "}
                      Registros
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

export default Employee;
