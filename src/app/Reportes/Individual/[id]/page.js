import { fetchEmployeePunchTime } from "@/app/services/biotimepro";
import Employee from "@/app/components/Employe";

/**
 * Página del reporte individual de un empleado
 * @param {Object} params - Parámetros de la ruta
 * @param {Object} searchParams - Parámetros de búsqueda
 * @returns {JSX.Element} Componente React
 */
export default async function ReporteIndividual({ params, searchParams }) {
  const { id } = params;
  const { date_one, date_two } = searchParams;

  // Validar que el ID del empleado esté presente
  if (!id) {
    console.error("ID del empleado no proporcionado");
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-2">No se proporcionó el ID del empleado</p>
      </div>
    );
  }

  // Configurar fechas por defecto
  const startDate = date_one || new Date().toISOString().split("T")[0];
  const endDate = date_two || startDate;

  // Obtener datos del empleado
  let punchData = [];
  try {
    punchData = await fetchEmployeePunchTime(id, startDate, endDate);
    console.log("Datos obtenidos de la API:", punchData);
  } catch (error) {
    console.error("Error al obtener los datos del empleado:", error);
    // Puedes retornar un mensaje de error o datos vacíos
    punchData = [];
  }

  // Mostrar los datos obtenidos en consola
  console.log("Datos del empleado:", punchData);

  // Renderizar el componente Employee con los datos obtenidos
  return (
    <div className="min-h-screen bg-gray-50">
      <Employee 
        punchData={punchData} 
        dOne={date_one} 
        dTwo={date_two} 
      />
    </div>
  );
}
