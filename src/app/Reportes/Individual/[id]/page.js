import { fetchEmployeePunchTime } from "@/app/services/biotimepro"; // Ajusta la ruta según tu estructura
import Employee from "@/app/components/Employe";

export default async function ReporteIndividual({ params, searchParams }) {
  const { id } = params;
  const { date_one, date_two } = searchParams;

  // Asegúrate de tener fechas válidas
  const startDate = date_one || new Date().toISOString().split("T")[0]; // Si no se pasan fechas, usa la fecha de hoy
  const endDate = date_two || startDate; // Si no se pasa la segunda fecha, usa la primera

  // Esperar correctamente la promesa y obtener los datos de la API
  let punchData = [];
  try {
    punchData = await fetchEmployeePunchTime(id, startDate, endDate);
    console.log("Respuesta de la API:", punchData); // Ver los datos en la consola
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }

  console.log("Respuesta de la API:", punchData);
  return (
    <div>
     <Employee punchData={punchData} dOne={date_one} dTwo={date_two} />
    </div>
  );
}
